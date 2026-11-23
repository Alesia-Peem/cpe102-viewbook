import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getWeeks } from "@/lib/weeks";
import { getProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/` },
    { url: `${base}/journal` },
    ...getWeeks().map((w) => ({ url: `${base}/weeks/${w.slug}` })),
    ...getProjects().map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
