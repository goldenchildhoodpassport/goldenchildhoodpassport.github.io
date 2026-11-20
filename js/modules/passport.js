/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   CHAPTER 03 — THE PASSPORT
   ------------------------------------------
   1. photo step (optional)
   2. closed passport → tap to open
   3. stamps land one by one
   4. score hidden under a Flexiload-style
      scratch card → "ঘষে দেখো"
   5. download / share / detail view
   Shared links (#p=...) open a friend's
   passport and compare it with yours.
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const { toBangla, wait, escapeHtml, reducedMotion, hash } = GCP.helpers;
    const $ = (id) => document.getElementById(id);

    const SETTING_BN = { Village: "গ্রাম", Town: "মফস্বল", City: "শহর", Both: "গ্রাম ও শহর" };
    const BN_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

    const settings = GCP.storage.getSettings();
    const exportCanvas = $("exportCanvas");

    // ======================================
    // 1. BUILD THE PASSPORT MODEL
    // ======================================

    function catsFrom(percents, answeredCounts) {
        return GCP.JOURNEY.map((stop, i) => ({
            id: stop.id,
            place: stop.place,
            icon: stop.icon,
            color: stop.stampColor,
            percent: percents[i] === undefined || percents[i] < 0 ? null : percents[i],
            answered: answeredCounts ? answeredCounts[i] : 0
        }));
    }

    function ownModel() {
        const profile = GCP.storage.getProfile() || {};
        const journey = GCP.storage.getJourney();
        const answers = journey.answers || {};
        const birthYear = profile.birthYear || (profile.dateOfBirth ? Number(profile.dateOfBirth.slice(0, 4)) : null);
        const result = GCP.scoring.compute(answers, birthYear);
        const nickname = (profile.nickname || profile.name || "শৈশবের যাত্রী").trim();
        const questions = {};
        (window.GCP_QUESTIONS || []).forEach((q) => { questions[q.id] = q; });

        const memories = Object.keys(answers)
            .filter((id) => answers[id] && answers[id].memory && answers[id].memory.trim().length > 3 && questions[id])
            .map((id) => ({ id, text: answers[id].memory.trim(), question: questions[id].question, stop: questions[id].categoryId }));

        // how many memories were lived, only seen, or not possible
        let did = 0, saw = 0, none = 0;
        Object.keys(answers).forEach((id) => {
            const q = questions[id];
            const a = answers[id];
            if (!q || !a || !a.v) return;
            const index = q.options.findIndex((o) => o.value === a.v);
            const option = q.options[index];
            if (!option) return;
            if (option.score === null) none++;
            else if (option.score >= 2) did++;
            else if (index === 3) saw++;
        });

        return {
            own: true,
            did, saw, none,
            totalMemories: (window.GCP_QUESTIONS || []).length,
            nickname,
            birthYear,
            era: GCP.generation.describe(birthYear),
            place: profile.childhoodLocation || "",
            setting: profile.childhoodSetting || "",
            number: "GCP-" + hash(nickname + birthYear + (profile.createdAt || "")).slice(0, 7).padEnd(7, "0"),
            issued: new Date(),
            total: result.total,
            answered: result.answered,
            title: GCP.titleFor(result.total),
            cats: catsFrom(
                GCP.JOURNEY.map((stop) => result.byCategory[stop.id].percent ?? -1),
                GCP.JOURNEY.map((stop) => result.byCategory[stop.id].answered)
            ),
            badges: GCP.badgeEngine.evaluate(answers, result, profile),
            memories,
            photo: GCP.storage.getPhoto()
        };
    }

    function finishModel(model) {
        model.tier = GCP.tierFor(model.total);
        model.identity = GCP.identityFor(model.cats);
        model.keepsakes = GCP.keepsakesFor(model, 3);
        return model;
    }

    function sharedModel(data) {
        return {
            own: false,
            nickname: String(data.n || "বন্ধু").slice(0, 30),
            birthYear: data.y || null,
            era: GCP.generation.describe(data.y || null),
            place: String(data.l || "").slice(0, 60),
            setting: data.s || "",
            number: "GCP-" + hash(String(data.n) + data.y).slice(0, 7).padEnd(7, "0"),
            issued: new Date(),
            total: Math.max(0, Math.min(100, Math.round(data.t))),
            title: GCP.titleFor(data.t),
            cats: catsFrom(Array.isArray(data.c) ? data.c : []),
            badges: (Array.isArray(data.b) ? data.b : []).map(GCP.badgeEngine.byId).filter(Boolean),
            memories: data.m ? [{ text: String(data.m).slice(0, 90) }] : [],
            photo: null,
            answered: data.a || 0,
            did: data.e || 0,
            saw: data.w || 0,
            totalMemories: (window.GCP_QUESTIONS || []).length || 84
        };
    }

    // ======================================
    // 2. STEPS
    // ======================================

    const steps = { empty: $("emptyStep"), photo: $("photoStep"), reveal: $("revealStep") };
    function show(name) {
        Object.entries(steps).forEach(([key, node]) => { node.hidden = key !== name; });
        window.scrollTo({ top: 0, behavior: "auto" });
    }

    // ======================================
    // 3. PHOTO STEP
    // ======================================

    let cropper = null;

    function openPhotoStep(model) {
        show("photo");
        if (cropper) return;
        cropper = GCP.photoUpload({
            canvas: $("cropCanvas"),
            input: $("photoInput"),
            zoom: $("zoomRange"),
            onReady: () => {
                $("cropEmpty").hidden = true;
                $("zoomRow").hidden = false;
                $("cropHint").hidden = false;
                $("changePhoto").hidden = false;
                $("usePhoto").disabled = false;
            }
        });

        $("usePhoto").addEventListener("click", () => {
            const data = cropper.export();
            if (data && !GCP.storage.savePhoto(data)) {
                alert("ছবিটা সেভ করা গেল না — ব্রাউজারের জায়গা কম। ছবি ছাড়াই চলো।");
            }
            GCP.storage.saveSettings(Object.assign(GCP.storage.getSettings(), { photoDone: true }));
            model.photo = GCP.storage.getPhoto();
            startReveal(model);
        });

        $("skipPhoto").addEventListener("click", () => {
            GCP.storage.saveSettings(Object.assign(GCP.storage.getSettings(), { photoDone: true }));
            startReveal(model);
        });
    }

    // ======================================
    // 4. FILL THE PASSPORT PAGES
    // ======================================

    function mrzLine(text) {
        return (text + "<".repeat(44)).slice(0, 44);
    }

    function fillPassport(model) {
        $("fName").textContent = model.nickname;
        $("fSign").textContent = model.nickname;
        $("fEra").textContent = model.era ? `${model.era.label} (${model.era.english})` : "—";
        $("fYear").textContent = model.birthYear ? toBangla(model.birthYear) : "—";
        $("fPlace").textContent = model.place || "—";
        $("fSetting").textContent = SETTING_BN[model.setting] || "—";
        $("fPlace").parentElement.hidden = !model.place;
        $("fSetting").parentElement.hidden = !SETTING_BN[model.setting];
        $("fNumber").textContent = model.number;
        const d = model.issued;
        $("fIssued").textContent = `${toBangla(d.getDate())} ${BN_MONTHS[d.getMonth()]} ${toBangla(d.getFullYear())}`;

        const eraCode = model.era ? model.era.english.toUpperCase().replace(/[^A-Z0-9]/g, "") : "KID";
        $("mrz").innerHTML = [
            mrzLine(`P<BGD<SHOISHOB<<${eraCode}<<GOLDEN<CHILDHOOD`),
            mrzLine(`${model.number.replace("-", "")}<${model.birthYear || "0000"}<BGD<<SCORE${String(model.total).padStart(3, "0")}`)
        ].map((line) => `<span>${escapeHtml(line)}</span>`).join("");

        const photo = $("ppPhoto");
        photo.querySelectorAll("img, .pp-photo-initial").forEach((n) => n.remove());
        if (model.photo) {
            const img = document.createElement("img");
            img.src = model.photo;
            img.alt = model.nickname + "-এর ছবি";
            photo.prepend(img);
        } else {
            const initial = document.createElement("span");
            initial.className = "pp-photo-initial";
            initial.textContent = Array.from(model.nickname)[0] || "?";
            photo.prepend(initial);
        }

        $("titleBn").textContent = model.title.title;
        $("titleEn").textContent = model.title.english;
        $("scoreValue").textContent = toBangla(0);

        // ----- tier: cover colour, ribbon, seal -----
        const book = $("book");
        GCP.TIERS.forEach((t) => book.classList.remove("tier-" + t.id));
        book.classList.add("tier-" + model.tier.id);
        document.body.dataset.tier = model.tier.id;
        $("coverEdition").textContent = model.tier.edition;
        $("ribbon").textContent = model.tier.edition;
        $("sealText").innerHTML = `${model.tier.short}<small>${model.tier.edition.split(" ")[0]}</small>`;
        // ----- level chip next to the score: "🌱 লেভেল ১/৪ · সবুজ" + 4 dots -----
        const levelChip = $("levelChip");
        if (levelChip) {
            const dots = GCP.tierLadder().map((t) => `<i class="${t.level <= model.tier.level ? "on" : ""}"></i>`).join("");
            levelChip.innerHTML = `<b>${model.tier.icon} লেভেল ${toBangla(model.tier.level)}/${toBangla(GCP.TIER_COUNT)}</b>`
                + `<span>${escapeHtml(model.tier.short)} · ${escapeHtml(model.tier.rank)}</span><em aria-hidden="true">${dots}</em>`;
        }

        // ----- "তুমি ছিলে…" -----
        $("identityTitle").textContent = `${model.identity.icon || "✦"} ${model.identity.title}`;
        book.style.setProperty("--accent", (GCP.JOURNEY.find((j) => j.id === model.identity.id) || {}).stampColor || "#713c35");
        $("identityLine").textContent = model.identity.line;
        if ($("identitySecond")) $("identitySecond").hidden = !model.identity.second;
        if (model.identity.second && $("identitySecond")) {
            $("identitySecond").textContent = `সাথে: ${model.identity.second.icon} ${model.identity.second.title}`;
        }

        // ----- childhood stats + a memory note -----
        const visitedCount = model.cats.filter((c) => c.percent !== null).length;
        const total = model.totalMemories || 84;
        if ($("exp")) {
        const did = model.did || 0;
        const saw = model.saw || 0;
        const explored = model.answered || 0;
        const left = Math.max(0, total - did - saw);
        $("expDid").textContent = toBangla(did);
        $("barDid").style.width = (did / total * 100).toFixed(1) + "%";
        $("barSaw").style.width = (saw / total * 100).toFixed(1) + "%";
        $("expLegend").innerHTML = `
            <li><b class="did"></b>নিজে করেছ <strong>${toBangla(did)}</strong></li>
            <li><b class="saw"></b>শুধু দেখেছ <strong>${toBangla(saw)}</strong></li>
            <li><b class="left"></b>বাকি <strong>${toBangla(left)}</strong></li>`;
        $("expLine").innerHTML = `মোট <b>${toBangla(total)}টা</b> স্মৃতির মধ্যে ঘুরে দেখেছ <b>${toBangla(explored)}টা</b> · ভিসা <b>${toBangla(visitedCount)}/১২</b> · ব্যাজ <b>${toBangla(model.badges.length)}/${toBangla(GCP.BADGES.length)}</b> · নিজের গল্প <b>${toBangla(model.memories.length)}</b>`;
        $("exp").style.setProperty("--accent", (GCP.JOURNEY.find((j) => j.id === model.identity.id) || {}).stampColor || "#713c35");
        }

        // ----- visa stamps: real-looking ink stamps -----
        const SHAPES = ["circle", "rect", "oval", "rect", "hex", "circle", "oval", "rect", "circle", "hex", "rect", "oval"];
        const baseYear = model.birthYear ? model.birthYear + 6 : 1998;
        const visited = model.cats.filter((c) => c.percent !== null);
        $("stamps").innerHTML = visited.map((cat, i) => {
            const rot = ((i * 47) % 23) - 11;
            const dx = ((i * 31) % 13) - 6;
            const year = toBangla(baseYear + (i % 7));
            const best = cat.id === model.identity.id;
            const size = (0.84 + Math.min(cat.percent, 100) / 100 * 0.3).toFixed(2);
            const ink = (0.62 + Math.min(cat.percent, 100) / 100 * 0.38).toFixed(2);
            return `<li class="pp-visa s-${SHAPES[i % SHAPES.length]}${best ? " is-special" : ""}" style="--c:${best ? "#a8741f" : cat.color};--r:${rot}deg;--dx:${dx}px;--d:${i * 120}ms;--s:${size};--ink:${ink};z-index:${(i * 7) % 5 + 1}">
                <span class="pp-visa-ink">
                    <span class="pp-visa-top">${best ? "★ বিশেষ ভিসা ★" : "ভিসা মঞ্জুর"}</span>
                    <span class="pp-visa-icon">${cat.icon}</span>
                    <strong class="pp-visa-place">${escapeHtml(cat.place)}</strong>
                    <span class="pp-visa-pct">${toBangla(cat.percent)}%</span>
                    <span class="pp-visa-date">${year}</span>
                </span>
            </li>`;
        }).join("");
        const missing = model.cats.length - visited.length;
        $("missingPlaces").hidden = missing === 0;
        $("missingPlaces").textContent = `আরও ${toBangla(missing)}টা জায়গার ভিসা এখনো বাকি`;

        // ----- badges + the ones you don't have yet -----
        const earned = model.badges.slice(0, 4).map((b, i) =>
            `<span class="pp-badge pp-${b.rarity}" style="--d:${i * 140}ms" title="${escapeHtml(b.why)}">${b.icon} ${escapeHtml(b.name)}</span>`
        ).join("");
        const extra = model.badges.length > 4 ? `<span class="pp-badge pp-more" style="--d:600ms">+${toBangla(model.badges.length - 4)}টা</span>` : "";
        const lockedCount = GCP.BADGES.length - model.badges.length;
        const locked = model.own && lockedCount > 0
            ? `<span class="pp-badge pp-locked-chip" style="--d:700ms">🔒 আরও ${toBangla(lockedCount)}টা লুকানো</span>`
            : "";
        $("badgeRow").innerHTML = earned + extra + locked;

        // ----- keepsakes tucked between the pages -----
        $("tucked").innerHTML = model.keepsakes.map((k, i) => `
            <div class="ks ks-${k.type} ks-slot-${i}" title="${escapeHtml(k.why)}">
                ${k.lines.map((l, j) => `<span class="ks-l${j}">${escapeHtml(l)}</span>`).join("")}
            </div>`).join("");

        fillExtras(model);
    }

    // ======================================
    // 4b. PAGE DETAILS: ghost photo, perforation, UV ink,
    //     memory album, badge book
    // ======================================

    function fillExtras(model) {
        if (!$("ppGhost") || !$("uvLeft") || !$("albumGrid") || !$("coins")) {
            console.warn("[GCP] passport.html is older than passport.js — replace passport.html too.");
            return;
        }
        // ghost image (small faded copy, like a real passport)
        const ghost = $("ppGhost");
        ghost.innerHTML = model.photo
            ? `<img src="${model.photo}" alt="">`
            : `<span>${escapeHtml(Array.from(model.nickname)[0] || "?")}</span>`;

        // perforated number
        $("perf").textContent = model.number.replace("-", "");

        // ---- hidden UV ink ----
        const id = model.identity;
        $("uvLeft").innerHTML = `
            <svg class="uv-kite" viewBox="0 0 80 120"><path d="M40 4 L70 40 L40 80 L10 40 Z M40 4 V80 M10 40 H70 M40 80 q10 12 0 22 q-10 10 4 16"/></svg>
            <p class="uv-label">গোপন তথ্য · UV ONLY</p>
            <p class="uv-big">${escapeHtml(model.nickname)}</p>
            <p class="uv-text">সবচেয়ে উজ্জ্বল স্মৃতি: ${id.icon || ""} ${escapeHtml(id.place || "")} ${id.percent != null ? toBangla(id.percent) + "%" : ""}</p>
            <p class="uv-text">এই পাসপোর্টের মালিক একজন আসল<br><b>${escapeHtml(id.title)}</b></p>`;
        $("uvRight").innerHTML = `
            <svg class="uv-emblem" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="34"/><path d="M50 16 L57 43 L84 50 L57 57 L50 84 L43 57 L16 50 L43 43 Z"/></svg>
            <p class="uv-big">শৈশব কখনো শেষ হয় না</p>
            <p class="uv-text">${escapeHtml(model.tier.edition)} · ${escapeHtml(model.number)}</p>
            <i class="uv-fly" style="left:20%;top:70%"></i><i class="uv-fly" style="left:75%;top:20%"></i>
            <i class="uv-fly" style="left:60%;top:80%"></i><i class="uv-fly" style="left:30%;top:30%"></i>`;

        // ---- page 3: memory album ----
        const top4 = model.cats.filter((c) => c.percent !== null)
            .sort((a, b) => b.percent - a.percent).slice(0, 4);
        $("albumGrid").innerHTML = top4.map((c, i) => `
            <figure class="pp-pol" style="--r:${[-4, 3, -2, 5][i]}deg">
                <div class="sc" data-scene="${(GCP.JOURNEY.find((j) => j.id === c.id) || { core: [] }).core[0] || ""}"></div>
                <figcaption>${c.icon} ${escapeHtml(c.place)} · ${toBangla(c.percent)}%</figcaption>
            </figure>`).join("");
        $("albumGrid").querySelectorAll(".sc").forEach((box) => {
            if (box.dataset.scene) {
                GCP.scene.render(box, box.dataset.scene);
                box.querySelectorAll(".sc-caption, .sc-replay").forEach((n) => n.remove());
            }
        });
        $("albumGrid").addEventListener("click", (e) => {
            const box = e.target.closest(".sc");
            if (box) GCP.scene.poke(box);
        });

        const notes = model.memories.slice(0, 3);
        $("albumNotes").innerHTML = notes.length
            ? notes.map((m, i) => `
                <blockquote class="pp-note" style="--r:${[-1.5, 1, -0.5][i]}deg">
                    ${m.question ? `<small>${escapeHtml(m.question)}</small>` : ""}
                    “${escapeHtml(m.text)}”<cite>— ${escapeHtml(model.nickname)}</cite>
                </blockquote>`).join("")
            : `<p class="pp-album-empty">${model.own
                ? "এখনো নিজের কোনো গল্প লেখা হয়নি। প্রশ্নের নিচে ✎ চাপলে গল্প লেখা যায় — এখানে চিরকুট হয়ে লেগে থাকবে।"
                : "এই পাসপোর্টে কোনো গল্প লেখা নেই।"}</p>`;

        // ---- "আমার পছন্দ" from the this-or-that moments ----
        const prefs = model.own ? Object.values(GCP.storage.getJourney().prefs || {}).flat() : [];
        if ($("prefs")) $("prefs").hidden = !prefs.length;
        if ($("prefs")) $("prefs").innerHTML = prefs.length
            ? `<p class="pp-album-sub">আমার পছন্দ</p><div>${prefs.map((p) => `<span>${p.e} ${escapeHtml(p.label)}</span>`).join("")}</div>`
            : "";

        // ---- page 4: badge book (coins) ----
        const earnedIds = new Set(model.badges.map((b) => b.id));
        const RARITY = { legendary: "কিংবদন্তি", rare: "বিরল", common: "সাধারণ" };
        $("badgeCount").innerHTML = `<b>${toBangla(model.badges.length)}</b> / ${toBangla(GCP.BADGES.length)}টা ব্যাজ জমা হয়েছে`;
        $("coins").innerHTML = GCP.BADGES.map((b) => {
            const got = earnedIds.has(b.id);
            return `<li class="pp-coin pp-coin-${b.rarity}${got ? "" : " is-locked"}" title="${got ? escapeHtml(b.why) : "এখনো পাওয়া যায়নি"}">
                <span class="pp-coin-face">${got ? b.icon : "?"}</span>
                <strong>${got ? escapeHtml(b.name) : "???"}</strong>
                <small>${RARITY[b.rarity]}</small>
            </li>`;
        }).join("");
    }

    // ======================================
    // 4c. TURN THE PAGES
    // ======================================

    let pageIndex = 0;
    function turnTo(target) {
        const spreads = [$("spread"), $("spread2")];
        if (target === pageIndex || !spreads[target]) return;
        const from = spreads[pageIndex];
        const to = spreads[target];
        const forward = target > pageIndex;
        GCP.sound.play("pageFlip");
        if (reducedMotion()) {
            from.hidden = true; to.hidden = false;
        } else {
            from.classList.add(forward ? "turn-out-fwd" : "turn-out-back");
            setTimeout(() => {
                from.hidden = true;
                from.classList.remove("turn-out-fwd", "turn-out-back");
                to.hidden = false;
                to.classList.add(forward ? "turn-in-fwd" : "turn-in-back");
                setTimeout(() => to.classList.remove("turn-in-fwd", "turn-in-back"), 650);
            }, 420);
        }
        pageIndex = target;
        $("prevPage").disabled = pageIndex === 0;
        $("nextPage").disabled = pageIndex === spreads.length - 1;
        if (pageIndex !== 0) setUv(false);
        $("uvBtn").disabled = pageIndex !== 0;
    }
    if ($("nextPage")) $("nextPage").addEventListener("click", () => turnTo(pageIndex + 1));
    if ($("prevPage")) $("prevPage").addEventListener("click", () => turnTo(pageIndex - 1));

    // ======================================
    // 4d. UV TORCH
    // ======================================

    const uv = $("uv");
    function setUv(on) {
        if (!uv) return;
        $("book").classList.toggle("uv-on", on);
        $("uvBtn").setAttribute("aria-pressed", String(on));
        $("uvBtn").textContent = on ? "🔦 UV আলো বন্ধ" : "🔦 UV আলো ফেলো";
        if (on) {
            GCP.sound.play("sparkle");
            $("spread").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
            // sweep once across the page so people see what it does
            const start = performance.now();
            (function sweep(now) {
                const t = Math.min(1, (now - start) / 1600);
                if (!$("book").classList.contains("uv-on") || uv.dataset.touched) return;
                uv.style.setProperty("--ux", (15 + 70 * t) + "%");
                uv.style.setProperty("--uy", (40 + 20 * Math.sin(t * Math.PI)) + "%");
                if (t < 1) requestAnimationFrame(sweep);
            })(start);
        }
    }
    if ($("uvBtn")) $("uvBtn").addEventListener("click", () => {
        uv.dataset.touched = "";
        delete uv.dataset.touched;
        setUv(!$("book").classList.contains("uv-on"));
    });
    function moveUv(x, y) {
        const r = $("spread").getBoundingClientRect();
        uv.dataset.touched = "1";
        uv.style.setProperty("--ux", ((x - r.left) / r.width * 100).toFixed(1) + "%");
        uv.style.setProperty("--uy", ((y - r.top) / r.height * 100).toFixed(1) + "%");
    }
    if (uv) $("spread").addEventListener("pointermove", (e) => { if ($("book").classList.contains("uv-on")) moveUv(e.clientX, e.clientY); });
    if (uv) $("spread").addEventListener("touchmove", (e) => {
        if ($("book").classList.contains("uv-on") && e.touches[0]) { moveUv(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }
    }, { passive: false });

    // ======================================
    // 4e. PHONE TILT → hologram + foil move
    // ======================================

    function startTilt() {
        const book = $("book");
        const handler = (e) => {
            if (e.gamma == null || !book.classList.contains("open")) return;
            const x = Math.max(-1, Math.min(1, e.gamma / 25));
            const y = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
            book.style.setProperty("--tx", (x * 5).toFixed(2) + "deg");
            book.style.setProperty("--ty", (-y * 4).toFixed(2) + "deg");
            book.style.setProperty("--lx", ((x + 1) * 50).toFixed(1) + "%");
            book.style.setProperty("--ly", ((y + 1) * 50).toFixed(1) + "%");
        };
        window.addEventListener("deviceorientation", handler, { passive: true });
    }
    function askTilt() {
        // iPhone needs permission, and only after a tap
        if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission().then((state) => { if (state === "granted") startTilt(); }).catch(() => {});
        } else if (window.DeviceOrientationEvent) {
            startTilt();
        }
    }

    // ----- the passport catches the light as you move -----
    (function tilt() {
        const book = $("book");
        if (!book || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
        book.addEventListener("pointermove", (e) => {
            if (!book.classList.contains("open")) return;
            const r = book.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            book.style.setProperty("--tx", (x * 6).toFixed(2) + "deg");
            book.style.setProperty("--ty", (-y * 5).toFixed(2) + "deg");
            book.style.setProperty("--lx", ((x + 0.5) * 100).toFixed(1) + "%");
            book.style.setProperty("--ly", ((y + 0.5) * 100).toFixed(1) + "%");
        });
        book.addEventListener("pointerleave", () => {
            book.style.setProperty("--tx", "0deg");
            book.style.setProperty("--ty", "0deg");
        });
    })();

    // ======================================
    // 5. SCRATCH CARD (like a Flexiload card)
    // ======================================

    function setupScratch(onDone) {
        const canvas = $("scratch");
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;

        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#b9bec4");
        grad.addColorStop(0.5, "#eef1f3");
        grad.addColorStop(1, "#9ea5ab");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 600; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25})`;
            ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
        }
        ctx.fillStyle = "#4a5056";
        ctx.textAlign = "center";
        ctx.font = '600 26px "Hind Siliguri", sans-serif';
        ctx.fillText("ঘষে দেখো 🪙", w / 2, h / 2 + 2);
        ctx.font = '500 15px "Hind Siliguri", sans-serif';
        ctx.fillText("তোমার শৈশবের স্কোর", w / 2, h / 2 + 30);

        let done = false;
        let scratching = false;
        let strokes = 0;

        function finish() {
            if (done) return;
            done = true;
            canvas.classList.add("cleared");
            setTimeout(() => { canvas.hidden = true; }, 500);
            onDone();
        }

        function percentCleared() {
            const data = ctx.getImageData(0, 0, w, h).data;
            let clear = 0;
            for (let i = 3; i < data.length; i += 4 * 16) if (data[i] === 0) clear++;
            return clear / (data.length / (4 * 16));
        }

        function scratchAt(event) {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) * (w / rect.width);
            const y = (event.clientY - rect.top) * (h / rect.height);
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.fill();
            if (++strokes % 6 === 0) GCP.sound.play("scratch");
            if (strokes % 10 === 0 && percentCleared() > 0.4) finish();
        }

        canvas.addEventListener("pointerdown", (e) => { scratching = true; canvas.setPointerCapture(e.pointerId); scratchAt(e); });
        canvas.addEventListener("pointermove", (e) => { if (scratching) scratchAt(e); });
        canvas.addEventListener("pointerup", () => { scratching = false; });
        canvas.addEventListener("dblclick", finish);
        canvas.tabIndex = 0;
        canvas.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") finish(); });

        // nudge if nobody scratches
        setTimeout(() => { if (!done) canvas.classList.add("wiggle"); }, 5000);
        return { finish };
    }

    function countUp(target) {
        const node = $("scoreValue");
        if (reducedMotion()) { node.textContent = toBangla(target); return Promise.resolve(); }
        return new Promise((resolve) => {
            const start = performance.now();
            const duration = 1400;
            function frame(now) {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                node.textContent = toBangla(Math.round(target * eased));
                if (t < 1) {
                    if (Math.random() < 0.3) GCP.sound.play("tick");
                    requestAnimationFrame(frame);
                } else resolve();
            }
            requestAnimationFrame(frame);
        });
    }

    // ======================================
    // 6. REVEAL SEQUENCE
    // ======================================

    async function afterScore(model) {
        await countUp(model.total);
        if ($("pager")) $("pager").hidden = false;
        GCP.sound.play("cheer");
        $("book").classList.add("scored");
        $("titleLine").textContent = model.title.line;
        $("titleLine").classList.add("show");
        if (model.own) {
            GCP.storage.saveSettings(Object.assign(GCP.storage.getSettings(), { revealed: true }));
            $("finalActions").hidden = false;
            renderNextTier(model);
            renderCv(model);
        } else {
            $("sharedActions").hidden = false;
            renderCompare(model);
            renderCv(model);
        }
    }

    function startReveal(model, { quick = false } = {}) {
        show("reveal");
        const book = $("book");
        const cover = $("cover");
        // a broken detail must never stop the passport from opening
        try {
            fillPassport(model);
        } catch (error) {
            console.error("[GCP] Some passport details could not be drawn — check that passport.html is the latest version.", error);
        }

        const open = async () => {
            if (book.classList.contains("open")) return;
            askTilt();
            book.classList.add("open");
            GCP.sound.play("pageFlip");
            await wait(quick || reducedMotion() ? 50 : 900);
            book.classList.add("stamping");
            if (!quick) {
                GCP.JOURNEY.forEach((_, i) => setTimeout(() => GCP.sound.play("stamp"), 150 + i * 110));
                await wait(150 + GCP.JOURNEY.length * 110 + 300);
            }
            if (quick) {
                $("scratch").hidden = true;
                afterScore(model);
            } else {
                setupScratch(() => afterScore(model));
            }
        };

        cover.addEventListener("click", open);
        if (quick) open();
    }

    // ======================================
    // 7. CV-STYLE DETAIL VIEW
    // ======================================

    function renderCv(model) {
        $("cv").hidden = false;
        $("cvName").textContent = `${model.nickname} — ${model.title.title}`;
        const visited = model.cats.filter((c) => c.percent !== null);
        const best = visited.slice().sort((a, b) => b.percent - a.percent)[0];
        $("cvSummary").textContent =
            `${model.era ? model.era.label : "শৈশবের যাত্রী"}` +
            (model.place ? `, বেড়ে ওঠা ${model.place}-এ` : "") +
            `। ${toBangla(visited.length)}টা জায়গা ঘুরে Childhood Memories Score ${toBangla(model.total)}।` +
            (best ? ` সবচেয়ে উজ্জ্বল স্মৃতি: ${best.icon} ${best.place}।` : "");

        $("cvBars").innerHTML = model.cats.map((c) => `
            <li style="--c:${c.color};--p:${c.percent || 0}%">
                <span class="pp-bar-label">${c.icon} ${escapeHtml(c.place)}</span>
                <span class="pp-bar"><i></i></span>
                <span class="pp-bar-value">${c.percent === null ? "যাওয়া হয়নি" : toBangla(c.percent) + "%"}</span>
            </li>`).join("");

    }

    // ======================================
    // 8. COMPARE WITH A FRIEND
    // ======================================

    function renderNextTier(model) {
        const box = $("nextTier");
        if (!box) return;
        const next = GCP.nextTier(model.total);
        box.hidden = false;

        // the 4 steps: done ✓, you are here, locked 🔒
        const ladder = $("ladder");
        if (ladder) {
            ladder.innerHTML = GCP.tierLadder().map((t) => {
                const state = t.level < model.tier.level ? "done" : t.level === model.tier.level ? "here" : "locked";
                const note = state === "here" ? "তুমি এখানে" : state === "done" ? "পার হয়েছ ✓" : `${toBangla(t.min)}+ স্কোর 🔒`;
                return `<li class="pp-step is-${state} step-${t.id}" style="--step:${t.color}">
                    <span class="pp-step-icon">${t.icon}</span>
                    <strong>${escapeHtml(t.short)}</strong>
                    <small>লেভেল ${toBangla(t.level)}</small>
                    <em>${note}</em>
                </li>`;
            }).join("");
        }

        if ($("nextCheer")) $("nextCheer").textContent = model.tier.cheer || "";
        if ($("playAgain")) $("playAgain").hidden = !next;

        if (!next) {
            $("nextBar").style.width = "100%";
            $("nextText").innerHTML = `<b>${escapeHtml(model.tier.rank)}</b> — লেভেল ${toBangla(model.tier.level)}/${toBangla(GCP.TIER_COUNT)}, সবার উপরে।`;
            return;
        }
        const from = model.tier.min;
        const progress = Math.round(((model.total - from) / (next.min - from)) * 100);
        requestAnimationFrame(() => { $("nextBar").style.width = Math.max(6, progress) + "%"; });
        $("nextText").innerHTML = `${next.icon} <b>${escapeHtml(next.name)}</b> (লেভেল ${toBangla(next.level)}) আর মাত্র <b>${toBangla(next.min - model.total)}</b> পয়েন্ট দূরে।`;
    }

    function renderCompare(friend) {
        const journey = GCP.storage.getJourney();
        const answered = Object.values(journey.answers || {}).filter((a) => a && a.v).length;
        const hasOwn = answered >= 12;
        const me = hasOwn ? finishModel(ownModel()) : null;

        $("compare").hidden = false;
        $("compareName").textContent = friend.nickname;

        // "ওর আছে, তোমার নেই" — the badges that make you want to play
        const mine = new Set(me ? me.badges.map((b) => b.id) : []);
        const envy = friend.badges.filter((b) => !mine.has(b.id));
        if (envy.length) {
            $("envy").hidden = false;
            $("envyTitle").textContent = hasOwn
                ? `${friend.nickname}-এর আছে, তোমার নেই 😤`
                : `${friend.nickname}-এর এই ব্যাজগুলো আছে — তুমি কয়টা পাবে?`;
            $("envyList").innerHTML = envy.map((b) => `
                <li class="pp-${b.rarity}"><span>${b.icon}</span><strong>${escapeHtml(b.name)}</strong><small>${escapeHtml(b.why)}</small></li>`).join("");
        }

        if (!hasOwn) {
            $("compareScore").innerHTML = `
                <div><strong>?</strong><small>তুমি</small></div>
                <span>তোমার শৈশব কি এর চেয়েও সোনালি?</span>
                <div><strong>${toBangla(friend.total)}</strong><small>${escapeHtml(friend.nickname)}</small></div>`;
            $("compareList").hidden = true;
            return;
        }

        const diff = me.total - friend.total;
        $("compareScore").innerHTML = `
            <div><strong>${toBangla(me.total)}</strong><small>তুমি · ${escapeHtml(me.tier.short)}</small></div>
            <span>${diff > 0 ? "তুমি এগিয়ে! 🏆" : diff < 0 ? `${escapeHtml(friend.nickname)} এগিয়ে!` : "সমান সমান! 🤝"}</span>
            <div><strong>${toBangla(friend.total)}</strong><small>${escapeHtml(friend.nickname)} · ${escapeHtml(friend.tier.short)}</small></div>`;
        $("compareList").innerHTML = me.cats.map((c, i) => {
            const f = friend.cats[i];
            const a = c.percent === null ? "—" : toBangla(c.percent);
            const b = f.percent === null ? "—" : toBangla(f.percent);
            const win = c.percent !== null && f.percent !== null ? (c.percent > f.percent ? "me" : c.percent < f.percent ? "friend" : "tie") : "";
            return `<li class="${win}"><span>${a}</span><em>${c.icon} ${escapeHtml(c.place)}</em><span>${b}</span></li>`;
        }).join("");
    }

    // ======================================
    // 9. ACTIONS
    // ======================================

    function toast(text) {
        const node = $("ppToast");
        node.textContent = text;
        node.classList.remove("show");
        void node.offsetWidth;
        node.classList.add("show");
    }

    function bindActions(model) {
        $("downloadBtn").addEventListener("click", async () => {
            $("downloadBtn").disabled = true;
            toast("ছবি তৈরি হচ্ছে…");
            try {
                await GCP.report.download(exportCanvas, model);
                toast("ছবি নামানো হয়েছে ✓ এবার Facebook-এ দাও!");
            } catch (e) {
                console.error(e);
                toast("ছবি বানাতে সমস্যা হলো, আবার চেষ্টা করো।");
            }
            $("downloadBtn").disabled = false;
        });

        $("shareBtn").addEventListener("click", async () => {
            const result = await GCP.report.share(exportCanvas, model);
            if (result === "copied") toast("লিংক কপি হয়েছে ✓ বন্ধুদের পাঠাও!");
            else if (result === "shared") toast("পাঠানো হয়েছে ✓");
        });

        $("photoBtn").addEventListener("click", () => {
            GCP.storage.saveSettings(Object.assign(GCP.storage.getSettings(), { photoDone: false }));
            location.reload();
        });
    }

    // ======================================
    // 10. START
    // ======================================

    const sharedMatch = location.hash.match(/#p=([\w-]+)/);
    if (sharedMatch) {
        const data = GCP.report.decode(sharedMatch[1]);
        if (data) {
            const model = finishModel(sharedModel(data));
            $("chapterLabel").textContent = "বন্ধুর পাসপোর্ট";
            $("sharedNote").hidden = false;
            $("sharedNote").textContent = `${model.nickname} তোমাকে তার শৈশবের পাসপোর্ট পাঠিয়েছে। খুলে দেখো!`;
            $("editBtn").hidden = true;
            startReveal(model);
            return;
        }
    }

    const model = finishModel(ownModel());
    if (model.answered < 3) {
        show("empty");
        return;
    }

    // sound follows the choice made in the quiz
    if (settings.sound) {
        const unlock = () => { GCP.sound.setEnabled(true); window.removeEventListener("pointerdown", unlock); };
        window.addEventListener("pointerdown", unlock);
    }

    bindActions(model);

    if (!settings.photoDone) openPhotoStep(model);
    else startReveal(model, { quick: Boolean(settings.revealed) });
});
