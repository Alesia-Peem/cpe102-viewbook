import type { ImageRef } from "@/types/content";
import { ContentImage } from "@/components/ui/content-image";
import { cn } from "@/lib/utils";

/** Captioned photo grid. A single photo spans the full width. */
export function WeekGallery({ images, week }: { images: ImageRef[]; week: number }) {
  if (images.length === 0) return null;
  const single = images.length === 1;

  return (
    <section aria-labelledby="gallery-heading" className="mt-16">
      <h2 id="gallery-heading" className="text-xl font-semibold tracking-tight">
        Gallery
      </h2>
      <ul className={cn("mt-6 grid gap-x-6 gap-y-8", !single && "sm:grid-cols-2")}>
        {images.map((img, i) => (
          <li key={i}>
            <figure>
              {img.src ? (
                <a href={img.src} target="_blank" rel="noopener noreferrer" aria-label="Open full-size photo">
                  <ContentImage
                    image={img}
                    placeholderLabel={`Week ${week} photo ${i + 1}`}
                    sizes={single ? "(min-width: 768px) 768px, 100vw" : "(min-width: 640px) 384px, 100vw"}
                    className="transition-opacity hover:opacity-90"
                  />
                </a>
              ) : (
                <ContentImage image={img} placeholderLabel={`Week ${week} photo ${i + 1}`} sizes="100vw" />
              )}
              {img.caption ? <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption> : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
