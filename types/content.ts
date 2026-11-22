/**
 * Content types for the whole site.
 * Every field that holds user-provided content is optional or may be an
 * empty string — the UI shows a clearly labelled placeholder in that case.
 */

export type ImageRef = {
  /** Path inside /public, e.g. "/images/weeks/week-01/cover.jpg" */
  src?: string;
  /** Short description of the photo for screen readers. */
  alt?: string;
  /** Visible caption under the photo. */
  caption?: string;
};

export type LinkRef = {
  label: string;
  href: string;
};

export type VideoRef = {
  /** A YouTube URL or video id. */
  url: string;
  title?: string;
};

export type WeekFrontmatter = {
  week: number;
  title?: string;
  /** ISO date, e.g. "2026-01-15" */
  date?: string;
  summary?: string;
  cover?: ImageRef;
  gallery?: ImageRef[];
  videos?: VideoRef[];
  links?: LinkRef[];
};

export type Week = WeekFrontmatter & {
  slug: string;
  /** MDX body — the main description written by the user. */
  body: string;
};

export type TeamMember = {
  name?: string;
  /** Optional second line: role, student ID, etc. */
  detail?: string;
  photo?: ImageRef;
  link?: LinkRef;
};

export type SiteContent = {
  courseCode: string;
  courseName?: string;
  groupName?: string;
  /** Short line under the hero title. */
  tagline?: string;
  heroImage?: ImageRef;
  about: {
    paragraphs: string[];
    image?: ImageRef;
  };
  reflection: {
    title: string;
    paragraphs: string[];
  };
  team: {
    title: string;
    members: TeamMember[];
  };
  /** Absolute URL of the deployed site (used for SEO metadata). */
  siteUrl: string;
};
