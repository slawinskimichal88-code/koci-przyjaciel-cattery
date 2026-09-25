"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
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

// 120 FPS CSS GPU-Composited Bento Cell (Zero JS main thread animation overhead)
export default function FluidBentoCell({ 
  images, 
  className = "", 
  direction = "horizontal", 
  speed = 15,
  label = "",
  onPhotoClick,
}: FluidBentoCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cellRef, { margin: "250px" });

  if (!images || images.length === 0) return null;

  // Podwajamy tablicę dla bezszwowej pętli
  const doubled = [...images, ...images];
  
  const isVertical = direction.includes("vertical");

  // Matematyka taśmy
  const trackSize = doubled.length * 100;
  const childSize = 100 / doubled.length;

  const effectiveDuration = Math.max(speed, images.length * 11);

  const animationClass =
    direction === "vertical"
      ? "bento-anim-up"
      : direction === "reverse-vertical"
      ? "bento-anim-down"
      : direction === "reverse-horizontal"
      ? "bento-anim-right"
      : "bento-anim-left";

  return (
    <div
      ref={cellRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden rounded-3xl bg-[#111] border border-gray-800 shadow-2xl w-full h-full group select-none ${className}`}
      style={{ contentVisibility: "auto", contain: "layout paint" }}
    >
      <div
        className={`absolute top-0 left-0 flex ${isVertical ? "flex-col" : "flex-row"} ${animationClass}`}
        style={{
          width: isVertical ? "100%" : `${trackSize}%`,
          height: isVertical ? `${trackSize}%` : "100%",
          animationDuration: `${effectiveDuration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isInView ? "running" : "paused",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
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
                loading="lazy"
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 z-10 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Ikona powiększenia */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
