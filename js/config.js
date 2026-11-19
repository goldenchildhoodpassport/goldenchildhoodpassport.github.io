/* ==========================================
   GOLDEN CHILDHOOD PASSPORT — SITE SETTINGS
   ------------------------------------------
   SITE_URL is printed on every downloaded
   passport picture (as text + QR code), so
   people who see the picture can open the
   site. Put your real address here after
   you publish the site, for example:
   "https://mdnafijulislam.github.io/golden-childhood-passport/"
   Leave it empty to use the address the
   page is opened from.
========================================== */

window.GCP = window.GCP || {};

GCP.SITE_URL = "";

GCP.siteUrl = function () {
    if (GCP.SITE_URL) return GCP.SITE_URL;
    const local = /^(localhost|127\.|0\.0\.0\.0|192\.168\.|10\.)/.test(location.hostname) || location.protocol === "file:";
    if (!local && location.protocol.startsWith("http")) {
        return location.origin + location.pathname.replace(/[^/]*$/, "");
    }
    return "https://mdnafijulislam.github.io/golden-childhood-passport/";
};
