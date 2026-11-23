"use client";

/**
 * CONTRACT (owned by the navigation agent — replace the internals, keep the export and props):
 *   <JournalNav weeks={[{ slug, number, topic, hasPhotos }]} />
 *   Sticky week selector for /journal. Each week chapter on the page has id={slug} (e.g. "week-05").
 */
export type JournalNavWeek = { slug: string; number: string; topic: string; hasPhotos: boolean };

export function JournalNav({ weeks }: { weeks: JournalNavWeek[] }) {
  return (
    <nav aria-label="Weeks" className="sticky top-16 z-30 border-b border-border bg-background">
      <ol className="flex gap-1 overflow-x-auto px-4 py-2">
        {weeks.map((w) => (
          <li key={w.slug}>
            <a href={`#${w.slug}`} className="flex h-11 min-w-11 items-center justify-center font-mono text-label">
              {w.number}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
