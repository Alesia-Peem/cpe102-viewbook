import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdjacentWeeks, getWeek, getWeeks } from "@/lib/weeks";
import { formatDate, padWeek } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { MdxContent } from "@/components/week/mdx-content";
import { WeekStrip } from "@/components/week/week-strip";
import { WeekGallery } from "@/components/week/week-gallery";
import { WeekLinks, WeekVideos } from "@/components/week/week-media";
import { WeekPager } from "@/components/week/week-pager";

type Props = { params: Promise<{ slug: string }> };

// Only the weeks that exist as files are valid pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return getWeeks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const week = getWeek(slug);
  if (!week) return {};
  const title = `Week ${week.week}${week.title ? ` — ${week.title}` : ""}`;
  return { title, description: week.summary || undefined };
}

export default async function WeekPage({ params }: Props) {
  const { slug } = await params;
  const week = getWeek(slug);
  if (!week) notFound();

  const weeks = getWeeks();
  const { prev, next } = getAdjacentWeeks(slug);
  const date = formatDate(week.date);

  return (
    <article>
      <div className="border-b border-line">
        <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/#weeks" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden />
            All weeks
          </Link>
          <WeekStrip weeks={weeks} current={slug} />
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <header>
            <p className="font-mono text-sm text-navy">
              Week {padWeek(week.week)} of {padWeek(weeks.length)}
              <span className="text-muted"> · {date ?? <TextPlaceholder inline label="Date" />}</span>
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
              {week.title || <TextPlaceholder inline label="Week title placeholder" className="text-xl" />}
            </h1>
            {week.summary ? <p className="mt-5 text-lg leading-relaxed text-muted">{week.summary}</p> : null}
          </header>

          <ContentImage
            image={week.cover}
            placeholderLabel={`Week ${week.week} main photograph`}
            aspect="aspect-[16/9]"
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="mt-10"
          />

          <div className="mt-10">
            {week.body ? (
              <MdxContent source={week.body} />
            ) : (
              <TextPlaceholder label={`Waiting for user-provided description of week ${week.week}`} />
            )}
          </div>

          <WeekGallery images={week.gallery ?? []} week={week.week} />
          <WeekVideos videos={week.videos ?? []} />
          <WeekLinks links={week.links ?? []} />
          <WeekPager prev={prev} next={next} />
        </div>
      </Container>
    </article>
  );
}
