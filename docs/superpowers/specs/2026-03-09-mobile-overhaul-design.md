# Mobile UI Overhaul — Design Spec

## Problem
- Homepage card images fail to load on iPhone (Microlink API + lazy loading + horizontal scroll = broken)
- Mobile layout feels cramped and unpolished
- Horizontal scroll carousel doesn't showcase work effectively

## Solution

### Homepage (Major Changes)

**Hero Section** — Refined gradient orb background:
- Keep existing plasma orb aesthetic (brand continuity with desktop)
- Optimized for mobile: lighter blur values, no canvas particles, no CSS animations
- Concentric rings at reduced opacity
- Vignette fade into content area

**Cards Section** — Replace horizontal scroll with 2-column vertical grid:
- "Featured Work" label with "View all →" link to work.html
- Cards: color-coded gradient thumbnail + category tag + project name
- Local static screenshot images (replaces Microlink API)
- Responsive grid: 2-col iPhone, 3-col iPad

**Image Strategy:**
- Static `.png` screenshots saved in `/images/` (already downloaded and optimized to ~800px)
- `loading="lazy"` + `onload` fade-in (same pattern, now reliable since cards are in vertical flow)
- Desktop continues using Microlink API (works fine there)

### Work Page (Image Fix)
- Replace Microlink API URLs with local screenshots on mobile
- No layout changes needed

### What's NOT Changing
- Desktop experience (untouched)
- About, Process, Contact pages
- Color system, typography, design tokens
- Header, footer, mobile menu

## Breakpoints
- `768px`: 2-column grid, gradient orb hero, local images
- `480px`: 2-column grid with tighter gaps
- `360px`: 2-column grid, smaller cards

## Files Modified
- `index.html` — Homepage mobile CSS overhaul + local image sources
- `work.html` — Local image sources for mobile
- `/images/` — 7 static project screenshots (already present)
