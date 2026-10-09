import Reveal from "@/components/ui/Reveal";
import Story from "@/components/story/Story";
import HeroProof from "@/components/HeroProof";

/* inline tiles inside the headline, the way the reference drops platform
   icons into its first line */
function InlineTile({
  bg,
  children,
  label,
}: {
  bg: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex size-[0.84em] translate-y-[0.02em] items-center justify-center rounded-[0.24em] align-[-0.08em] text-white"
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="px-6 pt-[92px] text-center" id="top">
      <Reveal>
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface px-4 py-1.5 text-[13.5px] text-ink-2">
          <i className="size-[6px] rounded-full bg-alert shadow-[0_0_0_4px_rgba(233,162,37,.16)]" />
          For anyone who rides the same route every day
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="display-xl mx-auto mt-5 max-w-[17ch]">
          Stop watching{" "}
          <InlineTile bg="var(--color-metro-blue)" label="metro">
            <svg viewBox="0 0 24 24" className="size-[0.62em]" fill="currentColor">
              <rect x="5.5" y="3" width="13" height="14" rx="4.4" />
              <path d="M8.6 17.5 6.8 21M15.4 17.5 17.2 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </InlineTile>{" "}
          the stops{" "}
          <InlineTile bg="var(--color-metro-green)" label="bus">
            <svg viewBox="0 0 24 24" className="size-[0.62em]" fill="currentColor">
              <rect x="4" y="3.5" width="16" height="13.5" rx="3.4" />
              <path d="M7.5 17v2.4M16.5 17v2.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </InlineTile>
          .
          <br />
          <span className="text-[#a5a3a0]">Use the ride instead.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mx-auto mt-6 max-w-[620px] text-[clamp(16.5px,1.5vw,19px)] leading-[1.5] text-ink-2">
          On a route you have done four hundred times you still keep one eye on the window, the map open in
          a tab, a part of your head counting stations. CommutePilot counts them for you and taps you on the
          shoulder one stop before you need to move — so the ride is finally yours.
        </p>
      </Reveal>

      <Reveal delay={0.16} className="mt-7">
        <HeroProof />
      </Reveal>

      <Reveal delay={0.2}>
        <a
          href="#vote"
          className="nudge sheen group relative mt-6 inline-flex h-[54px] items-center gap-3 overflow-hidden rounded-full border border-alert/50 bg-[#fffaf0] px-7 text-[16px] font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-alert/80 hover:shadow-[0_18px_36px_-18px_rgba(233,162,37,.9)]"
        >
          <span className="anim-ring size-[8px] shrink-0 rounded-full bg-alert" />
          Just vote on whether this is a real problem
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="mt-6 text-[13.5px] text-ink-3">
          Metro · local trains · city bus · the walk at either end · any city where you can name your
          stops
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mx-auto max-w-[1100px] px-0 pt-[64px]">
        <Story />
      </Reveal>
    </section>
  );
}
