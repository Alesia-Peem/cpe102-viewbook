"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * A strip of items sliding sideways forever (decorative — the same links exist elsewhere).
 * Pauses on hover and with its button; stands still under reduced motion.
 */
export function Marquee({ items, label }: { items: React.ReactNode[]; label: string }) {
  const [paused, setPaused] = useState(false);
  const row = (copy: number) =>
    items.map((item, i) => (
      <span key={`${copy}-${i}`} className="flex items-center gap-8 pr-8">
        {item}
        <span aria-hidden className="inline-block size-1.5 rotate-45 bg-accent" />
      </span>
    ));

  return (
    <div className="fx-marquee-group relative overflow-hidden border-t border-white/10 bg-deep py-5 text-white">
      <div aria-hidden className="fx-marquee" data-paused={paused} style={{ "--marquee-duration": `${Math.max(30, items.length * 4)}s` } as React.CSSProperties}>
        {row(0)}
        {row(1)}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-deep via-deep to-transparent" />
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? `Play ${label}` : `Pause ${label}`}
        aria-pressed={paused}
        className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white motion-reduce:hidden"
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </div>
  );
}
