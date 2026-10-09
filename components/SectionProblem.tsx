"use client";

import { useState } from "react";
import { SYMPTOMS } from "@/lib/data";
import { useInterval, useOnScreen, useSteps } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Bits";

/* ───────────────────────────────────────────────────────────
   Naming the problem. Most people do not experience this as
   "an app is missing" — they experience it as not being able
   to settle into anything on the ride. These three panels put
   that into numbers, then the checklist asks them directly.
   ─────────────────────────────────────────────────────────── */

const TAPS = [
  "Unlock the phone",
  "Open the maps app",
  "Set where you are",
  "Set where you are going",
  "Switch to the transit tab",
  "Press start — and press end when you arrive",
];

function SixTaps() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const [step] = useSteps(TAPS.length + 1, 900, onScreen);
  const done = Math.max(1, Math.min(step, TAPS.length));

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex items-baseline gap-2">
        <span className="tnum text-[clamp(44px,5vw,62px)] leading-none font-semibold tracking-[-0.05em]">
          {done}
        </span>
        <span className="text-[15px] text-ink-3">taps, every single morning</span>
      </div>

      <ol className="mt-5 flex flex-col gap-1.5">
        {TAPS.map((t, n) => {
          const lit = n < done;
          return (
            <li
              key={t}
              className={`flex items-center gap-2.5 rounded-[11px] border px-3 py-2 text-[13px] transition-all duration-300 ${
                lit ? "border-line-soft bg-white text-ink" : "border-transparent bg-white/50 text-ink-4"
              }`}
            >
              <i
                className={`grid size-[18px] shrink-0 place-items-center rounded-[6px] text-[10px] font-semibold not-italic transition-colors duration-300 ${
                  lit ? "bg-ink text-white" : "bg-surface-2 text-ink-4"
                }`}
              >
                {n + 1}
              </i>
              {t}
            </li>
          );
        })}
      </ol>

      <p className="mt-auto pt-5 text-[14px] leading-[1.5] text-ink-2">
        Twice a day, five days a week. At forty-five seconds a go that is{" "}
        <b className="font-semibold text-ink">about six hours a year</b> spent telling an app something it
        could have known: you are going to work.
      </p>
    </div>
  );
}

function CheckingLoop() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const [n, setN] = useState(0);
  useInterval(() => setN((v) => (v >= 20 ? 0 : v + 1)), 420, onScreen);

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex items-baseline gap-2">
        <span className="tnum text-[clamp(44px,5vw,62px)] leading-none font-semibold tracking-[-0.05em]">
          {n}
        </span>
        <span className="text-[15px] text-ink-3">times you looked up</span>
      </div>

      {/* the ride, minute by minute */}
      <div className="mt-6">
        <div className="flex items-end gap-[3px]">
          {Array.from({ length: 40 }).map((_, m) => {
            const glance = m % 2 === 1 && m / 2 < n;
            return (
              <i
                key={m}
                className={`flex-1 rounded-[2px] transition-all duration-300 ${
                  glance ? "bg-alert" : "bg-surface-3"
                }`}
                style={{ height: glance ? 34 : 12 }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-ink-3">
          <span>boarding</span>
          <span>a forty-minute ride</span>
          <span>your stop</span>
        </div>
      </div>

      <p className="mt-auto pt-5 text-[14px] leading-[1.5] text-ink-2">
        Not one of those glances told you anything new. But each one costs you the sentence you were
        reading, the thought you were having, the sleep you were almost getting.{" "}
        <b className="font-semibold text-ink">Nobody calls this a problem. It is just the ride.</b>
      </p>
    </div>
  );
}

function MissedStop() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const [phase] = useSteps(3, 1600, onScreen);

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex items-baseline gap-2">
        <span className="tnum text-[clamp(44px,5vw,62px)] leading-none font-semibold tracking-[-0.05em]">
          1
        </span>
        <span className="text-[15px] text-ink-3">stop past, and the day is off</span>
      </div>

      <div className="relative mt-7 h-[64px]">
        <div className="absolute top-[7px] right-0 left-0 h-[3px] rounded bg-surface-3" />
        {["your stop", "", "", ""].map((label, k) => (
          <span
            key={k}
            className="absolute flex -translate-x-1/2 flex-col items-center gap-2"
            style={{ left: `${12 + k * 25}%`, top: 0 }}
          >
            <i
              className={`size-[13px] rounded-full border-[3px] bg-white transition-all duration-500 ${
                k === 0 ? "border-metro-green" : "border-surface-3"
              }`}
            />
            {label && <i className="text-[11px] whitespace-nowrap text-metro-green not-italic">{label}</i>}
          </span>
        ))}
        <span
          className="absolute -top-[6px] -translate-x-1/2 transition-[left] duration-[1200ms]"
          style={{ left: phase === 0 ? "12%" : phase === 1 ? "37%" : "12%" }}
        >
          <i
            className={`block size-[15px] rounded-full border-[3px] transition-colors duration-500 ${
              phase === 1 ? "border-metro-red bg-metro-red/20" : "border-ink bg-white"
            }`}
          />
        </span>
        <span
          className={`absolute top-[26px] left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[11px] transition-all duration-500 ${
            phase === 1 ? "bg-metro-red/10 text-metro-red opacity-100" : "opacity-0"
          }`}
        >
          overshot · get off, cross over, wait, come back
        </span>
      </div>

      <p className="mt-auto pt-5 text-[14px] leading-[1.5] text-ink-2">
        One missed stop is twenty minutes and a bad mood. It only has to happen once for you to spend
        every ride afterwards <b className="font-semibold text-ink">guarding against it</b> — which is the
        real cost.
      </p>
    </div>
  );
}

function Checklist() {
  const [picked, setPicked] = useState<number[]>([]);
  const toggle = (n: number) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <div className="rounded-[28px] bg-surface-2 p-[clamp(8px,1.2vw,16px)]">
      <div className="rounded-[20px] bg-white p-6 sm:p-8">
        <h3 className="display-md">Does any of this sound like you?</h3>
        <p className="mt-2 max-w-[56ch] text-[15px] text-ink-2">
          Tick what you recognise. There is nothing to submit — it is just quicker than me explaining it.
        </p>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {SYMPTOMS.map((s, n) => {
            const on = picked.includes(n);
            return (
              <button
                key={s}
                onClick={() => toggle(n)}
                aria-pressed={on}
                className={`flex items-start gap-3 rounded-[14px] border px-4 py-3.5 text-left text-[14.5px] transition-all duration-200 ${
                  on
                    ? "border-ink/20 bg-surface text-ink"
                    : "border-line-soft bg-white text-ink-2 hover:border-line-mid"
                }`}
              >
                <span
                  className={`mt-[1px] grid size-[19px] shrink-0 place-items-center rounded-[6px] border transition-all duration-200 ${
                    on ? "border-ink bg-ink text-white" : "border-line-mid bg-white"
                  }`}
                >
                  {on && (
                    <svg viewBox="0 0 24 24" className="size-[12px]" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {s}
              </button>
            );
          })}
        </div>

        <div
          className={`grid transition-all duration-500 ${
            picked.length ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-4 rounded-[16px] bg-ink px-5 py-4 text-white">
              <p className="min-w-[240px] flex-1 text-[15px]">
                {picked.length >= 4
                  ? "That is the whole problem, and you just described it better than I could."
                  : "Then you already know the feeling — you just never had a name for it."}
              </p>
              <a
                href="#vote"
                className="rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-ink transition-transform duration-200 hover:-translate-y-px"
              >
                I want this fixed →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SectionProblem() {
  return (
    <section className="px-6 pt-[168px]" id="problem">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <Reveal>
            <Eyebrow>The problem nobody names</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              It is not that you miss your stop.
              <br />
              <span className="text-[#a5a3a0]">It is that you never stop checking.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[60ch] text-ink-2">
              Ask anyone how their commute went and they will say &ldquo;fine&rdquo;. Ask them what they got
              done on it and the answer is usually nothing — because a part of their attention was parked on
              the window the whole way. That part is what this is for.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3.5 lg:grid-cols-3">
          <Reveal className="rounded-[24px] border border-line-soft bg-surface p-6">
            <SixTaps />
          </Reveal>
          <Reveal delay={0.06} className="rounded-[24px] border border-line-soft bg-surface p-6">
            <CheckingLoop />
          </Reveal>
          <Reveal delay={0.12} className="rounded-[24px] border border-line-soft bg-surface p-6">
            <MissedStop />
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-3.5">
          <Checklist />
        </Reveal>
      </div>
    </section>
  );
}
