"use client";

import { useState } from "react";
import AutoCard from "../components/autoCard";
import Navbar from "../components/navbar";
import { stock } from "@/data/stock";
import { Search, Car } from "lucide-react";
import WhatsAppButton from "../components/whatsappButton";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CatalogoPage() {
  const [search, setSearch] = useState("");

  const filteredStock = stock.filter((auto) => {
    if (!auto.disponible && !auto.reservado) return false;
    const text = search.toLowerCase();
    return (
      auto.marca?.toLowerCase().includes(text) ||
      auto.model?.toLowerCase().includes(text) ||
      auto.version?.toLowerCase().includes(text) ||
      auto.motor?.toLowerCase().includes(text) ||
      auto.año?.toLowerCase().includes(text) ||
      auto.km?.toLowerCase().includes(text) ||
      (auto.moto && "moto".includes(text)) ||
      (auto.moneda && auto.moneda.toLowerCase().includes(text))
    );
  });

  return (
    <div className="min-h-screen font-sans bg-background text-foreground transition-colors duration-300">
      {/* 🔹 Navbar */}
      <div className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <Navbar />
      </div>

      <main className="pt-28 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header del Catálogo */}
          <div className="flex flex-col items-center text-center space-y-6 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
            >
              <Car className="w-4 h-4" /> Stock Actualizado 821 Cars
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
            >
              Catálogo de <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Vehículos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl"
            >
              Explorá nuestra selección exclusiva de autos y motos seleccionadas. Encontrá tu próximo vehículo hoy.
            </motion.p>

            {/* Buscador */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-2xl"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por marca, modelo, año, motor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card/80 border border-border rounded-full py-4 pl-12 pr-6 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-md backdrop-blur-sm"
              />
            </motion.div>
          </div>

          {/* Grilla de Resultados */}
          {filteredStock.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredStock.map((auto, index) => (
                <AutoCard key={auto.id} auto={auto} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-card/30 rounded-3xl border border-border"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No se encontraron vehículos</h3>
              <p className="text-muted-foreground">
                No hay coincidencias para <span className="text-foreground font-semibold">&quot;{search}&quot;</span>. Intentá buscar con otra marca o modelo.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <WhatsAppButton />

      <footer className="text-center py-10 border-t border-border bg-card/30 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <a
            href="https://wa.me/5491153144271?text=Hola!%20Estoy%20interesado%20en%20consultar%20por%20un%20veh%C3%ADculo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-green-500/10 hover:text-green-600 transition-all duration-300 group"
          >
            <Image width={24} height={24} src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp" className="group-hover:scale-110 transition-transform"/>
            <span className="font-medium">WhatsApp</span>
          </a>

          <a
            href="https://www.instagram.com/alcars.chacabuco/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-pink-500/10 hover:text-pink-600 transition-all duration-300 group"
          >
            <Image width={24} height={24} src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram" className="group-hover:scale-110 transition-transform"/>
            <span className="font-medium">Instagram</span>
          </a>
        </div>

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-foreground">821 Cars</span> • Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
