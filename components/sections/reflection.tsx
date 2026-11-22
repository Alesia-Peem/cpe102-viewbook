import { site } from "@/content/site";
import { Container } from "@/components/ui/section";

/** A type-led section: the first reflection paragraph set large on the dark band. */
export function Reflection() {
  const { title, paragraphs } = site.reflection;
  const [lead, ...rest] = paragraphs;

  return (
    <section id="reflection" aria-labelledby="reflection-title" className="bg-deep py-24 text-white sm:py-32">
      <Container>
        <h2
          id="reflection-title"
          className="flex items-center gap-2 font-mono text-xs font-normal uppercase tracking-[0.12em] text-white/60"
        >
          <span aria-hidden className="inline-block size-1.5 bg-accent" />
          {title}
        </h2>

        {lead ? (
          <>
            <p className="mt-8 max-w-5xl text-3xl font-medium leading-[1.2] tracking-[-0.025em] text-balance sm:text-5xl sm:leading-[1.1]">
              {lead}
            </p>
            {rest.length > 0 ? (
              <div className="mt-14 grid gap-6 text-lg leading-relaxed text-white/75 md:grid-cols-2 md:gap-10 lg:ml-auto lg:w-2/3">
                {rest.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-8 max-w-3xl border-l-2 border-white/25 py-2 pl-4 font-mono text-sm uppercase leading-relaxed tracking-wide text-white/60">
            [Description placeholder: Waiting for user-provided reflection. The first paragraph is shown large here.]
          </p>
        )}
      </Container>
    </section>
  );
}
