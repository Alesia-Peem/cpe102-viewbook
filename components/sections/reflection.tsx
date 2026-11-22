import { site } from "@/content/site";
import { Container } from "@/components/ui/section";

export function Reflection() {
  const { title, paragraphs } = site.reflection;

  return (
    <section id="reflection" className="bg-navy-deep py-16 text-white sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">03 — Reflection</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-white/85 sm:text-xl">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p className="border-l-2 border-white/20 py-1 pl-3 font-mono text-xs uppercase tracking-wide text-white/60">
              [Description placeholder: Waiting for user-provided reflection]
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
