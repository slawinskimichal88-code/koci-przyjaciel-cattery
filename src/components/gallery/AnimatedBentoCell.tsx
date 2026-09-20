"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";

export interface BentoPhotoItem {
  id?: string;
  src: string;
  categoryLabel?: string;
  title?: string;
}

interface AnimatedBentoCellProps {
  photos: BentoPhotoItem[];
  className?: string;
  onPhotoClick?: (photo: BentoPhotoItem) => void;
  badge?: string;
}

export default function AnimatedBentoCell({
  photos,
  className = "",
  onPhotoClick,
  badge,
}: AnimatedBentoCellProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!photos || photos.length <= 1) return;

    // Zmiana zdjęcia z losowym interwałem (od 3 do 5 sekund),
    // aby kafelki nie animowały się wszystkie w tym samym ułamku sekundy
    const delay = 3000 + Math.random() * 2200;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, delay);

    return () => clearInterval(interval);
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex % photos.length];

  return (
    <div
      onClick={() => onPhotoClick && onPhotoClick(currentPhoto)}
      className={`group relative overflow-hidden rounded-3xl bg-[#121215] border border-white/10 hover:border-amber-400/70 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${className}`}
    >
      {/* AnimatePresence mode="popLayout" odpowiada za płynną podmianę (wjazd nowego i wyjazd starego) */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={`${currentPhoto.src}-${currentIndex}`}
          src={currentPhoto.src}
          alt={currentPhoto.title || "Zdjęcie z hodowli"}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          // Konfiguracja animacji: zdjęcie wjeżdża z dołu (y: "100%")
          initial={{ y: "100%", opacity: 0.6 }}
          animate={{ y: 0, opacity: 1 }}
          // I wyjeżdża do góry (y: "-100%")
          exit={{ y: "-100%", opacity: 0.6 }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1], // Płynna krzywa Beziera (efekt Apple)
          }}
        />
      </AnimatePresence>

      {/* Subtelny cień od dołu */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Etykieta / Kategoria */}
      {(badge || currentPhoto.categoryLabel) && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200 shadow-sm">
            {badge || currentPhoto.categoryLabel}
          </span>
        </div>
      )}

      {/* Ikona rozszerzenia (Apple Expand Icon on hover) */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
