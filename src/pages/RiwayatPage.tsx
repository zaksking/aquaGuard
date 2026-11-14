import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ChevronRight,
  Calendar,
  History,
  TrendingUp,
  Gauge,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import AquariumBackground from "@/components/AquariumBackground";
import { getHistory, clearHistory, deleteResult } from "@/utils/storage";
import { getRiskLevelInfo } from "@/utils/waterAnalysis";
import type { AnalysisResult, RiskLevel } from "@/types";

export default function RiwayatPage() {
  const [history, setHistory] = useState<AnalysisResult[]>(getHistory());
  const [confirmClear, setConfirmClear] = useState(false);

  const handleDelete = (id: string) => {
    deleteResult(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
    setConfirmClear(false);
  };

  // Chart data: oldest first
  const chartData = useMemo(
    () =>
      [...history]
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((r) => ({
          name: new Date(r.timestamp).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
          score: r.score,
          suhu: r.parameters.temperature,
          ph: r.parameters.ph,
          amonia: r.parameters.ammonia,
          nitrit: r.parameters.nitrite,
          nitrat: r.parameters.nitrate,
          kesadahan: r.parameters.hardness,
        })),
    [history]
  );

  if (history.length === 0) {
    return (
      <div className="relative min-h-screen pt-28 pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/50 to-white" />
        <AquariumBackground density={8} />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50">
              <History className="h-10 w-10 text-brand-400" />
            </div>
            <h1 className="mt-6 text-2xl font-extrabold text-gray-900">Belum Ada Riwayat</h1>
            <p className="mt-2 text-gray-500">
              Mulai cek kualitas air pertamamu dan hasilnya akan muncul di sini.
            </p>
            <Link to="/cek-air" className="btn-primary mt-6">
              Mulai Cek Air
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const avgScore = Math.round(history.reduce((s, r) => s + r.score, 0) / history.length);
  const latest = history[0];

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/50 to-white" />
      <AquariumBackground density={8} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Riwayat Cek Air</h1>
            <p className="mt-2 text-gray-500">Pantau tren kualitas air dari waktu ke waktu.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/cek-air" className="btn-primary text-sm">
              Cek Air Baru
            </Link>
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearAll}
                  className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Ya, Hapus Semua
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <Trash2 className="h-4 w-4" />
                Hapus Semua
              </button>
            )}
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-brand-600" />
              <p className="text-xs font-medium text-gray-400">Rata-rata Skor</p>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">{avgScore}<span className="text-lg font-normal text-gray-400">/100</span></p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-600" />
              <p className="text-xs font-medium text-gray-400">Total Pemeriksaan</p>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">{history.length}<span className="text-lg font-normal text-gray-400"> kali</span></p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-600" />
              <p className="text-xs font-medium text-gray-400">Skor Terakhir</p>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">{latest.score}<span className="text-lg font-normal text-gray-400">/100</span></p>
          </div>
        </div>

        {/* Score trend chart */}
        {chartData.length > 1 && (
          <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Tren Skor Kondisi Air</h2>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e0f2fe",
                      boxShadow: "0 4px 12px rgba(14,165,233,0.1)",
                      fontSize: "12px",
                    }}
                  />
                  <ReferenceLine y={80} stroke="#16a34a" strokeDasharray="3 3" label={{ value: "Aman", fontSize: 10, fill: "#16a34a", position: "right" }} />
                  <ReferenceLine y={55} stroke="#d97706" strokeDasharray="3 3" label={{ value: "Waspada", fontSize: 10, fill: "#d97706", position: "right" }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#0ea5e9" }}
                    activeDot={{ r: 6, fill: "#0284c7" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* History list */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Semua Pemeriksaan</h2>
          <div className="space-y-3">
            {history.map((r) => {
              const info = getRiskLevelInfo(r.riskLevel as RiskLevel);
              const date = new Date(r.timestamp);
              return (
                <Link
                  key={r.id}
                  to={`/hasil/${r.id}`}
                  className="group flex items-center justify-between rounded-2xl border border-brand-100 bg-white p-4 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    {/* Score circle */}
                    <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${info.bgColor}`}>
                      <span className={`text-lg font-bold ${info.color}`}>{r.score}</span>
                    </div>
                    {/* Info */}
                    <div>
                      <p className="font-semibold text-gray-900">{r.tankName}</p>
                      <p className="text-xs text-gray-400">
                        {date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • {date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full ${info.bgColor} px-2 py-0.5 text-xs font-semibold ${info.color}`}>
                          {info.icon} {info.label}
                        </span>
                        <span className="text-xs text-gray-400">{r.fishType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(r.id);
                      }}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
