"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { navItems } from "@/lib/navigation";
import { SPRING } from "@/components/motion/tokens";

/** Section id on the home page ("about"), or the route name for page links ("journal"). */
const keys = navItems.map((i) => i.href.split("#")[1] ?? i.href.replace(/^\//, ""));
const sectionIds = navItems.flatMap((i) => (i.href.includes("#") ? [i.href.split("#")[1]] : []));

/** Which nav item a route belongs to (week pages → Weeks, project pages → Projects, /journal → Journal). */
export function navKeyForPath(pathname: string): string | null {
  if (pathname.startsWith("/weeks/")) return "weeks";
  if (pathname.startsWith("/projects/")) return "projects";
  if (pathname === "/journal" || pathname.startsWith("/journal/")) return "journal";
  return null;
}

/**
 * Desktop navigation in mono capitals. A yellow highlighter block glides to the hovered link
 * and rests on the section you are reading (home page) or on the section a page belongs to.
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
        setInView(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const current = pathname === "/" ? inView : navKeyForPath(pathname);
  const indicator = hovered ?? current;

  return (
    <nav aria-label="Main" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
      <ul className="flex items-center">
        {navItems.map((item, i) => {
          const key = keys[i];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current === key ? (pathname === "/" ? "location" : "page") : undefined}
                onMouseEnter={() => setHovered(key)}
                onFocus={() => setHovered(key)}
                onBlur={() => setHovered(null)}
                data-n={String(i + 1).padStart(2, "0")}
                className="nav-num relative isolate flex min-h-11 items-center px-2.5 font-mono text-label uppercase text-ink lg:px-3"
              >
                {indicator === key ? (
                  <m.span layoutId="nav-indicator" aria-hidden className="absolute inset-x-0 inset-y-2 -z-10 bg-yellow" transition={SPRING} />
                ) : null}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
