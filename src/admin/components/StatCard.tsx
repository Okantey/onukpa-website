import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trendLabel?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

const toneClasses: Record<
  NonNullable<StatCardProps["tone"]>,
  { badge: string; border: string }
> = {
  default: {
    badge: "bg-slate-50 text-slate-700",
    border: "border-slate-200",
  },
  success: {
    badge: "bg-emerald-50 text-emerald-800",
    border: "border-emerald-100",
  },
  warning: {
    badge: "bg-amber-50 text-amber-800",
    border: "border-amber-100",
  },
  danger: {
    badge: "bg-rose-50 text-rose-800",
    border: "border-rose-100",
  },
};

const StatCard = ({
  label,
  value,
  icon,
  trendLabel,
  tone = "default",
}: StatCardProps) => {
  const toneConf = toneClasses[tone];

  return (
    <div
      className={`bg-white rounded-2xl border ${toneConf.border} shadow-sm p-4 md:p-5 flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-slate-900 mt-1">
            {value}
          </p>
        </div>
        {icon && (
          <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
            {icon}
          </div>
        )}
      </div>
      {trendLabel && (
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${toneConf.badge}`}
        >
          {trendLabel}
        </div>
      )}
    </div>
  );
};

export default StatCard;

