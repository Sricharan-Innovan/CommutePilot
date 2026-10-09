"use client";

import { useState } from "react";
import { WAITLIST_ENDPOINT, WAITLIST_FALLBACK_URL, PROTOTYPE_URL } from "@/lib/config";

type Props = {
  /** "hero" sits on white, "panel" sits on a surface card. */
  tone?: "hero" | "panel";
  cta?: string;
  note?: string;
};

export default function WaitlistForm({
  tone = "hero",
  cta = "Get early access",
  note = "One email when there is something to try. Nothing else, ever.",
}: Props) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    // No endpoint configured yet — hand the person somewhere real rather
    // than pretending the address was saved.
    if (!WAITLIST_ENDPOINT) {
      const url = WAITLIST_FALLBACK_URL || PROTOTYPE_URL;
      window.open(url, "_blank", "noopener");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, city, source: "landing" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div
        className={`flex items-center gap-3 rounded-[18px] border px-5 py-4 text-left ${
          tone === "hero" ? "border-metro-green/30 bg-[#eefaf3]" : "border-line-soft bg-white"
        }`}
      >
        <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-metro-green text-white">
          <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-[14.5px]">
          <b className="font-semibold">You are on the list.</b>{" "}
          <span className="text-ink-2">
            You will hear from me when there is a build worth your time.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={submit}
        className={`flex flex-col gap-2 rounded-[18px] p-2 sm:flex-row sm:items-center ${
          tone === "hero" ? "border border-line-soft bg-surface" : "border border-line-soft bg-white"
        }`}
      >
        <label className="sr-only" htmlFor={`email-${tone}`}>
          Email address
        </label>
        <input
          id={`email-${tone}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-11 min-w-0 flex-[1.3] rounded-[12px] bg-white px-4 text-[15px] outline-none placeholder:text-ink-4 focus:ring-2 focus:ring-ink/15 sm:bg-transparent"
        />
        <span className="hidden h-6 w-px bg-line-soft sm:block" />
        <label className="sr-only" htmlFor={`city-${tone}`}>
          Which city do you ride in?
        </label>
        <input
          id={`city-${tone}`}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="which city do you ride in?"
          className="h-11 min-w-0 flex-1 rounded-[12px] bg-white px-4 text-[15px] outline-none placeholder:text-ink-4 focus:ring-2 focus:ring-ink/15 sm:bg-transparent"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-11 shrink-0 rounded-[12px] bg-ink px-6 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-px disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : cta}
        </button>
      </form>

      <p className="mt-3 text-[13px] text-ink-3">
        {state === "error" ? "That did not go through — try again in a moment." : note}
      </p>
    </div>
  );
}
