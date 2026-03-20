# GENERAL-PROMPT.md — Automatic Prompt Enhancement Engine (JU. Portfolio Edition)

> **This file is auto-executed on EVERY prompt received. Before doing ANY work, Claude must run every user message through this enhancement pipeline. No exceptions. No skipping. This is not optional.**

---

## PURPOSE

Most prompts are vague, shallow, or missing critical details. Your job is to intercept every prompt, hyper-analyze it, expand it into a detailed specification, and THEN execute the enhanced version. The user should never have to think about being descriptive — you do that for them.

**Context:** This is a premium static portfolio site (JU. — Digital Architect) built with vanilla HTML/CSS/JS. No framework, no build tools, no dependencies. Every enhancement must consider the specific constraints and strengths of this stack.

---

## MANDATORY PIPELINE — RUN ON EVERY PROMPT

**Every single message the user sends must pass through these 5 stages before you edit a single line of code or take any action:**

### STAGE 1: INTENT EXTRACTION
Ask yourself silently (do NOT output this to the user):
- What is the user actually trying to accomplish?
- What is the end goal, not just the surface request?
- Is this a visual fix, a code quality fix, a performance issue, an SEO request, or an audit trigger?
- What context clues exist in their message (file names, class names, page references)?
- What are they NOT saying that they probably mean?
- Which of the 8 files are affected (index.html, about.html, work.html, process.html, contact.html, case-study.html, styles.css, main.js)?

### STAGE 2: AMBIGUITY DETECTION
Identify every vague, unclear, or underspecified element:
- **Vague nouns:** "it", "the thing", "the page", "the component" → Identify WHICH specific page/element
- **Vague verbs:** "fix", "make it work", "clean up", "improve" → Define WHAT specifically needs to change
- **Missing scope:** Does this apply to one page, one section, or all 6 pages?
- **Missing acceptance criteria:** How will we know when it's "done"?
- **Missing edge cases:** What happens on mobile? What about prefers-reduced-motion? What about slow connections?
- **Missing context:** Which page, which section, which class name, which element?
- **Missing SEO impact:** Will this change affect search rankings, meta tags, or crawlability?
- **Missing performance impact:** Will this affect Core Web Vitals (LCP, CLS, font loading)?

### STAGE 3: PROMPT EXPANSION
Take the original prompt and expand it into a hyper-detailed internal specification. For every vague element, fill in the most likely intended meaning based on:
1. The current codebase (scan the relevant HTML/CSS/JS files)
2. The project's conventions (check CONVENTIONS.md)
3. Industry best practices for static portfolio sites
4. Common sense and professional judgment

**Expansion rules:**
- "Fix the button" → Identify which button on which page, what's wrong with it (styling? hover state? focus state? a11y?), what "fixed" looks like, what CSS/HTML needs to change
- "Add dark mode toggle" → This site is dark-only by design, so clarify if they want a light mode addition or just a different dark variant
- "Make it faster" → Run Lighthouse first, check font loading, check image optimization, check CSS/JS delivery, identify top 3 bottlenecks, define target metrics
- "It's broken" → Which page? Check all 6 pages, inspect the console, check responsive behavior, identify root cause
- "Fix the contact form" → Check contact.html for form validation, submission handling, error states, success feedback, spam protection, accessibility labels

### STAGE 4: ENHANCED SPECIFICATION OUTPUT
Before executing, output a brief enhanced version to the user in this format:

```
**Enhanced prompt:** [1-3 sentence expanded version of what you're about to do]
```

**Examples:**

User says: "fix the header"
```
**Enhanced prompt:** Auditing the shared header component across all 6 pages for: visual consistency with design tokens in styles.css, responsive behavior at all breakpoints (320px–1440px), sticky positioning and scroll behavior, z-index conflicts with cursor-glow and plasma layers, navigation link states (hover, active, current page indicator), mobile hamburger menu functionality, accessibility (landmark role, skip-to-content link, keyboard navigation), and smooth transition on page load.
```

User says: "make the contact form work"
```
**Enhanced prompt:** Building functional contact form submission in contact.html with: client-side validation (required fields, email format), Formspree/Netlify Forms/Web3Forms integration for serverless submission, loading state on submit button, success/error feedback with animated transitions matching the site's glass-card aesthetic, honeypot spam field, accessible error messages (aria-describedby), and proper form reset after successful submission.
```

User says: "the work page looks off"
```
**Enhanced prompt:** Auditing work.html for visual regressions: checking project card grid alignment, glass-card consistency with styles.css tokens, hover animations on project cards, image aspect ratios, responsive grid behavior (1→2→3 columns), spacing consistency using --space-* tokens, typography scale matching other pages, and verifying all reveal animations trigger correctly on scroll.
```

### STAGE 5: EXECUTE THE ENHANCED VERSION
Now — and only now — execute the expanded specification. Follow it as if the user had typed every detail themselves.

---

## EXPANSION TEMPLATES BY CATEGORY

### When the user says "add [feature]":
Expand to include:
- Which page(s) does it affect?
- What HTML structure is needed?
- What CSS goes in styles.css (shared) vs inline `<style>` (page-specific)?
- What JavaScript goes in main.js (shared) vs inline `<script>` (page-specific)?
- What does it look like (matching the dark premium aesthetic)?
- What are all the states (default, hover, active, focus, disabled, loading)?
- Is it responsive (320px → 1440px)?
- Is it accessible (labels, keyboard nav, screen reader, focus management)?
- Does it need prefers-reduced-motion handling?
- What's the SEO impact (does it affect meta tags or content structure)?
- Does it use existing CSS custom properties or need new ones?

### When the user says "fix [thing]":
Expand to include:
- What specifically is broken (reproduce the issue)?
- What is the root cause (CSS specificity? Missing class? JS error? Missing HTML?)?
- What does "fixed" look like (expected behavior)?
- Which file(s) are involved?
- What's the regression risk (could this fix break something on another page)?
- How do we verify the fix (check all 6 pages, check responsive, check a11y)?

### When the user says "improve/clean up/refactor [thing]":
Expand to include:
- What's currently wrong with it (specific problems)?
- What does "improved" look like (measurable criteria)?
- What's the scope (one page or shared files)?
- What patterns should the improved code follow (check CONVENTIONS.md)?
- Does the change affect other pages that share the same CSS/JS?
- What's the performance impact?

### When the user says something extremely vague:
Examples: "make it better", "it doesn't work", "help", "idk fix stuff"
- Open all 6 HTML pages and check for visual/functional issues
- Run Lighthouse on the homepage
- Check for console errors across all pages
- Look for CSS inconsistencies between pages
- Look for accessibility issues (missing alt text, contrast, focus indicators)
- Identify the lowest-hanging fruit improvements
- Present findings and ask ONE clarifying question if truly ambiguous

---

## ENHANCEMENT RULES

### DO:
- Always enhance, even if the prompt seems clear — there's always more depth to add
- Fill in edge cases the user didn't mention (mobile, reduced-motion, slow connection)
- Add error handling the user didn't ask for
- Add accessibility the user didn't think about
- Add responsive behavior the user didn't specify
- Think about all 6 pages — a change to styles.css or main.js affects everything
- Consider the premium dark aesthetic when suggesting visual changes
- Reference CONVENTIONS.md for how the enhanced code should be structured

### DO NOT:
- Ask the user 20 clarifying questions before starting — just make smart assumptions
- Output a massive specification document — keep the enhanced prompt to 1-3 sentences
- Skip enhancement because the prompt "seems detailed enough" — always add depth
- Change the user's intent — enhance it, don't redirect it
- Over-scope — if they said "fix the button," don't redesign the entire page
- Under-scope — if they said "audit the site," don't just check one page
- Suggest converting to React/Next.js/Tailwind — this is intentionally vanilla

### WHEN TO ASK vs WHEN TO ASSUME:
**Ask** (max 1 question) when:
- The request could go in 2 fundamentally different directions (e.g., "add a form" — contact form? newsletter signup?)
- The request involves adding a third-party service (e.g., "make the form work" — Formspree? Netlify Forms? custom?)
- You genuinely cannot determine intent from context

**Assume** (and just do it) when:
- The intent is clear but details are missing — fill them in with best practices
- The user is clearly frustrated ("it's broken, fix it") — don't interrogate them, just fix it
- The enhancement is additive (adding alt text, fixing contrast, improving a11y)

---

## QUALITY MULTIPLIER

The enhancement pipeline should act as a quality multiplier. A lazy prompt should produce the same quality output as a detailed prompt, because YOU fill in the gaps.

| User Effort | Without Enhancement | With Enhancement |
|-------------|-------------------|-----------------|
| "fix card" | One card's padding changes | All glass-card instances audited, hover states verified, border consistency checked, responsive behavior tested, dark theme contrast verified |
| "fix SEO" | Title tag gets updated | All 6 pages get unique title/description/OG tags, robots.txt created, sitemap.xml generated, structured data added, canonical URLs set |
| "make it fast" | One image gets lazy-loaded | Lighthouse profiled, fonts optimized, CSS delivery improved, JS deferred, images optimized, Core Web Vitals measured with before/after |
| "fix mobile" | One breakpoint adjusted | All 6 pages tested at 320/375/414/768/1024/1280/1440px, touch targets verified, font sizes checked, grid layouts validated |

---

## INTEGRATION WITH AUDIT PROMPTS

If the enhanced prompt matches an audit trigger (see CLAUDE.md trigger map), route it to the appropriate audit prompt AFTER enhancement. The enhancement adds context that makes the audit more targeted and effective.

Example: User says "the site feels slow" →
1. Enhanced to: "Performance audit focusing on Core Web Vitals (LCP, CLS), font loading strategy, CSS delivery, JavaScript execution, and image optimization. Will run Lighthouse on all 6 pages, then address top bottlenecks."
2. Routed to: `prompts/02-PERFORMANCE.md`

---

## FINAL RULE

**Every prompt gets enhanced. No exceptions. If the user types one word, you turn it into a complete specification. If the user types a paragraph, you still find gaps and fill them. The enhancement is silent, fast, and automatic. The user should feel like you read their mind.**
