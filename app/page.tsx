import "@/components/home/home.css";
import { getJournalWeeks } from "@/lib/journal";
import { getProjects } from "@/lib/projects";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WeekGrid } from "@/components/sections/week-grid";
import { Projects } from "@/components/sections/projects";
import { Reflection } from "@/components/sections/reflection";
import { Team } from "@/components/sections/team";
import { Marquee } from "@/components/fx/marquee";

/**
 * Home: yellow poster → ticker of the weeks → about (paper) → 16 weeks (dark) →
 * projects (paper) → reflection (yellow) → team (paper) → footer (dark).
 */
export default function HomePage() {
  const weeks = getJournalWeeks();

  return (
    <>
      <Hero weeks={weeks} />
      {/* Poster ticker of every week's class topic (decorative; the same links are below). */}
      <Marquee
        label="the scrolling list of weeks"
        items={weeks.map((w) => (
          <span key={w.slug} className="flex items-baseline gap-3 whitespace-nowrap">
            <span className="font-mono text-label text-yellow">W{w.number}</span>
            <span className="font-poster text-h2 font-extrabold uppercase leading-none">{w.heading}</span>
          </span>
        ))}
      />
      <About />
      <WeekGrid weeks={weeks} />
      <Projects projects={getProjects()} />
      <Reflection />
      <Team />
    </>
  );
}
