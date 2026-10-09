import Reveal from "@/components/ui/Reveal";
import { BusGlyph, TrainGlyph, WalkGlyph } from "@/components/ui/Bits";

const ITEMS = [
  { label: "Metro", color: "var(--color-metro-blue)", icon: "train" },
  { label: "Local & suburban trains", color: "#9b2335", icon: "train" },
  { label: "City bus", color: "var(--color-metro-green)", icon: "bus" },
  { label: "Interchanges", color: "var(--color-ink)", icon: "swap" },
  { label: "Walking legs", color: "var(--color-ink-2)", icon: "walk" },
] as const;

export default function TrustStrip() {
  return (
    <section className="px-6 pt-16">
      <Reveal>
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[14.5px] text-ink-3">
          {ITEMS.map((it) => (
            <span key={it.label} className="flex items-center gap-2">
              <span style={{ color: it.color }}>
                {it.icon === "bus" ? (
                  <BusGlyph className="size-[17px]" />
                ) : it.icon === "walk" ? (
                  <WalkGlyph className="size-[17px]" />
                ) : it.icon === "swap" ? (
                  <span className="text-[15px]">⇄</span>
                ) : (
                  <TrainGlyph className="size-[17px]" />
                )}
              </span>
              {it.label}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
