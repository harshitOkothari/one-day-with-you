/* ==========================================================
   ONE DAY WITH YOU — GAME ENGINE
   ========================================================== */

const els = {
  bg: document.getElementById("bg-layer"),
  topBar: document.getElementById("top-bar"),
  dayLabel: document.getElementById("day-label"),
  clockLabel: document.getElementById("clock-label"),
  progressLabel: document.getElementById("progress-label"),
  progressFill: document.getElementById("progress-fill"),
  settingsBtn: document.getElementById("settings-btn"),
  memoryPopup: document.getElementById("memory-popup"),
  memoryName: document.querySelector("#memory-popup .memory-name"),
  characters: document.getElementById("characters"),
  titleCard: document.getElementById("title-card"),
  dialogueBox: document.getElementById("dialogue-box"),
  speakerName: document.getElementById("speaker-name"),
  dialogueText: document.getElementById("dialogue-text"),
  continueBtn: document.getElementById("continue-btn"),
  choiceWrap: document.getElementById("choice-wrap"),
  fadeOverlay: document.getElementById("fade-overlay"),
  menuOverlay: document.getElementById("menu-overlay"),
  menuResume: document.getElementById("menu-resume"),
  menuRestart: document.getElementById("menu-restart"),
  scrapbookScreen: document.getElementById("scrapbook-screen"),
  scrapbookGrid: document.getElementById("scrapbook-grid"),
  restartBtn: document.getElementById("restart-btn"),
  menuMusicToggle: document.getElementById("menu-music-toggle"),
  menuVolume: document.getElementById("menu-volume"),
};

// ---------------- Audio engine ----------------
// Two <audio> elements so we can crossfade between tracks instead of
// hard-cutting whenever the story moves into a new music "phase".
const audioA = new Audio();
const audioB = new Audio();
[audioA, audioB].forEach((a) => { a.loop = true; a.volume = 0; a.preload = "auto"; });
let activeAudio = audioA;
let inactiveAudio = audioB;
let currentMusicKey = null;
let musicEnabled = localStorage.getItem("odwy_music_enabled") !== "off";
let musicVolume = parseFloat(localStorage.getItem("odwy_music_volume") || "0.5");
let audioUnlocked = false;

function setMusicButtonLabel() {
  els.menuMusicToggle.textContent = musicEnabled ? "🎵 Music: On" : "🔇 Music: Off";
}
els.menuVolume.value = musicVolume;
setMusicButtonLabel();

function fadeAudio(audio, toVolume, duration = 900) {
  const from = audio.volume;
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    audio.volume = from + (toVolume - from) * t;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function playMusicForScene(scene) {
  if (!scene.music) return;
  const key = scene.music;
  const src = MUSIC[key];
  if (!src) return;

  if (key === currentMusicKey) {
    // Same phase already playing — just make sure volume matches (in case muted/unmuted).
    if (musicEnabled) fadeAudio(activeAudio, musicVolume);
    return;
  }
  currentMusicKey = key;

  // Load the new track into the currently-silent audio element and crossfade.
  inactiveAudio.src = src;
  inactiveAudio.currentTime = 0;
  inactiveAudio.volume = 0;

  const tryPlay = () => {
    inactiveAudio.play().catch(() => { /* will retry after unlock gesture */ });
  };
  tryPlay();

  if (musicEnabled) {
    fadeAudio(activeAudio, 0);
    fadeAudio(inactiveAudio, musicVolume);
  }

  // swap roles
  const tmp = activeAudio;
  activeAudio = inactiveAudio;
  inactiveAudio = tmp;
  setTimeout(() => { inactiveAudio.pause(); }, 950);
}

function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  [audioA, audioB].forEach((a) => {
    a.play().then(() => a.pause()).catch(() => {});
  });
  // Resume whichever track should currently be playing, now that a real
  // user gesture has happened (browsers block autoplay before this).
  if (musicEnabled && activeAudio.src) {
    activeAudio.play().catch(() => {});
    fadeAudio(activeAudio, musicVolume);
  }
}

function toggleMusic() {
  musicEnabled = !musicEnabled;
  localStorage.setItem("odwy_music_enabled", musicEnabled ? "on" : "off");
  setMusicButtonLabel();
  if (musicEnabled) {
    fadeAudio(activeAudio, musicVolume);
    activeAudio.play().catch(() => {});
  } else {
    fadeAudio(activeAudio, 0);
  }
}

els.menuMusicToggle.addEventListener("click", toggleMusic);
els.menuVolume.addEventListener("input", (e) => {
  musicVolume = parseFloat(e.target.value);
  localStorage.setItem("odwy_music_volume", musicVolume);
  if (musicEnabled) activeAudio.volume = musicVolume;
});

let state = {
  currentSceneId: "SCENE_00",
  lineIndex: 0,
  collectedMemories: [],
  isTyping: false,
  typingTimeout: null,
};

const TYPE_SPEED = 16; // ms per character

// ---------------- Core scene flow ----------------

function startGame() {
  els.topBar.classList.add("hidden");
  els.characters.classList.add("hidden");
  loadScene("SCENE_00", { skipFade: true });
}

function loadScene(sceneId, opts = {}) {
  const scene = SCENES[sceneId];
  if (!scene) return;

  const doLoad = () => {
    state.currentSceneId = sceneId;
    state.lineIndex = 0;

    // Background
    if (scene.background) {
      els.bg.style.backgroundImage = `url("${scene.background}")`;
      els.bg.classList.remove("bg-intro");
    } else if (scene.bgClass) {
      els.bg.style.backgroundImage = "";
      els.bg.classList.add(scene.bgClass);
    }

    // Music
    playMusicForScene(scene);

    // Top bar
    if (scene.hideTopBar) {
      els.topBar.classList.add("hidden");
      els.characters.classList.add("hidden");
    } else {
      els.topBar.classList.remove("hidden");
      els.characters.classList.remove("hidden");
      if (scene.time) els.clockLabel.textContent = "🕘 " + scene.time;
      if (scene.progressLabel) els.progressLabel.textContent = scene.progressLabel;
      if (typeof scene.progressPct === "number") els.progressFill.style.width = scene.progressPct + "%";
    }

    // Title card only for scene 0
    if (sceneId === "SCENE_00") {
      showTitleCard();
    } else {
      els.titleCard.classList.add("hidden");
    }

    els.choiceWrap.classList.add("hidden");
    els.choiceWrap.innerHTML = "";
    els.dialogueBox.classList.remove("hidden");

    showLine();
  };

  if (opts.skipFade) {
    doLoad();
  } else {
    fadeTransition(doLoad);
  }
}

function showTitleCard() {
  els.titleCard.classList.remove("hidden");
  setTimeout(() => {
    els.titleCard.classList.add("hidden");
  }, 2400);
}

function swapBackground(newBg) {
  els.fadeOverlay.style.transitionDuration = "0.35s";
  els.fadeOverlay.classList.add("show");
  setTimeout(() => {
    els.bg.style.backgroundImage = `url("${newBg}")`;
    setTimeout(() => {
      els.fadeOverlay.classList.remove("show");
      els.fadeOverlay.style.transitionDuration = "";
    }, 80);
  }, 350);
}

function fadeTransition(callback) {
  els.fadeOverlay.classList.add("show");
  setTimeout(() => {
    callback();
    setTimeout(() => {
      els.fadeOverlay.classList.remove("show");
    }, 60);
  }, 420);
}

function showLine() {
  const scene = SCENES[state.currentSceneId];
  const total = scene.lines.length;

  if (state.lineIndex >= total) {
    handleSceneEnd(scene);
    return;
  }

  // Mid-scene background swap (e.g. cinema exterior -> interior)
  if (scene.bgChanges) {
    const change = scene.bgChanges.find((c) => c.atLine === state.lineIndex);
    if (change) swapBackground(change.background);
  }

  const l = scene.lines[state.lineIndex];
  els.dialogueBox.classList.remove("hidden");
  els.choiceWrap.classList.add("hidden");

  if (l.narrator) {
    els.speakerName.textContent = "🤖 Narrator";
  } else {
    els.speakerName.textContent = `${l.emoji} ${l.speaker}`;
  }

  typeText(l.text);
}

function typeText(text) {
  clearTimeout(state.typingTimeout);
  state.isTyping = true;
  els.dialogueText.textContent = "";
  let i = 0;

  function step() {
    if (i <= text.length) {
      els.dialogueText.textContent = text.slice(0, i);
      i++;
      state.typingTimeout = setTimeout(step, TYPE_SPEED);
    } else {
      state.isTyping = false;
    }
  }
  step();
}

function skipTyping() {
  const scene = SCENES[state.currentSceneId];
  const l = scene.lines[state.lineIndex];
  clearTimeout(state.typingTimeout);
  els.dialogueText.textContent = l.text;
  state.isTyping = false;
}

function advance() {
  if (state.isTyping) {
    skipTyping();
    return;
  }
  state.lineIndex++;
  showLine();
}

function handleSceneEnd(scene) {
  if (scene.memory) {
    showMemoryPopup(scene.memory, () => proceedAfterScene(scene));
  } else {
    proceedAfterScene(scene);
  }
}

function proceedAfterScene(scene) {
  if (scene.choices && scene.choices.length) {
    showChoices(scene.choices);
  } else if (scene.next === "SCRAPBOOK") {
    fadeTransition(showScrapbook);
  } else if (scene.next) {
    loadScene(scene.next);
  }
}

function showMemoryPopup(memory, cb) {
  state.collectedMemories.push(memory);
  els.memoryName.textContent = `${memory.icon} ${memory.name}`;
  els.memoryPopup.classList.remove("hidden");
  requestAnimationFrame(() => els.memoryPopup.classList.add("show"));
  setTimeout(() => {
    els.memoryPopup.classList.remove("show");
    setTimeout(() => {
      els.memoryPopup.classList.add("hidden");
      cb();
    }, 400);
  }, 1800);
}

function showChoices(choices) {
  els.dialogueBox.classList.add("hidden");
  els.choiceWrap.innerHTML = "";
  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;
    btn.addEventListener("click", () => {
      if (choice.time) els.clockLabel.textContent = "🕘 " + choice.time;
      if (choice.progressLabel) els.progressLabel.textContent = choice.progressLabel;
      if (typeof choice.progressPct === "number") els.progressFill.style.width = choice.progressPct + "%";
      fadeTransition(() => loadScene(choice.next, { skipFade: true }));
    });
    els.choiceWrap.appendChild(btn);
  });
  els.choiceWrap.classList.remove("hidden");
}

// ---------------- Scrapbook ----------------

function showScrapbook() {
  els.topBar.classList.add("hidden");
  els.characters.classList.add("hidden");
  els.dialogueBox.classList.add("hidden");
  els.choiceWrap.classList.add("hidden");
  els.bg.style.backgroundImage = `url("${SCRAPBOOK_BG}")`;

  els.scrapbookGrid.innerHTML = "";
  state.collectedMemories.forEach((m, idx) => {
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.setProperty("--rot", (idx % 2 === 0 ? "-3deg" : "3deg"));
    card.innerHTML = `<div class="p-icon">${m.icon}</div><div class="p-name">${m.name}</div>`;
    els.scrapbookGrid.appendChild(card);
  });

  els.scrapbookScreen.classList.remove("hidden");
}

function restartGame() {
  state = {
    currentSceneId: "SCENE_00",
    lineIndex: 0,
    collectedMemories: [],
    isTyping: false,
    typingTimeout: null,
  };
  els.scrapbookScreen.classList.add("hidden");
  els.menuOverlay.classList.add("hidden");
  fadeTransition(startGame);
}

// ---------------- Input handling ----------------

els.continueBtn.addEventListener("click", () => { unlockAudio(); advance(); });
els.dialogueBox.addEventListener("click", (e) => {
  unlockAudio();
  if (e.target === els.continueBtn) return;
  advance();
});
document.addEventListener("click", unlockAudio, { once: true });

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    if (!els.dialogueBox.classList.contains("hidden")) advance();
  }
});

els.settingsBtn.addEventListener("click", () => {
  els.menuOverlay.classList.remove("hidden");
});
els.menuResume.addEventListener("click", () => {
  els.menuOverlay.classList.add("hidden");
});
els.menuRestart.addEventListener("click", () => {
  if (confirm("Restart the whole day from the beginning?")) {
    restartGame();
  }
});
els.restartBtn.addEventListener("click", restartGame);

// ---------------- Boot ----------------

startGame();
