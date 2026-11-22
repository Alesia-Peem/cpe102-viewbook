import Link from "next/link";
import type { Week } from "@/types/content";
import { formatDate, padWeek } from "@/lib/utils";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { HyperText } from "@/components/fx/hyper-text";

/** A week on the home page: cover photo, number and date, title, summary. Phones: thumbnail row. */
export function WeekCard({ week }: { week: Week }) {
  return (
    <Link href={`/weeks/${week.slug}`} className="card-link grid grid-cols-[6.5rem_1fr] items-center gap-4 py-4 sm:block sm:py-0">
      <ContentImage
        image={week.cover}
        fallbackPath={`/images/weeks/${week.slug}/cover`}
        placeholderLabel={`Week ${week.week} cover`}
        compact
        aspect="aspect-[4/3]"
        sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 104px"
        zoom
      />
      <div className="min-w-0 sm:mt-4">
        <p className="flex flex-wrap items-center gap-x-2 font-mono text-label uppercase text-muted">
          <HyperText text={`W${padWeek(week.week)}`} hoverTarget="a" duration={450} className="text-accent-text" />
          <span aria-hidden>·</span>
          <span>{formatDate(week.date, "short") ?? "Date to come"}</span>
        </p>
        <h3 className="mt-1.5 text-h3 font-semibold">{week.title || <TextPlaceholder inline label="Week title" />}</h3>
        {week.summary ? <p className="mt-1.5 line-clamp-2 text-small text-muted">{week.summary}</p> : null}
      </div>
    </Link>
  );
}
