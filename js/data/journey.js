/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   JOURNEY DATA — "শৈশবের একটা দিন"
   ------------------------------------------
   The quiz is one day of a childhood:
   সকাল → দুপুর → বিকেল → সন্ধ্যা → রাত
   Each category is a "place" in the পাড়া,
   with its own theme, sound and entry scene.
========================================== */

window.GCP = window.GCP || {};

GCP.DAY_PHASES = {
    morning:   { label: "সকাল",   sky: ["#f6d9a8", "#cfe3e3"], ground: "#8e9c6c", sun: "#f3c56b", isNight: false },
    noon:      { label: "দুপুর",  sky: ["#a9d0de", "#e6f0e4"], ground: "#7f9460", sun: "#ffe7a3", isNight: false },
    afternoon: { label: "বিকেল",  sky: ["#f0c38e", "#f7e3c0"], ground: "#8a8a5a", sun: "#f0a35e", isNight: false },
    evening:   { label: "সন্ধ্যা", sky: ["#5b4a6e", "#d98a6a"], ground: "#4c4a3a", sun: "#e2795a", isNight: false },
    night:     { label: "রাত",    sky: ["#0f1a2e", "#26314f"], ground: "#1d2420", sun: "#f3ecd0", isNight: true }
};

/*
   order    → the order of the day
   theme    → CSS card frame (see css/journey.css)
   ambience → sound loop (see js/modules/sound.js)
   entry    → the arrival scene text
   core     → 3 questions everybody answers
   (the other 4 are the optional "আরও গভীরে" questions)
*/
GCP.JOURNEY = [
    {
        id: "school-life", phase: "morning", theme: "blackboard", ambience: "schoolyard",
        place: "স্কুলের মাঠ", icon: "🔔", stampColor: "#3f5b4a",
        entry: { sound: "schoolBell", line: "ঢং ঢং ঢং… স্কুলের ঘণ্টা পড়ে গেছে!", sub: "দৌড়ে লাইনে দাঁড়াও, অ্যাসেম্বলি শুরু হচ্ছে।" },
        core: ["S01", "S02", "S05"]
    },
    {
        id: "food-tiffin", phase: "morning", theme: "tiffin", ambience: "schoolyard",
        place: "টিফিন পিরিয়ড", icon: "🍱", stampColor: "#9b5a2e",
        entry: { sound: "tiffinOpen", line: "টিফিনের ঘণ্টা! বাক্সটা খোলো তো…", sub: "আজকে আম্মু কী দিয়েছে? নাকি অন্যের টিফিনে চোখ?" },
        core: ["F01", "F03", "F04"]
    },
    {
        id: "games-sports", phase: "noon", theme: "field", ambience: "field",
        place: "পাড়ার মাঠ", icon: "🪁", stampColor: "#b95d4c",
        entry: { sound: "whistle", line: "স্কুল ছুটি! সোজা মাঠে।", sub: "বই খাতা ফেলে দৌড়, দল ভাগ হচ্ছে…" },
        core: ["G02", "G03", "G07"]
    },
    {
        id: "village-nature", phase: "noon", theme: "pond", ambience: "village",
        place: "পুকুরঘাট", icon: "🌾", stampColor: "#4e6449",
        entry: { sound: "splash", line: "ঝপাং! পুকুরে লাফ!", sub: "আম্মু জানার আগেই ভেজা চুল শুকাতে হবে।" },
        core: ["V02", "V03", "V05"]
    },
    {
        id: "fashion-lifestyle", phase: "afternoon", theme: "almirah", ambience: "home",
        place: "আলমারির কোণ", icon: "👕", stampColor: "#7d4a6a",
        entry: { sound: "almirah", line: "ক্যাঁচ… আলমারির দরজা খুললো।", sub: "ভাঁজ করা নতুন জামাটা এখনো ওখানেই আছে।" },
        core: ["L01", "L02", "L03"]
    },
    {
        id: "city-transport", phase: "afternoon", theme: "rickshaw", ambience: "street",
        place: "মোড়ের রাস্তা", icon: "🛺", stampColor: "#c0392b",
        entry: { sound: "rickshawBell", line: "ক্রিং ক্রিং! রিকশা আসছে…", sub: "পেছনের রঙিন ছবিগুলো দেখেছ কখনো খেয়াল করে?" },
        core: ["C05", "C06", "C04"]
    },
    {
        id: "music-entertainment", phase: "evening", theme: "television", ambience: "tvRoom",
        place: "টিভির ঘর", icon: "📺", stampColor: "#5b4a6e",
        entry: { sound: "tvStatic", line: "ঝিরঝির… অ্যান্টেনাটা একটু ঘোরাও!", sub: "আর একটু… হ্যাঁ, এবার ঠিক আছে! অনুষ্ঠান শুরু।" },
        core: ["M01", "M02", "M03"]
    },
    {
        id: "communication-technology", phase: "evening", theme: "nokia", ambience: "home",
        place: "আব্বুর মোবাইল", icon: "📱", stampColor: "#2f6f62",
        entry: { sound: "nokiaBoot", line: "টুট টুট… মোবাইলটা চালু হলো।", sub: "ব্যালেন্স আছে তো? নাকি শুধু মিসড কল?" },
        core: ["T01", "T02", "T03"]
    },
    {
        id: "internet-digital-life", phase: "evening", theme: "crt", ambience: "cyberCafe",
        place: "সাইবার ক্যাফে", icon: "🖥️", stampColor: "#2c4f7c",
        entry: { sound: "dialup", line: "কিইইইইঁ… কররর… ইন্টারনেট কানেক্ট হচ্ছে!", sub: "ঘণ্টায় ২০ টাকা, তাড়াতাড়ি করো।" },
        core: ["I01", "I02", "I03"]
    },
    {
        id: "electricity-nightlife", phase: "night", theme: "lantern", ambience: "nightCrickets",
        place: "লোডশেডিংয়ের রাত", icon: "🪔", stampColor: "#a8742b",
        entry: { sound: "powerCut", line: "ধুপ! কারেন্ট চলে গেছে!", sub: "হারিকেনটা কোথায়? ম্যাচ খোঁজো…", blackout: true },
        core: ["E01", "E02", "E05"]
    },
    {
        id: "family-festivals", phase: "night", theme: "eidcard", ambience: "festival",
        place: "ঈদের আগের রাত", icon: "🌙", stampColor: "#3d6b5a",
        entry: { sound: "chime", line: "চাঁদ উঠেছে! কাল ঈদ!", sub: "সালামির হিসাব কি এখনই করে ফেলবে?" },
        core: ["FA03", "FA02", "FA04"]
    },
    {
        id: "special-memories", phase: "night", theme: "letter", ambience: "lateNight",
        place: "স্মৃতির বয়াম", icon: "✉️", stampColor: "#713c35",
        entry: { sound: "jarOpen", line: "দিনের শেষে… স্মৃতির বয়ামটা খোলো।", sub: "পাড়ার যে গল্পগুলো আর কোথাও লেখা নেই।" },
        core: ["SP01", "SP02", "SP03"]
    }
];

/* ------------------------------------------
   Which childhood decades each experience
   belongs to. Missing id = every decade.
   Decades: 80, 90, 00, 10, 20
------------------------------------------- */
GCP.QUESTION_ERAS = {
    E01: ["80", "90", "00", "10"], E04: ["80", "90", "00", "10"], E05: ["80", "90", "00", "10"],
    E06: ["80", "90", "00"], E07: ["80", "90", "00", "10"],
    M01: ["90", "00"], M02: ["10"], M03: ["80", "90", "00"], M04: ["80", "90", "00"],
    M05: ["90", "00", "10"], M06: ["80", "90", "00", "10"], M07: ["80", "90", "00"],
    T01: ["00", "10"], T02: ["00", "10"], T03: ["00", "10"], T04: ["00", "10"],
    T05: ["00", "10", "20"], T06: ["00", "10"], T07: ["00", "10"],
    G07: ["10"],
    I01: ["00", "10"], I02: ["00", "10"], I03: ["00", "10"], I04: ["00", "10"],
    I05: ["00", "10", "20"], I06: ["00", "10", "20"], I07: ["00", "10", "20"],
    S05: ["80", "90", "00"], SP03: ["80", "90", "00"], SP04: ["80", "90", "00", "10"],
    FA04: ["80", "90", "00", "10"], C07: ["80", "90", "00", "10"]
};

/* Small sticker shown on each question card */
GCP.QUESTION_STICKERS = {
    E01: "🏮", E02: "🪭", E03: "🌌", E04: "🔦", E05: "🤚", E06: "🛏️", E07: "📖",
    M01: "🧞", M02: "👻", M03: "📡", M04: "📼", M05: "💿", M06: "📺", M07: "📻",
    T01: "📱", T02: "✉️", T03: "🎫", T04: "📞", T05: "#️⃣", T06: "🎵", T07: "🔵",
    S01: "🍱", S02: "📐", S03: "🏅", S04: "✍️", S05: "🖋️", S06: "📚", S07: "📰",
    G01: "🏃", G02: "🙈", G03: "🔮", G04: "🪁", G05: "🏏", G06: "🚲", G07: "🕹️",
    F01: "🥜", F02: "🥮", F03: "🥭", F04: "🍧", F05: "🥙", F06: "🍬", F07: "🥣",
    V01: "🐟", V02: "🌧️", V03: "🌳", V04: "🏊", V05: "✨", V06: "🌾", V07: "🌱",
    FA01: "👨‍👩‍👧", FA02: "👵", FA03: "💵", FA04: "📺", FA05: "🏡", FA06: "💛", FA07: "🍳",
    L01: "👗", L02: "🧸", L03: "🪙", L04: "🎒", L05: "👡", L06: "📦", L07: "🔄",
    C01: "🚌", C02: "⛴️", C03: "🚦", C04: "🎟️", C05: "🛺", C06: "🚂", C07: "⛴️",
    I01: "💣", I02: "🖥️", I03: "🎮", I04: "💿", I05: "🎨", I06: "⌨️", I07: "💬",
    SP01: "🍦", SP02: "🌆", SP03: "📮", SP04: "📢", SP05: "🚪", SP06: "🎡", SP07: "🌳"
};

/* "আম্মুর ডাক" — shown if the user sits idle */
GCP.IDLE_CALLS = {
    morning: ["এই! স্কুলের দেরি হয়ে যাচ্ছে কিন্তু!", "টিফিন বক্সটা ব্যাগে নিয়েছ তো?"],
    noon: ["দুপুরে রোদে ঘুরিস না, মাথা ধরবে!", "গোসল করেছ? ভাত ঠান্ডা হয়ে যাচ্ছে!"],
    afternoon: ["মাগরিবের আগে বাসায় ফিরবি কিন্তু!", "জামাটা নোংরা করবি না, ওটা নতুন!"],
    evening: ["সন্ধ্যা হয়ে গেছে, পড়তে বসো!", "টিভিটা বন্ধ করো, কাল পরীক্ষা না?"],
    night: ["অনেক রাত হলো, এবার ঘুমাও!", "হারিকেনের তেল শেষ হয়ে যাবে কিন্তু!"]
};
