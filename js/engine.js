const Engine = (() => {
  let state = {
    sceneId: null,
    dialogueIndex: 0,
    affection: 0,
    seenScenes: [],
    galleryUnlocks: [],
    backlog: [],
    isTyping: false,
    skipMode: false,
    autoMode: false,
    textSpeed: 5,
    autoSpeed: 5,
    currentText: '',
    typewriterTimer: null,
    autoTimer: null,
    breathingAnims: [],
    showingCG: false,
    transitioning: false,
    activeSprites: {}
  };

  const $ = id => document.getElementById(id);

  function init() {
    setupTitleScreen();
    setupMenuButtons();
    setupSettingsUI();
    setupInputHandlers();
    spawnTitleHearts();
  }

  function setupTitleScreen() {
    const hasSave = SaveManager.hasAnySave();
    $('btn-continue').disabled = !hasSave;
    $('btn-gallery').style.display = GalleryManager.hasAnyEnding() ? '' : 'none';
    AudioManager.playBGM('title');

    $('btn-new-game').onclick = () => {
      resetState();
      showScreen('game-screen');
      startScene(StoryScript.getStartScene());
    };
    $('btn-continue').onclick = () => {
      const save = SaveManager.getLastSave();
      if (save) loadFromSave(save);
    };
    $('btn-gallery').onclick = () => openGallery();
    $('btn-settings-title').onclick = () => openOverlay('settings-overlay');
  }

  function setupMenuButtons() {
    $('btn-menu').onclick = () => openOverlay('menu-overlay');
    $('btn-menu-close').onclick = () => closeOverlay('menu-overlay');
    $('btn-save').onclick = () => { closeOverlay('menu-overlay'); openSaveLoad('save'); };
    $('btn-load').onclick = () => { closeOverlay('menu-overlay'); openSaveLoad('load'); };
    $('btn-settings-game').onclick = () => { closeOverlay('menu-overlay'); openOverlay('settings-overlay'); };
    $('btn-title').onclick = () => { closeOverlay('menu-overlay'); returnToTitle(); };
    $('btn-save-close').onclick = () => closeOverlay('save-overlay');
    $('btn-settings-close').onclick = () => closeOverlay('settings-overlay');
    $('btn-backlog-close').onclick = () => closeOverlay('backlog-overlay');
    $('btn-gallery-close').onclick = () => closeOverlay('gallery-overlay');
    $('btn-ending-title').onclick = () => returnToTitle();

    $('btn-log').onclick = () => openBacklog();
    $('btn-auto').onclick = () => toggleAuto();
    $('btn-skip').onclick = () => toggleSkip();

    $('gallery-viewer').onclick = () => closeOverlay('gallery-viewer');
    $('cg-display').onclick = () => dismissCG();
  }

  function setupSettingsUI() {
    const bind = (sliderId, valId, cb) => {
      const slider = $(sliderId);
      const valEl = $(valId);
      slider.oninput = () => { valEl.textContent = slider.value; cb(parseInt(slider.value)); };
    };
    bind('setting-text-speed', 'text-speed-val', v => { state.textSpeed = v; });
    bind('setting-auto-speed', 'auto-speed-val', v => { state.autoSpeed = v; });
    bind('setting-bgm-vol', 'bgm-vol-val', v => AudioManager.setBGMVolume(v / 10));
    bind('setting-sfx-vol', 'sfx-vol-val', v => AudioManager.setSFXVolume(v / 10));
  }

  function setupInputHandlers() {
    document.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (anyOverlayOpen()) return;
        advanceDialogue();
      }
      if (e.key === 'Escape') {
        if (anyOverlayOpen()) closeAllOverlays();
        else if ($('game-screen').classList.contains('active')) openOverlay('menu-overlay');
      }
    });

    $('textbox-container').onclick = () => {
      if (anyOverlayOpen()) return;
      advanceDialogue();
    };

    $('scene-container').onclick = e => {
      if (e.target.closest('.cg-display') || anyOverlayOpen()) return;
      if ($('choice-container').style.display === 'flex') return;
      advanceDialogue();
    };
  }

  function resetState() {
    clearAllTimers();
    state.sceneId = null;
    state.dialogueIndex = 0;
    state.affection = 0;
    state.seenScenes = [];
    state.galleryUnlocks = [];
    state.backlog = [];
    state.isTyping = false;
    state.skipMode = false;
    state.autoMode = false;
    state.showingCG = false;
    state.transitioning = false;
    state.activeSprites = {};
    $('btn-skip').classList.remove('active');
    $('btn-auto').classList.remove('active');
    hideAllSprites();
    $('choice-container').style.display = 'none';
    $('cg-display').style.display = 'none';
  }

  function clearAllTimers() {
    if (state.typewriterTimer) { clearInterval(state.typewriterTimer); state.typewriterTimer = null; }
    if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null; }
    state.breathingAnims.forEach(a => { try { a.pause(); } catch(e){} });
    state.breathingAnims = [];
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
  }

  function openOverlay(id) { $(id).classList.add('active'); }
  function closeOverlay(id) { $(id).classList.remove('active'); }
  function closeAllOverlays() {
    document.querySelectorAll('.overlay.active').forEach(o => o.classList.remove('active'));
  }
  function anyOverlayOpen() {
    return !!document.querySelector('.overlay.active');
  }

  function returnToTitle() {
    closeAllOverlays();
    clearAllTimers();
    AudioManager.stopBGM();
    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.setAffection(0);
    }
    showScreen('title-screen');
    setupTitleScreen();
    AudioManager.playBGM('title');
    spawnTitleHearts();
  }

  // === SCENE MANAGEMENT ===

  function startScene(sceneId) {
    const scene = StoryScript.getScene(sceneId);
    if (!scene) { console.error('Scene not found:', sceneId); return; }

    state.sceneId = sceneId;
    state.dialogueIndex = 0;
    if (!state.seenScenes.includes(sceneId)) state.seenScenes.push(sceneId);

    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.setAffection(state.affection);
    }

    if (scene.bgm !== undefined) {
      if (scene.bgm) AudioManager.crossfadeBGM(scene.bgm);
    }

    if (scene.background) {
      setBackground(scene.background, true);
    }

    hideAllSprites();
    state.activeSprites = {};

    if (scene.branch) {
      handleBranch(scene);
      return;
    }

    showDialogueLine();
  }

  function handleBranch(scene) {
    const trans = StoryScript.getScene9Transition(state.affection);
    if (trans && trans.length > 0) {
      const targetSceneId = StoryScript.getEndingRoute(state.affection);
      const tempScene = {
        id: scene.id,
        name: scene.name,
        background: scene.background,
        dialogue: trans,
        next: targetSceneId
      };
      StoryScript.SCENES['_branch_temp'] = tempScene;
      state.sceneId = '_branch_temp';
      state.dialogueIndex = 0;
      showDialogueLine();
    }
  }

  function setBackground(src, animate) {
    const bgLayer = $('bg-layer');
    const bgNext = $('bg-layer-next');

    if (!animate) {
      bgLayer.style.backgroundImage = `url('${src}')`;
      return;
    }

    bgNext.style.backgroundImage = `url('${src}')`;
    bgNext.style.opacity = '0';

    try {
      const tl = anime.timeline({ easing: 'easeInOutQuad' });
      tl.add({ targets: bgLayer, opacity: [1, 0], duration: 400 })
        .add({ targets: bgNext, opacity: [0, 1], duration: 400 }, '-=200');
      tl.finished.then(() => {
        bgLayer.style.backgroundImage = `url('${src}')`;
        bgLayer.style.opacity = '1';
        bgNext.style.opacity = '0';
      });
    } catch(e) {
      bgLayer.style.backgroundImage = `url('${src}')`;
    }

    crtGlitch();
  }

  // === DIALOGUE ===

  function showDialogueLine() {
    const scene = StoryScript.getScene(state.sceneId);
    if (!scene || !scene.dialogue) return;

    if (state.dialogueIndex >= scene.dialogue.length) {
      endScene(scene);
      return;
    }

    const line = scene.dialogue[state.dialogueIndex];

    if (line.choice) {
      showChoices(line.choice);
      return;
    }

    if (line.background) {
      setBackground(line.background, true);
    }

    if (line.effect) {
      playEffect(line.effect);
    }

    if (line.sfx) {
      AudioManager.playSFX(line.sfx);
    }

    if (line.showCG) {
      showCG(line.showCG);
    }

    if (line.hide === true) {
      hideAllSprites();
      state.activeSprites = {};
    } else if (typeof line.hide === 'string') {
      hideSprite(line.hide);
    }

    if (line.speaker && line.speaker !== null) {
      const charName = line.speaker === 'lunette' ? 'Lunette' : 'Sable';
      const nameColor = line.speaker === 'lunette' ? '#E6E6FA' : '#FFB6C1';

      $('nameplate').style.display = 'block';
      $('name-text').textContent = charName;
      $('name-text').style.color = nameColor;

      if (line.expression && line.position) {
        showSprite(line.speaker, line.expression, line.position);
      }
    } else {
      $('nameplate').style.display = 'none';
    }

    if (line.text) {
      state.backlog.push({
        speaker: line.speaker ? (line.speaker === 'lunette' ? 'Lunette' : 'Sable') : null,
        speakerColor: line.speaker === 'lunette' ? '#E6E6FA' : (line.speaker === 'sable' ? '#FFB6C1' : null),
        text: line.text
      });
    }

    typewriterText(typeof line.text === 'string' ? line.text : '...');

    autoSaveCheck();
  }

  function typewriterText(text) {
    if (state.typewriterTimer) { clearInterval(state.typewriterTimer); state.typewriterTimer = null; }
    if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null; }

    const el = $('dialogue-text');
    const indicator = $('advance-indicator');
    el.textContent = '';
    state.currentText = typeof text === 'string' ? text : '';
    text = state.currentText;
    state.isTyping = true;
    indicator.style.opacity = '0';

    if (state.skipMode) {
      el.textContent = text;
      state.isTyping = false;
      indicator.style.opacity = '1';
      scheduleAutoAdvance();
      if (state.skipMode) {
        setTimeout(() => advanceDialogue(), 50);
      }
      return;
    }

    el.textContent = '';
    let i = 0;
    const speed = Math.max(10, 70 - (state.textSpeed * 6));

    state.typewriterTimer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(state.typewriterTimer);
        state.typewriterTimer = null;
        state.isTyping = false;
        try {
          anime({ targets: indicator, opacity: [0, 1], duration: 300, easing: 'easeOutQuad' });
        } catch(e) { indicator.style.opacity = '1'; }
        scheduleAutoAdvance();
      }
    }, speed);
  }

  function finishTyping() {
    if (state.typewriterTimer) {
      clearInterval(state.typewriterTimer);
      state.typewriterTimer = null;
    }
    $('dialogue-text').textContent = state.currentText;
    state.isTyping = false;
    $('advance-indicator').style.opacity = '1';
  }

  function advanceDialogue() {
    if (state.transitioning) return;
    if (state.showingCG) { dismissCG(); return; }

    if (state.isTyping) {
      finishTyping();
      return;
    }

    state.dialogueIndex++;
    showDialogueLine();
  }

  function endScene(scene) {
    if (scene.ending) {
      showEnding(scene.ending);
      return;
    }

    const nextId = scene.next;
    if (nextId) {
      state.transitioning = true;
      crtGlitch();
      try {
        const tl = anime.timeline({ easing: 'easeInOutQuad' });
        tl.add({ targets: '#scene-container', opacity: [1, 0], scale: [1, 1.02], duration: 400 })
          .add({
            targets: '#scene-container',
            opacity: [0, 1],
            scale: [0.98, 1],
            duration: 400,
            begin: () => {
              startScene(nextId);
            }
          });
        tl.finished.then(() => { state.transitioning = false; });
      } catch(e) {
        startScene(nextId);
        state.transitioning = false;
      }
    }
  }

  // === CHOICES ===

  function showChoices(choice) {
    const container = $('choice-container');
    container.innerHTML = '';
    container.style.display = 'flex';

    $('textbox-container').style.opacity = '0.3';

    choice.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = opt.text;
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(20px)';

      btn.addEventListener('mouseenter', () => {
        try { anime({ targets: btn, scale: 1.05, duration: 200, easing: 'spring(1, 80, 10, 0)' }); } catch(e){}
      });
      btn.addEventListener('mouseleave', () => {
        try { anime({ targets: btn, scale: 1, duration: 200, easing: 'easeOutQuad' }); } catch(e){}
      });

      btn.onclick = () => selectChoice(opt);
      container.appendChild(btn);

      try {
        anime({
          targets: btn,
          opacity: [0, 1],
          translateY: [20, 0],
          delay: i * 150,
          duration: 400,
          easing: 'easeOutCubic'
        });
      } catch(e) {
        btn.style.opacity = '1';
        btn.style.transform = 'none';
      }
    });
  }

  function selectChoice(opt) {
    AudioManager.playSFX('click');
    state.affection += (opt.affection || 0);
    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.setAffection(state.affection);
    }
    $('choice-container').style.display = 'none';
    $('textbox-container').style.opacity = '1';

    state.backlog.push({
      speaker: null,
      speakerColor: null,
      text: `▸ ${opt.text}`
    });

    autoSaveCheck();

    if (opt.next) {
      state.transitioning = true;
      try {
        anime({
          targets: '#scene-container',
          opacity: [1, 0.7, 1],
          duration: 400,
          easing: 'easeInOutQuad',
          complete: () => {
            state.transitioning = false;
            startScene(opt.next);
          }
        });
      } catch(e) {
        state.transitioning = false;
        startScene(opt.next);
      }
    } else {
      state.dialogueIndex++;
      showDialogueLine();
    }
  }

  // === SPRITES ===

  function showSprite(charId, expression, position) {
    const src = `assets/sprites/${charId}/${expression}.png`;
    const slotId = `sprite-${position}`;
    const slot = $(slotId);
    const img = $(`${slotId}-img`);

    if (!slot || !img) return;

    const wasVisible = slot.style.display === 'flex';
    const prevKey = `${position}`;
    const currentKey = `${charId}-${expression}`;

    if (state.activeSprites[prevKey] === currentKey && wasVisible) return;
    state.activeSprites[prevKey] = currentKey;

    img.src = src;
    img.alt = `${charId} ${expression}`;
    slot.style.display = 'flex';

    if (!wasVisible) {
      slot.style.opacity = '0';
      try {
        const tl = anime.timeline({ targets: slot });
        tl.add({ translateY: [20, 0], opacity: [0, 1], duration: 400, easing: 'easeOutQuad' })
          .add({ scaleX: [1.02, 1], scaleY: [0.98, 1], duration: 200, easing: 'easeOutElastic(1, 0.5)' }, '-=100');
      } catch(e) {
        slot.style.opacity = '1';
      }
    } else {
      try {
        anime({ targets: img, opacity: [0.5, 1], duration: 200, easing: 'easeOutQuad' });
      } catch(e) {}
    }

    startBreathing(slot);
  }

  function hideSprite(charIdOrPosition) {
    ['left', 'center', 'right'].forEach(pos => {
      const key = state.activeSprites[pos];
      if (key && key.startsWith(charIdOrPosition)) {
        const slot = $(`sprite-${pos}`);
        try {
          anime({
            targets: slot,
            opacity: [1, 0],
            translateY: [0, 10],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => { slot.style.display = 'none'; }
          });
        } catch(e) { slot.style.display = 'none'; }
        delete state.activeSprites[pos];
      }
    });
  }

  function hideAllSprites() {
    ['left', 'center', 'right'].forEach(pos => {
      const slot = $(`sprite-${pos}`);
      if (slot) { slot.style.display = 'none'; slot.style.opacity = '1'; }
    });
    state.breathingAnims.forEach(a => { try { a.pause(); } catch(e){} });
    state.breathingAnims = [];
  }

  function startBreathing(el) {
    try {
      const anim = anime({
        targets: el,
        scaleY: [1, 1.005],
        duration: 2500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
      state.breathingAnims.push(anim);
    } catch(e) {}
  }

  // === CG ===

  function showCG(cgId) {
    const src = `assets/gallery/${cgId}.png`;
    const display = $('cg-display');
    const img = $('cg-image');
    img.src = src;
    display.style.display = 'flex';
    display.style.opacity = '0';
    state.showingCG = true;

    GalleryManager.unlockCG(cgId);

    try {
      anime({ targets: display, opacity: [0, 1], duration: 600, easing: 'easeOutQuad' });
    } catch(e) { display.style.opacity = '1'; }
  }

  function dismissCG() {
    const display = $('cg-display');
    try {
      anime({
        targets: display,
        opacity: [1, 0],
        duration: 400,
        easing: 'easeInQuad',
        complete: () => {
          display.style.display = 'none';
          state.showingCG = false;
        }
      });
    } catch(e) {
      display.style.display = 'none';
      state.showingCG = false;
    }
  }

  // === EFFECTS ===

  function playEffect(type) {
    if (type === 'shake') screenShake();
    else if (type === 'hearts') floatingHearts();
    else if (type === 'glitch') crtGlitch();
  }

  function screenShake() {
    try {
      anime({
        targets: '.game-container',
        translateX: [0, -4, 4, -2, 2, 0],
        duration: 400,
        easing: 'easeInOutQuad'
      });
    } catch(e) {}
  }

  function floatingHearts() {
    const container = $('scene-container');
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-particle';
      heart.textContent = '♥';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.bottom = '10%';
      heart.style.position = 'absolute';
      heart.style.zIndex = '50';
      heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
      heart.style.color = ['#FFB6C1', '#FF69B4', '#DDA0DD', '#E6E6FA'][Math.floor(Math.random() * 4)];
      container.appendChild(heart);

      try {
        anime({
          targets: heart,
          translateY: [0, -(150 + Math.random() * 200)],
          translateX: () => anime.random(-60, 60),
          opacity: [1, 0],
          scale: [0.5, 1.2],
          delay: i * 150,
          duration: 2000 + Math.random() * 1000,
          easing: 'easeOutQuad',
          complete: () => heart.remove()
        });
      } catch(e) { setTimeout(() => heart.remove(), 100); }
    }
  }

  function crtGlitch() {
    const overlay = document.querySelector('.crt-overlay');
    try {
      const tl = anime.timeline({ targets: overlay });
      tl.add({ opacity: [0, 0.6], duration: 50 })
        .add({ translateX: [0, 3, -3, 0], duration: 100 })
        .add({ opacity: [0.6, 0], duration: 150 });
    } catch(e) {}
  }

  function spawnTitleHearts() {
    const container = $('title-hearts');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-particle';
      heart.textContent = '♥';
      heart.style.left = Math.random() * 100 + '%';
      container.appendChild(heart);
    }

    try {
      anime({
        targets: '#title-hearts .heart-particle',
        translateY: [0, () => -(window.innerHeight + 50)],
        translateX: () => anime.random(-40, 40),
        opacity: [0.7, 0],
        scale: [0.5, 1.3],
        delay: anime.stagger(400, { start: 0 }),
        duration: () => 3000 + Math.random() * 2000,
        easing: 'easeOutQuad',
        loop: true
      });
    } catch(e) {}

    try {
      anime({
        targets: '.title-buttons .btn',
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(100, { start: 300 }),
        duration: 500,
        easing: 'easeOutCubic'
      });
    } catch(e) {}
  }

  // === SKIP / AUTO ===

  function toggleSkip() {
    state.skipMode = !state.skipMode;
    $('btn-skip').classList.toggle('active', state.skipMode);
    if (state.skipMode) {
      state.autoMode = false;
      $('btn-auto').classList.remove('active');
      if (!state.isTyping) advanceDialogue();
    }
  }

  function toggleAuto() {
    state.autoMode = !state.autoMode;
    $('btn-auto').classList.toggle('active', state.autoMode);
    if (state.autoMode) {
      state.skipMode = false;
      $('btn-skip').classList.remove('active');
      if (!state.isTyping) scheduleAutoAdvance();
    } else {
      if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null; }
    }
  }

  function scheduleAutoAdvance() {
    if (!state.autoMode && !state.skipMode) return;
    if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null; }

    if (state.skipMode) {
      state.autoTimer = setTimeout(() => advanceDialogue(), 50);
    } else if (state.autoMode) {
      const delay = Math.max(500, 3000 - (state.autoSpeed * 250));
      state.autoTimer = setTimeout(() => advanceDialogue(), delay);
    }
  }

  // === BACKLOG ===

  function openBacklog() {
    const container = $('backlog-entries');
    container.innerHTML = '';

    state.backlog.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'backlog-entry';
      if (entry.speaker) {
        const nameSpan = document.createElement('span');
        nameSpan.className = 'backlog-name';
        nameSpan.textContent = entry.speaker + ':';
        nameSpan.style.color = entry.speakerColor || '#FFB6C1';
        div.appendChild(nameSpan);
      }
      div.appendChild(document.createTextNode(entry.text));
      container.appendChild(div);
    });

    openOverlay('backlog-overlay');
    container.scrollTop = container.scrollHeight;
  }

  // === SAVE / LOAD ===

  function openSaveLoad(mode) {
    const container = $('save-slots');
    $('save-panel-title').textContent = mode === 'save' ? 'Save' : 'Load';
    container.innerHTML = '';

    const slotIds = ['auto', '1', '2', '3', '4', '5', '6'];
    slotIds.forEach(id => {
      const info = SaveManager.getSlotInfo(id);
      const slot = document.createElement('div');
      slot.className = 'save-slot';

      const numDiv = document.createElement('div');
      numDiv.className = 'save-slot-num';
      numDiv.textContent = id === 'auto' ? 'AUTO' : `Slot ${id}`;

      const infoDiv = document.createElement('div');
      infoDiv.className = 'save-slot-info';

      if (info) {
        const sceneDiv = document.createElement('div');
        sceneDiv.className = 'save-slot-scene';
        sceneDiv.textContent = info.sceneName || StoryScript.getSceneNameForSave(info.sceneId);
        const timeDiv = document.createElement('div');
        timeDiv.className = 'save-slot-time';
        timeDiv.textContent = SaveManager.formatTimestamp(info.timestamp);
        infoDiv.appendChild(sceneDiv);
        infoDiv.appendChild(timeDiv);
      } else {
        const empty = document.createElement('div');
        empty.className = 'save-slot-empty';
        empty.textContent = '— Empty —';
        infoDiv.appendChild(empty);
      }

      slot.appendChild(numDiv);
      slot.appendChild(infoDiv);

      if (mode === 'save') {
        if (id === 'auto') {
          slot.style.opacity = '0.4';
          slot.style.cursor = 'default';
        } else {
          slot.onclick = () => {
            saveToSlot(id);
            closeOverlay('save-overlay');
          };
        }
      } else {
        if (info) {
          slot.onclick = () => {
            loadFromSave(info);
            closeOverlay('save-overlay');
          };
        } else {
          slot.style.opacity = '0.4';
          slot.style.cursor = 'default';
        }
      }

      container.appendChild(slot);
    });

    openOverlay('save-overlay');
  }

  function saveToSlot(slotId) {
    const scene = StoryScript.getScene(state.sceneId);
    SaveManager.saveToSlot(slotId, {
      sceneId: state.sceneId,
      dialogueIndex: state.dialogueIndex,
      affection: state.affection,
      seenScenes: [...state.seenScenes],
      galleryUnlocks: GalleryManager.getUnlockedCGs(),
      sceneName: scene ? scene.name : ''
    });
  }

  function autoSaveCheck() {
    const scene = StoryScript.getScene(state.sceneId);
    SaveManager.autoSave({
      sceneId: state.sceneId,
      dialogueIndex: state.dialogueIndex,
      affection: state.affection,
      seenScenes: [...state.seenScenes],
      galleryUnlocks: GalleryManager.getUnlockedCGs(),
      sceneName: scene ? scene.name : ''
    });
  }

  function loadFromSave(save) {
    resetState();
    state.affection = save.affection || 0;
    state.seenScenes = save.seenScenes || [];
    if (typeof MusicEngine !== 'undefined') {
      MusicEngine.setAffection(state.affection);
    }
    showScreen('game-screen');

    state.sceneId = save.sceneId;
    state.dialogueIndex = save.dialogueIndex || 0;

    const scene = StoryScript.getScene(state.sceneId);
    if (scene) {
      if (scene.bgm) AudioManager.crossfadeBGM(scene.bgm);
      if (scene.background) setBackground(scene.background, false);
      showDialogueLine();
    }
  }

  // === GALLERY ===

  function openGallery() {
    const grid = $('gallery-grid');
    const checklist = $('ending-checklist');
    grid.innerHTML = '';
    checklist.innerHTML = '';

    GalleryManager.CG_LIST.forEach(cg => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      const unlocked = GalleryManager.isCGUnlocked(cg.id);

      if (!unlocked) item.classList.add('locked');

      const img = document.createElement('img');
      img.src = cg.src;
      img.alt = cg.name;
      item.appendChild(img);

      if (!unlocked) {
        const lock = document.createElement('div');
        lock.className = 'lock-icon';
        lock.textContent = '?';
        item.appendChild(lock);
      } else {
        item.onclick = () => {
          $('gallery-viewer-img').src = cg.src;
          openOverlay('gallery-viewer');
        };
      }

      grid.appendChild(item);
    });

    const endingNames = { true: 'True Ending', good: 'Good Ending', bad: 'Bad Ending' };
    GalleryManager.ENDINGS.forEach(e => {
      const span = document.createElement('span');
      span.className = 'ending-check';
      if (GalleryManager.isEndingUnlocked(e)) span.classList.add('achieved');
      span.textContent = endingNames[e];
      checklist.appendChild(span);
    });

    openOverlay('gallery-overlay');
  }

  // === ENDING ===

  function showEnding(ending) {
    GalleryManager.unlockEnding(ending.type);
    if (ending.cg) GalleryManager.unlockCG(ending.cg);

    state.skipMode = false;
    state.autoMode = false;
    $('btn-skip').classList.remove('active');
    $('btn-auto').classList.remove('active');

    setTimeout(() => {
      $('ending-title').textContent = ending.title;
      $('ending-subtitle').textContent = ending.subtitle;
      openOverlay('ending-card');

      try {
        anime({
          targets: '.ending-card-content',
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutCubic'
        });
      } catch(e) {}
    }, 1500);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { state };
})();
