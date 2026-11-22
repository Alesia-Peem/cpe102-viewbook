import { ArrowUpRight } from "lucide-react";
import type { LinkRef, VideoRef } from "@/types/content";
import { youtubeId } from "@/lib/utils";

/** YouTube embeds, loaded lazily via the privacy-friendly nocookie domain. */
export function WeekVideos({ videos }: { videos: VideoRef[] }) {
  if (videos.length === 0) return null;

  return (
    <section id="videos" aria-labelledby="videos-heading" className="scroll-mt-24">
      <h2 id="videos-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Videos
      </h2>
      <ul className="mt-8 grid gap-10 md:grid-cols-2">
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
            {v.title ? <p className="mt-3 text-sm text-muted">{v.title}</p> : null}
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
    <section id="links" aria-labelledby="links-heading" className="scroll-mt-24">
      <h2 id="links-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Links
      </h2>
      <ul className="mt-6 border-t border-line">
        {links.map((l, i) => (
          <li key={i} className="border-b border-line">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-14 items-center justify-between gap-4 py-3 text-lg text-ink transition-colors hover:text-navy"
            >
              <span>{l.label}</span>
              <ArrowUpRight
                className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
