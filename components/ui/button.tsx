"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRESS_SPRING } from "@/components/motion/tokens";

const MotionLink = m.create(Link);

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "outline-light";
  arrow?: boolean;
  /** A light travels around the border (use once per screen, on the main action). */
  glow?: boolean;
  className?: string;
};

const VARIANTS = { primary: "btn-primary", secondary: "btn-secondary", light: "btn-light", "outline-light": "btn-outline-light" } as const;

/**
 * The site's one button style. Label it with a verb and an object: "Read week 1".
 * Springs to 1.02 on hover and 0.98 on press (off under reduced motion).
 * `light` / `outline-light` are the same button for dark grounds.
 */

export function ButtonLink({ href, children, variant = "primary", arrow = false, glow = false, className }: Props) {
  return (
    <MotionLink
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={PRESS_SPRING}
      className={cn("btn", VARIANTS[variant], glow && "btn-glow", className)}
    >
      {children}
      {arrow ? <ArrowRight aria-hidden className="nudge size-4" /> : null}
    </MotionLink>
  );
}
