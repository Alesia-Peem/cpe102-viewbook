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

/** First screen: the course name set large, the title block of facts, two actions, the main photograph. */
export function Hero({ weeks }: { weeks: Week[] }) {
  const range = getDateRange(weeks);
  const first = weeks[0];

  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 py-12 lg:gap-12 lg:py-14">
        <div>
          <p className="enter font-mono text-label uppercase text-muted" style={{ "--i": 0 } as React.CSSProperties}>
            A week-by-week journal
          </p>
          <h1 id="hero-title" className="mt-4 text-display font-semibold text-balance">
            {site.courseName ? <SplitWords text={site.courseName} /> : <TextPlaceholder inline label="Course name" />}
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="enter flex flex-col gap-8 lg:col-span-4 lg:justify-between" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="max-w-md text-lead text-ink">
              {site.tagline || <TextPlaceholder label="Short introduction to the website" file="content/site.ts → tagline" />}
            </div>

            <div className="flex flex-col gap-6">
              <TitleBlock
                rows={[
                  { label: "Course", value: site.courseCode },
                  { label: "Team", value: site.groupName || <TextPlaceholder inline label="Team" /> },
                  { label: "Length", value: `${weeks.length} weeks` },
                  { label: "Period", value: range ? formatDateRange(range.start, range.end) : <TextPlaceholder inline label="Dates" /> },
                ]}
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                {first ? (
                  <ButtonLink href={`/weeks/${first.slug}`} arrow>
                    Read week {first.week}
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/#weeks" variant="secondary">
                  Browse all weeks
                </ButtonLink>
              </div>
            </div>
          </div>

          <ContentImage
            image={site.heroImage}
            fallbackPath="/images/hero/hero"
            placeholderLabel="Main project photograph"
            aspect="aspect-[4/3] lg:aspect-[16/9]"
            sizes="(min-width: 1024px) 66vw, 100vw"
            priority
            className="media-in lg:col-span-8"
          />
        </div>
      </Container>
    </section>
  );
}
