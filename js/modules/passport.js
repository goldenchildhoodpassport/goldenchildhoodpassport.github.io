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

    function catsFrom(percents) {
        return GCP.JOURNEY.map((stop, i) => ({
            id: stop.id,
            place: stop.place,
            icon: stop.icon,
            color: stop.stampColor,
            percent: percents[i] === undefined || percents[i] < 0 ? null : percents[i]
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

        return {
            own: true,
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
            cats: catsFrom(GCP.JOURNEY.map((stop) => result.byCategory[stop.id].percent ?? -1)),
            badges: GCP.badgeEngine.evaluate(answers, result, profile),
            memories,
            photo: GCP.storage.getPhoto()
        };
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
            photo: null
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

        $("stamps").innerHTML = model.cats.map((cat, i) => {
            const visited = cat.percent !== null;
            const rot = ((i * 37) % 19) - 9;
            return `<li class="pp-stamp${visited ? "" : " is-missing"}" style="--c:${cat.color};--r:${rot}deg;--d:${i * 110}ms;--o:${visited ? 0.55 + cat.percent / 230 : 0.35}">
                <span class="pp-stamp-icon">${cat.icon}</span>
                <strong>${visited ? toBangla(cat.percent) + "%" : "—"}</strong>
                <small>${escapeHtml(cat.place)}</small>
            </li>`;
        }).join("");

        $("badgeRow").innerHTML = model.badges.slice(0, 4).map((b, i) =>
            `<span class="pp-badge pp-${b.rarity}" style="--d:${i * 140}ms" title="${escapeHtml(b.why)}">${b.icon} ${escapeHtml(b.name)}</span>`
        ).join("") + (model.badges.length > 4 ? `<span class="pp-badge pp-more">+${toBangla(model.badges.length - 4)}</span>` : "");
    }

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
        GCP.sound.play("cheer");
        $("book").classList.add("scored");
        $("titleLine").textContent = model.title.line;
        $("titleLine").classList.add("show");
        if (model.own) {
            GCP.storage.saveSettings(Object.assign(GCP.storage.getSettings(), { revealed: true }));
            $("finalActions").hidden = false;
            renderCv(model);
        } else {
            $("sharedActions").hidden = false;
            renderCompare(model);
            renderCv(model);
        }
    }

    function startReveal(model, { quick = false } = {}) {
        show("reveal");
        fillPassport(model);
        const book = $("book");
        const cover = $("cover");

        const open = async () => {
            if (book.classList.contains("open")) return;
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

        const lockedCount = GCP.BADGES.length - model.badges.length;
        $("cvBadgeCount").textContent = `(${toBangla(model.badges.length)} / ${toBangla(GCP.BADGES.length)})`;
        $("cvBadges").innerHTML = model.badges.map((b) => `
            <li class="pp-${b.rarity}">
                <span class="pp-badge-icon">${b.icon}</span>
                <div><strong>${escapeHtml(b.name)}</strong><small>${escapeHtml(b.why)}</small></div>
                <em>${b.rarity === "legendary" ? "কিংবদন্তি" : b.rarity === "rare" ? "বিরল" : "সাধারণ"}</em>
            </li>`).join("") +
            (lockedCount > 0 && model.own ? `<li class="pp-locked"><span class="pp-badge-icon">🔒</span><div><strong>আরও ${toBangla(lockedCount)}টা ব্যাজ লুকানো আছে</strong><small>"আরও গভীরে" প্রশ্নগুলোর উত্তর দিলে কিছু খুলে যেতে পারে।</small></div></li>` : "");

        const memories = model.own ? model.memories : model.memories;
        $("cvMemoriesWrap").hidden = memories.length === 0;
        $("cvMemories").innerHTML = memories.map((m) => `
            <li>
                ${m.question ? `<small>${escapeHtml(m.question)}</small>` : ""}
                <p>“${escapeHtml(m.text)}”</p>
            </li>`).join("");
    }

    // ======================================
    // 8. COMPARE WITH A FRIEND
    // ======================================

    function renderCompare(friend) {
        const journey = GCP.storage.getJourney();
        const answered = Object.values(journey.answers || {}).filter((a) => a && a.v).length;
        if (answered < 12) return;
        const me = ownModel();
        $("compare").hidden = false;
        $("compareName").textContent = friend.nickname;
        const diff = me.total - friend.total;
        $("compareScore").innerHTML = `
            <div><strong>${toBangla(me.total)}</strong><small>তুমি</small></div>
            <span>${diff > 0 ? "তুমি এগিয়ে! 🏆" : diff < 0 ? `${escapeHtml(friend.nickname)} এগিয়ে!` : "সমান সমান! 🤝"}</span>
            <div><strong>${toBangla(friend.total)}</strong><small>${escapeHtml(friend.nickname)}</small></div>`;
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
            const model = sharedModel(data);
            $("chapterLabel").textContent = "বন্ধুর পাসপোর্ট";
            $("sharedNote").hidden = false;
            $("sharedNote").textContent = `${model.nickname} তোমাকে তার শৈশবের পাসপোর্ট পাঠিয়েছে। খুলে দেখো!`;
            $("editBtn").hidden = true;
            startReveal(model);
            return;
        }
    }

    const model = ownModel();
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
