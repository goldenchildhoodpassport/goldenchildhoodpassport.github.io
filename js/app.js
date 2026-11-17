document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. ELEMENT REFERENCES
    // ==========================================

    const welcomeScreen = document.querySelector(".welcome-page");
    const profileScreen = document.getElementById("profileScreen");

    const startButton = document.getElementById("startJourney");
    const backButton = document.getElementById("backToWelcome");

    const profileForm = document.getElementById("childhoodProfileForm");

    // ==========================================
    // 1. CHILDHOOD WORLD DECORATIONS
    // ==========================================

    function createChildhoodWorld() {
        if (!welcomeScreen) return;

        // Do not duplicate decorations already written in index.html.
        if (welcomeScreen.querySelector(".childhood-world")) {
            return;
        }

        const sunlight = document.createElement("div");
        sunlight.className = "childhood-sunlight";
        sunlight.setAttribute("aria-hidden", "true");

        const world = document.createElement("div");
        world.className = "childhood-world";
        world.setAttribute("aria-hidden", "true");

        world.innerHTML = `
            <div class="memory-kite">
                <span class="kite-cross"></span>
            </div>
            <div class="memory-plane"></div>
            <div class="childhood-runner runner-one"></div>
            <div class="childhood-runner runner-two"></div>
        `;

        for (let i = 0; i < 18; i++) {
            const particle = document.createElement("span");
            particle.className = "memory-particle";
            particle.style.left = `${5 + Math.random() * 90}%`;
            particle.style.top = `${15 + Math.random() * 75}%`;
            particle.style.setProperty(
                "--float-duration",
                `${7 + Math.random() * 7}s`
            );
            particle.style.setProperty(
                "--float-delay",
                `${Math.random() * -12}s`
            );
            world.appendChild(particle);
        }

        welcomeScreen.prepend(world);
        welcomeScreen.prepend(sunlight);
    }

    createChildhoodWorld();

    // ==========================================
    // 2. CHILD FRAME ASSETS
    // ==========================================

    let transitionRunning = false;

    const reducedMotion = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    const CHILD_FRAME_PATH = "assets/images/decorations/child/";

    const CHILD_FRAMES = {
        walk: [
            "walk-01.png",
            "walk-02.png",
            "walk-03.png",
            "walk-04.png"
        ],
        turn: [
            "turn-01.png",
            "turn-02.png",
            "turn-03.png"
        ],
        push: [
            "push-01.png",
            "push-02.png"
        ],
        enter: [
            "enter-01.png",
            "enter-02.png",
            "enter-03.png",
            "enter-04.png"
        ]
    };

    const childFrameCache = new Map();

    function preloadChildFrames() {
        const filenames = Object.values(CHILD_FRAMES).flat();

        const tasks = filenames.map((filename) => {
            return new Promise((resolve) => {
                const image = new Image();

                image.onload = () => {
                    childFrameCache.set(filename, image);
                    resolve({ filename, loaded: true });
                };

                image.onerror = () => {
                    console.error(
                        `[Golden Childhood Passport] Image not found: ${CHILD_FRAME_PATH}${filename}`
                    );
                    resolve({ filename, loaded: false });
                };

                image.src = CHILD_FRAME_PATH + filename;
            });
        });

        return Promise.all(tasks).then((results) => {
            const failed = results
                .filter((item) => !item.loaded)
                .map((item) => item.filename);

            if (failed.length) {
                console.error(
                    "[Golden Childhood Passport] Failed child frames:",
                    failed
                );
            }

            return {
                allLoaded: failed.length === 0,
                failed
            };
        });
    }

    // Start preloading immediately, not after clicking Start Journey.
    const childFramesReady = preloadChildFrames();

    // ==========================================
    // 3. GENERAL ANIMATION HELPERS
    // ==========================================

    function wait(milliseconds) {
        return new Promise((resolve) => {
            window.setTimeout(resolve, milliseconds);
        });
    }

    function easeInOutCubic(progress) {
        return progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    function getFrameImage(filename) {
        return childFrameCache.get(filename) || null;
    }

    function setChildFrame(childImage, filename) {
    if (!childImage) return false;

    const frame = childFrameCache.get(filename);

    // Use cached image when available.
    if (frame) {
        if (childImage.dataset.currentFrame !== filename) {
            childImage.src = frame.src;
            childImage.dataset.currentFrame = filename;
        }

        return true;
    }

    // If preload is still running, load this frame directly.
    if (childImage.dataset.currentFrame !== filename) {
        childImage.src = CHILD_FRAME_PATH + filename;
        childImage.dataset.currentFrame = filename;
    }

    return true;
}

    function setChildPosition(
        child,
        {
            left = 50,
            bottom = 7,
            scale = 1,
            opacity = 1
        } = {}
    ) {
        if (!child) return;

        // Inline !important prevents older CSS keyframes/transforms
        // from overriding the live JavaScript position.
        child.style.setProperty("position", "absolute", "important");
        child.style.setProperty("left", `${left}%`, "important");
        child.style.setProperty("bottom", `${bottom}%`, "important");
        child.style.setProperty(
            "transform",
            `translateX(-50%) scale(${scale})`,
            "important"
        );
        child.style.setProperty("opacity", String(opacity), "important");
        child.style.setProperty("transition", "none", "important");
        child.style.setProperty("animation", "none", "important");
    }

    function setupChildAnimation(child, childImage) {
        if (!child || !childImage) {
            throw new Error("Child animation elements were not created.");
        }

        child.style.setProperty("position", "absolute", "important");
        child.style.setProperty("left", "-5%", "important");
        child.style.setProperty("bottom", "7%", "important");
        child.style.setProperty(
            "width",
            "clamp(130px, 14vw, 190px)",
            "important"
        );
        child.style.setProperty(
            "height",
            "clamp(170px, 32vh, 260px)",
            "important"
        );
        child.style.setProperty("display", "block", "important");
        child.style.setProperty("visibility", "visible", "important");
        child.style.setProperty("opacity", "1", "important");
        child.style.setProperty("z-index", "50", "important");
        child.style.setProperty("pointer-events", "none", "important");
        child.style.setProperty("transition", "none", "important");
        child.style.setProperty("animation", "none", "important");
        child.style.setProperty(
            "transform",
            "translateX(-50%) scale(1)",
            "important"
        );

        child.style.transformOrigin = "bottom center";
        child.style.willChange = "left, bottom, transform, opacity";
        child.style.filter =
            "drop-shadow(0 8px 9px rgba(35, 20, 10, 0.25))";

        childImage.style.setProperty("display", "block", "important");
        childImage.style.setProperty("position", "absolute", "important");
        childImage.style.setProperty("inset", "0", "important");
        childImage.style.setProperty("width", "100%", "important");
        childImage.style.setProperty("height", "100%", "important");
        childImage.style.setProperty("object-fit", "contain", "important");
        childImage.style.setProperty(
            "object-position",
            "center bottom",
            "important"
        );
        childImage.style.setProperty("visibility", "visible", "important");
        childImage.style.setProperty("transition", "none", "important");
        childImage.style.setProperty("animation", "none", "important");
        childImage.draggable = false;
        childImage.alt = "";
    }
        // ==========================================
    // 4. WALKING / ENTERING MOVEMENT
    // ==========================================

    function animateWalking(
        overlay,
        child,
        childImage,
        {
            fromLeft,
            toLeft,
            fromBottom = 7,
            toBottom = 7,
            fromScale = 1,
            toScale = 1,
            duration,
            frames,
            fadeOut = false,
            frameInterval = 170
        }
    ) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            let lastFrameIndex = -1;
            let animationId = null;

            function animate(currentTime) {
                if (!overlay.isConnected) {
                    if (animationId !== null) {
                        cancelAnimationFrame(animationId);
                    }
                    resolve();
                    return;
                }

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);

                const left =
                    fromLeft + (toLeft - fromLeft) * eased;
                const bottom =
                    fromBottom + (toBottom - fromBottom) * eased;
                const scale =
                    fromScale + (toScale - fromScale) * eased;
                const opacity = fadeOut ? 1 - eased : 1;

                setChildPosition(child, {
                    left,
                    bottom,
                    scale,
                    opacity
                });

                // Cycle through the walking PNGs while the character moves.
                const frameIndex =
                    Math.floor(elapsed / frameInterval) % frames.length;

                if (frameIndex !== lastFrameIndex) {
                    setChildFrame(childImage, frames[frameIndex]);
                    lastFrameIndex = frameIndex;
                }

                if (progress < 1) {
                    animationId = requestAnimationFrame(animate);
                } else {
                    setChildPosition(child, {
                        left: toLeft,
                        bottom: toBottom,
                        scale: toScale,
                        opacity: fadeOut ? 0 : 1
                    });
                    resolve();
                }
            }

            animationId = requestAnimationFrame(animate);
        });
    }

    async function playFrameSequence(
        overlay,
        childImage,
        frames,
        frameDuration
    ) {
        for (const filename of frames) {
            if (!overlay.isConnected) return;

            setChildFrame(childImage, filename);
            await wait(frameDuration);
        }
    }

    // ==========================================
    // 5. CREATE THE CINEMATIC DOOR OVERLAY
    // ==========================================

    function createJourneyTransition(message) {
        const overlay = document.createElement("div");
        overlay.className = "journey-transition";
        overlay.setAttribute("aria-hidden", "true");

        const messageElement = document.createElement("div");
        messageElement.className = "journey-transition__message";
        messageElement.textContent = message;

        overlay.innerHTML = `
            <div class="journey-light"></div>

            <div class="journey-door-frame">
                <div class="journey-door journey-door-left">
                    <div class="door-wood-grain"></div>
                    <div class="door-panel door-panel-top"></div>
                    <div class="door-panel door-panel-bottom"></div>
                    <div class="door-handle"></div>
                </div>

                <div class="journey-door journey-door-right">
                    <div class="door-wood-grain"></div>
                    <div class="door-panel door-panel-top"></div>
                    <div class="door-panel door-panel-bottom"></div>
                    <div class="door-handle"></div>
                </div>
            </div>

            <div class="journey-child" aria-hidden="true">
                <img class="journey-child-frame" alt="" draggable="false">
            </div>

            <div class="journey-door-glow"></div>

            <div class="journey-dust">
                ${Array.from(
                    { length: 24 },
                    () => '<span class="journey-dust-particle"></span>'
                ).join("")}
            </div>
        `;

        overlay.appendChild(messageElement);
        document.body.appendChild(overlay);

        const child = overlay.querySelector(".journey-child");
        const childImage = overlay.querySelector(".journey-child-frame");

        setupChildAnimation(child, childImage);

        // Set the first frame and exact starting point before showing motion.
        setChildFrame(childImage, CHILD_FRAMES.walk[0]);
        setChildPosition(child, {
            left: 5,
            bottom: 7,
            scale: 1,
            opacity: 1
        });

        overlay.classList.add("child-arriving");

        return { overlay, child, childImage };
    }

    // ==========================================
    // 6. FULL DOOR JOURNEY SEQUENCE
    // ==========================================

    async function playDoorSequence(scene, onDoorOpened, onComplete) {
        const { overlay, child, childImage } = scene;

        let doorOpenedCallbackCalled = false;
        let completed = false;

        function notifyDoorOpened() {
            if (doorOpenedCallbackCalled) return;
            doorOpenedCallbackCalled = true;

            if (typeof onDoorOpened === "function") {
                onDoorOpened();
            }
        }

        function finishTransition() {
            if (completed) return;
            completed = true;

            overlay.classList.add("journey-complete");

            window.setTimeout(() => {
                overlay.remove();

                if (typeof onComplete === "function") {
                    onComplete();
                }
            }, 650);
        }

        // Wait for all child images to load before starting the sequence.
        if (!overlay.isConnected) return;

        // Reduced-motion fallback.
        if (reducedMotion) {
            setChildFrame(childImage, "push-02.png");
            setChildPosition(child, {
                left: 50,
                bottom: 7,
                scale: 1,
                opacity: 1
            });

            overlay.classList.add(
                "child-stopped",
                "child-pushing",
                "is-opening"
            );

            await wait(250);
            if (!overlay.isConnected) return;

            notifyDoorOpened();
            finishTransition();
            return;
        }

        // --------------------------------------
        // SCENE 1: WALK FROM LEFT TO CENTER
        // --------------------------------------

        setChildFrame(childImage, "walk-01.png");
        setChildPosition(child, {
            left: -15,
            bottom: 7,
            scale: 1,
            opacity: 1
        });

               await animateWalking(
            overlay,
            child,
            childImage,
            {
                fromLeft: 5,
                toLeft: 50,
                fromBottom: 7,
                toBottom: 7,
                fromScale: 1,
                toScale: 1,
                duration: 17000,
                frames: CHILD_FRAMES.walk,
                frameInterval: 320
            }
        );

        if (!overlay.isConnected) return;

        // Stop in front of the door.
        setChildPosition(child, {
            left: 50,
            bottom: 7,
            scale: 1,
            opacity: 1
        });
        setChildFrame(childImage, "turn-01.png");
        overlay.classList.add("child-stopped");

        await wait(850);
        if (!overlay.isConnected) return;

        // --------------------------------------
        // SCENE 2: TURN TO FACE THE DOOR
        // --------------------------------------

        await playFrameSequence(
            overlay,
            childImage,
            CHILD_FRAMES.turn,
            450
        );

        if (!overlay.isConnected) return;

        setChildFrame(childImage, "turn-03.png");
        await wait(550);
        if (!overlay.isConnected) return;

        // --------------------------------------
        // SCENE 3: RAISE ARMS AND PUSH
        // --------------------------------------

        overlay.classList.add("child-pushing");

        setChildFrame(childImage, "push-01.png");
await wait(450);
if (!overlay.isConnected) return;

setChildFrame(childImage, "push-02.png");
await wait(650);
if (!overlay.isConnected) return;

// Short natural pause after pushing.
await wait(400);
if (!overlay.isConnected) return;

// --------------------------------------
// SCENE 4: OPEN THE DOUBLE DOOR
// --------------------------------------

overlay.classList.add("is-opening");
setChildFrame(childImage, "turn-03.png");

// Wait only until the doors finish opening.
await wait(1200);
if (!overlay.isConnected) return;

// Immediately begin entering. No extra hold.
overlay.classList.add("child-entering");
notifyDoorOpened();

                await animateWalking(
            overlay,
            child,
            childImage,
            {
                fromLeft: 50,
                toLeft: 50,
                fromBottom: 7,
                toBottom: 19,
                fromScale: 1,
                toScale: 0.42,
                duration: 5500,
                frames: CHILD_FRAMES.enter,
                fadeOut: true,
                frameInterval: 300
            }
        );

        if (!overlay.isConnected) return;

        await wait(350);
        finishTransition();
    }

    // ==========================================
    // 7. RUN TRANSITION WITH ERROR HANDLING
    // ==========================================

    function runJourneyTransition(message, onDoorOpened, onComplete) {
        if (transitionRunning) return;

        transitionRunning = true;

        let scene;

        try {
            scene = createJourneyTransition(message);
        } catch (error) {
            console.error(
                "[Golden Childhood Passport] Could not create transition:",
                error
            );
            transitionRunning = false;
            if (typeof onComplete === "function") onComplete();
            return;
        }

        playDoorSequence(scene, onDoorOpened, () => {
            transitionRunning = false;

            if (typeof onComplete === "function") {
                onComplete();
            }
        }).catch((error) => {
            console.error(
                "[Golden Childhood Passport] Door animation failed:",
                error
            );

            if (scene && scene.overlay) {
                scene.overlay.remove();
            }

            transitionRunning = false;

            // Keep navigation usable if an animation error occurs.
            if (typeof onComplete === "function") {
                onComplete();
            }
        });
    }

    // ==========================================
    // 8. WELCOME -> PROFILE
    // ==========================================

    if (startButton && welcomeScreen && profileScreen) {
        startButton.addEventListener("click", () => {
            if (transitionRunning) return;

            startButton.disabled = true;

            runJourneyTransition(
                "A little step back into your golden days...",
                () => {
                    welcomeScreen.hidden = true;
                    profileScreen.hidden = false;

                    window.scrollTo({
                        top: 0,
                        behavior: "auto"
                    });

                    profileScreen.classList.remove("chapter-enter");
                    void profileScreen.offsetWidth;
                    profileScreen.classList.add("chapter-enter");
                },
                () => {
                    startButton.disabled = false;
                }
            );
        });
    }

    // ==========================================
    // 9. PROFILE -> WELCOME
    // ==========================================

    if (backButton && welcomeScreen && profileScreen) {
        backButton.addEventListener("click", () => {
            if (transitionRunning) return;

            backButton.disabled = true;

            runJourneyTransition(
                "Some memories are worth visiting again...",
                () => {
                    profileScreen.hidden = true;
                    welcomeScreen.hidden = false;

                    window.scrollTo({
                        top: 0,
                        behavior: "auto"
                    });
                },
                () => {
                    backButton.disabled = false;
                }
            );
        });
    }
        // ==========================================
    // 10. LOAD SAVED PROFILE DATA
    // ==========================================

    const savedProfile = localStorage.getItem("gcp_user_profile");

    if (savedProfile && profileForm) {
        try {
            const profile = JSON.parse(savedProfile);

            const nameField = document.getElementById("profileName");
            const dobField = document.getElementById("profileDob");
            const locationField = document.getElementById("childhoodLocation");

            if (nameField && profile.name) {
                nameField.value = profile.name;
            }

            if (dobField && profile.dateOfBirth) {
                dobField.value = profile.dateOfBirth;
            }

            if (locationField && profile.childhoodLocation) {
                locationField.value = profile.childhoodLocation;
            }

            if (profile.childhoodSetting) {
                const settingInput = profileForm.querySelector(
                    `input[name="childhoodSetting"][value="${profile.childhoodSetting}"]`
                );

                if (settingInput) {
                    settingInput.checked = true;
                }
            }
        } catch (error) {
            console.error(
                "[Golden Childhood Passport] Could not load saved profile:",
                error
            );
        }
    }

 
    // ==========================================
    // 11. PROFILE FORM SUBMISSION
    // ==========================================

    if (profileForm) {

        profileForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const nameField = document.getElementById("profileName");
            const dobField = document.getElementById("profileDob");
            const locationField = document.getElementById("childhoodLocation");

            const selectedSetting = profileForm.querySelector(
                'input[name="childhoodSetting"]:checked'
            );

            if (!nameField || !dobField || !locationField) {
                console.error("Profile form fields are missing.");
                return;
            }

            const name = nameField.value.trim();
            const dateOfBirth = dobField.value;
            const childhoodLocation = locationField.value.trim();

            if (!name || !dateOfBirth || !selectedSetting) {
                alert("Please complete all required profile fields.");
                return;
            }

            const dob = new Date(dateOfBirth + "T00:00:00");
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (Number.isNaN(dob.getTime()) || dob > today) {
                alert("Please enter a valid Date of Birth.");
                return;
            }

            const userProfile = {
                name: name,
                dateOfBirth: dateOfBirth,
                childhoodLocation: childhoodLocation,
                childhoodSetting: selectedSetting.value,
                createdAt: new Date().toISOString()
            };

            try {

                localStorage.setItem(
                    "gcp_user_profile",
                    JSON.stringify(userProfile)
                );

                console.log("Profile saved successfully.");

                // Navigate to Chapter 02
                window.location.href = "./quiz.html";

            } catch (error) {

                console.error("Profile saving error:", error);

                alert(
                    "Your profile could not be saved. Please check browser storage."
                );

            }

        });

    }

});