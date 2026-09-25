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

- Text is non-selectable and cursor is the arrow everywhere (base layer in styles.css); only `input`/`textarea` are selectable with an I-beam.

## Mobile-first (80-90% of traffic is phones)
- Sticky pins use `svh` and measure the sticky child (not `innerHeight`) so the iOS address bar can't cause jumps.
- Navbar: bottom-sheet menu is a SIBLING of `<header>` (a `backdrop-filter` parent would trap a fixed child). `MobileBar` = thumb-zone Apply + WhatsApp + Call, hides near `#apply`.
- Contact: `company.phone` / `company.whatsapp` in program.ts (assumed +91 India). `waUrl` exported from Navbar.
- Curriculum: desktop = pinned card deck; `<lg` = `CurriculumDeck` (snap-scroll cards, neighbours scale/dim, chip strip + dots).
- Break Hunter: `md:hidden` `SwipeDeck` (drag right = break, left = clean, haptics) while playing; list view on md+; review list stacks Ours/Theirs on phones.
- Role Finder: question above live bars on phones. `buzz()` haptics, `useCanShare()` + `shareText()` for native share.
- Cut on phones (hidden < md): Mentors, Testimonials, ProgramDetails, Experience pillars, Outcomes progression, hero meta list + ghost text.
- Perf on phones: film grain off, `backdrop-blur` only md+, click sparks reduced, hover effects gated (Tailwind v4 wraps `hover:` in `@media (hover:hover)`); `Spot` lights the card in the middle band via IntersectionObserver on `(hover:none)`.
- Certificate tilt is mouse-only (touch would fight scrolling).
- Inputs must stay >=16px (iOS zoom). Tap targets >=44px (`min-h-11`/`min-h-14`).

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
- TODO: visually QA on real phones (360x640, 390x844, 412x915) + iOS Safari; nothing mobile has been eyeballed yet.
- TODO: confirm WhatsApp number country code (+91 assumed).
