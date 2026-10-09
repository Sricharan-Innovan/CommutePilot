import { PROTOTYPE_URL } from "@/lib/config";
import { TrainGlyph } from "@/components/ui/Bits";

const COLS = [
  {
    h: "The idea",
    links: [
      { l: "The problem", h: "#problem" },
      { l: "What it does", h: "#fix" },
      { l: "One stop early", h: "#alert" },
      { l: "Compared to Maps", h: "#compare" },
    ],
  },
  {
    h: "The product",
    links: [
      { l: "What you get", h: "#features" },
      { l: "How it works", h: "#how" },
      { l: "Where it is today", h: "#status" },
      { l: "Try the prototype", h: PROTOTYPE_URL },
    ],
  },
  {
    h: "More",
    links: [
      { l: "Enter your email", h: "#join" },
      { l: "FAQ", h: "#faq" },
      { l: "Privacy", h: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line-soft px-6 py-14">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-12">
        <div className="flex max-w-[300px] gap-3">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-[9px] bg-ink text-white">
            <TrainGlyph className="size-[20px]" />
          </span>
          <p className="text-[14.5px] leading-[1.5]">
            The commute autopilot.
            <br />
            <span className="text-ink-3">
              For the route you already know by heart — any city, any mode.
            </span>
          </p>
        </div>

        <nav className="flex flex-wrap gap-14" aria-label="Footer">
          {COLS.map((c) => (
            <div key={c.h} className="flex flex-col gap-2.5">
              <h3 className="text-[12.5px] font-medium text-ink-3">{c.h}</h3>
              {c.links.map((l) => (
                <a
                  key={l.l}
                  href={l.h}
                  {...(l.h.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                  className="text-[14.5px] text-ink-2 transition-colors hover:text-ink"
                >
                  {l.l}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1240px] flex-wrap justify-between gap-5 text-[12.5px] text-ink-3">
        <span>© {new Date().getFullYear()} CommutePilot</span>
        <span>Built by someone who rides it twice a day, and got tired of watching.</span>
      </div>
    </footer>
  );
}
