
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. WELCOME PAGE → PROFILE PAGE
    // ==========================================

    const startButton = document.getElementById("startJourney");

    if (startButton) {
        startButton.addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    }

});
