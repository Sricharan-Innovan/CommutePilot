"use client";

import { useOnScreen, useSteps } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, TrainGlyph } from "@/components/ui/Bits";

/* Mirrors the reference's "two outputs from one take" section: one setup,
   two directions, shown side by side with the active one lit. */

const MORNING = {
  tag: "Morning",
  time: "8:15 am",
  from: "Home",
  to: "Work",
  warn: "the stop before your interchange",
  color: "var(--color-metro-blue)",
};

const EVENING = {
  tag: "Evening",
  time: "6:45 pm",
  from: "Work",
  to: "Home",
  warn: "a different stop, going the other way",
  color: "var(--color-metro-green)",
};

function RoutePanel({
  data,
  active,
}: {
  data: typeof MORNING;
  active: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded-[18px] border p-4 transition-all duration-700 ${
        active ? "border-line-soft bg-white shadow-[0_18px_40px_-28px_rgba(17,17,17,.4)]" : "border-transparent bg-surface-2/60"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] transition-colors duration-700 ${
            active ? "bg-ink text-white" : "bg-white/70 text-ink-3"
          }`}
        >
          <i
            className={`size-[5px] rounded-full ${active ? "anim-blink bg-alert" : "bg-ink-4"}`}
          />
          {data.tag}
        </span>
        <span className={`tnum text-[12px] transition-colors duration-700 ${active ? "text-ink-2" : "text-ink-4"}`}>
          {data.time}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <span style={{ color: active ? data.color : "var(--color-ink-4)" }} className="transition-colors duration-700">
          <TrainGlyph className="size-[18px]" />
        </span>
        <p
          className={`text-[14.5px] font-medium tracking-[-0.02em] transition-colors duration-700 ${
            active ? "text-ink" : "text-ink-3"
          }`}
        >
          {data.from} <span className="text-ink-3">→</span> {data.to}
        </p>
      </div>

      {/* mini line */}
      <div className="relative mt-4 h-[3px] rounded bg-surface-3">
        <span
          className="absolute inset-y-0 left-0 rounded transition-all duration-[1200ms]"
          style={{ width: active ? "72%" : "0%", background: data.color }}
        />
        {[18, 44, 72, 100].map((p, n) => (
          <i
            key={p}
            className="absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white transition-all duration-700"
            style={{
              left: `${p}%`,
              borderColor: active && n === 2 ? "var(--color-alert)" : active ? data.color : "var(--color-surface-3)",
              boxShadow: active && n === 2 ? "0 0 0 4px rgba(233,162,37,.2)" : "none",
            }}
          />
        ))}
      </div>

      <p
        className={`mt-5 text-[12.5px] transition-colors duration-700 ${active ? "text-alert-ink" : "text-ink-4"}`}
      >
        Warns at <b className="font-semibold">{data.warn}</b>
      </p>
    </div>
  );
}

export default function SectionBothWays() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const [step] = useSteps(2, 3200, onScreen);

  return (
    <section className="px-6 pt-[168px]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14">
        <div className="min-w-[300px] flex-[1_1_340px]">
          <Reveal>
            <Eyebrow>One setup, both directions</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              Set it once.
              <br />
              <span className="text-[#a5a3a0]">It runs both ways.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[46ch] text-ink-2">
              The trip home is the morning in reverse, and the stop that warns you is a different one in
              that direction. It works that out for you, so the evening needs no setup, no second saved
              trip, and no remembering at 6:45 pm when you are tired.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="min-w-[320px] flex-[1.25_1_480px]">
          <div
            ref={ref}
            className="flex flex-col gap-3 rounded-[28px] bg-surface-2 p-4 sm:flex-row sm:items-stretch sm:gap-3.5 sm:p-5"
          >
            <RoutePanel data={MORNING} active={step === 0} />
            <RoutePanel data={EVENING} active={step === 1} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
