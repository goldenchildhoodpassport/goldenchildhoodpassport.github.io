/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   SCENE ENGINE — draws the animated memory
   scene for one question (data: js/data/scenes.js)
   Tap the scene → props jump + sound replays.
========================================== */

window.GCP = window.GCP || {};

GCP.scene = (function () {

    /* optional real illustration listed in GCP.SCENE_IMAGES */
    function tryImage(id, node) {
        if (!(GCP.SCENE_IMAGES || []).includes(id)) return;
        node.style.backgroundImage = `url("assets/images/quiz-questions/${id}.webp")`;
        node.classList.add("has-image");
    }

    function fxLayer(name) {
        const layer = document.createElement("div");
        layer.className = `sc-fx sc-fx-${name}`;
        const counts = { rain: 40, stars: 26, fireflies: 14, sparkle: 10, confetti: 22, notes: 6, dust: 14, steam: 4, wind: 5 };
        const n = counts[name] || 0;
        const symbols = { notes: ["♪", "♫", "♩", "♬"], sparkle: ["✦", "✧"], steam: ["〰"], wind: ["〰"] };
        let html = "";
        for (let i = 0; i < n; i++) {
            const sym = symbols[name] ? symbols[name][i % symbols[name].length] : "";
            const left = (Math.random() * 100).toFixed(1);
            const top = (Math.random() * 100).toFixed(1);
            const delay = (Math.random() * 3).toFixed(2);
            const dur = (name === "rain" ? 0.5 + Math.random() * 0.5 : 2.5 + Math.random() * 3).toFixed(2);
            const hue = Math.floor(Math.random() * 360);
            html += `<i style="left:${left}%;top:${top}%;animation-delay:-${delay}s;animation-duration:${dur}s;--h:${hue}">${sym}</i>`;
        }
        layer.innerHTML = html;
        return layer;
    }

    function render(container, id) {
        const spec = GCP.SCENES && GCP.SCENES[id];
        container.innerHTML = "";
        container.className = "sc";
        container.dataset.id = id;
        container.style.backgroundImage = "";
        if (!spec) { container.hidden = true; return null; }
        container.hidden = false;

        const [set, fx, sound, caption, props] = spec;
        container.classList.add(`sc-set-${set}`);
        container.dataset.sound = sound;

        const backdrop = document.createElement("div");
        backdrop.className = "sc-backdrop";
        container.appendChild(backdrop);

        (fx || "").split(/\s+/).filter(Boolean).forEach((name) => container.appendChild(fxLayer(name)));

        /* props, caption and hint sit on a "stage" — the part of the
           scene that is not covered by the question panel */
        const stage = document.createElement("div");
        stage.className = "sc-stage";
        container.appendChild(stage);

        props.forEach((line, i) => {
            const [emoji, x, y, size, anim, ...mods] = line.split(/\s+/);
            const prop = document.createElement("span");
            prop.className = `sc-prop sc-a-${anim} ${mods.map((m) => "sc-m-" + m).join(" ")}`;
            prop.style.cssText = `left:${x}%;top:${y}%;--size:${size};--i:${i}`;
            prop.innerHTML = `<b>${emoji}</b>`;
            stage.appendChild(prop);
        });

        const label = document.createElement("span");
        label.className = "sc-caption";
        label.textContent = caption;
        stage.appendChild(label);

        const replay = document.createElement("span");
        replay.className = "sc-replay";
        replay.setAttribute("aria-hidden", "true");
        replay.textContent = "♪ ছুঁয়ে দেখো";
        stage.appendChild(replay);

        container.setAttribute("role", "img");
        container.setAttribute("aria-label", caption);

        tryImage(id, container);
        return { sound };
    }

    function poke(container) {
        container.classList.remove("poke");
        void container.offsetWidth;
        container.classList.add("poke");
        if (container.dataset.sound) GCP.sound.play(container.dataset.sound);
    }

    return { render, poke };

})();
