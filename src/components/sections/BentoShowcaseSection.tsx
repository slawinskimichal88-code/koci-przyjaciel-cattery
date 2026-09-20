"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  Home,
  Sun,
} from "lucide-react";
import { ALL_AGA_PHOTOS, GalleryPhotoItem } from "@/data/agaGalleryData";

interface BentoShowcaseSectionProps {
  lang: "PL" | "EN";
}

export default function BentoShowcaseSection({ lang }: BentoShowcaseSectionProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Curated diverse sets across key folders (wybieg, kocury, matki, mlode, w-domu)
  // Each set contains 4 photos arranged in an asymmetrical dynamic spread
  const photoSets = useMemo(() => {
    const wybieg = ALL_AGA_PHOTOS.filter((p) => p.category === "wybieg");
    const kocury = ALL_AGA_PHOTOS.filter((p) => p.category === "kocury");
    const matki = ALL_AGA_PHOTOS.filter((p) => p.category === "matki");
    const mlode = ALL_AGA_PHOTOS.filter((p) => p.category === "mlode");
    const wDomu = ALL_AGA_PHOTOS.filter((p) => p.category === "w-domu");

    return [
      // Zestaw 1: Wybieg & Dom
      [
        wybieg[0] || ALL_AGA_PHOTOS[0],
        kocury[0] || ALL_AGA_PHOTOS[1],
        matki[0] || ALL_AGA_PHOTOS[2],
        wDomu[0] || ALL_AGA_PHOTOS[3],
      ],
      // Zestaw 2: Matki & Kocięta
      [
        matki[1] || ALL_AGA_PHOTOS[4],
        mlode[0] || ALL_AGA_PHOTOS[5],
        wybieg[1] || ALL_AGA_PHOTOS[6],
        kocury[1] || ALL_AGA_PHOTOS[7],
      ],
      // Zestaw 3: Kocury & Relaks
      [
        kocury[2] || ALL_AGA_PHOTOS[8],
        wDomu[1] || ALL_AGA_PHOTOS[9],
        mlode[1] || ALL_AGA_PHOTOS[10],
        wybieg[2] || ALL_AGA_PHOTOS[11],
      ],
      // Zestaw 4: Maluchy w salonie
      [
        mlode[2] || ALL_AGA_PHOTOS[12],
        matki[2] || ALL_AGA_PHOTOS[13],
        kocury[3] || ALL_AGA_PHOTOS[14],
        wDomu[2] || ALL_AGA_PHOTOS[15],
      ],
    ];
  }, []);

  const totalSets = photoSets.length;
  const currentSet = photoSets[currentSetIndex];

  const handleNextSet = useCallback(() => {
    setCurrentSetIndex((prev) => (prev + 1) % totalSets);
  }, [totalSets]);

  const handlePrevSet = useCallback(() => {
    setCurrentSetIndex((prev) => (prev - 1 + totalSets) % totalSets);
  }, [totalSets]);

  // Continuous auto-sliding (przesuwana sekcja)
  useEffect(() => {
    if (!isAutoPlay || isHovered || selectedPhoto) return;
    const interval = setInterval(() => {
      handleNextSet();
    }, 4800);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, selectedPhoto, handleNextSet]);

  // Keyboard navigation for modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto]);

  // Lock scroll when modal is open
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
    <section id="galeria-showcase" className="relative bg-[#09090B] text-white py-20 sm:py-28 overflow-hidden border-t border-white/10">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── PODZIAŁ PÓŁ NA PÓŁ (50% TEKST / 50% PRZESUWANE ZDJĘCIA) ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEWA POŁOWA: ELEGANCKI TEKST I WYRÓŻNIKI (50%) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-300/90 mb-4 self-start shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{lang === "PL" ? "Z Życia Hodowli" : "Cattery Life"}</span>
            </div>

            <h2
              className="font-heading font-light text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Prawdziwe kadry.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Nasz dom to ich dom.
                  </span>
                </>
              ) : (
                <>
                  Authentic moments.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Our home is their home.
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-body font-light leading-relaxed mb-6">
              {lang === "PL"
                ? "Nie prowadzimy masowej produkcji kociąt ani hodowli klatkowej. Nasze Maine Coony to pełnoprawni domownicy, którzy uczestniczą w codziennym życiu rodziny: śpią z nami, odpoczywają na kanapach i korzystają z bezpiecznego wybiegu w ogrodzie."
                : "We are a small family cattery. Our Maine Coons are cherished family members living freely in our home and enjoying our secure outdoor garden run."}
            </p>

            {/* 3 Kluczowe Wyróżniki */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {lang === "PL" ? "Całoroczna woliera ogrodowa" : "Year-round garden enclosure"}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-light">
                    {lang === "PL" ? "Świeże powietrze i bezpośrednie przejście z salonu" : "Fresh air and safe outdoor exploration"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {lang === "PL" ? "Salon i kanapy zamiast klatek" : "Living room warmth, no cages"}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-light">
                    {lang === "PL" ? "Wychowanie przy dzieciach, psie i codziennych dźwiękach" : "Socialized with kids, dogs, and family love"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {lang === "PL" ? "Badania kardiologiczne & DNA Laboklin" : "Cardiac Echo & DNA Laboklin"}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-light">
                    {lang === "PL" ? "Echo Doppler HCM, PKD, SMA N/N i rodowód FIFe / FPL" : "Clean genetics and certified 5-generation pedigree"}
                  </div>
                </div>
              </div>
            </div>

            {/* Przyciski Akcji */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/o-nas#galeria"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-300 transition-all shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:scale-105 group"
              >
                <span>{lang === "PL" ? "Zobacz całą galerię" : "Explore full gallery"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/o-nas"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-body text-xs sm:text-sm font-semibold border border-white/20 transition-all hover:scale-105"
              >
                <span>{lang === "PL" ? "O naszej hodowli" : "About our cattery"}</span>
              </Link>
            </div>
          </div>

          {/* PRAWA POŁOWA: PRZESUWANA SEKCJA ZE ZDJĘCIAMI (50%) */}
          <div
            className="lg:col-span-7 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Pasek nawigacji przesuwanych zestawów */}
            <div className="flex items-center justify-between gap-3 mb-3 px-1 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-amber-300 font-semibold">
                  {lang === "PL" ? "Zestaw kadrów" : "Photo set"} {currentSetIndex + 1} / {totalSets}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Pauza / Odtwarzanie */}
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                    isAutoPlay
                      ? "bg-amber-400/15 text-amber-200 border-amber-400/30"
                      : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                  title={isAutoPlay ? "Wstrzymaj ruch" : "Wznów ruch"}
                >
                  {isAutoPlay ? <Pause className="w-3 h-3 text-amber-300" /> : <Play className="w-3 h-3 text-zinc-400" />}
                </button>

                {/* Strzałki nawigacji */}
                <div className="flex items-center gap-1 bg-white/5 rounded-full border border-white/10 p-0.5">
                  <button
                    onClick={handlePrevSet}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={lang === "PL" ? "Poprzedni" : "Previous"}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1 px-1.5">
                    {photoSets.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSetIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === currentSetIndex ? "w-4 bg-amber-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNextSet}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={lang === "PL" ? "Następny" : "Next"}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Płynna przesuwana kompozycja 4 zdjęć */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`home-set-${currentSetIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-3xl bg-[#101013]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-md"
              >
                {/* Karta 1: Duża pionowa (2 kolumny na mobile, 2 rzędy na desktopie) */}
                <div
                  onClick={() => setSelectedPhoto(currentSet[0])}
                  className="col-span-2 sm:col-span-2 sm:row-span-2 min-h-[260px] sm:min-h-[380px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black/70 border border-white/10 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300"
                >
                  <motion.img
                    src={currentSet[0].src}
                    alt={currentSet[0].title || "Zdjęcie hodowli"}
                    animate={{ scale: [1, 1.045, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  {currentSet[0].categoryLabel && (
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200">
                        {currentSet[0].categoryLabel}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Karta 2: Kwadrat górny prawy */}
                <div
                  onClick={() => setSelectedPhoto(currentSet[1])}
                  className="col-span-1 min-h-[170px] sm:min-h-[180px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black/70 border border-white/10 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300"
                >
                  <motion.img
                    src={currentSet[1].src}
                    alt={currentSet[1].title || "Zdjęcie hodowli"}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  {currentSet[1].categoryLabel && (
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[9px] font-mono text-zinc-200">
                        {currentSet[1].categoryLabel.split(" ")[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Karta 3: Kwadrat dolny prawy */}
                <div
                  onClick={() => setSelectedPhoto(currentSet[2])}
                  className="col-span-1 min-h-[170px] sm:min-h-[180px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black/70 border border-white/10 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300"
                >
                  <motion.img
                    src={currentSet[2].src}
                    alt={currentSet[2].title || "Zdjęcie hodowli"}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  {currentSet[2].categoryLabel && (
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[9px] font-mono text-zinc-200">
                        {currentSet[2].categoryLabel.split(" ")[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Karta 4: Dolna panorama (pełna szerokość siatki) */}
                <div
                  onClick={() => setSelectedPhoto(currentSet[3])}
                  className="col-span-2 sm:col-span-3 min-h-[160px] sm:min-h-[180px] group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black/70 border border-white/10 shadow-md hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300"
                >
                  <motion.img
                    src={currentSet[3].src}
                    alt={currentSet[3].title || "Zdjęcie hodowli"}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  {currentSet[3].categoryLabel && (
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200">
                        {currentSet[3].categoryLabel}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── PEŁNOEKRANOWY LIGHTBOX MODAL ──────────────────────────────── */}
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

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 max-w-5xl max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] bg-black border border-white/20 flex flex-col items-center justify-center cursor-default"
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title || "Powiększone zdjęcie"}
                className="w-auto h-auto max-w-full max-h-[82vh] object-contain rounded-2xl sm:rounded-3xl"
              />

              <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="text-amber-300 font-semibold">
                  {selectedPhoto.categoryLabel || "Koci Przyjaciel *PL"}
                </span>
                <span className="text-zinc-400">
                  {selectedPhoto.title || "Autentyczne ujęcie z hodowli"}
                </span>
              </div>

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
