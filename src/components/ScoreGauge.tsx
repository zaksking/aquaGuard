import { getScoreColor, getScoreLabel } from "@/utils/waterAnalysis";
import type { RiskLevel } from "@/types";

type ScoreGaugeProps = {
  score: number;
  riskLevel: RiskLevel;
  size?: number;
};

export default function ScoreGauge({ score, riskLevel, size = 180 }: ScoreGaugeProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const riskLabel = riskLevel === "aman" ? "Aman" : riskLevel === "waspada" ? "Waspada" : "Bahaya";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold" style={{ color }}>
          {score}
        </span>
        <span className="mt-0.5 text-xs font-medium text-gray-400">dari 100</span>
        <span className="mt-1 text-sm font-semibold" style={{ color }}>
          {label}
        </span>
        <span
          className="mt-1 rounded-full px-2.5 py-0.5 text-xs font-bold"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {riskLabel}
        </span>
      </div>
    </div>
  );
}
