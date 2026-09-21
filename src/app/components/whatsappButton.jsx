"use client";

import { usePathname } from "next/navigation";
import { stock } from "@/data/stock";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { enviarWhatsApp } from "@/app/utils/redireccionarAwhatsapp";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // 🧠 Detectar si estamos en una página de auto (por ID en la URL)
  const match = pathname.match(/\/autos\/(\d+)/);
  const id = match ? Number(match[1]) : null;
  const auto = id ? stock.find((a) => a.id === id && a.disponible) : null;

  const handleClick = () => {
    if (auto) {
      enviarWhatsApp(auto);
    } else {
      // Mensaje genérico si no está en página de un auto
      const numero = "5491153144271";
      const mensaje = "Hola! Mateo Estoy interesado en ir a ver los vehiculos.";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 
      rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold shadow-[0_0_20px_rgba(34,197,94,0.4)]
      transition-all backdrop-blur-md border border-green-400/40"
    >
      <MessageCircle size={22} className="animate-pulse" />
      <span className="hidden sm:inline">
        {auto ? `Consultar por ${auto.marca}` : "Consultar ahora"}
      </span>
    </motion.button>
  );
}
