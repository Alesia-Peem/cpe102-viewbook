import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/lib/navigation";
import { Container } from "@/components/ui/section";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <Container className="flex flex-col gap-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-mono text-white">{site.courseCode}</span>
          {site.courseName ? <> · {site.courseName}</> : null}
          {site.groupName ? <> · {site.groupName}</> : null}
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
