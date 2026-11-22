import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjects } from "@/lib/projects";
import { getWeeks } from "@/lib/weeks";
import { padWeek } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { TitleBlock } from "@/components/ui/title-block";
import { MdxContent } from "@/components/week/mdx-content";
import { WeekGallery } from "@/components/week/week-gallery";
import { WeekLinks, WeekVideos } from "@/components/week/week-media";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { PointerGlow } from "@/components/fx/pointer-glow";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.ourTitle || p.title, description: p.summary || p.brief[0] };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const related = getWeeks().filter((w) => w.project === slug);
  const other = getProjects().find((x) => x.slug !== slug);
  const maxScore = Math.max(...(p.scoring ?? []).map((s) => s.points), 1);

  return (
    <article aria-labelledby="project-title">
      {/* Dark header band */}
      <div className="relative isolate overflow-hidden bg-deep pb-40 pt-12 text-white sm:pb-52 sm:pt-16">
        <div aria-hidden className="fx-grid absolute inset-0 -z-10" />
        <Spotlight className="-top-40 left-0 md:-top-32 md:left-40" />
        <PointerGlow />
        <Container className="relative z-10">
          <Link href="/#projects" className="nav-link -ml-3 gap-1.5 text-white/70 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden />
            All projects
          </Link>
          <p className="mt-8 font-mono text-label uppercase text-accent">{p.kicker}</p>
          <h1 id="project-title" className="mt-3 max-w-5xl text-h1 font-semibold text-balance">
            <SplitWords text={p.ourTitle || p.title} />
          </h1>
          {p.ourTitle ? <p className="mt-4 text-lead text-white/70">{p.title}</p> : null}
          {p.summary ? <p className="mt-4 max-w-2xl text-lead text-white/70">{p.summary}</p> : null}
        </Container>
      </div>

      <Container className="pb-24 sm:pb-32">
        <ContentImage
          image={p.cover}
          fallbackPath={`/images/projects/${slug}/cover`}
          placeholderLabel="Our project — main photo"
          aspect="aspect-[4/3] md:aspect-[21/9]"
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className="media-in relative z-10 -mt-28 shadow-[0_30px_60px_-30px_rgb(12_34_56/0.5)] sm:-mt-40"
        />

        {/* The brief (course facts) + key facts */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>The brief</Eyebrow>
            <h2 className="mt-4 text-h2 font-semibold">What the course asked for</h2>
            <div className="mt-6 space-y-4 text-body text-ink">
              {p.brief.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            {p.requirements?.length ? (
              <ul className="mt-8 space-y-2.5 border-t border-line pt-6 text-small text-ink">
                {p.requirements.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rotate-45 bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            ) : null}
            {p.swatches?.length ? (
              <div className="mt-8">
                <p className="font-mono text-label uppercase text-muted">The six gemstone colours</p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {p.swatches.map((s) => (
                    <li key={s.name} className="flex items-center gap-3 text-small text-ink">
                      <span aria-hidden className="size-6 shrink-0 rotate-45 rounded-[3px] shadow-inner" style={{ background: s.hex }} />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-24">
              <TitleBlock
                rows={[
                  { label: "When", value: p.weeks },
                  { label: "Team", value: p.team },
                  { label: "Due", value: p.due },
                  { label: "Weight", value: p.weight },
                ]}
              />
              {related.length ? (
                <div className="mt-6">
                  <p className="font-mono text-label uppercase text-muted">Related weeks</p>
                  <ul className="mt-2">
                    {related.map((w) => (
                      <li key={w.slug}>
                        <Link href={`/weeks/${w.slug}`} className="nav-link -ml-3 gap-2 text-ink">
                          <span className="font-mono text-label text-accent-text">W{padWeek(w.week)}</span>
                          {w.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        {/* Schedule / milestones + scoring */}
        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-10">
          {p.schedule?.length || p.milestones?.length ? (
            <Reveal>
              <p className="text-h3 font-semibold">{p.schedule?.length ? "Competition day" : "Milestones"}</p>
              <ol className="mt-5 border-t border-line">
                {(p.schedule ?? []).map((s, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-small">
                    <span className="text-ink">{s.label}</span>
                    <span className="shrink-0 font-mono text-label uppercase text-muted">{s.time}</span>
                  </li>
                ))}
                {(p.milestones ?? []).map((m) => (
                  <li key={m.week} className="flex gap-4 border-b border-line py-3 text-small">
                    <span className="w-16 shrink-0 font-mono text-label uppercase leading-[inherit] text-accent-text">{m.week}</span>
                    <span className="text-ink">{m.label}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
          {p.scoring?.length ? (
            <Reveal delay={0.06}>
              <p className="text-h3 font-semibold">{slug === "first-project" ? "Scoring rubric (100 points)" : "Progress presentation scoring"}</p>
              <ol className="mt-5 space-y-4">
                {p.scoring.map((s) => (
                  <li key={s.label}>
                    <div className="flex items-baseline justify-between gap-3 text-small">
                      <span className="font-medium text-ink">{s.label}</span>
                      <span className="font-mono tabular-nums text-ink">{s.points}{slug === "first-project" ? " pts" : "%"}</span>
                    </div>
                    <div className="mt-1.5 h-2.5">
                      <div className="h-full rounded-r-[4px] bg-[#8f8a80]" style={{ width: `${(s.points / maxScore) * 100}%` }} />
                    </div>
                    {s.detail ? <p className="mt-1 text-small text-muted">{s.detail}</p> : null}
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
        </div>

        {/* Our project (the user's own write-up) */}
        <section aria-labelledby="ours-heading" className="mt-24 border-t-2 border-ink pt-10">
          <Eyebrow>Our project</Eyebrow>
          <h2 id="ours-heading" className="mt-4 text-h2 font-semibold">
            {p.ourTitle || "What we built"}
          </h2>
          <div className="mt-8 max-w-3xl">
            {p.body ? (
              <MdxContent source={p.body} />
            ) : (
              <TextPlaceholder label="Our project: the idea, how we built it, what worked and what we would change" file={`content/projects/${slug}.mdx (below the second ---)`} />
            )}
          </div>
        </section>

        <div className="mt-20 space-y-20 sm:space-y-24">
          <WeekGallery images={p.gallery ?? []} week={slug === "first-project" ? 8 : 16} />
          <WeekVideos videos={p.videos ?? []} />
          <WeekLinks links={p.links ?? []} />
        </div>

        {other ? (
          <nav aria-label="Other project" className="mt-24 border-t border-line pt-10">
            <Link href={`/projects/${other.slug}`} className="card-link group flex items-center justify-between gap-6">
              <span>
                <span className="font-mono text-label uppercase text-muted">Next · {other.kicker}</span>
                <span className="mt-1.5 block text-h3 font-semibold">{other.ourTitle || other.title}</span>
              </span>
              <ArrowRight aria-hidden className="nudge size-5 shrink-0 text-muted" />
            </Link>
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
