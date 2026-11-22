import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { navItems } from "@/lib/navigation";
import { Container } from "@/components/ui/section";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-white">
      <Container className="pb-10 pt-20 sm:pt-28">
        <p className="text-[clamp(2.75rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-balance">
          {site.courseName || site.courseCode}
        </p>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/15 pt-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-mono text-white">{site.courseCode}</span>
            {site.groupName ? <> · {site.groupName}</> : null}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw inline-flex min-h-11 items-center transition-colors hover:text-white md:min-h-0">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#main" className="link-draw inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-white md:min-h-0">
                  Back to top
                  <ArrowUp aria-hidden className="size-3.5" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
