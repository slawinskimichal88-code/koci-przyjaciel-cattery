"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Layers,
  Sparkles,
  Download,
} from "lucide-react";
import { ALL_AGA_PHOTOS, AGA_CATEGORIES, GalleryPhotoItem } from "@/data/agaGalleryData";

interface BentoGalleryProps {
  lang?: "PL" | "EN";
}

export default function BentoGallery({ lang = "PL" }: BentoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(36);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

  // Filter photos by selected category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return ALL_AGA_PHOTOS;
    return ALL_AGA_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  // Current index in filtered photos for next/prev navigation
  const currentIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [selectedPhoto, filteredPhotos]);

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIdx]);
  };

  // Keyboard navigation (Esc, Left, Right)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto, currentIndex, filteredPhotos]);

  // Generate dynamic Bento Grid span patterns
  const getBentoSpan = (index: number) => {
    const mod = index % 12;
    if (mod === 0) return "col-span-1 sm:col-span-2 row-span-2"; // 2x2 large anchor
    if (mod === 4) return "col-span-1 sm:col-span-2 row-span-1"; // 2x1 wide
    if (mod === 7) return "col-span-1 sm:col-span-1 row-span-2"; // 1x2 tall portrait
    return "col-span-1 row-span-1"; // 1x1 standard
  };

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-[#0A0A0C] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 mb-5">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "PL" ? "BENTO GRID · ARCHIWUM HODOWLI" : "BENTO GRID · CATTERY ARCHIVE"}</span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Wszystkie zdjęcia z hodowli.<br />
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                  Ułożone według folderów.
                </span>
              </>
            ) : (
              <>
                All cattery photos.<br />
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                  Organized by category folders.
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-body font-light leading-relaxed">
            {lang === "PL"
              ? `Kompletne archiwum ${ALL_AGA_PHOTOS.length} fotografii z naszego domowego wybiegu, salonu, miotów kociąt i dumnych kocurów. Wybierz folder poniżej i kliknij dowolne zdjęcie, by powiększyć je płynną animacją Shared Layout.`
              : `Complete archive of ${ALL_AGA_PHOTOS.length} authentic photos. Select any folder below and click to expand.`}
          </p>
        </div>

        {/* ── FOLDER FILTER TABS (APPLE PILLS) ───────────────────────── */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-12">
          {AGA_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(36); // Reset pagination on category switch
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-105"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── BENTO GRID ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {displayedPhotos.map((photo, index) => {
            const spanClass = getBentoSpan(index);

            return (
              <motion.div
                key={photo.id}
                layoutId={`bento-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#141418] shadow-md hover:shadow-2xl hover:border-amber-400/50 transition-colors duration-300 ${spanClass}`}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                {/* Zdjęcie */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading={index < 12 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtelny gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Górny badge kategorii */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono text-zinc-300">
                    {photo.categoryLabel.split(" ")[0]}
                  </span>
                </div>

                {/* Ikona rozszerzenia w hover */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>

                {/* Podpis dolny */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-10">
                  <p className="text-xs sm:text-sm font-heading font-medium text-white truncate group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── PRZYCISK ZAŁADUJ WIĘCEJ (PAGINACJA DLA PŁYNNOŚCI 120 FPS) ── */}
        {visibleCount < filteredPhotos.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 36)}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer hover:scale-105 shadow-md"
            >
              <span>{lang === "PL" ? `Pokaż kolejne zdjęcia (pozostało ${filteredPhotos.length - visibleCount})` : `Load more photos (${filteredPhotos.length - visibleCount} remaining)`}</span>
            </button>
          </div>
        )}

      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SHARED LAYOUT ANIMATION LIGHTBOX MODAL (FLUID SPRING MORPH)
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
            
            {/* Tło rozmywające */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
            />

            {/* Przyciski Następne / Poprzednie */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex hover:scale-110"
              title="Poprzednie zdjęcie (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex hover:scale-110"
              title="Następne zdjęcie (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Karta Bento morphująca z siatki (Shared Layout Animation) */}
            <motion.div
              layoutId={`bento-${selectedPhoto.id}`}
              className="relative w-full max-w-5xl max-h-[92vh] bg-[#121216] border border-white/20 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-20 flex flex-col md:flex-row cursor-default"
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* Duże Zdjęcie */}
              <div className="relative w-full md:w-3/5 min-h-[300px] md:min-h-[540px] bg-black flex items-center justify-center p-2">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[85vh] object-contain"
                />
              </div>

              {/* Informacje w stylu Apple Spec Panel */}
              <div className="relative w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#18181D] to-[#0E0E12] border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
                
                {/* Zamknięcie [X] */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Zamknij (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                      {selectedPhoto.categoryLabel}
                    </span>
                    {currentIndex !== -1 && (
                      <span className="text-xs font-mono text-zinc-500">
                        {currentIndex + 1} z {filteredPhotos.length}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-heading font-medium text-white mb-3 leading-snug">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-sm text-zinc-300 font-body font-light leading-relaxed mb-6">
                    {selectedPhoto.caption}
                  </p>

                  <div className="space-y-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono mb-6">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Hodowla:</span>
                      <span className="text-emerald-400 font-medium">Koci Przyjaciel *PL</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Miasto:</span>
                      <span className="text-white font-medium">Wrocław, Polska</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Standard:</span>
                      <span className="text-amber-300 font-medium">FIFe / Felis Polonia (FPL)</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Retusz:</span>
                      <span className="text-white/80 font-medium">100% Autentyczne ujęcie</span>
                    </div>
                  </div>
                </div>

                {/* Dolne akcje */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Poprzednie</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Następne</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Zamknij (Esc)
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
