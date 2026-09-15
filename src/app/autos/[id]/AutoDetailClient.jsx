"use client";

import GalleryViewer from "@/app/components/galleryViewer";
import Link from "next/link";
import { enviarWhatsApp } from "@/app/utils/redireccionarAwhatsapp";
import { motion } from "framer-motion";
import { ChevronLeft, MessageCircle, Check, Gauge } from "lucide-react";
import Navbar from "@/app/components/navbar";

export default function AutoDetailClient({ auto }) {
  if (!auto || !auto.disponible) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-neutral-950 text-foreground px-6">
        <p className="text-red-500 text-2xl font-black mb-4">
          🚫 Vehículo no encontrado
        </p>
        <Link
          href="/catalogo"
          className="text-blue-600 hover:underline text-lg font-semibold transition-colors"
        >
          ← Volver al catálogo
        </Link>
      </section>
    );
  }

  const isSold = !auto.disponible;
  const isReserved = auto.reservado;

  return (
    <section className="min-h-screen bg-[#f4f6f9] dark:bg-[#090d16] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* 🔹 Navbar Superior */}
      <div className="fixed w-full top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 md:px-6 space-y-6">
        {/* 🔹 Botón de Retorno */}
        <div className="flex justify-between items-center px-2">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo
          </Link>
        </div>

        {/* 🔹 TARJETA PRINCIPAL SHOWROOM (Fiel a la foto adjunta) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#111622] border border-gray-200/80 dark:border-white/10 rounded-[32px] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 👈 Lado Izquierdo: Información y Ficha Técnica */}
            <div className="lg:col-span-6 space-y-6 z-20">
              
              {/* Marca & Logo */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {auto.marca}
                  </span>
                  {auto.make_logo && (
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-neutral-800 p-0.5 flex items-center justify-center">
                      <img
                        src={auto.make_logo}
                        alt={auto.marca}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Modelo y Versión */}
                <div className="flex flex-wrap items-baseline gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {auto.model}
                  </h1>
                  {auto.version && (
                    <span className="text-2xl md:text-3xl font-light text-slate-400 dark:text-neutral-400">
                      {auto.version}
                    </span>
                  )}
                </div>
              </div>

              {/* Badges superiores tipo Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {isSold ? (
                  <span className="px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-extrabold text-xs tracking-wider uppercase border border-red-200 dark:border-red-500/30">
                    VENDIDO
                  </span>
                ) : isReserved ? (
                  <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-wider uppercase border border-amber-200 dark:border-amber-500/30">
                    RESERVADO
                  </span>
                ) : (
                  <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-extrabold text-xs tracking-wider uppercase border border-blue-200 dark:border-blue-500/30">
                    DISPONIBLE
                  </span>
                )}

                <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 text-xs font-semibold text-slate-600 dark:text-neutral-300">
                  Año {auto.año}
                </span>

                <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 text-xs font-semibold text-slate-600 dark:text-neutral-300">
                  {auto.km} km
                </span>

                <span className="px-4 py-1.5 rounded-full bg-slate-50 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 text-xs font-semibold text-slate-600 dark:text-neutral-300">
                  Motor {auto.motor || "Nafta"}
                </span>
              </div>

              {/* 3 Bloques Rectangulares Blancos / Estilizados */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Caja PRECIO */}
                <div className="sm:col-span-1 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-400 mb-0.5">
                    PRECIO ESPECIAL
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {auto.precio > 0
                      ? auto.moneda === "usd"
                        ? `USD $${auto.precio.toLocaleString("es-AR")}`
                        : `$${auto.precio.toLocaleString("es-AR")}`
                      : "Consultar"}
                  </span>
                  <span className="text-xs font-medium text-slate-400 dark:text-neutral-500 mt-0.5">
                    821 Cars
                  </span>
                </div>

                {/* Caja KM */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 shadow-sm flex flex-col items-center justify-center text-center">
                  <Gauge className="w-6 h-6 text-slate-400 dark:text-neutral-400 mb-1" />
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {auto.km} km
                  </span>
                </div>

                {/* Caja ESTADO */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center mb-1">
                    <Check className="w-4 h-4 text-slate-700 dark:text-neutral-300" />
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {isSold ? "Vendido" : isReserved ? "Reservado" : "Disponible"}
                  </span>
                </div>
              </div>

              {/* Botón WhatsApp Verde Brillante */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => enviarWhatsApp(auto)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#05b851] hover:bg-[#04a046] text-white rounded-full font-bold text-base shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 transition-all"
                >
                  <MessageCircle className="w-6 h-6 fill-white" />
                  Consultar con asesor por WhatsApp
                </motion.button>
              </div>
            </div>

            {/* 👉 Lado Derecho: Imagen del Auto con Overlay Atenudador & Blur sutil */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[360px] lg:min-h-[480px] p-2 group/auto">
              
              {/* Overlay atenudador para hacer resaltar los textos de la izquierda */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-[#111622]/95 dark:via-[#111622]/50 dark:to-transparent z-10 pointer-events-none transition-opacity duration-500" />

              {/* Logo de Marca Flotante */}
              {auto.make_logo && (
                <div className="absolute top-0 right-2 z-20 w-16 h-16 md:w-20 md:h-20 p-3 rounded-2xl bg-black/90 dark:bg-neutral-900 border border-white/20 shadow-2xl flex items-center justify-center">
                  <img
                    src={auto.make_logo}
                    alt={auto.marca}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
              )}

              {/* Imagen recortada del auto atenudada suavemente con opacidad/blur */}
              {auto.miniatura ? (
                <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                  <img
                    src={auto.miniatura}
                    alt={`${auto.marca} ${auto.model}`}
                    className="w-full max-h-[480px] lg:max-h-[520px] object-contain scale-110 md:scale-125 lg:scale-135 opacity-70 group-hover/auto:opacity-100 filter blur-[0.5px] group-hover/auto:blur-none transition-all duration-700 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                  />
                </div>
              ) : auto.imgs && auto.imgs.length > 0 && auto.imgs[0] ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-neutral-800">
                  <img
                    src={auto.imgs[0]}
                    alt={`${auto.marca} ${auto.model}`}
                    className="w-full h-full object-cover opacity-75 group-hover/auto:opacity-100 transition-opacity duration-500"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-100 dark:bg-neutral-900 rounded-3xl w-full border border-gray-200 dark:border-neutral-800">
                  <span className="text-4xl font-black italic text-blue-500 mb-2">821</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Fotos Próximamente</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 🖼️ Galería completa de fotos adicionales debajo */}
        {auto.imgs && auto.imgs.length > 0 && (
          <div className="bg-white dark:bg-[#111622] rounded-[32px] overflow-hidden shadow-xl border border-gray-200/80 dark:border-white/10 p-6">
            <h3 className="text-lg font-bold mb-4 px-2">Galería de Imágenes</h3>
            <GalleryViewer images={auto.imgs} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm pt-8 pb-4">
          © {new Date().getFullYear()} <span className="font-semibold text-foreground">821 Cars</span> – Automotors
        </footer>
      </div>
    </section>
  );
}
