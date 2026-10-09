"use client";

import { useEffect, useState } from "react";
import { useInterval, useOnScreen } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

const STEPS = [
  {
    n: "01",
    t: "Set the route and the times",
    d: "Where you get on, where you get off, anything in between, and the days you do it. Three minutes, once — then never again.",
  },
  {
    n: "02",
    t: "Tap once at the door",
    d: "The notification arrives at the time you normally leave. Start, working from home, not today, or snooze.",
  },
  {
    n: "03",
    t: "Put the phone away",
    d: "Sleep, read, work, stare into space. It speaks once before each change and once before your stop.",
  },
];

const VIEWS: { kind: "bot" | "me" | "alert" | "btns" | "done"; body: string }[][] = [
  [
    { kind: "bot", body: "Where do you get on in the morning?" },
    { kind: "me", body: "My usual station" },
    { kind: "bot", body: "And where do you get off? You can add a change in the middle if your trip has one." },
    { kind: "me", body: "Work — with one interchange" },
    { kind: "bot", body: "Saved. Mon–Fri, 8:15 out and 6:45 back. The evening trip is the same thing reversed." },
  ],
  [
    { kind: "bot", body: "Heading in on the usual route?" },
    { kind: "btns", body: "" },
    { kind: "me", body: "Start" },
    { kind: "bot", body: "Tracking. Lock the phone — the next thing you hear is the stop before yours." },
  ],
  [
    { kind: "alert", body: "One stop before · your interchange is next. Platform is downstairs." },
    { kind: "bot", body: "Second line. Tracking to your stop." },
    { kind: "alert", body: "One stop before · your stop is next. Start moving to the door." },
    { kind: "done", body: "Arrived. Evening trip already set for 6:45." },
  ],
];

export default function Steps() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const [i, setI] = useState(0);
  const [locked, setLocked] = useState(false);
  const [seed, setSeed] = useState(0); // restarts the message animation

  useInterval(() => setI((n) => (n + 1) % STEPS.length), 5400, onScreen && !locked);
  useEffect(() => setSeed((s) => s + 1), [i]);

  return (
    <section className="px-6 pt-[168px]" id="how">
      <div className="mx-auto max-w-[1240px] text-center">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-2.5">
            Three minutes once.
            <br />
            <span className="text-[#a5a3a0]">Then never again.</span>
          </h2>
        </Reveal>
      </div>

      <div ref={ref} className="mx-auto mt-14 grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_1.05fr]">
        <Reveal className="flex flex-col gap-1">
          {STEPS.map((s, n) => {
            const on = n === i;
            return (
              <button
                key={s.n}
                onClick={() => {
                  setI(n);
                  setLocked(true);
                }}
                className={`relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-[20px] px-6 py-5 text-left transition-colors duration-300 ${
                  on ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                <span
                  className={`absolute top-4 bottom-4 left-0 w-[2px] origin-top rounded transition-transform duration-500 ${
                    on ? "scale-y-100 bg-ink" : "scale-y-0 bg-ink"
                  }`}
                />
                <span className="row-span-2 font-mono text-[12px] text-ink-3">{s.n}</span>
                <span className="text-[19px] font-semibold tracking-[-0.025em]">{s.t}</span>
                <span className={`text-[15px] leading-[1.5] ${on ? "text-ink-2" : "text-ink-3"}`}>
                  {s.d}
                </span>
                {/* progress bar for the auto-advance */}
                {on && !locked && (
                  <span className="col-span-2 mt-2 h-[2px] overflow-hidden rounded bg-surface-3">
                    <span key={seed} className="progress-bar block h-full bg-ink/40" />
                  </span>
                )}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={0.08}>
          <div className="min-h-[400px] rounded-[28px] border border-line-soft bg-surface p-6">
            <div className="flex flex-col gap-2.5" key={seed}>
              {VIEWS[i].map((m, n) =>
                m.kind === "btns" ? (
                  <span
                    key={n}
                    className="anim-pop flex flex-wrap gap-1.5"
                    style={{ animationDelay: `${0.05 + n * 0.2}s` }}
                  >
                    {["Start journey", "WFH", "On leave", "Snooze 30"].map((b, k) => (
                      <i
                        key={b}
                        className={`rounded-[11px] border px-3.5 py-2 text-[12.5px] not-italic ${
                          k === 0 ? "border-ink bg-ink text-white" : "border-line-soft bg-white text-ink-2"
                        }`}
                      >
                        {b}
                      </i>
                    ))}
                  </span>
                ) : (
                  <p
                    key={n}
                    className={`anim-pop max-w-[82%] rounded-[17px] border px-3.5 py-2.5 text-[14px] leading-[1.45] ${
                      m.kind === "me"
                        ? "self-end border-ink bg-ink text-white"
                        : m.kind === "alert"
                          ? "border-alert/40 bg-[#fff8e9]"
                          : m.kind === "done"
                            ? "border-metro-green/30 bg-[#eefaf3]"
                            : "border-line-soft bg-white"
                    }`}
                    style={{ animationDelay: `${0.05 + n * 0.2}s` }}
                  >
                    {m.body}
                  </p>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
