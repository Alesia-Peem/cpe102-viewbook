import { cn } from "@/lib/utils";

/**
 * The running header that opens every chapter of the home page, set like the top rule of a
 * lab poster: chapter number, chapter name, a heavy rule, and a fact on the right.
 * `label` can be any node (e.g. a HyperText) — it is the chapter's name.
 */
export function ChapterStrip({
  index,
  label,
  meta,
  tone = "light",
  className,
}: {
  index: string;
  label: React.ReactNode;
  meta?: React.ReactNode;
  tone?: "light" | "dark" | "yellow";
  className?: string;
}) {
  const dim = tone === "dark" ? "text-white/70" : tone === "yellow" ? "text-ink" : "text-muted";
  return (
    <div className={cn("flex items-center gap-3 font-mono text-label uppercase sm:gap-4", className)}>
      <span className={cn("shrink-0 px-1.5 py-0.5 tracking-normal", tone === "dark" ? "bg-yellow text-ink" : "bg-ink text-white")}>
        Ch.{index}
      </span>
      <span className={cn("shrink-0", tone === "dark" ? "text-white" : "text-ink")}>{label}</span>
      <span aria-hidden className={cn("chapter-rule", tone === "dark" ? "text-white/25" : "text-ink")} />
      {meta ? <span className={cn("hidden shrink-0 sm:block", dim)}>{meta}</span> : null}
    </div>
  );
}
