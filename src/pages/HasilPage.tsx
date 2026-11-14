import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowLeft,
  Share2,
  Trash2,
  Thermometer,
  FlaskConical,
  Gauge,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import ScoreGauge from "@/components/ScoreGauge";
import ParameterCard from "@/components/ParameterCard";
import AquariumBackground from "@/components/AquariumBackground";
import { getResultById, deleteResult } from "@/utils/storage";
import { getRiskLevelInfo } from "@/utils/waterAnalysis";
import type { ParameterStatus } from "@/types";

const paramIcons: Record<string, typeof Thermometer> = {
  temperature: Thermometer,
  ph: FlaskConical,
  ammonia: Gauge,
  nitrite: Gauge,
  nitrate: Gauge,
  hardness: Gauge,
};

export default function HasilPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const result = useMemo(() => (id ? getResultById(id) : undefined), [id]);

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-300" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Hasil Tidak Ditemukan</h1>
          <p className="mt-2 text-gray-500">Hasil analisis yang kamu cari tidak ada atau sudah dihapus.</p>
          <Link to="/cek-air" className="btn-primary mt-6">
            Cek Air Baru
          </Link>
        </div>
      </div>
    );
  }

  const riskInfo = getRiskLevelInfo(result.riskLevel);
  const date = new Date(result.timestamp);

  const handleDelete = () => {
    deleteResult(result.id);
    navigate("/riwayat");
  };

  const handleShare = async () => {
    const text = `AquaGuard - Skor Kondisi Air: ${result.score}/100 (${riskInfo.label}). Tank: ${result.tankName}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "AquaGuard Hasil", text });
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert("Hasil disalin ke clipboard!");
      } catch { /* clipboard not available */ }
    }
  };

  const StatusIcon = result.riskLevel === "aman" ? CheckCircle2 : result.riskLevel === "waspada" ? AlertTriangle : AlertCircle;

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/50 to-white" />
      <AquariumBackground density={8} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/riwayat"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Riwayat
        </Link>

        {/* Header card */}
        <div className="overflow-hidden rounded-3xl border-2 border-brand-100 bg-white shadow-xl shadow-brand-600/10">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Score side */}
            <div className={`flex flex-col items-center justify-center border-b-2 border-brand-100 ${riskInfo.bgColor} p-8 md:border-b-0 md:border-r-2`}>
              <ScoreGauge score={result.score} riskLevel={result.riskLevel} size={200} />
              <div className={`mt-6 flex items-center gap-2 rounded-xl border ${riskInfo.borderColor} ${riskInfo.bgColor} px-4 py-2`}>
                <StatusIcon className={`h-5 w-5 ${riskInfo.color}`} />
                <p className={`text-sm font-semibold ${riskInfo.color}`}>{riskInfo.description}</p>
              </div>
            </div>

            {/* Info side */}
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">{result.tankName}</h1>
                  <p className="mt-1 text-sm text-gray-400">{result.fishType}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Tanggal Cek</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-700">
                    {date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Waktu</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-700">
                    {date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50"
                >
                  <Share2 className="h-4 w-4" />
                  Bagikan
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Parameter cards */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Detail Parameter</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.parameterStatuses.map((param: ParameterStatus) => (
              <ParameterCard key={param.key} param={param} />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Saran Tindakan</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/cek-air" className="btn-primary">
            Cek Air Lagi
          </Link>
          <Link to="/riwayat" className="btn-secondary">
            Lihat Riwayat
          </Link>
        </div>
      </div>
    </div>
  );
}
