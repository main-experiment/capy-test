const GalleryManager = (() => {
  const STORAGE_KEY = 'stsd-gallery';

  const CG_LIST = [
    { id: 'cg-hug', name: 'Embrace', src: 'assets/gallery/cg-hug.png' },
    { id: 'cg-confession', name: 'Confession', src: 'assets/gallery/cg-confession.png' },
    { id: 'cg-ending-true', name: 'Eternal Garden', src: 'assets/gallery/cg-ending-true.png' },
    { id: 'cg-ending-good', name: 'Morning Light', src: 'assets/gallery/cg-ending-good.png' },
    { id: 'cg-ending-bad', name: 'Fading Ribbons', src: 'assets/gallery/cg-ending-bad.png' }
  ];

  const ENDINGS = ['true', 'good', 'bad'];

  function getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { unlocked: [], endings: [] };
    } catch (e) {
      return { unlocked: [], endings: [] };
    }
  }

  function writeData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Gallery save failed:', e);
    }
  }

  function unlockCG(cgId) {
    const data = getData();
    if (!data.unlocked.includes(cgId)) {
      data.unlocked.push(cgId);
      writeData(data);
    }
  }

  function unlockEnding(endingId) {
    const data = getData();
    if (!data.endings.includes(endingId)) {
      data.endings.push(endingId);
      writeData(data);
    }
  }

  function isCGUnlocked(cgId) {
    return getData().unlocked.includes(cgId);
  }

  function isEndingUnlocked(endingId) {
    return getData().endings.includes(endingId);
  }

  function hasAnyEnding() {
    return getData().endings.length > 0;
  }

  function getUnlockedCGs() {
    return getData().unlocked;
  }

  return {
    CG_LIST,
    ENDINGS,
    unlockCG,
    unlockEnding,
    isCGUnlocked,
    isEndingUnlocked,
    hasAnyEnding,
    getUnlockedCGs,
    getData
  };
})();
