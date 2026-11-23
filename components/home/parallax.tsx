"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/**
 * Moves its content a little slower than the page while it crosses the screen (depth for
 * layered compositions). `distance` is the total travel in px. Reduced motion: held still by
 * the `.parallax` rule in home.css (same markup on server and client, so no hydration mismatch).
 */
export function Parallax({ children, distance = 60, className }: { children: React.ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <m.div ref={ref} className={cn("parallax", className)} style={{ y }}>
      {children}
    </m.div>
  );
}
