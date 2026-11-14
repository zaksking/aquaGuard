export type WaterParameter = {
  temperature: number; // Celsius
  ph: number; // 0-14
  ammonia: number; // ppm (mg/L)
  nitrite: number; // ppm
  nitrate: number; // ppm
  hardness: number; // ppm (general hardness)
};

export type RiskLevel = "aman" | "waspada" | "bahaya";

export type ParameterStatus = {
  key: keyof WaterParameter;
  label: string;
  value: number;
  unit: string;
  idealRange: [number, number];
  acceptableRange: [number, number];
  status: "good" | "warning" | "danger";
  advice: string;
  score: number; // 0-100 for this parameter
};

export type AnalysisResult = {
  id: string;
  timestamp: number;
  parameters: WaterParameter;
  score: number;
  riskLevel: RiskLevel;
  parameterStatuses: ParameterStatus[];
  recommendations: string[];
  tankName: string;
  fishType: string;
};

export type NavigationItem = {
  label: string;
  path: string;
};
