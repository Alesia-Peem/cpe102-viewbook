import { getWeeks } from "@/lib/weeks";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WeekTimeline } from "@/components/sections/week-timeline";
import { Reflection } from "@/components/sections/reflection";
import { Team } from "@/components/sections/team";

export default function HomePage() {
  const weeks = getWeeks();

  return (
    <>
      <Hero weekCount={weeks.length} />
      <About />
      <WeekTimeline weeks={weeks} />
      <Reflection />
      <Team />
    </>
  );
}
