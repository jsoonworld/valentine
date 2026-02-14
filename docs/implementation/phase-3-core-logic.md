# Phase 3: 핵심 JavaScript 로직

> 목표: No 버튼 도망, Yes 버튼 확대, 단계별 메시지 변화, 성공 화면 전환 등 핵심 인터랙션을 구현한다.

---

## 1. 체크리스트

- [ ] 상태 객체(`STATE`) 정의
- [ ] No 버튼 도망 좌표 계산 함수
- [ ] No 버튼 이벤트 바인딩 (데스크탑 hover, 모바일 touch)
- [ ] 도망 핸들러 구현 (위치 변경 + 크기 축소)
- [ ] 단계별 메시지 배열 & 텍스트 업데이트
- [ ] Yes 버튼 scale 증가 로직
- [ ] Yes 버튼 클릭 → 성공 화면 전환
- [ ] 초기화 함수(`init`) & DOMContentLoaded 바인딩

---

## 2. 상태 관리

```js
const STATE = {
  escapeCount: 0,        // No 버튼 도망 횟수
  yesScale: 1.0,         // Yes 버튼 현재 scale
  isMuted: true,         // BGM 뮤트 상태 (기본: 뮤트)
  isSuccessScreen: false, // 성공 화면 표시 여부
};
```

단일 객체로 모든 상태를 관리하여 디버깅과 추적을 용이하게 한다.

---

## 3. No 버튼 도망 좌표 계산

### 3.1 랜덤 좌표 생성

```js
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
```

### 3.2 Yes 버튼 겹침 방지

```js
function isOverlappingYesButton(x, y, noBtnRect) {
  const yesBtn = document.getElementById('btn-yes');
  const yesRect = yesBtn.getBoundingClientRect();
  const padding = 50; // 여유 간격

  return !(
    x + noBtnRect.width + padding < yesRect.left ||
    x - padding > yesRect.right ||
    y + noBtnRect.height + padding < yesRect.top ||
    y - padding > yesRect.bottom
  );
}
```

핵심: No 버튼이 Yes 버튼 위에 겹쳐지지 않도록 padding을 두고 재계산한다.

---

## 4. No 버튼 이벤트 바인딩

```js
function bindNoButtonEvents(btnNo) {
  // 데스크탑: 마우스가 닿는 순간 도망
  btnNo.addEventListener('mouseenter', handleEscape);
  // 모바일: 터치 시 도망
  btnNo.addEventListener('touchstart', handleEscape, { passive: false });
}
```

| 환경 | 이벤트 | 동작 |
|------|--------|------|
| 데스크탑 | `mouseenter` | 마우스 커서가 버튼에 닿으면 즉시 도망 |
| 모바일 | `touchstart` | 터치하는 순간 도망 (터치 이벤트가 click보다 먼저 발생) |

`passive: false`로 설정하여 `preventDefault()` 호출 가능하게 한다.

---

## 5. 도망 핸들러

```js
function handleEscape(e) {
  e.preventDefault();
  const btnNo = document.getElementById('btn-no');
  const btnYes = document.getElementById('btn-yes');

  STATE.escapeCount++;

  // 1) No 버튼 절대 위치로 전환 + 랜덤 이동
  const { x, y } = getRandomPosition(btnNo);
  btnNo.classList.add('escaped');
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;

  // 2) No 버튼 크기 축소 (5%씩, 최소 40%)
  const noScale = Math.max(0.4, 1 - STATE.escapeCount * 0.05);
  btnNo.style.transform = `scale(${noScale})`;

  // 3) Yes 버튼 크기 확대
  growYesButton(btnYes);

  // 4) No 버튼 텍스트 변경
  updateNoButtonText(btnNo);

  // 5) 효과음 (Phase 5에서 구현)
  if (typeof playSound === 'function') playSound('pop');

  // 6) 햅틱 (Phase 5에서 구현)
  if (typeof triggerHaptic === 'function') triggerHaptic();
}
```

---

## 6. 단계별 메시지

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

8단계 이후에는 마지막 메시지("마지막 기회야!")가 계속 유지된다.

---

## 7. Yes 버튼 확대

```js
const YES_SCALE_INCREMENT = 0.15; // 15%씩 증가

function growYesButton(btnYes) {
  STATE.yesScale += YES_SCALE_INCREMENT;
  btnYes.style.transform = `scale(${STATE.yesScale})`;
}
```

No 버튼이 도망갈수록 Yes 버튼이 점점 커져서 "어서 눌러!" 느낌을 준다.

---

## 8. 성공 화면 전환

```js
function showSuccessScreen() {
  STATE.isSuccessScreen = true;

  // 메인 화면 숨기기
  document.getElementById('main-screen').classList.add('hidden');
  // 성공 화면 표시
  document.getElementById('success-screen').classList.remove('hidden');

  // 애니메이션 & 사운드 (Phase 4, 5에서 구현)
  if (typeof playSound === 'function') playSound('success');
  if (typeof launchConfetti === 'function') launchConfetti();
  if (typeof startTypingEffect === 'function') {
    startTypingEffect('Yay! 해피 발렌타인데이 ❤️');
  }
}
```

---

## 9. 초기화

```js
function init() {
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');

  // 핵심 이벤트 바인딩
  bindNoButtonEvents(btnNo);
  btnYes.addEventListener('click', showSuccessScreen);

  // BGM 토글 (Phase 5에서 구현, 여기서는 껍데기만)
  const bgmToggle = document.getElementById('bgm-toggle');
  bgmToggle.addEventListener('click', () => {
    if (typeof toggleMute === 'function') toggleMute();
  });
}

document.addEventListener('DOMContentLoaded', init);
```

---

## 10. 엣지 케이스 & 주의사항

| 상황 | 대응 |
|------|------|
| No 버튼이 화면 밖으로 나가는 경우 | `MARGIN`으로 안전 영역 확보 |
| Yes 버튼과 No 버튼이 겹치는 경우 | `isOverlappingYesButton`으로 재계산 |
| Yes 버튼이 너무 커지는 경우 | 최대 scale 제한 고려 (선택) |
| 빠르게 연속 터치하는 경우 | 이벤트 핸들러 내 로직이 즉시 실행되므로 문제 없음 |
| 화면 회전 (모바일) | `getRandomPosition`이 `window.innerWidth/Height`를 매번 참조하므로 자동 대응 |

---

## 11. 완료 기준

- No 버튼에 마우스를 올리면 (데스크탑) / 터치하면 (모바일) 랜덤 위치로 도망감
- 도망갈 때마다 No 버튼 텍스트가 순차적으로 변경됨
- 도망갈 때마다 No 버튼은 작아지고, Yes 버튼은 커짐
- Yes 클릭 시 메인 화면이 사라지고 성공 화면이 나타남
- 사운드/애니메이션 함수가 아직 없어도 에러 없이 동작함
