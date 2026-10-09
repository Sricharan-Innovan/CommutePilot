"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-6 pt-[168px]" id="faq">
      <div className="mx-auto max-w-[780px]">
        <Reveal>
          <h2 className="display-lg">Questions.</h2>
        </Reveal>

        <Reveal delay={0.06} className="mt-9 border-t border-line-soft">
          {FAQS.map((f, n) => {
            const on = open === n;
            return (
              <div key={f.q} className="border-b border-line-soft">
                <button
                  onClick={() => setOpen(on ? null : n)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-medium tracking-[-0.025em] transition-colors hover:text-ink-2"
                >
                  {f.q}
                  <span className="relative size-[13px] shrink-0" aria-hidden="true">
                    <i className="absolute top-[5.5px] left-0 h-[1.8px] w-[13px] rounded bg-ink" />
                    <i
                      className={`absolute top-0 left-[5.5px] h-[13px] w-[1.8px] rounded bg-ink transition-transform duration-300 ${
                        on ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-400 ease-[cubic-bezier(.2,.7,.2,1)] ${
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-7 text-[16px] text-ink-2">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
