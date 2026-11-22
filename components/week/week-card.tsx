import Link from "next/link";
import type { Week } from "@/types/content";
import { formatDateRange, formatDate, padWeek } from "@/lib/utils";
import { isUpcoming } from "@/lib/weeks";
import { ContentImage } from "@/components/ui/content-image";
import { HyperText } from "@/components/fx/hyper-text";

export function weekDateLabel(week: Week) {
  if (!week.date) return "Date to come";
  return week.endDate ? formatDateRange(week.date, week.endDate) : formatDate(week.date, "short");
}

/** A week on the home page: cover photo, number and date, topic, syllabus subtitle. Phones: thumbnail row. */
export function WeekCard({ week }: { week: Week }) {
  const upcoming = isUpcoming(week);
  return (
    <Link href={`/weeks/${week.slug}`} className="card-link grid grid-cols-[6.5rem_1fr] items-center gap-4 py-4 sm:block sm:py-0">
      <div className="relative">
        <ContentImage
          image={week.cover}
          fallbackPath={`/images/weeks/${week.slug}/cover`}
          placeholderLabel={`Week ${week.week} cover`}
          compact
          aspect="aspect-[4/3]"
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 104px"
          zoom
        />
        {upcoming ? (
          <span className="absolute left-2 top-2 z-10 bg-ink px-1.5 py-0.5 font-mono text-label uppercase text-white">Upcoming</span>
        ) : null}
      </div>
      <div className="min-w-0 sm:mt-4">
        <p className="flex flex-wrap items-center gap-x-2 font-mono text-label uppercase text-muted">
          <HyperText text={`W${padWeek(week.week)}`} hoverTarget="a" duration={450} className="text-accent-text" />
          <span aria-hidden>·</span>
          <span>{weekDateLabel(week)}</span>
        </p>
        <h4 className="mt-1.5 text-h3 font-semibold">{week.title || `Week ${week.week}`}</h4>
        {week.subtitle ? <p className="mt-1 text-small text-muted">{week.subtitle}</p> : null}
        {week.summary ? <p className="mt-1.5 line-clamp-2 text-small text-ink">{week.summary}</p> : null}
      </div>
    </Link>
  );
}
