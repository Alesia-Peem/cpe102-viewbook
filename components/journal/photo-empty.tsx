import type { JournalWeek } from "@/types/journal";
import { cn } from "@/lib/utils";
import { TONES, type Tone } from "./chapter-style";
import { ClipReveal } from "./journal-motion";

const RATIO_LABEL: Record<string, string> = { "1.5": "3:2", "1.333": "4:3", "0.8": "4:5", "0.75": "3:4", "1": "1:1", "1.778": "16:9" };
const ratioLabel = (r: number) => RATIO_LABEL[String(Math.round(r * 1000) / 1000)] ?? "";

/** Printer's crop marks at the four corners of the parent (see journal.css). */
export function CropMarks() {
  return (
    <>
      <span aria-hidden className="jr-crop jr-crop--tl" />
      <span aria-hidden className="jr-crop jr-crop--tr" />
      <span aria-hidden className="jr-crop jr-crop--bl" />
      <span aria-hidden className="jr-crop jr-crop--br" />
    </>
  );
}

/**
 * A photo slot still waiting for its photograph — set like a layout proof: crop marks, a blueprint
 * grid, the diagonal "picture goes here" cross, the figure number and the folder to drop photos in.
 * Never a stock or repeated image.
 */
export function EmptyFrame({
  week,
  figure,
  ratio,
  tone,
  primary = false,
  className,
  delay = 0,
}: {
  week: JournalWeek;
  figure: number;
  ratio: number;
  tone: Tone;
  /** The main frame of a composition also names the folder to add photos to. */
  primary?: boolean;
  className?: string;
  delay?: number;
}) {
  const t = TONES[tone];
  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative", t.frameInk)}>
        <CropMarks />
        <ClipReveal delay={delay} className={cn("relative overflow-hidden border", t.frame, t.frameLine)} style={{ aspectRatio: ratio }}>
          <div aria-hidden className={cn("jr-grid absolute inset-0 opacity-50", t.frameInk)} />
          <svg aria-hidden className={cn("absolute inset-0 size-full", t.frameInk)} preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          <div aria-hidden className={cn("absolute inset-x-0 top-0 flex items-start justify-between p-3 font-mono text-label uppercase sm:p-4", t.muted)}>
            <span>
              Fig. {week.number}.{figure}
            </span>
            <span>{ratioLabel(ratio)}</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <div className={cn("max-w-full border px-3 py-2.5 text-center sm:px-4 sm:py-3", t.chip, t.frameLine)}>
              <p className={cn("font-mono text-label font-medium tracking-[0.08em]", t.onDark ? "text-white" : "text-ink")}>[PHOTOGRAPH NOT YET UPLOADED]</p>
              {primary ? (
                <p className={cn("mt-1.5 font-mono text-label tracking-normal break-words", t.muted)}>
                  public/images/weeks/{week.slug}/ <span className="whitespace-nowrap">or data/weeks.ts</span>
                </p>
              ) : null}
            </div>
          </div>

          <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-4">
            <span className={cn("font-poster text-h1 leading-[0.8] font-extrabold", t.frameInk)}>{week.number}</span>
            <span className={cn("font-mono text-label uppercase", t.muted)}>▸ {week.number}.{figure}A</span>
          </div>
        </ClipReveal>
      </div>
    </div>
  );
}
