import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Loader2,
  Save,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { useApp } from "../state/AppState";
import { useToast } from "../components/Toast";
import { Badge, Button, Card, PageHeader } from "../components/ui";
import { parseSteps, sampleFiles, type SampleFile } from "../data/mockData";
import { synthesizeTopic } from "../lib/topicFactory";
import { cn } from "../lib/utils";

type Phase = "idle" | "parsing" | "done";

export function UploadAnalyzer() {
  const { addTopics, updateTopic, navigate, setPlanBanner } = useApp();
  const { toast } = useToast();
  const [file, setFile] = useState<SampleFile | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIdx, setStepIdx] = useState(-1);
  const [dragOver, setDragOver] = useState(false);
  const [saved, setSaved] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const runParse = (f: SampleFile, displayName: string) => {
    timers.current.forEach(clearTimeout);
    setFile(f);
    setFileName(displayName);
    setPhase("parsing");
    setStepIdx(0);
    setSaved(false);
    parseSteps.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStepIdx(i + 1), 650 * (i + 1)));
    });
    timers.current.push(setTimeout(() => setPhase("done"), 650 * parseSteps.length + 500));
  };

  const handleRealFile = (name: string) => {
    // any real dropped file is analyzed with the interview-bank profile
    runParse(sampleFiles[1], name);
  };

  const handleSave = () => {
    if (!file) return;
    // synthesized cards are deduped by name against the existing library inside addTopics
    const newTopics = file.clusters.map((c) =>
      synthesizeTopic(c.topicCluster, {
        moduleName: c.module,
        source: "PDF",
        seedQuestion: `Tell me about a time you handled ${c.topicCluster.toLowerCase()}.`,
      })
    );
    // richer built-in versions of the same clusters get flagged as PDF-sourced instead of duplicated
    file.clusters.forEach((c) => updateTopic(c.topicId, { source: "PDF" }));
    addTopics(newTopics);
    setSaved(true);
    toast(`${file.topics} topics saved to your Topic Library.`);
  };

  const handleGeneratePlan = () => {
    if (!file) return;
    setPlanBanner(`7-day practice plan generated from "${fileName}" — anchored on its ${file.clusters.length} strongest topic clusters.`);
    navigate("plan");
    toast("7-day practice plan generated.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upload Analyzer"
        subtitle="Upload your question bank or speaking book"
        chinese="上传 PDF / 题库 / 口语书，自动拆解成结构化话题库"
      />

      <div className="grid gap-5 lg:grid-cols-[400px_1fr]">
        {/* ---------------- upload card ---------------- */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-[13px] font-bold text-ink-900">Upload your question bank or speaking book</div>
            <div className="mt-1 text-[12px] text-ink-400">PDF, DOCX, TXT, Markdown, scanned notes</div>

            <label
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const dropped = e.dataTransfer.files?.[0]?.name;
                handleRealFile(dropped ?? "Dropped file.pdf");
              }}
              className={cn(
                "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all",
                dragOver ? "border-brand-500 bg-brand-50" : "border-hairline bg-canvas hover:border-brand-300 hover:bg-brand-50/40"
              )}
            >
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.md"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleRealFile(f.name);
                }}
              />
              <span className={cn(
                "grid h-14 w-14 place-items-center rounded-3xl transition-transform",
                dragOver ? "scale-110 bg-brand-600 text-white" : "bg-white text-brand-600 shadow-soft"
              )}>
                <UploadCloud size={24} />
              </span>
              <div className="mt-4 text-[14px] font-bold text-ink-800">Drag your file here or click to upload</div>
              <div className="mt-1 text-[12px] text-ink-400">Files stay in this prototype — nothing is uploaded.</div>
            </label>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 text-[13px] font-bold text-ink-900">
              <FolderOpen size={15} className="text-brand-600" /> Or try a sample file
            </div>
            <div className="mt-3 space-y-2.5">
              {sampleFiles.map((f) => (
                <button
                  key={f.name}
                  onClick={() => runParse(f, f.name)}
                  disabled={phase === "parsing"}
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all disabled:opacity-50",
                    fileName === f.name && phase !== "idle"
                      ? "border-brand-400 bg-brand-50"
                      : "border-hairline bg-white hover:border-brand-300 hover:bg-brand-50/40"
                  )}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-500">
                    {f.name.includes("IELTS") ? <FileSpreadsheet size={16} /> : <FileText size={16} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-ink-800">{f.name}</span>
                    <span className="text-[11.5px] text-ink-400">{f.questions} questions · {f.topics} topics</span>
                  </span>
                  <ChevronRight size={15} className="text-ink-300 transition group-hover:text-brand-500" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* ---------------- right: parsing / result ---------------- */}
        <div>
          {phase === "idle" && <EmptyPreview />}
          {phase === "parsing" && (
            <ParsingPanel fileName={fileName} steps={parseSteps} stepIdx={stepIdx} file={file} />
          )}
          {phase === "done" && file && (
            <ResultPanel
              file={file}
              fileName={fileName}
              saved={saved}
              onSave={handleSave}
              onGeneratePlan={handleGeneratePlan}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyPreview() {
  return (
    <Card className="grid h-full min-h-[420px] place-items-center p-8">
      <div className="max-w-sm text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand-50 text-brand-500">
          <Sparkles size={26} />
        </div>
        <div className="mt-4 text-[16px] font-bold text-ink-900">Analysis results appear here</div>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
          Pick a sample file or drop your own. The analyzer will split it into topic clusters,
          vocabulary, and practice tasks.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["Read structure", "Extract questions", "Group topics", "Generate assets"].map((s) => (
            <Badge key={s} tone="gray">{s}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ParsingPanel({
  fileName,
  steps,
  stepIdx,
  file,
}: {
  fileName: string;
  steps: string[];
  stepIdx: number;
  file: SampleFile | null;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <Loader2 size={18} className="fb-spin" />
        </span>
        <div>
          <div className="truncate text-[14.5px] font-bold text-ink-900">{fileName}</div>
          <div className="text-[12px] text-ink-400">Parsing content — this is a simulated pipeline</div>
        </div>
        {file && (
          <Badge tone="brand" className="ml-auto">{file.topics} topics expected</Badge>
        )}
      </div>

      <div className="mt-6 space-y-1">
        {steps.map((s, i) => {
          const state = i < stepIdx ? "done" : i === stepIdx ? "active" : "pending";
          return (
            <div
              key={s}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 transition-all",
                state === "active" && "bg-brand-50",
                state === "done" && "opacity-80"
              )}
            >
              {state === "done" && <CheckCircle2 size={18} className="text-mint-600" />}
              {state === "active" && <Loader2 size={18} className="fb-spin text-brand-600" />}
              {state === "pending" && <span className="grid h-[18px] w-[18px] place-items-center"><span className="h-1.5 w-1.5 rounded-full bg-ink-300" /></span>}
              <span className={cn(
                "text-[13.5px] font-medium",
                state === "pending" ? "text-ink-400" : "text-ink-800"
              )}>
                {s}
              </span>
              {state === "done" && <Check size={13} className="ml-auto text-mint-500" />}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="h-1.5 overflow-hidden rounded-full bg-ink-900/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-mint-500 transition-all duration-500"
            style={{ width: `${(stepIdx / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
}

function ResultPanel({
  file,
  fileName,
  saved,
  onSave,
  onGeneratePlan,
}: {
  file: SampleFile;
  fileName: string;
  saved: boolean;
  onSave: () => void;
  onGeneratePlan: () => void;
}) {
  return (
    <Card className="fb-pop-in p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint-50 text-mint-600">
          <CheckCircle2 size={19} />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[15px] font-bold text-ink-900">{fileName} — parsed</div>
          <div className="text-[12px] text-ink-400">Analysis Summary</div>
        </div>
        <Badge tone="mint" className="ml-auto">
          <Check size={11} /> Ready
        </Badge>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <SummaryRow label="File Type" value={file.fileType} />
        <SummaryRow label="Questions Found" value={String(file.questions)} strong />
        <SummaryRow label="Topics Generated" value={String(file.topics)} strong />
        <SummaryRow label="Duplicate Questions Merged" value={String(file.merged)} />
        <SummaryRow label="Best For" value={file.bestFor} wide />
        <SummaryRow label="Difficulty" value={file.difficulty} />
      </div>

      <div className="mt-6">
        <div className="mb-2.5 text-[13px] font-bold text-ink-900">Generated topic clusters</div>
        <div className="overflow-hidden rounded-2xl border border-hairline">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-hairline bg-canvas">
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">Topic Cluster</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">Questions</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-400">Practice Module</th>
              </tr>
            </thead>
            <tbody>
              {file.clusters.map((c) => (
                <tr key={c.topicCluster} className="border-b border-hairline last:border-0 hover:bg-canvas/70">
                  <td className="px-4 py-2.5 text-[13px] font-semibold text-ink-800">{c.topicCluster}</td>
                  <td className="px-4 py-2.5 text-[13px] tabular-nums text-ink-600">{c.questions}</td>
                  <td className="px-4 py-2.5">
                    <Badge tone="gray">{c.module}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-2.5">
        <Button variant="outline" onClick={onSave} disabled={saved}>
          {saved ? <Check size={15} /> : <Save size={15} />}
          {saved ? "Saved to Library" : "Save to Topic Library"}
        </Button>
        <Button onClick={onGeneratePlan}>
          <Sparkles size={15} /> Generate 7-day Practice Plan
        </Button>
      </div>
    </Card>
  );
}

function SummaryRow({ label, value, strong, wide }: { label: string; value: string; strong?: boolean; wide?: boolean }) {
  return (
    <div className={cn("rounded-2xl border border-hairline bg-canvas px-4 py-3", wide && "sm:col-span-2")}>
      <div className="text-[11px] font-medium text-ink-400">{label}</div>
      <div className={cn("mt-0.5 text-[13.5px] leading-snug", strong ? "text-[18px] font-extrabold text-brand-700" : "font-semibold text-ink-800")}>
        {value}
      </div>
    </div>
  );
}
