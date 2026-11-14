import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Thermometer,
  FlaskConical,
  Gauge,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import AquariumBackground from "@/components/AquariumBackground";
import { analyzeWater } from "@/utils/waterAnalysis";
import { saveResult, generateId } from "@/utils/storage";
import type { WaterParameter } from "@/types";

const parameterInputs: {
  key: keyof WaterParameter;
  label: string;
  unit: string;
  icon: typeof Thermometer;
  placeholder: string;
  hint: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "temperature", label: "Suhu Air", unit: "°C", icon: Thermometer, placeholder: "26.0", hint: "Ideal: 24–28°C", min: 0, max: 40, step: 0.1 },
  { key: "ph", label: "pH Aira", unit: "", icon: FlaskConical, placeholder: "7.0", hint: "Ideal: 6.5–7.5", min: 0, max: 14, step: 0.1 },
  { key: "ammonia", label: "Amonia", unit: "ppm", icon: Gauge, placeholder: "0.1", hint: "Ideal: 0–0.25 ppm", min: 0, max: 10, step: 0.01 },
  { key: "nitrite", label: "Nitrit", unit: "ppm", icon: Gauge, placeholder: "0.05", hint: "Ideal: 0–0.1 ppm", min: 0, max: 10, step: 0.01 },
  { key: "nitrate", label: "Nitrat", unit: "ppm", icon: Gauge, placeholder: "15", hint: "Ideal: 0–20 ppm", min: 0, max: 200, step: 1 },
  { key: "hardness", label: "Kesadahan", unit: "ppm", icon: Gauge, placeholder: "100", hint: "Ideal: 60–140 ppm", min: 0, max: 500, step: 1 },
];

const emptyForm: WaterParameter = {
  temperature: 0,
  ph: 0,
  ammonia: 0,
  nitrite: 0,
  nitrate: 0,
  hardness: 0,
};

export default function CekAirPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<WaterParameter>(emptyForm);
  const [tankName, setTankName] = useState("");
  const [fishType, setFishType] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof WaterParameter, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (key: keyof WaterParameter, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) && value !== "") return;
    setForm((prev) => ({ ...prev, [key]: value === "" ? 0 : num }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof WaterParameter, string>> = {};
    parameterInputs.forEach((p) => {
      if (form[p.key] === 0 && String(form[p.key]) === "0") {
        // Accept 0 as valid for pH and ammonia (they could legitimately be 0)
      }
      if (form[p.key] < 0) {
        newErrors[p.key] = "Nilai tidak boleh negatif";
      }
      if (form[p.key] > p.max) {
        newErrors[p.key] = `Nilai maksimal ${p.max}`;
      }
    });
    // Check if all values are 0 (empty form)
    const allZero = parameterInputs.every((p) => form[p.key] === 0);
    if (allZero) {
      newErrors.temperature = "Isi minimal satu parameter";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    setTimeout(() => {
      const analysis = analyzeWater(form);
      const result = {
        ...analysis,
        id: generateId(),
        timestamp: Date.now(),
        tankName: tankName || "Akuarium Saya",
        fishType: fishType || "Ikan Hias",
      };
      saveResult(result);
      navigate(`/hasil/${result.id}`);
    }, 600);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/50 to-white" />
      <AquariumBackground density={10} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Cek Kualitas Air
          </h1>
          <p className="mt-3 text-gray-500">
            Masukkan hasil tes air dari kit tes akuariummu. Dapatkan skor dan saran tindakan.
          </p>
        </div>

        {/* Info banner */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
          <div>
            <p className="text-sm font-semibold text-brand-800">Tips Sebelum Mulai</p>
            <p className="mt-1 text-xs text-brand-700">
              Tes air sebaiknya dilakukan pada waktu yang sama setiap minggu. Pastikan akuarium tidak baru diberi pakan agar hasil lebih akurat.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Tank info */}
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-400">Informasi Akuarium (Opsional)</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Nama Akuarium</label>
                <input
                  type="text"
                  value={tankName}
                  onChange={(e) => setTankName(e.target.value)}
                  placeholder="Akuarium Ruang Tamu"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Jenis Ikan</label>
                <input
                  type="text"
                  value={fishType}
                  onChange={(e) => setFishType(e.target.value)}
                  placeholder="Cupang, Guppy, Mas Koki..."
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Water parameters */}
          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-400">Parameter Air</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {parameterInputs.map((p) => (
                <div key={p.key}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {p.label}
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      <p.icon className="h-4 w-4 text-brand-400" />
                    </div>
                    <input
                      type="number"
                      value={form[p.key] || ""}
                      onChange={(e) => handleChange(p.key, e.target.value)}
                      placeholder={p.placeholder}
                      min={p.min}
                      max={p.max}
                      step={p.step}
                      className={`input-field pl-10 ${errors[p.key] ? "border-red-400 ring-red-100" : ""}`}
                    />
                    {p.unit && (
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        {p.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{p.hint}</p>
                  {errors[p.key] && (
                    <p className="mt-1 text-xs text-red-500">{errors[p.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full max-w-md text-base"
            >
              {submitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Analisis Kualitas Air
                </>
              )}
            </button>
            <p className="text-xs text-gray-400">
              Hasil akan disimpan otomatis di riwayat perangkatmu.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
