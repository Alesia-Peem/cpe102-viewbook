import { site } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

export function About() {
  const { paragraphs, image } = site.about;
  const [lead, ...rest] = paragraphs;

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>About</Eyebrow>
          <SectionHeading>About the course</SectionHeading>

          <div className="mt-8 space-y-5">
            {lead ? (
              <>
                <p className="text-xl leading-relaxed text-ink sm:text-2xl sm:leading-snug">{lead}</p>
                {rest.map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-ink/80">
                    {p}
                  </p>
                ))}
              </>
            ) : (
              <TextPlaceholder label="Waiting for user-provided course description" />
            )}
          </div>
        </div>

        <ContentImage
          image={image}
          placeholderLabel="About the course photograph"
          aspect="aspect-[4/3] lg:aspect-[5/4]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="lg:col-span-6 lg:col-start-7"
        />
      </div>
    </Section>
  );
}
