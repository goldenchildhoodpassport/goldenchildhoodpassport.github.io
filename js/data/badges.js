/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   BADGES
   ------------------------------------------
   rarity: common | rare | legendary
   rule(ctx) → true when earned
   ctx = { answers, result, profile, s(id) }
   s(id) = score of an answer (0–4) or null
========================================== */

window.GCP = window.GCP || {};

GCP.BADGES = [

    /* ----- Place badges (category ≥ 75%) ----- */
    { id: "loadshedding", icon: "🪔", rarity: "common", name: "লোডশেডিং যোদ্ধা",
      why: "হারিকেন আর হাতপাখার রাত পার করেছ।", rule: (c) => c.cat("electricity-nightlife") >= 75 },
    { id: "btv", icon: "📺", rarity: "common", name: "টিভি ঘরের সদস্য",
      why: "অনুষ্ঠানের জন্য অপেক্ষার দিনগুলো তোমার মনে আছে।", rule: (c) => c.cat("music-entertainment") >= 75 },
    { id: "nokia", icon: "📱", rarity: "common", name: "বাটন ফোনের সৈনিক",
      why: "SMS, Flexiload আর মিসড কলের ভাষা জানো।", rule: (c) => c.cat("communication-technology") >= 75 },
    { id: "school", icon: "🔔", rarity: "common", name: "ক্লাসের পেছনের বেঞ্চ",
      why: "স্কুলজীবনের সব কাণ্ডকারখানা তোমার চেনা।", rule: (c) => c.cat("school-life") >= 75 },
    { id: "field", icon: "🪁", rarity: "common", name: "মাঠের রাজা",
      why: "মার্বেল, লাটিম, গোল্লাছুট — কিছুই বাদ যায়নি।", rule: (c) => c.cat("games-sports") >= 75 },
    { id: "tiffin", icon: "🥭", rarity: "common", name: "টক-ঝাল বিশেষজ্ঞ",
      why: "লবণ-মরিচ মাখা কাঁচা আমের স্বাদ ভোলোনি।", rule: (c) => c.cat("food-tiffin") >= 75 },
    { id: "village", icon: "🌾", rarity: "common", name: "মাটির মানুষ",
      why: "পুকুর, গাছ, বৃষ্টি — প্রকৃতির সাথেই বড় হয়েছ।", rule: (c) => c.cat("village-nature") >= 75 },
    { id: "festival", icon: "🌙", rarity: "common", name: "উৎসবের প্রাণ",
      why: "পরিবার আর উৎসবের স্মৃতিতে ভরা শৈশব।", rule: (c) => c.cat("family-festivals") >= 75 },
    { id: "almirah", icon: "👕", rarity: "common", name: "আলমারির গুপ্তধন",
      why: "নতুন জামা আর জমানো জিনিসের যত্ন নিতে।", rule: (c) => c.cat("fashion-lifestyle") >= 75 },
    { id: "rickshaw", icon: "🛺", rarity: "common", name: "রিকশার যাত্রী",
      why: "রাস্তা, বাস, ট্রেন — যাতায়াতের গল্প জানো।", rule: (c) => c.cat("city-transport") >= 75 },
    { id: "cyber", icon: "🖥️", rarity: "common", name: "সাইবার ক্যাফের অতিথি",
      why: "ইন্টারনেটের প্রথম দিনগুলো দেখেছ।", rule: (c) => c.cat("internet-digital-life") >= 75 },
    { id: "para", icon: "✉️", rarity: "common", name: "পাড়ার গল্পকার",
      why: "ফেরিওয়ালা, চিঠি আর পাড়ার আড্ডা।", rule: (c) => c.cat("special-memories") >= 75 },

    /* ----- Rare: one very specific memory ----- */
    { id: "bhootfm", icon: "👻", rarity: "rare", name: "Bhoot FM রাতজাগা",
      why: "বৃহস্পতিবার রাতে ভয়ে ভয়ে রেডিও শুনেছ।", rule: (c) => c.s("M02") >= 3 },
    { id: "mostofa", icon: "🕹️", rarity: "rare", name: "Gaming Box চ্যাম্পিয়ন",
      why: "দোকানে টাকা দিয়ে Mostofa খেলেছ।", rule: (c) => c.s("G07") >= 3 },
    { id: "alif", icon: "🧞", rarity: "rare", name: "আলিফ লায়লার দর্শক",
      why: "সপ্তাহজুড়ে অপেক্ষা ছিল একটা অনুষ্ঠানের জন্য।", rule: (c) => c.s("M01") >= 3 },
    { id: "salami", icon: "💵", rarity: "rare", name: "সালামি সংগ্রাহক",
      why: "ঈদের দিন সবার আগে পকেট ভরেছে তোমার।", rule: (c) => c.s("FA03") >= 4 },
    { id: "tiffinthief", icon: "🍱", rarity: "rare", name: "টিফিন চোর",
      why: "বন্ধুর টিফিন থেকে এক কামড়… বা পুরোটাই!", rule: (c) => c.s("S01") >= 4 },
    { id: "antenna", icon: "📡", rarity: "rare", name: "অ্যান্টেনা মিস্ত্রি",
      why: "ছাদে উঠে চিৎকার: 'এসেছে? এবার এসেছে?'", rule: (c) => c.s("M03") >= 3 },
    { id: "letter", icon: "📮", rarity: "rare", name: "চিঠির মানুষ",
      why: "হাতে লেখা চিঠির অপেক্ষা কেমন, তুমি জানো।", rule: (c) => c.s("SP03") >= 2 },

    /* ----- Legendary: combinations ----- */
    { id: "storyteller", icon: "✍️", rarity: "legendary", name: "স্মৃতির লেখক",
      why: "৫টার বেশি নিজের গল্প লিখে রেখেছ।", rule: (c) => c.result.memories >= 5 },
    { id: "explorer", icon: "🗺️", rarity: "legendary", name: "পুরো পাড়া ঘুরেছি",
      why: "৮৪টা স্মৃতির সবগুলোতে উত্তর দিয়েছ।", rule: (c) => c.result.answered >= 84 },
    { id: "analog", icon: "📼", rarity: "legendary", name: "খাঁটি অ্যানালগ শিশু",
      why: "হারিকেন, রেডিও আর চিঠি — তিনটাই তোমার চেনা।", rule: (c) => c.s("E01") >= 3 && c.s("SP03") >= 2 && (c.s("M03") >= 2 || c.s("M07") >= 2) },
    { id: "bridge", icon: "🌉", rarity: "legendary", name: "দুই যুগের সেতু",
      why: "Nokia-ও চালিয়েছ, হারিকেনেও পড়েছ।", rule: (c) => c.s("E01") >= 3 && c.s("T01") >= 3 }
];
