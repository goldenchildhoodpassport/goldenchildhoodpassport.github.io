/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   PHOTO UPLOAD — drag + zoom crop to a
   passport-shaped (4:5) photo. The result is
   a small JPEG data URL kept in localStorage.
========================================== */

window.GCP = window.GCP || {};

GCP.photoUpload = function ({ canvas, input, zoom, onReady }) {

    const ctx = canvas.getContext("2d");
    const state = { img: null, scale: 1, base: 1, x: 0, y: 0, drag: null };

    function draw() {
        ctx.fillStyle = "#e9dfc8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (!state.img) return;
        const s = state.base * state.scale;
        const w = state.img.width * s;
        const h = state.img.height * s;
        clamp(w, h);
        ctx.drawImage(state.img, state.x, state.y, w, h);
    }

    /* never let an empty edge show */
    function clamp(w, h) {
        state.x = Math.min(0, Math.max(canvas.width - w, state.x));
        state.y = Math.min(0, Math.max(canvas.height - h, state.y));
    }

    function load(file) {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                state.img = img;
                state.base = Math.max(canvas.width / img.width, canvas.height / img.height);
                state.scale = 1;
                zoom.value = 1;
                state.x = (canvas.width - img.width * state.base) / 2;
                state.y = (canvas.height - img.height * state.base) / 2;
                draw();
                onReady(true);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }

    input.addEventListener("change", () => load(input.files[0]));

    zoom.addEventListener("input", () => {
        if (!state.img) return;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const old = state.base * state.scale;
        state.scale = Number(zoom.value);
        const now = state.base * state.scale;
        state.x = cx - ((cx - state.x) / old) * now;
        state.y = cy - ((cy - state.y) / old) * now;
        draw();
    });

    function point(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * (canvas.width / rect.width),
            y: (event.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    canvas.addEventListener("pointerdown", (event) => {
        if (!state.img) return;
        canvas.setPointerCapture(event.pointerId);
        const p = point(event);
        state.drag = { px: p.x, py: p.y, x: state.x, y: state.y };
    });
    canvas.addEventListener("pointermove", (event) => {
        if (!state.drag) return;
        const p = point(event);
        state.x = state.drag.x + (p.x - state.drag.px);
        state.y = state.drag.y + (p.y - state.drag.py);
        draw();
    });
    ["pointerup", "pointercancel"].forEach((type) => canvas.addEventListener(type, () => { state.drag = null; }));

    draw();

    return {
        /* 360×450 sepia-warm JPEG */
        export() {
            if (!state.img) return null;
            const out = document.createElement("canvas");
            out.width = 360;
            out.height = 450;
            const o = out.getContext("2d");
            o.drawImage(canvas, 0, 0, out.width, out.height);
            o.globalCompositeOperation = "soft-light";
            o.fillStyle = "rgba(210, 160, 90, .35)";
            o.fillRect(0, 0, out.width, out.height);
            o.globalCompositeOperation = "source-over";
            return out.toDataURL("image/jpeg", 0.82);
        },
        hasImage: () => Boolean(state.img)
    };
};
