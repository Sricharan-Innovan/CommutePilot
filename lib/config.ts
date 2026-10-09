/* ───────────────────────────────────────────────────────────
   Set these before you post the link anywhere.
   ─────────────────────────────────────────────────────────── */

/** Where the waitlist form POSTs {email, city}. Formspree, Basin, Getform,
 *  a Google Apps Script endpoint — anything that accepts a POST.
 *  Example: "https://formspree.io/f/abcdwxyz" */
export const WAITLIST_ENDPOINT = "";

/** Used when WAITLIST_ENDPOINT is empty: the button opens this instead
 *  (a Google Form or Tally form works). If both are empty the form falls
 *  back to the prototype link, so nothing is ever silently lost. */
export const WAITLIST_FALLBACK_URL = "";

/** The working prototype you already use daily. */
export const PROTOTYPE_URL = "https://t.me/Travel_Notifier_bot";

/** Shown next to the prototype link so nobody expects a finished app. */
export const PROTOTYPE_LABEL = "early prototype, one route, on Telegram";

/* ── Live vote tally ───────────────────────────────────────
   Backed by Abacus: a free, no-signup counter API with open CORS.
   Pick your own namespace before you launch — whoever knows it can
   read and increment the same counters. Swap VOTE_API for your own
   endpoint later if you want proper protection against stuffing. */
export const VOTE_API = "https://abacus.jasoncameron.dev";
export const VOTE_NAMESPACE = "commutepilot-public-01";

/** A head start added to the PUBLICLY SHOWN vote counts. Display only —
 *  the stored counters are untouched, so your real number is always
 *  (shown − VOTE_DISPLAY_OFFSET). Set it to 0 to show true counts. */
export const VOTE_DISPLAY_OFFSET = 1000;
