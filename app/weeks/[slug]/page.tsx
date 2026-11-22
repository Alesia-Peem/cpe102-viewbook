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
import { SplitWords } from "@/components/motion/split-words";

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
  const gallery = week.gallery ?? [];
  const videos = week.videos ?? [];
  const links = week.links ?? [];

  // "On this page" only appears when the week has more than its story.
  const contents = [
    { id: "story", label: "This week" },
    gallery.length ? { id: "gallery", label: `Gallery (${gallery.length})` } : null,
    videos.length ? { id: "videos", label: `Videos (${videos.length})` } : null,
    links.length ? { id: "links", label: `Links (${links.length})` } : null,
  ].filter((c): c is { id: string; label: string } => c !== null);
  const showContents = contents.length > 1;

  return (
    <article aria-labelledby="week-title">
      {/* Week navigation bar */}
      <div className="border-b border-line">
        <Container className="flex flex-col gap-2 py-2 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/#weeks" className="nav-link -ml-3 gap-1.5 self-start lg:self-center">
            <ArrowLeft className="size-4" aria-hidden />
            All weeks
          </Link>
          <WeekStrip weeks={weeks} current={slug} />
        </Container>
      </div>

      <Container className="pb-24 pt-12 sm:pb-32 sm:pt-16">
        {/* Header: the week number set large beside the title */}
        <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p aria-hidden className="font-mono text-numeral font-medium text-accent lg:col-span-3">
            <span className="digit-roll inline-flex overflow-hidden pb-[0.04em] leading-none">
              {padWeek(week.week)
                .split("")
                .map((d, i) => (
                  <span key={i} className="inline-block" style={{ "--i": i } as React.CSSProperties}>
                    {d}
                  </span>
                ))}
            </span>
          </p>
          <div className="enter lg:col-span-9 lg:self-end" style={{ "--i": 1 } as React.CSSProperties}>
            <p className="font-mono text-label uppercase text-muted">
              Week {padWeek(week.week)} of {padWeek(weeks.length)}
              <span aria-hidden> · </span>
              {date ?? "Date to come"}
            </p>
            <h1 id="week-title" className="mt-3 text-h1 font-semibold text-balance">
              <span className="sr-only">Week {week.week}: </span>
              {week.title ? <SplitWords text={week.title} start={2} /> : <TextPlaceholder inline label="Week title" />}
            </h1>
            {week.summary ? <p className="mt-5 max-w-2xl text-lead text-muted">{week.summary}</p> : null}
          </div>
        </header>

        <ContentImage
          image={week.cover}
          fallbackPath={`/images/weeks/${slug}/cover`}
          placeholderLabel={`Week ${week.week} main photograph`}
          aspect="aspect-[4/3] md:aspect-[21/9]"
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className="media-in mt-10 sm:mt-14"
        />

        {/* Story: optional "on this page" list + reading column (≈ 65 characters a line) */}
        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12">
          {showContents ? (
            <aside className="hidden lg:col-span-3 lg:block">
              <nav aria-label="On this page" className="sticky top-24">
                <p className="font-mono text-label uppercase text-muted">On this page</p>
                <ul className="mt-3">
                  {contents.map((c) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`} className="nav-link -ml-3 text-ink">
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : null}

          <div id="story" className="scroll-mt-24 lg:col-span-7 lg:col-start-4">
            {week.body ? (
              <MdxContent source={week.body} />
            ) : (
              <TextPlaceholder label={`What happened in week ${week.week}`} file={`content/weeks/${slug}.mdx (below the second ---)`} />
            )}
          </div>
        </div>

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24">
          <WeekGallery images={gallery} week={week.week} />
          <WeekVideos videos={videos} />
          <WeekLinks links={links} />
          <WeekPager prev={prev} next={next} />
        </div>
      </Container>
    </article>
  );
}
