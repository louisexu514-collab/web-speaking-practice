import {
  ArrowRight,
  BookA,
  CheckCircle2,
  Circle,
  FileUp,
  LibraryBig,
  Mic,
  PlayCircle,
  Quote,
  Sparkles,
  SquareChartGantt,
  Timer,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { Badge, Button, Card, ProgressBar, RingGauge, StatusBadge } from "../components/ui";
import { buildContextFromTodayTask } from "../lib/practice";
import { seedStats } from "../data/mockData";
import { cn } from "../lib/utils";

export function Dashboard() {
  const { data, startPractice, navigate } = useApp();

  const doneCount = data.todayTasks.filter((t) => t.status === "done").length;
  const totalQuestions = data.topics.reduce((n, t) => n + t.relatedQuestions.length, 0);
  const totalExpressions = seedStats.masteredExpressions + data.expressions.length;

  const stats = [
    { icon: LibraryBig, value: data.topics.length, label: "Topics" },
    { icon: Quote, value: totalQuestions * 4, label: "Interview Questions" },
    { icon: BookA, value: totalExpressions, label: "Useful Expressions" },
    { icon: Mic, value: seedStats.totalPractices + Math.max(0, data.records.length - 6), label: "Recorded Practices" },
    { icon: CheckCircle2, value: data.savedAnswers, label: "Saved Answers" },
  ];

  const openTask = (taskId: string) => {
    const task = data.todayTasks.find((t) => t.id === taskId);
    if (!task) return;
    const topic = data.topics.find((t) => t.id === task.topicId);
    startPractice(buildContextFromTodayTask(task, topic));
  };

  return (
    <div className="space-y-7">
      {/* ---------- hero ---------- */}
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-8 text-white shadow-[0_16px_40px_rgba(79,70,229,0.3)]">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-mint-500/20 blur-3xl" />
          <Badge tone="mint" className="border-white/25 bg-white/15 text-white">
            <Sparkles size={11} className="text-mint-300" /> Daily command center
          </Badge>
          <h1 className="mt-4 max-w-lg text-[30px] font-extrabold leading-[1.15] tracking-tight">
            Your Foreign-company English Command Center
          </h1>
          <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/85">
            Turn interview questions, PDFs, and workplace topics into structured speaking practice.
          </p>
          <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-white/70">
            把外企面试题、商务英语资料和真实职场话题，转化为可开口练习、可复盘、可持续积累的表达资产。
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="md"
              variant="onDark"
              onClick={() => {
                const task =
                  data.todayTasks.find((t) => t.status === "in_progress") ??
                  data.todayTasks.find((t) => t.status === "not_started");
                if (task) openTask(task.id);
              }}
            >
              <PlayCircle size={16} /> Continue Day {seedStats.streakDay}
            </Button>
            <div className="flex items-center gap-2 text-[12.5px] font-medium text-white/70">
              <Timer size={14} /> {data.profile.dailyMinutes} min / day goal
            </div>
          </div>
        </div>

        {/* progress card */}
        <Card className="flex items-center gap-5 p-6">
          <div className="flex flex-col items-center">
            <RingGauge value={seedStats.weeklyProgress} size={104} stroke={11} label="68%" sublabel="Weekly" />
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Progress</div>
          </div>
          <div className="flex-1 space-y-4">
            <Info label="Current Goal" value={`${data.profile.targetRole} Interview`} />
            <Info label="Current Phase" value={seedStats.currentPhase} />
            <Info label="Speaking Confidence" value="3.4 / 5" bar />
          </div>
        </Card>
      </div>

      {/* ---------- today's tasks ---------- */}
      <section>
        <SectionHead
          title="Today's Practice"
          hint={`${doneCount}/${data.todayTasks.length} done · Day ${seedStats.streakDay}`}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.todayTasks.map((task, i) => (
            <Card key={task.id} hover className="group flex flex-col p-5" >
              <button className="flex w-full flex-1 cursor-pointer flex-col text-left" onClick={() => openTask(task.id)}>
                <div className="flex items-start justify-between gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50">
                    {task.status === "done" ? (
                      <CheckCircle2 size={17} className="text-mint-600" />
                    ) : (
                      <Circle size={17} className={task.status === "in_progress" ? "text-brand-600" : "text-ink-300"} />
                    )}
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-300">Task {i + 1}</span>
                </div>
                <div className="mt-3 text-[14.5px] font-bold leading-snug text-ink-900">{task.title}</div>
                <div className="mt-1 text-[12px] leading-snug text-ink-400">{task.titleEn}</div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <StatusBadge status={task.status} />
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600 opacity-0 transition group-hover:opacity-100">
                    Practice <ArrowRight size={12} />
                  </span>
                </div>
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- three entries ---------- */}
      <section>
        <SectionHead title="Start from anything" hint="三种方式开始积累表达资产" />
        <div className="grid gap-4 md:grid-cols-3">
          <EntryCard
            icon={FileUp}
            tint="brand"
            title="Upload a PDF Question Bank"
            chinese="上传 PDF / 题库 / 口语书，自动拆成话题库"
            onClick={() => navigate("upload")}
          />
          <EntryCard
            icon={Sparkles}
            tint="mint"
            title="Generate from One Topic"
            chinese="输入一个话题，生成词汇、句型、回答、追问"
            onClick={() => navigate("generator")}
          />
          <EntryCard
            icon={SquareChartGantt}
            tint="amber"
            title="Start 30-day Training"
            chinese="从外企面试到职场沟通，按阶段训练"
            onClick={() => navigate("plan")}
          />
        </div>
      </section>

      {/* ---------- asset overview ---------- */}
      <section>
        <SectionHead title="Your Learning Assets" hint="学习资产概览" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="flex items-center gap-3.5 p-4">
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                    "bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600"
                  )}
                >
                  <Icon size={17} />
                </span>
                <div className="leading-tight">
                  <div className="text-[22px] font-extrabold tracking-tight text-ink-900">{s.value}</div>
                  <div className="text-[11px] font-medium text-ink-400">{s.label}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value, bar }: { label: string; value: string; bar?: boolean }) {
  const num = parseFloat(value);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[11.5px] font-medium text-ink-400">{label}</span>
        <span className="text-[13px] font-bold text-ink-900">{value}</span>
      </div>
      {bar && <ProgressBar value={(num / 5) * 100} className="mt-1.5 h-1.5" tone="mint" />}
    </div>
  );
}

function SectionHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3.5 flex items-baseline justify-between">
      <h2 className="text-[16px] font-bold tracking-tight text-ink-900">{title}</h2>
      {hint && <span className="text-[12px] font-medium text-ink-500">{hint}</span>}
    </div>
  );
}

const tints: Record<string, string> = {
  brand: "from-brand-500 to-brand-700 shadow-[0_6px_16px_rgba(79,70,229,0.28)]",
  mint: "from-mint-500 to-mint-700 shadow-[0_6px_16px_rgba(20,184,166,0.28)]",
  amber: "from-amber-400 to-amber-600 shadow-[0_6px_16px_rgba(245,158,11,0.28)]",
};

function EntryCard({
  icon: Icon,
  tint,
  title,
  chinese,
  onClick,
}: {
  icon: typeof FileUp;
  tint: keyof typeof tints;
  title: string;
  chinese: string;
  onClick: () => void;
}) {
  return (
    <Card hover className="p-5" >
      <button className="cursor-pointer text-left" onClick={onClick}>
        <span className={cn("grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white", tints[tint])}>
          <Icon size={19} />
        </span>
        <div className="mt-4 text-[15px] font-bold text-ink-900">{title}</div>
        <div className="mt-1 text-[12.5px] leading-relaxed text-ink-500">{chinese}</div>
        <div className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600">
          Go <ArrowRight size={13} />
        </div>
      </button>
    </Card>
  );
}
