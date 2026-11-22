"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/**
 * A beam down the left of the text that fills as you read (desktop only).
 * Purely decorative progress; the text works without it.
 */
export function TracingBeam({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.35", "end 0.65"] });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute -left-10 top-1 hidden h-full w-px bg-line lg:block">
        <m.div style={{ scaleY: progress }} className="h-full w-px origin-top bg-gradient-to-b from-accent via-sky to-sky/0" />
        <div className="absolute -left-[5px] -top-1 size-[11px] rounded-full border border-accent bg-paper shadow-[0_0_12px_rgb(242_102_43/0.6)]" />
      </div>
      {children}
    </div>
  );
}
