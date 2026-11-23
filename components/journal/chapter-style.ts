/**
 * Art direction for the 16 chapters: which ground each week sits on and which empty-state
 * composition it uses. Kept in one place so the rhythm of the page can be read (and tuned) at a glance.
 *
 *   paper   — the default page ground
 *   surface — a quieter panel, breaks up runs of paper chapters
 *   yellow  — full-bleed poster chapter (the First Project competition)
 *   deep    — dark immersive chapter (the final presentations)
 */
import type { JournalPhoto, JournalWeek } from "@/types/journal";

export type Tone = "paper" | "surface" | "yellow" | "deep";

/** Ground per week number. Anything not listed is paper. */
const TONE_BY_WEEK: Record<number, Tone> = {
  3: "surface",
  6: "surface",
  8: "yellow",
  9: "surface",
  12: "surface",
  14: "surface",
  16: "deep",
};

export function toneFor(week: JournalWeek): Tone {
  return TONE_BY_WEEK[week.id] ?? "paper";
}

/** Class names per ground. Full literal strings so Tailwind generates every one. */
export const TONES = {
  paper: {
    ground: "bg-background text-ink",
    muted: "text-muted",
    rule: "border-line",
    strong: "border-ink",
    numeral: "text-accent",
    mark: "bg-accent",
    smallAccent: "text-accent-text",
    frame: "bg-surface",
    frameLine: "border-line-strong",
    frameInk: "text-line-strong",
    chip: "bg-background",
    field: "border-line-strong text-muted",
    link: "text-ink",
    onDark: false,
  },
  surface: {
    ground: "bg-surface text-ink",
    muted: "text-muted",
    rule: "border-line-strong",
    strong: "border-ink",
    numeral: "text-accent",
    mark: "bg-accent",
    smallAccent: "text-ink",
    frame: "bg-background",
    frameLine: "border-line-strong",
    frameInk: "text-line-strong",
    chip: "bg-background",
    field: "border-line-strong text-muted",
    link: "text-ink",
    onDark: false,
  },
  yellow: {
    ground: "bg-secondary text-ink",
    muted: "text-ink/75",
    rule: "border-ink/20",
    strong: "border-ink",
    numeral: "text-ink",
    mark: "bg-ink",
    smallAccent: "text-ink",
    frame: "bg-background",
    frameLine: "border-ink/30",
    frameInk: "text-ink/25",
    chip: "bg-background",
    field: "border-ink/40 text-ink/75",
    link: "text-ink",
    onDark: false,
  },
  deep: {
    ground: "bg-deep text-white",
    muted: "text-white/70",
    rule: "border-white/15",
    strong: "border-white",
    numeral: "text-secondary",
    mark: "bg-accent",
    smallAccent: "text-secondary",
    frame: "bg-white/[0.04]",
    frameLine: "border-white/25",
    frameInk: "text-white/20",
    chip: "bg-deep",
    field: "border-white/35 text-white/70",
    link: "text-white",
    onDark: true,
  },
} as const;

export type ToneStyle = (typeof TONES)[Tone];

/**
 * Empty-state composition per week (only used while a week has no photos):
 *   plate — one large frame beside the text
 *   pair  — two staggered frames above the text
 *   sheet — a contact sheet: one large frame and two stacked
 */
export type EmptyVariant = "plate" | "pair" | "sheet";

const EMPTY_BY_WEEK: Record<number, EmptyVariant> = {
  3: "pair",
  5: "sheet",
  7: "pair",
  8: "sheet",
  10: "pair",
  12: "sheet",
  14: "pair",
  16: "sheet",
};

export function emptyVariantFor(week: JournalWeek): EmptyVariant {
  return EMPTY_BY_WEEK[week.id] ?? "plate";
}

/** Mirrors compositions on alternate chapters so photos swap sides down the page. */
export function isMirrored(index: number) {
  return index % 2 === 1;
}

/** A photo's frame ratio (width / height), clamped so a frame never becomes a sliver or a banner. */
export function frameRatio(p: JournalPhoto, min = 0.66, max = 2.4) {
  return Math.min(max, Math.max(min, p.width / p.height));
}
