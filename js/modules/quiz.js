/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   CHAPTER 02 — "শৈশবের একটা দিন"
   ------------------------------------------
   One memory per screen. The user walks
   through 12 places of a childhood day,
   from the morning school bell to the
   load-shedding night.

   Step types:
   entry  → arriving at a place (mini scene)
   q      → one question card
   offer  → "আরও গভীরে যাবে?" after core qs
   finale → back home at night
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const { toBangla, wait, escapeHtml, reducedMotion, pick } = GCP.helpers;

    // ======================================
    // 1. DATA
    // ======================================

    const QUESTIONS = {};
    (window.GCP_QUESTIONS || []).forEach((q) => { QUESTIONS[q.id] = q; });

    const STOPS = GCP.JOURNEY;
    const STOP_BY_ID = {};
    STOPS.forEach((stop, index) => { STOP_BY_ID[stop.id] = Object.assign({ index }, stop); });

    const profile = GCP.storage.getProfile() || {};
    const nickname = (profile.nickname || profile.name || "").trim();
    const era = GCP.generation.describe(profile.birthYear || (profile.dateOfBirth ? Number(profile.dateOfBirth.slice(0, 4)) : null));

    let journey = GCP.storage.getJourney();

    /* questions a place still asks after its hands-on moment */
    function plan(stop) {
        const momentsReady = GCP.momentQuestions && GCP.moments && document.getElementById("momentScreen");
        const covered = new Set(momentsReady ? GCP.momentQuestions(stop.id) : []);
        const all = (window.GCP_QUESTIONS || []).filter((q) => q.categoryId === stop.id && !covered.has(q.id)).map((q) => q.id);
        const core = stop.core.filter((id) => QUESTIONS[id] && !covered.has(id)).slice(0, 2);
        all.forEach((id) => { if (core.length < 2 && !core.includes(id)) core.push(id); });
        const extras = all.filter((id) => !core.includes(id));
        return { core, extras, covered: [...covered] };
    }

    /* the full list of steps, rebuilt whenever deep-dive changes */
    function buildSteps() {
        const steps = [];
        STOPS.forEach((stop) => {
            const p = plan(stop);
            steps.push({ type: "entry", stop: stop.id, key: "entry:" + stop.id });
            if (GCP.MOMENTS && GCP.MOMENTS[stop.id] && GCP.moments && document.getElementById("momentScreen")) {
                steps.push({ type: "moment", stop: stop.id, key: "moment:" + stop.id });
            }
            p.core.forEach((id, i) => {
                steps.push({ type: "q", stop: stop.id, id, key: "q:" + id, core: true, n: i + 1, of: p.core.length });
            });
            if (p.extras.length) {
                if (journey.deepDive[stop.id]) {
                    p.extras.forEach((id, i) => steps.push({ type: "q", stop: stop.id, id, key: "q:" + id, core: false, n: i + 1, of: p.extras.length }));
                } else {
                    steps.push({ type: "offer", stop: stop.id, key: "offer:" + stop.id, extras: p.extras.length });
                }
            }
        });
        steps.push({ type: "finale", stop: STOPS[STOPS.length - 1].id, key: "finale" });
        return steps;
    }

    let steps = buildSteps();
    let index = 0;
    let busy = false;
    let lastStopId = null;

    function save() {
        journey.position = steps[index] ? steps[index].key : 0;
        GCP.storage.saveJourney(journey);
    }

    // ======================================
    // 2. ELEMENTS
    // ======================================

    const $ = (id) => document.getElementById(id);
    const body = document.body;

    const el = {
        clockPhase: $("clockPhase"), clockPlace: $("clockPlace"),
        soundToggle: $("soundToggle"),
        mapTrack: $("mapTrack"), mapStops: $("mapStops"), walker: $("walker"), walkerImg: $("walkerImg"),
        intro: $("introScreen"), introTitle: $("introTitle"), introText: $("introText"),
        startWithSound: $("startWithSound"), startSilent: $("startSilent"),
        entry: $("entryScreen"), entryVisual: $("entryVisual"), entryPlace: $("entryPlace"),
        entryLine: $("entryLine"), entrySub: $("entrySub"), entryAction: $("entryAction"),
        card: $("card"), cardPlace: $("cardPlace"), cardCount: $("cardCount"), cardSticker: $("cardSticker"), fullScene: $("fullScene"),
        cardQuestion: $("cardQuestion"), cardHelper: $("cardHelper"), cardOptions: $("cardOptions"),
        story: $("story"), storyToggle: $("storyToggle"), storyPaper: $("storyPaper"), storyText: $("storyText"), storyCount: $("storyCount"),
        back: $("backButton"), next: $("nextButton"),
        moment: $("momentScreen"), momentArea: $("momentArea"), momentTitle: $("momentTitle"), momentSub: $("momentSub"), momentPlace: $("momentPlace"),
        offer: $("offerScreen"), offerStamp: $("offerStamp"), offerTitle: $("offerTitle"), offerText: $("offerText"),
        offerDeeper: $("offerDeeper"), offerContinue: $("offerContinue"),
        finale: $("finaleScreen"), finaleTitle: $("finaleTitle"), finaleText: $("finaleText"), finaleReview: $("finaleReview"),
        plane: $("plane"), toast: $("toast"), toastText: $("toastText"),
        darkness: document.querySelector(".darkness"),
        stars: document.querySelector(".stars"), fireflies: document.querySelector(".fireflies")
    };

    // .filter(Boolean): an older quiz.html without a screen must not break the page
    const screens = [el.intro, el.entry, el.moment, el.card, el.offer, el.finale].filter(Boolean);

    // ======================================
    // 3. WORLD: SKY, TIME OF DAY, THEME
    // ======================================

    (function scatterStars() {
        let html = "";
        for (let i = 0; i < 60; i++) {
            html += `<i style="left:${Math.random() * 100}%;top:${Math.random() * 55}%;animation-delay:${(Math.random() * 4).toFixed(2)}s;--s:${(1 + Math.random() * 2).toFixed(1)}px"></i>`;
        }
        el.stars.innerHTML = html;
        let flies = "";
        for (let i = 0; i < 18; i++) {
            flies += `<i style="left:${Math.random() * 100}%;top:${45 + Math.random() * 50}%;animation-delay:${(Math.random() * 6).toFixed(2)}s;animation-duration:${(5 + Math.random() * 6).toFixed(1)}s"></i>`;
        }
        el.fireflies.innerHTML = flies;
    })();

    function applyWorld(stop) {
        const phase = GCP.DAY_PHASES[stop.phase];
        Object.keys(GCP.DAY_PHASES).forEach((p) => body.classList.toggle("phase-" + p, p === stop.phase));
        body.dataset.place = stop.theme;
        body.dataset.theme = "glass";
        body.style.setProperty("--sky-top", phase.sky[0]);
        body.style.setProperty("--sky-bottom", phase.sky[1]);
        body.style.setProperty("--ground", phase.ground);
        body.style.setProperty("--sun", phase.sun);
        body.style.setProperty("--stamp", stop.stampColor);
        el.clockPhase.textContent = phase.label;
        el.clockPlace.textContent = stop.place;
        GCP.sound.ambience(stop.ambience);
    }

    // ======================================
    // 4. MAP + WALKING CHILD
    // ======================================

    el.mapStops.innerHTML = STOPS.map((stop, i) => `
        <li class="j-stop" data-stop="${stop.id}" style="--x:${(i + 0.5) / STOPS.length}">
            <button type="button" title="${escapeHtml(stop.place)}" aria-label="${escapeHtml(stop.place)}">
                <span class="j-stop-icon">${stop.icon}</span>
                <span class="j-stop-check">✓</span>
            </button>
            <small>${escapeHtml(stop.place)}</small>
        </li>`).join("");

    const WALK_FRAMES = ["walk-01", "walk-02", "walk-03", "walk-04"].map((name) => {
        const img = new Image();
        img.src = `assets/images/decorations/child-small/${name}.webp`;
        return img.src;
    });
    const STAND_FRAME = "assets/images/decorations/child-small/turn-02.webp";
    new Image().src = STAND_FRAME;

    let walkerX = null;

    function walkerTargetX(stopIndex) {
        return (stopIndex + 0.5) / STOPS.length;
    }

    async function walkTo(stopIndex) {
        const target = walkerTargetX(stopIndex);
        el.walker.style.setProperty("--x", target);
        scrollMapTo(stopIndex);

        if (walkerX === null || reducedMotion() || Math.abs(target - walkerX) < 0.001) {
            walkerX = target;
            el.walkerImg.src = STAND_FRAME;
            el.walker.classList.toggle("facing-left", false);
            return;
        }

        const goingLeft = target < walkerX;
        el.walker.classList.toggle("facing-left", goingLeft);
        el.walker.classList.add("walking");
        const distance = Math.abs(target - walkerX);
        const duration = Math.min(2400, 900 + distance * 6000);
        let frame = 0;
        const timer = setInterval(() => {
            el.walkerImg.src = WALK_FRAMES[frame++ % WALK_FRAMES.length];
        }, 140);
        await wait(duration);
        clearInterval(timer);
        el.walker.classList.remove("walking", "facing-left");
        el.walkerImg.src = STAND_FRAME;
        walkerX = target;
    }

    function scrollMapTo(stopIndex) {
        const map = el.mapTrack.parentElement;
        if (map.scrollWidth <= map.clientWidth) return;
        const x = walkerTargetX(stopIndex) * el.mapTrack.scrollWidth - map.clientWidth / 2;
        map.scrollTo({ left: Math.max(0, x), behavior: reducedMotion() ? "auto" : "smooth" });
    }

    function refreshMap(currentStopId) {
        STOPS.forEach((stop) => {
            const li = el.mapStops.querySelector(`[data-stop="${stop.id}"]`);
            const done = plan(stop).core.every((id) => journey.answers[id] && journey.answers[id].v);
            li.classList.toggle("is-done", done);
            li.classList.toggle("is-current", stop.id === currentStopId);
            li.querySelector("button").disabled = !done && stop.id !== currentStopId;
        });
    }

    el.mapStops.addEventListener("click", (event) => {
        const li = event.target.closest(".j-stop");
        if (!li || busy) return;
        const target = steps.findIndex((s) => s.type === "q" && s.stop === li.dataset.stop);
        if (target >= 0 && target !== index) go(target, { skipEntry: true });
    });

    // ======================================
    // 5. SCREEN SWITCHING + PAGE TURN
    // ======================================

    async function showScreen(screen, { turn = true } = {}) {
        const current = screens.find((s) => !s.hidden);
        if (current && current !== screen && turn && !reducedMotion()) {
            current.classList.add("is-leaving");
            GCP.sound.play("pageFlip");
            await wait(320);
            current.classList.remove("is-leaving");
        }
        screens.forEach((s) => { s.hidden = s !== screen; });
        if (screen !== el.card) hideScene();
        screen.classList.remove("is-entering");
        void screen.offsetWidth;
        screen.classList.add("is-entering");
        window.scrollTo({ top: 0, behavior: "auto" });
    }

    // ======================================
    // 6. ENTRY SCENES (one mini-moment per place)
    // ======================================

    const ENTRY = {
        "school-life": { action: "🎒 লাইনে দাঁড়াও", visual: `<div class="ev ev-bell">🔔</div><div class="ev-board">আজকের তারিখ: <span>${toBangla(new Date().getDate())}</span></div>` },
        "food-tiffin": { action: "🍱 ঢাকনা খোলো", visual: `<div class="ev ev-tiffin"><span class="lid"></span><span class="box"></span><span class="steam">〰</span></div>`, play: "tiffinOpen", cls: "open" },
        "games-sports": { action: "⚽ মাঠে নামো", visual: `<div class="ev ev-kite">🪁</div><div class="ev ev-marbles"><i></i><i></i><i></i></div>` },
        "village-nature": { action: "💧 পানিতে নামো", visual: `<div class="ev ev-pond"><i></i><i></i><i></i></div>`, play: "splash", cls: "splash" },
        "fashion-lifestyle": { action: "🚪 আলমারি খোলো", visual: `<div class="ev ev-almirah"><span class="door l"></span><span class="door r"></span><span class="inside">👗👕🧸</span></div>`, play: "almirah", cls: "open" },
        "city-transport": { action: "🛺 রিকশায় ওঠো", visual: `<div class="ev ev-road"><span class="rickshaw">🛺</span></div>`, play: "rickshawBell", cls: "ride" },
        "music-entertainment": { action: "📡 অ্যান্টেনা ঘোরাও", visual: `<div class="ev ev-tv"><canvas width="160" height="120"></canvas><span class="tv-logo">বিটিভি</span></div>`, taps: 2 },
        "communication-technology": { action: "📱 মেনু চাপো", visual: `<div class="ev ev-nokia"><div class="screen"><span>NOKIA</span><i>🤝</i></div><div class="keys"></div></div>`, play: "keyBeep", cls: "menu" },
        "internet-digital-life": { action: "🌐 Connect চাপো", visual: `<div class="ev ev-crt"><div class="screen"><span class="bar"><i></i></span><small>Connecting… 56 kbps</small></div></div>`, play: "dialup", cls: "connect", hold: 1500 },
        "electricity-nightlife": { action: "🔥 ম্যাচ জ্বালাও", visual: `<div class="ev ev-lantern"><span class="glass"></span><span class="flame"></span></div>`, play: "matchStrike", cls: "lit", hold: 700 },
        "family-festivals": { action: "🌙 চাঁদ দেখো", visual: `<div class="ev ev-moon"><span class="moon"></span></div>`, play: "chime", cls: "rise", hold: 900 },
        "special-memories": { action: "🫙 বয়ামটা খোলো", visual: `<div class="ev ev-jar"><span class="cap"></span><span class="glass"></span><i></i><i></i><i></i></div>`, play: "jarOpen", cls: "open", hold: 900 }
    };

    let staticTimer = null;

    function drawStatic(canvas, amount) {
        const c = canvas.getContext("2d");
        const image = c.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < image.data.length; i += 4) {
            const v = Math.random() * 255;
            image.data[i] = image.data[i + 1] = image.data[i + 2] = v;
            image.data[i + 3] = 255 * amount;
        }
        c.putImageData(image, 0, 0);
    }

    function typeLine(target, text) {
        if (reducedMotion()) { target.textContent = text; return Promise.resolve(); }
        target.textContent = "";
        const chars = Array.from(text);
        return new Promise((resolve) => {
            let i = 0;
            const timer = setInterval(() => {
                target.textContent += chars[i++] || "";
                if (i >= chars.length) { clearInterval(timer); resolve(); }
            }, 28);
        });
    }

    async function renderEntry(step) {
        const stop = STOP_BY_ID[step.stop];
        const scene = ENTRY[stop.id];

        clearInterval(staticTimer);
        el.entry.dataset.stop = stop.id;
        el.entryVisual.className = "j-entry-visual";
        el.entryVisual.innerHTML = scene.visual;
        el.entryPlace.textContent = `${GCP.DAY_PHASES[stop.phase].label} · ${stop.place}`;
        el.entryLine.textContent = "";
        el.entrySub.textContent = "";
        el.entryAction.textContent = scene.action;
        el.entryAction.disabled = true;

        if (stop.entry.blackout) {
            body.classList.add("blackout");
        }

        await showScreen(el.entry);
        GCP.sound.play(stop.entry.sound);

        const canvas = el.entryVisual.querySelector("canvas");
        let noise = 1;
        if (canvas) {
            staticTimer = setInterval(() => drawStatic(canvas, noise), 70);
        }

        await typeLine(el.entryLine, stop.entry.line);
        el.entrySub.textContent = stop.entry.sub;
        el.entryAction.disabled = false;

        let taps = scene.taps || 1;
        el.entryAction.onclick = async () => {
            if (busy) return;
            if (--taps > 0) {
                noise = 0.45;
                GCP.sound.play("tvStatic");
                el.entryAction.textContent = "📡 আরেকটু ঘোরাও…";
                el.entryVisual.classList.add("tuning");
                return;
            }
            busy = true;
            el.entryAction.disabled = true;
            if (scene.play) GCP.sound.play(scene.play);
            if (canvas) { noise = 0; el.entryVisual.classList.add("tuned"); GCP.sound.play("sparkle"); }
            if (scene.cls) el.entryVisual.classList.add(scene.cls);
            if (stop.entry.blackout) {
                body.classList.remove("blackout");
                body.classList.add("lantern-lit");
            }
            await wait(scene.hold || 650);
            clearInterval(staticTimer);
            busy = false;
            go(index + 1);
        };
    }

    // ======================================
    // 7. QUESTION CARD
    // ======================================

    let idleTimer = null;
    const idleShown = new Set();

    function resetIdle(step) {
        clearTimeout(idleTimer);
        if (!step || step.type !== "q" || idleShown.has(step.stop)) return;
        idleTimer = setTimeout(() => {
            idleShown.add(step.stop);
            const stop = STOP_BY_ID[step.stop];
            showToast(pick(GCP.IDLE_CALLS[stop.phase]));
        }, 40000);
    }

    let toastTimer = null;
    function showToast(text) {
        el.toastText.textContent = text;
        el.toast.hidden = false;
        el.toast.classList.remove("show");
        void el.toast.offsetWidth;
        el.toast.classList.add("show");
        GCP.sound.play("tick");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { el.toast.hidden = true; }, 5200);
    }

    function answerOf(id) {
        return journey.answers[id] || null;
    }

    async function renderQuestion(step, { turn = true } = {}) {
        const stop = STOP_BY_ID[step.stop];
        const question = QUESTIONS[step.id];
        const answer = answerOf(step.id);

        el.card.dataset.stop = stop.id;
        el.card.classList.toggle("is-deep", !step.core);
        el.cardPlace.textContent = `${stop.icon} ${stop.place}`;
        el.cardCount.textContent = step.core
            ? `স্মৃতি ${toBangla(step.n)} / ${toBangla(step.of)}`
            : `গভীরে ${toBangla(step.n)} / ${toBangla(step.of)}`;
        const scene = showScene(step.id);
        el.card.classList.toggle("has-scene", Boolean(scene));
        el.cardSticker.textContent = scene ? "" : (GCP.QUESTION_STICKERS[step.id] || stop.icon);
        el.cardQuestion.textContent = question.question;
        el.cardHelper.textContent = question.helperText || "";

        el.cardOptions.innerHTML = question.options.map((option, i) => `
            <button type="button" class="j-option${option.score === null ? " is-na" : ""}" role="radio"
                    aria-checked="${answer && answer.v === option.value}" data-value="${escapeHtml(option.value)}" style="--i:${i}">
                <span class="j-option-mark" aria-hidden="true"><i>✓</i></span>
                <span class="j-option-label">${escapeHtml(option.label)}</span>
            </button>`).join("");

        const memory = answer && answer.memory ? answer.memory : "";
        el.storyText.value = memory;
        el.storyCount.textContent = `${toBangla(memory.length)} / ৪০০`;
        el.storyPaper.hidden = !memory;
        el.storyToggle.hidden = Boolean(memory);
        el.story.hidden = question.personalMemory === false;
        el.storyPencilPlayed = false;

        el.next.disabled = !(answer && answer.v);
        el.back.disabled = previousIndex(index) < 0;
        el.next.textContent = nextLabel(index);

        await showScreen(el.card, { turn });
        resetIdle(step);

        // the memory's own sound, a moment after the page settles
        if (scene) {
            clearTimeout(sceneSoundTimer);
            sceneSoundTimer = setTimeout(() => {
                if (steps[index] === step) GCP.sound.play(scene.sound);
            }, 450);
        }
    }

    let sceneSoundTimer = null;

    /* two scene layers cross-fade, so one memory melts into the next */
    const sceneLayers = [...el.fullScene.querySelectorAll(".sc")];
    let sceneFront = 0;
    let sceneId = null;

    function showScene(id) {
        if (id === sceneId) return { sound: GCP.SCENES[id][2] };
        const incoming = sceneLayers[1 - sceneFront];
        const outgoing = sceneLayers[sceneFront];
        const result = GCP.scene.render(incoming, id);
        if (!result) { hideScene(); return null; }
        incoming.classList.add("is-front");
        outgoing.classList.remove("is-front");
        setTimeout(() => { if (!outgoing.classList.contains("is-front")) outgoing.hidden = true; }, 900);
        sceneFront = 1 - sceneFront;
        sceneId = id;
        body.classList.add("in-scene");
        return result;
    }

    function hideScene() {
        body.classList.remove("in-scene");
        sceneLayers.forEach((layer) => layer.classList.remove("is-front"));
        setTimeout(() => {
            if (!body.classList.contains("in-scene")) sceneLayers.forEach((layer) => { layer.hidden = true; });
        }, 900);
        sceneId = null;
    }

    el.fullScene.addEventListener("click", () => {
        const front = sceneLayers[sceneFront];
        if (front && !front.hidden) GCP.scene.poke(front);
    });

    function nextLabel(i) {
        const nextStep = steps[i + 1];
        if (!nextStep) return "পরের স্মৃতি →";
        if (nextStep.type === "finale") return "বাসায় ফিরি 🏡";
        if (nextStep.type === "entry") return `${STOP_BY_ID[nextStep.stop].place}-এ চলো →`;
        if (nextStep.type === "offer") return "এই জায়গা শেষ ✓";
        return "পরের স্মৃতি →";
    }

    function stampAt(button) {
        const mark = button.querySelector(".j-option-mark");
        mark.classList.remove("stamped");
        void mark.offsetWidth;
        mark.classList.add("stamped");
    }

    function ripple(button, event) {
        const r = document.createElement("span");
        r.className = "j-ripple";
        const rect = button.getBoundingClientRect();
        r.style.left = ((event.clientX || rect.left + rect.width / 2) - rect.left) + "px";
        r.style.top = ((event.clientY || rect.top + rect.height / 2) - rect.top) + "px";
        button.appendChild(r);
        setTimeout(() => r.remove(), 900);
    }

    el.cardOptions.addEventListener("click", (event) => {
        const button = event.target.closest(".j-option");
        if (!button) return;
        const step = steps[index];
        const value = button.dataset.value;
        const previous = answerOf(step.id) || {};
        journey.answers[step.id] = { v: value, memory: previous.memory || "" };
        save();

        el.cardOptions.querySelectorAll(".j-option").forEach((b) => b.setAttribute("aria-checked", String(b === button)));
        stampAt(button);

        const theme = body.dataset.place;
        if (theme === "nokia" || theme === "crt") GCP.sound.play("keyBeep");
        else GCP.sound.play("stamp");
        if (theme === "pond" || theme === "field") ripple(button, event);

        el.next.disabled = false;
        el.next.classList.remove("nudge");
        void el.next.offsetWidth;
        el.next.classList.add("nudge");
        refreshMap(step.stop);
        resetIdle(step);
    });

    // keyboard: 1–6 picks an option, Enter goes next
    document.addEventListener("keydown", (event) => {
        if (el.card.hidden || event.target === el.storyText) return;
        const n = Number(event.key);
        if (n >= 1 && n <= 9) {
            const buttons = el.cardOptions.querySelectorAll(".j-option");
            if (buttons[n - 1]) buttons[n - 1].click();
        } else if (event.key === "Enter" && !el.next.disabled) {
            el.next.click();
        }
    });

    el.storyToggle.addEventListener("click", () => {
        el.storyToggle.hidden = true;
        el.storyPaper.hidden = false;
        el.storyPaper.classList.add("unfold");
        el.storyText.focus();
        GCP.sound.play("pageFlip");
    });

    let storyTimer = null;
    el.storyText.addEventListener("input", () => {
        const step = steps[index];
        const text = el.storyText.value;
        el.storyCount.textContent = `${toBangla(text.length)} / ৪০০`;
        if (!el.storyPencilPlayed) { GCP.sound.play("pencil"); el.storyPencilPlayed = true; }
        clearTimeout(storyTimer);
        storyTimer = setTimeout(() => {
            const current = answerOf(step.id) || { v: null };
            journey.answers[step.id] = Object.assign({}, current, { memory: text });
            save();
        }, 300);
        resetIdle(step);
    });

    async function flyPlane() {
        if (reducedMotion()) return;
        const from = el.storyPaper.getBoundingClientRect();
        const to = el.walker.getBoundingClientRect();
        el.plane.style.setProperty("--fx", from.left + from.width / 2 + "px");
        el.plane.style.setProperty("--fy", from.top + "px");
        el.plane.style.setProperty("--tx", to.left + to.width / 2 + "px");
        el.plane.style.setProperty("--ty", to.top + "px");
        el.plane.classList.remove("fly");
        void el.plane.offsetWidth;
        el.plane.classList.add("fly");
        GCP.sound.play("whoosh");
    }

    el.next.addEventListener("click", async () => {
        if (busy || el.next.disabled) return;
        const step = steps[index];
        clearTimeout(storyTimer);
        const text = el.storyText.value.trim();
        if (step.type === "q" && answerOf(step.id)) {
            journey.answers[step.id].memory = text;
            save();
            if (text.length > 3 && !el.storyPaper.hidden) flyPlane();
        }
        go(index + 1);
    });

    function previousIndex(i) {
        for (let j = i - 1; j >= 0; j--) {
            if (steps[j].type === "q") return j;
        }
        return -1;
    }

    el.back.addEventListener("click", () => {
        const target = previousIndex(index);
        if (target >= 0 && !busy) go(target, { back: true });
    });

    // ======================================
    // 7b. HANDS-ON MOMENT (no question)
    // ======================================

    async function renderMoment(step) {
        const stop = STOP_BY_ID[step.stop];
        const m = GCP.MOMENTS[stop.id];
        el.moment.dataset.stop = stop.id;
        el.momentPlace.textContent = `${stop.icon} ${stop.place} · খেলা`;
        el.momentTitle.textContent = m.title;
        el.momentSub.textContent = m.sub;
        el.momentArea.innerHTML = "";
        await showScreen(el.moment);
        GCP.moments.render(el.momentArea, stop.id, {
            soundOn: () => GCP.sound.isEnabled(),
            enableSound: () => setSound(true),
            onDone: ({ answers, prefs }) => {
                Object.keys(answers || {}).forEach((id) => {
                    if (!answers[id]) return;
                    const old = journey.answers[id] || {};
                    journey.answers[id] = { v: answers[id], memory: old.memory || "", via: "moment" };
                });
                if (prefs) {
                    journey.prefs = journey.prefs || {};
                    journey.prefs[stop.id] = prefs;
                }
                save();
                refreshMap(stop.id);
                go(index + 1);
            }
        });
    }

    // ======================================
    // 8. "GO DEEPER?" OFFER
    // ======================================

    async function renderOffer(step) {
        const stop = STOP_BY_ID[step.stop];
        el.offerStamp.innerHTML = `<span>${stop.icon}</span><small>${escapeHtml(stop.place)}</small>`;
        el.offerStamp.classList.remove("stamped");
        el.offerTitle.textContent = `${stop.place} — ঘোরা শেষ!`;
        el.offerText.textContent = `এই জায়গার স্ট্যাম্প তোমার পাসপোর্টে লেগে গেছে। এখানে আরও ${toBangla(step.extras)}টা লুকোনো স্মৃতি আছে — এগুলোর উত্তর দিলে বিরল ব্যাজ পাওয়ার সুযোগ বাড়বে।`;
        el.offerDeeper.textContent = `🔍 আরও ${toBangla(step.extras)}টা স্মৃতি দেখি`;
        await showScreen(el.offer);
        await wait(250);
        el.offerStamp.classList.add("stamped");
        GCP.sound.play("stamp");
    }

    el.offerDeeper.addEventListener("click", () => {
        if (busy || el.offer.hidden) return;
        const step = steps[index];
        journey.deepDive[step.stop] = true;
        steps = buildSteps();
        const first = steps.findIndex((s) => s.type === "q" && s.stop === step.stop && !s.core);
        go(first >= 0 ? first : index + 1);
    });

    el.offerContinue.addEventListener("click", () => {
        if (busy || el.offer.hidden) return;   // a double tap must not skip the next place
        go(index + 1);
    });

    // ======================================
    // 9. FINALE
    // ======================================

    async function renderFinale() {
        journey.finished = true;
        save();
        body.classList.remove("lantern-lit");
        const answered = Object.values(journey.answers).filter((a) => a && a.v).length;
        const stories = Object.values(journey.answers).filter((a) => a && a.memory && a.memory.trim().length > 3).length;
        el.finaleTitle.textContent = nickname ? `বাসায় ফিরেছ, ${nickname}।` : "বাসায় ফিরেছ।";
        el.finaleText.textContent = `সকালের ঘণ্টা থেকে রাতের স্মৃতির বয়াম — ${toBangla(answered)}টা স্মৃতি জমা হলো` +
            (stories ? `, তার মধ্যে ${toBangla(stories)}টা তোমার নিজের লেখা গল্প।` : "।") +
            " এবার এগুলো দিয়ে তোমার শৈশবের পাসপোর্ট তৈরি হবে।";
        await showScreen(el.finale);
        await wait(600);
        el.finale.classList.add("lights-on");
        GCP.sound.play("cheer");
    }

    el.finaleReview.addEventListener("click", () => {
        el.finale.classList.remove("lights-on");
        go(steps.findIndex((s) => s.type === "q"), { skipEntry: true });
    });

    // ======================================
    // 10. NAVIGATION CORE
    // ======================================

    async function go(target, { back = false, skipEntry = false } = {}) {
        if (target < 0 || target >= steps.length) return;
        clearTimeout(idleTimer);

        // when going back, never land on entry/offer screens
        if (back || skipEntry) {
            while (steps[target] && steps[target].type !== "q" && steps[target].type !== "finale") target++;
        }

        const step = steps[target];
        const stop = STOP_BY_ID[step.stop];
        const stopChanged = stop.id !== lastStopId;
        if (target === index && !stopChanged && lastStopId !== null && step.type !== "q") return;
        index = target;
        save();

        if (stopChanged) {
            body.classList.remove("blackout", "lantern-lit");
            if (stop.id === "electricity-nightlife" && step.type !== "entry") body.classList.add("lantern-lit");
            applyWorld(stop);
            refreshMap(stop.id);
            lastStopId = stop.id;
            busy = true;
            const walking = walkTo(stop.index);
            if (step.type === "entry") await walking; else walking.then(() => {});
            busy = false;
        } else {
            refreshMap(stop.id);
        }

        if (step.type === "entry") return renderEntry(step);
        if (step.type === "moment") return renderMoment(step);
        if (step.type === "q") return renderQuestion(step, { turn: !stopChanged || back || skipEntry });
        if (step.type === "offer") return renderOffer(step);
        if (step.type === "finale") return renderFinale();
    }

    // ======================================
    // 11. SOUND TOGGLE
    // ======================================

    function setSound(on) {
        const enabled = GCP.sound.setEnabled(on);
        el.soundToggle.setAttribute("aria-pressed", String(enabled));
        el.soundToggle.querySelector(".j-sound-icon").textContent = enabled ? "🔊" : "🔇";
        el.soundToggle.querySelector(".j-sound-label").textContent = enabled ? "শব্দ চালু" : "শব্দ বন্ধ";
        // keep the other settings (photo, passport reveal) when saving sound
        GCP.storage.saveSettings(Object.assign({}, GCP.storage.getSettings(), { sound: enabled }));
    }

    if (!GCP.sound.isSupported()) el.soundToggle.hidden = true;
    el.soundToggle.addEventListener("click", () => setSound(!GCP.sound.isEnabled()));

    // ======================================
    // 12. LANTERN LIGHT FOLLOWS THE FINGER
    // ======================================

    function moveLight(x, y) {
        el.darkness.style.setProperty("--lx", x + "px");
        el.darkness.style.setProperty("--ly", y + "px");
    }
    window.addEventListener("pointermove", (e) => moveLight(e.clientX, e.clientY), { passive: true });
    window.addEventListener("touchmove", (e) => {
        if (e.touches[0]) moveLight(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    moveLight(window.innerWidth / 2, window.innerHeight * 0.55);

    // ======================================
    // 13. START
    // ======================================

    function start() {
        // returning user → continue where they stopped
        const savedIndex = steps.findIndex((s) => s.key === journey.position);
        const hasProgress = Object.keys(journey.answers).length > 0;

        applyWorld(STOP_BY_ID[STOPS[0].id]);
        walkTo(0);
        refreshMap(STOPS[0].id);

        const greeting = nickname ? `শুভ সকাল, ${nickname}!` : "শুভ সকাল!";
        el.introTitle.textContent = hasProgress ? (nickname ? `আবার এসেছ, ${nickname}!` : "আবার এসেছ!") : greeting;
        el.introText.textContent = hasProgress
            ? "যেখানে থেমেছিলে, ঠিক সেখান থেকেই দিনটা আবার শুরু হবে।"
            : (era ? `${era.line} ` : "") + "আজ আবার সেই দিনটা ফিরে আসবে। স্কুলের ঘণ্টা থেকে লোডশেডিংয়ের রাত পর্যন্ত, পুরো পাড়া ঘুরে দেখবে।";

        const qCount = steps.filter((st) => st.type === "q").length;
        const facts = document.querySelectorAll(".j-intro-facts strong");
        if (facts.length === 3) {
            facts[1].textContent = toBangla(STOPS.filter((st) => GCP.MOMENTS && GCP.MOMENTS[st.id]).length);
            facts[1].nextElementSibling.textContent = "টা খেলা";
            facts[2].textContent = toBangla(qCount);
            facts[2].nextElementSibling.textContent = "টা প্রশ্ন";
        }

        showScreen(el.intro, { turn: false });

        const begin = (withSound) => {
            setSound(withSound);
            const target = savedIndex > 0 ? savedIndex : 0;
            lastStopId = null;
            go(target);
        };

        el.startWithSound.addEventListener("click", () => begin(true));
        el.startSilent.addEventListener("click", () => begin(false));

        if (!GCP.sound.isSupported()) {
            el.startWithSound.hidden = true;
            el.startSilent.textContent = "চলো শুরু করি →";
        }
    }

    if (!Object.keys(QUESTIONS).length) {
        console.error("[GCP] Question bank missing — check js/data/questions.js");
        return;
    }

    start();
});
