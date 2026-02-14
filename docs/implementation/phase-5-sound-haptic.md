# Phase 5: 사운드 & 햅틱 피드백

> 목표: BGM, 효과음(pop/success), 모바일 햅틱 진동을 구현한다.
> Phase 3(핵심 로직) 완료 후 진행.

---

## 1. 체크리스트

- [ ] 오디오 객체 초기화
- [ ] 모바일 autoplay 정책 대응 (첫 인터랙션 후 재생)
- [ ] `playSound()` 효과음 재생 함수
- [ ] BGM 토글(`toggleMute()`) 구현
- [ ] 햅틱 피드백(`triggerHaptic()`) 구현
- [ ] Phase 3의 `handleEscape` / `showSuccessScreen`과 연동

---

## 2. 오디오 초기화

### 2.1 오디오 객체

```js
const AUDIO = {
  bgm: null,
  pop: null,
  success: null,
};
```

### 2.2 초기화 함수

```js
function initAudio() {
  AUDIO.bgm = new Audio('assets/audio/bgm.mp3');
  AUDIO.bgm.loop = true;
  AUDIO.bgm.volume = 0.3;

  AUDIO.pop = new Audio('assets/audio/pop.mp3');
  AUDIO.pop.volume = 0.5;

  AUDIO.success = new Audio('assets/audio/success.mp3');
  AUDIO.success.volume = 0.6;
}
```

### 2.3 볼륨 설정

| 사운드 | 볼륨 | 이유 |
|--------|------|------|
| BGM | 0.3 | 배경이므로 낮게 |
| Pop (도망 효과음) | 0.5 | 적당한 피드백 |
| Success (축하) | 0.6 | 하이라이트 순간 |

---

## 3. 모바일 Autoplay 정책 대응

### 문제

모바일 브라우저(Chrome, Safari)는 유저 인터랙션(click/touch) 없이는 오디오 재생을 차단한다.

### 해결

첫 번째 인터랙션 이벤트에서 오디오를 초기화하고 재생을 시도한다.

```js
function handleFirstInteraction() {
  if (!AUDIO.bgm) initAudio();
  if (!STATE.isMuted) {
    AUDIO.bgm.play().catch(() => {});
  }
  // 이벤트 리스너 제거 (1회만 실행)
  document.removeEventListener('click', handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
}
```

`init()` 에서 등록:

```js
document.addEventListener('click', handleFirstInteraction, { once: true });
document.addEventListener('touchstart', handleFirstInteraction, { once: true });
```

---

## 4. 효과음 재생

```js
function playSound(name) {
  if (STATE.isMuted || !AUDIO[name]) return;
  AUDIO[name].currentTime = 0;  // 처음부터 재생
  AUDIO[name].play().catch(() => {});
}
```

### 호출 시점

| 함수 | 사운드 | 시점 |
|------|--------|------|
| `handleEscape()` | `pop` | No 버튼 도망할 때마다 |
| `showSuccessScreen()` | `success` | Yes 클릭 시 1회 |

---

## 5. BGM 토글

```js
function toggleMute() {
  STATE.isMuted = !STATE.isMuted;
  const toggleBtn = document.getElementById('bgm-toggle');
  toggleBtn.textContent = STATE.isMuted ? '🔇' : '🔊';

  if (STATE.isMuted) {
    AUDIO.bgm?.pause();
  } else {
    if (!AUDIO.bgm) initAudio();
    AUDIO.bgm?.play().catch(() => {});
  }
}
```

### 토글 상태

| 상태 | 아이콘 | BGM | 효과음 |
|------|--------|-----|--------|
| 뮤트 (기본) | 🔇 | 정지 | 재생 안 함 |
| 언뮤트 | 🔊 | 재생 | 재생 |

기본값은 **뮤트**로 시작 — 갑자기 소리가 나서 놀라지 않도록.

---

## 6. 햅틱 피드백

```js
function triggerHaptic() {
  if ('vibrate' in navigator) {
    navigator.vibrate(100);
  }
}
```

### 호환성

| 브라우저 | 지원 여부 |
|----------|-----------|
| Chrome (Android) | O |
| Safari (iOS) | X |
| Chrome (Desktop) | X (진동 모터 없음) |

Feature detection(`'vibrate' in navigator`)으로 안전하게 호출.

---

## 7. 에셋 준비

Phase 6에서 최종 교체하지만, 이 Phase에서 동작 확인을 위해 임시 오디오 파일이 필요하다.

### 필요한 오디오 파일

| 파일 | 용도 | 권장 스펙 |
|------|------|-----------|
| `assets/audio/bgm.mp3` | 배경음악 (루프) | 30초~2분, < 1MB |
| `assets/audio/pop.mp3` | No 버튼 효과음 | 0.3~0.5초, < 50KB |
| `assets/audio/success.mp3` | Yes 성공 효과음 | 2~5초, < 200KB |

무료 효과음 소스:
- freesound.org
- pixabay.com/sound-effects

---

## 8. Phase 3과의 연동

Phase 3에서는 사운드/햅틱 함수가 없을 때를 대비해 `typeof` 체크를 했다. 이 Phase에서 함수를 구현하면 자동으로 연동된다.

```js
// Phase 3의 handleEscape() 내에서:
if (typeof playSound === 'function') playSound('pop');
if (typeof triggerHaptic === 'function') triggerHaptic();
```

모든 코드가 단일 `app.js`에 있으므로 별도 import 없이 동작한다.

---

## 9. 완료 기준

- BGM 토글 버튼 클릭 시 배경음악이 재생/정지됨
- No 버튼 도망 시 '뿅' 효과음이 재생됨
- Yes 클릭 시 축하 효과음이 재생됨
- 뮤트 상태에서는 모든 사운드가 비활성화
- Android에서 No 버튼 터치 시 짧은 진동 피드백
- iOS에서는 진동 없이 정상 동작 (에러 없음)
