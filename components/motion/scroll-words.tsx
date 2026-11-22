"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";

/**
 * A paragraph whose words brighten one after another as it scrolls through the screen.
 * Used once, for the reflection statement. Reduced motion: the text is simply shown.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(/\s+/);

  return (
    <p ref={ref} className={className}>
      {reduce
        ? text
        : words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
    </p>
  );
}

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{children}</m.span>{" "}
    </>
  );
}
