/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   BADGE ENGINE
========================================== */

window.GCP = window.GCP || {};

GCP.badgeEngine = (function () {

    const RARITY_ORDER = { legendary: 0, rare: 1, common: 2 };

    function evaluate(answers, result, profile) {
        const ctx = {
            answers,
            result,
            profile,
            s: (id) => GCP.scoring.scoreOf(answers, id),
            cat: (id) => {
                const bucket = result.byCategory[id];
                return bucket && bucket.percent !== null ? bucket.percent : -1;
            }
        };

        return GCP.BADGES
            .filter((badge) => {
                try { return Boolean(badge.rule(ctx)); } catch (e) { return false; }
            })
            .sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
    }

    function byId(id) {
        return GCP.BADGES.find((badge) => badge.id === id);
    }

    return { evaluate, byId };

})();
