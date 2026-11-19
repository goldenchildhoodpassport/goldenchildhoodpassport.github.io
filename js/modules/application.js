/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   CHAPTER 01 — PASSPORT APPLICATION
   ------------------------------------------
   Instead of a form, the user answers one
   question at a time. Each answer is
   "handwritten" onto the application paper.
   At the end the form gets an
   "অনুমোদিত" stamp and the day begins.
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("appAsk");
    if (!form) return;

    const { toBangla, wait } = GCP.helpers;
    const $ = (id) => document.getElementById(id);

    const el = {
        question: $("appQuestion"), helper: $("appHelper"), input: $("appInput"),
        choices: $("appChoices"), reaction: $("appReaction"), error: $("appError"),
        back: $("appBack"), skip: $("appSkip"), next: $("appNext"),
        progress: $("appProgress"), approved: $("appApproved")
    };

    const thisYear = new Date().getFullYear();

    const SETTINGS = [
        { value: "Village", icon: "🌾", label: "গ্রামে", small: "উঠান, পুকুর, খোলা মাঠ" },
        { value: "Town", icon: "🏘️", label: "মফস্বলে", small: "ছোট শহর, চেনা পাড়া" },
        { value: "City", icon: "🏙️", label: "শহরে", small: "রিকশা, ছাদ, গলি" },
        { value: "Both", icon: "🔁", label: "দুটোতেই", small: "ছুটিতে গ্রামে যেতাম" }
    ];
    const SETTING_LABEL = Object.fromEntries(SETTINGS.map((s) => [s.value, s.label.replace(/ে$/, "")]));

    const STEPS = [
        {
            key: "nickname",
            question: "ছোটবেলায় সবাই তোমাকে কী নামে ডাকত?",
            helper: "ডাকনামটাই লেখো — পাসপোর্টে আর পুরো যাত্রায় এই নামেই ডাকা হবে।",
            type: "text", placeholder: "যেমন: টুটুল, মিতু, বাবু…", max: 30,
            validate: (v) => (v.trim().length >= 1 ? "" : "একটা নাম তো লাগবেই!"),
            react: (v) => `আচ্ছা ${v.trim()}, চলো পরেরটা।`
        },
        {
            key: "birthYear",
            question: "কোন সালে জন্ম?",
            helper: "শুধু সালটা দাও। এটা দিয়ে বোঝা যাবে তোমার শৈশব কোন যুগের।",
            type: "year", placeholder: "যেমন: ১৯৯৮",
            validate: (v) => {
                const year = parseYear(v);
                if (!year) return "সালটা চার অঙ্কে লেখো, যেমন ১৯৯৮।";
                if (year < 1940 || year > thisYear - 4) return "সালটা একটু মিলিয়ে দেখো তো।";
                return "";
            },
            react: (v) => {
                const era = GCP.generation.describe(parseYear(v));
                return era ? `ও! ${era.line}` : "";
            }
        },
        {
            key: "childhoodLocation",
            question: "শৈশব কোথায় কেটেছে?",
            helper: "জেলা, শহর বা গ্রামের নাম। না দিতে চাইলে এড়িয়ে যাও।",
            type: "text", placeholder: "যেমন: কুমিল্লা, রংপুর, পুরান ঢাকা…", max: 60, optional: true,
            validate: () => "",
            react: (v) => (v.trim() ? `${v.trim()}! সেখানকার গলিগুলো নিশ্চয়ই এখনো মনে আছে।` : "")
        },
        {
            key: "childhoodSetting",
            question: "কেমন পরিবেশে বড় হয়েছ?",
            helper: "যেটা সবচেয়ে কাছের মনে হয়।",
            type: "choice",
            validate: (v) => (v ? "" : "যেকোনো একটা বেছে নাও।"),
            react: () => ""
        }
    ];

    const saved = GCP.storage.getProfile() || {};
    const data = {
        nickname: saved.nickname || saved.name || "",
        birthYear: saved.birthYear || (saved.dateOfBirth ? Number(saved.dateOfBirth.slice(0, 4)) : ""),
        childhoodLocation: saved.childhoodLocation || "",
        childhoodSetting: saved.childhoodSetting || ""
    };

    let current = 0;

    function parseYear(value) {
        const ascii = String(value).replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));
        const year = parseInt(ascii, 10);
        return Number.isFinite(year) && String(year).length === 4 ? year : null;
    }

    function displayValue(key) {
        const value = data[key];
        if (!value) return "";
        if (key === "birthYear") return toBangla(value);
        if (key === "childhoodSetting") return SETTING_LABEL[value] || value;
        return value;
    }

    function fillPaper() {
        document.querySelectorAll("[data-fill]").forEach((line) => {
            const text = displayValue(line.dataset.fill);
            if (line.textContent !== text) {
                line.textContent = text;
                line.classList.remove("written");
                void line.offsetWidth;
                if (text) line.classList.add("written");
            }
        });
    }

    function renderChoices(step) {
        el.choices.innerHTML = SETTINGS.map((s) => `
            <button type="button" class="app-choice" role="radio" data-value="${s.value}"
                    aria-checked="${data[step.key] === s.value}">
                <span class="app-choice-icon">${s.icon}</span>
                <strong>${s.label}</strong>
                <small>${s.small}</small>
            </button>`).join("");
    }

    function render() {
        const step = STEPS[current];
        el.question.textContent = step.question;
        el.helper.textContent = step.helper;
        el.error.textContent = "";
        el.reaction.textContent = "";
        el.back.style.visibility = current === 0 ? "hidden" : "visible";
        el.skip.hidden = !step.optional;
        el.next.textContent = current === STEPS.length - 1 ? "আবেদন জমা দাও ✦" : "পরেরটা →";

        [...el.progress.children].forEach((dot, i) => {
            dot.classList.toggle("done", i < current);
            dot.classList.toggle("now", i === current);
        });

        const isChoice = step.type === "choice";
        el.input.hidden = isChoice;
        el.choices.hidden = !isChoice;

        if (isChoice) {
            renderChoices(step);
        } else {
            el.input.type = "text";
            el.input.inputMode = step.type === "year" ? "numeric" : "text";
            el.input.maxLength = step.type === "year" ? 4 : step.max;
            el.input.placeholder = step.placeholder;
            el.input.value = step.type === "year" && data[step.key] ? toBangla(data[step.key]) : data[step.key];
            setTimeout(() => el.input.focus({ preventScroll: true }), 120);
        }

        form.classList.remove("ask-in");
        void form.offsetWidth;
        form.classList.add("ask-in");
    }

    el.input.addEventListener("input", () => {
        const step = STEPS[current];
        el.error.textContent = "";
        if (step.type === "year") {
            const year = parseYear(el.input.value);
            data.birthYear = year || "";
            el.reaction.textContent = year && !step.validate(el.input.value) ? step.react(el.input.value) : "";
        } else {
            data[step.key] = el.input.value.slice(0, step.max);
        }
        fillPaper();
    });

    el.choices.addEventListener("click", (event) => {
        const button = event.target.closest(".app-choice");
        if (!button) return;
        data.childhoodSetting = button.dataset.value;
        el.choices.querySelectorAll(".app-choice").forEach((b) => b.setAttribute("aria-checked", String(b === button)));
        el.error.textContent = "";
        fillPaper();
    });

    async function advance() {
        const step = STEPS[current];
        const value = step.type === "choice" ? data[step.key] : el.input.value;
        const problem = step.validate(value || "");
        if (problem) {
            el.error.textContent = problem;
            form.classList.remove("shake");
            void form.offsetWidth;
            form.classList.add("shake");
            return;
        }

        const reaction = step.react(value || "");
        if (reaction && step.type !== "year") {
            el.reaction.textContent = reaction;
            el.next.disabled = true;
            await wait(900);
            el.next.disabled = false;
        } else if (step.type === "year") {
            await wait(reaction ? 700 : 0);
        }

        if (current < STEPS.length - 1) {
            current++;
            render();
        } else {
            submit();
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!el.next.disabled) advance();
    });

    el.back.addEventListener("click", () => {
        if (current > 0) { current--; render(); }
    });

    el.skip.addEventListener("click", () => {
        data[STEPS[current].key] = "";
        fillPaper();
        current++;
        render();
    });

    async function submit() {
        const profile = {
            nickname: data.nickname.trim(),
            name: data.nickname.trim(),
            birthYear: data.birthYear,
            dateOfBirth: `${data.birthYear}-01-01`,
            childhoodLocation: data.childhoodLocation.trim(),
            childhoodSetting: data.childhoodSetting,
            createdAt: saved.createdAt || new Date().toISOString()
        };

        if (!GCP.storage.saveProfile(profile)) {
            el.error.textContent = "ব্রাউজারে তথ্য সেভ করা যাচ্ছে না। Private/Incognito mode বন্ধ করে চেষ্টা করো।";
            return;
        }

        el.next.disabled = true;
        el.back.disabled = true;
        el.question.textContent = `আবেদন অনুমোদিত, ${profile.nickname}!`;
        el.helper.textContent = "তোমার শৈশবের দিনটা শুরু হচ্ছে…";
        el.input.hidden = true;
        el.choices.hidden = true;
        el.reaction.textContent = "";
        el.approved.classList.add("stamped");

        await wait(1600);
        window.location.href = "./quiz.html";
    }

    fillPaper();
    render();
});
