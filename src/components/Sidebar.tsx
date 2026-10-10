import {
  BookMarked,
  CalendarRange,
  FileUp,
  LayoutDashboard,
  LibraryBig,
  Mic,
  RefreshCcw,
  Settings2,
  Sparkles,
  SquareChartGantt,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { cn } from "../lib/utils";
import type { Page } from "../types";

const navItems: { page: Page; label: string; icon: typeof LayoutDashboard; hint?: string }[] = [
  { page: "dashboard", label: "Dashboard", icon: LayoutDashboard, hint: "学习首页" },
  { page: "upload", label: "Upload Analyzer", icon: FileUp, hint: "上传题库解析" },
  { page: "generator", label: "Topic Generator", icon: Sparkles, hint: "单话题生成" },
  { page: "library", label: "Topic Library", icon: LibraryBig, hint: "话题库" },
  { page: "plan", label: "Training Plan", icon: SquareChartGantt, hint: "30 天训练路径" },
  { page: "practice", label: "Practice Room", icon: Mic, hint: "开口训练室" },
  { page: "review", label: "Review Tracker", icon: CalendarRange, hint: "复盘与进度" },
  { page: "templates", label: "Template Center", icon: BookMarked, hint: "模板中心" },
  { page: "profile", label: "Profile", icon: Settings2, hint: "个人目标设置" },
];

export function Sidebar() {
  const { page, navigate } = useApp();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[236px] flex-col border-r border-hairline bg-white lg:flex">
      {/* brand */}
      <button
        onClick={() => navigate("dashboard")}
        className="flex cursor-pointer items-center gap-3 px-6 pb-5 pt-7 text-left"
      >
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_4px_12px_rgba(79,70,229,0.35)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 18V8.5L12 4l8 4.5V18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 18v-5h6v5" stroke="#99F6E4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-[17px] font-extrabold tracking-tight text-ink-900 leading-none">FluentBridge</div>
          <div className="mt-1 text-[11px] font-medium text-ink-400">表达训练系统</div>
        </div>
      </button>

      <div className="px-4 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">Workspace</div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const active = page === item.page || (page === "library" && item.page === "library");
          const Icon = item.icon;
          return (
            <button
              key={item.page}
              onClick={() => {
                if (item.page === "practice") {
                  // practice room needs a context; fall back to today's first task via TopBar button
                  navigate("practice");
                } else {
                  navigate(item.page);
                }
              }}
              className={cn(
                "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                active
                  ? "bg-brand-50 text-brand-700 shadow-[inset_0_0_0_1px_rgba(79,70,229,0.12)]"
                  : "text-ink-600 hover:bg-ink-900/[0.04] hover:text-ink-800"
              )}
            >
              <Icon
                size={17}
                strokeWidth={active ? 2.4 : 2}
                className={cn("shrink-0", active ? "text-brand-600" : "text-ink-400 group-hover:text-ink-600")}
              />
              <span className="flex-1 text-[13.5px] font-semibold leading-none">{item.label}</span>
              <span className={cn("text-[10px] font-medium", active ? "text-brand-400" : "text-ink-300")}>
                {item.hint}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-hairline p-4">
        <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 p-4 text-white">
          <div className="text-[13px] font-bold">Prototype mode</div>
          <div className="mt-1 text-[11.5px] leading-relaxed text-white/60">
            All AI parsing is simulated with local mock data. No backend required.
          </div>
          <ResetButton />
        </div>
      </div>
    </aside>
  );
}

function ResetButton() {
  const { resetDemo } = useApp();
  return (
    <button
      onClick={resetDemo}
      className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80 transition hover:bg-white/20 hover:text-white"
    >
      <RefreshCcw size={11} /> Reset demo data
    </button>
  );
}
