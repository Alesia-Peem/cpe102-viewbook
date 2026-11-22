import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Week, WeekFrontmatter } from "@/types/content";
import { folderGallery } from "@/lib/images";

const WEEKS_DIR = path.join(process.cwd(), "content", "weeks");

function readWeek(file: string): Week {
  const raw = fs.readFileSync(path.join(WEEKS_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const fm = data as Partial<WeekFrontmatter>;
  const slug = path.basename(file, path.extname(file));

  // Fallback: derive the week number from the file name (week-07 → 7).
  const fromName = Number(slug.match(/\d+/)?.[0] ?? NaN);

  return {
    ...fm,
    week: typeof fm.week === "number" ? fm.week : fromName,
    // YAML parses unquoted dates into Date objects; normalise to a string.
    date: fm.date ? toIsoDate(fm.date as unknown) : undefined,
    // No gallery listed in the file → use every photo in public/images/weeks/<slug>/ except the cover.
    gallery: fm.gallery?.length ? fm.gallery : folderGallery(`weeks/${slug}`),
    covered: fm.covered ?? [],
    tools: fm.tools ?? [],
    videos: fm.videos ?? [],
    links: fm.links ?? [],
    slug,
    body: content.trim(),
  };
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

/** All weeks, sorted by week number. Read at build time. */
export function getWeeks(): Week[] {
  if (!fs.existsSync(WEEKS_DIR)) return [];
  return fs
    .readdirSync(WEEKS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readWeek)
    .sort((a, b) => a.week - b.week);
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
