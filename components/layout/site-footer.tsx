import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { navItems } from "@/lib/navigation";
import { getWeeks } from "@/lib/weeks";
import { padWeek } from "@/lib/utils";
import { Container } from "@/components/ui/section";

/** Footer: course identity, the section links, and a quick index of every week. */
export function SiteFooter() {
  const weeks = getWeeks();

  return (
    <footer className="bg-deep text-white">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono text-label uppercase text-white/65">{site.courseCode}</p>
          <p className="mt-3 text-h3 font-semibold">{site.courseName || site.courseCode}</p>
          {site.groupName ? <p className="mt-1 text-small text-white/70">{site.groupName}</p> : null}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="font-mono text-label uppercase text-white/65">Sections</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 lg:block">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Weeks index" className="lg:col-span-6">
          <p className="font-mono text-label uppercase text-white/65">Weeks</p>
          <ol className="mt-3 grid grid-cols-8 gap-1">
            {weeks.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/weeks/${w.slug}`}
                  title={w.title || `Week ${w.week}`}
                  className="flex h-11 items-center justify-center border border-white/15 font-mono text-label tracking-normal text-white/80 transition-colors hover:border-white/50 hover:text-white"
                >
                  {padWeek(w.week)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex items-center justify-between py-4 text-small text-white/65">
          <p>
            {site.courseCode}
            {site.groupName ? ` · ${site.groupName}` : ""}
          </p>
          <a href="#main" className="footer-link gap-1.5">
            Back to top
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
