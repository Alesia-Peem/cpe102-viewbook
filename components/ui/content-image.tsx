import Image from "next/image";
import type { ImageRef } from "@/types/content";
import { cn } from "@/lib/utils";
import { resolveImage } from "@/lib/images";
import { ImagePlaceholder } from "./placeholder";

type Props = {
  image?: ImageRef;
  /** Conventional location without extension, e.g. "/images/weeks/week-05/cover" (see lib/images.ts). */
  fallbackPath?: string;
  /** What the photo should show — the placeholder's label and the default alt text. */
  placeholderLabel: string;
  /** Tailwind aspect ratio class(es); photos are cropped to it so every frame lines up. */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  /** Zoom the photo slightly when a parent `.card-link` is hovered. */
  zoom?: boolean;
  /** Small frame: the placeholder hides the file path on phones. */
  compact?: boolean;
  className?: string;
};

/**
 * A photograph in a fixed aspect-ratio frame, or a labelled placeholder naming the file to add.
 * Server component — the file check runs at build time (and on each request in `npm run dev`).
 */
export function ContentImage({ image, fallbackPath, placeholderLabel, aspect = "aspect-[4/3]", sizes, priority, zoom = false, compact = false, className }: Props) {
  const { src, expected } = resolveImage(image, fallbackPath);

  return (
    <div className={cn("relative w-full overflow-hidden bg-surface", aspect, className)}>
      {src ? (
        <Image
          src={src}
          alt={image?.alt || image?.caption || placeholderLabel}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoom && "zoom-img")}
        />
      ) : (
        <ImagePlaceholder label={placeholderLabel} file={expected} compact={compact} />
      )}
    </div>
  );
}
