"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import FluidBentoCell, { BentoImageItem } from "@/components/gallery/FluidBentoCell";
import { GalleryPhotoItem } from "@/data/agaGalleryData";

interface AnimatedBentoGridProps {
  photos: GalleryPhotoItem[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  categories?: { id: string; label: string }[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  lang?: "PL" | "EN";
  id?: string;
  headerRight?: React.ReactNode;
}

export default function AnimatedBentoGrid({
  photos,
  title,
  subtitle,
  badge,
  categories,
  activeCategory = "all",
  onCategoryChange,
  lang = "PL",
  id,
  headerRight,
}: AnimatedBentoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<BentoImageItem | null>(null);

  // Filtrowanie po aktywnej kategorii
  const filteredPhotos = useMemo(() => {
    if (!activeCategory || activeCategory === "all") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  // Rozdzielenie zdjęć na 8 kafelków Bento
  const cellPools = useMemo(() => {
    const NUM_CELLS = 8;
    if (filteredPhotos.length === 0) {
      return Array.from({ length: NUM_CELLS }, () => [] as BentoImageItem[]);
    }

    const pools: BentoImageItem[][] = Array.from({ length: NUM_CELLS }, () => []);
    // Ograniczamy pulę pojedynczego kafelka do 6 zdjęć dla maksymalnej płynności 120 FPS
    const MAX_CELL_PHOTOS = 6;
    filteredPhotos.forEach((photo, idx) => {
      const cellIdx = idx % NUM_CELLS;
      if (pools[cellIdx].length < MAX_CELL_PHOTOS) {
        pools[cellIdx].push({
          id: photo.id,
          src: photo.src,
          title: photo.title,
          categoryLabel: photo.categoryLabel,
        });
      }
    });

    // Upewnij się, że każdy kafelek ma co najmniej 3 zdjęcia w puli dla płynnej pętli
    return pools.map((pool, pIdx) => {
      let result = [...pool];
      let i = 0;
      while (result.length < 3 && filteredPhotos.length > 0) {
        const item = filteredPhotos[(pIdx + i) % filteredPhotos.length];
        result.push({
          id: `${item.id}-pad-${i}`,
          src: item.src,
          title: item.title,
          categoryLabel: item.categoryLabel,
        });
        i++;
      }
      return result;
    });
  }, [filteredPhotos]);

  // Nawigacja w modalu lightbox
  const selectedIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return filteredPhotos.findIndex((p) => p.src === selectedPhoto.src);
  }, [selectedPhoto, filteredPhotos]);

  const handleModalNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === -1 || filteredPhotos.length === 0) return;
    const nextIdx = (selectedIndex + 1) % filteredPhotos.length;
    const next = filteredPhotos[nextIdx];
    setSelectedPhoto({
      id: next.id,
      src: next.src,
      title: next.title,
      categoryLabel: next.categoryLabel,
    });
  };

  const handleModalPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === -1 || filteredPhotos.length === 0) return;
    const prevIdx = (selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    const prev = filteredPhotos[prevIdx];
    setSelectedPhoto({
      id: prev.id,
      src: prev.src,
      title: prev.title,
      categoryLabel: prev.categoryLabel,
    });
  };

  // Nawigacja klawiaturą
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowRight") handleModalNext();
      if (e.key === "ArrowLeft") handleModalPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto, selectedIndex, filteredPhotos]);

  // Blokowanie scrolla pod modalem
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

  return (
    <div id={id} className="w-full relative">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      {(title || subtitle || badge || headerRight) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div>
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <div className="font-heading font-light text-white leading-[1.05] tracking-tight">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="text-sm sm:text-base text-zinc-400 font-body font-light leading-relaxed mt-2 max-w-2xl">
                {subtitle}
              </div>
            )}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>
      )}

      {/* ── KATEGORIE ─────────────────────────────────────────────────── */}
      {categories && categories.length > 0 && onCategoryChange && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-6 sm:mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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
      )}

      {/* 
        BENTO GRID CONTAINER - BOGATY UKŁAD 8 RUCHOMYCH KAFELKÓW APPLE
        Mobile: 2 kolumny, 180px wysokość wiersza
        Desktop: 4 kolumny, 240px wysokość wiersza
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-bento auto-rows-[180px] md:auto-rows-[240px]">
        {/* 1. Duży kafel (Główny) - powolny, majestatyczny ruch poziomy */}
        <FluidBentoCell
          images={cellPools[0]}
          direction="horizontal"
          speed={68}
          className="col-span-2 row-span-2 md:col-span-2 md:row-span-2"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 2. Pionowy kafel wysoki - ruch pionowy w dół */}
        <FluidBentoCell
          images={cellPools[1]}
          direction="reverse-vertical"
          speed={58}
          className="col-span-1 row-span-2 md:col-span-1 md:row-span-2"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 3. Kwadrat góra-prawo 1 - ruch pionowy w górę */}
        <FluidBentoCell
          images={cellPools[2]}
          direction="vertical"
          speed={52}
          className="col-span-1 row-span-1 md:col-span-1 md:row-span-1"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 4. Kwadrat środek-prawo 2 - spokojny ruch poziomy */}
        <FluidBentoCell
          images={cellPools[3]}
          direction="horizontal"
          speed={55}
          className="col-span-1 row-span-1 md:col-span-1 md:row-span-1"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 5. Szeroki kafel środkowy - płynny ruch w lewo */}
        <FluidBentoCell
          images={cellPools[4]}
          direction="reverse-horizontal"
          speed={65}
          className="col-span-2 row-span-1 md:col-span-2 md:row-span-1"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 6. Kwadrat dolny lewy - ruch pionowy */}
        <FluidBentoCell
          images={cellPools[5]}
          direction="vertical"
          speed={48}
          className="col-span-1 row-span-1 md:col-span-1 md:row-span-1"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 7. Kwadrat dolny prawy - ruch poziomy */}
        <FluidBentoCell
          images={cellPools[6]}
          direction="horizontal"
          speed={50}
          className="col-span-1 row-span-1 md:col-span-1 md:row-span-1"
          onPhotoClick={setSelectedPhoto}
        />

        {/* 8. Szeroki kafel panoramiczny na dole - majestatyczny ruch */}
        <FluidBentoCell
          images={cellPools[7]}
          direction="reverse-horizontal"
          speed={75}
          className="col-span-2 row-span-1 md:col-span-4 md:row-span-1"
          onPhotoClick={setSelectedPhoto}
        />
      </div>

      {/* ── PEŁNOEKRANOWY LIGHTBOX APPLE MODAL ───────────────────────── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
            {/* Tło rozmywające */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
            />

            {/* Nawigacja lewo/prawo na desktopie */}
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

            {/* Powiększone zdjęcie z tarczą ochronną */}
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
                {/* Niewidoczna tarcza uniemożliwiająca zapisanie pliku */}
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* Znak wodny ochrony praw autorskich */}
                <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 pointer-events-none select-none shadow-sm">
                  © Koci Przyjaciel *PL · Prawa zastrzeżone
                </div>
              </div>

              {/* Informacyjny pasek dolny */}
              <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="text-amber-300 font-semibold">
                  {selectedPhoto.categoryLabel || "Koci Przyjaciel *PL"}
                </span>
                <span className="text-zinc-400">
                  {selectedIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              {/* Przycisk zamknięcia [X] */}
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
