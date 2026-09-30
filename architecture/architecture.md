# Britannia sitev2 — Architecture Reference

## Directory map

```
sitev2/
├── index.html                  Vite entry point (bare shell — fonts only)
├── public/
│   └── assets/
│       ├── img/                All .webp images (hash-named)
│       └── video/              All .mp4 videos (hash-named)
├── src/
│   ├── main.jsx                React root mount + globals.css import
│   ├── globals.css             ALL styles — verbatim port of index.html <style>
│   ├── App.jsx                 Root component; owns legacyVisible state
│   ├── hooks/
│   │   ├── useIsMobile.js      Reactive (max-width:820px) media query
│   │   ├── useScrollReveal.js  IntersectionObserver for .reveal elements
│   │   ├── useParallax.js      Scroll-driven translateY on [data-parallax] and [data-float]
│   │   ├── useHeaderScroll.js  scrolled + hidden state for sticky header
│   │   ├── useIntersectionObserver.js  One-shot "has entered viewport" flag
│   │   └── useTickerShimmer.js Interval-based stock price shimmer
│   ├── data/
│   │   ├── eras.js             Legacy timeline — 5 era objects {y, t, img, c}
│   │   ├── products.js         Fan carousel — 5 tabs × N items [hash, label, color]
│   │   ├── recipes.js          Recipe rail — 5 tabs × N items [hash, title, type, big]
│   │   ├── sustainability.js   3 tabs × 3 pillars [heading, para]
│   │   └── feed.js             8 Instagram feed items {v?, p, views?, text?, date?}
│   └── components/
│       ├── Ticker/Ticker.jsx
│       ├── Header/
│       │   ├── Header.jsx
│       │   └── MobileDrawer.jsx
│       ├── Hero/Hero.jsx
│       ├── RedBridge/RedBridge.jsx
│       ├── Legacy/Legacy.jsx
│       ├── Products/Products.jsx
│       ├── Recipes/Recipes.jsx
│       ├── Notch/Notch.jsx
│       ├── Sustainability/Sustainability.jsx
│       ├── RnI/RnI.jsx
│       ├── Investors/Investors.jsx
│       ├── Instagram/Instagram.jsx
│       ├── Careers/Careers.jsx
│       └── Footer/
│           ├── Footer.jsx
│           └── TicTacToe.jsx
└── architecture/
    ├── HANDOVER.md             Status, gaps, how to continue
    └── architecture.md         This file
```

---

## Rendering model

```
main.jsx
  └── App.jsx                   (legacyVisible: boolean)
        ├── Ticker              reads useTickerShimmer
        ├── Header              reads useHeaderScroll
        │     └── MobileDrawer  controlled by Header state (drawerOpen)
        ├── Hero                static
        ├── RedBridge           calls onRevealLegacy() → sets legacyVisible in App
        ├── Legacy              receives visible prop; starts hidden on desktop
        ├── Products            self-contained; fanOffset stored in useRef
        ├── Recipes             self-contained; cover zoom uses DOM cloning
        ├── Notch               pure SVG, no state
        ├── Sustainability      self-contained; activeKey + openPillar state
        ├── RnI                 self-contained; float parallax via useParallax
        ├── Investors           self-contained; CountUp sub-component per stat
        ├── Instagram           self-contained; reveal state + per-video IO
        ├── Careers             static
        └── Footer
              └── TicTacToe     fully self-contained game state
```

---

## CSS architecture

**One file, no modules:** `src/globals.css` is the only stylesheet. It is a verbatim port of the `<style>` block from the original `index.html` (lines 11–517). Class names are identical to the original.

### Design tokens (CSS custom properties on `:root`)

| Token | Value | Used for |
|-------|-------|----------|
| `--red` | `#EC1C24` | Primary brand red |
| `--red-dark` | `#C5141B` | Red hover/active state |
| `--cream` | `#FFF8E6` | Page background |
| `--cream-2` | `#FFF3D6` | Secondary cream surface |
| `--yellow` | `#FFDD55` | Accent, AI button sparkle |
| `--ink` | `#1E1E1E` | Body text |
| `--ink-2` | `#4A4A4A` | Secondary text |
| `--green` | `#1E9A3C` | Success, stock up arrow |
| `--leaf` | `#8CC63F` | Notch gradient end |
| `--head` | Stack Sans Headline / Google Sans Flex | Display headings |
| `--body` | Google Sans Flex / Stack Sans Headline | Body copy |
| `--pad` | `clamp(16px,4.2vw,60px)` | Horizontal section padding |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | Spring-like easing |

### Responsive breakpoints

| Breakpoint | Target |
|------------|--------|
| `max-width: 1100px` | Tablet landscape |
| `max-width: 820px` | Mobile (also switches `useIsMobile`) |

### Scroll reveal

Any element with class `reveal` starts `opacity:0; transform:translateY(40px)`. `useScrollReveal` attaches an `IntersectionObserver` (threshold 0.15) to all `.reveal:not(.in)` elements on mount. When one enters the viewport, `.in` is added, triggering the CSS transition.

Staggered delays are applied via `data-d` attribute (maps to `animation-delay` in CSS).

---

## Hooks reference

### `useIsMobile()`
Returns `boolean`. Reactive — updates when the viewport crosses 820px. Used in Products (fan spacing), Recipes (cover click guard), RedBridge (button guard), Sustainability (accordion toggle), Instagram (reveal trigger).

### `useScrollReveal(containerRef)`
Side-effect only hook. Observes all `.reveal` elements inside `containerRef.current` (falls back to `document`). Called once in `App.jsx` with `null` so it observes the whole page.

### `useParallax(parRefs, floRefs)`
Scroll listener (passive, rAF-throttled). `parRefs` receive `translateY` bounded to ±9% of parent height. `floRefs` receive a small `translateY + rotate` drift. Disabled when `prefers-reduced-motion` is set.

### `useHeaderScroll()`
Returns `{ scrolled, hidden }`. `scrolled` is true when `scrollY > 40`. `hidden` is true when scrolling down past 100px — drives the `hdr-hide` class that slides the header out of view.

### `useIntersectionObserver(ref, threshold)`
Returns `boolean` — fires once when the element first enters the viewport. Used by the `CountUp` component inside Investors.

### `useTickerShimmer(base)`
Returns a formatted INR price string. Runs a 4-second interval that adds ±0.6 random noise to `base`.

---

## Component deep-dives

### Products — fan carousel

The fan is a pure DOM animation driven by a continuous `fanOffset` number stored in a `useRef` (not state) to avoid re-renders on every timer tick.

```
fanOffsetRef.current  →  layoutFan()  →  el.style.transform / el.style.zIndex
```

`layoutFan` is called from:
- `useLayoutEffect` on tab/mobile change (initial layout)
- `setInterval` every 3s (auto-advance)
- Prev/Next button click
- Pointer drag (≥40px swipe)
- Card click (jumps to that card)

Cards are wrapped using modular arithmetic so position `d` is always in `[-n/2, n/2]`. A card that "wraps" (jumps more than 1 step) is teleported invisibly to its new position and faded in, avoiding a visible sweep across the fan.

### Recipes — cover zoom-out

On desktop, clicking the cover image creates a **fixed DOM clone** of the cover, collapses the real cover to `height:0`, then animates the clone from `100vw×100vh` down to the bounding rect of the first `.rcard.big .ph` element in the rail. After the animation lands (1350ms) the clone fades out and is removed. This is a direct port of the original JS — no React state is involved; it is entirely imperative DOM work inside a click handler.

### RedBridge → Legacy reveal

`legacyVisible` is owned by `App.jsx` and passed down as a prop to both components:
- `RedBridge` receives `onRevealLegacy` callback → calls it on button click (desktop only)
- `Legacy` receives `visible` → omits `legacy-hidden` class when `true`

On mobile, `.legacy.legacy-hidden { display:block }` in CSS overrides the hidden state so the section is always visible regardless of React state.

### TicTacToe

Fully self-contained React state machine. Board, player tokens, AI move logic, and drag-ghost handling all live inside `TicTacToe.jsx`. The AI is a simple minimax-lite: tries to win, then blocks, then takes center, then corners, then random.

Drag uses the Pointer Events API (`setPointerCapture`) for unified mouse + touch handling. A CSS-positioned `drag-ghost` img element tracks pointer coordinates imperatively (no React state) to avoid layout thrash on every pointermove.

---

## Asset convention

All media files are **hash-named** (e.g. `1e1196f5.webp`, `08de0ac6.mp4`). They live at:

```
public/assets/img/      →  served at /assets/img/xxx.webp
public/assets/video/    →  served at /assets/video/xxx.mp4
```

In JSX, reference them as bare relative strings:
```jsx
<img src="assets/img/1e1196f5.webp" />
<video src="assets/video/08de0ac6.mp4" />
```

Vite serves `public/` at the root without hashing these files, so the paths match the original `index.html` exactly.

---

## Known limitations

- **Dairy splash** — `dairySplash()` from the original JS is not implemented. The overlay that plays when switching to the "Dairy Goodness" tab is absent.
- **No router** — Navigation is anchor-hash only. Adding React Router later requires auditing all `href="#section"` links.
- **No backend** — Newsletter form validates locally and shows a state message; no HTTP request is made.
- **StrictMode double-invoke** — React 18 StrictMode mounts effects twice in development. The fan carousel timer (`setInterval`) and era timer (`setTimeout`) both clean up correctly on unmount, so there is no visible double-fire in production.
