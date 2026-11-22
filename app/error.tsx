"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/section";

/** Shown if a page fails while rendering in the browser; "Try again" re-renders it. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-32">
      <p className="font-mono text-label uppercase text-accent-text">Something went wrong</p>
      <h1 className="mt-3 text-h1 font-semibold">This page could not be shown</h1>
      <p className="mt-4 max-w-lg text-body text-muted">Try loading it again. If it keeps happening, go back to the home page.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to home
        </Link>
      </div>
    </Container>
  );
}
