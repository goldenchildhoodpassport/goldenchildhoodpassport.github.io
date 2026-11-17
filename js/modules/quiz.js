
/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   QUIZ ENGINE — VERSION 3.1
   8 QUESTIONS PER PAGE
   COMPACT CARDS + PAGE TRANSITIONS
   HYBRID ANSWER SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. QUESTION BANK & CONFIGURATION
    // ======================================

    const questions = window.GCP_QUESTIONS || [];

    const STORAGE_KEY = "gcp_quiz_answers";
    const QUESTIONS_PER_PAGE = 8;
    const TRANSITION_DURATION = 380;

    const categoryNames = {
        "electricity-nightlife": "Electricity & Night Life",
        "music-entertainment": "Music & Entertainment",
        "communication-technology": "Communication & Technology",
        "school-life": "School Life",
        "games-sports": "Games & Sports",
        "food-tiffin": "Food & Tiffin",
        "village-nature": "Village & Nature",
        "family-festivals": "Family & Festivals",
        "fashion-lifestyle": "Fashion & Lifestyle",
        "city-transport": "City & Transport",
        "internet-digital-life": "Internet & Digital Life",
        "special-memories": "Special Memories & Neighbourhood"
    };

    const categoryVisuals = {

        "electricity-nightlife":
            "assets/images/quiz-categories/electricity-nightlife.webp",

        "music-entertainment":
            "assets/images/quiz-categories/music-entertainment.webp",

        "communication-technology":
            "assets/images/quiz-categories/communication-technology.webp",

        "school-life":
            "assets/images/quiz-categories/school-life.webp",

        "games-sports":
            "assets/images/quiz-categories/games-sports.webp",

        "food-tiffin":
            "assets/images/quiz-categories/food-tiffin.webp",

        "village-nature":
            "assets/images/quiz-categories/village-nature.webp",

        "family-festivals":
            "assets/images/quiz-categories/family-festivals.webp",

        "fashion-lifestyle":
            "assets/images/quiz-categories/fashion-lifestyle.webp",

        "city-transport":
            "assets/images/quiz-categories/city-transport.webp",

        "internet-digital-life":
            "assets/images/quiz-categories/internet-digital-life.webp",

        "special-memories":
            "assets/images/quiz-categories/special-memories.webp"

    };

    const DEFAULT_VISUAL =
        "assets/images/backgrounds/quiz-scrapbook.png";

    const openMemoryBookButton =
        document.getElementById("openMemoryBookButton");


    // ======================================
    // 2. HYBRID ANSWER CONFIGURATION
    // ======================================

    const multipleQuestionConfig = {

        M01: {
            question: "BTV-তে কোন কোন অনুষ্ঠান দেখেছ?",
            options: [
                { value: "alif-laila", label: "আলিফ লায়লা" },
                { value: "sindbad", label: "সিন্দবাদ" },
                { value: "makorsha", label: "মাকড়সা মন্সা" },
                { value: "other-btv", label: "BTV-এর অন্য অনুষ্ঠান" },
                {
                    value: "seen",
                    label: "শুধু অন্যদের দেখতে দেখেছি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "none",
                    label: "কোনোটিই দেখিনি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "na",
                    label: "আমার শৈশবে এসব দেখার সুযোগ ছিল না",
                    exclusive: true,
                    score: null
                }
            ]
        },

        T01: {
            question: "ছোটবেলায় কোন কোন বাটন মোবাইল ব্যবহার করেছ?",
            options: [
                { value: "nokia-1100", label: "Nokia 1100" },
                { value: "nokia-1200", label: "Nokia 1200" },
                { value: "nokia-1600", label: "Nokia 1600" },
                { value: "other-button", label: "অন্য কোনো বাটন মোবাইল" },
                {
                    value: "seen",
                    label: "শুধু অন্যদের ব্যবহার করতে দেখেছি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "none",
                    label: "কোনোটিই ব্যবহার করিনি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "na",
                    label: "আমার শৈশবে এসব ফোনের প্রচলন ছিল না",
                    exclusive: true,
                    score: null
                }
            ]
        },

        G02: {
            question: "ছোটবেলায় কোন কোন দেশি খেলায় অংশ নিয়েছ?",
            options: [
                { value: "kanamachi", label: "কানামাছি" },
                { value: "gollachut", label: "গোল্লাছুট" },
                { value: "dariabandha", label: "দাঁড়িয়াবান্ধা" },
                { value: "lukochuri", label: "লুকোচুরি" },
                { value: "other-game", label: "অন্য কোনো দেশি খেলা" },
                {
                    value: "seen",
                    label: "শুধু অন্যদের খেলতে দেখেছি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "none",
                    label: "কোনোটিই খেলিনি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "na",
                    label: "আমার এলাকায় এসব খেলার সুযোগ ছিল না",
                    exclusive: true,
                    score: null
                }
            ]
        },

        G03: {
            question: "ছোটবেলায় কোন কোন খেলনা বা খেলার জিনিস দিয়ে খেলেছ?",
            options: [
                { value: "marble", label: "মার্বেল / গুলি" },
                { value: "latim", label: "লাটিম" },
                { value: "danguli", label: "ডাংগুলি" },
                { value: "other-toy", label: "অন্য কোনো ঐতিহ্যবাহী খেলনা" },
                {
                    value: "seen",
                    label: "শুধু অন্যদের খেলতে দেখেছি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "none",
                    label: "কোনোটিই খেলিনি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "na",
                    label: "আমার এলাকায় এসব খেলার সুযোগ ছিল না",
                    exclusive: true,
                    score: null
                }
            ]
        },

        G05: {
            question: "ছোটবেলায় বন্ধুদের সঙ্গে কোন কোন খেলায় অংশ নিয়েছ?",
            options: [
                { value: "cricket", label: "ক্রিকেট" },
                { value: "football", label: "ফুটবল" },
                { value: "badminton", label: "ব্যাডমিন্টন" },
                { value: "other-sport", label: "অন্য কোনো দলীয় খেলা" },
                {
                    value: "seen",
                    label: "শুধু অন্যদের খেলতে দেখেছি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "none",
                    label: "কোনোটিই খেলিনি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "na",
                    label: "আমার এলাকায় এসব খেলার সুযোগ ছিল না",
                    exclusive: true,
                    score: null
                }
            ]
        },

        F05: {
            question: "ছোটবেলায় কোন কোন রাস্তার খাবার খেয়েছ?",
            options: [
                { value: "fuchka", label: "ফুচকা" },
                { value: "chotpoti", label: "চটপটি" },
                { value: "jhalmuri", label: "ঝালমুড়ি" },
                { value: "other-street-food", label: "অন্য কোনো রাস্তার খাবার" },
                {
                    value: "seen",
                    label: "শুধু অন্যদের খেতে দেখেছি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "none",
                    label: "কোনোটিই খাইনি",
                    exclusive: true,
                    score: 0
                },
                {
                    value: "na",
                    label: "আমার এলাকায় এসব খাবার পাওয়ার সুযোগ ছিল না",
                    exclusive: true,
                    score: null
                }
            ]
        }

    };


    // ======================================
    // 3. INJECT QUIZ DESIGN + ANIMATIONS
    // ======================================

    function injectQuizStyles() {

        if (document.getElementById("gcp-quiz-v31-styles")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "gcp-quiz-v31-styles";

        style.textContent = `

            /* NORMAL QUESTION FONT SIZE */

            .quiz-question-item .quiz-question-title {
                font-size: 15px !important;
                font-weight: 600 !important;
                line-height: 1.5 !important;
                letter-spacing: 0 !important;
                margin: 0 0 7px !important;
            }

            .quiz-question-item .question-helper {
                font-size: 12px !important;
                line-height: 1.45 !important;
            }

            .quiz-question-item .question-number,
            .quiz-question-item .question-tag {
                font-size: 10px !important;
            }

            .quiz-question-item .answer-option {
                font-size: 13px !important;
            }

            .quiz-question-item .answer-label {
                font-size: 13px !important;
                line-height: 1.4 !important;
            }

            .quiz-question-item .personal-memory-box label {
                font-size: 12px !important;
            }

            .quiz-question-item .personal-memory-box textarea {
                font-size: 12px !important;
            }


            /* COMPACT QUESTION GRID */

            .quiz-page-questions {
                display: grid !important;
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 16px !important;
                align-items: stretch !important;
            }


            /* QUESTION CARD */

            .quiz-question-item {
                min-width: 0 !important;
                min-height: 0 !important;
                height: auto !important;
                padding: 15px !important;
                border-radius: 18px !important;
                overflow: hidden !important;

                background: rgba(255, 252, 243, 0.97) !important;
                border: 1px solid rgba(166, 129, 72, 0.25) !important;

                box-shadow:
                    0 5px 16px rgba(65, 43, 22, 0.07) !important;

                transition:
                    transform 0.3s ease,
                    box-shadow 0.3s ease,
                    border-color 0.3s ease !important;

                animation:
                    gcpQuestionEnter 0.5s cubic-bezier(.22,1,.36,1)
                    both;

                animation-delay:
                    calc(var(--gcp-card-index, 0) * 45ms);
            }

            .quiz-question-item:hover {
                transform: translateY(-4px) !important;

                border-color:
                    rgba(166, 129, 72, 0.55) !important;

                box-shadow:
                    0 12px 24px rgba(65, 43, 22, 0.12) !important;
            }


            /* QUESTION IMAGE + CONTENT */

            .quiz-question-content {
                display: flex !important;
                align-items: flex-start !important;
                gap: 12px !important;
            }

            .quiz-question-visual {
                flex: 0 0 88px !important;
                width: 88px !important;
                min-width: 88px !important;
            }

            .quiz-question-image {
                width: 88px !important;
                height: 88px !important;
                object-fit: cover !important;
                border-radius: 13px !important;
            }

            .quiz-question-details {
                flex: 1 !important;
                min-width: 0 !important;
            }

            .quiz-visual-caption {
                font-size: 8px !important;
                line-height: 1.3 !important;
                display: block !important;
                margin-top: 5px !important;
            }


            /* ANSWER SPACING */

            .quiz-question-item .answer-list {
                gap: 6px !important;
            }

            .quiz-question-item .answer-option {
                padding: 8px 10px !important;
                border-radius: 9px !important;
            }

            .quiz-question-item .personal-memory-box {
                margin-top: 12px !important;
            }

            .quiz-question-item .personal-memory-box textarea {
                min-height: 48px !important;
            }


            /* PAGE ENTER ANIMATION */

            @keyframes gcpPageEnter {
                from {
                    opacity: 0;
                    transform: translateY(22px) scale(.985);
                    filter: blur(3px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                }
            }


            /* PAGE EXIT ANIMATION */

            @keyframes gcpPageExit {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: blur(0);
                }

                to {
                    opacity: 0;
                    transform: translateY(-18px) scale(.97);
                    filter: blur(3px);
                }
            }


            /* QUESTION CARD ENTER */

            @keyframes gcpQuestionEnter {
                from {
                    opacity: 0;
                    transform: translateY(18px) scale(.97);
                }

                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }


            .quiz-page-content.quiz-page-entering {
                animation:
                    gcpPageEnter 0.55s cubic-bezier(.22,1,.36,1) both;
            }

            .quiz-page-content.quiz-page-leaving {
                animation:
                    gcpPageExit 0.32s ease-in both;
                pointer-events: none;
            }


            /* CATEGORY CHANGE */

            .quiz-page-hero.category-transition {
                animation:
                    gcpPageEnter 0.7s ease both;
            }


            /* NAVIGATION BUTTON FEEDBACK */

            .quiz-page-navigation button {
                transition:
                    transform .25s ease,
                    box-shadow .25s ease,
                    opacity .25s ease !important;
            }

            .quiz-page-navigation button:not(:disabled):hover {
                transform: translateY(-2px);
            }


            /* MOBILE */

            @media (max-width: 700px) {

                .quiz-page-questions {
                    grid-template-columns: 1fr !important;
                    gap: 12px !important;
                }

                .quiz-question-item {
                    padding: 13px !important;
                    border-radius: 15px !important;
                }

                .quiz-question-visual {
                    flex-basis: 76px !important;
                    width: 76px !important;
                    min-width: 76px !important;
                }

                .quiz-question-image {
                    width: 76px !important;
                    height: 76px !important;
                }

                .quiz-question-item .quiz-question-title {
                    font-size: 14px !important;
                }

            }


            /* ACCESSIBILITY */

            @media (prefers-reduced-motion: reduce) {

                .quiz-question-item,
                .quiz-page-content,
                .quiz-page-hero {
                    animation: none !important;
                    transition: none !important;
                }

            }

        `;

        document.head.appendChild(style);

    }

    injectQuizStyles();


    // ======================================
    // 4. HTML ELEMENT REFERENCES
    // ======================================

    const elements = {

        quizIntro: document.getElementById("quizIntro"),
        quizJourney: document.getElementById("quizJourney"),

        questionCounter: document.getElementById("questionCounter"),
        progressPercentage: document.getElementById("progressPercentage"),
        progressFill: document.getElementById("progressFill"),
        categoryName: document.getElementById("categoryName"),

        questionCard: document.getElementById("questionCard")

    };


    // ======================================
    // 5. VALIDATE HTML ELEMENTS
    // ======================================

    const missingElements = Object.entries(elements)
        .filter(([, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length) {

        console.error(
            "Quiz HTML elements missing:",
            missingElements
        );

        return;

    }

    if (!questions.length) {

        elements.questionCard.innerHTML = `
            <div class="quiz-error">
                <h2>Questions could not be loaded.</h2>
                <p>Please check your questions.js file.</p>
            </div>
        `;

        return;

    }


    // ======================================
    // 6. UTILITY HELPERS
    // ======================================

    function escapeHTML(value) {

        return String(value ?? "").replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );

    }

    function safeFileName(value) {

        return String(value || "memory").replace(
            /[^a-zA-Z0-9_-]/g,
            ""
        );

    }

    function getQuestionImage(question) {

        if (question.image) {
            return question.image;
        }

        const questionId = safeFileName(question.id);

        return `assets/images/quiz-questions/${questionId}.webp`;

    }

    function getCategoryImage(categoryId) {

        return categoryVisuals[categoryId] || DEFAULT_VISUAL;

    }

    function getQuestionTitle(question) {

        const multipleConfig =
            multipleQuestionConfig[question.id];

        return multipleConfig
            ? multipleConfig.question
            : question.question;

    }

    function getQuestionOptions(question) {

        const multipleConfig =
            multipleQuestionConfig[question.id];

        return multipleConfig
            ? multipleConfig.options
            : question.options || [];

    }

    function isMultipleQuestion(question) {

        return Boolean(
            multipleQuestionConfig[question.id]
        );

    }


    // ======================================
    // 7. LOAD SAVED ANSWERS
    // ======================================

    function loadAnswers() {

        try {

            const saved = localStorage.getItem(STORAGE_KEY);

            const parsed = saved
                ? JSON.parse(saved)
                : {};

            return parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed)
                    ? parsed
                    : {};

        } catch (error) {

            console.error(
                "Could not load saved answers:",
                error
            );

            return {};

        }

    }

    let answers = loadAnswers();

    let currentPage = 0;

    let lastRenderedCategory = null;

    let isPageTransitioning = false;


    // ======================================
    // 8. PAGE HELPERS
    // ======================================

    function getTotalPages() {

        return Math.ceil(
            questions.length / QUESTIONS_PER_PAGE
        );

    }

    function getPageStartIndex() {

        return currentPage * QUESTIONS_PER_PAGE;

    }

    function getCurrentPageQuestions() {

        const start = getPageStartIndex();

        return questions.slice(
            start,
            start + QUESTIONS_PER_PAGE
        );

    }

    function getCurrentPageCategory() {

        const pageQuestions = getCurrentPageQuestions();

        return pageQuestions[0]?.categoryId || "";

    }


    // ======================================
    // 9. ANSWER HELPERS
    // ======================================

    function getAnswer(questionId) {

        return answers[questionId] || null;

    }

    function isAnswered(questionId) {

        const answer = getAnswer(questionId);

        if (!answer) return false;

        if (Array.isArray(answer.value)) {
            return answer.value.length > 0;
        }

        return typeof answer.value === "string" &&
            answer.value.length > 0;

    }

    function getSelectedValues(questionId, isMultiple) {

        const answer = getAnswer(questionId);

        if (!answer) return [];

        if (isMultiple) {

            return Array.isArray(answer.value)
                ? answer.value
                : [];

        }

        return typeof answer.value === "string"
            ? [answer.value]
            : [];

    }

    function saveAnswers() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(answers)
            );

        } catch (error) {

            console.error(
                "Could not save quiz answers:",
                error
            );

            alert(
                "Your answers could not be saved. Please check browser storage."
            );

        }

    }

    function countAnsweredQuestions() {

        return questions.filter(question =>
            isAnswered(question.id)
        ).length;

    }

    function areCurrentPageQuestionsAnswered() {

        return getCurrentPageQuestions().every(question =>
            isAnswered(question.id)
        );

    }


    // ======================================
    // 10. PERSONAL MEMORY SAVING
    // ======================================

    function savePersonalMemory(questionId, value) {

        if (!questionId) return;

        if (!answers[questionId]) {

            answers[questionId] = {
                value: null,
                score: null,
                personalMemory: ""
            };

        }

        answers[questionId].personalMemory =
            String(value || "").trim();

        saveAnswers();

    }

    function saveVisibleMemories() {

        elements.questionCard
            .querySelectorAll("[data-memory-for]")
            .forEach(textarea => {

                savePersonalMemory(
                    textarea.dataset.memoryFor,
                    textarea.value
                );

            });

    }


    // ======================================
    // 11. UPDATE PROGRESS
    // ======================================

    function updateProgress() {

        const total = questions.length;

        const answered = countAnsweredQuestions();

        const percentage = total
            ? Math.round((answered / total) * 100)
            : 0;

        const start = getPageStartIndex() + 1;

        const end = Math.min(
            start + QUESTIONS_PER_PAGE - 1,
            total
        );

        elements.questionCounter.textContent =
            `QUESTIONS ${String(start).padStart(2, "0")}–${String(end).padStart(2, "0")} OF ${total}`;

        elements.progressPercentage.textContent =
            `${percentage}% COMPLETED`;

        elements.progressFill.style.width =
            `${percentage}%`;

        const pageQuestions = getCurrentPageQuestions();

        const pageCategories = [
            ...new Set(
                pageQuestions.map(question => question.categoryId)
            )
        ];

        elements.categoryName.textContent =
            pageCategories.length > 1
                ? "Mixed Childhood Memories"
                : categoryNames[pageCategories[0]] ||
                  "Childhood Memories";

    }


    // ======================================
    // 12. UPDATE PAGE NAVIGATION
    // ======================================

    function updatePageNavigation() {

        const previousButton =
            elements.questionCard.querySelector("#previousButton");

        const nextButton =
            elements.questionCard.querySelector("#nextButton");

        if (!previousButton || !nextButton) return;

        const lastPage =
            currentPage === getTotalPages() - 1;

        previousButton.disabled =
            currentPage === 0 || isPageTransitioning;

        nextButton.disabled =
            !areCurrentPageQuestionsAnswered() ||
            isPageTransitioning;

        nextButton.textContent =
            lastPage
                ? "Finish Quiz ✓"
                : "Next Page →";

    }


    // ======================================
    // 13. SELECT SINGLE / MULTIPLE ANSWER
    // ======================================

    function selectAnswer(questionId, option, isMultiple) {

        if (isPageTransitioning) return;

        const question = questions.find(item =>
            item.id === questionId
        );

        if (!question) return;

        const previousAnswer = getAnswer(questionId);

        if (isMultiple) {

            let selectedValues =
                Array.isArray(previousAnswer?.value)
                    ? [...previousAnswer.value]
                    : [];

            if (option.exclusive) {

                selectedValues =
                    selectedValues.includes(option.value)
                        ? []
                        : [option.value];

            } else {

                selectedValues = selectedValues.filter(value =>
                    value !== "none" &&
                    value !== "na" &&
                    value !== "seen"
                );

                if (selectedValues.includes(option.value)) {

                    selectedValues = selectedValues.filter(value =>
                        value !== option.value
                    );

                } else {

                    selectedValues.push(option.value);

                }

            }

            let score = null;

            if (selectedValues.length > 0) {

                const exclusiveOption =
                    multipleQuestionConfig[questionId].options.find(item =>
                        item.exclusive &&
                        selectedValues.includes(item.value)
                    );

                score = exclusiveOption
                    ? exclusiveOption.score
                    : Math.min(selectedValues.length, 4);

            }

            answers[questionId] = {

                value: selectedValues,

                score: score,

                personalMemory:
                    previousAnswer?.personalMemory || ""

            };

        } else {

            answers[questionId] = {

                value: option.value,

                score: option.score ?? null,

                personalMemory:
                    previousAnswer?.personalMemory || ""

            };

        }

        const questionCard =
            Array.from(
                elements.questionCard.querySelectorAll(
                    "[data-question-id]"
                )
            ).find(card =>
                card.dataset.questionId === questionId
            );

        if (questionCard) {

            const selectedValues = getSelectedValues(
                questionId,
                isMultiple
            );

            questionCard
                .querySelectorAll(".answer-option")
                .forEach(button => {

                    const selected =
                        selectedValues.includes(button.dataset.value);

                    button.classList.toggle(
                        "selected",
                        selected
                    );

                    button.setAttribute(
                        "aria-pressed",
                        String(selected)
                    );

                });

            questionCard.classList.toggle(
                "question-answered",
                isAnswered(questionId)
            );

        }

        saveAnswers();

        updatePageNavigation();

        updateProgress();

    }


    // ======================================
    // 14. BUILD QUESTION CARD
    // ======================================

    function createQuestionCard(question, index) {

        const questionId = question.id;

        const isMultiple =
            isMultipleQuestion(question);

        const title =
            getQuestionTitle(question);

        const options =
            getQuestionOptions(question);

        const imagePath =
            getQuestionImage(question);

        const fallbackImage =
            getCategoryImage(question.categoryId);

        const savedAnswer =
            getAnswer(questionId);

        const selectedValues =
            getSelectedValues(questionId, isMultiple);

        const helperText = isMultiple
            ? "তোমার সঙ্গে মেলে এমন সবগুলো নির্বাচন করতে পারো।"
            : question.helperText || "";

        const questionNumber =
            String(index + 1).padStart(2, "0");

        const optionHTML = options.map(option => {

            const selected =
                selectedValues.includes(option.value);

            return `

                <button
                    type="button"
                    class="answer-option ${selected ? "selected" : ""}"
                    data-answer-option
                    data-question-id="${escapeHTML(questionId)}"
                    data-value="${escapeHTML(option.value)}"
                    aria-pressed="${selected}"
                >

                    <span class="${
                        isMultiple
                            ? "answer-checkbox"
                            : "answer-radio"
                    }"></span>

                    <span class="answer-label">
                        ${escapeHTML(option.label)}
                    </span>

                </button>

            `;

        }).join("");

        return `

            <article
                class="quiz-question-item ${
                    isAnswered(questionId)
                        ? "question-answered"
                        : ""
                }"
                data-question-id="${escapeHTML(questionId)}"
                style="--gcp-card-index: ${index % QUESTIONS_PER_PAGE};"
            >

                <div class="quiz-question-heading">

                    <span class="question-number">
                        ${questionNumber}
                    </span>

                    <span class="question-tag">
                        ${
                            isMultiple
                                ? "CHOOSE ALL THAT APPLY"
                                : "CHILDHOOD MEMORY"
                        }
                    </span>

                </div>


                <div class="quiz-question-content">

                    <div class="quiz-question-visual">

                        <img
                            class="quiz-question-image"
                            src="${escapeHTML(imagePath)}"
                            data-fallback="${escapeHTML(fallbackImage)}"
                            alt="Childhood memory illustration"
                            loading="lazy"
                        >

                        <span class="quiz-visual-caption">
                            A MEMORY FROM YOUR CHILDHOOD
                        </span>

                    </div>


                    <div class="quiz-question-details">

                        <h2 class="quiz-question-title">
                            ${escapeHTML(title)}
                        </h2>

                        ${
                            helperText
                                ? `<p class="question-helper">${escapeHTML(helperText)}</p>`
                                : ""
                        }

                        <div class="answer-list">

                            ${optionHTML}

                        </div>


                        <div class="personal-memory-box">

                            <label>
                                <span>✎</span>
                                Add your personal memory
                                <small>OPTIONAL</small>
                            </label>

                            <textarea
                                rows="2"
                                placeholder="Tell us a little story behind your answer..."
                                data-memory-for="${escapeHTML(questionId)}"
                            >${escapeHTML(savedAnswer?.personalMemory || "")}</textarea>

                        </div>

                    </div>

                </div>

            </article>

        `;

    }


    // ======================================
    // 15. IMAGE FALLBACK HANDLER
    // ======================================

    function setupImageFallbacks() {

        elements.questionCard
            .querySelectorAll(".quiz-question-image, .quiz-page-hero-image")
            .forEach(image => {

                image.addEventListener("error", () => {

                    const fallback =
                        image.dataset.fallback || DEFAULT_VISUAL;

                    if (image.src.endsWith(fallback)) {

                        image.style.display = "none";

                        return;

                    }

                    image.src = fallback;

                }, { once: true });

            });

    }


    // ======================================
    // 16. RENDER PAGE — 8 QUESTIONS
    // ======================================

    function renderQuestion() {

        if (currentPage >= getTotalPages()) {

            showCompletion();

            return;

        }

        const pageQuestions =
            getCurrentPageQuestions();

        const startIndex =
            getPageStartIndex();

        const firstQuestion =
            pageQuestions[0];

        const categoryId =
            firstQuestion?.categoryId || "";

        const categoryTitle =
            categoryNames[categoryId] ||
            "Childhood Memories";

        const categoryImage =
            getCategoryImage(categoryId);

        const totalPages =
            getTotalPages();

        const pageNumber =
            currentPage + 1;

        const categoryChanged =
            lastRenderedCategory !== null &&
            lastRenderedCategory !== categoryId;

        lastRenderedCategory = categoryId;

        const heroHTML = `

            <section class="quiz-page-hero ${
                categoryChanged ? "category-transition" : ""
            }">

                <img
                    class="quiz-page-hero-image"
                    src="${escapeHTML(categoryImage)}"
                    data-fallback="${escapeHTML(DEFAULT_VISUAL)}"
                    alt="${escapeHTML(categoryTitle)} childhood scene"
                >

                <div class="quiz-page-hero-overlay"></div>

                <div class="quiz-page-hero-content">

                    <span class="quiz-page-eyebrow">
                        CHAPTER 02 · MEMORY JOURNEY
                    </span>

                    <h2>
                        ${escapeHTML(categoryTitle)}
                    </h2>

                    <p>
                        Turn the pages and rediscover your childhood.
                    </p>

                    <span class="quiz-page-indicator">
                        PAGE ${String(pageNumber).padStart(2, "0")}
                        OF ${String(totalPages).padStart(2, "0")}
                    </span>

                </div>

            </section>

        `;

        const questionsHTML = pageQuestions.map(
            (question, index) => {

                return createQuestionCard(
                    question,
                    startIndex + index
                );

            }
        ).join("");

        const navigationHTML = `

            <div class="quiz-page-navigation">

                <button
                    type="button"
                    class="quiz-previous-button"
                    id="previousButton"
                    data-page-action="previous"
                >
                    ← Previous Page
                </button>

                <span class="quiz-page-count">
                    PAGE ${pageNumber} / ${totalPages}
                </span>

                <button
                    type="button"
                    class="quiz-next-button"
                    id="nextButton"
                    data-page-action="next"
                >
                    ${
                        currentPage === totalPages - 1
                            ? "Finish Quiz ✓"
                            : "Next Page →"
                    }
                </button>

            </div>

            <p class="quiz-page-note">
                ✦ Every childhood is unique. Take your time with each memory.
            </p>

        `;

        elements.questionCard.innerHTML = `

            <div class="quiz-page-content quiz-page-entering">

                ${heroHTML}

                <div class="quiz-page-questions">

                    ${questionsHTML}

                </div>

                ${navigationHTML}

            </div>

        `;

        setupImageFallbacks();

        updateProgress();

        updatePageNavigation();

        const pageContent =
            elements.questionCard.querySelector(".quiz-page-content");

        if (pageContent) {

            // Restart animation reliably.
            void pageContent.offsetWidth;

            pageContent.classList.add("quiz-page-entering");

        }

        if (!elements.quizJourney.hidden) {

            elements.questionCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    // ======================================
    // 17. PAGE TRANSITION CONTROLLER
    // ======================================

    
async function transitionToPage(targetPage) {
    if (isPageTransitioning) return;

    if (
        targetPage < 0 ||
        targetPage >= getTotalPages() ||
        targetPage === currentPage
    ) {
        return;
    }

    isPageTransitioning = true;

    try {
        const oldPage = document.querySelector(".quiz-page-content");

        if (oldPage) {
            const exitAnimation = oldPage.animate(
                [
                    {
                        opacity: 1,
                        transform: "perspective(1200px) rotateY(0deg)"
                    },
                    {
                        opacity: 0,
                        transform: "perspective(1200px) rotateY(-65deg) translateX(-70px)"
                    }
                ],
                {
                    duration: 350,
                    easing: "ease-in",
                    fill: "forwards"
                }
            );

            await exitAnimation.finished.catch(() => {});
        }

        currentPage = targetPage;
        renderQuestion();

        const newPage = document.querySelector(".quiz-page-content");

        if (newPage) {
            const enterAnimation = newPage.animate(
                [
                    {
                        opacity: 0,
                        transform: "perspective(1200px) rotateY(55deg) translateX(60px)"
                    },
                    {
                        opacity: 1,
                        transform: "perspective(1200px) rotateY(0deg) translateX(0)"
                    }
                ],
                {
                    duration: 500,
                    easing: "ease-out",
                    fill: "both"
                }
            );

            await enterAnimation.finished.catch(() => {});

            newPage.style.transform = "";
            newPage.style.opacity = "";
        }
    } catch (error) {
        console.error("Quiz page transition error:", error);
    } finally {
        isPageTransitioning = false;
    }
}



    // ======================================
    // 18. OPEN MEMORY BOOK
    // ======================================

    if (openMemoryBookButton) {

        openMemoryBookButton.addEventListener("click", () => {

            elements.quizIntro.classList.add("intro-completed");

            elements.quizJourney.hidden = false;

            elements.quizJourney.classList.remove(
                "journey-entering"
            );

            void elements.quizJourney.offsetWidth;

            elements.quizJourney.classList.add(
                "journey-entering"
            );

            elements.questionCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    // ======================================
    // 19. ANSWER & MEMORY EVENT HANDLING
    // ======================================

    elements.questionCard.addEventListener("click", event => {

        if (isPageTransitioning) return;

        const answerButton =
            event.target.closest("[data-answer-option]");

        if (answerButton) {

            const questionId =
                answerButton.dataset.questionId;

            const value =
                answerButton.dataset.value;

            const question =
                questions.find(item =>
                    item.id === questionId
                );

            if (!question) return;

            const options =
                getQuestionOptions(question);

            const option =
                options.find(item =>
                    item.value === value
                );

            if (!option) return;

            selectAnswer(
                questionId,
                option,
                isMultipleQuestion(question)
            );

            return;

        }


        // PAGE NAVIGATION

        const navigationButton =
            event.target.closest("[data-page-action]");

        if (navigationButton) {

            const action =
                navigationButton.dataset.pageAction;

            if (action === "previous") {

                if (currentPage === 0) return;

                transitionToPage(currentPage - 1);

                return;

            }

            if (action === "next") {

                if (!areCurrentPageQuestionsAnswered()) {

                    return;

                }

                saveVisibleMemories();

                // FINAL PAGE

                if (currentPage === getTotalPages() - 1) {

                    const allAnswered =
                        questions.every(question =>
                            isAnswered(question.id)
                        );

                    if (!allAnswered) {

                        alert(
                            "Please answer all questions before finishing."
                        );

                        return;

                    }

                    localStorage.setItem(
                        "gcp_quiz_completed",
                        "true"
                    );

                    showCompletion();

                    return;

                }

                // NEXT PAGE WITH ANIMATION

                transitionToPage(currentPage + 1);

                return;

            }

        }


        // REVIEW ANSWERS

        if (event.target.closest("#reviewAnswersButton")) {

            if (isPageTransitioning) return;

            currentPage = 0;

            lastRenderedCategory = null;

            renderQuestion();

            elements.questionCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });


    // ======================================
    // 20. PERSONAL MEMORY INPUT
    // ======================================

    elements.questionCard.addEventListener("input", event => {

        const textarea =
            event.target.closest("[data-memory-for]");

        if (!textarea) return;

        savePersonalMemory(
            textarea.dataset.memoryFor,
            textarea.value
        );

    });


    // ======================================
    // 21. COMPLETION SCREEN
    // ======================================

    function showCompletion() {

        const answeredCount =
            countAnsweredQuestions();

        elements.questionCounter.textContent =
            "QUIZ COMPLETED";

        elements.progressPercentage.textContent =
            "100% COMPLETED";

        elements.progressFill.style.width = "100%";

        elements.categoryName.textContent =
            "Your Childhood Journey";

        elements.questionCard.innerHTML = `

            <div class="quiz-completion">

                <div class="completion-emblem">✦</div>

                <span class="quiz-eyebrow">
                    CHAPTER 02 · COMPLETED
                </span>

                <h2>Your Childhood Journey is Complete!</h2>

                <p>
                    You have shared your childhood experiences.
                    Your memories have been saved on this device.
                </p>

                <div class="completion-stat">

                    <strong>
                        ${answeredCount} / ${questions.length}
                    </strong>

                    <span>QUESTIONS ANSWERED</span>

                </div>

                <button
                    type="button"
                    class="quiz-next-button"
                    id="reviewAnswersButton"
                >
                    Review My Answers ↶
                </button>

                <p class="completion-note">
                    Next chapter: Upload your photo and create your passport.
                </p>

            </div>

        `;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ======================================
    // 22. INITIALIZE QUIZ
    // ======================================

    renderQuestion();

});
