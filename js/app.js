/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   WELCOME ⇄ PROFILE — THE DOOR SCENE
   ------------------------------------------
   A child walks up to an old wooden door
   (with its iron শিকল), pushes it open, and
   walks into the golden light of childhood.
   • frames cross-fade, so the walk is smooth
   • movement runs on requestAnimationFrame
   • whole scene ≈ 6.5 s, tap to skip
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const welcomeScreen = document.querySelector(".w-welcome") || document.querySelector(".welcome-page");
    const profileScreen = document.getElementById("profileScreen");
    const startButton = document.getElementById("startJourney");
    const backButton = document.getElementById("backToWelcome");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FRAME_PATH = "assets/images/decorations/child-hd/";
    const FRAMES = {
        walk: ["walk-01", "walk-02", "walk-03", "walk-04"],
        turn: ["turn-01", "turn-02", "turn-03"],
        push: ["push-01", "push-02"],
        enter: ["enter-01", "enter-02", "enter-03", "enter-04"]
    };

    // preload every frame right away
    const preloaded = Object.values(FRAMES).flat().map((name) => {
        const img = new Image();
        img.src = FRAME_PATH + name + ".webp";
        return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
    });

    let running = false;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const ease = {
        outCubic: (t) => 1 - Math.pow(1 - t, 3),
        inOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
        walk: (t) => (t < 0.85 ? t / 0.85 * 0.9 : 0.9 + ease.outCubic((t - 0.85) / 0.15) * 0.1)
    };

    function sound(name) {
        if (window.GCP && GCP.sound) GCP.sound.play(name);
    }

    // ======================================
    // 1. BUILD THE SCENE
    // ======================================

    function build(message) {
        const overlay = document.createElement("div");
        overlay.className = "dr";
        overlay.setAttribute("aria-hidden", "true");
        overlay.innerHTML = `
            <div class="dr-camera">
                <div class="dr-wall"></div>
                <div class="dr-lamp"></div>
                <div class="dr-doorway">
                    <div class="dr-beyond"></div>
                    <div class="dr-door dr-left">
                        <i class="p p1"></i><i class="p p2"></i><i class="ring"></i>
                    </div>
                    <div class="dr-door dr-right">
                        <i class="p p1"></i><i class="p p2"></i><i class="ring"></i>
                        <i class="chain"></i>
                    </div>
                    <div class="dr-frame"></div>
                </div>
                <div class="dr-floor"></div>
                <div class="dr-spill"></div>
                <div class="dr-motes">${"<i></i>".repeat(22)}</div>
                <div class="dr-child">
                    <img class="a" alt="" draggable="false">
                    <img class="b" alt="" draggable="false">
                    <span class="dr-shadow"></span>
                </div>
            </div>
            <p class="dr-msg">${message}</p>
            <button class="dr-skip" type="button">এড়িয়ে যাও ↠</button>
            <div class="dr-wash"></div>`;
        document.body.appendChild(overlay);

        overlay.querySelectorAll(".dr-motes i").forEach((m) => {
            m.style.left = 38 + Math.random() * 24 + "%";
            m.style.top = 30 + Math.random() * 55 + "%";
            m.style.animationDelay = -Math.random() * 6 + "s";
            m.style.animationDuration = 4 + Math.random() * 5 + "s";
        });

        const child = overlay.querySelector(".dr-child");
        const imgs = [child.querySelector(".a"), child.querySelector(".b")];
        let front = 0;
        let current = "";

        function frame(name) {
            if (name === current) return;
            current = name;
            const next = imgs[1 - front];
            next.src = FRAME_PATH + name + ".webp";
            next.classList.add("on");
            imgs[front].classList.remove("on");
            front = 1 - front;
        }

        function place(x, y, scale, opacity = 1) {
            child.style.transform = `translate3d(calc(${x}vw - 50%), ${-y}vh, 0) scale(${scale})`;
            child.style.opacity = opacity;
        }

        return { overlay, child, frame, place };
    }

    /* move the child with rAF while cycling frames */
    function tween({ duration, frames, interval, update, frameFn, isCancelled }) {
        return new Promise((resolve) => {
            const start = performance.now();
            let lastFrame = -1;
            function step(now) {
                if (isCancelled()) return resolve();
                const t = Math.min(1, (now - start) / duration);
                update(t);
                if (frames) {
                    const f = Math.floor((now - start) / interval) % frames.length;
                    if (f !== lastFrame) { frameFn(frames[f]); lastFrame = f; if (f % 2 === 0) sound("step"); }
                }
                if (t < 1) requestAnimationFrame(step); else resolve();
            }
            requestAnimationFrame(step);
        });
    }

    // ======================================
    // 2. PLAY THE SCENE
    // ======================================

    async function play(message, onSwitch) {
        await Promise.race([Promise.all(preloaded), wait(1500)]);

        const scene = build(message);
        const { overlay, frame, place } = scene;
        let skipped = false;
        let switched = false;
        const cancelled = () => skipped;

        function doSwitch() {
            if (switched) return;
            switched = true;
            onSwitch();
        }

        async function finish() {
            overlay.classList.add("wash");
            await wait(520);
            doSwitch();
            await wait(120);
            overlay.classList.add("out");
            await wait(750);
            overlay.remove();
        }

        overlay.querySelector(".dr-skip").addEventListener("click", () => { if (!skipped) { skipped = true; finish(); } });
        overlay.addEventListener("click", (e) => {
            if (e.target.closest(".dr-skip") || skipped) return;
            skipped = true;
            finish();
        });

        frame("walk-01");
        place(-12, 0, 1);
        requestAnimationFrame(() => overlay.classList.add("in"));

        if (reducedMotion) {
            await wait(300);
            skipped = true;
            return finish();
        }

        await wait(350);
        if (skipped) return;

        // walk in from the left
        await tween({
            duration: 2500, frames: FRAMES.walk, interval: 120, frameFn: frame, isCancelled: cancelled,
            update: (t) => place(-12 + 62 * ease.walk(t), 0, 1)
        });
        if (skipped) return;

        // stop, turn to the door
        frame("turn-01"); await wait(260); if (skipped) return;
        frame("turn-02"); await wait(170); if (skipped) return;
        frame("turn-03"); await wait(320); if (skipped) return;

        // push the old door
        frame("push-01"); sound("knock"); await wait(260); if (skipped) return;
        frame("push-02");
        overlay.classList.add("open");
        sound("almirah");
        setTimeout(() => sound("sparkle"), 500);
        await wait(1150);
        if (skipped) return;

        // walk into the light
        overlay.classList.add("enter");
        await tween({
            duration: 1900, frames: FRAMES.enter, interval: 150, frameFn: frame, isCancelled: cancelled,
            update: (t) => {
                const e = ease.inOut(t);
                place(50, 15 * e, 1 - 0.5 * e, t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1);
            }
        });
        if (skipped) return;
        skipped = true;
        await finish();
    }

    function runTransition(message, onSwitch, onDone) {
        if (running) return;
        running = true;
        play(message, onSwitch)
            .catch((error) => {
                console.error("[GCP] Door scene failed:", error);
                document.querySelectorAll(".dr").forEach((n) => n.remove());
                onSwitch();
            })
            .finally(() => {
                running = false;
                if (onDone) onDone();
            });
    }

    // ======================================
    // 3. WELCOME → PROFILE
    // ======================================

    if (startButton && welcomeScreen && profileScreen) {
        startButton.addEventListener("click", () => {
            if (running) return;
            startButton.disabled = true;

            // remember the sound choice from earlier visits
            try {
                const settings = JSON.parse(localStorage.getItem("gcp_settings") || "{}");
                if (settings.sound && window.GCP && GCP.sound) GCP.sound.setEnabled(true);
            } catch (e) { /* ignore */ }

            runTransition("চলো, একটু পেছনে ফিরে যাই…", () => {
                welcomeScreen.hidden = true;
                profileScreen.hidden = false;
                window.scrollTo({ top: 0, behavior: "auto" });
                profileScreen.classList.remove("chapter-enter");
                void profileScreen.offsetWidth;
                profileScreen.classList.add("chapter-enter");
            }, () => { startButton.disabled = false; });
        });
    }

    // ======================================
    // 4. PROFILE → WELCOME
    // ======================================

    if (backButton && welcomeScreen && profileScreen) {
        backButton.addEventListener("click", () => {
            if (running) return;
            backButton.disabled = true;
            runTransition("কিছু স্মৃতি আবার দেখতে ইচ্ছে করে…", () => {
                profileScreen.hidden = true;
                welcomeScreen.hidden = false;
                window.scrollTo({ top: 0, behavior: "auto" });
            }, () => { backButton.disabled = false; });
        });
    }
});
