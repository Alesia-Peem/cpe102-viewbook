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

/** A tool or resource; `href` optional. */
export type ToolRef = { label: string; href?: string };

export type WeekFrontmatter = {
  week: number;
  // ── From the syllabus / course materials ──
  title?: string;
  /** Second line of the syllabus schedule, e.g. "LibreCAD / TinkerCAD". */
  subtitle?: string;
  /** ISO date of the first class that week, e.g. "2026-08-06" */
  date?: string;
  /** ISO date of the last class that week (sections A–D run over two days). */
  endDate?: string;
  instructor?: string;
  /** Guest speaker or guest lecturer, if any. */
  guest?: string;
  /** "integrated" | "midterm" | "class" — see content/course.ts phases. */
  phase?: string;
  /** Viewbook / assignment deliverable listed in the schedule. */
  deliverable?: string;
  /** Project milestone that week (grouping, competition…). */
  milestone?: string;
  /** What the class covered, from the syllabus and the week's slides. */
  covered?: string[];
  /** Tools and software used. */
  tools?: ToolRef[];
  /** Related project page slug, e.g. "first-project". */
  project?: string;
  // ── Your own content ──
  /** One sentence in your own words for the week card. */
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

export type ScoreItem = { label: string; points: number; detail?: string };
export type ScheduleItem = { label: string; time: string };

export type ProjectFrontmatter = {
  // ── From the course documents ──
  title: string;
  /** e.g. "The First Project · An Integrated Project" */
  kicker: string;
  weeks: string;
  team: string;
  due: string;
  weight: string;
  /** Short factual brief, one string per paragraph. */
  brief: string[];
  requirements?: string[];
  scoring?: ScoreItem[];
  schedule?: ScheduleItem[];
  /** Named colours shown as swatches (the gemstones). */
  swatches?: Array<{ name: string; hex: string }>;
  milestones?: Array<{ week: string; label: string }>;
  // ── Your own content ──
  /** Your project's own name, e.g. your robot's name or your final project title. */
  ourTitle?: string;
  summary?: string;
  cover?: ImageRef;
  gallery?: ImageRef[];
  videos?: VideoRef[];
  links?: LinkRef[];
};

export type Project = ProjectFrontmatter & { slug: string; body: string };
