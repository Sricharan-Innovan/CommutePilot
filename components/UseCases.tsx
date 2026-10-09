"use client";

import Reveal from "@/components/ui/Reveal";
import { BusGlyph, Eyebrow, TrainGlyph } from "@/components/ui/Bits";

/* A row of small scenes that scrolls by itself, like the use-case strip on
   the reference site. Every illustration is built from divs — no images. */

function Napper() {
  return (
    <div className="relative flex h-full items-end justify-center gap-1.5 px-4 pb-4">
      <span className="absolute top-3 left-1/2 flex -translate-x-1/2 gap-1 text-[13px] text-ink-3">
        <i className="eq-bar not-italic opacity-80" style={{ "--dur": "2.4s" } as React.CSSProperties}>
          z
        </i>
        <i
          className="eq-bar not-italic opacity-60"
          style={{ "--dur": "2.4s", "--delay": ".3s" } as React.CSSProperties}
        >
          z
        </i>
        <i
          className="eq-bar not-italic opacity-40"
          style={{ "--dur": "2.4s", "--delay": ".6s" } as React.CSSProperties}
        >
          z
        </i>
      </span>
      {[0, 1, 2].map((n) => (
        <span key={n} className="relative h-[46px] w-[34px] rounded-t-[10px] bg-surface-2">
          {n === 1 && (
            <i className="absolute -top-3 left-1/2 size-[20px] -translate-x-1/2 rounded-full bg-ink" />
          )}
          {n === 1 && (
            <i className="absolute top-2 left-1/2 h-[26px] w-[26px] -translate-x-1/2 rounded-t-[8px] bg-metro-red/70" />
          )}
        </span>
      ))}
    </div>
  );
}

function Earphones() {
  return (
    <div className="flex h-full items-center justify-center gap-3 px-5">
      <span className="h-[58px] w-[34px] rounded-[8px] border-2 border-ink/80 p-[3px]">
        <i className="block h-[8px] w-full rounded-[3px] bg-metro-blue/70" />
        <i className="mt-[3px] block h-[4px] w-2/3 rounded bg-surface-2" />
        <i className="mt-[3px] block h-[4px] w-full rounded bg-surface-2" />
        <i className="mt-[3px] block h-[4px] w-1/2 rounded bg-surface-2" />
      </span>
      <span className="flex items-end gap-[3px]">
        {[0.4, 0.8, 0.5, 1, 0.6, 0.9].map((h, n) => (
          <i
            key={n}
            className="eq-bar w-[4px] origin-bottom rounded-full bg-ink/70"
            style={
              {
                height: Math.round(34 * h),
                "--dur": "1.2s",
                "--delay": `${(n * 0.1).toFixed(1)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </span>
    </div>
  );
}

function Interchange() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <span className="flex items-center gap-2">
        <i className="h-[3px] w-[40px] rounded bg-metro-red" />
        <i className="grid size-[26px] place-items-center rounded-full bg-ink text-[12px] text-white">⇄</i>
        <i className="h-[3px] w-[40px] rounded bg-metro-blue" />
      </span>
      <span className="flex gap-1">
        {Array.from({ length: 9 }).map((_, n) => (
          <i
            key={n}
            className="size-[7px] rounded-full bg-ink-4"
            style={{ opacity: 0.35 + (n % 3) * 0.25 }}
          />
        ))}
      </span>
      <span className="text-[11px] text-ink-3">your interchange · 9:02 am</span>
    </div>
  );
}

function NightBus() {
  return (
    <div className="relative grid h-full place-items-center rounded-[14px] bg-night">
      <span className="absolute size-[72px] rounded-full border border-white/15" />
      <span className="ring-pulse absolute size-[72px] rounded-full border border-alert/50" />
      <span className="relative z-10 text-white">
        <BusGlyph className="size-[26px]" />
      </span>
      <span className="absolute bottom-3 text-[10.5px] text-white/45">500 m out</span>
    </div>
  );
}

function Hybrid() {
  return (
    <div className="grid h-full place-items-center">
      <span className="grid grid-cols-5 gap-1.5">
        {["M", "T", "W", "T", "F"].map((d, n) => (
          <i
            key={n}
            className={`grid size-[26px] place-items-center rounded-[8px] text-[11px] not-italic ${
              n === 1 || n === 3 ? "bg-surface-2 text-ink-4" : "bg-ink text-white"
            }`}
          >
            {d}
          </i>
        ))}
      </span>
    </div>
  );
}

function NewInTown() {
  return (
    <div className="grid h-full place-items-center px-5">
      <svg viewBox="0 0 120 60" className="w-full">
        <path d="M6 44h34l16-16h58" stroke="var(--color-metro-red)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M6 20h40l14 14h54" stroke="var(--color-metro-blue)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="56" cy="30" r="6" fill="#fff" stroke="var(--color-ink)" strokeWidth="3" />
      </svg>
    </div>
  );
}

function Reader() {
  return (
    <div className="grid h-full place-items-center">
      <span className="flex h-[52px] w-[70px] overflow-hidden rounded-[6px] border-2 border-ink/80">
        <i className="flex-1 border-r border-ink/20 p-1.5">
          <b className="block h-[3px] w-full rounded bg-surface-2" />
          <b className="mt-1 block h-[3px] w-4/5 rounded bg-surface-2" />
          <b className="mt-1 block h-[3px] w-full rounded bg-surface-2" />
        </i>
        <i className="flex-1 p-1.5">
          <b className="block h-[3px] w-3/4 rounded bg-surface-2" />
          <b className="mt-1 block h-[3px] w-full rounded bg-surface-2" />
          <b className="mt-1 block h-[3px] w-1/2 rounded bg-metro-green/60" />
        </i>
      </span>
    </div>
  );
}

function Student() {
  return (
    <div className="flex h-full items-center justify-center gap-1.5">
      <span className="flex items-center gap-1 rounded-full bg-surface-2 px-2 py-1 text-ink-2">
        <BusGlyph className="size-[13px]" />
        <i className="text-[10.5px] not-italic">10H</i>
      </span>
      <i className="h-[2px] w-[14px] bg-surface-3" />
      <span className="flex items-center gap-1 rounded-full bg-metro-red/12 px-2 py-1 text-metro-red">
        <TrainGlyph className="size-[13px]" />
        <i className="text-[10.5px] not-italic">Red</i>
      </span>
      <i className="h-[2px] w-[14px] bg-surface-3" />
      <span className="rounded-full bg-ink px-2 py-1 text-[10.5px] text-white">7:10</span>
    </div>
  );
}

const CARDS = [
  { art: <Napper />, t: "The power napper", d: "Forty minutes of real sleep on the way in, instead of a timer alarm that is always wrong by six minutes." },
  { art: <Earphones />, t: "The headphones-in crowd", d: "Podcast the whole way. The only thing that interrupts it is the stop before yours." },
  { art: <Interchange />, t: "The interchange switcher", d: "A change at rush hour is a crowd. Knowing it is next is the difference between stepping off and being carried past." },
  { art: <NightBus />, t: "The late shift", d: "Dark road, no announcements, nothing out of the window you recognise. A ring a few hundred metres out is enough." },
  { art: <Hybrid />, t: "The hybrid worker", d: "Three days in, two at home — and it knows which is which, because you told it in one tap." },
  { art: <NewInTown />, t: "New in the city", d: "First month somewhere new, counting stops on your fingers and hoping. Stop counting." },
  { art: <Reader />, t: "The reader", d: "Three chapters a week, instead of the same paragraph four times between glances at the sign." },
  { art: <Student />, t: "The student", d: "Two buses and a train at 7:10 am, every weekday, on four hours of sleep. Same route, same alerts, no thinking." },
];

export default function UseCases() {
  return (
    <section className="pt-[168px]">
      <div className="mx-auto max-w-[1240px] px-6 text-center">
        <Reveal>
          <Eyebrow>Who keeps asking for this</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mt-2.5">
            Not a travel app.
            <br />
            <span className="text-[#a5a3a0]">A thing for people who repeat.</span>
          </h2>
        </Reveal>
      </div>

      <div className="group-pause mask-edges mt-14 overflow-hidden">
        <div className="marquee-x flex w-max gap-3.5" style={{ "--speed": "58s" } as React.CSSProperties}>
          {[...CARDS, ...CARDS].map((c, n) => (
            <article
              key={n}
              aria-hidden={n >= CARDS.length}
              className="w-[280px] shrink-0 rounded-[24px] border border-line-soft bg-surface p-5 transition-colors duration-300 hover:bg-[#f9f8f6]"
            >
              <div className="h-[128px] overflow-hidden rounded-[14px] bg-white">{c.art}</div>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.025em]">{c.t}</h3>
              <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-2">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
