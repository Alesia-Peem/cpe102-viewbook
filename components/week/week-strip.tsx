import Link from "next/link";
import type { Week } from "@/types/content";
import { cn, padWeek } from "@/lib/utils";

/**
 * Week numbers for jumping between weeks.
 * Phones and tablets: a grid of 8 per row with 44px targets, every week always visible.
 * Laptops and up: a single row, still with 44px targets.
 */
export function WeekStrip({ weeks, current }: { weeks: Week[]; current: string }) {
  return (
    <nav aria-label="All weeks">
      <ol className="grid grid-cols-8 gap-1 lg:flex lg:flex-wrap lg:justify-end">
        {weeks.map((w) => {
          const active = w.slug === current;
          return (
            <li key={w.slug}>
              <Link
                href={`/weeks/${w.slug}`}
                aria-current={active ? "page" : undefined}
                title={w.title || `Week ${w.week}`}
                className={cn(
                  "flex h-11 items-center justify-center font-mono text-label tracking-normal transition-colors lg:min-w-11 lg:px-2",
                  active ? "bg-ink text-white" : "text-muted hover:bg-surface hover:text-ink",
                )}
              >
                {padWeek(w.week)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
