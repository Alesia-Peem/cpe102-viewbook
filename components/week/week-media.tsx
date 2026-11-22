import { ArrowUpRight } from "lucide-react";
import type { LinkRef, VideoRef } from "@/types/content";
import { youtubeId } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/** YouTube embeds, loaded lazily via the privacy-friendly nocookie domain. */
export function WeekVideos({ videos }: { videos: VideoRef[] }) {
  if (videos.length === 0) return null;

  return (
    <section id="videos" aria-labelledby="videos-heading" className="scroll-mt-24">
      <h2 id="videos-heading" className="text-h2 font-semibold">
        Videos
      </h2>
      <ul className="mt-10 grid gap-10 md:grid-cols-2">
        {videos.map((v, i) => (
          <li key={i}>
            <Reveal delay={(i % 2) * 0.05}>
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
              {v.title ? <p className="mt-3 text-small text-muted">{v.title}</p> : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** External resources: slides, project sites, repositories… Each row is one 56px target. */
export function WeekLinks({ links }: { links: LinkRef[] }) {
  if (links.length === 0) return null;

  return (
    <section id="links" aria-labelledby="links-heading" className="scroll-mt-24">
      <h2 id="links-heading" className="text-h2 font-semibold">
        Links
      </h2>
      <ul className="mt-8 border-t border-line">
        {links.map((l, i) => {
          let host = "";
          try {
            host = new URL(l.href).hostname.replace(/^www\./, "");
          } catch {
            host = "";
          }
          return (
            <li key={i} className="border-b border-line">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:bg-surface sm:px-3"
              >
                <span>
                  <span className="block text-body font-medium text-ink group-hover:text-navy">{l.label}</span>
                  {host ? <span className="font-mono text-label text-muted">{host}</span> : null}
                </span>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
