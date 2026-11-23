import "@/components/home/home.css";
import Link from "next/link";
import { site } from "@/content/site";
import { course } from "@/content/course";
import { Container } from "@/components/ui/section";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

/**
 * Solid paper header with a heavy ink rule, like the top margin of a poster.
 * No blur: a backdrop-filter would also trap the phone menu's fixed panel.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b-2 border-ink bg-paper">
      <Container className="flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.courseCode} Viewbook — home`} className="group flex min-h-11 items-center gap-3 text-ink">
          <span className="flex h-9 items-center bg-ink px-2 font-poster text-h3 font-extrabold uppercase leading-none tracking-[0.02em] text-yellow transition-colors group-hover:bg-navy">
            {site.courseCode}
          </span>
          <span className="flex flex-col font-mono text-label uppercase leading-tight md:hidden lg:flex">
            <span className="text-ink">Viewbook</span>
            <span className="text-muted">
              {site.groupName || site.courseName} · {course.universityShort}
            </span>
          </span>
        </Link>
        <MainNav />
        <MobileNav />
      </Container>
    </header>
  );
}
