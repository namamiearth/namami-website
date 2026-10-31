# NamamiEarth website

Static, dependency-free marketing and catalogue site for [namamiearth.com](https://namamiearth.com). Every item is ordered or enquired about on WhatsApp.

## Structure
```
index.html       Home: hero, featured hampers, categories, gifting, about, contact
products.html    Filterable catalogue (all / hampers / dry fruits / custom)
styles.css       Design tokens and components (green and light theme)
script.js        Catalogue data, WhatsApp links, menu, enquiry form
robots.txt, sitemap.xml, CNAME, .nojekyll
assets/images/   logo.svg, favicon.svg
```

## Edit
- **Products and prices:** the `PRODUCTS` array at the top of `script.js`. Items without a `price` show "Price on request".
- **WhatsApp number:** `NUMBER` in `script.js`, plus the `917042385828` links in the two HTML files.
- **Colours and fonts:** `:root` tokens at the top of `styles.css`.

## Deploy to GitHub Pages
1. Push this folder to a repo (`git init`, `git add .`, `git commit`, `git push`).
2. Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`.
3. Custom domain: the `CNAME` file holds `namamiearth.com`. Add the four GitHub `A` records (185.199.108.153 to 185.199.111.153) and a `www` CNAME at your DNS provider, then enable Enforce HTTPS.

## Before launch
- Add `assets/images/og-image.png` (1200x630) and an `og:image` meta tag for social previews.
- Add real product photos if you want them; the cards use drawn illustrations for now.
- Review the testimonial and offer wording.
