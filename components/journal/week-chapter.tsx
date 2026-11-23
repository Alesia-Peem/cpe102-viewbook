/**
 * CONTRACT (owned by the journal-chapter agent — replace the internals, keep the export and props):
 *   <WeekChapter week={JournalWeek} index={0..15} total={16} prev?={JournalWeek} next?={JournalWeek} />
 *   One week of the 16-week journal. Root element: <section id={week.slug}> (the nav links to it).
 */
import type { JournalWeek } from "@/types/journal";

export function WeekChapter({ week }: { week: JournalWeek; index: number; total: number; prev?: JournalWeek; next?: JournalWeek }) {
  return (
    <section id={week.slug} aria-labelledby={`${week.slug}-title`} className="scroll-mt-32 py-24">
      <h2 id={`${week.slug}-title`}>
        {week.label} — {week.heading}
      </h2>
    </section>
  );
}
