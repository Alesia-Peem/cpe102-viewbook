import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { course } from "@/content/course";
import { navItems } from "@/lib/navigation";
import { getJournalWeeks } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { BackToTop } from "@/components/home/back-to-top";

/** Footer as the poster's foot: the course name set large, the sections, every week, back to top. */
export function SiteFooter() {
  const weeks = getJournalWeeks();

  return (
    <footer className="bg-deep text-white">
      <Container className="pt-16 sm:pt-20">
        <div className="flex flex-col justify-between gap-6 border-b-2 border-white/20 pb-8 lg:flex-row lg:items-end">
          <p className="font-poster text-poster font-extrabold uppercase leading-[0.86]">
            <span className="block text-yellow">{site.courseCode}</span>
            <span className="block">{site.courseName || "Viewbook"}</span>
          </p>
          <p className="max-w-xs font-mono text-label uppercase leading-relaxed text-white/70 lg:text-right">
            The viewbook{site.groupName ? ` by ${site.groupName}` : ""}
            <br />
            {course.department}, {course.universityShort}
            <br />
            {course.semester}
          </p>
        </div>

        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Footer" className="lg:col-span-4">
            <p className="font-mono text-label uppercase text-white/70">Sections</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-2">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link gap-2">
                    <span aria-hidden className="font-mono text-label text-yellow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Weeks index" className="lg:col-span-8">
            <p className="flex items-center justify-between gap-4 font-mono text-label uppercase text-white/70">
              <span>All {weeks.length} weeks</span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="inline-block size-2 bg-yellow" /> has photos
              </span>
            </p>
            <ol className="mt-3 grid grid-cols-8 gap-1">
              {weeks.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/weeks/${w.slug}`}
                    title={`${w.label} — ${w.topic}`}
                    aria-label={`${w.label}: ${w.topic}`}
                    className="relative flex h-11 items-center justify-center border border-white/15 font-mono text-label tracking-normal text-white/70 transition-colors hover:border-yellow hover:bg-yellow hover:text-ink sm:h-12"
                  >
                    {w.number}
                    <span aria-hidden className={cn("absolute right-1 top-1 size-1.5", w.photos.length ? "bg-yellow" : "bg-transparent")} />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex items-center justify-between gap-4 py-3 text-small text-white/70">
          <p className="font-mono text-label uppercase">
            {site.courseCode}
            {site.groupName ? ` · ${site.groupName}` : ""} · 2569
          </p>
          <BackToTop className="footer-link gap-1.5">
            Back to top
            <ArrowUp aria-hidden className="size-3.5" />
          </BackToTop>
        </Container>
      </div>
    </footer>
  );
}
