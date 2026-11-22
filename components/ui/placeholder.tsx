import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shown wherever a photograph has not been provided yet. */
export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-line-strong/70 bg-surface p-3 text-center",
        className,
      )}
    >
      <ImageIcon aria-hidden className="size-5 text-muted/70" strokeWidth={1.5} />
      <p className="font-mono text-[10px] uppercase leading-snug tracking-wide text-muted sm:text-[11px]">
        [Image placeholder: {label}]
      </p>
    </div>
  );
}

/** Shown wherever a description has not been written yet. */
export function TextPlaceholder({
  label = "Waiting for user-provided description",
  className,
  inline = false,
}: {
  label?: string;
  className?: string;
  inline?: boolean;
}) {
  if (inline) {
    return <span className={cn("font-mono text-[0.8em] font-normal tracking-normal text-muted", className)}>[{label}]</span>;
  }
  return (
    <p
      className={cn(
        "border-l-2 border-line-strong py-1 pl-3 font-mono text-xs uppercase leading-relaxed tracking-wide text-muted",
        className,
      )}
    >
      [Description placeholder: {label}]
    </p>
  );
}
