"use client";

import * as m from "motion/react-m";
import { EASE_OUT } from "@/components/motion/tokens";

/**
 * A cone of light that opens over a heading when it scrolls into view (dark grounds only).
 * Two conic gradients meet at the centre; a bright line marks the lamp.
 */
export function Lamp() {
  const open = { duration: 0.9, ease: EASE_OUT, delay: 0.15 };
  return (
    <div aria-hidden className="pointer-events-none relative isolate mx-auto flex h-40 w-full max-w-4xl items-start justify-center overflow-hidden">
      <m.div
        initial={{ opacity: 0.4, width: "12rem" }}
        whileInView={{ opacity: 1, width: "28rem" }}
        viewport={{ once: true }}
        transition={open}
        style={{ backgroundImage: "conic-gradient(from 70deg at center top, var(--color-accent), transparent, transparent)" }}
        className="absolute right-1/2 top-0 h-40 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      />
      <m.div
        initial={{ opacity: 0.4, width: "12rem" }}
        whileInView={{ opacity: 1, width: "28rem" }}
        viewport={{ once: true }}
        transition={open}
        style={{ backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, var(--color-accent))" }}
        className="absolute left-1/2 top-0 h-40 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      />
      <div className="absolute top-0 h-24 w-[26rem] max-w-full -translate-y-1/2 rounded-full bg-accent/40 blur-3xl" />
      <m.div
        initial={{ width: "8rem" }}
        whileInView={{ width: "22rem" }}
        viewport={{ once: true }}
        transition={open}
        className="absolute top-0 h-px max-w-full bg-[#ffc2a3]"
      />
    </div>
  );
}
