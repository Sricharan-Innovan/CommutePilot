/* Demo data. Station orders are real, taken from each network's published
   sequence, so the page shows a trip someone could actually take — and
   shows four different cities and three different modes, because the
   product is not about one city or one line. */

export type Mode = "metro" | "local" | "bus" | "walk";

export type Network = {
  id: string;
  city: string;
  line: string;
  mode: Mode;
  color: string;
  /** Ordered stops. The last one is the rider's stop; the one before it is
      where the alert fires. */
  stops: string[];
  note: string;
};

export const NETWORKS: Network[] = [
  {
    id: "hyd",
    city: "Hyderabad",
    line: "Metro · Blue Line",
    mode: "metro",
    color: "#1f66e0",
    stops: ["Ameerpet", "Yousufguda", "Jubilee Hills", "Madhapur", "Durgam Cheruvu", "HITEC City"],
    note: "your stop, doors on the right",
  },
  {
    id: "del",
    city: "Delhi",
    line: "Metro · Yellow Line",
    mode: "metro",
    color: "#b4880c",
    stops: [
      "Rajiv Chowk",
      "Central Secretariat",
      "Lok Kalyan Marg",
      "Jor Bagh",
      "Dilli Haat – INA",
      "AIIMS",
      "Green Park",
      "Hauz Khas",
    ],
    note: "change here for the Magenta Line",
  },
  {
    id: "mum",
    city: "Mumbai",
    line: "Western local",
    mode: "local",
    color: "#9b2335",
    stops: [
      "Churchgate",
      "Marine Lines",
      "Mumbai Central",
      "Lower Parel",
      "Dadar",
      "Bandra",
      "Santacruz",
      "Andheri",
    ],
    note: "start moving to the door now",
  },
  {
    id: "blr",
    city: "Bengaluru",
    line: "Metro · Purple Line",
    mode: "metro",
    color: "#6b3fa0",
    stops: [
      "Majestic",
      "Vidhana Soudha",
      "Cubbon Park",
      "MG Road",
      "Trinity",
      "Halasuru",
      "Indiranagar",
      "Baiyappanahalli",
    ],
    note: "your stop, left-hand platform",
  },
  {
    id: "bus",
    city: "Any city",
    line: "Bus route",
    mode: "bus",
    color: "#555555",
    stops: ["Market", "Civic Centre", "Ring Road", "Lake View", "Tech Park Gate 2"],
    note: "press the bell — 500 m out",
  },
];

/** The trip shown in the hero console: generic legs, so it reads as anyone's
    commute rather than one person's. */
export const LEGS = [
  { key: "walk", label: "Walk", sub: "to the station" },
  { key: "ride", label: "Line 1", sub: "first ride" },
  { key: "swap", label: "Change", sub: "interchange" },
  { key: "ride2", label: "Line 2", sub: "second ride" },
  { key: "last", label: "Last mile", sub: "bus or walk" },
] as const;

export const MODES: { label: string; mode: Mode }[] = [
  { label: "Metro", mode: "metro" },
  { label: "Local & suburban trains", mode: "local" },
  { label: "City bus", mode: "bus" },
  { label: "Walking legs", mode: "walk" },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this an app I can download today?",
    a: "Not yet — that is exactly what this page is for. A working prototype already runs every day on one route, and the app is the next step. If enough people say they want it, it gets built properly: iOS, Android, any city.",
  },
  {
    q: "How is this different from Google Maps?",
    a: "Maps is for routes you do not know. This is for the one you know by heart. Maps makes you start the trip every single day and tells you when you have arrived; this starts itself and tells you one stop before you need to move — so you can stop watching the journey.",
  },
  {
    q: "Which cities and which transit does it work on?",
    a: "Any city, as long as you can name your stops. Where a network's station order is loaded, you get the one-stop-early alert; everywhere else, and on buses and last-mile legs, you get a distance alert a few hundred metres out. Networks are being added one at a time, and the votes and sign-ups decide which comes first.",
  },
  {
    q: "Do I have to keep it open or keep looking at my phone?",
    a: "No — that is the entire point. Screen off, phone in your pocket or bag. It speaks up through a notification, a sound and a vibration, and through your earphones if you have them in.",
  },
  {
    q: "What about my battery?",
    a: "It tracks only during the trip window you set, not all day, and it uses coarse location until you are close to a stop that matters. No all-day background drain.",
  },
  {
    q: "What happens underground, or when the signal drops?",
    a: "Elevated and surface sections track normally. In a tunnel, position goes stale and picks up again at the next open stretch — which is why the alert is tied to the stop before yours rather than to a precise metre count. On lines with a known station order, the sequence carries you through the gap.",
  },
  {
    q: "What do you do with my data?",
    a: "Your stops, your times and the days you travel — the things the alerts need. Location is used while a trip is running and is not kept as a history, and nothing is sold on. Signing up here gets you one email when there is something to try.",
  },
];

/** Used by the recognition checklist — the point is that people do not notice
    this as a problem until it is named. */
export const SYMPTOMS = [
  "You open the map mid-ride just to see how many stops are left.",
  "The transit map lives in a recent tab, permanently.",
  "You will not nap on the ride, in case you overshoot.",
  "You look up at every station sign, even on a route you have done 400 times.",
  "You have lost your place in a book, a podcast or an email because a stop went past.",
  "You have missed your stop at least once, and still think about it.",
];
