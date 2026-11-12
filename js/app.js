
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. ELEMENTS
    // ==========================================

    const welcomeScreen = document.querySelector(".welcome-page");
    const profileScreen = document.getElementById("profileScreen");

    const startButton = document.getElementById("startJourney");
    const backButton = document.getElementById("backToWelcome");

    const profileForm = document.getElementById("childhoodProfileForm");

    // ==========================================
    // 2. WELCOME PAGE → PROFILE PAGE
    // ==========================================

    if (startButton && welcomeScreen && profileScreen) {
        startButton.addEventListener("click", () => {

            welcomeScreen.hidden = true;
            profileScreen.hidden = false;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

    // ==========================================
    // 3. PROFILE PAGE → WELCOME PAGE
    // ==========================================

    if (backButton && welcomeScreen && profileScreen) {
        backButton.addEventListener("click", () => {

            profileScreen.hidden = true;
            welcomeScreen.hidden = false;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

    // ==========================================
    // 4. LOAD SAVED PROFILE DATA
    // ==========================================

    const savedProfile = localStorage.getItem("gcp_user_profile");

    if (savedProfile && profileForm) {
        try {
            const profile = JSON.parse(savedProfile);

            if (profile.name) {
                document.getElementById("profileName").value = profile.name;
            }

            if (profile.dateOfBirth) {
                document.getElementById("profileDob").value = profile.dateOfBirth;
            }

            if (profile.childhoodLocation) {
                document.getElementById("childhoodLocation").value =
                    profile.childhoodLocation;
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
            console.error("Could not load saved profile:", error);
        }
    }

    // ==========================================
    // 5. PROFILE FORM SUBMISSION
    // ==========================================

    if (profileForm) {
        profileForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document.getElementById("profileName").value.trim();
            const dateOfBirth = document.getElementById("profileDob").value;
            const childhoodLocation =
                document.getElementById("childhoodLocation").value.trim();

            const selectedSetting = profileForm.querySelector(
                'input[name="childhoodSetting"]:checked'
            );

            // Basic validation
            if (!name || !dateOfBirth || !childhoodLocation || !selectedSetting) {
                alert("Please complete all profile fields.");
                return;
            }

            // Future date validation
            const dob = new Date(dateOfBirth + "T00:00:00");
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (dob > today) {
                alert("Date of Birth cannot be in the future.");
                return;
            }

            // Profile data
            const userProfile = {
                name: name,
                dateOfBirth: dateOfBirth,
                childhoodLocation: childhoodLocation,
                childhoodSetting: selectedSetting.value,
                createdAt: new Date().toISOString()
            };

            // Save profile
            localStorage.setItem(
                "gcp_user_profile",
                JSON.stringify(userProfile)
            );

            alert("Your profile has been saved successfully!");

            // Quiz navigation will be connected in the next step.

        });
    }

});
