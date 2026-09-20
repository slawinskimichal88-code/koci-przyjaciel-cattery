"use client";

import React from "react";
import { motion } from "framer-motion";

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
}

export default function FluidBentoCell({ 
  images, 
  className = "", 
  direction = "horizontal", 
  speed = 15,
  onPhotoClick,
}: FluidBentoCellProps) {
  if (!images || images.length === 0) return null;

  // Podwajamy tablicę, aby stworzyć idealną pętlę
  const doubled = [...images, ...images];
  
  const isVertical = direction.includes("vertical");
  const isReverse = direction.includes("reverse");

  const start = isReverse ? "-50%" : "0%";
  const end = isReverse ? "0%" : "-50%";

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 ${className}`}>
      <motion.div
        className={`flex ${isVertical ? "flex-col" : "flex-row"}`}
        style={{
          // KLUCZOWY TRIK: Obliczamy dokładną szerokość/wysokość w procentach.
          // Jeśli mamy 6 zdjęć na taśmie, szerokość to 600%. Nic się nie zgniecie.
          width: isVertical ? "100%" : `${doubled.length * 100}%`,
          height: isVertical ? `${doubled.length * 100}%` : "100%",
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
            // Pozycjonowanie absolutne wewnątrz flexa zapobiega deformacjom
            <div
              key={idx}
              className="relative h-full w-full cursor-pointer"
              onClick={() => onPhotoClick && onPhotoClick(photoObj)}
            >
              <img
                src={src}
                alt={`Slide ${idx}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
