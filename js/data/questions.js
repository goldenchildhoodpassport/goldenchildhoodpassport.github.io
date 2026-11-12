
/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   QUESTION BANK — QUESTION-01
   Batch 1 of 7 (12 questions)
========================================== */

window.GCP_QUESTIONS = [

    // ==========================================
    // CATEGORY 01: ELECTRICITY & NIGHT LIFE
    // ==========================================

    {
        id: "E01",
        categoryId: "electricity-nightlife",
        question: "ছোটবেলায় বিদ্যুৎ চলে গেলে হারিকেন, কুপি বা লণ্ঠনের আলোতে পড়াশোনা কিংবা অন্য কাজ করেছ?",
        helperText: "গ্রামের পাশাপাশি শহরের পুরোনো দিনের অভিজ্ঞতাও মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এমন অভিজ্ঞতার সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 02: MUSIC & ENTERTAINMENT
    // ==========================================

    {
        id: "M01",
        categoryId: "music-entertainment",
        question: "BTV-তে আলিফ লায়লা, সিন্দাবাদ বা মাকড়সা মন্সার মতো অনুষ্ঠান দেখার জন্য অপেক্ষা করতে?",
        helperText: "টিভির অনুষ্ঠান দেখার জন্য পরিবারের সবাই একসঙ্গে বসার দিনগুলোর কথা ভাবো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত দেখতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে দেখতাম", score: 3 },
            { value: "few", label: "এক-দুইবার দেখেছি", score: 2 },
            { value: "seen", label: "অন্যদের কাছে শুনেছি বা দেখেছি", score: 0 },
            { value: "never", label: "দেখিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এসব অনুষ্ঠান দেখার সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 03: COMMUNICATION & TECHNOLOGY
    // ==========================================

    {
        id: "T01",
        categoryId: "communication-technology",
        question: "ছোটবেলায় Nokia 1100, 1200, 1600 বা এ ধরনের বাটন মোবাইল ব্যবহার করেছ?",
        helperText: "নিজের ফোন না থাকলেও পরিবারের কারও ফোন ব্যবহার করার অভিজ্ঞতা মনে করতে পারো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "own", label: "নিজের ফোন ছিল এবং ব্যবহার করতাম", score: 4 },
            { value: "family", label: "পরিবারের ফোন নিয়মিত ব্যবহার করতাম", score: 3 },
            { value: "friend", label: "বন্ধু বা আত্মীয়ের ফোন ব্যবহার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের ব্যবহার করতে দেখেছি", score: 0 },
            { value: "never", label: "এ ধরনের ফোন ব্যবহার করিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এসব ফোনের প্রচলন ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 04: SCHOOL LIFE
    // ==========================================

    {
        id: "S01",
        categoryId: "school-life",
        question: "স্কুলে বন্ধুদের সঙ্গে টিফিন ভাগাভাগি করা, অন্যের টিফিন খেয়ে ফেলা বা নিজের টিফিন হারানোর মতো ঘটনা ঘটেছে?",
        helperText: "স্কুলের টিফিন বিরতির মজার ঘটনাগুলো মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "both", label: "নিজেও করেছি, আমার সঙ্গেও হয়েছে", score: 4 },
            { value: "did", label: "আমি বন্ধুর টিফিন খেয়েছি", score: 3 },
            { value: "happened", label: "আমার টিফিন অন্য কেউ খেয়েছে", score: 3 },
            { value: "seen", label: "বন্ধুদের মধ্যে এমন হতে দেখেছি", score: 2 },
            { value: "never", label: "এমন ঘটনা ঘটেনি", score: 0 },
            { value: "na", label: "আমার এমন স্কুলজীবনের অভিজ্ঞতা ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 05: GAMES & SPORTS
    // ==========================================

    {
        id: "G01",
        categoryId: "games-sports",
        question: "ছোটবেলায় বিকেলে বন্ধুদের সঙ্গে মাঠে বা রাস্তায় দৌড়ঝাঁপ করে দলবেঁধে খেলতে?",
        helperText: "যেমন: দৌড় প্রতিযোগিতা, লুকোচুরি, গোল্লাছুট বা অন্য কোনো দলীয় খেলা।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "daily", label: "প্রায় প্রতিদিন খেলতাম", score: 4 },
            { value: "often", label: "সপ্তাহে কয়েকদিন খেলতাম", score: 3 },
            { value: "few", label: "মাঝেমধ্যে খেলতাম", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেলতে দেখেছি", score: 0 },
            { value: "never", label: "এভাবে খেলিনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন খেলার সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 06: FOOD & TIFFIN
    // ==========================================

    {
        id: "F01",
        categoryId: "food-tiffin",
        question: "স্কুলে বা বাড়িতে ছোটবেলায় মুড়ি, চানাচুর, আচার, বরই বা এ ধরনের টক-ঝাল খাবার বন্ধুদের সঙ্গে ভাগ করে খেতে?",
        helperText: "শৈশবের ছোট ছোট খাবারের আনন্দের কথা ভাবো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত খেতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের খেতে দেখেছি", score: 0 },
            { value: "never", label: "খাইনি", score: 0 },
            { value: "na", label: "এ ধরনের খাবার পাওয়ার সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 07: VILLAGE & NATURE
    // ==========================================

    {
        id: "V01",
        categoryId: "village-nature",
        question: "বর্ষাকালে কাদামাটি, ডোবা বা পানি কমে যাওয়া জমিতে হাত দিয়ে কিংবা ছোট জাল দিয়ে মাছ ধরেছ?",
        helperText: "নিজে মাছ ধরার পাশাপাশি পরিবারের বা এলাকার অন্যদের সঙ্গে মাছ ধরার অভিজ্ঞতাও মনে করতে পারো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার মাছ ধরেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার ধরেছি", score: 3 },
            { value: "few", label: "এক-দুইবার ধরেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের মাছ ধরতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো মাছ ধরিনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 08: FAMILY & FESTIVALS
    // ==========================================

    {
        id: "FA01",
        categoryId: "family-festivals",
        question: "ঈদ, পূজা বা অন্য কোনো উৎসবে পরিবারের সবাই মিলে নতুন পোশাক পরে আত্মীয়স্বজনের বাড়ি বেড়াতে যেতে?",
        helperText: "উৎসবের দিনের পারিবারিক আয়োজন ও আনন্দের কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "every", label: "প্রায় প্রতিটি উৎসবে যেতাম", score: 4 },
            { value: "often", label: "বেশিরভাগ উৎসবে যেতাম", score: 3 },
            { value: "few", label: "কয়েকবার গিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমার ক্ষেত্রে এমন সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 09: FASHION & LIFESTYLE
    // ==========================================

    {
        id: "L01",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় ঈদ বা বিশেষ অনুষ্ঠানের নতুন জামা আলমারিতে রেখে বারবার বের করে দেখতে বা পরার জন্য অপেক্ষা করতে?",
        helperText: "নতুন পোশাক পাওয়ার সেই ছোট্ট উত্তেজনার কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "always", label: "প্রায় প্রতিবারই এমন করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন অভিজ্ঞতার সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 10: CITY & TRANSPORT
    // ==========================================

    {
        id: "C01",
        categoryId: "city-transport",
        question: "ছোটবেলায় দূরপাল্লার বাসে পরিবারের সঙ্গে ভ্রমণের সময় জানালার পাশে বসে বাইরের দৃশ্য দেখতে ভালো লাগত?",
        helperText: "গ্রামের বাড়ি যাওয়া, আত্মীয়ের বাড়ি বেড়াতে যাওয়া বা দীর্ঘ বাসযাত্রার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার এমন ভ্রমণ করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের ভ্রমণ করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন ভ্রমণের সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 11: INTERNET & DIGITAL LIFE
    // ==========================================

    {
        id: "I01",
        categoryId: "internet-digital-life",
        
        question: "ছোটবেলায় Windows XP চালিত কম্পিউটারে Minesweeper, Solitaire বা অন্য পুরোনো কম্পিউটার গেম খেলেছ?",
        helperText: "কম্পিউটারের সামনে বসে গেম খেলা কিংবা গেমের স্কোর বাড়ানোর স্মৃতি মনে করো।",

        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "own", label: "নিজের কম্পিউটারে নিয়মিত ব্যবহার করতাম", score: 4 },
            { value: "family", label: "বাসার কম্পিউটারে ব্যবহার করতাম", score: 3 },
            { value: "outside", label: "স্কুল, বন্ধুর বাসা বা দোকানে ব্যবহার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের ব্যবহার করতে দেখেছি", score: 0 },
            { value: "never", label: "ব্যবহার করিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এসব ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 12: SPECIAL MEMORIES & NEIGHBOURHOOD
    // ==========================================

    {
        id: "SP01",
        categoryId: "special-memories",
        question: "ছোটবেলায় পাড়ার ফেরিওয়ালার ডাক শুনে খেলনা, আইসক্রিম, বাদাম বা অন্য কিছু কেনার জন্য বাইরে ছুটে যেতে?",
        helperText: "পাড়ার পরিচিত ডাক, ঘণ্টা বা ফেরিওয়ালার আওয়াজ মনে করার চেষ্টা করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "ডাক শুনলেই প্রায়ই ছুটে যেতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে যেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার গিয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের যেতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন ফেরিওয়ালা আসত না", score: null }
        ]
    },


    // ==========================================
    // QUESTION-02: BATCH 2 OF 7
    // ==========================================

    // CATEGORY 01: ELECTRICITY & NIGHT LIFE

    {
        id: "E02",
        categoryId: "electricity-nightlife",
        question: "বিদ্যুৎ চলে গেলে গরমের রাতে হাতপাখা দিয়ে নিজেকে বা পরিবারের কাউকে বাতাস করতে?",
        helperText: "তালপাতার পাখা, বাঁশের হাতপাখা বা অন্য যেকোনো হাতপাখার কথা ভাবো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন অভিজ্ঞতার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 02: MUSIC & ENTERTAINMENT

    {
        id: "M02",
        categoryId: "music-entertainment",
        question: "রাতে রেডিওতে Bhoot FM বা ভৌতিক গল্পের অনুষ্ঠান শোনার জন্য অপেক্ষা করতে?",
        helperText: "রেডিওর শব্দ, গল্পের ভয় আর বন্ধুদের সঙ্গে পরদিন আলোচনা করার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত শুনতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে শুনতাম", score: 3 },
            { value: "few", label: "এক-দুইবার শুনেছি", score: 2 },
            { value: "heard", label: "শুধু অনুষ্ঠানটির নাম শুনেছি", score: 0 },
            { value: "never", label: "কখনো শুনিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এমন অনুষ্ঠান শোনার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 03: COMMUNICATION & TECHNOLOGY

    {
        id: "T02",
        categoryId: "communication-technology",
        question: "ছোটবেলায় মোবাইলে SMS লিখে বন্ধু বা পরিবারের কাউকে মেসেজ পাঠাতে?",
        helperText: "ছোট অক্ষরে মেসেজ লেখা, SMS প্যাক কেনা কিংবা ইনবক্স ভরে যাওয়ার দিনগুলো মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত SMS পাঠাতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে পাঠাতাম", score: 3 },
            { value: "few", label: "এক-দুইবার পাঠিয়েছি", score: 2 },
            { value: "received", label: "শুধু SMS পেতাম", score: 2 },
            { value: "never", label: "কখনো SMS ব্যবহার করিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে SMS ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 04: SCHOOL LIFE

    {
        id: "S02",
        categoryId: "school-life",
        question: "স্কুলে বন্ধুদের কাছ থেকে জ্যামিতি বক্স, কলম, পেন্সিল বা রাবার ধার নিতে কিংবা নিজের জিনিস ধার দিতে?",
        helperText: "ক্লাসের মধ্যে 'একটু কলমটা দে'—এমন পরিচিত মুহূর্তগুলোর কথা ভাবো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "প্রায়ই ধার নিতাম ও দিতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন স্কুলজীবনের অভিজ্ঞতা ছিল না", score: null }
        ]
    },

    // CATEGORY 05: GAMES & SPORTS

    {
        id: "G02",
        categoryId: "games-sports",
        question: "ছোটবেলায় কানামাছি, গোল্লাছুট, দাঁড়িয়াবান্ধা, লুকোচুরি বা এ ধরনের দেশি খেলায় অংশ নিয়েছ?",
        helperText: "নিজের এলাকার নাম আলাদা হলেও খেলাটি একই ধরনের হতে পারে।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেক ধরনের খেলায় খেলেছি", score: 4 },
            { value: "several", label: "কয়েকটি খেলায় অংশ নিয়েছি", score: 3 },
            { value: "few", label: "এক-দুই ধরনের খেলেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেলতে দেখেছি", score: 0 },
            { value: "never", label: "এ ধরনের খেলা খেলিনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন খেলার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 06: FOOD & TIFFIN

    {
        id: "F02",
        categoryId: "food-tiffin",
        question: "শীতকালে বাড়িতে তৈরি ভাপা পিঠা, চিতই পিঠা, পাটিসাপটা বা অন্য ধরনের পিঠা খেতে?",
        helperText: "পিঠা বানানোর আয়োজন, খেজুরের রস কিংবা পরিবারের সঙ্গে শীতের সকাল মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "every", label: "প্রতি শীতেই নিয়মিত খেতাম", score: 4 },
            { value: "often", label: "বেশ কয়েকবার খেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খাইনি", score: 0 },
            { value: "na", label: "এমন পিঠা পাওয়ার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 07: VILLAGE & NATURE

    {
        id: "V02",
        categoryId: "village-nature",
        question: "ছোটবেলায় বৃষ্টির পানিতে ভিজতে, জমে থাকা পানিতে খেলতে বা পুকুর-খাল-বিলে সময় কাটাতে?",
        helperText: "বর্ষার বৃষ্টি, পানিতে ছপছপ করা কিংবা প্রকৃতির মধ্যে কাটানো সময় মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন পরিবেশ বা সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 08: FAMILY & FESTIVALS

    {
        id: "FA02",
        categoryId: "family-festivals",
        question: "ছোটবেলায় দাদা-দাদি, নানা-নানি বা পরিবারের বড়দের কাছে গল্প, রূপকথা কিংবা পুরোনো দিনের ঘটনা শুনতে?",
        helperText: "ঘুমানোর আগে গল্প শোনা বা সন্ধ্যায় পরিবারের বড়দের ঘিরে বসার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত গল্প শুনতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে শুনতাম", score: 3 },
            { value: "few", label: "এক-দুইবার শুনেছি", score: 2 },
            { value: "seen", label: "অন্যদের গল্প শুনতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন গল্প শোনার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 09: FASHION & LIFESTYLE

    {
        id: "L02",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় খেলনা কেনার পাশাপাশি কাগজ, কাঠি, মাটি বা পুরোনো জিনিস দিয়ে নিজেরা খেলনা বানাতে?",
        helperText: "কাগজের নৌকা, মাটির খেলনা কিংবা নিজের হাতে বানানো ছোটখাটো জিনিস মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেক কিছু বানাতাম", score: 4 },
            { value: "several", label: "বেশ কয়েকবার বানিয়েছি", score: 3 },
            { value: "few", label: "এক-দুইবার বানিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের বানাতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো বানাইনি", score: 0 },
            { value: "na", label: "এমন অভিজ্ঞতার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 10: CITY & TRANSPORT

    {
        id: "C02",
        categoryId: "city-transport",
        question: "ছোটবেলায় নদী পার হতে নৌকা বা লঞ্চে উঠেছ এবং পানির দিকে তাকিয়ে ভ্রমণ উপভোগ করেছ?",
        helperText: "গ্রামের বাড়ি যাওয়া, আত্মীয়ের বাড়ি বেড়ানো বা পারিবারিক ভ্রমণের স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার উঠেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার উঠেছি", score: 3 },
            { value: "few", label: "এক-দুইবার উঠেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের উঠতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো উঠিনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন ভ্রমণের সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 11: INTERNET & DIGITAL LIFE

    {
        id: "I02",
        categoryId: "internet-digital-life",
        question: "ছোটবেলায় সাইবার ক্যাফে, কম্পিউটারের দোকান বা বন্ধুর বাসায় গিয়ে ইন্টারনেট ব্যবহার করেছ?",
        helperText: "ইন্টারনেটে প্রথম কিছু দেখা, গেম খেলা বা কারও সঙ্গে চ্যাট করার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত ব্যবহার করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে ব্যবহার করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার ব্যবহার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের ব্যবহার করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো ব্যবহার করিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে ইন্টারনেট ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 12: SPECIAL MEMORIES & NEIGHBOURHOOD

    {
        id: "SP02",
        categoryId: "special-memories",
        question: "ছোটবেলায় পাড়ার বন্ধুদের সঙ্গে বিকেল থেকে সন্ধ্যা পর্যন্ত খেলতে বা গল্প করতে গিয়ে বাড়ি ফিরতে দেরি করতে?",
        helperText: "মা-বাবার ডাক, সন্ধ্যার আজান বা রাস্তার বাতি জ্বলে ওঠার পর বাড়ি ফেরার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "প্রায়ই এমন হতো", score: 4 },
            { value: "often", label: "মাঝেমধ্যে হতো", score: 3 },
            { value: "few", label: "এক-দুইবার হয়েছে", score: 2 },
            { value: "seen", label: "বন্ধুদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন হয়নি", score: 0 },
            { value: "na", label: "এমন পাড়ার পরিবেশ বা সুযোগ ছিল না", score: null }
        ]
    },


    // ==========================================
    // QUESTION-03: BATCH 3 OF 7
    // ==========================================

    // CATEGORY 01: ELECTRICITY & NIGHT LIFE

    {
        id: "E03",
        categoryId: "electricity-nightlife",
        question: "গরমের রাতে বিদ্যুৎ না থাকলে পরিবারের সঙ্গে ছাদে বা উঠানে বসে আকাশ দেখা কিংবা গল্প করতে?",
        helperText: "লোডশেডিংয়ের রাতে খোলা আকাশের নিচে বসে থাকার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন অভিজ্ঞতার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 02: MUSIC & ENTERTAINMENT

    {
        id: "M03",
        categoryId: "music-entertainment",
        question: "টিভির ছবি বা সিগন্যাল ঠিকমতো না এলে ছাদে উঠে কিংবা অ্যান্টেনা ঘুরিয়ে ঠিক করার চেষ্টা করতে?",
        helperText: "একজন অ্যান্টেনা ঘোরাত, আরেকজন নিচ থেকে 'হয়েছে, হয়েছে' বলে চিৎকার করত—এমন মুহূর্ত মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "did", label: "নিজেই অ্যান্টেনা ঠিক করেছি", score: 4 },
            { value: "helped", label: "পরিবারের কাউকে সাহায্য করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার এমন কাজে ছিলাম", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমাদের বাসায় এমন অ্যান্টেনা ছিল না", score: null }
        ]
    },

    // CATEGORY 03: COMMUNICATION & TECHNOLOGY

    {
        id: "T03",
        categoryId: "communication-technology",
        question: "ছোটবেলায় মোবাইলে Flexiload করানো, রিচার্জের দোকানে টাকা দেওয়া বা স্ক্র্যাচ কার্ড ঘষে ব্যালেন্স ভরার অভিজ্ঞতা আছে?",
        helperText: "রিচার্জের দোকান, ছোট কার্ডের PIN নম্বর এবং ব্যালেন্স চেক করার দিনগুলো মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিজেই নিয়মিত রিচার্জ করতাম", score: 4 },
            { value: "family", label: "পরিবারের ফোনে রিচার্জ করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের রিচার্জ করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমার শৈশবে এমন রিচার্জ ব্যবস্থার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 04: SCHOOL LIFE

    {
        id: "S03",
        categoryId: "school-life",
        question: "স্কুলে বার্ষিক ক্রীড়া প্রতিযোগিতা, সাংস্কৃতিক অনুষ্ঠান বা পুরস্কার বিতরণীতে অংশ নিয়েছ কিংবা দর্শক হিসেবে উপভোগ করেছ?",
        helperText: "স্কুলের মাঠ, মাইক, মঞ্চ, দৌড় প্রতিযোগিতা ও পুরস্কার পাওয়ার মুহূর্ত মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "participated", label: "অংশ নিয়েছি এবং উপভোগ করেছি", score: 4 },
            { value: "participated_few", label: "এক-দুইবার অংশ নিয়েছি", score: 3 },
            { value: "audience", label: "দর্শক হিসেবে উপভোগ করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের কাছ থেকে শুনেছি", score: 0 },
            { value: "never", label: "এমন অনুষ্ঠান হয়নি বা দেখিনি", score: 0 },
            { value: "na", label: "এমন স্কুলজীবনের সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 05: GAMES & SPORTS

    {
        id: "G03",
        categoryId: "games-sports",
        question: "ছোটবেলায় মার্বেল বা গুলি, লাটিম, ডাংগুলি কিংবা এ ধরনের খেলনা দিয়ে খেলেছ?",
        helperText: "নিজে খেলেছ, বন্ধুদের সঙ্গে প্রতিযোগিতা করেছ, নাকি শুধু দেখেছ—মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেক ধরনের খেলায় খেলেছি", score: 4 },
            { value: "several", label: "কয়েকটি খেলায় খেলেছি", score: 3 },
            { value: "few", label: "এক-দুই ধরনের খেলেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেলতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খেলিনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এসব খেলার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 06: FOOD & TIFFIN

    {
        id: "F03",
        categoryId: "food-tiffin",
        question: "ছোটবেলায় কাঁচা আম, আমড়া, বরই বা অন্য টক ফল লবণ-মরিচ মাখিয়ে খেতে?",
        helperText: "স্কুলের সামনে, বাড়ির উঠানে বা বন্ধুদের সঙ্গে ভাগ করে খাওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "প্রায়ই খেতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের খেতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খাইনি", score: 0 },
            { value: "na", label: "এমন খাবার পাওয়ার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 07: VILLAGE & NATURE

    {
        id: "V03",
        categoryId: "village-nature",
        question: "ছোটবেলায় গাছে উঠে আম, জাম, পেয়ারা, কুল বা অন্য কোনো ফল পেড়ে খেয়েছ?",
        helperText: "নিজের বাড়ির গাছ, প্রতিবেশীর বাগান কিংবা গ্রামের ফলের গাছের স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার গাছে উঠে ফল পেড়েছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার পেড়েছি", score: 3 },
            { value: "few", label: "এক-দুইবার পেড়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের গাছে উঠতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো গাছে উঠে ফল পাড়িনি", score: 0 },
            { value: "na", label: "এমন গাছ বা সুযোগ আমার এলাকায় ছিল না", score: null }
        ]
    },

    // CATEGORY 08: FAMILY & FESTIVALS

    {
        id: "FA03",
        categoryId: "family-festivals",
        question: "ঈদের সময় ছোটবেলায় বড়দের কাছ থেকে সালামি বা ঈদি পাওয়ার জন্য অপেক্ষা করতে?",
        helperText: "সালামি পাওয়ার আনন্দ, টাকা জমিয়ে রাখা কিংবা বন্ধুদের সঙ্গে কে কত পেল তা নিয়ে আলোচনার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "every", label: "প্রতি ঈদেই সালামি পেতাম", score: 4 },
            { value: "often", label: "বেশিরভাগ ঈদে পেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার পেয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের সালামি পেতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমার ক্ষেত্রে এমন সুযোগ বা প্রথা ছিল না", score: null }
        ]
    },

    // CATEGORY 09: FASHION & LIFESTYLE

    {
        id: "L03",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় কয়েন, পুরোনো নোট, ডাকটিকিট বা বিশেষ কোনো ছোট জিনিস শখ করে জমিয়ে রাখতে?",
        helperText: "নিজের ছোট সংগ্রহ, বাক্স বা অ্যালবামে সাজিয়ে রাখার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "নিয়মিত সংগ্রহ করতাম", score: 4 },
            { value: "often", label: "বেশ কিছু জিনিস জমিয়েছিলাম", score: 3 },
            { value: "few", label: "এক-দুই ধরনের জিনিস জমিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের সংগ্রহ দেখেছি", score: 0 },
            { value: "never", label: "কখনো সংগ্রহ করিনি", score: 0 },
            { value: "na", label: "এমন শখের সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 10: CITY & TRANSPORT

    {
        id: "C03",
        categoryId: "city-transport",
        question: "ছোটবেলায় রেললাইন পার হওয়ার সময় ট্রেন আসার অপেক্ষা করেছ বা রেলক্রসিংয়ের গেট নামতে দেখেছ?",
        helperText: "ট্রেনের হর্ন, গেট বন্ধ হওয়া এবং ট্রেন চলে যাওয়ার পর রাস্তা পার হওয়ার মুহূর্ত মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার এমন অভিজ্ঞতা হয়েছে", score: 4 },
            { value: "several", label: "বেশ কয়েকবার হয়েছে", score: 3 },
            { value: "few", label: "এক-দুইবার হয়েছে", score: 2 },
            { value: "seen", label: "শুধু অন্যদের অপেক্ষা করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমার এলাকায় রেলক্রসিং ছিল না", score: null }
        ]
    },

    // CATEGORY 11: INTERNET & DIGITAL LIFE

    {
        id: "I03",
        categoryId: "internet-digital-life",
        question: "Nokia বা অন্য বাটন মোবাইলে Snake ছাড়া Java গেম খেলেছ?",
        helperText: "যেমন: Bounce, Diamond Rush, Asphalt বা অন্য কোনো ছোট মোবাইল গেম।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত অনেক গেম খেলতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেলতাম", score: 3 },
            { value: "few", label: "এক-দুইটি গেম খেলেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেলতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খেলিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এমন গেম খেলার সুযোগ ছিল না", score: null }
        ]
    },

    // CATEGORY 12: SPECIAL MEMORIES & NEIGHBOURHOOD

    {
        id: "SP03",
        categoryId: "special-memories",
        question: "ছোটবেলায় দূরে থাকা আত্মীয় বা বন্ধুকে হাতে লেখা চিঠি পাঠিয়েছ, কিংবা কারও কাছ থেকে চিঠি পেয়েছ?",
        helperText: "খামের ওপর ঠিকানা লেখা, ডাকটিকিট লাগানো বা চিঠির অপেক্ষা করার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "both", label: "চিঠি লিখেছি এবং পেয়েছিও", score: 4 },
            { value: "sent", label: "নিজে চিঠি পাঠিয়েছি", score: 3 },
            { value: "received", label: "চিঠি পেয়েছি", score: 3 },
            { value: "seen", label: "শুধু অন্যদের চিঠি লিখতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "আমার শৈশবে এমন চিঠি আদান-প্রদানের সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // QUESTION-04: BATCH 4 OF 7
    // ==========================================

    // CATEGORY 01: ELECTRICITY & NIGHT LIFE

    {
        id: "E04",
        categoryId: "electricity-nightlife",
        question: "ছোটবেলায় রাতে বিদ্যুৎ চলে গেলে টর্চ হাতে নিয়ে ঘরের বাইরে, উঠানে বা বাথরুমে যেতে হয়েছে?",
        helperText: "অন্ধকারে টর্চ হাতে চলাফেরা করা কিংবা পরিবারের কাউকে পথ দেখানোর স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন অভিজ্ঞতার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "E05",
        categoryId: "electricity-nightlife",
        question: "বিদ্যুৎ চলে গেলে টর্চ বা মোমবাতির আলো দিয়ে দেয়ালে হাতের ছায়া বানিয়ে খেলা করেছ?",
        helperText: "দেয়ালে পাখি বা অন্য আকৃতি বানিয়ে পরিবারের সঙ্গে মজা করার সেই অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার দেখেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার দেখেছি", score: 3 },
            { value: "few", label: "এক-দুইবার দেখেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের কাছে শুনেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন পরিবেশ বা সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "E06",
        categoryId: "electricity-nightlife",
        question: "গরমের রাতে বিদ্যুৎ চলে গেলে ছাদে বা উঠানে মাদুর বিছিয়ে ঘুমিয়েছ?",
        helperText: "পরিবারের সঙ্গে খোলা আকাশের নিচে ঘুমানোর স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার ঘুমিয়েছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার ঘুমিয়েছি", score: 3 },
            { value: "few", label: "এক-দুইবার ঘুমিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো ঘুমাইনি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "E07",
        categoryId: "electricity-nightlife",
        question: "ছোটবেলায় রাতে মশারির ভেতরে টর্চ জ্বালিয়ে বই, কমিকস বা গল্পের বই পড়েছ?",
        helperText: "সবাই ঘুমিয়ে পড়ার পর লুকিয়ে বই পড়ার সেই মজার অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত শুনতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে শুনতাম", score: 3 },
            { value: "few", label: "এক-দুইবার শুনেছি", score: 2 },
            { value: "seen", label: "অন্যদের গল্প করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 02: MUSIC & ENTERTAINMENT
    // ==========================================

    {
        id: "M04",
        categoryId: "music-entertainment",
        question: "ছোটবেলায় ক্যাসেট প্লেয়ারে গান শুনেছ বা পরিবারের কারও ক্যাসেট সংগ্রহ দেখেছ?",
        helperText: "অডিও ক্যাসেট, ক্যাসেট প্লেয়ার ও প্রিয় গানের স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত ক্যাসেটে গান শুনতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে শুনতাম", score: 3 },
            { value: "few", label: "এক-দুইবার শুনেছি", score: 2 },
            { value: "seen", label: "শুধু ক্যাসেট দেখেছি", score: 0 },
            { value: "never", label: "কখনো দেখিনি বা শুনিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এর সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "M05",
        categoryId: "music-entertainment",
        question: "ছোটবেলায় VCD বা DVD প্লেয়ারে সিনেমা, কার্টুন কিংবা নাটক দেখেছ?",
        helperText: "ডিস্ক ঢোকানো, রিমোট দিয়ে চালানো বা দোকান থেকে ডিস্ক আনার দিনগুলো মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত দেখতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে দেখতাম", score: 3 },
            { value: "few", label: "এক-দুইবার দেখেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের দেখতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো দেখিনি", score: 0 },
            { value: "na", label: "এমন প্লেয়ার ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "M06",
        categoryId: "music-entertainment",
        question: "টিভিতে নির্দিষ্ট সময়ে কার্টুন বা শিশুতোষ অনুষ্ঠান শুরু হবে বলে আগে থেকেই অপেক্ষা করতে?",
        helperText: "অনুষ্ঠান মিস হলে মন খারাপ হওয়া কিংবা সময়মতো টিভির সামনে বসার কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "always", label: "প্রায় প্রতিদিন অপেক্ষা করতাম", score: 4 },
            { value: "often", label: "নিয়মিত অপেক্ষা করতাম", score: 3 },
            { value: "few", label: "মাঝেমধ্যে অপেক্ষা করতাম", score: 2 },
            { value: "seen", label: "অন্যদের অপেক্ষা করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন অনুষ্ঠান দেখার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "M07",
        categoryId: "music-entertainment",
        question: "ছোটবেলায় রেডিওতে গান, গানের অনুরোধের অনুষ্ঠান, খেলাধুলার ধারাভাষ্য বা সংবাদ শুনতে?",
        helperText: "পরিবারের রেডিওতে অনুষ্ঠান শোনা কিংবা পছন্দের গান শোনার জন্য অপেক্ষা করার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত শুনতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে শুনতাম", score: 3 },
            { value: "few", label: "এক-দুইবার শুনেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের শুনতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো শুনিনি", score: 0 },
            { value: "na", label: "রেডিও শোনার সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 03: COMMUNICATION & TECHNOLOGY
    // ==========================================

    {
        id: "T04",
        categoryId: "communication-technology",
        question: "ছোটবেলায় কাউকে ফোন করার বদলে শুধু Missed Call দিয়ে নিজের উপস্থিতি বা কোনো সংকেত জানাতে?",
        helperText: "বন্ধু বা পরিবারের সঙ্গে আগে থেকে ঠিক করা মিসড কলের সংকেত মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত দিতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে দিতাম", score: 3 },
            { value: "few", label: "এক-দুইবার দিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো দিইনি", score: 0 },
            { value: "na", label: "এমন মোবাইল ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "T05",
        categoryId: "communication-technology",
        question: "ছোটবেলায় মোবাইলে * বা # দিয়ে বিভিন্ন কোড ডায়াল করে ব্যালেন্স, নিজের নম্বর বা অন্য তথ্য চেক করতে?",
        helperText: "USSD কোড ডায়াল করে মোবাইলের তথ্য জানার অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিজেই নিয়মিত করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন মোবাইল ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "T06",
        categoryId: "communication-technology",
        question: "ছোটবেলায় মোবাইলের জন্য নিজে রিংটোন, ওয়ালপেপার বা থিম পরিবর্তন করতে?",
        helperText: "পছন্দের গান রিংটোন করা কিংবা ফোনের স্ক্রিন সাজানোর স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিজেই অনেকবার পরিবর্তন করেছি", score: 4 },
            { value: "often", label: "কয়েকবার পরিবর্তন করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "helped", label: "অন্য কাউকে দিয়ে পরিবর্তন করিয়েছি", score: 2 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন ফোন ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "T07",
        categoryId: "communication-technology",
        question: "ছোটবেলায় Bluetooth দিয়ে এক মোবাইল থেকে অন্য মোবাইলে গান, ছবি বা ভিডিও পাঠিয়েছ?",
        helperText: "Bluetooth চালু করা, অন্য ফোন খুঁজে পাওয়া এবং ফাইল পাঠানোর অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত ফাইল পাঠাতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে পাঠাতাম", score: 3 },
            { value: "few", label: "এক-দুইবার পাঠিয়েছি", score: 2 },
            { value: "received", label: "শুধু অন্যদের কাছ থেকে ফাইল নিয়েছি", score: 2 },
            { value: "never", label: "কখনো ব্যবহার করিনি", score: 0 },
            { value: "na", label: "এমন ফোন ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 04: SCHOOL LIFE
    // ==========================================

    {
        id: "S04",
        categoryId: "school-life",
        question: "স্কুলে সুন্দর হাতের লেখা করার জন্য বারবার লেখা অনুশীলন বা হাতের লেখা প্রতিযোগিতায় অংশ নিয়েছ?",
        helperText: "খাতার মার্জিন, সুন্দর অক্ষর এবং শিক্ষকের হাতের লেখা নিয়ে মন্তব্য মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত অনুশীলন করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে অনুশীলন করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন স্কুলের অভিজ্ঞতা ছিল না", score: null }
        ]
    },

    {
        id: "S05",
        categoryId: "school-life",
        question: "স্কুলে ফাউন্টেন পেন বা কালি কলম দিয়ে লিখেছ?",
        helperText: "কলমে কালি ভরা, নিব পরিষ্কার করা কিংবা হাতে কালি লেগে যাওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত লিখতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে লিখতাম", score: 3 },
            { value: "few", label: "এক-দুইবার লিখেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের লিখতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো লিখিনি", score: 0 },
            { value: "na", label: "এমন কলম ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "S06",
        categoryId: "school-life",
        question: "স্কুলের লাইব্রেরি থেকে গল্পের বই, ছড়ার বই বা জ্ঞান-বিজ্ঞানের বই নিয়ে পড়েছ?",
        helperText: "বই ধার নেওয়া, নির্দিষ্ট দিনে ফেরত দেওয়া কিংবা লাইব্রেরিতে বসে পড়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত বই নিতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে নিতাম", score: 3 },
            { value: "few", label: "এক-দুইবার নিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের বই নিতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো নিইনি", score: 0 },
            { value: "na", label: "আমাদের স্কুলে লাইব্রেরি ছিল না", score: null }
        ]
    },

    {
        id: "S07",
        categoryId: "school-life",
        question: "স্কুলের দেয়াল পত্রিকা, হাতের লেখা ম্যাগাজিন বা ক্লাসের চার্টে নিজের লেখা বা আঁকা জমা দিয়েছ?",
        helperText: "কবিতা, গল্প, ছবি বা নিজের নাম ছাপা/লেখা দেখার আনন্দ মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার জমা দিয়েছি", score: 4 },
            { value: "several", label: "কয়েকবার জমা দিয়েছি", score: 3 },
            { value: "few", label: "একবার জমা দিয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের কাজ দেখেছি", score: 0 },
            { value: "never", label: "কখনো জমা দিইনি", score: 0 },
            { value: "na", label: "এমন আয়োজন ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 05: GAMES & SPORTS
    // ==========================================

    {
        id: "G04",
        categoryId: "games-sports",
        question: "ছোটবেলায় কাগজের বা প্লাস্টিকের ঘুড়ি বানিয়ে কিংবা কিনে আকাশে উড়িয়েছ?",
        helperText: "ঘুড়ির সুতা, নাটাই, ছাদ বা খোলা মাঠে ঘুড়ি ওড়ানোর স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার ঘুড়ি উড়িয়েছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার উড়িয়েছি", score: 3 },
            { value: "few", label: "এক-দুইবার উড়িয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের উড়াতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো উড়াইনি", score: 0 },
            { value: "na", label: "এমন খেলার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "G05",
        categoryId: "games-sports",
        question: "ছোটবেলায় বন্ধুদের সঙ্গে পাড়ায় বা মাঠে ক্রিকেট, ফুটবল কিংবা ব্যাডমিন্টন খেলেছ?",
        helperText: "ইট দিয়ে স্টাম্প বানানো, পুরোনো ব্যাট বা শাটল নিয়ে খেলার কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত খেলতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেলতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেলেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেলতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খেলিনি", score: 0 },
            { value: "na", label: "এমন খেলার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "G06",
        categoryId: "games-sports",
        question: "ছোটবেলায় বন্ধুদের সঙ্গে সাইকেল চালানো, সাইকেল রেস করা বা দূরে ঘুরতে যাওয়ার অভিজ্ঞতা আছে?",
        helperText: "নিজের সাইকেল না থাকলেও অন্যের সাইকেল চালানোর অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "নিয়মিত সাইকেল চালাতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে চালাতাম", score: 3 },
            { value: "few", label: "এক-দুইবার চালিয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের চালাতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো চালাইনি", score: 0 },
            { value: "na", label: "সাইকেল চালানোর সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "G07",
        categoryId: "games-sports",
        question: "২০১২/১৩ সালের দিকে দোকান বা Gaming Box-এ টাকা দিয়ে কম্পিউটার বা কনসোল গেম খেলেছ?",
        helperText: "Mustafa/Mustofa, ফুটবল গেম, রেসিং বা দোকানে বসে অন্যদের গেম খেলা দেখার দিনগুলো মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত টাকা দিয়ে খেলতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেলতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেলেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেলতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো যাইনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন দোকান ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 06: FOOD & TIFFIN
    // ==========================================

    {
        id: "F04",
        categoryId: "food-tiffin",
        question: "ছোটবেলায় স্কুলের সামনে বা পাড়ার দোকান থেকে আইসক্রিম, বরফের ললি বা রঙিন বরফ কিনে খেয়েছ?",
        helperText: "গরমের দিনে ঘণ্টা বাজিয়ে আসা আইসক্রিমওয়ালা কিংবা ছোট প্যাকেটের বরফের কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "প্রায়ই কিনে খেতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের খেতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খাইনি", score: 0 },
            { value: "na", label: "এমন খাবার পাওয়ার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "F05",
        categoryId: "food-tiffin",
        question: "ছোটবেলায় রাস্তার পাশের ফুচকা, চটপটি, ঝালমুড়ি বা হকারের তৈরি খাবার খেয়েছ?",
        helperText: "বন্ধুদের সঙ্গে ভাগ করে খাওয়া কিংবা পছন্দের দোকানে যাওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত খেতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেয়েছি", score: 2 },
            { value: "seen", label: "অন্যদের খেতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খাইনি", score: 0 },
            { value: "na", label: "এমন খাবার পাওয়ার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "F06",
        categoryId: "food-tiffin",
        question: "ছোটবেলায় বাড়িতে তৈরি নাড়ু, মোয়া, মুড়ির মোয়া বা বিভিন্ন ধরনের ঘরোয়া মিষ্টি খেয়েছ?",
        helperText: "নবান্ন, শীতকাল বা উৎসব উপলক্ষে বাড়িতে খাবার তৈরির স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত খেতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে খেতাম", score: 3 },
            { value: "few", label: "এক-দুইবার খেয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের খেতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো খাইনি", score: 0 },
            { value: "na", label: "এমন খাবার পাওয়ার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "F07",
        categoryId: "food-tiffin",
        question: "ছোটবেলায় স্কুলে যাওয়ার আগে বা ফিরে এসে মায়ের/পরিবারের বানানো নাশতা খাওয়ার জন্য অপেক্ষা করতে?",
        helperText: "রুটি, পরোটা, ভাজি, ডিম বা ঘরে তৈরি অন্য নাশতার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "daily", label: "প্রায় প্রতিদিন খেতাম", score: 4 },
            { value: "often", label: "সপ্তাহে কয়েকদিন খেতাম", score: 3 },
            { value: "few", label: "মাঝেমধ্যে খেতাম", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 07: VILLAGE & NATURE
    // ==========================================

    {
        id: "V04",
        categoryId: "village-nature",
        question: "ছোটবেলায় পুকুর, নদী, খাল বা বিলে সাঁতার কেটেছ কিংবা পানিতে নেমে গোসল করেছ?",
        helperText: "পরিবারের অনুমতি নিয়ে বা বড়দের সঙ্গে পানিতে নামার অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার সাঁতার কেটেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার নেমেছি", score: 3 },
            { value: "few", label: "এক-দুইবার নেমেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের নামতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো নামিনি", score: 0 },
            { value: "na", label: "এমন জলাশয় বা সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "V05",
        categoryId: "village-nature",
        question: "ছোটবেলায় জোনাকি পোকা ধরেছ বা সন্ধ্যায় গাছপালা ও ঝোপের মধ্যে জোনাকির আলো দেখেছ?",
        helperText: "বর্ষার সন্ধ্যা কিংবা গ্রামের অন্ধকার পথে জোনাকির আলো দেখার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার দেখেছি বা ধরেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার দেখেছি", score: 3 },
            { value: "few", label: "এক-দুইবার দেখেছি", score: 2 },
            { value: "seen", label: "শুধু ছবি বা ভিডিওতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো দেখিনি", score: 0 },
            { value: "na", label: "এমন পরিবেশ বা সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "V06",
        categoryId: "village-nature",
        question: "ছোটবেলায় ধানক্ষেত, সরিষার ক্ষেত বা ফসলের মাঠের মধ্য দিয়ে হেঁটে বেড়িয়েছ?",
        helperText: "গ্রামের সরু মেঠোপথ, সবুজ মাঠ কিংবা হলুদ সরিষার ক্ষেতের স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার হেঁটেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার হেঁটেছি", score: 3 },
            { value: "few", label: "এক-দুইবার হেঁটেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের যেতে দেখেছি", score: 0 },
            { value: "never", label: "এমন পথে হাঁটিনি", score: 0 },
            { value: "na", label: "এমন মাঠ বা পথ ছিল না", score: null }
        ]
    },

    {
        id: "V07",
        categoryId: "village-nature",
        question: "ছোটবেলায় বাড়ির উঠান বা বাগানে গাছ লাগানো, গাছে পানি দেওয়া কিংবা ফল-ফুলের যত্ন নিয়েছ?",
        helperText: "নিজের হাতে লাগানো গাছ বড় হতে দেখা বা পরিবারের বাগানে কাজ করার কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "নিয়মিত গাছের যত্ন নিতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে যত্ন নিতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন বাগান বা সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 08: FAMILY & FESTIVALS
    // ==========================================

    {
        id: "FA04",
        categoryId: "family-festivals",
        question: "ছোটবেলায় রাতে পরিবারের সবাই মিলে একই টিভিতে নাটক, সিনেমা বা বিশেষ অনুষ্ঠান দেখতে বসতে?",
        helperText: "কে রিমোট ধরবে, কে আগে বসবে—এমন পারিবারিক মুহূর্ত মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "প্রায় প্রতিদিন একসঙ্গে দেখতাম", score: 4 },
            { value: "often", label: "নিয়মিত দেখতাম", score: 3 },
            { value: "few", label: "মাঝেমধ্যে দেখতাম", score: 2 },
            { value: "seen", label: "শুধু অন্যদের একসঙ্গে দেখতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন টিভি দেখার সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "FA05",
        categoryId: "family-festivals",
        question: "ছোটবেলায় গ্রীষ্মের ছুটি বা স্কুল বন্ধে আত্মীয়ের বাড়ি কয়েকদিন বেড়াতে থাকতে?",
        helperText: "মামাবাড়ি, নানাবাড়ি, দাদাবাড়ি বা অন্য আত্মীয়ের বাড়িতে ছুটি কাটানোর স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "every", label: "প্রায় প্রতি ছুটিতেই যেতাম", score: 4 },
            { value: "often", label: "বেশ কয়েকবার থেকেছি", score: 3 },
            { value: "few", label: "এক-দুইবার থেকেছি", score: 2 },
            { value: "visited", label: "গিয়েছি, তবে থাকিনি", score: 2 },
            { value: "never", label: "কখনো যাইনি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "FA06",
        categoryId: "family-festivals",
        question: "ছোটবেলায় পরিবারের সঙ্গে বিয়ে, গায়ে হলুদ বা অন্য আত্মীয়ের বড় অনুষ্ঠানে অংশ নিয়েছ?",
        helperText: "নতুন পোশাক, সাজসজ্জা, খাবার এবং আত্মীয়দের সঙ্গে দেখা হওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেক অনুষ্ঠানে গিয়েছি", score: 4 },
            { value: "several", label: "বেশ কয়েকটিতে গিয়েছি", score: 3 },
            { value: "few", label: "এক-দুইটিতে গিয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের যেতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অনুষ্ঠানে যাইনি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "FA07",
        categoryId: "family-festivals",
        question: "ছোটবেলায় পরিবারের সঙ্গে একসঙ্গে রান্না, পিঠা বানানো বা উৎসবের খাবার তৈরিতে সাহায্য করেছ?",
        helperText: "সবাই মিলে রান্নাঘরে কাজ করা, খাবার সাজানো বা ছোটখাটো দায়িত্ব নেওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার সাহায্য করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 09: FASHION & LIFESTYLE
    // ==========================================

    {
        id: "L04",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় স্কুলের নতুন ইউনিফর্ম, জুতা বা ব্যাগ পাওয়ার জন্য অপেক্ষা করতে?",
        helperText: "নতুন শিক্ষাবর্ষের আগে নতুন স্কুলের জিনিস কেনার উত্তেজনা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "every", label: "প্রায় প্রতি বছর অপেক্ষা করতাম", score: 4 },
            { value: "often", label: "বেশিরভাগ বছর অপেক্ষা করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার এমন হয়েছে", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন হয়নি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "L05",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় ঈদ বা উৎসবের আগে নতুন জামার সঙ্গে মিলিয়ে জুতা, স্যান্ডেল বা অন্য সাজসজ্জার জিনিস কিনতে?",
        helperText: "উৎসবের আগে বাজারে কেনাকাটা ও নতুন সাজের আনন্দ মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "every", label: "প্রায় প্রতিটি উৎসবে কিনতাম", score: 4 },
            { value: "often", label: "বেশিরভাগ উৎসবে কিনতাম", score: 3 },
            { value: "few", label: "এক-দুইবার কিনেছি", score: 2 },
            { value: "seen", label: "অন্যদের কিনতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "L06",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় নিজের খেলনা, স্কুলের জিনিস বা প্রিয় ছোটখাটো জিনিস আলাদা বাক্সে যত্ন করে জমিয়ে রাখতে?",
        helperText: "নিজের গুপ্তধনের বাক্স, পছন্দের খেলনা বা ছোট সংগ্রহের কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "অনেক জিনিস যত্ন করে রাখতাম", score: 4 },
            { value: "often", label: "কয়েকটি জিনিস জমিয়ে রাখতাম", score: 3 },
            { value: "few", label: "এক-দুইটি জিনিস রাখতাম", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন অভ্যাস ছিল না", score: null }
        ]
    },

    {
        id: "L07",
        categoryId: "fashion-lifestyle",
        question: "ছোটবেলায় বন্ধু বা ভাইবোনের সঙ্গে জামা, জুতা, খেলনা কিংবা পছন্দের জিনিস অদলবদল করে ব্যবহার করতে?",
        helperText: "একজনের জিনিস অন্যজন ব্যবহার করা কিংবা পছন্দের জিনিস ধার নেওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত অদলবদল করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 10: CITY & TRANSPORT
    // ==========================================

    {
        id: "C04",
        categoryId: "city-transport",
        question: "ছোটবেলায় লোকাল বাসে উঠে কন্ডাক্টরের কাছ থেকে টিকিট নিয়েছ বা ভাড়া দেওয়ার জন্য কয়েন/নোট এগিয়ে দিয়েছ?",
        helperText: "বাসের কন্ডাক্টরের ডাক, টিকিট ছেঁড়া এবং জানালার পাশের সিটের স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার এমন ভ্রমণ করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো করিনি", score: 0 },
            { value: "na", label: "এমন বাসে যাতায়াতের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "C05",
        categoryId: "city-transport",
        question: "ছোটবেলায় রিকশায় চড়ার সময় রিকশার ঘণ্টা বাজানো বা রিকশার পেছনের নকশা দেখতে ভালো লাগত?",
        helperText: "রিকশার রঙিন ছবি, ঘণ্টার শব্দ ও ধীরে ধীরে শহর ঘুরে দেখার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার এমন অভিজ্ঞতা হয়েছে", score: 4 },
            { value: "several", label: "বেশ কয়েকবার হয়েছে", score: 3 },
            { value: "few", label: "এক-দুইবার হয়েছে", score: 2 },
            { value: "seen", label: "শুধু অন্যদের করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন রিকশা ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "C06",
        categoryId: "city-transport",
        question: "ছোটবেলায় ট্রেনে ভ্রমণের সময় জানালার পাশে বসে বাইরের দৃশ্য, স্টেশন বা ট্রেনের হুইসেল উপভোগ করেছ?",
        helperText: "ট্রেনের কামরা, স্টেশনের ভিড় এবং জানালা দিয়ে দেখা দৃশ্য মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার ট্রেনে ভ্রমণ করেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার করেছি", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের ভ্রমণ করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো ট্রেনে উঠিনি", score: 0 },
            { value: "na", label: "ট্রেনে ভ্রমণের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "C07",
        categoryId: "city-transport",
        question: "ছোটবেলায় ফেরি বা খেয়া নৌকায় নদী পার হওয়ার সময় গাড়ি বা মানুষের সঙ্গে নৌকায় অপেক্ষা করেছ?",
        helperText: "ফেরিঘাটের ভিড়, নদীর বাতাস এবং ফেরিতে ওঠার অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার পার হয়েছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার পার হয়েছি", score: 3 },
            { value: "few", label: "এক-দুইবার পার হয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের পার হতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো পার হইনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন ফেরি বা খেয়া ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 11: INTERNET & DIGITAL LIFE
    // ==========================================

    {
        id: "I04",
        categoryId: "internet-digital-life",
        question: "ছোটবেলায় কম্পিউটারে CD বা DVD ঢুকিয়ে গেম, গান, সিনেমা কিংবা সফটওয়্যার চালিয়েছ?",
        helperText: "ডিস্কের কভার, CD-ROM ড্রাইভ এবং ডিস্ক না পড়লে বারবার চেষ্টা করার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত ব্যবহার করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে ব্যবহার করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার ব্যবহার করেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের ব্যবহার করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো ব্যবহার করিনি", score: 0 },
            { value: "na", label: "এমন কম্পিউটার ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "I05",
        categoryId: "internet-digital-life",
        question: "ছোটবেলায় কম্পিউটারে MS Paint খুলে ছবি আঁকা, রং করা বা নিজের নাম লিখে ডিজাইন করেছ?",
        helperText: "কম্পিউটারের মাউস দিয়ে আঁকিবুঁকি করার প্রথম অভিজ্ঞতা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "অনেকবার ছবি এঁকেছি", score: 4 },
            { value: "often", label: "মাঝেমধ্যে এঁকেছি", score: 3 },
            { value: "few", label: "এক-দুইবার এঁকেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের আঁকতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো ব্যবহার করিনি", score: 0 },
            { value: "na", label: "কম্পিউটার ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "I06",
        categoryId: "internet-digital-life",
        question: "ছোটবেলায় কম্পিউটারে বাংলা বা ইংরেজি টাইপিং, প্রিন্ট করা কিংবা কম্পিউটার দোকানে নিজের কাজ করিয়েছ?",
        helperText: "কম্পিউটার কম্পোজ, প্রিন্টের দোকান বা প্রথম টাইপিং শেখার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিজেই নিয়মিত টাইপ করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে টাইপ করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "service", label: "শুধু দোকানে কাজ করিয়েছি", score: 2 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "I07",
        categoryId: "internet-digital-life",
        question: "ছোটবেলায় Facebook, Yahoo Messenger বা অন্য কোনো অনলাইন মাধ্যমে বন্ধুদের সঙ্গে চ্যাট বা যোগাযোগ করেছ?",
        helperText: "প্রথম অনলাইন অ্যাকাউন্ট, বন্ধুর সঙ্গে চ্যাট কিংবা প্রোফাইল ছবি দেওয়ার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "নিয়মিত ব্যবহার করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে ব্যবহার করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার ব্যবহার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের ব্যবহার করতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো ব্যবহার করিনি", score: 0 },
            { value: "na", label: "আমার শৈশবে এসব ব্যবহারের সুযোগ ছিল না", score: null }
        ]
    },

    // ==========================================
    // CATEGORY 12: SPECIAL MEMORIES & NEIGHBOURHOOD
    // ==========================================

    {
        id: "SP04",
        categoryId: "special-memories",
        question: "ছোটবেলায় পাড়ার কোনো বিশেষ অনুষ্ঠান, ওয়াজ, মেলা বা খেলার খবর মাইকিং করে প্রচার হতে শুনেছ?",
        helperText: "রিকশায় মাইক লাগিয়ে ঘোষণা, পাড়ার মেলা বা স্থানীয় অনুষ্ঠানের প্রচারের কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার শুনেছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার শুনেছি", score: 3 },
            { value: "few", label: "এক-দুইবার শুনেছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের কাছ থেকে শুনেছি", score: 0 },
            { value: "never", label: "এমন ঘোষণা শুনিনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন প্রচার হতো না", score: null }
        ]
    },

    {
        id: "SP05",
        categoryId: "special-memories",
        question: "ছোটবেলায় কোনো বন্ধুর বাসায় হঠাৎ বেড়াতে যাওয়া বা বন্ধুদের নিজের বাসায় ডেকে খেলতে?",
        helperText: "আগে থেকে ফোন না করে বন্ধুর বাড়িতে হাজির হওয়ার দিনগুলোর কথা মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "প্রায়ই এমন করতাম", score: 4 },
            { value: "often", label: "মাঝেমধ্যে করতাম", score: 3 },
            { value: "few", label: "এক-দুইবার করেছি", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন করিনি", score: 0 },
            { value: "na", label: "এমন পাড়ার পরিবেশ বা সুযোগ ছিল না", score: null }
        ]
    },

    {
        id: "SP06",
        categoryId: "special-memories",
        question: "ছোটবেলায় এলাকার মেলা, বৈশাখী মেলা বা গ্রামীণ মেলায় পরিবারের সঙ্গে কিংবা বন্ধুদের নিয়ে গিয়েছ?",
        helperText: "নাগরদোলা, খেলনা, মিষ্টি, পুতুল বা মেলার দোকানগুলোর স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "many", label: "অনেকবার মেলায় গিয়েছি", score: 4 },
            { value: "several", label: "বেশ কয়েকবার গিয়েছি", score: 3 },
            { value: "few", label: "এক-দুইবার গিয়েছি", score: 2 },
            { value: "seen", label: "শুধু অন্যদের যেতে দেখেছি", score: 0 },
            { value: "never", label: "কখনো যাইনি", score: 0 },
            { value: "na", label: "আমার এলাকায় এমন মেলা হতো না", score: null }
        ]
    },

    {
        id: "SP07",
        categoryId: "special-memories",
        question: "ছোটবেলায় পাড়ার বন্ধুদের সঙ্গে কোনো গোপন আড্ডার জায়গা, গাছের নিচে বসা বা নিজেদের ছোট্ট দল তৈরি করেছিলে?",
        helperText: "বন্ধুদের বিশেষ নাম, গোপন কথা বা একসঙ্গে কাটানো নির্দিষ্ট জায়গার স্মৃতি মনে করো।",
        answerType: "single",
        activeEra: ["all"],
        allowNotApplicable: true,
        personalMemory: true,
        options: [
            { value: "regular", label: "আমাদের এমন দল ও জায়গা ছিল", score: 4 },
            { value: "often", label: "বন্ধুদের সঙ্গে এমন আড্ডা দিতাম", score: 3 },
            { value: "few", label: "এক-দুইবার এমন হয়েছে", score: 2 },
            { value: "seen", label: "অন্যদের এমন করতে দেখেছি", score: 0 },
            { value: "never", label: "এমন অভিজ্ঞতা হয়নি", score: 0 },
            { value: "na", label: "এমন সুযোগ ছিল না", score: null }
        ]
    },

];
