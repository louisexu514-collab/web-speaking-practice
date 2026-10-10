import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  ExpressionItem,
  Page,
  PracticeContext,
  PracticeRecord,
  Profile,
  TodayTask,
  Topic,
  TopicStatus,
} from "../types";
import {
  initialExpressions,
  initialProfile,
  initialRecords,
  initialTodayTasks,
  initialTopics,
  seedStats,
} from "../data/mockData";

const STORAGE_KEY = "fluentbridge-state-v1";

interface AppData {
  topics: Topic[];
  todayTasks: TodayTask[];
  records: PracticeRecord[];
  expressions: ExpressionItem[];
  profile: Profile;
  savedTemplateIds: string[];
  savedAnswers: number;
}

interface AppApi {
  data: AppData;
  page: Page;
  detailTopicId: string | null;
  practiceContext: PracticeContext | null;
  planBanner: string | null;
  streakDay: number;
  navigate: (page: Page) => void;
  openTopicDetail: (topicId: string) => void;
  startPractice: (ctx: PracticeContext) => void;
  clearPlanBanner: () => void;
  setPlanBanner: (msg: string) => void;
  addTopics: (topics: Topic[]) => number; // returns how many actually added
  setTopicStatus: (topicId: string, status: TopicStatus) => void;
  updateTopic: (topicId: string, patch: Partial<Topic>) => void;
  addTodayTask: (task: TodayTask) => void;
  replaceTodayTasks: (tasks: TodayTask[]) => void;
  setTodayTaskStatus: (taskId: string, status: TodayTask["status"]) => void;
  addPracticeRecord: (record: PracticeRecord) => void;
  addExpressions: (texts: string[]) => void;
  saveProfile: (profile: Profile) => void;
  toggleSavedTemplate: (id: string) => boolean;
  resetDemo: () => void;
}

const AppContext = createContext<AppApi | null>(null);

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppData;
      if (parsed.topics?.length && parsed.profile) return parsed;
    }
  } catch {
    /* fall through to defaults */
  }
  return {
    topics: initialTopics,
    todayTasks: initialTodayTasks,
    records: initialRecords,
    expressions: initialExpressions,
    profile: initialProfile,
    savedTemplateIds: [],
    savedAnswers: 6,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData);
  const [page, setPage] = useState<Page>("dashboard");
  const [detailTopicId, setDetailTopicId] = useState<string | null>(null);
  const [practiceContext, setPracticeContext] = useState<PracticeContext | null>(null);
  const [planBanner, setPlanBannerState] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full / unavailable — prototype keeps running in memory */
    }
  }, [data]);

  const navigate = useCallback((next: Page) => {
    setPage(next);
    setDetailTopicId(null);
    window.scrollTo({ top: 0 });
  }, []);

  const openTopicDetail = useCallback((topicId: string) => {
    setPage("library");
    setDetailTopicId(topicId);
    window.scrollTo({ top: 0 });
  }, []);

  const startPractice = useCallback((ctx: PracticeContext) => {
    setPracticeContext(ctx);
    setPage("practice");
    window.scrollTo({ top: 0 });
  }, []);

  const api = useMemo<AppApi>(() => {
    return {
      data,
      page,
      detailTopicId,
      practiceContext,
      planBanner,
      streakDay: seedStats.streakDay,
      navigate,
      openTopicDetail,
      startPractice,
      setPlanBanner: (msg) => setPlanBannerState(msg),
      clearPlanBanner: () => setPlanBannerState(null),
      addTopics: (topics) => {
        let added = 0;
        setData((d) => {
          const existing = new Set(d.topics.map((t) => t.topicName.toLowerCase()));
          const fresh = topics.filter((t) => {
            if (existing.has(t.topicName.toLowerCase())) return false;
            existing.add(t.topicName.toLowerCase());
            added += 1;
            return true;
          });
          return { ...d, topics: [...fresh, ...d.topics] };
        });
        return added;
      },
      setTopicStatus: (topicId, status) =>
        setData((d) => ({
          ...d,
          topics: d.topics.map((t) => (t.id === topicId ? { ...t, status } : t)),
        })),
      updateTopic: (topicId, patch) =>
        setData((d) => ({
          ...d,
          topics: d.topics.map((t) => (t.id === topicId ? { ...t, ...patch } : t)),
        })),
      addTodayTask: (task) =>
        setData((d) => ({ ...d, todayTasks: [...d.todayTasks, task] })),
      replaceTodayTasks: (tasks) =>
        setData((d) => ({
          ...d,
          todayTasks: [...d.todayTasks.filter((t) => t.status === "done"), ...tasks],
        })),
      setTodayTaskStatus: (taskId, status) =>
        setData((d) => ({
          ...d,
          todayTasks: d.todayTasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
        })),
      addPracticeRecord: (record) =>
        setData((d) => ({ ...d, records: [record, ...d.records] })),
      addExpressions: (texts) =>
        setData((d) => {
          const existing = new Set(d.expressions.map((e) => e.text));
          const fresh: ExpressionItem[] = texts
            .filter((t) => !existing.has(t))
            .map((t) => ({ text: t, status: "Practiced" }));
          return { ...d, expressions: [...fresh, ...d.expressions] };
        }),
      saveProfile: (profile) =>
        setData((d) => ({ ...d, profile })),
      toggleSavedTemplate: (id) => {
        let nowSaved = false;
        setData((d) => {
          const has = d.savedTemplateIds.includes(id);
          nowSaved = !has;
          return {
            ...d,
            savedTemplateIds: has
              ? d.savedTemplateIds.filter((x) => x !== id)
              : [...d.savedTemplateIds, id],
            savedAnswers: has ? d.savedAnswers : d.savedAnswers + 1,
          };
        });
        return nowSaved;
      },
      resetDemo: () => {
        localStorage.removeItem(STORAGE_KEY);
        setData(loadData());
        setPage("dashboard");
        setDetailTopicId(null);
        setPracticeContext(null);
        setPlanBannerState(null);
      },
    };
  }, [data, page, detailTopicId, practiceContext, planBanner, navigate, openTopicDetail, startPractice]);

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
