/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   CHAPTER 00 — WELCOME
   ------------------------------------------
   1. Time rewinds: the year counts backwards
      to the visitor's childhood (once per visit)
   2. Camera flash → the picture "develops"
   3. Living picture: slow zoom, parallax,
      sun rays, dust in the light, birds
   4. Polaroids keep flipping to new memories
   5. Memory marquee at the bottom
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const root = document.getElementById("welcome");
    if (!root) return;

    const { toBangla, wait, reducedMotion, pick } = GCP.helpers;
    const $ = (id) => document.getElementById(id);

    const profile = GCP.storage.getProfile();
    const journey = GCP.storage.getJourney();
    const nickname = profile && (profile.nickname || profile.name);
    const answered = Object.values(journey.answers || {}).filter((a) => a && a.v).length;

    // ======================================
    // 1. RETURNING VISITOR
    // ======================================

    if (nickname) {
        $("ctaText").textContent = answered > 0 ? `আবার চলো, ${nickname}` : `শুরু করো, ${nickname}`;
    }
    if (journey.finished || answered >= 36) {
        $("passportLink").hidden = false;
    }

    // ======================================
    // 2. TIME REWIND INTRO
    // ======================================

    const rewind = $("rewind");
    const thisYear = new Date().getFullYear();
    const targetYear = profile && profile.birthYear ? Number(profile.birthYear) + 8 : 1998;

    let seen = false;
    try { seen = sessionStorage.getItem("gcp_rewind_seen") === "1"; } catch (e) { /* private mode */ }

    function reveal() {
        if (root.classList.contains("is-live")) return;
        try { sessionStorage.setItem("gcp_rewind_seen", "1"); } catch (e) { /* ignore */ }
        root.classList.add("is-flash");
        setTimeout(() => root.classList.add("is-live"), 120);
        setTimeout(() => { rewind.hidden = true; }, 1300);
    }

    async function runRewind() {
        root.classList.add("is-rewinding");
        const yearNode = $("rewindYear");
        const textNode = $("rewindText");
        const from = thisYear;
        const to = Math.min(targetYear, thisYear - 1);
        const steps = from - to;
        const total = 1900;

        await wait(450);
        const start = performance.now();
        await new Promise((resolve) => {
            function frame(now) {
                const t = Math.min(1, (now - start) / total);
                const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                yearNode.textContent = toBangla(Math.round(from - steps * eased));
                if (t < 1 && !root.classList.contains("is-live")) requestAnimationFrame(frame);
                else resolve();
            }
            requestAnimationFrame(frame);
        });
        if (root.classList.contains("is-live")) return;

        yearNode.classList.add("landed");
        textNode.textContent = nickname ? `${nickname}, তোমার শৈশবে স্বাগতম।` : "তোমার শৈশবে স্বাগতম।";
        await wait(900);
        reveal();
    }

    $("rewindSkip").addEventListener("click", reveal);

    if (seen || reducedMotion()) {
        rewind.hidden = true;
        root.classList.add("is-live", "no-intro");
    } else {
        runRewind();
    }

    // ======================================
    // 3. LIVING PICTURE
    // ======================================

    (function dust() {
        let html = "";
        for (let i = 0; i < 26; i++) {
            html += `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${(20 + Math.random() * 70).toFixed(1)}%;--s:${(2 + Math.random() * 3).toFixed(1)}px;animation-duration:${(7 + Math.random() * 8).toFixed(1)}s;animation-delay:-${(Math.random() * 10).toFixed(1)}s"></i>`;
        }
        $("wDust").innerHTML = html;
    })();

    // parallax: mouse on desktop, tilt on phones
    const scene = $("wScene");
    let targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;

    function loop() {
        curX += (targetX - curX) * 0.06;
        curY += (targetY - curY) * 0.06;
        scene.style.setProperty("--px", curX.toFixed(3));
        scene.style.setProperty("--py", curY.toFixed(3));
        if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) rafId = requestAnimationFrame(loop);
        else rafId = null;
    }
    function aim(x, y) {
        targetX = Math.max(-1, Math.min(1, x));
        targetY = Math.max(-1, Math.min(1, y));
        if (!rafId) rafId = requestAnimationFrame(loop);
    }
    if (!reducedMotion()) {
        window.addEventListener("pointermove", (e) => {
            if (e.pointerType === "mouse") aim(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1);
        }, { passive: true });
        window.addEventListener("deviceorientation", (e) => {
            if (e.gamma == null) return;
            aim(e.gamma / 30, (e.beta - 45) / 30);
        }, { passive: true });
    }

    // ======================================
    // 4. POLAROIDS — a new memory every few seconds
    // ======================================

    const polaroids = [...document.querySelectorAll(".w-pol")];
    const pool = Object.keys(GCP.SCENES || {});
    const favourites = ["M02", "E01", "G04", "T01", "FA03", "C05", "M01", "G07", "V02", "SP01", "I01", "E05"];
    const shown = new Set();

    function nextId() {
        const source = shown.size < favourites.length ? favourites : pool;
        let id = pick(source);
        let guard = 0;
        while ((shown.has(id) || polaroids.some((p) => p.dataset.id === id)) && guard++ < 30) id = pick(source);
        shown.add(id);
        if (shown.size >= pool.length) shown.clear();
        return id;
    }

    function fill(pol, id) {
        pol.dataset.id = id;
        const box = pol.querySelector(".sc");
        GCP.scene.render(box, id);
        box.querySelectorAll(".sc-caption, .sc-replay").forEach((n) => n.remove());
        pol.querySelector("figcaption").textContent = GCP.SCENES[id][3].replace(/"/g, "");
    }

    polaroids.forEach((pol) => fill(pol, nextId()));

    let turn = 0;
    function flipOne() {
        if (document.hidden || root.hidden) return;
        const pol = polaroids[turn++ % polaroids.length];
        pol.classList.add("flip-out");
        setTimeout(() => {
            fill(pol, nextId());
            pol.classList.remove("flip-out");
            pol.classList.add("flip-in");
            setTimeout(() => pol.classList.remove("flip-in"), 700);
        }, 450);
    }
    if (!reducedMotion()) setInterval(flipOne, 3200);

    polaroids.forEach((pol) => {
        pol.addEventListener("click", () => {
            const settings = GCP.storage.getSettings();
            if (settings.sound && !GCP.sound.isEnabled()) GCP.sound.setEnabled(true);
            GCP.scene.poke(pol.querySelector(".sc"));
        });
    });

    // ======================================
    // 5. MEMORY MARQUEE
    // ======================================

    const words = ["হারিকেন", "Bhoot FM", "টিফিন চুরি", "লাটিম", "আলিফ লায়লা", "Flexiload", "মার্বেল", "Nokia 1100",
        "ঘুড়ি কাটাকাটি", "সালামি", "রিকশার ঘণ্টা", "সাইবার ক্যাফে", "জোনাকি", "কাঁচা আম", "লোডশেডিং", "Mostofa Game",
        "দাদির গল্প", "চিঠি", "ঈদের নতুন জামা", "বৃষ্টিতে কাগজের নৌকা"];
    const line = words.map((w) => `<span>${w}</span><b>✦</b>`).join("");
    $("ticker").innerHTML = line + line;
});
