
document.addEventListener("DOMContentLoaded", () => {

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

        // Preserve the existing HTML decoration layer.
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
    // 2. CINEMATIC REALISTIC CHILD DOOR TRANSITION
    // ==========================================

    let transitionRunning = false;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // ------------------------------------------
    // CREATE TRANSITION OVERLAY
    // ------------------------------------------

    function createJourneyTransition(message) {

        const overlay = document.createElement("div");

        overlay.className = "journey-transition";
        overlay.setAttribute("aria-hidden", "true");

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


            <!-- REALISTIC CHILD IMAGE ANIMATION -->

            <div class="journey-child" aria-hidden="true">

                <img
                    class="journey-child-walking"
                    src="assets/images/decorations/child-walking.png"
                    alt=""
                    draggable="false"
                >

                <img
                    class="journey-child-pushing"
                    src="assets/images/decorations/child-standing-pushing.png"
                    alt=""
                    draggable="false"
                >

            </div>


            <!-- GOLDEN DOOR LIGHT -->

            <div class="journey-door-glow"></div>


            <!-- FLOATING DUST PARTICLES -->

            <div class="journey-dust">

                ${Array.from(
                    { length: 24 },
                    () => '<span class="journey-dust-particle"></span>'
                ).join("")}

            </div>


            <!-- EXISTING TRANSITION TEXT -->

            <div class="journey-transition__message">
                ${message}
            </div>

        `;

        document.body.appendChild(overlay);

        // Allow browser to render the initial closed-door scene.
        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                overlay.classList.add("child-arriving");

            });

        });

        return overlay;
    }


    // ------------------------------------------
    // PLAY THE COMPLETE DOOR SEQUENCE
    // ------------------------------------------

    
function playDoorSequence(overlay, onDoorOpened, onComplete) {

    if (reducedMotion) {

        overlay.classList.add(
            "child-arriving",
            "child-pushing",
            "is-opening",
            "child-entering"
        );

        window.setTimeout(() => {
            if (typeof onDoorOpened === "function") {
                onDoorOpened();
            }
        }, 100);

        window.setTimeout(() => {
            overlay.remove();

            if (typeof onComplete === "function") {
                onComplete();
            }
        }, 350);

        return;
    }

    // Scene 1: Child slowly walks from the left to the door.
    // child-arriving is already added when the overlay is created.

    // Scene 2: Child reaches the door and stops.
    window.setTimeout(() => {
        overlay.classList.add("child-stopped");
    }, 4500);


    // Scene 3: After stopping, child changes to pushing pose.
    window.setTimeout(() => {
        overlay.classList.add("child-pushing");
    }, 5200);


    // Scene 4: Child pushes the door open.
    window.setTimeout(() => {
        overlay.classList.add("is-opening");
    }, 6100);


    // Scene 5: Door opens and golden light appears.
    // Child starts entering after the door has opened.
    window.setTimeout(() => {
        overlay.classList.add("child-entering");

        if (typeof onDoorOpened === "function") {
            onDoorOpened();
        }
    }, 7300);


    // Scene 6: Complete the journey.
    window.setTimeout(() => {
        overlay.classList.add("journey-complete");

        window.setTimeout(() => {
            overlay.remove();

            if (typeof onComplete === "function") {
                onComplete();
            }
        }, 450);

    }, 8600);
}



    // ------------------------------------------
    // RUN TRANSITION SAFELY
    // ------------------------------------------

    function runJourneyTransition(message, onDoorOpened, onComplete) {

        if (transitionRunning) return;

        transitionRunning = true;

        const overlay = createJourneyTransition(message);

        playDoorSequence(
            overlay,

            onDoorOpened,

            () => {

                transitionRunning = false;

                if (typeof onComplete === "function") {
                    onComplete();
                }

            }
        );

    }


    // ==========================================
    // 3. WELCOME → PROFILE
    // ==========================================

    if (startButton && welcomeScreen && profileScreen) {

        startButton.addEventListener("click", () => {

            if (transitionRunning) return;

            startButton.disabled = true;

            runJourneyTransition(

                "A little step back into your golden days...",

                // Door opens: enter Profile Page.
                () => {

                    welcomeScreen.hidden = true;

                    profileScreen.hidden = false;

                    window.scrollTo({
                        top: 0,
                        behavior: "instant"
                    });

                    profileScreen.classList.remove("chapter-enter");

                    void profileScreen.offsetWidth;

                    profileScreen.classList.add("chapter-enter");

                },

                // Transition finished.
                () => {

                    startButton.disabled = false;

                }

            );

        });

    }


    // ==========================================
    // 4. PROFILE → WELCOME
    // ==========================================

    if (backButton && welcomeScreen && profileScreen) {

        backButton.addEventListener("click", () => {

            if (transitionRunning) return;

            backButton.disabled = true;

            runJourneyTransition(

                "Some memories are worth visiting again...",

                // Door opens: return to Welcome Page.
                () => {

                    profileScreen.hidden = true;

                    welcomeScreen.hidden = false;

                    window.scrollTo({
                        top: 0,
                        behavior: "instant"
                    });

                },

                // Transition finished.
                () => {

                    backButton.disabled = false;

                }

            );

        });

    }


    // ==========================================
    // 5. LOAD SAVED PROFILE DATA
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
                "Could not load saved profile:",
                error
            );

        }

    }


    // ==========================================
    // 6. PROFILE FORM SUBMISSION
    // ==========================================

    if (profileForm) {

        profileForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const nameField = document.getElementById("profileName");

            const dobField = document.getElementById("profileDob");

            const locationField = document.getElementById("childhoodLocation");


            if (!nameField || !dobField || !locationField) {

                console.error("Profile form fields are missing.");

                return;

            }


            const name = nameField.value.trim();

            const dateOfBirth = dobField.value;

            const childhoodLocation = locationField.value.trim();


            const selectedSetting = profileForm.querySelector(
                'input[name="childhoodSetting"]:checked'
            );


            // Validate required fields.
            if (
                !name ||
                !dateOfBirth ||
                !childhoodLocation ||
                !selectedSetting
            ) {

                alert("Please complete all profile fields.");

                return;

            }


            // Validate date of birth.
            const dob = new Date(dateOfBirth + "T00:00:00");

            const today = new Date();

            today.setHours(0, 0, 0, 0);


            if (Number.isNaN(dob.getTime()) || dob > today) {

                alert("Please enter a valid Date of Birth.");

                return;

            }


            // Save profile data.
            const userProfile = {

                name,

                dateOfBirth,

                childhoodLocation,

                childhoodSetting: selectedSetting.value,

                createdAt: new Date().toISOString()

            };


            localStorage.setItem(
                "gcp_user_profile",
                JSON.stringify(userProfile)
            );


            alert("Your profile has been saved successfully!");


            // Quiz navigation will be connected in the next step.

        });

    }

});
