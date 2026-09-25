# CLAUDE.md — Acdyon IB Operations Program site

Living project notes. Update this file whenever structure, theme or decisions change.

## Stack
TanStack Start (React 19, Vite 8, Tailwind v4, SSR) · Lovable-connected (never rewrite pushed git history; keep branch working). No animation lib: scroll/motion is vanilla (IntersectionObserver, rAF, CSS vars).

## Commands
`bun install` · `bun run dev` · `bun run build` · `bun run lint`

## Layout
- `src/routes/index.tsx` — page composition (section order lives here)
- `src/data/program.ts` — ALL copy/content (modules, FAQs, roles, nav). Edit content here.
- `src/styles.css` — theme tokens + utilities (single source of truth for colour/type/motion)
- `src/components/site/`
  - `primitives.tsx` — Section/SectionHeader, Reveal, `useStickyStep` (scroll-pinned stepper), `Spot` (cursor spotlight), `Marquee` (scroll-reactive), Counter, buttons
  - `Hero.tsx`, `Dashboard.tsx` (clickable trade desk), `Navbar.tsx` (progress bar + active link)
  - `Curriculum.tsx` — scroll-pinned chapters (desktop), tap accordion (mobile)
  - `Sections.tsx` — Stats+ticker, Why (expanding panels), Learn (spotlight bento), Workflow (scroll-pinned trade journey), Cases (stepper), Experience (tick-off tracker), Outcomes, Mentors, Certificate (live name + tilt), Industries (marquee), Testimonials, Details, FAQ (search), Footer
  - `Games.tsx` — **Break Hunter** (reconciliation game, 3 shifts) and **Role Finder** (4-question quiz)
  - `Apply.tsx` — application form (front-end only, no backend yet)

## Design system ("Red Dress")
- Palette: warm oxblood ink `--ink`, ONE accent crimson/scarlet, bone/paper/blush neutrals, champagne used sparingly on crimson. No navy/cyan anywhere.
- Type: Instrument Serif (display, italic for emphasis words), Geist (body), Geist Mono (eyebrows/numbers).
- Section tones rotate: crimson hero → paper → ink → bone → ink(scroll) → crimson(scroll) → bone(game) → blush → ink → paper → crimson(quiz) → bone → ink → crimson marquee → paper → blush → paper → crimson(apply).
- Motion rules: transform/opacity only, `--ease-out` cubic-bezier(0.23,1,0.32,1), <300ms for UI feedback, `press` class for tactile :active, reduced-motion respected globally.
- Emphasis pattern in headings: `<em className="text-crimson">word</em>`.

## Behaviour notes
- Navbar: transparent + ink text over the crimson hero; flips to ink bg + paper text once `scrollY > 24`.
- `useSlowZones` (primitives) scales wheel scroll x0.65 (no easing layer, keep it 1:1) while hero/footer is on screen. `overscroll-behavior: none` on html/body kills bounce.
- Curriculum (lg): card deck. Each chapter card slides up over the previous one, driven purely by CSS `--p` (set by `useStickyStep`).
- Logo: import `src/assets/acdyon-logo.webp` directly (the `.asset.json` URL is a Lovable-CDN path that 404s locally).

- Custom scrollbar (ink track, crimson thumb) in styles.css; `ClickFx` (primitives) spawns a champagne/scarlet ring + sparks on every primary click via WAAPI.

## Gotchas
- Dev hydration warning about `<html>` attrs = browser extension, ignore.
- Windows npm needs native bindings: `npm i --no-save @rolldown/binding-win32-x64-msvc@1.2.1 @oxc-parser/binding-win32-x64-msvc` (one command).
- `sticky` breaks under `overflow-hidden` ancestors: pinned sections use `Section bare` with no overflow on ancestors.
- SSR: no `Math.random`/`Date` during render (Certificate sets date in effect). Game data is static.
- Tailwind v4 important modifier is trailing: `px-0!`.
- Magic MCP was down (connect timeout) during the redesign; not used.

## Decisions / TODO
- Redesign 2026-09-24: full theme swap + interactive sections (see above).
- TODO: wire Apply form to backend/email; replace placeholder mentors/testimonials; real pricing.
- TODO: visually QA at 375/768/1440 (pinned sections especially).
