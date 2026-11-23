import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ChapterStrip } from "@/components/home/chapter-strip";
import { PhotoFrame } from "@/components/home/photo-frame";

/** Each project is its own poster: the first on deep navy, the final on signal orange. */
const LOOKS = [
  { card: "bg-deep text-white", numeral: "text-yellow", dim: "text-white/70", rule: "border-white/20", frame: "dark" as const, cta: "bg-yellow text-ink" },
  { card: "bg-accent text-ink", numeral: "text-ink", dim: "text-ink", rule: "border-ink/30", frame: "yellow" as const, cta: "bg-ink text-white" },
];

/** The two projects the viewbook must cover, as two large poster cards set off against each other. */
export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-paper py-16 sm:py-24">
      <Container>
        <ChapterStrip index="03" label="Projects" meta="50% of the final grade" />
        <div className="mt-10 grid items-end gap-6 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 id="projects-title" className="font-poster text-poster font-extrabold uppercase">
              <span className="block">Two projects,</span> <span className="block">one semester</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-4">
            <p className="text-body text-muted">A robot competition before the midterm, then an open project of our own choosing.</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 lg:mt-16 lg:gap-10">
          {projects.map((p, i) => {
            const look = LOOKS[i % LOOKS.length];
            return (
              <li key={p.slug} className={cn(i % 2 === 1 && "md:mt-16")}>
                <Reveal delay={i * 0.08} className="h-full">
                  {/* The title is the link; it stretches over the whole card. */}
                  <article className={cn("card-link group relative flex h-full flex-col p-5 sm:p-7", look.card)}>
                    <div className={cn("flex items-start justify-between gap-4 border-b-2 pb-3 font-mono text-label uppercase", look.rule)}>
                      <span>{p.kicker}</span>
                      <span className={cn("shrink-0", look.dim)}>{p.weeks}</span>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <span aria-hidden className={cn("font-poster text-numeral font-extrabold", look.numeral)}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("pb-2 text-right font-mono text-label uppercase", look.dim)}>{p.weight.split(" (")[0]}</span>
                    </div>

                    <h3 className="mt-5 font-poster text-h1 font-extrabold uppercase leading-[0.95] text-balance">
                      <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {p.ourTitle || p.title}
                      </Link>
                    </h3>
                    {p.ourTitle ? <p className={cn("mt-2 text-small", look.dim)}>{p.title}</p> : null}

                    <div className="mt-6">
                      <PhotoFrame
                        image={p.cover}
                        fallbackPath={`/images/projects/${p.slug}/cover`}
                        label={`${p.kicker.split(" · ")[0]} — our photo`}
                        code={`Fig. P${i + 1}`}
                        tone={look.frame}
                        aspect="aspect-[16/10]"
                        sizes="(min-width: 768px) 45vw, 100vw"
                        zoom
                      />
                    </div>

                    {p.swatches?.length ? (
                      <div className="mt-6">
                        <p className={cn("font-mono text-label uppercase", look.dim)}>Sort by colour — six gemstones</p>
                        <ul className="mt-2 flex h-4">
                          {p.swatches.map((s) => (
                            <li key={s.name} title={s.name} className="flex-1" style={{ background: s.hex }}>
                              <span className="sr-only">{s.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {p.milestones?.length ? (
                      <ol className={cn("mt-6 border-t-2", look.rule)}>
                        {p.milestones.map((m) => (
                          <li key={m.week} className={cn("flex gap-4 border-b py-2 text-small", look.rule)}>
                            <span className="w-16 shrink-0 font-mono text-label uppercase leading-[inherit]">{m.week}</span>
                            <span>{m.label}</span>
                          </li>
                        ))}
                      </ol>
                    ) : null}

                    <dl className="mt-6 grid grid-cols-2 gap-4 text-small">
                      <div>
                        <dt className={cn("font-mono text-label uppercase", look.dim)}>Team</dt>
                        <dd className="mt-0.5 font-medium">{p.team}</dd>
                      </div>
                      <div>
                        <dt className={cn("font-mono text-label uppercase", look.dim)}>Due</dt>
                        <dd className="mt-0.5 font-medium">{p.due}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto pt-8">
                      <span aria-hidden className={cn("flex min-h-12 items-center justify-between gap-3 px-4 text-small font-semibold", look.cta)}>
                        Read about the project
                        <ArrowRight className="nudge size-4" />
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
