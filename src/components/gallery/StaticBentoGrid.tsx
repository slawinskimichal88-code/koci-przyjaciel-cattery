"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles } from "lucide-react";
import { GalleryPhotoItem } from "@/data/agaGalleryData";

interface StaticBentoGridProps {
  photos: GalleryPhotoItem[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  lang?: "PL" | "EN";
  id?: string;
}

export default function StaticBentoGrid({
  photos,
  title,
  subtitle,
  badge,
  lang = "PL",
  id,
}: StaticBentoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

  // Bierzemy 5 najlepszych ujęć do perfekcyjnego układu Apple Bento
  const displayPhotos = photos.slice(0, 5);

  const selectedIndex = selectedPhoto
    ? displayPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleModalNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === -1 || displayPhotos.length === 0) return;
    const nextIdx = (selectedIndex + 1) % displayPhotos.length;
    setSelectedPhoto(displayPhotos[nextIdx]);
  };

  const handleModalPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === -1 || displayPhotos.length === 0) return;
    const prevIdx = (selectedIndex - 1 + displayPhotos.length) % displayPhotos.length;
    setSelectedPhoto(displayPhotos[prevIdx]);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowRight") handleModalNext();
      if (e.key === "ArrowLeft") handleModalPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto, selectedIndex, displayPhotos]);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  if (displayPhotos.length === 0) return null;

  // Układy siatki Bento dla 5 kafelków
  const getGridSpan = (idx: number) => {
    switch (idx) {
      case 0:
        return "col-span-1 sm:col-span-2 row-span-2 h-[280px] sm:h-[460px]";
      case 1:
        return "col-span-1 sm:col-span-1 row-span-2 h-[280px] sm:h-[460px]";
      case 2:
        return "col-span-1 sm:col-span-1 row-span-1 h-[220px]";
      case 3:
        return "col-span-1 sm:col-span-1 row-span-1 h-[220px]";
      case 4:
        return "col-span-1 sm:col-span-2 row-span-1 h-[220px]";
      default:
        return "col-span-1 row-span-1 h-[220px]";
    }
  };

  return (
    <div id={id} className="w-full relative" style={{ contentVisibility: "auto" }}>
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      {(title || subtitle || badge) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300 mb-3 shadow-sm font-semibold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{badge}</span>
              </div>
            )}
            {title && <div>{title}</div>}
            {subtitle && (
              <div className="text-xs sm:text-sm text-zinc-400 font-body font-light mt-2 max-w-2xl leading-relaxed">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BENTO GRID (Zero CPU/GPU animation load, pure instantaneous rendering) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-min">
        {displayPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            onContextMenu={(e) => e.preventDefault()}
            className={`group relative overflow-hidden rounded-3xl bg-[#121215] border border-white/10 hover:border-white/30 shadow-xl cursor-pointer transition-all duration-300 select-none ${getGridSpan(idx)}`}
          >
            <img
              src={photo.src}
              alt={photo.title || `Fotografia Maine Coon ${idx + 1}`}
              loading={idx < 2 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
            />
            {/* Czysty cień u dołu z podpisem */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-xs font-heading font-medium text-white drop-shadow-sm">
                {photo.title || photo.categoryLabel}
              </span>
            </div>

            {/* Ikona Apple Expand */}
            <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Niewidoczna osłona przed pobieraniem */}
            <div className="absolute inset-0 z-10 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX MODAL Z TARCZĄ I ZNAKIEM WODNYM ─────────────────── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
            />

            <button
              onClick={handleModalPrev}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex hover:scale-110 shadow-xl"
              title="Poprzednie zdjęcie (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleModalNext}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex hover:scale-110 shadow-xl"
              title="Następne zdjęcie (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 max-w-5xl max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] bg-black border border-white/20 flex flex-col items-center justify-center cursor-default select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title || "Powiększone zdjęcie"}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-auto h-auto max-w-full max-h-[82vh] object-contain rounded-2xl sm:rounded-3xl pointer-events-none select-none"
                />
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 pointer-events-none select-none shadow-sm">
                  © Koci Przyjaciel *PL · Prawa zastrzeżone
                </div>
              </div>

              <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="text-amber-300 font-semibold">
                  {selectedPhoto.categoryLabel || "Koci Przyjaciel *PL"}
                </span>
                <span className="text-zinc-400">
                  {selectedIndex + 1} / {displayPhotos.length}
                </span>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
                title="Zamknij (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
