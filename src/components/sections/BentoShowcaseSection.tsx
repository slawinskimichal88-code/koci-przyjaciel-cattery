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

    return [pool1, pool2, pool3];
  }, []);

  return (
    <section id="galeria-showcase" className="relative bg-[#09090B] text-white py-20 sm:py-28 overflow-hidden border-t border-white/10">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── PODZIAŁ PÓŁ NA PÓŁ (50% TEKST / 50% DYNAMICZNIE PŁYNĄCA TAŚMA BENTO) ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEWA STRONA: TEKST I WYRÓŻNIKI (50%) */}
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

            {/* 3 Wyróżniki */}
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

            {/* Przyciski CTA */}
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

          {/* PRAWA STRONA: PŁYNĄCA TAŚMA BENTO (50%) */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 auto-rows-[220px] sm:auto-rows-[260px]">
              {/* Kafelek 1: Duży pionowy (płynie w górę) */}
              <FluidBentoCell
                images={pools[0]}
                direction="vertical"
                speed={22}
                onPhotoClick={setSelectedPhoto}
                className="sm:row-span-2 min-h-[260px] sm:min-h-0"
              />

              {/* Kafelek 2: Górny kwadrat (płynie w lewo) */}
              <FluidBentoCell
                images={pools[1]}
                direction="horizontal"
                speed={14}
                onPhotoClick={setSelectedPhoto}
                className="sm:row-span-1 min-h-[200px] sm:min-h-0"
              />

              {/* Kafelek 3: Dolny kwadrat (płynie w dół) */}
              <FluidBentoCell
                images={pools[2]}
                direction="reverse-vertical"
                speed={18}
                onPhotoClick={setSelectedPhoto}
                className="sm:row-span-1 min-h-[200px] sm:min-h-0"
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
