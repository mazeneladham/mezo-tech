# Authoring guide

Everything routine is a Markdown file or a small data file — no component code to edit.

## Where things live
| What | Where |
| --- | --- |
| Name, tagline, social links, photo path, CV path, share image | `src/data/site.ts` |
| Interface text (EN/AR) | `src/i18n/ui.ts` |
| Categories + Arabic tag names | `src/data/taxonomy.ts` |
| Learning topics (home + Learning page) | `src/data/learning.ts` |
| Resume content | `src/data/resume.ts` |
| About page text | `src/content/pages/about.en.md`, `about.ar.md` |
| Articles | `src/content/blog/en/*.md`, `src/content/blog/ar/*.md` |
| Projects | `src/content/projects/en/*.md`, `.../ar/*.md` |
| Images / files | `public/images/...`, `public/files/...` |
| Colors, spacing | `src/styles/tokens.css` |

## Publish an article
1. Create `src/content/blog/en/my-article.md` (the file name becomes the URL: `/blog/my-article/`).
2. Add frontmatter:

```yaml
---
title: "Understanding Pointers in C"
description: "A practical introduction to pointers and memory."   # 10–320 chars
pubDate: 2026-10-10
updatedDate:                      # optional
language: en
translationKey: "understanding-pointers-c"
category: programming             # an id from src/data/taxonomy.ts
tags: [C, Programming, Memory]
cover: "/images/blog/pointers-cover.webp"   # optional; a missing file is ignored
coverAlt: "Diagram of a pointer"            # optional
draft: false                      # true = hidden from the production build, sitemap, RSS and search
featured: false
example: false                    # true shows an "Example" badge (used by the sample content)
---
```
3. Write the article below the frontmatter. Use `##` headings (a table of contents appears for longer articles). Root-relative links such as `/about/` and `/images/blog/x.webp` get the base path added automatically.
4. Commit and push — GitHub Actions rebuilds and deploys.

## English only, Arabic only, or both
Each language version is its own file. Versions are linked **only** when they share the same `translationKey`:

- `src/content/blog/en/my-article.md` → `language: en`, `translationKey: "my-article"`
- `src/content/blog/ar/my-article.md` → `language: ar`, `translationKey: "my-article"`

Publish just one of them and the other language is simply not offered (no fake page; the language switcher falls back to the blog listing, and `hreflang`/sitemap list only what exists). The Arabic file may use a different `slug:` (lowercase letters, numbers, hyphens) if you want an Arabic-specific URL.

## Add a project
Create `src/content/projects/en/my-project.md` (and optionally `ar/`). Fields: `title`, `description`, `category`, `technologies`, `status` (`idea | in-progress | completed | paused`), `startDate`/`endDate`, `cover`, `github`, `demo`, `relatedPosts`/`relatedProjects` (translationKeys). Leave `github`/`demo` out unless real — empty or placeholder links are never rendered. Body sections are plain `##` headings (Problem, Goals, How it works, Challenges, Lessons learned, Future improvements…); only the ones you write appear.

**Feature on the home page:** set `featured: true` (max 3 shown; lower `order` first).

## Categories and tags
- **New category:** add a line to `categories` in `src/data/taxonomy.ts` (`id: { en, ar }`), then use the id in frontmatter. Unknown ids fail the build with a clear message.
- **Tags:** free text in frontmatter; only tags used by published content appear in filters. For an Arabic display name add it to `tagLabelsAr`.

## Other routine edits
- **Replace the profile photo:** save your photo as `public/images/profile/mezo-profile.webp` (portrait, about 800×1000). Update `profile.width/height/alt` in `src/data/site.ts`. Until then a neutral placeholder with the logo symbol is shown.
- **Social links / email:** replace the `[PLACEHOLDER_...]` values in `src/data/site.ts`. Unconfigured entries are hidden everywhere.
- **Replace the CV:** put your PDF at `public/files/mezo-tech-cv.pdf` (or change `cv.file`). The download button appears only when the file exists. Edit CV text in `src/data/resume.ts`.
- **Change the tagline:** `site.tagline` in `src/data/site.ts` (both languages) — the hero text lives in `src/i18n/ui.ts` (`home.heroTitle`).
- **Change the public URL:** see README → Deploy (variables `SITE_URL`, `BASE_PATH`).
- **Remove sample content:** delete files with `example: true` in `src/content/**`, and the sample entries in `src/data/learning.ts` that point to them.
