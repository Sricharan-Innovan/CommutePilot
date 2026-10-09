"use client";

import { useOnScreen, useSteps } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { BusGlyph, Eyebrow, TrainGlyph, WalkGlyph } from "@/components/ui/Bits";

const LEGS = [
  { k: "walk", label: "Walk to the station", sub: "6 min", color: "var(--color-ink-2)" },
  { k: "ride", label: "First line", sub: "9 stops to the interchange", color: "var(--color-metro-blue)" },
  { k: "swap", label: "Interchange", sub: "down to the other platform", color: "var(--color-ink)" },
  { k: "ride2", label: "Second line", sub: "8 stops to your stop", color: "var(--color-metro-green)" },
  { k: "bus", label: "Last mile", sub: "a bus, or seven minutes on foot", color: "var(--color-ink-2)" },
] as const;

const LOG = [
  { kind: "info", body: "Trip started. Nothing to watch.", at: "8:15" },
  { kind: "info", body: "On the first line. Alert set for the stop before the change.", at: "8:24" },
  { kind: "alert", body: "One stop before · your interchange is next.", at: "8:41" },
  { kind: "info", body: "Second line. Tracking to your stop.", at: "8:44" },
  { kind: "alert", body: "One stop before · your stop is next.", at: "9:01" },
  { kind: "done", body: "Arrived. Evening trip is already set.", at: "9:04" },
] as const;

function Glyph({ k }: { k: (typeof LEGS)[number]["k"] }) {
  if (k === "walk") return <WalkGlyph className="size-[17px]" />;
  if (k === "bus") return <BusGlyph className="size-[17px]" />;
  if (k === "swap") return <span className="text-[15px] leading-none">⇄</span>;
  return <TrainGlyph className="size-[17px]" />;
}

export default function SectionLegs() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.25);
  const [active] = useSteps(LEGS.length, 2000, onScreen);

  return (
    <section className="px-6 pt-[168px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <Reveal>
            <Eyebrow>However you get there</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              Any mix of legs.
              <br />
              <span className="text-[#a5a3a0]">One trip, handed over for you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[58ch] text-ink-2">
              Almost nobody has a one-seat commute. A walk, a train, a change, another train, a bus at the
              end — the handover between those is where attention goes, and it is the part that is
              automated here. You are told at each boundary, and nowhere in between.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-14">
          <div ref={ref} className="grid gap-3.5 rounded-[28px] bg-surface-2 p-5 lg:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col gap-2">
              {LEGS.map((l, n) => {
                const done = n < active;
                const on = n === active;
                return (
                  <div
                    key={l.k}
                    className={`flex items-center gap-3.5 rounded-[18px] border px-4 py-3.5 transition-all duration-500 ${
                      on
                        ? "border-line-soft bg-white shadow-[0_16px_34px_-26px_rgba(17,17,17,.5)]"
                        : "border-transparent bg-white/55"
                    }`}
                  >
                    <span
                      className="grid size-[34px] shrink-0 place-items-center rounded-[11px] transition-colors duration-500"
                      style={{
                        background: on ? l.color : "var(--color-surface-2)",
                        color: on ? "#fff" : "var(--color-ink-3)",
                      }}
                    >
                      <Glyph k={l.k} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <b
                        className={`block truncate text-[14.5px] font-medium transition-colors duration-500 ${
                          on ? "text-ink" : "text-ink-2"
                        }`}
                      >
                        {l.label}
                      </b>
                      <span className="block truncate text-[12.5px] text-ink-3">{l.sub}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] transition-all duration-500 ${
                        on
                          ? "bg-alert/15 text-alert-ink"
                          : done
                            ? "bg-metro-green/12 text-metro-green"
                            : "bg-surface-2 text-ink-4"
                      }`}
                    >
                      {on ? "tracking" : done ? "done" : "queued"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col rounded-[20px] bg-white p-4">
              <div className="flex items-center gap-2 border-b border-line-soft pb-3 text-[12.5px]">
                <b className="font-medium">Everything it said all morning</b>
                <span className="ml-auto text-ink-3">6 lines</span>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {LOG.map((m, n) => (
                  <p
                    key={n}
                    className={`rounded-[15px] px-3.5 py-2.5 text-[13.5px] leading-snug transition-opacity duration-500 ${
                      m.kind === "alert"
                        ? "border border-alert/40 bg-[#fff8e9]"
                        : m.kind === "done"
                          ? "border border-metro-green/30 bg-[#eefaf3]"
                          : "border border-line-soft bg-surface"
                    } ${n <= active + 1 ? "opacity-100" : "opacity-35"}`}
                  >
                    {m.body}
                    <span className="mt-1 block text-[10.5px] text-ink-3">{m.at}</span>
                  </p>
                ))}
              </div>

              <p className="mt-auto pt-4 text-[12.5px] text-ink-3">
                Six lines in fifty minutes. Two of them mattered, and both arrived before you needed them.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
