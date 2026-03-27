// ============================================================
// State
// ============================================================

const STATE = {
  escapeCount: 0,
  yesScale: 1.0,
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
  triggerHaptic();
}

// ============================================================
// Success screen
// ============================================================

function showSuccessScreen() {
  STATE.isSuccessScreen = true;

  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('success-screen').classList.remove('hidden');

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
// Mouse glow effect
// ============================================================

function initMouseGlow() {
  var glow = document.getElementById('mouse-glow');

  document.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  document.addEventListener('touchmove', function (e) {
    var touch = e.touches[0];
    glow.style.left = touch.clientX + 'px';
    glow.style.top = touch.clientY + 'px';
  }, { passive: true });
}

// ============================================================
// Floating photos
// ============================================================

var FLOAT_PHOTOS = [
  'assets/images/float-1.jpg',
  'assets/images/float-2.jpg',
  'assets/images/float-3.jpg',
  'assets/images/float-4.jpg',
  'assets/images/float-5.jpg',
];
var FLOAT_INTERVAL_MS = 2500;
var floatQueue = [];
var floatZoneIndex = 0;

function shuffleFloatQueue() {
  floatQueue = FLOAT_PHOTOS.slice();
  for (var i = floatQueue.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = floatQueue[i];
    floatQueue[i] = floatQueue[j];
    floatQueue[j] = tmp;
  }
}

function spawnFloatPhoto() {
  if (floatQueue.length === 0) shuffleFloatQueue();

  var container = document.getElementById('float-container');
  var img = document.createElement('img');
  img.classList.add('float-photo');
  img.src = floatQueue.pop();

  // Divide screen into 5 zones so photos spread out
  var zoneWidth = 100 / 5;
  var zoneStart = floatZoneIndex * zoneWidth;
  img.style.left = (zoneStart + Math.random() * zoneWidth) + '%';
  floatZoneIndex = (floatZoneIndex + 1) % 5;

  img.style.bottom = '-160px';
  var isMobile = window.innerWidth < 768;
  var size = isMobile
    ? 110 + Math.floor(Math.random() * 50)
    : 140 + Math.floor(Math.random() * 60);
  img.style.width = size + 'px';
  img.style.height = size + 'px';
  img.style.setProperty('--float-duration', (12 + Math.random() * 6) + 's');
  container.appendChild(img);

  img.addEventListener('animationend', function () {
    img.remove();
  });
}

function startFloatingPhotos() {
  shuffleFloatQueue();
  spawnFloatPhoto();
  setInterval(spawnFloatPhoto, FLOAT_INTERVAL_MS);
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
  heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
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

  bindNoButtonEvents(btnNo);
  btnYes.addEventListener('click', showSuccessScreen);

  startHeartParticles();
  startFloatingPhotos();
  initMouseGlow();
}

document.addEventListener('DOMContentLoaded', init);
