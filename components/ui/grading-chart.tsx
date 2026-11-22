import { course } from "@/content/course";

/**
 * How the course is graded — ranked horizontal bars, one per component, largest first.
 * Emphasis pattern: the Viewbook (this website) in the accent, the rest in a neutral grey.
 * Every value is printed, so the list doubles as the table view; hovering a row shows its parts.
 */
export function GradingChart() {
  const rows = course.grading;
  const max = Math.max(...rows.map((r) => r.weight));

  return (
    <figure>
      <figcaption>
        <p className="text-h3 font-semibold">How the course is graded</p>
        <p className="mt-1 text-small text-muted">Share of the final grade, from the syllabus</p>
      </figcaption>
      <ol className="mt-6 space-y-3.5">
        {rows.map((r) => {
          const viewbook = "isViewbook" in r && r.isViewbook;
          return (
            <li key={r.label} className="group relative" tabIndex={0} aria-label={`${r.label}: ${r.weight}%${r.parts ? ` (${r.parts})` : ""}`}>
              <div className="flex items-baseline justify-between gap-3 text-small">
                <span className={viewbook ? "font-semibold text-ink" : "text-ink"}>
                  {r.label}
                  {viewbook ? <span className="ml-2 font-mono text-label uppercase text-accent-text">This website</span> : null}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="h-2.5 flex-1">
                  <div
                    className="h-full rounded-r-[4px] transition-opacity group-hover:opacity-80"
                    style={{ width: `${(r.weight / max) * 100}%`, background: viewbook ? "var(--color-accent)" : "#8f8a80" }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-small tabular-nums text-ink">{r.weight}%</span>
              </div>
              {r.parts ? (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-2 right-12 z-10 -translate-y-full whitespace-nowrap bg-ink px-2.5 py-1.5 font-mono text-label text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {r.parts}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
