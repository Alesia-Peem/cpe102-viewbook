import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER } from "@/components/motion/tokens";

/** Portrait grid: 2 across on phones, 4 from tablet up. */
export function Team() {
  const { title, members } = site.team;

  return (
    <Section id="team" labelledBy="team-title">
      <SectionHeader id="team-title" label={site.groupName || "Team"} title={title} />
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
        {members.map((m, i) => (
          <li key={i}>
            <Reveal delay={(i % 4) * STAGGER}>
              <ContentImage
                image={m.photo}
                fallbackPath={`/images/team/member-${i + 1}`}
                placeholderLabel={`Member ${i + 1} photo`}
                compact
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <h3 className="mt-4 text-h3 font-semibold">{m.name || <TextPlaceholder inline label={`Member ${i + 1} name`} />}</h3>
              {m.detail ? <p className="mt-1 font-mono text-label text-muted">{m.detail}</p> : null}
              {m.link?.href ? (
                <a href={m.link.href} target="_blank" rel="noopener noreferrer" className="text-link mt-2 inline-flex min-h-11 items-center gap-1 text-small">
                  {m.link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
