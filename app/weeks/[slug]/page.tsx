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
  const gallery = week.gallery ?? [];
  const videos = week.videos ?? [];
  const links = week.links ?? [];

  // "On this page" entries — only for parts this week actually has.
  const contents = [
    { id: "story", label: "This week" },
    gallery.length ? { id: "gallery", label: `Gallery (${gallery.length})` } : null,
    videos.length ? { id: "videos", label: `Videos (${videos.length})` } : null,
    links.length ? { id: "links", label: `Links (${links.length})` } : null,
  ].filter((c): c is { id: string; label: string } => c !== null);

  return (
    <article>
      <div className="border-b border-line">
        <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/#weeks" className="link-draw inline-flex min-h-11 items-center gap-1.5 self-start text-sm text-muted hover:text-ink sm:min-h-0 sm:self-center">
            <ArrowLeft className="size-4" aria-hidden />
            All weeks
          </Link>
          <WeekStrip weeks={weeks} current={slug} />
        </Container>
      </div>

      <Container className="pt-12 sm:pt-16">
        {/* Header: the week number set large beside the title */}
        <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p
            aria-hidden
            className="enter font-mono text-[clamp(4.5rem,13vw,11rem)] font-medium leading-[0.8] tracking-[-0.06em] text-accent lg:col-span-3"
          >
            {padWeek(week.week)}
          </p>
          <div className="enter lg:col-span-9 lg:self-end" style={{ "--i": 1 } as React.CSSProperties}>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              Week {padWeek(week.week)} of {padWeek(weeks.length)}
              <span aria-hidden> · </span>
              {date ?? "[Date]"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-6xl">
              <span className="sr-only">Week {week.week}: </span>
              {week.title || <TextPlaceholder inline label="Week title" />}
            </h1>
            {week.summary ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">{week.summary}</p> : null}
          </div>
        </header>

        <ContentImage
          image={week.cover}
          placeholderLabel={`Week ${week.week} main photograph`}
          aspect="aspect-[4/3] md:aspect-[21/9]"
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className="enter mt-10 sm:mt-14"
        />

        {/* Body: "on this page" sidebar + reading column */}
        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="On this page" className="sticky top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">On this page</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {contents.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="link-draw text-ink/75 hover:text-ink">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div id="story" className="scroll-mt-24 lg:col-span-7">
            {week.body ? (
              <MdxContent source={week.body} />
            ) : (
              <TextPlaceholder label={`Waiting for user-provided description of week ${week.week}`} />
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
      <div className="h-20 sm:h-28" />
    </article>
  );
}
