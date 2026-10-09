"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/* A highlighter stroke that sweeps across the text when it scrolls in —
   two passes with uneven ends, the way a real marker leaves ink. The ink
   is a background on the text itself, so it wraps line by line. */
export default function InkHighlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6);
  return (
    <span ref={ref} className={`ink-hl ${inView ? "is-on" : ""} ${className}`}>
      {children}
    </span>
  );
}
