/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   STORAGE — everything lives in the browser
========================================== */

window.GCP = window.GCP || {};

GCP.storage = (function () {

    const KEYS = {
        profile: "gcp_user_profile",
        journey: "gcp_journey_v2",
        photo: "gcp_passport_photo",
        settings: "gcp_settings",
        legacyAnswers: "gcp_quiz_answers"
    };

    function read(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            console.warn("[GCP] Could not read", key, error);
            return fallback;
        }
    }

    function write(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn("[GCP] Could not save", key, error);
            return false;
        }
    }

    function emptyJourney() {
        return { answers: {}, position: 0, deepDive: {}, finished: false };
    }

    /* Old quiz stored { id: { value, memory } } — keep those answers */
    function migrateLegacy(journey) {
        const legacy = read(KEYS.legacyAnswers, null);
        if (!legacy || typeof legacy !== "object") return journey;
        Object.keys(legacy).forEach((id) => {
            const old = legacy[id];
            if (!old || journey.answers[id]) return;
            const value = Array.isArray(old.value) ? old.value[0] : old.value;
            if (typeof value === "string") {
                journey.answers[id] = { v: value, memory: old.memory || old.personalMemory || "" };
            }
        });
        return journey;
    }

    return {
        KEYS,
        getProfile: () => read(KEYS.profile, null),
        saveProfile: (profile) => write(KEYS.profile, profile),

        getJourney() {
            const journey = read(KEYS.journey, null);
            if (journey && journey.answers) return journey;
            return migrateLegacy(emptyJourney());
        },
        saveJourney: (journey) => write(KEYS.journey, journey),
        resetJourney: () => write(KEYS.journey, emptyJourney()),

        getPhoto: () => {
            try { return localStorage.getItem(KEYS.photo); } catch (e) { return null; }
        },
        savePhoto: (dataUrl) => {
            try { localStorage.setItem(KEYS.photo, dataUrl); return true; } catch (e) { return false; }
        },

        getSettings: () => read(KEYS.settings, { sound: false }),
        saveSettings: (settings) => write(KEYS.settings, settings)
    };

})();
