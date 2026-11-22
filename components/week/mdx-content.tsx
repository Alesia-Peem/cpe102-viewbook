import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";
import { ContentImage } from "@/components/ui/content-image";

/** Internal links use Next.js routing; external links open in a new tab. */
function SmartLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/**
 * Optional component for placing a photo inside the written text:
 *   <Figure src="/images/weeks/week-01/whiteboard.jpg" caption="Our first sketch" />
 */
function Figure({ src, alt, caption }: { src?: string; alt?: string; caption?: string }) {
  return (
    <figure className="my-8">
      <ContentImage
        image={{ src, alt, caption }}
        placeholderLabel={caption || "Inline photo"}
        sizes="(min-width: 768px) 720px, 100vw"
      />
      {caption ? <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

const components = { a: SmartLink, Figure };

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-week">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
