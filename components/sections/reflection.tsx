import { site } from "@/content/site";
import { course } from "@/content/course";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ScrollWords } from "@/components/motion/scroll-words";
import { ChapterStrip } from "@/components/home/chapter-strip";

/**
 * Our attitude towards the course: a yellow poster chapter. The title is set huge; the first
 * paragraph brightens word by word as it scrolls past. Until it is written, a page torn from
 * the notebook says where it goes.
 */
export function Reflection() {
  const { title, paragraphs } = site.reflection;
  const [lead, ...rest] = paragraphs;

  return (
    <section id="reflection" aria-labelledby="reflection-title" className="focus-ink relative overflow-hidden bg-yellow py-16 text-ink sm:py-24">
      <Container>
        <ChapterStrip tone="yellow" index="04" label="Reflection" meta={`Part 04 of the viewbook brief`} />

        <div className="mt-10 grid gap-x-10 gap-y-12 lg:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="reflection-title" className="font-poster text-poster font-extrabold uppercase text-balance">
              {title}
            </h2>
            <p className="mt-6 max-w-md font-mono text-label uppercase">
              The syllabus asks every viewbook for “{course.viewbookContents[3].toLowerCase()}” — this is ours.
            </p>
          </Reveal>

          <div className="lg:col-span-5 lg:pt-4">
            {lead ? (
              <>
                <ScrollWords text={lead} className="text-h2 font-semibold text-balance" />
                {rest.length > 0 ? (
                  <div className="mt-10 space-y-5 text-body">
                    {rest.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <Reveal delay={0.08} className="relative">
                <span aria-hidden className="tape -top-3 left-8 -rotate-[4deg]" />
                <div className="ruled relative rotate-[1deg] px-5 pb-8 pl-16 pt-10 shadow-[0_24px_40px_-26px_rgb(15_27_42/0.55)] sm:pr-8">
                  <p className="font-mono text-label uppercase text-accent-text">[Reflection not yet written]</p>
                  <p className="mt-4 text-h3 font-semibold leading-[2rem]">What we think of the course — what worked, what was hard, and what we would tell next year&apos;s students.</p>
                  <p className="mt-6 text-small leading-[2rem] text-muted">
                    The first paragraph is set large here. Edit <code className="font-mono text-label text-ink">content/site.ts → reflection.paragraphs</code>
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
