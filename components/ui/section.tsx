import { cn } from "@/lib/utils";

/** The page's one content width. Every block aligns to these left and right edges. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** Mono uppercase label with the accent mark, e.g. "About" above a section heading. */
export function Eyebrow({ children, className, onDark = false }: { children: React.ReactNode; className?: string; onDark?: boolean }) {
  return (
    <p className={cn("flex items-center gap-2 font-mono text-label uppercase", onDark ? "text-white/65" : "text-muted", className)}>
      <span aria-hidden className="inline-block size-1.5 bg-accent" />
      {children}
    </p>
  );
}

/**
 * The one section header pattern: label, heading, and an optional note on the right.
 * Every home section opens with it, so the page reads as one system.
 */
export function SectionHeader({
  label,
  title,
  aside,
  id,
  onDark = false,
}: {
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <Eyebrow onDark={onDark}>{label}</Eyebrow>
        <h2 id={id} className="mt-4 text-h2 font-semibold text-balance">
          {title}
        </h2>
      </div>
      {aside ? <div className={cn("max-w-sm text-small md:text-right", onDark ? "text-white/70" : "text-muted")}>{aside}</div> : null}
    </div>
  );
}

/** A home page section with the shared vertical rhythm. */
export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-24 sm:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}
