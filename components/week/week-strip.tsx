import Link from "next/link";
import type { Week } from "@/types/content";
import { cn, padWeek } from "@/lib/utils";

/** Compact row of week numbers for jumping between weeks. Scrolls sideways on small screens. */
export function WeekStrip({ weeks, current }: { weeks: Week[]; current: string }) {
  return (
    <nav aria-label="All weeks" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ol className="flex min-w-max gap-1">
        {weeks.map((w) => {
          const active = w.slug === current;
          return (
            <li key={w.slug}>
              <Link
                href={`/weeks/${w.slug}`}
                aria-current={active ? "page" : undefined}
                title={w.title || `Week ${w.week}`}
                className={cn(
                  "flex h-9 min-w-9 items-center justify-center px-2 font-mono text-xs transition-colors",
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
