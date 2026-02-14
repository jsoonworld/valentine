# Phase 2: CSS 스타일링 & 반응형 디자인

> 목표: Mobile-First 반응형 스타일을 완성하고, 정적인 상태에서 UI가 완벽하게 렌더링되도록 한다.

---

## 1. 체크리스트

- [ ] CSS 커스텀 프로퍼티 정의
- [ ] 글로벌 리셋 & body 스타일
- [ ] 화면 레이아웃 (`.screen`)
- [ ] 메인 화면 컴포넌트 스타일 (미디어, 타이틀, 버튼)
- [ ] 성공 화면 스타일
- [ ] BGM 토글 버튼 스타일
- [ ] 유틸리티 클래스 (`.hidden`)
- [ ] 반응형 미디어 쿼리 (Tablet, Desktop)
- [ ] 하트 파티클 CSS (`.heart`, `@keyframes floatHeart`)
- [ ] Confetti CSS (`.confetti-piece`, `@keyframes confettiFall`)

---

## 2. CSS 커스텀 프로퍼티

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

---

## 3. 글로벌 리셋 & Body

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-bg);
  font-family: var(--font-main);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}
```

핵심 포인트:
- `overflow: hidden` — No 버튼이 밖으로 나가도 스크롤바 생기지 않음
- `100vh` — 모바일 주소창 대응 (필요시 `dvh` 사용 검토)

---

## 4. 화면 레이아웃

```css
.screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  display: none;
}
```

---

## 5. 메인 화면 컴포넌트

### 5.1 콘텐츠 컨테이너

```css
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-md);
  gap: var(--spacing-lg);
  z-index: 1;
}
```

### 5.2 미디어 영역

```css
.main-media {
  max-width: 200px;
  width: 100%;
  height: auto;
  border-radius: 16px;
}
```

### 5.3 타이틀

```css
.title {
  font-family: var(--font-accent);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}
```

### 5.4 버튼 그룹 & 버튼

```css
.button-group {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.btn {
  border: none;
  border-radius: var(--btn-radius);
  padding: 12px 24px;
  font-size: 1rem;
  font-family: var(--font-main);
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--transition-speed) ease;
}

.btn--yes {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn--yes:hover {
  background-color: var(--color-primary-dark);
}

.btn--no {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  transition: all var(--transition-speed) ease;
}

.btn--no.escaped {
  position: absolute;
}
```

---

## 6. 성공 화면

```css
.screen--success {
  background-color: var(--color-success-bg);
  z-index: 10;
}

.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  z-index: 1;
}

.success-image {
  max-width: 280px;
  width: 100%;
  border-radius: 16px;
}

.typing-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  min-height: 2em;
}
```

---

## 7. BGM 토글 버튼

```css
.bgm-toggle {
  position: fixed;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
}
```

---

## 8. 반응형 미디어 쿼리

```css
/* Tablet (>= 768px) */
@media (min-width: 768px) {
  .title { font-size: 2rem; }
  .main-media { max-width: 300px; }
  .btn { padding: 14px 32px; font-size: 1.1rem; }
  .success-image { max-width: 360px; }
  .typing-text { font-size: 1.6rem; }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .title { font-size: 2.5rem; }
  .main-media { max-width: 400px; }
  .success-image { max-width: 450px; }
  .typing-text { font-size: 1.8rem; }
}
```

---

## 9. 하트 파티클 CSS

```css
.hearts-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

---

## 10. Confetti CSS

```css
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

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

## 11. 완료 기준

- 모바일(375px 너비)에서 메인 화면 UI가 중앙 정렬되어 깔끔하게 보임
- 태블릿/데스크탑에서 폰트와 이미지 크기가 적절히 확대됨
- Yes 버튼: 핑크 배경 + 흰색 텍스트
- No 버튼: 흰 배경 + 핑크 테두리
- BGM 토글이 우측 상단에 고정 표시
- 성공 화면은 `hidden` 상태로 보이지 않음
- 하트/Confetti 애니메이션 CSS가 준비된 상태 (JS 없이는 동작 안 함)
