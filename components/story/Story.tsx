"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SCENES, TOTAL_MS, sceneAt, type Pose } from "./scenes";
import { useOnScreen, useReducedMotion } from "@/lib/hooks";

/* ────────────────────────────────────────────────────────────
   A forty-second explainer, drawn as SVG and driven by one
   clock: the problem, the turn, the product. No video file,
   no images — so it is sharp at any size and weighs nothing.
   ──────────────────────────────────────────────────────────── */

type Props = {
  /** `clean` hides the controls — use it for the full-screen page you record. */
  clean?: boolean;
  autoplay?: boolean;
};

const BUILDINGS = [
  { w: 70, h: 120 },
  { w: 44, h: 72 },
  { w: 92, h: 160 },
  { w: 56, h: 96 },
  { w: 78, h: 134 },
  { w: 40, h: 60 },
  { w: 100, h: 180 },
  { w: 60, h: 104 },
];

function Face({ pose, blink }: { pose: Pose; blink: boolean }) {
  const closed = pose === "dozing" || pose === "relaxed" || blink;
  return (
    <g>
      {closed ? (
        <>
          <path d="M-13 -3q5 5 10 0" stroke="#111" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M5 -3q5 5 10 0" stroke="#111" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="-8" cy="-3" r="2.8" fill="#111" />
          <circle cx="10" cy="-3" r="2.8" fill="#111" />
        </>
      )}
      {pose === "panic" ? (
        <ellipse cx="1" cy="11" rx="5" ry="6" fill="#111" opacity="0.8" />
      ) : pose === "standing" || pose === "alerted" ? (
        <path d="M-7 9q8 7 16 0" stroke="#111" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M-6 10h12" stroke="#111" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

function Character({
  pose,
  t,
  blink,
}: {
  pose: Pose;
  t: number;
  blink: boolean;
}) {
  const breathe = Math.sin(t / 620) * 1.6;
  const standing = pose === "standing";

  // head angle: up when checking, down when on the phone, lolling when asleep
  const headAngle =
    pose === "lookup" ? -17 : pose === "dozing" ? 13 : pose === "panic" ? -12 : pose === "relaxed" ? 6 : 8;

  const bodyY = standing ? -52 : 0;
  const bodyX = standing ? 190 : 0;

  return (
    <g transform={`translate(${430 + bodyX} ${300 + bodyY})`}>
      {/* legs */}
      {standing ? (
        <>
          <rect x="-26" y="78" width="21" height="76" rx="10" fill="#2f3a4a" />
          <rect x="6" y="78" width="21" height="76" rx="10" fill="#3b4759" />
        </>
      ) : (
        <>
          <rect x="-26" y="72" width="78" height="22" rx="11" fill="#2f3a4a" />
          <rect x="30" y="80" width="22" height="64" rx="11" fill="#3b4759" />
          <rect x="24" y="136" width="34" height="13" rx="6" fill="#1b2029" />
        </>
      )}

      {/* torso */}
      <g transform={`translate(0 ${breathe})`}>
        <rect x="-36" y="-6" width="72" height="88" rx="26" fill="#1f66e0" />
        {/* bag strap */}
        <path d="M-30 6 L22 58" stroke="#16458f" strokeWidth="7" strokeLinecap="round" />

        {/* arm + phone */}
        {pose === "relaxed" || pose === "standing" ? (
          <path
            d="M28 14q22 16 10 44"
            stroke="#1f66e0"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
        ) : pose === "panic" ? (
          <path
            d="M26 12q30 -8 34 -34"
            stroke="#1f66e0"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path d="M26 16q26 2 30 -14" stroke="#1f66e0" strokeWidth="18" fill="none" strokeLinecap="round" />
        )}

        {/* the phone in hand, except when it is in the pocket */}
        {pose !== "relaxed" && pose !== "standing" && pose !== "panic" && pose !== "alerted" && (
          <g transform="translate(56 -8) rotate(-12)">
            <rect x="-11" y="-18" width="22" height="36" rx="5" fill="#111" />
            <rect x="-8.5" y="-15" width="17" height="30" rx="3" fill="#dfe9ff" />
          </g>
        )}

        {/* the pocket buzzing */}
        {pose === "alerted" && (
          <g transform="translate(-16 54)">
            <rect x="-9" y="-15" width="18" height="30" rx="4" fill="#0f1115" opacity="0.9" />
            <rect x="-9" y="-15" width="18" height="30" rx="4" fill="#e9a225" opacity="0.55">
              <animate attributeName="opacity" values="0.15;0.7;0.15" dur="0.7s" repeatCount="indefinite" />
            </rect>
            {[0, 1].map((k) => (
              <circle key={k} cx="0" cy="0" r="16" fill="none" stroke="#e9a225" strokeWidth="2" opacity="0">
                <animate
                  attributeName="r"
                  values="14;30"
                  dur="1.4s"
                  begin={`${k * 0.7}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.65;0"
                  dur="1.4s"
                  begin={`${k * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}

        {/* head */}
        <g transform={`translate(0 -26) rotate(${headAngle})`}>
          <circle cx="0" cy="-16" r="30" fill="#f1c9a5" />
          <path d="M-30 -22a30 30 0 0 1 60 0q-30 -14 -60 0Z" fill="#2b2118" />
          <g transform="translate(0 -14)">
            <Face pose={pose} blink={blink} />
          </g>
          {/* earphones once the phone is away */}
          {(pose === "relaxed" || pose === "alerted" || pose === "standing") && (
            <>
              <circle cx="-27" cy="-14" r="5.5" fill="#111" />
              <circle cx="27" cy="-14" r="5.5" fill="#111" />
            </>
          )}
        </g>
      </g>
    </g>
  );
}

export default function Story({ clean = false, autoplay = true }: Props) {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.35);
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const raf = useRef(0);
  const last = useRef(0);

  // ?t=19 jumps straight to that second — handy when recording one scene
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("t");
    if (q) setT(Math.max(0, Math.min(TOTAL_MS - 1, Number(q) * 1000)));
  }, []);

  useEffect(() => {
    const run = !reduced && playing && (clean || onScreen);
    if (!run) {
      cancelAnimationFrame(raf.current);
      last.current = 0;
      return;
    }
    const tick = (now: number) => {
      if (!last.current) last.current = now;
      const dt = now - last.current;
      last.current = now;
      setT((v) => (v + dt) % TOTAL_MS);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [playing, onScreen, clean, reduced]);

  const { i, scene, p } = sceneAt(reduced ? 0 : t);
  const replay = useCallback(() => {
    setT(0);
    setPlaying(true);
  }, []);

  // derived bits of business
  const checks = scene.checks ? Math.min(18, Math.floor(p * 20)) : 0;
  const scroll = (t / 14) % 420;
  const blink = Math.sin(t / 900) > 0.985;
  const pose: Pose = scene.pose === "lookup" && scene.checks ? (Math.sin(t / 330) > 0 ? "lookup" : "phone") : scene.pose;

  const missedX = scene.missed ? 760 - Math.min(1, p * 1.6) * 900 : 9999;
  const doorOpen = scene.doors ? Math.min(1, Math.max(0, (p - 0.25) * 2.4)) : 0;

  return (
    <div ref={ref} className="w-full">
      <div className="relative overflow-hidden rounded-[22px] bg-[#0f1115]">
        <svg viewBox="0 0 960 540" className="block w-full shrink-0" role="img" aria-label={`${scene.caption} ${scene.sub ?? ""}`}>
          <defs>
            <clipPath id="win">
              <rect x="60" y="70" width="840" height="190" rx="18" />
            </clipPath>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2740" />
              <stop offset="100%" stopColor="#2b3a56" />
            </linearGradient>
            <linearGradient id="car" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#171a21" />
              <stop offset="100%" stopColor="#101319" />
            </linearGradient>
          </defs>

          {/* carriage */}
          <rect x="0" y="0" width="960" height="540" fill="url(#car)" />

          {/* window */}
          <g clipPath="url(#win)">
            <rect x="60" y="70" width="840" height="190" fill="url(#sky)" />
            {[0, 1, 2].map((rep) =>
              BUILDINGS.map((b, n) => {
                const x = 60 + rep * 420 + n * 54 - scroll;
                return (
                  <rect
                    key={`${rep}-${n}`}
                    x={x}
                    y={260 - b.h}
                    width={b.w}
                    height={b.h}
                    rx="4"
                    fill="#0e1626"
                    opacity={0.75}
                  />
                );
              }),
            )}
            {/* the stop that goes past */}
            {scene.missed && (
              <g transform={`translate(${missedX} 120)`}>
                <rect x="-70" y="-26" width="140" height="52" rx="10" fill="#e2362f" />
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="20"
                  fontWeight="600"
                  letterSpacing="0.5"
                >
                  YOUR STOP
                </text>
              </g>
            )}
          </g>
          <rect
            x="60"
            y="70"
            width="840"
            height="190"
            rx="18"
            fill="none"
            stroke="#262b35"
            strokeWidth="8"
          />

          {/* bench */}
          <rect x="250" y="368" width="470" height="26" rx="13" fill="#2a303c" />
          <rect x="250" y="300" width="470" height="70" rx="16" fill="#222733" />
          {/* floor */}
          <rect x="0" y="470" width="960" height="70" fill="#15181f" />

          {/* doors, at the end */}
          {scene.doors && (
            <g>
              <rect x="700" y="250" width="110" height="230" rx="8" fill="#1b1f28" />
              <rect
                x={700 - doorOpen * 54}
                y="250"
                width="56"
                height="230"
                rx="6"
                fill="#39414f"
                style={{ transition: "none" }}
              />
              <rect
                x={754 + doorOpen * 54}
                y="250"
                width="56"
                height="230"
                rx="6"
                fill="#39414f"
              />
            </g>
          )}

          <Character pose={pose} t={t} blink={blink} />

          {/* the counter that climbs while he keeps checking */}
          {scene.checks && (
            <g transform="translate(700 150)" opacity={Math.min(1, p * 4)}>
              <rect x="-96" y="-40" width="192" height="80" rx="18" fill="#e2362f" />
              <text x="0" y="-6" textAnchor="middle" fill="#fff" fontSize="34" fontWeight="700">
                {checks}
              </text>
              <text x="0" y="22" textAnchor="middle" fill="#ffd9d7" fontSize="14">
                times you looked up
              </text>
            </g>
          )}

          {/* zzz while dozing */}
          {scene.pose === "dozing" && (
            <g fill="#8c93a3" fontSize="26" fontWeight="600">
              <text x="470" y="200" opacity={0.9 - ((t / 900) % 1) * 0.6}>
                z
              </text>
              <text x="496" y="176" opacity={0.7 - ((t / 1100) % 1) * 0.5}>
                z
              </text>
              <text x="520" y="152" opacity={0.5 - ((t / 1300) % 1) * 0.4}>
                z
              </text>
            </g>
          )}

          {/* the morning prompt */}
          {scene.notification && (
            <g transform={`translate(640 ${120 + (1 - Math.min(1, p * 3)) * 24})`} opacity={Math.min(1, p * 3)}>
              <rect x="-150" y="-54" width="300" height="108" rx="20" fill="#fff" />
              <circle cx="-122" cy="-28" r="11" fill="#111" />
              <text x="-104" y="-23" fill="#555" fontSize="13">
                CommutePilot
              </text>
              <text x="-122" y="2" fill="#111" fontSize="17" fontWeight="600">
                Heading in on the usual route?
              </text>
              <g transform="translate(-122 16)">
                <rect x="0" y="0" width="86" height="30" rx="9" fill="#111" />
                <text x="43" y="20" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="500">
                  Start
                </text>
                <rect x="94" y="0" width="70" height="30" rx="9" fill="#eceae6" />
                <text x="129" y="20" textAnchor="middle" fill="#555" fontSize="13">
                  WFH
                </text>
                <rect x="174" y="0" width="70" height="30" rx="9" fill="#eceae6" />
                <text x="209" y="20" textAnchor="middle" fill="#555" fontSize="13">
                  Later
                </text>
              </g>
            </g>
          )}

          {/* one stop before */}
          {scene.alert && (
            <g transform={`translate(650 ${140 + (1 - Math.min(1, p * 3)) * 20})`} opacity={Math.min(1, p * 3)}>
              <rect x="-150" y="-50" width="300" height="100" rx="20" fill="#fff8e9" stroke="#e9a225" strokeWidth="2" />
              <circle cx="-120" cy="-24" r="7" fill="#e9a225">
                <animate attributeName="r" values="5;9;5" dur="1.1s" repeatCount="indefinite" />
              </circle>
              <text x="-104" y="-19" fill="#9c6a12" fontSize="13" fontWeight="700" letterSpacing="1">
                ONE STOP BEFORE
              </text>
              <text x="-120" y="10" fill="#111" fontSize="20" fontWeight="600">
                Your stop is next.
              </text>
              <text x="-120" y="34" fill="#555" fontSize="14">
                Stand up, you have two minutes.
              </text>
            </g>
          )}

          {/* end card */}
          {scene.endCard && (
            <g opacity={Math.min(1, p * 3)}>
              <rect x="0" y="0" width="960" height="540" fill="#fff" />
              <g transform="translate(480 230)">
                <rect x="-44" y="-44" width="88" height="88" rx="26" fill="#111" />
                <rect x="-22" y="-26" width="44" height="46" rx="14" fill="#FFE44D" />
                <rect x="-14" y="-18" width="28" height="16" rx="5" fill="#111" />
                <circle cx="-11" cy="8" r="5" fill="#111" />
                <circle cx="11" cy="8" r="5" fill="#111" />
              </g>
              <text x="480" y="340" textAnchor="middle" fill="#111" fontSize="52" fontWeight="600" letterSpacing="-2">
                commutepilot
              </text>
              <text x="480" y="386" textAnchor="middle" fill="#8c8c8c" fontSize="24" letterSpacing="-0.5">
                Stop watching the stops. Use the ride instead.
              </text>
              <g transform="translate(480 440)">
                <rect x="-150" y="-22" width="300" height="44" rx="22" fill="#111" />
                <text x="0" y="6" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="500">
                  Is this your commute too? Vote →
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* caption */}
        {!scene.endCard && (
          <div
            key={scene.id}
            className="anim-pop static min-h-[86px] px-5 pt-2 pb-7 text-center sm:absolute sm:inset-x-0 sm:bottom-0 sm:min-h-0 sm:px-8"
          >
            <p className="text-[clamp(17px,2.8vw,34px)] leading-tight font-semibold tracking-[-0.03em] text-white">
              {scene.caption}
            </p>
            {scene.sub && (
              <p className="mt-1.5 text-[clamp(12.5px,1.5vw,17px)] text-white/55">{scene.sub}</p>
            )}
          </div>
        )}

        {/* act marker */}
        {!scene.endCard && (
          <span
            className={`absolute top-5 left-6 rounded-full px-3 py-1 text-[11.5px] font-medium tracking-[0.08em] uppercase transition-colors duration-500 ${
              scene.act === "problem"
                ? "bg-metro-red/20 text-[#ff9b96]"
                : scene.act === "turn"
                  ? "bg-white/15 text-white/80"
                  : "bg-metro-green/20 text-[#5fe0a6]"
            }`}
          >
            {scene.act === "problem" ? "the problem" : scene.act === "turn" ? "the turn" : "with commutepilot"}
          </span>
        )}

        {/* progress */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <span
            className="block h-full bg-white/70"
            style={{ width: `${(t / TOTAL_MS) * 100}%` }}
          />
        </div>
      </div>

      {!clean && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] text-ink-3">
          <span className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((v) => !v)}
              className="rounded-full border border-line-soft bg-surface px-3 py-1.5 transition-colors hover:text-ink"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={replay}
              className="rounded-full border border-line-soft bg-surface px-3 py-1.5 transition-colors hover:text-ink"
            >
              Replay
            </button>
          </span>
          <span className="tnum">
            {Math.ceil((TOTAL_MS - t) / 1000)}s left · scene {i + 1} of {SCENES.length}
          </span>
        </div>
      )}
    </div>
  );
}
