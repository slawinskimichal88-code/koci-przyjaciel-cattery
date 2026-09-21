"use client";

import React from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

export interface BentoImageItem {
  id?: string;
  src: string;
  title?: string;
  categoryLabel?: string;
}

interface FluidBentoCellProps {
  images: (string | BentoImageItem)[];
  className?: string;
  direction?: "vertical" | "horizontal" | "reverse-vertical" | "reverse-horizontal";
  speed?: number;
  label?: string;
  onPhotoClick?: (item: BentoImageItem) => void;
}

// Ten komponent naprawia błąd "cienkich pasków" używając twardej matematyki CSS i flex-none.
export default function FluidBentoCell({ 
  images, 
  className = "", 
  direction = "horizontal", 
  speed = 15,
  label = "",
  onPhotoClick,
}: FluidBentoCellProps) {
  if (!images || images.length === 0) return null;

  // Podwajamy tablicę, aby stworzyć idealną pętlę (seamless loop)
  const doubled = [...images, ...images];
  
  const isVertical = direction.includes("vertical");
  const isReverse = direction.includes("reverse");

  // Definiujemy skąd dokąd ma płynąć animacja
  const start = isReverse ? "-50%" : "0%";
  const end = isReverse ? "0%" : "-50%";

  // Matematyka taśmy: jeśli mamy np. 6 zdjęć poziomo, taśma musi mieć 600% szerokości kontenera.
  // Dzięki temu flexbox NICZEGO nie zgniecie.
  const trackSize = doubled.length * 100;
  const childSize = 100 / doubled.length;

  // Obliczamy czas trwania animacji tak, aby ruch był powolny, dostojny i kojący:
  // Każde zdjęcie ma średnio 11-14 sekund widoczności, co eliminuje zbyt szybkie przewijanie.
  const effectiveDuration = Math.max(speed, images.length * 11);

  return (
    /* KLUCZOWE: w-full h-full wymusza zajęcie całej komórki siatki (auto-rows). */
    <div className={`relative overflow-hidden rounded-3xl bg-[#111] border border-gray-800 shadow-2xl w-full h-full group ${className}`}>
      
      <motion.div
        className={`absolute top-0 left-0 flex ${isVertical ? "flex-col" : "flex-row"}`}
        style={{
          width: isVertical ? "100%" : `${trackSize}%`,
          height: isVertical ? `${trackSize}%` : "100%",
        }}
        animate={{
          y: isVertical ? [start, end] : ["0%", "0%"],
          x: !isVertical ? [start, end] : ["0%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: effectiveDuration,
        }}
      >
        {doubled.map((item, idx) => {
          const src = typeof item === "string" ? item : item.src;
          const photoObj: BentoImageItem =
            typeof item === "string"
              ? { id: `slide-${idx}`, src: item }
              : item;

          return (
            <div 
              key={idx} 
              /* flex-none to bezpiecznik – zabrania flexboxowi ściskania elementu */
              className="relative flex-none overflow-hidden cursor-pointer"
              style={{
                width: isVertical ? "100%" : `${childSize}%`,
                height: isVertical ? `${childSize}%` : "100%",
              }}
              onClick={() => onPhotoClick && onPhotoClick(photoObj)}
            >
              <img
                src={src}
                alt={photoObj.title || `Maine Coon slide ${idx}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>
          );
        })}
      </motion.div>

      {/* Ikona powiększenia (Apple Expand Icon on hover) */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
