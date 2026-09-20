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
  onPhotoClick?: (item: BentoImageItem) => void;
  badge?: string;
}

export default function FluidBentoCell({ 
  images, 
  className = "", 
  direction = "horizontal", 
  speed = 15,
  onPhotoClick,
  badge,
}: FluidBentoCellProps) {
  if (!images || images.length === 0) return null;

  // Podwajamy tablicę, aby stworzyć idealną pętlę
  const doubled = [...images, ...images];
  
  const isVertical = direction.includes("vertical");
  const isReverse = direction.includes("reverse");

  // Punkty startu i końca animacji
  const start = isReverse ? "-50%" : "0%";
  const end = isReverse ? "0%" : "-50%";

  // Matematyczny trik CSS:
  // Jeśli mamy 6 zdjęć poziomo, szerokość toru to 600%.
  // Wtedy każde zdjęcie wewnątrz zajmuje dokładnie (100 / 6)% toru, czyli dokładnie 100% kafelka Bento.
  const trackSize = doubled.length * 100;
  const childSize = 100 / doubled.length;

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] bg-gray-900 border border-white/10 shadow-xl ${className}`}>
      <motion.div
        className={`flex ${isVertical ? "flex-col" : "flex-row"} absolute top-0 left-0`}
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
          duration: speed,
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
              className="relative overflow-hidden cursor-pointer"
              style={{
                width: isVertical ? "100%" : `${childSize}%`,
                height: isVertical ? `${childSize}%` : "100%",
              }}
              onClick={() => onPhotoClick && onPhotoClick(photoObj)}
            >
              <img
                src={src}
                alt={photoObj.title || `Gallery slide ${idx}`}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Delikatny gradient podkreślający głębię */}
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </div>
          );
        })}
      </motion.div>

      {/* Subtelny badge kategorii */}
      {(badge || (typeof images[0] !== "string" && (images[0] as BentoImageItem)?.categoryLabel)) && (
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-200 shadow-md">
            {badge || (images[0] as BentoImageItem)?.categoryLabel}
          </span>
        </div>
      )}

      {/* Ikona powiększenia (Apple Expand Icon on hover) */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
