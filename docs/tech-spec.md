# Tech Spec: "Will You Be My Valentine?" 인터랙티브 웹페이지

> 본 문서는 [1-pager.md](./1-pager.md) 기획서를 기반으로 작성된 기술 명세서입니다.

---

## 1. 프로젝트 구조 (File Structure)

```
valentine/
├── index.html              # 메인 HTML (싱글 페이지)
├── css/
│   └── style.css           # 전체 스타일 + 애니메이션
├── js/
│   └── app.js              # 전체 인터랙션 로직
├── assets/
│   ├── images/             # 배경, 커플 사진 등
│   │   └── placeholder.png
│   ├── audio/              # BGM, 효과음
│   │   ├── bgm.mp3
│   │   ├── pop.mp3         # No 버튼 도망 효과음
│   │   └── success.mp3     # Yes 성공 효과음
│   └── gif/                # GIF 파일
│       └── placeholder.gif
└── docs/
    ├── 1-pager.md
    └── tech-spec.md
```

---

## 2. HTML 구조 (DOM Structure)

### 2.1 전체 레이아웃

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Will You Be My Valentine?</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body>
  <!-- BGM 컨트롤 -->
  <button id="bgm-toggle" class="bgm-toggle" aria-label="음악 켜기/끄기">
    🔇
  </button>

  <!-- 하트 파티클 컨테이너 -->
  <div id="hearts-container" class="hearts-container"></div>

  <!-- 메인 화면 -->
  <main id="main-screen" class="screen screen--main">
    <div class="content">
      <div class="media-area">
        <img id="main-gif" src="assets/gif/placeholder.gif" alt="발렌타인" class="main-media">
      </div>
      <h1 class="title">윤경,, will you be my valentine?</h1>
      <div class="button-group">
        <button id="btn-yes" class="btn btn--yes">Yes</button>
        <button id="btn-no" class="btn btn--no">No</button>
      </div>
    </div>
  </main>

  <!-- 성공 화면 -->
  <section id="success-screen" class="screen screen--success hidden">
    <div id="confetti-container" class="confetti-container"></div>
    <div class="success-content">
      <div class="success-media">
        <img src="assets/images/placeholder.png" alt="우리 사진" class="success-image">
      </div>
      <p id="typing-text" class="typing-text"></p>
    </div>
  </section>

  <script src="js/app.js"></script>
</body>
</html>
```

### 2.2 네이밍 컨벤션

| 구분 | 규칙 | 예시 |
|------|------|------|
| ID | camelCase (JS 접근용) | `btn-yes`, `main-screen` |
| Class | BEM 방식 | `btn--yes`, `screen--main` |
| 상태 클래스 | `hidden`, `active` | `.hidden { display: none; }` |

---

## 3. CSS 설계 (Styling & Animation)

### 3.1 CSS 커스텀 프로퍼티

```css
:root {
  /* 색상 */
  --color-bg: #fff0f3;
  --color-primary: #ff4d6d;
  --color-primary-dark: #c9184a;
  --color-success-bg: #ffe5ec;
  --color-text: #590d22;
  --color-white: #ffffff;

  /* 폰트 */
  --font-main: 'Noto Sans KR', sans-serif;
  --font-accent: 'Dancing Script', cursive;

  /* 간격 */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;

  /* 버튼 */
  --btn-radius: 12px;
  --btn-padding: 14px 32px;
  --btn-font-size: 1.1rem;

  /* 애니메이션 */
  --transition-speed: 0.3s;
}
```

### 3.2 반응형 브레이크포인트

```css
/* Mobile-First 기본 (< 768px) */
.title { font-size: 1.4rem; }
.main-media { max-width: 200px; }
.btn { padding: 12px 24px; font-size: 1rem; }

/* Tablet (>= 768px) */
@media (min-width: 768px) {
  .title { font-size: 2rem; }
  .main-media { max-width: 300px; }
  .btn { padding: 14px 32px; font-size: 1.1rem; }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .title { font-size: 2.5rem; }
  .main-media { max-width: 400px; }
}
```

### 3.3 핵심 스타일

```css
/* 전체 컨테이너 */
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-bg);
  font-family: var(--font-main);
}

.screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden { display: none; }

/* Yes 버튼 */
.btn--yes {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--btn-radius);
  padding: var(--btn-padding);
  font-size: var(--btn-font-size);
  cursor: pointer;
  transition: transform var(--transition-speed) ease;
}

/* No 버튼 */
.btn--no {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--btn-radius);
  padding: var(--btn-padding);
  font-size: var(--btn-font-size);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.btn--no.escaped {
  position: absolute;
}
```

### 3.4 하트 파티클 애니메이션

```css
.hearts-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.heart {
  position: absolute;
  bottom: -20px;
  font-size: 1.2rem;
  opacity: 0;
  animation: floatHeart 6s ease-in forwards;
}

@keyframes floatHeart {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg) scale(0.5);
  }
  10% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) rotate(720deg) scale(1.2);
  }
}
```

### 3.5 Confetti 애니메이션

```css
.confetti-piece {
  position: absolute;
  top: -10px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: confettiFall 3s ease-in forwards;
}

@keyframes confettiFall {
  0% {
    opacity: 1;
    transform: translateY(0) rotateZ(0deg);
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) rotateZ(720deg);
  }
}
```

---

## 4. JavaScript 모듈 설계 (Logic)

### 4.1 상태 관리

```js
const STATE = {
  escapeCount: 0,        // No 버튼 도망 횟수
  yesScale: 1.0,         // Yes 버튼 현재 scale
  isMuted: true,         // BGM 뮤트 상태 (기본: 뮤트)
  isSuccessScreen: false, // 성공 화면 여부
};
```

### 4.2 No 버튼 도망 로직

```js
/**
 * No 버튼 도망 좌표 계산
 * - 화면 크기에서 버튼 크기 + 안전 마진을 뺀 범위 내에서 랜덤 좌표 생성
 * - Yes 버튼 근처 좌표는 제외하여 겹침 방지
 */
function getRandomPosition(buttonEl) {
  const MARGIN = 20;
  const btnRect = buttonEl.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - MARGIN;
  const maxY = window.innerHeight - btnRect.height - MARGIN;

  let x, y;
  do {
    x = MARGIN + Math.random() * (maxX - MARGIN);
    y = MARGIN + Math.random() * (maxY - MARGIN);
  } while (isOverlappingYesButton(x, y, btnRect));

  return { x, y };
}

/**
 * 이벤트 바인딩
 * - 데스크탑: mouseenter (호버 시 도망)
 * - 모바일: touchstart (터치 시 도망)
 */
function bindNoButtonEvents(btnNo) {
  btnNo.addEventListener('mouseenter', handleEscape);
  btnNo.addEventListener('touchstart', handleEscape, { passive: true });
}
```

### 4.3 단계별 메시지 배열

```js
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

function updateNoButtonText(btnNo) {
  const index = Math.min(STATE.escapeCount, NO_MESSAGES.length - 1);
  btnNo.textContent = NO_MESSAGES[index];
}
```

### 4.4 Yes 버튼 Scale 증가

```js
const YES_SCALE_INCREMENT = 0.15; // 도망 1회당 15% 증가

function growYesButton(btnYes) {
  STATE.yesScale += YES_SCALE_INCREMENT;
  btnYes.style.transform = `scale(${STATE.yesScale})`;
}
```

### 4.5 No 버튼 도망 핸들러

```js
function handleEscape(e) {
  e.preventDefault();
  const btnNo = document.getElementById('btn-no');
  const btnYes = document.getElementById('btn-yes');

  STATE.escapeCount++;

  // 1) No 버튼 랜덤 위치로 이동
  const { x, y } = getRandomPosition(btnNo);
  btnNo.classList.add('escaped');
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;

  // 2) No 버튼 크기 축소 (5%씩)
  const noScale = Math.max(0.4, 1 - STATE.escapeCount * 0.05);
  btnNo.style.transform = `scale(${noScale})`;

  // 3) Yes 버튼 크기 증가
  growYesButton(btnYes);

  // 4) No 버튼 텍스트 변경
  updateNoButtonText(btnNo);

  // 5) 효과음 재생
  playSound('pop');

  // 6) 햅틱 피드백 (모바일)
  triggerHaptic();
}
```

### 4.6 성공 화면 전환

```js
function showSuccessScreen() {
  STATE.isSuccessScreen = true;

  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('success-screen').classList.remove('hidden');

  // 1) 성공 효과음
  playSound('success');

  // 2) Confetti 발사
  launchConfetti();

  // 3) 타이핑 효과 시작
  startTypingEffect('Yay! 해피 발렌타인데이 ❤️');
}
```

### 4.7 타이핑 효과

```js
/**
 * 메시지를 한 글자씩 DOM에 추가
 * @param {string} message - 표시할 전체 메시지
 * @param {number} speed - 글자당 ms (기본 80ms)
 */
function startTypingEffect(message, speed = 80) {
  const el = document.getElementById('typing-text');
  el.textContent = '';
  let i = 0;

  const interval = setInterval(() => {
    if (i < message.length) {
      el.textContent += message[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}
```

### 4.8 사운드 제어

```js
const AUDIO = {
  bgm: null,
  pop: null,
  success: null,
};

/**
 * 오디오 초기화
 * - 모바일 autoplay 정책 대응: 첫 유저 인터랙션 시 초기화
 */
function initAudio() {
  AUDIO.bgm = new Audio('assets/audio/bgm.mp3');
  AUDIO.bgm.loop = true;
  AUDIO.bgm.volume = 0.3;

  AUDIO.pop = new Audio('assets/audio/pop.mp3');
  AUDIO.pop.volume = 0.5;

  AUDIO.success = new Audio('assets/audio/success.mp3');
  AUDIO.success.volume = 0.6;
}

/**
 * 첫 인터랙션 시 BGM 재생 시도 (autoplay 정책 대응)
 */
function handleFirstInteraction() {
  if (!AUDIO.bgm) initAudio();
  if (!STATE.isMuted) {
    AUDIO.bgm.play().catch(() => {});
  }
  document.removeEventListener('click', handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
}

function playSound(name) {
  if (STATE.isMuted || !AUDIO[name]) return;
  AUDIO[name].currentTime = 0;
  AUDIO[name].play().catch(() => {});
}

function toggleMute() {
  STATE.isMuted = !STATE.isMuted;
  const toggleBtn = document.getElementById('bgm-toggle');
  toggleBtn.textContent = STATE.isMuted ? '🔇' : '🔊';

  if (STATE.isMuted) {
    AUDIO.bgm?.pause();
  } else {
    AUDIO.bgm?.play().catch(() => {});
  }
}
```

### 4.9 햅틱 피드백

```js
function triggerHaptic() {
  if ('vibrate' in navigator) {
    navigator.vibrate(100);
  }
}
```

### 4.10 하트 파티클 생성

```js
const HEART_CHARS = ['❤️', '💕', '💗', '💖', '🩷'];
const HEART_INTERVAL_MS = 800;

function spawnHeart() {
  const container = document.getElementById('hearts-container');
  const heart = document.createElement('span');
  heart.classList.add('heart');
  heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
  container.appendChild(heart);

  // 애니메이션 종료 후 DOM에서 제거 (메모리 누수 방지)
  heart.addEventListener('animationend', () => heart.remove());
}

function startHeartParticles() {
  setInterval(spawnHeart, HEART_INTERVAL_MS);
}
```

### 4.11 Confetti 생성

```js
const CONFETTI_COLORS = ['#ff4d6d', '#ff758f', '#ffb3c6', '#ffd6e0', '#c9184a', '#ffdd00', '#ff9500'];
const CONFETTI_COUNT = 80;

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(piece);

    piece.addEventListener('animationend', () => piece.remove());
  }
}
```

### 4.12 초기화 (Entry Point)

```js
function init() {
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const bgmToggle = document.getElementById('bgm-toggle');

  // 이벤트 바인딩
  bindNoButtonEvents(btnNo);
  btnYes.addEventListener('click', showSuccessScreen);
  bgmToggle.addEventListener('click', toggleMute);

  // 모바일 autoplay 정책 대응
  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });

  // 하트 파티클 시작
  startHeartParticles();
}

document.addEventListener('DOMContentLoaded', init);
```

---

## 5. 에셋 명세 (Assets)

### 5.1 이미지

| 파일 | 용도 | 권장 사이즈 | 포맷 |
|------|------|-------------|------|
| `assets/images/couple.jpg` | 성공 화면 사진 | 600x600px 이하 | JPG/WebP |
| `assets/images/bg.jpg` | 배경 이미지 (선택) | 1920x1080px | JPG/WebP |

### 5.2 GIF

| 파일 | 용도 | 권장 사이즈 | 용량 |
|------|------|-------------|------|
| `assets/gif/main.gif` | 메인 화면 짤 | 300x300px 이하 | 2MB 이하 |

### 5.3 오디오

| 파일 | 용도 | 포맷 | 권장 길이 | 용량 |
|------|------|------|-----------|------|
| `assets/audio/bgm.mp3` | 배경음악 (루프) | MP3 | 30초~2분 | 1MB 이하 |
| `assets/audio/pop.mp3` | No 버튼 도망 효과음 | MP3 | 0.3~0.5초 | 50KB 이하 |
| `assets/audio/success.mp3` | Yes 성공 효과음 | MP3 | 2~5초 | 200KB 이하 |

### 5.4 폰트

| 폰트명 | 용도 | 소스 |
|---------|------|------|
| Noto Sans KR | 본문 (한글) | Google Fonts |
| Dancing Script | 타이틀 (영문 필기체) | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
```

---

## 6. 배포 가이드 (Deployment)

### GitHub Pages

```bash
# 1. 코드 푸시
git add -A && git commit -m "feat: valentine page" && git push

# 2. GitHub 레포 Settings > Pages 에서:
#    - Source: Deploy from a branch
#    - Branch: main / root
#    - Save

# 3. 배포 URL: https://jsoonworld.github.io/valentine/
```

`index.html`이 루트에 있으므로 별도 빌드 없이 바로 정적 호스팅 가능.

---

## 7. 브라우저 호환성 (Compatibility)

### 타겟 브라우저

| 브라우저 | 최소 버전 | 비고 |
|----------|-----------|------|
| Chrome (Android) | 80+ | 주요 타겟 |
| Safari (iOS) | 14+ | 주요 타겟 |
| Chrome (Desktop) | 80+ | 보조 |
| Safari (Desktop) | 14+ | 보조 |

### API 호환성

| 기능 | Chrome | Safari iOS | 대응 |
|------|--------|------------|------|
| CSS Custom Properties | O | O | - |
| CSS @keyframes | O | O | - |
| Audio API | O | O (유저 인터랙션 필요) | 첫 클릭/터치 후 재생 |
| `navigator.vibrate` | O | X | feature detection 후 호출 |
| `position: fixed` | O | O (일부 이슈) | `inset: 0` 대신 개별 속성 fallback 고려 |
| Touch Events | O | O | - |
