import "@/components/home/home.css";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="focus-ink bg-yellow text-ink">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16">
        <p className="flex items-center gap-3 border-b-2 border-ink pb-3 font-mono text-label uppercase">
          <span className="bg-ink px-1.5 py-0.5 tracking-normal text-white">Error 404</span>
          No such page in this viewbook
        </p>
        <p aria-hidden className="mt-6 font-poster text-mega font-extrabold uppercase">
          404
        </p>
        <h1 id="not-found-title" className="mt-2 font-poster text-poster font-extrabold uppercase">
          Page not found
        </h1>
        <p className="mt-5 max-w-lg text-lead">This page doesn&apos;t exist. The journal has one page for each week of the semester.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/#weeks" variant="secondary" className="border-2 border-ink hover:bg-ink hover:text-yellow">
            Browse all weeks
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
