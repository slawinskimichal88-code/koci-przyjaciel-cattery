"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";

export interface BentoImageItem {
  id?: string;
  src: string;
  title?: string;
  categoryLabel?: string;
}

interface AnimatedBentoCellProps {
  images: (string | BentoImageItem)[];
  className?: string;
  onPhotoClick?: (item: BentoImageItem) => void;
  badge?: string;
}

export default function AnimatedBentoCell({
  images,
  className = "",
  onPhotoClick,
  badge,
}: AnimatedBentoCellProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize images to BentoImageItem objects
  const normalizedImages: BentoImageItem[] = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((item, idx) => {
      if (typeof item === "string") {
        return { id: `cell-img-${idx}`, src: item };
      }
      return item;
    });
  }, [images]);

  // Dynamic automatic image sliding with independent randomized interval (3 to 5 seconds)
  useEffect(() => {
    if (normalizedImages.length <= 1) return;

    const delay = 3000 + Math.random() * 2000;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
    }, delay);

    return () => clearInterval(interval);
  }, [normalizedImages.length]);

  if (normalizedImages.length === 0) return null;

  const currentPhoto = normalizedImages[currentIndex % normalizedImages.length];

  return (
    <div
      onClick={() => onPhotoClick && onPhotoClick(currentPhoto)}
      className={`group relative overflow-hidden rounded-3xl bg-[#111114] border border-white/10 hover:border-amber-400/60 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${className}`}
    >
      {/* 
        AnimatePresence mode="popLayout" z initial={false}:
        Na pierwszym załadowaniu strony zdjęcie wyświetla się od razu (y: 0),
        a przy każdej kolejnej zmianie nowe zdjęcie płynnie wsuwa się od dołu (y: 100% -> 0),
        a poprzednie wysuwa się do góry (0 -> -100%) z krzywą Apple Bezier.
      */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={`${currentPhoto.src}-${currentIndex}`}
          src={currentPhoto.src}
          alt={currentPhoto.title || "Zdjęcie z hodowli Koci Przyjaciel"}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0.5 }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1], // Krzywa Beziera (efekt Apple)
          }}
        />
      </AnimatePresence>

      {/* Subtelny cień od dołu */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

      {/* Etykieta / Kategoria */}
      {(badge || currentPhoto.categoryLabel) && (
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200 shadow-sm">
            {badge || currentPhoto.categoryLabel}
          </span>
        </div>
      )}

      {/* Ikona powiększenia (Apple Expand on Hover) */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
