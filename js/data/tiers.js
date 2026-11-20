/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   PASSPORT TIERS + CHILDHOOD IDENTITY
   ------------------------------------------
   The score decides which passport you get.
   A gold passport looks clearly better than
   a silver one — that's what makes people
   show it off, and makes friends try again.
========================================== */

window.GCP = window.GCP || {};

GCP.TIERS = [
    { id: "gold",    min: 88, level: 4, icon: "🥇", color: "#e7c46a", name: "স্বর্ণ পাসপোর্ট",  edition: "GOLD EDITION",    short: "স্বর্ণ",
      rank: "খাঁটি সোনালি শৈশব",
      cheer: "সর্বোচ্চ লেভেল! খুব কম মানুষের শৈশব এতটা সোনালি। এবার বন্ধুদের দেখাও, ওরা পারে কিনা।" },
    { id: "silver",  min: 72, level: 3, icon: "🥈", color: "#d6dde6", name: "রুপালি পাসপোর্ট", edition: "SILVER EDITION",  short: "রুপালি",
      rank: "রুপালি দিনের নায়ক",
      cheer: "স্বর্ণের একদম কাছে! আর কয়েকটা স্মৃতি জাগলেই সোনালি পাসপোর্ট তোমার।" },
    { id: "bronze",  min: 50, level: 2, icon: "🥉", color: "#d39a6a", name: "তামার পাসপোর্ট",  edition: "BRONZE EDITION",  short: "তামা",
      rank: "তামাটে বিকেলের অভিযাত্রী",
      cheer: "তোমার শৈশব জমজমাট ছিল! 'আরও গভীরে' প্রশ্নগুলো খুললে রুপালি পর্যন্ত যেতে পারো।" },
    { id: "classic", min: 0,  level: 1, icon: "🌱", color: "#9fd3a8", name: "সবুজ পাসপোর্ট",   edition: "CLASSIC EDITION", short: "সবুজ",
      rank: "শৈশবের নবীন অভিযাত্রী",
      cheer: "তোমার শৈশবের অনেক জায়গা এখনো অদেখা। আবার ঘুরে দেখো, অনেক ভুলে যাওয়া স্মৃতি জেগে উঠবে।" }
];

GCP.TIER_COUNT = GCP.TIERS.length;

/* lowest level first — for drawing the ladder */
GCP.tierLadder = function () {
    return GCP.TIERS.slice().sort((a, b) => a.level - b.level);
};

GCP.tierFor = function (score) {
    return GCP.TIERS.find((t) => score >= t.min) || GCP.TIERS[GCP.TIERS.length - 1];
};

GCP.nextTier = function (score) {
    const index = GCP.TIERS.findIndex((t) => score >= t.min);
    return index > 0 ? GCP.TIERS[index - 1] : null;
};

/* "তুমি ছিলে…" — from the strongest place of the childhood */
GCP.IDENTITIES = {
    "school-life":              { title: "ক্লাসের প্রাণ",                line: "স্কুলের প্রতিটা ঘণ্টা আর বেঞ্চ তোমার মুখস্থ।" },
    "food-tiffin":              { title: "টক-ঝালের সম্রাট",             line: "আচার, চানাচুর, কাঁচা আম — কিছুই তোমার নজর এড়ায়নি।" },
    "games-sports":             { title: "মাঠ কাঁপানো খেলোয়াড়",         line: "বিকেল মানেই তোমার কাছে মাঠ আর দৌড়।" },
    "village-nature":           { title: "পুকুরঘাটের দুষ্টু",            line: "গাছ, পুকুর, বৃষ্টি — প্রকৃতিই ছিল তোমার খেলার মাঠ।" },
    "fashion-lifestyle":        { title: "ঈদের জামার পাহারাদার",       line: "নতুন জামা আলমারিতে রেখে দিনে দশবার দেখতে।" },
    "city-transport":           { title: "রিকশার ভিআইপি যাত্রী",        line: "রাস্তা, বাস, ট্রেন — যাতায়াতের প্রতিটা গল্প তোমার জানা।" },
    "music-entertainment":      { title: "BTV প্রজন্মের দর্শক",          line: "অনুষ্ঠানের জন্য সপ্তাহজুড়ে অপেক্ষা করতে জানো।" },
    "communication-technology": { title: "Flexiload যুগের কারিগর",      line: "SMS, মিসড কল আর *#-এর ভাষা তুমি বোঝো।" },
    "internet-digital-life":    { title: "সাইবার ক্যাফের সম্রাট",        line: "ঘণ্টায় ২০ টাকার ইন্টারনেটের মূল্য তুমি জানো।" },
    "electricity-nightlife":    { title: "লোডশেডিংয়ের রাতের রাজা",    line: "হারিকেনের আলোয় তোমার অর্ধেক শৈশব কেটেছে।" },
    "family-festivals":         { title: "সালামির সবচেয়ে বড় দাবিদার",  line: "উৎসব আর পরিবারের গল্পে ভরা তোমার শৈশব।" },
    "special-memories":         { title: "পাড়ার গল্পের ভাণ্ডার",         line: "ফেরিওয়ালা থেকে চিঠি — পাড়ার সব গল্প তোমার কাছে।" }
};

GCP.identityFor = function (cats) {
    const visited = cats.filter((c) => c.percent !== null);
    if (!visited.length) return { id: null, title: "শৈশবের যাত্রী", line: "তোমার গল্প এখনো লেখা হচ্ছে।" };

    /* highest % first; when two are equal, the one with more answers wins */
    const ranked = visited.slice().sort((a, b) => (b.percent - a.percent) || ((b.answered || 0) - (a.answered || 0)));
    const best = ranked[0];
    const second = ranked[1];
    const identity = Object.assign({ id: best.id, place: best.place, icon: best.icon, percent: best.percent }, GCP.IDENTITIES[best.id]);

    /* a close second place joins the identity, so it is more personal */
    if (second && best.percent - second.percent <= 12) {
        const s = GCP.IDENTITIES[second.id];
        identity.second = { id: second.id, icon: second.icon, title: s.title, percent: second.percent };
    }
    return identity;
};
