"use client";

import { useEffect, useState } from "react";
import {
  castVote,
  forDisplay,
  rememberVote,
  readVotes,
  savedVote,
  totalOf,
  VOTE_OPTIONS,
  type Tally,
  type VoteKey,
} from "@/lib/votes";
import { useInView } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import WaitlistForm from "@/components/WaitlistForm";
import { Eyebrow } from "@/components/ui/Bits";

const TONE: Record<VoteKey, string> = {
  yes: "var(--color-metro-green)",
  sometimes: "var(--color-alert)",
  no: "var(--color-ink-3)",
};

function Bar({
  option,
  count,
  total,
  mine,
}: {
  option: (typeof VOTE_OPTIONS)[number];
  count: number;
  total: number;
  mine: boolean;
}) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div
      className={`rounded-[16px] border px-4 py-3.5 transition-colors duration-500 ${
        mine ? "border-ink/25 bg-surface" : "border-line-soft bg-white"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[14.5px] font-medium">
          {option.label}
          {mine && <span className="ml-2 text-[11.5px] font-normal text-ink-3">your answer</span>}
        </span>
        <span className="tnum shrink-0 text-[14.5px] font-semibold">{pct}%</span>
      </div>
      <div className="mt-2.5 h-[8px] overflow-hidden rounded-full bg-surface-2">
        <span
          className="block h-full rounded-full transition-[width] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ width: `${pct}%`, background: TONE[option.key] }}
        />
      </div>
      <p className="tnum mt-1.5 text-[12px] text-ink-3">
        {count} {count === 1 ? "person" : "people"}
      </p>
    </div>
  );
}

export default function VotePanel() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [tally, setTally] = useState<Tally | null>(null);
  const [mine, setMine] = useState<VoteKey | null>(null);
  const [busy, setBusy] = useState<VoteKey | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setMine(savedVote());
  }, []);

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    readVotes()
      .then((t) => alive && setTally(forDisplay(t)))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [inView]);

  async function vote(choice: VoteKey) {
    if (mine || busy) return;
    setBusy(choice);
    try {
      const t = await castVote(choice);
      setTally(forDisplay(t));
      setMine(choice);
      rememberVote(choice);
    } catch {
      setFailed(true);
    } finally {
      setBusy(null);
    }
  }

  const total = tally ? totalOf(tally) : 0;
  const voted = Boolean(mine);

  return (
    <section className="px-6 pt-[168px]" id="vote">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Settle it</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-2.5">
              Is this a real problem?
              <br />
              <span className="text-[#a5a3a0]">Or is it just me?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[56ch] text-ink-2">
              One tap, no email needed. I am deciding whether to build this properly, and this is the
              number I am deciding on.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-12">
          <div ref={ref} className="rounded-[28px] bg-surface-2 p-[clamp(8px,1.2vw,16px)]">
            <div className="rounded-[20px] bg-white p-6 sm:p-8">
              {/* running total */}
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
                <div>
                  <p className="tnum text-[clamp(38px,5vw,54px)] leading-none font-semibold tracking-[-0.05em]">
                    {failed ? "—" : tally === null ? "···" : total.toLocaleString()}
                  </p>
                  <p className="mt-1.5 text-[14px] text-ink-3">
                    {failed
                      ? "the live count is unreachable right now"
                      : total === 1
                        ? "person has answered so far"
                        : "people have answered so far"}
                  </p>
                </div>
                {!failed && tally !== null && total > 0 && (
                  <p className="max-w-[34ch] text-[14px] text-ink-2">
                    <b className="font-semibold text-metro-green tnum">
                      {Math.round((tally.yes / total) * 100)}%
                    </b>{" "}
                    say it is their commute too.
                  </p>
                )}
              </div>

              {/* question */}
              <p className="mt-6 text-[17px] font-medium tracking-[-0.02em]">
                Do you spend your ride keeping half an eye on where you are?
              </p>

              <div className="mt-4 grid gap-2">
                {voted || (tally && failed)
                  ? VOTE_OPTIONS.map((o) => (
                      <Bar
                        key={o.key}
                        option={o}
                        count={tally ? tally[o.key] : 0}
                        total={total}
                        mine={mine === o.key}
                      />
                    ))
                  : VOTE_OPTIONS.map((o) => (
                      <button
                        key={o.key}
                        onClick={() => vote(o.key)}
                        disabled={Boolean(busy)}
                        className="group flex items-center gap-4 rounded-[16px] border border-line-soft bg-white px-4 py-4 text-left transition-all duration-200 hover:-translate-y-px hover:border-line-mid hover:bg-surface disabled:opacity-60"
                      >
                        <span
                          className="size-[14px] shrink-0 rounded-full border-[3px] transition-all duration-200"
                          style={{ borderColor: TONE[o.key] }}
                        />
                        <span className="min-w-0 flex-1">
                          <b className="block text-[15px] font-medium">{o.label}</b>
                          <span className="block text-[13px] text-ink-3">{o.sub}</span>
                        </span>
                        <span className="shrink-0 text-[13px] text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5">
                          {busy === o.key ? "…" : "→"}
                        </span>
                      </button>
                    ))}
              </div>

              {failed && !voted && (
                <p className="mt-4 text-[13px] text-ink-3">
                  The vote counter did not answer. Your browser may be blocking it — the email below
                  works either way.
                </p>
              )}

              {/* after voting */}
              <div
                className={`grid transition-all duration-500 ${
                  voted ? "mt-7 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="rounded-[18px] bg-surface p-5">
                    <p className="text-[15px]">
                      <b className="font-semibold">Thanks — that is logged.</b>{" "}
                      <span className="text-ink-2">
                        {mine === "no"
                          ? "Useful to know. If it is not a problem for you, that is a real answer too."
                          : "If you want it the day it works, leave your email and that is the last you will hear from me until then."}
                      </span>
                    </p>
                    <div className="mt-4">
                      <WaitlistForm
                        tone="panel"
                        cta="Enter your email"
                        note="One email when there is something to try. Nothing else."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-5 text-center text-[12.5px] text-ink-3">
            One vote per browser. The count is live and shared — it is the same number I am looking at.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
