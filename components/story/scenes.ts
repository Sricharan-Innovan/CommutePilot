/* The 40-second story, as data. Each scene owns a pose, a caption and a
   duration; everything the SVG does is derived from the clock. */

export type Pose =
  | "phone"        // sitting, looking at the phone
  | "lookup"       // head up, checking the sign
  | "dozing"       // eyes closed, head tilted
  | "panic"        // sat bolt upright, stop gone past
  | "relaxed"      // eyes closed, earphones in, phone away
  | "alerted"      // eyes open, buzz
  | "standing";    // up and at the door

export type Scene = {
  id: string;
  ms: number;
  pose: Pose;
  caption: string;
  sub?: string;
  /** which half of the story: the problem, the turn, or the product */
  act: "problem" | "turn" | "product" | "end";
  /** things the scene switches on */
  checks?: boolean;      // the "times you checked" counter
  missed?: boolean;      // the stop slides past
  notification?: boolean;
  alert?: boolean;
  doors?: boolean;
  endCard?: boolean;
};

export const SCENES: Scene[] = [
  {
    id: "open",
    ms: 3600,
    pose: "phone",
    act: "problem",
    caption: "Every weekday, the same ride.",
    sub: "Same line, same stop, same forty minutes.",
  },
  {
    id: "know",
    ms: 3200,
    pose: "lookup",
    act: "problem",
    caption: "You know this route by heart.",
    sub: "You could walk it in your sleep.",
  },
  {
    id: "checking",
    ms: 5200,
    pose: "lookup",
    act: "problem",
    checks: true,
    caption: "So why are you still checking?",
    sub: "Map, window, sign. Map, window, sign.",
  },
  {
    id: "cost",
    ms: 3600,
    pose: "phone",
    act: "problem",
    caption: "Nothing gets read. Nothing gets done.",
    sub: "Part of your head is always on the window.",
  },
  {
    id: "doze",
    ms: 3400,
    pose: "dozing",
    act: "problem",
    caption: "And the one time you switch off…",
  },
  {
    id: "missed",
    ms: 3800,
    pose: "panic",
    act: "problem",
    missed: true,
    caption: "…your stop goes past.",
    sub: "Twenty minutes back, and a bad mood all morning.",
  },
  {
    id: "turn",
    ms: 2800,
    pose: "phone",
    act: "turn",
    caption: "So stop watching it.",
    sub: "Let something else count the stops.",
  },
  {
    id: "tap",
    ms: 4000,
    pose: "phone",
    act: "product",
    notification: true,
    caption: "One tap at the door.",
    sub: "The prompt comes to you at your usual time.",
  },
  {
    id: "away",
    ms: 4000,
    pose: "relaxed",
    act: "product",
    caption: "Then nothing.",
    sub: "Screen off. Phone in your pocket. Eyes closed.",
  },
  {
    id: "alert",
    ms: 4200,
    pose: "alerted",
    act: "product",
    alert: true,
    caption: "Until one stop before yours.",
    sub: "Long enough to stand up and find your bag.",
  },
  {
    id: "off",
    ms: 3800,
    pose: "standing",
    act: "product",
    doors: true,
    caption: "You are at the doors before they open.",
    sub: "Every single day, without thinking about it.",
  },
  {
    id: "end",
    ms: 4600,
    pose: "standing",
    act: "end",
    endCard: true,
    caption: "CommutePilot",
    sub: "Stop watching the stops. Use the ride instead.",
  },
];

export const TOTAL_MS = SCENES.reduce((n, s) => n + s.ms, 0);

/** Scene index and progress within it, from a clock in milliseconds. */
export function sceneAt(t: number) {
  let acc = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (t < acc + SCENES[i].ms) {
      return { i, scene: SCENES[i], p: (t - acc) / SCENES[i].ms, start: acc };
    }
    acc += SCENES[i].ms;
  }
  const last = SCENES.length - 1;
  return { i: last, scene: SCENES[last], p: 1, start: acc - SCENES[last].ms };
}
