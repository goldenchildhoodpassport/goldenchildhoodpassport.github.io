/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   KEEPSAKES — little things tucked into the
   passport, chosen from YOUR answers.
   Everyone's passport ends up holding
   different things: a salami note, a bus
   ticket, a Bhoot FM sticker…
   rule(m) gets the passport model
   (badge ids + place percents), so it also
   works for a friend's shared passport.
========================================== */

window.GCP = window.GCP || {};

GCP.KEEPSAKES = [
    { id: "token",   type: "token",   rule: (m) => m.has("mostofa"),
      lines: ["GAME", "১০"], why: "Gaming Box-এর টোকেন" },
    { id: "bhootfm", type: "sticker", rule: (m) => m.has("bhootfm"),
      lines: ["ভূত এফএম", "৮৮.০"], why: "Bhoot FM-এর স্টিকার" },
    { id: "salami",  type: "note",    rule: (m) => m.has("salami") || m.pct("family-festivals") >= 80,
      lines: ["১০", "টাকা"], why: "ঈদের সালামির কড়কড়ে নোট" },
    { id: "scratch", type: "scratch", rule: (m) => m.has("nokia") || m.pct("communication-technology") >= 75,
      lines: ["রিচার্জ কার্ড", "৳৫০"], why: "ঘষা স্ক্র্যাচ কার্ড" },
    { id: "tvclip",  type: "clip",    rule: (m) => m.has("alif") || m.pct("music-entertainment") >= 80,
      lines: ["আজ রাত ৮টায়", "বিটিভিতে আলিফ লায়লা"], why: "পত্রিকার অনুষ্ঠানসূচি" },
    { id: "postage", type: "postage", rule: (m) => m.has("letter") || m.pct("special-memories") >= 80,
      lines: ["বাংলাদেশ", "৪ টাকা"], why: "চিঠির ডাকটিকিট" },
    { id: "ticket",  type: "ticket",  rule: (m) => m.has("rickshaw") || m.pct("city-transport") >= 75,
      lines: ["বাস ভাড়া ৳৫", "নং ০৪৭৯"], why: "লোকাল বাসের টিকেট" },
    { id: "marble",  type: "marble",  rule: (m) => m.has("field") || m.pct("games-sports") >= 75,
      lines: [], why: "জেতা মার্বেল" },
    { id: "leaf",    type: "leaf",    rule: (m) => m.has("village") || m.pct("village-nature") >= 75,
      lines: [], why: "বইয়ের ভাঁজে শুকনো পাতা" },
    { id: "chalk",   type: "chalk",   rule: (m) => m.pct("school-life") >= 70,
      lines: [], why: "ক্লাসরুমের চক" }
];

GCP.keepsakesFor = function (model, max = 3) {
    const ids = new Set(model.badges.map((b) => b.id));
    const pctOf = {};
    model.cats.forEach((c) => { pctOf[c.id] = c.percent === null ? -1 : c.percent; });
    const ctx = { has: (id) => ids.has(id), pct: (id) => (pctOf[id] === undefined ? -1 : pctOf[id]) };
    return GCP.KEEPSAKES.filter((k) => { try { return k.rule(ctx); } catch (e) { return false; } }).slice(0, max);
};
