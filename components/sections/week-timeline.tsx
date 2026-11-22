import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Week } from "@/types/content";
import { formatDate, padWeek } from "@/lib/utils";
import { Eyebrow, Section } from "@/components/ui/section";
import { TextPlaceholder } from "@/components/ui/placeholder";

/** The course outline: one row per week, each linking to its own page. */
export function WeekTimeline({ weeks }: { weeks: Week[] }) {
  return (
    <Section id="weeks" className="bg-surface">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>02 — Weekly journal</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Week by week</h2>
        </div>
        <p className="text-sm text-muted">{weeks.length} weeks · select a week to read more</p>
      </div>

      <ol className="mt-10 border-t border-line">
        {weeks.map((w) => (
          <li key={w.slug} className="border-b border-line">
            <Link
              href={`/weeks/${w.slug}`}
              className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 transition-colors hover:bg-paper sm:grid-cols-[5rem_1fr_11rem_auto] sm:px-3"
            >
              <span className="font-mono text-sm text-navy">W{padWeek(w.week)}</span>

              <span className="min-w-0">
                <span className="block font-medium text-ink group-hover:text-navy">
                  {w.title || <TextPlaceholder inline label="Week title" />}
                </span>
                {w.summary ? (
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{w.summary}</span>
                ) : null}
              </span>

              <span className="col-start-2 row-start-2 text-sm text-muted sm:col-start-3 sm:row-start-1">
                {formatDate(w.date) ?? <TextPlaceholder inline label="Date" />}
              </span>

              <ArrowUpRight
                aria-hidden
                className="size-4 self-center text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy sm:col-start-4"
              />
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
