import { Flame, Play, Target } from "lucide-react";
import { useApp } from "../state/AppState";
import { Button } from "./ui";
import { buildContextFromTodayTask } from "../lib/practice";

export function TopBar() {
  const { data, streakDay, startPractice } = useApp();
  const done = data.todayTasks.filter((t) => t.status === "done").length;
  const total = data.todayTasks.length;
  const goalLabel = `${data.profile.targetRole} Interview`;

  const startToday = () => {
    const task =
      data.todayTasks.find((t) => t.status === "in_progress") ??
      data.todayTasks.find((t) => t.status === "not_started") ??
      data.todayTasks[0];
    if (!task) return;
    const topic = data.topics.find((t) => t.id === task.topicId);
    startPractice(buildContextFromTodayTask(task, topic));
  };

  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-6 lg:px-8">
        {/* user */}
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[13px] font-bold text-white shadow-[0_2px_8px_rgba(79,70,229,0.35)]">
            L
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-[13.5px] font-bold text-ink-900">Louise</div>
            <div className="text-[11px] text-ink-400">Free plan · Prototype</div>
          </div>
        </div>

        <div className="mx-1 hidden h-6 w-px bg-hairline sm:block" />

        {/* goal */}
        <div className="hidden min-w-0 items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-1.5 md:flex">
          <Target size={14} className="shrink-0 text-brand-600" />
          <span className="truncate text-[12.5px] font-semibold text-ink-700">{goalLabel}</span>
        </div>

        {/* streak */}
        <div className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 sm:flex">
          <Flame size={14} className="text-amber-500" />
          <span className="text-[12.5px] font-bold text-amber-700">Day {streakDay}</span>
        </div>

        <div className="flex-1" />

        {/* today progress */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <div className="text-right leading-tight">
            <div className="text-[11px] font-medium text-ink-400">Today</div>
            <div className="text-[13px] font-bold text-ink-800">
              {done} / {total} tasks
            </div>
          </div>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-900/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mint-500 to-mint-600 transition-all duration-500"
              style={{ width: `${total ? (done / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        <Button size="sm" onClick={startToday} className="ml-1">
          <Play size={13} fill="currentColor" /> Start Today's Practice
        </Button>
      </div>
    </header>
  );
}
