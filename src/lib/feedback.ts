import type { Feedback } from "../types";

const issues = [
  "You need to make your personal contribution clearer.",
  "The answer spends too long on background before the point.",
  "There is no measurable result at the end — add one number.",
  "The delivery sounds like written English; shorten the sentences.",
  "The structure is good, but the key action verb is missing.",
];

const upgrades: { from: string; to: string }[] = [
  {
    from: "I joined the project and helped with the website.",
    to: "I was responsible for restructuring the website's information architecture and improving the clarity of the product story.",
  },
  {
    from: "We had a problem and I solved it with my team.",
    to: "I aligned the team around the root cause, split the fix into two iterations, and owned the client communication throughout.",
  },
  {
    from: "The result was good and the client was happy.",
    to: "Within six weeks we cut onboarding time by 30% and the client renewed the annual contract.",
  },
  {
    from: "I learned a lot from this experience.",
    to: "The takeaway I still use: name the risk explicitly, and the discussion becomes solvable.",
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function score(base: number, spread: number) {
  return Math.round((base + Math.random() * spread) * 10) / 10;
}

export function generateFeedback(topicName: string): Feedback {
  const f = score(3.1, 0.9);
  const l = score(3.2, 1.0);
  const t = score(3.0, 0.9);
  const avg = Math.round(((f + l + t) / 3) * 10) / 10;
  const upgrade = pick(upgrades);
  return {
    fluency: f,
    logic: l,
    tone: t,
    structure: avg >= 3.6 ? "Good" : "Needs a clearer framework",
    mainIssue: pick(issues),
    upgradeFrom: upgrade.from,
    upgradeTo: upgrade.to,
    // per-topic weighting lands here once real scoring is wired in
    ...(topicName.startsWith("mock-") ? {} : {}),
  };
}
