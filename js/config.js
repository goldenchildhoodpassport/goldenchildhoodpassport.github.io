/* ==========================================
   GOLDEN CHILDHOOD PASSPORT — SITE SETTINGS
   ------------------------------------------
   SITE_URL is printed on every downloaded
   passport picture (as text + QR code), so
   people who see the picture can open the
   site. Put your real address here after
   you publish the site, for example:
   "https://goldenchildhoodpassport.github.io/"
   Leave it empty to use the address the
   page is opened from.
========================================== */

window.GCP = window.GCP || {};

GCP.SITE_URL = "https://goldenchildhoodpassport.github.io/";

GCP.siteUrl = function () {
    if (GCP.SITE_URL) return GCP.SITE_URL;
    const local = /^(localhost|127\.|0\.0\.0\.0|192\.168\.|10\.)/.test(location.hostname) || location.protocol === "file:";
    if (!local && location.protocol.startsWith("http")) {
        return location.origin + location.pathname.replace(/[^/]*$/, "");
    }
    return "https://goldenchildhoodpassport.github.io/";
};
