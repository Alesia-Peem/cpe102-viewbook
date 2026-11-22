"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { SPRING, STAGGER } from "@/components/motion/tokens";

/** Phone menu: full-screen panel, items slide in one after another, the icon morphs. */
export function MobileNav() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so changing page closes it — no effect needed.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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
        className="-mr-2 flex size-11 items-center justify-center text-ink"
      >
        <AnimatePresence initial={false} mode="wait">
          <m.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
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
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper"
          >
            <m.ul
              initial="hidden"
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: STAGGER, delayChildren: 0.04 } } }}
              className="flex flex-col px-4 pt-4"
            >
              {navItems.map((item, i) => (
                <m.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -20 }, shown: { opacity: 1, x: 0, transition: SPRING } }}
                  className="border-b border-line"
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => close(false)}
                    className="flex min-h-16 items-center justify-between text-h3 font-semibold text-ink"
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="size-5 text-muted" />
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
