import { getScoreColor } from "@/utils/waterAnalysis";
import type { ParameterStatus } from "@/types";
import { cn } from "@/utils/cn";

export default function ParameterCard({ param }: { param: ParameterStatus }) {
  const color = getScoreColor(param.score);
  const statusConfig = {
    good: { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", dot: "bg-green-500", label: "Baik" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", dot: "bg-amber-500", label: "Waspada" },
    danger: { bg: "bg-red-50", border: "border-red-200", text: "text-red-600", dot: "bg-red-500", label: "Bahaya" },
  };
  const sc = statusConfig[param.status];

  return (
    <div className={cn("rounded-2xl border-2 p-4 transition-all", sc.bg, sc.border)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-400">{param.label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {param.value}<span className="text-sm font-normal text-gray-400 ml-1">{param.unit}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("h-2 w-2 rounded-full", sc.dot)} />
          <span className={cn("text-xs font-semibold", sc.text)}>{sc.label}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${param.score}%`, backgroundColor: color }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-gray-400">
          Ideal: {param.idealRange[0]}–{param.idealRange[1]}{param.unit}
        </p>
      </div>
    </div>
  );
}
