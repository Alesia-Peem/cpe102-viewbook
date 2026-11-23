"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";

type Phase = { id: string; weeks: string; title: string; swatch: string };

/**
 * A sideways-scrolling index (native scroll, so touch, trackpad, Shift+wheel and the keyboard
 * all work). Visible previous/next buttons, a jump to each part of the semester, and a
 * progress rule. The track is aligned to the page's content edge and never widens the page.
 */
export function WeekRail({ children, phases, label }: { children: React.ReactNode; phases: Phase[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ atStart: true, atEnd: false, progress: 0, visible: 0.3 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth;
        setPos({
          atStart: el.scrollLeft <= 4,
          atEnd: el.scrollLeft >= max - 4,
          progress: max > 0 ? el.scrollLeft / max : 1,
          visible: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
        });
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

  const page = useCallback(
    (dir: 1 | -1) => {
      const el = track.current;
      if (el) el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.75), behavior });
    },
    [behavior],
  );

  const jump = useCallback(
    (id: string) => {
      const el = track.current;
      const target = el?.querySelector<HTMLElement>(`[data-phase="${id}"]`);
      if (!el || !target) return;
      const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      el.scrollTo({ left: target.offsetLeft - pad, behavior });
    },
    [behavior],
  );

  const btn =
    "flex size-11 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-yellow hover:bg-yellow hover:text-ink disabled:pointer-events-none disabled:opacity-35";

  return (
    <div>
      <Container className="flex items-center justify-between gap-6">
        <ul className="grid min-w-0 flex-1 grid-cols-3 gap-2 sm:flex sm:flex-wrap" aria-label="Jump to a part of the semester">
          {phases.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => jump(p.id)}
                aria-controls="weeks-rail"
                aria-label={`Jump to ${p.weeks}: ${p.title}`}
                className="flex min-h-11 w-full items-center gap-2 border border-white/20 px-3 font-mono text-label uppercase text-white/70 transition-colors hover:border-white/60 hover:text-white"
              >
                <span aria-hidden className={cn("inline-block size-2.5 shrink-0", p.swatch)} />
                <span aria-hidden>
                  <span className="sm:hidden">{p.weeks.replace(/^Weeks? /, "W")}</span>
                  <span className="hidden sm:inline">{p.weeks}</span>
                  <span className="hidden xl:inline"> · {p.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Arrows className="hidden md:flex" btn={btn} page={page} atStart={pos.atStart} atEnd={pos.atEnd} />
      </Container>

      <div
        ref={track}
        id="weeks-rail"
        role="region"
        aria-label={label}
        tabIndex={0}
        className="rail relative mt-6 flex gap-3 overflow-x-auto pb-2 pt-1 outline-offset-[-4px] snap-x snap-mandatory sm:gap-4"
      >
        {children}
      </div>

      <Container className="mt-5">
        <div aria-hidden className="relative h-0.5 bg-white/15">
          <div
            className="absolute inset-y-0 bg-yellow"
            style={{ width: `${Math.max(8, pos.visible * 100)}%`, left: `${pos.progress * (100 - Math.max(8, pos.visible * 100))}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="font-mono text-label uppercase text-white/70">
            <span className="hidden md:inline">Scroll sideways, use the arrows, or Tab through the weeks</span>
            <span className="md:hidden">Swipe or use the arrows</span>
          </p>
          <Arrows className="flex md:hidden" btn={btn} page={page} atStart={pos.atStart} atEnd={pos.atEnd} />
        </div>
      </Container>
    </div>
  );
}

function Arrows({ className, btn, page, atStart, atEnd }: { className: string; btn: string; page: (dir: 1 | -1) => void; atStart: boolean; atEnd: boolean }) {
  return (
    <div className={cn("shrink-0 gap-2", className)}>
      <button type="button" className={btn} onClick={() => page(-1)} disabled={atStart} aria-controls="weeks-rail" aria-label="Show earlier weeks">
        <ArrowLeft aria-hidden className="size-5" />
      </button>
      <button type="button" className={btn} onClick={() => page(1)} disabled={atEnd} aria-controls="weeks-rail" aria-label="Show later weeks">
        <ArrowRight aria-hidden className="size-5" />
      </button>
    </div>
  );
}
