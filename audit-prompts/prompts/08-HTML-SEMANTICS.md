# HTML SEMANTICS & STRUCTURE AUDIT
## JU. — Digital Architect (ju-sand.vercel.app)

**Project Type:** Static HTML Portfolio (6 pages, no framework)
**Audit Date:** February 2026
**Scope:** index.html, about.html, work.html, process.html, contact.html, case-study.html

---

## STEP 1: DOCUMENT STRUCTURE PER PAGE

Each of the 6 pages must follow W3C HTML5 standards for proper document structure.

### 1.1 DOCTYPE Declaration
**Standard:** All pages must declare `<!DOCTYPE html>` at the absolute start of the file (before any whitespace or comments).

**Good Example:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
</html>
```

**Bad Example:**
```html
<!-- Comment -->
<!DOCTYPE html>
```

**Fix if Missing:**
Ensure `<!DOCTYPE html>` is the first line of every .html file.

---

### 1.2 HTML Language Attribute
**Standard:** `<html lang="en">` declares the document language for screen readers and search engines.

**Expected:** All 6 pages should have:
```html
<html lang="en">
```

**Audit Check:**
- [ ] index.html: `<html lang="en">` present
- [ ] about.html: `<html lang="en">` present
- [ ] work.html: `<html lang="en">` present
- [ ] process.html: `<html lang="en">` present
- [ ] contact.html: `<html lang="en">` present
- [ ] case-study.html: `<html lang="en">` present

**Fix if Wrong:** Replace `<html>` with `<html lang="en">`.

---

### 1.3 Character Encoding Meta Tag
**Standard:** `<meta charset="UTF-8">` ensures text encoding is properly declared.

**Expected:** First `<meta>` tag in `<head>` (before other meta tags and stylesheets):
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ...
</head>
```

**Audit Check:**
- [ ] All 6 pages have `<meta charset="UTF-8">` as first meta tag
- [ ] No whitespace or other elements before charset meta

**Fix if Missing:**
Add `<meta charset="UTF-8">` as the first child of `<head>`.

---

### 1.4 Viewport Meta Tag
**Standard:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` enables responsive design on mobile devices.

**Expected:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Audit Check:**
- [ ] All 6 pages have viewport meta tag
- [ ] Content includes `width=device-width, initial-scale=1.0`
- [ ] No `maximum-scale=1.0` (prevents user zoom — accessibility issue)

**Bad Example (prevents zoom):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**Fix if Wrong:**
Replace with: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

### 1.5 Page Title — Unique and Descriptive
**Standard:** Each page must have a unique, descriptive `<title>` tag that describes the page content.

**Expected Title Pattern:**
- index.html: `<title>JU. Digital Architect — Product Designer & Developer</title>` (or similar, introduces site)
- about.html: `<title>About Me — JU. Digital Architect</title>`
- work.html: `<title>Portfolio & Case Studies — JU. Digital Architect</title>`
- process.html: `<title>Design Process — JU. Digital Architect</title>`
- contact.html: `<title>Get In Touch — JU. Digital Architect</title>`
- case-study.html: `<title>[Case Study Title] — JU. Digital Architect</title>`

**Audit Check:**
- [ ] index.html has unique, compelling title (home page hook)
- [ ] about.html title starts with "About"
- [ ] work.html title references portfolio/projects
- [ ] process.html title references design/process
- [ ] contact.html title references contact/touch
- [ ] case-study.html has case study title
- [ ] All titles include "JU." or portfolio name for brand consistency
- [ ] No generic titles like "Home", "Page", "Untitled"
- [ ] All titles are under 60 characters (SEO best practice)

**Good Example:**
```html
<title>About JU. — Digital Architect & Creative Technologist</title>
```

**Bad Example:**
```html
<title>About</title>
<title>Home Page</title>
<title>JU.</title>
```

**Fix if Generic:**
Rewrite each title to be page-specific and include key keywords.

---

### 1.6 Meta Description — Unique and Descriptive
**Standard:** Each page needs a unique `<meta name="description">` tag (150–160 characters) for search engine results and social previews.

**Expected Pattern:**
```html
<meta name="description" content="[Page-specific description, 150-160 chars]">
```

**Expected Descriptions (examples):**
- **index.html:** "JU. is a digital architect specializing in product design and web development. View my portfolio and case studies."
- **about.html:** "Learn about my design philosophy, background, and approach to creating elegant digital products."
- **work.html:** "Explore my portfolio of case studies and projects spanning product design, web development, and more."
- **process.html:** "Discover my design process: research, ideation, prototyping, and delivery of user-centered solutions."
- **contact.html:** "Get in touch with me for design and development inquiries. Contact me directly or connect on social media."
- **case-study.html:** "[Project name]: A case study on [problem solved/outcome]. Read about my approach and results."

**Audit Check:**
- [ ] All 6 pages have `<meta name="description">`
- [ ] Each description is unique (not copied across pages)
- [ ] Each description is 150–160 characters (use tool to verify)
- [ ] Descriptions are natural language, not keyword-stuffed
- [ ] Descriptions summarize page content accurately

**Good Example:**
```html
<meta name="description" content="Explore my design process: research, ideation, prototyping, and user testing. Learn how I solve complex design challenges.">
```

**Bad Example:**
```html
<meta name="description" content="design, portfolio, case study, designer, UI, UX, web">
```

**Fix if Missing or Generic:**
Write unique, natural-language descriptions for each page.

---

### 1.7 Open Graph Meta Tags
**Standard:** Open Graph tags enable rich previews when pages are shared on social media (Twitter, Facebook, LinkedIn, etc.).

**Expected on ALL pages:**
```html
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Page Description]">
<meta property="og:image" content="https://ju-sand.vercel.app/og-image.png">
<meta property="og:url" content="https://ju-sand.vercel.app[page-path]">
<meta property="og:type" content="website">
```

**Expected on case-study.html (optional, more detailed):**
```html
<meta property="og:type" content="article">
<meta property="article:published_time" content="[ISO 8601 date]">
<meta property="article:author" content="JU.">
```

**Audit Check:**
- [ ] All 6 pages have `og:title` (matches or similar to page `<title>`)
- [ ] All 6 pages have `og:description` (matches meta description)
- [ ] All 6 pages have `og:image` (path to portfolio preview image, ideally 1200x630px)
- [ ] All 6 pages have `og:url` (full URL including domain and path)
- [ ] All 6 pages have `og:type="website"` (or "article" for case-study)
- [ ] Image URLs are absolute (not relative)

**Good Example:**
```html
<meta property="og:title" content="About JU. — Digital Architect">
<meta property="og:description" content="Learn about my design philosophy and approach.">
<meta property="og:image" content="https://ju-sand.vercel.app/images/og-about.png">
<meta property="og:url" content="https://ju-sand.vercel.app/about.html">
<meta property="og:type" content="website">
```

**Bad Example:**
```html
<meta property="og:title" content="JU.">
<meta property="og:image" content="/images/og.png">  <!-- Relative URL -->
```

**Fix if Missing:**
Add Open Graph tags to all 6 pages. Ensure images are hosted and referenced with absolute URLs.

---

### 1.8 Favicon Links
**Standard:** Favicon links enable the site icon to appear in browser tabs and bookmarks.

**Expected:**
```html
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**Audit Check:**
- [ ] All 6 pages have favicon link
- [ ] Favicon href points to existing file
- [ ] Apple touch icon present (for iOS home screen)
- [ ] Favicon formats match actual files (e.g., .png, .ico, .svg)

**Good Example:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**Fix if Wrong:**
Ensure favicon files exist in project root or public folder, and paths are correct.

---

### 1.9 Preconnect Hints for Google Fonts
**Standard:** `<link rel="preconnect">` hints speed up font loading from Google Fonts CDN.

**Expected (if using Google Fonts):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Font1:wght@400;700&family=Font2:wght@300&display=swap" rel="stylesheet">
```

**Audit Check:**
- [ ] All 6 pages have preconnect hints (if using Google Fonts)
- [ ] Preconnect includes `https://fonts.googleapis.com`
- [ ] Preconnect includes `https://fonts.gstatic.com` with `crossorigin` attribute
- [ ] Font link follows preconnect hints
- [ ] Font link includes `display=swap` for FOUT (Font of Unstyled Text) instead of FOIT (Flash of Invisible Text)

**Fix if Missing or Wrong:**
Add preconnect links before font imports to improve performance.

---

### 1.10 Stylesheet Links (styles.css)
**Standard:** All pages must link to the shared `styles.css` file in `<head>`.

**Expected:**
```html
<link rel="stylesheet" href="/styles.css">
```

**Audit Check:**
- [ ] All 6 pages link to `/styles.css`
- [ ] Link is in `<head>` (not in `<body>`)
- [ ] href is correct and file exists
- [ ] Media attribute is omitted (unless intentional, e.g., `media="print"`)

**Good Example:**
```html
<link rel="stylesheet" href="/styles.css">
```

**Bad Example:**
```html
<link rel="stylesheet" href="styles.css">  <!-- Relative path, harder to manage -->
<link rel="stylesheet" href="/styles.css">  <!-- In body — late loading -->
```

**Fix if Wrong:**
Ensure all pages link to `/styles.css` from `<head>`.

---

### 1.11 Script Tags (main.js with defer)
**Standard:** Shared `main.js` must be loaded with `defer` attribute to avoid blocking HTML parsing.

**Expected:**
```html
<script defer src="/main.js"></script>
```

**Placement:** End of `<body>` or in `<head>` with `defer` (both work; `<head>` with `defer` is modern standard).

**Audit Check:**
- [ ] All 6 pages link to `/main.js`
- [ ] Script has `defer` attribute (or is at end of body)
- [ ] No `async` attribute (unless intentional for independent scripts)
- [ ] href path is correct

**Good Example (Modern):**
```html
<head>
  ...
  <script defer src="/main.js"></script>
</head>
```

**Bad Example:**
```html
<script src="/main.js"></script>  <!-- No defer — blocks parsing -->
<script src="main.js"></script>  <!-- Relative path -->
```

**Fix if Wrong:**
Add `defer` attribute to all `<script>` tags loading external files.

---

## STEP 2: SEMANTIC HTML ELEMENTS

Semantic HTML uses meaningful tags (`<header>`, `<nav>`, `<main>`, `<article>`, etc.) instead of generic `<div>` tags. This improves accessibility, SEO, and code maintainability.

### 2.1 Header Element
**Standard:** The page header (logo, navigation) should be wrapped in `<header>`.

**Expected Structure:**
```html
<header>
  <!-- Logo, site title, and navigation -->
  <div class="cursor"></div>  <!-- Decorative cursor element -->
  <div class="cursor-glow"></div>  <!-- Decorative glow element -->
  <nav aria-label="Main navigation">
    <a href="/">JU.</a>
    <a href="/about.html">About</a>
    <a href="/work.html">Work</a>
    <a href="/process.html">Process</a>
    <a href="/contact.html">Contact</a>
  </nav>
</header>
```

**Audit Check:**
- [ ] All 6 pages have `<header>` element
- [ ] Header wraps logo and navigation
- [ ] Header is the first major semantic element after decorative layers
- [ ] No duplicate headers on the same page

**Fix if Wrong:**
Wrap logo and navigation in `<header>` element.

---

### 2.2 Navigation Element with ARIA Label
**Standard:** Navigation should be wrapped in `<nav>` with `aria-label` to identify its purpose for screen readers.

**Expected:**
```html
<nav aria-label="Main navigation">
  <a href="/">JU.</a>
  <a href="/about.html">About</a>
  <a href="/work.html">Work</a>
  <a href="/process.html">Process</a>
  <a href="/contact.html">Contact</a>
</nav>
```

**Why `aria-label`?** When there are multiple navigation areas (e.g., header nav + footer nav), `aria-label` distinguishes them for screen readers.

**Audit Check:**
- [ ] `<nav>` element wraps all primary navigation links
- [ ] `aria-label="Main navigation"` (or similar descriptive label) is present
- [ ] If footer has secondary nav: `<nav aria-label="Footer navigation">`
- [ ] No navigation links outside `<nav>` element

**Good Example:**
```html
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about.html">About</a>
  </nav>
</header>

<footer>
  <nav aria-label="Footer navigation">
    <a href="/privacy.html">Privacy</a>
    <a href="/terms.html">Terms</a>
  </nav>
</footer>
```

**Bad Example:**
```html
<header>
  <nav>  <!-- Missing aria-label -->
    <a href="/">Home</a>
  </nav>
</header>

<div>  <!-- Navigation in generic div — semantic error -->
  <a href="/social">Social Media</a>
</div>
```

**Fix if Wrong:**
- Add `<nav>` wrapper if navigation links are in `<div>`
- Add `aria-label` to identify each nav's purpose

---

### 2.3 Main Content Element
**Standard:** The page's primary content should be wrapped in `<main>`. There should be exactly ONE `<main>` per page.

**Expected Structure:**
```html
<header>...</header>

<main>
  <!-- All page-specific content here -->
  <section>...</section>
  <section>...</section>
  <article>...</article>
</main>

<footer>...</footer>
```

**Audit Check:**
- [ ] All 6 pages have exactly ONE `<main>` element
- [ ] `<main>` contains page-specific content (not header/footer)
- [ ] `<main>` is a direct child of `<body>` (or background layers before it)

**Bad Examples:**
```html
<!-- Multiple main elements — semantic error -->
<main>...</main>
<main>...</main>

<!-- Nested main elements — semantic error -->
<main>
  <main>...</main>
</main>

<!-- Main wraps multiple major sections without structure -->
<main>
  <h1>Home</h1>
  <p>Welcome</p>
  <h1>Projects</h1>
  <p>Here are my projects</p>
  <!-- Should use <section> to separate these -->
</main>
```

**Fix if Wrong:**
- Ensure exactly one `<main>` per page
- Move header/footer outside `<main>`
- Use `<section>` or `<article>` to structure content within `<main>`

---

### 2.4 Footer Element
**Standard:** The page footer (copyright, secondary navigation, contact info) should be wrapped in `<footer>`.

**Expected Structure:**
```html
<footer>
  <nav aria-label="Footer navigation">
    <a href="/privacy.html">Privacy</a>
    <a href="/terms.html">Terms</a>
  </nav>
  <p>&copy; 2025 JU. All rights reserved.</p>
  <p>Designed and developed by <a href="/">JU.</a></p>
</footer>
```

**Audit Check:**
- [ ] All 6 pages have `<footer>` element
- [ ] Footer is the last major semantic element in `<body>`
- [ ] Footer contains copyright, secondary nav, or contact info
- [ ] No duplicate footers on the same page

**Fix if Wrong:**
Wrap footer content in `<footer>` element.

---

### 2.5 Section Element with Accessible Names
**Standard:** `<section>` groups related content. Each section should have an accessible name (via heading or `aria-label`).

**Expected Pattern:**
```html
<section>
  <h2>Projects I've Worked On</h2>
  <!-- Section content -->
</section>

<section aria-label="Testimonials">
  <!-- If no heading, use aria-label -->
</section>
```

**Why Accessible Names?** Screen readers announce section names, helping users understand page structure.

**Audit Check:**
- [ ] Each `<section>` has either a heading (`<h1>`–`<h6>`) or `aria-label`
- [ ] `<section>` tags group logically related content
- [ ] Sections don't overlap (non-nested)
- [ ] No generic `<div>` wrapper masking a logical section

**Good Example (index.html):**
```html
<main>
  <section>
    <h1>Hero Section</h1>
    <p>Welcome to my portfolio</p>
  </section>

  <section>
    <h2>Featured Work</h2>
    <article>Project 1</article>
    <article>Project 2</article>
  </section>

  <section aria-label="Skills">
    <h2>Skills</h2>
    <ul>
      <li>Product Design</li>
      <li>Web Development</li>
    </ul>
  </section>
</main>
```

**Bad Examples:**
```html
<!-- Section without accessible name — accessibility error -->
<section>
  <p>Some content</p>
</section>

<!-- Generic div masking a logical section — structure error -->
<div class="projects-section">
  <h2>Projects</h2>
  <!-- Should be <section> -->
</div>

<!-- Nested sections for hierarchy — wrong use -->
<section>
  <section>
    <section>
      <!-- Use <article> or deeper <h3>/<h4> instead -->
    </section>
  </section>
</section>
```

**Fix if Wrong:**
- Wrap related content groups in `<section>` with heading or `aria-label`
- Use `<article>` for self-contained content (see 2.6)
- Avoid unnecessary nesting

---

### 2.6 Article Element for Self-Contained Content
**Standard:** `<article>` wraps self-contained, reusable content (case studies, project cards, blog posts).

**Expected Pattern (work.html or case-study.html):**
```html
<main>
  <section>
    <h1>Case Studies</h1>

    <article>
      <h2>Project Title</h2>
      <p>Overview</p>
      <figure>
        <img src="/project-image.jpg" alt="Project preview">
        <figcaption>Project screenshot</figcaption>
      </figure>
      <a href="/case-study.html">Read full case study →</a>
    </article>

    <article>
      <h2>Another Project</h2>
      <!-- Similar structure -->
    </article>
  </section>
</main>
```

**Audit Check:**
- [ ] Project cards use `<article>` (not just `<div>`)
- [ ] Each `<article>` has a heading (usually `<h2>`)
- [ ] Articles are self-contained (could be syndicated independently)
- [ ] No nested articles unless intentional (comments on articles, etc.)

**Good Examples:**
- Case studies on work.html
- Individual project cards on work.html
- Standalone case-study.html (can be `<article>` wrapping main content)

**Bad Examples:**
```html
<!-- Generic div for project card — should be <article> -->
<div class="project-card">
  <h2>Project Title</h2>
  <img src="..." alt="...">
</div>

<!-- Nested articles without clear structure -->
<article>
  <article>
    <article>
      <!-- Ambiguous hierarchy -->
    </article>
  </article>
</article>
```

**Fix if Wrong:**
Replace `<div>` with `<article>` for self-contained content like project cards and case studies.

---

### 2.7 Aside Element for Supplementary Content
**Standard:** `<aside>` wraps supplementary content (sidebars, related links, ads, asides).

**Expected (if applicable):**
```html
<main>
  <article>
    <h1>Case Study Title</h1>
    <p>Main content</p>
  </article>

  <aside>
    <h2>Related Case Studies</h2>
    <ul>
      <li><a href="/case-1.html">Case Study 1</a></li>
      <li><a href="/case-2.html">Case Study 2</a></li>
    </ul>
  </aside>
</main>
```

**Audit Check:**
- [ ] If sidebar or "related content" area exists, it uses `<aside>`
- [ ] `<aside>` contains supplementary info (not critical to main content)
- [ ] `<aside>` has accessible name (heading or `aria-label`)

**Note:** If no sidebar/supplementary content exists, `<aside>` is not required.

**Fix if Missing:**
If supplementary content exists, wrap it in `<aside>` with a heading or `aria-label`.

---

### 2.8 Checking for "Div Soup"
**Standard:** Identify and replace unnecessary `<div>` wrappers with semantic elements.

**Common "Div Soup" Patterns to Fix:**

| Current | Should Be | Reason |
|---------|-----------|--------|
| `<div class="header">` | `<header>` | Headers have semantic meaning |
| `<div class="nav">` | `<nav>` | Navigation is semantic |
| `<div class="main">` | `<main>` | Main content is semantic |
| `<div class="footer">` | `<footer>` | Footers are semantic |
| `<div class="section">` | `<section>` | Logical sections are semantic |
| `<div class="project-card">` | `<article>` | Self-contained content is semantic |
| `<div class="sidebar">` | `<aside>` | Supplementary content is semantic |

**Audit Check:**
- [ ] Search for `<div class="header">`, `<div class="nav">`, `<div class="main">`, `<div class="footer">`
- [ ] Replace these with semantic elements
- [ ] Keep layout `<div>` wrappers (e.g., `<div class="container">`, `<div class="flex-row">`)
- [ ] Use structural divs for styling only where semantic elements don't apply

**Examples of Good Div Usage (keep these):**
```html
<div class="container">  <!-- Layout wrapper — OK -->
  <main>
    <section>
      <div class="grid">  <!-- Grid layout wrapper — OK -->
        <article>...</article>
        <article>...</article>
      </div>
    </section>
  </main>
</div>
```

**Examples of Bad Div Usage (fix these):**
```html
<div class="header">  <!-- Should be <header> -->
  <div class="nav">  <!-- Should be <nav> -->
    <a href="/">Home</a>
  </div>
</div>

<div class="main-content">  <!-- Should be <main> -->
  <div class="projects-section">  <!-- Should be <section> -->
    <div class="project">  <!-- Should be <article> -->
      <h2>Project Title</h2>
    </div>
  </div>
</div>
```

**Fix if Found:**
Replace divs with semantic elements where appropriate. Keep layout-only divs.

---

### 2.9 Lists (UL/OL) for List Content
**Standard:** Use `<ul>` (unordered) or `<ol>` (ordered) for lists of items.

**Expected Patterns:**

**Unordered List (ul):**
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

**Ordered List (ol):**
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

**Description List (dl) — for term/definition pairs:**
```html
<dl>
  <dt>UI Design</dt>
  <dd>Designing user interfaces for web and mobile</dd>

  <dt>Web Development</dt>
  <dd>Building responsive, performant web applications</dd>
</dl>
```

**Expected Use Cases in Portfolio:**

| Content | Type | Example |
|---------|------|---------|
| Skills list | `<ul>` | Product Design, Web Dev, etc. |
| Process steps | `<ol>` | 1. Research, 2. Ideate, 3. Prototype |
| Navigation | `<nav>` with links | Home, About, Work, etc. |
| Qualifications | `<ul>` or `<dl>` | Certifications, degrees |

**Audit Check:**
- [ ] Skills are in `<ul>` or `<ol>`, not individual `<div>` tags
- [ ] Process steps use `<ol>` (ordered, step-by-step)
- [ ] Lists use `<li>` children
- [ ] No bare text that should be list items
- [ ] No lists styled as plain `<div class="list">`

**Good Example (process.html):**
```html
<section>
  <h2>My Design Process</h2>
  <ol>
    <li>Research & Discovery</li>
    <li>Ideation & Sketching</li>
    <li>Prototyping</li>
    <li>User Testing</li>
    <li>Iteration & Refinement</li>
  </ol>
</section>
```

**Bad Examples:**
```html
<!-- Process steps as divs — should be <ol> -->
<div class="process-step">Step 1</div>
<div class="process-step">Step 2</div>

<!-- Skills as individual elements — should be <ul> -->
<div class="skill">UI Design</div>
<div class="skill">Web Dev</div>

<!-- List items without list wrapper — should be <ul> or <ol> -->
<p>• Skill 1</p>
<p>• Skill 2</p>
```

**Fix if Wrong:**
- Use `<ul>` for unordered lists (skills, features, etc.)
- Use `<ol>` for ordered lists (steps, rankings, etc.)
- Use `<li>` for each item
- Use `<dl>` for term/definition pairs

---

### 2.10 Figure and Figcaption for Images
**Standard:** Images with captions should use `<figure>` and `<figcaption>`.

**Expected Pattern:**
```html
<figure>
  <img src="/project-screenshot.jpg" alt="Project interface showing dashboard">
  <figcaption>Dashboard interface for analytics project</figcaption>
</figure>
```

**When to Use:**
- Images with explanatory captions (case studies, project galleries)
- Illustrations with descriptions
- Screenshots with labels

**When NOT to Use:**
- Decorative images (use `<img alt="" aria-hidden="true">`)
- Images in `<picture>` or `<source>` (responsive images)

**Audit Check:**
- [ ] Project images have captions → wrapped in `<figure>/<figcaption>`
- [ ] Case study images use `<figure>` when they have explanatory text
- [ ] All `<img>` inside `<figure>` have `alt` attributes
- [ ] `<figcaption>` provides meaningful context, not just "Image"

**Good Examples (case-study.html):**
```html
<figure>
  <img src="/ui-mockup.png" alt="Mobile app interface with three main screens">
  <figcaption>Initial wireframes for mobile app redesign</figcaption>
</figure>

<figure>
  <img src="/user-testing.jpg" alt="User testing session with participant thinking aloud">
  <figcaption>User testing revealed that users prefer left-aligned form labels</figcaption>
</figure>
```

**Bad Examples:**
```html
<!-- Image with caption but no figure — semantic error -->
<img src="/screenshot.png" alt="...">
<p>This is the screenshot</p>

<!-- Figure without meaningful caption — misuse -->
<figure>
  <img src="/project.png" alt="...">
  <figcaption>Image</figcaption>
</figure>

<!-- Decorative image with figcaption — wrong semantic -->
<figure>
  <img src="/background-pattern.png" alt="...">
  <figcaption>Background</figcaption>
</figure>
```

**Fix if Wrong:**
- Wrap images with captions in `<figure>/<figcaption>`
- Ensure `<figcaption>` is descriptive, not generic
- Remove figure tags from purely decorative images

---

## STEP 3: HEADING HIERARCHY

Headings create a logical outline of page content. Screen readers rely on heading hierarchy; search engines use headings to understand page structure.

### 3.1 Exactly One H1 Per Page
**Standard:** Each page must have exactly ONE `<h1>` that describes the page's primary topic.

**Expected Pattern:**
```html
<main>
  <h1>Page Primary Topic</h1>
  <h2>Subsection 1</h2>
  <h3>Sub-subsection 1.1</h3>
  <h2>Subsection 2</h2>
</main>
```

**Expected H1 per Page:**

| Page | Expected H1 | Example |
|------|-------------|---------|
| index.html | Site intro or hero | "JU. — Digital Architect" or "Welcome to My Portfolio" |
| about.html | "About Me" or similar | "About JU." |
| work.html | "Portfolio" or "Case Studies" | "My Work" |
| process.html | "Design Process" or similar | "My Design Process" |
| contact.html | "Get In Touch" or similar | "Contact Me" |
| case-study.html | Case study title | "[Project Name]: [Subtitle]" |

**Audit Check:**
- [ ] index.html: Exactly 1 `<h1>` in hero section
- [ ] about.html: Exactly 1 `<h1>` introducing the "About" section
- [ ] work.html: Exactly 1 `<h1>` (e.g., "My Work")
- [ ] process.html: Exactly 1 `<h1>` (e.g., "Design Process")
- [ ] contact.html: Exactly 1 `<h1>` (e.g., "Get In Touch")
- [ ] case-study.html: Exactly 1 `<h1>` (case study title)
- [ ] No page has 0 or 2+ `<h1>` tags

**Good Examples:**
```html
<!-- index.html -->
<main>
  <h1>JU. — Digital Architect</h1>
  <p>Product designer and developer specializing in elegant, user-centered solutions.</p>
</main>

<!-- about.html -->
<main>
  <h1>About JU.</h1>
  <p>I'm a designer and developer with 5+ years of experience...</p>
</main>

<!-- case-study.html -->
<main>
  <h1>Building a Real-Time Analytics Dashboard</h1>
  <p>A case study on designing and developing an analytics platform.</p>
</main>
```

**Bad Examples:**
```html
<!-- No h1 — semantic error -->
<main>
  <h2>Welcome</h2>
  <p>Content</p>
</main>

<!-- Multiple h1s — semantic error -->
<main>
  <h1>Title</h1>
  <section>
    <h1>Subsection Title</h1>  <!-- Should be h2 -->
  </section>
</main>

<!-- H1 styled small, using h2 instead — wrong semantic -->
<main>
  <h2>Welcome</h2>  <!-- Large, prominent, but tagged as h2 -->
</main>
```

**Fix if Wrong:**
- Add `<h1>` if missing
- Remove extra `<h1>` tags (convert to `<h2>` or lower)
- Ensure `<h1>` matches page topic

---

### 3.2 Heading Hierarchy — Sequential, No Skipping
**Standard:** Headings must be sequential. Don't skip levels (e.g., h1 → h3 skips h2).

**WRONG Pattern:**
```html
<h1>Main Title</h1>
<h3>Subsection</h3>  <!-- WRONG: h2 is skipped -->
<h4>Sub-subsection</h4>
```

**CORRECT Pattern:**
```html
<h1>Main Title</h1>
<h2>Subsection</h2>
<h3>Sub-subsection</h3>
<h2>Another Subsection</h2>
<h3>Another Sub-subsection</h3>
```

**Expected Heading Trees for Each Page:**

### index.html Heading Outline
```
H1: JU. — Digital Architect
├─ H2: Featured Work
│  └─ [Project cards don't need headings; article titles in <article>]
├─ H2: Skills
├─ H2: Process
└─ H2: Latest Case Study
```

### about.html Heading Outline
```
H1: About JU.
├─ H2: Background
├─ H2: Philosophy
├─ H2: Experience
└─ H2: Let's Work Together
```

### work.html Heading Outline
```
H1: My Work
├─ H2: Case Study 1
├─ H2: Case Study 2
└─ H2: Case Study 3
[or use <article> for each case, with h2 inside]
```

### process.html Heading Outline
```
H1: Design Process
├─ H2: Step 1 — Research
├─ H2: Step 2 — Ideation
├─ H2: Step 3 — Prototyping
└─ H2: Step 4 — Testing & Iteration
```

### contact.html Heading Outline
```
H1: Get In Touch
├─ H2: Send Me a Message
│  └─ [Form — no h3 needed]
├─ H2: Find Me Online
│  └─ [Social links]
└─ H2: Other Ways to Connect
```

### case-study.html Heading Outline
```
H1: [Project Title]: [Subtitle]
├─ H2: Overview / Problem
├─ H2: Solution / Approach
├─ H2: Key Features
├─ H2: Results / Impact
└─ H2: Learnings
```

**Audit Check:**
- [ ] Map each page's heading hierarchy (list all h1–h6 tags)
- [ ] Verify no jumps (e.g., h1 → h3 without h2)
- [ ] Verify headings follow logical structure
- [ ] Verify heading count matches expected outline

**To Audit Heading Hierarchy:**

1. Open each page in browser
2. Open DevTools (F12)
3. In Console, run:
```javascript
const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
headings.forEach(h => console.log(h.tagName + ': ' + h.textContent));
```
4. Copy output and verify sequence (h1 → h2 → h3 with no skips)

**Good Sequence:**
```
H1: Main Title
H2: Subsection A
H3: Sub-subsection A1
H2: Subsection B
H3: Sub-subsection B1
H3: Sub-subsection B2
```

**Bad Sequence (skips):**
```
H1: Main Title
H3: Subsection A  ← SKIP: where's h2?
H3: Subsection B
H5: Sub-sub     ← SKIP: where's h3/h4?
```

**Fix if Wrong:**
- Adjust heading levels to eliminate skips
- Use h2 after h1, h3 after h2, etc.

---

### 3.3 Headings Describe Content (Not Generic)
**Standard:** Heading text should describe the section's content, not be generic like "Section", "Part", "Title".

**Good Examples:**
```html
<h2>My Design Philosophy</h2>
<h2>Featured Case Studies</h2>
<h2>Key Skills & Tools</h2>
<h2>Let's Work Together</h2>
```

**Bad Examples:**
```html
<h2>Section</h2>
<h2>Details</h2>
<h2>More Information</h2>
<h2>Part 1</h2>
<h2>Content</h2>
```

**Audit Check:**
- [ ] All headings are descriptive and context-specific
- [ ] No generic/placeholder heading text
- [ ] Headings accurately summarize section content

**Fix if Generic:**
Rewrite headings to describe their section's purpose.

---

### 3.4 Text Styled as Headings (But Not Tagged)
**Standard:** If text looks like a heading (large, bold) but isn't using heading tags, make it a heading tag.

**Bad Example:**
```html
<p style="font-size: 2em; font-weight: 700;">My Skills</p>
<ul>
  <li>Skill 1</li>
</ul>
```

**Good Example:**
```html
<h2>My Skills</h2>
<ul>
  <li>Skill 1</li>
</ul>
```

**Audit Check:**
- [ ] Search for large, bold text that isn't using heading tags
- [ ] Replace with appropriate heading level
- [ ] Use CSS to style headings, not HTML presentational styles

**Fix if Found:**
Replace styled `<p>` with heading tags (`<h2>`, `<h3>`, etc.).

---

### 3.5 Heading Tags Used Only for Styling (Should Be Paragraphs)
**Standard:** Don't use heading tags for styling if they don't represent actual headings.

**Bad Example:**
```html
<h2 style="font-size: 1em; font-weight: normal;">This is just body text using an h2 tag</h2>
```

**Good Example:**
```html
<p>This is body text in a paragraph tag.</p>
```

**Audit Check:**
- [ ] Search for heading tags styled to look like body text (small, light weight)
- [ ] Convert to `<p>` or `<div>` with appropriate text class

**Fix if Found:**
Replace semantically-incorrect heading tags with `<p>` or `<div>`.

---

## STEP 4: LINK & BUTTON SEMANTICS

Links and buttons serve different purposes. Proper semantic markup improves accessibility and usability.

### 4.1 Links (`<a>`) for Navigation
**Standard:** Use `<a href="...">` for navigation and linking to resources.

**Expected:**
```html
<!-- External link -->
<a href="https://example.com">Example Site</a>

<!-- Internal link -->
<a href="/about.html">About</a>

<!-- Link to section -->
<a href="#contact">Contact</a>

<!-- Email link -->
<a href="mailto:hello@ju.com">hello@ju.com</a>

<!-- Phone link -->
<a href="tel:+1234567890">+1 (234) 567-8900</a>
```

**Audit Check:**
- [ ] All navigation links use `<a>` tags
- [ ] All `<a>` tags have `href` attribute
- [ ] No `<a>` without `href` (those should be `<button>`)

**Fix if Wrong:**
- Replace `<div onclick="...">` with `<a href="...">`
- Ensure all clickable navigational elements are `<a>` tags with `href`

---

### 4.2 Buttons (`<button>`) for Actions
**Standard:** Use `<button>` for actions (submit, toggle, open dialog, etc.), not navigation.

**Expected:**
```html
<!-- Form submission -->
<button type="submit">Send Message</button>

<!-- Toggle/action -->
<button type="button" id="menu-toggle">Toggle Menu</button>

<!-- Disabled button -->
<button type="button" disabled>Disabled Action</button>
```

**Audit Check:**
- [ ] Form submit uses `<button type="submit">`
- [ ] No `<button>` with `href` attribute
- [ ] All action triggers use `<button>` (not `<a>` or `<div>`)

**Fix if Wrong:**
- Replace `<a href="javascript:void(0)">Action</a>` with `<button type="button">Action</button>`
- Use `<button>` for actions, `<a>` for navigation

---

### 4.3 Div/Span Click Handlers (Accessibility Error)
**Standard:** Don't use `<div>` or `<span>` with `onclick` handlers. Use `<button>` or `<a>`.

**Bad Examples:**
```html
<!-- DIV with click handler — semantic and accessibility error -->
<div onclick="navigateTo('/about.html')">About</div>

<!-- SPAN with click handler — accessibility error -->
<span onclick="toggleMenu()" role="button">Menu</span>

<!-- DIV styled as button — semantic error -->
<div class="button" onclick="submitForm()">Submit</div>
```

**Good Examples:**
```html
<!-- Button for action -->
<button type="button" onclick="toggleMenu()">Menu</button>

<!-- Link for navigation -->
<a href="/about.html">About</a>
```

**Why This Matters:**
- Screen readers don't announce `<div>` as interactive
- Keyboard navigation (Tab, Enter) doesn't work without ARIA roles
- Mobile users can't access without special configuration

**Audit Check:**
- [ ] Search for `onclick="..."` in HTML
- [ ] Verify each is on `<button>` or `<a>` (not `<div>` or `<span>`)
- [ ] Check for `role="button"` on non-button elements (should be actual `<button>`)

**Fix if Found:**
Replace clickable divs/spans with `<button>` or `<a>`.

---

### 4.4 Links Have Descriptive Text
**Standard:** Link text should describe the destination or action, not be generic ("click here", "more", "link").

**Good Examples:**
```html
<a href="/about.html">Learn about my design philosophy</a>
<a href="/case-study.html">Read the full case study</a>
<a href="https://github.com/ju">View my GitHub profile</a>
<a href="mailto:hello@ju.com">Email me directly</a>
```

**Bad Examples:**
```html
<a href="/about.html">Click here</a>
<a href="/case-study.html">More</a>
<a href="/work.html">Link</a>
<a href="#section">Read more →</a>  <!-- Arrow alone isn't descriptive -->
```

**Screen Reader Problem:**
Screen reader users see link lists without context. "More", "Link", "Click here" are meaningless.

**Audit Check:**
- [ ] All link text is descriptive
- [ ] No "click here", "more", "link", "learn more" alone
- [ ] Link text describes destination or action

**Fix if Generic:**
Replace generic text with descriptive alternatives:
- "Click here" → "Learn about my design philosophy"
- "More" → "Read the full case study"
- "Link" → "View my GitHub profile"

---

### 4.5 External Links (target="_blank" rel="noopener noreferrer")
**Standard:** External links opening in new tabs should use `target="_blank"` and security attributes.

**Expected:**
```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">External Site</a>
```

**Why Both Attributes?**
- `target="_blank"`: Opens in new tab
- `rel="noopener noreferrer"`: Prevents the new page from accessing the original page's `window` object (security + performance)

**Audit Check:**
- [ ] All external links (https://...) have `target="_blank"`
- [ ] All `target="_blank"` have `rel="noopener noreferrer"`
- [ ] Internal links (e.g., /about.html) do NOT have `target="_blank"`

**Good Examples:**
```html
<a href="https://dribbble.com/ju" target="_blank" rel="noopener noreferrer">Dribbble</a>
<a href="https://github.com/ju" target="_blank" rel="noopener noreferrer">GitHub</a>
<a href="https://twitter.com/ju" target="_blank" rel="noopener noreferrer">Twitter</a>
```

**Bad Examples:**
```html
<a href="https://example.com">External (missing target)</a>
<a href="https://example.com" target="_blank">External (missing rel)</a>
<a href="/about.html" target="_blank">About (wrong: internal link)</a>
```

**Fix if Wrong:**
- Add `target="_blank" rel="noopener noreferrer"` to external links
- Remove `target="_blank"` from internal links

---

### 4.6 Icon-Only Links (Need aria-label)
**Standard:** Links with only icons need `aria-label` to describe them for screen readers.

**Expected:**
```html
<!-- Icon-only link with aria-label -->
<a href="https://github.com/ju" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
  <svg aria-hidden="true"><!-- GitHub icon --></svg>
</a>
```

**Audit Check:**
- [ ] All icon-only links (no text) have `aria-label`
- [ ] `aria-label` describes the destination or action
- [ ] SVG icons have `aria-hidden="true"` (not separately announced)

**Bad Examples:**
```html
<!-- No aria-label — screen reader announces nothing -->
<a href="https://github.com/ju">
  <svg><!-- GitHub icon --></svg>
</a>

<!-- aria-label is generic -->
<a href="https://github.com/ju" aria-label="Link">
  <svg></svg>
</a>
```

**Fix if Found:**
Add descriptive `aria-label` to icon-only links.

---

### 4.7 Mailto and Tel Links
**Standard:** Email and phone links should use proper `mailto:` and `tel:` protocols.

**Expected:**
```html
<!-- Email link -->
<a href="mailto:hello@ju.com">hello@ju.com</a>
<a href="mailto:hello@ju.com?subject=Let's%20Work%20Together">Email me</a>

<!-- Phone link -->
<a href="tel:+1234567890">+1 (234) 567-8900</a>
```

**Audit Check:**
- [ ] Email contact uses `href="mailto:..."`
- [ ] Phone contact uses `href="tel:..."`
- [ ] Email subjects are URL-encoded (`%20` for space, `%26` for &, etc.)

**Good Example (contact.html):**
```html
<a href="mailto:hello@ju.com">hello@ju.com</a>
<a href="tel:+1234567890">+1 (234) 567-8900</a>
```

**Bad Examples:**
```html
<a href="hello@ju.com">hello@ju.com</a>  <!-- Missing mailto: -->
<a href="/contact.html">Email me</a>  <!-- Should be mailto: for direct email -->
<a href="tel:1234567890">Call me</a>  <!-- Missing + for international format -->
```

**Fix if Wrong:**
- Use `mailto:email@example.com` for email
- Use `tel:+1234567890` for phone (with + and country code)

---

## STEP 5: FORM SEMANTICS (contact.html)

Forms must be properly structured for accessibility and usability.

### 5.1 Form Element Wraps All Controls
**Standard:** All form controls (inputs, textareas, selects, buttons) must be wrapped in `<form>`.

**Expected Structure:**
```html
<form id="contact-form" action="/api/contact" method="POST">
  <label for="name">Full Name</label>
  <input id="name" type="text" name="name" required>

  <label for="email">Email Address</label>
  <input id="email" type="email" name="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send Message</button>
</form>
```

**Audit Check:**
- [ ] contact.html has `<form>` element wrapping all controls
- [ ] Form has `action` (where to submit) and `method` (POST for sensitive data)
- [ ] Form has `id` (for linking submit buttons, referencing in CSS/JS)

**Fix if Missing:**
Wrap all form controls in `<form action="..." method="POST">`.

---

### 5.2 Labels Associated with Inputs
**Standard:** Each input must have an associated `<label>` with matching `for` attribute.

**Expected:**
```html
<label for="name">Full Name</label>
<input id="name" type="text" name="name" required>

<label for="email">Email Address</label>
<input id="email" type="email" name="email" required>
```

**Why Match ID?**
- Screen readers link label text to input
- Clicking label focuses the input (larger touch target on mobile)
- Form is more accessible and usable

**Audit Check:**
- [ ] Every `<input>` has matching `<label for="[same-id]">`
- [ ] IDs are unique on the page
- [ ] Labels are before inputs (or `<label>` wraps input)

**Good Examples:**
```html
<!-- Explicit label -->
<label for="full-name">Full Name</label>
<input id="full-name" type="text" name="full_name">

<!-- Implicit label (wraps input) -->
<label>
  Email Address
  <input type="email" name="email">
</label>
```

**Bad Examples:**
```html
<!-- No label — accessibility error -->
<input type="text" name="name" placeholder="Name">

<!-- Label ID doesn't match input ID — not linked -->
<label for="name">Full Name</label>
<input id="full-name" type="text" name="name">

<!-- Placeholder instead of label — semantic error -->
<input type="text" placeholder="Email Address">
```

**Fix if Missing:**
Add `<label for="input-id">Label Text</label>` before each input.

---

### 5.3 Required Fields (required attribute + aria-required)
**Standard:** Required fields must have both `required` attribute and `aria-required="true"`.

**Expected:**
```html
<label for="name">Full Name *</label>
<input id="name" type="text" name="name" required aria-required="true">

<label for="email">Email Address *</label>
<input id="email" type="email" name="email" required aria-required="true">
```

**Why Both?**
- `required`: HTML5 validation (browser prevents submit)
- `aria-required="true"`: Announces to screen readers

**Audit Check:**
- [ ] All required inputs have `required` attribute
- [ ] All required inputs have `aria-required="true"`
- [ ] Required fields marked with * (visual indicator for sighted users)

**Fix if Missing:**
Add both `required` and `aria-required="true"` to required fields.

---

### 5.4 Input Types Are Correct
**Standard:** Use correct `type` attributes for different input types (improves mobile keyboards, validation).

**Expected Input Types:**

| Content Type | Input Type | Example |
|--------------|-----------|---------|
| Name | `type="text"` | `<input type="text" name="name">` |
| Email | `type="email"` | `<input type="email" name="email">` |
| Phone | `type="tel"` | `<input type="tel" name="phone">` |
| URL | `type="url"` | `<input type="url" name="website">` |
| Message | `<textarea>` | `<textarea name="message"></textarea>` |
| Checkbox | `type="checkbox"` | `<input type="checkbox" name="agree">` |
| Radio | `type="radio"` | `<input type="radio" name="option">` |
| Submit | `<button type="submit">` | `<button type="submit">Send</button>` |

**Audit Check:**
- [ ] Email input uses `type="email"` (browser validates format, mobile shows @)
- [ ] Phone input uses `type="tel"` (mobile shows numeric keyboard)
- [ ] URL input uses `type="url"` (browser validates format)
- [ ] Long text uses `<textarea>`, not `<input>`
- [ ] Submit uses `<button type="submit">`, not `type="button"`

**Good Examples:**
```html
<input type="email" name="email" placeholder="you@example.com">
<input type="tel" name="phone" placeholder="+1 (555) 000-0000">
<input type="url" name="website" placeholder="https://example.com">
<textarea name="message" placeholder="Your message..."></textarea>
```

**Bad Examples:**
```html
<input type="text" name="email">  <!-- Should be type="email" -->
<input type="text" name="phone">  <!-- Should be type="tel" -->
<input type="text" name="message">  <!-- Should be <textarea> -->
<button onclick="submitForm()">Send</button>  <!-- Should be type="submit" -->
```

**Fix if Wrong:**
Update input types to match content.

---

### 5.5 Autocomplete Attributes
**Standard:** Forms should include `autocomplete` attributes to help users fill in information quickly.

**Expected:**
```html
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="url" name="website" autocomplete="url">
<textarea name="message"></textarea>  <!-- No autocomplete for free text -->
```

**Common Autocomplete Values:**
- `autocomplete="name"`: Full name
- `autocomplete="given-name"`: First name
- `autocomplete="family-name"`: Last name
- `autocomplete="email"`: Email address
- `autocomplete="tel"`: Phone number
- `autocomplete="url"`: Website URL
- `autocomplete="organization"`: Company name
- `autocomplete="address-line1"`: Street address
- `autocomplete="postal-code"`: ZIP code
- `autocomplete="country"`: Country

**Audit Check:**
- [ ] Name input has `autocomplete="name"`
- [ ] Email input has `autocomplete="email"`
- [ ] Phone input has `autocomplete="tel"`
- [ ] Website input (if any) has `autocomplete="url"`

**Fix if Missing:**
Add `autocomplete` attributes to form inputs.

---

### 5.6 Submit Button (type="submit")
**Standard:** Forms must have a `<button type="submit">` to submit the form.

**Expected:**
```html
<form>
  <!-- inputs -->
  <button type="submit">Send Message</button>
</form>
```

**Audit Check:**
- [ ] Form has `<button type="submit">` (not just `type="button"`)
- [ ] Button text is descriptive ("Send Message", not "OK")
- [ ] Button is inside `<form>` (or uses `form="form-id"` attribute)

**Good Example:**
```html
<button type="submit">Send Message</button>
<button type="submit">Contact Me</button>
<button type="submit">Get In Touch</button>
```

**Bad Examples:**
```html
<button type="button" onclick="submitForm()">Send</button>  <!-- Should be type="submit" -->
<input type="submit" value="Send">  <!-- OK, but <button> is better for styling -->
<button>Send</button>  <!-- Missing type="submit" -->
```

**Fix if Wrong:**
Change button type to `type="submit"`.

---

### 5.7 Fieldset/Legend for Grouped Controls
**Standard:** Groups of related form controls (radio buttons, checkboxes) should use `<fieldset>` and `<legend>`.

**Expected (if applicable):**
```html
<fieldset>
  <legend>How did you hear about me?</legend>
  <label>
    <input type="radio" name="source" value="referral"> Referral
  </label>
  <label>
    <input type="radio" name="source" value="social"> Social Media
  </label>
  <label>
    <input type="radio" name="source" value="search"> Search Engine
  </label>
</fieldset>
```

**Audit Check:**
- [ ] If form has radio buttons or checkbox groups, they use `<fieldset>`
- [ ] Fieldset has descriptive `<legend>` (not just "Options")
- [ ] Each option is a `<label>` wrapping the control

**Note:** If contact form doesn't have grouped controls, `<fieldset>` may not be needed.

**Fix if Missing (for groups):**
Add `<fieldset><legend>` for grouped controls.

---

## STEP 6: IMAGE SEMANTICS

Images must have appropriate alt text and ARIA attributes for accessibility.

### 6.1 All Images Have Alt Attributes
**Standard:** Every `<img>` element must have an `alt` attribute (can be empty for decorative images).

**Expected:**
```html
<!-- Content image with descriptive alt -->
<img src="/project-screenshot.jpg" alt="Dashboard interface showing analytics charts">

<!-- Decorative image with empty alt -->
<img src="/decorative-pattern.png" alt="" aria-hidden="true">
```

**Audit Check:**
- [ ] All `<img>` tags have `alt=""` or `alt="descriptive text"`
- [ ] No `<img>` without `alt` attribute

**Fix if Missing:**
Add `alt=""` to every `<img>` tag.

---

### 6.2 Content Images Have Descriptive Alt Text
**Standard:** Images conveying information must have detailed, descriptive alt text.

**Expected Pattern:**
Alt text should describe:
- What the image shows
- Why it's important to the page
- Details that convey the same information as the image

**Examples (case-study.html):**
```html
<!-- Project interface screenshot -->
<img src="/dashboard.jpg" alt="Dashboard interface with three columns showing users, revenue, and churn metrics">

<!-- User testing session -->
<img src="/user-testing.jpg" alt="User testing session showing participant interacting with prototype on mobile device">

<!-- Before/after comparison -->
<img src="/before-after.jpg" alt="Before and after comparison of app redesign, showing simplified navigation and larger touch targets">
```

**Audit Check:**
- [ ] Project images have detailed alt text (not "Project image")
- [ ] Alt text is 125 characters or less (but can be longer if needed)
- [ ] Alt text describes content, not just "image of..."

**Bad Examples:**
```html
<img src="/project.jpg" alt="Image">  <!-- Too generic -->
<img src="/project.jpg" alt="Project image">  <!-- Obvious; adds no info -->
<img src="/project.jpg" alt="Screenshot">  <!-- Vague -->
<img src="/project.jpg" alt="Image showing a dashboard with charts and user data visualization interface design mockup">  <!-- Too long, redundant -->
```

**Fix if Generic:**
Rewrite alt text to describe the image's purpose and content clearly.

---

### 6.3 Decorative Images (alt="" + aria-hidden)
**Standard:** Decorative images should have empty `alt=""` and `aria-hidden="true"` to exclude them from accessibility tree.

**Expected:**
```html
<!-- Decorative background image -->
<img src="/texture.png" alt="" aria-hidden="true">

<!-- Decorative icon (if using <img>, not recommended) -->
<img src="/star.svg" alt="" aria-hidden="true">
```

**Audit Check:**
- [ ] All decorative images have `alt=""`
- [ ] All decorative images have `aria-hidden="true"`

**Why Both?**
- `alt=""`: Tells screen reader there's no alt text to read
- `aria-hidden="true"`: Explicitly hides from accessibility tree

**Note:** Decorative SVGs and cursor elements should also have `aria-hidden="true"`.

**Fix if Missing:**
Add `alt="" aria-hidden="true"` to decorative images.

---

### 6.4 SVG Icons — ARIA Attributes
**Standard:** SVG icons need appropriate ARIA treatment based on whether they're decorative or meaningful.

**For Decorative SVGs (inside text or buttons):**
```html
<!-- Icon inside button; button has text label -->
<button>
  <svg aria-hidden="true" class="icon"><!-- icon SVG --></svg>
  Send Message
</button>

<!-- Icon next to text -->
<span>
  <svg aria-hidden="true" class="icon"><!-- icon SVG --></svg>
  Social Links
</span>
```

**For Meaningful SVGs (standalone, no text):**
```html
<!-- SVG with role and title -->
<svg role="img" aria-label="My logo">
  <title>JU. Logo</title>
  <!-- SVG content -->
</svg>

<!-- Or using aria-labelledby -->
<svg role="img" aria-labelledby="logo-title">
  <title id="logo-title">JU. Digital Architect</title>
  <!-- SVG content -->
</svg>
```

**Audit Check:**
- [ ] Decorative SVGs have `aria-hidden="true"`
- [ ] Meaningful SVGs have `role="img"` and `aria-label` or `<title>`
- [ ] SVG `<title>` elements are descriptive (for hover tooltips and screen readers)

**Good Example (header logo):**
```html
<a href="/">
  <svg role="img" aria-label="JU. Home" class="logo">
    <title>JU. Digital Architect — Home</title>
    <!-- SVG content -->
  </svg>
</a>
```

**Bad Examples:**
```html
<!-- Meaningful SVG without ARIA — not announced -->
<svg>
  <!-- Logo SVG -->
</svg>

<!-- SVG with aria-label but no role — may not be announced -->
<svg aria-label="Logo">
  <!-- SVG content -->
</svg>

<!-- Decorative SVG without aria-hidden — screen reader announces empty content -->
<button>
  <svg><!-- icon --></svg>
  Send
</button>
```

**Fix if Wrong:**
- Add `aria-hidden="true"` to decorative SVGs
- Add `role="img" aria-label="..."` or `role="img" aria-labelledby="..."` to meaningful SVGs

---

### 6.5 Images with Captions (Figure/Figcaption)
**Standard:** Images with explanatory captions should use `<figure>` and `<figcaption>`.

(See STEP 2.10 for detailed guidance on `<figure>` and `<figcaption>`.)

---

## STEP 7: DECORATIVE/BACKGROUND ELEMENT HANDLING

Portfolio pages include decorative elements (cursor, plasma, grain, vignette, particles). These must not interfere with accessibility.

### 7.1 Cursor Elements (aria-hidden)
**Expected HTML:**
```html
<div class="cursor" aria-hidden="true"></div>
<div class="cursor-glow" aria-hidden="true"></div>
```

**Audit Check:**
- [ ] All cursor divs have `aria-hidden="true"`
- [ ] Cursor elements are in `<body>` or `<header>`, not in `<main>`

---

### 7.2 Plasma/Grain/Vignette Layers (aria-hidden)
**Expected HTML:**
```html
<div class="plasma-background" aria-hidden="true"></div>
<div class="grain-overlay" aria-hidden="true"></div>
<div class="vignette-overlay" aria-hidden="true"></div>
```

**Audit Check:**
- [ ] All decorative background layers have `aria-hidden="true"`
- [ ] Positioned with CSS (not interfering with content structure)

---

### 7.3 Canvas Particles (aria-hidden)
**Expected HTML:**
```html
<canvas id="particle-canvas" aria-hidden="true"></canvas>
```

**Audit Check:**
- [ ] Canvas element has `aria-hidden="true"`
- [ ] Canvas ID is descriptive (for JavaScript targeting)

---

### 7.4 Verify Decorative Elements Don't Interfere
**Audit Check:**
- [ ] No decorative elements interrupt content flow
- [ ] No decorative elements hide content (use `pointer-events: none` in CSS)
- [ ] Screen readers can navigate all content without interference

**Testing:**
1. Open page in screen reader (NVDA, JAWS, VoiceOver)
2. Verify page reads in logical order
3. Verify no extra announcements from decorative elements

---

### 7.5 Pointer Events (CSS — Not HTML)
**Standard:** Decorative elements should have `pointer-events: none` in CSS (not HTML).

**Expected CSS:**
```css
.cursor,
.cursor-glow,
.plasma-background,
.grain-overlay,
.vignette-overlay,
canvas {
  pointer-events: none;
}
```

**Why?** Ensures clicks pass through decorative elements to interactive content below.

**Audit Check:**
- [ ] Verify CSS has `pointer-events: none` for decorative elements (not HTML audit)

---

## STEP 8: HTML VALIDATION

Proper HTML markup ensures broad compatibility and prevents hidden errors.

### 8.1 W3C HTML Validator
**Standard:** Validate all 6 pages using W3C HTML Validator (https://validator.w3.org/).

**Steps:**
1. Go to https://validator.w3.org/
2. For each page:
   - Enter URL (if published) or upload HTML file
   - Review errors and warnings
   - Fix errors (not just warnings)

**Expected Result:**
- 0 Errors
- Minimal warnings (some are informational)

**Common Errors to Fix:**
- Missing `<title>` or duplicate `<title>`
- Unclosed tags
- Invalid nesting (e.g., `<p>` inside `<p>`)
- Duplicate IDs on same page
- Invalid attributes on elements

**Audit Check:**
- [ ] index.html: 0 HTML errors
- [ ] about.html: 0 HTML errors
- [ ] work.html: 0 HTML errors
- [ ] process.html: 0 HTML errors
- [ ] contact.html: 0 HTML errors
- [ ] case-study.html: 0 HTML errors

---

### 8.2 Unclosed Tags, Improper Nesting
**Standard:** All tags must be properly closed and nested.

**Bad Examples:**
```html
<!-- Unclosed tag -->
<div>
  <p>Text</p>
<!-- Missing </div> -->

<!-- Improper nesting (p inside p) -->
<p>
  <p>Nested paragraph</p>
</p>

<!-- Improper nesting (div inside p) -->
<p>
  <div>Content</div>
</p>
```

**Good Examples:**
```html
<!-- Properly nested -->
<div>
  <p>Text</p>
</div>

<!-- Self-closing tags -->
<img src="..." alt="...">
<input type="text">
<br>
```

**Audit Check:**
- [ ] All opening tags have matching closing tags
- [ ] No improperly nested elements
- [ ] Self-closing tags don't have closing slash (optional in HTML5)

---

### 8.3 Deprecated HTML Attributes/Elements
**Standard:** Don't use deprecated HTML features.

**Deprecated Elements to Avoid:**
- `<center>` → Use CSS `text-align: center;`
- `<font>` → Use CSS `font-family`, `color`
- `<u>` → Use CSS `text-decoration: underline;` or `<span>` with class
- `<b>` for styling → Use `<strong>` for semantic emphasis
- `<i>` for styling → Use `<em>` for semantic emphasis or `<span>` with class

**Deprecated Attributes to Avoid:**
- `align` (on images, text) → Use CSS `text-align`, `float`, `flex`
- `bgcolor` → Use CSS `background-color`
- `border` (on images) → Use CSS `border`
- `cellpadding`, `cellspacing` → Use CSS `padding`, `border-collapse`
- `target="_self"` → Omit (default behavior)

**Audit Check:**
- [ ] No deprecated elements (`<center>`, `<font>`, `<marquee>`)
- [ ] No presentational attributes (`align`, `bgcolor`, `border`)
- [ ] Use semantic elements (`<strong>`, `<em>`) for emphasis

---

### 8.4 Duplicate IDs on Same Page
**Standard:** Every `id` attribute must be unique on a page.

**Bad Example:**
```html
<h2 id="section">About</h2>
<p id="section">More text</p>  <!-- Duplicate ID — error -->
```

**Good Example:**
```html
<h2 id="about-section">About</h2>
<p id="about-intro">More text</p>
```

**Why Duplicates Break:**
- CSS selectors target first matching ID
- JavaScript `getElementById()` returns only first match
- Anchor links (`#id`) become ambiguous

**Audit Check:**
- [ ] Run in browser DevTools Console:
```javascript
const ids = document.querySelectorAll('[id]');
const idMap = {};
ids.forEach(el => {
  const id = el.id;
  idMap[id] = (idMap[id] || 0) + 1;
});
const duplicates = Object.entries(idMap).filter(([_, count]) => count > 1);
console.log('Duplicate IDs:', duplicates);
```
- [ ] Verify no duplicate IDs listed

**Fix if Found:**
Rename duplicate IDs to be unique.

---

### 8.5 Proper Nesting (No Div Inside P, Etc.)
**Standard:** Respect HTML nesting rules.

**Forbidden Nestings:**
- `<p>` cannot contain `<div>`, `<section>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<nav>`
- `<button>` cannot contain `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`
- `<a>` cannot contain another `<a>`
- Block elements (`<div>`, `<section>`) can contain other blocks and inlines
- Inline elements (`<span>`, `<a>`, `<em>`) can contain other inlines, not blocks

**Bad Examples:**
```html
<!-- Div inside p — forbidden -->
<p>
  Text with <div>block content</div>
</p>

<!-- Button inside button — forbidden -->
<button>
  Action with <button>sub-action</button>
</button>

<!-- Link inside link — forbidden -->
<a href="/page1">
  Link to <a href="/page2">page 2</a>
</a>
```

**Good Examples:**
```html
<!-- Block inside block — OK -->
<div>
  <div>Nested div</div>
</div>

<!-- Inline inside block — OK -->
<p>
  Text with <em>emphasis</em>
</p>

<!-- Block inside block — OK -->
<section>
  <article>
    <div class="content">Text</div>
  </article>
</section>
```

**Audit Check:**
- [ ] Run W3C validator to catch nesting errors
- [ ] Manually inspect any complex nesting structures

---

## STEP 9: CONTENT MARKUP QUALITY

Semantic HTML tags improve meaning, accessibility, and SEO.

### 9.1 Strong vs. Bold, Em vs. Italic
**Standard:**
- `<strong>`: Semantic emphasis (important, serious)
- `<b>`: Stylistic boldness (use sparingly)
- `<em>`: Semantic emphasis (stress, tone)
- `<i>`: Stylistic italics (use sparingly)

**Expected:**
```html
<!-- Semantic emphasis -->
<p>This is <strong>very important</strong>.</p>
<p>This is <em>emphasized</em> text.</p>

<!-- Stylistic (less common) -->
<p>This is <b>bold</b> text (not important).</p>
<p>This is <i>italic</i> text (not emphasized).</p>
```

**When to Use:**
- **`<strong>`**: "Important", "warning", "alert"
- **`<b>`**: Brand names, technical terms, intro paragraph summary (no semantic importance)
- **`<em>`**: Stress, tone change, highlighting a word
- **`<i>`**: Foreign words, thoughts, scientific names, UI labels

**Audit Check:**
- [ ] All semantic emphasis uses `<strong>` or `<em>`
- [ ] No overuse of `<b>` or `<i>` for styling

---

### 9.2 Time Elements (if applicable)
**Standard:** Dates and times should use `<time>` element with `datetime` attribute.

**Expected:**
```html
<!-- Article publication date -->
<time datetime="2025-02-27">February 27, 2025</time>

<!-- Time with timezone -->
<time datetime="2025-02-27T14:30:00Z">2:30 PM UTC</time>
```

**Audit Check:**
- [ ] If dates are displayed, they use `<time>` element
- [ ] `datetime` attribute is ISO 8601 format
- [ ] Display text is human-readable

**Note:** Not required if portfolio has no dates. If case studies have publication dates, use `<time>`.

---

### 9.3 Address Element (for Contact Info)
**Standard:** Contact information should use `<address>` element.

**Expected:**
```html
<address>
  Email: <a href="mailto:hello@ju.com">hello@ju.com</a><br>
  Phone: <a href="tel:+1234567890">+1 (234) 567-8900</a>
</address>
```

**Audit Check:**
- [ ] If contact info is listed, it uses `<address>` element
- [ ] Links inside `<address>` are `<a>` with href

**Note:** `<address>` is semantic; use for contact details only (not postal addresses).

---

### 9.4 Abbreviations (AI, ML, SaaS, etc.)
**Standard:** Abbreviations should use `<abbr>` with `title` attribute (for hover tooltips).

**Expected:**
```html
<p>This <abbr title="User Interface">UI</abbr> design follows modern principles.</p>

<p><abbr title="Artificial Intelligence">AI</abbr>-powered analytics platform.</p>

<p>Our <abbr title="Software as a Service">SaaS</abbr> solution scales easily.</p>
```

**Audit Check:**
- [ ] If abbreviations are used (UI, UX, AI, ML, SaaS), they use `<abbr title="...">`
- [ ] Title expands the abbreviation

**Fix if Missing:**
Wrap abbreviations in `<abbr title="full meaning">`.

---

### 9.5 Code (for Technical Terms)
**Standard:** Code snippets, technical terms, command names should use `<code>`.

**Expected:**
```html
<p>Use the <code>flexbox</code> CSS property for layouts.</p>

<p>Run <code>npm install</code> to install dependencies.</p>

<code>
const greeting = "Hello, world!";
console.log(greeting);
</code>
```

**Audit Check:**
- [ ] Code snippets use `<code>` or `<pre><code>` (pre for preserving whitespace)
- [ ] Technical terms use `<code>` if they're code-related

---

### 9.6 Blockquote (with cite attribute)
**Standard:** Quotes should use `<blockquote>` with optional `cite` attribute.

**Expected:**
```html
<blockquote cite="https://example.com/article">
  <p>This is a meaningful quote from a source.</p>
</blockquote>

<!-- With citation info -->
<blockquote>
  <p>"Great design is invisible."</p>
  <footer>— Don Norman, <cite>The Design of Everyday Things</cite></footer>
</blockquote>
```

**Audit Check:**
- [ ] If testimonials or quotes are displayed, they use `<blockquote>`
- [ ] Blockquote has `cite` attribute (URL of source)

**Note:** Not required if portfolio has no quotes. Use if testimonials or quotes are present.

---

## STEP 10: CROSS-PAGE HTML CONSISTENCY

Since each page is fully self-contained (no templating), verify consistency across all 6 pages.

### 10.1 Header HTML Consistency
**Standard:** All 6 pages should have identical header HTML (copy-pasted from a template).

**Expected:**
All pages have the same header structure:
```html
<header>
  <div class="cursor" aria-hidden="true"></div>
  <div class="cursor-glow" aria-hidden="true"></div>

  <nav aria-label="Main navigation">
    <a href="/">JU.</a>
    <a href="/about.html">About</a>
    <a href="/work.html">Work</a>
    <a href="/process.html">Process</a>
    <a href="/contact.html">Contact</a>
  </nav>
</header>
```

**Audit Check:**
- [ ] index.html header == about.html header == work.html header == process.html header == contact.html header == case-study.html header
- [ ] All nav links are identical
- [ ] All cursor/glow elements are identical
- [ ] No variations or typos

**How to Verify:**
1. Extract header HTML from each page
2. Compare using diff tool (e.g., VS Code Compare, online diff)
3. Ensure all are identical (character-for-character)

**If Inconsistent:**
Update all pages to use identical header HTML.

---

### 10.2 Footer HTML Consistency
**Standard:** All 6 pages should have identical footer HTML.

**Expected:**
All pages have the same footer structure:
```html
<footer>
  <nav aria-label="Footer navigation">
    <a href="/privacy.html">Privacy Policy</a>
    <a href="/terms.html">Terms of Service</a>
  </nav>

  <p>&copy; 2025 JU. All rights reserved.</p>

  <p>Designed and developed by <a href="/">JU.</a></p>

  <div class="social-links">
    <a href="https://github.com/ju" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <svg aria-hidden="true"><!-- GitHub icon --></svg>
    </a>
    <a href="https://dribbble.com/ju" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
      <svg aria-hidden="true"><!-- Dribbble icon --></svg>
    </a>
  </div>
</footer>
```

**Audit Check:**
- [ ] All 6 pages have identical footer HTML
- [ ] No variations in copyright text, links, or structure
- [ ] All social links are identical

**If Inconsistent:**
Update all pages to use identical footer HTML.

---

### 10.3 Cursor/Background Layers Consistency
**Standard:** All 6 pages should have identical decorative element HTML (cursor, plasma, grain, vignette, canvas).

**Expected:**
All pages have the same background/decorative structure:
```html
<body>
  <div class="cursor" aria-hidden="true"></div>
  <div class="cursor-glow" aria-hidden="true"></div>

  <div class="plasma-background" aria-hidden="true"></div>
  <div class="grain-overlay" aria-hidden="true"></div>
  <div class="vignette-overlay" aria-hidden="true"></div>

  <canvas id="particle-canvas" aria-hidden="true"></canvas>

  <!-- header, main, footer -->
</body>
```

**Audit Check:**
- [ ] All decorative elements are present on all 6 pages
- [ ] All have matching `aria-hidden="true"`
- [ ] Order and positioning are identical

**If Inconsistent:**
Standardize decorative elements across all pages.

---

### 10.4 Inconsistent HTML Patterns
**Standard:** Common patterns (section structure, article layout, form structure) should be consistent.

**Examples of Patterns:**

| Pattern | Where Used | Expected Structure |
|---------|-----------|-------------------|
| Project Card | work.html | `<article><h2>...</h2><figure>...</figure><p>...</p><a>...</a></article>` |
| Section Heading | All pages | `<section><h2>Title</h2>...content...</section>` |
| Process Step | process.html | `<li><strong>Step Name</strong>: Description</li>` |
| Form | contact.html | `<form><label><input></label>...<button type="submit"></button></form>` |

**Audit Check:**
- [ ] All project cards on work.html use identical `<article>` structure
- [ ] All sections use consistent naming and structure
- [ ] Process steps use consistent formatting
- [ ] Form markup matches best practices

**If Inconsistent:**
Standardize markup patterns across similar content.

---

## SUMMARY CHECKLIST

Use this checklist to verify all audit steps:

### ✅ Step 1: Document Structure
- [ ] All 6 pages have `<!DOCTYPE html>`
- [ ] All pages have `<html lang="en">`
- [ ] All pages have `<meta charset="UTF-8">`
- [ ] All pages have viewport meta tag
- [ ] All pages have unique, descriptive `<title>`
- [ ] All pages have unique meta description
- [ ] All pages have Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] All pages have favicon links
- [ ] All pages have preconnect hints (if using Google Fonts)
- [ ] All pages link to `/styles.css`
- [ ] All pages link to `/main.js` with `defer`

### ✅ Step 2: Semantic HTML Elements
- [ ] All pages have `<header>` wrapping logo/nav
- [ ] All pages have `<nav aria-label="...">` for navigation
- [ ] All pages have exactly ONE `<main>` element
- [ ] All pages have `<footer>`
- [ ] All pages use `<section>` with accessible names
- [ ] Project cards/case studies use `<article>`
- [ ] No unnecessary "div soup"
- [ ] Skills/lists use `<ul>` or `<ol>`
- [ ] Images with captions use `<figure>/<figcaption>`

### ✅ Step 3: Heading Hierarchy
- [ ] All pages have exactly ONE `<h1>`
- [ ] All pages follow sequential heading hierarchy (no skips)
- [ ] All headings are descriptive (not generic)
- [ ] No text styled as headings but not using heading tags
- [ ] No heading tags used just for styling

### ✅ Step 4: Link & Button Semantics
- [ ] Navigation uses `<a href="...">`
- [ ] Actions use `<button>` (not `<div onclick>`)
- [ ] No `<div>` or `<span>` with click handlers
- [ ] All links have descriptive text
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] Icon-only links have `aria-label`
- [ ] Mailto and tel links are properly formatted

### ✅ Step 5: Form Semantics (contact.html)
- [ ] Form wrapped in `<form action="..." method="POST">`
- [ ] All inputs have associated `<label for="...">"`
- [ ] Required fields have `required` and `aria-required="true"`
- [ ] Input types are correct (email, tel, url)
- [ ] Inputs have `autocomplete` attributes
- [ ] Form has `<button type="submit">`
- [ ] Grouped controls use `<fieldset>/<legend>` (if applicable)

### ✅ Step 6: Image Semantics
- [ ] All images have `alt` attributes
- [ ] Content images have descriptive alt text
- [ ] Decorative images have `alt="" aria-hidden="true"`
- [ ] SVG icons have `aria-hidden="true"` or `role="img" aria-label="..."`
- [ ] Images with captions use `<figure>/<figcaption>`

### ✅ Step 7: Decorative Elements
- [ ] Cursor/glow elements have `aria-hidden="true"`
- [ ] Plasma/grain/vignette layers have `aria-hidden="true"`
- [ ] Canvas elements have `aria-hidden="true"`
- [ ] CSS has `pointer-events: none` for decorative elements

### ✅ Step 8: HTML Validation
- [ ] All 6 pages pass W3C HTML Validator (0 errors)
- [ ] No unclosed or improperly nested tags
- [ ] No deprecated elements or attributes
- [ ] No duplicate IDs on same page
- [ ] Proper nesting of all elements

### ✅ Step 9: Content Markup Quality
- [ ] Semantic emphasis uses `<strong>` and `<em>`
- [ ] Dates use `<time datetime="...">`
- [ ] Contact info uses `<address>`
- [ ] Abbreviations use `<abbr title="...">`
- [ ] Code uses `<code>` or `<pre><code>`
- [ ] Quotes use `<blockquote>`

### ✅ Step 10: Cross-Page Consistency
- [ ] Header HTML is identical on all 6 pages
- [ ] Footer HTML is identical on all 6 pages
- [ ] Cursor/background layer HTML is identical on all 6 pages
- [ ] Common markup patterns are consistent

---

## EXAMPLES OF CORRECT HTML STRUCTURES

### Correct index.html Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JU. — Digital Architect & Product Designer</title>
  <meta name="description" content="JU. is a digital architect specializing in product design and web development. View my portfolio and case studies.">

  <meta property="og:title" content="JU. — Digital Architect & Product Designer">
  <meta property="og:description" content="JU. is a digital architect specializing in product design and web development.">
  <meta property="og:image" content="https://ju-sand.vercel.app/og-image.png">
  <meta property="og:url" content="https://ju-sand.vercel.app/">
  <meta property="og:type" content="website">

  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="cursor" aria-hidden="true"></div>
  <div class="cursor-glow" aria-hidden="true"></div>

  <div class="plasma-background" aria-hidden="true"></div>
  <div class="grain-overlay" aria-hidden="true"></div>
  <div class="vignette-overlay" aria-hidden="true"></div>

  <canvas id="particle-canvas" aria-hidden="true"></canvas>

  <header>
    <nav aria-label="Main navigation">
      <a href="/">JU.</a>
      <a href="/about.html">About</a>
      <a href="/work.html">Work</a>
      <a href="/process.html">Process</a>
      <a href="/contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h1>JU. — Digital Architect</h1>
      <p>Designing and building elegant digital products.</p>
    </section>

    <section>
      <h2>Featured Work</h2>
      <article>
        <h3>Project Title</h3>
        <figure>
          <img src="/project-image.jpg" alt="Project interface showing dashboard">
          <figcaption>Project screenshot</figcaption>
        </figure>
        <p>Project description</p>
        <a href="/case-study.html">Read case study →</a>
      </article>
    </section>
  </main>

  <footer>
    <nav aria-label="Footer navigation">
      <a href="/privacy.html">Privacy</a>
      <a href="/terms.html">Terms</a>
    </nav>
    <p>&copy; 2025 JU. All rights reserved.</p>
  </footer>

  <script defer src="/main.js"></script>
</body>
</html>
```

### Correct contact.html Form
```html
<main>
  <h1>Get In Touch</h1>

  <form id="contact-form" action="/api/contact" method="POST">
    <label for="name">Full Name *</label>
    <input
      id="name"
      type="text"
      name="name"
      required
      aria-required="true"
      autocomplete="name"
    >

    <label for="email">Email Address *</label>
    <input
      id="email"
      type="email"
      name="email"
      required
      aria-required="true"
      autocomplete="email"
    >

    <label for="phone">Phone (Optional)</label>
    <input
      id="phone"
      type="tel"
      name="phone"
      autocomplete="tel"
    >

    <label for="message">Message *</label>
    <textarea
      id="message"
      name="message"
      required
      aria-required="true"
      rows="6"
    ></textarea>

    <button type="submit">Send Message</button>
  </form>
</main>
```

---

## FIXING PRIORITY

1. **Critical (Must Fix):**
   - Missing DOCTYPE
   - Missing `<meta charset>`
   - Multiple `<h1>` tags or none
   - Heading hierarchy skips
   - Unclosed tags / improper nesting
   - Form inputs without labels
   - Images without alt attributes
   - W3C HTML validation errors

2. **High (Should Fix):**
   - Missing semantic elements (header, nav, main, footer)
   - "Div soup" (semantic elements replaced with divs)
   - Links without descriptive text
   - No `aria-label` on icon-only links
   - Missing Open Graph tags
   - Inconsistent header/footer across pages
   - Duplicate IDs

3. **Medium (Nice to Have):**
   - Missing `aria-label` on sections
   - Generic or missing page titles/descriptions
   - Missing preconnect hints
   - Missing abbreviation markup
   - Missing `<time>` elements

4. **Low (Polish):**
   - Generic alt text (could be more descriptive)
   - Missing `autocomplete` attributes
   - Missing `<figure>/<figcaption>` (if captions exist)

---

## TOOLS & RESOURCES

**Validation:**
- [W3C HTML Validator](https://validator.w3.org/)
- [HTML Validator Browser Extension](https://chrome.google.com/webstore/detail/html-validator)

**ARIA & Accessibility:**
- [MDN ARIA Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [W3C ARIA Specification](https://www.w3.org/TR/wai-aria-1.2/)
- [WebAIM ARIA Article](https://webaim.org/articles/aria/)

**Semantic HTML:**
- [MDN HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [W3C HTML Specification](https://html.spec.whatwg.org/)

**Accessibility Testing:**
- [NVDA Screen Reader (Free)](https://www.nvaccess.org/)
- [JAWS Screen Reader](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver (Built-in on Mac/iOS)](https://www.apple.com/voiceover/)

**SEO:**
- [Google Search Central - HTML Improvements](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Open Graph Documentation](https://ogp.me/)

---

**Audit Complete.** Follow this guide to ensure your JU. portfolio has excellent HTML semantics, accessibility, and SEO.
