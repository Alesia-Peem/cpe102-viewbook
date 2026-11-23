# CPE102 Viewbook — Engineering Exploration (Team D01)

The Viewbook assignment for CPE102 Engineering Exploration (KMUTT Computer Engineering,
semester 1/2569) by Team D01: a website that introduces the course to next year's
students — the weekly topics, our two projects and our attitude towards the course.
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

### Course facts — `content/course.ts` (from the syllabus)

Course description, instructors, learning outcomes, grading, the Viewbook brief and the
three parts of the semester, taken from the official syllabus. Edit only to correct.
`content/MATERIALS.md` lists which course file each fact came from.

### Home page text — `content/site.ts`

Course name, group name, short introduction, “About” paragraphs, reflection
paragraphs and team members.

### The 16-week journal — `data/weeks.ts` (yours) + `data/syllabus.ts` (course facts)

`data/weeks.ts` holds one entry per week, all 16 already created. Fill in what you
have; anything empty shows a tidy placeholder on the site:

```ts
{
  id: 7,
  week: "Week 07",
  title: "",                 // your headline (empty → the class topic is shown)
  introduction: "",          // one or two sentences
  description: "",           // full write-up; blank line ("

") between paragraphs
  activities: [],            // ["Built the LED circuit", "..."]
  challenges: [],
  learnings: [],
  results: [],
  milestones: [],
  photos: [],                // ["/images/weeks/week-07/01.jpg", ...] — or leave empty
  captions: [],              // one per photo, same order (optional)
}
```

Photos: save them in `public/images/weeks/week-07/`. If `photos` is empty, every photo
in that folder is used automatically (sorted by file name). The layout adapts to how
many photos a week has and whether they are portrait or landscape. `content/PHOTOS.md`
is the manifest of which photo belongs to which week.

`data/syllabus.ts` holds each week's course facts (topic, dates, instructor, what was
covered, tools) from the syllabus and course materials — edit only to correct them.

The full journal is at **/journal** (“16 Weeks of Progress”); each week also has its
own page at `/weeks/week-07`.

### The two projects — `content/projects/*.mdx`

`first-project.mdx` (the gemstone sorting robot) and `final-project.mdx` hold the
brief, rules and scoring from the course documents. Add your own `ourTitle`,
`summary` and links, and write about your project below the second `---`.
Photos: `public/images/projects/first-project/cover.jpg` (+ any other photos in that
folder become the gallery); the same for `final-project`.

- Quote text values that contain a colon (`:`) in the project `.mdx` files.

### Images — just drop files into `public/images/`

Photos saved under these names appear automatically — no file needs editing:

| Put the photo at | It appears as | Frame |
| --- | --- | --- |
| `public/images/hero/hero.jpg` | Home page main photograph | 16:9 (4:3 on phones) |
| `public/images/about/about.jpg` | “About the course” photo | 5:4 |
| `public/images/team/member-1.jpg`, `member-2.jpg` … | Team portraits, in order | 4:5 portrait |
| `public/images/weeks/week-05/*.jpg` | Week 5 photos in the journal (see `data/weeks.ts`) | follows each photo |
| `public/images/weeks/week-05/` *any other photo* | Week 5 gallery, sorted by file name | 4:3 |
| `public/images/weeks/week-05/inline/…` | Photos placed inside the text with `<Figure>` | 4:3 |
| `public/images/projects/first-project/cover.jpg` (and `final-project`) | Project page main photo and home page card; other photos in the folder → gallery | 21:9 / 16:10 |

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
  fx/                   Visual effects: spotlight, pointer glow, tilt card, lamp, tracing beam, hover highlight,
                        scroll progress, number ticker, hyper text, border beam, marquee, retro grid
content/                ← all editable text lives here
lib/                    Data loading and helpers
types/                  TypeScript content types
public/images/          ← all photos live here
```

## Deployment

The project is ready for [Vercel](https://vercel.com): import the GitHub
repository and deploy with the default settings. Set the environment
variable `NEXT_PUBLIC_SITE_URL` to the final URL (used for SEO metadata).
