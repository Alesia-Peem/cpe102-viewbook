"use client";

/**
 * "Back to top" that stays quick on a long page: it jumps to one screen below the top, then
 * glides the rest of the way (instantly under reduced motion). Focus moves to the main content,
 * as the plain #main link did. Without JavaScript it is still an ordinary link to #main.
 */
export function BackToTop({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#main"
      className={className}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduce && window.scrollY > window.innerHeight * 1.5) window.scrollTo({ top: window.innerHeight, behavior: "instant" });
        window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
        const main = document.getElementById("main");
        if (main) {
          if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
        }
      }}
    >
      {children}
    </a>
  );
}
