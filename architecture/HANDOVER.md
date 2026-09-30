# Britannia Industries – React Site (sitev2) · Handover

**Project:** Britannia Industries corporate homepage  
**Stack:** Vite 5 · React 18 · Global CSS (no CSS Modules, no TypeScript)  
**Source of truth for design:** `D:\Nagul\2026\TEPROS\britannia\site\index.html`  
**React app root:** `D:\Nagul\2026\TEPROS\britannia\site\sitev2`  
**Dev server:** `npm run dev` → http://localhost:5173/  
**Build:** `npm run build` → `dist/`

---

## Current Status

The full 14-section homepage has been converted from a single static HTML file (~1240 lines) into a Vite + React application. The build compiles clean (43 modules, zero warnings/errors as of 2026-09-30).

### What is complete

| # | Section | Component | Notes |
|---|---------|-----------|-------|
| 1 | Ticker | `Ticker/Ticker.jsx` | Live stock price shimmer via `useTickerShimmer` |
| 2 | Header | `Header/Header.jsx` + `Header/MobileDrawer.jsx` | Sticky hide/show, search panel, globe button, inline SVG logo |
| 3 | Hero | `Hero/Hero.jsx` | Autoplay video, animated headline spans |
| 4 | Red Bridge | `RedBridge/RedBridge.jsx` | Curtain reveal; wires `onRevealLegacy` up to App state |
| 5 | Legacy | `Legacy/Legacy.jsx` | Auto-advancing 6s era timeline, background crossfade, tab/list sync |
| 6 | Products | `Products/Products.jsx` | Fan carousel — 5 category tabs, drag swipe, auto-rotate every 3s |
| 7 | Recipes | `Recipes/Recipes.jsx` | Cover zoom-out clone animation, 5 tab recipe rails, drag-to-scroll |
| 8 | Notch | `Notch/Notch.jsx` | Reusable SVG wave divider (parameterised gradient id) |
| 9 | Sustainability | `Sustainability/Sustainability.jsx` | Parallax image, 3 tabs, accordion pillars on mobile |
| 10 | R&I | `RnI/RnI.jsx` | Float parallax crumbs image |
| 11 | Investors | `Investors/Investors.jsx` | Count-up animation on scroll, B-mark collage SVG |
| 12 | Instagram | `Instagram/Instagram.jsx` | Marquee rail, video autoplay via IntersectionObserver, revealed on scroll/click |
| 13 | Careers | `Careers/Careers.jsx` | Static card layout |
| 14 | Footer | `Footer/Footer.jsx` + `Footer/TicTacToe.jsx` | Newsletter form with validation, full drag-to-board tic-tac-toe game |

### What is NOT yet done / known gaps

- **Dairy splash animation** — In the original JS, switching to the "Dairy Goodness" product tab triggers a full-viewport splash overlay (`#dairy-splash`) that zooms into the centre card. This effect is not wired up in `Products.jsx`. The logic exists in the original script (see `dairySplash()` in `index.html:929`).
- **Legacy section on mobile** — On mobile (≤820px) the Legacy section is revealed by CSS override (`.legacy.legacy-hidden { display:block }`) regardless of the `legacyVisible` React state. This matches the original behaviour, but it means clicking the RedBridge "Know about us" button does nothing on mobile (guarded by `if (isMobile) return`). Intended.
- **Route / SPA navigation** — No React Router. All links are anchor hash links (`href="#section"`). If a router is added later, these will need updating.
- **Real backend** — Newsletter form `onSubmit` validates and shows a success message in state; no actual POST is made.
- **Asset copying** — All images and videos must already be present at `public/assets/img/` and `public/assets/video/`. Vite serves `public/` at `/`, so paths in JSX (`assets/img/xxx.webp`) map to `/assets/img/xxx.webp` at runtime.

---

## How to continue development

### Run locally
```
cd D:\Nagul\2026\TEPROS\britannia\site\sitev2
npm run dev
```

### Build for production
```
npm run build
```
Output lands in `sitev2/dist/`. Drop that folder on any static host.

### Adding a new section
1. Create `src/components/SectionName/SectionName.jsx`
2. Import and render it inside `src/App.jsx` at the correct position
3. Add any new CSS directly to `src/globals.css`
4. If the section needs data, add a file to `src/data/`

### Editing styles
All styles live in `src/globals.css` — a verbatim port of the `<style>` block from the original `index.html`. Class names are identical to the original. Do not add per-component CSS files; keep everything in globals to stay in sync with the design source.

### Cross-component state
Currently the only piece of cross-component state is `legacyVisible` in `App.jsx`. It is lifted because `RedBridge` (the button) and `Legacy` (the receiver) are siblings. If more cross-component state is needed, add it to `App.jsx` and pass it down as props — the tree is shallow enough that context is unnecessary.

---

## Key decisions made

| Decision | Why |
|----------|-----|
| Global CSS, not CSS Modules | Class names in the design source are used verbatim; modules would require renaming every class |
| No TypeScript | Speed of conversion; can be added later by renaming files and adding JSDoc or `.d.ts` stubs |
| No animation library | All animations are pure CSS keyframes or imperative `el.style.*` via refs, exactly as in the original |
| No React Router | Single-page with anchor navigation; no multi-page requirement |
| `useLayoutEffect` for fan carousel | DOM measurement for card positions must happen synchronously after paint to avoid a flash of unstyled cards |
| `useRef` for `fanOffset` in Products | The fan offset changes on every timer tick; storing it in a ref prevents unnecessary re-renders of the whole card list |
| Double `requestAnimationFrame` in RedBridge | Matches the original JS exactly — the first rAF waits for the DOM commit, the second ensures the transition is registered before the class change |
