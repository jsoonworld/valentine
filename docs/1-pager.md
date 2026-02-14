# Project 1-Pager: "Will You Be My Valentine?" 인터랙티브 웹페이지

## 1. 프로젝트 개요 (Overview)

* **목적:** 발렌타인데이를 맞아 여자친구(윤경)에게 마음을 전하는 이벤트용 싱글 페이지 웹사이트 제작.
* **타겟 환경:** 모바일 중심(Mobile-First) 반응형 웹 (모바일 80% / 데스크탑 20% 비율 고려).
* **핵심 경험:** 유저가 'No'를 선택할 수 없도록 유도하는 유쾌한 인터랙션과 로맨틱한 시각적 효과.

## 2. 주요 기능 및 인터랙션 (Key Features)

### 커스텀 배경 및 미디어 (Media Support)

* 화면 전체 배경에 로맨틱한 이미지나 애니메이션 GIF를 적용할 수 있는 구조.
* 텍스트 상단이나 하단에 메인 짤(GIF/사진)을 배치할 수 있는 영역 확보.

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

### 성공 화면 (Success State)

* [Yes] 클릭 시, 폭죽(Confetti) 애니메이션 효과와 함께 "Yay! 해피 발렌타인데이" 등의 축하 메시지 및 준비된 커플 사진/GIF 노출.

## 3. UI/UX 레이아웃 구조 (Layout Spec)

### 전체 컨테이너 (App Container)

* `100vh`, `100vw` 꽉 차는 사이즈, `display: flex`, 중앙 정렬(`align-items: center`, `justify-content: center`).
* `overflow: hidden` 처리 (No 버튼이 화면 밖으로 도망가서 스크롤이 생기는 현상 방지).

### 컴포넌트 배치 (상단부터 하단으로)

1. **Media Area:** 커스텀 이미지/GIF 삽입 영역.
2. **Text Area:** 메인 질문 (h1 태그).
3. **Action Area:** [Yes] / [No] 버튼 그룹. (초기에는 나란히 배치 `flex-direction: row`).

## 4. 개발 가이드 (Tech Notes)

* **추천 스택:** HTML, CSS, Vanilla JavaScript (빠르고 가벼운 이벤트 페이지 구축에 최적).
* **핵심 로직 (No 버튼 도망가기):**
  * `window.innerWidth` 와 `window.innerHeight`를 기준으로 안전 마진을 둔 랜덤 X, Y 좌표 계산 로직 구현.
  * CSS `transition` 속성을 추가하여 버튼이 이동할 때 부드럽게 날아가는 듯한 애니메이션 적용 (예: `transition: all 0.3s ease`).
