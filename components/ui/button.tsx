import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
};

/** The site's one button style. Label it with a verb and an object: "Read week 1". */
export function ButtonLink({ href, children, variant = "primary", arrow = false, className }: Props) {
  return (
    <Link href={href} className={cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", className)}>
      {children}
      {arrow ? <ArrowRight aria-hidden className="nudge size-4" /> : null}
    </Link>
  );
}
