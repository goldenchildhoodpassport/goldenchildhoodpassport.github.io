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
        /* Laptop and phone speakers can't play deep bass and are quiet,
           so everything goes through a compressor and a loud master. */
        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.value = -20;
        compressor.knee.value = 10;
        compressor.ratio.value = 5;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.2;
        const presence = ctx.createBiquadFilter();   // lift 1–4 kHz where speakers are loudest
        presence.type = "peaking";
        presence.frequency.value = 2200;
        presence.Q.value = 0.7;
        presence.gain.value = 5;
        const lowCut = ctx.createBiquadFilter();     // remove rumble speakers can't play
        lowCut.type = "highpass";
        lowCut.frequency.value = 120;
        master = ctx.createGain();
        master.gain.value = 1.9;
        master.connect(lowCut).connect(presence).connect(compressor).connect(ctx.destination);

        noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        return ctx;
    }

    /* ---------- building blocks ---------- */

    function tone(opts) {
        const { freq = 440, vol = 0.2 } = opts;
        toneRaw(opts);
        /* low notes get audible overtones so small speakers still "hear" them */
        if (freq < 260 && !opts.pure) {
            toneRaw(Object.assign({}, opts, { freq: freq * 2, endFreq: opts.endFreq ? opts.endFreq * 2 : null, vol: vol * 0.7, pure: true }));
            toneRaw(Object.assign({}, opts, { freq: freq * 3, endFreq: opts.endFreq ? opts.endFreq * 3 : null, vol: vol * 0.45, type: "triangle", pure: true }));
        }
    }

    function toneRaw({ freq = 440, type = "sine", start = 0, dur = 0.2, vol = 0.2, attack = 0.005, endFreq = null, dest = null }) {
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
        step() { noise({ dur: 0.07, vol: 0.09, type: "lowpass", freq: 900, attack: 0.004 }); },
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
        /* ---------- question scene sounds ---------- */
        fanSwish() { for (let i = 0; i < 3; i++) noise({ start: i * 0.45, dur: 0.35, vol: 0.09, freq: 700, endFreq: 1500, q: 0.6, attack: 0.12 }); },
        crickets() { for (let i = 0; i < 5; i++) cricket(i * 0.32); },
        tvTheme() {
            [[392, 0], [440, .22], [523, .44], [494, .66], [440, .88], [392, 1.1], [330, 1.32]].forEach(([f, s]) => {
                tone({ freq: f, start: s, dur: 0.3, vol: 0.05, type: "triangle" });
                tone({ freq: f / 2, start: s, dur: 0.3, vol: 0.03, type: "sine" });
            });
        },
        spooky() {
            tone({ freq: 70, endFreq: 55, dur: 2.2, vol: 0.12, type: "sawtooth", attack: 0.4 });
            tone({ freq: 466, endFreq: 440, dur: 2, vol: 0.025, type: "sine", attack: 0.6 });
            noise({ start: 0.6, dur: 1.2, vol: 0.05, freq: 900, endFreq: 3000, q: 6, attack: 0.4 });
        },
        cassette() {
            tone({ freq: 800, dur: 0.04, vol: 0.12, type: "square" });
            noise({ start: 0.05, dur: 1.4, vol: 0.03, type: "highpass", freq: 4000 });
            [523, 659, 784, 659].forEach((f, i) => tone({ freq: f * 0.98, start: 0.3 + i * 0.25, dur: 0.24, vol: 0.04, type: "triangle" }));
        },
        discSpin() { tone({ freq: 200, endFreq: 900, dur: 1.2, vol: 0.03, type: "sawtooth", attack: 0.3 }); noise({ dur: 1.2, vol: 0.02, freq: 3000, q: 4 }); },
        cartoonJingle() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone({ freq: f, start: i * 0.12, dur: 0.14, vol: 0.06, type: "square" })); },
        radioTune() {
            noise({ dur: 0.8, vol: 0.1, freq: 1500, endFreq: 500, q: 2 });
            tone({ freq: 1200, endFreq: 700, dur: 0.6, vol: 0.03, type: "sine" });
            [440, 494, 523].forEach((f, i) => tone({ freq: f, start: 0.8 + i * 0.22, dur: 0.22, vol: 0.04, type: "triangle" }));
        },
        nokiaRing() {
            [[1319, 0], [1175, .12], [740, .24], [831, .48], [1109, .72], [988, .84], [587, .96], [659, 1.2], [988, 1.44], [880, 1.56], [554, 1.68], [659, 1.92], [880, 2.16]]
                .forEach(([f, s]) => tone({ freq: f, start: s, dur: 0.11, vol: 0.05, type: "square" }));
        },
        smsBeep() { [0, 0.18, 0.6, 0.78].forEach((s) => tone({ freq: 1760, start: s, dur: 0.1, vol: 0.06, type: "square" })); },
        scratchCard() { for (let i = 0; i < 7; i++) noise({ start: i * 0.1, dur: 0.08, vol: 0.08, freq: 3500, q: 1.2 }); },
        missedCall() { [0, 0.25].forEach((s) => { tone({ freq: 1000, start: s, dur: 0.18, vol: 0.06, type: "square" }); tone({ freq: 1250, start: s, dur: 0.18, vol: 0.04, type: "square" }); }); },
        keyBeeps() { [1336, 1209, 1477, 1209, 1336].forEach((f, i) => tone({ freq: f, start: i * 0.15, dur: 0.1, vol: 0.05, type: "square" })); },
        bluetooth() { [880, 1320, 1760].forEach((f, i) => tone({ freq: f, start: i * 0.12, dur: 0.15, vol: 0.05 })); },
        pencilDrop() { [0, 0.12, 0.2].forEach((s, i) => tone({ freq: 2400 - i * 300, start: s, dur: 0.05, vol: 0.06, type: "triangle" })); },
        paper() { noise({ dur: 0.25, vol: 0.12, freq: 3000, q: 0.8, attack: 0.02 }); noise({ start: 0.3, dur: 0.2, vol: 0.08, freq: 2200, q: 0.8 }); },
        kidsPlay() {
            effects.whistle();
            for (let i = 0; i < 6; i++) tone({ freq: 500 + Math.random() * 400, endFreq: 700 + Math.random() * 500, start: 0.7 + i * 0.13, dur: 0.12, vol: 0.02, type: "sawtooth" });
        },
        marbles() { [0, 0.3, 0.42, 0.9].forEach((s) => { tone({ freq: 3200, start: s, dur: 0.05, vol: 0.12 }); tone({ freq: 4700, start: s, dur: 0.03, vol: 0.05 }); }); },
        wind() { noise({ dur: 2.4, vol: 0.12, freq: 400, endFreq: 900, q: 1.4, attack: 0.8 }); },
        batHit() { tone({ freq: 900, endFreq: 300, dur: 0.08, vol: 0.2, type: "triangle" }); noise({ start: 0.3, dur: 1, vol: 0.08, freq: 1200, q: 0.5, attack: 0.2 }); },
        bikeBell() { [0, 0.15].forEach((s) => bell(2500, s, 0.09, 0.6)); },
        chiptune() { [262, 330, 392, 523, 392, 330, 262, 392].forEach((f, i) => tone({ freq: f * 2, start: i * 0.1, dur: 0.09, vol: 0.05, type: "square" })); },
        crunch() { for (let i = 0; i < 5; i++) noise({ start: i * 0.14, dur: 0.07, vol: 0.14, freq: 1800 + Math.random() * 1500, q: 1 }); },
        sizzle() { noise({ dur: 2, vol: 0.06, type: "highpass", freq: 5000, attack: 0.2 }); for (let i = 0; i < 8; i++) noise({ start: Math.random() * 1.8, dur: 0.03, vol: 0.06, freq: 6000, q: 3 }); },
        hawkerBell() { for (let i = 0; i < 6; i++) bell(1700, i * 0.16, 0.07, 0.3); },
        rain() { noise({ dur: 3, vol: 0.12, type: "lowpass", freq: 2500, attack: 0.5 }); for (let i = 0; i < 14; i++) tone({ freq: 2000 + Math.random() * 2000, start: Math.random() * 2.6, dur: 0.03, vol: 0.02 }); },
        leaves() { for (let i = 0; i < 4; i++) noise({ start: i * 0.25, dur: 0.3, vol: 0.05, freq: 4500, q: 0.7, attack: 0.08 }); bird(1); },
        birds() { bird(0); bird(0.6); bird(1.3); },
        duskBirds() { bird(0); bird(0.4); tone({ freq: 196, dur: 1.6, vol: 0.03, type: "triangle", attack: 0.4 }); },
        waterDrip() { [0, 0.35, 0.6].forEach((s) => tone({ freq: 1400, endFreq: 2400, start: s, dur: 0.08, vol: 0.07 })); },
        storyHum() { [262, 330, 392, 330].forEach((f, i) => tone({ freq: f, start: i * 0.45, dur: 0.6, vol: 0.04, type: "sine", attack: 0.15 })); },
        coins() { for (let i = 0; i < 6; i++) { tone({ freq: 3000 + Math.random() * 1500, start: i * 0.09, dur: 0.12, vol: 0.05 }); } },
        festiveDrum() {
            [0, .3, .45, .6, .9, 1.05, 1.2].forEach((s, i) => { tone({ freq: i % 3 ? 220 : 110, endFreq: 60, start: s, dur: 0.18, vol: 0.18 }); });
            tone({ freq: 880, start: 0.6, dur: 0.6, vol: 0.03, type: "triangle" });
        },
        busEngine() { tone({ freq: 55, dur: 1.8, vol: 0.12, type: "sawtooth", attack: 0.2 }); tone({ freq: 440, start: 1.2, dur: 0.4, vol: 0.06, type: "square" }); tone({ freq: 554, start: 1.2, dur: 0.4, vol: 0.05, type: "square" }); },
        waterLap() { for (let i = 0; i < 3; i++) noise({ start: i * 0.7, dur: 0.6, vol: 0.08, type: "lowpass", freq: 600, attack: 0.25 }); },
        train() {
            for (let i = 0; i < 8; i++) noise({ start: i * 0.2, dur: 0.12, vol: 0.12, freq: 500, q: 0.8 });
            tone({ freq: 523, start: 1.5, dur: 0.8, vol: 0.06, type: "sawtooth", attack: 0.05 });
            tone({ freq: 659, start: 1.5, dur: 0.8, vol: 0.05, type: "sawtooth", attack: 0.05 });
        },
        ferryHorn() { tone({ freq: 110, dur: 1.6, vol: 0.14, type: "sawtooth", attack: 0.1 }); tone({ freq: 138, dur: 1.6, vol: 0.08, type: "sawtooth", attack: 0.1 }); },
        xpChime() { [[622, 0], [932, .15], [831, .3], [622, .6], [932, .75]].forEach(([f, s]) => bell(f, s, 0.07, 1.2)); },
        typing() { for (let i = 0; i < 12; i++) tone({ freq: 3000 + Math.random() * 1500, start: i * 0.09 + Math.random() * 0.04, dur: 0.02, vol: 0.06, type: "square" }); },
        buzz() { tone({ freq: 140, dur: 0.6, vol: 0.12, type: "sawtooth" }); tone({ freq: 147, dur: 0.6, vol: 0.12, type: "sawtooth" }); },
        micAnnounce() {
            noise({ dur: 0.2, vol: 0.1, freq: 2000, q: 2 });
            [300, 340, 280, 360, 320, 300].forEach((f, i) => tone({ freq: f, start: 0.25 + i * 0.18, dur: 0.16, vol: 0.06, type: "sawtooth" }));
        },
        knock() { [0, 0.2, 0.4].forEach((s) => { tone({ freq: 180, endFreq: 90, start: s, dur: 0.08, vol: 0.3 }); noise({ start: s, dur: 0.04, vol: 0.1, freq: 900, q: 1 }); }); },

        cheer() {
            effects.sparkle();
            [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, start: 0.3 + i * 0.1, dur: 0.6, vol: 0.06, type: "triangle" }));
        }
    };

    /* ---------- ambience loops ---------- */

    function ambienceBed(freq, type, vol, q = 0.5) {
        if (type === "lowpass") freq = Math.max(freq, 700);
        vol = vol * 2.2;
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
        for (let i = 0; i < 3; i++) tone({ freq: 4200, start: start + i * 0.045, dur: 0.035, vol: 0.04, type: "sine" });
    }
    function bird(start = 0) {
        const base = 2400 + Math.random() * 1600;
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
            tone({ freq: base, endFreq: base * (1.2 + Math.random() * 0.4), start: start + i * 0.12, dur: 0.09, vol: 0.05 });
        }
    }

    const AMBIENCES = {
        schoolyard: { bed: [500, "bandpass", 0.012], every: 2600, event: () => Math.random() < 0.5 && bird() },
        field:      { bed: [300, "lowpass", 0.01],  every: 1800, event: () => bird() },
        village:    { bed: [700, "lowpass", 0.02],  every: 2200, event: () => bird() },
        home:       { bed: [200, "lowpass", 0.006], every: 4000, event: () => Math.random() < 0.35 && tone({ freq: 2600, dur: 0.02, vol: 0.008, type: "square" }) },
        street:     { bed: [250, "lowpass", 0.03],  every: 5000, event: () => Math.random() < 0.4 && bell(2100, 0, 0.03, 0.4) },
        tvRoom:     { bed: [6000, "highpass", 0.004], every: 0 },
        cyberCafe:  { bed: [140, "lowpass", 0.03],  every: 2500, event: () => Math.random() < 0.4 && tone({ freq: 3000 + Math.random() * 800, dur: 0.02, vol: 0.01, type: "square" }) },
        nightCrickets: { bed: [180, "lowpass", 0.006], every: 1600, event: () => cricket() },
        festival:   { bed: [180, "lowpass", 0.006], every: 2000, event: () => (Math.random() < 0.85 ? cricket() : bell(1568, 0, 0.02, 1.2)) },
        lateNight:  { bed: [160, "lowpass", 0.005], every: 2400, event: () => cricket() }
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
        /* no continuous noise bed any more — it sounded like a constant
           rumble on speakers. Only small, occasional sounds remain. */
        ambience = { nodes: [], timers: [] };
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
