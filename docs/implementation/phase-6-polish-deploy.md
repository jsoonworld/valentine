# Phase 6: 마무리 & 배포

> 목표: 에셋 교체, 최종 QA, GitHub Pages 배포까지 완료한다.
> 모든 Phase(1~5) 완료 후 진행.

---

## 1. 체크리스트

- [ ] Placeholder 에셋을 실제 파일로 교체
- [ ] 메시지/텍스트 최종 확인 및 수정
- [ ] 모바일 실기기 테스트 (iOS Safari, Android Chrome)
- [ ] 데스크탑 브라우저 테스트 (Chrome, Safari)
- [ ] 성능 최적화 (이미지 압축, 파일 용량 확인)
- [ ] favicon 추가
- [ ] Open Graph 메타 태그 추가 (선택)
- [ ] GitHub Pages 배포
- [ ] 배포 URL 동작 확인

---

## 2. 에셋 교체

### 2.1 교체 대상

| Placeholder | 교체할 파일 | 비고 |
|-------------|-------------|------|
| `assets/gif/placeholder.gif` | 메인 화면 GIF/짤 | 300x300px 이하, 2MB 이하 |
| `assets/images/placeholder.png` | 성공 화면 커플 사진 | 600x600px 이하, JPG/WebP |

### 2.2 이미지 최적화

- JPG: 품질 80% 이하로 압축 (TinyPNG, Squoosh 등)
- WebP 변환 고려 (Safari 14+ 지원)
- GIF: 프레임 수 줄이기 or WebP/APNG 변환

### 2.3 오디오 확인

- `assets/audio/bgm.mp3` — 루프 재생 시 끊김 없는지 확인
- `assets/audio/pop.mp3` — 짧고 경쾌한지 확인
- `assets/audio/success.mp3` — 축하 분위기에 맞는지 확인

---

## 3. 텍스트 최종 확인

| 위치 | 현재 텍스트 | 확인 사항 |
|------|-------------|-----------|
| 메인 타이틀 | "윤경,, will you be my valentine?" | 이름, 표현 최종 확인 |
| No 버튼 메시지 8단계 | "No" ~ "마지막 기회야!" | 순서, 톤 확인 |
| 성공 메시지 | "Yay! 해피 발렌타인데이 ❤️" | 최종 메시지 확인 |
| `<title>` | "Will You Be My Valentine?" | 탭 제목 |

---

## 4. 크로스 브라우저 / 디바이스 테스트

### 4.1 테스트 매트릭스

| 디바이스 | 브라우저 | 테스트 항목 |
|----------|----------|-------------|
| iPhone (실기기) | Safari | 터치, 사운드, 화면 전환, 레이아웃 |
| Android (실기기) | Chrome | 터치, 사운드, 햅틱, 레이아웃 |
| Mac/PC | Chrome | 마우스 호버, 사운드, 레이아웃 |
| Mac | Safari | 마우스 호버, 사운드, 레이아웃 |

### 4.2 테스트 시나리오

1. **페이지 로드**
   - 하트 파티클이 배경에 떠오르는지
   - 메인 GIF, 타이틀, 버튼이 정상 표시되는지
   - BGM 토글 버튼이 우측 상단에 보이는지

2. **No 버튼 인터랙션**
   - 마우스 호버/터치 시 도망가는지
   - 텍스트가 단계별로 변경되는지
   - No 버튼이 점점 작아지는지
   - Yes 버튼이 점점 커지는지
   - 도망 효과음이 재생되는지 (언뮤트 상태)
   - No 버튼이 화면 밖으로 나가지 않는지
   - No 버튼이 Yes 버튼과 겹치지 않는지

3. **Yes 버튼 클릭**
   - 메인 화면 → 성공 화면 전환
   - Confetti 애니메이션
   - 타이핑 효과
   - 축하 효과음
   - 커플 사진 표시

4. **BGM 토글**
   - 뮤트/언뮤트 전환
   - 아이콘 변경 (🔇 ↔ 🔊)
   - 뮤트 시 모든 사운드 비활성화

5. **화면 회전 (모바일)**
   - 가로/세로 전환 시 레이아웃 깨짐 없는지
   - No 버튼 위치가 화면 내에 있는지

---

## 5. 성능 확인

| 항목 | 목표 | 확인 방법 |
|------|------|-----------|
| 전체 페이지 용량 | < 5MB | DevTools > Network |
| DOM 노드 누수 | 시간이 지나도 안정적 | DevTools > Performance Monitor |
| 이미지 최적화 | 개별 파일 < 2MB | 파일 사이즈 확인 |
| 오디오 최적화 | BGM < 1MB, 효과음 < 200KB | 파일 사이즈 확인 |

---

## 6. SEO / 메타 태그 (선택)

```html
<head>
  <!-- favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💝</text></svg>">

  <!-- Open Graph (링크 공유 시 미리보기) -->
  <meta property="og:title" content="Will You Be My Valentine?">
  <meta property="og:description" content="특별한 발렌타인 메시지가 도착했어요 💕">
  <meta property="og:image" content="assets/images/og-preview.png">
  <meta property="og:type" content="website">
</head>
```

---

## 7. GitHub Pages 배포

### 7.1 배포 순서

```bash
# 1. 변경사항 커밋
git add -A
git commit -m "feat: complete valentine interactive page"

# 2. 푸시
git push origin main

# 3. GitHub 레포 > Settings > Pages
#    - Source: Deploy from a branch
#    - Branch: main / root
#    - Save

# 4. 배포 완료 후 URL 확인
# https://<username>.github.io/valentine/
```

### 7.2 배포 확인

- [ ] 배포 URL 접속 시 정상 로딩
- [ ] 모바일에서 배포 URL 접속 시 정상 동작
- [ ] HTTPS 적용 확인
- [ ] 모든 에셋(이미지, 오디오, 폰트) 정상 로딩 (404 없음)

---

## 8. 완료 기준

- 실제 에셋으로 교체 완료
- 모바일(iOS, Android) 실기기 테스트 통과
- 데스크탑(Chrome, Safari) 테스트 통과
- GitHub Pages 배포 URL에서 정상 동작
- 배포 URL을 여자친구에게 보낼 준비 완료!
