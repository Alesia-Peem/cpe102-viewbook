import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Fills an empty photo frame: what belongs here and the exact file to add. */
export function ImagePlaceholder({ label, file, compact = false }: { label: string; file?: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}${file ? ` (add ${file})` : ""}`}
      title={file ? `Add ${file}` : undefined}
      className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 border border-dashed border-line-strong bg-surface p-3 text-center"
    >
      <ImageIcon aria-hidden className="size-5 text-muted" strokeWidth={1.5} />
      <p className={cn("font-mono text-label uppercase text-muted", compact && "hidden sm:block")}>[Project image placeholder]</p>
      <p className={cn("text-small font-medium leading-snug text-ink", compact && "text-label sm:text-small")}>{label}</p>
      {file ? <p className={cn("max-w-full break-all font-mono text-label text-muted", compact && "hidden sm:block")}>{file}</p> : null}
    </div>
  );
}

/** Stands in for text that has not been written yet, naming the file where it goes. */
export function TextPlaceholder({ label, file, className, inline = false, onDark = false }: { label: string; file?: string; className?: string; inline?: boolean; onDark?: boolean }) {
  if (inline) {
    return <span className={cn("font-mono text-[0.75em] font-normal tracking-normal text-muted", className)}>[{label}]</span>;
  }
  return (
    <div className={cn("border-l-2 py-1 pl-4", onDark ? "border-white/50" : "border-line-strong", className)}>
      <p className={cn("font-mono text-label uppercase", onDark ? "text-white/70" : "text-muted")}>[Project description — to be provided]</p>
      <p className={cn("mt-1 text-small", onDark ? "text-white" : "text-ink")}>{label}</p>
      {file ? <p className={cn("mt-0.5 font-mono text-label", onDark ? "text-white/70" : "text-muted")}>Edit: {file}</p> : null}
    </div>
  );
}
