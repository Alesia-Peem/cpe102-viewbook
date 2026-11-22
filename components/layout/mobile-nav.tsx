"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/lib/navigation";

/** Phone menu: a full-screen panel under the header. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close after navigating to another page.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes; the page behind does not scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 flex size-11 items-center justify-center text-ink"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper">
          <ul className="flex flex-col px-4 pt-4">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center justify-between text-2xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                  <ArrowRight aria-hidden className="size-5 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
