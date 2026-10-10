import { useEffect, useRef, useState } from "react";
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  Download,
  GraduationCap,
  Layers,
  ListChecks,
  Loader2,
  MessagesSquare,
  Mic,
  PlusCircle,
  Quote,
  Save,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { useToast } from "../components/Toast";
import {
  Badge,
  Button,
  Card,
  DifficultyBadge,
  PageHeader,
  Tabs,
  TextInput,
} from "../components/ui";
import { buildContextFromTopic } from "../lib/practice";
import { synthesizeTopic } from "../lib/topicFactory";
import { uid } from "../lib/utils";
import type { Scenario, Topic } from "../types";

const scenarios: { label: string; value: Scenario }[] = [
  { label: "Foreign-company Interview", value: "Interview" },
  { label: "IELTS Speaking", value: "IELTS" },
  { label: "Workplace Meeting", value: "Workplace" },
  { label: "Business Client", value: "Business" },
  { label: "Overseas Travel", value: "Travel" },
];

const roles = ["UX / Product", "Marketing", "HR", "Supply Chain", "Foreign Trade", "General"];

const genSteps = [
  "Diagnosing topic and scenario...",
  "Structuring the Chinese thinking path...",
  "Selecting professional vocabulary...",
  "Writing three-level answers...",
  "Preparing interviewer follow-ups...",
];

/* map common inputs to the richly-authored built-in topics */
const matchers: { keys: string[]; topicId: string }[] = [
  { keys: ["conflict", "disagree with", "吵架", "分歧"], topicId: "t-conflict" },
  { keys: ["self-intro", "introduce yourself", "about yourself", "自我介绍"], topicId: "t-self-intro" },
  { keys: ["project", "portfolio", "项目"], topicId: "t-project-experience" },
  { keys: ["team", "团队"], topicId: "t-teamwork" },
  { keys: ["pressure", "stress", "deadline", "压力"], topicId: "t-pressure" },
  { keys: ["fail", "mistake", "失败"], topicId: "t-failure" },
  { keys: ["meeting", "会议"], topicId: "t-meeting-disagreement" },
  { keys: ["client", "follow up", "客户"], topicId: "t-client-followup" },
  { keys: ["price", "negotiat", "报价", "谈判"], topicId: "t-price-negotiation" },
];

const answerTabs = ["Basic", "Standard", "Advanced"] as const;

export function TopicGenerator() {
  const { data, addTopics, addTodayTask, startPractice } = useApp();
  const { toast } = useToast();
  const [input, setInput] = useState("How do you handle conflict at work?");
  const [scenario, setScenario] = useState<Scenario>("Interview");
  const [role, setRole] = useState("General");
  const [phase, setPhase] = useState<"idle" | "generating" | "done">("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [answerLevel, setAnswerLevel] = useState<(typeof answerTabs)[number]>("Standard");
  const [saved, setSaved] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const generate = () => {
    if (!input.trim()) {
      toast("Type a topic first — e.g. “How do you handle conflict at work?”", "info");
      return;
    }
    timers.current.forEach(clearTimeout);
    setPhase("generating");
    setStepIdx(0);
    setSaved(false);
    genSteps.forEach((_, i) => timers.current.push(setTimeout(() => setStepIdx(i + 1), 550 * (i + 1))));
    timers.current.push(
      setTimeout(() => {
        const lower = input.toLowerCase();
        const hit = matchers.find((m) => m.keys.some((k) => lower.includes(k)));
        const source = hit ? data.topics.find((t) => t.id === hit.topicId) : undefined;
        const result: Topic = source
          ? { ...source, scenario: scenario === "Interview" && source.scenario === "Behavioral" ? source.scenario : scenario, role, source: "Generated", status: "Saved" }
          : synthesizeTopic(input, { scenario, role });
        setTopic(result);
        setPhase("done");
      }, 550 * genSteps.length + 400)
    );
  };

  const handleSave = () => {
    if (!topic) return;
    addTopics([{ ...topic, source: "Generated", status: "Saved" }]);
    setSaved(true);
    toast(`“${topic.topicName}” saved to your Topic Library.`);
  };

  const handleAddToday = () => {
    if (!topic) return;
    addTodayTask({
      id: uid("task"),
      title: `练习话题：${topic.topicName}`,
      titleEn: `Practice topic: ${topic.topicName}`,
      status: "not_started",
      topicId: topic.id,
      taskType: "60-sec Answer",
      timeLimit: 60,
    });
    toast("Added to today's practice — see it on your Dashboard.");
  };

  const handleExport = () => toast("Lesson card exported (lesson-card.md).");

  const startTask = (label: Topic["practiceTasks"][number]["label"]) => {
    if (!topic) return;
    startPractice(buildContextFromTopic(topic, label));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Topic Generator"
        subtitle="Generate a speaking lesson from any topic"
        chinese="输入任何话题，一键拆解成中文思路、词汇、句型、回答与追问"
      />

      {/* ---------- input card ---------- */}
      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Sparkles size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" />
            <TextInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="e.g. How do you handle conflict at work?"
              className="h-12 pl-11 text-[15px]"
            />
          </div>
          <Button size="lg" onClick={generate} disabled={phase === "generating"}>
            {phase === "generating" ? <Loader2 size={16} className="fb-spin" /> : <Wand2 size={16} />}
            Generate
          </Button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-[11.5px] font-bold uppercase tracking-wider text-ink-400">Scenario</div>
            <div className="flex flex-wrap gap-2">
              {scenarios.map((s) => (
                <Chip key={s.value} active={scenario === s.value} onClick={() => setScenario(s.value)}>
                  {s.label}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-[11.5px] font-bold uppercase tracking-wider text-ink-400">Role</div>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <Chip key={r} active={role === r} onClick={() => setRole(r)}>
                  {r}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* ---------- generating steps ---------- */}
      {phase === "generating" && (
        <Card className="fb-pop-in p-6">
          <div className="flex items-center gap-3">
            <Loader2 size={18} className="fb-spin text-brand-600" />
            <span className="text-[14px] font-bold text-ink-900">Generating your lesson…</span>
          </div>
          <div className="mt-4 space-y-1">
            {genSteps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ opacity: i <= stepIdx ? 1 : 0.4 }}>
                {i < stepIdx ? (
                  <CheckCircle2 size={16} className="text-mint-600" />
                ) : i === stepIdx ? (
                  <Loader2 size={16} className="fb-spin text-brand-600" />
                ) : (
                  <span className="ml-[7px] mr-[7px] h-1.5 w-1.5 rounded-full bg-ink-300" />
                )}
                <span className="text-[13px] font-medium text-ink-700">{s}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ---------- result ---------- */}
      {phase === "done" && topic && (
        <div className="fb-pop-in space-y-5">
          {/* 1. diagnosis */}
          <Card className="p-6">
            <SectionTitle icon={GraduationCap} n={1} title="Topic Diagnosis" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Fact label="Topic" value={topic.topicName} />
              <Fact label="Scenario" value={topic.scenario} />
              <Fact label="Skill Tested" value={topic.skillTested ?? "Structure & delivery"} />
              <Fact label="Recommended Framework" value={topic.framework} accent />
              <div className="rounded-2xl border border-hairline bg-canvas px-4 py-3">
                <div className="text-[11px] font-medium text-ink-400">Difficulty</div>
                <div className="mt-1"><DifficultyBadge level={topic.difficulty} /></div>
              </div>
              <Fact label="Role Fit" value={topic.role} />
            </div>
          </Card>

          {/* 2. chinese thinking */}
          <Card className="p-6">
            <SectionTitle icon={Brain} n={2} title="Chinese Thinking Structure" hint="先用中文想清楚，再换成英文骨架" />
            <p className="mt-4 text-[14px] leading-relaxed text-ink-700">{topic.chineseThinking}</p>
            <div className="mt-4 space-y-2">
              {(topic.answerPoints ?? []).map((p, i) => (
                <div key={p} className="flex items-start gap-3 rounded-xl bg-canvas px-4 py-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[13.5px] font-medium text-ink-700">{p}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 3. vocabulary */}
          <Card className="p-6">
            <SectionTitle icon={Quote} n={3} title="Key Vocabulary" hint="同一个意思，换一个更职业的说法" />
            <div className="mt-4 overflow-hidden rounded-2xl border border-hairline">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-hairline bg-canvas">
                    <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">中文意图</th>
                    <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">Basic</th>
                    <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-brand-600">Professional</th>
                  </tr>
                </thead>
                <tbody>
                  {topic.vocabulary.map((v) => (
                    <tr key={v.intent} className="border-b border-hairline last:border-0 hover:bg-canvas/70">
                      <td className="px-4 py-2.5 text-[13px] font-semibold text-ink-800">{v.intent}</td>
                      <td className="px-4 py-2.5 text-[13px] text-ink-400">{v.basic}</td>
                      <td className="px-4 py-2.5 text-[13px] font-semibold text-brand-700">{v.professional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 4. sentence patterns */}
          <Card className="p-6">
            <SectionTitle icon={Layers} n={4} title="Sentence Patterns" hint="按回答阶段组装" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {topic.sentencePatterns.map((p) => (
                <div key={p.stage} className="rounded-2xl border border-hairline bg-canvas p-4">
                  <Badge tone="brand">{p.stage}</Badge>
                  <p className="mt-2.5 text-[13.5px] font-medium leading-relaxed text-ink-800">{p.pattern}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* 5. three-level answers */}
          <Card className="p-6">
            <SectionTitle icon={MessagesSquare} n={5} title="Three-level Answers" hint="从能说清，到说得像外企的人" />
            <Tabs tabs={answerTabs} value={answerLevel} onChange={setAnswerLevel} className="mt-4" />
            <div className="mt-4 rounded-2xl border border-hairline bg-canvas p-5">
              <div className="flex items-center gap-2">
                <Badge tone={answerLevel === "Basic" ? "gray" : answerLevel === "Standard" ? "brand" : "mint"}>
                  {answerLevel}
                </Badge>
                <span className="text-[11.5px] text-ink-400">
                  {answerLevel === "Basic" ? "简短、安全，先能开口" : answerLevel === "Standard" ? "自然、完整，多数场景够用" : "更像外企面试里的成熟表达"}
                </span>
              </div>
              <p className="mt-3 text-[14.5px] leading-[1.9] text-ink-800">
                {topic.sampleAnswers[answerLevel.toLowerCase() as keyof typeof topic.sampleAnswers]}
              </p>
            </div>
          </Card>

          {/* 6. follow-ups */}
          <Card className="p-6">
            <SectionTitle icon={ListChecks} n={6} title="Follow-up Questions" hint="面试官一定会追问的 5 个问题" />
            <ol className="mt-4 space-y-2">
              {topic.followUpQuestions.map((q, i) => (
                <li key={q} className="flex items-start gap-3 rounded-xl border border-hairline px-4 py-3">
                  <span className="text-[12px] font-bold tabular-nums text-brand-500">Q{i + 1}</span>
                  <span className="text-[13.5px] font-medium text-ink-800">{q}</span>
                </li>
              ))}
            </ol>
          </Card>

          {/* 7. practice tasks */}
          <Card className="p-6">
            <SectionTitle icon={Mic} n={7} title="Practice Tasks" hint="进入训练室完成真实练习" />
            <div className="mt-4 flex flex-wrap gap-3">
              {topic.practiceTasks.map((t) => (
                <Button key={t.id} variant="outline" size="lg" onClick={() => startTask(t.label)}>
                  <Mic size={15} className="text-brand-600" /> {t.label}
                  <ChevronRight size={14} className="text-ink-300" />
                </Button>
              ))}
            </div>
          </Card>

          {/* actions */}
          <div className="flex flex-wrap justify-end gap-2.5 pb-2">
            <Button variant="outline" onClick={handleSave} disabled={saved}>
              {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
              {saved ? "Saved" : "Save Topic"}
            </Button>
            <Button variant="secondary" onClick={handleAddToday}>
              <PlusCircle size={15} /> Add to Today's Practice
            </Button>
            <Button onClick={handleExport}>
              <Download size={15} /> Export as Lesson Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "cursor-pointer rounded-full border border-brand-500 bg-brand-600 px-3.5 py-1.5 text-[12.5px] font-semibold text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)] transition-all"
          : "cursor-pointer rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-600 transition-all hover:border-brand-300 hover:text-brand-700"
      }
    >
      {children}
    </button>
  );
}

function SectionTitle({
  icon: Icon,
  n,
  title,
  hint,
}: {
  icon: typeof Brain;
  n: number;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={17} />
      </span>
      <div>
        <div className="text-[15.5px] font-bold text-ink-900">
          <span className="mr-1.5 text-brand-400">{n}.</span>
          {title}
        </div>
        {hint && <div className="text-[12px] text-ink-400">{hint}</div>}
      </div>
    </div>
  );
}

function Fact({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-hairline bg-canvas px-4 py-3">
      <div className="text-[11px] font-medium text-ink-400">{label}</div>
      <div className={accent ? "mt-0.5 text-[14px] font-bold text-brand-700" : "mt-0.5 text-[13.5px] font-semibold text-ink-800"}>
        {value}
      </div>
    </div>
  );
}
