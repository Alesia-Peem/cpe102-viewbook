/** A beam of light travelling around the border of its `relative` parent (CSS only). */
export function BorderBeam({ duration = 8, size = 160 }: { duration?: number; size?: number }) {
  return (
    <div
      aria-hidden
      className="fx-border-beam pointer-events-none absolute inset-0 z-20"
      style={{ "--beam-duration": `${duration}s`, "--beam-size": `${size}px` } as React.CSSProperties}
    />
  );
}
