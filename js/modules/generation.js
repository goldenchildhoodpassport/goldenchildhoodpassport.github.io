/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   GENERATION — which childhood era?
   Childhood = age 5 to 14
========================================== */

window.GCP = window.GCP || {};

GCP.generation = (function () {

    const ERA_INFO = {
        "80": { label: "৮০-এর শিশু", english: "80s Kid", line: "BTV, রেডিও আর হারিকেনের যুগ!" },
        "90": { label: "৯০-এর শিশু", english: "90s Kid", line: "আলিফ লায়লা, ক্যাসেট আর লোডশেডিংয়ের যুগ!" },
        "00": { label: "২০০০-এর শিশু", english: "2000s Kid", line: "Nokia, Bhoot FM আর সাইবার ক্যাফের যুগ!" },
        "10": { label: "২০১০-এর শিশু", english: "2010s Kid", line: "YouTube, মোবাইল গেম আর স্মার্টফোনের যুগ!" },
        "20": { label: "নতুন যুগের শিশু", english: "Gen Alpha", line: "Tab, কার্টুন অ্যাপ আর অনলাইন ক্লাসের যুগ!" }
    };

    const ORDER = ["80", "90", "00", "10", "20"];

    function decadeKey(year) {
        if (year < 1990) return "80";
        if (year < 2000) return "90";
        if (year < 2010) return "00";
        if (year < 2020) return "10";
        return "20";
    }

    /* every decade the user's childhood touched */
    function childhoodDecades(birthYear) {
        const from = birthYear + 5;
        const to = birthYear + 14;
        const set = new Set();
        for (let year = from; year <= to; year++) set.add(decadeKey(year));
        return ORDER.filter((key) => set.has(key));
    }

    /* people say "90s kid" by the decade they were born in */
    function mainEra(birthYear) {
        return decadeKey(birthYear);
    }

    /* what childhood looked like in each decade */
    const ERA_ITEMS = {
        "80": ["সাদা-কালো টিভি", "রেডিওর নাটক", "হারিকেন", "হাতে লেখা চিঠি"],
        "90": ["আলিফ লায়লা", "ক্যাসেট", "লোডশেডিং", "ঈদ কার্ড"],
        "00": ["Nokia 1100", "সাইবার ক্যাফে", "VCD", "Flexiload"],
        "10": ["Bhoot FM", "Gaming Box", "প্রথম Facebook", "Java game"],
        "20": ["YouTube কার্টুন", "স্মার্টফোন", "Free Fire", "অনলাইন ক্লাস"]
    };

    function joinBangla(list) {
        if (list.length <= 1) return list.join("");
        return list.slice(0, -1).join(", ") + " আর " + list[list.length - 1];
    }

    /* the line is built from the years the person was actually 5–14,
       so someone born in 1999 hears about Nokia and Bhoot FM,
       not only আলিফ লায়লা */
    function childhoodLine(birthYear) {
        const from = birthYear + 5;
        const to = birthYear + 14;
        const counts = {};
        for (let y = from; y <= to; y++) {
            const k = decadeKey(y);
            counts[k] = (counts[k] || 0) + 1;
        }
        const ranked = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        let items = ERA_ITEMS[ranked[0]].slice(0, ranked[1] && counts[ranked[1]] >= 3 ? 2 : 3);
        if (ranked[1] && counts[ranked[1]] >= 3) items = items.concat(ERA_ITEMS[ranked[1]].slice(0, 2));
        else if (ranked[1]) items = items.concat(ERA_ITEMS[ranked[1]].slice(0, 1));
        const range = `${toBn(from)}–${toBn(to)}`;
        return {
            from, to, range,
            line: `তোমার শৈশব কেটেছে ${range} সালে — ${joinBangla(items)}, সেই দিনগুলো!`
        };
    }

    function toBn(n) {
        return String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
    }

    function describe(birthYear) {
        if (!birthYear) return null;
        const key = mainEra(birthYear);
        const child = childhoodLine(birthYear);
        return Object.assign({ key, decades: childhoodDecades(birthYear) }, ERA_INFO[key], child);
    }

    return { describe, childhoodDecades, mainEra, ERA_INFO };

})();
