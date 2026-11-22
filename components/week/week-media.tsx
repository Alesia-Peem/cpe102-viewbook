import { ArrowUpRight } from "lucide-react";
import type { LinkRef, VideoRef } from "@/types/content";
import { youtubeId } from "@/lib/utils";

/** YouTube embeds, loaded lazily via the privacy-friendly nocookie domain. */
export function WeekVideos({ videos }: { videos: VideoRef[] }) {
  if (videos.length === 0) return null;

  return (
    <section aria-labelledby="videos-heading" className="mt-16">
      <h2 id="videos-heading" className="text-xl font-semibold tracking-tight">
        Videos
      </h2>
      <ul className="mt-6 space-y-8">
        {videos.map((v, i) => (
          <li key={i}>
            <div className="aspect-video w-full bg-surface">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId(v.url)}`}
                title={v.title || `Video ${i + 1}`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            {v.title ? <p className="mt-2 text-sm text-muted">{v.title}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** External resources: slides, project sites, repositories… */
export function WeekLinks({ links }: { links: LinkRef[] }) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="links-heading" className="mt-16">
      <h2 id="links-heading" className="text-xl font-semibold tracking-tight">
        Links
      </h2>
      <ul className="mt-4 border-t border-line">
        {links.map((l, i) => (
          <li key={i} className="border-b border-line">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-4 text-ink hover:text-navy"
            >
              <span>{l.label}</span>
              <ArrowUpRight className="size-4 shrink-0 text-muted group-hover:text-navy" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
