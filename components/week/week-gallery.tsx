import type { ImageRef } from "@/types/content";
import { ContentImage } from "@/components/ui/content-image";
import { cn } from "@/lib/utils";

/** Captioned photo grid across the full content width. Photos open full size. */
export function WeekGallery({ images, week }: { images: ImageRef[]; week: number }) {
  if (images.length === 0) return null;
  const cols = images.length === 1 ? "" : images.length === 2 || images.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24">
      <h2 id="gallery-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Gallery
      </h2>
      <ul className={cn("mt-8 grid gap-x-6 gap-y-10", cols)}>
        {images.map((img, i) => {
          const label = `Week ${week} photo ${i + 1}`;
          return (
            <li key={i}>
              <figure>
                {img.src ? (
                  <a href={img.src} target="_blank" rel="noopener noreferrer" className="card-link" aria-label={`Open full-size: ${img.caption || label}`}>
                    <ContentImage image={img} placeholderLabel={label} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" zoom />
                  </a>
                ) : (
                  <ContentImage image={img} placeholderLabel={label} sizes="100vw" />
                )}
                {img.caption ? <figcaption className="mt-3 text-sm leading-relaxed text-muted">{img.caption}</figcaption> : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
