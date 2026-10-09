import { VOTE_API, VOTE_DISPLAY_OFFSET, VOTE_NAMESPACE } from "./config";

export type VoteKey = "yes" | "sometimes" | "no";

export const VOTE_OPTIONS: { key: VoteKey; label: string; sub: string }[] = [
  {
    key: "yes",
    label: "Yes — that is my commute",
    sub: "I check, I count stops, I cannot switch off on the ride",
  },
  {
    key: "sometimes",
    label: "Sometimes",
    sub: "On long rides, late nights or routes I do not know well",
  },
  {
    key: "no",
    label: "No, never thought about it",
    sub: "I get off at the right stop and I do not think about it again",
  },
];

export type Tally = Record<VoteKey, number>;

const EMPTY: Tally = { yes: 0, sometimes: 0, no: 0 };
const STORE_KEY = "commutepilot.vote.v1";

/** Counter keys must be at least three characters, so "no" is spelled out. */
const REMOTE: Record<VoteKey, string> = {
  yes: "yes-daily",
  sometimes: "sometimes",
  no: "no-never",
};

async function hit(path: string, key: VoteKey): Promise<number> {
  const res = await fetch(`${VOTE_API}/${path}/${VOTE_NAMESPACE}/${REMOTE[key]}`, { cache: "no-store" });
  if (!res.ok) return 0;
  const data = (await res.json()) as { value?: number };
  return typeof data.value === "number" ? data.value : 0;
}

/** Current tally, without voting. A key that has never been hit reads as 0. */
export async function readVotes(): Promise<Tally> {
  const keys: VoteKey[] = ["yes", "sometimes", "no"];
  const values = await Promise.all(
    keys.map((k) => hit("get", k).catch(() => 0)),
  );
  return { yes: values[0], sometimes: values[1], no: values[2] };
}

/** Increment one option and return the updated tally. */
export async function castVote(choice: VoteKey): Promise<Tally> {
  const mine = await hit("hit", choice);
  const rest = await readVotes();
  return { ...EMPTY, ...rest, [choice]: Math.max(mine, rest[choice]) };
}

/** One vote per browser — a soft guard, not security. */
export function savedVote(): VoteKey | null {
  try {
    const v = localStorage.getItem(STORE_KEY);
    return v === "yes" || v === "sometimes" || v === "no" ? v : null;
  } catch {
    return null;
  }
}

export function rememberVote(choice: VoteKey) {
  try {
    localStorage.setItem(STORE_KEY, choice);
  } catch {
    /* private window — the vote still counted on the server */
  }
}

export const totalOf = (t: Tally) => t.yes + t.sometimes + t.no;

/** The tally as shown on the page: the head start sits on "yes", so the
    bars and percentages stay consistent with the total. Use `readVotes`
    directly if you want the real numbers. */
export const forDisplay = (t: Tally): Tally => ({ ...t, yes: t.yes + VOTE_DISPLAY_OFFSET });

/* ── page views ──────────────────────────────────────────────────────
   A real number, counted once per browser session, so the hero has
   something true to show before the votes build up. */

const VIEW_KEY = "page-views";
const SESSION_FLAG = "commutepilot.viewed.v1";

async function viewHit(path: string): Promise<number> {
  const res = await fetch(`${VOTE_API}/${path}/${VOTE_NAMESPACE}/${VIEW_KEY}`, { cache: "no-store" });
  if (!res.ok) return 0;
  const data = (await res.json()) as { value?: number };
  return typeof data.value === "number" ? data.value : 0;
}

/** Counts this visit once per session, then returns the running total. */
export async function countView(): Promise<number> {
  let counted = false;
  try {
    counted = sessionStorage.getItem(SESSION_FLAG) === "1";
  } catch {
    /* private window */
  }
  const total = await viewHit(counted ? "get" : "hit");
  if (!counted) {
    try {
      sessionStorage.setItem(SESSION_FLAG, "1");
    } catch {
      /* ignore */
    }
  }
  return total;
}
