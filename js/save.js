const SaveManager = (() => {
  const STORAGE_KEY = 'stsd-saves';
  const SLOT_COUNT = 6;

  function getAllSaves() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('Failed to load saves:', e);
      return {};
    }
  }

  function writeSaves(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to write saves:', e);
    }
  }

  function saveToSlot(slotId, state) {
    const saves = getAllSaves();
    saves[slotId] = {
      sceneId: state.sceneId,
      dialogueIndex: state.dialogueIndex,
      affection: state.affection,
      seenScenes: state.seenScenes || [],
      galleryUnlocks: state.galleryUnlocks || [],
      sceneName: state.sceneName || '',
      timestamp: Date.now()
    };
    writeSaves(saves);
  }

  function loadFromSlot(slotId) {
    const saves = getAllSaves();
    return saves[slotId] || null;
  }

  function deleteSlot(slotId) {
    const saves = getAllSaves();
    delete saves[slotId];
    writeSaves(saves);
  }

  function autoSave(state) {
    saveToSlot('auto', state);
  }

  function getSlotInfo(slotId) {
    const saves = getAllSaves();
    return saves[slotId] || null;
  }

  function hasAnySave() {
    const saves = getAllSaves();
    return Object.keys(saves).length > 0;
  }

  function getLastSave() {
    const saves = getAllSaves();
    let latest = null;
    let latestTime = 0;
    for (const key in saves) {
      if (saves[key].timestamp > latestTime) {
        latestTime = saves[key].timestamp;
        latest = saves[key];
      }
    }
    return latest;
  }

  function formatTimestamp(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return {
    SLOT_COUNT,
    saveToSlot,
    loadFromSlot,
    deleteSlot,
    autoSave,
    getSlotInfo,
    hasAnySave,
    getLastSave,
    getAllSaves,
    formatTimestamp
  };
})();
