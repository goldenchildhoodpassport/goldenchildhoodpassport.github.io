/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   SMALL HELPERS
========================================== */

window.GCP = window.GCP || {};

GCP.helpers = (function () {

    const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    function toBangla(value) {
        return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
    }

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function escapeHtml(text) {
        return String(text == null ? "" : text)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function reducedMotion() {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function pick(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    /* stable small hash → passport number */
    function hash(text) {
        let h = 2166136261;
        for (let i = 0; i < text.length; i++) {
            h ^= text.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        return (h >>> 0).toString(36).toUpperCase();
    }

    return { toBangla, wait, escapeHtml, reducedMotion, pick, hash };

})();
