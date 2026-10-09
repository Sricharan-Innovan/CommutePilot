"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -6% 0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/** True only while the element is on screen — used to pause simulations. */
export function useOnScreen<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setOnScreen(entries[0].isIntersecting), {
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, onScreen };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** setInterval that respects `active` and reduced motion. */
export function useInterval(cb: () => void, ms: number, active = true) {
  const saved = useRef(cb);
  saved.current = cb;
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const id = window.setInterval(() => saved.current(), ms);
    return () => window.clearInterval(id);
  }, [ms, active, reduced]);
}

/** A step counter that advances while visible — the engine behind every simulation here. */
export function useSteps(length: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  useInterval(() => setI((n) => (n + 1) % length), ms, active);
  return [i, setI] as const;
}

/** Counts up to `target` once visible. */
export function useCountUp(target: number, run: boolean, duration = 1100) {
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration, reduced]);

  return n;
}

/** A running trip clock, mm:ss, that only ticks while visible. */
export function useTripClock(startSeconds: number, active: boolean) {
  const [s, setS] = useState(startSeconds);
  useInterval(() => setS((v) => v + 1), 1000, active);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/** Slowly drifting number, like the live rider counter in the console header. */
export function useDrift(start: number, active: boolean, step = 3, ms = 2200) {
  const [n, setN] = useState(start);
  useInterval(() => setN((v) => v + Math.ceil(Math.random() * step)), ms, active);
  return n;
}
