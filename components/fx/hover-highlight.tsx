"use client";

import { createContext, useContext, useId, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { SPRING } from "@/components/motion/tokens";
import { cn } from "@/lib/utils";

const HoverContext = createContext<{ hovered: string | null; setHovered: (id: string | null) => void; group: string } | null>(null);

/** Wrap a grid: a highlight panel slides to whichever card the mouse is over. */
export function HoverHighlightGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const group = useId();
  return (
    <HoverContext.Provider value={{ hovered, setHovered, group }}>
      <div className={className} onMouseLeave={() => setHovered(null)}>
        {children}
      </div>
    </HoverContext.Provider>
  );
}

/** One cell of a HoverHighlightGroup. */
export function HoverHighlightItem({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(HoverContext);
  return (
    <div className={cn("relative", className)} onMouseEnter={() => ctx?.setHovered(id)}>
      <AnimatePresence>
        {ctx?.hovered === id ? (
          <m.span
            aria-hidden
            layoutId={`hover-highlight-${ctx.group}`}
            className="absolute -inset-3 z-0 hidden bg-paper shadow-[0_12px_32px_-12px_rgb(15_27_42/0.25)] ring-1 ring-line sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
            transition={SPRING}
          />
        ) : null}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
