import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Anuphan, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/motion/motion-provider";

// Fonts are downloaded at build time and served from this site (no request to Google at runtime).
const display = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });
// Thai text (from thaiwebfonts' free list). Thai-only subset, not preloaded: the browser fetches it
// only when a page actually contains Thai characters.
const thai = Anuphan({ subsets: ["thai"], variable: "--font-thai", display: "swap", preload: false });

const siteTitle = [site.courseCode, site.courseName].filter(Boolean).join(" — ");
const description =
  site.tagline || `${site.courseCode} ${site.courseName ?? ""} — a week-by-week journal${site.groupName ? ` by ${site.groupName}` : ""}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: siteTitle, template: `%s | ${site.courseCode}` },
  description,
  openGraph: { title: siteTitle, description, url: "/", siteName: siteTitle, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${code.variable} ${thai.variable}`}>
      <head>
        {/* Without JavaScript, scroll reveals never run — show their content straight away. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
