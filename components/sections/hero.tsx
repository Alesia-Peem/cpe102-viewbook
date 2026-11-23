import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { course } from "@/content/course";
import type { JournalWeek } from "@/types/journal";
import { resolveImage } from "@/lib/images";
import { formatDateRange } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { NumberTicker } from "@/components/fx/number-ticker";
import { EmptyFrame } from "@/components/home/empty-frame";
import { Parallax } from "@/components/home/parallax";

/** The lead photograph: /images/hero/hero.* if added, else the first photo of the journal. */
function heroPhoto(weeks: JournalWeek[]) {
  const own = resolveImage(site.heroImage, "/images/hero/hero");
  if (own.src) return { src: own.src, alt: site.heroImage?.alt || `${site.courseCode} — main photograph`, week: undefined, expected: undefined };
  const week = weeks.find((w) => w.photos.length > 0);
  if (!week) return { src: undefined, alt: "", week: undefined, expected: own.expected };
  const p = week.photos[0];
  // Uncaptioned photos get a factual alt from the week they belong to.
  const alt = p.caption || `${week.label}, ${week.topic}: a photograph from class`;
  return { src: p.src, alt, week, expected: undefined };
}

/**
 * First screen as a poster: a flat hard-hat-yellow field, the course name set in giant
 * condensed capitals, and the one real photograph pinned behind the second line — its blank
 * whiteboard sits under the type, so the overlap never costs legibility.
 */
export function Hero({ weeks }: { weeks: JournalWeek[] }) {
  const dates = weeks.flatMap((w) => [w.date, w.endDate]).filter((d): d is string => !!d).sort();
  const period = dates.length ? formatDateRange(dates[0], dates[dates.length - 1]) : undefined;
  const first = weeks[0];
  const photo = heroPhoto(weeks);
  const intro =
    site.tagline ||
    "The weekly topics of the course and its labs, our midterm and final projects, and our attitude towards the course — collected week by week.";

  const facts = [
    { label: "Course", value: `${site.courseCode}` },
    { label: "Semester", value: "1/2569 (2026)" },
    { label: "Team", value: site.groupName || "—" },
    { label: "Length", value: <><NumberTicker value={weeks.length} /> weeks</> },
    { label: "Period", value: period ?? "—" },
    { label: "Lab", value: `Room ${course.labRoom}` },
  ];

  return (
    <section aria-labelledby="hero-title" className="focus-ink relative isolate overflow-hidden bg-yellow text-ink">
      <Container className="relative pb-16 pt-4 sm:pt-5 lg:pb-24">
        {/* Poster head strip */}
        <div
          className="enter flex flex-wrap items-center gap-x-6 gap-y-1 border-b-2 border-ink pb-3 font-mono text-label uppercase"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <p className="flex items-center gap-2">
            <span aria-hidden className="inline-block size-2 bg-ink" />
            The {site.courseCode} Viewbook
          </p>
          <p className="hidden sm:block">
            {course.universityShort} · {course.department}
          </p>
          <p className="sm:ml-auto">{course.semester}</p>
        </div>

        <h1 id="hero-title" className="poster-fit relative z-10 mt-5 font-poster font-extrabold uppercase sm:mt-7">
          <span className="line-mask">
            <span className="line-up" style={{ "--i": 0 } as React.CSSProperties}>
              Engineering
            </span>
          </span>{" "}
          <span className="line-mask">
            <span className="line-up" style={{ "--i": 1 } as React.CSSProperties}>
              Exploration
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-x-10 gap-y-10 lg:mt-10 lg:grid-cols-12">
          {/* Introduction and actions */}
          <div className="enter lg:col-span-6 xl:col-span-6" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="max-w-xl text-lead font-medium text-ink">{intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/journal" arrow>
                Open the 16-week journal
              </ButtonLink>
              <ButtonLink href="/#about" variant="secondary" className="border-2 border-ink hover:bg-ink hover:text-yellow">
                About the course
              </ButtonLink>
            </div>
            <ul className="mt-4 flex flex-col font-mono text-label uppercase sm:flex-row sm:gap-8">
              {first ? (
                <li>
                  <Link href={`/weeks/${first.slug}`} className="group inline-flex min-h-11 items-center gap-2 underline decoration-ink/40 decoration-2 underline-offset-4 hover:decoration-ink">
                    Start at week {first.number}
                    <ArrowRight aria-hidden className="nudge size-3.5" />
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/#weeks" className="group inline-flex min-h-11 items-center gap-2 underline decoration-ink/40 decoration-2 underline-offset-4 hover:decoration-ink">
                  Browse all {weeks.length} weeks
                  <ArrowDown aria-hidden className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* The photograph, pinned behind the headline's second line */}
          <figure className="relative z-0 mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:col-start-8 lg:row-span-2 hero-pull lg:mx-0 lg:max-w-none">
            <Parallax distance={70} className="relative">
              <div className="print rotate-[1.25deg]">
                <div className="clip-up relative aspect-[4/5] overflow-hidden bg-surface">
                  {photo.src ? (
                    <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, (min-width: 640px) 512px, 92vw" className="object-cover" style={{ objectPosition: "50% 22%" }} />
                  ) : (
                    <EmptyFrame label="The main photograph" file={photo.expected} code="Fig. 01" />
                  )}
                </div>
              </div>
              <span aria-hidden className="tape land -left-4 top-3 -rotate-[24deg]" style={{ "--i": 0 } as React.CSSProperties} />
              <span aria-hidden className="tape land -right-5 top-6 rotate-[32deg]" style={{ "--i": 1 } as React.CSSProperties} />
            </Parallax>
            <figcaption
              className="land relative z-10 -mt-7 ml-3 inline-block max-w-[85%] -rotate-[1.5deg] bg-ink px-3.5 py-2.5 text-white shadow-[0_12px_24px_-14px_rgb(15_27_42/0.6)] sm:ml-6"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <span className="block font-mono text-label uppercase text-yellow">
                Fig. 01{photo.week ? ` — ${photo.week.label}${photo.week.dateLabel ? ` · ${photo.week.dateLabel}` : ""}` : ""}
              </span>
              <span className="mt-0.5 block text-small font-medium">{photo.week ? `${photo.week.topic}${photo.week.subtitle ? ` — ${photo.week.subtitle}` : ""}` : site.courseName}</span>
            </figcaption>
          </figure>

          {/* Facts, set like the title block of a drawing */}
          <dl className="enter grid grid-cols-2 self-end border-l-2 border-t-2 border-ink sm:grid-cols-3 lg:col-span-6" style={{ "--i": 4 } as React.CSSProperties}>
            {facts.map((f) => (
              <div key={f.label} className="border-b-2 border-r-2 border-ink px-3 py-2.5">
                <dt className="font-mono text-label uppercase text-ink/75">{f.label}</dt>
                <dd className="mt-0.5 text-small font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
