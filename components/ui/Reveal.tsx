"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
};

/** Fade + rise on first scroll into view, staggered by `delay` seconds. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      data-in={inView}
      className={`reveal ${className}`}
      style={{ ...style, "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
