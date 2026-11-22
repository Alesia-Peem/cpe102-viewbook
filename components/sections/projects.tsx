import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { Reveal } from "@/components/motion/reveal";

/** The two projects the viewbook must cover, as large linked cards. */
export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeader
        id="projects-title"
        label="Projects"
        title="Two projects, one semester"
        aside="A robot competition before the midterm, then an open project of our own choosing."
      />
      <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 0.08}>
              <Link href={`/projects/${p.slug}`} className="card-link group block">
                <ContentImage
                  image={p.cover}
                  fallbackPath={`/images/projects/${p.slug}/cover`}
                  placeholderLabel={`${p.kicker.split(" · ")[0]} — our photo`}
                  aspect="aspect-[16/10]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  zoom
                />
                <p className="mt-5 font-mono text-label uppercase text-accent-text">{p.kicker}</p>
                <h3 className="mt-2 text-h3 font-semibold text-balance sm:text-[1.5rem] sm:leading-tight">{p.ourTitle || p.title}</h3>
                {p.ourTitle ? <p className="mt-1 text-small text-muted">{p.title}</p> : null}
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-small">
                  <div className="flex gap-2">
                    <dt className="text-muted">When</dt>
                    <dd className="text-ink">{p.weeks}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted">Team</dt>
                    <dd className="text-ink">{p.team}</dd>
                  </div>
                </dl>
                <span className="mt-5 inline-flex items-center gap-2 text-small font-medium text-navy">
                  Read about the project
                  <ArrowRight aria-hidden className="nudge size-4" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
