import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER } from "@/components/motion/tokens";
import { ChapterStrip } from "@/components/home/chapter-strip";
import { PhotoFrame } from "@/components/home/photo-frame";

/** Prints pinned to the board at slightly different angles and heights (from tablet up). */
const PINNED = ["md:-rotate-[1.5deg]", "md:mt-10 md:rotate-[1deg]", "md:mt-3 md:-rotate-[0.75deg]", "md:mt-14 md:rotate-[1.75deg]"];
/** Hovering a print straightens it and lifts it off the board. */
const LIFT = "transition-[rotate,translate] duration-300 ease-out md:hover:rotate-0 md:hover:-translate-y-1.5 motion-reduce:transition-none";

/** The team as a contact sheet: four portraits pinned at angles, each with a name tag. */
export function Team() {
  const { title, members } = site.team;

  return (
    <section id="team" aria-labelledby="team-title" className="bg-paper py-16 sm:py-24">
      <Container>
        <ChapterStrip index="05" label={site.groupName || "Team"} meta={`${members.length} members`} />

        <div className="mt-10 grid items-end gap-6 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 id="team-title" className="font-poster text-poster font-extrabold uppercase">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-4">
            <p className="font-mono text-label uppercase text-muted">
              {site.groupName} · {site.courseCode} {site.courseName}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 lg:mt-16">
          {members.map((m, i) => (
            <li key={i} className={cn(PINNED[i % PINNED.length], LIFT)}>
              <Reveal delay={(i % 4) * STAGGER}>
                <div className="print">
                    <PhotoFrame
                      image={m.photo}
                      fallbackPath={`/images/team/member-${i + 1}`}
                      label={`Member ${i + 1} portrait`}
                      code={String(i + 1).padStart(2, "0")}
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 768px) 22vw, 46vw"
                      compact
                    />
                </div>
                <div className="mt-4 border-t-2 border-ink pt-3">
                  <p className="font-mono text-label uppercase text-muted">Member {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-h3 font-semibold">
                    {m.name || <span className="font-mono text-label font-normal uppercase tracking-[0.1em] text-muted">[Name not yet added]</span>}
                  </h3>
                  {m.detail ? <p className="mt-1 font-mono text-label text-muted">{m.detail}</p> : null}
                  {m.link?.href ? (
                    <a href={m.link.href} target="_blank" rel="noopener noreferrer" className="text-link mt-2 inline-flex min-h-11 items-center gap-1 text-small">
                      {m.link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        {members.some((m) => !m.name) ? (
          <p className="mt-12 font-mono text-label text-muted md:mt-14">Names and roles: content/site.ts → team.members · portraits: public/images/team/member-1.jpg …</p>
        ) : null}
      </Container>
    </section>
  );
}
