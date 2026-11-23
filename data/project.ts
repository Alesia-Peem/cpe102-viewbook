import type { ProjectContent, ProjectEntry } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────
 *  YOUR PROJECT TEXT — everything outside the weekly journal.
 * ─────────────────────────────────────────────────────────────
 *  • Leave any field empty ("" or []) — the site shows a tidy placeholder.
 *  • Paragraphs: one string per paragraph, or a blank line ("\n\n") inside `description`.
 *  • Photos: paths inside /public, e.g. "/images/projects/first-project/robot.jpg".
 *    Or simply save photos in the folder named next to each section below — an empty
 *    list means the folder is used.
 *  • The weekly journal lives in data/weeks.ts. Course facts (syllabus, rules, scoring)
 *    live in content/course.ts and content/projects/*.mdx — edit those only to correct them.
 */
const project = (): ProjectEntry => ({
  title: "",
  summary: "",
  description: "",
  photos: [],
  captions: [],
  videos: [], // [{ url: "https://youtu.be/…", title: "Competition run" }]
  links: [], // [{ label: "Source code", href: "https://github.com/…" }]
});

export const projectContent: ProjectContent = {
  /** Short line under the big title on the home page. */
  tagline: "",

  /** Home page main photograph. Empty → public/images/hero/hero.jpg, else the first journal photo. */
  heroPhoto: "",

  about: {
    /** The course in your own words (shown under the syllabus quote). */
    paragraphs: [],
    /** Empty → public/images/about/about.jpg */
    photo: "",
  },

  reflection: {
    /** "Our attitude towards the course" — the first paragraph is set large. */
    paragraphs: [],
  },

  /** Team D01. Add or remove members. Empty photo → public/images/team/member-1.jpg, member-2.jpg … */
  team: [
    { name: "", detail: "", photo: "" },
    { name: "", detail: "", photo: "" },
    { name: "", detail: "", photo: "" },
    { name: "", detail: "", photo: "" },
  ],

  /** The First Project — the gemstone colour sorting robot (weeks 1–8). Photos: public/images/projects/first-project/ */
  firstProject: { ...project() },

  /** The Final Project (weeks 10–16). Photos: public/images/projects/final-project/ */
  finalProject: { ...project() },
};
