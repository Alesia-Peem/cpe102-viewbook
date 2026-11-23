import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ImageRef, Project, ProjectEntry, ProjectFrontmatter } from "@/types/content";
import { folderGallery } from "@/lib/images";
import { projectContent } from "@/data/project";

const DIR = path.join(process.cwd(), "content", "projects");
/** Display order on the home page. */
const ORDER = ["first-project", "final-project"];
/** The user's own write-up for each project, from data/project.ts. */
const OWN: Record<string, ProjectEntry> = {
  "first-project": projectContent.firstProject,
  "final-project": projectContent.finalProject,
};

/** Lays the user's own text and photos (data/project.ts) over the course facts; empty fields keep the file's values. */
function withOwn(p: Project): Project {
  const own = OWN[p.slug];
  if (!own) return p;
  const name = own.title || p.ourTitle || p.title;
  const photos: ImageRef[] = own.photos.map((src, i) => ({
    src,
    caption: own.captions[i] || undefined,
    alt: own.captions[i] || `${name}: photo ${i + 1}`,
  }));
  return {
    ...p,
    ourTitle: own.title || p.ourTitle,
    summary: own.summary || p.summary,
    description: own.description.trim(),
    cover: photos[0] ?? p.cover,
    gallery: photos.length ? photos.slice(1) : p.gallery,
    videos: own.videos.length ? own.videos : p.videos,
    links: own.links.length ? own.links : p.links,
  };
}

function readProject(file: string): Project {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf-8"));
  const fm = data as ProjectFrontmatter;
  const slug = path.basename(file, path.extname(file));
  return withOwn({
    ...fm,
    brief: fm.brief ?? [],
    // No gallery listed → every photo in public/images/projects/<slug>/ except the cover.
    gallery: fm.gallery?.length ? fm.gallery : folderGallery(`projects/${slug}`),
    videos: fm.videos ?? [],
    links: fm.links ?? [],
    slug,
    body: content.trim(),
  });
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
