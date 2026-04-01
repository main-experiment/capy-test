const AudioManager = (() => {
  let bgmVolume = 0.7;
  let sfxVolume = 0.7;
  let sfxBus = null;
  let clickSynth = null;
  let chimeSynth = null;
  let heartbeatSynth = null;
  let sparkleSynth = null;
  let whooshSynth = null;
  let whooshFilter = null;

  function toneReady() {
    return typeof Tone !== 'undefined';
  }

  function initSFX() {
    if (!toneReady() || sfxBus) return;
    sfxBus = new Tone.Gain(sfxVolume).toDestination();
    clickSynth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.08 },
      volume: -12
    }).connect(sfxBus);
    chimeSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 1.2 },
      volume: -8
    }).connect(sfxBus);
    heartbeatSynth = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 3,
      envelope: { attack: 0.001, decay: 0.25, sustain: 0, release: 0.2 },
      volume: -6
    }).connect(sfxBus);
    sparkleSynth = new Tone.MetalSynth({
      frequency: 420,
      envelope: { attack: 0.001, decay: 0.3, release: 0.15 },
      harmonicity: 5.1,
      modulationIndex: 24,
      resonance: 3000,
      octaves: 1.8,
      volume: -16
    }).connect(sfxBus);
    whooshFilter = new Tone.Filter(1200, 'lowpass').connect(sfxBus);
    whooshSynth = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.01, decay: 0.25, sustain: 0, release: 0.2 },
      volume: -18
    }).connect(whooshFilter);
  }

  function setBGMVolume(v) {
    bgmVolume = Math.max(0, Math.min(1, Number(v) || 0));
    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.setVolume(bgmVolume);
    }
  }

  function setSFXVolume(v) {
    sfxVolume = Math.max(0, Math.min(1, Number(v) || 0));
    if (sfxBus) {
      sfxBus.gain.rampTo(sfxVolume, 0.1);
    }
  }

  function playBGM(mood) {
    if (!mood) {
      stopBGM();
      return;
    }
    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.init();
      MusicEngine.setVolume(bgmVolume);
      MusicEngine.setMood(mood);
    }
  }

  function stopBGM() {
    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.stop();
    }
  }

  function crossfadeBGM(mood) {
    playBGM(mood);
  }

  function playSFX(name) {
    if (!name || !toneReady()) return;
    initSFX();
    Tone.start().catch(() => {});

    switch (name) {
      case 'heartbeat':
        heartbeatSynth.triggerAttackRelease('C2', '8n', undefined, 0.9 * sfxVolume);
        setTimeout(() => {
          heartbeatSynth.triggerAttackRelease('G1', '16n', undefined, 0.6 * sfxVolume);
        }, 120);
        break;
      case 'chime':
        chimeSynth.triggerAttackRelease('C5', '8n', undefined, 0.7 * sfxVolume);
        chimeSynth.triggerAttackRelease('G5', '4n', '+0.08', 0.45 * sfxVolume);
        break;
      case 'whoosh':
        whooshFilter.frequency.cancelAndHoldAtTime(Tone.now());
        whooshFilter.frequency.setValueAtTime(400, Tone.now());
        whooshFilter.frequency.linearRampToValueAtTime(3200, Tone.now() + 0.25);
        whooshSynth.triggerAttackRelease('8n', undefined, 0.7 * sfxVolume);
        break;
      case 'sparkle':
        sparkleSynth.triggerAttackRelease('16n', undefined, 0.6 * sfxVolume);
        clickSynth.triggerAttackRelease('E6', '16n', '+0.05', 0.45 * sfxVolume);
        chimeSynth.triggerAttackRelease('C6', '8n', '+0.1', 0.35 * sfxVolume);
        break;
      case 'click':
      default:
        clickSynth.triggerAttackRelease('C6', '32n', undefined, 0.45 * sfxVolume);
        break;
    }
  }

  if (typeof MusicEngine !== 'undefined') {
    MusicEngine.init();
    MusicEngine.setVolume(bgmVolume);
  }

  return {
    setBGMVolume,
    setSFXVolume,
    playBGM,
    stopBGM,
    crossfadeBGM,
    playSFX,
    getBGMVolume: () => bgmVolume,
    getSFXVolume: () => sfxVolume
  };
})();
