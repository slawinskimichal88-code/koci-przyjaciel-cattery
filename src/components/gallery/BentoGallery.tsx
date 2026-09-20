"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, FolderKanban } from "lucide-react";
import {
  ALL_AGA_PHOTOS,
  AGA_CATEGORIES,
  GalleryPhotoItem,
} from "@/data/agaGalleryData";

interface BentoGalleryProps {
  lang: "PL" | "EN";
}

export default function BentoGallery({ lang }: BentoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(36);

  // Filtered photos based on active category tab
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

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex === -1 || filteredPhotos.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex === -1 || filteredPhotos.length === 0) return;
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

  // Prevent background scroll when photo is expanded
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

  // Asymmetrical Bento grid span pattern
  // Generous proportions: 2 cols on mobile, 3-4 cols on desktop
  const getBentoSpan = (index: number) => {
    const pattern = index % 8;
    switch (pattern) {
      case 0:
        // Duży wyróżniony kafelek
        return "col-span-2 row-span-2 min-h-[340px] sm:min-h-[440px]";
      case 2:
        // Wysoki kafelek pionowy
        return "col-span-1 row-span-2 min-h-[340px] sm:min-h-[440px]";
      case 5:
        // Szeroki kafelek panoramiczny
        return "col-span-2 row-span-1 min-h-[220px] sm:min-h-[260px]";
      default:
        // Standardowy kwadratowy kafelek
        return "col-span-1 row-span-1 min-h-[200px] sm:min-h-[240px]";
    }
  };

  return (
    <section id="galeria" className="relative bg-[#070709] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10">
      
      {/* Ambient background blur */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── NAGŁÓWEK SEKCJI ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 mb-4">
            <FolderKanban className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "PL" ? "Bento Grid · Zdjęcia z Hodowli" : "Bento Grid · Cattery Gallery"}</span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[1.0] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Zdjęcia z hodowli.<br />
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                  Ułożone według folderów.
                </span>
              </>
            ) : (
              <>
                Cattery photos.<br />
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                  Organized by folders.
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-body font-light leading-relaxed">
            {lang === "PL"
              ? `Kompletne archiwum ${ALL_AGA_PHOTOS.length} fotografii. Wybierz folder poniżej i kliknij dowolne zdjęcie, by powiększyć je płynnym efektem Shared Layout.`
              : `Complete archive of ${ALL_AGA_PHOTOS.length} photos. Select any folder below and click to expand.`}
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

        {/* ── ASYMMETRICAL BENTO GRID ─────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4.5">
          {displayedPhotos.map((photo, index) => {
            const spanClass = getBentoSpan(index);

            return (
              <motion.div
                key={photo.id}
                layoutId={`gallery-card-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/10 shadow-md hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 ${spanClass}`}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                {/* Zdjęcie bez zbędnego tekstu */}
                <motion.img
                  layoutId={`gallery-img-${photo.id}`}
                  src={photo.src}
                  alt="Zdjęcie z hodowli"
                  loading={index < 12 ? "eager" : "lazy"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                />

                {/* Subtelny badge folderu */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono text-zinc-300">
                    {photo.categoryLabel.split(" ")[0]} {photo.categoryLabel.split(" ")[1] || ""}
                  </span>
                </div>

                {/* Ikona rozszerzenia w hover */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Delikatny cień hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* ── PAGINACJA: WCZYTAJ WIĘCEJ ───────────────────────────────── */}
        {visibleCount < filteredPhotos.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 36)}
              className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg hover:border-amber-400/40"
            >
              {lang === "PL"
                ? `Wczytaj więcej zdjęć (pozostało ${filteredPhotos.length - visibleCount})`
                : `Load more photos (${filteredPhotos.length - visibleCount} remaining)`}
            </button>
          </div>
        )}

      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SHARED LAYOUT ANIMATION (APPLE MODAL MORPH)
          Płynne powiększenie zdjęcia bezpośrednio z siatki kafelków.
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
            
            {/* Tło przyciemniające i rozmywające (Apple Backdrop Blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
            />

            {/* Nawigacja lewo/prawo na desktopie */}
            <button
              onClick={handlePrev}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex hover:scale-110 shadow-xl"
              title="Poprzednie zdjęcie (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex hover:scale-110 shadow-xl"
              title="Następne zdjęcie (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Powiększający się kafelek z siatki (Shared Layout layoutId) */}
            <motion.div
              layoutId={`gallery-card-${selectedPhoto.id}`}
              className="relative z-10 max-w-5xl max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] bg-black border border-white/20 flex items-center justify-center cursor-default"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <motion.img
                layoutId={`gallery-img-${selectedPhoto.id}`}
                src={selectedPhoto.src}
                alt="Powiększone zdjęcie hodowli"
                className="w-auto h-auto max-w-full max-h-[86vh] object-contain rounded-2xl sm:rounded-3xl"
              />

              {/* Przycisk zamknięcia [X] */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
                title="Zamknij (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
