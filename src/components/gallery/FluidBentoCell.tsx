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
  speed?: number; // Czas w sekundach na pełen obrót pętli
  onPhotoClick?: (item: BentoImageItem) => void;
  badge?: string;
}

export default function FluidBentoCell({
  images,
  className = "",
  direction = "vertical",
  speed = 15,
  onPhotoClick,
  badge,
}: FluidBentoCellProps) {
  if (!images || images.length === 0) return null;

  // Normalizacja do tablicy obiektów
  const normalized: BentoImageItem[] = images.map((item, idx) => {
    if (typeof item === "string") {
      return { id: `img-${idx}`, src: item };
    }
    return item;
  });

  // Upewnijmy się, że w liście są co najmniej 3 zdjęcia przed zdublowaniem
  let baseList = [...normalized];
  if (baseList.length === 1) {
    baseList = [baseList[0], baseList[0], baseList[0]];
  } else if (baseList.length === 2) {
    baseList = [baseList[0], baseList[1], baseList[0], baseList[1]];
  }

  // Trik na płynną, nieskończoną pętlę: podwajamy tablicę zdjęć
  const duplicatedImages = [...baseList, ...baseList];

  // Konfiguracja kierunków ruchu
  const isVertical = direction.includes("vertical");
  const isReverse = direction.includes("reverse");

  // Definiujemy skąd dokąd ma płynąć taśma
  const startPos = isReverse ? "-50%" : "0%";
  const endPos = isReverse ? "0%" : "-50%";

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-[#111114] border border-white/10 hover:border-amber-400/50 shadow-lg transition-all duration-300 ${className}`}
    >
      <motion.div
        className={`flex h-full w-full ${isVertical ? "flex-col" : "flex-row"}`}
        animate={{
          y: isVertical ? [startPos, endPos] : 0,
          x: !isVertical ? [startPos, endPos] : 0,
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {duplicatedImages.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => onPhotoClick && onPhotoClick(photo)}
            className="h-full w-full flex-shrink-0 relative cursor-pointer overflow-hidden"
          >
            <img
              src={photo.src}
              alt={photo.title || "Galeria Koci Przyjaciel"}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
          </div>
        ))}
      </motion.div>

      {/* Subtelny badge kategorii */}
      {(badge || normalized[0]?.categoryLabel) && (
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-200 shadow-md">
            {badge || normalized[0]?.categoryLabel}
          </span>
        </div>
      )}

      {/* Ikona powiększenia (Apple Expand Icon) */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
