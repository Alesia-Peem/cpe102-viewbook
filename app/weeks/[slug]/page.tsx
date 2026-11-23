import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJournalWeeks } from "@/lib/journal";
import { getWeeks } from "@/lib/weeks";
import { Container } from "@/components/ui/section";
import { WeekStrip } from "@/components/week/week-strip";
import { LightboxProvider } from "@/components/journal/lightbox";
import { WeekChapter } from "@/components/journal/week-chapter";

type Props = { params: Promise<{ slug: string }> };

// Only the 16 weeks of the semester are valid pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return getJournalWeeks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const week = getJournalWeeks().find((w) => w.slug === slug);
  if (!week) return {};
  return { title: `${week.label} — ${week.heading}`, description: week.entry.introduction || week.subtitle || week.topic };
}

/** One week on its own page: the same chapter as in the journal, with the week selector above. */
export default async function WeekPage({ params }: Props) {
  const { slug } = await params;
  const weeks = getJournalWeeks();
  const index = weeks.findIndex((w) => w.slug === slug);
  if (index < 0) notFound();
  const week = weeks[index];

  return (
    <LightboxProvider>
      <div className="border-b border-border bg-background">
        <Container className="flex flex-col gap-2 py-2 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/#weeks" className="nav-link -ml-3 gap-1.5 self-start lg:self-center">
            <ArrowLeft className="size-4" aria-hidden />
            All weeks
          </Link>
          <WeekStrip weeks={getWeeks()} current={slug} />
        </Container>
      </div>
      <WeekChapter week={week} index={index} total={weeks.length} prev={weeks[index - 1]} next={weeks[index + 1]} standalone />
    </LightboxProvider>
  );
}
