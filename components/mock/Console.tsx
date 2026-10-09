"use client";

import { useEffect, useState } from "react";
import { NETWORKS } from "@/lib/data";
import { useInterval, useOnScreen, useTripClock } from "@/lib/hooks";
import { BusGlyph, TrainGlyph, WalkGlyph } from "@/components/ui/Bits";

/* ────────────────────────────────────────────────────────────
   The hero console: one trip, running by itself, in a city the
   visitor can switch. Every reading on screen derives from a
   single tick, the way the reference site drives its app mock.
   ──────────────────────────────────────────────────────────── */

type LogLine = { id: number; kind: "info" | "alert" | "done"; title?: string; body: string; at: string };

const LEG_LABELS = [
  { k: "walk", label: "Walk", sub: "to the station" },
  { k: "ride", label: "Ride", sub: "first line" },
  { k: "swap", label: "Change", sub: "interchange" },
  { k: "ride2", label: "Ride", sub: "second line" },
  { k: "last", label: "Last mile", sub: "bus or walk" },
] as const;

function clock(minutesFromStart: number) {
  const base = 8 * 60 + 15 + minutesFromStart;
  const h = Math.floor(base / 60);
  const m = base % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export default function Console() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.12);
  const [netIdx, setNetIdx] = useState(0);
  const [i, setI] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);
  const trip = useTripClock(748, onScreen);

  const net = NETWORKS[netIdx];
  const last = net.stops.length - 1;
  const pre = last - 1;

  // the train
  useInterval(() => setI((n) => (n >= last ? 0 : n + 1)), 1700, onScreen);

  // a new city every lap
  useEffect(() => {
    if (i !== 0) return;
    setLog([]);
  }, [i]);

  useEffect(() => {
    const line: Omit<LogLine, "id"> | null =
      i === 0
        ? { kind: "info", body: "Trip started. Screen can go off now.", at: clock(0) }
        : i === pre
          ? {
              kind: "alert",
              title: "One stop before",
              body: `${net.stops[pre]} now — ${net.stops[last]} is next. ${net.note}.`,
              at: clock(i * 3),
            }
          : i === last
            ? { kind: "done", body: `${net.stops[last]}. Tracking off.`, at: clock(i * 3) }
            : i === 2
              ? { kind: "info", body: "Quiet. Nothing for you to do yet.", at: clock(i * 3) }
              : null;

    if (!line) return;
    setLog((prev) => (prev.some((l) => l.id === i) ? prev : [...prev, { ...line, id: i }].slice(-4)));
  }, [i, net, pre, last]);

  const station = net.stops[i];
  const alerting = i === pre;
  const stopsLeft = Math.max(0, last - i);
  const activeLeg = i === 0 ? 0 : i >= last ? 4 : i === pre ? 3 : i < pre - 1 ? 1 : 2;

  function pickCity(n: number) {
    setNetIdx(n);
    setI(0);
    setLog([]);
  }

  return (
    <div ref={ref} className="mx-auto max-w-[1240px] rounded-[28px] bg-surface-2 p-[clamp(8px,1.4vw,18px)]">
      <div className="overflow-hidden rounded-[20px] bg-night text-white shadow-[0_40px_90px_-50px_rgba(0,0,0,.7)]">
        {/* ── chrome + city switcher ── */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/8 px-4 py-2.5">
          <span className="flex gap-[6px]">
            <i className="size-[10px] rounded-full bg-[#ff5f57]" />
            <i className="size-[10px] rounded-full bg-[#febc2e]" />
            <i className="size-[10px] rounded-full bg-[#28c840]" />
          </span>

          <span className="ml-1 flex flex-wrap items-center gap-1">
            {NETWORKS.map((n, k) => (
              <button
                key={n.id}
                onClick={() => pickCity(k)}
                className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-300 ${
                  k === netIdx ? "bg-white/90 text-night" : "text-white/40 hover:text-white/70"
                }`}
              >
                {n.city}
              </button>
            ))}
          </span>

          <span className="ml-auto flex items-center gap-2 text-[11.5px]">
            <span className="hidden items-center gap-2 rounded-full bg-white/8 px-2.5 py-1 sm:flex">
              <i className="anim-blink size-[6px] rounded-full bg-metro-green" />
              Trip <b className="tnum font-medium text-white/70">{trip}</b>
            </span>
            <span className="rounded-full bg-white/8 px-2.5 py-1 text-white/60">
              Phone <b className="font-medium text-white">locked</b>
            </span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* ── main panel ── */}
          <div className="min-w-0 flex-1 lg:border-r lg:border-white/8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-[11.5px]">
              <span
                className={`inline-flex items-center gap-1.5 rounded-[7px] px-2 py-[3px] font-medium transition-colors duration-500 ${
                  alerting ? "bg-alert text-night" : "bg-metro-green/18 text-[#51d99a]"
                }`}
              >
                <i className={`size-[6px] rounded-full ${alerting ? "bg-night" : "anim-blink bg-[#51d99a]"}`} />
                {alerting ? "ALERTING" : "TRACKING"}
              </span>
              <span className="text-white/70">{net.line}</span>

              <span className="ml-auto flex items-center gap-4 text-white/45">
                <span className="tnum">
                  <b className="font-medium text-white/80">{stopsLeft}</b> stops left
                </span>
                <span className="hidden tnum sm:inline">
                  ETA <b className="font-medium text-white/80">{stopsLeft * 3} min</b>
                </span>
                <span className="hidden md:inline">
                  times you checked <b className="font-medium text-white/80">0</b>
                </span>
              </span>
            </div>

            {/* canvas */}
            <div className="relative m-2 mt-0 overflow-hidden rounded-[14px] bg-night-2 p-4 pb-5">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative">
                <p className="text-[10.5px] tracking-[0.1em] text-white/35 uppercase">
                  {i >= last ? "Arrived" : "Now passing"}
                </p>
                <p className="mt-1 text-[clamp(20px,2.4vw,30px)] leading-tight font-semibold tracking-[-0.035em]">
                  {station}
                </p>
                <p className="mt-0.5 text-[12.5px] text-white/50">
                  {i >= last ? "Trip complete" : `Your stop · ${net.stops[last]}, ${stopsLeft} to go`}
                </p>
              </div>

              {/* line diagram */}
              <div className="relative mt-7 mb-2 h-[58px]">
                <div className="absolute top-[7px] right-2 left-2 h-[3px] rounded bg-white/12">
                  <span
                    className="block h-full rounded transition-[width,background-color] duration-[900ms] ease-linear"
                    style={{ width: `${(i / last) * 100}%`, backgroundColor: net.color }}
                  />
                </div>

                {net.stops.map((s, n) => {
                  const pos = (n / last) * 100;
                  const done = n < i;
                  const cur = n === i;
                  const isPre = n === pre;
                  return (
                    <span
                      key={s}
                      className="absolute flex -translate-x-1/2 flex-col items-center gap-2"
                      style={{ left: `calc(8px + ${pos}% - ${(pos / 100) * 16}px)`, top: 0 }}
                    >
                      <i
                        className="size-[13px] rounded-full border-[3px] transition-all duration-500"
                        style={{
                          borderColor: cur
                            ? isPre
                              ? "var(--color-alert)"
                              : net.color
                            : done
                              ? "rgba(255,255,255,.3)"
                              : "rgba(255,255,255,.18)",
                          background: done ? "rgba(255,255,255,.3)" : "var(--color-night-2)",
                          boxShadow: cur
                            ? `0 0 0 5px color-mix(in srgb, ${isPre ? "var(--color-alert)" : net.color} 24%, transparent)`
                            : "none",
                          transform: cur ? "scale(1.15)" : "none",
                        }}
                      />
                      <i
                        className={`hidden origin-top -rotate-[38deg] text-[9.5px] whitespace-nowrap transition-colors duration-500 sm:block ${
                          cur ? "font-medium text-white" : "text-white/30"
                        }`}
                      >
                        {s}
                      </i>
                    </span>
                  );
                })}

                <span
                  className="absolute -top-[13px] -translate-x-1/2 transition-[left,color] duration-[900ms] ease-linear"
                  style={{
                    left: `calc(8px + ${(i / last) * 100}% - ${((i / last) * 100) / 100 * 16}px)`,
                    color: net.color,
                  }}
                >
                  {net.mode === "bus" ? (
                    <BusGlyph className="size-[26px] drop-shadow-[0_6px_10px_rgba(0,0,0,.5)]" />
                  ) : (
                    <TrainGlyph className="size-[26px] drop-shadow-[0_6px_10px_rgba(0,0,0,.5)]" />
                  )}
                </span>
              </div>

              <div className="mt-6 inline-flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-2 text-night">
                <WalkGlyph className="size-[15px]" />
                <span className="text-[12.5px] font-medium">
                  {i >= last
                    ? "Off the train, last mile on foot"
                    : `Leg ${activeLeg + 1} of 5 · ${LEG_LABELS[activeLeg].label}`}
                </span>
              </div>

              {/* alert card */}
              <div
                className={`absolute right-3 bottom-4 w-[clamp(200px,26vw,264px)] rounded-[14px] bg-white p-3 text-night shadow-[0_24px_48px_-20px_rgba(0,0,0,.6)] transition-all duration-500 ${
                  alerting ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.09em] text-alert-ink uppercase">
                  <i className="anim-ring size-[6px] rounded-full bg-alert" />
                  One stop before
                </span>
                <p className="mt-1.5 text-[14px] leading-snug font-medium tracking-[-0.02em]">
                  {net.stops[last]} is next
                </p>
                <p className="mt-0.5 text-[11.5px] text-ink-2">{net.note}</p>
              </div>
            </div>

            {/* legs */}
            <div className="px-4 pt-1 pb-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/55">Legs</span>
                <span className="text-white/30">Handed over automatically</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
                {LEG_LABELS.map((l, n) => {
                  const on = n === activeLeg;
                  return (
                    <div
                      key={l.k}
                      className={`rounded-[10px] border px-2 py-2 transition-all duration-500 ${
                        on ? "border-white/25 bg-white/12" : "border-white/8 bg-white/4"
                      }`}
                    >
                      <span
                        className={`flex items-center gap-1.5 transition-colors duration-500 ${
                          on ? "text-white" : "text-white/35"
                        }`}
                      >
                        {l.k === "walk" || l.k === "last" ? (
                          <WalkGlyph className="size-[13px]" />
                        ) : l.k === "swap" ? (
                          <span className="text-[12px]">⇄</span>
                        ) : (
                          <TrainGlyph className="size-[13px]" />
                        )}
                        <b className="truncate text-[11px] font-medium">{l.label}</b>
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-white/25">{l.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── trip log ── */}
          <div className="flex w-full shrink-0 flex-col border-t border-white/8 lg:w-[286px] lg:border-t-0">
            <div className="flex items-center gap-2 px-4 py-2.5 text-[12px]">
              <b className="font-medium">Trip log</b>
              <span className="text-white/35">{net.city}</span>
              <i className="anim-blink ml-auto size-[7px] rounded-full bg-metro-green" />
            </div>

            <div className="panel-scroll flex min-h-[180px] flex-col justify-end gap-2 overflow-hidden px-3 pb-3 lg:min-h-[318px]">
              {log.map((l) => (
                <div
                  key={l.id}
                  className={`anim-pop rounded-[13px] px-3 py-2 text-[11.5px] leading-snug ${
                    l.kind === "alert"
                      ? "border border-alert/40 bg-alert/15 text-white"
                      : l.kind === "done"
                        ? "border border-metro-green/35 bg-metro-green/14 text-white"
                        : "bg-white/9 text-white/80"
                  }`}
                >
                  {l.title && (
                    <span className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.09em] text-alert uppercase">
                      <i className="anim-blink size-[5px] rounded-full bg-alert" />
                      {l.title}
                    </span>
                  )}
                  {l.body}
                  <span className="mt-1 block text-[9.5px] text-white/35">{l.at}</span>
                </div>
              ))}
            </div>

            <div className="mx-3 mb-3 rounded-[11px] bg-white/7 px-3 py-2 text-[11px] text-white/35">
              No notifications until they matter
            </div>
          </div>

          {/* ── rail ── */}
          <div className="hidden w-[62px] shrink-0 flex-col items-center gap-1 border-l border-white/8 py-3 xl:flex">
            {["Trip", "Route", "Days", "Alerts", "Setup"].map((k, n) => (
              <span
                key={k}
                className={`flex w-full flex-col items-center gap-1 rounded-[10px] px-1 py-2 text-[9.5px] transition-colors ${
                  n === 0 ? "bg-white/10 text-white" : "text-white/30"
                }`}
              >
                <i className={`size-[15px] rounded-[5px] ${n === 0 ? "bg-white/80" : "bg-white/18"}`} />
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 px-2 text-center text-[12px] text-ink-3">
        Pick a city — the alert always lands one stop before yours, whatever the network.
      </p>
    </div>
  );
}
