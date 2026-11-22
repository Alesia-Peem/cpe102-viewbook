import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shown wherever a photograph has not been provided yet. */
export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface p-4 text-center",
        className,
      )}
    >
      <ImageIcon aria-hidden className="size-6 text-muted/60" strokeWidth={1.5} />
      <p className="font-mono text-[11px] uppercase leading-snug tracking-wide text-muted">
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
  const text = `[${inline ? "" : "Description placeholder: "}${label}]`;
  if (inline) {
    return <span className={cn("font-mono text-[0.8em] text-muted", className)}>{text}</span>;
  }
  return (
    <p
      className={cn(
        "border-l-2 border-line py-1 pl-3 font-mono text-xs uppercase leading-relaxed tracking-wide text-muted",
        className,
      )}
    >
      {text}
    </p>
  );
}
