import type { SiteContent } from "@/types/content";
import { projectContent as own } from "@/data/project";

/**
 * Site settings and the home page text.
 *  • Your own text (tagline, about, reflection, team) is written in data/project.ts —
 *    this file only passes it on. The weekly journal is data/weeks.ts.
 *  • Image paths point inside the /public folder,
 *    e.g. "/images/hero/main.jpg"  →  public/images/hero/main.jpg
 */
export const site: SiteContent = {
  courseCode: "CPE102",
  courseName: "Engineering Exploration",
  groupName: "Team D01",
  tagline: own.tagline,

  heroImage: { src: own.heroPhoto, alt: "Main project photograph" },

  about: {
    paragraphs: own.about.paragraphs,
    image: { src: own.about.photo, alt: "About the course photograph" },
  },

  reflection: {
    title: "Our attitude towards the course",
    paragraphs: own.reflection.paragraphs,
  },

  team: {
    title: "Team members",
    members: own.team.map((m) => ({ name: m.name, detail: m.detail, photo: { src: m.photo } })),
  },

  // The public address. On Vercel it is filled in automatically from the production domain;
  // set NEXT_PUBLIC_SITE_URL to override it (e.g. after adding a custom domain).
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
};
