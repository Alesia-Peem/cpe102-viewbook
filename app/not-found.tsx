import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="font-mono text-label uppercase text-accent-text">404</p>
      <h1 className="mt-3 text-h1 font-semibold">Page not found</h1>
      <p className="mt-4 max-w-lg text-body text-muted">This page doesn&apos;t exist. The journal has one page for each week of the semester.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" arrow>
          Go to the home page
        </ButtonLink>
        <ButtonLink href="/#weeks" variant="secondary">
          Browse all weeks
        </ButtonLink>
      </div>
    </Container>
  );
}
