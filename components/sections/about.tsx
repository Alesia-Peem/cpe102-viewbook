import { site } from "@/content/site";
import { Eyebrow, Section } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

export function About() {
  const { paragraphs, image } = site.about;

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <Eyebrow>01 — About</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">About the course</h2>
          <ContentImage
            image={image}
            placeholderLabel="About the course photograph"
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="mt-8"
          />
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-ink/85 lg:pt-12">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <TextPlaceholder label="Waiting for user-provided course description" />
          )}
        </div>
      </div>
    </Section>
  );
}
