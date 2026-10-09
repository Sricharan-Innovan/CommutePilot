"use client";

import { useCallback, useEffect, useState } from "react";
import { NETWORKS } from "@/lib/data";
import { useInterval, useOnScreen } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { BusGlyph, Eyebrow, TrainGlyph } from "@/components/ui/Bits";

function Equaliser({ on }: { on: boolean }) {
  return (
    <span className="flex h-[18px] items-end gap-[3px]" aria-hidden="true">
      {[0.4, 0.75, 0.3, 0.9, 0.55, 0.85, 0.35].map((h, i) => (
        <i
          key={i}
          className={`w-[3px] origin-bottom rounded-full bg-alert transition-opacity duration-500 ${
            on ? "eq-bar" : ""
          }`}
          style={
            {
              height: `${h * 100}%`,
              opacity: on ? 1 : 0.2,
              "--dur": "1.1s",
              "--delay": `${(i * 0.08).toFixed(2)}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}

export default function SectionAlert() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.25);
  const [netIdx, setNetIdx] = useState(0);
  const [i, setI] = useState(0);

  const net = NETWORKS[netIdx];
  const target = net.stops.length - 1;
  const pre = target - 1;

  const reset = useCallback(() => setI(0), []);
  useEffect(() => {
    reset();
  }, [netIdx, reset]);

  useInterval(() => setI((n) => (n >= target ? 0 : n + 1)), i === target ? 2800 : 1400, onScreen);

  const stopsLeft = Math.max(0, target - i);
  const alerting = i === pre;
  const arrived = i === target;

  const whisper = arrived
    ? `“${net.stops[target]}. You are off.”`
    : alerting
      ? `“${net.stops[i]} now. ${net.stops[target]} is next — ${net.note}.”`
      : i === 0
        ? "Nothing to do. You will hear from me once."
        : `Quiet. ${stopsLeft} stops to go.`;

  return (
    <section className="px-6 pt-[168px]" id="alert">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Getting off in time</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              It rings one stop early.
              <br />
              <span className="text-[#a5a3a0]">Not as the doors open.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[60ch] text-ink-2">
              An arrival alert is useless in a full coach — by the time it goes off you are still three
              people from the door. CommutePilot holds the line as an ordered sequence, so it knows which
              stop comes before yours in the direction you are going, and warns you there. One stop is
              enough to stand up, find your bag and get to the door without hurrying anyone.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-14">
          <div className="rounded-[28px] bg-surface-2 p-[clamp(8px,1.2vw,16px)]">
            <div ref={ref} className="rounded-[20px] bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className="flex flex-wrap gap-1 rounded-[999px] border border-line-soft bg-surface p-1"
                  role="tablist"
                  aria-label="Choose a network"
                >
                  {NETWORKS.map((n, k) => (
                    <button
                      key={n.id}
                      role="tab"
                      aria-selected={netIdx === k}
                      onClick={() => setNetIdx(k)}
                      className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] whitespace-nowrap transition-colors duration-200 sm:px-4 sm:text-[13.5px] ${
                        netIdx === k ? "bg-ink text-white" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {n.mode === "bus" ? <BusGlyph className="size-[14px]" /> : <TrainGlyph className="size-[14px]" />}
                      {n.city}
                    </button>
                  ))}
                </div>

                <button
                  onClick={reset}
                  className="border-b border-line-mid pb-0.5 text-[13.5px] text-ink-2 transition-colors hover:text-ink"
                >
                  Replay run
                </button>
              </div>

              <p className="mt-4 text-[12.5px] text-ink-3">{net.line}</p>

              <div className="relative mx-[clamp(14px,4vw,54px)] mt-12 mb-24">
                <div className="h-[4px] rounded bg-surface-3">
                  <span
                    className="block h-full rounded transition-[width,background-color] duration-[900ms] ease-linear"
                    style={{ width: `${(i / target) * 100}%`, background: net.color }}
                  />
                </div>

                {net.stops.map((s, n) => {
                  const pos = (n / target) * 100;
                  const isPre = n === pre;
                  const isTarget = n === target;
                  const cur = n === i;
                  return (
                    <span
                      key={s}
                      className="absolute top-[-5px] flex -translate-x-1/2 flex-col items-center gap-2.5"
                      style={{ left: `${pos}%` }}
                    >
                      <i
                        className="size-[14px] rounded-full border-[3px] bg-white transition-all duration-500"
                        style={{
                          borderColor: isPre
                            ? "var(--color-alert)"
                            : isTarget
                              ? "var(--color-metro-green)"
                              : cur
                                ? net.color
                                : n < i
                                  ? "var(--color-surface-3)"
                                  : "#ddd9d4",
                          background: n < i ? "var(--color-surface-3)" : "#fff",
                          boxShadow: isPre
                            ? "0 0 0 6px rgba(233,162,37,.18)"
                            : isTarget
                              ? "0 0 0 6px rgba(18,146,90,.14)"
                              : "none",
                          transform: cur ? "scale(1.18)" : "none",
                        }}
                      />
                      <i
                        className={`max-w-[92px] origin-top -rotate-[34deg] text-[10.5px] whitespace-nowrap transition-colors duration-500 lg:rotate-0 ${
                          isPre
                            ? "font-semibold text-alert-ink"
                            : isTarget
                              ? "font-semibold text-metro-green"
                              : cur
                                ? "font-medium text-ink"
                                : "text-ink-3"
                        }`}
                      >
                        {s}
                      </i>
                    </span>
                  );
                })}

                <span
                  className="absolute -top-[22px] -translate-x-1/2 transition-[left] duration-[900ms] ease-linear"
                  style={{ left: `${(i / target) * 100}%`, color: net.color }}
                >
                  {net.mode === "bus" ? (
                    <BusGlyph className="size-[30px] drop-shadow-[0_8px_12px_rgba(17,17,17,.18)]" />
                  ) : (
                    <TrainGlyph className="size-[30px] drop-shadow-[0_8px_12px_rgba(17,17,17,.18)]" />
                  )}
                </span>
              </div>

              <div className="flex flex-wrap items-stretch gap-3">
                <div
                  className={`min-w-[260px] flex-[2_1_320px] rounded-[18px] border p-4 transition-colors duration-500 ${
                    alerting ? "border-alert/45 bg-[#fffaf0]" : "border-line-soft bg-surface"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[10.5px] tracking-[0.09em] text-ink-3 uppercase">
                      In your earphones
                    </span>
                    <Equaliser on={alerting || arrived} />
                  </span>
                  <p className="mt-2 text-[15px] tracking-[-0.015em]">{whisper}</p>
                </div>

                <div className="flex min-w-[260px] flex-1 items-center justify-between gap-8 rounded-[18px] border border-line-soft bg-surface px-5 py-4">
                  <span>
                    <b className="tnum block text-[22px] font-semibold tracking-[-0.03em]">
                      {arrived ? "here" : `${stopsLeft * 3} min`}
                    </b>
                    <span className="text-[12px] whitespace-nowrap text-ink-3">to your stop</span>
                  </span>
                  <span className="text-right">
                    <b className="block text-[16px] font-semibold tracking-[-0.025em]">
                      {i >= target ? "—" : net.stops[i + 1]}
                    </b>
                    <span className="text-[12px] whitespace-nowrap text-ink-3">next stop</span>
                  </span>
                </div>
              </div>

              <div
                className={`grid transition-all duration-500 ${
                  alerting ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex items-center gap-3 rounded-[18px] bg-ink px-5 py-3.5 text-white">
                    <span className="text-[18px]">↑</span>
                    <p className="text-[14px]">
                      This is the moment you would have missed while reading. You are already standing up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Sequence, not a radius",
              d: "Where a network's stop order is known, “the stop before yours” is a fact, not a guess from a circle drawn on a map.",
            },
            {
              t: "It knows which way you are going",
              d: "The stop before yours is a different stop on the way home. The alert flips with the direction, without you setting anything up.",
            },
            {
              t: "Buses and last miles too",
              d: "No fixed sequence on a bus route, so you get a distance warning a few hundred metres out — enough time to press the bell.",
            },
          ].map((c, n) => (
            <Reveal key={c.t} delay={0.05 * n}>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{c.t}</h3>
              <p className="mt-1.5 text-[15px] leading-[1.5] text-ink-2">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
