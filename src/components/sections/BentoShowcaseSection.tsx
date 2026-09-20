"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Camera, Maximize2 } from "lucide-react";
import { HOMEPAGE_SHOWCASE_PHOTOS, GalleryPhotoItem, ALL_AGA_PHOTOS } from "@/data/agaGalleryData";

interface BentoShowcaseSectionProps {
  lang: "PL" | "EN";
}

export default function BentoShowcaseSection({ lang }: BentoShowcaseSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scrolling when modal is open
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

  // Bento span definition ensuring tall, generous aspect ratios so photos are never compressed into thin stripes
  const getShowcaseSpan = (index: number) => {
    switch (index) {
      case 0:
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 min-h-[380px] sm:min-h-[500px]";
      case 1:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-2 min-h-[380px] sm:min-h-[500px]";
      case 2:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[240px]";
      case 3:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[240px]";
      case 4:
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 min-h-[280px]";
      case 5:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[280px]";
      case 6:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[280px]";
      case 7:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[280px]";
      case 8:
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 min-h-[280px]";
      case 9:
        return "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 min-h-[280px]";
      default:
        return "col-span-1 row-span-1 min-h-[260px]";
    }
  };

  return (
    <section id="galeria-showcase" className="relative bg-[#09090B] text-white py-20 sm:py-28 overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 mb-4">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === "PL" ? "Fotografie z Hodowli" : "Cattery Photography"}</span>
            </div>
            <h2
              className="font-heading font-light text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Prawdziwe kadry.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Od wybiegu po domowe łóżko.
                  </span>
                </>
              ) : (
                <>
                  Authentic moments.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    From outdoor enclosure to our bed.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-zinc-400 font-body font-light leading-relaxed mb-4">
              {lang === "PL"
                ? "Autentyczne ujęcia naszych kotów i kociąt. Kliknij dowolne zdjęcie, by powiększyć je płynną animacją Shared Layout w stylu Apple."
                : "Authentic photos of our cats. Click any image to expand with Apple-style smooth Shared Layout animation."}
            </p>
            <Link
              href="/o-nas#galeria"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 hover:text-amber-200 font-semibold transition-colors group"
            >
              <span>{lang === "PL" ? `Zobacz całą galerię (${ALL_AGA_PHOTOS.length} zdjęć)` : `View full gallery (${ALL_AGA_PHOTOS.length} photos)`}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── BENTO GRID: 10 CZYSTYCH KADRÓW (BEZ ZBĘDNYCH OPISÓW I CIEMNYCH GRADIENTÓW) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {HOMEPAGE_SHOWCASE_PHOTOS.map((photo, index) => {
            const spanClass = getShowcaseSpan(index);

            return (
              <motion.div
                key={photo.id}
                layoutId={`bento-card-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/10 shadow-lg hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 ${spanClass}`}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              >
                {/* Pełnowymiarowe zdjęcie - bez zasłaniającego tekstu */}
                <motion.img
                  layoutId={`bento-img-${photo.id}`}
                  src={photo.src}
                  alt="Zdjęcie hodowli Koci Przyjaciel"
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                />

                {/* Subtelny badge kategorii */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300">
                    {photo.categoryLabel.split(" ")[0]} {photo.categoryLabel.split(" ")[1] || ""}
                  </span>
                </div>

                {/* Ikona powiększenia przy najechaniu */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Delikatny cień hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* ── DOLNY PRZYCISK DO PEŁNEJ GALERII ───────────────────────── */}
        <div className="mt-12 text-center">
          <Link
            href="/o-nas#galeria"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_10px_35px_rgba(245,158,11,0.25)] transition-all hover:scale-105"
          >
            <span>{lang === "PL" ? `Zobacz pełną galerię w zakładce O nas (${ALL_AGA_PHOTOS.length} zdjęć)` : `Explore full gallery in About (${ALL_AGA_PHOTOS.length} photos)`}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SHARED LAYOUT ANIMATION (APPLE MODAL MORPH)
          Kliknięty kafelek płynnie odrywa się od siatki i powiększa na ekran.
          Reszta strony delikatnie się rozmywa i ciemnieje.
          Po zamknięciu zdjęcie płynnie wraca na swoje miejsce.
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

            {/* Powiększający się kafelek ze zdjęcia z siatki (layoutId) */}
            <motion.div
              layoutId={`bento-card-${selectedPhoto.id}`}
              className="relative z-10 max-w-5xl max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] bg-black border border-white/20 flex items-center justify-center cursor-default"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <motion.img
                layoutId={`bento-img-${selectedPhoto.id}`}
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
