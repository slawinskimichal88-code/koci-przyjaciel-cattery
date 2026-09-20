"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  speed?: number; // Czas w sekundach między przejściami (np. 3.5s - 5s)
  onPhotoClick?: (item: BentoImageItem) => void;
  badge?: string;
}

export default function FluidBentoCell({
  images,
  className = "",
  direction = "vertical",
  speed = 4,
  onPhotoClick,
  badge,
}: FluidBentoCellProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalizacja do tablicy obiektów BentoImageItem
  const normalized: BentoImageItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((item, idx) => {
      if (typeof item === "string") {
        return { id: `img-${idx}`, src: item };
      }
      return item;
    });
  }, [images]);

  // Cykliczne, płynne przesuwanie zdjęć z lekką asynchronicznością
  useEffect(() => {
    if (normalized.length <= 1) return;

    // Asynchroniczny odstęp czasowy, aby kafelki w siatce nie zmieniały się w tym samym ułamku sekundy
    const delay = Math.max(2800, (speed + (Math.random() * 1.4 - 0.7)) * 1000);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % normalized.length);
    }, delay);

    return () => clearInterval(interval);
  }, [normalized.length, speed]);

  if (normalized.length === 0) return null;

  const currentPhoto = normalized[currentIndex % normalized.length];

  // Warianty ruchu w zależności od kierunku kafelka
  let initialVariant = { y: "100%", x: "0%", opacity: 0.85 };
  let exitVariant = { y: "-100%", x: "0%", opacity: 0.85 };

  if (direction === "reverse-vertical") {
    // Płynie z góry do dołu
    initialVariant = { y: "-100%", x: "0%", opacity: 0.85 };
    exitVariant = { y: "100%", x: "0%", opacity: 0.85 };
  } else if (direction === "horizontal") {
    // Płynie z prawej do lewej
    initialVariant = { x: "100%", y: "0%", opacity: 0.85 };
    exitVariant = { x: "-100%", y: "0%", opacity: 0.85 };
  } else if (direction === "reverse-horizontal") {
    // Płynie z lewej do prawej
    initialVariant = { x: "-100%", y: "0%", opacity: 0.85 };
    exitVariant = { x: "100%", y: "0%", opacity: 0.85 };
  }

  return (
    <div
      onClick={() => onPhotoClick && onPhotoClick(currentPhoto)}
      className={`group relative overflow-hidden rounded-3xl bg-[#111114] border border-white/10 hover:border-amber-400/60 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer select-none ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${currentPhoto.src}-${currentIndex}`}
          initial={initialVariant}
          animate={{ y: "0%", x: "0%", opacity: 1 }}
          exit={exitVariant}
          transition={{
            duration: 0.95,
            ease: [0.25, 1, 0.5, 1], // Maślana krzywa Apple / Bezier — bez szarpnięć
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title || "Zdjęcie z hodowli Koci Przyjaciel"}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Subtelny badge kategorii */}
      {(badge || currentPhoto.categoryLabel) && (
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-200 shadow-md">
            {badge || currentPhoto.categoryLabel}
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
