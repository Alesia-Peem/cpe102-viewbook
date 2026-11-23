import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { course } from "@/content/course";
import { Container } from "@/components/ui/section";
import { GradingChart } from "@/components/ui/grading-chart";
import { Reveal } from "@/components/motion/reveal";
import { ChapterStrip } from "@/components/home/chapter-strip";
import { PhotoFrame } from "@/components/home/photo-frame";

/** Where each part the syllabus asks for lives on this site. */
const viewbookLinks = ["/#weeks", "/projects/first-project", "/projects/final-project", "/#reflection"];

/**
 * The course as the syllabus describes it — a pull quote and a yellow contents card —
 * then a three-column data sheet: who teaches it, the learning outcomes, how it is graded.
 */
export function About() {
  const { paragraphs, image } = site.about;

  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper py-16 sm:py-24">
      <Container>
        <ChapterStrip index="01" label="About" meta={`Syllabus · ${course.semester}`} />

        <div className="mt-10 grid gap-x-10 gap-y-14 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="about-title" className="font-poster text-poster font-extrabold uppercase">
                <span className="block">About</span> <span className="block">the course</span>
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="mt-10 sm:mt-12">
              <figure className="relative pl-12 sm:pl-20">
                <span aria-hidden className="absolute -top-3 left-0 font-poster text-poster font-extrabold leading-none text-accent sm:-top-5">
                  &ldquo;
                </span>
                <blockquote className="text-lead font-medium text-ink">{course.description}</blockquote>
                <figcaption className="mt-4 font-mono text-label uppercase text-muted">
                  — {course.code} syllabus, Course Description · {course.semester}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 pl-12 sm:pl-20">
              <p className="font-mono text-label uppercase text-muted">In our own words</p>
              {paragraphs.length > 0 ? (
                <div className="mt-3 space-y-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-body text-ink">
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="mt-3 border-l-2 border-dashed border-line-strong py-1 pl-4">
                  <p className="font-mono text-label uppercase text-muted">[Not yet written]</p>
                  <p className="mt-1 text-small text-ink">The course in our own words (optional).</p>
                  <p className="mt-0.5 font-mono text-label text-muted">Edit: content/site.ts → about.paragraphs</p>
                </div>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            {/* What the syllabus says a viewbook must contain — each item links to its part of this site. */}
            <Reveal delay={0.08} className="focus-ink bg-yellow p-5 text-ink sm:p-7">
              <p className="flex items-center justify-between gap-4 border-b-2 border-ink pb-3 font-mono text-label uppercase">
                <span>What this viewbook contains</span>
                <span>Syllabus brief</span>
              </p>
              <ol>
                {course.viewbookContents.map((item, i) => (
                  <li key={item} className="border-b border-ink/30 last:border-b-0">
                    <Link href={viewbookLinks[i]} className="group flex min-h-16 items-center gap-4 py-3">
                      <span aria-hidden className="w-[1.15em] shrink-0 font-poster text-h1 font-extrabold leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-small font-medium leading-snug underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-ink">
                        {item}
                      </span>
                      <ArrowRight aria-hidden className="nudge size-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <PhotoFrame
                image={image}
                fallbackPath="/images/about/about"
                label="A photo from class"
                code="Fig. 02"
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Reveal>
          </div>
        </div>

        {/* Course data sheet */}
        <div className="mt-16 border-t-2 border-ink sm:mt-20">
          <div className="grid lg:grid-cols-3">
            <Reveal className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:pr-10">
              <p className="font-mono text-label uppercase text-muted">A · People and place</p>
              <h3 className="mt-3 text-h3 font-semibold">Who teaches it</h3>
              <ul className="mt-4 space-y-2 text-small text-ink">
                {course.instructors.map((p) => (
                  <li key={p.name} className="flex gap-3">
                    <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 bg-accent" />
                    {p.name}
                  </li>
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

            <Reveal delay={0.05} className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:px-10">
              <p className="font-mono text-label uppercase text-muted">B · Learning outcomes</p>
              <h3 className="mt-3 text-h3 font-semibold">What you will be able to do</h3>
              <ol className="mt-4 space-y-3 text-small text-ink">
                {course.learningOutcomes.map((o, i) => (
                  <li key={o} className="grid grid-cols-[2rem_1fr] items-baseline gap-2">
                    <span className="font-poster text-h3 font-extrabold text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1} className="py-8 lg:pl-10">
              <p className="mb-3 font-mono text-label uppercase text-muted">C · Grading</p>
              <GradingChart />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
