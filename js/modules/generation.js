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

    function describe(birthYear) {
        if (!birthYear) return null;
        const key = mainEra(birthYear);
        return Object.assign({ key, decades: childhoodDecades(birthYear) }, ERA_INFO[key]);
    }

    return { describe, childhoodDecades, mainEra, ERA_INFO };

})();
