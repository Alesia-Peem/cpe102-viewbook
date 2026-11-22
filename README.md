# CPE102 Engineering Exploration — Team D01

A week-by-week journal website for the CPE102 Engineering Exploration course by Team D01, built with Next.js.
Each week of the semester has its own page; the home page introduces the
course, lists every week, and presents the reflection and team.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS 4
- MDX for weekly content (`next-mdx-remote` + `gray-matter`)
- Lucide icons; Schibsted Grotesk + JetBrains Mono (self-hosted via `next/font`)
- Started from the [Vercel Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) (MIT)

## Getting started

Requires **Node.js 22 LTS or newer** (20.19+ also works).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run typecheck` | Check TypeScript without output |

## Editing content (no code changes needed)

Anything left empty shows a clearly labelled placeholder such as
`[IMAGE PLACEHOLDER: …]` or `[DESCRIPTION PLACEHOLDER: …]`, so the site
never looks broken while content is still being written.

### Home page text — `content/site.ts`

Course name, group name, short introduction, “About” paragraphs, reflection
paragraphs and team members.

### Each week — `content/weeks/week-XX.mdx`

The part between the `---` lines holds the details; everything **below**
the second `---` is the week’s main description (plain text / Markdown).

```mdx
---
week: 3
title: "Computer Aided Design"
date: "2026-01-29"
summary: "One sentence shown on the home page."
cover:
  src: /images/weeks/week-03/cover.jpg
  alt: "Students working on 3D models"
gallery:
  - src: /images/weeks/week-03/photo-1.jpg
    alt: "Laser cutter in action"
    caption: "Trying the laser cutter"
videos:
  - url: https://www.youtube.com/watch?v=VIDEO_ID
    title: "Video we watched in class"
links:
  - label: "Our slides"
    href: https://example.com/slides
---

Write the description for the week here. Use a blank line between paragraphs.

## You can add sub-headings

<Figure src="/images/weeks/week-03/sketch.jpg" caption="A photo placed inside the text" />
```

- To **add or remove a week**, add or delete a `week-XX.mdx` file — pages, the
  home page list and previous/next links update automatically.
- Quote text values that contain a colon (`:`).

### Images — `public/images/`

```
public/images/
  hero/            main photo on the home page
  about/           photo in the “About the course” section
  team/            team member portraits
  weeks/week-01/   photos for week 1 (and so on)
```

Reference images by their path **without** `public`, e.g.
`/images/weeks/week-01/cover.jpg`. JPG/PNG/WebP all work; Next.js resizes
and optimises them automatically. If a referenced file is missing, a
placeholder is shown instead of a broken image.

## Project structure

```
app/                    Routes (App Router)
  page.tsx              Home page
  weeks/[slug]/page.tsx One page per week
components/
  layout/               Header, mobile menu, footer
  sections/             Home page sections (hero, about, week grid, reflection, team)
  week/                 Week page parts (gallery, videos, links, pager…)
  ui/                   Shared building blocks (image, placeholders, section)
content/                ← all editable text lives here
lib/                    Data loading and helpers
types/                  TypeScript content types
public/images/          ← all photos live here
```

## Deployment

The project is ready for [Vercel](https://vercel.com): import the GitHub
repository and deploy with the default settings. Set the environment
variable `NEXT_PUBLIC_SITE_URL` to the final URL (used for SEO metadata).
