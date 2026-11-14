import { Link } from "react-router-dom";
import {
  Thermometer,
  FlaskConical,
  Activity,
  ChevronRight,
  ClipboardCheck,
  Gauge,
  Lightbulb,
  LineChart,
  Waves,
  Fish,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import AquariumVisual from "@/components/AquariumVisual";
import AquariumBackground from "@/components/AquariumBackground";
import ScoreGauge from "@/components/ScoreGauge";

const problemCards = [
  {
    icon: AlertTriangle,
    title: "Amonia Naik Tanpa Terlihat",
    desc: "Amonia dari sisa pakan dan kotoran ikan bisa meningkat diam-diam. Tingkat berbahaya dapat membunuh ikan dalam hitungan jam.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: Thermometer,
    title: "Suhu Tidak Stabil",
    desc: "Fluktuasi suhu membuat ikan stres dan rentan penyakit. Perubahan drastis bahkan bisa mengganggu sistem imun ikan.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    icon: AlertCircle,
    title: "pH Anjlok Mendadak",
    desc: "pH yang turun secara tiba-tiba menunjukkan siklus nitrogen bermasalah. Ikan bisa syok dan mati karena air terlalu asam.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
];

const featureCards = [
  {
    icon: ClipboardCheck,
    title: "Input Mudah",
    desc: "Masukkan hasil tes air manual dalam hitungan detik. Tinggal isi angka, sistem langsung memprosesnya.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: Gauge,
    title: "Skor Kondisi Air",
    desc: "Dapatkan skor 0–100 yang langsung dipahami. Tidak perlu jago kimia untuk tahu airmu sehat atau tidak.",
    color: "text-accent-600",
    bg: "bg-accent-50",
  },
  {
    icon: Lightbulb,
    title: "Saran Tindakan Praktis",
    desc: "Setiap hasil disertai saran konkret: ganti air, kurangi pakan, cek filter—bukan teori, tapi langkah nyata.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: LineChart,
    title: "Riwayat & Tren",
    desc: "Lihat grafik perubahan kualitas air dari waktu ke waktu dan pantau tren kondisi akuariummu.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const steps = [
  {
    title: "Tes Air",
    desc: "Gunakan kit tes air untuk mengukur 6 parameter: suhu, pH, amonia, nitrit, nitrat, dan kesadahan.",
    icon: FlaskConical,
  },
  {
    title: "Masukkan Data",
    desc: "Input hasil tes ke AquaGuard. Cukup isi angka-angka, sisanya biarkan sistem yang hitung.",
    icon: ClipboardCheck,
  },
  {
    title: "Dapatkan Skor & Saran",
    desc: "Lihat skor kondisi air, status risiko, dan saran tindakan praktis untuk menjaga ikan tetap sehat.",
    icon: Activity,
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <AquariumBackground density={18} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* Left */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5">
              <Fish className="h-4 w-4 text-brand-600" />
              <span className="text-xs font-semibold text-brand-700">Teman Setia Hobiis Ikan Hias</span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Jaga Air,{" "}
              <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                Jaga Ikanmu
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base text-gray-500 sm:text-lg lg:mx-0 mx-auto">
              Pantau kualitas air akuarium dengan mudah. Masukkan hasil tes air, dapatkan skor
              kondisi, dan saran praktis agar ikanmu tetap sehat dan bahagia.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/cek-air" className="btn-primary">
                Cek Kualitas Air
                <ChevronRight className="h-5 w-5" />
              </Link>
              <a href="#preview" className="btn-secondary">
                Lihat Contoh Hasil
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 lg:justify-start sm:gap-10">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-gray-900">6</p>
                <p className="text-xs text-gray-400">Parameter Air</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-gray-900">0–100</p>
                <p className="text-xs text-gray-400">Skor Kondisi</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-gray-900">100%</p>
                <p className="text-xs text-gray-400">Gratis</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <AquariumVisual />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600">
              Kenapa Ikan Sering Mati Mendadak?
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tiga Penyebab Utama yang Sering Diabaikan
            </h2>
            <p className="mt-3 text-gray-500">
              Bukan karena ikan yang lemah, tapi karena air yang berubah tanpa kita sadari.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {problemCards.map((card, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 p-6 ${card.bg} ${card.border} transition-all hover:shadow-lg hover:-translate-y-1`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 to-white" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600">
              Fitur Utama
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Semua yang Kamu Butuhkan untuk Jaga Akuarium
            </h2>
            <p className="mt-3 text-gray-500">
              Dari input data sampai saran tindakan, AquaGuard bikin perawatan ikan hias jadi simpel.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} transition-transform group-hover:scale-110`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-accent-50 px-4 py-1.5 text-xs font-semibold text-accent-600">
              Cara Kerja
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tiga Langkah Sederhana
            </h2>
            <p className="mt-3 text-gray-500">
              Tidak perlu latar belakang kimia. Cukup tes, input, dan baca hasilnya.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[58%] top-11 hidden h-0.5 w-[75%] bg-gradient-to-r from-brand-200 to-transparent md:block" />
                )}

                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-brand-50" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                    <step.icon className="h-7 w-7 text-brand-600" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shadow">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREVIEW ===== */}
      <section id="preview" className="relative py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-brand-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-600">
              Contoh Hasil
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Lihat Seperti Apa Hasil Analisis AquaGuard
            </h2>
            <p className="mt-3 text-gray-500">
              Setiap pemeriksaan menghasilkan skor, status risiko, dan saran tindakan yang jelas.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-3xl border-2 border-brand-100 bg-white shadow-2xl shadow-brand-600/10">
              <div className="grid gap-0 md:grid-cols-2">
                {/* Left: Score */}
                <div className="flex flex-col items-center justify-center gap-5 border-b-2 border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 md:border-b-0 md:border-r-2">
                  <ScoreGauge score={87} riskLevel="aman" size={180} />
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-center">
                    <p className="text-sm font-semibold text-green-700">✅ Kondisi Aman</p>
                    <p className="mt-0.5 text-xs text-green-600">Pertahankan rutinitas perawatanmu!</p>
                  </div>
                </div>

                {/* Right: Parameters */}
                <div className="p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Parameter Air</p>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Suhu", value: "26°C", score: 95 },
                      { label: "pH", value: "7.0", score: 100 },
                      { label: "Amonia", value: "0.1 ppm", score: 90 },
                      { label: "Nitrit", value: "0.05 ppm", score: 92 },
                      { label: "Nitrat", value: "15 ppm", score: 88 },
                      { label: "Kesadahan", value: "100 ppm", score: 85 },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                          <span className="text-sm text-gray-600 truncate">{p.label}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-800">{p.value}</span>
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-green-500 transition-all"
                              style={{ width: `${p.score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/cek-air" className="btn-primary mt-6 w-full text-sm">
                    Coba Sekarang
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 px-8 py-14 text-center shadow-2xl shadow-brand-600/20">
            <AquariumBackground density={10} />
            <div className="relative z-10">
              <Waves className="mx-auto h-10 w-10 text-white/80" />
              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                Siap Jaga Ikanmu Tetap Sehat?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/80">
                Mulai cek kualitas air sekarang. Gratis, tanpa registrasi, hasil langsung.
              </p>
              <Link
                to="/cek-air"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-brand-700 shadow-lg transition-all hover:bg-brand-50 hover:shadow-xl active:scale-[0.97]"
              >
                Mulai Cek Air
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
