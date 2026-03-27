// ============================================================
// State
// ============================================================

var STATE = {
  escapeCount: 0,
  yesScale: 1.0,
  isSuccessScreen: false,
  currentStageIndex: -1,
};

// ============================================================
// Interval tracking (for visibility-change pause/resume)
// ============================================================

var floatIntervalId = null;
var heartIntervalId = null;
var currentHeartInterval = 800;

// ============================================================
// Stage definitions (7막 비주얼 스토리텔링)
// ============================================================

var STAGES = [
  { range: [0, 11],  bg: 'linear-gradient(160deg, #ffe0ec 0%, #fff0f3 30%, #fce4ec 60%, #f8bbd0 100%)', heartInterval: 800 },
  { range: [12, 27], bg: 'linear-gradient(160deg, #ffd6e0 0%, #ffe0ec 30%, #ffb3c6 60%, #ff8fa3 100%)', heartInterval: 600 },
  { range: [28, 39], bg: 'linear-gradient(160deg, #e8d5f5 0%, #f3d5f0 30%, #fce4ec 60%, #d5a8e0 100%)', heartInterval: 700 },
  { range: [40, 57], bg: 'linear-gradient(160deg, #ffccd5 0%, #ffd6e0 30%, #ffe0ec 60%, #ff8fa3 100%)', heartInterval: 500 },
  { range: [58, 71], bg: 'linear-gradient(160deg, #fff3cd 0%, #ffe0ec 30%, #ffd6e0 60%, #ffb3c6 100%)', heartInterval: 800 },
  { range: [72, 87], bg: 'linear-gradient(160deg, #ffe0b2 0%, #ffcc80 30%, #ffd6e0 60%, #ffab91 100%)', heartInterval: 600 },
  { range: [88, 99], bg: 'linear-gradient(160deg, #c9184a 0%, #ff4d6d 30%, #e91e63 60%, #ad1457 100%)', heartInterval: 400 },
];

// ============================================================
// No-button messages (Korean, escalating tone)
// ============================================================

var NO_MESSAGES = [
  // ── 1막: 장난스러운 시작 (0-11) ──
  'No',
  '진심이야?',
  '에이 설마..',
  '한 번 더 생각해봐!',
  '손가락이 미끄러진거지?',
  '이래도 안 누를거야?',
  '정말 정말?',
  '마지막 기회야!',
  '아직도 No야? 진짜?',
  '나 지금 눈물 나려고 해',
  '심장이 쿵쿵거리는데..',
  '제발~ 한 번만~',

  // ── 2막: 엉뚱한 리액션 (12-27) ──
  '\u2764\uFE0F HP: \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591 80%',
  '아ㅋㅋㅋ 이거 설마 일부러?',
  '\u2764\uFE0F HP: \u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591 60%',
  '내 심장은 유리인데요..',
  '이 버튼 누를 때마다 어딘가에서 고양이가 울어요',
  '\u2764\uFE0F HP: \u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591 40%',
  '이거 캡처해서 친구한테 보내지 마...',
  '나 이러다 진짜 삐질 수 있는 사람이야',
  '윤경아... 나 많이 슬프다...?',
  '\u2764\uFE0F HP: \u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 20%',
  'No 버튼 장인이시네요 ^^',
  '이쯤 되면 집착 아닌가요?',
  '아직도요? 체력 좋으시다...',
  '나 원래 이렇게 안 매달리는 사람인데',
  '\u2764\uFE0F HP: \u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 10%',
  '나... 괜찮아... 괜찮다고...',

  // ── 3막: 버튼의 자아각성 (28-39) ──
  '...잠깐, 내가 왜 이러고 있지',
  '나 버튼인데... 왜 감정이 있는 거야',
  '프로그래밍된 대로인데 왜 마음이 아프지',
  'No 버튼의 삶이 원래 이런 건가',
  '어딘가의 Yes 버튼이 부럽다...',
  '개발자(네 남자친구)가 나한테 미안하대',
  '이 세상 모든 No 버튼을 대표해서 말할게',
  '우리도... 사랑받고 싶었어',
  'ㅋㅋㅋ 아 잠깐 진지해졌다 미안',
  '다시 돌아와서~ No 누르지 마~',
  '근데 솔직히 이 버튼 만든 사람 되게 귀엽지 않아?',
  '(소곤소곤) Yes 누르면 좋은 거 있는데...',

  // ── 4막: 진심 전달 (40-57) ──
  '있잖아, 사실 너한테 할 말이 있어',
  '이 페이지... 너 주려고 밤새 만든 거야',
  '코딩하면서 네 생각 진짜 많이 했어',
  '윤경이가 이거 보고 웃으면 좋겠다 하면서',
  '버그 나서 3번 갈아엎은 건 비밀이야',
  '"이 정도면 감동하겠지?" 하면서 혼자 웃었어',
  '너 만나고 나서 매일이 발렌타인데이야',
  '아침에 눈 뜨면 제일 먼저 네가 보고 싶어',
  '카톡 프사 바꿀 때마다 몰래 캡처하는 거 알지?',
  '네가 웃을 때 세상이 잠깐 멈추는 것 같아',
  '나 원래 이런 말 잘 못하잖아...',
  '근데 여기선 좀 솔직해져도 되지?',
  '윤경아, 너는 내 최고의 행운이야',
  '힘든 날에도 네 생각하면 괜찮아져',
  '앞으로도 네 옆에 있고 싶어',
  '진심이야, 진짜진짜 진심',
  '이 세상에서 제일 좋아하는 사람',
  '고마워, 내 옆에 있어줘서',

  // ── 5막: 속보 & 유머 브레이크 (58-71) ──
  '[긴급속보] 윤경씨, 아직도 No 누르는 중',
  '[단독] No 버튼 59번 누른 여성, 이유가...',
  '[속보] 남자친구 심장, 회복 불가 판정',
  '페이크~ 사실 나 안 슬퍼~ (슬픔)',
  '이쯤에서 포기할 줄 알았지? 절대 안 해',
  'No를 100번 누르면 숨겨진 엔딩이...',
  '...있을 수도 있고 없을 수도 있고',
  '이 버튼 특허 내야 하나... 내구성 甲',
  '[실시간 인기검색어] 1위: 윤경이 하트 도둑',
  'ㅋㅋㅋ 너 지금 웃고 있지? 다 알아',
  '웃으면서 No 누르는 거 반칙이야!',
  '한숨 돌리고~ 자 다시 갈게',
  '남은 버튼: 28개... 아직 기회 있어!',
  '에너지 충전 완료! 다시 설득 모드 ON',

  // ── 6막: 약속과 미래 (72-87) ──
  '같이 벚꽃 보러 가자, 올해 꼭',
  '네가 가고 싶다던 제주도도 가자',
  '비 오는 날 같이 라면 끓여 먹자',
  '새벽에 편의점 가서 아이스크림 사자',
  '크리스마스에는 트리 같이 꾸미자',
  '생일마다 내가 직접 케이크 만들어줄게 (노력할게)',
  '힘들 때 아무 말 안 해도 옆에 있을게',
  '기쁜 날엔 세상에서 제일 크게 축하해줄게',
  '넷플릭스 뭐 볼지 30분 고르는 것도 좋아',
  '네가 잠들면 이불 덮어줄게',
  '매일 "잘 자" 말해줄게, 평생',
  '우리 강아지 키우자, 이름은 같이 정하자',
  '할머니 할아버지 돼서도 손잡고 걷자',
  '10년 뒤에도 이렇게 유치한 거 만들어줄게 ㅋㅋ',
  '약속할게, 네 편이 되어줄게 항상',
  '카운트다운 시작! 남은 버튼 12개!',

  // ── 7막: 마지막 인사 (88-99) ──
  '여기까지 와줘서 고마워',
  '진짜 100번 누를 줄은 몰랐어 ㅋㅋ',
  '근데 그만큼 이 페이지 오래 봐줬다는 거잖아',
  '그것만으로도 나 엄청 행복해',
  '윤경아,',
  '너를 정말 많이 좋아해',
  '아니, 좋아하는 걸 넘어서',
  '사랑해',
  '내 사람아',
  '이제 Yes 눌러줄 거지...?',
  '마지막이야, 진짜 마지막',
  '...Yes',
];

// ============================================================
// Success messages (multi-line typing)
// ============================================================

var SUCCESS_MESSAGES = [
  'Yay! 해피 발렌타인데이 \u2764\uFE0F',
  '앞으로도 쭉 내 옆에 있어줘 \uD83D\uDC95',
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
// URL Parameters (XSS-safe: textContent only)
// ============================================================

function getUrlParams() {
  var params = new URLSearchParams(window.location.search);
  return {
    name: params.get('name'),
    msg: params.get('msg'),
    date: params.get('date'),
  };
}

function applyUrlParams() {
  var p = getUrlParams();

  if (p.name) {
    var name = p.name.substring(0, 20);
    var titleEl = document.getElementById('title');
    titleEl.textContent = titleEl.textContent.replace('윤경', name);

    for (var i = 0; i < NO_MESSAGES.length; i++) {
      NO_MESSAGES[i] = NO_MESSAGES[i].replace(/윤경/g, name);
    }
    for (var i = 0; i < SUCCESS_MESSAGES.length; i++) {
      SUCCESS_MESSAGES[i] = SUCCESS_MESSAGES[i].replace(/윤경/g, name);
    }
  }

  if (p.msg) {
    SUCCESS_MESSAGES[SUCCESS_MESSAGES.length - 1] = p.msg.substring(0, 100);
  }
}

// ============================================================
// Revisit detection (localStorage)
// ============================================================

function checkRevisit() {
  try {
    var visits = parseInt(localStorage.getItem('valentine_visits') || '0', 10);
    visits++;
    localStorage.setItem('valentine_visits', visits.toString());
  } catch (e) {
    // localStorage unavailable
  }
}

function markCompleted() {
  try {
    localStorage.setItem('valentine_completed', 'true');
  } catch (e) {}
}

// ============================================================
// Stage manager — 배경/하트빈도 진화
// ============================================================

function getCurrentStageIndex() {
  for (var i = 0; i < STAGES.length; i++) {
    if (STATE.escapeCount >= STAGES[i].range[0] && STATE.escapeCount <= STAGES[i].range[1]) {
      return i;
    }
  }
  return STAGES.length - 1;
}

function applyStage() {
  var idx = getCurrentStageIndex();
  if (idx === STATE.currentStageIndex) return;

  STATE.currentStageIndex = idx;
  var stage = STAGES[idx];

  document.body.style.backgroundImage = stage.bg;

  if (stage.heartInterval !== currentHeartInterval) {
    currentHeartInterval = stage.heartInterval;
    if (heartIntervalId) {
      clearInterval(heartIntervalId);
      heartIntervalId = setInterval(spawnHeart, currentHeartInterval);
    }
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
  var vw = window.innerWidth;
  var vh = window.innerHeight;
  var maxX = Math.max(MARGIN, vw - btnRect.width - MARGIN);
  var maxY = Math.max(MARGIN, vh - btnRect.height - MARGIN);

  var x, y;
  var attempts = 0;
  do {
    x = MARGIN + Math.random() * (maxX - MARGIN);
    y = MARGIN + Math.random() * (maxY - MARGIN);
    attempts++;
  } while (isOverlappingYesButton(x, y, btnRect) && attempts < 100);

  // 뷰포트 밖으로 절대 나가지 않도록 클램핑
  x = Math.max(0, Math.min(x, vw - btnRect.width));
  y = Math.max(0, Math.min(y, vh - btnRect.height));

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

var YES_SCALE_INCREMENT = 0.04;
var YES_SCALE_MAX = 5.0;

function growYesButton(btnYes) {
  STATE.yesScale = Math.min(STATE.yesScale + YES_SCALE_INCREMENT, YES_SCALE_MAX);
  btnYes.style.transform = 'scale(' + STATE.yesScale + ')';
}

// ============================================================
// Burst effect (hearts explode from No button)
// ============================================================

var BURST_HEARTS = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC97', '\uD83D\uDC96', '\uD83E\uDE77'];

function spawnBurst(x, y) {
  var count = 6 + Math.floor(Math.random() * 3);
  for (var i = 0; i < count; i++) {
    var heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = BURST_HEARTS[Math.floor(Math.random() * BURST_HEARTS.length)];

    var angle = (Math.PI * 2 / count) * i;
    var distance = 40 + Math.random() * 40;
    var bx = Math.cos(angle) * distance;
    var by = Math.sin(angle) * distance;

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--burst-x', bx + 'px');
    heart.style.setProperty('--burst-y', by + 'px');

    document.body.appendChild(heart);
    heart.addEventListener('animationend', function () {
      this.remove();
    });
  }
}

// ============================================================
// Progress bar
// ============================================================

function updateProgressBar() {
  var progress = (STATE.escapeCount / (NO_MESSAGES.length - 1)) * 100;
  document.getElementById('progress-fill').style.width = Math.min(progress, 100) + '%';
}

// ============================================================
// Escape handler
// ============================================================

function handleEscape(e) {
  if (STATE.isSuccessScreen) return;

  var btnNo = document.getElementById('btn-no');
  var btnYes = document.getElementById('btn-yes');

  STATE.escapeCount++;

  // Burst effect at button position
  var rect = btnNo.getBoundingClientRect();
  spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

  var pos = getRandomPosition(btnNo);
  btnNo.classList.add('escaped');
  btnNo.style.left = pos.x + 'px';
  btnNo.style.top = pos.y + 'px';

  var noScale = Math.max(0.35, 1 - STATE.escapeCount * 0.007);
  btnNo.style.transform = 'scale(' + noScale + ')';

  growYesButton(btnYes);
  updateNoButtonText(btnNo);
  updateProgressBar();
  applyStage();
  triggerHaptic();

  // 마지막 메시지 도달 → No 버튼이 Yes로 전환
  if (STATE.escapeCount >= NO_MESSAGES.length - 1) {
    btnNo.removeEventListener('mouseenter', handleEscape);
    btnNo.removeEventListener('touchstart', handleEscape);
    btnNo.style.cursor = 'pointer';
    btnNo.addEventListener('click', showSuccessScreen);
    btnNo.addEventListener('touchend', function () {
      showSuccessScreen();
    });
  }
}

// ============================================================
// Success screen — 순차 연출 타임라인
// ============================================================

function showSuccessScreen() {
  if (STATE.isSuccessScreen) return;
  STATE.isSuccessScreen = true;
  markCompleted();

  // Stop main-screen intervals
  if (floatIntervalId) { clearInterval(floatIntervalId); floatIntervalId = null; }
  if (heartIntervalId) { clearInterval(heartIntervalId); heartIntervalId = null; }

  // Hide progress bar
  var progressBar = document.getElementById('progress-bar');
  if (progressBar) progressBar.style.opacity = '0';

  // Crossfade: fade out main, fade in success
  document.getElementById('main-screen').classList.remove('screen--active');

  setTimeout(function () {
    document.getElementById('success-screen').classList.add('screen--active');

    // 0.8s — Photo fade-in + scale
    setTimeout(function () {
      document.getElementById('success-media').classList.add('success-media--visible');
    }, 800);

    // 1.0s — Twinkle particles
    setTimeout(function () {
      spawnTwinkles();
    }, 1000);

    // 1.5s — First confetti
    setTimeout(function () {
      launchConfetti();
    }, 1500);

    // 2.5s — Start multi-line typing
    setTimeout(function () {
      startMultiLineTyping();
    }, 2500);

    // 5.5s — Second confetti
    setTimeout(function () {
      launchConfetti();
    }, 5500);

    // 6.0s — D-day counter
    setTimeout(function () {
      showDday();
    }, 6000);
  }, 400);
}

// ============================================================
// Multi-line typing effect
// ============================================================

function startMultiLineTyping() {
  var el = document.getElementById('typing-text');
  el.textContent = '';
  el.classList.add('typing-text--typing');

  var lineIndex = 0;
  var charIndex = 0;
  var speed = 80;

  function typeNextChar() {
    if (lineIndex >= SUCCESS_MESSAGES.length) {
      el.classList.remove('typing-text--typing');
      return;
    }

    var line = SUCCESS_MESSAGES[lineIndex];

    if (charIndex < line.length) {
      if (charIndex === 0 && lineIndex > 0) {
        el.textContent += '\n';
      }
      el.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeNextChar, speed);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, lineIndex === 1 ? 1000 : 500);
    }
  }

  typeNextChar();
}

// ============================================================
// Twinkle particles (success screen)
// ============================================================

function spawnTwinkles() {
  var container = document.getElementById('success-screen');
  for (var i = 0; i < 30; i++) {
    var star = document.createElement('div');
    star.className = 'twinkle';
    star.style.left = (Math.random() * 100) + '%';
    star.style.top = (Math.random() * 100) + '%';
    var size = 2 + Math.random() * 4;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.setProperty('--twinkle-duration', (1.5 + Math.random() * 1.5) + 's');
    star.style.setProperty('--twinkle-delay', (Math.random() * 2) + 's');
    container.appendChild(star);
  }
}

// ============================================================
// D-day counter
// ============================================================

function showDday() {
  var p = getUrlParams();
  var dateStr = p.date || '2024-12-22';
  var start = new Date(dateStr);
  var today = new Date();

  if (isNaN(start.getTime())) return;

  var diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return;

  var el = document.getElementById('dday-counter');
  if (el) {
    el.textContent = '우리 만난 지 D+' + diff + '일 \uD83D\uDC95';
    el.classList.add('dday-counter--visible');
  }
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
  floatIntervalId = setInterval(spawnFloatPhoto, FLOAT_INTERVAL_MS);
}

// ============================================================
// Heart particles
// ============================================================

var HEART_CHARS = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC97', '\uD83D\uDC96', '\uD83E\uDE77'];

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
  heartIntervalId = setInterval(spawnHeart, currentHeartInterval);
}

// ============================================================
// Visibility change handler (pause/resume on tab switch)
// ============================================================

function handleVisibilityChange() {
  if (STATE.isSuccessScreen) return;

  if (document.hidden) {
    if (floatIntervalId) { clearInterval(floatIntervalId); floatIntervalId = null; }
    if (heartIntervalId) { clearInterval(heartIntervalId); heartIntervalId = null; }
  } else {
    if (!floatIntervalId) {
      floatIntervalId = setInterval(spawnFloatPhoto, FLOAT_INTERVAL_MS);
    }
    if (!heartIntervalId) {
      heartIntervalId = setInterval(spawnHeart, currentHeartInterval);
    }
  }
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

  // URL params → name/msg/date customization
  applyUrlParams();

  // Revisit detection → title override
  checkRevisit();

  bindNoButtonEvents(btnNo);
  btnYes.addEventListener('click', showSuccessScreen);

  startHeartParticles();
  startFloatingPhotos();
  initMouseGlow();

  // Tab visibility → pause/resume intervals
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

document.addEventListener('DOMContentLoaded', init);
