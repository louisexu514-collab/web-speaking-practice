import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, Info } from "lucide-react";

interface ToastItem {
  id: number;
  message: string;
  tone: "success" | "info";
}

const ToastContext = createContext<{ toast: (message: string, tone?: ToastItem["tone"]) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((message: string, tone: ToastItem["tone"] = "success") => {
    const id = ++nextId.current;
    setItems((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 pointer-events-none">
        {items.map((t) => (
          <div
            key={t.id}
            className="fb-slide-up pointer-events-auto flex items-center gap-2.5 rounded-2xl border border-hairline bg-white px-4 py-3 shadow-lift max-w-sm"
          >
            {t.tone === "success" ? (
              <CheckCircle2 size={17} className="shrink-0 text-mint-600" />
            ) : (
              <Info size={17} className="shrink-0 text-brand-600" />
            )}
            <span className="text-[13px] font-medium text-ink-700">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
