"use client";

/**
 * Fullscreen photo gallery for /journal.
 *
 *   <LightboxProvider>…</LightboxProvider>   wraps a page; renders the gallery dialog (portalled to <body>)
 *   <PhotoTrigger photos={photos} index={i} label="Open photo 2 of 5, Week 03">…image…</PhotoTrigger>
 *       a <button> around any image; clicking opens the gallery at `index` over `photos`
 *   useLightbox() → { open(photos, index, options?): void; close(): void; isOpen: boolean }
 *
 * Keyboard: ← → step (wrapping at the ends), Home / End jump, Esc closes, Tab stays inside.
 * Touch: swipe left / right (50px, mostly horizontal). Clicking the dark ground closes.
 * Focus goes to Close on open and back to the photo that opened it on close; the page behind
 * is inert and does not scroll. Under reduced motion only opacity animates (MotionConfig).
 */
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, useIsPresent, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { JournalPhoto } from "@/types/journal";
import { EASE_OUT } from "@/components/motion/tokens";
import { cn } from "@/lib/utils";

type OpenOptions = {
  /** Where focus returns on close. Defaults to the element focused when the gallery opened. */
  trigger?: HTMLElement | null;
  /** Context for the dialog label, e.g. "Week 03". Defaults to the week in the photo's path. */
  title?: string;
};

type LightboxApi = {
  open: (photos: JournalPhoto[], index: number, options?: OpenOptions) => void;
  close: () => void;
  isOpen: boolean;
};

type Gallery = {
  photos: JournalPhoto[];
  index: number;
  /** Direction of the last move: 1 forward, -1 back, 0 none (cross-fade only). */
  dir: -1 | 0 | 1;
  /** Navigations since opening (the live region stays quiet until the first one). */
  moves: number;
  /** Increments per opening, so a re-open during the exit fade mounts a fresh dialog. */
  session: number;
  title?: string;
};

const LightboxContext = createContext<LightboxApi | null>(null);

/** Minimum horizontal travel for a swipe, in CSS pixels. */
const SWIPE_DISTANCE = 50;

const pad = (n: number, total: number) => String(n).padStart(Math.max(2, String(total).length), "0");

/** "Week 03" from "Open photo 2 of 5, Week 03" or "/images/weeks/week-03/x.jpg". */
function findWeek(...sources: Array<string | undefined>) {
  for (const source of sources) {
    const match = source?.match(/week[\s_-]*0*(\d{1,2})(?!\d)/i);
    if (match) return `Week ${match[1].padStart(2, "0")}`;
  }
  return undefined;
}

/** "Fig. 03.2" (week 03, photo 2), matching the chapter captions; "Fig. 02" without a week. */
function figureLabel(title: string | undefined, index: number, total: number) {
  const week = title?.match(/(\d+)$/)?.[1];
  return week ? `Fig. ${week}.${index + 1}` : `Fig. ${pad(index + 1, total)}`;
}

const noopSubscribe = () => () => {};
/** False during SSR and hydration, true afterwards — without setting state in an effect. */
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** `sizes` that matches how the photo is fitted: height-bound when the screen is wider than the photo. */
function photoSizes(photo: JournalPhoto) {
  const vh = Math.ceil((100 * photo.width) / photo.height);
  return `(min-aspect-ratio: ${photo.width}/${photo.height}) ${vh}vh, 100vw`;
}

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const sessions = useRef(0);
  const isClient = useIsClient();
  const isOpen = gallery !== null;

  const open = useCallback((photos: JournalPhoto[], index: number, options?: OpenOptions) => {
    if (photos.length === 0) return;
    const active = document.activeElement;
    returnFocus.current = options?.trigger ?? (active instanceof HTMLElement ? active : null);
    const i = Math.min(Math.max(0, Math.trunc(index) || 0), photos.length - 1);
    sessions.current += 1;
    setGallery({ photos, index: i, dir: 0, moves: 0, session: sessions.current, title: options?.title ?? findWeek(photos[i].src) });
  }, []);

  const close = useCallback(() => setGallery(null), []);

  const step = useCallback((delta: 1 | -1) => {
    setGallery((g) => {
      if (!g || g.photos.length < 2) return g;
      const n = g.photos.length;
      return { ...g, index: (g.index + delta + n) % n, dir: delta, moves: g.moves + 1 };
    });
  }, []);

  const jump = useCallback((to: "first" | "last") => {
    setGallery((g) => {
      if (!g) return g;
      const index = to === "first" ? 0 : g.photos.length - 1;
      return index === g.index ? g : { ...g, index, dir: to === "first" ? -1 : 1, moves: g.moves + 1 };
    });
  }, []);

  // While open: keys, focus trap, the page behind made inert, scroll locked. Undone the moment it closes
  // (the exit fade plays on top), and focus goes back to the photo that opened it.
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement } = document;

    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`;

    // Everything else on the page leaves the tab order and the accessibility tree.
    const inerted: HTMLElement[] = [];
    for (const el of Array.from(body.children)) {
      if (!(el instanceof HTMLElement) || el.inert || el.hasAttribute("data-lightbox")) continue;
      if (el.tagName.includes("-") || ["SCRIPT", "STYLE", "LINK", "TEMPLATE", "NOSCRIPT"].includes(el.tagName)) continue;
      el.inert = true;
      inerted.push(el);
    }

    const trapTab = (e: KeyboardEvent) => {
      const dialog = document.querySelector<HTMLElement>('[data-lightbox][data-state="open"]');
      if (!dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
      if (items.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !dialog.contains(current) || current === dialog;
      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.altKey || e.ctrlKey || e.metaKey) return;
      const keys: Record<string, () => void> = {
        Escape: close,
        ArrowRight: () => step(1),
        ArrowLeft: () => step(-1),
        Home: () => jump("first"),
        End: () => jump("last"),
      };
      if (e.key === "Tab") return trapTab(e);
      const action = keys[e.key];
      if (!action) return;
      e.preventDefault();
      action();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      for (const el of inerted) el.inert = false;
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      const target = returnFocus.current;
      if (target?.isConnected) target.focus({ preventScroll: true });
    };
  }, [isOpen, close, step, jump]);

  const api = useMemo<LightboxApi>(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <LightboxContext.Provider value={api}>
      {children}
      {isClient
        ? createPortal(
            <AnimatePresence>
              {gallery ? <LightboxDialog key={gallery.session} gallery={gallery} onClose={close} onStep={step} /> : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxApi {
  const ctx = useContext(LightboxContext);
  return ctx ?? { open: () => {}, close: () => {}, isOpen: false };
}

export function PhotoTrigger({
  photos,
  index,
  label,
  className,
  children,
}: {
  photos: JournalPhoto[];
  index: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={(e) => open(photos, index, { trigger: e.currentTarget, title: findWeek(label, photos[index]?.src) })}
      className={cn("cursor-zoom-in", className)}
    >
      {children}
    </button>
  );
}

/* ───────────────────────────── the dialog ───────────────────────────── */

const SLIDE = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56 }),
};

const SLIDE_TRANSITION = {
  x: { type: "spring", duration: 0.4, bounce: 0 },
  opacity: { duration: 0.22, ease: EASE_OUT },
} as const;

const CONTROL =
  "flex items-center justify-center border border-white/20 text-white transition-colors duration-150 hover:border-white/60 hover:bg-white/10 active:bg-white/15";

function LightboxDialog({ gallery, onClose, onStep }: { gallery: Gallery; onClose: () => void; onStep: (delta: 1 | -1) => void }) {
  const isPresent = useIsPresent();
  // Reduced motion: Motion would snap transforms to their end values, so give them nothing to travel.
  const still = useReducedMotion() === true;
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const swipedAt = useRef(0);
  const captionId = useId();

  const { photos, index, dir, moves, title } = gallery;
  const photo = photos[index];
  const total = photos.length;
  const many = total > 1;
  const label = `Photo ${index + 1} of ${total}${title ? `, ${title}` : ""}`;
  const counter = `${pad(index + 1, total)} / ${pad(total, total)}`;
  const sizes = photoSizes(photo);

  // Neighbours load in the background so the next step is instant (deduplicated for 2-photo galleries).
  const neighbours = many ? [...new Set([(index + 1) % total, (index - 1 + total) % total])].filter((i) => i !== index) : [];

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  const onBackdropClick = (e: React.MouseEvent) => {
    if (performance.now() - swipedAt.current < 400) return; // the click that ends a swipe
    if ((e.target as Element).closest("button, a, [data-lightbox-keep]")) return;
    onClose();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || !e.isPrimary) return;
    swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!many || !start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return; // too short, or a vertical drag
    if ((window.visualViewport?.scale ?? 1) > 1.01) return; // pinch-zoomed: let the finger pan instead
    swipedAt.current = performance.now();
    onStep(dx < 0 ? 1 : -1);
  };

  return (
    <m.div
      data-lightbox=""
      data-state={isPresent ? "open" : "closing"}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-describedby={photo.caption ? captionId : undefined}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.16, ease: EASE_OUT } }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      onClick={onBackdropClick}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col overscroll-contain bg-deep/97 text-white outline-none",
        !isPresent && "pointer-events-none",
      )}
    >
      <m.div
        initial={{ scale: still ? 1 : 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: still ? 1 : 0.96 }}
        transition={{ type: "spring", duration: 0.35, bounce: 0 }}
        className="flex min-h-0 flex-1 flex-col"
      >
        {/* Top bar: where you are, and the way out. */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-4 md:px-6">
          <p className="flex min-w-0 items-center gap-3 font-mono text-label uppercase">
            {title ? (
              <>
                <span className="flex items-center gap-2 text-white/70">
                  <span aria-hidden className="inline-block size-1.5 bg-secondary" />
                  {title}
                </span>
                <span aria-hidden className="h-3.5 w-px bg-white/25" />
              </>
            ) : null}
            <span aria-hidden className="tabular-nums text-white">
              {counter}
            </span>
          </p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className={cn(CONTROL, "h-12 min-w-12 gap-2 px-3")}>
            <span className="hidden font-mono text-label uppercase sm:inline">Close</span>
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {/* Stage: the photo is fitted whole (never cropped) into the space left by the bars. */}
          <div
            className="relative min-h-0 flex-1 touch-pan-y touch-pinch-zoom select-none"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipe.current = null;
            }}
          >
            <div className="absolute inset-x-3 inset-y-1 md:inset-x-24" style={{ containerType: "size" }}>
              <AnimatePresence initial={false} custom={still ? 0 : dir}>
                <m.div
                  key={index}
                  custom={still ? 0 : dir}
                  variants={SLIDE}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={SLIDE_TRANSITION}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    data-lightbox-keep=""
                    className="relative max-h-full max-w-full bg-white/5"
                    style={{
                      width: `min(100cqw, calc(100cqh * ${photo.width / photo.height}))`,
                      aspectRatio: `${photo.width} / ${photo.height}`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes={sizes}
                      preload
                      fetchPriority="high"
                      draggable={false}
                      className="size-full object-contain"
                    />
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

            {many ? (
              <>
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous photo"
                  className={cn(CONTROL, "absolute left-4 top-1/2 hidden size-14 -translate-y-1/2 bg-deep/60 md:flex")}
                >
                  <ArrowLeft aria-hidden className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next photo"
                  className={cn(CONTROL, "absolute right-4 top-1/2 hidden size-14 -translate-y-1/2 bg-deep/60 md:flex")}
                >
                  <ArrowRight aria-hidden className="size-5" />
                </button>
              </>
            ) : null}
          </div>

          {/* Caption, with the phone's previous / next at thumb height. */}
          <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:px-6 md:pb-6">
            <div className="mx-auto flex max-w-3xl items-center gap-3 md:block">
              {many ? (
                <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className={cn(CONTROL, "size-12 shrink-0 md:hidden")}>
                  <ArrowLeft aria-hidden className="size-5" />
                </button>
              ) : null}
              <div
                id={captionId}
                data-lightbox-keep=""
                className="max-h-28 min-h-12 min-w-0 flex-1 overflow-y-auto text-center md:max-h-none md:min-h-0"
              >
                <span className="block font-mono text-label uppercase text-secondary">{figureLabel(title, index, total)}</span>
                {photo.caption ? <span className="mt-1 block text-small text-white/85 text-pretty">{photo.caption}</span> : null}
              </div>
              {many ? (
                <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className={cn(CONTROL, "size-12 shrink-0 md:hidden")}>
                  <ArrowRight aria-hidden className="size-5" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </m.div>

      <p className="sr-only" aria-live="polite">
        {moves > 0 ? `${label}${photo.caption ? `. ${photo.caption}` : ""}` : ""}
      </p>

      {neighbours.length > 0 ? (
        <div hidden>
          {neighbours.map((i) => (
            <Image
              key={i}
              src={photos[i].src}
              alt=""
              width={photos[i].width}
              height={photos[i].height}
              sizes={photoSizes(photos[i])}
              loading="eager"
              fetchPriority="low"
            />
          ))}
        </div>
      ) : null}
    </m.div>
  );
}
