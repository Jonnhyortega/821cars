"use client";

import { motion } from "framer-motion";
import Logo821Cars from "@/components/Logo821Cars";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-black z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <Logo821Cars size="lg" showSubtitle={true} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-gray-400 text-sm tracking-widest uppercase font-medium"
        >
          Cargando experiencia...
        </motion.p>
      </motion.div>
    </div>
  );
}
