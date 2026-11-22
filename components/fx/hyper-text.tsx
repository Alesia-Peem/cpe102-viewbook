"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Letters scramble, then settle left to right on the real text — once when it scrolls into view,
 * and again when `hoverTarget` (a CSS selector for an ancestor, e.g. "a") is hovered.
 * Use on monospace labels so the width never changes. Screen readers get the real text.
 */
export function HyperText({ text, className, hoverTarget, duration = 700 }: { text: string; className?: string; hoverTarget?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const running = useRef(false);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const run = useCallback(() => {
    if (reduce || running.current) return;
    running.current = true;
    const frames = Math.max(8, Math.round(duration / 30));
    let frame = 0;
    const id = window.setInterval(() => {
      frame++;
      const settled = Math.floor((frame / frames) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < settled ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      if (frame >= frames) {
        window.clearInterval(id);
        setDisplay(text);
        running.current = false;
      }
    }, 30);
  }, [duration, reduce, text]);

  // Scramble in once when first seen.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(run, 0);
    return () => window.clearTimeout(t);
  }, [inView, run]);

  // Scramble again when the given ancestor is hovered.
  useEffect(() => {
    if (!hoverTarget) return;
    const host = ref.current?.closest(hoverTarget);
    if (!host) return;
    host.addEventListener("mouseenter", run);
    return () => host.removeEventListener("mouseenter", run);
  }, [hoverTarget, run]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
