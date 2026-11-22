import Link from "next/link";
import { navItems } from "@/lib/navigation";

/** Desktop navigation. */
export function MainNav() {
  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
