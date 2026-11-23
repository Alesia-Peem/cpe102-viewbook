"use client";

/**
 * Sticky week navigation for /journal (sits under the 64px site header).
 *   <JournalNav weeks={[{ slug, number, topic, hasPhotos }]} />
 * Each week chapter on the page is <section id={slug}> (e.g. "week-05").
 *
 * - Active week: the chapter crossing a thin band just above the middle of the screen
 *   (IntersectionObserver, rootMargin "-45% 0px -50% 0px"). None while the reader is in the intro.
 * - Progress: a ruler under the bar, one segment per week, filled by how far the same reading line
 *   has travelled through the chapters.
 * - Clicking a week scrolls so the chapter starts right under this bar (instant under reduced motion),
 *   updates the hash without a jump, and moves focus to the chapter like a native anchor does.
 * - Phones: Prev · "WEEK 05 / 16" (opens a scrollable strip of all weeks) · Next.
 */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, useMotionValue, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { EASE_OUT, SPRING } from "@/components/motion/tokens";
import { cn } from "@/lib/utils";

export type JournalNavWeek = { slug: string; number: string; topic: string; hasPhotos: boolean };

/** The reading band: from 45% to 50% of the viewport height. */
const BAND = "-45% 0px -50% 0px";
/** The band's top edge as a fraction of the viewport height (used for progress and fallbacks). */
const LINE = 0.45;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const weekName = (w: JournalNavWeek) => `Week ${w.number}: ${w.topic}${w.hasPhotos ? " (photos)" : ""}`;
const getSections = (slugs: string[]) => slugs.map((s) => document.getElementById(s)).filter((el): el is HTMLElement => el !== null);

export function JournalNav({ weeks }: { weeks: JournalNavWeek[] }) {
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLOListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  /** While a click-scroll runs (and until the reader scrolls again) the clicked week stays highlighted. */
  const lock = useRef<{ dispose: () => void } | null>(null);
  /** Re-reads the active week from the observer's state (set by the observer effect). */
  const recompute = useRef<() => void>(() => {});

  const [active, setActive] = useState<string | null>(null);
  const [stripOpen, setStripOpen] = useState(false);
  const progress = useMotionValue(0);
  const stripShift = useReducedMotion() ? 0 : -6;
  const stripId = useId();

  const slugs = useMemo(() => weeks.map((w) => w.slug), [weeks]);
  const total = weeks.length;
  const index = active ? slugs.indexOf(active) : -1;
  const current = index >= 0 ? weeks[index] : null;
  const prev = index > 0 ? weeks[index - 1] : null;
  const next = index < total - 1 ? weeks[index + 1] : null; // from the intro, "next" is week 01

  // Active week: the first chapter inside the reading band.
  useEffect(() => {
    const sections = getSections(slugs);
    if (sections.length === 0) return;
    const visible = new Set<string>();
    const pick = () => {
      const inBand = sections.find((el) => visible.has(el.id));
      if (inBand) return inBand.id;
      // Nothing in the band: in the intro (neutral), or past the last chapter (keep the last one).
      const line = window.innerHeight * LINE;
      let found: string | null = null;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) found = el.id;
      return found;
    };
    const update = () => {
      if (!lock.current) setActive(pick());
    };
    recompute.current = update;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: BAND },
    );
    sections.forEach((el) => observer.observe(el));
    // A jump between two places where no chapter is in the band (page end → intro) crosses nothing the
    // observer reports, so while the band is empty a scroll re-checks the fallback.
    let frame = 0;
    const onScroll = () => {
      if (visible.size > 0 || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      recompute.current = () => {};
    };
  }, [slugs]);

  // Progress through the 16 weeks: whole weeks passed + the fraction of the current one.
  useEffect(() => {
    const sections = getSections(slugs);
    if (sections.length === 0) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * LINE;
      let p = 1;
      for (let i = 0; i < sections.length; i++) {
        const r = sections[i].getBoundingClientRect();
        if (r.bottom > line) {
          p = (i + clamp01((line - r.top) / Math.max(1, r.height))) / sections.length;
          break;
        }
      }
      // At the very bottom the reading line may never reach the end of the last chapter.
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      progress.set(p > 0 && atEnd ? 1 : p);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule); // photos loading, chapters growing
    resize.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
    };
  }, [slugs, progress]);

  // Phone strip: keep the active week centred in it (scrolls the strip only, never the page).
  useEffect(() => {
    if (!stripOpen) return;
    const strip = stripRef.current;
    const item = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !item) return;
    strip.scrollTo({ left: item.offsetLeft - (strip.clientWidth - item.offsetWidth) / 2, behavior: "instant" });
  }, [active, stripOpen]);

  // Phone strip: a tap outside closes it.
  useEffect(() => {
    if (!stripOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setStripOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [stripOpen]);

  useEffect(() => () => lock.current?.dispose(), []);

  /** Hold `slug` as active until the smooth scroll settles and the reader scrolls on their own. */
  const holdActive = useCallback(() => {
    lock.current?.dispose();
    let settled = false;
    let idle = 0;
    function settle() {
      settled = true;
    }
    function dispose() {
      window.clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
    }
    function release() {
      dispose();
      lock.current = null;
      recompute.current();
    }
    function onScroll() {
      // Scrolling after the jump has settled is the reader's own: hand control back to the observer.
      if (settled) return release();
      window.clearTimeout(idle);
      idle = window.setTimeout(settle, 150);
    }
    idle = window.setTimeout(settle, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    lock.current = { dispose };
  }, []);

  const goTo = useCallback(
    (slug: string, moveFocus: boolean) => {
      const section = document.getElementById(slug);
      const nav = navRef.current;
      const bar = barRef.current;
      if (!section || !nav || !bar) return;
      // Land the chapter's top edge right under the header + this bar (both sticky).
      const stickyTop = parseFloat(getComputedStyle(nav).top) || 0;
      const barBottom = stickyTop + bar.offsetHeight + (nav.offsetHeight - nav.clientHeight);
      const top = Math.max(0, Math.round(section.getBoundingClientRect().top + window.scrollY - barBottom));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      holdActive();
      setActive(slug);
      setStripOpen(false);
      window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
      if (window.location.hash !== `#${slug}`) window.history.replaceState(null, "", `#${slug}`);

      if (moveFocus) {
        // Like a native in-page link: the next Tab continues from the chapter.
        if (!section.hasAttribute("tabindex")) {
          section.setAttribute("tabindex", "-1");
          section.addEventListener("blur", () => section.removeAttribute("tabindex"), { once: true });
        }
        section.focus({ preventScroll: true });
      }
    },
    [holdActive],
  );

  const onWeekClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab etc.
    e.preventDefault();
    goTo(slug, true);
  };

  if (total === 0) return null;

  const stepButton = (target: JournalNavWeek | null, direction: "prev" | "next") => {
    const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
    const verb = direction === "prev" ? "Previous week" : "Next week";
    const label = target ? `${verb}: ${weekName(target)}` : `${verb} (none)`;
    return (
      <button
        type="button"
        aria-label={label}
        title={target ? `${verb} · Week ${target.number}` : undefined}
        aria-disabled={target ? undefined : true}
        onClick={() => target && goTo(target.slug, false)}
        className={cn(
          "flex size-11 shrink-0 items-center justify-center border border-line transition-colors duration-150",
          target ? "text-ink hover:border-ink hover:bg-surface" : "cursor-not-allowed text-line-strong",
        )}
      >
        <Icon aria-hidden className="size-4" />
      </button>
    );
  };

  const weekLink = (w: JournalNavWeek, layoutId: string, size: string) => {
    const isActive = w.slug === active;
    const name = weekName(w);
    return (
      <li key={w.slug}>
        <a
          href={`#${w.slug}`}
          aria-current={isActive ? "true" : undefined}
          aria-label={name}
          title={name}
          onClick={(e) => onWeekClick(e, w.slug)}
          className={cn(
            "relative flex h-11 items-center justify-center font-mono text-small font-medium tabular-nums transition-colors duration-150",
            size,
            isActive ? "text-secondary" : "text-muted hover:bg-surface hover:text-ink",
          )}
        >
          {isActive ? <m.span layoutId={layoutId} aria-hidden className="absolute inset-x-0.5 inset-y-1.5 bg-ink" transition={SPRING} /> : null}
          <span className="relative">{w.number}</span>
          {w.hasPhotos ? <span aria-hidden className="absolute right-1 top-2 size-1 rounded-full bg-accent" /> : null}
        </a>
      </li>
    );
  };

  const position = current ? `Week ${current.number} / ${String(total).padStart(2, "0")}` : `${total} weeks`;
  const topic = current ? current.topic : "Choose a week";

  return (
    <nav
      ref={navRef}
      aria-label="Journal weeks"
      onKeyDown={(e) => {
        if (e.key === "Escape" && stripOpen) {
          setStripOpen(false);
          toggleRef.current?.focus();
        }
      }}
      className="sticky top-16 z-30 border-b border-line bg-paper"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div ref={barRef} className="flex h-[51px] items-center gap-2 md:h-[55px] md:justify-center md:gap-3 lg:justify-between">
          {/* Readout (wide screens) */}
          <div className="hidden min-w-0 flex-1 lg:block">
            <p className="flex items-center gap-2 font-mono text-label uppercase text-muted">
              <span aria-hidden className="inline-block size-1.5 bg-accent" />
              {position}
            </p>
            <p className="truncate text-small font-semibold text-ink">{topic}</p>
          </div>

          {stepButton(prev, "prev")}

          {/* Phones: the readout opens the strip of all weeks. */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={stripOpen}
            aria-controls={stripId}
            onClick={() => setStripOpen((o) => !o)}
            className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 px-1 md:hidden"
          >
            <span className="flex min-w-0 flex-col items-center">
              <span className="font-mono text-label uppercase text-ink">{position}</span>
              <span className="max-w-full truncate text-small text-muted">{topic}</span>
            </span>
            <ChevronDown aria-hidden className={cn("size-4 shrink-0 text-muted transition-transform duration-200", stripOpen && "rotate-180")} />
            <span className="sr-only">, all weeks</span>
          </button>
          <AnimatePresence>
            {stripOpen ? (
              <m.div
                key="strip"
                id={stripId}
                initial={{ opacity: 0, y: stripShift }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: stripShift, transition: { duration: 0.12 } }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_10px_18px_-14px_rgb(15_27_42/0.45)] md:hidden"
              >
                <ol ref={stripRef} className="relative flex gap-1 overflow-x-auto overscroll-x-contain px-4 py-1 [scrollbar-width:none]">
                  {weeks.map((w) => weekLink(w, "journal-strip-active", "w-11 shrink-0"))}
                </ol>
              </m.div>
            ) : null}
          </AnimatePresence>

          {/* Tablets and up: all sixteen weeks. */}
          <ol className="hidden items-center md:flex">{weeks.map((w) => weekLink(w, "journal-nav-active", "w-9 lg:w-10"))}</ol>

          {stepButton(next, "next")}
        </div>
      </div>

      {/* Progress ruler: one segment per week. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5">
        <m.div style={{ scaleX: progress }} className="h-full origin-left bg-ink" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(to right, transparent 0 calc(100% / ${total} - 1px), var(--color-paper) calc(100% / ${total} - 1px) calc(100% / ${total}))`,
          }}
        />
      </div>
    </nav>
  );
}
