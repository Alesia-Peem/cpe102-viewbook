import type { ToolRef } from "@/types/content";

/** Course facts for one week (data/syllabus.ts). */
export type SyllabusWeek = {
  week: number;
  title: string;
  subtitle?: string;
  date?: string;
  endDate?: string;
  instructor?: string;
  guest?: string;
  phase?: string;
  deliverable?: string;
  milestone?: string;
  project?: string;
  covered?: string[];
  tools?: ToolRef[];
};

/** Your own journal entry for one week (data/weeks.ts) — the structure you asked for. */
export type WeekEntry = {
  id: number;
  week: string; // "Week 01"
  title: string;
  introduction: string;
  description: string;
  activities: string[];
  challenges: string[];
  learnings: string[];
  results: string[];
  milestones: string[];
  /** Paths inside /public, e.g. "/images/weeks/week-01/photo.jpg". Empty is fine. */
  photos: string[];
  /** One caption per photo, same order as `photos`. Optional. */
  captions: string[];
};

/** A photo ready to render: path plus its real pixel size (read at build time). */
export type JournalPhoto = {
  src: string;
  width: number;
  height: number;
  caption?: string;
  alt: string;
  orientation: "portrait" | "landscape" | "square";
};

/** One week as the journal renders it: course facts + your entry + resolved photos. */
export type JournalWeek = {
  id: number;
  slug: string; // "week-01"
  number: string; // "01"
  label: string; // "Week 01"
  /** Your title if written, else the class topic from the syllabus. */
  heading: string;
  /** True when `heading` is still the syllabus topic (your title not written yet). */
  headingIsTopic: boolean;
  topic: string;
  subtitle?: string;
  dateLabel?: string;
  date?: string;
  endDate?: string;
  instructor?: string;
  guest?: string;
  phase?: string;
  deliverable?: string;
  syllabusMilestone?: string;
  project?: string;
  covered: string[];
  tools: ToolRef[];
  entry: WeekEntry;
  photos: JournalPhoto[];
  upcoming: boolean;
};
