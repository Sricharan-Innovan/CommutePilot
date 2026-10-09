import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

const ROWS: { h: string; maps: string; ours: string; strong?: string }[] = [
  {
    h: "What it is for",
    maps: "Finding a route you do not know yet",
    ours: "Riding the route you already know, without watching it",
  },
  {
    h: "Starting the trip",
    maps: "Unlock, open, set from, set to, pick transit, press start",
    strong: "One tap",
    ours: " on a notification that arrives by itself at your usual time",
  },
  {
    h: "During the ride",
    maps: "A live map you keep checking, screen on",
    ours: "Silence. Screen off, phone away",
  },
  {
    h: "When it speaks",
    maps: "As you arrive at the stop",
    strong: "One stop before",
    ours: ", while you can still get to the door",
  },
  {
    h: "Interchanges",
    maps: "On the screen, if you are looking at the screen",
    ours: "Announced before the change, then it moves to the next leg on its own",
  },
  {
    h: "Days you do not travel",
    maps: "No idea — it waits for you to open it",
    ours: "Working from home, leave and running-late are part of the prompt",
  },
  {
    h: "The trip home",
    maps: "Set it up again",
    ours: "Already reversed, with the alert moved to the right stop for that direction",
  },
  {
    h: "What it measures success by",
    maps: "You arrived",
    strong: "You arrived",
    ours: " — and you got forty minutes of your own back",
  },
];

export default function SectionCompare() {
  return (
    <section className="px-6 pt-[168px]" id="compare">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <Eyebrow>Why not just use Maps</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-2.5">
            Maps is a map.
            <br />
            <span className="text-[#a5a3a0]">This is a routine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[62ch] text-ink-2">
            Maps is better than this will ever be at working out how to get somewhere new. That is a
            different job. This is for the four hundred times you take the route you could walk in your
            sleep — where the question is not “which way” but “can I stop paying attention yet”.
          </p>
        </Reveal>

        <Reveal delay={0.14} className="mt-12">
          <table className="w-full border-separate border-spacing-0 max-md:block">
            <thead className="max-md:hidden">
              <tr>
                <th className="w-[26%] px-5 pb-3 text-left text-[12.5px] font-medium text-ink-3">
                  On a normal weekday
                </th>
                <th className="w-[37%] px-5 pb-3 text-left text-[12.5px] font-medium text-ink-3">
                  A maps app
                </th>
                <th className="w-[37%] px-5 pb-3 text-left text-[12.5px] font-medium">CommutePilot</th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {ROWS.map((r, n) => (
                <tr
                  key={r.h}
                  className="group max-md:mb-2.5 max-md:block max-md:rounded-[20px] max-md:border max-md:border-line-soft max-md:bg-surface max-md:p-5"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 text-left align-top text-[15px] font-medium transition-colors group-hover:bg-ink/[0.015] max-md:block max-md:p-0 max-md:pb-3 max-md:text-[17px] max-md:font-semibold max-md:tracking-[-0.02em] md:border-t md:border-line-soft"
                  >
                    {r.h}
                  </th>
                  <td
                    data-label="A maps app"
                    className="px-5 py-4 align-top text-[15px] text-ink-3 transition-colors group-hover:bg-ink/[0.015] max-md:block max-md:border-t max-md:border-line-soft max-md:px-0 max-md:pb-0 max-md:text-[14.5px] max-md:before:mb-1 max-md:before:block max-md:before:text-[10.5px] max-md:before:tracking-[0.08em] max-md:before:text-ink-3 max-md:before:uppercase max-md:before:content-[attr(data-label)] md:border-t md:border-line-soft"
                  >
                    {r.maps}
                  </td>
                  <td
                    data-label="CommutePilot"
                    className={`bg-white px-5 py-4 align-top text-[15px] text-ink-2 max-md:block max-md:border-t max-md:border-line-soft max-md:bg-transparent max-md:px-0 max-md:pb-0 max-md:text-[14.5px] max-md:before:mb-1 max-md:before:block max-md:before:text-[10.5px] max-md:before:tracking-[0.08em] max-md:before:text-ink max-md:before:uppercase max-md:before:content-[attr(data-label)] md:border-x md:border-line-soft ${
                      n === 0 ? "md:rounded-t-[20px] md:border-t" : ""
                    } ${n === ROWS.length - 1 ? "md:rounded-b-[20px] md:border-b" : ""}`}
                  >
                    {r.strong && <b className="font-semibold text-ink">{r.strong}</b>}
                    {r.ours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-6 text-[13.5px] text-ink-3">
            Keep both. Maps for anywhere new. This for the commute.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
