import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { course } from "@/content/course";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { GradingChart } from "@/components/ui/grading-chart";
import { Reveal } from "@/components/motion/reveal";

/** Where each part the syllabus asks for lives on this site. */
const viewbookLinks = ["/#weeks", "/projects/first-project", "/projects/final-project", "/#reflection"];

/** The course as the syllabus describes it, what this viewbook contains, and how the course is graded. */
export function About() {
  const { paragraphs, image } = site.about;

  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader id="about-title" label="About" title="About the course" />
          <Reveal delay={0.08} className="mt-8">
            <blockquote className="text-lead text-ink">{course.description}</blockquote>
            <p className="mt-3 font-mono text-label uppercase text-muted">— CPE102 syllabus, {course.semester}</p>
            <div className="mt-8 space-y-4">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <p key={i} className="text-body text-ink">
                    {p}
                  </p>
                ))
              ) : (
                <TextPlaceholder label="The course in our own words (optional)" file="content/site.ts → about.paragraphs" />
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
          <ContentImage
            image={image}
            fallbackPath="/images/about/about"
            placeholderLabel="A photo from class"
            aspect="aspect-[4/3] lg:aspect-[5/4]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {/* What the syllabus says a viewbook must contain — each item links to its part of this site. */}
          <div className="mt-8">
            <p className="font-mono text-label uppercase text-muted">What this viewbook contains</p>
            <ol className="mt-3 border-t border-line">
              {course.viewbookContents.map((item, i) => (
                <li key={item} className="border-b border-line">
                  <Link href={viewbookLinks[i]} className="group flex min-h-12 items-center gap-4 py-2 text-small text-ink hover:text-navy">
                    <span className="font-mono text-label text-accent-text">0{i + 1}</span>
                    <span className="flex-1">{item}</span>
                    <ArrowRight aria-hidden className="nudge size-4 text-muted group-hover:translate-x-[3px] group-hover:text-navy" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      {/* Course facts from the syllabus */}
      <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <Reveal>
          <p className="text-h3 font-semibold">Who teaches it</p>
          <ul className="mt-4 space-y-2 text-small text-ink">
            {course.instructors.map((p) => (
              <li key={p.name}>{p.name}</li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 text-small">
            <div>
              <dt className="font-mono text-label uppercase text-muted">Where</dt>
              <dd className="mt-0.5 text-ink">
                Lab room {course.labRoom}, {course.department}, {course.universityShort}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label uppercase text-muted">Textbook</dt>
              <dd className="mt-0.5 text-ink">{course.textbook}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-h3 font-semibold">What you will be able to do</p>
          <ol className="mt-4 space-y-2.5 text-small text-ink">
            {course.learningOutcomes.map((o, i) => (
              <li key={o} className="flex gap-3">
                <span className="font-mono text-label leading-[inherit] text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2 lg:col-span-1">
          <GradingChart />
        </Reveal>
      </div>
    </Section>
  );
}
