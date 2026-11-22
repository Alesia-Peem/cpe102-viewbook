"use client";

import { useRef } from "react";
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/**
 * 3D tilt toward the mouse with a moving glare, springing back on leave.
 * Mouse only; touch and reduced motion get a still card.
 */
export function TiltCard({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgb(255 255 255 / 0.22), transparent 50%)`;
  const glareOpacity = useSpring(0, spring);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <m.div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glareOpacity.set(1);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        glareOpacity.set(0);
      }}
    >
      {children}
      <m.div aria-hidden className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light" style={{ background: glare, opacity: glareOpacity }} />
    </m.div>
  );
}
