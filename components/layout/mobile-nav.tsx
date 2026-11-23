"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { site } from "@/content/site";
import { course } from "@/content/course";
import { SPRING, STAGGER } from "@/components/motion/tokens";
import { navKeyForPath } from "./main-nav";

/** Phone menu: a full-screen yellow poster of links that rise in one after another. */
export function MobileNav() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so changing page closes it — no effect needed.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const currentKey = navKeyForPath(pathname);

  const close = useCallback((returnFocus: boolean) => {
    setOpenOn(null);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // While open: Escape closes (focus back to the button), the page behind does not scroll,
  // and focus moves to the first link.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      cancelAnimationFrame(frame);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close(false) : setOpenOn(pathname))}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className={`flex h-11 items-center gap-2 border-2 border-ink px-3 font-mono text-label uppercase transition-colors ${open ? "bg-ink text-yellow" : "text-ink"}`}
      >
        <span aria-hidden>{open ? "Close" : "Menu"}</span>
        <AnimatePresence initial={false} mode="wait">
          <m.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </m.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open ? (
          <m.nav
            key="menu"
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="focus-ink fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-yellow text-ink"
          >
            <m.ul
              initial="hidden"
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: STAGGER, delayChildren: 0.04 } } }}
              className="flex flex-col px-4 pt-2"
            >
              {navItems.map((item, i) => {
                const key = item.href.split("#")[1] ?? item.href.replace(/^\//, "");
                return (
                  <m.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0, transition: SPRING } }}
                    className="border-b-2 border-ink"
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => close(false)}
                      aria-current={currentKey === key ? "page" : undefined}
                      className="group flex min-h-16 items-center gap-4 py-2"
                    >
                      <span aria-hidden className="w-6 font-mono text-label text-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-poster text-h1 font-extrabold uppercase leading-none group-aria-[current]:underline group-aria-[current]:decoration-4 group-aria-[current]:underline-offset-4">
                        {item.label}
                      </span>
                      <ArrowRight aria-hidden className="size-6" />
                    </Link>
                  </m.li>
                );
              })}
            </m.ul>
            <p className="mt-auto px-4 pb-6 pt-10 font-mono text-label uppercase">
              {site.courseCode} {site.courseName} · {site.groupName} · {course.universityShort}
            </p>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
