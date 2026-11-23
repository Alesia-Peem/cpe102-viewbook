import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { JournalWeek } from "@/types/journal";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { STAGGER } from "@/components/motion/tokens";
import type { ToneStyle } from "./chapter-style";

/** "data/weeks.ts → week 05" — where every piece of the student's own writing is edited. */
export const editHint = (week: JournalWeek) => `data/weeks.ts → week ${week.number}`;

/**
 * An empty "write here" field: the bracketed label in the client's placeholder style,
 * a dashed outline and (for longer text) a few ruled lines.
 */
export function FieldPlaceholder({
  label,
  t,
  lines = 0,
  hint,
  className,
}: {
  label: string;
  t: ToneStyle;
  /** Ruled lines below the label, suggesting how much text belongs here. */
  lines?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("border border-dashed px-4 py-3.5", t.field, className)}>
      <p className={cn("font-mono text-label font-medium tracking-[0.08em]", t.onDark ? "text-white/85" : "text-ink/80")}>{label}</p>
      {lines > 0 ? <div aria-hidden className="jr-ruled mt-1" style={{ height: `${lines * 2}rem` }} /> : null}
      {hint ? <p className={cn("mt-3 font-mono text-label", t.muted)}>Edit: {hint}</p> : null}
    </div>
  );
}

/** Mono micro-label that separates the student's writing from the course facts. */
export function EntryLabel({ children, t, className }: { children: React.ReactNode; t: ToneStyle; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 font-mono text-label uppercase", t.muted, className)}>
      <span aria-hidden className={cn("inline-block size-1.5", t.mark)} />
      {children}
    </p>
  );
}

/** The week's opening paragraph (introduction), in the lead size. */
export function EntryLead({ week, t, className }: { week: JournalWeek; t: ToneStyle; className?: string }) {
  const text = week.entry.introduction.trim();
  return (
    <div className={className}>
      <EntryLabel t={t}>Journal entry · {week.label}</EntryLabel>
      {text ? (
        <p className="mt-5 max-w-[60ch] text-lead text-pretty">{text}</p>
      ) : (
        <FieldPlaceholder className="mt-5 max-w-[60ch]" t={t} label="[SHORT INTRODUCTION — TO BE PROVIDED]" lines={1} />
      )}
    </div>
  );
}

/** The long-form description: paragraphs separated by a blank line in data/weeks.ts. */
export function EntryBody({ week, t, className }: { week: JournalWeek; t: ToneStyle; className?: string }) {
  const paragraphs = week.entry.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const missingIntro = !week.entry.introduction.trim();
  return (
    <div className={className}>
      {paragraphs.length ? (
        <div className="max-w-[68ch] space-y-5 text-body text-pretty">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : (
        <FieldPlaceholder className="max-w-[68ch]" t={t} label="[DETAILED WEEKLY DESCRIPTION — TO BE PROVIDED]" lines={4} hint={editHint(week)} />
      )}
      {paragraphs.length && missingIntro ? <p className={cn("mt-4 font-mono text-label", t.muted)}>Introduction: {editHint(week)}</p> : null}
    </div>
  );
}

const NOTEBOOK = [
  { key: "activities", title: "Activities & tasks", placeholder: "[ACTIVITIES AND TASKS — TO BE PROVIDED]" },
  { key: "challenges", title: "Challenges", placeholder: "[CHALLENGES — TO BE PROVIDED]" },
  { key: "learnings", title: "What I learned", placeholder: "[WHAT I LEARNED — TO BE PROVIDED]" },
  { key: "results", title: "Results", placeholder: "[RESULTS — TO BE PROVIDED]" },
  { key: "milestones", title: "Milestones", placeholder: "[MILESTONES — TO BE PROVIDED]" },
] as const;

/** Field notes (the student's five lists) beside the "From the course" facts. */
export function WeekNotes({ week, t }: { week: JournalWeek; t: ToneStyle }) {
  const lists = NOTEBOOK.map((n) => ({ ...n, items: week.entry[n.key].map((s) => s.trim()).filter(Boolean) }));
  const anyEmpty = lists.some((l) => l.items.length === 0);

  return (
    <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className={cn("flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 pb-3", t.strong)}>
          <EntryLabel t={t}>Field notes · {week.label}</EntryLabel>
          {anyEmpty ? <p className={cn("font-mono text-label", t.muted)}>Edit: {editHint(week)}</p> : null}
        </div>
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {lists.map((l, i) => (
            <li key={l.key} className={cn("border-b py-6", t.rule, i === lists.length - 1 && "sm:col-span-2")}>
              <Reveal delay={(i % 2) * STAGGER}>
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className={cn("font-mono text-label", t.smallAccent)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 font-semibold">{l.title}</h3>
                </div>
                {l.items.length ? (
                  <ul className="mt-4 space-y-2.5 pl-7">
                    {l.items.map((item, j) => (
                      <li key={j} className="relative text-body leading-relaxed">
                        <span aria-hidden className={cn("absolute top-[0.7em] -left-5 size-1.5", t.mark)} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <FieldPlaceholder className="mt-4 sm:ml-7" t={t} label={l.placeholder} lines={i === lists.length - 1 ? 1 : 2} />
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <CourseFacts week={week} t={t} className="lg:col-span-4" />
    </div>
  );
}

/** What the syllabus and slides say about the week — clearly course facts, not the student's notes. */
function CourseFacts({ week, t, className }: { week: JournalWeek; t: ToneStyle; className?: string }) {
  const id = `${week.slug}-course`;
  const projectHref = week.project ? `/projects/${week.project}` : undefined;
  const projectName = week.project === "first-project" ? "The First Project" : week.project === "final-project" ? "The Final Project" : undefined;

  return (
    <aside aria-labelledby={id} className={cn("self-start border-2 lg:sticky lg:top-36", t.strong, className)}>
      <div className={cn("flex items-baseline justify-between gap-4 border-b px-5 py-4", t.rule)}>
        <h3 id={id} className="text-h3 font-semibold">
          From the course
        </h3>
        <p className={cn("font-mono text-label uppercase", t.muted)}>Course facts</p>
      </div>
      <dl className="divide-y px-5 [&>div]:py-4">
        <div className={t.rule}>
          <dt className={cn("font-mono text-label uppercase", t.muted)}>Covered in class</dt>
          <dd className="mt-2">
            {week.covered.length ? (
              <ul className="space-y-1.5 text-small">
                {week.covered.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span aria-hidden className={cn("mt-[0.6em] h-px w-2.5 shrink-0", t.onDark ? "bg-white/50" : "bg-ink/50")} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={cn("text-small", t.muted)}>Not listed in the syllabus for this week.</p>
            )}
          </dd>
        </div>
        {week.tools.length ? (
          <div className={t.rule}>
            <dt className={cn("font-mono text-label uppercase", t.muted)}>Tools</dt>
            <dd className="mt-1">
              <ul className="flex flex-wrap gap-x-4">
                {week.tools.map((tool) => (
                  <li key={tool.label}>
                    {tool.href ? (
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("inline-flex min-h-11 items-center gap-1 text-small font-medium underline decoration-1 underline-offset-4", t.onDark ? "decoration-white/40 hover:decoration-white" : "decoration-ink/30 hover:decoration-ink")}
                      >
                        {tool.label}
                        <ArrowUpRight aria-hidden className="size-3.5" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="inline-flex min-h-11 items-center text-small">{tool.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
        {week.deliverable ? (
          <div className={t.rule}>
            <dt className={cn("font-mono text-label uppercase", t.muted)}>Deliverable</dt>
            <dd className="mt-1.5 text-small font-medium">{week.deliverable}</dd>
          </div>
        ) : null}
        {week.syllabusMilestone ? (
          <div className={t.rule}>
            <dt className={cn("font-mono text-label uppercase", t.muted)}>Syllabus milestone</dt>
            <dd className="mt-1.5 text-small font-medium">{week.syllabusMilestone}</dd>
          </div>
        ) : null}
        {projectHref && projectName ? (
          <div className={t.rule}>
            <dt className={cn("font-mono text-label uppercase", t.muted)}>Project</dt>
            <dd>
              <Link href={projectHref} className={cn("inline-flex min-h-11 items-center gap-1 text-small font-medium underline decoration-1 underline-offset-4", t.onDark ? "decoration-white/40 hover:decoration-white" : "decoration-ink/30 hover:decoration-ink")}>
                {projectName}
                <ArrowUpRight aria-hidden className="size-3.5" />
              </Link>
            </dd>
          </div>
        ) : null}
      </dl>
    </aside>
  );
}
