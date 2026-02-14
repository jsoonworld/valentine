# 구현 계획 (Implementation Plan)

> 본 문서는 [1-pager.md](../1-pager.md)와 [tech-spec.md](../tech-spec.md)를 기반으로 한 단계별 구현 계획입니다.

---

## Phase 구성

| Phase | 제목 | 핵심 산출물 | 의존성 |
|-------|------|-------------|--------|
| [Phase 1](./phase-1-scaffolding.md) | 프로젝트 스캐폴딩 & HTML | 디렉토리 구조, `index.html`, 기본 CSS 리셋 | 없음 |
| [Phase 2](./phase-2-styling.md) | CSS 스타일링 & 반응형 | `style.css` 완성, 반응형 레이아웃 | Phase 1 |
| [Phase 3](./phase-3-core-logic.md) | 핵심 JS 로직 | No 버튼 도망, Yes 버튼 scale, 단계별 메시지 | Phase 2 |
| [Phase 4](./phase-4-animations.md) | 애니메이션 | 하트 파티클, Confetti, 타이핑 효과 | Phase 2 |
| [Phase 5](./phase-5-sound-haptic.md) | 사운드 & 햅틱 | BGM, 효과음, 진동 피드백 | Phase 3 |
| [Phase 6](./phase-6-polish-deploy.md) | 마무리 & 배포 | 최종 QA, 에셋 교체, GitHub Pages 배포 | Phase 1~5 |

## 진행 방식

- Phase 1~2는 순차 진행 (HTML/CSS 기반 필요)
- Phase 3~4는 **병렬 진행** 가능 (독립적인 JS 모듈)
- Phase 5는 Phase 3 완료 후 진행
- Phase 6은 모든 Phase 완료 후 최종 통합

```
Phase 1 ──> Phase 2 ──┬──> Phase 3 ──> Phase 5 ──┐
                       │                           ├──> Phase 6
                       └──> Phase 4 ───────────────┘
```
