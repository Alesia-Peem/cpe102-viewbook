import type { Week } from "@/types/content";
import { getJournalWeeks } from "@/lib/journal";

/**
 * All weeks in the shape the week pages and cards use, built from the journal data
 * (data/syllabus.ts + data/weeks.ts). Read at build time.
 */
export function getWeeks(): Week[] {
  return getJournalWeeks().map((j) => {
    const [first, ...rest] = j.photos;
    return {
      week: j.id,
      slug: j.slug,
      title: j.heading,
      subtitle: j.subtitle,
      date: j.date,
      endDate: j.endDate,
      instructor: j.instructor,
      guest: j.guest,
      phase: j.phase,
      deliverable: j.deliverable,
      milestone: j.syllabusMilestone,
      project: j.project,
      covered: j.covered,
      tools: j.tools,
      summary: j.entry.introduction || undefined,
      cover: first ? { src: first.src, alt: first.alt, caption: first.caption } : undefined,
      gallery: rest.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption })),
      videos: [],
      links: [],
      body: j.entry.description.trim(),
    } satisfies Week;
  });
}

export function getWeek(slug: string): Week | undefined {
  return getWeeks().find((w) => w.slug === slug);
}

/** Weeks grouped by semester phase, in the order of content/course.ts. */
export function getWeeksByPhase<P extends { id: string }>(weeks: Week[], phases: ReadonlyArray<P>) {
  return phases.map((p) => ({ phase: p, weeks: weeks.filter((w) => w.phase === p.id) })).filter((g) => g.weeks.length > 0);
}

/**
 * True when the week's first class is after `now`. Evaluated when the site is built,
 * so it stays correct as long as the site is rebuilt as the semester goes on.
 */
export function isUpcoming(week: Week, now = new Date()) {
  if (!week.date) return false;
  const d = new Date(`${week.date}T00:00:00+07:00`);
  return !Number.isNaN(d.getTime()) && d.getTime() > now.getTime();
}

/** First and last dated week — derived from the files, never invented. */
export function getDateRange(weeks: Week[]) {
  const dates = weeks
    .flatMap((w) => [w.date, w.endDate])
    .filter((d): d is string => !!d && !Number.isNaN(new Date(d).getTime()))
    .sort();
  return dates.length ? { start: dates[0], end: dates[dates.length - 1] } : undefined;
}

export function getAdjacentWeeks(slug: string) {
  const weeks = getWeeks();
  const i = weeks.findIndex((w) => w.slug === slug);
  return {
    prev: i > 0 ? weeks[i - 1] : undefined,
    next: i >= 0 && i < weeks.length - 1 ? weeks[i + 1] : undefined,
  };
}
