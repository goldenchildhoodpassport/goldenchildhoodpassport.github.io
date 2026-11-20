/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   REPORT — share link + downloadable image
   ------------------------------------------
   Frontend-only sharing: the passport
   summary is packed into the link itself
   (passport.html#p=...). No server needed.
   The photo is never put in the link.
========================================== */

window.GCP = window.GCP || {};

GCP.report = (function () {

    const { toBangla } = GCP.helpers;

    /* ---------- share link ---------- */

    function toBase64Url(text) {
        const bytes = new TextEncoder().encode(text);
        let binary = "";
        bytes.forEach((b) => { binary += String.fromCharCode(b); });
        return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    function fromBase64Url(text) {
        const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    }

    function encode(model) {
        const payload = {
            v: 1,
            n: model.nickname,
            y: model.birthYear || 0,
            l: model.place || "",
            s: model.setting || "",
            t: model.total,
            c: model.cats.map((c) => (c.percent === null ? -1 : c.percent)),
            b: model.badges.map((b) => b.id),
            m: model.memories[0] ? model.memories[0].text.slice(0, 90) : "",
            a: model.answered || 0,
            e: model.did || 0,
            w: model.saw || 0
        };
        return toBase64Url(JSON.stringify(payload));
    }

    function decode(hash) {
        try {
            const data = JSON.parse(fromBase64Url(hash));
            if (!data || data.v !== 1 || typeof data.t !== "number") return null;
            return data;
        } catch (e) {
            return null;
        }
    }

    function shareUrl(model) {
        const root = GCP.siteUrl ? GCP.siteUrl() : location.href.split("#")[0].replace(/[^/]*$/, "");
        const base = root.replace(/\/?$/, "/") + "passport.html";
        return `${base}#p=${encode(model)}`;
    }

    /* ---------- image export ---------- */

    function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
        const words = text.split(/\s+/);
        let line = "";
        let lines = 0;
        for (let i = 0; i < words.length; i++) {
            const test = line ? line + " " + words[i] : words[i];
            if (ctx.measureText(test).width > maxWidth && line) {
                ctx.fillText(line, x, y);
                y += lineHeight;
                line = words[i];
                if (++lines >= maxLines - 1) {
                    let rest = words.slice(i).join(" ");
                    while (ctx.measureText(rest + "…").width > maxWidth && rest.length) rest = rest.slice(0, -1);
                    ctx.fillText(rest + (rest.length < words.slice(i).join(" ").length ? "…" : ""), x, y);
                    return y + lineHeight;
                }
            } else {
                line = test;
            }
        }
        if (line) ctx.fillText(line, x, y);
        return y + lineHeight;
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function loadImage(src) {
        return new Promise((resolve) => {
            if (!src) return resolve(null);
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }

    /* ---------- tier palettes for the export ---------- */
    const TIER_ART = {
        gold:    { bgA: "#2a2016", bgB: "#0f0c0a", glow: "rgba(231, 196, 106, .45)", foil: "#e7c46a", foil2: "#fff4c9", ink: "#1a140f", page: ["#fbf3d9", "#efe0b4"] },
        silver:  { bgA: "#1f2a3e", bgB: "#0d1320", glow: "rgba(214, 221, 230, .35)", foil: "#d6dde6", foil2: "#ffffff", ink: "#141f33", page: ["#f6f3ec", "#e6e4dc"] },
        bronze:  { bgA: "#3a2216", bgB: "#170d08", glow: "rgba(211, 154, 106, .4)", foil: "#d39a6a", foil2: "#ffd9b8", ink: "#4b2421", page: ["#f8f0dc", "#ecdfc0"] },
        classic: { bgA: "#1d3428", bgB: "#0b1610", glow: "rgba(217, 196, 142, .35)", foil: "#d9c48e", foil2: "#fff3cc", ink: "#163024", page: ["#f8f0dc", "#ecdfc0"] }
    };

    function foilGradient(ctx, x0, y0, x1, y1, art) {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, art.foil);
        g.addColorStop(0.45, art.foil2);
        g.addColorStop(0.55, art.foil);
        g.addColorStop(1, art.foil);
        return g;
    }

    function stampShape(ctx, shape, w, h) {
        ctx.beginPath();
        if (shape === "circle") { ctx.arc(0, 0, Math.min(w, h) / 2, 0, Math.PI * 2); }
        else if (shape === "oval") { ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2); }
        else if (shape === "hex") { roundRect(ctx, -w / 2, -h / 2, w, h, 18); }
        else { roundRect(ctx, -w / 2, -h / 2, w, h, 5); }
    }

    function drawKeepsakes(ctx, list, PX, PY, PW) {
        const slots = [
            { x: PX + PW * 0.14, y: PY - 22, r: -0.14 },
            { x: PX + PW * 0.84, y: PY - 20, r: 0.12 },
            { x: PX + PW * 0.5, y: PY - 14, r: -0.05 }
        ];
        const BN = '"Hind Siliguri", sans-serif';
        list.forEach((k, i) => {
            const s = slots[i];
            if (!s) return;
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.r);
            ctx.shadowColor = "rgba(0,0,0,.4)"; ctx.shadowBlur = 14; ctx.shadowOffsetY = 6;
            ctx.textAlign = "center";
            const L = k.lines;
            switch (k.type) {
                case "note":
                    ctx.fillStyle = "#c2527a"; ctx.fillRect(-95, -45, 190, 92);
                    ctx.shadowColor = "transparent";
                    ctx.strokeStyle = "rgba(255,255,255,.45)"; ctx.lineWidth = 4; ctx.strokeRect(-88, -38, 176, 78);
                    ctx.fillStyle = "#fff3f7"; ctx.font = `800 40px ${BN}`; ctx.fillText(L[0], -30, 10);
                    ctx.font = `700 16px ${BN}`; ctx.fillText(L[1], -30, 32);
                    ctx.beginPath(); ctx.arc(50, 0, 22, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fill();
                    break;
                case "sticker":
                    ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
                    ctx.shadowColor = "transparent";
                    ctx.beginPath(); ctx.arc(0, 0, 48, 0, Math.PI * 2); ctx.fillStyle = "#3d1a55"; ctx.fill();
                    ctx.font = "34px serif"; ctx.fillText("👻", 0, -2);
                    ctx.fillStyle = "#e8d8ff"; ctx.font = `800 14px ${BN}`; ctx.fillText(L[0], 0, 24);
                    ctx.font = `700 12px ${BN}`; ctx.fillText(L[1], 0, 39);
                    break;
                case "scratch":
                    ctx.fillStyle = "#1584c4"; roundRect(ctx, -85, -50, 170, 100, 10); ctx.fill();
                    ctx.shadowColor = "transparent";
                    ctx.fillStyle = "#fff"; ctx.font = `700 15px ${BN}`; ctx.fillText(L[0], 0, -18);
                    ctx.font = `800 26px ${BN}`; ctx.fillText(L[1], 0, 12);
                    ctx.fillStyle = "#cfd4d8"; ctx.fillRect(-70, 22, 140, 18);
                    ctx.fillStyle = "#333"; ctx.font = `16px "VT323", monospace`; ctx.fillText("4471 ▒▒ 0932", 0, 36);
                    break;
                case "clip":
                    ctx.fillStyle = "#efe6cf"; ctx.fillRect(-95, -50, 190, 104);
                    ctx.shadowColor = "transparent";
                    ctx.fillStyle = "#2b2620"; ctx.font = `700 16px ${BN}`; ctx.fillText(L[0], 0, -14);
                    ctx.fillStyle = "#7a2a20"; ctx.font = `700 17px ${BN}`; ctx.fillText(L[1], 0, 12, 180);
                    break;
                case "postage":
                    ctx.fillStyle = "#fdf8ec"; ctx.fillRect(-48, -60, 96, 118);
                    ctx.shadowColor = "transparent";
                    ctx.fillStyle = "#f0a45a"; ctx.fillRect(-40, -52, 80, 62);
                    ctx.font = "30px serif"; ctx.fillText("⛵", 0, -12);
                    ctx.fillStyle = "#2a5d4a"; ctx.font = `700 13px ${BN}`; ctx.fillText(L[0], 0, 30); ctx.fillText(L[1], 0, 48);
                    break;
                case "ticket":
                    ctx.fillStyle = "#f3e27a"; ctx.fillRect(-90, -38, 180, 76);
                    ctx.shadowColor = "transparent";
                    ctx.fillStyle = "#3a3000"; ctx.font = `700 17px ${BN}`; ctx.fillText(L[0], 0, -4);
                    ctx.font = `18px "VT323", monospace`; ctx.fillText(L[1], 0, 22);
                    break;
                case "token":
                    ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2);
                    const g = ctx.createRadialGradient(-12, -14, 4, 0, 0, 44); g.addColorStop(0, "#fff0b0"); g.addColorStop(0.6, "#d7a83a"); g.addColorStop(1, "#8a6410");
                    ctx.fillStyle = g; ctx.fill();
                    ctx.shadowColor = "transparent";
                    ctx.fillStyle = "#4a3200"; ctx.font = `800 14px ${BN}`; ctx.fillText(L[0], 0, -6); ctx.font = `800 26px ${BN}`; ctx.fillText(L[1], 0, 22);
                    break;
                case "marble": {
                    const m = ctx.createRadialGradient(-8, -10, 2, 0, 0, 30); m.addColorStop(0, "#fff"); m.addColorStop(0.3, "#8fd3ff"); m.addColorStop(1, "#173d66");
                    ctx.beginPath(); ctx.arc(0, 10, 30, 0, Math.PI * 2); ctx.fillStyle = m; ctx.fill();
                    break;
                }
                case "leaf":
                    ctx.font = "70px serif"; ctx.fillText("🍂", 0, 20);
                    break;
                default:
                    ctx.fillStyle = "#f4f0e6"; roundRect(ctx, -60, -10, 120, 22, 5); ctx.fill();
            }
            ctx.restore();
        });
    }

    /* 4-step level ladder for the export: 🌱 সবুজ › 🥉 তামা › 🥈 রুপালি › 🥇 স্বর্ণ */
    function drawLadder(ctx, tier, x, y, width) {
        if (!GCP.tierLadder) return;
        const BN = '"Hind Siliguri", sans-serif';
        const steps = GCP.tierLadder();
        const gap = 10;
        const w = (width - gap * (steps.length - 1)) / steps.length;
        const h = 46;
        steps.forEach((t, i) => {
            const sx = x + i * (w + gap);
            const here = t.id === tier.id;
            const passed = t.level < (tier.level || 1);
            roundRect(ctx, sx, y, w, h, 23);
            if (here) {
                const g = ctx.createLinearGradient(sx, 0, sx + w, 0);
                g.addColorStop(0, t.color); g.addColorStop(0.5, "#fff6dc"); g.addColorStop(1, t.color);
                ctx.fillStyle = g; ctx.fill();
            } else {
                ctx.fillStyle = passed ? "rgba(255, 243, 214, .22)" : "rgba(255, 243, 214, .06)"; ctx.fill();
                ctx.setLineDash(passed ? [] : [6, 5]);
                ctx.strokeStyle = passed ? t.color : "rgba(255, 243, 214, .35)"; ctx.lineWidth = 2; ctx.stroke();
                ctx.setLineDash([]);
            }
            ctx.textAlign = "center";
            ctx.font = `${here ? 800 : 600} 21px ${BN}`;
            ctx.fillStyle = here ? "#1a140f" : passed ? "#fff3d6" : "rgba(255, 243, 214, .5)";
            const label = here ? `${t.icon} ${t.short} · আমি এখানে` : passed ? `${t.icon} ${t.short} ✓` : `🔒 ${t.short}`;
            ctx.fillText(label, sx + w / 2, y + 30, w - 16);
        });
        ctx.textAlign = "left";
    }

    async function drawCard(canvas, model) {
        await Promise.all([
            document.fonts.load('600 70px "Atma"'),
            document.fonts.load('600 36px "Hind Siliguri"'),
            document.fonts.load('700 36px "Hind Siliguri"'),
            document.fonts.load('600 30px "Cinzel"'),
            document.fonts.load('30px "VT323"'),
            document.fonts.load('700 21px "Noto Serif Bengali"')
        ]).catch(() => {});

        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;
        const BN = '"Hind Siliguri", sans-serif';
        const HAND = '"Atma", "Hind Siliguri", cursive';
        const tier = model.tier || GCP.tierFor(model.total);
        const art = TIER_ART[tier.id];
        const burgundy = "#713c35";

        // ===== table background =====
        const bg = ctx.createRadialGradient(W / 2, H * 0.42, 80, W / 2, H / 2, H * 0.85);
        bg.addColorStop(0, art.bgA);
        bg.addColorStop(1, art.bgB);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);
        const glow = ctx.createRadialGradient(W / 2, H * 0.45, 20, W / 2, H * 0.45, 640);
        glow.addColorStop(0, art.glow);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
        // childhood things scattered on the table
        ctx.save();
        ctx.globalAlpha = 0.16;
        ctx.font = "64px serif";
        [["🪁", 70, 120, -0.3], ["🔮", 980, 150, 0.2], ["📻", 60, 1180, 0.15], ["🏮", 1000, 1210, -0.2], ["🪀", 990, 1060, 0], ["✉️", 80, 1040, -0.25]]
            .forEach(([e, x, y, r]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.fillText(e, -32, 22); ctx.restore(); });
        ctx.restore();

        // ===== heading =====
        ctx.textAlign = "center";
        ctx.fillStyle = foilGradient(ctx, 200, 0, 880, 0, art);
        ctx.font = `600 66px ${HAND}`;
        ctx.fillText(`${model.nickname}-এর শৈশবের পাসপোর্ট`.length > 26 ? "আমার শৈশবের পাসপোর্ট" : `${model.nickname}-এর শৈশবের পাসপোর্ট`, W / 2, 112, W - 120);
        // rank pill — the first thing people read in the feed
        const rankText = `${tier.icon || "✦"}  ${tier.rank || tier.name}  ·  লেভেল ${toBangla(tier.level || 1)}/${toBangla(GCP.TIER_COUNT || 4)}`;
        ctx.font = `600 34px ${HAND}`;
        const ew = Math.min(W - 160, ctx.measureText(rankText).width + 64);
        roundRect(ctx, W / 2 - ew / 2, 134, ew, 58, 29);
        ctx.fillStyle = foilGradient(ctx, W / 2 - ew / 2, 0, W / 2 + ew / 2, 0, art);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 250, 230, .6)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = art.ink;
        ctx.fillText(rankText, W / 2, 174, ew - 40);

        // ===== the open passport =====
        const PX = 44, PY = 252, PW = 992, PH = 776, half = PW / 2;
        ctx.save();
        ctx.translate(W / 2, PY + PH / 2);
        ctx.rotate(-0.012);
        ctx.translate(-W / 2, -(PY + PH / 2));

        // cover edges peeking out
        ctx.fillStyle = art.ink;
        roundRect(ctx, PX - 10, PY - 8, PW + 20, PH + 18, 16);
        ctx.shadowColor = "rgba(0,0,0,.55)";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 18;
        ctx.fill();
        ctx.shadowColor = "transparent";

        // keepsakes tucked between the pages (drawn behind them)
        drawKeepsakes(ctx, model.keepsakes || [], PX, PY, PW);

        // pages
        [0, 1].forEach((side) => {
            const x = PX + side * half;
            const g = ctx.createLinearGradient(0, PY, 0, PY + PH);
            g.addColorStop(0, art.page[0]);
            g.addColorStop(1, art.page[1]);
            ctx.fillStyle = g;
            roundRect(ctx, x, PY, half, PH, side ? 10 : 10);
            ctx.fill();
            // guilloche
            ctx.save();
            ctx.beginPath(); ctx.rect(x, PY, half, PH); ctx.clip();
            ctx.strokeStyle = "rgba(168, 138, 83, .1)";
            ctx.lineWidth = 1;
            for (let r = 20; r < 900; r += 11) { ctx.beginPath(); ctx.arc(x + half / 2, PY + PH + 120, r, 0, Math.PI * 2); ctx.stroke(); }
            ctx.restore();
        });
        // tea ring on the right page
        ctx.save();
        ctx.strokeStyle = "rgba(150, 100, 40, .13)";
        ctx.lineWidth = 7;
        ctx.beginPath(); ctx.ellipse(PX + half + 70, PY + PH - 150, 70, 66, 0.3, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();

        // spine shadow
        const spine = ctx.createLinearGradient(PX + half - 40, 0, PX + half + 40, 0);
        spine.addColorStop(0, "rgba(80,50,20,0)");
        spine.addColorStop(0.5, "rgba(80,50,20,.28)");
        spine.addColorStop(1, "rgba(80,50,20,0)");
        ctx.fillStyle = spine;
        ctx.fillRect(PX + half - 40, PY, 80, PH);

        // ----- LEFT PAGE -----
        const L = PX + 28;
        ctx.textAlign = "center";
        ctx.fillStyle = "#a88a53";
        ctx.font = `600 15px ${BN}`;
        ctx.fillText("গণ-শৈশব প্রজাতন্ত্র", PX + half / 2, PY + 34);
        ctx.fillStyle = burgundy;
        ctx.font = `700 17px ${BN}`;
        ctx.fillText("শৈশবের পাসপোর্ট · CHILDHOOD PASSPORT", PX + half / 2, PY + 58);

        // photo with hologram
        const phx = L, phy = PY + 84, phw = 176, phh = 220;
        ctx.save();
        ctx.translate(phx + phw / 2, phy + phh / 2);
        ctx.rotate(-0.04);
        ctx.fillStyle = "#fffaf0";
        ctx.shadowColor = "rgba(0,0,0,.25)"; ctx.shadowBlur = 14;
        ctx.fillRect(-phw / 2 - 8, -phh / 2 - 8, phw + 16, phh + 16);
        ctx.shadowColor = "transparent";
        const photo = await loadImage(model.photo);
        if (photo) ctx.drawImage(photo, -phw / 2, -phh / 2, phw, phh);
        else {
            ctx.fillStyle = "#d9c8a4"; ctx.fillRect(-phw / 2, -phh / 2, phw, phh);
            ctx.fillStyle = burgundy; ctx.font = `600 100px ${HAND}`; ctx.textAlign = "center";
            ctx.fillText(Array.from(model.nickname || "?")[0], 0, 36);
        }
        const holo = ctx.createLinearGradient(-phw / 2, -phh / 2, phw / 2, phh / 2);
        holo.addColorStop(0.2, "rgba(255,0,170,0)");
        holo.addColorStop(0.4, "rgba(255,0,170,.12)");
        holo.addColorStop(0.55, "rgba(0,220,255,.14)");
        holo.addColorStop(0.7, "rgba(255,230,0,.12)");
        holo.addColorStop(0.85, "rgba(255,230,0,0)");
        ctx.fillStyle = holo;
        ctx.fillRect(-phw / 2, -phh / 2, phw, phh);
        ctx.fillStyle = "rgba(214, 196, 150, .85)";
        ctx.fillRect(-44, -phh / 2 - 20, 88, 26);
        ctx.restore();

        // fields
        ctx.textAlign = "left";
        const fx = L + phw + 30;
        const fieldW = PX + half - 26 - fx;
        const fields = [
            ["ডাকনাম / Name", model.nickname, `600 34px ${HAND}`, "#1f3a6b"],
            ["যুগ / Generation", model.era ? model.era.label : "—", `700 21px "Noto Serif Bengali", ${BN}`, "#2a2017"],
            ["জন্মসাল", model.birthYear ? toBangla(model.birthYear) : "—", `700 21px "Noto Serif Bengali", ${BN}`, "#2a2017"],
            ["শৈশবের ঠিকানা", model.place || "—", `700 21px "Noto Serif Bengali", ${BN}`, "#2a2017"],
            ["পাসপোর্ট নং", model.number, `28px "VT323", monospace`, "#2c2318"]
        ];
        let fy = PY + 100;
        fields.forEach(([label, value, font, color]) => {
            ctx.fillStyle = "#7a5f38"; ctx.font = `600 15px ${BN}`; ctx.fillText(label, fx, fy);
            ctx.fillStyle = color; ctx.font = font; ctx.fillText(value, fx, fy + 30, fieldW);
            ctx.strokeStyle = "rgba(113, 60, 53, .25)"; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(fx, fy + 40); ctx.lineTo(fx + fieldW, fy + 40); ctx.stroke(); ctx.setLineDash([]);
            fy += 50;
        });

        // identity
        let iy = PY + 352;
        ctx.fillStyle = "rgba(113, 60, 53, .1)";
        roundRect(ctx, L, iy, half - 56, 104, 12); ctx.fill();
        ctx.fillStyle = burgundy; ctx.fillRect(L, iy, 5, 104);
        ctx.fillStyle = "#8a6f45"; ctx.font = `600 14px ${BN}`; ctx.fillText("শৈশবের পরিচয় · তুমি ছিলে", L + 20, iy + 26);
        ctx.fillStyle = burgundy; ctx.font = `600 32px ${HAND}`;
        ctx.fillText(`${model.identity.icon || "✦"} ${model.identity.title}`, L + 20, iy + 64, half - 90);
        ctx.fillStyle = "#6b5a44"; ctx.font = `500 15px ${BN}`;
        ctx.fillText(model.identity.second
            ? `সাথে: ${model.identity.second.icon} ${model.identity.second.title}`
            : model.identity.line, L + 20, iy + 90, half - 90);

        // experience meter ("অভিজ্ঞতার খতিয়ান")
        {
            const mx = L, my = PY + 470, mw = half - 56, mh = 86;
            const total = model.totalMemories || 84;
            const did = model.did || 0, saw = model.saw || 0;
            const accent = (GCP.JOURNEY.find((j) => j.id === model.identity.id) || {}).stampColor || burgundy;
            ctx.fillStyle = "rgba(255,255,255,.6)"; roundRect(ctx, mx, my, mw, mh, 12); ctx.fill();
            ctx.textAlign = "left";
            ctx.fillStyle = "#8a6f45"; ctx.font = `700 13px ${BN}`; ctx.fillText("অভিজ্ঞতার খতিয়ান", mx + 14, my + 22);
            ctx.fillStyle = accent; ctx.font = `800 40px ${BN}`; ctx.fillText(toBangla(did), mx + 14, my + 64);
            const nw = ctx.measureText(toBangla(did)).width;
            ctx.fillStyle = "#3a2d1e"; ctx.font = `600 15px ${BN}`;
            ctx.fillText("টা অভিজ্ঞতা নিজে করেছ", mx + 22 + nw, my + 50);
            ctx.fillStyle = "#6b5a44"; ctx.font = `500 13px ${BN}`;
            ctx.fillText(`${toBangla(total)}টার মধ্যে দেখেছ ${toBangla(model.answered || 0)}টা`, mx + 22 + nw, my + 68);
            // bar
            const bx0 = mx + 14, bw = mw - 28, byy = my + mh - 12;
            ctx.fillStyle = "rgba(113, 60, 53, .12)"; roundRect(ctx, bx0, byy - 6, bw, 8, 4); ctx.fill();
            ctx.fillStyle = accent; roundRect(ctx, bx0, byy - 6, Math.max(6, bw * did / total), 8, 4); ctx.fill();
            ctx.fillStyle = "rgba(168, 138, 83, .7)"; ctx.fillRect(bx0 + bw * did / total, byy - 6, bw * saw / total, 8);
        }
        ctx.textAlign = "left";

        // memory note
        if (model.memories[0]) {
            ctx.save();
            ctx.translate(L, PY + 566);
            ctx.rotate(-0.015);
            ctx.fillStyle = "#fffdf4"; ctx.fillRect(0, 0, half - 56, 96);
            ctx.strokeStyle = "rgba(199, 215, 232, 1)";
            for (let y = 30; y < 96; y += 26) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(half - 56, y); ctx.stroke(); }
            ctx.fillStyle = "#22324a"; ctx.font = `500 20px ${HAND}`;
            wrap(ctx, `“${model.memories[0].text}”`, 14, 26, half - 84, 26, 3);
            ctx.restore();
        }

        // MRZ
        const eraCode = model.era ? model.era.english.toUpperCase().replace(/[^A-Z0-9]/g, "") : "KID";
        ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.fillRect(PX, PY + PH - 84, half, 84);
        ctx.save();
        ctx.beginPath(); ctx.rect(PX, PY + PH - 84, half - 10, 84); ctx.clip();
        ctx.fillStyle = "#3a3328"; ctx.font = `22px "VT323", "Courier New", monospace`;
        ctx.fillText(`P<BGD<SHOISHOB<<${eraCode}<<GOLDEN<CHILDHOOD<<<<<`.slice(0, 40), L - 8, PY + PH - 50);
        ctx.fillText(`${model.number.replace("-", "")}<${model.birthYear || "0000"}<BGD<<SCORE${String(model.total).padStart(3, "0")}<<<<<<<<`.slice(0, 40), L - 8, PY + PH - 22);
        ctx.restore();

        // ----- RIGHT PAGE -----
        const R = PX + half + 26;
        const RW = half - 52;
        ctx.textAlign = "center";
        ctx.fillStyle = "#a88a53"; ctx.font = `600 15px ${BN}`; ctx.fillText("ভিসা ও স্ট্যাম্প", PX + half * 1.5, PY + 34);
        ctx.fillStyle = burgundy; ctx.font = `700 17px ${BN}`; ctx.fillText("VISAS · শৈশবের ১২টা জায়গা", PX + half * 1.5, PY + 58);

        // score box
        ctx.save();
        ctx.translate(R + 92, PY + 122);
        ctx.rotate(-0.05);
        ctx.strokeStyle = burgundy; ctx.lineWidth = 3;
        roundRect(ctx, -92, -46, 184, 92, 12); ctx.stroke();
        roundRect(ctx, -86, -40, 172, 80, 9); ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = burgundy; ctx.textAlign = "center";
        ctx.font = `700 66px ${BN}`; ctx.fillText(toBangla(model.total), -14, 24);
        ctx.font = `600 18px ${BN}`; ctx.fillText("/১০০", 56, 24);
        ctx.restore();
        ctx.textAlign = "left";
        ctx.fillStyle = "#8a6f45"; ctx.font = `600 13px ${BN}`; ctx.fillText("CHILDHOOD MEMORIES SCORE", R + 204, PY + 98);
        ctx.fillStyle = burgundy; ctx.font = `600 30px ${HAND}`; ctx.fillText(model.title.title, R + 204, PY + 134, RW - 204);
        ctx.fillStyle = "#a88a53"; ctx.font = `600 15px "Cinzel", serif`; ctx.fillText(model.title.english, R + 204, PY + 158, RW - 204);
        if (tier.level) {
            ctx.font = `700 15px ${BN}`;
            const lv = `${tier.icon} লেভেল ${toBangla(tier.level)}/${toBangla(GCP.TIER_COUNT || 4)} · ${tier.short}`;
            const lw2 = Math.min(RW - 204, ctx.measureText(lv).width + 22);
            roundRect(ctx, R + 204, PY + 168, lw2, 26, 13);
            ctx.fillStyle = burgundy; ctx.fill();
            ctx.fillStyle = "#fff8e8"; ctx.fillText(lv, R + 215, PY + 187, lw2 - 22);
        }

        // visa stamps 3 × 4
        const SHAPES = ["circle", "rect", "oval", "rect", "hex", "circle", "oval", "rect", "circle", "hex", "rect", "oval"];
        const visited = model.cats.filter((c) => c.percent !== null);
        const baseYear = model.birthYear ? model.birthYear + 6 : 1998;
        const cw = RW / 3, ch = 122, top = PY + 196;
        visited.forEach((cat, i) => {
            const cx = R + cw * (i % 3) + cw / 2 + (((i * 31) % 13) - 6);
            const cy = top + Math.floor(i / 3) * ch + ch / 2;
            const shape = SHAPES[i % SHAPES.length];
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(((((i * 47) % 23) - 11) * Math.PI) / 180);
            const w = shape === "circle" ? 112 : 132, h = shape === "circle" ? 112 : 104;
            ctx.strokeStyle = cat.color; ctx.fillStyle = cat.color;
            ctx.globalAlpha = 0.08; stampShape(ctx, shape, w, h); ctx.fill();
            ctx.globalAlpha = 0.9; ctx.lineWidth = 3; stampShape(ctx, shape, w, h); ctx.stroke();
            ctx.lineWidth = 1; stampShape(ctx, shape, w - 12, h - 12); ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.textAlign = "center";
            ctx.font = `700 10px ${BN}`; ctx.fillText("ভিসা মঞ্জুর", 0, -32);
            ctx.font = "24px serif"; ctx.fillText(cat.icon, 0, -6);
            ctx.font = `700 14px ${BN}`; ctx.fillText(cat.place, 0, 16, w - 20);
            ctx.font = `800 20px ${BN}`; ctx.fillText(`${toBangla(cat.percent)}%`, 0, 38);
            ctx.restore();
            // little ink speckles
            ctx.fillStyle = "rgba(255,250,235,.35)";
            for (let k = 0; k < 14; k++) ctx.fillRect(cx - 60 + Math.random() * 120, cy - 50 + Math.random() * 100, 2, 2);
        });
        ctx.textAlign = "left";

        // badges
        let bx = R; const by = top + 4 * ch + 10;
        model.badges.slice(0, 4).forEach((badge) => {
            ctx.font = `700 17px ${BN}`;
            const label = `${badge.icon} ${badge.name}`;
            const w = ctx.measureText(label).width + 26;
            if (bx + w > R + RW - 112) return; // one row, leave room for the seal
            roundRect(ctx, bx, by, w, 32, 16);
            if (badge.rarity === "legendary") {
                const g = ctx.createLinearGradient(bx, 0, bx + w, 0);
                g.addColorStop(0, "#713c35"); g.addColorStop(0.5, "#d9a54a"); g.addColorStop(1, "#713c35");
                ctx.fillStyle = g;
            } else ctx.fillStyle = badge.rarity === "rare" ? "#a88a53" : "#e2d3b1";
            ctx.fill();
            ctx.fillStyle = badge.rarity === "common" ? "#3a2d1e" : "#fff8e8";
            ctx.fillText(label, bx + 13, by + 22);
            bx += w + 8;
        });

        // tier seal
        ctx.save();
        ctx.translate(PX + PW - 70, PY + PH - 66);
        ctx.rotate(-0.2);
        const seal = ctx.createRadialGradient(-12, -14, 6, 0, 0, 48);
        seal.addColorStop(0, art.foil2); seal.addColorStop(0.6, art.foil); seal.addColorStop(1, "rgba(0,0,0,.35)");
        ctx.fillStyle = seal;
        ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = art.foil; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 52, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = art.ink; ctx.textAlign = "center";
        ctx.font = `600 24px ${HAND}`; ctx.fillText(tier.short, 0, 6);
        ctx.font = `700 9px "Cinzel", serif`; ctx.fillText(tier.edition.split(" ")[0], 0, 22);
        ctx.restore();

        ctx.restore(); // passport rotation

        // ===== bottom: challenge + website link + QR code =====
        const site = GCP.siteUrl ? GCP.siteUrl() : location.origin;
        const siteShort = site.replace(/^https?:\/\//, "").replace(/\/$/, "");
        ctx.textAlign = "left";
        ctx.fillStyle = "#fff3d6";
        ctx.font = `600 44px ${HAND}`;
        ctx.fillText(`আমার স্কোর ${toBangla(model.total)} — তোমার কত?`, 60, 1112, 760);
        drawLadder(ctx, tier, 60, 1128, 760);
        // link pill
        ctx.font = `700 24px ${BN}`;
        const linkText = `🔗 ${siteShort}`;
        const lw = Math.min(780, ctx.measureText(linkText).width + 40);
        roundRect(ctx, 56, 1186, lw, 50, 25);
        ctx.fillStyle = "rgba(255, 243, 214, .14)"; ctx.fill();
        ctx.strokeStyle = art.foil; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "#fff3d6";
        ctx.fillText(linkText, 76, 1220, lw - 40);
        ctx.fillStyle = "rgba(255, 243, 214, .7)";
        ctx.font = `500 20px ${BN}`;
        ctx.fillText("নিজের শৈশবের পাসপোর্ট বানাও · Every childhood has a story.", 60, 1282, 760);

        // QR code
        if (typeof qrcode === "function") {
            try {
                const qr = qrcode(0, "M");
                qr.addData(site);
                qr.make();
                const n = qr.getModuleCount();
                const size = 170, qx = W - size - 60, qy = 1080;
                ctx.fillStyle = "#fffaf0";
                roundRect(ctx, qx - 12, qy - 12, size + 24, size + 24, 14); ctx.fill();
                const cell = size / n;
                ctx.fillStyle = "#1a140f";
                for (let r = 0; r < n; r++) {
                    for (let c = 0; c < n; c++) {
                        if (qr.isDark(r, c)) ctx.fillRect(qx + c * cell, qy + r * cell, Math.ceil(cell), Math.ceil(cell));
                    }
                }
                ctx.textAlign = "center";
                ctx.fillStyle = "rgba(255, 243, 214, .8)";
                ctx.font = `600 18px ${BN}`;
                ctx.fillText("scan করে খেলো", qx + size / 2, qy + size + 40);
            } catch (e) { console.warn("[GCP] QR failed", e); }
        }

        return canvas;
    }

    async function download(canvas, model) {
        await drawCard(canvas, model);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        const filename = `shoishob-passport-${(model.nickname || "me").replace(/\s+/g, "-")}.png`;
        const link = document.createElement("a");
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 4000);
        return { blob, filename };
    }

    async function share(canvas, model) {
        const url = shareUrl(model);
        const lvl = model.tier && model.tier.level ? ` · লেভেল ${toBangla(model.tier.level)}/${toBangla(GCP.TIER_COUNT || 4)} ${model.tier.icon}` : "";
        const text = `আমার শৈশবের স্কোর ${toBangla(model.total)}/১০০${lvl} — "${model.title.title}"! তোমারটা কত? ✦`;

        if (navigator.share) {
            try {
                await drawCard(canvas, model);
                const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
                const file = new File([blob], "shoishob-passport.png", { type: "image/png" });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({ files: [file], text: text + "\n" + url, title: "শৈশবের পাসপোর্ট" });
                } else {
                    await navigator.share({ text, url, title: "শৈশবের পাসপোর্ট" });
                }
                return "shared";
            } catch (e) {
                if (e && e.name === "AbortError") return "cancelled";
            }
        }

        try {
            await navigator.clipboard.writeText(text + "\n" + url);
            return "copied";
        } catch (e) {
            window.prompt("লিংকটা কপি করে নাও:", url);
            return "prompted";
        }
    }

    return { encode, decode, shareUrl, drawCard, download, share };

})();
