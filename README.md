# 🐠 AquaGuard — Pantau Kualitas Air, Jaga Ikan Tetap Sehat

![AquaGuard Banner](https://img.shields.io/badge/AquaGuard-v1.0.0-0ea5e9?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyLjY5bDUuNjYgNS42NmE4IDggMCAxIDEtMTEuMzEgMHoiLz48L3N2Zz4=)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> Web app untuk hobiis ikan hias yang ingin memantau kualitas air akuarium secara mudah, cepat, dan praktis — tanpa perlu latar belakang kimia.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🧪 **Input 6 Parameter** | Suhu, pH, Amonia, Nitrit, Nitrat, Kesadahan |
| 📊 **Skor Kondisi Air** | Kalkulasi otomatis skor 0–100 berbasis algoritma berbobot |
| 🚦 **Status Risiko** | Tiga level: **Aman**, **Waspada**, **Bahaya** |
| 💡 **Saran Praktis** | Rekomendasi tindakan konkret per parameter |
| 📈 **Riwayat & Tren** | Grafik perubahan kualitas air dari waktu ke waktu |
| 💾 **Tanpa Backend** | Semua data tersimpan di `localStorage` perangkat pengguna |
| 📱 **Responsive** | Tampilan optimal di desktop, tablet, dan mobile |

---

## 🖥️ Preview

### Landing Page
Halaman utama dengan hero animasi akuarium, penjelasan masalah, fitur, cara kerja, dan preview hasil analisis.

### Cek Air
Form input 6 parameter air dengan validasi, hint nilai ideal, dan loading state saat analisis berjalan.

### Hasil Analisis
Gauge skor melingkar, 6 kartu parameter dengan status warna, dan daftar saran tindakan prioritas.

### Riwayat
Grafik tren skor (Recharts), ringkasan statistik, dan daftar riwayat pemeriksaan yang bisa dihapus per item.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v3 (custom design system)
- **Routing**: React Router v6
- **Grafik**: Recharts
- **Ikon**: Lucide React
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Storage**: localStorage (tanpa backend, tanpa login)

---

## 🚀 Menjalankan Secara Lokal

Pastikan sudah menginstal [Node.js](https://nodejs.org/) versi 18 ke atas.

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/aquaguard.git
cd aquaguard

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser di **http://localhost:5173**

### Perintah lainnya

```bash
# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

---

## 📁 Struktur Project

```
aquaguard/
├── public/
├── src/
│   ├── components/          # Komponen reusable
│   │   ├── Navbar.tsx       # Navigasi sticky + hamburger mobile
│   │   ├── Footer.tsx       # Footer dengan links
│   │   ├── Logo.tsx         # Logo AquaGuard
│   │   ├── Button.tsx       # Tombol primary/secondary
│   │   ├── AquariumVisual.tsx   # Ilustrasi SVG akuarium animasi
│   │   ├── AquariumBackground.tsx # Efek gelembung latar
│   │   ├── ScoreGauge.tsx   # Gauge skor melingkar (SVG)
│   │   └── ParameterCard.tsx    # Kartu status per parameter
│   │
│   ├── pages/               # Halaman (routes)
│   │   ├── LandingPage.tsx  # Beranda (/)
│   │   ├── CekAirPage.tsx   # Form input (/cek-air)
│   │   ├── HasilPage.tsx    # Hasil analisis (/hasil/:id)
│   │   ├── RiwayatPage.tsx  # Riwayat & grafik (/riwayat)
│   │   └── TentangPage.tsx  # Tentang + FAQ (/tentang)
│   │
│   ├── utils/
│   │   ├── waterAnalysis.ts # Algoritma scoring & rekomendasi
│   │   ├── storage.ts       # CRUD localStorage
│   │   └── cn.ts            # Utility className
│   │
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   │
│   ├── App.tsx              # Router setup
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind + custom styles
│
├── vercel.json              # Konfigurasi SPA routing Vercel
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🧮 Cara Kerja Algoritma Skor

Setiap parameter diberi skor 0–100 berdasarkan jarak dari rentang ideal:

- **Di dalam rentang ideal** → skor 100
- **Di zona waspada** (antara ideal dan batas aman) → skor 60–99
- **Di luar batas aman** → skor turun cepat, bisa mencapai 0

Skor akhir adalah **rata-rata berbobot** dari 6 parameter:

| Parameter | Bobot | Alasan |
|---|---|---|
| Amonia | 3× | Paling berbahaya, mematikan dalam jam |
| Nitrit | 3× | Sangat toksik untuk ikan |
| pH | 2× | Mempengaruhi semua proses biologis |
| Suhu | 2× | Stres suhu berdampak besar |
| Nitrat | 1.5× | Berbahaya jika kronis |
| Kesadahan | 1× | Penting tapi lebih toleran |

**Interpretasi skor:**

| Skor | Status | Deskripsi |
|---|---|---|
| 80–100 | ✅ Aman | Kondisi ideal, pertahankan |
| 55–79 | ⚠️ Waspada | Perlu penyesuaian segera |
| 0–54 | 🚨 Bahaya | Tindakan darurat diperlukan |

---

## 🌐 Deploy ke Vercel

Project ini sudah dikonfigurasi untuk Vercel. Cukup:

1. Push ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Deploy — Vercel otomatis mendeteksi Vite

File `vercel.json` sudah mengatur SPA routing agar refresh halaman tidak 404.

---

## 📋 Rentang Ideal Parameter Air

| Parameter | Rentang Ideal | Rentang Aman | Satuan |
|---|---|---|---|
| Suhu | 24–28 | 22–30 | °C |
| pH | 6.5–7.5 | 6.0–8.0 | — |
| Amonia | 0–0.25 | 0–0.5 | ppm |
| Nitrit | 0–0.1 | 0–0.25 | ppm |
| Nitrat | 0–20 | 0–40 | ppm |
| Kesadahan | 60–140 | 40–200 | ppm |

> Rentang ini dioptimalkan untuk ikan hias tropis umum (guppy, cupang, neon tetra, mas koki, dll.)

---

## 🤝 Kontribusi

Pull request dan issue sangat disambut! Kalau ada ide fitur atau laporan bug, silakan buka [Issue](https://github.com/USERNAME/aquaguard/issues) baru.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Bebas digunakan untuk keperluan pribadi maupun edukasi.

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk pecinta ikan hias Indonesia</p>
  <p><strong>AquaGuard</strong> — Jaga Air, Jaga Ikanmu 🐟</p>
</div>
