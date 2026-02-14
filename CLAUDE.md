# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive "Will You Be My Valentine?" single-page web experience targeting mobile-first (80% mobile / 20% desktop). Built for a Korean-speaking audience (girlfriend named Yun-kyung). All documentation in `docs/` is written in Korean.

## Tech Stack

Pure vanilla HTML/CSS/JavaScript — no frameworks, no build process, no npm dependencies.

## Running Locally

```bash
open index.html
# or for a local server:
python3 -m http.server 8000
```

No build step, linting, or test suite exists. Testing is manual across devices (iPhone Safari, Android Chrome, Desktop Chrome/Safari).

## Deployment

GitHub Pages from `main` branch root. Deploy by pushing to `main`.

## Architecture

Single-page app with two screens toggled via a `.hidden` CSS class:

- **Main Screen** (`#main-screen`): Valentine question, GIF, Yes/No buttons, floating heart particles
- **Success Screen** (`#success-screen`): Confetti animation, couple photo, typed-out romantic message

Core files:
- `index.html` — all DOM structure (single page, no routing)
- `css/style.css` — all styles, animations, responsive breakpoints
- `js/app.js` — all logic: state management, button escape, animations, audio

## Key Mechanics

- **No button escape**: moves to random safe position on hover/touch, shrinks 5% per escape (min 40%), cycles through 8 Korean text stages
- **Yes button growth**: enlarges 15% with each No escape
- **State object**: single `STATE` object tracks `escapeCount`, `yesScale`, `isMuted`, `isSuccessScreen`

## Implementation Phases

Defined in `docs/implementation/`. Phase 1 (scaffolding) is complete. Phases 2-6 cover CSS styling, core JS logic, animations, sound/haptic, and QA/deploy respectively. Each phase doc contains detailed specs with code examples.

## Conventions

- **HTML IDs**: kebab-case (`btn-yes`, `main-screen`)
- **CSS classes**: BEM (`btn--yes`, `screen--main`)
- **CSS variables**: defined in `:root` (colors, fonts, spacing)
- **Mobile-first**: base styles for mobile, `@media` queries for tablet (768px) and desktop (1024px)
- **Z-index layers**: 0 (particles) → 1 (content) → 10 (success screen) → 100 (BGM toggle)
- **Fonts**: `Noto Sans KR` (body), `Dancing Script` (decorative titles)
- **Audio**: default muted, deferred init until first user interaction (autoplay policy)
- **Haptic**: `navigator.vibrate()` with feature detection (Android only)

## Asset Constraints

- GIF: < 2MB, ~300x300px
- Couple photo: < 600x600px
- BGM: < 1MB, MP3, 30s–2min
- Sound effects: < 200KB each, MP3
