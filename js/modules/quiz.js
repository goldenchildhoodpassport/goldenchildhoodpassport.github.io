
/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   QUIZ ENGINE — VERSION 2.0
   HYBRID ANSWER SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. QUESTION BANK
    // ======================================

    const questions = window.GCP_QUESTIONS || [];

    const STORAGE_KEY = "gcp_quiz_answers";

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
const openMemoryBookButton =
    document.getElementById("openMemoryBookButton");

    // ======================================
    // 2. HYBRID ANSWER CONFIGURATION
    // ======================================

    /*
       Multiple Select Questions:
       M01, T01, G02, G03, G05, F05

       All other questions remain Single Select.
    */

    const multipleQuestionConfig = {

        // M01 — BTV ENTERTAINMENT
        M01: {
            question: "BTV-তে কোন কোন অনুষ্ঠান দেখেছ?",
            options: [
                { value: "alif-laila", label: "আলিফ লায়লা" },
                { value: "sindbad", label: "সিন্দাবাদ" },
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


        // T01 — BUTTON PHONE MODELS
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


        // G02 — TRADITIONAL GAMES
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


        // G03 — TRADITIONAL TOYS
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


        // G05 — SPORTS
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


        // F05 — STREET FOOD
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
    // 3. HTML ELEMENT REFERENCES
    // ======================================

    const elements = {
        questionCounter: document.getElementById("questionCounter"),
        progressPercentage: document.getElementById("progressPercentage"),
        progressFill: document.getElementById("progressFill"),
        categoryName: document.getElementById("categoryName"),

        questionNumber: document.getElementById("questionNumber"),
        questionText: document.getElementById("questionText"),
        questionHelper: document.getElementById("questionHelper"),

        answerList: document.getElementById("answerList"),
        personalMemory: document.getElementById("personalMemory"),

        previousButton: document.getElementById("previousButton"),
        nextButton: document.getElementById("nextButton"),

        questionCard: document.getElementById("questionCard")
    };


    // ======================================
    // 4. VALIDATE HTML ELEMENTS
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
    // 5. LOAD SAVED ANSWERS
    // ======================================

    function loadAnswers() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : {};

            return parsed && typeof parsed === "object" &&
                !Array.isArray(parsed) ? parsed : {};

        } catch (error) {
            console.error("Could not load saved answers:", error);
            return {};
        }
    }

    let answers = loadAnswers();

    let currentIndex = 0;


    // ======================================
    // 6. ANSWER HELPERS
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
            console.error("Could not save quiz answers:", error);
            alert("Your answers could not be saved. Please check browser storage.");
        }
    }


    // ======================================
    // 7. SAVE PERSONAL MEMORY
    // ======================================

    function savePersonalMemory() {

        const question = questions[currentIndex];

        if (!question) return;

        if (!answers[question.id]) {
            answers[question.id] = {
                value: null,
                score: null,
                personalMemory: ""
            };
        }

        answers[question.id].personalMemory =
            elements.personalMemory.value.trim();

        saveAnswers();
    }


    // ======================================
    // 8. UPDATE PROGRESS BAR
    // ======================================

    function updateProgress() {

        const total = questions.length;
        const current = currentIndex + 1;

        const percentage = Math.round(
            (current / total) * 100
        );

        elements.questionCounter.textContent =
            `QUESTION ${String(current).padStart(2, "0")} OF ${total}`;

        elements.progressPercentage.textContent =
            `${percentage}% COMPLETED`;

        elements.progressFill.style.width =
            `${percentage}%`;
    }


    // ======================================
    // 9. SELECT SINGLE / MULTIPLE ANSWER
    // ======================================

    function selectAnswer(option, isMultiple) {

        const question = questions[currentIndex];

        if (!question) return;

        const previousAnswer = getAnswer(question.id);

        // ----------------------------------
        // MULTIPLE SELECT
        // ----------------------------------

        if (isMultiple) {

            let selectedValues = Array.isArray(previousAnswer?.value)
                ? [...previousAnswer.value]
                : [];

            if (option.exclusive) {

                // Exclusive option removes all other selections.
                selectedValues = selectedValues.includes(option.value)
                    ? []
                    : [option.value];

            } else {

                // Remove exclusive values before normal selection.
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
                    multipleQuestionConfig[question.id].options.find(item =>
                        item.exclusive &&
                        selectedValues.includes(item.value)
                    );

                score = exclusiveOption
                    ? exclusiveOption.score
                    : Math.min(selectedValues.length, 4);
            }

            answers[question.id] = {
                value: selectedValues,
                score: score,
                personalMemory:
                    previousAnswer?.personalMemory || ""
            };

        } else {

            // ----------------------------------
            // SINGLE SELECT
            // ----------------------------------

            answers[question.id] = {
                value: option.value,
                score: option.score,
                personalMemory:
                    previousAnswer?.personalMemory || ""
            };
        }


        // ----------------------------------
        // UPDATE ANSWER UI
        // ----------------------------------

        const selectedValues = getSelectedValues(
            question.id,
            isMultiple
        );

        elements.answerList
            .querySelectorAll(".answer-option")
            .forEach(button => {

                const selected = selectedValues.includes(
                    button.dataset.value
                );

                button.classList.toggle("selected", selected);

                button.setAttribute(
                    "aria-pressed",
                    String(selected)
                );
            });


        elements.nextButton.disabled =
            !isAnswered(question.id);

        saveAnswers();
    }


    // ======================================
    // 10. RENDER QUESTION
    // ======================================

    function renderQuestion() {

        if (currentIndex >= questions.length) {
            showCompletion();
            return;
        }

        const question = questions[currentIndex];

        const multipleConfig =
            multipleQuestionConfig[question.id];

        const isMultiple = Boolean(multipleConfig);

        const displayOptions = isMultiple
            ? multipleConfig.options
            : question.options;

        const savedAnswer = getAnswer(question.id);

        // ----------------------------------
        // QUESTION INFORMATION
        // ----------------------------------

        elements.questionNumber.textContent =
            String(currentIndex + 1).padStart(2, "0");

        elements.categoryName.textContent =
            categoryNames[question.categoryId] ||
            "Childhood Memories";

        elements.questionText.textContent =
            isMultiple
                ? multipleConfig.question
                : question.question;

        elements.questionHelper.textContent =
            isMultiple
                ? "তোমার সঙ্গে মেলে এমন সবগুলো নির্বাচন করতে পারো।"
                : question.helperText || "";


        // ----------------------------------
        // ANSWER TYPE INDICATOR
        // ----------------------------------

        const questionTag =
            document.querySelector(".question-tag");

        if (questionTag) {
            questionTag.textContent = isMultiple
                ? "CHOOSE ALL THAT APPLY"
                : "CHILDHOOD MEMORY";
        }


        // ----------------------------------
        // RENDER OPTIONS
        // ----------------------------------

        elements.answerList.innerHTML = "";

        const selectedValues = getSelectedValues(
            question.id,
            isMultiple
        );

        displayOptions.forEach(option => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "answer-option";

            button.dataset.value = option.value;

            button.setAttribute("aria-pressed", "false");

            const isSelected =
                selectedValues.includes(option.value);

            if (isSelected) {
                button.classList.add("selected");
                button.setAttribute("aria-pressed", "true");
            }

            const indicator = document.createElement("span");

            indicator.className = isMultiple
                ? "answer-checkbox"
                : "answer-radio";

            const label = document.createElement("span");

            label.className = "answer-label";
            label.textContent = option.label;

            button.appendChild(indicator);
            button.appendChild(label);

            button.addEventListener("click", () => {
                selectAnswer(option, isMultiple);
            });

            elements.answerList.appendChild(button);
        });


        // ----------------------------------
        // PERSONAL MEMORY
        // ----------------------------------

        elements.personalMemory.value =
            savedAnswer?.personalMemory || "";

// Open Memory Book button
if (openMemoryBookButton && questionCard) {
    openMemoryBookButton.addEventListener("click", () => {
        questionCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}
        // ----------------------------------
        // NAVIGATION
        // ----------------------------------

        elements.previousButton.disabled =
            currentIndex === 0;

        elements.nextButton.disabled =
            !isAnswered(question.id);

        elements.nextButton.textContent =
            currentIndex === questions.length - 1
                ? "Finish Quiz ✓"
                : "Next Question →";


        // ----------------------------------
        // PROGRESS
        // ----------------------------------

        updateProgress();

        elements.questionCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    // ======================================
    // 11. PERSONAL MEMORY INPUT EVENT
    // ======================================

    elements.personalMemory.addEventListener("input", () => {

        const question = questions[currentIndex];

        if (!question) return;

        if (!answers[question.id]) {
            answers[question.id] = {
                value: null,
                score: null,
                personalMemory: ""
            };
        }

        answers[question.id].personalMemory =
            elements.personalMemory.value.trim();

        saveAnswers();
    });


    // ======================================
    // 12. NEXT QUESTION
    // ======================================

    elements.nextButton.addEventListener("click", () => {

        const question = questions[currentIndex];

        if (!question || !isAnswered(question.id)) {
            return;
        }

        savePersonalMemory();

        if (currentIndex === questions.length - 1) {

            const allAnswered = questions.every(item =>
                isAnswered(item.id)
            );

            if (!allAnswered) {
                alert("Please answer all questions before finishing.");
                return;
            }

            localStorage.setItem(
                "gcp_quiz_completed",
                "true"
            );

            showCompletion();
            return;
        }

        currentIndex++;

        renderQuestion();
    });


    // ======================================
    // 13. PREVIOUS QUESTION
    // ======================================

    elements.previousButton.addEventListener("click", () => {

        if (currentIndex === 0) return;

        savePersonalMemory();

        currentIndex--;

        renderQuestion();
    });


    // ======================================
    // 14. COMPLETION SCREEN
    // ======================================

    function showCompletion() {

        const answeredCount = questions.filter(question =>
            isAnswered(question.id)
        ).length;

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


        const reviewButton =
            document.getElementById("reviewAnswersButton");

        reviewButton.addEventListener("click", () => {

            currentIndex = 0;

            // Rebuild the original question card.
            location.reload();

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ======================================
    // 15. INITIALIZE QUIZ
    // ======================================

    renderQuestion();

});
