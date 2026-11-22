import fs from "node:fs";
import path from "node:path";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** "2026-01-15" → "15 January 2026". Returns undefined for empty/invalid input. */
export function formatDate(date?: string) {
  if (!date) return undefined;
  const d = new Date(date.includes("T") ? date : `${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** "7" → "07" */
export function padWeek(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * True when `src` is a remote URL, or a local file that actually exists in /public.
 * Lets the site fall back to a placeholder instead of a broken image.
 */
export function imageExists(src?: string) {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

/** Extract a YouTube video id from a URL or return the id as-is. */
export function youtubeId(input: string) {
  const m = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : input.trim();
}
