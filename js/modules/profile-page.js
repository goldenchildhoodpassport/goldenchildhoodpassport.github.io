
/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   PROFILE PAGE — VERSION 2.1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. PROFILE FORM
    // ======================================

    const profileForm = document.getElementById(
        "childhoodProfileForm"
    );

    if (!profileForm) {
        console.error("Profile form not found!");
        return;
    }


    // ======================================
    // 2. LOAD SAVED PROFILE
    // ======================================

    try {

        const savedProfile = localStorage.getItem(
            "gcp_user_profile"
        );

        if (savedProfile) {

            const profile = JSON.parse(savedProfile);

            profileForm.elements.name.value =
                profile.name || "";

            profileForm.elements.dateOfBirth.value =
                profile.dateOfBirth || "";

            profileForm.elements.childhoodLocation.value =
                profile.childhoodLocation || "";

            if (profile.childhoodSetting) {

                const selected = profileForm.querySelector(
                    `input[name="childhoodSetting"][value="${profile.childhoodSetting}"]`
                );

                if (selected) {
                    selected.checked = true;
                }

            }

        }

    } catch (error) {

        console.error("Profile loading error:", error);

    }


    // ======================================
    // 3. SUBMIT PROFILE
    // ======================================

    profileForm.addEventListener("submit", (event) => {

        event.preventDefault();

        // Validate required fields
        if (!profileForm.reportValidity()) {
            return;
        }


        // Get form values
        const name =
            profileForm.elements.name.value.trim();

        const dateOfBirth =
            profileForm.elements.dateOfBirth.value;

        const childhoodLocation =
            profileForm.elements.childhoodLocation.value.trim();

        const settingInput = profileForm.querySelector(
            'input[name="childhoodSetting"]:checked'
        );

        const childhoodSetting =
            settingInput ? settingInput.value : "";


        // ==================================
        // 4. VALIDATE DATE OF BIRTH
        // ==================================

        const dob = new Date(
            dateOfBirth + "T00:00:00"
        );

        if (
            !dateOfBirth ||
            Number.isNaN(dob.getTime()) ||
            dob > new Date()
        ) {

            alert("Please enter a valid date of birth.");
            return;

        }


        // ==================================
        // 5. CREATE PROFILE OBJECT
        // ==================================

        const userProfile = {

            name: name,
            dateOfBirth: dateOfBirth,
            childhoodLocation: childhoodLocation,
            childhoodSetting: childhoodSetting,

            createdAt: new Date().toISOString()

        };


        // ==================================
        // 6. SAVE AND NAVIGATE TO QUIZ
        // ==================================

        try {

            localStorage.setItem(
                "gcp_user_profile",
                JSON.stringify(userProfile)
            );

            // Verify saved profile
            const savedData = localStorage.getItem(
                "gcp_user_profile"
            );

            if (!savedData) {
                throw new Error("Profile could not be saved.");
            }

            console.log("Profile saved successfully.");

            // Navigate to Chapter 02
            window.location.assign("./quiz.html");

        } catch (error) {

            console.error(
                "Profile saving or navigation error:",
                error
            );

            alert(
                "Unable to continue. Please check your browser and try again."
            );

        }

    });

});
