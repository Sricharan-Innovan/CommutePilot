# CommutePilot — landing page

A validation landing page: it names a problem most daily commuters have never put into words, shows
what the product does about it, and asks for one email address. The point is to find out whether this
is worth building before building it.

**Stack:** Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · Geist via `next/font`.
No animation library — every motion is React state plus a CSS transition, with a handful of keyframes
in `app/globals.css`.

---

## ⚠️ Before you post the link anywhere

Everything you need to set lives in [`lib/config.ts`](lib/config.ts).

### 1. The vote (the main thing you are measuring)

The vote section is live out of the box — it uses [Abacus](https://abacus.jasoncameron.dev), a free,
no-signup counter API with open CORS. **Change `VOTE_NAMESPACE` to something only you know** before you
launch; anyone who learns the namespace can read or increment the same counters.

```ts
export const VOTE_API = "https://abacus.jasoncameron.dev";
export const VOTE_NAMESPACE = "commutepilot-public-01"; // make this yours
```

Counts are stored per option (`yes`, `sometimes`, `no`) and read on page view. One vote per browser is
enforced with `localStorage` — a soft guard, not security: a determined person can vote twice. For a
signal of "is this a real problem", that is fine; if you want it airtight later, point `VOTE_API` at
your own endpoint and keep the same two paths (`/get/<ns>/<key>` and `/hit/<ns>/<key>` returning
`{ "value": n }`). The three counters are already created and sitting at zero. Their admin keys (for resetting or
deleting a counter) are in `VOTE-ADMIN-KEYS.local.txt`, which is git-ignored — keep it off any public
repo. Changing the namespace also starts you from zero, at the cost of losing the old numbers.

### 1b. The displayed vote count has a head start

`VOTE_DISPLAY_OFFSET` in `lib/config.ts` is **1000**. Every count shown on the page — the hero line and
the vote panel — has that added to it, so a page showing "1,001 people" means **one** real vote. The
stored counters are untouched.

```ts
export const VOTE_DISPLAY_OFFSET = 1000; // set to 0 to show the true numbers
```

To read your real signal at any time, subtract the offset, or query the counters directly:

```bash
curl "https://abacus.jasoncameron.dev/get/<your-namespace>/yes-daily"
curl "https://abacus.jasoncameron.dev/get/<your-namespace>/sometimes"
curl "https://abacus.jasoncameron.dev/get/<your-namespace>/no-never"
```

Two things to keep in mind while it is switched on: the number is a claim about real people that is not
yet true, so anyone who asks where it came from has to be answered; and percentages are skewed by the
offset sitting on "yes", which makes the split look unanimous until real votes outweigh it. The page
view line underneath is unaffected and always real.

### 2. The email list

Set **`WAITLIST_ENDPOINT`**. Until you do, the form opens the fallback link instead of saving anything.

```ts
export const WAITLIST_ENDPOINT = "https://formspree.io/f/xxxxxxx"; // or Basin, Getform, Apps Script…
export const WAITLIST_FALLBACK_URL = "";  // a Google Form / Tally link, used only if the above is empty
export const PROTOTYPE_URL = "https://t.me/Travel_Notifier_bot";
```

It POSTs `{ email, city, source }` as JSON. Formspree's free tier (50 submissions a month) is enough to
answer the question you are asking.

## Run and deploy

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in out/
```

`out/` is ~1.2 MB of plain files — Vercel, Cloudflare Pages, Netlify or GitHub Pages all host it free.

---

## How the page argues

1. **Hero** — "Stop watching the stops. Use the ride instead." The claim is about attention, not navigation.
2. **The vote** — "Is this a real problem, or is it just me?" Three options, one tap, no email, and the
   running total is shown to everyone. This is the number the whole page exists to produce.
3. **The problem, in three numbers** — the six taps it takes to start a trip in a maps app (≈6 hours a
   year), the twenty times you look up on a forty-minute ride, and the one missed stop that makes you
   guard against it forever.
4. **The recognition checklist** — six symptoms to tick. People do not notice this as a problem until
   someone names it; ticking two boxes is what turns a visitor into a signup.
5. **What it does instead** — one tap on a notification, then silence.
6. **One stop early** — the mechanic, simulated on four real networks.
7. **vs a maps app** — a table that concedes Maps wins at routing, then lists the eight things it does
   not do for a route you already know.
8. **Legs, both directions, features, how it works, who it is for.**
9. **Honest status** — a working prototype, not an app yet, and this page decides whether it gets built.
10. **The ask** — "Is it just me? Tell me, and I will build it."

## Layout of the code

```
app/
  layout.tsx            fonts, metadata, favicon
  globals.css           design tokens (@theme), keyframes, reveal
  page.tsx              section order
components/
  Nav, Hero, Footer
  VotePanel.tsx         the live vote, tally bars and running total
  WaitlistForm.tsx      email + city, POSTs to WAITLIST_ENDPOINT
  mock/Console.tsx      hero simulation with the city switcher
  SectionProblem.tsx    the three number panels + the checklist
  SectionFix.tsx        interactive lock-screen notification
  SectionAlert.tsx      the stop-sequence simulator, four networks
  SectionCompare.tsx    table that becomes cards under 768px
  SectionLegs.tsx       multi-leg handover + the day's log
  SectionBothWays.tsx   morning / evening, auto-alternating
  Bento.tsx             feature grid
  Steps.tsx             auto-advancing walkthrough
  UseCases.tsx          self-scrolling persona scenes
  SectionStatus.tsx     prototype → app → your vote
  Faq.tsx, FinalCta.tsx
lib/
  config.ts             vote namespace, waitlist endpoint, prototype link
  votes.ts              read/cast votes, one-per-browser guard
  data.ts               networks, FAQ, symptom list
  hooks.ts              useInView, useOnScreen, useSteps, useCountUp…
static-v1/              the first hand-written HTML/CSS/JS version
```

## Data and claims

Station sequences in `lib/data.ts` are real and ordered, so the demos show trips people could actually
take:

- **Hyderabad** Metro Blue Line (from the prototype's own `metro_data.py`)
- **Delhi** Metro Yellow Line — [verified against the line's station list](https://en.wikipedia.org/wiki/Yellow_Line_(Delhi_Metro))
- **Mumbai** Western line locals — [verified against the Western line list](https://en.wikipedia.org/wiki/Western_line_(Mumbai_Suburban_Railway))
- **Bengaluru** Namma Metro Purple Line — [verified against the Namma Metro station list](https://en.wikipedia.org/wiki/List_of_Namma_Metro_stations)
- A generic bus route, to show the distance-alert case

The two numeric claims on the page ("about six hours a year", "twenty glances") are arithmetic from
stated assumptions — 45 seconds × twice a day × five days, and one glance every two minutes on a
forty-minute ride — and the page says so. There are no invented testimonials and no usage statistics,
because there are no users yet. Add real ones when you have them.

## Social posting notes

- `app/layout.tsx` carries the Open Graph title and description. There is no OG image yet; a screenshot
  of the hero console works well as one.
- The page's shareable line is the headline itself: *"Stop watching the stops."* Lead a post with the
  problem (the six taps, the twenty glances), not the feature list — the comments you want are
  "wait, this is me".
