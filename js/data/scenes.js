/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   QUESTION SCENES — one animated memory
   scene + one sound for every question.
   ------------------------------------------
   id: [set, fx, sound, caption, props]

   set   → background (see .sc-set-* in css/scenes.css)
   fx    → space separated effect layers:
           rain stars fireflies glow static notes steam
           sparkle confetti waves beam net mist wind
           bunting lights dust
   sound → effect name in js/modules/sound.js
   props → "emoji x y size animation [modifier]"
           x, y in % of the scene, size in em
           modifiers: shadow, flip, glowy

   REAL ILLUSTRATIONS: put the picture in
   assets/images/quiz-questions/<id>.webp and
   add the id to GCP.SCENE_IMAGES below. It
   then replaces the drawn background (props
   and effects still animate on top).
========================================== */

window.GCP = window.GCP || {};

GCP.SCENE_IMAGES = [
    // "E01", "M01", ...
];

GCP.SCENES = {

    /* ---------- বিদ্যুৎ ও রাত ---------- */
    E01: ["room-night", "glow", "matchStrike", "হারিকেনের আলোয় হোমওয়ার্ক",
        ["🏮 50 46 2.3 flicker glowy", "📖 30 78 1.3 float", "✏️ 68 80 1 wobble", "🦟 82 26 .6 fly"]],
    E02: ["room-night", "glow", "fanSwish", "গরমের রাতে হাতপাখা",
        ["🪭 52 46 2.4 fan", "😪 28 70 1.4 bob", "💤 74 30 1 rise"]],
    E03: ["roof-night", "stars", "crickets", "ছাদে বসে তারা গোনা",
        ["🌕 76 22 1.6 float glowy", "👨‍👩‍👧 44 72 2 bob", "🌠 24 18 1 shoot"]],
    E04: ["village-night", "beam stars", "crickets", "টর্চ হাতে উঠানে",
        ["🔦 30 58 1.6 swing", "🐸 72 80 1 jump", "🦉 82 30 1.1 blink"]],
    E05: ["wall-night", "glow", "matchStrike", "দেয়ালে হাতের ছায়া-পাখি",
        ["🕯️ 22 72 1.4 flicker glowy", "🦅 60 38 2.8 sway shadow", "🐇 84 54 1.6 wobble shadow", "🤚 36 62 1.3 wave"]],
    E06: ["roof-night", "stars", "crickets", "ছাদে মাদুর পেতে ঘুম",
        ["😴 42 72 1.5 bob", "🌙 76 22 1.4 float glowy", "💤 58 50 .9 rise", "🦟 24 36 .6 fly"]],
    E07: ["room-night", "net glow", "pageFlip", "মশারির ভেতরে টর্চ জ্বেলে",
        ["🔦 34 56 1.4 flicker glowy", "📚 58 64 1.7 float", "🦟 82 28 .7 fly"]],

    /* ---------- গান ও বিনোদন ---------- */
    M01: ["tv-room", "glow", "tvTheme", "আলিফ লায়লা শুরু হচ্ছে!",
        ["📺 50 52 2.8 pulse", "🧞 50 40 1.2 float", "🪔 18 70 1 swing", "🧒 84 78 1.4 bob"]],
    M02: ["room-dark", "static mist", "spooky", "বৃহস্পতিবার রাত… Bhoot FM",
        ["📻 48 60 2.2 shake", "👻 74 32 1.4 ghost", "🕯️ 22 64 1.1 flicker glowy", "🙈 84 76 1.1 shake"]],
    M03: ["roof-day", "", "tvStatic", "\"এসেছে? এবার এসেছে?\"",
        ["📡 50 32 2.1 swing", "🧒 38 74 1.4 shake", "📺 80 72 1.2 blink", "🗣️ 18 56 1 pulse"]],
    M04: ["room-day", "notes", "cassette", "পেন্সিল দিয়ে ক্যাসেট রিওয়াইন্ড",
        ["📼 48 54 2.3 wobble", "✏️ 70 40 1.1 spin", "🎶 26 32 1 float"]],
    M05: ["tv-room", "glow", "discSpin", "VCD-তে শুক্রবারের সিনেমা",
        ["💿 34 50 1.6 spin", "📺 64 54 2.2 pulse", "🍿 20 78 1.1 bounce"]],
    M06: ["tv-room", "glow", "cartoonJingle", "কার্টুন শুরু ঠিক ৫টায়!",
        ["📺 50 52 2.6 pulse", "⏰ 18 34 1.1 ring", "🧒 82 76 1.3 bounce", "🦸 50 44 1 float"]],
    M07: ["room-day", "notes", "radioTune", "রেডিওতে খেলার ধারাভাষ্য",
        ["📻 44 58 2.3 bob", "🏏 72 40 1 wobble", "🗞️ 22 72 1.2 sway"]],

    /* ---------- যোগাযোগ ---------- */
    T01: ["desk", "", "nokiaRing", "Nokia টিউন বাজছে…",
        ["📱 50 52 2.6 ring", "🔋 78 28 .9 blink", "🐍 26 30 1 wobble"]],
    T02: ["desk", "", "smsBeep", "১৬০ অক্ষরের মধ্যে সব কথা",
        ["📱 44 56 2.4 bob", "✉️ 72 34 1.2 fly", "💬 26 30 1.1 pulse"]],
    T03: ["shop", "", "scratchCard", "স্ক্র্যাচ কার্ড ঘষে রিচার্জ",
        ["🎫 48 52 1.9 wobble", "🪙 26 66 1 spin", "📱 74 58 1.5 bob"]],
    T04: ["desk", "", "missedCall", "একটা মিসড কল মানে \"নিচে আয়\"",
        ["📱 50 56 2.4 ring", "📞 74 34 1.1 shake", "❌ 28 30 .9 blink"]],
    T05: ["desk", "", "keyBeeps", "*৫৬৬# — ব্যালেন্স কত?",
        ["#️⃣ 28 34 1.2 pulse", "*️⃣ 72 34 1.2 pulse", "📱 50 62 2.2 bob"]],
    T06: ["desk", "notes", "nokiaRing", "নিজের বানানো রিংটোন",
        ["🎵 28 30 1.1 float", "🖼️ 72 32 1.1 wobble", "📱 50 62 2.2 bob"]],
    T07: ["desk", "", "bluetooth", "Bluetooth অন কর, গানটা দে!",
        ["📱 26 56 1.8 bob", "📱 74 56 1.8 bob", "🎵 50 48 .9 transfer", "🔵 50 26 1 pulse"]],

    /* ---------- স্কুল ---------- */
    S01: ["classroom", "", "tiffinOpen", "কার টিফিন কে খেলো?",
        ["🍱 44 64 2.1 shake", "🫳 62 34 1.3 steal", "🥚 26 68 .9 bounce", "😋 80 52 1.2 bob"]],
    S02: ["desk", "", "pencilDrop", "ধার নেওয়া রাবার আর ফেরত আসেনি",
        ["📐 28 54 1.6 wobble", "✏️ 54 48 1.4 spin", "🖊️ 74 60 1.3 bob", "📏 46 80 1.8 still"]],
    S03: ["schoolyard", "confetti", "cheer", "বার্ষিক ক্রীড়া প্রতিযোগিতা",
        ["🏅 50 36 1.8 swing", "🏃 30 74 1.4 run", "🎤 76 62 1.2 bob"]],
    S04: ["desk", "", "pencil", "হাতের লেখা সুন্দর করো!",
        ["✍️ 46 54 1.9 write", "📓 58 74 2 still", "⭐ 78 28 1 sparkle"]],
    S05: ["desk", "", "pencil", "কালি লেগে আঙুল নীল",
        ["🖋️ 46 48 1.9 write", "💧 62 66 .9 drop", "📄 50 78 1.8 still"]],
    S06: ["library", "dust", "pageFlip", "লাইব্রেরির গল্পের বই",
        ["📚 26 62 1.9 still", "📖 54 52 1.7 float", "🦉 78 32 1.1 blink", "🔍 74 74 1 wobble"]],
    S07: ["classroom", "", "paper", "দেয়াল পত্রিকায় আমার লেখা",
        ["📰 50 44 2.1 sway", "🎨 24 68 1.2 bob", "🖍️ 74 70 1.1 wobble", "📌 50 22 .8 drop"]],

    /* ---------- খেলাধুলা ---------- */
    G01: ["field-evening", "dust", "kidsPlay", "বিকেলের দৌড়ঝাঁপ",
        ["🏃 18 72 1.5 run", "🏃‍♀️ 40 76 1.3 run", "⚽ 70 84 .9 roll", "🌳 86 52 2.3 sway"]],
    G02: ["field", "", "kidsPlay", "কানামাছি ভোঁ ভোঁ…",
        ["🙈 30 62 1.6 bob", "🏃 62 72 1.4 run", "🌳 84 50 2.2 sway", "🧒 14 76 1.2 bounce"]],
    G03: ["ground", "", "marbles", "মার্বেলের টকাস!",
        ["🔮 30 76 .9 roll", "🔵 46 80 .7 roll", "🪀 64 58 1.4 spin", "🏏 82 56 1.3 wobble"]],
    G04: ["field", "wind", "wind", "ঘুড়ি কাটাকাটি!",
        ["🪁 58 28 2.1 kite", "🧒 28 78 1.4 bob", "☁️ 82 18 1.3 drift"]],
    G05: ["field", "", "batHit", "পাড়ার ক্রিকেট ম্যাচ",
        ["🏏 34 62 1.7 swing", "⚾ 66 50 .8 fly", "🧒 52 74 1.3 run", "🏸 80 30 1 spin"]],
    G06: ["village-road", "dust", "bikeBell", "সাইকেল রেস!",
        ["🚲 26 72 1.9 ride", "🚴 54 74 1.6 ride", "🔔 78 36 .9 ring"]],
    G07: ["gaming-box", "glow", "chiptune", "Mostofa খেলতে ১০ টাকা!",
        ["🕹️ 34 68 1.5 shake", "🖥️ 56 46 2.2 pulse", "👊 76 38 1.1 bounce", "💰 84 74 1 spin"]],

    /* ---------- খাবার ---------- */
    F01: ["shop", "", "crunch", "চানাচুর-আচারের ঠোঙা",
        ["🥜 28 62 1.2 bounce", "🌶️ 52 54 1.1 wobble", "🫙 74 58 1.7 float", "📰 46 80 1.5 still"]],
    F02: ["winter", "steam mist", "sizzle", "শীতের সকালে ভাপা পিঠা",
        ["🥮 46 58 1.9 float", "🔥 24 76 1.3 flicker glowy", "🍯 72 66 1.2 bob"]],
    F03: ["village", "", "crunch", "লবণ-মরিচ মাখা কাঁচা আম",
        ["🥭 46 56 1.9 wobble", "🧂 68 62 1.1 shake", "🌶️ 28 62 1.1 bob", "😖 78 32 1 pulse"]],
    F04: ["street", "", "hawkerBell", "রঙিন বরফের ললি",
        ["🍦 40 44 1.6 float", "🧊 60 54 1.2 bob", "🔔 22 32 1 ring", "🛒 74 74 1.6 walk"]],
    F05: ["street-evening", "steam", "sizzle", "স্কুল ছুটির পর ফুচকা",
        ["🥟 40 56 1.5 bounce", "🌶️ 60 50 1 wobble", "🧑‍🍳 78 64 1.5 bob", "🔥 22 72 1 flicker glowy"]],
    F06: ["kitchen", "", "jarOpen", "কৌটায় লুকানো নাড়ু",
        ["🍡 46 54 1.6 bob", "🍬 66 60 1.2 spin", "🫙 28 62 1.5 still", "👵 82 70 1.4 bob"]],
    F07: ["kitchen", "steam", "sizzle", "আম্মুর হাতের নাশতা",
        ["🍳 46 58 1.9 shake", "🫖 72 56 1.4 bob", "🧒 22 74 1.2 bounce"]],

    /* ---------- গ্রাম ও প্রকৃতি ---------- */
    V01: ["mud", "", "splash", "কাদাপানিতে মাছ ধরা",
        ["🐟 40 70 1.1 jump", "🥅 62 62 1.6 sway", "🧒 82 52 1.4 bob", "🪣 18 76 1 wobble"]],
    V02: ["rain", "rain", "rain", "বৃষ্টিতে কাগজের নৌকা",
        ["🧒 46 64 1.8 bounce", "☔ 72 38 1.6 sway", "⛵ 24 82 1 float"]],
    V03: ["village", "", "leaves", "গাছের মগডালে",
        ["🌳 50 46 3.2 sway", "🧒 52 36 1.1 bob", "🥭 34 34 .9 drop", "🍐 66 30 .9 swing"]],
    V04: ["pond", "waves", "splash", "পুকুরে ঝাঁপ!",
        ["🏊 46 66 1.8 swim", "🌿 82 44 1.6 sway", "🦆 22 58 1.2 swim"]],
    V05: ["village-night", "fireflies stars", "crickets", "বোতলে জোনাকি",
        ["🫙 50 70 1.6 glowjar", "🧒 28 74 1.3 bob", "🌳 82 50 2.2 sway"]],
    V06: ["paddy", "", "birds", "ধানক্ষেতের আল ধরে",
        ["🌾 16 74 1.6 sway", "🌾 38 78 1.4 sway", "🧒 54 64 1.3 walk", "🌾 76 76 1.6 sway", "☀️ 82 20 1.3 pulse glowy"]],
    V07: ["village", "", "waterDrip", "নিজের লাগানো গাছ",
        ["🌱 40 72 1.6 grow", "🪣 60 54 1.4 pour", "🌻 78 62 1.6 sway", "🦋 26 34 1 fly"]],

    /* ---------- পরিবার ও উৎসব ---------- */
    FA01: ["festival-day", "confetti", "chime", "নতুন জামায় বেড়াতে যাওয়া",
        ["👨‍👩‍👧‍👦 48 64 2.1 bob", "🎁 76 74 1 bounce", "🌙 82 20 1 float glowy"]],
    FA02: ["room-night", "glow", "storyHum", "\"এক দেশে ছিল এক রাজা…\"",
        ["👵 38 60 2.2 bob", "🧒 70 72 1.4 bob", "🧚 74 30 1 float", "🏰 18 30 1.1 float"]],
    FA03: ["festival-day", "sparkle", "coins", "সালামি কত হলো?",
        ["💵 46 46 1.8 fly", "💸 66 38 1.3 float", "🧒 28 72 1.5 bounce", "🌙 82 20 1 float glowy"]],
    FA04: ["tv-room", "glow", "tvTheme", "সবাই মিলে নাটক দেখা",
        ["📺 50 46 2.3 pulse", "👨‍👩‍👧‍👦 50 80 2 bob", "🍿 82 70 1 bounce"]],
    FA05: ["village", "", "birds", "ছুটিতে নানুবাড়ি",
        ["🏡 54 54 2.3 still", "🧳 26 74 1.4 bob", "👵 76 68 1.4 wave", "🐄 88 82 1.1 bob"]],
    FA06: ["festival-night", "lights notes", "festiveDrum", "গায়ে হলুদের আনন্দ",
        ["💛 50 38 1.4 pulse", "💃 34 68 1.7 dance", "🪔 70 66 1.2 flicker glowy"]],
    FA07: ["kitchen", "steam", "sizzle", "সবাই মিলে পিঠা বানানো",
        ["🥮 44 60 1.6 bob", "👩‍🍳 70 58 1.9 bob", "🔥 26 76 1.2 flicker glowy"]],

    /* ---------- পোশাক ও জীবনযাপন ---------- */
    L01: ["almirah", "sparkle", "almirah", "নতুন জামাটা আবার দেখি",
        ["👗 42 52 2.1 swing", "👕 64 50 1.7 swing", "👟 28 82 1 bounce"]],
    L02: ["room-day", "", "paper", "কাগজ-কাঠি দিয়ে খেলনা",
        ["🧸 28 62 1.6 wobble", "✂️ 54 54 1.2 snip", "⛵ 72 72 1.2 bob", "🪁 50 28 1.1 float"]],
    L03: ["desk", "", "coins", "জমানো কয়েনের কৌটা",
        ["🪙 34 54 1.4 spin", "🏷️ 60 48 1.3 wobble", "💴 72 70 1.2 float", "🗃️ 40 80 1.6 still"]],
    L04: ["room-day", "", "paper", "নতুন ব্যাগের গন্ধ",
        ["🎒 46 58 2.1 bounce", "👟 72 74 1.2 bob", "👔 24 44 1.4 swing"]],
    L05: ["almirah", "sparkle", "sparkle", "জামার সাথে মিলিয়ে জুতা",
        ["👡 34 74 1.3 bounce", "👗 56 48 1.9 swing", "📿 76 54 1.1 swing"]],
    L06: ["room-day", "", "jarOpen", "গোপন বাক্সের গুপ্তধন",
        ["📦 50 66 2.1 wobble", "🧸 36 40 1.1 peek", "🪀 64 42 1 peek"]],
    L07: ["room-day", "", "whoosh", "ভাইয়ার জামা এখন আমার",
        ["👕 34 46 1.6 swapL", "👖 66 46 1.6 swapR", "🧒 18 76 1.2 bob", "🧒 82 76 1.2 bob"]],

    /* ---------- শহর ও যাতায়াত ---------- */
    C01: ["bus-window", "", "busEngine", "জানালার পাশের সিটটা আমার!",
        ["🌳 20 56 1.8 pass", "🏠 60 60 1.4 pass", "🌴 90 54 1.8 pass", "☁️ 34 18 1 drift"]],
    C02: ["river", "waves", "waterLap", "নৌকায় নদী পার",
        ["🚣 44 62 2 bob", "🛳️ 80 54 1.5 drift", "🐦 28 24 .9 fly"]],
    C03: ["rail", "", "train", "রেলগেট নামছে…",
        ["🚂 82 60 2.1 approach", "🚧 30 64 1.4 wobble", "🧒 16 78 1.2 bob"]],
    C04: ["street", "", "busEngine", "\"ভাড়া দেন, ভাড়া!\"",
        ["🚌 50 58 2.5 bump", "🎟️ 22 32 1.1 wobble", "🪙 78 36 1 spin"]],
    C05: ["street", "", "rickshawBell", "ক্রিং ক্রিং!",
        ["🛺 40 66 2.3 bump", "🔔 66 36 1 ring", "🌸 80 64 1.1 wobble"]],
    C06: ["train-window", "", "train", "ঝিক ঝিক ট্রেন",
        ["🌳 18 58 1.8 pass", "🏠 58 62 1.3 pass", "🐄 86 70 1.1 pass", "🚂 50 26 1 still"]],
    C07: ["river", "waves", "ferryHorn", "ফেরির অপেক্ষা",
        ["⛴️ 50 60 2.5 bob", "🚗 40 50 .9 bob", "🐦 24 24 .9 fly"]],

    /* ---------- ইন্টারনেট ও কম্পিউটার ---------- */
    I01: ["computer", "", "xpChime", "Minesweeper-এ একটা ভুল ক্লিক…",
        ["💣 40 50 1.6 shake", "🚩 60 48 1.3 wobble", "🃏 76 62 1.2 spin", "🖱️ 24 72 1 bob"]],
    I02: ["cyber-cafe", "glow", "dialup", "ঘণ্টায় ২০ টাকা!",
        ["🖥️ 50 50 2.3 pulse", "🎧 24 62 1.2 bob", "⏳ 78 34 1 spin", "💵 76 76 1 bounce"]],
    I03: ["desk", "", "chiptune", "Java game লোড হচ্ছে…",
        ["📱 50 56 2.4 bob", "🎮 26 32 1.1 pulse", "🏎️ 74 36 1 drive"]],
    I04: ["computer", "", "discSpin", "CD ঢোকাও, Autorun!",
        ["💿 40 50 1.8 spin", "🖱️ 70 66 1 bob", "🎮 24 72 1 bob"]],
    I05: ["computer", "", "pencil", "MS Paint-এ নিজের নাম",
        ["🎨 34 56 1.6 bob", "🖌️ 58 44 1.3 write", "🌈 72 30 1.2 pulse"]],
    I06: ["shop", "", "typing", "কম্পোজের দোকানে প্রিন্ট",
        ["⌨️ 42 70 2 type", "🖨️ 74 56 1.6 bob", "📄 74 34 1 rise"]],
    I07: ["computer", "", "buzz", "BUZZ!!!",
        ["💬 34 40 1.4 pulse", "😀 60 34 1.1 bounce", "👋 72 62 1.2 wave"]],

    /* ---------- পাড়ার স্মৃতি ---------- */
    SP01: ["street-evening", "", "hawkerBell", "আইসক্রিমওয়ালা এসেছে!",
        ["🔔 28 38 1 ring", "🛒 54 68 2 walk", "🍦 72 38 1.2 float", "🧒 86 74 1.3 bounce"]],
    SP02: ["dusk", "", "duskBirds", "সন্ধ্যার আগে বাসায় ফেরা…",
        ["🏃 40 74 1.5 run", "🏠 80 58 1.8 still", "🐦 30 26 .9 fly", "👩 18 64 1.4 shake"]],
    SP03: ["desk", "", "paper", "\"প্রিয় …, আশা করি ভালো আছো\"",
        ["✉️ 44 52 1.9 float", "📮 74 56 1.6 still", "✒️ 26 64 1.2 write", "💌 60 26 1 fly"]],
    SP04: ["street", "", "micAnnounce", "\"আগামী শুক্রবার…\" মাইকিং!",
        ["📢 50 38 2 shake", "🛺 28 70 1.8 bump", "📃 74 64 1.1 fly"]],
    SP05: ["village", "", "knock", "\"এই, খেলবি?\"",
        ["🚪 50 54 2.3 knock", "🧒 24 72 1.4 bounce", "🧒 78 72 1.4 bounce", "🏏 64 32 1 wobble"]],
    SP06: ["fair", "bunting", "festiveDrum", "বৈশাখী মেলা",
        ["🎡 72 46 2.3 spin", "🎠 30 64 1.6 bob", "🎈 50 28 1.1 float", "🍭 18 36 1 wobble"]],
    SP07: ["village", "", "leaves", "আমাদের গোপন আড্ডা",
        ["🌳 54 44 2.9 sway", "🧒 40 76 1.2 bob", "🧒 62 78 1.2 bob", "🤫 80 54 1 pulse"]]
};
