import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  Brain,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  LibraryBig,
  ListChecks,
  MessagesSquare,
  Mic,
  Play,
  Quote,
  Search,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { useToast } from "../components/Toast";
import {
  Badge,
  Button,
  Card,
  DifficultyBadge,
  PageHeader,
  Select,
  StatusBadge,
  Tabs,
  TextInput,
} from "../components/ui";
import { buildContextFromTopic } from "../lib/practice";
import { uid } from "../lib/utils";
import type { Topic } from "../types";

const answerTabs = ["Basic", "Standard", "Advanced"] as const;

export function TopicLibrary() {
  const { detailTopicId } = useApp();
  if (detailTopicId) {
    return <TopicDetail topicId={detailTopicId} />;
  }
  return <TopicTable />;
}

/* ================= table view ================= */

function TopicTable() {
  const { data, openTopicDetail } = useApp();
  const [q, setQ] = useState("");
  const [scenario, setScenario] = useState("all");
  const [role, setRole] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [framework, setFramework] = useState("all");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");

  const uniq = (vals: string[]) => ["all", ...Array.from(new Set(vals)).sort()];

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.topics.filter((t) => {
      if (scenario !== "all" && t.scenario !== scenario) return false;
      if (role !== "all" && t.role !== role) return false;
      if (difficulty !== "all" && t.difficulty !== difficulty) return false;
      if (framework !== "all" && t.framework !== framework) return false;
      if (status !== "all" && t.status !== status) return false;
      if (source !== "all" && t.source !== source) return false;
      if (needle) {
        const hay = [
          t.topicName,
          t.scenario,
          t.role,
          t.framework,
          ...t.relatedQuestions,
          ...t.vocabulary.map((v) => v.professional),
        ].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [data.topics, q, scenario, role, difficulty, framework, status, source]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Topic Library"
        subtitle={`${data.topics.length} topics · searchable, filterable, ready to practice`}
        chinese="所有话题资产：来自内置、PDF 导入与单话题生成"
      />

      {/* search + filters */}
      <Card className="flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[240px] flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <TextInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search topics, questions, expressions..."
            className="h-9 text-[13px]"
          />
        </div>
        <Select value={scenario} onChange={(e) => setScenario(e.target.value)} className="w-[130px]">
          {uniq(data.topics.map((t) => t.scenario)).map((v) => (
            <option key={v} value={v}>{v === "all" ? "Scenario: All" : v}</option>
          ))}
        </Select>
        <Select value={role} onChange={(e) => setRole(e.target.value)} className="w-[140px]">
          {uniq(data.topics.map((t) => t.role)).map((v) => (
            <option key={v} value={v}>{v === "all" ? "Role: All" : v}</option>
          ))}
        </Select>
        <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-[140px]">
          {uniq(data.topics.map((t) => t.difficulty)).map((v) => (
            <option key={v} value={v}>{v === "all" ? "Difficulty: All" : v}</option>
          ))}
        </Select>
        <Select value={framework} onChange={(e) => setFramework(e.target.value)} className="w-[180px]">
          {uniq(data.topics.map((t) => t.framework)).map((v) => (
            <option key={v} value={v}>{v === "all" ? "Framework: All" : v}</option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[150px]">
          {uniq(data.topics.map((t) => t.status)).map((v) => (
            <option key={v} value={v}>{v === "all" ? "Status: All" : v}</option>
          ))}
        </Select>
        <Select value={source} onChange={(e) => setSource(e.target.value)} className="w-[130px]">
          {uniq(data.topics.map((t) => t.source)).map((v) => (
            <option key={v} value={v}>{v === "all" ? "Source: All" : v}</option>
          ))}
        </Select>
      </Card>

      {/* table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="border-b border-hairline bg-canvas">
                {["Topic", "Scenario", "Role", "Difficulty", "Framework", "Status", "Source", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => openTopicDetail(t.id)}
                  className="group cursor-pointer border-b border-hairline last:border-0 transition-colors hover:bg-brand-50/40"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-50 text-brand-600">
                        <LibraryBig size={14} />
                      </span>
                      <span className="text-[13.5px] font-bold text-ink-900">{t.topicName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Badge tone="gray">{t.scenario}</Badge></td>
                  <td className="px-5 py-3.5 text-[13px] text-ink-600">{t.role}</td>
                  <td className="px-5 py-3.5"><DifficultyBadge level={t.difficulty} /></td>
                  <td className="px-5 py-3.5 text-[12.5px] font-medium text-ink-600">{t.framework}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={t.status} /></td>
                  <td className="px-5 py-3.5">
                    <Badge tone={t.source === "Built-in" ? "gray" : t.source === "PDF" ? "amber" : "brand"}>{t.source}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <ChevronRight size={15} className="text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-14 text-center text-[13px] text-ink-400">
                    No topics match these filters — try clearing them.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ================= detail view ================= */

function TopicDetail({ topicId }: { topicId: string }) {
  const { data, navigate, setTopicStatus, addTodayTask, startPractice } = useApp();
  const { toast } = useToast();
  const topic = data.topics.find((t) => t.id === topicId);
  const [answerLevel, setAnswerLevel] = useState<(typeof answerTabs)[number]>("Standard");
  if (!topic) {
    return (
      <Card className="p-10 text-center text-sm text-ink-500">
        Topic not found.{" "}
        <button className="font-semibold text-brand-600 cursor-pointer" onClick={() => navigate("library")}>
          Back to library
        </button>
      </Card>
    );
  }

  const history = data.records.filter((r) => r.topicName === topic.topicName);

  const markMastered = () => {
    setTopicStatus(topic.id, "Mastered");
    toast(`“${topic.topicName}” marked as mastered. 🎯`);
  };

  const addToPlan = () => {
    addTodayTask({
      id: uid("task"),
      title: `练习话题：${topic.topicName}`,
      titleEn: `Practice topic: ${topic.topicName}`,
      status: "not_started",
      topicId: topic.id,
      taskType: "60-sec Answer",
      timeLimit: 60,
    });
    toast("Added to today's practice plan.");
  };

  return (
    <div className="space-y-5">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("library")}
            className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold text-ink-400 transition hover:text-brand-600"
          >
            <ArrowLeft size={14} /> Topic Library
          </button>
          <h1 className="mt-2 text-[26px] font-extrabold tracking-tight text-ink-900">{topic.topicName}</h1>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <Badge tone="gray">{topic.scenario}</Badge>
            <Badge tone="gray">{topic.role}</Badge>
            <DifficultyBadge level={topic.difficulty} />
            <StatusBadge status={topic.status} />
            <Badge tone={topic.source === "Built-in" ? "gray" : topic.source === "PDF" ? "amber" : "brand"}>
              Source: {topic.source}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button
            onClick={() => startPractice(buildContextFromTopic(topic, "60-sec Answer"))}
          >
            <Play size={15} fill="currentColor" /> Start Practice
          </Button>
          <Button variant="secondary" onClick={addToPlan}>
            <CalendarPlus size={15} /> Add to Plan
          </Button>
          <Button
            variant={topic.status === "Mastered" ? "success" : "outline"}
            onClick={markMastered}
            disabled={topic.status === "Mastered"}
          >
            <Award size={15} /> {topic.status === "Mastered" ? "Mastered" : "Mark as Mastered"}
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* diagnosis */}
        <Card className="p-5">
          <DetailTitle icon={GraduationCap} title="Topic Diagnosis" />
          <div className="mt-3 space-y-2.5">
            <KV k="Framework" v={topic.framework} accent />
            <KV k="Skill Tested" v={topic.skillTested ?? "—"} />
            <KV k="Difficulty" v={topic.difficulty} />
          </div>
          {topic.chineseThinking && (
            <p className="mt-4 rounded-2xl bg-canvas p-4 text-[13.5px] leading-relaxed text-ink-700">
              {topic.chineseThinking}
            </p>
          )}
        </Card>

        {/* related questions */}
        <Card className="p-5">
          <DetailTitle icon={ListChecks} title="Related Questions" />
          <ul className="mt-3 space-y-2">
            {topic.relatedQuestions.map((q) => (
              <li key={q} className="flex gap-2.5 rounded-xl border border-hairline px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-ink-700">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                {q}
              </li>
            ))}
          </ul>
        </Card>

        {/* vocabulary */}
        <Card className="p-5">
          <DetailTitle icon={Quote} title="Vocabulary" />
          <div className="mt-3 overflow-hidden rounded-2xl border border-hairline">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-hairline bg-canvas">
                  <th className="px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-wider text-ink-400">中文意图</th>
                  <th className="px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-wider text-ink-400">Basic</th>
                  <th className="px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-wider text-brand-600">Professional</th>
                </tr>
              </thead>
              <tbody>
                {topic.vocabulary.map((v) => (
                  <tr key={v.intent} className="border-b border-hairline last:border-0">
                    <td className="px-3.5 py-2 text-[12.5px] font-semibold text-ink-800">{v.intent}</td>
                    <td className="px-3.5 py-2 text-[12.5px] text-ink-400">{v.basic}</td>
                    <td className="px-3.5 py-2 text-[12.5px] font-semibold text-brand-700">{v.professional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* sentence patterns + framework */}
        <Card className="p-5">
          <DetailTitle icon={Layers} title="Sentence Patterns & Answer Framework" />
          <div className="mt-3 space-y-2.5">
            {topic.sentencePatterns.map((p) => (
              <div key={p.stage} className="rounded-2xl border border-hairline bg-canvas p-3.5">
                <Badge tone="brand">{p.stage}</Badge>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink-800">{p.pattern}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* sample answers */}
        <Card className="p-5 lg:col-span-2">
          <DetailTitle icon={MessagesSquare} title="Sample Answers" />
          <Tabs tabs={answerTabs} value={answerLevel} onChange={setAnswerLevel} className="mt-3" />
          <div className="mt-3.5 rounded-2xl border border-hairline bg-canvas p-5">
            <p className="text-[14.5px] leading-[1.9] text-ink-800">
              {topic.sampleAnswers[answerLevel.toLowerCase() as keyof typeof topic.sampleAnswers]}
            </p>
          </div>
        </Card>

        {/* follow-ups + practice entry */}
        <Card className="p-5">
          <DetailTitle icon={Brain} title="Follow-up Questions" />
          <ol className="mt-3 space-y-2">
            {topic.followUpQuestions.map((q, i) => (
              <li key={q} className="flex items-start gap-2.5 rounded-xl border border-hairline px-3.5 py-2.5">
                <span className="text-[11.5px] font-bold tabular-nums text-brand-500">Q{i + 1}</span>
                <span className="text-[13px] font-medium text-ink-800">{q}</span>
              </li>
            ))}
          </ol>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => startPractice(buildContextFromTopic(topic, "Follow-up Challenge"))}
          >
            <Mic size={14} /> Challenge all follow-ups
          </Button>
        </Card>

        {/* practice history */}
        <Card className="p-5">
          <DetailTitle icon={CheckCircle2} title="Practice History" />
          {history.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-hairline bg-canvas px-4 py-8 text-center">
              <Mic size={20} className="mx-auto text-ink-300" />
              <p className="mt-2.5 text-[13px] text-ink-500">No recordings yet for this topic.</p>
              <button
                className="mt-1 text-[12.5px] font-semibold text-brand-600 cursor-pointer hover:underline"
                onClick={() => startPractice(buildContextFromTopic(topic, "60-sec Answer"))}
              >
                Record the first one →
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {history.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-xl border border-hairline px-4 py-3">
                  <div>
                    <div className="text-[13px] font-bold text-ink-800">{r.date} · {r.task}</div>
                    <div className="text-[12px] text-ink-400">{r.mainIssue}</div>
                  </div>
                  <Badge tone={r.score >= 3.8 ? "mint" : "amber"}>{r.score.toFixed(1)}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function DetailTitle({ icon: Icon, title }: { icon: typeof Brain; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={15} />
      </span>
      <span className="text-[14.5px] font-bold text-ink-900">{title}</span>
    </div>
  );
}

function KV({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-xl bg-canvas px-3.5 py-2.5">
      <span className="text-[12px] font-medium text-ink-400">{k}</span>
      <span className={accent ? "text-[13px] font-bold text-brand-700" : "text-[13px] font-semibold text-ink-800"}>{v}</span>
    </div>
  );
}
