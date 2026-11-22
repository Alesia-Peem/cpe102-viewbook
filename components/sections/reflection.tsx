import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/section";
import { ScrollWords } from "@/components/motion/scroll-words";
import { Lamp } from "@/components/fx/lamp";

/** Type-led section: the first reflection paragraph set large on the dark band. */
export function Reflection() {
  const { title, paragraphs } = site.reflection;
  const [lead, ...rest] = paragraphs;

  return (
    <section id="reflection" aria-labelledby="reflection-title" className="relative isolate overflow-hidden bg-deep pb-24 text-white sm:pb-32">
      <Lamp />
      <Container className="-mt-16 text-center">
        <h2 id="reflection-title" className="flex justify-center">
          <Eyebrow onDark>{title}</Eyebrow>
        </h2>

        {lead ? (
          <>
            <ScrollWords text={lead} className="mx-auto mt-8 max-w-4xl text-h2 font-medium text-balance" />
            {rest.length > 0 ? (
              <div className="mx-auto mt-14 grid max-w-3xl gap-6 text-left text-body text-white/70 md:grid-cols-2 md:gap-10">
                {rest.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl border-l-2 border-white/50 py-2 pl-4 text-left">
            <p className="font-mono text-label uppercase text-white/70">[Project description — to be provided]</p>
            <p className="mt-1 text-small text-white/70">
              Your reflection on the course. The first paragraph is set large here. Edit{" "}
              <code className="font-mono">content/site.ts → reflection.paragraphs</code>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
