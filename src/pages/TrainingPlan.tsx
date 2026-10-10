import { useMemo } from "react";
import {
  Check,
  ChevronRight,
  Clock,
  Flame,
  Info,
  Lock,
  Target,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { Badge, Button, Card, PageHeader, ProgressBar } from "../components/ui";
import { planDays, planWeeks } from "../data/mockData";
import { buildContextFromTopic } from "../lib/practice";
import { cn } from "../lib/utils";
import { Sparkles } from "lucide-react";

export function TrainingPlan() {
  const { data, startPractice, planBanner, clearPlanBanner } = useApp();

  const doneCount = planDays.filter((d) => d.state === "done").length;
  const currentWeek = planWeeks.find((w) => w.week === planDays.find((d) => d.state === "today")?.week) ?? planWeeks[0];

  const openDay = (day: (typeof planDays)[number]) => {
    const topic = data.topics.find((t) => t.id === day.topicId) ?? data.topics[0];
    const taskLabel =
      day.taskType === "Weekly Review" ? "90-sec Answer" : day.taskType;
    startPractice(buildContextFromTopic(topic, taskLabel));
  };

  const weekCompletion = useMemo(
    () =>
      planWeeks.map((w) => {
        const days = planDays.filter((d) => d.week === w.week);
        const done = days.filter((d) => d.state === "done").length;
        return { week: w, pct: Math.round((done / days.length) * 100) };
      }),
    []
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="30-Day Foreign-company Speaking Plan"
        subtitle="A task-based path from interview basics to workplace communication."
        chinese="阶段性成长：讲清自己 → 讲清项目 → 接住追问 → 进入职场沟通"
        actions={
          <Badge tone="mint" className="px-3 py-1.5">
            <TrendingUp size={13} /> {doneCount} / 28 days done
          </Badge>
        }
      />

      {planBanner && (
        <div className="fb-pop-in flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
          <Sparkles size={17} className="mt-0.5 shrink-0 text-brand-600" />
          <p className="flex-1 text-[13.5px] font-medium leading-relaxed text-brand-800">{planBanner}</p>
          <button
            onClick={clearPlanBanner}
            className="cursor-pointer text-[12px] font-semibold text-brand-500 hover:text-brand-700"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[1fr_290px]">
        {/* ---------------- weeks map ---------------- */}
        <div className="space-y-5">
          {planWeeks.map((w) => {
            const days = planDays.filter((d) => d.week === w.week);
            return (
              <Card key={w.week} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-2xl text-[15px] font-extrabold",
                        w.week === currentWeek.week
                          ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                          : "bg-canvas text-ink-400"
                      )}
                    >
                      W{w.week}
                    </span>
                    <div>
                      <div className="text-[15px] font-bold text-ink-900">
                        Week {w.week} · {w.name}
                      </div>
                      <div className="text-[12px] text-ink-400">
                        目标：{w.goal} — {w.goalEn}
                      </div>
                    </div>
                  </div>
                  {w.week === currentWeek.week && <Badge tone="brand"><Flame size={11} /> Current week</Badge>}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
                  {days.map((d) => (
                    <DayCard key={d.day} day={d} onClick={() => openDay(d)} />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* ---------------- right sidebar ---------------- */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-ink-900 to-ink-800 p-5 text-white">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-mint-200">
              <Target size={12} /> This week's goal
            </div>
            <div className="mt-2.5 text-[17px] font-extrabold leading-snug">{currentWeek.name}</div>
            <div className="mt-1 text-[13px] text-white/60">目标：{currentWeek.goal} · {currentWeek.goalEn}</div>
            <div className="mt-4 space-y-3">
              {weekCompletion.map((wc) => (
                <div key={wc.week.week}>
                  <div className="flex items-baseline justify-between text-[11.5px]">
                    <span className="font-semibold text-white/70">Week {wc.week.week} · {wc.week.name}</span>
                    <span className="font-bold tabular-nums text-white">{wc.pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        wc.week.week === currentWeek.week ? "bg-mint-400" : "bg-white/40"
                      )}
                      style={{ width: `${wc.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 text-[13px] font-bold text-ink-900">
              <Clock size={15} className="text-brand-600" /> Suggested rhythm
            </div>
            <ul className="mt-3 space-y-2.5 text-[13px] text-ink-600">
              <li className="flex gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />{data.profile.dailyMinutes} minutes per day, ideally at a fixed time</li>
              <li className="flex gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />30-sec answer first, then the full 60-sec version</li>
              <li className="flex gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />Record, get feedback, then re-record once</li>
              <li className="flex gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />Weekly review day: replay 2 recordings back-to-back</li>
            </ul>
            <div className="mt-4 rounded-2xl bg-canvas p-3.5">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-ink-700">
                <Info size={13} className="text-ink-400" /> Completion
              </div>
              <ProgressBar value={(doneCount / planDays.length) * 100} className="mt-2" />
              <div className="mt-1.5 text-[11.5px] text-ink-400">{doneCount} of 28 days · keep the pace</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DayCard({ day, onClick }: { day: (typeof planDays)[number]; onClick: () => void }) {
  const done = day.state === "done";
  const today = day.state === "today";
  return (
    <button
      onClick={onClick}
      title={done ? "Completed — click to practice again" : today ? "Today's task" : "Locked preview — click to practice anyway"}
      className={cn(
        "group relative flex cursor-pointer flex-col items-start rounded-2xl border p-3 text-left transition-all duration-150",
        done && "border-mint-200 bg-mint-50 hover:-translate-y-0.5 hover:shadow-lift",
        today && "border-brand-500 bg-brand-50 shadow-[0_0_0_4px_rgba(79,70,229,0.08)] hover:-translate-y-0.5",
        !done && !today && "border-hairline bg-white hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={cn(
            "text-[10.5px] font-bold uppercase tracking-wider",
            done ? "text-mint-600" : today ? "text-brand-600" : "text-ink-300"
          )}
        >
          Day {day.day}
        </span>
        {done && <Check size={13} strokeWidth={3} className="text-mint-600" />}
        {today && <Flame size={13} className="text-brand-600" />}
        {!done && !today && <Lock size={11} className="text-ink-300" />}
      </div>
      <span
        className={cn(
          "mt-2 text-[12px] font-bold leading-snug",
          done ? "text-mint-800" : today ? "text-brand-800" : "text-ink-600"
        )}
      >
        {day.title}
      </span>
      <span className="mt-1 text-[10.5px] font-medium text-ink-400">{day.taskType}</span>
      <span className="mt-2 inline-flex items-center gap-0.5 text-[10.5px] font-semibold text-brand-600 opacity-0 transition group-hover:opacity-100">
        Practice <ChevronRight size={10} />
      </span>
    </button>
  );
}
