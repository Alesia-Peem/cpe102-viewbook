import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Eyebrow, Section } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

export function Team() {
  const { title, members } = site.team;

  return (
    <Section id="team">
      <Eyebrow>04 — Team</Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {members.map((m, i) => (
          <li key={i}>
            <ContentImage
              image={m.photo}
              placeholderLabel={`Team member ${i + 1} photo`}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
            <p className="mt-4 font-medium">
              {m.name || <TextPlaceholder inline label={`Member ${i + 1} name`} />}
            </p>
            {m.detail ? <p className="mt-1 text-sm text-muted">{m.detail}</p> : null}
            {m.link?.href ? (
              <a
                href={m.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-navy hover:underline"
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
