"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

export interface BentoImageItem {
  id?: string;
  src: string;
  title?: string;
  categoryLabel?: string;
}

export type FluidDirection =
  | "vertical"
  | "horizontal"
  | "reverse-vertical"
  | "reverse-horizontal";

interface FluidBentoCellProps {
  images: (string | BentoImageItem)[];
  className?: string;
  direction?: FluidDirection;
  speed?: number; // Czas w sekundach na pełen obrót pętli
  onPhotoClick?: (photo: BentoImageItem) => void;
  badge?: string;
}

export default function FluidBentoCell({
  images,
  className = "",
  direction = "vertical",
  speed = 18,
  onPhotoClick,
  badge,
}: FluidBentoCellProps) {
  // 1. Znormalizuj tablicę wejściową do BentoImageItem
  const normalizedImages: BentoImageItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((item, idx) => {
      if (typeof item === "string") {
        return { id: `fluid-img-${idx}`, src: item };
      }
      return item;
    });
  }, [images]);

  // 2. Aby pętla była pełna i bogata, upewniamy się, że mamy co najmniej 3 zdjęcia w bazie
  const baseList: BentoImageItem[] = useMemo(() => {
    if (normalizedImages.length === 0) return [];
    let list = [...normalizedImages];
    while (list.length < 3) {
      list = [...list, ...normalizedImages];
    }
    return list;
  }, [normalizedImages]);

  // 3. Trik na płynną, nieskończoną pętlę bez przeskoków:
  // Podwajamy tablicę zdjęć [...images, ...images].
  // Kiedy pierwsza połowa wyjedzie poza ekran, druga połowa jest dokładnie na jej miejscu,
  // a animacja niezauważalnie wraca na początek (0%).
  const duplicatedImages: BentoImageItem[] = useMemo(() => {
    return [...baseList, ...baseList];
  }, [baseList]);

  // Konfiguracja kierunków ruchu
  const isVertical = direction.includes("vertical");
  const isReverse = direction.includes("reverse");

  // Definiujemy skąd dokąd ma płynąć taśma
  const startPos = isReverse ? "-50%" : "0%";
  const endPos = isReverse ? "0%" : "-50%";

  const totalCount = duplicatedImages.length;
  if (totalCount === 0) return null;

  // Każde zdjęcie ma dokładnie 100% wymiaru komórki Bento
  const itemPercent = 100 / totalCount;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-[#111114] border border-white/10 hover:border-amber-400/50 shadow-lg hover:shadow-2xl transition-all duration-300 select-none ${className}`}
    >
      <motion.div
        className={`flex ${isVertical ? "flex-col" : "flex-row"}`}
        style={{
          width: isVertical ? "100%" : `${totalCount * 100}%`,
          height: isVertical ? `${totalCount * 100}%` : "100%",
        }}
        // Animujemy po osi Y (pion) lub X (poziom) w stałym, "maślanym" ruchu bez zwalniania
        animate={{
          y: isVertical ? [startPos, endPos] : ["0%", "0%"],
          x: !isVertical ? [startPos, endPos] : ["0%", "0%"],
        }}
        transition={{
          repeat: Infinity, // Nieskończona pętla
          ease: "linear",   // Stała prędkość — maślany ruch bez przyspieszania i hamowania
          duration: speed,  // Długość pełnego cyklu
        }}
      >
        {duplicatedImages.map((photo, idx) => (
          <div
            key={`${photo.src}-${idx}`}
            onClick={() => onPhotoClick && onPhotoClick(photo)}
            style={{
              width: isVertical ? "100%" : `${itemPercent}%`,
              height: isVertical ? `${itemPercent}%` : "100%",
            }}
            className="flex-shrink-0 relative cursor-pointer overflow-hidden"
          >
            <img
              src={photo.src}
              alt={photo.title || "Zdjęcie z hodowli Koci Przyjaciel"}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
          </div>
        ))}
      </motion.div>

      {/* Subtelny badge kategorii */}
      {(badge || normalizedImages[0]?.categoryLabel) && (
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-200 shadow-md">
            {badge || normalizedImages[0]?.categoryLabel}
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
