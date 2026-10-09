import { PROTOTYPE_LABEL, PROTOTYPE_URL } from "@/lib/config";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

const COLUMNS = [
  {
    tag: "Today",
    state: "live",
    h: "A working prototype, used daily",
    body: "Built after two months of doing the six-tap dance twice a day. It is wired to one network and one person's route — mine — and it has not let me miss a stop since. Rough, but real.",
  },
  {
    tag: "Next",
    state: "building",
    h: "The app, properly",
    body: "iOS and Android. Any city, any mode, any number of legs. Three minutes to set up, one tap a day after that, and nothing on screen in between.",
  },
  {
    tag: "What decides it",
    state: "you",
    h: "Whether this is only my problem",
    body: "I am not going to spend six months building something because it annoyed one person. If enough people say they recognise this, it gets built. That is the entire reason this page exists.",
  },
];

export default function SectionStatus() {
  return (
    <section className="px-6 pt-[168px]" id="status">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <Eyebrow>Where this is right now</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-2.5">
            Honest status:
            <br />
            <span className="text-[#a5a3a0]">it works, and it is not an app yet.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[62ch] text-ink-2">
            I am not a company with a launch date. I am someone who commutes, got tired of babysitting the
            ride, and built the ugly version to prove the idea works. It does. The question is whether it
            is worth building the real one.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3.5 md:grid-cols-3">
          {COLUMNS.map((c, n) => (
            <Reveal
              key={c.tag}
              delay={0.05 * n}
              className={`flex flex-col rounded-[24px] border p-6 ${
                c.state === "you" ? "border-ink bg-ink text-white" : "border-line-soft bg-surface"
              }`}
            >
              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11.5px] ${
                  c.state === "live"
                    ? "bg-metro-green/12 text-metro-green"
                    : c.state === "building"
                      ? "bg-white text-ink-2"
                      : "bg-white/15 text-white"
                }`}
              >
                <i
                  className={`size-[6px] rounded-full ${
                    c.state === "live"
                      ? "anim-blink bg-metro-green"
                      : c.state === "building"
                        ? "bg-alert"
                        : "bg-white"
                  }`}
                />
                {c.tag}
              </span>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.025em]">{c.h}</h3>
              <p
                className={`mt-2 text-[14.5px] leading-[1.5] ${
                  c.state === "you" ? "text-white/65" : "text-ink-2"
                }`}
              >
                {c.body}
              </p>

              {c.state === "live" && (
                <div className="mt-auto pt-6">
                  <a
                    href={PROTOTYPE_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-block w-fit border-b border-line-mid pb-0.5 text-[13.5px] text-ink-2 transition-colors hover:text-ink"
                  >
                    Look at the prototype →
                  </a>
                  <p className="mt-2 text-[11.5px] text-ink-3">{PROTOTYPE_LABEL}</p>
                </div>
              )}
              {c.state === "you" && (
                <a
                  href="#vote"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-medium text-ink transition-transform duration-200 hover:-translate-y-px"
                >
                  Say you want it →
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
