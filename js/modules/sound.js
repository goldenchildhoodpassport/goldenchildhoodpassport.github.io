/* ==========================================
   GOLDEN CHILDHOOD PASSPORT
   SOUND — every sound is synthesised with
   the Web Audio API, so no audio files are
   needed and nothing extra downloads.
   Sound is OFF until the user turns it on.
========================================== */

window.GCP = window.GCP || {};

GCP.sound = (function () {

    let ctx = null;
    let master = null;
    let enabled = false;
    let noiseBuffer = null;
    let ambience = null; // { nodes: [], timers: [] }

    function ensure() {
        if (ctx) return ctx;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx();
        master = ctx.createGain();
        master.gain.value = 0.55;
        master.connect(ctx.destination);

        noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        return ctx;
    }

    /* ---------- building blocks ---------- */

    function tone({ freq = 440, type = "sine", start = 0, dur = 0.2, vol = 0.2, attack = 0.005, endFreq = null, dest = null }) {
        const t = ctx.currentTime + start;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(vol, t + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain).connect(dest || master);
        osc.start(t);
        osc.stop(t + dur + 0.05);
    }

    function noise({ start = 0, dur = 0.3, vol = 0.2, type = "bandpass", freq = 1200, q = 1, attack = 0.005, endFreq = null, dest = null }) {
        const t = ctx.currentTime + start;
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer;
        src.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = type;
        filter.frequency.setValueAtTime(freq, t);
        if (endFreq) filter.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
        filter.Q.value = q;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(vol, t + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(filter).connect(gain).connect(dest || master);
        src.start(t, Math.random());
        src.stop(t + dur + 0.05);
    }

    function bell(freq, start, vol = 0.12, dur = 1.2) {
        [1, 2.76, 5.4].forEach((ratio, i) => {
            tone({ freq: freq * ratio, start, dur: dur / (i + 1), vol: vol / (i + 1.5), type: "sine" });
        });
    }

    /* ---------- one-shot effects ---------- */

    const effects = {
        stamp() {
            tone({ freq: 140, endFreq: 50, dur: 0.18, vol: 0.5, type: "sine" });
            noise({ dur: 0.08, vol: 0.25, freq: 900, q: 0.6 });
        },
        select() { tone({ freq: 660, dur: 0.08, vol: 0.06, type: "triangle" }); },
        pageFlip() { noise({ dur: 0.35, vol: 0.12, freq: 2500, endFreq: 600, q: 0.8, attack: 0.05 }); },
        pencil() {
            for (let i = 0; i < 6; i++) noise({ start: i * 0.07, dur: 0.06, vol: 0.05, freq: 4000 + Math.random() * 2000, q: 2 });
        },
        tick() { tone({ freq: 1800, dur: 0.03, vol: 0.04, type: "square" }); },
        whoosh() { noise({ dur: 0.5, vol: 0.1, freq: 400, endFreq: 3000, q: 0.7, attack: 0.1 }); },
        sparkle() { [1320, 1760, 2093, 2637].forEach((f, i) => tone({ freq: f, start: i * 0.07, dur: 0.5, vol: 0.05 })); },

        schoolBell() {
            for (let i = 0; i < 4; i++) bell(880, i * 0.32, 0.16, 0.9);
        },
        tiffinOpen() {
            noise({ dur: 0.05, vol: 0.3, freq: 3000, q: 4 });
            tone({ freq: 2200, start: 0.02, dur: 0.4, vol: 0.05 });
            tone({ freq: 3300, start: 0.03, dur: 0.3, vol: 0.03 });
        },
        whistle() {
            const t = ctx.currentTime;
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            const gain = ctx.createGain();
            osc.frequency.value = 2600;
            lfo.frequency.value = 28;
            lfoGain.gain.value = 120;
            lfo.connect(lfoGain).connect(osc.frequency);
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.08, t + 0.03);
            gain.gain.setValueAtTime(0.08, t + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
            osc.connect(gain).connect(master);
            osc.start(t); lfo.start(t);
            osc.stop(t + 0.75); lfo.stop(t + 0.75);
        },
        splash() {
            noise({ dur: 0.9, vol: 0.35, freq: 1800, endFreq: 300, q: 0.5, attack: 0.01 });
            for (let i = 0; i < 5; i++) tone({ freq: 600 + Math.random() * 900, endFreq: 1800, start: 0.2 + i * 0.09, dur: 0.08, vol: 0.04 });
        },
        almirah() {
            tone({ freq: 90, endFreq: 140, type: "sawtooth", dur: 0.9, vol: 0.05, attack: 0.1 });
            tone({ freq: 180, endFreq: 260, type: "sawtooth", start: 0.1, dur: 0.7, vol: 0.03, attack: 0.1 });
        },
        rickshawBell() {
            [0, 0.12, 0.45, 0.57].forEach((s) => bell(2100, s, 0.1, 0.5));
        },
        tvStatic() {
            noise({ dur: 1.4, vol: 0.18, type: "highpass", freq: 1500, q: 0.3, attack: 0.02 });
            tone({ freq: 15700, dur: 1.4, vol: 0.01 });
        },
        nokiaBoot() {
            [[1318, 0], [1174, 0.14], [740, 0.28], [830, 0.42], [1108, 0.6], [987, 0.74], [587, 0.88], [659, 1.02]]
                .forEach(([f, s]) => tone({ freq: f, start: s, dur: 0.13, vol: 0.06, type: "square" }));
        },
        keyBeep() { tone({ freq: 1400, dur: 0.07, vol: 0.05, type: "square" }); },
        dialup() {
            tone({ freq: 1650, dur: 0.5, vol: 0.05, type: "sine" });
            tone({ freq: 2100, start: 0.5, dur: 0.4, vol: 0.05, type: "square" });
            noise({ start: 0.9, dur: 0.9, vol: 0.08, freq: 2400, q: 3 });
            tone({ freq: 980, start: 1.0, dur: 0.6, vol: 0.03, type: "sawtooth" });
        },
        powerCut() {
            tone({ freq: 100, dur: 0.6, vol: 0.06, type: "sawtooth", endFreq: 30 });
            tone({ freq: 60, start: 0.05, dur: 0.25, vol: 0.4, endFreq: 30 });
        },
        matchStrike() {
            noise({ dur: 0.25, vol: 0.25, freq: 3500, q: 1, attack: 0.01 });
            noise({ start: 0.2, dur: 0.8, vol: 0.06, type: "lowpass", freq: 800, attack: 0.1 });
        },
        chime() { [784, 988, 1175, 1568].forEach((f, i) => bell(f, i * 0.16, 0.06, 1.4)); },
        jarOpen() {
            tone({ freq: 400, endFreq: 900, dur: 0.12, vol: 0.12 });
            [1568, 1976, 2349].forEach((f, i) => tone({ freq: f, start: 0.15 + i * 0.1, dur: 0.7, vol: 0.04 }));
        },
        scratch() { noise({ dur: 0.08, vol: 0.06, freq: 5000, q: 1.5 }); },
        cheer() {
            effects.sparkle();
            [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, start: 0.3 + i * 0.1, dur: 0.6, vol: 0.06, type: "triangle" }));
        }
    };

    /* ---------- ambience loops ---------- */

    function ambienceBed(freq, type, vol, q = 0.5) {
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer;
        src.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = type;
        filter.frequency.value = freq;
        filter.Q.value = q;
        const gain = ctx.createGain();
        gain.gain.value = 0.0001;
        gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + 1.5);
        src.connect(filter).connect(gain).connect(master);
        src.start();
        return { src, gain };
    }

    function cricket(start = 0) {
        for (let i = 0; i < 3; i++) tone({ freq: 4400, start: start + i * 0.045, dur: 0.035, vol: 0.018, type: "sine" });
    }
    function bird(start = 0) {
        const base = 2400 + Math.random() * 1600;
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
            tone({ freq: base, endFreq: base * (1.2 + Math.random() * 0.4), start: start + i * 0.12, dur: 0.09, vol: 0.025 });
        }
    }

    const AMBIENCES = {
        schoolyard: { bed: [500, "bandpass", 0.012], every: 2600, event: () => Math.random() < 0.5 && bird() },
        field:      { bed: [300, "lowpass", 0.01],  every: 1800, event: () => bird() },
        village:    { bed: [700, "lowpass", 0.02],  every: 2200, event: () => bird() },
        home:       { bed: [200, "lowpass", 0.006], every: 1000, event: () => tone({ freq: 2600, dur: 0.02, vol: 0.012, type: "square" }) },
        street:     { bed: [250, "lowpass", 0.03],  every: 5000, event: () => Math.random() < 0.4 && bell(2100, 0, 0.03, 0.4) },
        tvRoom:     { bed: [6000, "highpass", 0.004], every: 0 },
        cyberCafe:  { bed: [140, "lowpass", 0.03],  every: 900, event: () => Math.random() < 0.6 && tone({ freq: 3000 + Math.random() * 800, dur: 0.02, vol: 0.015, type: "square" }) },
        nightCrickets: { bed: [180, "lowpass", 0.006], every: 700, event: () => cricket() },
        festival:   { bed: [180, "lowpass", 0.006], every: 900, event: () => (Math.random() < 0.85 ? cricket() : bell(1568, 0, 0.02, 1.2)) },
        lateNight:  { bed: [160, "lowpass", 0.005], every: 1300, event: () => cricket() }
    };

    function stopAmbience() {
        if (!ambience) return;
        ambience.timers.forEach(clearInterval);
        ambience.nodes.forEach(({ src, gain }) => {
            try {
                gain.gain.cancelScheduledValues(ctx.currentTime);
                gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
                src.stop(ctx.currentTime + 0.9);
            } catch (e) { /* already stopped */ }
        });
        ambience = null;
    }

    let currentAmbience = null;

    function startAmbience(name) {
        currentAmbience = name;
        if (!enabled || !ensure()) return;
        stopAmbience();
        const config = AMBIENCES[name];
        if (!config) return;
        ambience = { nodes: [ambienceBed(...config.bed)], timers: [] };
        if (config.every && config.event) {
            ambience.timers.push(setInterval(() => {
                if (enabled && document.visibilityState === "visible") config.event();
            }, config.every));
        }
    }

    document.addEventListener("visibilitychange", () => {
        if (!ctx) return;
        if (document.visibilityState === "hidden") ctx.suspend();
        else if (enabled) ctx.resume();
    });

    return {
        play(name) {
            if (!enabled || !ensure() || !effects[name]) return;
            if (ctx.state === "suspended") ctx.resume();
            try { effects[name](); } catch (e) { console.warn("[GCP] sound", name, e); }
        },
        ambience: startAmbience,
        setEnabled(value) {
            enabled = Boolean(value);
            if (enabled) {
                if (!ensure()) { enabled = false; return false; }
                ctx.resume();
                if (currentAmbience) startAmbience(currentAmbience);
            } else {
                stopAmbience();
            }
            return enabled;
        },
        isEnabled: () => enabled,
        isSupported: () => Boolean(window.AudioContext || window.webkitAudioContext)
    };

})();
