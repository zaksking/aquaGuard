import type { AnalysisResult } from "@/types";

const STORAGE_KEY = "aquaguard_history";

export function getHistory(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AnalysisResult[];
    return parsed.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export function saveResult(result: AnalysisResult): void {
  const history = getHistory();
  history.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function deleteResult(id: string): void {
  const history = getHistory();
  const filtered = history.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getResultById(id: string): AnalysisResult | undefined {
  return getHistory().find((r) => r.id === id);
}

export function generateId(): string {
  return `ag_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
