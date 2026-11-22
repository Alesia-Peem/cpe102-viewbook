import { getWeeks } from "@/lib/weeks";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WeekGrid } from "@/components/sections/week-grid";
import { Reflection } from "@/components/sections/reflection";
import { Team } from "@/components/sections/team";
import { Projects } from "@/components/sections/projects";
import { getProjects } from "@/lib/projects";
import { Marquee } from "@/components/fx/marquee";
import { padWeek } from "@/lib/utils";

export default function HomePage() {
  const weeks = getWeeks();

  return (
    <>
      <Hero weeks={weeks} />
      {/* Decorative strip of every week; shows titles as they are written. */}
      <Marquee
        label="the scrolling list of weeks"
        items={weeks.map((w) => (
          <span key={w.slug} className="flex items-baseline gap-3 whitespace-nowrap">
            <span className="font-mono text-label text-accent">W{padWeek(w.week)}</span>
            <span className={w.title ? "text-h3 font-semibold" : "text-h3 font-semibold text-white/70"}>{w.title || `Week ${w.week}`}</span>
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
