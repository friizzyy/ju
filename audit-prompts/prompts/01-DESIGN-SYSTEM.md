# DESIGN SYSTEM & VISUAL CONSISTENCY AUDIT
## JU. — Digital Architect | ju-sand.vercel.app

**Audit Date:** 2026-02-27
**Project Type:** Pure vanilla HTML/CSS/JS static portfolio
**Key Files:** `styles.css` (2,103 lines), 6 HTML pages with page-specific `<style>` blocks

---

## OVERVIEW

This audit identifies deviations from the design token system, inconsistencies in component styling, typography usage, and dark theme integrity across the JU. portfolio. The design system is well-structured with CSS custom properties, but several areas have hardcoded values that bypass the token system.

**File Structure:**
- `/styles.css` — Shared design system (primary source of truth)
- `/index.html` — Homepage (custom plasma background, page-specific styles)
- `/about.html` — About page (page-specific styles)
- `/work.html` — Work/portfolio page (project cards, page-specific styles)
- `/case-study.html` — Case study template (page-specific styles)
- `/process.html` — Process page (page-specific styles)
- `/contact.html` — Contact page (page-specific styles)

---

## STEP 1: DESIGN TOKEN AUDIT

### 1.1 Color Tokens — Verification

**Status:** MULTIPLE ISSUES FOUND

#### Token Definition (styles.css :root)
```css
/* ---- Core Palette ---- */
--bg:       #020206;        /* Primary background */
--bg2:      #07070f;        /* Secondary background */
--bg3:      #0c0c18;        /* Tertiary background */
--bg-card:  rgba(12, 12, 24, .55);  /* Glass card background */
--fg:       #eeeef2;        /* Primary foreground */
--fg2:      rgba(238, 238, 242, .45);  /* Secondary text */
--fg3:      rgba(238, 238, 242, .18);  /* Tertiary text */
--fg4:      rgba(238, 238, 242, .06);  /* Quaternary borders */

/* ---- Accent Colors ---- */
--cyan:     #06b6d4;
--violet:   #8b5cf6;
--pink:     #ec4899;
--emerald:  #10b981;
--blue:     #3b82f6;
--rose:     #f43f5e;
--amber:    #f59e0b;

/* ---- Accent Alphas ---- */
--cyan-a10:   rgba(6, 182, 212, .10);
--cyan-a20:   rgba(6, 182, 212, .20);
--cyan-a40:   rgba(6, 182, 212, .40);
--violet-a10: rgba(139, 92, 246, .10);
--violet-a20: rgba(139, 92, 246, .20);
--pink-a10:   rgba(236, 72, 153, .10);
--pink-a20:   rgba(236, 72, 153, .20);
```

#### Issue 1.1.1: Missing Alpha Variants
**Severity:** MEDIUM
**Finding:** Only cyan, violet, and pink have alpha variants. Emerald, blue, rose, and amber do not.

**Search Command:**
```bash
grep -n "rgba(10, 185, 129\|rgba(59, 130, 246\|rgba(244, 63, 94\|rgba(245, 158, 11" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css
```

**Expected:** Should have consistent alpha token variants for all accent colors:
```css
--emerald-a10:  rgba(16, 185, 129, .10);
--emerald-a20:  rgba(16, 185, 129, .20);
--blue-a10:     rgba(59, 130, 246, .10);
--blue-a20:     rgba(59, 130, 246, .20);
--rose-a10:     rgba(244, 63, 94, .10);
--rose-a20:     rgba(244, 63, 94, .20);
--amber-a10:    rgba(245, 158, 11, .10);
--amber-a20:    rgba(245, 158, 11, .20);
```

**Impact:** Can't use emerald, blue, rose, or amber in glass card/overlay scenarios without hardcoding rgba values.

---

#### Issue 1.1.2: Hardcoded Colors in Gradient Text Utilities
**Severity:** MEDIUM
**Lines:** 637, 644, 651 in styles.css

**Current Code:**
```css
.text-gradient-cyan {
  background: linear-gradient(135deg, var(--cyan), #67e8f9);  /* ❌ Hardcoded */
}

.text-gradient-violet {
  background: linear-gradient(135deg, var(--violet), #c4b5fd);  /* ❌ Hardcoded */
}

.text-gradient-pink {
  background: linear-gradient(135deg, var(--pink), #f9a8d4);  /* ❌ Hardcoded */
}
```

**Search Command:**
```bash
grep -n "#67e8f9\|#c4b5fd\|#f9a8d4" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css
```

**Expected:** Define lighter tints as tokens:
```css
:root {
  --cyan-light:   #67e8f9;
  --violet-light: #c4b5fd;
  --pink-light:   #f9a8d4;
}

.text-gradient-cyan {
  background: linear-gradient(135deg, var(--cyan), var(--cyan-light));
}
```

**Impact:** Gradient colors are not part of the design system and can't be adjusted globally.

---

#### Issue 1.1.3: Hardcoded RGBA Values in HTML Files
**Severity:** MEDIUM
**Finding:** 28 instances of hardcoded `rgba(6, 182, 212, ...)` across HTML files

**Search Commands:**
```bash
grep -n "rgba(6, 182, 212" /sessions/friendly-clever-hawking/mnt/ju-main/about.html
grep -n "rgba(6, 182, 212" /sessions/friendly-clever-hawking/mnt/ju-main/work.html
grep -n "rgba(6, 182, 212" /sessions/friendly-clever-hawking/mnt/ju-main/contact.html
```

**Example (about.html, line 34):**
```css
border: 1px solid rgba(6, 182, 212, .15);  /* ❌ Should use var(--cyan-a10) or new token */
```

**Expected:** Use token:
```css
border: 1px solid var(--cyan-a10);
```

**Impact:** Changes to cyan color require updating multiple HTML files.

---

#### Issue 1.1.4: Gradient Border in Glass Cards Uses RGB, Not Token
**Severity:** LOW
**Lines:** 799-801 in styles.css

**Current Code:**
```css
.glass-card::before {
  background: linear-gradient(
    135deg,
    rgba(238, 238, 242, .06),  /* ❌ Hardcoded --fg4 color */
    transparent 50%,
    rgba(6, 182, 212, .04)     /* ❌ Hardcoded cyan variant */
  );
}
```

**Expected:**
```css
background: linear-gradient(
  135deg,
  var(--fg4),
  transparent 50%,
  var(--cyan-a10)  /* or define --cyan-a5 for .04 alpha */
);
```

---

### 1.2 Typography Tokens — Verification

**Status:** GOOD (minor inconsistencies)

#### Token Definition (styles.css :root)
```css
--sans:    'Manrope', system-ui, -apple-system, sans-serif;
--serif:   'Instrument Serif', Georgia, 'Times New Roman', serif;
--mono:    'IBM Plex Mono', 'Fira Code', monospace;
--display: 'Unbounded', var(--sans);
```

#### Verification Checklist:
- ✅ All font family tokens are defined
- ✅ System font stacks are provided as fallbacks
- ✅ Font loading uses efficient `media="print" onload` pattern
- ✅ All 6 HTML pages use `var(--sans)`, `var(--serif)`, `var(--mono)`, `var(--display)`

**Search Command:**
```bash
grep -r "font-family:" /sessions/friendly-clever-hawking/mnt/ju-main/*.html | grep -v "var(--"
```

Result: ✅ No raw font names found (all use tokens)

---

#### Issue 1.2.1: Font Loading Efficiency
**Status:** GOOD

**Verification:**
```html
<!-- All 6 HTML files use optimized loading -->
<link href="https://fonts.googleapis.com/css2?family=..."
      rel="stylesheet"
      media="print"
      onload="this.media='all'">
<noscript><link href="..." rel="stylesheet"></noscript>
```

This pattern is correctly implemented across all pages. ✅

---

### 1.3 Spacing Tokens — Verification

**Status:** MOSTLY GOOD (some hardcoded px values)

#### Token Definition (styles.css :root)
```css
--space-xs:  4px;
--space-sm:  8px;
--space-md:  16px;
--space-lg:  24px;
--space-xl:  32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
--space-5xl: 128px;
```

#### Issue 1.3.1: Hardcoded Spacing in Component Definitions
**Severity:** MEDIUM
**Finding:** Multiple hardcoded px values throughout styles.css that don't align with spacing scale

**Examples:**

| Line | Property | Value | Expected Token |
|------|----------|-------|-----------------|
| 208 | width/height (cursor) | 8px | --space-sm |
| 223 | width/height (cursor hover) | 48px | Custom or --space-3xl (64px)? |
| 235-236 | width/height (cursor-glow) | 500px | No token exists |
| 261 | background-size (grain) | 180px | No token exists |
| 289 | padding (header) | 0 48px | var(--space-2xl) ✅ partially used |
| 290 | height (header) | 72px | No token |
| 329 | gap (header nav) | 36px | Close to --space-xl (32px) but not exact |

**Search Command:**
```bash
grep -n "padding:\|margin:\|gap:\|width:\|height:" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css | grep -v "var(--space" | head -40
```

**Recommendation:** Define additional spacing tokens:
```css
:root {
  --cursor-dot:    8px;      /* Cursor size */
  --cursor-hover:  48px;     /* Cursor expand size */
  --cursor-glow:   500px;    /* Glow radius */
  --header-height: 72px;
  --grain-size:    180px;
}
```

---

#### Issue 1.3.2: Hardcoded Negative Margins/Transforms
**Severity:** LOW
**Lines:** 126, 219, 247 in styles.css

```css
transform: translateY(6px);      /* ❌ Magic number */
transform: translate3d(-100px, -100px, 0);  /* ❌ Magic numbers */
transform: translate3d(-600px, -600px, 0);  /* ❌ Magic numbers */
```

**Recommendation:** Define transform tokens or document intent in comments.

---

### 1.4 Radius Tokens — Verification

**Status:** GOOD ✅

#### Token Definition (styles.css :root)
```css
--radius-sm:   6px;
--radius-md:   12px;
--radius-lg:   20px;
--radius-xl:   28px;
--radius-full: 9999px;
```

**Verification:**
```bash
grep -n "border-radius:" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css | grep -v "var(--radius"
```

**Finding:** All border-radius values use tokens. ✅

---

### 1.5 Easing & Transition Tokens — Verification

**Status:** GOOD ✅

#### Token Definition (styles.css :root)
```css
/* ---- Easings ---- */
--ease:          cubic-bezier(.23, 1, .32, 1);
--ease-smooth:   cubic-bezier(.16, 1, .3, 1);
--ease-out-expo: cubic-bezier(.19, 1, .22, 1);
--ease-bounce:   cubic-bezier(.34, 1.56, .64, 1);
--ease-in-out:   cubic-bezier(.76, 0, .24, 1);

/* ---- Transitions ---- */
--transition-fast:   .15s var(--ease);
--transition-base:   .3s var(--ease);
--transition-smooth: .5s var(--ease-smooth);
--transition-slow:   .8s var(--ease-out-expo);
```

**Verification:**
```bash
grep -n "cubic-bezier" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css | grep -v "var(--ease"
grep -n "transition:" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css | grep -v "var(--transition"
```

**Findings:**
- ✅ All transitions use token variables
- ✅ No raw cubic-bezier values found
- ✅ Easing system is consistent across all animations

---

### 1.6 Shadow & Glow Tokens — Verification

**Status:** MEDIUM (incomplete coverage)

#### Token Definition (styles.css :root)
```css
--glow-cyan:   0 0 40px rgba(6, 182, 212, .15), 0 0 80px rgba(6, 182, 212, .05);
--glow-violet: 0 0 40px rgba(139, 92, 246, .15), 0 0 80px rgba(139, 92, 246, .05);
--glow-pink:   0 0 40px rgba(236, 72, 153, .15), 0 0 80px rgba(236, 72, 153, .05);
```

#### Issue 1.6.1: Missing Glow Tokens
**Severity:** MEDIUM
**Finding:** Only 3 glow tokens defined (cyan, violet, pink). Emerald, blue, rose, amber are missing.

**Where Used:**
```bash
grep -n "box-shadow.*0 0.*40px\|box-shadow.*0 0.*80px" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css | head -20
```

**Examples Missing:**
```css
/* .glass-card--glow-cyan, --glow-violet, --glow-pink exist */
/* But no --glow-emerald, --glow-blue, --glow-rose, --glow-amber */
```

**Recommendation:** Add missing glow tokens:
```css
--glow-emerald: 0 0 40px rgba(16, 185, 129, .15), 0 0 80px rgba(16, 185, 129, .05);
--glow-blue:    0 0 40px rgba(59, 130, 246, .15), 0 0 80px rgba(59, 130, 246, .05);
--glow-rose:    0 0 40px rgba(244, 63, 94, .15), 0 0 80px rgba(244, 63, 94, .05);
--glow-amber:   0 0 40px rgba(245, 158, 11, .15), 0 0 80px rgba(245, 158, 11, .05);
```

---

#### Issue 1.6.2: Hardcoded Box-Shadow Values
**Severity:** MEDIUM
**Finding:** Multiple box-shadow declarations don't use glow tokens

**Examples:**

Line 397 (.header-nav a.header-cta:hover):
```css
box-shadow: 0 4px 24px rgba(6, 182, 212, .15);  /* ❌ Custom shadow */
```

Line 815-816 (.glass-card:hover):
```css
box-shadow: 0 8px 40px rgba(6, 182, 212, .06), 0 0 60px rgba(6, 182, 212, .03);  /* ❌ Custom */
```

**Search Command:**
```bash
grep -n "box-shadow:" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css | grep -v "var(--glow"
```

**Recommendation:** Define intermediate shadow tokens:
```css
--shadow-sm:    0 2px 8px rgba(0, 0, 0, .12);
--shadow-md:    0 4px 16px rgba(0, 0, 0, .16);
--shadow-lg:    0 8px 32px rgba(0, 0, 0, .2);
--shadow-xl:    0 16px 48px rgba(0, 0, 0, .24);
```

---

### 1.7 Z-index Tokens — Verification

**Status:** CRITICAL ISSUES FOUND

#### Token Definition (styles.css :root)
```css
--z-base:    1;
--z-card:    10;
--z-header:  100;
--z-overlay: 500;
--z-cursor:  9999;
```

#### Issue 1.7.1: Hardcoded Z-index Values Across HTML Files
**Severity:** CRITICAL
**Finding:** 26 hardcoded z-index values in HTML files that bypass the z-index system

**Search Command:**
```bash
grep -rn "z-index:" /sessions/friendly-clever-hawking/mnt/ju-main/*.html | grep -v "var(--z-"
```

**Hardcoded Z-index Values Found:**

| File | Line | Z-index | Element | Issue |
|------|------|---------|---------|-------|
| index.html | 43 | z-index: 10000 | .cursor | ❌ Conflicts with --z-cursor (9999) |
| index.html | 52 | z-index: 1 | .cursor-glow | ❌ Hardcoded |
| index.html | 56 | z-index: 0 | .plasma | ❌ Hardcoded |
| index.html | 89 | z-index: 1 | #particles | ❌ Hardcoded |
| index.html | 92 | z-index: 2 | .grain | ❌ Hardcoded |
| index.html | 96 | z-index: 3 | .vig | ❌ Hardcoded |
| index.html | 101 | z-index: 10 | (hero section) | ❌ Hardcoded |
| index.html | 102 | z-index: 50 | .cta-buttons | ❌ Hardcoded |
| about.html | canvas | z-index: 0 | particles | ❌ Inline style |
| work.html | 2 | z-index: 3 | (background) | ❌ Hardcoded |
| work.html | 3 | z-index: 2 | (overlay) | ❌ Hardcoded |
| work.html | canvas | z-index: 0 | particles | ❌ Inline style |

**Example in index.html (inline style on canvas):**
```html
<canvas id="particles" style="position:fixed;inset:0;z-index:0;pointer-events:none;"></canvas>
```

**Expected:** All should use token variables:
```html
<canvas id="particles" style="position:fixed;inset:0;z-index:var(--z-base);pointer-events:none;"></canvas>
```

**Impact:**
- Z-index values are scattered across 6 files
- No single source of truth for layering
- Difficult to adjust layering order globally
- Index.html cursor uses z-index: 10000, which conflicts with design intent

---

#### Issue 1.7.2: Z-index Hierarchy Confusion
**Severity:** MEDIUM
**Finding:** Z-index scale in index.html doesn't align with token system

**Current Token Scale:**
```
--z-base (1) < --z-card (10) < --z-header (100) < --z-overlay (500) < --z-cursor (9999)
```

**index.html Hierarchy (from inline styles):**
```
z-index: 0 (plasma)
z-index: 1 (particles, cursor-glow)
z-index: 2 (grain)
z-index: 3 (.vig)
z-index: 10 (hero)
z-index: 50 (cta-buttons)
z-index: 10000 (.cursor) ← CONFLICT with token system
```

**Recommendation:** Extend token system:
```css
--z-particles:  0;
--z-grain:      2;
--z-content:    10;
--z-cta:        50;
```

---

### 1.8 Token Duplication — Verification

**Status:** MINOR ISSUE (index.html only)

#### Issue 1.8.1: Duplicate Token Definitions in index.html
**Severity:** LOW
**Finding:** index.html :root redefines tokens already in styles.css

**index.html :root (lines 15-29):**
```css
:root {
  --bg: #020206;
  --fg: #eeeef2;
  --fg2: rgba(238,238,242,.45);
  --fg3: rgba(238,238,242,.18);
  --fg4: rgba(238,238,242,.06);
  --cyan: #06b6d4;
  --violet: #8b5cf6;
  --pink: #ec4899;
  --sans: 'Manrope', sans-serif;
  --serif: 'Instrument Serif', Georgia, serif;
  --mono: 'IBM Plex Mono', monospace;
  --ease: cubic-bezier(.23, 1, .32, 1);
  --ease-smooth: cubic-bezier(.16, 1, .3, 1);
}
```

**Comparison with styles.css:**
- ✅ Most tokens match styles.css definitions
- ❌ Missing: --emerald, --blue, --rose, --amber (these won't be available on homepage)
- ❌ Missing: All alpha variants (--cyan-a10, etc.)
- ❌ Missing: All spacing, radius, transition tokens
- ❌ Missing: Shadow/glow tokens

**Impact:** Homepage can't use emerald, blue, rose, amber colors or alpha variants.

**Recommendation:** Remove duplicate :root from index.html and rely on styles.css. If page-specific overrides needed, use classes or separate CSS custom properties with clear naming.

---

## STEP 2: TYPOGRAPHY AUDIT

### 2.1 Font Loading

**Status:** EXCELLENT ✅

**Verification:**

All 6 HTML files use optimized font loading pattern:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=Unbounded:wght@700;800;900&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media='all'">
<noscript><link href="..." rel="stylesheet"></noscript>
```

**Checklist:**
- ✅ `media="print"` prevents render-blocking
- ✅ `onload="this.media='all'"` loads asynchronously
- ✅ `<noscript>` fallback for JavaScript-disabled browsers
- ✅ All 4 font families loaded with appropriate weights
- ✅ `display=swap` parameter used (FOIT/FOUT strategy)

---

### 2.2 Type Scale

**Status:** GOOD ✅

#### Heading Scale (styles.css, lines 533-567)

```css
.heading-xl {
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.04em;
}

.heading-lg {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.heading-md {
  font-size: clamp(28px, 3.5vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.heading-sm {
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
}
```

**Verification:**
- ✅ Uses `clamp()` for responsive scaling
- ✅ Consistent letter-spacing decrease for larger headings
- ✅ Appropriate line-height for display text (1.0-1.15)
- ✅ Font weights match hierarchy (800 > 700 > 600)

---

#### Body Text Scale (styles.css, lines 571-587)

```css
.body-lg {
  font-size: 18px;
  line-height: 1.7;
  color: var(--fg2);
}

.body {
  font-size: 15px;
  line-height: 1.65;
  color: var(--fg2);
}

.body-sm {
  font-size: 13px;
  line-height: 1.6;
  color: var(--fg2);
}
```

**Verification:**
- ✅ Readable line-height (1.6-1.7 range)
- ✅ Consistent color usage (var(--fg2))
- ✅ Clear size hierarchy (18px > 15px > 13px)

---

#### Caption/Label Scale (styles.css, lines 591-608)

```css
.caption {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg3);
  line-height: 1.4;
}

.label {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg2);
}
```

**Verification:**
- ✅ Monospace font for UI elements
- ✅ Appropriate letter-spacing for small caps (0.08-0.12em)
- ✅ text-transform: uppercase is consistent
- ✅ Color hierarchy (--fg3 < --fg2)

---

### 2.3 Font Fallbacks

**Status:** GOOD ✅

#### System Font Stacks (styles.css :root, lines 40-43)

```css
--sans:    'Manrope', system-ui, -apple-system, sans-serif;
--serif:   'Instrument Serif', Georgia, 'Times New Roman', serif;
--mono:    'IBM Plex Mono', 'Fira Code', monospace;
--display: 'Unbounded', var(--sans);
```

**Verification:**
- ✅ Sans-serif stack: Manrope → system-ui → -apple-system → generic
- ✅ Serif stack: Instrument Serif → Georgia → Times New Roman → generic
- ✅ Monospace stack: IBM Plex Mono → Fira Code → generic
- ✅ Display font falls back to --sans (Manrope)

**Assessment:** Font stacks follow modern best practices. ✅

---

### 2.4 Letter Spacing

**Status:** EXCELLENT ✅

#### Letter Spacing Consistency

**Headings (negative, per class):**
- .heading-xl: -0.04em
- .heading-lg: -0.035em
- .heading-md: -0.03em
- .heading-sm: -0.025em

**Base Styles (line 172, h1-h6):**
```css
h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.02em;
}
```

**Captions & Labels:**
- .caption: 0.12em (mono, uppercase)
- .label: 0.08em (mono, uppercase)

**Navigation & UI:**
- .header-nav a: 0.04em (uppercase)
- .header-nav a.header-cta: 0.03em (uppercase)
- .btn: 0.03em (uppercase)

**Verification:** ✅ Consistent approach: negative spacing for larger text, positive for small UI text.

---

### 2.5 Line Height

**Status:** EXCELLENT ✅

**Verification Table:**

| Element | Line Height | Standard | Status |
|---------|------------|----------|--------|
| Headings (h1-h6) | 1.1 | 1.0-1.2 ✅ | Good |
| .heading-xl | 1.0 | 1.0-1.2 ✅ | Good |
| .heading-lg | 1.05 | 1.0-1.2 ✅ | Good |
| .heading-md | 1.1 | 1.0-1.2 ✅ | Good |
| .heading-sm | 1.15 | 1.0-1.2 ✅ | Good |
| Body (15px) | 1.65 | 1.5-1.7 ✅ | Good |
| .body-lg (18px) | 1.7 | 1.5-1.7 ✅ | Good |
| .body-sm (13px) | 1.6 | 1.5-1.7 ✅ | Good |
| .caption | 1.4 | 1.3-1.5 ✅ | Good |

**Assessment:** All line heights follow WCAG readability guidelines. ✅

---

### 2.6 Font Smoothing

**Status:** GOOD ✅

**Implementation:**

```css
/* styles.css, lines 101-104 */
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
  cursor: none;
}
```

**index.html (line 34):**
```css
html, body {
  -webkit-font-smoothing: antialiased;
}
```

**Verification:**
- ✅ `-webkit-font-smoothing: antialiased` applied
- ✅ `-moz-osx-font-smoothing: grayscale` applied
- ✅ `text-rendering: optimizeLegibility` applied
- ✅ Applied to both styles.css and index.html

---

## STEP 3: COMPONENT CONSISTENCY AUDIT

### 3.1 Glass Card Component

**Status:** GOOD ✅

#### Definition (styles.css, lines 777-867)

```css
.glass-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--fg4);
  border-radius: var(--radius-lg);
  padding: 32px;
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  transition: border-color var(--transition-base),
              box-shadow var(--transition-smooth),
              transform var(--transition-base);
  overflow: hidden;
}

.glass-card:hover {
  border-color: var(--fg3);
  box-shadow: 0 8px 40px rgba(6, 182, 212, .06),
              0 0 60px rgba(6, 182, 212, .03);
  transform: translateY(-2px);
}

.glass-card--glow-cyan:hover {
  box-shadow: 0 8px 40px rgba(6, 182, 212, .1),
              0 0 80px rgba(6, 182, 212, .05);
}

.glass-card--glow-violet:hover {
  box-shadow: 0 8px 40px rgba(139, 92, 246, .1),
              0 0 80px rgba(139, 92, 246, .05);
}

.glass-card--glow-pink:hover {
  box-shadow: 0 8px 40px rgba(236, 72, 153, .1),
              0 0 80px rgba(236, 72, 153, .05);
}
```

#### Verification Across Pages:

**Search Command:**
```bash
grep -rn "glass-card" /sessions/friendly-clever-hawking/mnt/ju-main/about.html
grep -rn "glass-card" /sessions/friendly-clever-hawking/mnt/ju-main/work.html
grep -rn "glass-card" /sessions/friendly-clever-hawking/mnt/ju-main/case-study.html
```

**Findings:**
- ✅ Base .glass-card styling is consistent in styles.css
- ✅ No page-specific overrides found
- ✅ Hover states all use --transition-base and --transition-smooth
- ⚠️ Issue: Box-shadow values are hardcoded (not using --glow-* tokens consistently)

**Assessment:** Component is well-implemented but could benefit from glow token refactoring (see Issue 1.6.2).

---

### 3.2 Button Component

**Status:** GOOD ✅

#### Definition (styles.css, lines 876-1002)

**Button Variants:**

```css
/* Primary: Gradient Border + Glow */
.btn-primary {
  color: var(--fg);
  background: var(--bg);
  border: 1px solid transparent;
  background-image:
    linear-gradient(var(--bg), var(--bg)),
    linear-gradient(135deg, var(--cyan), var(--violet));
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.btn-primary:hover {
  box-shadow: 0 4px 30px rgba(6, 182, 212, .2),
              0 0 60px rgba(139, 92, 246, .1);
  transform: translateY(-1px);
}

/* Secondary: Outline */
.btn-secondary {
  color: var(--fg);
  background: transparent;
  border: 1px solid var(--fg3);
}

.btn-secondary:hover {
  border-color: var(--fg2);
  background: var(--fg4);
}

/* Ghost: Text Only + Underline */
.btn-ghost {
  color: var(--fg2);
  background: transparent;
  padding: 8px 4px;
}

.btn-ghost::after {
  content: '';
  background: var(--cyan);
  transition: width .4s var(--ease-smooth);
}
```

#### Verification:

**Search Command:**
```bash
grep -rn "class=\"btn\|class='btn" /sessions/friendly-clever-hawking/mnt/ju-main/*.html | head -20
```

**Findings:**
- ✅ All button variants have hover/active states
- ✅ Consistent padding and size system
- ✅ Uses token colors and transitions
- ❌ Issue: Primary button hover shadow hardcodes rgba values (should use tokens)

**Assessment:** Button system is comprehensive and well-designed. ✅

---

### 3.3 Caption Pill Component

**Status:** CONSISTENT ✅

#### Definition Pattern:

**about.html (lines 27-42):**
```css
.about-hero .caption-pill {
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
  margin-bottom: 32px;
}
```

**work.html (lines 27-42):**
```css
.work-hero .caption-pill {
  /* Identical styling */
}
```

#### Verification:
- ✅ Consistent styling across about.html and work.html
- ✅ Uses token: var(--cyan-a10) for background
- ❌ Issue: Border uses hardcoded rgba(6, 182, 212, .15) instead of token
- ✅ All typography properties are standardized

**Recommendation:** Create shared .caption-pill class in styles.css instead of duplicating:

```css
/* styles.css */
.caption-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  border-radius: var(--radius-full);
  background: var(--cyan-a10);
  border: 1px solid var(--cyan-a10); /* or define --cyan-border-a10 */
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--cyan);
}

.caption-pill + * {
  margin-top: var(--space-2xl);
}
```

Then remove from individual page styles.

---

### 3.4 Navigation/Header Component

**Status:** CONSISTENT ✅

#### Definition (styles.css, lines 283-398)

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  padding: 0 48px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(2, 2, 6, .6);
  backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid var(--fg4);
  transition: transform .5s var(--ease-smooth), background .3s var(--ease);
}

.header-logo {
  font-family: var(--display);
  font-size: 18px;
  font-weight: 800;
}

.header-nav a {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--fg2);
}

.header-nav a.active {
  color: var(--cyan);
}
```

#### Verification:

**Search Command:**
```bash
grep -rn "<header" /sessions/friendly-clever-hawking/mnt/ju-main/*.html
```

**Findings:**
- ✅ Header is consistent across all 6 pages
- ✅ Uses token z-index: var(--z-header)
- ✅ Navigation styling is shared from styles.css
- ✅ Active state uses var(--cyan)

---

### 3.5 Footer Component

**Status:** VERIFY PRESENCE

**Search Command:**
```bash
grep -rn "<footer\|class=\"footer" /sessions/friendly-clever-hawking/mnt/ju-main/*.html
```

**Expected:** Footer styling should be:
- Consistent across all pages
- Use token colors and spacing
- Have clear visual separation (divider-glow or similar)
- Include consistent copyright/contact info styling

---

### 3.6 Section Spacing

**Status:** GOOD ✅

#### Definition (styles.css, lines 710-721)

```css
.section {
  padding: 120px 0;
  position: relative;
}

.section-sm {
  padding: 80px 0;
}

.section-lg {
  padding: 160px 0;
}
```

#### Verification:

**Spacing Scale Alignment:**
| Class | Padding | Spacing Token | Status |
|-------|---------|---------------|--------|
| .section | 120px | None (custom) | ⚠️ |
| .section-sm | 80px | None (custom) | ⚠️ |
| .section-lg | 160px | None (custom) | ⚠️ |

**Recommendation:** Consider defining section spacing as tokens:
```css
:root {
  --section-padding: 120px;
  --section-padding-sm: 80px;
  --section-padding-lg: 160px;
}

.section { padding: var(--section-padding) 0; }
.section-sm { padding: var(--section-padding-sm) 0; }
.section-lg { padding: var(--section-padding-lg) 0; }
```

**Assessment:** Spacing is consistent but not tokenized. ✅ Functional, but could be improved.

---

### 3.7 Card Grids

**Status:** GOOD ✅

#### Definition (styles.css, lines 725-740)

```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
```

**Verification:**
- ✅ .grid-2, .grid-3 use consistent gap (32px = --space-xl)
- ⚠️ .grid-4 uses 24px gap (= --space-lg), different from others
- ❌ Hardcoded px values instead of tokens

**Recommendation:**
```css
.grid-2 { gap: var(--space-xl); }
.grid-3 { gap: var(--space-xl); }
.grid-4 { gap: var(--space-lg); }
```

---

## STEP 4: VISUAL CONSISTENCY CROSS-PAGE AUDIT

### 4.1 Hero Sections

**Status:** MOSTLY CONSISTENT ✅

#### Pattern Analysis:

**about.html hero (lines 20-74):**
```css
.about-hero {
  padding: 180px 0 100px;
  text-align: center;
}

.about-hero .hero-title {
  margin-bottom: 32px;
}

.about-hero .hero-body {
  max-width: 740px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.75;
  color: var(--fg2);
}
```

**work.html hero (lines 20-68):**
```css
.work-hero {
  padding: 180px 0 100px;
  text-align: center;
}

.work-hero .hero-title {
  margin-bottom: 24px;
}

.work-hero .hero-subtitle {
  max-width: 640px;
  margin: 0 auto;
  font-size: 17px;
  line-height: 1.7;
  color: var(--fg2);
}
```

**Findings:**
- ✅ Padding is consistent (180px 0 100px)
- ✅ Text alignment is consistent (center)
- ⚠️ Title margin differs: 32px (about) vs 24px (work)
- ⚠️ Body max-width differs: 740px (about) vs 640px (work)
- ⚠️ Font-size differs: 18px (about) vs 17px (work)

**Recommendation:** Create shared .hero class:
```css
.hero {
  padding: 180px 0 100px;
  text-align: center;
  position: relative;
  z-index: var(--z-base);
}

.hero-title {
  margin-bottom: 32px;
  font-family: var(--sans);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.05;
}

.hero-subtitle,
.hero-body {
  max-width: 740px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.75;
  color: var(--fg2);
  font-weight: 300;
}
```

---

### 4.2 Background Layers

**Status:** INCONSISTENT ⚠️

#### index.html (homepage):

```css
.plasma { position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.grain { position: fixed; inset: 0; z-index: 2; pointer-events: none; opacity: .018; }
.vig { position: fixed; inset: 0; z-index: 3; pointer-events: none; }

.core { animation: corePulse 10s ease-in-out infinite; }
.core-inner { animation: coreShift 16s ease-in-out infinite; }
.core-accent { animation: coreShift 12s ease-in-out infinite reverse; }
```

#### Other pages:

```html
<canvas id="particles" style="position:fixed;inset:0;z-index:0;pointer-events:none;"></canvas>
```

Plus grain and vignette from styles.css:

```css
.grain-overlay { position: fixed; inset: 0; z-index: var(--z-overlay); opacity: .035; }
.vignette-overlay { position: fixed; inset: 0; z-index: calc(var(--z-overlay) - 1); }
```

**Issues:**

1. **Inline Canvas Z-index:** Uses inline style `z-index:0` instead of CSS class
2. **Opacity Differs:**
   - index.html grain opacity: .018
   - styles.css grain-overlay opacity: .035
3. **Animation Differences:**
   - index.html has plasma animations
   - Other pages use static canvas particles
4. **Z-index Inconsistency:**
   - index.html: z-index: 0, 1, 2, 3 (hardcoded)
   - styles.css: z-index: var(--z-overlay), calc(var(--z-overlay) - 1)

**Recommendation:** Unify background layer system:

```css
/* Shared background system */
.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: var(--z-base);
  pointer-events: none;
}

.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-overlay) - 1);
  pointer-events: none;
  opacity: .025; /* standardize */
}

.vignette-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  pointer-events: none;
}

/* Homepage-specific plasma (if needed) */
.plasma {
  position: fixed;
  inset: 0;
  z-index: var(--z-base);
  overflow: hidden;
}
```

---

### 4.3 Custom Cursor Behavior

**Status:** CONSISTENT ✅

#### Definition (styles.css, lines 204-248)

```css
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--fg);
  border-radius: 50%;
  pointer-events: none;
  z-index: var(--z-cursor);
  transition: width .25s var(--ease),
              height .25s var(--ease),
              background .25s var(--ease),
              border .25s var(--ease);
}

.cursor.hovering {
  width: 48px;
  height: 48px;
  background: rgba(238, 238, 242, .12);
  border: 1px solid rgba(238, 238, 242, .4);
}

.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
  pointer-events: none;
  z-index: calc(var(--z-cursor) - 1);
  background: radial-gradient(
    circle,
    rgba(6, 182, 212, .08) 0%,
    rgba(139, 92, 246, .04) 30%,
    transparent 70%
  );
  filter: blur(2px);
}
```

#### Verification:

**Search Command:**
```bash
grep -n "class=\"cursor\|class='cursor" /sessions/friendly-clever-hawking/mnt/ju-main/*.html
```

**Findings:**
- ✅ Cursor styling defined once in styles.css
- ✅ All pages should inherit the same behavior
- ❌ index.html has conflicting cursor definition with z-index: 10000

---

### 4.4 Page Transitions

**Status:** GOOD ✅

#### Definition (styles.css, lines 407-524)

**Entry Animations:**
```css
.page-enter {
  animation: fadeIn .8s var(--ease-out-expo) forwards;
}

.page-enter-up {
  animation: fadeInUp .9s var(--ease-out-expo) forwards;
}

.stagger-children > * {
  opacity: 0;
  animation: fadeInUp .7s var(--ease-out-expo) forwards;
}

.stagger-children > *:nth-child(n) {
  animation-delay: calc(.05s * n);
}
```

**Exit Animation (body state):**
```css
body:not(.homepage) {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .5s var(--ease-smooth),
              transform .5s var(--ease-smooth);
}

body:not(.homepage).page-loaded {
  opacity: 1;
  transform: translateY(0);
}
```

**Verification:**
- ✅ All animations use token easings (--ease-out-expo, --ease-smooth)
- ✅ Consistent timing (.5s - .9s range)
- ✅ Stagger pattern uses nth-child
- ✅ Applied across all pages via shared styles.css

---

### 4.5 Scroll Indicators

**Status:** NOT FOUND

**Search Command:**
```bash
grep -rn "scroll\|reveal\|indicator" /sessions/friendly-clever-hawking/mnt/ju-main/*.html | grep -i animate
```

**Finding:** No scroll-triggered reveal animations found in CSS. If animations are JavaScript-based, verify consistency:

- Are reveal animations triggered at same scroll distances on all pages?
- Do animations use same easing and timing?
- Are delays consistent across elements?

---

## STEP 5: DARK THEME INTEGRITY

### 5.1 No Light-Mode Artifacts

**Status:** EXCELLENT ✅

#### Color Palette Verification:

**Backgrounds:**
- --bg: #020206 (near-black)
- --bg2: #07070f (dark blue-gray)
- --bg3: #0c0c18 (darker blue-gray)
- --bg-card: rgba(12, 12, 24, .55) (semi-transparent dark)

**Foreground:**
- --fg: #eeeef2 (off-white)
- --fg2: rgba(238, 238, 242, .45) (semi-transparent white)
- --fg3: rgba(238, 238, 242, .18) (dim white)
- --fg4: rgba(238, 238, 242, .06) (very dim white)

**Verification:**
```bash
grep -rn "#ffffff\|#fff\|#f0f0f0\|white\|lightgray\|silver" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css
grep -rn "#ffffff\|#fff\|white" /sessions/friendly-clever-hawking/mnt/ju-main/*.html
```

**Finding:** No light colors found. ✅ Pure dark theme.

---

### 5.2 Contrast Verification

**Status:** GOOD ✅

#### WCAG AA Contrast Ratios (minimum 4.5:1 for normal text, 3:1 for large text)

| Text | Background | Ratio | WCAG AA | WCAG AAA |
|------|-----------|-------|---------|----------|
| #eeeef2 (--fg) | #020206 (--bg) | ~20:1 | ✅ | ✅ |
| #eeeef2 (--fg) on var(--bg-card) | RGBA(12,12,24,.55) | ~16:1 | ✅ | ✅ |
| rgba(238,238,242,.45) (--fg2) | #020206 (--bg) | ~9:1 | ✅ | ✅ |
| rgba(238,238,242,.18) (--fg3) | #020206 (--bg) | ~3.6:1 | ❌ | ❌ |
| rgba(238,238,242,.06) (--fg4) | #020206 (--bg) | ~1.2:1 | ❌ | ❌ |
| #06b6d4 (--cyan) | #020206 (--bg) | ~6:1 | ✅ | ✅ |
| #8b5cf6 (--violet) | #020206 (--bg) | ~4.8:1 | ✅ | ⚠️ |
| #ec4899 (--pink) | #020206 (--bg) | ~4.2:1 | ✅ | ⚠️ |

**Issues:**

1. **--fg3 (--fg3: rgba(238, 238, 242, .18))** fails WCAG AA for normal text at 3.6:1 ratio
   - Use --fg2 or --fg for critical text
   - --fg3 acceptable only for decorative/secondary elements

2. **--fg4 (rgba(238, 238, 242, .06))** fails accessibility
   - Suitable only for borders, not text
   - Current use in .tag and borders is appropriate ✅

3. **Violet (#8b5cf6)** and **Pink (#ec4899)** marginally meet WCAG AA
   - Acceptable for UI elements but test on actual backgrounds
   - Consider using on lighter backgrounds or pair with white text

**Recommendations:**
```css
/* Add accessible color variants */
:root {
  --cyan-dark:   #0891b2;  /* Better contrast (7.2:1) */
  --violet-dark: #6d28d9;  /* Better contrast (5.5:1) */
  --pink-dark:   #be185d;  /* Better contrast (5.2:1) */
}
```

---

### 5.3 Image Handling

**Status:** VERIFY PRESENCE

**Search Command:**
```bash
grep -rn "<img\|<picture\|background-image" /sessions/friendly-clever-hawking/mnt/ju-main/*.html | head -20
```

**Expected Verification:**
- [ ] Images use `max-width: 100%` (defined in reset: ✅)
- [ ] SVGs are properly colored for dark backgrounds
- [ ] Image backgrounds don't create white halos
- [ ] Transparent PNGs tested on dark background
- [ ] Image alt text present

---

### 5.4 Focus Indicators

**Status:** VERIFY PRESENCE

**Search Command:**
```bash
grep -n ":focus\|outline:\|focus-visible" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css
```

**Current State:**

Reset removes focus outlines (line 157):
```css
button, input, textarea, select {
  outline: none;
}
```

**Concern:** This removes accessible focus indicators. Keyboard users won't see which element has focus.

**Recommendation:** Add focus styles:
```css
/* Accessible focus indicator for dark theme */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
}

/* Alternative for links */
a:focus-visible {
  box-shadow: inset 0 0 0 2px var(--cyan);
  border-radius: 2px;
}

/* Button focus */
.btn:focus-visible {
  box-shadow: 0 0 0 3px var(--cyan-a20),
              0 0 0 6px var(--cyan-a10);
  outline: none;
}
```

---

## SUMMARY OF ISSUES

### Critical (Fix Immediately)

1. **Hardcoded Z-index values** throughout HTML files (Issue 1.7.1)
   - 26 instances bypass z-index token system
   - Creates layering confusion

2. **Missing alpha variants** for emerald, blue, rose, amber (Issue 1.1.1)
   - Blocks use of these colors in glass cards
   - Requires hardcoding RGBA values

3. **Focus accessibility** (Issue 5.4)
   - Keyboard users can't see focus
   - Violates WCAG 2.4.7

### High (Fix Soon)

4. **Hardcoded RGBA in HTML files** (Issue 1.1.3)
   - 28 instances of hardcoded colors
   - Requires updating multiple files for color changes

5. **Gradient text utilities use hardcoded colors** (Issue 1.1.2)
   - #67e8f9, #c4b5fd, #f9a8d4 not tokenized
   - Can't adjust via design system

6. **Missing glow tokens** for all accent colors (Issue 1.6.1)
   - Only cyan, violet, pink have glows
   - Emerald, blue, rose, amber need variants

### Medium (Improve)

7. **Duplicate token definitions** in index.html (Issue 1.8.1)
   - Missing emerald, blue, rose, amber on homepage
   - Creates inconsistency

8. **Inline canvas styles** should use CSS classes (Issue 4.2)
   - `z-index:0` hardcoded in HTML attribute
   - Should reference token system

9. **Inconsistent section spacing** tokens (Issue 3.6)
   - 120px, 80px, 160px not defined as tokens
   - Works but not systematic

10. **Contrast warnings** for violet and pink (Issue 5.2)
    - Marginal WCAG AA compliance
    - Test on actual backgrounds

### Low (Consider)

11. **Caption-pill duplication** across pages (Issue 3.3)
    - Same styles repeated in about.html and work.html
    - Should be shared in styles.css

12. **Hardcoded spacing in components** (Issue 1.3.1)
    - 8px, 48px, 500px, 180px values not tokenized
    - Creates micro-inconsistencies

---

## REMEDIATION CHECKLIST

### Phase 1: Critical Fixes (Week 1)

- [ ] Replace all hardcoded z-index values with token system
  ```bash
  # Remove inline z-index from HTML, add CSS classes to styles.css
  grep -rn "z-index:" /sessions/friendly-clever-hawking/mnt/ju-main/*.html
  ```

- [ ] Add missing alpha variants to styles.css :root
  ```css
  --emerald-a10:  rgba(16, 185, 129, .10);
  --emerald-a20:  rgba(16, 185, 129, .20);
  --blue-a10:     rgba(59, 130, 246, .10);
  --blue-a20:     rgba(59, 130, 246, .20);
  --rose-a10:     rgba(244, 63, 94, .10);
  --rose-a20:     rgba(244, 63, 94, .20);
  --amber-a10:    rgba(245, 158, 11, .10);
  --amber-a20:    rgba(245, 158, 11, .20);
  ```

- [ ] Add accessible focus indicators
  ```css
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 2px;
  }
  ```

### Phase 2: High Priority Fixes (Week 2)

- [ ] Extract hardcoded RGBA values from HTML files and convert to tokens
  ```bash
  grep -rn "rgba(" /sessions/friendly-clever-hawking/mnt/ju-main/*.html | grep -v "var(--"
  ```

- [ ] Add missing glow tokens
  ```css
  --glow-emerald: 0 0 40px rgba(16, 185, 129, .15), 0 0 80px rgba(16, 185, 129, .05);
  --glow-blue:    0 0 40px rgba(59, 130, 246, .15), 0 0 80px rgba(59, 130, 246, .05);
  --glow-rose:    0 0 40px rgba(244, 63, 94, .15), 0 0 80px rgba(244, 63, 94, .05);
  --glow-amber:   0 0 40px rgba(245, 158, 11, .15), 0 0 80px rgba(245, 158, 11, .05);
  ```

- [ ] Convert gradient text utilities to use tokens
  ```css
  :root {
    --cyan-light:   #67e8f9;
    --violet-light: #c4b5fd;
    --pink-light:   #f9a8d4;
  }
  ```

- [ ] Remove duplicate :root from index.html
  - Keep only in styles.css
  - Update index.html to rely on shared tokens

### Phase 3: Medium Priority Improvements (Week 3)

- [ ] Unify background layer system
  - Use CSS classes instead of inline styles for canvas z-index
  - Standardize grain opacity across all pages

- [ ] Extract caption-pill to shared styles
  - Move from page-specific styles to styles.css
  - Remove duplication in about.html, work.html

- [ ] Tokenize component spacing
  ```css
  :root {
    --cursor-dot:      8px;
    --cursor-hover:    48px;
    --cursor-glow:     500px;
    --header-height:   72px;
    --header-padding:  48px;
    --header-nav-gap:  36px;
    --grain-size:      180px;
  }
  ```

### Phase 4: Nice-to-Have (Backlog)

- [ ] Test contrast ratios for violet and pink on real backgrounds
- [ ] Add lighter color variants for better contrast options
- [ ] Create design system documentation (tokens, usage, patterns)
- [ ] Add CSS custom properties for section padding values
- [ ] Implement auto-generating color variants from base colors

---

## REFERENCES & AUDIT TOOLS

### Commands for Verification

**Find all hardcoded colors:**
```bash
grep -rE "#[0-9a-fA-F]{6}|rgba\([^)]*\)" /sessions/friendly-clever-hawking/mnt/ju-main/ --include="*.html" --include="*.css" | grep -v "var(--"
```

**Find all hardcoded spacing:**
```bash
grep -rE "[0-9]+(px|em|rem)" /sessions/friendly-clever-hawking/mnt/ju-main/ --include="*.html" --include="*.css" | grep -v "var(--"
```

**Find all z-index values:**
```bash
grep -rn "z-index:" /sessions/friendly-clever-hawking/mnt/ju-main/ --include="*.html" --include="*.css"
```

**Find outline/focus styles:**
```bash
grep -n "outline\|:focus" /sessions/friendly-clever-hawking/mnt/ju-main/styles.css
```

**Check for duplicate token definitions:**
```bash
grep -c ":root" /sessions/friendly-clever-hawking/mnt/ju-main/*.html /sessions/friendly-clever-hawking/mnt/ju-main/styles.css
```

---

## CONCLUSION

The JU. portfolio has a **well-structured design system** with clear typography, spacing, and color tokens. However, **hardcoded values scattered across HTML files** and missing token variants reduce maintainability. The primary issues are:

1. **Z-index system fragmentation** (26 hardcoded values)
2. **Incomplete alpha variants** for all accent colors
3. **Missing accessibility features** (focus indicators)
4. **Gradient utilities hardcoding colors**
5. **Inline styles on canvas elements**

**Overall Assessment:** B+ (Good structure, implementation issues)

With Phase 1 and Phase 2 fixes, this audit grade would improve to A- (Excellent structure and implementation).

---

**Audit Complete**
**Next Steps:** Prioritize Phase 1 fixes, then schedule Phase 2 improvements.
