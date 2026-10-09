"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, TrainGlyph } from "@/components/ui/Bits";

type Act = "start" | "wfh" | "leave" | "snooze";

const RESULT: Record<Act, { title: string; body: string; tone: string }> = {
  start: {
    title: "Tracking on.",
    body: "Alert armed for the stop before yours. Lock the phone and forget it.",
    tone: "green",
  },
  wfh: { title: "Working from home.", body: "Today stays quiet — no evening prompt either.", tone: "ink" },
  leave: { title: "Not travelling.", body: "Paused for the day. Back tomorrow at your usual time.", tone: "ink" },
  snooze: {
    title: "Snoozed 30 minutes.",
    body: "It will ask again. Leaving later than that? Start it whenever you like.",
    tone: "amber",
  },
};

const BUTTONS: { k: Act; label: string }[] = [
  { k: "start", label: "Start" },
  { k: "wfh", label: "WFH" },
  { k: "leave", label: "Not today" },
  { k: "snooze", label: "Snooze 30" },
];

export default function SectionFix() {
  const [act, setAct] = useState<Act | null>(null);
  const [today, setToday] = useState("Monday 9 October");

  useEffect(() => {
    const d = new Date();
    setToday(d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }));
  }, []);

  const res = act ? RESULT[act] : null;

  return (
    <section className="px-6 pt-[168px]" id="fix">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <Reveal>
            <Eyebrow>What it does instead</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              One tap at the door.
              <br />
              <span className="text-[#a5a3a0]">Then nothing, until it matters.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[58ch] text-ink-2">
              You never open it. At the time you normally leave, it comes to you: one notification, one tap,
              and the trip is running. Then it goes silent — no map, no screen, no updates you did not ask
              for — until the stop before yours.
            </p>
          </Reveal>
        </div>

        {/* lock screen */}
        <Reveal delay={0.14} className="mt-14">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-night via-[#232120] to-[#3a3631] px-6 py-12 sm:px-10">
            <div
              className="pointer-events-none absolute inset-x-0 -top-1/3 h-2/3"
              style={{ background: "radial-gradient(55% 60% at 50% 0%, rgba(255,228,77,.2), transparent 70%)" }}
            />

            <div className="relative text-center text-white">
              <p className="tnum text-[clamp(44px,7vw,68px)] leading-none font-medium tracking-[-0.05em]">
                8:15
              </p>
              <p className="mt-1.5 text-[13.5px] text-white/55">{today}</p>
            </div>

            <div className="relative mx-auto mt-9 w-full max-w-[460px]">
              <div className="rounded-[22px] bg-white/94 p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,.7)] backdrop-blur-xl">
                <div className="flex items-center justify-between text-[11.5px] text-ink-3">
                  <span className="flex items-center gap-2 font-medium text-ink-2">
                    <span className="grid size-[18px] place-items-center rounded-[6px] bg-ink text-white">
                      <TrainGlyph className="size-[12px]" />
                    </span>
                    CommutePilot
                  </span>
                  <span>now</span>
                </div>

                <p className="mt-2.5 text-[16px] font-semibold tracking-[-0.02em]">
                  Heading to work on the usual route?
                </p>
                <p className="mt-0.5 text-[13.5px] text-ink-2">
                  48 minutes door to door. I will wake you one stop before you get off.
                </p>

                <div className="mt-3.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                  {BUTTONS.map((b) => {
                    const on = act === b.k;
                    const primary = b.k === "start";
                    return (
                      <button
                        key={b.k}
                        onClick={() => setAct(b.k)}
                        className={`h-9 rounded-[11px] text-[12.5px] font-medium transition-all duration-200 hover:-translate-y-px ${
                          on
                            ? "bg-alert text-white"
                            : primary
                              ? "bg-ink text-white"
                              : "bg-surface-2 text-ink-2 hover:bg-surface-3"
                        }`}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  className={`grid transition-all duration-500 ${
                    res ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[12.5px] text-ink-2">
                      <b
                        className={`font-semibold ${
                          res?.tone === "green"
                            ? "text-metro-green"
                            : res?.tone === "amber"
                              ? "text-alert-ink"
                              : "text-ink"
                        }`}
                      >
                        {res?.title}
                      </b>{" "}
                      {res?.body}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-3 -mt-2 rounded-[18px] bg-white/55 px-4 py-2.5 text-[11.5px] text-ink-2 backdrop-blur-sm">
                <span className="flex items-center justify-between">
                  <span>Podcasts · the episode you paused is ready</span>
                  <span className="text-ink-3">7:58</span>
                </span>
              </div>
            </div>

            <p className="relative mt-7 text-center text-[12.5px] text-white/45">
              Try the buttons — this is the only decision the app ever asks you to make.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "It starts itself",
              d: "No searching, no saved trips, no remembering. It already knows the route, because it is the same route.",
            },
            {
              t: "It knows the days you do not go",
              d: "Working from home, on leave, leaving late — one tap and the day goes quiet, evening included.",
            },
            {
              t: "It stays out of the way",
              d: "Screen off, phone in your pocket. The next thing you hear from it is the one thing you needed.",
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
