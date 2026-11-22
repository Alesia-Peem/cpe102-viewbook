import { getWeeks } from "@/lib/weeks";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WeekGrid } from "@/components/sections/week-grid";
import { Reflection } from "@/components/sections/reflection";
import { Team } from "@/components/sections/team";

export default function HomePage() {
  const weeks = getWeeks();

  return (
    <>
      <Hero weeks={weeks} />
      <About />
      <WeekGrid weeks={weeks} />
      <Reflection />
      <Team />
    </>
  );
}
