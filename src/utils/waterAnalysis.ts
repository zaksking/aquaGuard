import type { WaterParameter, ParameterStatus, RiskLevel, AnalysisResult } from "@/types";

// Ideal ranges per parameter type
const PARAMETER_CONFIG = {
  temperature: {
    label: "Suhu Air",
    unit: "°C",
    idealRange: [24, 28] as [number, number],
    acceptableRange: [22, 30] as [number, number],
  },
  ph: {
    label: "pH Aira",
    unit: "",
    idealRange: [6.5, 7.5] as [number, number],
    acceptableRange: [6.0, 8.0] as [number, number],
  },
  ammonia: {
    label: "Amonia",
    unit: "ppm",
    idealRange: [0, 0.25] as [number, number],
    acceptableRange: [0, 0.5] as [number, number],
  },
  nitrite: {
    label: "Nitrit",
    unit: "ppm",
    idealRange: [0, 0.1] as [number, number],
    acceptableRange: [0, 0.25] as [number, number],
  },
  nitrate: {
    label: "Nitrat",
    unit: "ppm",
    idealRange: [0, 20] as [number, number],
    acceptableRange: [0, 40] as [number, number],
  },
  hardness: {
    label: "Kesadahan",
    unit: "ppm",
    idealRange: [60, 140] as [number, number],
    acceptableRange: [40, 200] as [number, number],
  },
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Calculates a 0-100 score for a single parameter based on distance from ideal range.
 * Inside ideal range → 100. Outside acceptable range → drops quickly.
 */
function calcParamScore(
  value: number,
  ideal: [number, number],
  acceptable: [number, number]
): number {
  const [idealLow, idealHigh] = ideal;
  const [accLow, accHigh] = acceptable;

  // Inside ideal → perfect
  if (value >= idealLow && value <= idealHigh) return 100;

  // Below acceptable
  if (value < accLow) {
    const range = accLow - idealLow;
    const distance = accLow - value;
    if (range === 0) return 0;
    const score = 100 - (distance / range) * 70;
    return clampScore(score);
  }

  // Above acceptable
  if (value > accHigh) {
    const range = idealHigh - accHigh;
    const distance = value - accHigh;
    if (range === 0) return 0;
    const score = 100 - (distance / range) * 70;
    return clampScore(score);
  }

  // Between ideal and acceptable (warning zone)
  if (value < idealLow) {
    const ratio = (value - accLow) / (idealLow - accLow);
    return clampScore(60 + ratio * 40);
  }
  if (value > idealHigh) {
    const ratio = (accHigh - value) / (accHigh - idealHigh);
    return clampScore(60 + ratio * 40);
  }

  return 100;
}

function getParamStatus(
  score: number,
  value: number,
  ideal: [number, number],
  acceptable: [number, number]
): "good" | "warning" | "danger" {
  if (score >= 85) return "good";
  if (value < acceptable[0] || value > acceptable[1]) return "danger";
  return "warning";
}

function getParamAdvice(
  key: keyof WaterParameter,
  status: "good" | "warning" | "danger",
  value: number
): string {
  const advices: Record<keyof WaterParameter, { good: string; warning: string; danger: string }> = {
    temperature: {
      good: "Suhu air optimal untuk ikan hias tropis.",
      warning: "Suhu sedikit di luar rentang ideal. Pantau perubahan suhu secara berkala.",
      danger: value > 28
        ? "Suhu terlalu tinggi! Kurangi pemanas, pasang kipas pendingin atau tambah ventilasi dekat akuarium."
        : "Suha terlalu rendah! Nyalakan heater dan periksa apakah termostat berfungsi.",
    },
    ph: {
      good: "pH air dalam kondisi netral dan ideal.",
      warning: "pH sedikit menyimpang. Pertimbangkan penyesuaian bertahap agar ikan tidak stres.",
      danger: value > 7.5
        ? "pH terlalu basa! Tambahkan ketapang atau peat untuk menurunkan pH secara perlahan."
        : "pH terlalu asam! Ganti sebagian air dengan air bersih dan periksa filter.",
    },
    ammonia: {
      good: "Amonia sangat rendah. Akuarium dalam kondisi sehat.",
      warning: "Amonia mulai naik. Lakukan penggantian air 20-30% segera.",
      danger: "Amonia berbahaya! Ganti air 50% sekarang, hentikan pemberian pakan sementara, dan pastikan filter bekerja optimal.",
    },
    nitrite: {
      good: "Nitrit rendah. Siklus nitrogen berjalan baik.",
      warning: "Nitrit mulai meningkat. Ganti air 25% dan periksa media filter.",
      danger: "Nitrit berbahaya! Ganti air 50%, tambahkan bakteri nitrifikasi, dan kurangi pakan.",
    },
    nitrate: {
      good: "Nitrat dalam batas aman.",
      warning: "Nitrat cukup tinggi. Jadwalkan penggantian air 30% dalam 2 hari ke depan.",
      danger: "Nitrat terlalu tinggi! Lakukan penggantian air 50%, bersihkan sisa pakan, dan tambah tanaman air.",
    },
    hardness: {
      good: "Kesadahan air sesuai untuk kebanyakan ikan hias.",
      warning: "Kesadahan sedikit di luar ideal. Sesuaikan bertahap agar ikan bisa beradaptasi.",
      danger: value > 200
        ? "Air terlalu keras! Campur dengan air RO atau air mineral yang lebih lunak."
        : "Air terlalu lunak! Tambahkan batu koral atau batu kapur untuk menaikkan kesadahan.",
    },
  };

  return advices[key][status];
}

export function analyzeWater(params: WaterParameter): Omit<AnalysisResult, "id" | "timestamp" | "tankName" | "fishType"> {
  const parameterStatuses: ParameterStatus[] = [];

  (Object.keys(PARAMETER_CONFIG) as (keyof WaterParameter)[]).forEach((key) => {
    const config = PARAMETER_CONFIG[key];
    const value = params[key];
    const score = calcParamScore(value, config.idealRange, config.acceptableRange);
    const status = getParamStatus(score, value, config.idealRange, config.acceptableRange);

    parameterStatuses.push({
      key,
      label: config.label,
      value,
      unit: config.unit,
      idealRange: config.idealRange,
      acceptableRange: config.acceptableRange,
      status,
      advice: getParamAdvice(key, status, value),
      score,
    });
  });

  // Weighted average: ammonia and nitrite have higher weight
  const weights: Record<keyof WaterParameter, number> = {
    ammonia: 3,
    nitrite: 3,
    ph: 2,
    temperature: 2,
    nitrate: 1.5,
    hardness: 1,
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const weightedScore =
    parameterStatuses.reduce((sum, ps) => sum + ps.score * weights[ps.key], 0) / totalWeight;
  const score = clampScore(weightedScore);

  let riskLevel: RiskLevel;
  if (score >= 80) riskLevel = "aman";
  else if (score >= 55) riskLevel = "waspada";
  else riskLevel = "bahaya";

  // Build recommendations
  const recommendations: string[] = [];
  const dangerParams = parameterStatuses.filter((p) => p.status === "danger");
  const warningParams = parameterStatuses.filter((p) => p.status === "warning");

  if (dangerParams.length > 0) {
    recommendations.push("⚠️ Tindakan darurat diperlukan sekarang untuk menyelamatkan ikanmu!");
    dangerParams.forEach((p) => {
      recommendations.push(`• ${p.label} (${p.value}${p.unit}): ${p.advice}`);
    });
  }

  if (warningParams.length > 0) {
    if (dangerParams.length === 0) {
      recommendations.push("Perhatikan parameter berikut dan lakukan penyesuaian:");
    }
    warningParams.forEach((p) => {
      if (dangerParams.length === 0) {
        recommendations.push(`• ${p.label} (${p.value}${p.unit}): ${p.advice}`);
      }
    });
  }

  if (dangerParams.length === 0 && warningParams.length === 0) {
    recommendations.push("✅ Semua parameter dalam kondisi ideal. Pertahankan rutinitas perawatanmu!");
    recommendations.push("Lakukan tes air rutin setiap 1-2 minggu untuk memastikan kondisi tetap stabil.");
  }

  if (dangerParams.length > 0 || warningParams.length > 0) {
    recommendations.push("Jangan beri pakan berlebihan dan pastikan filter menyala 24 jam.");
  }

  return {
    parameters: params,
    score,
    riskLevel,
    parameterStatuses,
    recommendations,
  };
}

export function getRiskLevelInfo(level: RiskLevel): {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
} {
  switch (level) {
    case "aman":
      return {
        label: "Aman",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: "✅",
        description: "Kondisi air ideal untuk ikanmu. Tetap pertahankan!",
      };
    case "waspada":
      return {
        label: "Waspada",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        icon: "⚠️",
        description: "Beberapa parameter perlu perhatian. Lakukan penyesuaian segera.",
      };
    case "bahaya":
      return {
        label: "Bahaya",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: "🚨",
        description: "Kondisi air berbahaya! Tindakan darurat diperlukan sekarang.",
      };
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#16a34a";
  if (score >= 55) return "#d97706";
  return "#dc2626";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Sangat Baik";
  if (score >= 70) return "Baik";
  if (score >= 55) return "Cukup";
  if (score >= 40) return "Buruk";
  return "Sangat Buruk";
}
