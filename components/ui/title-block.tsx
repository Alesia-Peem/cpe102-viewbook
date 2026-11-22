/**
 * Facts set like the title block of an engineering drawing:
 * a ruled grid of label/value cells. Two columns, any number of rows.
 */
export function TitleBlock({ rows }: { rows: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <dl className="grid grid-cols-2 border-l border-t border-line-strong">
      {rows.map((r) => (
        <div key={r.label} className="border-b border-r border-line-strong px-3 py-2.5">
          <dt className="font-mono text-label uppercase text-muted">{r.label}</dt>
          <dd className="mt-1 text-small font-medium text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
