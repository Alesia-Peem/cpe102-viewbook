import Image from "next/image";
import type { ImageRef } from "@/types/content";
import { cn, imageExists } from "@/lib/utils";
import { ImagePlaceholder } from "./placeholder";

type Props = {
  image?: ImageRef;
  /** Label shown on the placeholder when the photo is missing. */
  placeholderLabel: string;
  /** Tailwind aspect ratio class(es), e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  /** Zoom the photo slightly when a parent `.card-link` is hovered. */
  zoom?: boolean;
  className?: string;
};

/**
 * Renders a user photo inside a fixed aspect-ratio frame, or a labelled
 * placeholder if the path is empty or the file is not in /public yet.
 * (Server component — the file check runs at build time.)
 */
export function ContentImage({
  image,
  placeholderLabel,
  aspect = "aspect-[4/3]",
  sizes,
  priority,
  zoom = false,
  className,
}: Props) {
  const hasImage = imageExists(image?.src);

  return (
    <div className={cn("relative w-full overflow-hidden bg-surface", aspect, className)}>
      {hasImage ? (
        <Image
          src={image!.src!}
          alt={image?.alt || image?.caption || placeholderLabel}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoom && "zoom-img")}
        />
      ) : (
        <ImagePlaceholder label={placeholderLabel} />
      )}
    </div>
  );
}
