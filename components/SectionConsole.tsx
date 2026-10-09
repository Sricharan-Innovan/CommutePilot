import Reveal from "@/components/ui/Reveal";
import Console from "@/components/mock/Console";
import { Eyebrow } from "@/components/ui/Bits";

export default function SectionConsole() {
  return (
    <section className="px-6 pt-[168px]" id="anywhere">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Any city, any line</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              Pick a city.
              <br />
              <span className="text-[#a5a3a0]">The alert lands in the same place.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[56ch] text-ink-2">
              Here is a trip running, start to finish, on four real networks. Switch the city and watch the
              same thing happen: silence the whole way, then one alert at the stop before yours.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-14">
          <Console />
        </Reveal>
      </div>
    </section>
  );
}
