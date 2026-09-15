"use client";

import React from "react";

export default function Logo821Cars({ size = "md", showSubtitle = false, className = "" }) {
  const logoSizes = {
    sm: "w-8 h-8 md:w-10 md:h-10",
    md: "w-12 h-12 md:w-14 md:h-14",
    lg: "w-20 h-20 md:w-24 md:h-24",
    xl: "w-28 h-28 md:w-36 md:h-36",
  };

  const textSize = {
    sm: "text-lg md:text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
  };

  const logoUrl = "https://res.cloudinary.com/do87isqjr/image/upload/v1789487738/Gemini_Generated_Image_29rjyv29rjyv29rj_cg2onb.jpg";

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* Isotipo / Logo Oficial con resplandor */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <div className={`relative rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-black ${logoSizes[size]}`}>
            <img
              src={logoUrl}
              alt="821 Cars Logo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Tipografía 821 CARS */}
        <div className="flex items-center gap-2 font-black tracking-tighter">
          <span className={`font-black tracking-wider uppercase bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent ${textSize[size]}`}>
            821 <span className="text-blue-500">CARS</span>
          </span>
        </div>
      </div>

      {showSubtitle && (
        <span className="mt-2 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
          Automotors & Selection
        </span>
      )}
    </div>
  );
}
