import fs from "node:fs";
import path from "node:path";
import { syllabusWeeks } from "@/data/syllabus";
import { weeks as entries } from "@/data/weeks";
import type { JournalPhoto, JournalWeek, WeekEntry } from "@/types/journal";
import { imageSize } from "@/lib/image-size";
import { formatDate, formatDateRange } from "@/lib/utils";

const PUBLIC = path.join(process.cwd(), "public");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const pad = (n: number) => String(n).padStart(2, "0");

/** Photo paths for a week: the ones listed in data/weeks.ts, else every photo in its folder. */
function photoPaths(entry: WeekEntry, slug: string): string[] {
  const listed = entry.photos.filter(Boolean);
  if (listed.length) return listed;
  const dir = path.join(PUBLIC, "images", "weeks", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/images/weeks/${slug}/${f}`);
}

function resolvePhotos(entry: WeekEntry, slug: string, label: string): JournalPhoto[] {
  return photoPaths(entry, slug).flatMap((src, i) => {
    const file = path.join(PUBLIC, src.replace(/^\//, ""));
    const size = imageSize(file);
    if (!size) return []; // missing or unreadable file → skipped, never a broken image
    const caption = entry.captions[i]?.trim() || undefined;
    const ratio = size.width / size.height;
    return [
      {
        src,
        width: size.width,
        height: size.height,
        caption,
        alt: caption || `${label} photo ${i + 1}`,
        orientation: ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square",
      } satisfies JournalPhoto,
    ];
  });
}

function isUpcoming(date: string | undefined, now: Date) {
  if (!date) return false;
  const d = new Date(`${date}T00:00:00+07:00`);
  return !Number.isNaN(d.getTime()) && d.getTime() > now.getTime();
}

/** All 16 weeks: course facts + your entry + photos. Always 16, whatever is filled in. */
export function getJournalWeeks(now = new Date()): JournalWeek[] {
  return syllabusWeeks.map((s) => {
    const entry = entries.find((e) => e.id === s.week) ?? ({ id: s.week, week: `Week ${pad(s.week)}`, title: "", introduction: "", description: "", activities: [], challenges: [], learnings: [], results: [], milestones: [], photos: [], captions: [] } satisfies WeekEntry);
    const slug = `week-${pad(s.week)}`;
    const label = `Week ${pad(s.week)}`;
    const ownTitle = entry.title.trim();
    return {
      id: s.week,
      slug,
      number: pad(s.week),
      label,
      heading: ownTitle || s.title,
      headingIsTopic: !ownTitle,
      topic: s.title,
      subtitle: s.subtitle || undefined,
      dateLabel: s.date ? (s.endDate ? formatDateRange(s.date, s.endDate) : formatDate(s.date, "short")) : undefined,
      date: s.date,
      endDate: s.endDate,
      instructor: s.instructor,
      guest: s.guest,
      phase: s.phase,
      deliverable: s.deliverable,
      syllabusMilestone: s.milestone,
      project: s.project,
      covered: s.covered ?? [],
      tools: s.tools ?? [],
      entry,
      photos: resolvePhotos(entry, slug, label),
      upcoming: isUpcoming(s.date, now),
    };
  });
}

export function getJournalWeek(slug: string) {
  return getJournalWeeks().find((w) => w.slug === slug);
}
