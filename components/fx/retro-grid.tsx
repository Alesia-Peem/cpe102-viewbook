/** A perspective grid floor scrolling towards the viewer, fading into the horizon (CSS only). */
export function RetroGrid({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden opacity-50 [perspective:200px] ${className}`}>
      <div className="absolute inset-0 [transform:rotateX(65deg)]">
        <div className="fx-retro-grid" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/70 to-transparent" />
    </div>
  );
}
