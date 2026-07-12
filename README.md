# Ré Jewels — Wholesale Website

A production-ready, single-page static website for **Ré Jewels** (RE Jewels Pvt. Ltd.),
a Mumbai-based manufacturer, exporter and supplier of fine diamond and gemstone
jewellery for wholesale buyers.

Plain HTML / CSS / JS — **no build step, no framework**. Deploys as-is to any static host.

## Structure

```
index.html            Main single-page site
privacy.html          Privacy policy (placeholder — see TODO)
terms.html            Terms of use (placeholder — see TODO)
conflict-free.html    Conflict-free policy (placeholder — see TODO)
styles.css            All styling (ivory / gold / Cormorant look, baked in)
app.js                Interactivity: mega menu, mobile menu, catalogue
                      galleries + lightbox, scroll reveal, hero slideshow,
                      form validation + Formspree submission
robots.txt            Allows all crawlers; points to the sitemap
sitemap.xml           Lists the four pages
assets/               Logos, IGI logo, favicons, and catalogue/ (product photos)
Heading Update/       ORIGINAL design prototype — kept as source/reference,
                      not part of the deployed site
```

## Run locally

From the repo root, serve the folder over HTTP (opening `index.html` via `file://`
will break `fetch()` and some browsers' asset loading):

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed URL (e.g. http://localhost:3000 or http://localhost:8000).

## Deploy (Netlify)

This is a static site with no build, so deployment is a drag-and-drop or a Git connect.

**Option A — drag & drop**
1. Sign in at https://app.netlify.com
2. Go to **Sites → Add new site → Deploy manually**
3. Drag the **repo root folder** (the one containing `index.html`) onto the drop zone
4. Netlify serves it immediately at a `*.netlify.app` URL; add a custom domain under
   **Domain settings** when ready.

**Option B — Git (auto-deploy on push)**
1. Push this repo to GitHub/GitLab
2. In Netlify: **Add new site → Import an existing project**, pick the repo
3. Build command: *(leave empty)* · Publish directory: `.` (the repo root)
4. Deploy. Every push to the main branch redeploys.

> Vercel works the same way: `vercel` / import the repo, no build command, output = root.

---

## ⚠️ TODO before going live

These require real credentials / content from the business owner and are **flagged in
code** where they live:

1. **Formspree endpoint (enquiry form)** — *required for the contact form to work.*
   The form currently posts to a placeholder.
   - Create a form at https://formspree.io that delivers to **adj@rejewels.com**
   - Copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`)
   - In `index.html`, replace `YOUR_FORM_ID` in the `<form id="enquiryForm" action="…">`
     tag with the real ID.
   - Until then, validation works but submission shows the inline error state.
   - Test end-to-end afterwards: submit the form and confirm the email arrives at
     adj@rejewels.com.

2. **Social profile links** — footer Facebook / Instagram / LinkedIn icons currently
   point to `#` (flagged with an HTML comment in the footer of `index.html`).
   Replace the three `href="#"` values with the real profile URLs.

3. **Legal pages** — `privacy.html`, `terms.html`, `conflict-free.html` are honest,
   consistently-styled **placeholders** marked "pending review". Have them reviewed and
   finalised by legal counsel, then remove the yellow draft banner from each.

4. **Domain in metadata** — canonical URL, Open Graph / Twitter image URLs
   (`index.html` `<head>`), `robots.txt` and `sitemap.xml` all assume
   `https://www.rejewels.com/`. Update those if the site ships on a different host.

## Notes

- **Design is locked to one look** (surface: *ivory*, metal: *gold*, headline font:
  *Cormorant Garamond*). The prototype's dev-only style-switcher tooling
  (`tweaks.css` / `tweaks.js` / `tweaks-panel.jsx`) has been removed and those choices
  baked permanently into `styles.css`.
- Three catalogue categories (**Pendant Sets, Pendants, Tanmani**) have no photography
  yet; the site renders a graceful "— add photography / Enquire" placeholder card for
  them automatically. Drop images named e.g. `assets/catalogue/pendants-1.jpg` and wire
  them into the `CAT_IMGS` map in `app.js` to activate them.
- Catalogue images were re-compressed (quality ~80) for faster loading; originals remain
  untouched in `Heading Update/assets/catalogue/`.
#for ayush to review 