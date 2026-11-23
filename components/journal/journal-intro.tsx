/**
 * CONTRACT (owned by the journal-chapter agent): the opening of /journal.
 *   <JournalIntro weeks={JournalWeek[]} />
 */
import "./journal.css";
import type { JournalWeek } from "@/types/journal";
import { course } from "@/content/course";
import { site } from "@/content/site";
import { cn, formatDateRange } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { SplitWords } from "@/components/motion/split-words";

/** Cells per phase in the index, so each part of the semester gets its own label. */
function groupByPhase(weeks: JournalWeek[]) {
  return course.phases
    .map((phase, i) => ({ phase, part: i + 1, weeks: weeks.filter((w) => w.phase === phase.id) }))
    .filter((g) => g.weeks.length > 0);
}

/* Desktop index: 8 columns — part 1 fills row one; parts 2 and 3 share row two. */
const LG_LABEL = ["lg:col-span-8", "lg:col-start-1 lg:col-span-1 lg:row-start-3", "lg:col-start-2 lg:col-span-7 lg:row-start-3"];
const LG_CELL = ["", "lg:row-start-4 lg:col-start-1", "lg:row-start-4"];

/**
 * The page's opening (h1): a yellow poster with the headline set huge, the semester's facts,
 * and an index of all 16 weeks that links to each chapter and marks which have photographs.
 */
export function JournalIntro({ weeks }: { weeks: JournalWeek[] }) {
  const first = weeks[0];
  const last = weeks[weeks.length - 1];
  const start = first?.date;
  const end = last?.endDate ?? last?.date;
  const range = start && end ? formatDateRange(start, end) : undefined;
  const photographed = weeks.filter((w) => w.photos.length > 0).length;
  const photoCount = weeks.reduce((sum, w) => sum + w.photos.length, 0);
  const groups = groupByPhase(weeks);
  const regular = groups.length === 3 && groups[0].weeks.length === 8 && groups[1].weeks.length === 1;

  return (
    <header id="journal-top" aria-labelledby="journal-title" className="relative overflow-hidden bg-secondary text-ink">
      <Container className="pt-8 pb-14 sm:pt-10 lg:pb-20">
        <div className="enter flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3 font-mono text-label uppercase" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="flex items-center gap-2 font-medium">
            <span aria-hidden className="inline-block size-2 bg-ink" />
            {course.code} · Project journal
          </span>
          <span className="text-ink/75">
            {site.groupName ? `${site.groupName} · ` : ""}
            {course.semester}
          </span>
        </div>

        <h1 id="journal-title" className="mt-8 font-poster text-mega font-extrabold uppercase sm:mt-10">
          <span className="block">
            <span className="word-in mr-[0.06em] inline-block bg-ink px-[0.07em] pt-[0.09em] pb-[0.02em] align-top leading-[0.8] text-secondary" style={{ "--i": 0 } as React.CSSProperties}>
              {weeks.length}
            </span>{" "}
            <SplitWords text="Weeks" start={1} />
          </span>
          <span className="block">
            <SplitWords text="of Progress" start={2} />
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-x-6 gap-y-5 lg:mt-12 lg:grid-cols-12">
          <p className="enter text-h2 font-semibold text-balance lg:col-span-7" style={{ "--i": 4 } as React.CSSProperties}>
            Every step, every experiment, every milestone.
          </p>
          <p className="enter flex flex-col gap-1 font-mono text-label uppercase lg:col-span-5 lg:items-end lg:text-right" style={{ "--i": 5 } as React.CSSProperties}>
            <span className="font-medium">
              {weeks.length} weeks{range ? ` · ${range}` : ""}
            </span>
            <span className="text-ink/75">
              {course.code} {course.name} · {course.universityShort}
            </span>
          </p>
        </div>
      </Container>

      {/* Index of the 16 chapters */}
      <Container className="pb-16 lg:pb-24">
        <nav aria-label="Journal index" className="enter" style={{ "--i": 6 } as React.CSSProperties}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-3 font-mono text-label uppercase">
            <p className="font-medium">Index · {weeks.length} chapters</p>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-ink/75">
              <span className="flex items-center gap-2">
                <span aria-hidden className="inline-block size-2.5 rounded-full bg-ink" />
                Photographed {photographed}/{weeks.length}
                {photoCount ? ` · ${photoCount} photo${photoCount === 1 ? "" : "s"}` : ""}
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="inline-block size-2.5 rounded-full border border-ink" />
                Awaiting photos
              </span>
            </p>
          </div>

          <ol className="mt-5 grid grid-cols-4 border-t border-l border-ink/25 lg:grid-cols-8">
            {groups.map((g, gi) => (
              <PhaseGroup key={g.phase.id} label={`Part ${String(g.part).padStart(2, "0")} · ${g.phase.title}`} weeks={g.weeks} labelClass={regular ? LG_LABEL[gi] : "lg:col-span-8"} cellClass={regular ? LG_CELL[gi] : ""} />
            ))}
          </ol>
        </nav>
      </Container>
    </header>
  );
}

function PhaseGroup({ label, weeks, labelClass, cellClass }: { label: string; weeks: JournalWeek[]; labelClass: string; cellClass: string }) {
  return (
    <>
      <li className={cn("col-span-full flex items-end border-r border-b border-ink/25 px-3 pt-5 pb-2 font-mono text-label uppercase", labelClass)}>
        <span className="leading-snug">{label}</span>
      </li>
      {weeks.map((w) => {
        const n = w.photos.length;
        const status = n ? `${n} photo${n === 1 ? "" : "s"}` : w.upcoming ? "Upcoming" : "No photos yet";
        return (
          <li key={w.slug} className={cn("border-r border-b border-ink/25", cellClass)}>
            <a href={`#${w.slug}`} className="jr-index-cell flex h-full min-h-20 flex-col justify-between gap-3 p-3 sm:min-h-36">
              <span className="flex items-start justify-between gap-2">
                <span className="jr-index-num font-poster text-h1 leading-[0.85] font-extrabold">
                  <span className="sr-only">Week </span>
                  {w.number}
                </span>
                <span aria-hidden className={cn("mt-1 inline-block size-2.5 shrink-0 rounded-full", n ? "bg-current" : "border border-current")} />
              </span>
              <span className="hidden flex-col gap-1.5 sm:flex">
                <span className="line-clamp-2 text-small leading-snug font-medium">{w.topic}</span>
                <span className="jr-index-sub font-mono text-label uppercase">{status}</span>
              </span>
              <span className="sr-only sm:hidden">
                {w.topic}, {status}
              </span>
            </a>
          </li>
        );
      })}
    </>
  );
}
