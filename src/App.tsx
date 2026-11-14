import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/pages/LandingPage";
import CekAirPage from "@/pages/CekAirPage";
import RiwayatPage from "@/pages/RiwayatPage";
import TentangPage from "@/pages/TentangPage";
import HasilPage from "@/pages/HasilPage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cek-air" element={<CekAirPage />} />
          <Route path="/riwayat" element={<RiwayatPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/hasil/:id" element={<HasilPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
