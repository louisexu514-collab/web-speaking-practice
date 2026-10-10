import { useState } from "react";
import { RotateCcw, Save, Settings2, Sparkles } from "lucide-react";
import { useApp } from "../state/AppState";
import { useToast } from "../components/Toast";
import { Badge, Button, Card, PageHeader, Select } from "../components/ui";
import { uid } from "../lib/utils";
import type { Profile, TodayTask } from "../types";

const targetRoles = ["UX Designer", "Product Manager", "Marketing", "HR", "Supply Chain", "Foreign Trade Sales", "General"];
const companyTypes = ["US company", "German company", "Japanese company", "European company", "Joint venture", "Overseas business team"];
const englishLevels = ["B1 — Intermediate", "B2 — Upper-intermediate", "C1 — Advanced", "C2 — Proficient"];
const weaknesses = [
  "I freeze during interviews",
  "I cannot explain my projects",
  "I lack professional expressions",
  "I cannot answer follow-up questions",
  "I sound too Chinese",
  "I cannot speak in meetings",
];
const preferredScenarios = ["Foreign-company Interview", "IELTS Speaking", "Workplace Meeting", "Business Client", "Overseas Travel"];

/** weakness → the practice mix the coach would put on the dashboard */
function recommendedTasks(p: Profile): TodayTask[] {
  const base: Omit<TodayTask, "id">[] = [];
  switch (p.weakness) {
    case "I freeze during interviews":
      base.push(
        { title: "30 秒快答：自我介绍", titleEn: "30-sec quick answer: self-introduction", status: "not_started", topicId: "t-self-intro", taskType: "30-sec Answer", timeLimit: 30 },
        { title: "慢速跟读一版标准回答", titleEn: "Slow read-aloud of a standard answer", status: "not_started", topicId: "t-self-intro", taskType: "30-sec Answer", timeLimit: 30 },
        { title: "Why this company：三句版", titleEn: "Why this company — 3-sentence version", status: "not_started", topicId: "t-why-company", taskType: "30-sec Answer", timeLimit: 30 }
      );
      break;
    case "I cannot explain my projects":
      base.push(
        { title: "用 CPADI 拆一个项目", titleEn: "Break down one project with CPADI", status: "not_started", topicId: "t-project-experience", taskType: "60-sec Answer", timeLimit: 60 },
        { title: "只练「我的贡献」那一段", titleEn: "Drill the 'my contribution' segment", status: "not_started", topicId: "t-project-experience", taskType: "30-sec Answer", timeLimit: 30 },
        { title: "讲一个有数字结果的项目", titleEn: "Tell a project story with a number", status: "not_started", topicId: "t-challenging-project", taskType: "60-sec Answer", timeLimit: 60 }
      );
      break;
    case "I lack professional expressions":
      base.push(
        { title: "学 5 组职业化替换表达", titleEn: "Learn 5 professional upgrades", status: "not_started", topicId: "t-client-followup", taskType: "30-sec Answer", timeLimit: 30 },
        { title: "跟读客户跟进模板", titleEn: "Read-aloud: client follow-up template", status: "not_started", topicId: "t-client-followup", taskType: "60-sec Answer", timeLimit: 60 },
        { title: "价格谈判：价值锚定练习", titleEn: "Price negotiation: value anchoring", status: "not_started", topicId: "t-price-negotiation", taskType: "60-sec Answer", timeLimit: 60 }
      );
      break;
    case "I cannot answer follow-up questions":
      base.push(
        { title: "追问挑战：项目经历", titleEn: "Follow-up challenge: project experience", status: "not_started", topicId: "t-project-experience", taskType: "Follow-up Challenge", timeLimit: 90 },
        { title: "追问挑战：冲突处理", titleEn: "Follow-up challenge: conflict resolution", status: "not_started", topicId: "t-conflict", taskType: "Follow-up Challenge", timeLimit: 90 },
        { title: "追问挑战：团队合作", titleEn: "Follow-up challenge: teamwork", status: "not_started", topicId: "t-teamwork", taskType: "Follow-up Challenge", timeLimit: 90 }
      );
      break;
    case "I sound too Chinese":
      base.push(
        { title: "PREP 结构表达观点", titleEn: "Express opinions with PREP", status: "not_started", topicId: "t-meeting-disagreement", taskType: "60-sec Answer", timeLimit: 60 },
        { title: "会上礼貌反对练习", titleEn: "Disagree politely in meetings", status: "not_started", topicId: "t-meeting-disagreement", taskType: "60-sec Answer", timeLimit: 60 },
        { title: "三段式进度汇报", titleEn: "Three-part progress update", status: "not_started", topicId: "t-progress-update", taskType: "30-sec Answer", timeLimit: 30 }
      );
      break;
    case "I cannot speak in meetings":
    default:
      base.push(
        { title: "会议发言：表达观点", titleEn: "Speak up: express your opinion", status: "not_started", topicId: "t-meeting-disagreement", taskType: "60-sec Answer", timeLimit: 60 },
        { title: "30 秒进度汇报", titleEn: "30-sec progress update", status: "not_started", topicId: "t-progress-update", taskType: "30-sec Answer", timeLimit: 30 },
        { title: "跨部门对齐表达", titleEn: "Cross-functional alignment practice", status: "not_started", topicId: "t-cross-functional", taskType: "60-sec Answer", timeLimit: 60 }
      );
      break;
  }
  base.push({
    title: "复盘今日卡顿表达",
    titleEn: "Review today's stuck expressions",
    status: "not_started",
    topicId: "t-conflict",
    taskType: "30-sec Answer",
    timeLimit: 30,
  });
  return base.map((t) => ({ ...t, id: uid("task") }));
}

export function ProfilePage() {
  const { data, saveProfile, replaceTodayTasks, resetDemo } = useApp();
  const { toast } = useToast();
  const [form, setForm] = useState<Profile>(data.profile);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    saveProfile(form);
    // rebuild the not-yet-finished part of today's plan around the new goal
    const keepDone = data.todayTasks.filter((t) => t.status === "done").length;
    replaceTodayTasks(recommendedTasks(form).slice(0, Math.max(1, 4 - keepDone)));
    toast("Profile saved — today's practice has been updated for your new goal.");
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Profile & Goal"
        subtitle="Your settings drive what shows up on the Dashboard."
        chinese="目标变了，训练重点就变了"
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <div className="flex items-center gap-2.5">
            <Settings2 size={16} className="text-brand-600" />
            <span className="text-[15px] font-bold text-ink-900">Goal settings</span>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Target Role" hint="目标岗位">
              <Select value={form.targetRole} onChange={(e) => set("targetRole", e.target.value)} className="h-11 rounded-xl w-full">
                {targetRoles.map((r) => <option key={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Target Company Type" hint="目标公司类型">
              <Select value={form.companyType} onChange={(e) => set("companyType", e.target.value)} className="h-11 rounded-xl w-full">
                {companyTypes.map((r) => <option key={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Current English Level" hint="当前英语水平">
              <Select value={form.englishLevel} onChange={(e) => set("englishLevel", e.target.value)} className="h-11 rounded-xl w-full">
                {englishLevels.map((r) => <option key={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Preferred Scenario" hint="优先场景">
              <Select value={form.preferredScenario} onChange={(e) => set("preferredScenario", e.target.value)} className="h-11 rounded-xl w-full">
                {preferredScenarios.map((r) => <option key={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Main Weakness" hint="最想解决的问题" wide>
              <div className="flex flex-wrap gap-2">
                {weaknesses.map((w) => (
                  <button
                    key={w}
                    onClick={() => set("weakness", w)}
                    className={
                      form.weakness === w
                        ? "cursor-pointer rounded-full border border-brand-500 bg-brand-600 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]"
                        : "cursor-pointer rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[12px] font-semibold text-ink-600 transition hover:border-brand-300 hover:text-brand-700"
                    }
                  >
                    {w}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={`Daily Practice Time — ${form.dailyMinutes} min`} hint="每日练习时长" wide>
              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={form.dailyMinutes}
                onChange={(e) => set("dailyMinutes", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-900/10 accent-brand-600"
              />
              <div className="mt-1 flex justify-between text-[11px] text-ink-400">
                <span>10 min</span><span>45 min</span><span>90 min</span>
              </div>
            </Field>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
            <Button variant="ghost" size="sm" onClick={resetDemo}>
              <RotateCcw size={14} /> Reset demo data
            </Button>
            <div className="flex gap-2.5">
              <Button variant="outline" onClick={() => setForm(data.profile)}>Revert</Button>
              <Button onClick={handleSave}>
                <Save size={15} /> Save Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* preview card */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">
              <Sparkles size={12} /> Live preview
            </div>
            <div className="mt-3 space-y-3">
              <PreviewRow label="Goal" value={`${form.targetRole} · ${form.preferredScenario}`} />
              <PreviewRow label="Company" value={form.companyType} />
              <PreviewRow label="Level" value={form.englishLevel} />
              <PreviewRow label="Focus" value={form.weakness} />
              <PreviewRow label="Daily" value={`${form.dailyMinutes} minutes`} />
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-[13px] font-bold text-ink-900">What saving changes</div>
            <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink-500">
              <li>· Dashboard top bar shows the new goal</li>
              <li>· Today's unfinished tasks are rebuilt around your weakness</li>
              <li>· Training plan pacing follows your daily minutes</li>
            </ul>
            <Badge tone="brand" className="mt-4">Applies instantly — prototype state</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  wide,
  children,
}: {
  label: string;
  hint?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-[12.5px] font-bold text-ink-800">{label}</span>
        {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-canvas px-3.5 py-2.5">
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">{label}</div>
      <div className="mt-0.5 text-[13px] font-bold text-ink-800">{value}</div>
    </div>
  );
}
