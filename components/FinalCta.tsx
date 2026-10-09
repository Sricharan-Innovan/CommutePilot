"use client";

import { NETWORKS } from "@/lib/data";
import { useOnScreen, useSteps } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import WaitlistForm from "@/components/WaitlistForm";
import { BusGlyph, TrainGlyph, WalkGlyph } from "@/components/ui/Bits";

const NODES = [
  { k: "Metro", side: "left", top: 10, color: "var(--color-metro-blue)", sub: "stop-sequence alerts" },
  { k: "Local trains", side: "left", top: 196, color: "#9b2335", sub: "stop-sequence alerts" },
  { k: "City bus", side: "right", top: 10, color: "var(--color-metro-green)", sub: "distance alerts" },
  { k: "The last walk", side: "right", top: 196, color: "var(--color-ink-2)", sub: "distance alerts" },
] as const;

function NodeCard({
  n,
  lit,
}: {
  n: (typeof NODES)[number];
  lit: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[16px] bg-white px-3.5 py-3 shadow-[0_14px_34px_-24px_rgba(17,17,17,.5)]">
      <span
        className="grid size-[30px] shrink-0 place-items-center rounded-[9px] text-white"
        style={{ background: n.color }}
      >
        {n.k === "City bus" ? (
          <BusGlyph className="size-[16px]" />
        ) : n.k === "The last walk" ? (
          <WalkGlyph className="size-[16px]" />
        ) : (
          <TrainGlyph className="size-[16px]" />
        )}
      </span>
      <span className="min-w-0">
        <b className="block truncate text-[13.5px] font-medium">{n.k}</b>
        <span className="flex items-center gap-1.5 text-[11.5px] text-ink-3">
          <i
            className="size-[5px] shrink-0 rounded-full transition-opacity duration-500"
            style={{ background: n.color, opacity: lit ? 1 : 0.3 }}
          />
          <span className="truncate">{n.sub}</span>
        </span>
      </span>
    </div>
  );
}

export default function FinalCta() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.2);
  const [pulse] = useSteps(4, 1400, onScreen);
  const [cityIdx] = useSteps(NETWORKS.length, 2400, onScreen);

  return (
    <section className="px-6 pt-[168px] pb-[120px]" id="join">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-surface-2 px-6 pt-20 pb-16">
        <Reveal>
          <h2 className="display-lg text-center">
            Is it just me?
            <br />
            <span className="text-[#a5a3a0]">Tell me, and I will build it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-[54ch] text-center text-ink-2">
            You have seen the idea. If you want it the day it works, leave an email and the city you ride
            in — and if you have not voted yet,{" "}
            <a href="#vote" className="border-b border-line-mid pb-px transition-colors hover:text-ink">
              that takes one tap
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-[560px]">
          <WaitlistForm
            tone="panel"
            cta="Enter your email"
            note="No spam, no newsletter, no launch countdown. One email when there is something to try."
          />
        </Reveal>

        {/* mobile: the four modes as a plain grid, no overlap to go wrong */}
        <div ref={ref} className="mt-12 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 md:hidden">
          {NODES.map((n, idx) => (
            <Reveal key={n.k} delay={0.05 * idx}>
              <NodeCard n={n} lit={pulse === idx} />
            </Reveal>
          ))}
          <div className="col-span-full mt-2 flex flex-col items-center gap-3">
            <span className="grid size-[64px] place-items-center rounded-[20px] bg-ink text-white shadow-[0_26px_50px_-24px_rgba(17,17,17,.8)]">
              <TrainGlyph className="size-[32px]" />
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] shadow-[0_10px_26px_-18px_rgba(17,17,17,.6)]">
              <i className="anim-blink size-[6px] rounded-full bg-alert" />
              <b className="font-medium">one stop before</b>
              <span className="text-ink-3">{NETWORKS[cityIdx].city}</span>
            </span>
          </div>
        </div>

        {/* desktop: the constellation */}
        <div className="relative mx-auto mt-16 hidden h-[300px] max-w-[840px] md:block">
          {NODES.map((n, idx) => (
            <Reveal
              key={n.k}
              delay={0.06 * idx}
              style={{ top: n.top }}
              className={`absolute w-[190px] ${n.side === "left" ? "left-0" : "right-0"}`}
            >
              <NodeCard n={n} lit={pulse === idx} />
            </Reveal>
          ))}

          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 840 300"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            {[
              "M196 42 C 300 42, 330 150, 420 150",
              "M196 228 C 300 228, 330 150, 420 150",
              "M644 42 C 540 42, 510 150, 420 150",
              "M644 228 C 540 228, 510 150, 420 150",
            ].map((d, n) => (
              <g key={d}>
                <path d={d} stroke="var(--color-surface-3)" strokeWidth="2" />
                <path
                  d={d}
                  stroke={NODES[n].color}
                  strokeWidth="2"
                  strokeDasharray="10 240"
                  className="transition-opacity duration-700"
                  style={{ opacity: pulse === n ? 1 : 0.15 }}
                >
                  <animate attributeName="stroke-dashoffset" from="250" to="0" dur="1.4s" repeatCount="indefinite" />
                </path>
              </g>
            ))}
          </svg>

          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
            <span className="grid size-[76px] place-items-center rounded-[22px] bg-ink text-white shadow-[0_26px_50px_-24px_rgba(17,17,17,.8)]">
              <TrainGlyph className="size-[38px]" />
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] shadow-[0_10px_26px_-18px_rgba(17,17,17,.6)]">
              <i className="anim-blink size-[6px] rounded-full bg-alert" />
              <b className="font-medium">one stop before</b>
              <span className="text-ink-3">{NETWORKS[cityIdx].city}</span>
            </span>
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-[13.5px] text-ink-3">
            Wherever you ride, the alert lands at the same place: one stop before you need to move.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
