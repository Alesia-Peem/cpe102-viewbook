/**
 * CONTRACT (owned by the journal-chapter agent): the opening of /journal.
 *   <JournalIntro weeks={JournalWeek[]} />
 */
import type { JournalWeek } from "@/types/journal";

export function JournalIntro({ weeks }: { weeks: JournalWeek[] }) {
  return (
    <header className="py-24">
      <h1>16 Weeks of Progress</h1>
      <p>Every step, every experiment, every milestone. ({weeks.length} weeks)</p>
    </header>
  );
}
