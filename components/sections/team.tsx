import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

export function Team() {
  const { title, members } = site.team;

  return (
    <Section id="team">
      <Eyebrow>{site.groupName || "Team"}</Eyebrow>
      <SectionHeading>{title}</SectionHeading>

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
        {members.map((m, i) => (
          <li key={i}>
            <ContentImage
              image={m.photo}
              placeholderLabel={`Member ${i + 1} photo`}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
            <p className="mt-4 text-lg font-semibold tracking-tight">
              {m.name || <TextPlaceholder inline label={`Member ${i + 1} name`} />}
            </p>
            {m.detail ? <p className="mt-1 font-mono text-xs text-muted">{m.detail}</p> : null}
            {m.link?.href ? (
              <a
                href={m.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-navy sm:min-h-0"
              >
                {m.link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
