/**
 * Facts set like the title block of an engineering drawing:
 * a ruled grid of label/value cells. Two columns, any number of rows.
 */
export function TitleBlock({ rows, onDark = false }: { rows: Array<{ label: string; value: React.ReactNode }>; onDark?: boolean }) {
  const line = onDark ? "border-white/20" : "border-line-strong";
  return (
    <dl className={`grid grid-cols-2 border-l border-t ${line}`}>
      {rows.map((r) => (
        <div key={r.label} className={`border-b border-r px-3 py-2.5 ${line}`}>
          <dt className={`font-mono text-label uppercase ${onDark ? "text-white/70" : "text-muted"}`}>{r.label}</dt>
          <dd className={`mt-1 text-small font-medium ${onDark ? "text-white" : "text-ink"}`}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
