export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type TopicStatus =
  | "Not Started"
  | "In Progress"
  | "Practiced"
  | "Saved"
  | "Mastered";

export type Scenario =
  | "Interview"
  | "Behavioral"
  | "Workplace"
  | "Business"
  | "IELTS"
  | "Travel";

export type TopicSource = "Built-in" | "PDF" | "Generated";

export interface VocabRow {
  intent: string; // 中文意图
  basic: string;
  professional: string;
}

export interface SentencePattern {
  stage: string; // Opening / Action / Result / Reflection ...
  pattern: string;
}

export interface SampleAnswers {
  basic: string;
  standard: string;
  advanced: string;
}

export interface PracticeTaskDef {
  id: string;
  label: "30-sec Answer" | "60-sec Answer" | "90-sec Answer" | "Follow-up Challenge";
}

export interface PracticeRecord {
  id: string;
  date: string; // e.g. "Oct 10"
  topicName: string;
  task: string;
  score: number;
  fluency: number;
  logic: number;
  tone: number;
  durationSec: number;
  mainIssue: string;
  nextStep: string;
}

export interface Topic {
  id: string;
  topicName: string;
  scenario: Scenario;
  role: string;
  difficulty: Difficulty;
  framework: string;
  frameworkSteps?: string[];
  source: TopicSource;
  status: TopicStatus;
  skillTested?: string;
  chineseThinking?: string;
  answerPoints?: string[];
  relatedQuestions: string[];
  vocabulary: VocabRow[];
  sentencePatterns: SentencePattern[];
  sampleAnswers: SampleAnswers;
  followUpQuestions: string[];
  practiceTasks: PracticeTaskDef[];
}

export interface TodayTask {
  id: string;
  title: string; // 中文标题
  titleEn: string;
  status: "not_started" | "in_progress" | "done";
  topicId?: string;
  taskType: PracticeTaskDef["label"];
  timeLimit: number; // seconds
}

export interface ExpressionItem {
  text: string;
  status: "Practiced" | "Not used yet";
}

export interface Profile {
  targetRole: string;
  companyType: string;
  englishLevel: string;
  dailyMinutes: number;
  weakness: string;
  preferredScenario: string;
}

export interface Feedback {
  fluency: number;
  logic: number;
  tone: number;
  structure: string;
  mainIssue: string;
  upgradeFrom: string;
  upgradeTo: string;
}

export interface LessonTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
}

export type Page =
  | "dashboard"
  | "upload"
  | "generator"
  | "library"
  | "plan"
  | "practice"
  | "review"
  | "templates"
  | "profile";

export interface PracticeContext {
  topicId?: string;
  topicName: string;
  taskLabel: string; // "60-sec Answer" ...
  question: string;
  framework: string;
  frameworkSteps?: string[];
  timeLimit: number;
  todayTaskId?: string;
  usefulExpressions?: string[];
  commonMistakes?: string[];
  referenceAnswer?: string;
  keywords?: string[];
}
