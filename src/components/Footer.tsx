import { Link } from "react-router-dom";
import { Droplet, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-brand-100 bg-gradient-to-b from-white to-brand-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-600/30">
                <Droplet className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                Aqua<span className="text-brand-600">Guard</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-gray-500">
              AquaGuard membantu hobiis ikan hias memantau kualitas air akuarium dengan mudah.
              Jaga air tetap sehat, ikan pun tetap bahagia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Navigasi</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-brand-600">Beranda</Link></li>
              <li><Link to="/cek-air" className="text-gray-500 hover:text-brand-600">Cek Air</Link></li>
              <li><Link to="/riwayat" className="text-gray-500 hover:text-brand-600">Riwayat</Link></li>
              <li><Link to="/tentang" className="text-gray-500 hover:text-brand-600">Tentang</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Informasi</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-gray-500">Prototype untuk lomba</li>
              <li className="text-gray-500">Data tersimpan di perangkat</li>
              <li className="text-gray-500">Tanpa registrasi</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-100 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">
            © 2026 AquaGuard. Semua hak dilindungi.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-gray-400">
            Dibuat dengan <Heart className="h-3.5 w-3.5 text-brand-500" fill="currentColor" /> untuk pecinta ikan hias
          </p>
        </div>
      </div>
    </footer>
  );
}
