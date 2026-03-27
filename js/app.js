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
  // ── 1막: 장난스러운 시작 (1-12) ──
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

  // ── 2막: 엉뚱한 리액션 (13-28) ──
  '❤️ HP: ████████░░ 80%',
  '아ㅋㅋㅋ 이거 설마 일부러?',
  '❤️ HP: ██████░░░░ 60%',
  '내 심장은 유리인데요..',
  '이 버튼 누를 때마다 어딘가에서 고양이가 울어요',
  '❤️ HP: ████░░░░░░ 40%',
  '이거 캡처해서 친구한테 보내지 마...',
  '나 이러다 진짜 삐질 수 있는 사람이야',
  '윤경아... 나 많이 슬프다...?',
  '❤️ HP: ██░░░░░░░░ 20%',
  'No 버튼 장인이시네요 ^^',
  '이쯤 되면 집착 아닌가요?',
  '아직도요? 체력 좋으시다...',
  '나 원래 이렇게 안 매달리는 사람인데',
  '❤️ HP: █░░░░░░░░░ 10%',
  '나... 괜찮아... 괜찮다고...',

  // ── 3막: 버튼의 자아각성 (29-40) ──
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

  // ── 4막: 진심 전달 (41-58) ──
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

  // ── 5막: 속보 & 유머 브레이크 (59-72) ──
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

  // ── 6막: 약속과 미래 (73-88) ──
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

  // ── 7막: 마지막 인사 (89-100) ──
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

var YES_SCALE_INCREMENT = 0.04;
var YES_SCALE_MAX = 5.0;

function growYesButton(btnYes) {
  STATE.yesScale = Math.min(STATE.yesScale + YES_SCALE_INCREMENT, YES_SCALE_MAX);
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

  var noScale = Math.max(0.35, 1 - STATE.escapeCount * 0.007);
  btnNo.style.transform = 'scale(' + noScale + ')';

  growYesButton(btnYes);
  updateNoButtonText(btnNo);
  triggerHaptic();

  // 100번째 (마지막) 메시지 도달 시 → Yes 전환
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
