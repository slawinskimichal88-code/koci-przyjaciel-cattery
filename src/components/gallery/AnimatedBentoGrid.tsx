"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Sparkles,
  RefreshCw,
} from "lucide-react";
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
  itemsPerSet?: number; // Defaults to 7 for the iconic SVGator bento layout
  id?: string;
  headerRight?: React.ReactNode;
  cycleInterval?: number; // ms per auto-cycle, default 4500ms
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
  itemsPerSet = 7,
  id,
  headerRight,
  cycleInterval = 4500,
}: AnimatedBentoGridProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true); // Active motion by default!
  const [isHovered, setIsHovered] = useState(false);

  // Filter photos based on activeCategory
  const filteredPhotos = useMemo(() => {
    if (!activeCategory || activeCategory === "all") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  // Total sets in the current category
  const totalSets = Math.max(1, Math.ceil(filteredPhotos.length / itemsPerSet));

  // Reset to first set whenever active category changes
  useEffect(() => {
    setCurrentSetIndex(0);
  }, [activeCategory]);

  // Clamp currentSetIndex if category changes to one with fewer sets
  useEffect(() => {
    if (currentSetIndex >= totalSets) {
      setCurrentSetIndex(0);
    }
  }, [currentSetIndex, totalSets]);

  // Current slice of photos to display in the Bento layout
  const currentSetPhotos = useMemo(() => {
    const start = currentSetIndex * itemsPerSet;
    return filteredPhotos.slice(start, start + itemsPerSet);
  }, [filteredPhotos, currentSetIndex, itemsPerSet]);

  const handleNextSet = useCallback(() => {
    setCurrentSetIndex((prev) => (prev + 1) % totalSets);
  }, [totalSets]);

  const handlePrevSet = useCallback(() => {
    setCurrentSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
  }, [totalSets]);

  // Continuous auto-animation (w tym linku było to ruchome!)
  // Automatically moves through sets, pauses when user hovers or opens full-screen
  useEffect(() => {
    if (!isAutoPlay || isHovered || selectedPhoto || totalSets <= 1) return;
    const timer = setInterval(() => {
      handleNextSet();
    }, cycleInterval);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, selectedPhoto, totalSets, handleNextSet, cycleInterval]);

  // Selected photo modal navigation
  const selectedIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [selectedPhoto, filteredPhotos]);

  const handleModalNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === -1 || filteredPhotos.length === 0) return;
    const nextIdx = (selectedIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const handleModalPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === -1 || filteredPhotos.length === 0) return;
    const prevIdx = (selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIdx]);
  };

  // Keyboard navigation
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

  // Prevent body scroll when modal is open
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

  // Asymmetrical Bento Slot Geometry matching SVGator template:
  // Slot 0: Hero (2x2)
  // Slot 1: Tall (1x2)
  // Slot 2: Square (1x1)
  // Slot 3: Square (1x1)
  // Slot 4: Wide (2x1)
  // Slot 5: Square (1x1)
  // Slot 6: Square (1x1)
  const getBentoSpanClass = (slotIndex: number, totalInSet: number) => {
    if (totalInSet === 1) {
      return "col-span-2 sm:col-span-3 lg:col-span-4 min-h-[340px] sm:min-h-[440px]";
    }
    if (totalInSet === 2) {
      return "col-span-1 sm:col-span-1 lg:col-span-2 min-h-[280px] sm:min-h-[380px]";
    }
    if (totalInSet <= 4) {
      if (slotIndex === 0) {
        return "col-span-2 sm:col-span-2 lg:col-span-2 min-h-[280px] sm:min-h-[360px]";
      }
      return "col-span-1 sm:col-span-1 lg:col-span-1 min-h-[200px] sm:min-h-[240px]";
    }

    switch (slotIndex) {
      case 0:
        // Hero card (Top-Left 2x2)
        return "col-span-2 sm:col-span-2 lg:col-span-2 row-span-2 min-h-[300px] sm:min-h-[420px]";
      case 1:
        // Tall story card (Top-Right-Center 1x2)
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-2 min-h-[300px] sm:min-h-[420px]";
      case 2:
        // Top-Right-Outer square (1x1)
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[180px] sm:min-h-[200px]";
      case 3:
        // Middle-Right-Outer square (1x1)
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[180px] sm:min-h-[200px]";
      case 4:
        // Bottom-Left wide panorama (2x1)
        return "col-span-2 sm:col-span-2 lg:col-span-2 row-span-1 min-h-[190px] sm:min-h-[210px]";
      case 5:
        // Bottom-Center square (1x1)
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[190px] sm:min-h-[210px]";
      case 6:
        // Bottom-Right square (1x1)
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[190px] sm:min-h-[210px]";
      default:
        return "col-span-1 row-span-1 min-h-[180px]";
    }
  };

  // Motion Variants for Staggered Entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 24,
      },
    },
  };

  return (
    <div id={id} className="w-full relative">
      {/* ── HEADER (IF PROVIDED) ────────────────────────────────────────── */}
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

      {/* ── CATEGORY TABS (IF PROVIDED) ───────────────────────────────── */}
      {categories && categories.length > 0 && onCategoryChange && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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

      {/* ── BENTO CONTROLS BAR: SET NAVIGATOR + SMOOTH PROGRESS BAR ───── */}
      <div className="flex items-center justify-between gap-4 mb-4 px-1 flex-wrap">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-amber-300 font-semibold">
              {lang === "PL" ? "Zestaw" : "Set"} {currentSetIndex + 1} / {totalSets}
            </span>
          </div>
          <span className="text-zinc-600">·</span>
          <span>
            {currentSetIndex * itemsPerSet + 1} -{" "}
            {Math.min((currentSetIndex + 1) * itemsPerSet, filteredPhotos.length)} z{" "}
            {filteredPhotos.length} {lang === "PL" ? "zdjęć" : "photos"}
          </span>

          {/* Animated Cycle Progress Bar */}
          {isAutoPlay && !isHovered && totalSets > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 pl-2">
              <span className="text-[10px] uppercase text-zinc-500 font-mono">Auto:</span>
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={`progress-${currentSetIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: cycleInterval / 1000, ease: "linear" }}
                  className="h-full bg-amber-400"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay Play/Pause Toggle */}
          {totalSets > 1 && (
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer border ${
                isAutoPlay
                  ? "bg-amber-400/15 text-amber-200 border-amber-400/30"
                  : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              title={
                isAutoPlay
                  ? lang === "PL"
                    ? "Wstrzymaj autoodtwarzanie"
                    : "Pause motion"
                  : lang === "PL"
                  ? "Włącz ruch"
                  : "Resume motion"
              }
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3 h-3 text-amber-300" />
                  <span>{lang === "PL" ? "W ruchu" : "Playing"}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-zinc-400" />
                  <span>{lang === "PL" ? "Start" : "Play"}</span>
                </>
              )}
            </button>
          )}

          {/* Set Arrow Navigation */}
          {totalSets > 1 && (
            <div className="flex items-center gap-1 bg-white/5 rounded-full border border-white/10 p-0.5">
              <button
                onClick={handlePrevSet}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={lang === "PL" ? "Poprzedni zestaw" : "Previous set"}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1 px-1.5">
                {Array.from({ length: Math.min(totalSets, 7) }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentSetIndex(dotIdx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      dotIdx === currentSetIndex
                        ? "w-4 bg-amber-400"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextSet}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={lang === "PL" ? "Następny zestaw" : "Next set"}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── ANIMATED BENTO CONTAINER (IN ACTIVE CONTINUOUS MOTION) ──────── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`bento-set-${activeCategory}-${currentSetIndex}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 rounded-3xl bg-[#101013]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md"
          >
            {currentSetPhotos.map((photo, slotIndex) => {
              const spanClass = getBentoSpanClass(slotIndex, currentSetPhotos.length);

              return (
                <motion.div
                  key={photo.id}
                  variants={itemVariants}
                  layoutId={`bento-tile-${photo.id}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black/70 border border-white/10 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 ${spanClass}`}
                  whileHover={{ scale: 1.018 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                >
                  {/* Zdjęcie z ciągłą, subtelną animacją oddechu / Ken Burns (Ruchome!) */}
                  <motion.img
                    layoutId={`bento-img-${photo.id}`}
                    src={photo.src}
                    alt="Zdjęcie z hodowli Koci Przyjaciel"
                    loading={slotIndex < 4 ? "eager" : "lazy"}
                    animate={{
                      scale: [1, 1.045, 1],
                    }}
                    transition={{
                      duration: 7 + (slotIndex % 3) * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out pointer-events-none"
                  />

                  {/* Subtelny badge kategorii */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200 shadow-sm">
                      {photo.categoryLabel.split(" ")[0]} {photo.categoryLabel.split(" ")[1] || ""}
                    </span>
                  </div>

                  {/* Ikona rozszerzenia (Apple Expand on Hover) */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Delikatne podświetlenie */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── SHARED LAYOUT ANIMATION (APPLE FULLSCREEN MODAL) ──────────── */}
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

            {/* Powiększający się kafelek z siatki (Shared Layout layoutId) */}
            <motion.div
              layoutId={`bento-tile-${selectedPhoto.id}`}
              className="relative z-10 max-w-5xl max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] bg-black border border-white/20 flex flex-col items-center justify-center cursor-default"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <motion.img
                layoutId={`bento-img-${selectedPhoto.id}`}
                src={selectedPhoto.src}
                alt="Powiększone zdjęcie hodowli"
                className="w-auto h-auto max-w-full max-h-[82vh] object-contain rounded-2xl sm:rounded-3xl"
              />

              {/* Informacyjny pasek dolny - czysty i autentyczny */}
              <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="text-amber-300 font-semibold">
                  {selectedPhoto.categoryLabel}
                </span>
                <span className="text-zinc-400">
                  {selectedIndex + 1} z {filteredPhotos.length}
                </span>
              </div>

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
    </div>
  );
}
