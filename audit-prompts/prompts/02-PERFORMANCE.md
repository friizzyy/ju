# JU. — Digital Architect | PERFORMANCE & CORE WEB VITALS AUDIT

**Portfolio Site:** ju-sand.vercel.app
**Architecture:** Vanilla HTML/CSS/JS (no framework, no build tools)
**Stack:** Vercel (static CDN), Google Fonts (4 families), Canvas particle system
**Current Metrics Target:** Lighthouse Performance > 90 (mobile + desktop)

---

## EXECUTIVE SUMMARY

This portfolio is a premium dark-theme landing page with sophisticated animations (plasma blurs, particle canvas, cursor glow, scroll reveals, parallax). While the codebase is clean and framework-free, performance optimization is critical to:
- Maximize LCP (Largest Contentful Paint) for hero title visibility
- Eliminate CLS (Cumulative Layout Shift) from font loading
- Ensure 60fps animations on mid-range mobile devices
- Reduce main thread blocking from JS execution
- Optimize Google Fonts delivery (4 families × multiple weights = many requests)

---

## STEP 1: BASELINE PROFILING

### 1.1 Lighthouse Audit Process

Run Lighthouse audits on all 6 pages in both mobile and desktop modes to establish a baseline:

**Pages to audit:**
- `index.html` (homepage)
- `work.html` (portfolio grid)
- `about.html` (about section)
- `process.html` (process page)
- `contact.html` (contact form)
- `case-study.html` (single case study)

**Desktop Lighthouse Command:**
```bash
# Using Chrome DevTools (fastest)
1. Open Chrome DevTools (F12)
2. Navigate to Lighthouse tab
3. Device: Desktop
4. Metrics: Performance, First Contentful Paint (FCP), Largest Contentful Paint (LCP)
5. Run audit

# Or use CLI (if available)
npm install -g lighthouse
lighthouse https://ju-sand.vercel.app --chrome-flags="--headless --disable-gpu"
```

**Mobile Lighthouse Command:**
```bash
# Using Chrome DevTools
1. Open DevTools → Lighthouse
2. Device: Mobile
3. Throttling: Slow 4G (to simulate mid-range phones)
4. Run full audit
```

### 1.2 Metrics to Record

Create a spreadsheet (or JSON file) tracking:

| Page | Device | FCP | LCP | CLS | INP | TTFB | Performance Score |
|------|--------|-----|-----|-----|-----|------|-------------------|
| index | mobile | ? | ? | ? | ? | ? | ? |
| index | desktop | ? | ? | ? | ? | ? | ? |
| work | mobile | ? | ? | ? | ? | ? | ? |
| work | desktop | ? | ? | ? | ? | ? | ? |
| ... | ... | ... | ... | ... | ... | ... | ... |

**Metric Definitions:**
- **FCP (First Contentful Paint):** Time until first pixel is painted (text, background color, etc.)
- **LCP (Largest Contentful Paint):** Time until the largest visible element is rendered. For this site, likely the hero `<h1>` title.
- **CLS (Cumulative Layout Shift):** Sum of all unexpected layout shifts. Target: < 0.1 (excellent < 0.025)
- **INP (Interaction to Next Paint):** Latency of interaction processing. Target: < 200ms
- **TTFB (Time to First Byte):** Server response time. Should be < 600ms on Vercel.

### 1.3 Identify LCP Element Per Page

**For each page**, check the Lighthouse report and DevTools Performance tab:
1. Open DevTools → Performance tab
2. Reload page and record timeline
3. Look for "Largest Contentful Paint" marker (blue line)
4. Inspect the element that triggered it

**Expected LCP elements by page:**
- `index.html`: `<h1 id="heroTitle">` (main title "Digital Architect")
- `work.html`: Portfolio grid heading or first project card image
- `about.html`: Page heading or main content section
- `process.html`: Process timeline heading
- `contact.html`: Contact form heading
- `case-study.html`: Case study hero image or title

### 1.4 Identify Render-Blocking Resources

In DevTools (Performance tab), check the Loading/Scripting/Rendering waterfall:

**Currently render-blocking:**
1. **Google Fonts CSS** (via `<link ... media="print" onload="..." />`)
   - Loads asynchronously, but check if fallback is instant
2. **styles.css** (2,103 lines)
   - Fully render-blocking until downloaded
3. **main.js** (782 lines)
   - Has `defer` attribute, so should not block initial render
   - But still executes before DOMContentLoaded

**DevTools Steps:**
1. Open DevTools → Performance tab
2. Reload page (hard refresh to bypass cache: Cmd+Shift+R)
3. Record for ~2-3 seconds
4. In the waterfall, look for orange (scripting) and purple (rendering) bars
5. Anything before the FCP line is blocking that paint

---

## STEP 2: FONT OPTIMIZATION

### 2.1 Current Font Loading Strategy Audit

**Current implementation (index.html line 9):**
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=Unbounded:wght@700;800;900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
```

**Issues with current approach:**
1. **Multiple font weights per family** = many font files (Manrope alone = 7 weights)
2. **No `font-display: swap`** in the CSS request URL (uses default `swap`)
3. **`media="print"` + onload trick** works but is implicit; better to be explicit
4. **No subset parameter** (Latin-only is loaded by default, but can optimize further)
5. **No preload for critical fonts** (serif for hero title)

### 2.2 Audit Font Files Being Loaded

**Steps to check actual font downloads:**

1. Open DevTools → Network tab
2. Filter by `fonts.googleapis.com` or `.woff2`
3. Reload page with hard refresh
4. Count the number of font files and their sizes

**Expected current breakdown (estimate):**
- Manrope (7 weights × 2 formats) = ~14 files (WOFF2 + WOFF fallback)
- Instrument Serif (2 variants × 2 formats) = ~4 files
- IBM Plex Mono (3 weights × 2 formats) = ~6 files
- Unbounded (3 weights × 2 formats) = ~6 files
- **Total: ~30 requests** (each request adds latency)

**Google Fonts actually serves:**
- WOFF2 (modern, ~60% smaller than WOFF)
- WOFF (fallback for older browsers)

### 2.3 Font Subsetting & Weight Reduction Strategy

**Recommendation:**

**Phase 1: Reduce unused weights** (immediate, no visual change)
- Manrope: Keep only `400, 600, 700` (body, medium, bold)
- Instrument Serif: Keep `400` (already italic)
- IBM Plex Mono: Keep `400` (code snippets)
- Unbounded: Keep `700, 800` (only used for display)

**New Google Fonts URL:**
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400&family=Unbounded:wght@700;800&display=swap" rel="stylesheet">
```

**Estimated savings:** ~50% fewer font files (~15 requests instead of 30)

**Phase 2: Preload critical fonts** (for LCP)
```html
<!-- Preload: Instrument Serif Italic (hero title) -->
<link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" crossorigin>

<!-- Preload: Manrope 700 (h1, h2, button text) -->
<link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap" crossorigin>
```

### 2.4 Implement font-display Strategy

The current URL lacks explicit `display=swap`. Update to:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400&family=Unbounded:wght@700;800&display=swap" rel="stylesheet">
```

**Why `swap`?**
- FOUT (Flash of Unstyled Text): Browser shows fallback font immediately, swaps to Google Font when loaded
- Ensures text is never invisible (FOIT = invisible while font loads)
- For a portfolio, FOUT is preferable to invisible text

**Verify in styles.css:**
Each font family should declare fallbacks:
```css
:root {
  --sans:    'Manrope', system-ui, -apple-system, sans-serif;
  --serif:   'Instrument Serif', Georgia, 'Times New Roman', serif;
  --mono:    'IBM Plex Mono', 'Fira Code', monospace;
  --display: 'Unbounded', var(--sans);
}
```

These fallbacks (system-ui, Georgia, Fira Code) ensure text is readable while fonts load.

### 2.5 Add Font Fallback Sizing Overrides

To minimize CLS from FOUT, add `@font-face` with overrides in styles.css:

```css
/* Prevent layout shift when fonts load */
@font-face {
  font-family: 'Manrope';
  src: local('system-ui');
  font-display: swap;
  size-adjust: 102%;    /* Adjust system-ui to match Manrope metrics */
  ascent-override: 95%; /* Fine-tune baseline */
}

@font-face {
  font-family: 'Instrument Serif';
  src: local('Georgia');
  font-display: swap;
  size-adjust: 98%;
  ascent-override: 92%;
}
```

**DevTools to verify CLS reduction:**
1. Performance tab → reload with cache disabled
2. Check "Layout Shift" markers in timeline
3. Compare before/after metric

---

## STEP 3: CSS DELIVERY OPTIMIZATION

### 3.1 Audit CSS for Unused Rules

**Current:** styles.css is 2,103 lines, shared across all 6 pages.

**Problem:** Some pages don't use all rules (e.g., Work page doesn't use `.card` for homepage, card styles are only on index.html).

**Audit steps:**

1. **Use Chrome DevTools Coverage:**
   - Open DevTools → More tools → Coverage
   - Reload page
   - Filter by `.css` files
   - Look for red (unused) vs blue (used) portions

2. **Check each page individually:**
   - `index.html`: Uses `.hero`, `.card`, `.dock`, `.pill`, particle system
   - `work.html`: Uses header, nav, content layout (but NOT `.card`, `.dock`)
   - `about.html`: Uses header, content sections, `.reveal*` animations
   - `process.html`: Uses timeline styles (check if these exist in styles.css)
   - `contact.html`: Uses form styles, `.glass-card` (if exists)
   - `case-study.html`: Uses hero image, content sections

**Action:** Identify rules used by **only one page**. Consider:
- Inline critical styles in `<head>` for that page
- Or keep in shared file (small bloat trade-off vs. maintenance)

### 3.2 Inline Critical CSS

**Current approach:** All CSS in external file (2.1KB gzipped estimate).

**Optimization:** Inline the "critical path" CSS in `<head>`:

Example critical styles for index.html:
```html
<head>
  ...
  <style>
    /* Critical: renders hero without waiting for styles.css */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg: #020206;
      --fg: #eeeef2;
      --ease: cubic-bezier(.23, 1, .32, 1);
    }
    html, body { width: 100%; height: 100%; font-family: 'Manrope', sans-serif; background: var(--bg); color: var(--fg); }
    .hero { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -60%); z-index: 10; text-align: center; }
    h1 { font-size: clamp(60px, 9.5vw, 120px); font-weight: 800; line-height: 0.88; }
    /* ... ~50 more critical rules for initial render ... */
  </style>
</head>
```

**Benefit:** Hero section renders without waiting for full styles.css download.

### 3.3 Defer Non-Critical CSS

Load the full styles.css asynchronously:

```html
<!-- Current: render-blocking -->
<link rel="stylesheet" href="styles.css">

<!-- Improved: non-blocking, with fallback -->
<link rel="preload" as="style" href="styles.css">
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

This loads styles.css without blocking initial render, then applies when ready.

### 3.4 Audit Expensive CSS Properties

Check for performance-heavy rules in styles.css:

**1. Filter Effects:**
```css
filter: blur(80px); /* On .core — runs on every paint */
filter: blur(55px); /* On .core-inner */
filter: blur(45px); /* On .core-accent */
filter: blur(2px);  /* On .cursor-glow */
```

**Performance impact:** Blur is expensive; each blur-affected element requires:
- Allocation of off-screen canvas
- Pixel sampling for blur kernel
- Composition back to main buffer

**Optimization:**
- Reduce blur radius: `blur(80px)` → `blur(50px)` (still looks good, faster)
- Use `will-change: filter` ONLY on elements that animate (currently applied to `.cursor-glow` and `.cursor`)
- Consider using SVG filters for static blur (better performance on large shapes)

**2. Backdrop Filter:**
```css
backdrop-filter: blur(24px) saturate(1.4); /* .header */
backdrop-filter: blur(40px);               /* .ci (card inner) */
backdrop-filter: blur(12px);               /* .live status badge */
```

**Performance impact:** More expensive than filter (affects all elements behind).

**Optimization:**
- On mobile, reduce backdrop-filter blur: `blur(12px)` instead of `blur(24px)`
- Add media query:
  ```css
  @media (max-width: 768px) {
    .header { backdrop-filter: blur(12px) saturate(1.2); }
    .ci { backdrop-filter: blur(20px); }
  }
  ```

**3. Box Shadow:**
```css
box-shadow: 0 28px 55px rgba(0,0,0,.5), 0 0 60px rgba(139,92,246,.04);
```

**Performance:** Multiple shadows are expensive on hover. Consider:
- Reduce shadow blur radius
- Use single shadow instead of double

**4. Gradients & conic-gradient:**
```css
background: conic-gradient(from var(--angle), transparent 35%, rgba(139,92,246,.25) 50%, transparent 65%);
```

**Performance:** Animated conic-gradient in `@keyframes shimmer` is expensive (GPU recalculation every frame on hover).

**Optimization:** Use simple CSS animations instead (no GPU overhead):
```css
@keyframes shimmer {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
```

### 3.5 Verify Animations Use Compositor-Optimized Properties

**Safe properties (GPU-accelerated):**
- `transform` (translate, rotate, scale, skew)
- `opacity`

**Avoid animating:**
- `top`, `left`, `bottom`, `right` (use `transform: translate` instead)
- `width`, `height` (causes layout recalculation)
- `font-size` (layout shift)
- `filter` (expensive, requires off-screen rendering)

**DevTools check:**
1. Performance tab → record animation
2. Look for "Rendering" rows (should be minimal)
3. Look for "Paint" rows (should be few if animations use transform only)

**Current code issues:**
- `.hero` uses `transform` ✓ (good)
- `.card:hover` uses `transform: translateY(-24px)` ✓ (good)
- Cursor `.hovering` transition uses `width, height, border` ✗ (triggers repaint)

**Fix cursor transition:**
```css
.cursor {
  /* Current: animates width/height */
  transition: width .25s var(--ease), height .25s var(--ease), background .25s var(--ease);

  /* Better: use scale instead */
  transition: transform .25s var(--ease), background .25s var(--ease);
}

.cursor.hovering {
  /* Current: width: 48px; height: 48px; */
  /* Better: */
  transform: scale(6); /* 8px * 6 = 48px */
}
```

### 3.6 Check will-change Usage

Currently applied to:
```css
.cursor { will-change: transform; }
.cursor-glow { will-change: transform; }
h1 { will-change: transform; }
.card { will-change: transform; }
```

**Issue:** `will-change` creates a new stacking context. Overuse can degrade performance.

**Recommendation:**
- Keep on `.cursor` and `.cursor-glow` (run every frame)
- Remove from `h1` (only animates on first load, not repeatedly)
- Remove from `.card` (only on hover, not constant)

---

## STEP 4: JAVASCRIPT OPTIMIZATION

### 4.1 Verify Defer Attribute

**Current (index.html line 428):**
```html
<script src="main.js"></script>
```

**Action:** Add `defer` attribute:
```html
<script src="main.js" defer></script>
```

**Why:** Ensures:
1. HTML parsing continues while JS downloads
2. JS executes after DOM is ready
3. No blocking of DOMContentLoaded event

### 4.2 Audit rAF Loop Efficiency

**Current main.js structure:**
1. **Cursor loop** (lines 103–121): Updates cursor position every frame
   - Calls `lerp()` for smooth movement
   - Updates `transform: translate3d()` (GPU-accelerated) ✓
2. **Reveals observer** (lines 126–162): IntersectionObserver (not rAF, efficient) ✓
3. **Parallax loop** (lines 198–229): Per-element calculation on every scroll
4. **Magnetic hover** (lines 234–269): Per-element event listener

**Performance check:**
```javascript
// In DevTools Console, measure frame rate:
setInterval(() => {
  const fps = 1000 / (performance.now() % 16.67);
  console.log(`FPS: ${Math.round(fps)}`);
}, 1000);
```

**Common issues to check:**
- Excessive DOM queries in rAF loop
- Reading layout properties (getBoundingClientRect) without caching
- Triggering reflows (layout recalculation)

### 4.3 Check for Forced Reflows

**Pattern to avoid:**
```javascript
// BAD: Causes reflow
element.style.left = element.offsetLeft + 10 + 'px'; // Read + Write in same frame
```

**Good pattern:**
```javascript
// GOOD: Batch reads, then writes
const pos = element.offsetLeft; // Read
element.style.left = (pos + 10) + 'px'; // Write later
```

**Current code audit (main.js):**

Lines 106–107 (Cursor update):
```javascript
this.pos.x = lerp(this.pos.x, this.mouse.x, 0.18);
this.pos.y = lerp(this.pos.y, this.mouse.y, 0.18);
// Then immediately write:
this.el.style.transform = `translate3d(${this.pos.x + offset}px, ...`;
```
✓ Safe: Only reads calculated values, no layout properties.

Lines 217–224 (Parallax):
```javascript
const rect = el.getBoundingClientRect(); // Read layout
const offset = (center - viewCenter) * rate;
el.style.transform = `translate3d(0, ${offset}px, 0)`; // Write
```
⚠️ Potential issue: `getBoundingClientRect()` for every element on every scroll. Consider caching.

**Optimization:**
```javascript
// Cache positions on load/resize, update only on scroll
Parallax.elements.forEach((el) => {
  const rect = el.getBoundingClientRect();
  el._parallaxRect = rect; // Cache
});

// Then in loop:
const offset = (el._parallaxRect.top - viewCenter) * rate;
```

### 4.4 Verify IntersectionObserver Cleanup

**Current code (Reveals, lines 135–156):**
```javascript
this.observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    el.classList.add('visible');
    this.observer.unobserve(el); // ✓ Unobserves after reveal
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
```

✓ Good: Unobserves each element after it's revealed (no memory leak).

**Verify destroy() is called on page transitions:**
- Check if `PageTransition.init()` (mentioned in main.js) calls `Reveals.destroy()`
- If pages don't properly cleanup, observer keeps running in memory

### 4.5 Audit Particle Canvas Performance

**Current (index.html line 383):**
```html
<canvas id="particles"></canvas>
```

**Questions to check:**
1. Is the particle system active?
2. Does it run even when scrolled past (out of viewport)?
3. What's the particle count?
4. Does it impact mobile frame rate?

**Optimization steps:**

If particle system exists in main.js:
```javascript
// Check if canvas is visible before rendering
if (!isCanvasVisible) {
  cancelAnimationFrame(animationFrame);
  return;
}
```

**DevTools Performance measurement:**
1. Performance tab → record animation
2. Check GPU usage (Chrome: chrome://gpu)
3. If GPU > 50%, particles are expensive

### 4.6 Check Event Listener Passive Flags

**Current passive listeners (good):**
- Lines 63, 84, 211: `{ passive: true }`

**Verify all touch/scroll/mouse listeners have `passive: true`:**
```javascript
// Good
window.addEventListener('scroll', handler, { passive: true });

// Bad (causes jank)
window.addEventListener('scroll', handler); // No passive flag
```

### 4.7 Check for Memory Leaks

**Common leak patterns:**
1. Event listeners never removed
2. IntersectionObserver never disconnected
3. Global variables holding references

**Memory check in DevTools:**
1. Performance tab → record page load + interaction
2. At end of recording, take heap snapshot
3. Check if total heap size grows unbounded

---

## STEP 5: RENDERING PERFORMANCE

### 5.1 Audit Paint and Composite Layers

**Steps in DevTools:**

1. Open DevTools → Rendering tab (top-right menu)
2. Enable "Paint flashing" (shows repaints in green)
3. Enable "Rendering stats"
4. Move cursor, scroll, trigger animations

**Watch for:**
- Excessive green flashes (repaints)
- Layers indicator (GPU > 20% is high)
- Frame rate (should stay ~60fps)

### 5.2 Identify Expensive Repaints

**Current potential culprits:**

1. **Cursor glow** (blur effects every frame):
   ```css
   .cursor-glow {
     filter: blur(2px); /* Repaints on every move */
   }
   ```
   Optimization: Remove blur or apply only on hover.

2. **Plasma core elements** (animated blur):
   ```css
   .core { filter: blur(80px); animation: corePulse 10s ... }
   ```
   Optimization: Reduce blur radius or use SVG filter.

3. **Cards on hover** (box-shadow changes):
   ```css
   .card:hover .ci { box-shadow: 0 28px 55px rgba(0,0,0,.5), ... }
   ```
   Optimization: Use `filter: drop-shadow()` instead (GPU-accelerated).

### 5.3 Verify GPU Acceleration

**Check transform properties for 3D promotion:**

Currently correct:
```css
.cursor { transform: translate3d(-100px, -100px, 0); } /* ✓ Will use GPU */
.card { transform: translateY(-24px) scale(.96); } /* Check: should be translate3d */
```

**Improvement:**
```css
/* Current */
.card { transform: translateY(80px) scale(.96); }

/* Better (explicit GPU promotion) */
.card { transform: translate3d(0, 80px, 0) scale(.96); }
```

### 5.4 Audit Stacking Contexts and Layers

**Current z-index scale (styles.css lines 81–86):**
```css
--z-base:    1;
--z-card:    10;
--z-header:  100;
--z-overlay: 500;
--z-cursor:  9999;
```

**Check for excessive layers:**
1. Each `position: fixed` or high z-index creates a potential new paint layer
2. Too many layers = higher memory usage

**Current layers (estimate):**
- `.cursor` (z: 10000) — separate layer
- `.cursor-glow` (z: 9999) — separate layer
- `.header` (z: 100) — separate layer
- `.dock` (z: 50, inferred) — separate layer
- `.plasma` elements — separate layers (multiple cores)
- Canvas `.particles` — separate layer
- `.grain`, `.vig` overlays — separate layers

**Total: ~10+ layers** (acceptable for a single-page site)

**DevTools check:**
1. Rendering tab → enable "Show layers"
2. Scroll and check layer count
3. If > 30, optimize by removing/combining layers

### 5.5 Verify 60fps on Mid-Range Mobile

**Test on actual device or emulation:**

1. DevTools → Device toolbar (mobile simulation)
2. Performance tab → Slow 4G throttling
3. Record cursor movement, hover interaction
4. Check frame rate (target: 60fps, acceptable: 45fps)

**If frame rate drops below 45fps:**
- Reduce particle count
- Simplify blur effects
- Reduce animation duration
- Disable parallax on mobile

---

## STEP 6: NETWORK OPTIMIZATION

### 6.1 Measure Page Weight

**DevTools Network tab analysis:**

1. Open DevTools → Network tab
2. Hard refresh each page (bypass cache)
3. Record total size:

**Metrics to track:**

| Resource | Size | Count | Notes |
|----------|------|-------|-------|
| HTML | ? | 1 | Minifiable? |
| CSS | ~2.1 KB | 1 | 2,103 lines unminified |
| JS | ~0.8 KB | 1 | 782 lines unminified |
| Google Fonts | ? | ~15 | Depends on weight reduction |
| Images | 0 | 0 | Text-heavy now |
| **TOTAL** | **~10-15 KB** | **~18** | Before gzip |

**After gzip (typical):**
- HTML: ~2 KB
- CSS: ~0.6 KB
- JS: ~0.3 KB
- Fonts: ~4-6 KB (WOFF2, Google supplies pre-compressed)
- **Total: ~7-9 KB** (very good)

### 6.2 Verify HTTP/2 and Compression

**Vercel provides:**
- HTTP/2 by default (multiplexing, header compression)
- Brotli compression for CSS/JS/HTML

**Verify in DevTools:**
1. Network tab → right-click column headers → add "Protocol"
2. Check all resources show `h2` (HTTP/2)
3. Check "Size" vs "Transferred" (difference = compression ratio)

**Expected compression:**
- CSS 2.1 KB → ~0.6 KB (71% reduction)
- JS 0.8 KB → ~0.3 KB (63% reduction)

### 6.3 Check Caching Headers

**Vercel default caching:**
- HTML: `cache-control: public, max-age=0, must-revalidate`
- CSS/JS: `cache-control: public, max-age=31536000, immutable`
- Fonts: `cache-control: public, max-age=31536000, immutable`

**Verify in DevTools:**
1. Network tab → select resource
2. Headers tab → look for `cache-control` response header

**For Vercel, caching is automatic.** No action needed unless deploying elsewhere.

### 6.4 Minimize Unnecessary Requests

**Current requests (index.html):**
1. HTML file (1)
2. Google Fonts CSS (1)
3. Google Font files (~15)
4. styles.css (1)
5. main.js (1)
6. Microlink API for card images (~5 screenshot requests)

**Optimization:** The microlink API calls (`https://api.microlink.io/?url=...`) add latency. Consider:
- Pre-generate screenshots server-side
- Use `loading="lazy"` (already present) to defer below-fold images
- Cache screenshots as static files

---

## STEP 7: CLS (CUMULATIVE LAYOUT SHIFT) AUDIT

### 7.1 Font Loading Causes Layout Shift (FOUT)

**Current issue:** When Google Fonts load, text switches from fallback font to Google font, causing a shift.

**Example:**
1. Page loads with fallback font (system-ui) — text occupies X width
2. Google Font loads (Manrope, slightly different width) — text reflows → CLS

**Measurement in DevTools:**
1. Performance tab → reload with network throttling
2. Look for "Layout Shift" entries
3. Record CLS value (Lighthouse report shows actual number)

**Fix: Add size-adjust overrides** (see Step 2.5)

### 7.2 Check Image Dimensions

**Current:** Text-heavy site (images are lazy-loaded on index.html).

**For future images:**
- Always include `width` and `height` attributes
- Use `aspect-ratio` CSS:
  ```html
  <img src="..." width="400" height="300" style="aspect-ratio: 400/300;">
  ```

### 7.3 Verify No Inline Dimension Changes

**Check for elements that shift on load:**

1. `.hero` section: uses `position: fixed` (no layout shift) ✓
2. `.header` navbar: fixed position, but `height: 72px` ensures reserve space ✓
3. `.pill` badge: fixed size, no shift ✓
4. `.card` elements: fixed dimensions, no shift ✓

**Potential issue:** Body opacity transition (index.html):
```css
body { opacity: 0; transition: opacity .4s ease; }
body.ready { opacity: 1; }
```

This doesn't cause layout shift (opacity doesn't affect layout), but ensure `body.ready` class is added only after fonts load.

### 7.4 Verify Cursor Doesn't Trigger Recalculation

**Current cursor code (main.js):**
```javascript
this.el.style.transform = `translate3d(...)`; // Transform only
```

✓ Good: Uses `transform`, no layout recalculation.

### 7.5 Check for Fixed Navbar Shift

**Potential issue:** If `.header` uses non-fixed positioning on mobile, content shifts.

**Current (styles.css line 284):**
```css
.header {
  position: fixed;
  top: 0;
  ...
}
```

✓ Good: Always fixed, no shift.

---

## STEP 8: LCP (LARGEST CONTENTFUL PAINT) OPTIMIZATION

### 8.1 Identify LCP Element Per Page

**Expected LCP elements:**

1. **index.html:** `<h1 id="heroTitle">` (hero title)
   - Text: "Digital Architect."
   - Fonts needed: Manrope 800 (body), Instrument Serif italic (display)
2. **work.html:** First project card image or page heading
3. **about.html:** Main heading
4. **process.html:** Timeline heading
5. **contact.html:** Form heading
6. **case-study.html:** Hero image or title

**DevTools LCP detection:**
1. Performance tab → reload page
2. Find "Largest Contentful Paint" marker (blue line)
3. Click marker to see which element triggered it
4. Note font requirements for that element

### 8.2 Ensure Fonts Load ASAP

**For hero title (Instrument Serif italic):**

Current approach:
```html
<link href="...family=Instrument+Serif:ital@0;1..." rel="stylesheet">
```

**Improved approach: Explicit preload:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical font (highest priority) -->
<link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/.../instrument-serif-italic.woff2" crossorigin>

<!-- Load all fonts asynchronously -->
<link href="...display=swap" rel="stylesheet">
```

### 8.3 Remove Render-Blocking Resources Before LCP

**Current flow:**
1. HTML parses
2. `<head>` loads (fonts, CSS)
3. `<body>` renders
4. Hero `<h1>` paints (LCP)

**Optimization: Inline critical CSS above the fold**

```html
<style>
  /* Critical: paint hero without waiting for styles.css */
  h1 { font-family: 'Instrument Serif', serif; font-size: 120px; font-weight: 400; }
  .hero { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -60%); }
  /* ... ~30 more lines ... */
</style>
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

This allows the hero to render immediately while styles.css loads in background.

### 8.4 Split CSS (Critical vs. Deferred)

**Create styles-critical.css (~500 lines):**
- Hero section styles
- Header/nav styles
- Form styles (for pages with forms)
- Reset/base styles

**Keep styles.css for non-critical:**
- Card animations
- Particle effects
- Page-specific styles

**HTML:**
```html
<style>
  /* Inline critical CSS */
  ...
</style>
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

### 8.5 Optimize Google Fonts Loading

**Current approach:** Good, but can improve.

**Better approach:**
```html
<!-- Step 1: Preconnect to Google servers -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Step 2: Preload critical font (Instrument Serif italic for hero) -->
<link rel="preload" as="font" type="font/woff2" href="..." crossorigin>

<!-- Step 3: Load all fonts, non-blocking -->
<link href="...?family=...&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="..." rel="stylesheet"></noscript>
```

---

## STEP 9: INP (INTERACTION TO NEXT PAINT) AUDIT

### 9.1 Measure Interaction Latency

**DevTools Performance tab:**
1. Record user interaction (click, scroll, type)
2. Note "Interaction to Next Paint" duration
3. Target: < 200ms

**Interactions to test:**
- Card hover (magnetic effect)
- Card click (opens external link)
- Mobile menu toggle
- Smooth scroll (anchor links)
- Cursor movement

### 9.2 Check Click Handlers for Expensive Operations

**Current (index.html lines 436–440):**
```javascript
cards.forEach(card => {
  card.addEventListener('click', () => {
    const u = card.dataset.url;
    if (u) window.open(u, '_blank');
  });
});
```

✓ Good: Simple operation, no heavy processing.

### 9.3 Verify Smooth Scroll Doesn't Block Main Thread

**Current (main.js lines 167–192):**
```javascript
window.scrollTo({ top, behavior: 'smooth' });
```

⚠️ Potential issue: `behavior: 'smooth'` can block main thread on older browsers.

**Check:** If users report janky scrolling, optimize:
```javascript
// Use CSS scroll-behavior instead
html { scroll-behavior: smooth; }

// JS only handles position calculation
window.scrollTo(top); // No smooth keyword (native browser handles)
```

### 9.4 Check Mobile Menu Toggle Responsiveness

**Steps:**
1. Open mobile viewport (DevTools device toolbar)
2. Click menu button
3. Record Performance
4. Check INP (should be < 200ms)

**If slow:**
- Check for heavy DOM manipulation
- Ensure CSS transitions are optimized
- Verify no layout recalculation on toggle

---

## STEP 10: IMAGE OPTIMIZATION (FUTURE-PROOFING)

### 10.1 Guidelines for When Images Are Added

**Current state:** Text-heavy, no raster images except lazy-loaded card screenshots.

**When adding images (project screenshots, case studies, etc.):**

### 10.2 Use WebP/AVIF with Picture Fallback

**Format selection:**
- **AVIF:** Best compression, modern browsers (2024+)
- **WebP:** Great compression, broader support (2020+)
- **PNG/JPG:** Fallback for older browsers

**HTML structure:**
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" width="800" height="600">
</picture>
```

### 10.3 Implement Lazy Loading with Explicit Dimensions

**Already done on index.html (card images):**
```html
<img src="..." alt="..." loading="lazy" width="..." height="..." onload="this.classList.add('loaded')">
```

✓ Good: Defers below-fold image loading, includes dimensions.

**Extend to all images:**
```html
<img src="..." alt="..." loading="lazy" width="800" height="600" decoding="async">
```

### 10.4 Use Responsive Images (srcset & sizes)

**For images used at multiple widths:**
```html
<img src="image-800w.jpg"
     srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w"
     sizes="(max-width: 600px) 90vw, (max-width: 1200px) 50vw, 800px"
     alt="Description"
     width="800" height="600">
```

### 10.5 Recommend Image CDN

**Options:**
1. **Vercel Image Optimization** (easiest, integrated with Vercel deployment)
   ```html
   <Image src="/project-screenshot.jpg" width={800} height={600} alt="..." />
   ```
   (Note: Requires Next.js framework; for vanilla JS, use alternative)

2. **Cloudinary** (flexible, CDN-based)
   ```html
   <img src="https://res.cloudinary.com/your-cloud/image/upload/w_800,f_auto,q_auto/project-screenshot.jpg" alt="...">
   ```

3. **imgix** (high performance)
   ```html
   <img src="https://your-domain.imgix.net/project-screenshot.jpg?w=800&auto=format&q=80" alt="...">
   ```

**For Vercel deployment (vanilla site):**
- Store images in `/public` folder
- Serve via Vercel's static CDN (automatic)
- Consider external CDN (Cloudinary, Imgix) for transformation

---

## PERFORMANCE OPTIMIZATION CHECKLIST

### HIGH PRIORITY (Impact > 30% on LCP/FCP)

- [ ] **Reduce Google Fonts weights** (Phase 1 from Step 2.3)
  - Action: Update URL to only essential weights
  - Expected impact: -50% font requests, ~1-2ms LCP improvement

- [ ] **Preload critical fonts** (Step 2.4)
  - Action: Add `<link rel="preload">` for Instrument Serif italic
  - Expected impact: ~100-200ms LCP improvement

- [ ] **Inline critical CSS** (Step 3.2)
  - Action: Move hero, header, base styles to `<style>` in `<head>`
  - Expected impact: ~200-400ms FCP improvement

- [ ] **Add font-display fallback sizing** (Step 2.5)
  - Action: Add `size-adjust` to `@font-face` declarations
  - Expected impact: Reduce CLS by 0.05+

### MEDIUM PRIORITY (Impact 10-30%)

- [ ] **Reduce blur effects on expensive elements** (Step 5.2)
  - Action: Reduce `.core` blur from 80px to 50px
  - Expected impact: ~5-10% GPU usage reduction

- [ ] **Optimize cursor animation** (Step 3.5)
  - Action: Use `scale` instead of width/height changes
  - Expected impact: Reduce repaints by ~20%

- [ ] **Fix will-change overuse** (Step 3.6)
  - Action: Remove from `h1`, `.card`, keep on cursor only
  - Expected impact: ~5-8% memory reduction

- [ ] **Cache parallax positions** (Step 4.3)
  - Action: Cache `getBoundingClientRect()` results
  - Expected impact: ~10-15% scroll performance improvement

### LOW PRIORITY (Nice-to-have, Impact < 10%)

- [ ] **Use drop-shadow instead of box-shadow** (Step 5.2)
  - Action: Test `filter: drop-shadow()` on hover effects
  - Expected impact: Slight GPU efficiency gain

- [ ] **Reduce particle count on mobile** (Step 4.5)
  - Action: Detect mobile and lower particle density
  - Expected impact: Better mobile 60fps consistency

- [ ] **Minify and gzip CSS/JS** (Step 6.1)
  - Action: If not already done by Vercel
  - Expected impact: ~20-30% file size reduction

---

## TESTING & VALIDATION PROCEDURE

### Phase 1: Baseline Establishment (Week 1)

1. Run Lighthouse on all 6 pages (mobile + desktop)
2. Record metrics in spreadsheet
3. Use DevTools Performance to identify bottlenecks
4. Document current Performance score, LCP, CLS, INP

### Phase 2: Implement High-Priority Fixes (Week 2)

1. Reduce Google Fonts weights (5 min)
2. Add preload links (5 min)
3. Inline critical CSS (30 min)
4. Test and verify

### Phase 3: Medium-Priority Optimization (Week 3)

1. Optimize blur effects
2. Fix cursor animation
3. Cache parallax data
4. Test mobile performance

### Phase 4: Final Validation (Week 4)

1. Re-run all Lighthouse audits
2. Compare before/after metrics
3. Verify no visual regressions
4. Check accessibility (A11y) is maintained

---

## LIGHTHOUSE PERFORMANCE TARGET SCORECARD

**Goal: > 90 Performance score on mobile and desktop**

| Page | Device | Current | Target | Gap |
|------|--------|---------|--------|-----|
| index | mobile | ? | >90 | ? |
| index | desktop | ? | >90 | ? |
| work | mobile | ? | >85 | ? |
| work | desktop | ? | >90 | ? |
| about | mobile | ? | >85 | ? |
| about | desktop | ? | >90 | ? |
| process | mobile | ? | >85 | ? |
| process | desktop | ? | >90 | ? |
| contact | mobile | ? | >85 | ? |
| contact | desktop | ? | >90 | ? |
| case-study | mobile | ? | >85 | ? |
| case-study | desktop | ? | >90 | ? |

---

## CONCLUSION

This JU. portfolio combines premium aesthetics with clean vanilla code. Performance optimization focuses on:

1. **Font delivery** (largest opportunity: 50% request reduction)
2. **Critical CSS inlining** (200-400ms FCP gain)
3. **GPU acceleration** (smooth 60fps animations)
4. **Network efficiency** (already excellent on Vercel)

Expected result after implementing all recommendations:
- **Lighthouse Performance:** 90+ (mobile), 95+ (desktop)
- **LCP:** < 1.5s on mobile, < 1.0s on desktop
- **CLS:** < 0.05 (excellent)
- **INP:** < 100ms (excellent)

The site is already in good shape; these optimizations represent best practices to maximize perceived performance and user experience.
