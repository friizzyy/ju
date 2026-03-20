# Deployment & Hosting Audit: JU. — Digital Architect

**Portfolio:** ju-sand.vercel.app
**Stack:** Vanilla HTML/CSS/JS (no frameworks, no build tools)
**Hosting:** Vercel static deployment
**Target:** 6 HTML pages, 2,100-line styles.css, 780-line main.js
**Theme:** Dark premium with glass morphism effects

---

## STEP 1: VERCEL CONFIGURATION

### Project Files Verification
- [ ] `vercel.json` exists and is properly configured
- [ ] Repository root contains only necessary deployment files
- [ ] `.vercelignore` excludes build artifacts and non-essential files

### Vercel.json Structure
Verify `vercel.json` contains:

```json
{
  "builds": [
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*\\..*)",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**Checklist:**
- [ ] Routes are configured for SPA behavior or static routing
- [ ] Trailing slash handling is consistent (preferably enabled)
- [ ] Clean URLs enabled (users don't see `.html` extension)
- [ ] 404 page routing is configured

### Security Headers
Verify all security headers are configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; connect-src 'self'"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

**Header Verification:**
- [ ] Content-Security-Policy is restrictive but allows required resources
- [ ] X-Frame-Options prevents clickjacking
- [ ] X-Content-Type-Options prevents MIME sniffing
- [ ] HSTS is enabled (max-age ≥31536000 seconds)
- [ ] Referrer-Policy limits referrer exposure
- [ ] Permissions-Policy denies unnecessary browser APIs

### Caching Configuration
- [ ] Cache-Control headers set for static assets (CSS, JS, images)
- [ ] CSS/JS files have versioning or hash-based cache busting (if applicable)
- [ ] HTML files use `Cache-Control: no-cache` or `max-age=0` for fresh headers
- [ ] Font files cached aggressively (1 year)
- [ ] Images cached for appropriate duration (1 month–1 year)

Example caching strategy:
```json
{
  "headers": [
    {
      "source": "/styles\\.css",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/main\\.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*\\.html)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ]
}
```

- [ ] Cache strategy documented and consistent

### Clean URLs Configuration
- [ ] `/portfolio` serves `/portfolio.html` without extension in URL bar
- [ ] `/work` serves `/work.html` correctly
- [ ] `/case-studies` serves `/case-studies.html` correctly
- [ ] Direct .html requests redirect or serve transparently
- [ ] No double-extension issues (.html.html)

---

## STEP 2: STATIC ASSET OPTIMIZATION

### File Compression
Vercel automatically handles compression (gzip/brotli) for static assets. Verify:

- [ ] CSS files are minified or serve efficiently
- [ ] JavaScript files are minified or serve efficiently
- [ ] HTML files serve with appropriate compression
- [ ] No unnecessary whitespace in HTML/CSS/JS

### Asset Size Audit
Test each page's resource sizes:

```
Expected page load budgets (total per page):
- HTML: < 50 KB
- CSS: < 150 KB (shared across all pages)
- JavaScript: < 200 KB (shared across all pages)
- Fonts: < 100 KB total
- Images (per page): < 200 KB
```

**Checklist:**
- [ ] styles.css is under 150 KB
- [ ] main.js is under 200 KB
- [ ] Each HTML file is under 50 KB (excluding shared assets)
- [ ] Total page weight (all assets) under 400 KB per page
- [ ] No unnecessary CSS or JavaScript loaded on every page

### Font Optimization
- [ ] Web fonts are self-hosted (not Google Fonts CDN for performance)
- [ ] Font files use WOFF2 format (modern browsers only)
- [ ] Font preloading configured in HTML: `<link rel="preload" as="font">`
- [ ] Font display strategy uses `font-display: swap`
- [ ] No layout shift during font loading (FOUT minimized)
- [ ] Font subsetting performed (only characters used are included)

### Image Optimization
- [ ] All images are compressed (no unoptimized PNGs/JPGs)
- [ ] SVG files are used where appropriate (icons, logos)
- [ ] Images scaled to viewport dimensions (no oversized files)
- [ ] WebP format considered for modern browsers (with fallback)
- [ ] No images with dimensions > 2x actual display size

### CSS & JS Organization
- [ ] styles.css is a single centralized file (no scattered style blocks)
- [ ] main.js is a single centralized file (no scattered script blocks)
- [ ] No inline styles in HTML (use classes instead)
- [ ] No critical CSS missing from `<head>` (above-the-fold content)

### Deployment Files Verification
Files that should be deployed:
- [ ] `index.html`
- [ ] `portfolio.html`, `work.html`, `case-studies.html` (and all other page files)
- [ ] `styles.css`
- [ ] `main.js`
- [ ] `favicon.ico`
- [ ] `robots.txt`
- [ ] `sitemap.xml`
- [ ] Assets folder (fonts, images, icons)
- [ ] `404.html` (custom error page)
- [ ] `.well-known/` files if applicable (SSL verification, etc.)

Files that should NOT be deployed:
- [ ] `.git/`, `.gitignore`, `.github/`
- [ ] `node_modules/` (not applicable for vanilla setup)
- [ ] `package.json`, `package-lock.json` (not applicable)
- [ ] `.DS_Store`, `.env`, `.env.local`
- [ ] Source maps (*.map files)
- [ ] Development config files
- [ ] `README.md`, `LICENSE`, `CHANGELOG.md` (optional, usually excluded)

---

## STEP 3: DOMAIN & SSL

### HTTPS Enforcement
- [ ] All traffic redirects from HTTP to HTTPS (Vercel handles by default)
- [ ] SSL certificate is valid and auto-renewed
- [ ] Mixed content warnings don't appear (no http:// resources)
- [ ] HSTS header forces HTTPS on return visits

### Custom Domain Configuration
If using `ju-sand.vercel.app`:
- [ ] Domain is verified in Vercel project settings
- [ ] DNS records point to Vercel (CNAME or A records)
- [ ] SSL certificate is issued and valid
- [ ] Domain works over HTTPS

If using custom domain (e.g., `ju.com`):
- [ ] Domain registered and configured in Vercel
- [ ] DNS records updated (CNAME to vercel.com)
- [ ] SSL certificate auto-provisioned (automatic with Vercel)
- [ ] Both www and non-www resolve correctly

### Subdomain Handling
- [ ] Redirect strategy: `www.example.com` → `example.com` (or vice versa, be consistent)
- [ ] Redirect implemented in `vercel.json` or DNS
- [ ] No mixed content between www and non-www versions

Example redirect in vercel.json:
```json
{
  "redirects": [
    {
      "source": "/www/:path*",
      "destination": "/:path*",
      "statusCode": 301
    }
  ]
}
```

- [ ] Sitemap and robots.txt reference canonical domain
- [ ] All internal links use canonical URL (no www mixing)

### Certificate Validation
- [ ] SSL certificate shows in browser address bar (green lock)
- [ ] Certificate is valid for the domain and subdomains
- [ ] No SSL certificate warnings or errors
- [ ] Certificate auto-renewal is enabled (Vercel default)

---

## STEP 4: ERROR HANDLING

### 404 Page
- [ ] Custom 404.html exists in project root
- [ ] 404 page matches portfolio design and branding
- [ ] 404 page includes helpful navigation (home link, search, sitemap)
- [ ] 404 page is responsive and accessible
- [ ] 404 page loads with correct HTTP 404 status code

Example 404.html structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Not Found — JU.</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="dark-theme">
  <!-- Include header, background effects, main content -->
  <main>
    <h1>404: Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/" class="btn btn-primary">Back to Home</a>
  </main>
  <!-- Include footer -->
  <script src="/main.js"></script>
</body>
</html>
```

- [ ] 404.html uses shared styles.css and main.js
- [ ] 404 page displays without layout issues
- [ ] Vercel recognizes 404.html automatically

### Other Error Pages
- [ ] 500 error handling (Vercel provides default, custom optional)
- [ ] 502/503 error handling (server errors, Vercel handles)
- [ ] Maintenance page strategy (if applicable for updates)

### Broken Link Detection
- [ ] No 404s in internal navigation (all links point to valid pages)
- [ ] No external links are broken (periodically audit)
- [ ] Relative links are correct (no ../../../ issues)
- [ ] Anchor links to page sections exist and work

Tools for validation:
- [ ] Use Lighthouse "SEO" audit to catch broken links
- [ ] Manual testing of all header navigation links
- [ ] Manual testing of footer navigation links
- [ ] Check case sensitivity (URLs are case-sensitive on Linux servers)

---

## STEP 5: MONITORING & ANALYTICS

### Vercel Analytics (Web Vitals)
- [ ] Vercel Analytics enabled in project settings
- [ ] Core Web Vitals tracked (LCP, FID, CLS)
- [ ] Real User Monitoring (RUM) data available
- [ ] Performance dashboard accessible

**Recommended metrics to monitor:**
- LCP (Largest Contentful Paint): Target < 2.5s
- FID (First Input Delay): Target < 100ms
- CLS (Cumulative Layout Shift): Target < 0.1
- TTFB (Time to First Byte): Target < 600ms

### Google Analytics (Optional but Recommended)
- [ ] Google Analytics 4 property created
- [ ] GA tracking code added to `<head>` of all pages
- [ ] Data collection consent banner implemented (GDPR compliance)
- [ ] Goal tracking configured (contact form submission, etc.)
- [ ] UTM parameters set for marketing campaigns

Example GA setup:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

- [ ] GA doesn't block page rendering (async script)
- [ ] GA tag appears before other scripts
- [ ] Consent banner prevents tracking until user accepts

### Error Tracking (Optional: Sentry Free Tier)
- [ ] Sentry project created (if implementing error tracking)
- [ ] Sentry SDK integrated into main.js
- [ ] JS errors captured and reported
- [ ] Error notifications configured
- [ ] Privacy settings respect user consent

Example Sentry setup:
```javascript
// In main.js
if (window.location.hostname === 'ju-sand.vercel.app') {
  Sentry.init({
    dsn: 'https://[key]@sentry.io/[project-id]',
    environment: 'production',
    tracesSampleRate: 0.1
  });
}
```

- [ ] Sentry doesn't capture sensitive user data
- [ ] Source maps are uploaded (optional, requires build step)
- [ ] Errors are actionable and reported

### Performance Monitoring Tools
- [ ] WebPageTest configured (optional, free tier available)
- [ ] Synthetic monitoring set up (optional: Pingdom, UptimeRobot)
- [ ] Alert system in place for performance regressions
- [ ] Dashboard accessible to team/stakeholders

---

## STEP 6: ENVIRONMENT MANAGEMENT

### Secrets & Credentials
- [ ] No API keys in deployed code
- [ ] No auth tokens in HTML/CSS/JS
- [ ] No database credentials in client-side code
- [ ] No private emails or contact info in code

**Specific checks:**
- [ ] Grep for "password", "secret", "token", "key", "api_key"
- [ ] No hardcoded Google Analytics IDs (use Vercel env vars if dynamic)
- [ ] No hardcoded Sentry DSN (use env vars if required)
- [ ] No comment lines containing credentials

### .gitignore Configuration
Verify `.gitignore` excludes:
```
node_modules/
.env
.env.local
.env.*.local
.DS_Store
*.log
dist/
build/
.cache/
.next/
out/
.vercel/
```

- [ ] .gitignore is comprehensive and current
- [ ] Sensitive files are never committed

### Repository Structure
- [ ] Only necessary files committed to repository
- [ ] Public directory (if used) contains final assets
- [ ] No build artifacts in version control
- [ ] No large binary files (images should be optimized)
- [ ] Repository .git folder not included in deployment

### Environment Variables (if used)
- [ ] Vercel Environment Variables configured in project settings
- [ ] No .env files committed to repository
- [ ] Environment-specific configs managed through Vercel UI
- [ ] Development and production environments properly separated

Example Vercel env var usage:
```javascript
// In main.js
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.example.com';
```

**Note:** Vanilla JS doesn't have built-in env var support. Use Vercel's build step or hardcode values for static sites.

---

## STEP 7: PRE-LAUNCH CHECKLIST

### HTML Validation
- [ ] W3C HTML validation passes on all 6 pages
  - Use: https://validator.w3.org/
  - Focus on: no stray tags, proper nesting, valid attributes
- [ ] No console errors in browser dev tools
- [ ] All pages render without JavaScript (progressive enhancement)

### Lighthouse Audit
Run Lighthouse on each of the 6 pages (Mobile & Desktop):

**Target Scores (all ≥90):**
- [ ] Performance: ≥90
- [ ] Accessibility: ≥90
- [ ] SEO: ≥90
- [ ] Best Practices: ≥90

**Performance-specific checks:**
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] First Input Delay (FID): < 100ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Total Blocking Time (TBT): < 300ms

**Accessibility checks:**
- [ ] Color contrast ratio ≥4.5:1 for body text
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works on all pages
- [ ] Screen reader announces content correctly
- [ ] Form labels properly associated

**SEO checks:**
- [ ] Meta descriptions present on all pages
- [ ] Page titles are unique and descriptive
- [ ] Viewport meta tag present
- [ ] Structured data (schema.org) implemented (optional but recommended)
- [ ] Internal linking structure is logical

### Broken Link Audit
- [ ] All internal navigation links work
- [ ] All footer links work
- [ ] No 404 errors for internal resources
- [ ] External links are live and valid

**Tools:**
- [ ] Lighthouse SEO audit detects broken links
- [ ] Manual testing of critical paths
- [ ] Crawler tools: Screaming Frog (free tier), Broken Link Checker

### Cross-Browser Testing
Test on real browsers and devices (not just DevTools emulation):

**Desktop:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, macOS)
- [ ] Edge (latest)

**Mobile:**
- [ ] Chrome Android (latest)
- [ ] Safari iOS (iPhone 12/13/14)
- [ ] Samsung Internet (if targeting Android)

**Checks per browser:**
- [ ] Page renders without layout issues
- [ ] Custom cursor works (or gracefully hidden on touch)
- [ ] Animations perform smoothly (60fps)
- [ ] Form inputs and buttons work correctly
- [ ] No console errors or warnings
- [ ] Glass morphism effects render (backdrop-filter support)

### Mobile Device Testing
Test on actual phones (not DevTools only):

**Real devices:**
- [ ] iPhone SE (375px, older iOS)
- [ ] iPhone 12/13/14 (390px, current iOS)
- [ ] Android device (360px–414px)
- [ ] iPad (768px–1024px, if applicable)

**Checks:**
- [ ] Responsive layout works at all sizes
- [ ] Touch targets are adequate (≥44×44px)
- [ ] Mobile menu functions correctly
- [ ] No horizontal overflow
- [ ] Performance is acceptable (no lag, jank)
- [ ] Battery/data usage is reasonable

### Social Sharing Preview
Test on social media platforms:

**Open Graph Tags in `<head>`:**
```html
<meta property="og:title" content="JU. — Digital Architect">
<meta property="og:description" content="Award-winning digital design and architecture.">
<meta property="og:image" content="https://ju-sand.vercel.app/og-image.jpg">
<meta property="og:url" content="https://ju-sand.vercel.app/">
<meta property="og:type" content="website">
```

**Twitter Card Tags:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="JU. — Digital Architect">
<meta name="twitter:description" content="Award-winning digital design and architecture.">
<meta name="twitter:image" content="https://ju-sand.vercel.app/og-image.jpg">
```

- [ ] All pages have og:title, og:description, og:image, og:url
- [ ] OG image is 1200×630px (recommended)
- [ ] Image preview works on Facebook, Twitter, LinkedIn
- [ ] Fallback image is used for case study pages

**Testing tools:**
- [ ] Facebook Sharing Debugger
- [ ] Twitter Card Validator
- [ ] LinkedIn Post Inspector

### Robots.txt Configuration
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://ju-sand.vercel.app/sitemap.xml
```

- [ ] robots.txt exists at `/robots.txt`
- [ ] Allows crawling of public pages
- [ ] Disallows admin/private pages (if applicable)
- [ ] Sitemap URL is correct

### Sitemap.xml Generation
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ju-sand.vercel.app/</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ju-sand.vercel.app/portfolio.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Additional pages -->
</urlset>
```

- [ ] sitemap.xml exists at `/sitemap.xml`
- [ ] All 6 pages are listed
- [ ] URLs are absolute (not relative)
- [ ] lastmod dates are accurate
- [ ] changefreq and priority are realistic

**Validation:**
- [ ] Sitemap validates against schema
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

### Favicon Configuration
- [ ] favicon.ico exists in root directory
- [ ] favicon.png exists (preferred format, 192×192px minimum)
- [ ] Favicon references in HTML:
  ```html
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  ```

- [ ] favicon displays correctly in browser tabs
- [ ] apple-touch-icon displays on iOS home screen
- [ ] manifest.json configured (web app manifest, optional)

### SSL/TLS Certificate
- [ ] HTTPS enabled on all pages
- [ ] No mixed content warnings (all resources loaded over HTTPS)
- [ ] SSL certificate is valid and not expired
- [ ] HSTS header is configured (Strict-Transport-Security)

**Checks:**
- [ ] Browser shows green lock icon
- [ ] Certificate details are correct (domain, issuer, expiry)
- [ ] Certificate chain is complete
- [ ] HSTS preload list submission (optional, for enhanced security)

---

## STEP 8: POST-LAUNCH MONITORING

### Uptime Monitoring
- [ ] Uptime monitoring service configured (e.g., UptimeRobot free tier)
- [ ] Alerts configured for downtime
- [ ] Status page (optional): https://status.ju-sand.vercel.app

### Analytics Review Schedule
- [ ] Daily: Check error tracking (Sentry/console errors)
- [ ] Weekly: Review Vercel Analytics (Web Vitals trends)
- [ ] Monthly: Full performance audit, user behavior analysis
- [ ] Quarterly: Deep-dive on conversion funnel and user paths

### Update Schedule
- [ ] Content updates: As needed (case studies, portfolio items)
- [ ] Security patches: Within 24–48 hours of release
- [ ] Dependencies: Monitor for breaking changes (if any external services)
- [ ] Vercel platform: Automatic (no action needed)

### Feedback & Improvement Loop
- [ ] User feedback collection mechanism (contact form, email signup)
- [ ] Performance degradation alerts
- [ ] Error rate monitoring and resolution
- [ ] Quarterly review of analytics data for optimization opportunities

---

## SUCCESS CRITERIA

✅ **Vercel configuration complete with security headers**
✅ **All assets optimized and under file size budgets**
✅ **HTTPS enforced with valid SSL certificate**
✅ **Custom 404 page implemented and working**
✅ **Core Web Vitals all green (LCP < 2.5s, CLS < 0.1)**
✅ **Lighthouse scores ≥90 across all categories**
✅ **All 6 pages pass W3C HTML validation**
✅ **Zero broken links (internal and external)**
✅ **Cross-browser testing passes (Chrome, Firefox, Safari, Edge)**
✅ **Mobile testing passes (iOS, Android, tablet sizes)**
✅ **Social sharing previews work correctly**
✅ **robots.txt and sitemap.xml in place**
✅ **Favicon displays correctly**
✅ **No sensitive data in deployed code**
✅ **Error tracking and analytics operational**
✅ **Monitoring and alerting configured**

---

## DEPLOYMENT COMMANDS (Vercel CLI)

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to production
vercel --prod

# View deployment status
vercel list

# Check deployment logs
vercel logs

# View project settings
vercel projects
```

For this vanilla HTML/CSS/JS project, Vercel automatically detects it as a static site and deploys with zero configuration.

---

## TROUBLESHOOTING COMMON ISSUES

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 errors on page reload | SPA routing misconfigured | Add catch-all route in vercel.json |
| CSS not loading on subpages | Incorrect CSS path | Use root-relative paths: `/styles.css` |
| Mixed content warnings | HTTP resources on HTTPS page | Replace all `http://` with `https://` |
| Slow LCP score | Large hero image | Optimize and preload critical images |
| CLS issues | Layout shift during font load | Use `font-display: swap` and reserve space |
| Mobile menu doesn't work | JavaScript not loading | Check JS file paths and async/defer attributes |
| Favicon not showing | Wrong path or format | Use `/favicon.ico` in root directory |
| Analytics not recording | Tracking code removed | Re-add GA script to all pages |

---

## ADDITIONAL RESOURCES

- Vercel Documentation: https://vercel.com/docs
- Web Vitals Guide: https://web.dev/vitals/
- HTML Validation: https://validator.w3.org/
- Lighthouse: Chrome DevTools → Lighthouse tab
- SEO Checklist: https://web.dev/lighthouse-seo/
- Accessibility: https://www.w3.org/WAI/WCAG21/quickref/
