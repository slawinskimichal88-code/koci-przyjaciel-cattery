"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

// Zoptymalizowany pod 120 FPS komponent kafelka Bento z GPU kompozycją i pauzą poza ekranem
export default function FluidBentoCell({ 
  images, 
  className = "", 
  direction = "horizontal", 
  speed = 15,
  label = "",
  onPhotoClick,
}: FluidBentoCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cellRef, { margin: "200px" });

  if (!images || images.length === 0) return null;

  // Podwajamy tablicę, aby stworzyć bezszwową pętlę (seamless loop)
  const doubled = [...images, ...images];
  
  const isVertical = direction.includes("vertical");
  const isReverse = direction.includes("reverse");

  // Definiujemy trajektorię ruchu
  const start = isReverse ? "-50%" : "0%";
  const end = isReverse ? "0%" : "-50%";

  // Matematyka taśmy
  const trackSize = doubled.length * 100;
  const childSize = 100 / doubled.length;

  // Spokojny, majestatyczny ruch (10-14s na kadr)
  const effectiveDuration = Math.max(speed, images.length * 11);

  return (
    <div
      ref={cellRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden rounded-3xl bg-[#111] border border-gray-800 shadow-2xl w-full h-full group select-none ${className}`}
      style={{ contentVisibility: "auto" }}
    >
      <motion.div
        className={`absolute top-0 left-0 flex ${isVertical ? "flex-col" : "flex-row"}`}
        style={{
          width: isVertical ? "100%" : `${trackSize}%`,
          height: isVertical ? `${trackSize}%` : "100%",
          willChange: isInView ? "transform" : "auto",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        animate={
          isInView
            ? {
                y: isVertical ? [start, end] : ["0%", "0%"],
                x: !isVertical ? [start, end] : ["0%", "0%"],
              }
            : undefined
        }
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
              className="relative flex-none overflow-hidden cursor-pointer select-none"
              style={{
                width: isVertical ? "100%" : `${childSize}%`,
                height: isVertical ? `${childSize}%` : "100%",
              }}
              onClick={() => onPhotoClick && onPhotoClick(photoObj)}
            >
              <img
                src={src}
                alt={photoObj.title || `Maine Coon slide ${idx}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105 pointer-events-none select-none"
                loading={idx < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Niewidoczna osłona przed kopiowaniem klatki */}
              <div className="absolute inset-0 z-10 pointer-events-none" />
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
