/**
 * CONTRACT (owned by the journal-chapter agent — replace the internals, keep the export and props):
 *   <WeekChapter week={JournalWeek} index={0..15} total={16} prev?={JournalWeek} next?={JournalWeek} />
 *   One week of the 16-week journal. Root element: <section id={week.slug}> (the nav links to it).
 */
import "./journal.css";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { JournalWeek } from "@/types/journal";
import { course } from "@/content/course";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { TONES, isMirrored, toneFor, type ToneStyle } from "./chapter-style";
import { MaskUp } from "./journal-motion";
import { ChapterStory } from "./photo-layout";
import { WeekNotes, editHint } from "./week-notes";

type Phase = (typeof course.phases)[number];
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One chapter of the journal: poster masthead (giant week number, heading, course facts),
 * the photo composition with the student's introduction and description, field notes beside the
 * course facts, and previous / next controls. Grounds and compositions vary down the page
 * (chapter-style.ts, photo-layout.tsx); a phase band opens weeks 1, 9 and 10.
 */
/** `standalone`: rendered alone on /weeks/[slug] — prev/next go to the week pages, not to #anchors. */
export function WeekChapter({ week, index, total, prev, next, standalone = false }: { week: JournalWeek; index: number; total: number; prev?: JournalWeek; next?: JournalWeek; standalone?: boolean }) {
  const tone = toneFor(week);
  const t = TONES[tone];
  const phaseIndex = course.phases.findIndex((p) => p.id === week.phase);
  const phase = phaseIndex >= 0 ? course.phases[phaseIndex] : undefined;
  const opensPhase = phase !== undefined && prev?.phase !== week.phase;

  return (
    <section id={week.slug} aria-labelledby={`${week.slug}-title`} className={cn("relative scroll-mt-10 overflow-x-clip", t.ground)}>
      {opensPhase ? <PhaseBand phase={phase} part={phaseIndex + 1} parts={course.phases.length} compact={phase.title.toLowerCase() === week.heading.toLowerCase()} /> : null}
      <Container className="pt-12 pb-20 sm:pt-16 lg:pt-16 lg:pb-28">
        <Masthead week={week} total={total} t={t} phase={phase} part={phaseIndex + 1} mirrored={isMirrored(index)} />
        <div className="mt-16 lg:mt-24">
          <ChapterStory week={week} index={index} tone={tone} />
        </div>
        <div className="mt-20 lg:mt-28">
          <WeekNotes week={week} t={t} />
        </div>
        <ChapterPager week={week} prev={prev} next={next} t={t} standalone={standalone} />
      </Container>
    </section>
  );
}

/**
 * Full-bleed band that opens each part of the semester (course.phases). `compact` when the part has
 * the same name as the week right below it (the midterm), so the title isn't shouted twice.
 */
function PhaseBand({ phase, part, parts, compact = false }: { phase: Phase; part: number; parts: number; compact?: boolean }) {
  return (
    <div className="relative overflow-hidden bg-primary text-white">
      <Container className={compact ? "py-10 sm:py-12" : "py-14 sm:py-16 lg:py-20"}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/20 pb-4 font-mono text-label uppercase text-white/70">
          <span className="flex items-center gap-2">
            <span aria-hidden className="inline-block size-2 bg-secondary" />
            Part {pad(part)} of {pad(parts)} · from the course schedule
          </span>
          <span>{phase.weeks}</span>
        </div>
        <div className="mt-8 grid items-end gap-x-6 gap-y-6 lg:mt-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className={cn("font-poster font-extrabold uppercase text-balance", compact ? "text-h1" : "text-poster")}>
              <MaskUp>{phase.title}</MaskUp>
            </p>
            <p className={cn("max-w-xl text-lead text-white/70", compact ? "mt-3" : "mt-6")}>{phase.note}</p>
          </div>
          <p aria-hidden className={cn("jr-outline hidden text-right font-poster leading-[0.8] font-extrabold text-secondary lg:col-span-3 lg:block", compact ? "text-poster" : "text-mega")}>
            {pad(part)}
          </p>
        </div>
      </Container>
    </div>
  );
}

function Masthead({ week, total, t, phase, part, mirrored }: { week: JournalWeek; total: number; t: ToneStyle; phase?: Phase; part: number; mirrored: boolean }) {
  // The heading already shows the topic while it stands in for the student's title, so the
  // topic cell then carries only the syllabus subtitle (and is left out when there is none).
  const topic = week.headingIsTopic ? week.subtitle : week.subtitle ? `${week.topic}: ${week.subtitle}` : week.topic;
  type Fact = { label: string; value: string; wide?: boolean };
  const facts = [
    topic ? { label: week.headingIsTopic ? "Subtitle" : "Class topic", value: topic, wide: true } : null,
    week.dateLabel ? { label: "Class dates", value: week.dateLabel } : null,
    week.instructor ? { label: "Instructor", value: week.instructor } : null,
    week.guest ? { label: "Guest", value: week.guest } : null,
  ].filter((x): x is Fact => x !== null);

  return (
    <header>
      {/* Running head: week, part of the semester, date. */}
      <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 pt-4 font-mono text-label uppercase", t.strong)}>
        <span className="flex items-center gap-2 font-medium">
          <span aria-hidden className={cn("inline-block size-2", t.mark)} />
          {week.label}
          <span className={t.muted}>/ {pad(total)}</span>
        </span>
        {phase ? (
          <span className={cn("hidden md:inline", t.muted)}>
            Part {pad(part)} · {phase.title}
          </span>
        ) : null}
        <span className="ml-auto flex items-center gap-3">
          {week.upcoming ? <span className={cn("border px-2 py-0.5 font-medium", t.strong)}>Upcoming</span> : null}
          {week.dateLabel ? <span>{week.dateLabel}</span> : null}
        </span>
      </div>

      <div className="mt-6 grid items-end gap-x-6 gap-y-5 lg:mt-8 lg:grid-cols-12">
        <p aria-hidden className={cn("font-poster text-mega leading-[0.8] font-extrabold tracking-tight lg:col-span-3 lg:row-start-1", t.numeral, mirrored ? "lg:col-start-10 lg:text-right" : "lg:col-start-1")}>
          <MaskUp className="pt-[0.04em]">{week.number}</MaskUp>
        </p>
        <div className={cn("lg:col-span-9 lg:row-start-1 lg:pb-2", mirrored ? "lg:col-start-1" : "lg:col-start-4")}>
          <h2 id={`${week.slug}-title`} className="font-poster text-poster font-extrabold uppercase text-balance">
            <span className="sr-only">{week.label}: </span>
            {week.heading}
          </h2>
          {week.headingIsTopic ? (
            <p className={cn("mt-4 font-mono text-label", t.muted)}>
              <span className="uppercase">↳ Class topic</span> · own title: {editHint(week)}
            </p>
          ) : (
            <p className={cn("mt-4 font-mono text-label uppercase", t.muted)}>↳ Class topic: {week.topic}</p>
          )}
        </div>
      </div>

      {/* Course facts for the week, set like a drawing's title block. */}
      <dl className={cn("mt-10 grid grid-cols-1 border-t sm:grid-cols-2 lg:mt-12 lg:flex", t.rule)} aria-label={`${week.label} course facts`}>
        {facts.map((f, i) => (
          <div
            key={f.label}
            className={cn(
              "border-b py-4 lg:border-b-0 lg:px-5",
              t.rule,
              f.wide ? "sm:col-span-2 lg:flex-[1.7]" : "lg:flex-1",
              i === 0 ? "lg:pl-0" : "lg:border-l",
              !f.wide && i % 2 === (facts[0]?.wide ? 0 : 1) && "sm:border-l sm:pl-5",
            )}
          >
            <dt className={cn("font-mono text-label uppercase", t.muted)}>
              {i === 0 ? "Course facts · " : ""}
              {f.label}
            </dt>
            <dd className={cn("mt-1.5 font-medium", f.wide ? "text-lead leading-snug text-balance" : "text-small")}>{f.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

function ChapterPager({ week, prev, next, t, standalone }: { week: JournalWeek; prev?: JournalWeek; next?: JournalWeek; t: ToneStyle; standalone: boolean }) {
  const href = (w: JournalWeek) => (standalone ? `/weeks/${w.slug}` : `#${w.slug}`);
  return (
    <nav aria-label={standalone ? "Previous and next week" : `${week.label}: previous and next week`} className={cn("mt-20 border-t-2 lg:mt-28", t.strong)}>
      <div className="grid sm:grid-cols-2">
        {prev ? (
          <a href={href(prev)} className="jr-pager-link flex min-h-11 items-center gap-4 py-6 sm:pr-6">
            <ArrowLeft aria-hidden className="jr-pager-arrow jr-pager-arrow--prev size-5 shrink-0" />
            <span className="min-w-0">
              <span className={cn("block font-mono text-label uppercase", t.muted)}>Previous week</span>
              <span className="mt-1 flex items-baseline gap-3">
                <span className="font-poster text-h2 leading-none font-extrabold">{prev.number}</span>
                <span className="jr-pager-title truncate text-small font-medium">{prev.heading}</span>
              </span>
            </span>
          </a>
        ) : (
          <p className={cn("flex min-h-11 items-center py-6 font-mono text-label uppercase", t.muted)}>Start of the journal</p>
        )}
        {next ? (
          <a href={href(next)} className={cn("jr-pager-link flex min-h-11 items-center justify-end gap-4 border-t py-6 text-right sm:border-t-0 sm:border-l sm:pl-6", t.rule)}>
            <span className="min-w-0">
              <span className={cn("block font-mono text-label uppercase", t.muted)}>Next week</span>
              <span className="mt-1 flex items-baseline justify-end gap-3">
                <span className="jr-pager-title truncate text-small font-medium">{next.heading}</span>
                <span className="font-poster text-h2 leading-none font-extrabold">{next.number}</span>
              </span>
            </span>
            <ArrowRight aria-hidden className="jr-pager-arrow jr-pager-arrow--next size-5 shrink-0" />
          </a>
        ) : (
          <p className={cn("flex min-h-11 items-center justify-end border-t py-6 font-mono text-label uppercase sm:border-t-0 sm:border-l", t.rule, t.muted)}>End of the journal</p>
        )}
      </div>
      <div className={cn("flex justify-center border-t pt-2", t.rule)}>
        <a href={standalone ? `/journal#${week.slug}` : "#journal-top"} className="inline-flex min-h-11 items-center gap-2 px-3 font-mono text-label uppercase">
          {standalone ? "Read this week in the full journal" : "Back to top of journal"}
          <ArrowUp aria-hidden className="size-3.5" />
        </a>
      </div>
    </nav>
  );
}
