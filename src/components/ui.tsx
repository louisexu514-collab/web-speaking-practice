import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "../lib/utils";
import type { Difficulty, TodayTask, TopicStatus } from "../types";

/* ---------------- Button ---------------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "success" | "onDark" | "dark" | "record";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-[0_1px_2px_rgba(79,70,229,0.3)]",
  onDark: "bg-white text-brand-700 hover:bg-white/90 active:bg-white shadow-none",
  dark: "bg-white/10 text-white hover:bg-white/20 border border-transparent",
  record: "bg-mint-500 text-white hover:bg-mint-600 active:bg-mint-700 shadow-[0_6px_20px_rgba(20,184,166,0.4)]",
  secondary: "bg-ink-800/6 text-ink-800 hover:bg-ink-800/10 border border-transparent",
  ghost: "bg-transparent text-ink-600 hover:bg-ink-800/5",
  outline: "bg-white text-ink-700 border border-hairline hover:border-brand-300 hover:text-brand-700 shadow-[0_1px_2px_rgba(20,24,40,0.04)]",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  success: "bg-mint-500 text-white hover:bg-mint-600",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-[13px] gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
        "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer whitespace-nowrap",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}

/* ---------------- Card ---------------- */

export function Card({
  className,
  hover = false,
  children,
}: {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-white border border-hairline rounded-2xl shadow-soft",
        hover && "transition-all duration-200 hover:shadow-lift hover:-translate-y-0.5 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- Badge ---------------- */

const badgeTones: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  mint: "bg-mint-50 text-mint-700 border-mint-100",
  gray: "bg-slate-100 text-ink-600 border-slate-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  sun: "bg-sun-100 text-sun-600 border-amber-200",
};

export function Badge({
  tone = "gray",
  className,
  children,
}: {
  tone?: keyof typeof badgeTones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        badgeTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Status / difficulty badges ---------------- */

export function StatusBadge({ status }: { status: TopicStatus | TodayTask["status"] }) {
  const map: Record<string, { tone: keyof typeof badgeTones; label: string }> = {
    "Not Started": { tone: "gray", label: "Not Started" },
    "In Progress": { tone: "brand", label: "In Progress" },
    Practiced: { tone: "mint", label: "Practiced" },
    Saved: { tone: "amber", label: "Saved" },
    Mastered: { tone: "mint", label: "Mastered" },
    not_started: { tone: "gray", label: "Not started" },
    in_progress: { tone: "brand", label: "In progress" },
    done: { tone: "mint", label: "Done" },
  };
  const cfg = map[status] ?? map["Not Started"];
  if (status === "Mastered") {
    return (
      <Badge tone="mint">
        <Check size={11} strokeWidth={3} /> Mastered
      </Badge>
    );
  }
  return <Badge tone={cfg.tone}>{cfg.label}</Badge>;
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  const tone = level === "Beginner" ? "mint" : level === "Intermediate" ? "brand" : "rose";
  return <Badge tone={tone}>{level}</Badge>;
}

/* ---------------- Tabs (pill style) ---------------- */

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  size = "md",
}: {
  tabs: readonly T[];
  value: T;
  onChange: (t: T) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full bg-ink-900/5 p-1", className)}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cn(
            "rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap",
            size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-[13px]",
            value === t ? "bg-white text-brand-700 shadow-[0_1px_3px_rgba(20,24,40,0.12)]" : "text-ink-500 hover:text-ink-700"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Modal ---------------- */

export function Modal({
  open,
  onClose,
  children,
  className,
  wide = false,
}: {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative bg-white rounded-3xl border border-hairline shadow-lift fb-pop-in max-h-[88vh] overflow-y-auto",
          wide ? "max-w-2xl w-full" : "max-w-lg w-full",
          className
        )}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-ink-900/5 text-ink-500 hover:bg-ink-900/10 hover:text-ink-700 cursor-pointer"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

/* ---------------- Progress bar ---------------- */

export function ProgressBar({
  value,
  className,
  tone = "brand",
}: {
  value: number; // 0..100
  className?: string;
  tone?: "brand" | "mint" | "amber";
}) {
  const colors = { brand: "bg-brand-600", mint: "bg-mint-500", amber: "bg-amber-500" };
  return (
    <div className={cn("h-2 rounded-full bg-ink-900/8 overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", colors[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ---------------- Ring gauge ---------------- */

export function RingGauge({
  value,
  size = 84,
  stroke = 9,
  label,
  sublabel,
  tone = "#4F46E5",
  track = "rgba(79,70,229,0.12)",
  textColor,
}: {
  value: number; // 0..100
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  tone?: string;
  track?: string;
  textColor?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" strokeLinecap="round" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={tone}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c - filled}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">
        <div>
          <div className="font-extrabold tracking-tight" style={{ fontSize: size / 4.2, color: textColor }}>
            {label ?? `${Math.round(value)}%`}
          </div>
          {sublabel && (
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider opacity-60" style={{ color: textColor }}>
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Form controls ---------------- */

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full h-11 rounded-xl border border-transparent bg-ink-900/[0.05] px-4 text-sm text-ink-800",
        "placeholder:text-ink-400 focus:bg-white focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10",
        "transition-all cursor-text",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "appearance-none w-full h-9 rounded-full border border-hairline bg-white pl-3.5 pr-8 text-[13px] font-medium text-ink-700",
          "focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-400 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
        width="10" height="6" viewBox="0 0 10 6" fill="none"
      >
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ---------------- Page header ---------------- */

export function PageHeader({
  title,
  subtitle,
  chinese,
  actions,
}: {
  title: string;
  subtitle?: string;
  chinese?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-ink-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
        {chinese && <p className="mt-1 text-sm text-ink-500">{chinese}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ---------------- Copy helper (hook) ---------------- */

export function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(id);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedId(null), 1600);
    return true;
  };
  return { copy, copiedId };
}
