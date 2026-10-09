"use client";

import { useEffect, useState } from "react";
import { countView, forDisplay, readVotes } from "@/lib/votes";
import InkHighlight from "@/components/ui/InkHighlight";

/* The line under the headline. Both numbers are live and real: how many
   people voted that this is their problem, and how many have read the
   page. Nothing is seeded — the page has to earn the number. */

export default function HeroProof() {
  const [votes, setVotes] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    readVotes()
      .then((t) => alive && setVotes(forDisplay(t).yes + t.sometimes))
      .catch(() => alive && setVotes(0));
    countView()
      .then((v) => alive && setViews(v))
      .catch(() => alive && setViews(0));
    return () => {
      alive = false;
    };
  }, []);

  // hold the space so nothing jumps when the numbers land
  if (votes === null) return <div className="h-[52px]" />;

  return (
    <div className="min-h-[52px]">
      <p className="mx-auto max-w-[36ch] text-[17px] leading-[1.75] text-ink sm:max-w-none">
        {votes > 0 ? (
          <InkHighlight>
            <b className="font-semibold">
              {votes.toLocaleString()} {votes === 1 ? "person" : "people"}
            </b>{" "}
            found this a real problem they are struggling with.
          </InkHighlight>
        ) : (
          <InkHighlight>
            <b className="font-semibold">Be the first</b> to call this a real problem you are struggling
            with.
          </InkHighlight>
        )}
      </p>

      {views !== null && views > 0 && (
        <p className="mt-2 text-[13px] text-ink-3">
          {views.toLocaleString()} {views === 1 ? "person has" : "people have"} read this page so far.
        </p>
      )}
    </div>
  );
}
