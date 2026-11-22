import fs from "node:fs";
import path from "node:path";
import type { ImageRef } from "@/types/content";

/**
 * IMAGE CONVENTIONS — drop a photo at the expected path and it appears; no code or content edit needed.
 *
 *   public/images/hero/hero.jpg               home page main photograph
 *   public/images/about/about.jpg             "About the course" photograph
 *   public/images/team/member-1.jpg …         team portraits, in order
 *   public/images/weeks/week-05/cover.jpg     a week's main photograph
 *   public/images/weeks/week-05/*.jpg         every other photo in the folder → that week's gallery
 *
 * .jpg, .jpeg, .png, .webp and .avif all work. A path written in the content files always wins.
 */
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const PUBLIC = path.join(process.cwd(), "public");

const existsInPublic = (src: string) => fs.existsSync(path.join(PUBLIC, src.replace(/^\//, "")));

export type ResolvedImage = {
  /** The file to show, or undefined when it is missing. */
  src?: string;
  /** Where the user should put the photo (shown on the placeholder). */
  expected?: string;
};

export function resolveImage(image?: ImageRef, fallbackPath?: string): ResolvedImage {
  if (image?.src) {
    if (/^https?:\/\//.test(image.src) || existsInPublic(image.src)) return { src: image.src };
    return { expected: `public${image.src}` };
  }
  if (fallbackPath) {
    for (const ext of EXTENSIONS) if (existsInPublic(fallbackPath + ext)) return { src: fallbackPath + ext };
    return { expected: `public${fallbackPath}.jpg` };
  }
  return {};
}

/** Photos in a week's folder other than its cover, sorted by name (photo-2 before photo-10). */
export function folderGallery(slug: string): ImageRef[] {
  const dir = path.join(PUBLIC, "images", "weeks", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => EXTENSIONS.includes(path.extname(f).toLowerCase()) && !/^cover\./i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => ({ src: `/images/weeks/${slug}/${f}` }));
}
