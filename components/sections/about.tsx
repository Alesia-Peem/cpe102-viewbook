import { site } from "@/content/site";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

/** Course introduction: heading and text on the left, one photograph on the right. */
export function About() {
  const { paragraphs, image } = site.about;
  const [lead, ...rest] = paragraphs;

  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader id="about-title" label="About" title="About the course" />
          <div className="mt-8 space-y-5">
            {lead ? (
              <>
                <p className="text-lead text-ink">{lead}</p>
                {rest.map((p, i) => (
                  <p key={i} className="text-body text-ink/80">
                    {p}
                  </p>
                ))}
              </>
            ) : (
              <TextPlaceholder label="About the course" file="content/site.ts → about.paragraphs" />
            )}
          </div>
        </div>

        <ContentImage
          image={image}
          fallbackPath="/images/about/about"
          placeholderLabel="About the course photograph"
          aspect="aspect-[4/3] lg:aspect-[5/4]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="lg:col-span-6 lg:col-start-7"
        />
      </div>
    </Section>
  );
}
