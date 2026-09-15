"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AutoCard({ auto, index = 0 }) {
  const isSold = !auto.disponible;
  const isReserved = auto.reservado;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="h-full group"
    >
      <Link
        href={`/autos/${auto.id}`}
        className="flex flex-col h-full bg-[#0d1117] border border-blue-500/30 hover:border-blue-500/70 rounded-[28px] overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(30,58,138,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.4)] relative p-4"
      >
        {/* 🔹 Zona Superior Showcase (Halo Azul + Badges + Foto) */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#111927] via-[#0b1329] to-[#0d1117] flex items-center justify-center p-3 mb-4">
          
          {/* Resplandor Azul Radial Centrado */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.35)_0%,_rgba(15,23,42,0.6)_60%,_transparent_100%)] pointer-events-none" />

          {/* Badge Izquierda: ESTADO (Borde fino con punto de luz) */}
          <div className="absolute top-3 left-3 z-20">
            {isSold ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/80 bg-red-500/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-bold text-red-400 tracking-wider uppercase">VENDIDO</span>
              </div>
            ) : isReserved ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/80 bg-amber-500/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase">RESERVADO</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/80 bg-blue-500/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">DISPONIBLE</span>
              </div>
            )}
          </div>

          {/* Badge Derecha: Logo de Marca en Círculo de Cristal */}
          {auto.make_logo && (
            <div className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-neutral-800/80 backdrop-blur-md border border-white/10 flex items-center justify-center p-2 shadow-md">
              <img
                src={auto.make_logo}
                alt={auto.marca}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
          )}

          {/* Foto Recortada o Imagen Principal */}
          {auto.miniatura ? (
            <img
              src={auto.miniatura}
              alt={`${auto.marca} ${auto.model}`}
              className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          ) : auto.imgs && auto.imgs.length > 0 && auto.imgs[0] ? (
            <img
              src={auto.imgs[0]}
              alt={`${auto.marca} ${auto.model}`}
              className="relative z-10 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white/80 text-center z-10">
              <span className="text-3xl font-black italic text-blue-400 tracking-wider mb-1">821</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Fotos Próximamente</span>
            </div>
          )}
        </div>

        {/* 🔹 Sección Informativa */}
        <div className="px-2 flex flex-col flex-grow justify-between">
          
          {/* Marca, Modelo y Versión */}
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 block mb-0.5">
              {auto.marca}
            </span>
            <div className="flex justify-between items-baseline gap-2">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight line-clamp-1">
                {auto.model}
              </h2>
              {auto.version && (
                <span className="text-xs font-medium text-neutral-400 line-clamp-1 shrink-0">
                  {auto.version}
                </span>
              )}
            </div>
          </div>

          {/* 🔹 Ficha Técnica (3 Cajas Contorneadas) */}
          <div className="grid grid-cols-3 gap-2 my-3">
            {/* Caja AÑO */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-900/80 border border-neutral-700/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">AÑO</span>
              <span className="text-sm md:text-base font-bold text-white">{auto.año}</span>
            </div>

            {/* Caja KM */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-900/80 border border-neutral-700/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">KM</span>
              <span className="text-sm md:text-base font-bold text-white">{auto.km}</span>
            </div>

            {/* Caja MOTOR */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-900/80 border border-neutral-700/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">MOTOR</span>
              <span className="text-xs md:text-sm font-bold text-white line-clamp-1">{auto.motor || "Nafta"}</span>
            </div>
          </div>

          {/* 🔹 Precio y Botón "Ver detalle" */}
          <div className="pt-3 border-t border-neutral-800/80 flex items-end justify-between gap-2 mt-auto">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-neutral-400">
                Precio
              </span>
              <span
                className={`text-xl md:text-2xl font-black text-white tracking-tight ${
                  isSold ? "line-through text-neutral-500" : ""
                }`}
              >
                {isSold
                  ? "VENDIDO"
                  : auto.moneda === "usd"
                  ? `USD $ ${auto.precio.toLocaleString("es-AR")}`
                  : `$ ${auto.precio.toLocaleString("es-AR")}`}
              </span>
            </div>

            {/* Botón Ver Detalle */}
            <div className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 shrink-0">
              Ver detalle
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
