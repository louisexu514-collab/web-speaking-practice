import { useMemo } from "react";
import {
  BookA,
  CheckCircle2,
  CircleDashed,
  Clock,
  Flame,
  Gauge,
  Mic,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { Badge, Card, PageHeader, ProgressBar } from "../components/ui";
import { seedStats } from "../data/mockData";

export function ReviewTracker() {
  const { data } = useApp();

  const totalPractices = seedStats.totalPractices + Math.max(0, data.records.length - 6);
  const speakingMinutes = seedStats.speakingMinutes + Math.round(
    data.records.slice(0, Math.max(0, data.records.length - 6)).reduce((n, r) => n + r.durationSec, 0) / 60
  );
  const avgConfidence = useMemo(() => {
    const sum = data.records.reduce((n, r) => n + (r.fluency + r.logic + r.tone) / 3, 0);
    const live = sum / data.records.length;
    // blend the seeded account average with live sessions
    return Math.round(((seedStats.baseConfidence * 12 + live * data.records.length) / (12 + data.records.length)) * 10) / 10;
  }, [data.records]);

  const dims = useMemo(() => {
    const pick = (key: "fluency" | "logic" | "tone") => {
      const recent = data.records.slice(0, 4);
      const avg = recent.reduce((n, r) => n + r[key], 0) / Math.max(1, recent.length);
      return Math.round(avg * 10) / 10;
    };
    return [
      { name: "Fluency", value: pick("fluency") },
      { name: "Logic", value: pick("logic") },
      { name: "Vocabulary", value: 3.4 },
      { name: "Professional Tone", value: pick("tone") },
      { name: "Follow-up Handling", value: 3.2 },
    ];
  }, [data.records]);

  const statCards = [
    { icon: Mic, label: "Total Practices", value: totalPractices },
    { icon: Clock, label: "Speaking Time", value: `${speakingMinutes} min` },
    { icon: Gauge, label: "Topics Practiced", value: seedStats.topicsPracticed },
    { icon: TrendingUp, label: "Avg Confidence", value: `${avgConfidence} / 5` },
    { icon: BookA, label: "Mastered Expressions", value: seedStats.masteredExpressions + data.expressions.filter((e) => e.status === "Practiced").length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Tracker"
        subtitle="Your growth, made visible — not just a check-in list."
        chinese="练习量、能力维度、历史记录与表达资产，一页看全"
      />

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600">
                <Icon size={17} />
              </span>
              <div className="mt-3 text-[24px] font-extrabold tracking-tight text-ink-900">{s.value}</div>
              <div className="text-[11.5px] font-medium text-ink-400">{s.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        {/* ability dimensions */}
        <Card className="p-6">
          <div className="flex items-center gap-2.5">
            <Flame size={16} className="text-brand-600" />
            <span className="text-[15px] font-bold text-ink-900">Ability Dimensions</span>
          </div>
          <p className="mt-1 text-[12px] text-ink-400">Based on your 4 most recent recordings</p>
          <div className="mt-5 space-y-4">
            {dims.map((d) => (
              <div key={d.name}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold text-ink-700">{d.name}</span>
                  <span className="text-[13px] font-bold tabular-nums text-ink-900">{d.value.toFixed(1)}<span className="text-[11px] font-medium text-ink-400"> / 5</span></span>
                </div>
                <ProgressBar
                  value={(d.value / 5) * 100}
                  className="mt-1.5"
                  tone={d.value >= 3.5 ? "brand" : "amber"}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-canvas p-4">
            <div className="text-[12.5px] font-bold text-ink-800">Coach note</div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-500">
              Fluency is stable — the next unlock is Professional Tone. Record Friday's task in Free Mode
              to stress-test it.
            </p>
          </div>
        </Card>

        {/* history */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <span className="text-[15px] font-bold text-ink-900">Practice History</span>
            <Badge tone="gray">{data.records.length} sessions</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-hairline bg-canvas">
                  {["Date", "Topic", "Task", "Score", "Main Issue", "Next Step"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.records.map((r) => (
                  <tr key={r.id} className="border-b border-hairline last:border-0 hover:bg-canvas/70">
                    <td className="whitespace-nowrap px-5 py-3 text-[12.5px] font-semibold text-ink-600">{r.date}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-[13px] font-bold text-ink-900">{r.topicName}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-[12.5px] text-ink-600">{r.task}</td>
                    <td className="px-5 py-3">
                      <Badge tone={r.score >= 3.8 ? "mint" : r.score >= 3.4 ? "brand" : "amber"}>
                        {r.score.toFixed(1)}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-[12.5px] text-ink-500">{r.mainIssue}</td>
                    <td className="px-5 py-3 text-[12.5px] font-medium text-brand-700">{r.nextStep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* expression bank */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <BookA size={16} className="text-brand-600" />
            <span className="text-[15px] font-bold text-ink-900">Expression Bank</span>
          </div>
          <span className="text-[12px] text-ink-400">Saved expressions from your practice sessions</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {data.expressions.map((e) => (
            <span
              key={e.text}
              className={
                e.status === "Practiced"
                  ? "inline-flex items-center gap-2 rounded-full border border-mint-200 bg-mint-50 px-4 py-2 text-[13px] font-semibold text-mint-700"
                  : "inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[13px] font-medium text-ink-500"
              }
            >
              {e.status === "Practiced" ? (
                <CheckCircle2 size={13} className="text-mint-600" />
              ) : (
                <CircleDashed size={13} className="text-ink-300" />
              )}
              {e.text}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
