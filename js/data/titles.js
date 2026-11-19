/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   TITLES — by Childhood Memories Score
========================================== */

window.GCP = window.GCP || {};

GCP.TITLES = [
    { min: 90, title: "শৈশবের কিংবদন্তি", english: "Childhood Legend", line: "তোমার শৈশব একটা আস্ত গল্পের বই।" },
    { min: 75, title: "সোনালি স্মৃতির রক্ষক", english: "Golden Memory Keeper", line: "যা হারিয়ে গেছে, তার অনেকটাই তুমি মনে রেখেছ।" },
    { min: 60, title: "পাড়ার পরিচিত মুখ", english: "Neighbourhood Star", line: "মাঠ, স্কুল, পাড়া — সবখানেই তোমার চিহ্ন আছে।" },
    { min: 40, title: "কৌতূহলী অভিযাত্রী", english: "Curious Explorer", line: "অনেক কিছু দেখেছ, আরও অনেক কিছু শুনেছ।" },
    { min: 20, title: "শান্ত স্বপ্নবাজ", english: "Quiet Dreamer", line: "তোমার শৈশব ছিল নিজের মতো, নিজের ছন্দে।" },
    { min: 0,  title: "নতুন যুগের যাত্রী", english: "New-Age Traveller", line: "তোমার শৈশবের গল্পগুলো একদম অন্যরকম।" }
];

GCP.titleFor = function (score) {
    return GCP.TITLES.find((item) => score >= item.min) || GCP.TITLES[GCP.TITLES.length - 1];
};
