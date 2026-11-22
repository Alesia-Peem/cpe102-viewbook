import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getWeeks } from "@/lib/weeks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/` },
    ...getWeeks().map((w) => ({ url: `${base}/weeks/${w.slug}` })),
  ];
}
