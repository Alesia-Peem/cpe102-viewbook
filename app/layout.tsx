import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// Fonts are downloaded at build time and served from this site (no request to Google at runtime).
const display = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

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
    <html lang="en" className={`${display.variable} ${code.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
