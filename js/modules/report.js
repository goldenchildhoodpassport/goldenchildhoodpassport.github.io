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
            m: model.memories[0] ? model.memories[0].text.slice(0, 90) : ""
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
        const base = location.href.split("#")[0].replace(/[^/]*$/, "") + "passport.html";
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

    async function drawCard(canvas, model) {
        await Promise.all([
            document.fonts.load('600 70px "Atma"'),
            document.fonts.load('600 36px "Hind Siliguri"'),
            document.fonts.load('600 30px "Cinzel"')
        ]).catch(() => {});

        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;
        const BN = '"Hind Siliguri", sans-serif';
        const HAND = '"Atma", "Hind Siliguri", cursive';
        const burgundy = "#713c35";
        const gold = "#a88a53";

        // paper
        ctx.fillStyle = "#efe3c6";
        ctx.fillRect(0, 0, W, H);
        const glow = ctx.createRadialGradient(W * 0.3, H * 0.2, 50, W / 2, H / 2, W);
        glow.addColorStop(0, "rgba(255,255,255,.55)");
        glow.addColorStop(1, "rgba(120,80,30,.18)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // frame
        ctx.strokeStyle = burgundy;
        ctx.lineWidth = 4;
        ctx.strokeRect(34, 34, W - 68, H - 68);
        ctx.strokeStyle = gold;
        ctx.lineWidth = 2;
        ctx.strokeRect(48, 48, W - 96, H - 96);

        // heading
        ctx.textAlign = "center";
        ctx.fillStyle = gold;
        ctx.font = `600 28px ${BN}`;
        ctx.fillText("গণ-শৈশব প্রজাতন্ত্র  ·  CHILDHOOD PASSPORT", W / 2, 112);
        ctx.fillStyle = burgundy;
        ctx.font = `600 78px ${HAND}`;
        ctx.fillText("শৈশবের পাসপোর্ট", W / 2, 196);

        // photo
        const px = 92, py = 252, pw = 290, ph = 362;
        ctx.save();
        ctx.translate(px + pw / 2, py + ph / 2);
        ctx.rotate(-0.035);
        ctx.fillStyle = "#fffaf0";
        ctx.shadowColor = "rgba(0,0,0,.25)";
        ctx.shadowBlur = 18;
        ctx.fillRect(-pw / 2 - 12, -ph / 2 - 12, pw + 24, ph + 24);
        ctx.shadowBlur = 0;
        const photo = await loadImage(model.photo);
        if (photo) {
            ctx.drawImage(photo, -pw / 2, -ph / 2, pw, ph);
        } else {
            ctx.fillStyle = "#d9c8a4";
            ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
            ctx.fillStyle = burgundy;
            ctx.font = `600 150px ${HAND}`;
            ctx.fillText(Array.from(model.nickname || "?")[0], 0, 50);
        }
        ctx.fillStyle = "rgba(214, 196, 150, .85)";
        ctx.fillRect(-60, -ph / 2 - 26, 120, 34);
        ctx.restore();

        // identity
        ctx.textAlign = "left";
        const ix = 430;
        ctx.fillStyle = "#8a6f45";
        ctx.font = `500 26px ${BN}`;
        ctx.fillText("ডাকনাম", ix, 290);
        ctx.fillStyle = "#1f3a6b";
        ctx.font = `600 66px ${HAND}`;
        ctx.fillText(model.nickname, ix, 360, 380);
        ctx.fillStyle = "#3a2d1e";
        ctx.font = `600 34px ${BN}`;
        ctx.fillText(model.era ? model.era.label : "শৈশবের যাত্রী", ix, 418);
        if (model.place) {
            ctx.fillStyle = "#6b5a44";
            ctx.font = `500 28px ${BN}`;
            ctx.fillText("📍 " + model.place, ix, 462);
        }

        // score stamp
        const sx = 905, sy = 345, sr = 86;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(-0.12);
        ctx.strokeStyle = burgundy;
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.arc(0, 0, sr, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(0, 0, sr - 12, 0, Math.PI * 2); ctx.stroke();
        ctx.textAlign = "center";
        ctx.fillStyle = burgundy;
        ctx.font = `700 72px ${BN}`;
        ctx.fillText(toBangla(model.total), 0, 18);
        ctx.font = `600 20px ${BN}`;
        ctx.fillText("/ ১০০ · স্কোর", 0, 52);
        ctx.restore();

        ctx.textAlign = "left";
        ctx.fillStyle = burgundy;
        ctx.font = `600 44px ${HAND}`;
        ctx.fillText(model.title.title, ix, 530);
        ctx.fillStyle = "#8a6f45";
        ctx.font = `600 24px "Cinzel", serif`;
        ctx.fillText(model.title.english.toUpperCase(), ix, 568);
        ctx.fillStyle = "#6b5a44";
        ctx.font = `500 25px ${BN}`;
        wrap(ctx, model.title.line, ix, 612, W - ix - 100, 34, 2);

        // stamps 6 × 2
        ctx.textAlign = "center";
        const cols = 6, r = 62, gx = (W - 140) / cols, top = 730;
        model.cats.forEach((cat, i) => {
            const cx = 70 + gx * (i % cols) + gx / 2;
            const cy = top + Math.floor(i / cols) * 168;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(((i * 37) % 17 - 8) / 60);
            const visited = cat.percent !== null;
            ctx.globalAlpha = visited ? 0.55 + Math.min(cat.percent, 100) / 250 : 0.3;
            ctx.strokeStyle = visited ? cat.color : "#9a8a70";
            ctx.lineWidth = 4;
            ctx.setLineDash(visited ? [] : [6, 6]);
            ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(0, 0, r - 9, 0, Math.PI * 2); ctx.stroke();
            ctx.font = "44px serif";
            ctx.fillStyle = "#000";
            ctx.fillText(cat.icon, 0, 8);
            ctx.fillStyle = visited ? cat.color : "#9a8a70";
            ctx.font = `700 22px ${BN}`;
            ctx.fillText(visited ? toBangla(cat.percent) + "%" : "—", 0, 44);
            ctx.restore();
            ctx.fillStyle = "#5a4a36";
            ctx.font = `500 19px ${BN}`;
            ctx.fillText(cat.place, cx, cy + r + 28);
        });

        // badges
        let bx = 86;
        const by = 1060;
        ctx.textAlign = "left";
        model.badges.slice(0, 3).forEach((badge) => {
            ctx.font = `600 26px ${BN}`;
            const label = `${badge.icon} ${badge.name}`;
            const w = ctx.measureText(label).width + 40;
            if (bx + w > W - 80) return;
            roundRect(ctx, bx, by - 36, w, 52, 26);
            ctx.fillStyle = badge.rarity === "legendary" ? "#713c35" : badge.rarity === "rare" ? "#a88a53" : "#e2d3b1";
            ctx.fill();
            ctx.fillStyle = badge.rarity === "common" ? "#3a2d1e" : "#fff8e8";
            ctx.fillText(label, bx + 20, by - 1);
            bx += w + 14;
        });

        // memory quote
        if (model.memories[0]) {
            ctx.fillStyle = "#1f3a6b";
            ctx.font = `500 30px ${HAND}`;
            wrap(ctx, `“${model.memories[0].text}”`, 92, 1140, W - 184, 42, 2);
        }

        // footer
        ctx.textAlign = "center";
        ctx.fillStyle = burgundy;
        ctx.font = `600 30px "Cormorant Garamond", serif`;
        ctx.fillText("Every childhood has a story.", W / 2, 1236);
        ctx.fillStyle = "#8a6f45";
        ctx.font = `500 24px ${BN}`;
        ctx.fillText("তোমার শৈশবের স্কোর কত? · Golden Childhood Passport", W / 2, 1274);

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
        const text = `আমার শৈশবের স্কোর ${toBangla(model.total)}/১০০ — "${model.title.title}"! তোমারটা কত? ✦`;

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
