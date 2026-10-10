import { useState } from "react";
import { BookMarked, Check, Copy, Mic, PlusCircle } from "lucide-react";
import { useApp } from "../state/AppState";
import { useToast } from "../components/Toast";
import { Badge, Button, Card, PageHeader, Tabs, useCopy } from "../components/ui";
import { lessonTemplates, templateCategories } from "../data/mockData";
import { buildContextFromTopic } from "../lib/practice";
import { uid } from "../lib/utils";

export function TemplateCenter() {
  const { data, toggleSavedTemplate, addTodayTask, startPractice } = useApp();
  const savedTemplateIds = data.savedTemplateIds;
  const { toast } = useToast();
  const { copy, copiedId } = useCopy();
  const [category, setCategory] = useState<string>("All");

  const visible = lessonTemplates.filter((t) => category === "All" || t.category === category);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Template Center"
        subtitle="Copy-paste scaffolds for interviews, meetings, and client work."
        chinese="把成熟表达直接变成你的起点"
      />

      <Tabs tabs={templateCategories} value={category} onChange={setCategory} size="md" className="flex-wrap" />

      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((tpl) => {
          const saved = savedTemplateIds.includes(tpl.id);
          return (
            <Card key={tpl.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <BookMarked size={17} />
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-ink-900">{tpl.title}</div>
                    <div className="mt-0.5 text-[12px] text-ink-400">{tpl.description}</div>
                  </div>
                </div>
                <Badge tone="gray">{tpl.category}</Badge>
              </div>

              <pre className="mt-4 flex-1 whitespace-pre-wrap rounded-2xl border border-hairline bg-canvas p-4 font-sans text-[13px] leading-[1.8] text-ink-700">
                {tpl.content}
              </pre>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant={copiedId === tpl.id ? "success" : "primary"}
                  onClick={async () => {
                    await copy(tpl.content, tpl.id);
                    toast("Copied to clipboard.");
                  }}
                >
                  {copiedId === tpl.id ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === tpl.id ? "Copied" : "Copy"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const nowSaved = toggleSavedTemplate(tpl.id);
                    toast(nowSaved ? "Template saved to your account." : "Removed from saved templates.");
                  }}
                >
                  {saved ? <Check size={14} className="text-mint-600" /> : <BookMarked size={14} />}
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const topic = data.topics.find((t) => t.scenario === "Interview") ?? data.topics[0];
                    addTodayTask({
                      id: uid("task"),
                      title: `跟读模板：${tpl.title}`,
                      titleEn: `Read-aloud practice: ${tpl.title}`,
                      status: "not_started",
                      topicId: topic.id,
                      taskType: "30-sec Answer",
                      timeLimit: 30,
                    });
                    toast("Added to today's practice.");
                  }}
                >
                  <PlusCircle size={14} /> Add to Practice
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <div className="text-[14px] font-bold text-ink-900">Want to drill one out loud?</div>
          <div className="text-[12.5px] text-ink-400">Pick any saved answer and rehearse it in the Practice Room.</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const topic = data.topics.find((t) => t.id === "t-self-intro") ?? data.topics[0];
            startPractice(buildContextFromTopic(topic, "30-sec Answer"));
          }}
        >
          <Mic size={14} className="text-brand-600" /> Open Practice Room
        </Button>
      </Card>
    </div>
  );
}
