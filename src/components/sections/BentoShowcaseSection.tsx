"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, ShieldCheck, Home, Sun } from "lucide-react";
import FluidBentoCell, { BentoImageItem } from "@/components/gallery/FluidBentoCell";
import { ALL_AGA_PHOTOS } from "@/data/agaGalleryData";

interface BentoShowcaseSectionProps {
  lang: "PL" | "EN";
}

export default function BentoShowcaseSection({ lang }: BentoShowcaseSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<BentoImageItem | null>(null);

  // Podział zdjęć na 3 zróżnicowane pule dla prawej kolumny 50/50
  const pools = useMemo(() => {
    const wybieg = ALL_AGA_PHOTOS.filter((p) => p.category === "wybieg");
    const kocury = ALL_AGA_PHOTOS.filter((p) => p.category === "kocury");
    const matki = ALL_AGA_PHOTOS.filter((p) => p.category === "matki");
    const mlode = ALL_AGA_PHOTOS.filter((p) => p.category === "mlode");
    const wDomu = ALL_AGA_PHOTOS.filter((p) => p.category === "w-domu");

    const pool1: BentoImageItem[] = [];
    const pool2: BentoImageItem[] = [];
    const pool3: BentoImageItem[] = [];

    for (let i = 0; i < Math.max(wybieg.length, kocury.length, matki.length, mlode.length, wDomu.length); i++) {
      if (wybieg[i]) pool1.push({ id: wybieg[i].id, src: wybieg[i].src, title: wybieg[i].title, categoryLabel: wybieg[i].categoryLabel });
      if (kocury[i]) pool2.push({ id: kocury[i].id, src: kocury[i].src, title: kocury[i].title, categoryLabel: kocury[i].categoryLabel });
      if (matki[i]) pool3.push({ id: matki[i].id, src: matki[i].src, title: matki[i].title, categoryLabel: matki[i].categoryLabel });
      if (mlode[i]) pool1.push({ id: mlode[i].id, src: mlode[i].src, title: mlode[i].title, categoryLabel: mlode[i].categoryLabel });
      if (wDomu[i]) pool2.push({ id: wDomu[i].id, src: wDomu[i].src, title: wDomu[i].title, categoryLabel: wDomu[i].categoryLabel });
    }

      return [pool1.slice(0, 6), pool2.slice(0, 6), pool3.slice(0, 6)];
    }, []);

  return (
    <section id="galeria-showcase" className="relative bg-[#FBFBFD] text-zinc-900 py-16 sm:py-20 overflow-hidden border-t border-zinc-200">
      {/* Subtelna poświata w tle */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-amber-400/[0.08] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── PODZIAŁ PÓŁ NA PÓŁ (50% TEKST / 50% DYNAMICZNIE PŁYNĄCA TAŚMA BENTO) ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEWA STRONA: TEKST I WYRÓŻNIKI (50%) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/70 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-900 mb-4 self-start shadow-sm font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>{lang === "PL" ? "Z Życia Hodowli" : "Cattery Life"}</span>
            </div>

            <h2
              className="font-heading font-light text-zinc-950 leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Prawdziwe kadry.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-zinc-800">
                    Nasz dom to ich dom.
                  </span>
                </>
              ) : (
                <>
                  Authentic moments.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-zinc-800">
                    Our home is their home.
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 font-body font-light leading-relaxed mb-6">
              {lang === "PL"
                ? "Nie prowadzimy masowej produkcji kociąt ani hodowli klatkowej. Nasze Maine Coony to pełnoprawni domownicy, którzy uczestniczą w codziennym życiu rodziny: śpią z nami, odpoczywają na kanapach i korzystają z bezpiecznego wybiegu w ogrodzie."
                : "We are a small family cattery. Our Maine Coons are cherished family members living freely in our home and enjoying our secure outdoor garden run."}
            </p>

            {/* 3 Wyróżniki (Styl iPhone Glass dla jasnego tła) */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-emerald-500/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-950">
                    {lang === "PL" ? "Całoroczna woliera ogrodowa" : "Year-round garden enclosure"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-600 font-light">
                    {lang === "PL" ? "Świeże powietrze i bezpośrednie przejście z salonu" : "Fresh air and safe outdoor exploration"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-amber-500/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-950">
                    {lang === "PL" ? "Salon i kanapy zamiast klatek" : "Living room warmth, no cages"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-600 font-light">
                    {lang === "PL" ? "Wychowanie przy dzieciach, psie i codziennych dźwiękach" : "Socialized with kids, dogs, and family love"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:bg-white/90 hover:border-rose-500/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-600 shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-950">
                    {lang === "PL" ? "Badania kardiologiczne & DNA Laboklin" : "Cardiac Echo & DNA Laboklin"}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-600 font-light">
                    {lang === "PL" ? "Echo Doppler HCM, PKD, SMA N/N i rodowód FIFe / FPL" : "Clean genetics and certified 5-generation pedigree"}
                  </div>
                </div>
              </div>
            </div>

            {/* Przyciski CTA */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/o-nas#galeria"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 text-white font-body text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 group"
              >
                <span>{lang === "PL" ? "Zobacz całą galerię" : "Explore full gallery"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
              </Link>
              <Link
                href="/o-nas"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 font-body text-xs sm:text-sm font-semibold border border-white/90 shadow-sm transition-all hover:scale-105 backdrop-blur-md"
              >
                <span>{lang === "PL" ? "O naszej hodowli" : "About our cattery"}</span>
              </Link>
            </div>
          </div>

          {/* PRAWA STRONA: PŁYNĄCA TAŚMA BENTO (50%) */}
          <div className="lg:col-span-7 relative">
            <div className="bento-showcase-grid grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 min-h-[540px] sm:h-[580px] lg:h-[620px]">
              {/* Kafelek 1: Duży pionowy (płynie w górę) */}
              <FluidBentoCell
                images={pools[0]}
                direction="vertical"
                speed={65}
                onPhotoClick={setSelectedPhoto}
                className="sm:row-span-2 h-[260px] sm:h-full min-h-[250px] sm:min-h-full w-full"
              />

              {/* Kafelek 2: Górny kwadrat (płynie w lewo) */}
              <FluidBentoCell
                images={pools[1]}
                direction="horizontal"
                speed={50}
                onPhotoClick={setSelectedPhoto}
                className="sm:row-span-1 h-[220px] sm:h-full min-h-[220px] sm:min-h-full w-full"
              />

              {/* Kafelek 3: Dolny kwadrat (płynie w dół) */}
              <FluidBentoCell
                images={pools[2]}
                direction="reverse-vertical"
                speed={55}
                onPhotoClick={setSelectedPhoto}
                className="sm:row-span-1 h-[220px] sm:h-full min-h-[220px] sm:min-h-full w-full"
              />
            </div>
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
                {/* Niewidoczna tarcza uniemożliwiająca pobranie pliku */}
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* Znak wodny praw autorskich */}
                <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 pointer-events-none select-none shadow-sm">
                  © Koci Przyjaciel *PL · Prawa zastrzeżone
                </div>
              </div>

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
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-lg"
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
