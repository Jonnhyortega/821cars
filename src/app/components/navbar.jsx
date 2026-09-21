"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Logo821Cars from "@/components/Logo821Cars";

export default function Navbar() {
  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="relative group flex items-center gap-3">
         <Logo821Cars size="sm" showSubtitle={false} className="hover:scale-105 transition-transform duration-300" />
      </Link>

      {/* Links de Navegación */}
      <div className="flex items-center gap-3 sm:gap-6 font-semibold text-xs sm:text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          Inicio
        </Link>
        <Link href="/catalogo" className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
          Catálogo
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
