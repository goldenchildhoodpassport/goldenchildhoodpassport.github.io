/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   MOMENTS — remembering without questions
   ------------------------------------------
   One small hands-on moment in every place,
   right after you arrive there.

   kind:
   shelf  → "চেনো কি?" tap the things you had / did
   sound  → listen, tap the sounds you recognise
   pick   → this or that (your taste, no score)
   hands  → do it yourself: spin a লাটিম, tune
            the radio, dial *566#, wave the পাখা

   Each shelf item / sound / hands moment
   answers a question from the bank, so those
   questions are not asked again:
   chosen     → option 2 (score 3)
   not chosen → option 5 ("never", score 0)
   hands yes  → option 1 (score 4)
========================================== */

window.GCP = window.GCP || {};

GCP.MOMENTS = {

    "school-life": {
        kind: "shelf", title: "স্কুলব্যাগটা খোলো!", sub: "ছোটবেলায় যেগুলো তোমার ছিল বা করেছ — ছুঁয়ে দাও",
        items: [
            { e: "📐", label: "জ্যামিতি বক্স ধার", q: "S02", sound: "pencilDrop" },
            { e: "🖋️", label: "ফাউন্টেন পেন", q: "S05", sound: "pencil" },
            { e: "📚", label: "লাইব্রেরির বই", q: "S06", sound: "pageFlip" },
            { e: "🏅", label: "খেলার মেডেল", q: "S03", sound: "cheer" },
            { e: "📰", label: "দেয়াল পত্রিকা", q: "S07", sound: "paper" },
            { e: "✍️", label: "হাতের লেখার খাতা", q: "S04", sound: "pencil" }
        ]
    },

    "food-tiffin": {
        kind: "pick", title: "টিফিনে কোনটা?", sub: "চট করে বেছে নাও — ভাবার সময় নেই!",
        rounds: [
            [{ e: "🥭", label: "লবণ-মরিচ আম" }, { e: "🍦", label: "রঙিন আইসক্রিম" }],
            [{ e: "🥟", label: "ফুচকা" }, { e: "🥜", label: "চানাচুর" }],
            [{ e: "🥮", label: "শীতের পিঠা" }, { e: "🍡", label: "নাড়ু-মোয়া" }]
        ]
    },

    "games-sports": {
        kind: "hands", game: "latim", title: "লাটিমটা ঘোরাও!", sub: "নিচের বোতামটা চেপে ধরে সুতো পেঁচাও, তারপর ছেড়ে দাও",
        q: "G03", yes: "হ্যাঁ, কত ঘুরিয়েছি!", no: "আমি কখনো পারিনি"
    },

    "village-nature": {
        kind: "shelf", title: "কোনগুলো নিজে করেছ?", sub: "পুকুর, মাঠ, গাছ — যা যা করেছ ছুঁয়ে দাও",
        items: [
            { e: "🎣", label: "কাদাপানিতে মাছ ধরা", q: "V01", sound: "splash" },
            { e: "🏊", label: "পুকুরে সাঁতার", q: "V04", sound: "splash" },
            { e: "🌾", label: "ধানক্ষেতের আলে হাঁটা", q: "V06", sound: "birds" },
            { e: "🌱", label: "নিজে গাছ লাগানো", q: "V07", sound: "waterDrip" },
            { e: "🌧️", label: "বৃষ্টিতে ভেজা", q: "V02", sound: "rain" },
            { e: "✨", label: "জোনাকি ধরা", q: "V05", sound: "sparkle" }
        ]
    },

    "fashion-lifestyle": {
        kind: "shelf", title: "আলমারির ভেতর কী কী?", sub: "যেগুলো তোমারও ছিল, ছুঁয়ে দাও",
        items: [
            { e: "🎒", label: "নতুন স্কুলব্যাগের অপেক্ষা", q: "L04", sound: "paper" },
            { e: "👡", label: "জামার সাথে মিলিয়ে জুতা", q: "L05", sound: "sparkle" },
            { e: "📦", label: "গোপন খেলনার বাক্স", q: "L06", sound: "jarOpen" },
            { e: "👕", label: "ভাইবোনের জামা অদলবদল", q: "L07", sound: "whoosh" },
            { e: "🪙", label: "কয়েন জমানো", q: "L03", sound: "coins" }
        ]
    },

    "city-transport": {
        kind: "sound", title: "চোখ বন্ধ করে শোনো…", sub: "কোন শব্দগুলো চেনো? ▶ চেপে শোনো, চিনলে \"চিনি\" দাও",
        items: [
            { sound: "rickshawBell", label: "রিকশার ঘণ্টা", e: "🛺", q: "C05" },
            { sound: "train", label: "ট্রেনের ঝিক ঝিক আর হুইসেল", e: "🚂", q: "C06" },
            { sound: "busEngine", label: "লোকাল বাসের হর্ন", e: "🚌", q: "C04" },
            { sound: "ferryHorn", label: "ফেরির ভোঁ", e: "⛴️", q: "C07" }
        ]
    },

    "music-entertainment": {
        kind: "hands", game: "radio", title: "রেডিওটা টিউন করো", sub: "কাঁটাটা ঘুরিয়ে ৮৮.০-তে আনো… বৃহস্পতিবার রাত!",
        q: "M02", yes: "Bhoot FM শুনতাম!", no: "কখনো শুনিনি"
    },

    "communication-technology": {
        kind: "hands", game: "nokia", title: "ব্যালেন্স কত আছে?", sub: "বোতাম টিপে *৫৬৬# ডায়াল করো",
        q: "T05", yes: "এভাবেই দেখতাম!", no: "কখনো করিনি"
    },

    "internet-digital-life": {
        kind: "shelf", title: "কম্পিউটারে কী কী করেছ?", sub: "সাইবার ক্যাফে বা বাসার কম্পিউটারে — যা করেছ ছুঁয়ে দাও",
        items: [
            { e: "💿", label: "CD ঢুকিয়ে গেম/সিনেমা", q: "I04", sound: "discSpin" },
            { e: "🎨", label: "MS Paint-এ আঁকা", q: "I05", sound: "pencil" },
            { e: "⌨️", label: "টাইপিং আর প্রিন্ট", q: "I06", sound: "typing" },
            { e: "💬", label: "Yahoo/Facebook চ্যাট", q: "I07", sound: "buzz" }
        ]
    },

    "electricity-nightlife": {
        kind: "hands", game: "fan", title: "উফ্‌, কী গরম!", sub: "হাতপাখাটা বাতাস করো — ডানে-বামে টানো বা বারবার চাপো",
        q: "E02", yes: "রোজ রাতে করতাম!", no: "কখনো লাগেনি"
    },

    "family-festivals": {
        kind: "pick", title: "ঈদের দিন কোনটা বেশি প্রিয়?", sub: "মন যেটা বলে, সেটাই",
        rounds: [
            [{ e: "💵", label: "সালামি গোনা" }, { e: "👕", label: "নতুন জামা" }],
            [{ e: "👵", label: "দাদির গল্প" }, { e: "📺", label: "সবাই মিলে টিভি" }],
            [{ e: "🏡", label: "নানুবাড়ি" }, { e: "🎡", label: "মেলা" }]
        ]
    },

    "special-memories": {
        kind: "sound", title: "পাড়ার শব্দগুলো…", sub: "কোনগুলো তোমার পাড়াতেও শোনা যেত?",
        items: [
            { sound: "hawkerBell", label: "ফেরিওয়ালার ঘণ্টা", e: "🔔", q: "SP01" },
            { sound: "micAnnounce", label: "রিকশায় মাইকিং", e: "📢", q: "SP04" },
            { sound: "knock", label: "\"এই, খেলবি?\" — দরজায় টোকা", e: "🚪", q: "SP05" },
            { sound: "festiveDrum", label: "মেলার ঢোল", e: "🥁", q: "SP06" }
        ]
    }
};

/* every question a moment answers (so the quiz skips them) */
GCP.momentQuestions = function (stopId) {
    const m = GCP.MOMENTS[stopId];
    if (!m) return [];
    if (m.kind === "hands") return [m.q];
    if (m.items) return m.items.map((i) => i.q);
    return [];
};
