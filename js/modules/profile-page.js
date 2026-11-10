
/* ==========================================
   PROFILE PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const profileForm = document.getElementById("childhoodProfileForm");

    if (!profileForm) return;


    // Load saved profile
    try {

        const savedProfile = localStorage.getItem("gcp_user_profile");

        if (savedProfile) {

            const profile = JSON.parse(savedProfile);

            profileForm.elements.name.value = profile.name || "";

            profileForm.elements.dateOfBirth.value =
                profile.dateOfBirth || "";

            profileForm.elements.childhoodLocation.value =
                profile.childhoodLocation || "";

            if (profile.childhoodSetting) {

                const selected = profileForm.querySelector(
                    `input[name="childhoodSetting"][value="${profile.childhoodSetting}"]`
                );

                if (selected) selected.checked = true;

            }

        }

    } catch (error) {

        console.error("Profile loading error:", error);

    }


    // Submit profile
    profileForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!profileForm.reportValidity()) return;

        const name = profileForm.elements.name.value.trim();

        const dateOfBirth = profileForm.elements.dateOfBirth.value;

        const childhoodLocation =
            profileForm.elements.childhoodLocation.value.trim();

        const childhoodSetting =
            profileForm.elements.childhoodSetting.value;


        const dob = new Date(dateOfBirth + "T00:00:00");

        if (
            !dateOfBirth ||
            Number.isNaN(dob.getTime()) ||
            dob > new Date()
        ) {

            alert("Please enter a valid date of birth.");
            return;

        }


        const userProfile = {

            name,
            dateOfBirth,
            childhoodLocation,
            childhoodSetting,

            createdAt: new Date().toISOString()

        };


        try {

            localStorage.setItem(
                "gcp_user_profile",
                JSON.stringify(userProfile)
            );

            // Next step will be the Quiz page
            window.location.href = "quiz.html";

        } catch (error) {

            console.error("Profile saving error:", error);

            alert("Unable to save your profile. Please try again.");

        }

    });

});
