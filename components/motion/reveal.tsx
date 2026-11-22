"use client";

import * as m from "motion/react-m";
import { REVEAL } from "./tokens";

/**
 * Fades its content up with a soft blur the first time it scrolls into view (once, 0.5s).
 * `delay` staggers items that enter together. Content stays visible without JavaScript
 * (see the <noscript> rule in app/layout.tsx).
 */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={REVEAL.hidden}
      whileInView={REVEAL.shown}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ ...REVEAL.transition, delay }}
    >
      {children}
    </m.div>
  );
}
