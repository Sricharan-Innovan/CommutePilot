import type { ReactNode } from "react";

/* ---------- small shared pieces ---------- */

export function TelegramIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21.5 4.3 2.9 11.4c-1.1.4-1.1 1.1-.2 1.4l4.7 1.5 1.8 5.5c.2.6.4.8 1 .8.5 0 .7-.2 1-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.5-1.8-1.5-1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TrainGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="5.5" y="3" width="13" height="14.5" rx="4.4" fill="currentColor" />
      <rect x="8" y="5.8" width="8" height="4.6" rx="1.7" className="fill-white" />
      <circle cx="9.6" cy="13.6" r="1.35" className="fill-white" />
      <circle cx="14.4" cy="13.6" r="1.35" className="fill-white" />
      <path
        d="M8.6 17.8 6.8 21M15.4 17.8 17.2 21"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BusGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="13.5" rx="3.4" fill="currentColor" />
      <rect x="6.3" y="6" width="11.4" height="4.4" rx="1.4" className="fill-white" />
      <circle cx="8" cy="13.6" r="1.3" className="fill-white" />
      <circle cx="16" cy="13.6" r="1.3" className="fill-white" />
      <path d="M7.5 17v2.4M16.5 17v2.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function WalkGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13" cy="4.2" r="1.9" fill="currentColor" stroke="none" />
      <path d="M9 21.5l2.6-5.1.6-3.9-2.4 1.8-1.3 2.9" />
      <path d="M12.2 12.5 15 15l.8 6.5" />
      <path d="m11 8.6 3.6-1.3 2.1 2.6 2.3.7" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[14px] text-ink-3">{children}</p>;
}

/** The reference's signature heading: a solid line, then a grey one. */
export function DualHeading({
  top,
  bottom,
  className = "",
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  return (
    <h2 className={`display-lg mt-2.5 ${className}`}>
      {top}
      <br />
      <span className="text-[#a5a3a0]">{bottom}</span>
    </h2>
  );
}

export function LineDot({
  line,
  size = 11,
  active = false,
}: {
  line: "red" | "blue" | "green" | "walk" | "swap" | "end";
  size?: number;
  active?: boolean;
}) {
  const color =
    line === "red"
      ? "var(--color-metro-red)"
      : line === "blue"
        ? "var(--color-metro-blue)"
        : line === "green"
          ? "var(--color-metro-green)"
          : line === "end"
            ? "var(--color-metro-green)"
            : line === "swap"
              ? "var(--color-ink)"
              : "var(--color-ink-3)";
  return (
    <span
      aria-hidden="true"
      className="block shrink-0 rounded-full border-[2.5px] bg-white transition-all duration-500"
      style={{
        width: size,
        height: size,
        borderColor: active ? color : "var(--color-surface-3)",
        boxShadow: active ? `0 0 0 4px color-mix(in srgb, ${color} 16%, transparent)` : "none",
        transform: active ? "scale(1.18)" : "none",
      }}
    />
  );
}

export function Chip({
  children,
  tone = "plain",
}: {
  children: ReactNode;
  tone?: "plain" | "red" | "blue" | "green" | "dark" | "alert";
}) {
  const map: Record<string, string> = {
    plain: "bg-white border-line-soft text-ink-2",
    red: "bg-white border-metro-red/30 text-metro-red",
    blue: "bg-white border-metro-blue/30 text-metro-blue",
    green: "bg-white border-metro-green/30 text-metro-green",
    dark: "bg-ink border-ink text-white",
    alert: "bg-[#fff8e9] border-alert/40 text-alert-ink",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] whitespace-nowrap ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export function LiveTag({ label = "tracking" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-white px-2.5 py-[3px] text-[11.5px] text-ink-2">
      <i className="anim-blink size-[6px] rounded-full bg-metro-green" />
      {label}
    </span>
  );
}
