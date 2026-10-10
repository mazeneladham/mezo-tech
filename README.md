# MEZO TECH — personal portfolio & technology blog

Bilingual (English `/` + Arabic `/ar/`, real RTL), static, and free to host on GitHub Pages.
Built with **Astro 7**, TypeScript, plain CSS and a few small scripts. No UI framework, database, backend, analytics or paid service.

- Pages: Home, About, Projects (+ detail), Blog (+ articles), Learning, Resume, Contact, Search, 404 — all in EN and AR
- Dark/light theme (follows the OS on first visit, remembered afterwards, no flash)
- Client-side search and category/tag filtering, RSS per language, sitemap with accurate `hreflang`
- Content is Markdown + one config file — see **[docs/AUTHORING.md](docs/AUTHORING.md)**

## Quick start

Requires Node.js 22.12+ (`.nvmrc` pins 22).

```bash
npm install
npm run dev        # http://localhost:4321  (drafts are visible only here)
npm run check      # Astro/TypeScript checks
npm run build      # production build -> dist/
npm run validate   # checks dist/: broken links, hreflang, sitemap, drafts, placeholders
npm run preview    # serve the production build locally
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. (The first deployment fails until you do this once.)
3. Push to `main`. `.github/workflows/deploy.yml` installs, checks, builds, validates and deploys.

The workflow detects the URL automatically:

| Repository name | Site URL | Base path |
| --- | --- | --- |
| `USERNAME.github.io` | `https://USERNAME.github.io/` | `/` |
| anything else, e.g. `mezo-tech` | `https://USERNAME.github.io/mezo-tech/` | `/mezo-tech` |

Override it (e.g. for a custom domain) with **Settings → Secrets and variables → Actions → Variables**: `SITE_URL` (origin only) and `BASE_PATH`.
Locally: `SITE_URL=https://alice.github.io BASE_PATH=/mezo-tech npm run build`.

### Custom domain later
1. Set variables `SITE_URL=https://yourdomain.com` and `BASE_PATH=/`.
2. Add a file `public/CNAME` containing just `yourdomain.com`.
3. At your DNS provider add a `CNAME` record for `www` → `USERNAME.github.io` (or four `A` records to GitHub's Pages IPs for an apex domain), then set the domain under Settings → Pages and enable HTTPS.

## Feeds
- English RSS: `/rss.xml` · Arabic RSS: `/ar/rss.xml` (linked in the footer and `<head>`)
- Sitemap: `/sitemap.xml` · `robots.txt` is generated.

## Brand assets
Your logo was supplied as a small screenshot (250×257) inside a rounded-square preview. I did **not** redraw it. Instead:
- `brand-source/logo-original.png` — the untouched original.
- `public/images/brand/mezo-symbol.png` — the M/Z `< >` symbol on a transparent background (used in the header, placeholders and empty states).
- `public/images/brand/mezo-logo-stacked-dark.png` — the full stacked logo on navy.
- Favicons / app icons (`public/favicon*.png`, `.ico`, `apple-touch-icon.png`, `icon-*.png`) — symbol on navy squares, derived from the screenshot.
- `public/images/og/default.png` — default social-sharing image (1200×630).

Because the source is low resolution, the symbol is slightly soft on large/high-DPI screens. For crisp results, supply an **SVG** or a **PNG ≥ 1200 px wide with transparent background** (symbol-only and full logo) and replace those files. The header wordmark next to the symbol is live text, not part of the image; replace it with your own wordmark file in `src/components/Logo.astro` if you have one.

## Troubleshooting
- **Pages workflow fails at "deploy"** — Settings → Pages → Source must be *GitHub Actions*.
- **Site loads without CSS/images** — wrong base path. Project repos need `BASE_PATH=/REPOSITORY` (automatic in the workflow unless you set a variable).
- **Build error mentioning a frontmatter field** — the message names the file and field; see the schema in `src/content.config.ts`.
- **`Duplicate slug` / `share translationKey`** — two files of the same language use the same slug or translationKey.
- **A draft doesn't show** — drafts appear only in `npm run dev`. Set `draft: false` to publish.
- **Changes to fonts/icons not visible** — hard-refresh; assets are cached.

## What has and hasn't been verified
See the final report delivered with this project: type checks, production build (root and sub-path), the validator, and a headless-Chromium run of the key interactions were executed. Lighthouse scores have **not** been measured, and the live GitHub Pages deployment has **not** been performed.
