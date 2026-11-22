import type { SiteContent } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to change the home page text.
 * ─────────────────────────────────────────────────────────────
 *  • Leave a value as "" (empty) and the site shows a labelled
 *    placeholder instead, so nothing ever looks broken.
 *  • Image paths point inside the /public folder,
 *    e.g. "/images/hero/main.jpg"  →  public/images/hero/main.jpg
 *  • Each week's content lives in /content/weeks/week-XX.mdx
 */
export const site: SiteContent = {
  courseCode: "CPE102",
  courseName: "Engineering Exploration",
  groupName: "Team D01",
  tagline: "",

  heroImage: {
    src: "",
    alt: "Main project photograph",
  },

  about: {
    // One string per paragraph.
    paragraphs: [],
    image: { src: "", alt: "About the course photograph" },
  },

  reflection: {
    title: "Our attitude towards the course",
    paragraphs: [],
  },

  team: {
    title: "Team members",
    // Add, remove or edit members. Empty fields show placeholders.
    members: [
      { name: "", detail: "", photo: { src: "" } },
      { name: "", detail: "", photo: { src: "" } },
      { name: "", detail: "", photo: { src: "" } },
      { name: "", detail: "", photo: { src: "" } },
    ],
  },

  // Replace with your real URL after deploying (e.g. on Vercel).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
