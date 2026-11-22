import { site } from "@/content/site";
import type { Week } from "@/types/content";
import { getDateRange } from "@/lib/weeks";
import { formatDateRange } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

/** First screen: the course name set large, the facts, two actions and the main photograph. */
export function Hero({ weeks }: { weeks: Week[] }) {
  const range = getDateRange(weeks);
  const first = weeks[0];

  const facts: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Course", value: site.courseCode },
    { label: "Team", value: site.groupName || <TextPlaceholder inline label="Team" /> },
    { label: "Length", value: `${weeks.length} weeks` },
    {
      label: "Period",
      value: range ? formatDateRange(range.start, range.end) : <TextPlaceholder inline label="Dates" />,
    },
  ];

  return (
    <section className="border-b border-line">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 py-12 lg:gap-12 lg:py-14">
        <div>
          <p className="enter font-mono text-xs uppercase tracking-[0.12em] text-muted" style={{ "--i": 0 } as React.CSSProperties}>
            A week-by-week journal
          </p>
          <h1
            className="enter mt-4 text-[clamp(3.25rem,8.6vw,8.25rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-balance"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {site.courseName || <TextPlaceholder inline label="Course name" />}
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="enter flex flex-col justify-between gap-10 lg:col-span-4" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="max-w-md text-lg leading-relaxed text-ink/80">
              {site.tagline || <TextPlaceholder label="Short introduction to the website" />}
            </div>

            <div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-sm">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{f.label}</dt>
                    <dd className="mt-1 font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            placeholderLabel="Main project photograph"
            aspect="aspect-[4/3] lg:aspect-[16/9]"
            sizes="(min-width: 1024px) 66vw, 100vw"
            priority
            className="enter lg:col-span-8"
          />
        </div>
      </Container>
    </section>
  );
}
