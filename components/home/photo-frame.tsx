import Image from "next/image";
import type { ImageRef } from "@/types/content";
import { cn } from "@/lib/utils";
import { resolveImage } from "@/lib/images";
import { EmptyFrame } from "./empty-frame";

/**
 * A photograph cropped to a fixed frame, or — until the file exists — a designed empty frame
 * naming the file to add (same conventions as ContentImage, see lib/images.ts). Server component.
 */
export function PhotoFrame({
  image,
  fallbackPath,
  label,
  code,
  aspect = "aspect-[4/3]",
  sizes,
  tone = "light",
  priority,
  zoom = false,
  position,
  compact,
  className,
}: {
  image?: ImageRef;
  fallbackPath?: string;
  /** What the photograph should show (placeholder text and default alt text). */
  label: string;
  code?: string;
  aspect?: string;
  sizes: string;
  tone?: "light" | "dark" | "yellow";
  priority?: boolean;
  zoom?: boolean;
  /** object-position, e.g. "50% 30%". */
  position?: string;
  compact?: boolean;
  className?: string;
}) {
  const { src, expected } = resolveImage(image, fallbackPath);
  return (
    <div className={cn("relative w-full overflow-hidden", aspect, className)}>
      {src ? (
        <Image
          src={src}
          alt={image?.alt || image?.caption || label}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoom && "zoom-img")}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <EmptyFrame label={label} file={expected} code={code} tone={tone} compact={compact} />
      )}
    </div>
  );
}
