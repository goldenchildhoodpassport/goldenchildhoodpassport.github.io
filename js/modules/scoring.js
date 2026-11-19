/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   CHILDHOOD MEMORIES SCORE — era-aware
   ------------------------------------------
   • Only questions from the user's own
     childhood decades count in the total.
   • "na" (no opportunity) is never counted.
   • Experiences from another era still add
     to the score (bonus), capped at 100.
   So a 2010s kid is never punished for
   not knowing আলিফ লায়লা.
========================================== */

window.GCP = window.GCP || {};

GCP.scoring = (function () {

    function questionMap() {
        const map = {};
        (window.GCP_QUESTIONS || []).forEach((q) => { map[q.id] = q; });
        return map;
    }

    function maxScore(question) {
        return Math.max(...question.options.map((o) => (typeof o.score === "number" ? o.score : 0)));
    }

    function optionScore(question, value) {
        const option = question.options.find((o) => o.value === value);
        return option ? option.score : undefined;
    }

    function isInEra(id, decades) {
        const eras = GCP.QUESTION_ERAS[id];
        if (!eras || !decades || !decades.length) return true;
        return eras.some((era) => decades.includes(era));
    }

    function compute(answers, birthYear) {
        const questions = questionMap();
        const decades = birthYear ? GCP.generation.childhoodDecades(birthYear) : [];
        const byCategory = {};
        let earned = 0;
        let possible = 0;
        let answered = 0;
        let memories = 0;

        GCP.JOURNEY.forEach((stop) => {
            byCategory[stop.id] = { earned: 0, possible: 0, answered: 0, percent: null };
        });

        Object.keys(answers || {}).forEach((id) => {
            const question = questions[id];
            const answer = answers[id];
            if (!question || !answer || !answer.v) return;

            answered++;
            if (answer.memory && answer.memory.trim().length > 3) memories++;

            const score = optionScore(question, answer.v);
            if (score === null || score === undefined) return; // "na"

            const max = maxScore(question);
            const bucket = byCategory[question.categoryId];
            const inEra = isInEra(id, decades);

            earned += score;
            if (bucket) {
                bucket.earned += score;
                bucket.answered++;
            }
            if (inEra) {
                possible += max;
                if (bucket) bucket.possible += max;
            }
        });

        Object.values(byCategory).forEach((bucket) => {
            if (bucket.answered === 0) return;
            bucket.percent = bucket.possible > 0
                ? Math.min(100, Math.round((bucket.earned / bucket.possible) * 100))
                : (bucket.earned > 0 ? 100 : 0);
        });

        const total = possible > 0 ? Math.min(100, Math.round((earned / possible) * 100)) : 0;

        return { total, byCategory, answered, memories, decades };
    }

    function scoreOf(answers, id) {
        const question = questionMap()[id];
        const answer = answers && answers[id];
        if (!question || !answer) return null;
        const score = optionScore(question, answer.v);
        return typeof score === "number" ? score : null;
    }

    return { compute, scoreOf, isInEra };

})();
