import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/section";
import { ContentImage } from "@/components/ui/content-image";
import { TextPlaceholder } from "@/components/ui/placeholder";

export function Hero({ weekCount }: { weekCount: number }) {
  return (
    <section className="border-b border-line">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="font-mono text-sm text-navy">
            {site.courseCode}
            {site.groupName ? <span className="text-muted"> · {site.groupName}</span> : null}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {site.courseName || <TextPlaceholder inline label="Course name placeholder" className="text-2xl" />}
          </h1>

          <div className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {site.tagline || <TextPlaceholder label="Short introduction to the website" />}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/#weeks"
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy"
            >
              Explore the {weekCount} weeks
              <ArrowDown className="size-4" aria-hidden />
            </Link>
            <Link href="/#team" className="text-sm font-medium text-ink underline-offset-4 hover:underline">
              Meet the team
            </Link>
          </div>
        </div>

        <ContentImage
          image={site.heroImage}
          placeholderLabel="Main project photograph"
          aspect="aspect-[4/3]"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />
      </Container>
    </section>
  );
}
