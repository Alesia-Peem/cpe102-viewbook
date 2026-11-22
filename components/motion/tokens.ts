/**
 * Motion tokens — one motion language for the whole site, modelled on SmoothUI's guidance:
 * short (200–500ms), ease-out or low-bounce springs, transform + opacity (+ a little blur), once.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Default UI spring: quick, barely any bounce. */
export const SPRING = { type: "spring", duration: 0.25, bounce: 0.1 } as const;

/** Hover/press spring for buttons. */
export const PRESS_SPRING = { type: "spring", stiffness: 400, damping: 17 } as const;

/** Content entering the viewport: fade up from 20px with a soft blur, 0.5s. */
export const REVEAL = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: EASE_OUT },
} as const;

/** Delay between items revealed together (cards in a row, list items). */
export const STAGGER = 0.05;
