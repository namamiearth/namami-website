# NamamiEarth website

Fast, accessible, static marketing and catalogue site for [namamiearth.com](https://namamiearth.com). Plain files (no build step, no framework, no package manager), so it deploys as-is to GitHub Pages. Every product is ordered or enquired about on WhatsApp.

## Repository structure
```
namamiearth-website/
├── index.html              Home: hero, hampers, how ordering works, categories, gifting, FAQ, about, contact
├── products.html           Filterable catalogue (all / hampers / dry fruits / custom), server-rendered cards
├── 404.html                Branded not-found page (noindex)
├── styles.css              Design tokens, components, responsive rules, @font-face
├── script.js               Menu, header shadow, product filter, WhatsApp enquiry form, year
├── manifest.webmanifest    Web app manifest (icons, theme colour)
├── robots.txt              Crawl rules + sitemap pointer
├── sitemap.xml             Both pages with lastmod and priority
├── CNAME                   Custom domain for GitHub Pages (namamiearth.com)
├── .nojekyll               Serve files as-is
└── assets/
    ├── fonts/              Figtree + Young Serif (woff2, self-hosted) and OFL licences
    └── images/             logo.svg, favicon.svg, apple-touch-icon.png, icon-192.png,
                            icon-512.png, og-image.png (1200x630)
```

## SEO and structured data
- **Titles** (54 and 55 characters) and **meta descriptions** (143 and 137 characters), unique per page.
- **Canonical** and `hreflang` (`en-IN`, `x-default`) on every page; `robots` with `max-image-preview:large`; `author` and `publisher`.
- **Open Graph** (`og:image` with width, height and alt, `og:locale` `en_IN`) and **Twitter/X** `summary_large_image` cards.
- **JSON-LD (`@graph`):**
  - Home: `Organization` (logo, contact point, telephone, email, address, `knowsAbout`), `WebSite`, and `FAQPage` matching the visible FAQ.
  - Products: `BreadcrumbList`, `CollectionPage` with an `ItemList` of `Product` entries. The three hampers include `Offer` prices in INR.
- **Server-rendered product cards:** the catalogue is real HTML, not built by JavaScript, so crawlers and no-JS visitors see every product. JS only filters.
- **Performance:** self-hosted fonts with `font-display: swap` and preloads, no images on the critical path, `content-visibility: auto` on sections, deferred script.
- **Accessibility:** skip link, focus rings, `aria-current`, `aria-expanded` on the menu, filtering with the native `hidden` attribute, `prefers-reduced-motion`.

After launch, validate with Google's [Rich Results Test](https://search.google.com/test/rich-results), the [Schema Markup Validator](https://validator.schema.org/) and the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), then submit `https://namamiearth.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Customise
| To change | Edit |
|---|---|
| Colours, fonts, widths | `:root` tokens at the top of `styles.css` |
| WhatsApp number | `NUMBER` in `script.js`, and `918295950901` in the HTML files and JSON-LD |
| Email | search `sales@namamiearth.com` in `index.html` and `products.html` |
| Products and prices | the product cards in `products.html` and the three hamper cards in `index.html`, plus the `Product` JSON-LD in `products.html` |
| Social card | replace `assets/images/og-image.png` (keep 1200x630) |
| Sitemap date | `<lastmod>` in `sitemap.xml` |

## Deploy to GitHub Pages
1. Push the folder to a GitHub repo: `git init`, `git add .`, `git commit -m "NamamiEarth website"`, `git branch -M main`, `git remote add origin <url>`, `git push -u origin main`.
2. Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`.
3. DNS for `namamiearth.com`: four `A` records for `@` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `CNAME` for `www` pointing to `<your-username>.github.io`. Then tick **Enforce HTTPS**.

## Pre-launch checklist
- Confirm `sales@namamiearth.com` receives mail and the WhatsApp number is correct.
- Replace the testimonial with a quote you have permission to use.
- Add product photos if you want them (the cards use drawn illustrations).
- Add real social profile URLs to the JSON-LD `sameAs` array and the footer.
- Add a postal address and opening hours to the JSON-LD if you want them published.
- Run Lighthouse (Performance, Accessibility, SEO) on the live site.

## Credits
Fonts: Figtree and Young Serif, SIL Open Font License 1.1 (see `assets/fonts/`). Copyright (c) NamamiEarth.
