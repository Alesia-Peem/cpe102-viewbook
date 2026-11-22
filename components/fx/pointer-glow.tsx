"use client";

import { useEffect, useRef } from "react";

/**
 * A radial glow that follows the mouse across its parent section.
 * Writes CSS variables directly (no React re-render per move). Mouse only.
 */
export function PointerGlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
        el.dataset.active = "true";
      });
    };
    const leave = () => (el.dataset.active = "false");
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden className={`fx-pointer-glow pointer-events-none absolute inset-0 z-0 ${className}`} />;
}
