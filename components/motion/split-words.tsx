/**
 * Splits a heading into words that blur-in one after another on page load (CSS only,
 * so it starts before JavaScript loads and needs no hydration). See `.word-in` in globals.css.
 */
export function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(/\s+/);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="word-in" style={{ "--i": start + i } as React.CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
