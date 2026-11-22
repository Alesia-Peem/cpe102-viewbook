import type { Week } from "@/types/content";
import { course } from "@/content/course";
import { getWeeksByPhase } from "@/lib/weeks";
import { Section, SectionHeader } from "@/components/ui/section";
import { WeekCard } from "@/components/week/week-card";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER } from "@/components/motion/tokens";
import { HoverHighlightGroup, HoverHighlightItem } from "@/components/fx/hover-highlight";

/** The 16 weeks, grouped into the syllabus's three parts of the semester. */
export function WeekGrid({ weeks }: { weeks: Week[] }) {
  const groups = getWeeksByPhase(weeks, course.phases);

  return (
    <Section id="weeks" labelledBy="weeks-title" className="bg-surface">
      <SectionHeader
        id="weeks-title"
        label="Weekly journal"
        title="The semester, week by week"
        aside={`${weeks.length} weeks, from the class schedule. Open a week for what we covered and our reflection.`}
      />

      <div className="mt-14 space-y-16 sm:space-y-20">
        {groups.map(({ phase, weeks: group }) => (
          <section key={phase.id} aria-labelledby={`phase-${phase.id}`}>
            <Reveal className="flex flex-col gap-1 border-t-2 border-ink pt-4 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="font-mono text-label uppercase text-accent-text">{phase.weeks}</p>
              <h3 id={`phase-${phase.id}`} className="text-h3 font-semibold">
                {phase.title}
              </h3>
              <p className="text-small text-muted sm:ml-auto">{phase.note}</p>
            </Reveal>
            <HoverHighlightGroup>
              <ol className="mt-8 grid gap-x-6 border-t border-line sm:grid-cols-2 sm:gap-y-12 sm:border-0 md:grid-cols-3 lg:grid-cols-4">
                {group.map((w, i) => (
                  <li key={w.slug} className="border-b border-line sm:border-0">
                    <Reveal delay={(i % 4) * STAGGER}>
                      <HoverHighlightItem id={w.slug}>
                        <WeekCard week={w} />
                      </HoverHighlightItem>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </HoverHighlightGroup>
          </section>
        ))}
      </div>
    </Section>
  );
}
