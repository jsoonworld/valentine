# Phase 4: 애니메이션 (하트 파티클, Confetti, 타이핑 효과)

> 목표: 배경 하트 파티클, 성공 화면 Confetti, 타이핑 편지 효과를 구현한다.
> Phase 2(CSS)가 완료되면 Phase 3과 **병렬로 진행 가능**.

---

## 1. 체크리스트

- [ ] 하트 파티클 생성 로직
- [ ] 하트 파티클 자동 시작 & DOM 정리
- [ ] Confetti 발사 로직
- [ ] 타이핑 효과 구현
- [ ] 메모리 누수 방지 (애니메이션 종료 시 DOM 제거)

---

## 2. 하트 파티클

### 2.1 하트 생성 함수

```js
const HEART_CHARS = ['❤️', '💕', '💗', '💖', '🩷'];
const HEART_INTERVAL_MS = 800;

function spawnHeart() {
  const container = document.getElementById('hearts-container');
  const heart = document.createElement('span');
  heart.classList.add('heart');
  heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];

  // 랜덤 속성 부여
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;

  container.appendChild(heart);

  // 애니메이션 종료 후 DOM에서 제거
  heart.addEventListener('animationend', () => heart.remove());
}
```

### 2.2 자동 시작

```js
function startHeartParticles() {
  setInterval(spawnHeart, HEART_INTERVAL_MS);
}
```

`init()` 함수에서 `startHeartParticles()` 호출.

### 2.3 랜덤 파라미터 범위

| 속성 | 최소 | 최대 | 목적 |
|------|------|------|------|
| `left` | 0vw | 100vw | 화면 전체 너비에 걸쳐 분포 |
| `animationDuration` | 4s | 8s | 속도 변화로 자연스러움 |
| `fontSize` | 0.8rem | 2.0rem | 크기 변화로 깊이감 |

### 2.4 메모리 관리

- `animationend` 이벤트 리스너로 애니메이션 완료된 하트를 DOM에서 즉시 제거
- 동시에 화면에 존재하는 하트 수: 약 6~10개 (800ms 간격, 4~8초 지속)

---

## 3. Confetti 발사

### 3.1 Confetti 생성 함수

```js
const CONFETTI_COLORS = [
  '#ff4d6d', '#ff758f', '#ffb3c6',
  '#ffd6e0', '#c9184a', '#ffdd00', '#ff9500'
];
const CONFETTI_COUNT = 80;

function launchConfetti() {
  const container = document.getElementById('confetti-container');

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    // 랜덤 속성
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor =
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;

    container.appendChild(piece);

    // 정리
    piece.addEventListener('animationend', () => piece.remove());
  }
}
```

### 3.2 Confetti 랜덤 파라미터

| 속성 | 범위 | 목적 |
|------|------|------|
| `left` | 0~100% | 화면 전체에 뿌리기 |
| `backgroundColor` | 7가지 색상 | 핑크/골드 톤 파티 느낌 |
| `animationDelay` | 0~2s | 시차를 두어 자연스럽게 |
| `animationDuration` | 2~4s | 속도 차이 |

### 3.3 호출 시점

`showSuccessScreen()` 내에서 Yes 클릭 시 1회 호출.

---

## 4. 타이핑 효과

### 4.1 구현

```js
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

### 4.2 파라미터

| 파라미터 | 기본값 | 설명 |
|----------|--------|------|
| `message` | - | 표시할 전체 메시지 문자열 |
| `speed` | 80ms | 글자 당 표시 간격 |

### 4.3 호출 시점

```js
// showSuccessScreen() 내에서
startTypingEffect('Yay! 해피 발렌타인데이 ❤️');
```

총 메시지 길이 약 18자 × 80ms = 약 1.4초에 완성.

---

## 5. 엣지 케이스

| 상황 | 대응 |
|------|------|
| 하트가 계속 쌓이는 경우 | `animationend`로 자동 제거, 동시 10개 이내 |
| 성공 화면 진입 후 하트가 계속 생성 | 의도적으로 유지 (배경 효과로 계속 활용) |
| Confetti가 모두 사라진 후 | DOM 자동 정리, 추가 동작 없음 |
| 타이핑 중 화면 전환 | 성공 화면 진입 후에만 호출되므로 문제 없음 |

---

## 6. 완료 기준

- 페이지 로드 시 배경에 하트가 은은하게 떠오르는 것이 보임
- Yes 클릭 시 성공 화면에서 Confetti가 폭죽처럼 쏟아짐
- 성공 화면에서 메시지가 한 글자씩 타이핑됨
- 브라우저 DevTools에서 DOM 노드 수가 시간이 지나도 급격히 증가하지 않음
