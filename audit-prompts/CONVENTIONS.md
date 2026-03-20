# CONVENTIONS.md — Coding Standards & Patterns (JU. Portfolio — Vanilla HTML/CSS/JS)

> **This file defines all coding conventions for this project. Every line of code must follow these rules. No exceptions. When in conflict with external guides or personal preference, this file wins.**

---

## TABLE OF CONTENTS

1. [Project Structure](#1-project-structure)
2. [Naming Conventions](#2-naming-conventions)
3. [HTML Rules](#3-html-rules)
4. [CSS Rules](#4-css-rules)
5. [JavaScript Rules](#5-javascript-rules)
6. [Design Token Rules](#6-design-token-rules)
7. [Component Patterns](#7-component-patterns)
8. [Animation Rules](#8-animation-rules)
9. [Responsive Rules](#9-responsive-rules)
10. [Accessibility Rules](#10-accessibility-rules)
11. [Forbidden Patterns](#11-forbidden-patterns)
12. [File Organization](#12-file-organization)
13. [Git Conventions](#13-git-conventions)
14. [SEO Conventions](#14-seo-conventions)
15. [Performance Conventions](#15-performance-conventions)

---

## 1. PROJECT STRUCTURE

```
ju-main/
├── index.html          # Homepage — hero, stats, featured work, CTA
├── about.html          # About — philosophy, skills, timeline
├── work.html           # Portfolio gallery — project cards
├── process.html        # Process — 5-phase methodology
├── contact.html        # Contact — form + info grid
├── case-study.html     # ALGX deep-dive (emerald theme variant)
├── styles.css          # SHARED design system — tokens, reset, typography, components, layout
├── main.js             # SHARED JavaScript — cursor, reveals, parallax, scroll, magnetic
└── assets/             # Images, icons, favicons (if added)
    ├── images/
    ├── icons/
    └── favicons/
```

**Rules:**
- **Shared styles** go in `styles.css` — page-specific styles go in `<style>` blocks within each HTML file
- **Shared JavaScript** goes in `main.js` — page-specific scripts go in `<script>` blocks within each HTML file
- Each HTML page must link both `styles.css` and `main.js`
- No npm, no node_modules, no build tools — this is intentionally vanilla
- If images are added, use an `assets/` directory with subdirectories

---

## 2. NAMING CONVENTIONS

| Element | Convention | Example |
|---------|-----------|---------|
| HTML files | kebab-case | `case-study.html`, `index.html` |
| CSS classes | kebab-case with BEM-like nesting | `.glass-card`, `.card-meta`, `.hero-title` |
| CSS custom properties | kebab-case with category prefix | `--color-cyan`, `--space-md`, `--ease-smooth` |
| JavaScript variables | camelCase | `cursorGlow`, `headerOffset`, `isTouchDevice` |
| JavaScript constants | camelCase or UPPER_SNAKE for truly constant config | `const HEADER_OFFSET = 80` |
| JavaScript objects/modules | PascalCase | `Cursor`, `Reveals`, `Parallax`, `SmoothScroll` |
| IDs | camelCase or kebab-case | `#particles`, `#mainNav` |
| Data attributes | kebab-case with `data-` prefix | `data-parallax`, `data-hover`, `data-speed` |
| Animation keyframes | camelCase | `corePulse`, `coreShift`, `pulseDot` |

**Strict naming rules:**
- CSS classes for page-specific sections use page prefix: `.about-hero`, `.work-grid`, `.contact-info`
- CSS classes for shared components use generic names: `.glass-card`, `.btn`, `.caption-pill`
- Boolean CSS classes use `is-` or `has-` prefix: `.is-active`, `.is-visible`, `.has-scrolled`
- State classes: `.hovering`, `.visible`, `.ready`, `.menu-open`
- JavaScript module-like objects are PascalCase singletons: `Cursor.init()`, `Reveals.init()`

---

## 3. HTML RULES

### Document Structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page] | JU. | Digital Architect</title>
  <meta name="description" content="[Unique description for this page]">
  <!-- OG tags -->
  <!-- Preconnect to fonts.googleapis.com -->
  <!-- Google Fonts link (with print/onload optimization) -->
  <link rel="stylesheet" href="styles.css">
  <style>/* Page-specific styles */</style>
</head>
<body>
  <!-- Cursor elements -->
  <div class="cursor"></div>
  <div class="cursor-glow"></div>

  <!-- Background layers -->
  <div class="plasma">...</div>
  <div class="grain"></div>
  <div class="vig"></div>

  <!-- Header (shared navigation) -->
  <header class="header">...</header>

  <!-- Main content (page-specific) -->
  <main>
    <!-- Page sections -->
  </main>

  <!-- Footer (shared) -->
  <footer class="footer">...</footer>

  <script src="main.js"></script>
  <script>/* Page-specific scripts */</script>
</body>
</html>
```

### Rules:
- **ALWAYS** use semantic HTML elements (`<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<aside>`)
- **ALWAYS** set `lang="en"` on the `<html>` element
- **EVERY** page must have exactly ONE `<h1>` element
- **EVERY** heading hierarchy must be sequential (h1 → h2 → h3, no skipping levels)
- **EVERY** image must have meaningful `alt` text (or `alt=""` with `aria-hidden="true"` for decorative)
- **EVERY** link must have descriptive text (no "click here" or bare URLs)
- **EVERY** form input must have an associated `<label>` element
- **EVERY** interactive element must have a visible focus indicator
- **NEVER** use `<div>` where a semantic element would be more appropriate
- **NEVER** use inline styles (`style="..."`) — use CSS classes
- **USE** `<a>` for navigation, `<button>` for actions — never `<div onclick>`
- **WRAP** page content in `<div class="wrap">` for max-width containment

---

## 4. CSS RULES

### Architecture:
- **styles.css** = shared design system (tokens → reset → base → typography → components → layout → utilities → animations)
- **Page `<style>`** = page-specific overrides and unique sections
- **NO** CSS preprocessors (Sass, Less, PostCSS) — plain CSS only
- **NO** CSS frameworks (Tailwind, Bootstrap) — custom CSS only

### Rules:
- **ALWAYS** use CSS custom properties from `:root` for colors, spacing, radii, easings
- **NEVER** hardcode hex colors in component styles — use `var(--cyan)`, `var(--fg2)`, etc.
- **NEVER** use `!important` unless overriding a third-party style (and document why)
- **ALWAYS** use `var(--space-*)` tokens for spacing (margin, padding, gap)
- **ALWAYS** use `var(--radius-*)` tokens for border-radius
- **ALWAYS** use `var(--ease-*)` or `var(--transition-*)` for transitions/animations
- **GROUP** properties in consistent order: position → display/flex/grid → sizing → spacing → typography → colors → borders → shadows → transitions → animations
- **USE** `will-change` sparingly and only on elements that actually animate
- **USE** `transform: translate3d()` for GPU-accelerated positioning (cursor, parallax)
- **PREFER** `transform` and `opacity` for animations (avoid animating layout properties)
- **USE** CSS nesting where browser support allows, otherwise use flat selectors with BEM-like naming
- **MAINTAIN** mobile-first responsive design with `min-width` media queries

### Selector Specificity:
```css
/* ✅ GOOD: Low specificity, composable */
.glass-card { ... }
.glass-card:hover { ... }
.glass-card .card-title { ... }

/* ❌ BAD: High specificity, fragile */
div.glass-card#mainCard { ... }
.about-hero .glass-card .card-title span { ... }
```

### Media Queries:
```css
/* Mobile-first breakpoints (match existing patterns) */
@media (max-width: 1200px) { ... }    /* Large screens down */
@media (max-width: 900px)  { ... }    /* Tablets */
@media (max-width: 768px)  { ... }    /* Small tablets */
@media (max-width: 600px)  { ... }    /* Large phones */
@media (max-width: 480px)  { ... }    /* Small phones */
```

---

## 5. JAVASCRIPT RULES

### Architecture:
- **main.js** = shared modules using the Singleton Object Pattern
- **Page `<script>`** = page-specific initialization or unique features
- **NO** npm packages, build tools, or transpilers — ES6+ only
- **NO** jQuery, Lodash, or other utility libraries

### Module Pattern (existing convention):
```javascript
// Each feature is a PascalCase singleton object with init/update/destroy methods
const FeatureName = {
  // State
  elements: [],
  isActive: false,

  // Lifecycle
  init() { /* Setup listeners, find DOM elements */ },
  update() { /* Called in rAF loop if needed */ },
  destroy() { /* Cleanup listeners, observers */ }
};
```

### Rules:
- **ALWAYS** wrap in IIFE: `(() => { 'use strict'; ... })()`
- **ALWAYS** use `const` by default, `let` only when reassignment is needed
- **NEVER** use `var`
- **NEVER** leave `console.log()` in production code
- **ALWAYS** check for feature support before using APIs (`IntersectionObserver`, `ResizeObserver`, etc.)
- **ALWAYS** check `isTouchDevice()` before cursor-related code
- **ALWAYS** check `prefersReducedMotion()` before animation-related code
- **ALWAYS** use `{ passive: true }` for scroll/touch event listeners that don't call `preventDefault()`
- **USE** `requestAnimationFrame` for visual updates — never `setTimeout` for animations
- **USE** event delegation where possible (attach to parent, filter with `.closest()`)
- **USE** `IntersectionObserver` for scroll-triggered effects — not scroll listeners
- **AVOID** DOM queries inside loops or rAF callbacks — cache references in `init()`
- **ALWAYS** clean up: disconnect observers, remove listeners, clear timeouts in `destroy()`

### Event Handling:
```javascript
// ✅ GOOD: Delegated, passive, checks for correct target
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  // handle click
}, { passive: false }); // passive: false only because we call preventDefault

// ❌ BAD: Listener on every element, no delegation
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', handler);
});
```

---

## 6. DESIGN TOKEN RULES

All tokens live in `:root` in `styles.css`. They are the single source of truth.

### Required Token Categories:
1. **Colors:** `--bg`, `--bg2`, `--bg3`, `--fg`, `--fg2`, `--fg3`, `--fg4`, `--cyan`, `--violet`, `--pink`, `--emerald`, `--blue`, `--rose`, `--amber` + alpha variants
2. **Spacing:** `--space-xs` through `--space-5xl` (4px → 128px)
3. **Radii:** `--radius-sm` through `--radius-full`
4. **Typography:** `--sans`, `--serif`, `--mono`, `--display`
5. **Easings:** `--ease`, `--ease-smooth`, `--ease-out-expo`, `--ease-bounce`, `--ease-in-out`
6. **Transitions:** `--transition-fast`, `--transition-base`, `--transition-smooth`, `--transition-slow`
7. **Shadows/Glows:** `--glow-cyan`, `--glow-violet`, `--glow-pink`
8. **Z-index:** `--z-base`, `--z-card`, `--z-header`, `--z-overlay`, `--z-cursor`

### Rules:
- **NEVER** add a new hardcoded value when a token exists
- **ALWAYS** add a new token to `:root` if a value is reused 3+ times
- **NEVER** duplicate tokens in page-specific `<style>` blocks — reference from `styles.css`
- **EXCEPTION:** Case study pages may define local accent overrides (e.g., `.cs-emerald { --accent: #10b981; }`)

---

## 7. COMPONENT PATTERNS

### Shared Components (defined in styles.css, used across pages):

**Glass Card:**
```css
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(24px);
  border: 1px solid var(--fg4);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}
.glass-card:hover {
  border-color: var(--cyan-a20);
  box-shadow: var(--glow-cyan);
}
```

**Button:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: var(--radius-full);
  font-family: var(--sans);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .02em;
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
}
```

**Caption Pill:**
```css
.caption-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  border-radius: var(--radius-full);
  background: var(--cyan-a10);
  border: 1px solid rgba(6, 182, 212, .15);
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--cyan);
}
```

### Rules:
- Shared components must be defined ONCE in `styles.css`
- Pages must NOT redefine shared component styles in their `<style>` blocks
- Page-specific variations use additional classes: `.btn.btn-outline`, `.glass-card.card-large`
- Every interactive component must have hover, focus, and active states
- Every component must work at all breakpoints

---

## 8. ANIMATION RULES

### Scroll Reveal System (main.js):
```
.reveal        → fade up (translateY)
.reveal-left   → fade from left (translateX)
.reveal-right  → fade from right (translateX)
.reveal-scale  → fade + scale
.stagger-child → staggered delay for children
.visible       → triggered state (added by IntersectionObserver)
```

### Rules:
- **ALWAYS** use `opacity` + `transform` for reveal animations (GPU composited)
- **NEVER** animate `width`, `height`, `top`, `left`, `margin`, `padding` (triggers layout)
- **ALWAYS** respect `prefers-reduced-motion: reduce` — disable or simplify animations
- **ALWAYS** use `will-change` only on elements that actively animate, remove after
- **USE** CSS `@keyframes` for looping/ambient animations (plasma, particles, pulse)
- **USE** JavaScript for scroll-triggered or interaction-driven animations
- **TARGET** 60fps — profile with Chrome DevTools Performance tab
- **KEEP** animation durations between 200ms (micro) and 1000ms (page transitions)
- **ALWAYS** use the project's easing tokens (`var(--ease)`, `var(--ease-smooth)`)

---

## 9. RESPONSIVE RULES

### Breakpoint Strategy (match existing patterns):
```
Desktop:     > 1200px   (default — design for this first)
Large:       ≤ 1200px   (reduce grid columns, scale down spacing)
Tablet:      ≤ 900px    (stack layouts, simplify navigation)
Small Tablet:≤ 768px    (mobile menu, single column)
Phone:       ≤ 600px    (compact layout, touch-friendly)
Small Phone: ≤ 480px    (minimum viable layout)
```

### Rules:
- **DESIGN** desktop-first (the site is built this way), use `max-width` media queries
- **EVERY** page must be functional at 320px minimum width
- **EVERY** interactive element must have minimum 44px × 44px touch target on mobile
- **HIDE** the custom cursor on touch devices (already handled in main.js)
- **SCALE** typography: hero titles should be smaller on mobile, body text stays readable (≥ 16px)
- **STACK** multi-column grids to single column at ≤ 768px
- **SIMPLIFY** or disable complex animations on small screens
- **TEST** at: 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px

---

## 10. ACCESSIBILITY RULES

### Required on Every Page:
- Skip-to-content link (first focusable element)
- Proper heading hierarchy (one `<h1>`, sequential levels)
- Sufficient color contrast (WCAG AA: 4.5:1 body text, 3:1 large text/UI)
- Visible focus indicators on all interactive elements
- Keyboard navigation for all functionality
- Meaningful alt text on all content images
- ARIA labels on icon-only buttons/links
- `aria-current="page"` on active navigation links
- `role="alert"` or `aria-live` for dynamic content updates

### Rules:
- **USE** semantic HTML before reaching for ARIA
- **EVERY** `<a>` must have descriptive link text (not "click here")
- **EVERY** `<button>` without visible text needs `aria-label`
- **EVERY** `<img>` needs `alt` (descriptive for content, `alt=""` for decorative)
- **EVERY** icon-only element needs an accessible name
- **MAINTAIN** WCAG AA contrast: `var(--fg)` on `var(--bg)` = #eeeef2 on #020206 ≈ 17.5:1 ✓
- **CAUTION** with `var(--fg2)` (45% opacity) and `var(--fg3)` (18% opacity) — may fail contrast
- **SUPPORT** `prefers-reduced-motion` — already partially implemented
- **SUPPORT** `prefers-color-scheme` — not applicable (dark-only design, but acknowledge in meta)
- **NEVER** use `cursor: none` without providing keyboard alternatives for all cursor-driven UI

---

## 11. FORBIDDEN PATTERNS

The following patterns are NEVER allowed. If you find them, fix them immediately:

| # | Pattern | Why It's Forbidden | Fix |
|---|---------|-------------------|-----|
| 1 | `console.log()` in main.js | Leaks to user's console | Remove or wrap in `if (DEV)` |
| 2 | Inline `style="..."` | Breaks CSS architecture | Move to class in styles.css or page `<style>` |
| 3 | Hardcoded hex colors | Defeats token system | Use `var(--color-name)` |
| 4 | `var` keyword | Function-scoped, footgun | Use `const` or `let` |
| 5 | `document.querySelector` in rAF | DOM access is slow in loops | Cache references in init() |
| 6 | `!important` without comment | Indicates specificity problem | Fix the specificity chain |
| 7 | `<div>` with click handler | Not accessible, not semantic | Use `<button>` or `<a>` |
| 8 | Missing `alt` on `<img>` | Accessibility failure | Add descriptive alt or alt="" |
| 9 | Heading level skips | Accessibility failure | Fix heading hierarchy (h1→h2→h3) |
| 10 | Raw `<img>` without width/height | Causes CLS (layout shift) | Add explicit dimensions or aspect-ratio |
| 11 | Unused CSS rules | Dead code, larger file | Remove or consolidate |
| 12 | Duplicate CSS custom properties | Token confusion, hard to maintain | Consolidate to one declaration |
| 13 | `setTimeout` for animations | Not synced to frame rate | Use `requestAnimationFrame` |
| 14 | Event listeners without cleanup | Memory leaks on page transitions | Add destroy/cleanup methods |
| 15 | Fonts loaded synchronously | Blocks rendering, hurts LCP | Use `media="print" onload` pattern |

---

## 12. FILE ORGANIZATION

### styles.css Section Order:
```
1. Design Tokens / Custom Properties (:root)
2. Reset & Base Styles
3. Typography
4. Layout (container, wrap, grid)
5. Shared Components (glass-card, btn, caption-pill, etc.)
6. Header & Navigation
7. Footer
8. Utility Classes
9. Reveal Animation Base Styles
10. Media Queries (responsive overrides)
```

### main.js Section Order:
```
1. Utilities (lerp, clamp, isTouchDevice, prefersReducedMotion)
2. Cursor System
3. Scroll Reveal Animations
4. Smooth Scroll
5. Parallax Effects
6. Magnetic Hover
7. Particles (if used on current page)
8. Page Transitions
9. Master Init (orchestrate all modules)
10. Master rAF Loop (shared animation frame)
```

### HTML Page Section Order:
```
1. <head> — meta, fonts, styles.css, page-specific <style>
2. Cursor elements (.cursor, .cursor-glow)
3. Background layers (.plasma, .grain, .vig)
4. <header> — navigation
5. <main> — page content sections
6. <footer>
7. <script src="main.js">
8. Page-specific <script>
```

---

## 13. GIT CONVENTIONS

### Branch Naming:
```
feature/short-description
fix/short-description
audit/[phase-name]
```

### Commit Message Format:
```
type(scope): description

feat(contact): add Formspree integration for form submission
fix(cursor): resolve hover state flicker during scroll
refactor(css): consolidate duplicate spacing tokens
perf(fonts): switch to font-display: swap, add preload
a11y(nav): add skip-to-content link, fix focus indicators
seo(meta): add Open Graph tags to all pages
audit(design): replace hardcoded colors with CSS tokens
```

**Types:** `feat`, `fix`, `refactor`, `perf`, `a11y`, `seo`, `docs`, `chore`, `audit`

### Rules:
- Commit messages are lowercase (except proper nouns)
- Maximum 72 characters for subject line
- One logical change per commit

---

## 14. SEO CONVENTIONS

### Required on Every Page:
```html
<title>[Page Name] | JU. | Digital Architect</title>
<meta name="description" content="[Unique 150-160 char description]">
<meta property="og:title" content="[Same as title or shorter]">
<meta property="og:description" content="[Same as description or shorter]">
<meta property="og:image" content="https://ju-sand.vercel.app/og-image.png">
<meta property="og:url" content="https://ju-sand.vercel.app/[page]">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://ju-sand.vercel.app/[page]">
```

### Rules:
- **EVERY** page must have unique title and description
- **EVERY** page must have Open Graph tags
- **USE** semantic HTML elements (`<main>`, `<article>`, `<section>`, `<nav>`)
- **USE** proper heading hierarchy
- **ADD** structured data (JSON-LD) for Person/Portfolio schema
- **CREATE** robots.txt and sitemap.xml
- **SET** canonical URLs for all pages

---

## 15. PERFORMANCE CONVENTIONS

### Font Loading:
- Use `media="print" onload="this.media='all'"` pattern (already implemented)
- Add `<noscript>` fallback for font loading (already implemented)
- Define system font fallbacks in `var(--sans)`, `var(--serif)`, `var(--mono)` (already done)
- Consider `font-display: swap` or `font-display: optional`
- Preload critical font files if using self-hosted fonts

### CSS/JS Delivery:
- `styles.css` is render-blocking — keep it lean and well-organized
- `main.js` should use `defer` attribute: `<script src="main.js" defer></script>`
- Page-specific scripts should also be deferred or at end of body

### Images:
- Use modern formats (WebP, AVIF) with `<picture>` fallback
- Always set explicit `width` and `height` attributes (prevents CLS)
- Lazy-load below-the-fold images: `loading="lazy"` (native attribute)
- Use appropriate sizes for different viewports: `srcset` and `sizes` attributes

### Core Web Vitals Targets:
```
LCP  (Largest Contentful Paint):  < 2.5s
INP  (Interaction to Next Paint):  < 200ms (target < 100ms)
CLS  (Cumulative Layout Shift):   < 0.1
TTFB (Time to First Byte):        < 800ms (Vercel handles this)
FCP  (First Contentful Paint):     < 1.8s
```

---

## ENFORCEMENT

These conventions are enforced by:
1. **This document** — read before every session
2. **Code review** — all changes reviewed against these rules
3. **Lighthouse** — performance, accessibility, SEO checks
4. **Manual testing** — visual, responsive, keyboard, screen reader testing

**When these conventions conflict with a quick fix, the conventions win. When these conventions conflict with common practice, the conventions win.**
