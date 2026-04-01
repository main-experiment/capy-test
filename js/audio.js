const AudioManager = (() => {
  let bgmVolume = 0.7;
  let sfxVolume = 0.7;
  let currentBGM = null;
  let currentBGMSrc = '';

  function setBGMVolume(v) {
    bgmVolume = v;
    if (currentBGM) currentBGM.volume = bgmVolume;
  }

  function setSFXVolume(v) {
    sfxVolume = v;
  }

  function playBGM(src) {
    if (!src) { stopBGM(); return; }
    if (src === currentBGMSrc && currentBGM && !currentBGM.paused) return;
    stopBGM();
    try {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = bgmVolume;
      audio.play().catch(e => console.warn('BGM not available:', src, e.message));
      currentBGM = audio;
      currentBGMSrc = src;
    } catch (e) {
      console.warn('BGM load failed:', src, e.message);
    }
  }

  function stopBGM() {
    if (currentBGM) {
      currentBGM.pause();
      currentBGM.src = '';
      currentBGM = null;
      currentBGMSrc = '';
    }
  }

  function crossfadeBGM(newSrc, duration = 1000) {
    if (!newSrc) { stopBGM(); return; }
    if (newSrc === currentBGMSrc) return;
    const old = currentBGM;
    if (old) {
      const fadeOut = setInterval(() => {
        if (old.volume > 0.05) {
          old.volume = Math.max(0, old.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          old.pause();
          old.src = '';
        }
      }, duration / 20);
    }
    try {
      const audio = new Audio(newSrc);
      audio.loop = true;
      audio.volume = 0;
      audio.play().then(() => {
        const fadeIn = setInterval(() => {
          if (audio.volume < bgmVolume - 0.05) {
            audio.volume = Math.min(bgmVolume, audio.volume + 0.05);
          } else {
            audio.volume = bgmVolume;
            clearInterval(fadeIn);
          }
        }, duration / 20);
      }).catch(e => console.warn('BGM crossfade not available:', newSrc, e.message));
      currentBGM = audio;
      currentBGMSrc = newSrc;
    } catch (e) {
      console.warn('BGM crossfade load failed:', newSrc, e.message);
    }
  }

  function playSFX(src) {
    if (!src) return;
    try {
      const audio = new Audio(src);
      audio.volume = sfxVolume;
      audio.play().catch(e => console.warn('SFX not available:', src, e.message));
    } catch (e) {
      console.warn('SFX load failed:', src, e.message);
    }
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
