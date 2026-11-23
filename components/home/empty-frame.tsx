import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "yellow";

const TONES: Record<Tone, { ground: string; ink: string; dim: string }> = {
  light: { ground: "frame-hatch", ink: "text-ink", dim: "text-muted" },
  dark: { ground: "frame-hatch-dark", ink: "text-white", dim: "text-white/70" },
  yellow: { ground: "frame-hatch-yellow", ink: "text-ink", dim: "text-ink" },
};

/**
 * An empty photo frame that looks intentional: hatched card stock, crop marks, a figure code,
 * what the photograph should show and the file to add. Fills its (relative) parent.
 * `size="sm"` keeps only the crop marks and one line, for thumbnails.
 */
export function EmptyFrame({
  label,
  file,
  code,
  tone = "light",
  size = "md",
  note = "Photograph not yet uploaded",
  compact = false,
}: {
  label: string;
  file?: string;
  /** Figure code in the top-left corner, e.g. "Fig. 02" or "W05". */
  code?: string;
  tone?: Tone;
  size?: "sm" | "md";
  note?: string;
  /** Small frame: the file path is shown from tablet width up only. */
  compact?: boolean;
}) {
  const t = TONES[tone];
  return (
    <div
      role="img"
      aria-label={`${note}: ${label}${file ? ` (add ${file})` : ""}`}
      title={file ? `Add ${file}` : undefined}
      className={cn("absolute inset-0 flex flex-col", t.ground, t.ink, size === "sm" ? "items-center justify-center p-3" : compact ? "justify-center p-4 sm:justify-between sm:p-5" : "justify-between p-4 sm:p-5")}
    >
      <span aria-hidden className="crop crop-tl" />
      <span aria-hidden className="crop crop-tr" />
      <span aria-hidden className="crop crop-bl" />
      <span aria-hidden className="crop crop-br" />

      {size === "sm" ? (
        <p className={cn("text-center font-mono text-label uppercase", t.dim)}>[{note}]</p>
      ) : (
        <>
          <p className={cn("flex items-center justify-between gap-3 pl-3 pt-2 font-mono text-label uppercase", t.dim, compact && "hidden sm:flex")}>
            <span>{code}</span>
          </p>
          <div className="px-3 text-center">
            <p className="font-mono text-label uppercase">[{note}]</p>
            <p className="mt-1.5 text-small font-medium leading-snug">{label}</p>
          </div>
          <p className={cn("max-w-full break-all px-3 pb-2 text-center font-mono text-label", t.dim, compact && "hidden sm:block")}>{file ? `Add ${file}` : " "}</p>
        </>
      )}
    </div>
  );
}
