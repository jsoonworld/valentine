# Project 1-Pager: "Will You Be My Valentine?" 인터랙티브 웹페이지

## 1. 프로젝트 개요 (Overview)

* **목적:** 발렌타인데이를 맞아 여자친구(윤경)에게 마음을 전하는 이벤트용 싱글 페이지 웹사이트 제작.
* **타겟 환경:** 모바일 중심(Mobile-First) 반응형 웹 (모바일 80% / 데스크탑 20% 비율 고려).
* **핵심 경험:** 유저가 'No'를 선택할 수 없도록 유도하는 유쾌한 인터랙션과 로맨틱한 시각적 효과.

## 2. 주요 기능 및 인터랙션 (Key Features)

### 커스텀 배경 및 미디어 (Media Support)

* 화면 전체 배경에 로맨틱한 이미지나 애니메이션 GIF를 적용할 수 있는 구조.
* 텍스트 상단이나 하단에 메인 짤(GIF/사진)을 배치할 수 있는 영역 확보.
* 배경에 하트 파티클 애니메이션 (CSS 또는 Canvas) — 은은하게 하트가 떠오르는 효과로 로맨틱한 분위기 연출.

### 중앙 메인 텍스트 (Main Copy)

* "윤경,, will you be my valentine?" (폰트: 감성적이고 부드러운 스크립트 폰트 또는 가독성 좋은 산세리프 폰트 적용).

### 다이내믹 버튼 액션 (Dynamic Buttons)

#### [Yes] 버튼

* 클릭 시 최종 성공 화면(Success State)으로 전환.
* [No] 버튼이 도망갈 때마다 크기(`transform: scale`)가 점진적으로 10~20%씩 커짐.

#### [No] 버튼

* **데스크탑:** 마우스 커서가 닿는 순간(`onMouseEnter`) 화면 내 랜덤한 좌표로 절대 위치(`position: absolute`)가 변경되며 도망감.
* **모바일:** 터치하는 순간(`onTouchStart` 또는 `onClick`) 위치가 변경됨.
* 도망갈 때마다 버튼의 크기가 미세하게 작아지게 설정하여 누르기 더 어렵게 만듦.
* **단계별 메시지 변화:** 도망갈 때마다 버튼 텍스트 또는 상단 메시지가 순차적으로 변경:
  1. "No" (기본)
  2. "진심이야?"
  3. "에이 설마.."
  4. "한 번 더 생각해봐!"
  5. "손가락이 미끄러진거지?"
  6. "이래도 안 누를거야?"
  7. "정말 정말?"
  8. "마지막 기회야!"

### 사운드 & 햅틱 (Sound & Haptic Feedback)

* **[No] 버튼 도망 시:** 귀여운 '뿅' 효과음 재생.
* **[Yes] 버튼 클릭 시:** 축하 환호성 또는 로맨틱한 짧은 음악 재생.
* **BGM:** 로맨틱한 배경음악 루프 재생 + 우측 상단에 Mute/Unmute 토글 버튼 배치.
* **모바일 햅틱:** [No] 버튼 터치 시 `navigator.vibrate(100)`으로 짧은 진동 피드백 ('거절 실패' 느낌 전달).

### 성공 화면 (Success State)

* [Yes] 클릭 시, 폭죽(Confetti) 애니메이션 효과와 함께 축하 메시지 노출.
* **타이핑 편지 효과:** "해피 발렌타인데이" 메시지가 한 글자씩 타이핑되듯 나타나는 연출.
* 준비된 커플 사진/GIF 노출 (슬라이드쇼 또는 단일 이미지).

## 3. UI/UX 레이아웃 구조 (Layout Spec)

### 전체 컨테이너 (App Container)

* `100vh`, `100vw` 꽉 차는 사이즈, `display: flex`, 중앙 정렬(`align-items: center`, `justify-content: center`).
* `overflow: hidden` 처리 (No 버튼이 화면 밖으로 도망가서 스크롤이 생기는 현상 방지).

### 컴포넌트 배치 (상단부터 하단으로)

1. **BGM Control:** 우측 상단 고정 — Mute/Unmute 토글 아이콘.
2. **Media Area:** 커스텀 이미지/GIF 삽입 영역.
3. **Text Area:** 메인 질문 (h1 태그).
4. **Action Area:** [Yes] / [No] 버튼 그룹. (초기에는 나란히 배치 `flex-direction: row`).

## 4. 개발 가이드 (Tech Notes)

* **추천 스택:** HTML, CSS, Vanilla JavaScript (빠르고 가벼운 이벤트 페이지 구축에 최적).
* **핵심 로직 (No 버튼 도망가기):**
  * `window.innerWidth` 와 `window.innerHeight`를 기준으로 안전 마진을 둔 랜덤 X, Y 좌표 계산 로직 구현.
  * CSS `transition` 속성을 추가하여 버튼이 이동할 때 부드럽게 날아가는 듯한 애니메이션 적용 (예: `transition: all 0.3s ease`).
* **하트 파티클:**
  * CSS `@keyframes`로 하트 요소를 하단에서 상단으로 float하는 애니메이션 구현.
  * `animation-delay`와 `left` 값을 랜덤하게 부여하여 자연스러운 흐름 연출.
* **타이핑 효과:**
  * `setInterval` 또는 `requestAnimationFrame`으로 메시지 문자열을 한 글자씩 DOM에 추가.
* **사운드:**
  * `Audio` API로 효과음/BGM 제어. 모바일은 첫 유저 인터랙션 이후에 재생 가능 (autoplay 정책 대응).
* **햅틱:**
  * `navigator.vibrate` API 사용 (Android Chrome 지원, iOS Safari 미지원 — 지원 여부 체크 후 호출).

## 5. 구현 우선순위 (Priority)

| 순위 | 기능 | 난이도 | 임팩트 |
|------|------|--------|--------|
| 1 | [No] 버튼 단계별 메시지 변화 | 낮음 | 높음 |
| 2 | 배경 하트 파티클 애니메이션 | 중간 | 높음 |
| 3 | 성공 화면 타이핑 편지 효과 | 낮음 | 높음 |
| 4 | 사운드 효과 (효과음 + BGM) | 중간 | 중간 |
| 5 | 모바일 햅틱 피드백 | 낮음 | 낮음 |
