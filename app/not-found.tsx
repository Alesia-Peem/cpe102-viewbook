import Link from "next/link";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="font-mono text-sm text-navy">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">This page doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 inline-block text-sm font-medium text-navy hover:underline">
        ← Back to home
      </Link>
    </Container>
  );
}
