import Link from "next/link";
import type { Week } from "@/types/content";
import { cn, padWeek } from "@/lib/utils";

/**
 * Week numbers for jumping between weeks.
 * Phones: a grid of 8 per row so every week (and the current one) is always visible.
 * Larger screens: a single row.
 */
export function WeekStrip({ weeks, current }: { weeks: Week[]; current: string }) {
  return (
    <nav aria-label="All weeks">
      <ol className="grid grid-cols-8 gap-1 sm:flex sm:flex-wrap sm:justify-end">
        {weeks.map((w) => {
          const active = w.slug === current;
          return (
            <li key={w.slug}>
              <Link
                href={`/weeks/${w.slug}`}
                aria-current={active ? "page" : undefined}
                title={w.title || `Week ${w.week}`}
                className={cn(
                  "flex h-9 items-center justify-center font-mono text-xs transition-colors sm:min-w-9 sm:px-2",
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
