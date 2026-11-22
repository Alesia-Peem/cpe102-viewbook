import type { Week } from "@/types/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { WeekCard } from "@/components/week/week-card";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER } from "@/components/motion/tokens";
import { HoverHighlightGroup, HoverHighlightItem } from "@/components/fx/hover-highlight";

/** Every week as a linked card: 4 across on desktop, 3 on tablet, compact rows on phones. */
export function WeekGrid({ weeks }: { weeks: Week[] }) {
  return (
    <Section id="weeks" labelledBy="weeks-title" className="bg-surface">
      <SectionHeader
        id="weeks-title"
        label="Weekly journal"
        title="The semester, week by week"
        aside={`${weeks.length} weeks. Open any week for the full story, photos and links.`}
      />
      <HoverHighlightGroup>
        <ol className="mt-12 grid gap-x-6 border-t border-line sm:grid-cols-2 sm:gap-y-12 sm:border-0 md:grid-cols-3 lg:grid-cols-4">
        {weeks.map((w, i) => (
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
    </Section>
  );
}
