import Link from "next/link";
import type { Week } from "@/types/content";
import { formatDate, padWeek } from "@/lib/utils";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

/** Every week as a linked card with its cover photo. Phones get compact rows. */
export function WeekGrid({ weeks }: { weeks: Week[] }) {
  return (
    <Section id="weeks" className="bg-surface">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>Weekly journal</Eyebrow>
          <SectionHeading>The semester, week by week</SectionHeading>
        </div>
        <p className="max-w-xs text-muted md:text-right">
          {weeks.length} weeks. Open any week for the full story, photos and links.
        </p>
      </div>

      <ol className="mt-12 grid gap-x-6 gap-y-px bg-line sm:grid-cols-2 sm:gap-y-12 sm:bg-transparent lg:grid-cols-4">
        {weeks.map((w) => (
          <li key={w.slug} className="bg-surface">
            <Link
              href={`/weeks/${w.slug}`}
              className="card-link grid grid-cols-[6.5rem_1fr] items-center gap-4 py-4 sm:block sm:py-0"
            >
              <ContentImage
                image={w.cover}
                placeholderLabel={`Week ${w.week} cover`}
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 104px"
                zoom
              />
              <div className="min-w-0 sm:mt-4">
                <p className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="font-medium text-ink">Week {padWeek(w.week)}</span>
                  <span aria-hidden>·</span>
                  {formatDate(w.date) ?? "[Date]"}
                </p>
                <p className="mt-1.5 text-lg font-semibold leading-snug tracking-tight">
                  {w.title || <TextPlaceholder inline label="Week title" />}
                </p>
                {w.summary ? <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{w.summary}</p> : null}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
