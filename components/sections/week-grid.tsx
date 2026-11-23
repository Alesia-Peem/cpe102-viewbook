import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { JournalWeek } from "@/types/journal";
import { course } from "@/content/course";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { HyperText } from "@/components/fx/hyper-text";
import { Reveal } from "@/components/motion/reveal";
import { ChapterStrip } from "@/components/home/chapter-strip";
import { EmptyFrame } from "@/components/home/empty-frame";
import { WeekRail } from "@/components/home/week-rail";

/** Each part of the semester has its own flat colour, used on its divider and on its weeks. */
const PHASE_SWATCH: Record<string, string> = {
  integrated: "bg-yellow",
  midterm: "bg-accent",
  class: "bg-paper",
};

/**
 * "16 Weeks of Progress": a dark chapter with every week of the semester on one sideways rail,
 * divided into the syllabus's three parts, and a large way into the full journal.
 */
export function WeekGrid({ weeks }: { weeks: JournalWeek[] }) {
  const groups = course.phases
    .map((phase) => ({ phase, weeks: weeks.filter((w) => w.phase === phase.id) }))
    .filter((g) => g.weeks.length > 0);
  const photographed = weeks.filter((w) => w.photos.length > 0).length;

  return (
    <section id="weeks" aria-labelledby="weeks-title" className="relative overflow-hidden bg-deep py-16 text-white sm:py-24">
      <Container>
        <ChapterStrip tone="dark" index="02" label={<HyperText text="Weekly journal" />} meta={`Class schedule · ${course.semester}`} />
        <div className="mt-10 grid items-end gap-8 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 id="weeks-title" className="flex items-end gap-3 font-poster font-extrabold uppercase sm:gap-5">
              <span className="text-mega text-yellow">{weeks.length}</span>
              <span className="text-poster pb-[0.04em]">
                <span className="block">Weeks of</span> <span className="block">Progress</span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4">
            <p className="text-body text-white/70">
              Every week of the semester, from the class schedule: the topic, the dates and our photographs. Open a week for what we covered, or read
              the whole journal as one long page.
            </p>
            <p className="mt-4 font-mono text-label uppercase text-white/70">
              {photographed} of {weeks.length} weeks photographed so far
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="mt-12 sm:mt-14">
        <WeekRail
          label={`All ${weeks.length} weeks — scrolls sideways`}
          phases={groups.map(({ phase }) => ({ id: phase.id, weeks: phase.weeks, title: phase.title, swatch: PHASE_SWATCH[phase.id] ?? "bg-white" }))}
        >
          {groups.map(({ phase, weeks: group }, gi) => (
            <div key={phase.id} role="group" aria-labelledby={`phase-${phase.id}`} data-phase={phase.id} className="flex shrink-0 gap-3 sm:gap-4">
              {/* Phase divider */}
              <div className={cn("flex w-56 shrink-0 snap-start flex-col justify-between p-4 text-ink sm:w-64 sm:p-5 lg:w-72", PHASE_SWATCH[phase.id] ?? "bg-white")}>
                <div>
                  <p className="font-mono text-label uppercase">
                    Part {gi + 1} · {phase.weeks}
                  </p>
                  <h3 id={`phase-${phase.id}`} className="mt-3 font-poster text-h2 font-extrabold uppercase leading-[0.92]">
                    {phase.title}
                  </h3>
                </div>
                <p className="mt-6 text-small">{phase.note}</p>
              </div>

              <ol className="flex gap-3 sm:gap-4">
                {group.map((w) => (
                  <li key={w.slug} className="w-[78vw] max-w-[19rem] shrink-0 snap-start sm:w-[19rem] lg:w-[20rem] lg:max-w-none">
                    <WeekTile week={w} swatch={PHASE_SWATCH[phase.id] ?? "bg-white"} />
                  </li>
                ))}
              </ol>
            </div>
          ))}

          {/* End of the rail: on to the journal */}
          <Link
            href="/journal"
            className="bar-link group flex w-56 shrink-0 snap-start flex-col justify-between border-2 border-yellow p-5 text-yellow transition-colors hover:bg-yellow hover:text-ink sm:w-64"
          >
            <span className="font-mono text-label uppercase">End of the semester</span>
            <span>
              <span className="block font-poster text-h1 font-extrabold uppercase leading-[0.92]">Read all {weeks.length} weeks in the journal</span>
              <ArrowRight aria-hidden className="bar-arrow mt-4 size-8" />
            </span>
          </Link>
        </WeekRail>
      </div>

      {/* The way into the full journal */}
      <Container className="mt-14 sm:mt-16">
        <Reveal>
          <Link
            href="/journal"
            className="bar-link group flex flex-col gap-5 bg-yellow px-5 py-6 text-ink sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8"
          >
            <span>
              <span className="block font-mono text-label uppercase">The project journal · every week on one page</span>
              <span className="mt-2 block font-poster text-h1 font-extrabold uppercase leading-[0.92]">Open the 16-week journal</span>
            </span>
            <span aria-hidden className="bar-arrow flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-yellow sm:size-16">
              <ArrowUpRight className="size-7" />
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

/** One week on the rail: its number set large, the date, the class topic and a photograph or an empty frame. */
function WeekTile({ week, swatch }: { week: JournalWeek; swatch: string }) {
  const photo = week.photos[0];
  const count = week.photos.length;
  return (
    <Link
      href={`/weeks/${week.slug}`}
      className="card-link group flex h-full flex-col bg-white/[0.04] ring-1 ring-inset ring-white/15 transition-[transform,box-shadow,background-color] duration-200 hover:bg-white/[0.07] hover:ring-yellow"
    >
      <div aria-hidden className={cn("h-1.5", swatch)} />
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <span className="font-poster text-numeral font-extrabold leading-[0.8] tracking-normal text-white transition-colors group-hover:text-yellow lg:text-poster lg:leading-[0.8]">
          {week.number}
        </span>
        <span className="pt-1 text-right font-mono text-label uppercase text-white/70">
          {week.label}
          {week.dateLabel ? <span className="mt-0.5 block">{week.dateLabel}</span> : null}
        </span>
      </div>

      <div className="relative mx-4 mt-4 aspect-[4/3] overflow-hidden">
        {photo ? (
          <Image src={photo.src} alt={photo.caption || `${week.label}: ${week.topic}`} fill sizes="(min-width: 1024px) 320px, 304px" className="zoom-img object-cover" />
        ) : (
          <EmptyFrame tone="dark" size="sm" label={`${week.label} photograph`} note="No photograph yet" />
        )}
        {week.upcoming ? <span className="absolute left-2 top-2 bg-yellow px-1.5 py-0.5 font-mono text-label uppercase text-ink">Upcoming</span> : null}
      </div>

      <div className="px-4 pt-4">
        <h4 className="text-h3 font-semibold text-white">{week.heading}</h4>
        {week.subtitle ? <p className="mt-1 line-clamp-2 text-small text-white/70">{week.subtitle}</p> : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 px-4 pb-4 pt-5 font-mono text-label uppercase text-white/70">
        <span>{count ? `${count} photo${count > 1 ? "s" : ""}` : week.upcoming ? "Coming up" : "Photos to come"}</span>
        <ArrowRight aria-hidden className="nudge size-4 text-white group-hover:text-yellow" />
      </div>
    </Link>
  );
}
