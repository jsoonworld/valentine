# Phase 1: 프로젝트 스캐폴딩 & HTML 구조

> 목표: 디렉토리 구조를 생성하고, 시맨틱 HTML 마크업을 완성한다.

---

## 1. 체크리스트

- [ ] 디렉토리 구조 생성
- [ ] `index.html` 작성
- [ ] placeholder 에셋 배치
- [ ] 로컬 브라우저에서 빈 페이지 정상 로딩 확인

---

## 2. 디렉토리 구조 생성

```
valentine/
├── index.html
├── css/
│   └── style.css          (빈 파일)
├── js/
│   └── app.js             (빈 파일)
├── assets/
│   ├── images/
│   ├── audio/
│   └── gif/
└── docs/
```

### 작업 내용

- `css/`, `js/`, `assets/images/`, `assets/audio/`, `assets/gif/` 디렉토리 생성
- `css/style.css`, `js/app.js` 빈 파일 생성
- `assets/` 하위에 `.gitkeep` 파일 배치 (빈 폴더 git 추적용)

---

## 3. index.html 작성

### 3.1 `<head>` 구성

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Will You Be My Valentine?</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
```

### 3.2 `<body>` 구성

핵심 컴포넌트 4개:

| 컴포넌트 | ID | 역할 |
|----------|-----|------|
| BGM 토글 | `bgm-toggle` | 우측 상단 음악 on/off |
| 하트 파티클 컨테이너 | `hearts-container` | 배경 하트 애니메이션 영역 |
| 메인 화면 | `main-screen` | 질문 + Yes/No 버튼 |
| 성공 화면 | `success-screen` | Confetti + 타이핑 메시지 |

```html
<body>
  <button id="bgm-toggle" class="bgm-toggle" aria-label="음악 켜기/끄기">🔇</button>
  <div id="hearts-container" class="hearts-container"></div>

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
```

### 3.3 접근성 고려

- `aria-label`로 BGM 토글 버튼 설명
- `alt` 속성으로 이미지 대체 텍스트 제공
- 시맨틱 태그 사용 (`<main>`, `<section>`, `<h1>`)

---

## 4. Placeholder 에셋

임시로 아래 파일들을 생성/배치:

| 파일 | 내용 |
|------|------|
| `assets/gif/placeholder.gif` | 아무 GIF (추후 교체) |
| `assets/images/placeholder.png` | 아무 이미지 (추후 교체) |

---

## 5. 완료 기준

- `index.html`을 브라우저에서 열었을 때 에러 없이 로딩
- 메인 질문 텍스트, Yes/No 버튼이 화면에 보임
- 성공 화면은 `hidden` 클래스로 숨겨진 상태
- CSS/JS 파일이 정상적으로 링크됨 (404 없음, 빈 파일이어도 OK)
