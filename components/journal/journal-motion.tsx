"use client";

import * as m from "motion/react-m";
import { EASE_OUT } from "@/components/motion/tokens";

/**
 * A frame that opens from a clipped inset to full size the first time it scrolls into view.
 * The clip is cancelled by CSS (journal.css → .jr-clip) without JavaScript and under reduced motion,
 * so the content is never left hidden.
 */
export function ClipReveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <m.div
      className={`jr-clip ${className ?? ""}`}
      style={style}
      initial={{ clipPath: "inset(9% 7% 9% 7%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    >
      {children}
    </m.div>
  );
}

const RISE = { hidden: { y: "105%" }, shown: { y: "0%" } } as const;

/**
 * Poster type that rises into place inside its own mask (the giant week numbers, phase titles).
 * The mask is what's observed — the moving line starts outside it, so it could never be "in view" itself.
 */
export function MaskUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <m.span
      className={`jr-mask block overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <m.span className="block" variants={RISE} transition={{ duration: 0.9, ease: EASE_OUT, delay }}>
        {children}
      </m.span>
    </m.span>
  );
}
