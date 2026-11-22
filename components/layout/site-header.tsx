import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/lib/navigation";
import { Container } from "@/components/ui/section";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex min-h-11 items-center gap-3 text-ink">
          <span className="bg-ink px-1.5 py-0.5 font-mono text-xs font-medium text-white">{site.courseCode}</span>
          {site.courseName ? (
            <span className="hidden text-[0.9375rem] font-semibold tracking-tight sm:inline">{site.courseName}</span>
          ) : null}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9 text-[0.9375rem]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
