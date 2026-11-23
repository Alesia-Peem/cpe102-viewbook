"use client";

/**
 * CONTRACT (owned by the lightbox agent — replace the internals, keep these exports and props):
 *
 *   <LightboxProvider>…</LightboxProvider>   wraps a page; renders the fullscreen gallery dialog
 *   <PhotoTrigger photos={photos} index={i} label="Open photo 2 of 5, Week 03">…image…</PhotoTrigger>
 *       a <button> around any image; clicking opens the gallery at `index` over `photos`
 *   useLightbox() → { open(photos, index): void; close(): void; isOpen: boolean }
 */
import { createContext, useCallback, useContext, useState } from "react";
import type { JournalPhoto } from "@/types/journal";

type LightboxApi = { open: (photos: JournalPhoto[], index: number) => void; close: () => void; isOpen: boolean };
const LightboxContext = createContext<LightboxApi | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ photos: JournalPhoto[]; index: number } | null>(null);
  const open = useCallback((photos: JournalPhoto[], index: number) => setState({ photos, index }), []);
  const close = useCallback(() => setState(null), []);
  return <LightboxContext.Provider value={{ open, close, isOpen: state !== null }}>{children}</LightboxContext.Provider>;
}

export function useLightbox(): LightboxApi {
  const ctx = useContext(LightboxContext);
  return ctx ?? { open: () => {}, close: () => {}, isOpen: false };
}

export function PhotoTrigger({
  photos,
  index,
  label,
  className,
  children,
}: {
  photos: JournalPhoto[];
  index: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useLightbox();
  return (
    <button type="button" aria-label={label} onClick={() => open(photos, index)} className={className}>
      {children}
    </button>
  );
}
