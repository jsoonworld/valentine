// ============================================================
// State
// ============================================================

const STATE = {
  escapeCount: 0,
  yesScale: 1.0,
  isMuted: true,
  isSuccessScreen: false,
};

// ============================================================
// No-button messages (Korean, escalating tone)
// ============================================================

const NO_MESSAGES = [
  'No',
  '진심이야?',
  '에이 설마..',
  '한 번 더 생각해봐!',
  '손가락이 미끄러진거지?',
  '이래도 안 누를거야?',
  '정말 정말?',
  '마지막 기회야!',
];

// ============================================================
// Audio
// ============================================================

const AUDIO = {
  bgm: null,
  pop: null,
  success: null,
};

function initAudio() {
  AUDIO.bgm = new Audio('assets/audio/bgm.mp3');
  AUDIO.bgm.loop = true;
  AUDIO.bgm.volume = 0.3;

  AUDIO.pop = new Audio('assets/audio/pop.mp3');
  AUDIO.pop.volume = 0.5;

  AUDIO.success = new Audio('assets/audio/success.mp3');
  AUDIO.success.volume = 0.6;
}

function handleFirstInteraction() {
  if (!AUDIO.bgm) initAudio();
  if (!STATE.isMuted) {
    AUDIO.bgm.play().catch(function () {});
  }
  document.removeEventListener('click', handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
}

function playSound(name) {
  if (STATE.isMuted || !AUDIO[name]) return;
  AUDIO[name].currentTime = 0;
  AUDIO[name].play().catch(function () {});
}

function toggleMute() {
  if (!AUDIO.bgm) initAudio();

  STATE.isMuted = !STATE.isMuted;
  var toggleBtn = document.getElementById('bgm-toggle');
  toggleBtn.textContent = STATE.isMuted ? '\uD83D\uDD07' : '\uD83D\uDD0A';

  if (STATE.isMuted) {
    if (AUDIO.bgm) AUDIO.bgm.pause();
  } else {
    if (AUDIO.bgm) AUDIO.bgm.play().catch(function () {});
  }
}

// ============================================================
// Haptic feedback
// ============================================================

function triggerHaptic() {
  if ('vibrate' in navigator) {
    navigator.vibrate(100);
  }
}

// ============================================================
// No-button escape logic
// ============================================================

function isOverlappingYesButton(x, y, btnRect) {
  var btnYes = document.getElementById('btn-yes');
  var yesRect = btnYes.getBoundingClientRect();
  var padding = 20;

  return !(
    x + btnRect.width + padding < yesRect.left ||
    x - padding > yesRect.right ||
    y + btnRect.height + padding < yesRect.top ||
    y - padding > yesRect.bottom
  );
}

function getRandomPosition(buttonEl) {
  var MARGIN = 20;
  var btnRect = buttonEl.getBoundingClientRect();
  var maxX = window.innerWidth - btnRect.width - MARGIN;
  var maxY = window.innerHeight - btnRect.height - MARGIN;

  var x, y;
  var attempts = 0;
  do {
    x = MARGIN + Math.random() * (maxX - MARGIN);
    y = MARGIN + Math.random() * (maxY - MARGIN);
    attempts++;
  } while (isOverlappingYesButton(x, y, btnRect) && attempts < 100);

  return { x: x, y: y };
}

function bindNoButtonEvents(btnNo) {
  btnNo.addEventListener('mouseenter', handleEscape);
  btnNo.addEventListener('touchstart', handleEscape, { passive: true });
}

// ============================================================
// No-button text and Yes-button growth
// ============================================================

function updateNoButtonText(btnNo) {
  var index = Math.min(STATE.escapeCount, NO_MESSAGES.length - 1);
  btnNo.textContent = NO_MESSAGES[index];
}

var YES_SCALE_INCREMENT = 0.15;

function growYesButton(btnYes) {
  STATE.yesScale += YES_SCALE_INCREMENT;
  btnYes.style.transform = 'scale(' + STATE.yesScale + ')';
}

// ============================================================
// Escape handler
// ============================================================

function handleEscape(e) {
  if (STATE.isSuccessScreen) return;

  var btnNo = document.getElementById('btn-no');
  var btnYes = document.getElementById('btn-yes');

  STATE.escapeCount++;

  var pos = getRandomPosition(btnNo);
  btnNo.classList.add('escaped');
  btnNo.style.left = pos.x + 'px';
  btnNo.style.top = pos.y + 'px';

  var noScale = Math.max(0.4, 1 - STATE.escapeCount * 0.05);
  btnNo.style.transform = 'scale(' + noScale + ')';

  growYesButton(btnYes);
  updateNoButtonText(btnNo);
  playSound('pop');
  triggerHaptic();
}

// ============================================================
// Success screen
// ============================================================

function showSuccessScreen() {
  STATE.isSuccessScreen = true;

  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('success-screen').classList.remove('hidden');

  playSound('success');
  launchConfetti();
  startTypingEffect('Yay! \uD574\uD53C \uBC1C\uB80C\uD0C0\uC778\uB370\uC774 \u2764\uFE0F');
}

// ============================================================
// Typing effect
// ============================================================

function startTypingEffect(message, speed) {
  if (speed === undefined) speed = 80;

  var el = document.getElementById('typing-text');
  el.textContent = '';
  var i = 0;

  var interval = setInterval(function () {
    if (i < message.length) {
      el.textContent += message[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// ============================================================
// Heart particles
// ============================================================

var HEART_CHARS = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC97', '\uD83D\uDC96', '\uD83E\uDE77'];
var HEART_INTERVAL_MS = 800;

function spawnHeart() {
  var container = document.getElementById('hearts-container');
  var heart = document.createElement('span');
  heart.classList.add('heart');
  heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
  heart.style.left = (Math.random() * 100) + 'vw';
  heart.style.animationDuration = (4 + Math.random() * 4) + 's';
  heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  container.appendChild(heart);

  heart.addEventListener('animationend', function () {
    heart.remove();
  });
}

function startHeartParticles() {
  setInterval(spawnHeart, HEART_INTERVAL_MS);
}

// ============================================================
// Confetti
// ============================================================

var CONFETTI_COLORS = ['#ff4d6d', '#ff758f', '#ffb3c6', '#ffd6e0', '#c9184a', '#ffdd00', '#ff9500'];
var CONFETTI_COUNT = 80;

function launchConfetti() {
  var container = document.getElementById('confetti-container');
  for (var i = 0; i < CONFETTI_COUNT; i++) {
    var piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = (Math.random() * 100) + '%';
    piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDelay = (Math.random() * 2) + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(piece);

    piece.addEventListener('animationend', function () {
      this.remove();
    });
  }
}

// ============================================================
// Init (entry point)
// ============================================================

function init() {
  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');
  var bgmToggle = document.getElementById('bgm-toggle');

  bindNoButtonEvents(btnNo);
  btnYes.addEventListener('click', showSuccessScreen);
  bgmToggle.addEventListener('click', toggleMute);

  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });

  startHeartParticles();
}

document.addEventListener('DOMContentLoaded', init);
