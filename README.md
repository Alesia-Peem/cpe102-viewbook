# CPE102 Engineering Exploration — Team D01

A week-by-week journal website for the CPE102 Engineering Exploration course by Team D01, built with Next.js.
Each week of the semester has its own page; the home page introduces the
course, lists every week, and presents the reflection and team.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS 4
- MDX for weekly content (`next-mdx-remote` + `gray-matter`)
- Lucide icons; Schibsted Grotesk + JetBrains Mono, with Anuphan for Thai text (all self-hosted via `next/font`)
- [Motion](https://motion.dev) for animation (springs, scroll reveals; all off under *reduce motion*)
- ESLint (`eslint-config-next`)
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
| `npm run lint`      | ESLint (Next.js + TypeScript rules) |

## Editing content (no code changes needed)

Anything left empty shows a clearly labelled placeholder —
`[PROJECT IMAGE PLACEHOLDER]` with the **exact file to add**, or
`[PROJECT DESCRIPTION — TO BE PROVIDED]` with the **file to edit** — so the
site never looks broken while content is still being written.

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

<Figure src="/images/weeks/week-03/inline/sketch.jpg" caption="A photo placed inside the text" />
```

- To **add or remove a week**, add or delete a `week-XX.mdx` file — pages, the
  home page list and previous/next links update automatically.
- Quote text values that contain a colon (`:`).

### Images — just drop files into `public/images/`

Photos saved under these names appear automatically — no file needs editing:

| Put the photo at | It appears as | Frame |
| --- | --- | --- |
| `public/images/hero/hero.jpg` | Home page main photograph | 16:9 (4:3 on phones) |
| `public/images/about/about.jpg` | “About the course” photo | 5:4 |
| `public/images/team/member-1.jpg`, `member-2.jpg` … | Team portraits, in order | 4:5 portrait |
| `public/images/weeks/week-05/cover.jpg` | Week 5 main photo and its card | 21:9 (4:3 on cards) |
| `public/images/weeks/week-05/` *any other photo* | Week 5 gallery, sorted by file name | 4:3 |
| `public/images/weeks/week-05/inline/…` | Photos placed inside the text with `<Figure>` | 4:3 |

- `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work; Next.js resizes and
  compresses them. Photos are cropped to their frame, so keep the subject central.
- Name gallery photos `01.jpg`, `02.jpg` … to control their order.
- To add **captions** or **alt text**, list the photos under `gallery:` in the
  week file (see the example above) — a list in the file replaces the folder.
- A path written in a content file always wins over the folder convention.
- Placeholders show the file name they are waiting for, so you can see at a
  glance what is still missing.

## Project structure

```
app/                    Routes (App Router)
  page.tsx              Home page
  weeks/[slug]/page.tsx One page per week
components/
  layout/               Header, mobile menu, footer
  sections/             Home page sections (hero, about, week grid, reflection, team)
  week/                 Week page parts (gallery, videos, links, pager…)
  ui/                   Shared building blocks (image, placeholders, section, button, title block)
  motion/               Animation building blocks and motion tokens
  fx/                   Visual effects: spotlight, pointer glow, tilt card, lamp, tracing beam, hover highlight
content/                ← all editable text lives here
lib/                    Data loading and helpers
types/                  TypeScript content types
public/images/          ← all photos live here
```

## Deployment

The project is ready for [Vercel](https://vercel.com): import the GitHub
repository and deploy with the default settings. Set the environment
variable `NEXT_PUBLIC_SITE_URL` to the final URL (used for SEO metadata).
