import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types/content";
import { folderGallery } from "@/lib/images";

const DIR = path.join(process.cwd(), "content", "projects");
/** Display order on the home page. */
const ORDER = ["first-project", "final-project"];

function readProject(file: string): Project {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf-8"));
  const fm = data as ProjectFrontmatter;
  const slug = path.basename(file, path.extname(file));
  return {
    ...fm,
    brief: fm.brief ?? [],
    // No gallery listed → every photo in public/images/projects/<slug>/ except the cover.
    gallery: fm.gallery?.length ? fm.gallery : folderGallery(`projects/${slug}`),
    videos: fm.videos ?? [],
    links: fm.links ?? [],
    slug,
    body: content.trim(),
  };
}

export function getProjects(): Project[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readProject)
    .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}
