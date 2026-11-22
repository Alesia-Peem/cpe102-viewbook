import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdjacentWeeks, getWeek, getWeeks } from "@/lib/weeks";
import { padWeek } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { MdxContent } from "@/components/week/mdx-content";
import { WeekStrip } from "@/components/week/week-strip";
import { WeekGallery } from "@/components/week/week-gallery";
import { WeekLinks, WeekVideos } from "@/components/week/week-media";
import { WeekPager } from "@/components/week/week-pager";
import { weekDateLabel } from "@/components/week/week-card";
import { course } from "@/content/course";
import { getProject } from "@/lib/projects";
import { isUpcoming } from "@/lib/weeks";
import { SplitWords } from "@/components/motion/split-words";
import { Spotlight } from "@/components/fx/spotlight";
import { PointerGlow } from "@/components/fx/pointer-glow";
import { TracingBeam } from "@/components/fx/tracing-beam";

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
  const date = weekDateLabel(week);
  const upcoming = isUpcoming(week);
  const phase = course.phases.find((p) => p.id === week.phase);
  const project = week.project ? getProject(week.project) : undefined;
  const covered = week.covered ?? [];
  const tools = week.tools ?? [];
  const gallery = week.gallery ?? [];
  const videos = week.videos ?? [];
  const links = week.links ?? [];

  const contents = [
    covered.length ? { id: "covered", label: "What we covered" } : null,
    { id: "story", label: "Our reflection" },
    gallery.length ? { id: "gallery", label: `Gallery (${gallery.length})` } : null,
    videos.length ? { id: "videos", label: `Videos (${videos.length})` } : null,
    links.length ? { id: "links", label: `Links (${links.length})` } : null,
  ].filter((c): c is { id: string; label: string } => c !== null);

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

      {/* Header band: dark stage with the week number set large beside the title */}
      <div className="relative isolate overflow-hidden bg-deep pb-40 pt-12 text-white sm:pb-52 sm:pt-16">
        <div aria-hidden className="fx-grid absolute inset-0 -z-10" />
        <Spotlight className="-top-40 left-0 md:-top-32 md:left-40" />
        <PointerGlow />
        <Container className="relative z-10">
        <header className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p aria-hidden className="fx-gradient-text font-mono text-numeral font-medium lg:col-span-3">
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
            <p className="font-mono text-label uppercase text-white/70">
              Week {padWeek(week.week)} of {padWeek(weeks.length)}
              <span aria-hidden> · </span>
              {date}
              {upcoming ? <span className="ml-3 bg-white px-1.5 py-0.5 text-ink">Upcoming</span> : null}
            </p>
            <h1 id="week-title" className="mt-3 text-h1 font-semibold text-balance">
              <span className="sr-only">Week {week.week}: </span>
              {week.title ? <SplitWords text={week.title} start={2} /> : <TextPlaceholder inline label="Week title" className="text-white/70" />}
            </h1>
            {week.subtitle ? <p className="mt-4 max-w-2xl text-lead text-white/70">{week.subtitle}</p> : null}
            {week.summary ? <p className="mt-4 max-w-2xl text-body text-white">{week.summary}</p> : null}
          </div>
        </header>
        </Container>
      </div>

      <Container className="pb-24 sm:pb-32">

        <ContentImage
          image={week.cover}
          fallbackPath={`/images/weeks/${slug}/cover`}
          placeholderLabel={`Week ${week.week} main photograph`}
          aspect="aspect-[4/3] md:aspect-[21/9]"
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className="media-in relative z-10 -mt-28 shadow-[0_30px_60px_-30px_rgb(12_34_56/0.5)] sm:-mt-40"
        />

        {/* Course facts (aside) + what we covered and our reflection (main column) */}
        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <aside className="order-2 lg:order-1 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <dl className="border-t border-line text-small">
                {[
                  phase ? ["Part of the semester", `${phase.weeks} · ${phase.title}`] : null,
                  week.instructor ? ["Instructor", week.instructor] : null,
                  week.guest ? ["Guest", week.guest] : null,
                  week.deliverable ? ["Viewbook / deliverable", week.deliverable] : null,
                  week.milestone ? ["Project milestone", week.milestone] : null,
                ]
                  .filter((r): r is string[] => r !== null)
                  .map(([k, v]) => (
                    <div key={k} className="border-b border-line py-3">
                      <dt className="font-mono text-label uppercase text-muted">{k}</dt>
                      <dd className="mt-1 text-ink">{v}</dd>
                    </div>
                  ))}
                {tools.length ? (
                  <div className="border-b border-line py-3">
                    <dt className="font-mono text-label uppercase text-muted">Tools</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {tools.map((t) =>
                        t.href ? (
                          <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-line-strong px-2.5 text-small text-ink transition-colors hover:border-ink lg:min-h-9">
                            {t.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <span key={t.label} className="inline-flex min-h-11 items-center bg-surface px-2.5 text-small text-ink lg:min-h-9">
                            {t.label}
                          </span>
                        ),
                      )}
                    </dd>
                  </div>
                ) : null}
                {project ? (
                  <div className="border-b border-line py-3">
                    <dt className="font-mono text-label uppercase text-muted">Project</dt>
                    <dd className="mt-1">
                      <Link href={`/projects/${project.slug}`} className="text-link text-small">
                        {project.ourTitle || project.title}
                      </Link>
                    </dd>
                  </div>
                ) : null}
              </dl>
              {contents.length > 1 ? (
                <nav aria-label="On this page" className="mt-6 hidden lg:block">
                  <p className="font-mono text-label uppercase text-muted">On this page</p>
                  <ul className="mt-2">
                    {contents.map((c) => (
                      <li key={c.id}>
                        <a href={`#${c.id}`} className="nav-link -ml-3 text-ink">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <TracingBeam>
              {covered.length ? (
                <section id="covered" aria-labelledby="covered-heading" className="scroll-mt-24">
                  <h2 id="covered-heading" className="text-h3 font-semibold">What we covered</h2>
                  <ul className="mt-4 space-y-2.5 text-body text-ink">
                    {covered.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] inline-block size-1.5 shrink-0 rotate-45 bg-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-label uppercase text-muted">From the syllabus and the week&apos;s course materials</p>
                </section>
              ) : null}

              <section id="story" aria-labelledby="story-heading" className={covered.length ? "mt-14 scroll-mt-24" : "scroll-mt-24"}>
                <h2 id="story-heading" className="text-h3 font-semibold">Our reflection</h2>
                <div className="mt-4">
                  {week.body ? (
                    <MdxContent source={week.body} />
                  ) : (
                    <TextPlaceholder
                      label={`What we learned in week ${week.week} and how it went`}
                      file={`content/weeks/${slug}.mdx (below the second ---)`}
                    />
                  )}
                </div>
              </section>
            </TracingBeam>
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
