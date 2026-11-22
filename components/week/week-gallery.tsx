import type { ImageRef } from "@/types/content";
import { ContentImage } from "@/components/ui/content-image";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER } from "@/components/motion/tokens";
import { cn, padWeek } from "@/lib/utils";

/**
 * Captioned photo grid across the full content width. Captions are numbered like figures in a
 * drawing ("Fig. 05.2"). Photos open full size. Fed by the week file, or by the week's image folder.
 */
export function WeekGallery({ images, week }: { images: ImageRef[]; week: number }) {
  if (images.length === 0) return null;
  const cols = images.length === 1 ? "" : images.length === 2 || images.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24">
      <h2 id="gallery-heading" className="text-h2 font-semibold">
        Gallery
      </h2>
      <ul className={cn("fx-focus-group mt-10 grid gap-x-6 gap-y-10", cols)}>
        {images.map((img, i) => {
          const fig = `Fig. ${padWeek(week)}.${i + 1}`;
          const label = img.alt || img.caption || `Week ${week} photo ${i + 1}`;
          return (
            <li key={i} className="fx-focus-item">
              <Reveal delay={(i % 3) * STAGGER}>
                <figure>
                  {img.src ? (
                    <a href={img.src} target="_blank" rel="noopener noreferrer" className="card-link" aria-label={`Open full size: ${label}`}>
                      <ContentImage image={img} placeholderLabel={label} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" zoom />
                    </a>
                  ) : (
                    <ContentImage image={img} placeholderLabel={label} sizes="100vw" />
                  )}
                  <figcaption className="mt-3 flex gap-3 text-small text-muted">
                    <span className="shrink-0 font-mono text-label uppercase leading-[inherit] text-accent-text">{fig}</span>
                    {img.caption ? <span>{img.caption}</span> : null}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
