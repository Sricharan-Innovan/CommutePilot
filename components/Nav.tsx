"use client";

import { useEffect, useState } from "react";
import { TrainGlyph } from "@/components/ui/Bits";

const LINKS = [
  { href: "#problem", label: "The problem" },
  { href: "#vote", label: "Vote" },
  { href: "#fix", label: "What it does" },
  { href: "#compare", label: "vs Maps" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-white/88 backdrop-blur-[14px] backdrop-saturate-[1.4]">
      <div
        className={`mx-auto flex max-w-[1240px] items-center gap-7 px-6 transition-all duration-300 ${
          scrolled ? "h-[58px]" : "h-[68px]"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.03em]">
          <span className="grid size-[30px] place-items-center rounded-[9px] bg-ink text-white">
            <TrainGlyph className="size-[20px]" />
          </span>
          commutepilot
        </a>

        <nav className="hidden items-center gap-6 text-[14.5px] text-ink-2 lg:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative transition-colors hover:text-ink after:absolute after:-bottom-[5px] after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#vote"
          className="ml-auto flex h-9 items-center gap-2 overflow-hidden rounded-full bg-ink px-4 text-[14px] font-medium whitespace-nowrap text-white transition-transform duration-200 hover:-translate-y-px"
        >
          <span
            className={`overflow-hidden transition-all duration-300 ${
              scrolled ? "w-[7px] opacity-100" : "w-0 opacity-0"
            }`}
          >
            <i className="anim-blink block size-[6px] rounded-full bg-alert" />
          </span>
          <span className="hidden sm:inline">Vote on it</span>
          <span className="sm:hidden">Vote</span>
        </a>
      </div>
    </header>
  );
}
