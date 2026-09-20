"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, Maximize2, Camera, ShieldCheck, Heart } from "lucide-react";
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

  return (
    <section id="galeria-showcase" className="relative bg-[#08080A] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.3em] text-white/70 mb-5">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === "PL" ? "Bento Showcase · Życie Hodowli" : "Bento Showcase · Cattery Life"}</span>
            </div>
            <h2
              className="font-heading font-light text-white leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}
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
                  Authentic Moments.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    From outdoor run to our bed.
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-zinc-400 font-body font-light leading-relaxed mb-4">
              {lang === "PL"
                ? "10 starannie wybranych kadrów z codzienności naszych kotów. Kliknij dowolne zdjęcie, by powiększyć je w płynnej animacji Bento Shared Layout."
                : "10 selected moments from our cats' everyday life. Click any photo to expand with smooth Bento Shared Layout animation."}
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

        {/* ── BENTO GRID 10 KADRÓW ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px] sm:auto-rows-[260px]">
          {HOMEPAGE_SHOWCASE_PHOTOS.map((photo) => {
            return (
              <motion.div
                key={photo.id}
                layoutId={`bento-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-[28px] overflow-hidden cursor-pointer border border-white/10 bg-[#121215] shadow-xl hover:shadow-2xl hover:border-amber-400/40 transition-colors duration-300 ${
                  photo.bentoSpan || "col-span-1 row-span-1"
                }`}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                {/* Obraz tła */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambientowy gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Badge górny */}
                {photo.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-300 tracking-wider font-medium">
                      {photo.badge}
                    </span>
                  </div>
                )}

                {/* Ikona powiększenia w prawym górnym rogu */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Tekst dolny */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-base sm:text-lg font-heading font-medium text-white leading-tight mb-1 group-hover:text-amber-200 transition-colors">
                    {photo.title}
                  </h3>
                  {photo.editorialDesc && (
                    <p className="text-xs text-zinc-300/80 font-body font-light line-clamp-2 leading-relaxed">
                      {photo.editorialDesc}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── DOLNY PRZYCISK CTA DO PEŁNEJ GALERII W O NAS ─────────────── */}
        <div className="mt-14 text-center">
          <Link
            href="/o-nas#galeria"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_10px_35px_rgba(245,158,11,0.3)] transition-all hover:scale-105"
          >
            <span>{lang === "PL" ? `Zobacz pełną galerię w zakładce O nas (${ALL_AGA_PHOTOS.length} zdjęć)` : `Explore full gallery in About (${ALL_AGA_PHOTOS.length} photos)`}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SHARED LAYOUT ANIMATION MODAL (FLUID SPRING MORPH)
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            
            {/* Tło rozmywające */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
            />

            {/* Fizyczna karta Bento morphująca z siatki */}
            <motion.div
              layoutId={`bento-${selectedPhoto.id}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#121215] border border-white/20 rounded-[36px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 flex flex-col md:flex-row cursor-default"
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              
              {/* Lewa strona: Duże zdjęcie */}
              <div className="relative w-full md:w-3/5 min-h-[320px] md:min-h-[500px] bg-black flex items-center justify-center p-2">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              </div>

              {/* Prawa strona: Informacje Apple Glass */}
              <div className="relative w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#18181D] to-[#0E0E12] border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
                
                {/* Przycisk zamknięcia [X] */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Zamknij (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  {selectedPhoto.badge && (
                    <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
                      {selectedPhoto.badge}
                    </span>
                  )}

                  <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white mb-3 leading-snug">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-sm text-zinc-300 font-body font-light leading-relaxed mb-6">
                    {selectedPhoto.editorialDesc || selectedPhoto.caption}
                  </p>

                  {/* Informacje w stylu Apple Spec */}
                  <div className="space-y-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono mb-6">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Kategoria:</span>
                      <span className="text-white font-medium">{selectedPhoto.categoryLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Hodowla:</span>
                      <span className="text-emerald-400 font-medium">Koci Przyjaciel *PL</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Retusz:</span>
                      <span className="text-amber-300 font-medium">100% Autentyczne (Bez filtrów)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <Link
                    href="/o-nas#galeria"
                    onClick={() => setSelectedPhoto(null)}
                    className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider text-center hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Zobacz w pełnej galerii O nas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-full py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Zamknij podgląd (Esc)
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
