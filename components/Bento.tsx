"use client";

import { useCountUp, useInView, useOnScreen, useSteps } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import { BusGlyph, Eyebrow, TrainGlyph, WalkGlyph } from "@/components/ui/Bits";

function Tile({
  children,
  className = "",
  dark = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`group flex flex-col overflow-hidden rounded-[24px] border p-6 transition-all duration-300 hover:-translate-y-[3px] ${
        dark
          ? "border-ink bg-ink text-white hover:shadow-[0_28px_60px_-34px_rgba(17,17,17,.9)]"
          : "border-line-soft bg-surface hover:bg-[#f9f8f6] hover:shadow-[0_22px_48px_-34px_rgba(17,17,17,.5)]"
      } ${className}`}
    >
      {children}
    </Reveal>
  );
}

function Minutes() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const n = useCountUp(40, inView);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <p className="tnum text-[clamp(52px,6vw,76px)] leading-none font-semibold tracking-[-0.05em]">
        {n} min
      </p>
      <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.025em]">that become yours again</h3>
      <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink-2">
        A commute you do not have to supervise is a commute you can sleep through, read through, or
        actually get something done in. That is the whole product; everything else is plumbing.
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {["sleep", "read", "podcast", "email", "stare out of the window on purpose"].map((c) => (
          <span
            key={c}
            className="rounded-full border border-line-soft bg-white px-3 py-1.5 text-[12.5px] text-ink-2"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

const STATES = [
  { k: "Idle", c: "var(--color-ink-3)" },
  { k: "Tracking", c: "var(--color-metro-green)" },
  { k: "One stop before", c: "var(--color-alert)" },
  { k: "Arrived", c: "var(--color-metro-blue)" },
];

function StatusTile() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const [i] = useSteps(STATES.length, 1800, onScreen);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <h3 className="text-[18px] font-semibold tracking-[-0.025em]">Four states. That is the app.</h3>
      <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink-2">
        No dashboard, no feed, no streaks. It is idle, it is tracking, it is telling you to move, or you
        are there.
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {STATES.map((s, n) => (
          <span
            key={s.k}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] transition-all duration-500"
            style={{
              borderColor: n === i ? `color-mix(in srgb, ${s.c} 40%, transparent)` : "var(--color-line-soft)",
              background: n === i ? `color-mix(in srgb, ${s.c} 10%, #fff)` : "#fff",
              color: n === i ? s.c : "var(--color-ink-4)",
            }}
          >
            <i
              className="size-[6px] rounded-full transition-colors duration-500"
              style={{ background: n === i ? s.c : "var(--color-surface-3)" }}
            />
            {s.k}
          </span>
        ))}
      </div>
    </div>
  );
}

function VoiceTile() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <h3 className="text-[18px] font-semibold tracking-[-0.025em]">Spoken over whatever you are playing</h3>
      <p className="mt-1.5 max-w-[46ch] text-[14.5px] leading-[1.5] text-ink-2">
        Your podcast ducks, you hear your stop, the podcast comes back. Earphones in, eyes closed, nothing
        to look at.
      </p>
      <div className="mt-auto flex items-end gap-[5px] pt-7">
        {Array.from({ length: 22 }).map((_, n) => (
          <i
            key={n}
            className={`w-[5px] origin-bottom rounded-full bg-ink/80 ${onScreen ? "eq-bar" : ""}`}
            style={
              {
                height: `${Math.round(16 + Math.abs(Math.sin(n * 1.1)) * 42)}px`,
                "--dur": "1.4s",
                "--delay": `${((n % 7) * 0.11).toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function ModesTile() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.3);
  const modes = [
    { k: "Metro", icon: <TrainGlyph className="size-[15px]" /> },
    { k: "Local trains", icon: <TrainGlyph className="size-[15px]" /> },
    { k: "City bus", icon: <BusGlyph className="size-[15px]" /> },
    { k: "Walking legs", icon: <WalkGlyph className="size-[15px]" /> },
  ];
  const [i] = useSteps(modes.length, 1500, onScreen);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <h3 className="text-[18px] font-semibold tracking-[-0.025em]">Whatever you ride</h3>
      <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink-2">
        If it stops at places and you get off at one of them, it works. Rail gets stop-sequence alerts;
        buses and last miles get distance alerts.
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {modes.map((m, n) => (
          <span
            key={m.k}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] transition-all duration-500 ${
              n === i ? "border-ink/25 bg-white text-ink" : "border-line-soft bg-white/60 text-ink-3"
            }`}
          >
            {m.icon}
            {m.k}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Bento() {
  return (
    <section className="px-6 pt-[168px]" id="features">
      <div className="mx-auto max-w-[1240px] text-center">
        <Reveal>
          <Eyebrow>What you actually get</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-2.5">
            A commute that runs itself.
            <br />
            <span className="text-[#a5a3a0]">And a head that is free.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1240px] gap-3.5 md:grid-cols-6">
        <Tile className="md:col-span-2 md:row-span-2">
          <Minutes />
        </Tile>

        <Tile dark className="md:col-span-2" delay={0.04}>
          <p className="text-[clamp(52px,6vw,76px)] leading-none font-semibold tracking-[-0.05em]">1</p>
          <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.025em]">stop of warning</h3>
          <p className="mt-1.5 text-[14.5px] leading-[1.5] text-white/60">
            The whole idea in two words. Long enough to stand up, pick up your bag and reach the doors
            before they open — on a crowded train that is the difference between getting off and not.
          </p>
        </Tile>

        <Tile className="md:col-span-2" delay={0.08}>
          <p className="tnum text-[clamp(52px,6vw,76px)] leading-none font-semibold tracking-[-0.05em]">
            6 → 1
          </p>
          <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.025em]">taps to start the day</h3>
          <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink-2">
            Unlock, open, from, to, transit, start — replaced by one tap on a notification you did not
            have to go looking for.
          </p>
        </Tile>

        <Tile className="md:col-span-2" delay={0.12}>
          <StatusTile />
        </Tile>

        <Tile className="md:col-span-2" delay={0.16}>
          <ModesTile />
        </Tile>

        <Tile className="md:col-span-4" delay={0.2}>
          <VoiceTile />
        </Tile>

        <Tile className="md:col-span-3" delay={0.24}>
          <h3 className="text-[18px] font-semibold tracking-[-0.025em]">It learns the week, not just the route</h3>
          <p className="mt-1.5 max-w-[48ch] text-[14.5px] leading-[1.5] text-ink-2">
            Which days you travel, when you usually leave, that Fridays are later and Wednesdays are from
            home. The prompt follows your week instead of nagging you through it.
          </p>
          <div className="mt-auto flex gap-1.5 pt-7">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, n) => (
              <span
                key={n}
                className={`grid size-[32px] place-items-center rounded-[10px] text-[12px] ${
                  n === 2 || n > 4 ? "bg-white text-ink-4" : "bg-ink text-white"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </Tile>

        <Tile className="md:col-span-3" delay={0.28}>
          <h3 className="text-[18px] font-semibold tracking-[-0.025em]">Your route is yours</h3>
          <p className="mt-1.5 max-w-[48ch] text-[14.5px] leading-[1.5] text-ink-2">
            Your stops, your times and your days are kept to run the alerts and nothing else. Location is
            used while a trip is running and is not kept as a history. No ads, nothing sold on.
          </p>
          <div className="mt-auto flex items-center gap-4 pt-7 text-ink">
            <svg
              viewBox="0 0 24 24"
              className="size-[38px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2.5" />
            </svg>
            <span className="text-[13px] text-ink-3">stops · times · days. Nothing else is interesting.</span>
          </div>
        </Tile>
      </div>
    </section>
  );
}
