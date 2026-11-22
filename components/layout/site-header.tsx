import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/section";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

/** Solid header (no blur: a backdrop-filter would also trap the phone menu's fixed panel). */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex min-h-11 items-center gap-3 text-ink">
          <span className="bg-ink px-1.5 py-0.5 font-mono text-label font-medium tracking-normal text-white">{site.courseCode}</span>
          {site.courseName ? <span className="hidden text-small font-semibold tracking-tight sm:inline">{site.courseName}</span> : null}
        </Link>
        <MainNav />
        <MobileNav />
      </Container>
    </header>
  );
}
