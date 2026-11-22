import { cn } from "@/lib/utils";

/** The page's one content width. Every block aligns to these left and right edges. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** Small label above a heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted", className)}>
      <span aria-hidden className="inline-block size-1.5 bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl", className)}>
      {children}
    </h2>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
