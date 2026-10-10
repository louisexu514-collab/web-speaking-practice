import { ToastProvider } from "./components/Toast";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { AppProvider, useApp } from "./state/AppState";
import { Dashboard } from "./pages/Dashboard";
import { UploadAnalyzer } from "./pages/UploadAnalyzer";
import { TopicGenerator } from "./pages/TopicGenerator";
import { TopicLibrary } from "./pages/TopicLibrary";
import { TrainingPlan } from "./pages/TrainingPlan";
import { PracticeRoom } from "./pages/PracticeRoom";
import { ReviewTracker } from "./pages/ReviewTracker";
import { TemplateCenter } from "./pages/TemplateCenter";
import { ProfilePage } from "./pages/Profile";

function Shell() {
  const { page } = useApp();
  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="lg:pl-[236px]">
        <TopBar />
        <main className="mx-auto max-w-[1200px] px-6 pb-16 pt-7 lg:px-8">
          {page === "dashboard" && <Dashboard />}
          {page === "upload" && <UploadAnalyzer />}
          {page === "generator" && <TopicGenerator />}
          {page === "library" && <TopicLibrary />}
          {page === "plan" && <TrainingPlan />}
          {page === "practice" && <PracticeRoom />}
          {page === "review" && <ReviewTracker />}
          {page === "templates" && <TemplateCenter />}
          {page === "profile" && <ProfilePage />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Shell />
      </AppProvider>
    </ToastProvider>
  );
}
