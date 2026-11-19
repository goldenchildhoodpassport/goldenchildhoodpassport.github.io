# golden-childhood-passport
A nostalgic childhood experience quiz and digital passport.
**Every childhood has a story.**

## চালানোর নিয়ম
Static site, কোনো build step লাগে না। VS Code-এ **Live Server** দিয়ে `index.html` খোলো।
(সরাসরি file:// দিয়ে খুললে `js/app.js` module লোড হবে না।)

## User journey
| Chapter | Page | কী হয় |
|---|---|---|
| 00 | `index.html` | Welcome + দরজা খোলার animation |
| 01 | `index.html` (profile screen) | এক এক প্রশ্নে "পাসপোর্টের আবেদনপত্র": ডাকনাম, জন্মসাল, এলাকা, পরিবেশ |
| 02 | `quiz.html` | **শৈশবের একটা দিন**: সকাল থেকে রাত পর্যন্ত ১২টা জায়গা, প্রতি জায়গায় ৩টা core স্মৃতি + ৪টা optional "আরও গভীরে" |
| 03 | `passport.html` | ছবি → বন্ধ পাসপোর্ট খোলা → stamp → scratch card-এ score → download/share → বিস্তারিত প্রোফাইল |

## Folder structure
```
index.html, quiz.html, passport.html
css/
  journey.css       ← quiz page (day cycle, map, 12 card themes, entry scenes)
  application.css   ← chapter 01 আবেদনপত্র
  passport.css      ← chapter 03
  (variables, main, layout, components, profile, quiz, responsive → welcome page)
js/
  app.js                    ← welcome page animation
  data/
    questions.js            ← ৮৪টা প্রশ্ন
    categories.js
    journey.js              ← দিনের ক্রম, theme, sound, core প্রশ্ন, era map, sticker, আম্মুর ডাক
    badges.js, titles.js
  modules/
    application.js          ← chapter 01
    quiz.js                 ← chapter 02 engine
    sound.js                ← Web Audio দিয়ে বানানো সব শব্দ (কোনো audio file নেই)
    storage.js, generation.js, scoring.js, badge-engine.js
    photo-upload.js, report.js (share link + image), passport.js
  utils/helpers.js
```

## Scoring (Childhood Memories Score)
Era-aware: user-এর শৈশবের দশকের (৫–১৪ বছর বয়স) বাইরের প্রশ্নগুলো মোট নম্বরের হিসাবে ধরা হয় না, কিন্তু উত্তর দিলে bonus হিসেবে যোগ হয় (সর্বোচ্চ ১০০)। কোন প্রশ্ন কোন দশকের, সেটা `js/data/journey.js` → `GCP.QUESTION_ERAS`-এ আছে।

## Data
সব কিছু `localStorage`-এ থাকে: `gcp_user_profile`, `gcp_journey_v2`, `gcp_passport_photo`, `gcp_settings`।
Share link-এ (`passport.html#p=...`) শুধু summary থাকে, ছবি কখনো link-এ যায় না।
