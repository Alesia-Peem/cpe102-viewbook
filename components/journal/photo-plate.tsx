"use client";

import Image from "next/image";
import { useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useTransform } from "motion/react";
import { Expand } from "lucide-react";
import type { JournalPhoto } from "@/types/journal";
import { cn } from "@/lib/utils";
import { PhotoTrigger } from "./lightbox";
import { ClipReveal } from "./journal-motion";
import { frameRatio } from "./chapter-style";

type Props = {
  /** Every photo of the week (the gallery opens over all of them). */
  photos: JournalPhoto[];
  index: number;
  weekLabel: string; // "Week 05"
  weekNumber: string; // "05"
  /** Frame ratio (width / height). Defaults to the photo's own ratio, so nothing is cropped. */
  ratio?: number;
  sizes: string;
  priority?: boolean;
  /** Drift the photo slightly inside its frame while the page scrolls (large photos only). */
  parallax?: boolean;
  /** Caption text colour for the chapter ground. */
  captionTone?: { muted: string; smallAccent: string };
  className?: string;
};

/**
 * One photograph of a week: a numbered figure that opens the fullscreen gallery.
 * The frame opens from a clipped inset when it enters the view; large photos drift a few percent
 * inside it (parallax). Both rest under prefers-reduced-motion (journal.css).
 */
export function PhotoPlate({ photos, index, weekLabel, weekNumber, ratio, sizes, priority, parallax = false, captionTone, className }: Props) {
  const photo = photos[index];
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  if (!photo) return null;

  const r = ratio ?? frameRatio(photo);
  const fig = `Fig. ${weekNumber}.${index + 1}`;

  return (
    <figure className={cn("relative", className)}>
      <div ref={frame}>
        <ClipReveal className="relative overflow-hidden bg-ink/10" style={{ aspectRatio: r }}>
          <PhotoTrigger
            photos={photos}
            index={index}
            label={`Open photo ${index + 1} of ${photos.length}, ${weekLabel}`}
            className="jr-trigger absolute inset-0 block size-full cursor-zoom-in overflow-hidden text-left"
          >
            <m.span
              className={cn("jr-parallax absolute block", parallax ? "inset-x-0 -top-[6%] -bottom-[6%]" : "inset-0")}
              style={parallax ? { y } : undefined}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={sizes}
                priority={priority}
                className="jr-photo-img object-cover"
              />
            </m.span>
            <span className="jr-open-tag absolute right-3 bottom-3 inline-flex min-h-8 items-center gap-1.5 bg-background px-2.5 font-mono text-label uppercase text-ink">
              <Expand aria-hidden className="size-3.5" strokeWidth={1.75} />
              Open
            </span>
          </PhotoTrigger>
        </ClipReveal>
      </div>
      <figcaption className="mt-3 flex items-baseline gap-3 text-small">
        <span className={cn("shrink-0 font-mono text-label uppercase", captionTone?.smallAccent ?? "text-accent-text")}>{fig}</span>
        {photo.caption ? <span className={captionTone?.muted ?? "text-muted"}>{photo.caption}</span> : null}
      </figcaption>
    </figure>
  );
}
