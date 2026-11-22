import Link from "next/link";
import type { Week } from "@/types/content";
import { cn, padWeek } from "@/lib/utils";
import { ContentImage } from "@/components/ui/content-image";

function PagerCard({ week, direction }: { week: Week; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link
      href={`/weeks/${week.slug}`}
      rel={next ? "next" : "prev"}
      className={cn(
        "card-link grid items-center gap-4 sm:gap-6",
        next ? "grid-cols-[1fr_5.5rem] text-right sm:grid-cols-[1fr_9rem]" : "grid-cols-[5.5rem_1fr] sm:grid-cols-[9rem_1fr]",
      )}
    >
      <ContentImage
        image={week.cover}
        fallbackPath={`/images/weeks/${week.slug}/cover`}
        placeholderLabel={`Week ${week.week}`}
        compact
        aspect="aspect-[4/3]"
        sizes="144px"
        zoom
        className={cn(next && "order-2")}
      />
      <div className={cn("min-w-0", next && "order-1")}>
        <p className="font-mono text-label uppercase text-muted">{next ? `Next · W${padWeek(week.week)} →` : `← Previous · W${padWeek(week.week)}`}</p>
        <p className="mt-1.5 text-h3 font-semibold">{week.title || `Week ${week.week}`}</p>
      </div>
    </Link>
  );
}

/** The disabled slot at either end of the semester. */
function PagerEnd({ direction }: { direction: "prev" | "next" }) {
  return (
    <div aria-hidden className={cn("flex h-full min-h-20 flex-col justify-center border border-dashed border-line px-5", direction === "next" && "items-end text-right")}>
      <p className="font-mono text-label uppercase text-muted">{direction === "prev" ? "Start of the semester" : "End of the semester"}</p>
    </div>
  );
}

/** Previous / next week as linked cards with their cover photos. */
export function WeekPager({ prev, next }: { prev?: Week; next?: Week }) {
  return (
    <nav aria-label="Previous and next week" className="grid gap-6 border-t border-line pt-10 md:grid-cols-2 md:gap-10">
      {prev ? <PagerCard week={prev} direction="prev" /> : <PagerEnd direction="prev" />}
      {next ? <PagerCard week={next} direction="next" /> : <PagerEnd direction="next" />}
    </nav>
  );
}
