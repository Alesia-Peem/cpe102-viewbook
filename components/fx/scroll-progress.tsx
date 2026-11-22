"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";

/** A thin gradient bar under the header showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-50 h-0.5 origin-left bg-gradient-to-r from-accent via-[#ffb38a] to-sky"
    />
  );
}
