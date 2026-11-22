import Link from "next/link";
import type { Week } from "@/types/content";
import { cn, padWeek } from "@/lib/utils";
import { ContentImage } from "@/components/ui/content-image";

function PagerCard({ week, direction }: { week: Week; direction: "prev" | "next" }) {
  return (
    <Link
      href={`/weeks/${week.slug}`}
      className={cn(
        "card-link grid items-center gap-4 sm:gap-6",
        direction === "prev"
          ? "grid-cols-[5.5rem_1fr] sm:grid-cols-[9rem_1fr]"
          : "grid-cols-[1fr_5.5rem] text-right sm:grid-cols-[1fr_9rem]",
      )}
    >
      <ContentImage
        image={week.cover}
        placeholderLabel={`Week ${week.week}`}
        aspect="aspect-[4/3]"
        sizes="144px"
        zoom
        className={cn(direction === "next" && "order-2")}
      />
      <div className={cn("min-w-0", direction === "next" && "order-1")}>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
          {direction === "prev" ? `← Week ${padWeek(week.week)}` : `Week ${padWeek(week.week)} →`}
        </p>
        <p className="mt-1.5 font-semibold leading-snug tracking-tight sm:text-lg">{week.title || `Week ${week.week}`}</p>
      </div>
    </Link>
  );
}

/** Previous / next week, as linked cards with their cover photos. */
export function WeekPager({ prev, next }: { prev?: Week; next?: Week }) {
  return (
    <nav aria-label="Previous and next week" className="grid gap-8 border-t border-line pt-10 md:grid-cols-2 md:gap-10">
      <div>{prev ? <PagerCard week={prev} direction="prev" /> : null}</div>
      <div>{next ? <PagerCard week={next} direction="next" /> : null}</div>
    </nav>
  );
}
