import type { WeekEntry } from "@/types/journal";

/**
 * ─────────────────────────────────────────────────────────────
 *  YOUR 16-WEEK JOURNAL — edit this file to fill in each week.
 * ─────────────────────────────────────────────────────────────
 *  • Leave any field empty ("" or []) — the site shows a tidy placeholder.
 *  • title: your own headline for the week. Empty → the class topic is shown.
 *  • description: separate paragraphs with a blank line ("\n\n").
 *  • photos: paths inside /public, e.g. "/images/weeks/week-03/robot.jpg".
 *    Or simply save photos in public/images/weeks/week-03/ — if `photos` is
 *    empty, every photo in that folder is used (sorted by file name).
 *  • captions: one per photo, in the same order. Optional.
 *  Course facts (topic, dates, instructor…) live in data/syllabus.ts.
 */
const empty = (id: number): WeekEntry => ({
  id,
  week: `Week ${String(id).padStart(2, "0")}`,
  title: "",
  introduction: "",
  description: "",
  activities: [],
  challenges: [],
  learnings: [],
  results: [],
  milestones: [],
  photos: [],
  captions: [],
});

export const weeks: WeekEntry[] = [
  {
    ...empty(1),
    // Photo copied from Downloads/CPE102/Week 1 (original file unchanged).
    photos: ["/images/weeks/week-01/769222284_2141030570088996_5586930292898448471_n.jpg"],
    captions: [""],
  },
  empty(2),
  empty(3),
  empty(4),
  empty(5),
  empty(6),
  empty(7),
  empty(8),
  empty(9),
  empty(10),
  empty(11),
  empty(12),
  empty(13),
  empty(14),
  empty(15),
  empty(16),
];
