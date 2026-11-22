import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Week } from "@/types/content";
import { padWeek } from "@/lib/utils";

/** Previous / next week links at the bottom of a week page. */
export function WeekPager({ prev, next }: { prev?: Week; next?: Week }) {
  return (
    <nav aria-label="Previous and next week" className="mt-20 grid grid-cols-2 gap-4 border-t border-line pt-8">
      <div>
        {prev ? (
          <Link href={`/weeks/${prev.slug}`} className="group block">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              Week {padWeek(prev.week)}
            </span>
            <span className="mt-1 block font-medium text-ink group-hover:text-navy">
              {prev.title || "Previous week"}
            </span>
          </Link>
        ) : null}
      </div>
      <div className="text-right">
        {next ? (
          <Link href={`/weeks/${next.slug}`} className="group block">
            <span className="flex items-center justify-end gap-1 text-xs text-muted">
              Week {padWeek(next.week)}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="mt-1 block font-medium text-ink group-hover:text-navy">
              {next.title || "Next week"}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
