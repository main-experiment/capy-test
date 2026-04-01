window.MusicEngine = (() => {
  const noop = {
    init() {},
    setMood() {},
    setAffection() {},
    setVolume() {},
    stop() {},
    isPlaying() { return false; },
    getCurrentMood() { return null; }
  };

  try {
    const TONE_CDN = 'https://cdn.jsdelivr.net/npm/tone@15.1.22/build/Tone.min.js';

    const MOODS = {
      title: {
        tempo: 72,
        key: 'C4',
        scale: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'],
        chords: [['C4', 'E4', 'G4'], ['Am3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']],
        padVolume: -18,
        melodyVolume: -12,
        arpeggioVolume: -22,
        atmosphereVolume: -30,
        melodyPattern: 'sparse',
        arpeggioPattern: 'gentle',
        swingFeel: 0
      },
      mysterious: {
        tempo: 66,
        key: 'A3',
        scale: ['A3', 'B3', 'C4', 'E4', 'F4', 'A4', 'B4', 'C5'],
        chords: [['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['E3', 'G3', 'B3'], ['A3', 'C4', 'E4']],
        padVolume: -16,
        melodyVolume: -14,
        arpeggioVolume: -24,
        atmosphereVolume: -26,
        melodyPattern: 'wandering',
        arpeggioPattern: 'sparse',
        swingFeel: 0
      },
      playful: {
        tempo: 108,
        key: 'F4',
        scale: ['F4', 'G4', 'A4', 'Bb4', 'C5', 'D5', 'F5'],
        chords: [['F3', 'A3', 'C4'], ['Bb3', 'D4', 'F4'], ['C4', 'E4', 'G4'], ['F3', 'A3', 'C4']],
        padVolume: -20,
        melodyVolume: -10,
        arpeggioVolume: -16,
        atmosphereVolume: -32,
        melodyPattern: 'bouncy',
        arpeggioPattern: 'quick',
        swingFeel: 0.1
      },
      cozy: {
        tempo: 84,
        key: 'G4',
        scale: ['G3', 'A3', 'B3', 'D4', 'E4', 'G4', 'A4', 'B4'],
        chords: [['G3', 'B3', 'D4'], ['C3', 'E3', 'G3'], ['Em3', 'G3', 'B3'], ['D3', 'F#3', 'A3']],
        padVolume: -18,
        melodyVolume: -10,
        arpeggioVolume: -20,
        atmosphereVolume: -28,
        melodyPattern: 'gentle',
        arpeggioPattern: 'gentle',
        swingFeel: 0.05
      },
      romantic: {
        tempo: 76,
        key: 'Eb4',
        scale: ['Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5', 'D5', 'Eb5'],
        chords: [['Eb3', 'G3', 'Bb3'], ['Ab3', 'C4', 'Eb4'], ['Bb3', 'D4', 'F4'], ['Eb3', 'G3', 'Bb3']],
        padVolume: -14,
        melodyVolume: -10,
        arpeggioVolume: -18,
        atmosphereVolume: -24,
        melodyPattern: 'lyrical',
        arpeggioPattern: 'flowing',
        swingFeel: 0
      },
      emotional: {
        tempo: 68,
        key: 'D4',
        scale: ['D4', 'E4', 'F4', 'A4', 'Bb4', 'D5'],
        chords: [['D3', 'F3', 'A3'], ['Bb2', 'D3', 'F3'], ['G3', 'Bb3', 'D4'], ['A3', 'C4', 'E4']],
        padVolume: -14,
        melodyVolume: -8,
        arpeggioVolume: -26,
        atmosphereVolume: -22,
        melodyPattern: 'expressive',
        arpeggioPattern: 'sparse',
        swingFeel: 0
      },
      dream: {
        tempo: 56,
        key: 'B3',
        scale: ['B3', 'C#4', 'D#4', 'F#4', 'G#4', 'B4', 'C#5'],
        chords: [['B3', 'D#4', 'F#4'], ['G#3', 'B3', 'D#4'], ['E3', 'G#3', 'B3'], ['F#3', 'A#3', 'C#4']],
        padVolume: -12,
        melodyVolume: -14,
        arpeggioVolume: -16,
        atmosphereVolume: -18,
        melodyPattern: 'ethereal',
        arpeggioPattern: 'shimmering',
        swingFeel: 0
      },
      confession: {
        tempo: 80,
        key: 'Ab4',
        scale: ['Ab3', 'Bb3', 'C4', 'Db4', 'Eb4', 'F4', 'G4', 'Ab4'],
        chords: [['Ab3', 'C4', 'Eb4'], ['Db3', 'F3', 'Ab3'], ['Eb3', 'G3', 'Bb3'], ['Ab3', 'C4', 'Eb4']],
        padVolume: -12,
        melodyVolume: -8,
        arpeggioVolume: -14,
        atmosphereVolume: -24,
        melodyPattern: 'building',
        arpeggioPattern: 'flowing',
        swingFeel: 0
      },
      tension: {
        tempo: 60,
        key: 'C4',
        scale: ['C4', 'Db4', 'E4', 'F4', 'G4', 'Ab4', 'B4'],
        chords: [['C3', 'Eb3', 'G3'], ['Ab2', 'C3', 'Eb3'], ['G2', 'B2', 'D3'], ['C3', 'Eb3', 'G3']],
        padVolume: -16,
        melodyVolume: -18,
        arpeggioVolume: -28,
        atmosphereVolume: -20,
        melodyPattern: 'minimal',
        arpeggioPattern: 'heartbeat',
        swingFeel: 0
      },
      'ending-true': {
        tempo: 88,
        key: 'C4',
        scale: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
        chords: [['C3', 'E3', 'G3'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']],
        padVolume: -12,
        melodyVolume: -6,
        arpeggioVolume: -14,
        atmosphereVolume: -26,
        melodyPattern: 'triumphant',
        arpeggioPattern: 'flowing',
        swingFeel: 0
      },
      'ending-good': {
        tempo: 78,
        key: 'F4',
        scale: ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4', 'F4'],
        chords: [['F3', 'A3', 'C4'], ['Dm3', 'F3', 'A3'], ['Bb3', 'D4', 'F4'], ['C4', 'E4', 'G4']],
        padVolume: -14,
        melodyVolume: -8,
        arpeggioVolume: -18,
        atmosphereVolume: -24,
        melodyPattern: 'gentle',
        arpeggioPattern: 'gentle',
        swingFeel: 0
      },
      'ending-bad': {
        tempo: 54,
        key: 'E3',
        scale: ['E3', 'F#3', 'G3', 'B3', 'C4', 'E4'],
        chords: [['E3', 'G3', 'B3'], ['C3', 'E3', 'G3'], ['A2', 'C3', 'E3'], ['B2', 'D3', 'F#3']],
        padVolume: -14,
        melodyVolume: -10,
        arpeggioVolume: -28,
        atmosphereVolume: -20,
        melodyPattern: 'melancholic',
        arpeggioPattern: 'sparse',
        swingFeel: 0
      }
    };

    const state = {
      initialized: false,
      playing: false,
      currentMood: null,
      affection: 0,
      volume: 0.7,
      toneStarted: false,
      toneLoadPromise: null,
      pendingMood: null,
      pendingSetTimer: null,
      pendingStopTimer: null,
      buses: null,
      synths: null,
      effects: null,
      patterns: {
        pad: null,
        melody: null,
        arpeggio: null
      }
    };

    const SILENT_DB = -72;
    const TRANSITION_SECONDS = 2;
    const PATTERN_BARS = 4;


    function toneReady() {
      return typeof Tone !== 'undefined';
    }

    function getToneScriptSrc() {
      const deferredScript = document.getElementById('tone-script');
      return deferredScript?.dataset?.src || TONE_CDN;
    }

    function loadTone() {
      if (toneReady()) return Promise.resolve(Tone);
      if (state.toneLoadPromise) return state.toneLoadPromise;

      state.toneLoadPromise = new Promise((resolve, reject) => {
        const existingScript = document.querySelector('script[data-tone-runtime="true"]');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve(Tone), { once: true });
          existingScript.addEventListener('error', reject, { once: true });
          return;
        }

        const script = document.createElement('script');
        script.src = getToneScriptSrc();
        script.async = true;
        script.dataset.toneRuntime = 'true';
        script.onload = () => {
          if (toneReady()) resolve(Tone);
          else reject(new Error('Tone.js failed to initialize'));
        };
        script.onerror = reject;
        document.head.appendChild(script);
      }).catch(error => {
        state.toneLoadPromise = null;
        throw error;
      });

      return state.toneLoadPromise;
    }

    async function ensureToneStarted() {
      if (state.toneStarted) return true;
      await loadTone();
      await Tone.start();
      state.toneStarted = true;
      init();
      if (state.pendingMood) {
        const nextMood = state.pendingMood;
        state.pendingMood = null;
        internalSetMood(nextMood);
      }
      return true;
    }

    document.addEventListener('click', () => {
      ensureToneStarted().catch(() => {});
    }, { once: true });
    document.addEventListener('touchstart', () => {
      ensureToneStarted().catch(() => {});
    }, { once: true });

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function normalizedToDb(value) {
      return -48 + (clamp(value, 0, 1) * 48);
    }

    function stripChordQuality(note) {
      return note.replace(/^([A-G](?:#|b)?)(m)(\d)$/, '$1$3');
    }

    function noteToMidi(note) {
      return Tone.Frequency(stripChordQuality(note)).toMidi();
    }

    function midiToNote(midi) {
      return Tone.Frequency(midi, 'midi').toNote();
    }

    function pick(items) {
      return items[Math.floor(Math.random() * items.length)] || items[0];
    }

    function stepIndex(index, delta, length) {
      return (index + delta + length) % length;
    }

    function noteAt(scale, index, octaveShift = 0) {
      const base = scale[((index % scale.length) + scale.length) % scale.length];
      return midiToNote(noteToMidi(base) + (octaveShift * 12));
    }

    function rootNote(scale, octaveShift = 0) {
      return noteAt(scale, 0, octaveShift);
    }

    function createTime(bar, eighth = 0, sixteenth = 0) {
      return `${bar}:${eighth}:${sixteenth}`;
    }

    function sortEventsByTime(a, b) {
      const [aBar, aEighth, aSixteenth] = a.time.split(':').map(Number);
      const [bBar, bEighth, bSixteenth] = b.time.split(':').map(Number);
      return (aBar * 64 + aEighth * 8 + aSixteenth) - (bBar * 64 + bEighth * 8 + bSixteenth);
    }

    function dedupeEventsByTime(events) {
      const deduped = {};
      events.forEach(event => {
        deduped[event.time] = event;
      });
      return Object.values(deduped).sort(sortEventsByTime);
    }

    function init() {
      if (state.initialized) return;
      if (!state.toneStarted) return;

      const master = new Tone.Volume(normalizedToDb(state.volume)).toDestination();
      const padBus = new Tone.Volume(SILENT_DB).connect(master);
      const melodyBus = new Tone.Volume(SILENT_DB).connect(master);
      const arpeggioBus = new Tone.Volume(SILENT_DB).connect(master);
      const atmosphereBus = new Tone.Volume(SILENT_DB).connect(master);

      const padReverb = new Tone.Reverb({ decay: 4, wet: 0.45 }).connect(padBus);
      const padFilter = new Tone.AutoFilter({ frequency: 0.05, baseFrequency: 180, octaves: 3, depth: 0.35, wet: 0.25 }).connect(padReverb).start();
      const padSynth = new Tone.PolySynth(Tone.FMSynth, {
        maxPolyphony: 6,
        volume: -2,
        oscillator: { type: 'sine' },
        envelope: { attack: 1.2, decay: 0.4, sustain: 0.8, release: 3.5 },
        modulation: { type: 'triangle' },
        modulationEnvelope: { attack: 0.8, decay: 0.3, sustain: 0.7, release: 2.5 },
        harmonicity: 1.2
      }).connect(padFilter);

      const melodyReverb = new Tone.Reverb({ decay: 2, wet: 0.28 }).connect(melodyBus);
      const melodyDelay = new Tone.FeedbackDelay({ delayTime: '8n', feedback: 0.2, wet: 0.2 }).connect(melodyReverb);
      const melodySynth = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.05, decay: 0.15, sustain: 0.2, release: 1.8 },
        volume: -4
      }).connect(melodyDelay);

      const arpDelay = new Tone.PingPongDelay({ delayTime: '8n', feedback: 0.15, wet: 0.2 }).connect(arpeggioBus);
      const arpChorus = new Tone.Chorus({ frequency: 1.8, delayTime: 2.2, depth: 0.35, wet: 0.3 }).connect(arpDelay).start();
      const arpSynth = new Tone.Synth({
        oscillator: { type: 'square' },
        envelope: { attack: 0.01, decay: 0.08, sustain: 0.1, release: 0.6 },
        volume: -10
      }).connect(arpChorus);

      const atmosphereFilter = new Tone.Filter({ frequency: 700, type: 'lowpass', rolloff: -24 });
      const atmosphereAutoFilter = new Tone.AutoFilter({ frequency: 0.03, baseFrequency: 120, octaves: 2.5, depth: 0.5, wet: 0.35 }).connect(atmosphereBus).start();
      const atmosphereNoise = new Tone.Noise('pink').connect(atmosphereFilter);
      atmosphereFilter.connect(atmosphereAutoFilter);
      atmosphereNoise.start();

      state.buses = { master, pad: padBus, melody: melodyBus, arpeggio: arpeggioBus, atmosphere: atmosphereBus };
      state.synths = { pad: padSynth, melody: melodySynth, arpeggio: arpSynth, atmosphere: atmosphereNoise };
      state.effects = {
        padFilter,
        padReverb,
        melodyReverb,
        melodyDelay,
        arpDelay,
        arpChorus,
        atmosphereFilter,
        atmosphereAutoFilter
      };

      Tone.Transport.loop = true;
      Tone.Transport.loopEnd = `${PATTERN_BARS}m`;
      Tone.Transport.swingSubdivision = '8n';
      Tone.Transport.swing = 0;
      state.initialized = true;
    }

    function setBusVolume(busName, value, seconds = 0) {
      if (!state.buses || !state.buses[busName]) return;
      const db = Number.isFinite(value) ? value : SILENT_DB;
      if (seconds > 0) {
        state.buses[busName].volume.cancelAndHoldAtTime(Tone.now());
        state.buses[busName].volume.rampTo(db, seconds);
      } else {
        state.buses[busName].volume.value = db;
      }
    }

    function setAllLayerVolumes(targets, seconds = 0) {
      setBusVolume('pad', targets.pad, seconds);
      setBusVolume('melody', targets.melody, seconds);
      setBusVolume('arpeggio', targets.arpeggio, seconds);
      setBusVolume('atmosphere', targets.atmosphere, seconds);
    }

    function getLayerTargets(mood) {
      const melodyBoost = state.affection * 0.6;
      const atmosphereLift = Math.min(1.5, state.affection * 0.2);
      return {
        pad: mood.padVolume,
        melody: mood.melodyVolume + melodyBoost,
        arpeggio: mood.arpeggioVolume,
        atmosphere: mood.atmosphereVolume + atmosphereLift
      };
    }

    function startTransportIfNeeded() {
      if (Tone.Transport.state !== 'started') {
        Tone.Transport.start('+0.05');
      }
    }

    function stopTransportIfNeeded() {
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop();
      }
    }

    function disposePatterns() {
      Object.keys(state.patterns).forEach(key => {
        const pattern = state.patterns[key];
        if (pattern) {
          try {
            pattern.stop();
            pattern.dispose();
          } catch (_) {}
          state.patterns[key] = null;
        }
      });
    }

    function normalizedChord(chord) {
      return chord.map(stripChordQuality);
    }

    function widenChord(chord) {
      const base = normalizedChord(chord);
      if (state.affection <= 0) return base;
      const widened = [...base];
      if (state.affection >= 2) {
        widened.push(midiToNote(noteToMidi(base[0]) + 12));
      }
      if (state.affection >= 4) {
        widened.push(midiToNote(noteToMidi(base[Math.min(1, base.length - 1)]) + 12));
      }
      return widened;
    }

    function atmosphereSettings(moodName, mood) {
      const configs = {
        title: { filter: 950, lfo: 0.04 },
        mysterious: { filter: 620, lfo: 0.025 },
        playful: { filter: 1200, lfo: 0.08 },
        cozy: { filter: 820, lfo: 0.05 },
        romantic: { filter: 880, lfo: 0.035 },
        emotional: { filter: 700, lfo: 0.03 },
        dream: { filter: 520, lfo: 0.02 },
        confession: { filter: 930, lfo: 0.045 },
        tension: { filter: 460, lfo: 0.018 },
        'ending-true': { filter: 1100, lfo: 0.05 },
        'ending-good': { filter: 900, lfo: 0.04 },
        'ending-bad': { filter: 500, lfo: 0.02 }
      };
      return configs[moodName] || { filter: 800, lfo: clamp(mood.tempo / 1800, 0.02, 0.08) };
    }

    function applyMoodSound(moodName, mood) {
      if (!state.initialized) init();

      const atm = atmosphereSettings(moodName, mood);
      state.effects.atmosphereFilter.frequency.rampTo(atm.filter, 1.5);
      state.effects.atmosphereAutoFilter.frequency.rampTo(atm.lfo, 1.5);
      state.effects.padFilter.baseFrequency = mood.tempo > 90 ? 240 : 180;
      state.effects.padFilter.depth.value = mood.swingFeel > 0 ? 0.45 : 0.3;
      state.effects.melodyDelay.delayTime.rampTo(Tone.Time(mood.tempo < 70 ? '4n' : '8n').toSeconds(), 0.2);
      state.effects.arpDelay.delayTime.rampTo(Tone.Time(mood.arpeggioPattern === 'shimmering' ? '16n' : '8n').toSeconds(), 0.2);
      state.effects.arpChorus.depth = mood.arpeggioPattern === 'shimmering' ? 0.5 : 0.35;
      state.synths.melody.detune.value = state.affection * 4;
      state.synths.arpeggio.detune.value = state.affection * 2;
      state.synths.pad.set({ detune: state.affection * 3, harmonicity: 1.2 + (state.affection * 0.04) });
    }

    function generateMelodyEvents(mood) {
      const scale = [...mood.scale];
      const events = [];
      let index = Math.min(2, scale.length - 1);

      const add = (bar, eighth, sixteenth, note, duration, velocity) => {
        events.push({ time: createTime(bar, eighth, sixteenth), note, duration, velocity });
      };

      const maybeResolveToRoot = (bar, preferredEighth = 6) => {
        if (state.affection >= 3 && (bar % 2 === 1 || state.affection >= 5)) {
          add(bar, preferredEighth, 0, rootNote(scale, 1), '8n', 0.34 + (state.affection * 0.04));
        }
      };

      switch (mood.melodyPattern) {
        case 'sparse':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            const count = Math.random() > 0.5 ? 2 : 1;
            const slots = count === 2 ? [0, 4] : [pick([0, 2, 4])];
            slots.forEach((slot, idx) => {
              const note = noteAt(scale, index + idx, idx > 0 ? 1 : 0);
              add(bar, slot, 0, note, idx > 0 ? '2n' : '4n', 0.24 + (state.affection * 0.03));
            });
            maybeResolveToRoot(bar);
          }
          break;
        case 'wandering':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            [0, 4, 6].forEach(slot => {
              index = stepIndex(index, pick([-2, -1, 1, 2]), scale.length);
              add(bar, slot, 0, noteAt(scale, index), slot === 6 ? '8n' : '4n', 0.25 + (state.affection * 0.025));
            });
          }
          maybeResolveToRoot(3, 6);
          break;
        case 'bouncy':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            for (let slot = 0; slot < 8; slot += 2) {
              const jump = slot % 4 === 0 ? 1 : -1;
              index = stepIndex(index, jump, scale.length);
              add(bar, slot, 0, noteAt(scale, index, slot % 4 === 0 ? 1 : 0), '8n', 0.28 + (state.affection * 0.03));
            }
            maybeResolveToRoot(bar);
          }
          break;
        case 'gentle':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            [0, 2, 4, 6].forEach(slot => {
              index = stepIndex(index, pick([-1, 0, 1]), scale.length);
              add(bar, slot, 0, noteAt(scale, index), slot === 6 ? '8n' : '4n', 0.26 + (state.affection * 0.025));
            });
            maybeResolveToRoot(bar);
          }
          break;
        case 'lyrical':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            const phrase = [0, 2, 4, 6];
            phrase.forEach((slot, phraseIndex) => {
              index = stepIndex(index, pick([1, 2, -1, 3]), scale.length);
              const octaveShift = phraseIndex >= 2 ? 1 : 0;
              add(bar, slot, 0, noteAt(scale, index, octaveShift), phraseIndex % 2 === 0 ? '4n' : '8n', 0.3 + (state.affection * 0.03));
            });
          }
          maybeResolveToRoot(3, 6);
          break;
        case 'expressive':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            const slots = bar >= 2 ? [0, 4, 6] : [0, 4];
            slots.forEach((slot, phraseIndex) => {
              index = stepIndex(index, pick([-3, -2, 2, 3]), scale.length);
              add(bar, slot, 0, noteAt(scale, index, phraseIndex === 0 ? 0 : 1), slot === 4 ? '2n' : '8n', 0.3 + (bar * 0.04) + (state.affection * 0.025));
            });
          }
          maybeResolveToRoot(3, 6);
          break;
        case 'ethereal':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            const slots = pick([[0, 6], [2, 6], [0, 4, 7]]);
            slots.forEach(slot => {
              index = stepIndex(index, pick([-2, -1, 1, 2]), scale.length);
              add(bar, slot, 0, noteAt(scale, index, 1), '8n', 0.2 + (state.affection * 0.02));
            });
          }
          maybeResolveToRoot(3, 7);
          break;
        case 'building':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            const density = Math.min(4, bar + 1);
            const slots = [0, 2, 4, 6].slice(0, density);
            slots.forEach(slot => {
              index = stepIndex(index, pick([1, 1, 2, -1]), scale.length);
              add(bar, slot, 0, noteAt(scale, index, bar >= 2 ? 1 : 0), '8n', 0.24 + (bar * 0.05) + (state.affection * 0.025));
            });
            maybeResolveToRoot(bar);
          }
          break;
        case 'minimal':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            add(bar, 0, 0, rootNote(scale), '4n', 0.22 + (state.affection * 0.02));
            if (bar % 2 === 1) {
              add(bar, 4, 0, rootNote(scale, 1), '8n', 0.26 + (state.affection * 0.03));
            }
          }
          break;
        case 'triumphant':
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            for (let slot = 0; slot < 8; slot++) {
              index = stepIndex(index, 1, scale.length);
              add(bar, slot, 0, noteAt(scale, index, slot >= 4 ? 1 : 0), '8n', 0.3 + (state.affection * 0.03));
            }
          }
          add(3, 7, 0, rootNote(scale, 1), '8n', 0.45 + (state.affection * 0.03));
          break;
        case 'melancholic':
          index = scale.length - 1;
          for (let bar = 0; bar < PATTERN_BARS; bar++) {
            [0, 2, 4, 6].forEach(slot => {
              index = stepIndex(index, pick([-2, -1, -1]), scale.length);
              add(bar, slot, 0, noteAt(scale, index), slot === 6 ? '8n' : '4n', 0.24 + (state.affection * 0.02));
            });
          }
          add(3, 6, 0, rootNote(scale), '8n', 0.28 + (state.affection * 0.025));
          break;
        default:
          add(0, 0, 0, rootNote(scale), '2n', 0.25);
          break;
      }

      return dedupeEventsByTime(events);
    }

    function generateArpeggioEvents(mood) {
      const events = [];
      const chords = mood.chords.map(normalizedChord);
      const add = (time, note, duration, velocity) => {
        events.push({ time, note, duration, velocity });
      };

      for (let bar = 0; bar < PATTERN_BARS; bar++) {
        const chord = chords[bar % chords.length];
        const tones = state.affection >= 4
          ? [...chord, midiToNote(noteToMidi(chord[0]) + 12)]
          : [...chord];
        const highTones = tones.map((note, idx) => idx < chord.length ? midiToNote(noteToMidi(note) + 12) : note);

        switch (mood.arpeggioPattern) {
          case 'gentle':
            [0, 2, 4, 6].forEach((slot, idx) => {
              add(createTime(bar, slot, 0), tones[idx % tones.length], '8n', 0.18 + (state.affection * 0.015));
            });
            break;
          case 'quick':
            for (let slot = 0; slot < 8; slot++) {
              const tone = slot % 2 === 0 ? tones[slot % tones.length] : highTones[slot % highTones.length];
              add(createTime(bar, slot, 0), tone, '16n', 0.2 + (state.affection * 0.015));
            }
            break;
          case 'sparse':
            [0, 4].forEach((slot, idx) => {
              add(createTime(bar, slot, 0), tones[idx % tones.length], '8n', 0.16 + (state.affection * 0.015));
            });
            break;
          case 'flowing':
            for (let slot = 0; slot < 8; slot++) {
              const forward = slot < 4;
              const source = forward ? highTones : [...highTones].reverse();
              add(createTime(bar, slot, 0), source[slot % source.length], '8n', 0.2 + (state.affection * 0.015));
            }
            break;
          case 'shimmering':
            [0, 4].forEach(start => {
              for (let sixteenth = 0; sixteenth < 4; sixteenth++) {
                add(createTime(bar, start, sixteenth), highTones[sixteenth % highTones.length], '32n', 0.16 + (state.affection * 0.015));
              }
            });
            break;
          case 'heartbeat':
            add(createTime(bar, 0, 0), tones[0], '8n', 0.24 + (state.affection * 0.015));
            add(createTime(bar, 1, 0), tones[Math.min(1, tones.length - 1)], '16n', 0.18 + (state.affection * 0.015));
            add(createTime(bar, 4, 0), tones[0], '8n', 0.24 + (state.affection * 0.015));
            add(createTime(bar, 5, 0), tones[Math.min(1, tones.length - 1)], '16n', 0.18 + (state.affection * 0.015));
            break;
          default:
            add(createTime(bar, 0, 0), tones[0], '8n', 0.18);
            break;
        }
      }

      return dedupeEventsByTime(events);
    }

    function createPadPart(mood) {
      const part = new Tone.Part((time, data) => {
        state.synths.pad.triggerAttackRelease(widenChord(data.chord), data.duration, time, data.velocity);
      }, mood.chords.map((chord, index) => ({
        time: `${index}m`,
        chord,
        duration: '1m',
        velocity: 0.28 + (state.affection * 0.025)
      })));
      part.loop = true;
      part.loopEnd = `${PATTERN_BARS}m`;
      return part;
    }

    function createMelodyPart(mood) {
      const part = new Tone.Part((time, data) => {
        state.synths.melody.triggerAttackRelease(data.note, data.duration, time, data.velocity);
      }, generateMelodyEvents(mood));
      part.loop = true;
      part.loopEnd = `${PATTERN_BARS}m`;
      part.humanize = 0.015;
      return part;
    }

    function createArpeggioPart(mood) {
      const part = new Tone.Part((time, data) => {
        state.synths.arpeggio.triggerAttackRelease(data.note, data.duration, time, data.velocity);
      }, generateArpeggioEvents(mood));
      part.loop = true;
      part.loopEnd = `${PATTERN_BARS}m`;
      return part;
    }

    function startPatterns(moodName) {
      const mood = MOODS[moodName] || MOODS.title;
      applyMoodSound(moodName, mood);
      Tone.Transport.bpm.rampTo(mood.tempo, TRANSITION_SECONDS);
      Tone.Transport.swing = mood.swingFeel || 0;
      Tone.Transport.loopEnd = `${PATTERN_BARS}m`;

      state.patterns.pad = createPadPart(mood);
      state.patterns.melody = createMelodyPart(mood);
      state.patterns.arpeggio = createArpeggioPart(mood);

      Tone.Transport.position = '0:0:0';
      const startOffset = '+0.01';
      state.patterns.pad.start(startOffset);
      state.patterns.melody.start(startOffset);
      state.patterns.arpeggio.start(startOffset);
    }

    function internalSetMood(moodName) {
      if (!MOODS[moodName]) moodName = 'title';
      init();

      if (state.currentMood === moodName && state.playing) return;

      clearTimeout(state.pendingSetTimer);
      clearTimeout(state.pendingStopTimer);

      const mood = MOODS[moodName];
      state.currentMood = moodName;
      startTransportIfNeeded();

      if (!state.playing) {
        disposePatterns();
        setAllLayerVolumes({ pad: SILENT_DB, melody: SILENT_DB, arpeggio: SILENT_DB, atmosphere: SILENT_DB });
        startPatterns(moodName);
        setAllLayerVolumes(getLayerTargets(mood), TRANSITION_SECONDS);
        state.playing = true;
        return;
      }

      setAllLayerVolumes({ pad: SILENT_DB, melody: SILENT_DB, arpeggio: SILENT_DB, atmosphere: SILENT_DB }, TRANSITION_SECONDS / 2);

      state.pendingSetTimer = setTimeout(() => {
        disposePatterns();
        setAllLayerVolumes({ pad: SILENT_DB, melody: SILENT_DB, arpeggio: SILENT_DB, atmosphere: SILENT_DB });
        startPatterns(moodName);
        setAllLayerVolumes(getLayerTargets(mood), TRANSITION_SECONDS / 2);
        state.playing = true;
      }, (TRANSITION_SECONDS * 500));
    }

    function setMood(moodName) {
      if (!moodName) {
        stop();
        return;
      }
      if (!state.toneStarted) {
        state.pendingMood = moodName;
        state.currentMood = moodName;
        return;
      }
      init();
      internalSetMood(moodName);
    }

    function setAffection(level) {
      state.affection = clamp(Number(level) || 0, 0, 5);
      if (!state.initialized) return;
      if (state.currentMood && state.playing) {
        const mood = MOODS[state.currentMood] || MOODS.title;
        applyMoodSound(state.currentMood, mood);
        setAllLayerVolumes(getLayerTargets(mood), 1.2);
        clearTimeout(state.pendingSetTimer);
        disposePatterns();
        startPatterns(state.currentMood);
      }
    }

    function setVolume(normalized) {
      state.volume = clamp(Number(normalized) || 0, 0, 1);
      init();
      if (!state.initialized || !state.buses || !state.buses.master) return;
      state.buses.master.volume.rampTo(normalizedToDb(state.volume), 0.3);
    }

    function stop() {
      clearTimeout(state.pendingSetTimer);
      clearTimeout(state.pendingStopTimer);
      state.pendingMood = null;
      if (!state.initialized) {
        state.currentMood = null;
        state.playing = false;
        return;
      }
      setAllLayerVolumes({ pad: SILENT_DB, melody: SILENT_DB, arpeggio: SILENT_DB, atmosphere: SILENT_DB }, TRANSITION_SECONDS);
      state.pendingStopTimer = setTimeout(() => {
        disposePatterns();
        stopTransportIfNeeded();
        Tone.Transport.position = '0:0:0';
        state.currentMood = null;
        state.playing = false;
      }, TRANSITION_SECONDS * 1000);
    }

    return {
      init,
      setMood,
      setAffection,
      setVolume,
      stop,
      isPlaying() {
        return state.playing;
      },
      getCurrentMood() {
        return state.currentMood;
      }
    };
  } catch (error) {
    console.warn('MusicEngine unavailable:', error);
    return noop;
  }
})();
