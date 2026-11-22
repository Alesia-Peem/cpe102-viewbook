"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { navItems } from "@/lib/navigation";
import { SPRING } from "@/components/motion/tokens";

const ids = navItems.map((i) => i.href.split("#")[1]);

/**
 * Desktop navigation. A 1px indicator glides to the hovered link and rests under the
 * section you are reading (home page) or under "Weeks" on a week page.
 */
export function MainNav() {
  const pathname = usePathname();
  const [inView, setInView] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Scroll spy: which section crosses the middle band of the screen.
  useEffect(() => {
    if (pathname !== "/") return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setInView(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const current = pathname.startsWith("/weeks/") ? "weeks" : pathname === "/" ? inView : null;
  const indicator = hovered ?? current;

  return (
    <nav aria-label="Main" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
      <ul className="flex items-center gap-1">
        {navItems.map((item, i) => {
          const id = ids[i];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current === id ? (pathname === "/" ? "location" : "page") : undefined}
                onMouseEnter={() => setHovered(id)}
                className="nav-link nav-link--indicator aria-[current]:text-ink"
              >
                {item.label}
                {indicator === id ? (
                  <m.span layoutId="nav-indicator" aria-hidden className="absolute inset-x-3 bottom-2.5 h-px bg-ink" transition={SPRING} />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
