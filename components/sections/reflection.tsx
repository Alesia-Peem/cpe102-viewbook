import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/section";

/** Type-led section: the first reflection paragraph set large on the dark band. */
export function Reflection() {
  const { title, paragraphs } = site.reflection;
  const [lead, ...rest] = paragraphs;

  return (
    <section id="reflection" aria-labelledby="reflection-title" className="bg-deep py-24 text-white sm:py-32">
      <Container>
        <h2 id="reflection-title">
          <Eyebrow onDark>{title}</Eyebrow>
        </h2>

        {lead ? (
          <>
            <p className="mt-8 max-w-5xl text-h2 font-medium text-balance">{lead}</p>
            {rest.length > 0 ? (
              <div className="mt-14 grid gap-6 text-body text-white/75 md:grid-cols-2 md:gap-10 lg:ml-auto lg:w-2/3">
                {rest.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-8 max-w-3xl border-l-2 border-white/30 py-2 pl-4">
            <p className="font-mono text-label uppercase text-white/75">[Project description — to be provided]</p>
            <p className="mt-1 text-small text-white/65">
              Your reflection on the course. The first paragraph is set large here. Edit{" "}
              <code className="font-mono">content/site.ts → reflection.paragraphs</code>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
