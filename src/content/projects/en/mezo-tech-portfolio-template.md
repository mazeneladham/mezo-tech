---
title: "MEZO TECH Portfolio Website"
description: "A bilingual (English/Arabic) static portfolio and blog built with Astro and deployed to GitHub Pages. Example project describing this template."
language: en
translationKey: "mezo-tech-portfolio-template"
category: web-development
technologies:
  - Astro
  - TypeScript
  - CSS
  - GitHub Actions
status: in-progress
featured: true
order: 2
startDate: 2026-10-01
github:
demo:
relatedPosts:
  - getting-started-with-git-and-github
relatedProjects:
  - grade-calculator-cli
draft: false
example: true
---

> **Example project.** It describes the template this site is built from. Edit it to describe your own version, or delete it.

## The problem

A personal brand needs one home for projects and writing, one that is free to host, fast, easy to update, and usable in more than one language.

## Goals

- A professional portfolio and technical blog in English and Arabic.
- Content added as Markdown files, with no code changes for routine updates.
- Free hosting on GitHub Pages, deployed automatically.

## How it works

Astro generates plain static HTML at build time. Articles and projects are Markdown files validated by a schema. A small amount of JavaScript powers the theme toggle, the mobile menu, filtering and search, all in the browser, so no server or database is needed.

## Implementation notes

- Right-to-left layout is handled with CSS logical properties.
- Each page declares which language versions truly exist, so links and `hreflang` tags never point at missing pages.
- A GitHub Actions workflow builds the site and publishes it on every push.

## Lessons learned

Designing for right-to-left from the start is far easier than retrofitting it, and a content schema catches mistakes before they reach the live site.

## Future improvements

- Add a real profile photo and CV.
- Publish more articles and projects.
- Connect a custom domain.
