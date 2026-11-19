/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   MOMENTS ENGINE (data: js/data/moments.js)
   ------------------------------------------
   GCP.moments.render(area, stopId, {
       soundOn: () => boolean,
       enableSound: () => void,
       onDone: ({ answers, prefs }) => void
   })
   answers = { questionId: optionValue }
========================================== */

window.GCP = window.GCP || {};

GCP.moments = (function () {

    const { escapeHtml, toBangla, wait } = GCP.helpers;

    function questionOption(id, index) {
        const q = (window.GCP_QUESTIONS || []).find((x) => x.id === id);
        return q && q.options[index] ? q.options[index].value : null;
    }

    function play(name) { GCP.sound.play(name); }

    /* ---------- 1. "চেনো কি?" shelf ---------- */
    function shelf(area, m, opts) {
        const picked = new Set();
        area.innerHTML = `
            <div class="mo-shelf">
                ${m.items.map((it, i) => `
                    <button type="button" class="mo-item" data-i="${i}" aria-pressed="false" style="--i:${i}">
                        <span class="mo-item-e">${it.e}</span>
                        <span class="mo-item-l">${escapeHtml(it.label)}</span>
                        <i class="mo-item-check">✓</i>
                    </button>`).join("")}
            </div>
            <p class="mo-count" id="moCount">যেগুলো চেনো, ছুঁয়ে দাও</p>
            <button type="button" class="j-btn j-btn-primary mo-done" id="moDone">এগুলোই আমার ✓</button>`;

        area.querySelector(".mo-shelf").addEventListener("click", (e) => {
            const btn = e.target.closest(".mo-item");
            if (!btn) return;
            const i = Number(btn.dataset.i);
            if (picked.has(i)) picked.delete(i); else { picked.add(i); play(m.items[i].sound || "stamp"); }
            btn.setAttribute("aria-pressed", String(picked.has(i)));
            btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
            area.querySelector("#moCount").textContent = picked.size
                ? `${toBangla(picked.size)}টা বেছেছ — আর কিছু?`
                : "যেগুলো চেনো, ছুঁয়ে দাও";
        });

        area.querySelector("#moDone").addEventListener("click", () => {
            const answers = {};
            m.items.forEach((it, i) => { answers[it.q] = questionOption(it.q, picked.has(i) ? 1 : 4); });
            opts.onDone({ answers });
        });
    }

    /* ---------- 2. sound recognition ---------- */
    function sounds(area, m, opts) {
        const decided = {};
        area.innerHTML = `
            <div class="mo-sound-warn" id="moWarn" ${opts.soundOn() ? "hidden" : ""}>
                🔇 শব্দ বন্ধ আছে — <button type="button" id="moEnable">🔊 শব্দ চালু করো</button>
            </div>
            <ul class="mo-sounds">
                ${m.items.map((it, i) => `
                    <li class="mo-snd" data-i="${i}">
                        <button type="button" class="mo-play" aria-label="শব্দ ${toBangla(i + 1)} বাজাও">▶</button>
                        <div class="mo-snd-body">
                            <strong class="mo-snd-name">শব্দ ${toBangla(i + 1)}</strong>
                            <span class="mo-wave"><i></i><i></i><i></i><i></i><i></i></span>
                        </div>
                        <div class="mo-snd-act">
                            <button type="button" class="mo-yes">চিনি ✓</button>
                            <button type="button" class="mo-no">চিনি না</button>
                        </div>
                    </li>`).join("")}
            </ul>
            <button type="button" class="j-btn j-btn-primary mo-done" id="moDone" disabled>আরও ${toBangla(m.items.length)}টা বাকি</button>`;

        const warn = area.querySelector("#moWarn");
        const enable = area.querySelector("#moEnable");
        if (enable) enable.addEventListener("click", () => { opts.enableSound(); warn.hidden = true; });

        function refresh() {
            const left = m.items.length - Object.keys(decided).length;
            const done = area.querySelector("#moDone");
            done.disabled = left > 0;
            done.textContent = left > 0 ? `আরও ${toBangla(left)}টা বাকি` : "এবার সামনে চলো →";
        }

        area.querySelector(".mo-sounds").addEventListener("click", (e) => {
            const li = e.target.closest(".mo-snd");
            if (!li) return;
            const i = Number(li.dataset.i);
            const it = m.items[i];
            if (e.target.closest(".mo-play")) {
                if (!opts.soundOn()) { warn.hidden = false; return; }
                play(it.sound);
                li.classList.remove("playing"); void li.offsetWidth; li.classList.add("playing");
                setTimeout(() => li.classList.remove("playing"), 2200);
                return;
            }
            const yes = e.target.closest(".mo-yes");
            const no = e.target.closest(".mo-no");
            if (!yes && !no) return;
            decided[i] = Boolean(yes);
            li.classList.toggle("is-yes", Boolean(yes));
            li.classList.toggle("is-no", Boolean(no));
            li.querySelector(".mo-snd-name").textContent = `${it.e} ${it.label}`;
            if (yes) play("stamp");
            refresh();
        });

        area.querySelector("#moDone").addEventListener("click", () => {
            const answers = {};
            m.items.forEach((it, i) => { answers[it.q] = questionOption(it.q, decided[i] ? 1 : 4); });
            opts.onDone({ answers });
        });
    }

    /* ---------- 3. this or that ---------- */
    function pick(area, m, opts) {
        const choices = [];
        let round = 0;

        function show() {
            const pair = m.rounds[round];
            area.innerHTML = `
                <p class="mo-round">${toBangla(round + 1)} / ${toBangla(m.rounds.length)}</p>
                <div class="mo-pick">
                    ${pair.map((o, i) => `
                        <button type="button" class="mo-card" data-i="${i}">
                            <span class="mo-card-e">${o.e}</span>
                            <strong>${escapeHtml(o.label)}</strong>
                        </button>`).join('<span class="mo-or">নাকি</span>')}
                </div>`;
            area.querySelector(".mo-pick").addEventListener("click", async (e) => {
                const card = e.target.closest(".mo-card");
                if (!card || area.dataset.busy) return;
                area.dataset.busy = "1";
                const o = pair[Number(card.dataset.i)];
                choices.push({ e: o.e, label: o.label });
                card.classList.add("chosen");
                area.querySelectorAll(".mo-card").forEach((c) => { if (c !== card) c.classList.add("lost"); });
                play("stamp");
                await wait(650);
                delete area.dataset.busy;
                round++;
                if (round < m.rounds.length) show(); else summary();
            });
        }

        function summary() {
            area.innerHTML = `
                <p class="mo-summary-title">তোমার পছন্দ</p>
                <div class="mo-chips">${choices.map((c) => `<span>${c.e} ${escapeHtml(c.label)}</span>`).join("")}</div>
                <p class="mo-count">এগুলো তোমার পাসপোর্টের অ্যালবামে থাকবে।</p>
                <button type="button" class="j-btn j-btn-primary mo-done" id="moDone">সামনে চলো →</button>`;
            play("sparkle");
            area.querySelector("#moDone").addEventListener("click", () => opts.onDone({ answers: {}, prefs: choices }));
        }

        show();
    }

    /* ---------- 4. do it with your own hands ---------- */
    function confirm(area, m, opts, delay = 0) {
        const box = document.createElement("div");
        box.className = "mo-confirm";
        box.innerHTML = `
            <p>ছোটবেলায় তুমিও কি এটা করতে?</p>
            <div>
                <button type="button" class="j-btn j-btn-primary" data-v="yes">${escapeHtml(m.yes)}</button>
                <button type="button" class="j-btn j-btn-ghost" data-v="no">${escapeHtml(m.no)}</button>
            </div>`;
        setTimeout(() => { area.appendChild(box); box.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, delay);
        box.addEventListener("click", (e) => {
            const b = e.target.closest("[data-v]");
            if (!b) return;
            const answers = {};
            answers[m.q] = questionOption(m.q, b.dataset.v === "yes" ? 0 : 4);
            opts.onDone({ answers });
        });
    }

    function latim(area, m, opts) {
        area.innerHTML = `
            <div class="mo-latim-stage">
                <div class="mo-top" id="moTop"><i></i></div>
                <span class="mo-top-shadow"></span>
            </div>
            <div class="mo-meter"><i id="moCharge"></i></div>
            <button type="button" class="j-btn j-btn-primary mo-hold" id="moHold">🧵 চেপে ধরো… তারপর ছাড়ো!</button>`;
        const top = area.querySelector("#moTop");
        const meter = area.querySelector("#moCharge");
        const hold = area.querySelector("#moHold");
        let start = 0, raf = null, tries = 0, asked = false;

        function charge() {
            const p = Math.min(1, (performance.now() - start) / 1400);
            meter.style.width = p * 100 + "%";
            top.style.transform = `rotate(${Math.sin(performance.now() / 60) * 6 * p}deg)`;
            raf = requestAnimationFrame(charge);
        }
        const down = (e) => { e.preventDefault(); start = performance.now(); top.classList.remove("spinning"); charge(); };
        const up = () => {
            if (!start) return;
            cancelAnimationFrame(raf);
            const p = Math.min(1, (performance.now() - start) / 1400);
            start = 0;
            meter.style.width = "0%";
            top.style.transform = "";
            top.style.setProperty("--spin-time", (1.4 + p * 3.6).toFixed(1) + "s");
            top.classList.remove("spinning"); void top.offsetWidth; top.classList.add("spinning");
            play("whoosh");
            setTimeout(() => play("marbles"), 300);
            tries++;
            hold.textContent = p > 0.6 ? "🔥 দারুণ ঘুরেছে! আবার?" : "আরেকটু বেশি চেপে ধরো…";
            if (!asked) { asked = true; confirm(area, m, opts, 900); }
        };
        hold.addEventListener("pointerdown", down);
        hold.addEventListener("pointerup", up);
        hold.addEventListener("pointerleave", up);
    }

    function radio(area, m, opts) {
        area.innerHTML = `
            <div class="mo-radio">
                <div class="mo-radio-grill"></div>
                <div class="mo-radio-display" id="moFm"><span>FM</span> <b id="moFreq">৯৬.৪</b><small id="moStation">ঝিরঝির…</small></div>
                <input type="range" id="moDial" min="800" max="1080" step="1" value="964" aria-label="রেডিও টিউন করো">
                <div class="mo-radio-scale"><span>৮০</span><span>৮৮</span><span>৯৬</span><span>১০৪</span></div>
            </div>`;
        const dial = area.querySelector("#moDial");
        const freq = area.querySelector("#moFreq");
        const station = area.querySelector("#moStation");
        const box = area.querySelector(".mo-radio");
        let found = false, lastNoise = 0;
        dial.addEventListener("input", () => {
            const v = Number(dial.value) / 10;
            freq.textContent = toBangla(v.toFixed(1));
            const d = Math.abs(v - 88);
            if (d <= 0.3) {
                station.textContent = "👻 ভূত এফএম — এখন শুরু হচ্ছে…";
                box.classList.add("tuned");
                if (!found) { found = true; play("spooky"); confirm(area, m, opts, 1200); }
            } else {
                box.classList.remove("tuned");
                station.textContent = d < 2 ? "কাছাকাছি… আরেকটু!" : "ঝিরঝির…";
                const now = performance.now();
                if (now - lastNoise > 350) { lastNoise = now; play("scratch"); }
            }
        });
    }

    function nokia(area, m, opts) {
        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
        area.innerHTML = `
            <div class="mo-nokia">
                <div class="mo-nokia-screen"><small>GP · ▮▮▮▯</small><b id="moTyped">&nbsp;</b><span id="moMsg">ডায়াল করো: *৫৬৬#</span></div>
                <div class="mo-nokia-keys">${keys.map((k) => `<button type="button" data-k="${k}">${k === "*" || k === "#" ? k : toBangla(k)}</button>`).join("")}</div>
                <button type="button" class="mo-nokia-clear" id="moClear">⌫ মুছো</button>
            </div>`;
        let typed = "";
        let done = false;
        const out = area.querySelector("#moTyped");
        const msg = area.querySelector("#moMsg");
        area.querySelector(".mo-nokia-keys").addEventListener("click", async (e) => {
            const b = e.target.closest("[data-k]");
            if (!b || done) return;
            typed = (typed + b.dataset.k).slice(-8);
            out.textContent = typed.replace(/[0-9]/g, (d) => toBangla(d));
            play("keyBeep");
            if (typed.endsWith("*566#")) {
                done = true;
                msg.textContent = "অনুরোধ পাঠানো হচ্ছে…";
                await wait(1100);
                play("smsBeep");
                area.querySelector(".mo-nokia").classList.add("replied");
                msg.innerHTML = "আপনার মূল ব্যালেন্স <b>১২.৫০</b> টাকা।<br>মেয়াদ: ৩০/১২";
                confirm(area, m, opts, 900);
            }
        });
        area.querySelector("#moClear").addEventListener("click", () => { typed = ""; out.innerHTML = "&nbsp;"; play("keyBeep"); });
    }

    function fan(area, m, opts) {
        area.innerHTML = `
            <div class="mo-fan-stage" id="moFanStage">
                <span class="mo-sweat">💧</span><span class="mo-face" id="moFace">🥵</span>
                <span class="mo-fan" id="moFan">🪭</span>
            </div>
            <div class="mo-meter"><i id="moCool"></i></div>
            <p class="mo-count" id="moFanText">ডানে-বামে টানো বা বারবার চাপো</p>`;
        const stage = area.querySelector("#moFanStage");
        const fanEl = area.querySelector("#moFan");
        const cool = area.querySelector("#moCool");
        let swings = 0, lastX = null, dir = 0, done = false;
        function swing() {
            if (done) return;
            swings++;
            fanEl.classList.toggle("left");
            play("fanSwish");
            cool.style.width = Math.min(100, swings / 8 * 100) + "%";
            if (swings >= 8) {
                done = true;
                area.querySelector("#moFace").textContent = "😌";
                stage.classList.add("cool");
                area.querySelector("#moFanText").textContent = "আহ্‌, শান্তি! কারেন্ট এলো না, কিন্তু বাতাস এলো 😄";
                confirm(area, m, opts, 700);
            }
        }
        stage.addEventListener("click", swing);
        stage.addEventListener("pointermove", (e) => {
            if (e.pointerType === "mouse" && e.buttons === 0) return;
            if (lastX !== null) {
                const d = e.clientX - lastX;
                const nd = Math.sign(d);
                if (Math.abs(d) > 6 && nd !== dir) { dir = nd; swing(); }
            }
            lastX = e.clientX;
        });
    }

    const HANDS = { latim, radio, nokia, fan };

    function render(area, stopId, opts) {
        const m = GCP.MOMENTS[stopId];
        if (!m) return false;
        area.className = `mo mo-k-${m.kind}${m.game ? " mo-g-" + m.game : ""}`;
        if (m.kind === "shelf") shelf(area, m, opts);
        else if (m.kind === "sound") sounds(area, m, opts);
        else if (m.kind === "pick") pick(area, m, opts);
        else if (m.kind === "hands" && HANDS[m.game]) HANDS[m.game](area, m, opts);
        return m;
    }

    return { render };

})();
