import { Images } from "lucide-react";
import type { JournalPhoto, JournalWeek } from "@/types/journal";
import { cn } from "@/lib/utils";
import { PhotoTrigger } from "./lightbox";
import { PhotoPlate } from "./photo-plate";
import { EmptyFrame } from "./photo-empty";
import { EntryBody, EntryLead } from "./week-notes";
import { TONES, emptyVariantFor, frameRatio, isMirrored, type Tone, type ToneStyle } from "./chapter-style";

/*
 * How a chapter's photographs and writing are composed, chosen from the photos the week actually has:
 *
 *   0 photos            → a designed empty state (plate / pair / contact sheet, varied per week)
 *   1 portrait/square   → tall photo in a 5-column side frame, text beside it
 *   1 landscape         → full-width photo between the introduction and the description
 *   2                   → two columns, staggered
 *   3                   → one large + two stacked
 *   4+                  → feature + asymmetric editorial grid (up to 5 shown) + "View all N photos"
 *
 * Every composition mirrors on alternate chapters. Desktop uses a 12-column grid; below lg everything
 * stacks at full width (tall photos capped at a readable width on tablets).
 */

/* Literal class maps so Tailwind generates them. */
const SPAN: Record<number, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};
const START: Record<number, string> = {
  1: "lg:col-start-1",
  2: "lg:col-start-2",
  3: "lg:col-start-3",
  4: "lg:col-start-4",
  5: "lg:col-start-5",
  6: "lg:col-start-6",
  7: "lg:col-start-7",
  8: "lg:col-start-8",
  9: "lg:col-start-9",
};

/** Content width at the container's max (1200px) for an n-column span with 24px gutters. */
const spanPx = (span: number) => Math.round(span * 78 + (span - 1) * 24);

/** `sizes` for a frame spanning `span` of 12 columns; `capTablet` when tall frames are capped at 576px below lg. */
function sizesFor(span: number, capTablet = false) {
  const vw = Math.round((span / 12) * 100);
  return `(min-width: 1280px) ${spanPx(span)}px, (min-width: 1024px) ${vw}vw, ${capTablet ? "(min-width: 640px) 576px, " : ""}100vw`;
}

/** Orderly crop for grid slots: portrait 4:5, landscape 3:2, square 1:1. */
const slotRatio = (p: JournalPhoto) => (p.orientation === "portrait" ? 0.8 : p.orientation === "landscape" ? 1.5 : 1);
const isWide = (p: JournalPhoto) => p.orientation === "landscape";

/** Column spans for two photos side by side, by their shapes. */
function pairSpans(a: JournalPhoto, b: JournalPhoto): [number, number] {
  if (isWide(a) && !isWide(b)) return [7, 5];
  if (!isWide(a) && isWide(b)) return [5, 7];
  if (isWide(a) && isWide(b)) return [7, 5];
  return [5, 5];
}

/**
 * Where two photos of a row go. Figures always read left to right; a mirrored row instead drops the
 * first frame lower (and, for two photos of the same shape, makes the second one the wider).
 */
function pairPlacement(a: JournalPhoto, b: JournalPhoto, mirrored: boolean) {
  let [sa, sb] = pairSpans(a, b);
  if (mirrored && isWide(a) === isWide(b)) [sa, sb] = [sb, sa];
  return { sa, sb, startA: 1, startB: 13 - sb, dropA: mirrored, dropB: !mirrored };
}

/** Tall frames don't fill a tablet's width; they sit on alternate sides instead. */
function tabletCap(p: JournalPhoto | null, right: boolean) {
  if (p && isWide(p)) return "";
  return cn("sm:max-w-xl lg:max-w-none", right && "sm:ml-auto lg:ml-0");
}

type Ctx = { week: JournalWeek; tone: Tone; t: ToneStyle; mirrored: boolean };

export function ChapterStory({ week, index, tone }: { week: JournalWeek; index: number; tone: Tone }) {
  const t = TONES[tone];
  const ctx: Ctx = { week, tone, t, mirrored: isMirrored(index) };
  const photos = week.photos;
  const n = photos.length;

  if (n === 0) {
    const variant = emptyVariantFor(week);
    if (variant === "plate") return <SideLayout ctx={ctx} mediaSpan={7} media={<EmptyFrame week={week} figure={1} ratio={4 / 3} tone={tone} primary />} />;
    return <StackLayout ctx={ctx} media={variant === "pair" ? <EmptyPair ctx={ctx} /> : <EmptySheet ctx={ctx} />} />;
  }

  if (n === 1) {
    const p = photos[0];
    if (isWide(p)) {
      return (
        <StackLayout
          ctx={ctx}
          media={<PhotoPlate photos={photos} index={0} weekLabel={week.label} weekNumber={week.number} ratio={frameRatio(p, 1.2, 2.4)} sizes={sizesFor(12)} parallax captionTone={t} />}
        />
      );
    }
    return (
      <SideLayout
        ctx={ctx}
        mediaSpan={5}
        media={<PhotoPlate photos={photos} index={0} weekLabel={week.label} weekNumber={week.number} sizes={sizesFor(5, true)} parallax captionTone={t} className={tabletCap(p, ctx.mirrored)} />}
      />
    );
  }

  if (n === 2) return <StackLayout ctx={ctx} media={<PhotoPair ctx={ctx} />} />;
  if (n === 3) return <StackLayout ctx={ctx} media={<PhotoTrio ctx={ctx} />} />;
  return <StackLayout ctx={ctx} media={<PhotoGallery ctx={ctx} />} />;
}

/* ───────────── Layout shells ───────────── */

/** Media in a side column (sticky on desktop), introduction and description beside it. */
function SideLayout({ ctx, media, mediaSpan }: { ctx: Ctx; media: React.ReactNode; mediaSpan: 5 | 7 }) {
  const { week, t, mirrored } = ctx;
  const textSpan = mediaSpan === 5 ? 6 : 5;
  const mediaStart = mirrored ? 13 - mediaSpan : 1;
  const textStart = mirrored ? 1 : 13 - textSpan;
  return (
    <div className="grid items-start gap-x-6 gap-y-12 lg:grid-cols-12">
      <div className={cn("lg:sticky lg:top-36 lg:row-start-1", SPAN[mediaSpan], START[mediaStart])}>{media}</div>
      <div className={cn("flex flex-col gap-10 lg:row-start-1", SPAN[textSpan], START[textStart], mediaSpan === 7 && (mirrored ? "lg:pr-6" : "lg:pl-6"))}>
        <EntryLead week={week} t={t} />
        <EntryBody week={week} t={t} />
      </div>
    </div>
  );
}

/** Introduction, then the photo composition across the grid, then the description offset to one side. */
function StackLayout({ ctx, media }: { ctx: Ctx; media: React.ReactNode }) {
  const { week, t, mirrored } = ctx;
  return (
    <div className="flex flex-col gap-14 lg:gap-20">
      <div className="grid lg:grid-cols-12 lg:gap-x-6">
        <EntryLead week={week} t={t} className={cn("lg:col-span-8", mirrored && "lg:col-start-5")} />
      </div>
      {media}
      <div className="grid lg:grid-cols-12 lg:gap-x-6">
        <EntryBody week={week} t={t} className={cn("lg:col-span-7", mirrored ? "lg:col-start-1" : "lg:col-start-6")} />
      </div>
    </div>
  );
}

/* ───────────── Empty states ───────────── */

/** Two staggered frames: a tall one and a wide one. */
function EmptyPair({ ctx }: { ctx: Ctx }) {
  const { week, tone, mirrored } = ctx;
  return (
    <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-start">
      <EmptyFrame week={week} figure={1} ratio={4 / 3} tone={tone} primary className={cn("lg:col-span-7 lg:row-start-1", mirrored ? "lg:col-start-6" : "lg:col-start-1")} />
      <EmptyFrame
        week={week}
        figure={2}
        ratio={4 / 5}
        tone={tone}
        delay={0.12}
        className={cn("lg:col-span-4 lg:row-start-1 lg:mt-28", mirrored ? "lg:col-start-1" : "lg:col-start-9", "hidden sm:block sm:max-w-md lg:max-w-none", !mirrored && "sm:ml-auto lg:ml-0")}
      />
    </div>
  );
}

/** Contact sheet: one large frame and two stacked, on a strip of film-edge perforations. */
function EmptySheet({ ctx }: { ctx: Ctx }) {
  const { week, tone, t, mirrored } = ctx;
  return (
    <div>
      <div aria-hidden className={cn("jr-perf mb-8", t.frameInk)} />
      <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12 lg:items-start">
        <EmptyFrame week={week} figure={1} ratio={3 / 2} tone={tone} primary className={cn("lg:col-span-8 lg:row-start-1", mirrored ? "lg:col-start-5" : "lg:col-start-1")} />
        <div className={cn("hidden gap-6 sm:grid sm:grid-cols-2 lg:col-span-4 lg:row-start-1 lg:grid-cols-1", mirrored ? "lg:col-start-1" : "lg:col-start-9")}>
          <EmptyFrame week={week} figure={2} ratio={3 / 2} tone={tone} delay={0.1} />
          <EmptyFrame week={week} figure={3} ratio={3 / 2} tone={tone} delay={0.2} />
        </div>
      </div>
      <div aria-hidden className={cn("jr-perf mt-8", t.frameInk)} />
    </div>
  );
}

/* ───────────── Photo compositions ───────────── */

/** Two photos at their own proportions, one dropped lower than the other. */
function PhotoPair({ ctx }: { ctx: Ctx }) {
  const { week, t, mirrored } = ctx;
  const [a, b] = week.photos;
  const { sa, sb, startA, startB, dropA, dropB } = pairPlacement(a, b, mirrored);
  return (
    <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-start">
      <PhotoPlate photos={week.photos} index={0} weekLabel={week.label} weekNumber={week.number} sizes={sizesFor(sa, !isWide(a))} parallax captionTone={t} className={cn("lg:row-start-1", SPAN[sa], START[startA], dropA && "lg:mt-32", tabletCap(a, false))} />
      <PhotoPlate photos={week.photos} index={1} weekLabel={week.label} weekNumber={week.number} sizes={sizesFor(sb, !isWide(b))} captionTone={t} className={cn("lg:row-start-1", SPAN[sb], START[startB], dropB && "lg:mt-32", tabletCap(b, true))} />
    </div>
  );
}

/** One large photo and two stacked beside it. */
function PhotoTrio({ ctx }: { ctx: Ctx }) {
  const { week, t, mirrored } = ctx;
  const [a, b, c] = week.photos;
  const big = isWide(a) ? 8 : 6;
  const side = big === 8 ? 4 : 5;
  return (
    <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-start">
      <PhotoPlate
        photos={week.photos}
        index={0}
        weekLabel={week.label}
        weekNumber={week.number}
        sizes={sizesFor(big, !isWide(a))}
        parallax
        captionTone={t}
        className={cn("lg:row-start-1", SPAN[big], START[mirrored ? 13 - big : 1], tabletCap(a, false))}
      />
      <div className={cn("grid gap-10 sm:grid-cols-2 lg:row-start-1 lg:grid-cols-1", SPAN[side], START[mirrored ? 1 : 13 - side], big === 8 && "lg:mt-16")}>
        <PhotoPlate photos={week.photos} index={1} weekLabel={week.label} weekNumber={week.number} ratio={slotRatio(b)} sizes={sizesFor(side)} captionTone={t} />
        <PhotoPlate photos={week.photos} index={2} weekLabel={week.label} weekNumber={week.number} ratio={slotRatio(c)} sizes={sizesFor(side)} captionTone={t} />
      </div>
    </div>
  );
}

const SHOWN = 5;

/** Feature photo, then pairs of mixed proportions, then a button into the full gallery. */
function PhotoGallery({ ctx }: { ctx: Ctx }) {
  const { week, t, mirrored } = ctx;
  const photos = week.photos;
  const shown = photos.slice(0, SHOWN).map((p, i) => ({ p, i }));
  const plate = (i: number, ratio: number, span: number, className: string, parallax = false) => (
    <PhotoPlate key={i} photos={photos} index={i} weekLabel={week.label} weekNumber={week.number} ratio={ratio} sizes={sizesFor(span, !isWide(photos[i]))} parallax={parallax} captionTone={t} className={className} />
  );

  // The feature: a wide first photo runs the full width; a tall one takes a large 6-column frame
  // at its own proportions with the second photo dropped beside it.
  const first = shown[0];
  const featureWide = isWide(first.p);
  const rest = shown.slice(featureWide ? 1 : 2);
  const pairs: Array<typeof shown> = [];
  for (let i = 0; i < rest.length; i += 2) pairs.push(rest.slice(i, i + 2));

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {featureWide ? (
        <div className="grid lg:grid-cols-12">{plate(0, frameRatio(first.p, 1.2, 2.4), 12, "lg:col-span-12", true)}</div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-start">
          {plate(0, frameRatio(first.p), 6, cn("lg:col-span-6 lg:col-start-1 lg:row-start-1", tabletCap(first.p, false)), true)}
          {shown[1] ? plate(1, slotRatio(shown[1].p), 5, cn("lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-40", tabletCap(shown[1].p, true))) : null}
        </div>
      )}

      {pairs.map((row, r) => {
        const flip = (r + (mirrored ? 1 : 0)) % 2 === 1;
        if (row.length === 1) {
          const { p, i } = row[0];
          return (
            <div key={i} className="grid lg:grid-cols-12 lg:gap-x-6">
              {plate(i, slotRatio(p), 8, cn("lg:col-span-8", flip ? "lg:col-start-5" : "lg:col-start-1", tabletCap(p, flip)))}
            </div>
          );
        }
        const [a, b] = row;
        const { sa, sb, startA, startB, dropA, dropB } = pairPlacement(a.p, b.p, flip);
        return (
          <div key={a.i} className="grid gap-x-6 gap-y-12 lg:grid-cols-12 lg:items-start">
            {plate(a.i, slotRatio(a.p), sa, cn("lg:row-start-1", SPAN[sa], START[startA], dropA && "lg:mt-24", tabletCap(a.p, false)))}
            {plate(b.i, slotRatio(b.p), sb, cn("lg:row-start-1", SPAN[sb], START[startB], dropB && "lg:mt-24", tabletCap(b.p, true)))}
          </div>
        );
      })}

      <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", mirrored ? "lg:justify-start" : "lg:justify-end")}>
        {photos.length > SHOWN ? <p className={cn("font-mono text-label uppercase", t.muted)}>+ {photos.length - SHOWN} more in the gallery</p> : null}
        <PhotoTrigger photos={photos} index={0} label={`View all ${photos.length} photos, ${week.label}`} className={cn("btn", t.onDark ? "btn-light" : "btn-primary")}>
          <Images aria-hidden className="size-4" strokeWidth={1.75} />
          View all {photos.length} photos
        </PhotoTrigger>
      </div>
    </div>
  );
}
