import "@/components/home/home.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getProjects } from "@/lib/projects";
import { getWeeks } from "@/lib/weeks";
import { padWeek } from "@/lib/utils";
import { Container, Eyebrow } from "@/components/ui/section";
import { TitleBlock } from "@/components/ui/title-block";
import { MdxContent } from "@/components/week/mdx-content";
import { WeekGallery } from "@/components/week/week-gallery";
import { WeekLinks, WeekVideos } from "@/components/week/week-media";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";
import { PhotoFrame } from "@/components/home/photo-frame";

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
  const all = getProjects();
  const other = all.find((x) => x.slug !== slug);
  const number = String(all.findIndex((x) => x.slug === slug) + 1).padStart(2, "0");
  const maxScore = Math.max(...(p.scoring ?? []).map((s) => s.points), 1);

  return (
    <article aria-labelledby="project-title">
      {/* Dark poster band: kicker, the project's number set huge, the title in condensed capitals */}
      <div className="relative isolate overflow-hidden bg-deep pb-36 pt-6 text-white sm:pb-48 sm:pt-8">
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-44 right-8 -z-10 hidden font-poster text-mega font-extrabold leading-[0.8] text-white/[0.07] sm:block"
        >
          {number}
        </span>
        <Container className="relative">
          <div className="flex items-center gap-3 border-b-2 border-white/20 pb-2 font-mono text-label uppercase">
            <Link href="/#projects" className="-ml-1 inline-flex min-h-11 items-center gap-1.5 px-1 text-white/70 transition-colors hover:text-white">
              <ArrowLeft className="size-4" aria-hidden />
              All projects
            </Link>
            <span aria-hidden className="ml-auto bg-yellow px-1.5 py-0.5 tracking-normal text-ink">
              Project {number}
            </span>
          </div>
          <p className="mt-10 font-mono text-label uppercase text-yellow sm:mt-14">{p.kicker}</p>
          <h1 id="project-title" className="mt-4 max-w-6xl font-poster text-poster font-extrabold uppercase text-balance">
            <SplitWords text={p.ourTitle || p.title} />
          </h1>
          {p.ourTitle ? <p className="mt-5 max-w-3xl text-lead text-white/70">{p.title}</p> : null}
          {p.summary ? <p className="mt-4 max-w-2xl text-lead text-white/70">{p.summary}</p> : null}
        </Container>
      </div>

      <Container className="pb-24 sm:pb-32">
        <div className="media-in relative z-10 -mt-24 sm:-mt-36">
          <div className="print">
            <PhotoFrame
              image={p.cover}
              fallbackPath={`/images/projects/${slug}/cover`}
              label="Our project — main photo"
              code={`Fig. P${Number(number)}`}
              aspect="aspect-[4/3] md:aspect-[21/9]"
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
            />
          </div>
        </div>

        {/* The brief (course facts) + key facts */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>The brief</Eyebrow>
            <h2 className="mt-4 font-poster text-h1 font-extrabold uppercase">What the course asked for</h2>
            <div className="mt-6 space-y-4 text-body text-ink">
              {p.brief.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            {p.requirements?.length ? (
              <ul className="mt-8 space-y-2.5 border-t-2 border-ink pt-6 text-small text-ink">
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
                <ul className="mt-3 grid grid-cols-2 gap-px border border-ink bg-ink sm:grid-cols-3">
                  {p.swatches.map((s) => (
                    <li key={s.name} className="flex items-center gap-3 bg-paper p-2.5 text-small text-ink">
                      <span aria-hidden className="h-8 w-5 shrink-0" style={{ background: s.hex }} />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-24">
              {/* The official title in plain case, as on a drawing's title block (the heading is set in capitals). */}
              <div className="border border-b-0 border-line-strong px-3 py-2.5">
                <p className="font-mono text-label uppercase text-muted">Title</p>
                <p className="mt-1 text-small font-medium text-ink">{p.title}</p>
              </div>
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
        <div className="mt-20 grid gap-12 border-t-2 border-ink pt-12 md:grid-cols-2 md:gap-10">
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
                      <div className="h-full bg-ink" style={{ width: `${(s.points / maxScore) * 100}%` }} />
                    </div>
                    {s.detail ? <p className="mt-1 text-small text-muted">{s.detail}</p> : null}
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
        </div>

        {/* Our project (the user's own write-up) */}
        <section aria-labelledby="ours-heading" className="focus-ink mt-24 bg-yellow px-5 py-10 sm:px-10 sm:py-14">
          <p className="flex items-center gap-2 font-mono text-label uppercase text-ink"><span aria-hidden className="inline-block size-1.5 bg-ink" />Our project</p>
          <h2 id="ours-heading" className="mt-4 font-poster text-poster font-extrabold uppercase">
            {p.ourTitle || "What we built"}
          </h2>
          <div className="mt-8 max-w-3xl">
            {p.body ? (
              <MdxContent source={p.body} />
            ) : (
              <div className="border-l-2 border-ink py-1 pl-4 text-ink">
                <p className="font-mono text-label uppercase">[Not yet written]</p>
                <p className="mt-1 text-body">Our project: the idea, how we built it, what worked and what we would change.</p>
                <p className="mt-1 font-mono text-label">Edit: content/projects/{slug}.mdx (below the second ---)</p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-20 space-y-20 sm:space-y-24">
          <WeekGallery images={p.gallery ?? []} week={slug === "first-project" ? 8 : 16} />
          <WeekVideos videos={p.videos ?? []} />
          <WeekLinks links={p.links ?? []} />
        </div>

        {other ? (
          <nav aria-label="Other project" className="mt-24">
            <Link href={`/projects/${other.slug}`} className="bar-link group flex items-center justify-between gap-6 bg-deep px-5 py-6 text-white sm:px-8 sm:py-8">
              <span>
                <span className="font-mono text-label uppercase text-yellow">Next · {other.kicker}</span>
                <span className="mt-2 block font-poster text-h1 font-extrabold uppercase leading-[0.95] text-balance">{other.ourTitle || other.title}</span>
              </span>
              <span aria-hidden className="bar-arrow flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow text-ink sm:size-14">
                <ArrowRight className="size-6" />
              </span>
            </Link>
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
