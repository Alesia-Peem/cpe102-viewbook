import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/lib/navigation";
import { Container } from "@/components/ui/section";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 font-semibold tracking-tight text-ink">
          <span className="font-mono text-sm">{site.courseCode}</span>
          {site.groupName ? (
            <span className="hidden text-sm font-normal text-muted sm:inline">/ {site.groupName}</span>
          ) : null}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
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
