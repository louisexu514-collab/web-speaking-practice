import type { Difficulty, Scenario, Topic, TopicSource } from "../types";

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const vocabPools: { intent: string; basic: string; professional: string }[][] = [
  [
    { intent: "推进", basic: "continue", professional: "move the project forward" },
    { intent: "协调", basic: "work together", professional: "align priorities across teams" },
    { intent: "澄清", basic: "ask clearly", professional: "clarify expectations early" },
    { intent: "解决", basic: "solve", professional: "resolve the issue at the root" },
    { intent: "交付", basic: "finish", professional: "deliver measurable impact" },
  ],
  [
    { intent: "主导", basic: "I did it", professional: "I led the end-to-end effort" },
    { intent: "挑战", basic: "hard part", professional: "the core constraint was" },
    { intent: "取舍", basic: "choose one", professional: "make a deliberate trade-off" },
    { intent: "验证", basic: "check", professional: "validate with data" },
    { intent: "复盘", basic: "review", professional: "turn the lesson into a process" },
  ],
  [
    { intent: "沟通", basic: "talk to them", professional: "open a structured conversation" },
    { intent: "影响", basic: "convince", professional: "earn buy-in with their metrics" },
    { intent: "边界", basic: "my job", professional: "my scope of ownership" },
    { intent: "升级", basic: "tell boss", professional: "escalate with a proposal, not a problem" },
    { intent: "共识", basic: "agree", professional: "reach a shared definition of success" },
  ],
];

const moduleScenario: Record<string, Scenario> = {
  "Interview Basics": "Interview",
  "Project Storytelling": "Interview",
  "Behavioral Interview": "Behavioral",
  "Workplace English": "Workplace",
  "Business English": "Business",
  "Overseas Travel": "Travel",
  "IELTS Speaking": "IELTS",
};

const titleCase = (s: string) =>
  s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

/** Strip trailing question marks / fillers so the input reads like a topic name. */
export function topicNameFromInput(input: string): string {
  const cleaned = input
    .replace(/^(tell me about|describe|how do you (handle|deal with)|what's|what is|talk about)\s+/i, "")
    .replace(/\?+$/, "")
    .trim();
  return titleCase(cleaned.split(/\s+/).slice(0, 6).join(" ") || "New Topic");
}

export function synthesizeTopic(
  rawName: string,
  opts: {
    scenario?: Scenario;
    role?: string;
    source?: TopicSource;
    difficulty?: Difficulty;
    moduleName?: string;
    seedQuestion?: string;
  } = {}
): Topic {
  const topicName = topicNameFromInput(rawName);
  const h = hash(topicName.toLowerCase());
  const vocab = vocabPools[h % vocabPools.length];
  const scenario = opts.scenario ?? moduleScenario[opts.moduleName ?? ""] ?? "Interview";
  const difficulty = opts.difficulty ?? (h % 3 === 0 ? "Beginner" : h % 3 === 1 ? "Intermediate" : "Advanced");
  const q = opts.seedQuestion?.replace(/\?+$/, "") ?? `Talk about ${topicName.toLowerCase()}`;

  return {
    id: `gen-${h.toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    topicName,
    scenario,
    role: opts.role ?? "General",
    difficulty,
    framework: "STAR",
    frameworkSteps: ["Situation", "Task", "Action", "Result"],
    source: opts.source ?? "Generated",
    status: "Saved",
    skillTested: "Structure, professional vocabulary, delivery under time",
    chineseThinking: `这个话题考察的不是词汇量，而是你能不能把「${topicName}」讲成一个有情境、有行动、有结果的完整表达。先用一句话交代背景，重点放在你做了什么决定，最后给出可感知的结果。`,
    answerPoints: [
      "背景：一句话交代情境和约束",
      "任务：你要解决的具体问题是什么",
      "行动：你做了哪两个关键动作",
      "结果：可量化的结果或明确的改变",
    ],
    relatedQuestions: [
      opts.seedQuestion ?? `Tell me about a time you dealt with ${topicName.toLowerCase()}.`,
      `What is the hardest part of ${topicName.toLowerCase()} for you?`,
      `How do you usually approach ${topicName.toLowerCase()}?`,
      `Give an example where ${topicName.toLowerCase()} shaped the outcome.`,
    ],
    vocabulary: vocab,
    sentencePatterns: [
      { stage: "Opening", pattern: `One example that comes to mind around ${topicName.toLowerCase()} is...` },
      { stage: "Action", pattern: "Instead of pushing my own opinion directly, I first tried to understand..." },
      { stage: "Result", pattern: "In the end, we reached a solution that worked for both sides." },
      { stage: "Reflection", pattern: "This experience taught me that clarity comes before persuasion." },
    ],
    sampleAnswers: {
      basic: `I have experience with ${topicName.toLowerCase()}. It was not easy, but I learned from it and did better each time.`,
      standard: `When it comes to ${topicName.toLowerCase()}, one situation stands out. The context was clear: something had to change, and quickly. I broke the problem into what I could control, aligned the people involved, and drove it to a result we could measure. The outcome was positive, and the process became part of how I work.`,
      advanced: `${topicName} is exactly the kind of situation where I do my best work. The pattern I've settled into: name the real constraint before proposing anything, because most friction around ${topicName.toLowerCase()} comes from people optimizing different risks. Once that's explicit, I align stakeholders on one shared definition of success, own the critical path myself, and close the loop with a measurable result. It's less about being the loudest voice and more about making the decision easy to say yes to.`,
    },
    followUpQuestions: [
      `What exactly made ${topicName.toLowerCase()} difficult?`,
      "How did the other people involved react?",
      "What would you do differently next time?",
      `How do you handle ${topicName.toLowerCase()} under time pressure?`,
      "Can you give another example?",
    ],
    practiceTasks: [
      { id: `gen-30-${h}`, label: "30-sec Answer" },
      { id: `gen-60-${h}`, label: "60-sec Answer" },
      { id: `gen-fu-${h}`, label: "Follow-up Challenge" },
    ],
  };
}
