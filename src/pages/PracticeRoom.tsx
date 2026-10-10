import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Check,
  ClipboardList,
  Lightbulb,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Save,
  Square,
  Wand2,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { Badge, Button, Card, Modal, ProgressBar, Tabs } from "../components/ui";
import { useToast } from "../components/Toast";
import { buildContextFromTodayTask } from "../lib/practice";
import { generateFeedback } from "../lib/feedback";
import { formatClock, todayLabel, uid } from "../lib/utils";
import type { Feedback } from "../types";

type RecState = "idle" | "recording" | "paused" | "analyzing";
type Mode = "Read Mode" | "Keyword Mode" | "Free Mode";
const modes = ["Read Mode", "Keyword Mode", "Free Mode"] as const;

export function PracticeRoom() {
  const { practiceContext: ctx, data, startPractice, setTodayTaskStatus, setTopicStatus, addPracticeRecord, addExpressions } = useApp();
  const { toast } = useToast();

  if (!ctx) return <NoContext />;

  return (
    <PracticeSession
      key={ctx.topicName + ctx.taskLabel + ctx.question + (ctx.todayTaskId ?? "")}
      ctx={ctx}
      relatedFollowUps={
        data.topics.find((t) => t.id === ctx.topicId)?.followUpQuestions.slice(1, 4) ?? []
      }
      onSaveRecord={(fb, durationSec) => {
        const avg = Math.round(((fb.fluency + fb.logic + fb.tone) / 3) * 10) / 10;
        addPracticeRecord({
          id: uid("r"),
          date: todayLabel(),
          topicName: ctx.topicName,
          task: ctx.taskLabel.toLowerCase().replace(" answer", " answer"),
          score: avg,
          fluency: fb.fluency,
          logic: fb.logic,
          tone: fb.tone,
          durationSec,
          mainIssue: fb.mainIssue.split("—")[0].toLowerCase().slice(0, 38),
          nextStep: "review suggested upgrade",
        });
        if (ctx.usefulExpressions?.length) addExpressions(ctx.usefulExpressions.slice(0, 2).map((e) => e.replace(/\.\.\.$/, "")));
      }}
      onMarkDone={() => {
        if (ctx.todayTaskId) setTodayTaskStatus(ctx.todayTaskId, "done");
        if (ctx.topicId) {
          const t = data.topics.find((x) => x.id === ctx.topicId);
          if (t && t.status !== "Mastered") setTopicStatus(ctx.topicId, "Practiced");
        }
      }}
    />
  );
}

function NoContext() {
  const { data, navigate, startPractice } = useApp();
  return (
    <div className="space-y-6">
      <Card className="p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-brand-50 text-brand-600">
          <Mic size={24} />
        </div>
        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink-900">Pick a task to start practicing</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
          Practice Room works with a concrete task — choose one of today's tasks, or open any topic from the library.
        </p>
      </Card>
      <div>
        <h3 className="mb-3 text-[15px] font-bold text-ink-900">Today's tasks</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.todayTasks.map((task) => {
            const topic = data.topics.find((t) => t.id === task.topicId);
            return (
              <Card key={task.id} hover className="p-5">
                <button
                  className="w-full cursor-pointer text-left"
                  onClick={() => startPractice(buildContextFromTodayTask(task, topic))}
                >
                  <div className="text-[14.5px] font-bold text-ink-900">{task.titleEn}</div>
                  <div className="mt-1 text-[12px] text-ink-400">{topic?.topicName} · {task.taskType}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600">
                    Start <ArrowRight size={13} />
                  </div>
                </button>
              </Card>
            );
          })}
          <Card hover className="p-5">
            <button className="w-full cursor-pointer text-left" onClick={() => navigate("library")}>
              <div className="text-[14.5px] font-bold text-ink-900">Or browse the Topic Library</div>
              <div className="mt-1 text-[12px] text-ink-400">15+ topics with full practice assets</div>
              <div className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-600">
                Browse <ArrowRight size={13} />
              </div>
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PracticeSession({
  ctx,
  relatedFollowUps,
  onSaveRecord,
  onMarkDone,
}: {
  ctx: NonNullable<ReturnType<typeof useApp>["practiceContext"]>;
  relatedFollowUps: string[];
  onSaveRecord: (fb: Feedback, durationSec: number) => void;
  onMarkDone: () => void;
}) {
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("Read Mode");
  const [recState, setRecState] = useState<RecState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recState === "recording") {
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [recState]);

  // auto-stop at the time limit
  useEffect(() => {
    if (recState === "recording" && elapsed >= ctx.timeLimit) {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, recState]);

  const startRecording = () => {
    setRecState("recording");
    if (ctx.todayTaskId) { /* task already linked; status flips on Mark Task Done */ }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecState("analyzing");
    setTimeout(() => {
      setFeedback(generateFeedback(ctx.topicName));
      setShowFeedback(true);
      setRecState("idle");
    }, 1600);
  };

  const resetSession = () => {
    setElapsed(0);
    setFeedback(null);
    setShowFeedback(false);
    setRecState("idle");
  };

  const progressPct = Math.min(100, (elapsed / ctx.timeLimit) * 100);
  const remaining = Math.max(0, ctx.timeLimit - elapsed);

  return (
    <div className="space-y-5">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-tight text-ink-900">Practice Room</h1>
          <p className="mt-1 text-sm text-ink-500">
            {ctx.topicName} · {ctx.taskLabel}
          </p>
        </div>
        <Badge tone="brand" className="px-3 py-1 text-[12px]">
          <ClipboardList size={12} /> Task {ctx.taskLabel} · {ctx.timeLimit}s limit
        </Badge>
      </div>

      <div className="grid gap-5 xl:grid-cols-[300px_1fr_300px]">
        {/* ---------------- left: task card ---------------- */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Task</div>
            <div className="mt-1 text-[15px] font-bold leading-snug text-ink-900">
              {ctx.taskLabel === "Follow-up Challenge" ? "Follow-up Challenge" : `${ctx.taskLabel} — ${ctx.topicName}`}
            </div>
            <div className="mt-4 space-y-3 border-t border-hairline pt-4">
              <Meta label="Topic" value={ctx.topicName} />
              <div>
                <div className="text-[11px] font-medium text-ink-400">Framework</div>
                <div className="mt-1 flex flex-wrap items-center gap-1">
                  {(ctx.frameworkSteps ?? ctx.framework.split(/[\s→-]+/).filter(Boolean)).map((step, i, arr) => (
                    <span key={step + i} className="flex items-center gap-1">
                      <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11.5px] font-semibold text-brand-700">
                        {step}
                      </span>
                      {i < arr.length - 1 && <ArrowRight size={10} className="text-ink-300" />}
                    </span>
                  ))}
                </div>
              </div>
              <Meta label="Time Limit" value={`${ctx.timeLimit} seconds`} />
            </div>
            <div className="mt-4 rounded-2xl bg-ink-900 p-4">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-mint-200">
                <Brain size={12} /> Interviewer asks
              </div>
              <div className="mt-2 text-[14.5px] font-semibold leading-relaxed text-white">
                “{ctx.question}”
              </div>
            </div>
          </Card>

          {relatedFollowUps.length > 0 && (
            <Card className="p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                They will follow up with
              </div>
              <ul className="mt-3 space-y-2.5">
                {relatedFollowUps.map((q) => (
                  <li key={q} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                    {q}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* ---------------- center: answer area ---------------- */}
        <Card className="flex min-h-[520px] flex-col p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs tabs={modes} value={mode} onChange={setMode} />
            {recState !== "idle" && recState !== "analyzing" && (
              <span className="text-[13px] font-bold tabular-nums text-ink-700">{formatClock(elapsed)}</span>
            )}
          </div>

          <div className="mt-5 flex-1">
            {mode === "Read Mode" && (
              <div className="rounded-2xl border border-hairline bg-canvas p-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  <BookOpen size={12} /> Reference answer — read along, then retell
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.9] text-ink-800">
                  {ctx.referenceAnswer ??
                    "A strong answer names the situation in one line, spends most time on your deliberate actions, and closes with a measurable result."}
                </p>
              </div>
            )}
            {mode === "Keyword Mode" && (
              <div className="rounded-2xl border border-hairline bg-canvas p-5">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  <Lightbulb size={12} /> Keywords only — speak from these cues
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(ctx.keywords ?? ["situation", "challenge", "my action", "decision", "result"]).map((k, i) => (
                    <span
                      key={k + i}
                      className="rounded-xl border border-brand-100 bg-white px-3.5 py-2 text-[13px] font-semibold text-brand-700 shadow-[0_1px_2px_rgba(20,24,40,0.05)]"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {mode === "Free Mode" && (
              <div className="grid h-full min-h-[300px] place-items-center rounded-2xl border border-dashed border-hairline bg-canvas">
                <div className="text-center">
                  <Mic size={26} className="mx-auto text-ink-300" />
                  <div className="mt-3 text-[14px] font-bold text-ink-700">No prompts. Just you and the timer.</div>
                  <div className="mt-1 text-[12.5px] text-ink-400">模拟真实面试压力：看不到任何提示。</div>
                </div>
              </div>
            )}
          </div>

          {/* recording zone */}
          <div className="mt-6 rounded-3xl bg-ink-900 p-6">
            {recState === "analyzing" ? (
              <div className="flex flex-col items-center py-4 text-white">
                <div className="h-8 w-8 rounded-full border-[3px] border-white/20 border-t-mint-400 fb-spin" />
                <div className="mt-4 text-[14px] font-bold">Analyzing your answer…</div>
                <div className="mt-1 text-[12px] text-white/50">Fluency · Logic · Professional tone</div>
              </div>
            ) : (
              <>
                <Waveform active={recState === "recording"} />
                <div className="mt-5 flex flex-col items-center">
                  <div className="font-extrabold tabular-nums tracking-tight text-white" style={{ fontSize: 40 }}>
                    {formatClock(elapsed)}
                  </div>
                  <div className="mt-1 text-[11.5px] font-medium text-white/40">
                    {recState === "recording"
                      ? `${remaining}s remaining · recording (simulated)`
                      : recState === "paused"
                        ? "Paused"
                        : `Ready · ${ctx.timeLimit}s limit`}
                  </div>
                  <div className="mt-4 w-56">
                    <ProgressBar value={progressPct} className="h-1.5 bg-white/10" tone="mint" />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                    {recState === "idle" && (
                      <Button variant="record" size="lg" onClick={startRecording}>
                        <Mic size={16} /> Start Recording
                      </Button>
                    )}
                    {recState === "recording" && (
                      <>
                        <Button variant="dark" size="md" onClick={() => setRecState("paused")}>
                          <Pause size={15} /> Pause
                        </Button>
                        <Button variant="danger" size="md" onClick={stopRecording}>
                          <Square size={14} fill="currentColor" /> Stop & Analyze
                        </Button>
                      </>
                    )}
                    {recState === "paused" && (
                      <>
                        <Button variant="record" size="md" onClick={() => setRecState("recording")}>
                          <Play size={15} /> Resume
                        </Button>
                        <Button variant="danger" size="md" onClick={stopRecording}>
                          <Square size={14} fill="currentColor" /> Stop & Analyze
                        </Button>
                      </>
                    )}
                    {recState === "idle" && elapsed > 0 && (
                      <Button variant="dark" size="md" onClick={resetSession}>
                        <RotateCcw size={14} /> Reset
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* ---------------- right: assist panel ---------------- */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-[13px] font-bold text-ink-900">
              <Wand2 size={15} className="text-brand-600" /> Useful Expressions
            </div>
            <ul className="mt-3 space-y-2">
              {(ctx.usefulExpressions ?? []).slice(0, 6).map((e) => (
                <li
                  key={e}
                  className="rounded-xl bg-brand-50/60 px-3 py-2 text-[12.5px] font-medium leading-relaxed text-brand-800"
                >
                  {e}
                </li>
              ))}
              {(ctx.usefulExpressions ?? []).length === 0 && (
                <li className="text-[12.5px] text-ink-400">No hints for this one — you've got it.</li>
              )}
            </ul>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 text-[13px] font-bold text-ink-900">
              <AlertTriangle size={15} className="text-amber-500" /> Common Mistakes
            </div>
            <ul className="mt-3 space-y-2.5">
              {(ctx.commonMistakes ?? []).map((m) => (
                <li key={m} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                  {m}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* ---------------- feedback modal ---------------- */}
      <Modal open={showFeedback && !!feedback} onClose={() => setShowFeedback(false)} wide>
        {feedback && (
          <div className="p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-mint-500 to-mint-700 text-white shadow-[0_6px_16px_rgba(20,184,166,0.3)]">
                <BadgeCheck size={20} />
              </span>
              <div>
                <h3 className="text-[19px] font-extrabold tracking-tight text-ink-900">Practice Feedback</h3>
                <p className="text-[12.5px] text-ink-400">
                  {ctx.topicName} · {ctx.taskLabel} · {formatClock(elapsed)} recorded
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <ScorePill label="Fluency" value={feedback.fluency} />
              <ScorePill label="Logic" value={feedback.logic} />
              <ScorePill label="Professional Tone" value={feedback.tone} />
            </div>

            <div className="mt-4 space-y-2.5 rounded-2xl border border-hairline bg-canvas p-4">
              <Row label="Response Structure" value={feedback.structure} />
              <Row label="Main Issue" value={feedback.mainIssue} highlight />
            </div>

            <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600">Suggested Upgrade</div>
              <div className="mt-2.5 space-y-2">
                <div className="rounded-xl bg-white px-3.5 py-2.5 text-[13px] text-ink-400 line-through decoration-ink-300/60">
                  {feedback.upgradeFrom}
                </div>
                <div className="rounded-xl bg-white px-3.5 py-2.5 text-[13.5px] font-medium leading-relaxed text-ink-800 shadow-[0_1px_2px_rgba(20,24,40,0.06)]">
                  {feedback.upgradeTo}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2.5">
              <Button variant="outline" onClick={resetSession}>
                <RotateCcw size={14} /> Practice Again
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  if (feedback) onSaveRecord(feedback, elapsed);
                  toast("Feedback saved to Review Tracker.");
                  setShowFeedback(false);
                }}
              >
                <Save size={14} /> Save Feedback
              </Button>
              <Button
                onClick={() => {
                  if (feedback) onSaveRecord(feedback, elapsed);
                  onMarkDone();
                  toast("Task marked as done. Keep the streak alive.");
                  setShowFeedback(false);
                }}
              >
                <Check size={15} /> Mark Task Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] font-medium text-ink-400">{label}</span>
      <span className="text-[13px] font-bold text-ink-900">{value}</span>
    </div>
  );
}

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-hairline bg-canvas p-3.5 text-center">
      <div className="text-[22px] font-extrabold tracking-tight text-ink-900">
        {value.toFixed(1)}
        <span className="text-[12px] font-semibold text-ink-400"> / 5</span>
      </div>
      <div className="mt-0.5 text-[11px] font-medium text-ink-500">{label}</div>
      <ProgressBar value={(value / 5) * 100} className="mt-2 h-1" tone={value >= 3.5 ? "mint" : "amber"} />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex gap-3">
      <span className="w-36 shrink-0 text-[12px] font-semibold text-ink-400">{label}</span>
      <span className={highlight ? "text-[13px] font-semibold leading-relaxed text-amber-700" : "text-[13px] font-semibold text-ink-800"}>
        {value}
      </span>
    </div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const bars = useMemo(() => Array.from({ length: 36 }, (_, i) => i), []);
  return (
    <div className="flex h-16 items-center justify-center gap-[3px]">
      {bars.map((i) => (
        <span
          key={i}
          className={active ? "fb-wave-bar" : ""}
          style={{
            width: 4,
            borderRadius: 99,
            height: active ? `${18 + Math.abs(Math.sin(i * 0.7)) * 38}px` : "6px",
            background: active
              ? `rgba(153,246,228,${0.5 + Math.abs(Math.sin(i * 1.3)) * 0.5})`
              : "rgba(255,255,255,0.15)",
            animationDelay: `${(i % 12) * 0.08}s`,
            animationDuration: `${0.7 + (i % 5) * 0.12}s`,
            transition: "height .4s ease, background .4s ease",
          }}
        />
      ))}
    </div>
  );
}
