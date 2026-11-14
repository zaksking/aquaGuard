import { Link } from "react-router-dom";
import {
  Droplet,
  ShieldCheck,
  Fish,
  Heart,
  Target,
  BookOpen,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import AquariumBackground from "@/components/AquariumBackground";

const faqs = [
  {
    q: "Apakah AquaGuard gratis?",
    a: "Ya, AquaGuard 100% gratis. Tidak perlu registrasi, tidak ada biaya, semua data tersimpan di perangkatmu sendiri.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Semua data tersimpan di localStorage browser-mu. Tidak ada data yang dikirim ke server mana pun. Hanya kamu yang bisa melihat riwayatmu.",
  },
  {
    q: "Seberapa akurat skornya?",
    a: "Skor dihitung berdasarkan rentang ideal parameter air yang digunakan oleh akuaris berpengalaman. Namun, tetap gunakan instingmu dan konsultasi ahli untuk kasus khusus.",
  },
  {
    q: "Apakah akuarium bisa diganti dengan kolam?",
    a: "Tentu. Parameter yang diukur sama untuk kolam ikan. Tapi rentang ideal bisa sedikit berbeda—sesuaikan dengan jenis ikanmu.",
  },
  {
    q: "Bagaimana cara tes air jika tidak punya kit?",
    a: "Kamu bisa membeli kit tes air di toko akuarium terdekat. Harga mulai dari Rp15.000-an untuk strip test sederhana. Itu sudah cukup untuk mulai.",
  },
];

const parameterGuide = [
  { name: "Suhu Air", icon: Droplet, ideal: "24–28°C", desc: "Suhu optimal untuk ikan hias tropis. Gunakan heater bila perlu." },
  { name: "pH", icon: BookOpen, ideal: "6.5–7.5", desc: "Air netral terbaik untuk kebanyakan ikan. Hindari perubahan pH mendadak." },
  { name: "Amonia", icon: ShieldCheck, ideal: "0–0.25 ppm", desc: "Sangat beracun. Tinggi saat akuarium baru atau pakan berlebih." },
  { name: "Nitrit", icon: ShieldCheck, ideal: "0–0.1 ppm", desc: "Hasil pembusukan amonia. Tinggi = siklus nitrogen belum selesai." },
  { name: "Nitrat", icon: Droplet, ideal: "0–20 ppm", desc: "Lebih aman dari amonia tapi tetap perlu dikontrol. Solusinya: ganti air." },
  { name: "Kesadahan", icon: BookOpen, ideal: "60–140 ppm", desc: "Kadar mineral dalam air. Beberapa ikan butuh air lunak, beberapa keras." },
];

export default function TentangPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/50 to-white" />
      <AquariumBackground density={8} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-600/30">
            <Droplet className="h-8 w-8 text-white" fill="white" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Tentang AquaGuard
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            AquaGuard adalah web app yang membantu hobiis ikan hias memantau kualitas air akuarium.
            Dibuat sederhana, fungsional, dan ramah untuk pemula.
          </p>
        </div>

        {/* Mission */}
        <div className="mt-12 rounded-3xl border border-brand-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Target className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Misi Kami</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Banyak ikan hias mati mendadak bukan karena penyakit, tapi karena kualitas air yang memburuk
            tanpa disadari. AquaGuard hadir untuk menjembatani pengetahuan teknik akuarium dengan hobiis
            pemula yang belum terbiasa membaca angka. Cukup tes air, masukkan hasilnya, dan biarkan
            AquaGuard membantu menafsirkan kondisi airmu.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-brand-50 p-4">
              <Fish className="h-6 w-6 text-brand-600" />
              <p className="mt-2 text-sm font-semibold text-gray-900">Mudah Dipahami</p>
              <p className="mt-1 text-xs text-gray-500">Bahasa sederhana, bukan istilah teknis.</p>
            </div>
            <div className="rounded-2xl bg-accent-50 p-4">
              <ShieldCheck className="h-6 w-6 text-accent-600" />
              <p className="mt-2 text-sm font-semibold text-gray-900">Privasi Aman</p>
              <p className="mt-1 text-xs text-gray-500">Data tidak dikirim ke mana pun.</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4">
              <Heart className="h-6 w-6 text-green-600" />
              <p className="mt-2 text-sm font-semibold text-gray-900">Gratis Selamanya</p>
              <p className="mt-1 text-xs text-gray-500">Tanpa registrasi, tanpa biaya.</p>
            </div>
          </div>
        </div>

        {/* Parameter guide */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Panduan Parameter Air</h2>
          <p className="mt-2 text-sm text-gray-500">Pelajari 6 parameter yang diukur AquaGuard dan rentang idealnya.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parameterGuide.map((p, i) => (
              <div key={i} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                    <p.icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{p.name}</p>
                    <p className="text-xs text-brand-600 font-medium">Ideal: {p.ideal}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <HelpCircle className="h-5 w-5 text-brand-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Pertanyaan Umum</h2>
          </div>
          <div className="mt-6 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 p-8 text-center shadow-xl shadow-brand-600/20">
          <h2 className="text-2xl font-extrabold text-white">Coba Sekarang</h2>
          <p className="mt-2 text-white/80">Mulai cek kualitas airmu dalam hitungan menit.</p>
          <Link
            to="/cek-air"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-brand-700 shadow-lg transition-all hover:bg-brand-50 active:scale-[0.97]"
          >
            Mulai Cek Air
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
