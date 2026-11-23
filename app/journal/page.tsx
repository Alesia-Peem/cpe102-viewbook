import type { Metadata } from "next";
import { getJournalWeeks } from "@/lib/journal";
import { LightboxProvider } from "@/components/journal/lightbox";
import { JournalNav } from "@/components/journal/journal-nav";
import { WeekChapter } from "@/components/journal/week-chapter";
import { JournalIntro } from "@/components/journal/journal-intro";

export const metadata: Metadata = {
  title: "16 Weeks of Progress",
  description: "The CPE102 project journal: every week of the semester, with photographs and notes.",
};

/** /journal — all 16 weeks as one photography-driven journal. */
export default function JournalPage() {
  const weeks = getJournalWeeks();
  return (
    <LightboxProvider>
      <JournalIntro weeks={weeks} />
      <JournalNav weeks={weeks.map((w) => ({ slug: w.slug, number: w.number, topic: w.topic, hasPhotos: w.photos.length > 0 }))} />
      <div>
        {weeks.map((w, i) => (
          <WeekChapter key={w.slug} week={w} index={i} total={weeks.length} prev={weeks[i - 1]} next={weeks[i + 1]} />
        ))}
      </div>
    </LightboxProvider>
  );
}
