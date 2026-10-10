import type { PracticeContext, Topic, TodayTask } from "../types";

export function timeLimitFor(label: string): number {
  if (label.startsWith("30")) return 30;
  if (label.startsWith("60")) return 60;
  if (label.startsWith("90")) return 90;
  return 90; // follow-up challenge
}

export function buildContextFromTopic(
  topic: Topic,
  taskLabel: string,
  todayTaskId?: string
): PracticeContext {
  return {
    topicId: topic.id,
    topicName: topic.topicName,
    taskLabel,
    question:
      taskLabel === "Follow-up Challenge"
        ? topic.followUpQuestions[0]
        : topic.relatedQuestions[0],
    framework: topic.framework,
    frameworkSteps: topic.frameworkSteps,
    timeLimit: timeLimitFor(taskLabel),
    todayTaskId,
    usefulExpressions: topic.sentencePatterns.map((p) => p.pattern),
    commonMistakes: [
      "Too much background",
      "No clear personal contribution",
      "No measurable result",
      "Sounds like written English",
    ],
    referenceAnswer: topic.sampleAnswers.standard,
    keywords: topic.sentencePatterns.map((p) => p.pattern.split(" ").slice(0, 4).join(" ")),
  };
}

export function buildContextFromTodayTask(
  task: TodayTask,
  topic: Topic | undefined
): PracticeContext {
  if (!topic) {
    return {
      topicName: task.titleEn,
      taskLabel: task.taskType,
      question: task.titleEn,
      framework: "STAR",
      timeLimit: task.timeLimit,
      todayTaskId: task.id,
    };
  }
  return buildContextFromTopic(topic, task.taskType, task.id);
}
