import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/utils/cn";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Cek Air", path: "/cek-air" },
  { label: "Riwayat", path: "/riwayat" },
  { label: "Tentang", path: "/tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md shadow-brand-900/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="z-50">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-600",
                location.pathname === item.path
                  ? "text-brand-600"
                  : "text-gray-600"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/cek-air" className="btn-primary text-sm">
            Mulai Cek Air
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 rounded-lg p-2 text-gray-700 hover:bg-brand-50 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/cek-air" className="btn-primary mt-2 w-full text-sm">
            Mulai Cek Air
          </Link>
        </div>
      </div>
    </header>
  );
}
