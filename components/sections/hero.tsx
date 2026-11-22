import { site } from "@/content/site";
import type { Week } from "@/types/content";
import { getDateRange } from "@/lib/weeks";
import { formatDateRange } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";
import { TitleBlock } from "@/components/ui/title-block";
import { SplitWords } from "@/components/motion/split-words";
import { Spotlight } from "@/components/fx/spotlight";
import { PointerGlow } from "@/components/fx/pointer-glow";
import { TiltCard } from "@/components/fx/tilt-card";
import { BorderBeam } from "@/components/fx/border-beam";
import { NumberTicker } from "@/components/fx/number-ticker";

/** First screen: the course name set large, the title block of facts, two actions, the main photograph. */
export function Hero({ weeks }: { weeks: Week[] }) {
  const range = getDateRange(weeks);
  const first = weeks[0];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-deep text-white">
      <div aria-hidden className="fx-grid absolute inset-0 -z-10" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
      <PointerGlow />
      <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 py-12 lg:gap-12 lg:py-14">
        <div>
          <p className="enter font-mono text-label uppercase text-white/70" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="fx-shiny">A week-by-week journal</span>
          </p>
          <h1 id="hero-title" className="mt-4 text-display font-semibold text-balance">
            {site.courseName ? <SplitWords text={site.courseName} /> : <TextPlaceholder inline label="Course name" />}
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="enter flex flex-col gap-8 lg:col-span-4 lg:justify-between" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="max-w-md text-lead text-white/70">
              {site.tagline || <TextPlaceholder onDark label="Short introduction to the website" file="content/site.ts → tagline" />}
            </div>

            <div className="flex flex-col gap-6">
              <TitleBlock
                onDark
                rows={[
                  { label: "Course", value: site.courseCode },
                  { label: "Team", value: site.groupName || <TextPlaceholder inline label="Team" className="text-white/70" /> },
                  { label: "Length", value: <><NumberTicker value={weeks.length} /> weeks</> },
                  { label: "Period", value: range ? formatDateRange(range.start, range.end) : <TextPlaceholder inline label="Dates" className="text-white/70" /> },
                ]}
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                {first ? (
                  <ButtonLink href={`/weeks/${first.slug}`} variant="light" glow arrow>
                    Read week {first.week}
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/#weeks" variant="outline-light">
                  Browse all weeks
                </ButtonLink>
              </div>
            </div>
          </div>

          <TiltCard className="media-in lg:col-span-8">
            <ContentImage
              image={site.heroImage}
              fallbackPath="/images/hero/hero"
              placeholderLabel="Main project photograph"
              aspect="aspect-[4/3] lg:aspect-[16/9]"
              sizes="(min-width: 1024px) 66vw, 100vw"
              priority
            />
            <BorderBeam duration={9} />
          </TiltCard>
        </div>
      </Container>
    </section>
  );
}
