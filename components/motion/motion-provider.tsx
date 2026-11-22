"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Loads Motion's features once for the whole site (smaller than importing `motion` everywhere)
 * and turns transform animations off for visitors who ask their system for reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
