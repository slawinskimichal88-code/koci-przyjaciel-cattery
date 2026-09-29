"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { KittenSpec } from "@/data/availableKittensData";
import {
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Eye,
  Palette,
  Home,
  Crown,
  Clock,
  MessageCircle,
  Maximize2,
  X,
  Phone,
} from "lucide-react";
import { REAL_PHONE_RAW, REAL_PHONE, REAL_MESSENGER_URL } from "@/data/realCatsData";

interface KittenCardProps {
  kitten: KittenSpec;
  lang?: "PL" | "EN";
  onReserve?: (kittenName: string) => void;
}

export default function KittenCard({ kitten, lang = "PL", onReserve }: KittenCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const images = kitten.images && kitten.images.length > 0
    ? kitten.images
    : [{ src: "/images/cats/cat_07.webp", caption: kitten.name, badge: "Zdjęcie" }];

  // ── AUTOMATYCZNE PRZEWIJANIE ZDJĘĆ CO 3.8 SEKUNDY ──
  useEffect(() => {
    if (isAutoplayPaused || isLightboxOpen || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isAutoplayPaused, isLightboxOpen, images.length]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Obsługa klawiatury dla Lightboxa
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") setCurrentImgIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

  // Przeznaczenie: Na kolanka vs Do hodowli
  const destinyBadge = {
    kolanka: {
      label: lang === "PL" ? "Opcja: Na kolanka" : "Pet Only (Companion)",
      subtext: lang === "PL" ? "Kot do kochania w domu" : "Family companion",
      icon: Home,
      bgColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    },
    hodowla: {
      label: lang === "PL" ? "Opcja: Do hodowli" : "Breeding Rights (FIFe)",
      subtext: lang === "PL" ? "Z prawami hodowlanymi FIFe / FPL" : "Full FIFe breeding rights",
      icon: Crown,
      bgColor: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    },
    kolanka_lub_hodowla: {
      label: lang === "PL" ? "Na kolanka lub do hodowli" : "Pet or Breeding Option",
      subtext: lang === "PL" ? "Do uzgodnienia z hodowcą" : "Available for both options",
      icon: Sparkles,
      bgColor: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    },
  }[kitten.destiny] || {
    label: lang === "PL" ? "Na kolanka" : "Pet only",
    subtext: "",
    icon: Home,
    bgColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  };

  const DestinyIcon = destinyBadge.icon;

  return (
    <>
      <article
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => setIsAutoplayPaused(false)}
        className="group relative rounded-3xl bg-[#121214] border border-white/10 hover:border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 flex flex-col font-ui"
      >
        {/* Subtelny ambient w tle */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber-500/15 transition-all duration-500" />

        {/* ── SEKCJA ZDJĘĆ: AUTOMATYCZNE PRZEWIJANIE ── */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black overflow-hidden select-none">
          <div 
            className="relative w-full h-full cursor-pointer overflow-hidden"
            onClick={() => setIsLightboxOpen(true)}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentImgIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.caption || kitten.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
            ))}

            {/* Gradient cieniujący pod teksty */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/50 z-10 pointer-events-none" />
          </div>

          {/* Górne plakietki: Płeć + Pełny Ekran */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {lang === "PL" ? "Dostępny do rezerwacji" : "Available"}
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${
                kitten.gender === "male"
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  : "bg-pink-500/20 text-pink-300 border-pink-500/30"
              }`}>
                {kitten.gender === "male" ? "Kocurek ♂" : "Kotka ♀"}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              title="Powiększ zdjęcie"
              aria-label="Powiększ zdjęcie"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Strzałki manualne do przewijania karuzeli zdjęć */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Poprzednie zdjęcie"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                aria-label="Następne zdjęcie"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dolny podpis zdjęcia + wskaźnik kropkowy */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 z-20 pointer-events-none">
            <div className="text-xs text-[#f5f5f7]/90 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 truncate max-w-[70%] font-body">
              {images[currentImgIndex].caption}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    aria-label={`Zdjęcie ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentImgIndex
                        ? "w-5 bg-amber-400"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── KORPUS KARTY ── */}
        <div className="p-6 sm:p-7 flex flex-col flex-grow relative z-10 text-[#f5f5f7]">
          
          {/* Miot & Imię */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-xs text-amber-400 font-medium tracking-wide uppercase block mb-1">
                {kitten.litter} &bull; {kitten.gender === "male" ? "Kocurek" : "Kotka"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white tracking-tight">
                {kitten.name}
              </h3>
            </div>
          </div>

          {/* BANNER: CZY NA KOLANKA CZY DO HODOWLI */}
          <div className={`mt-2 mb-4 p-3 rounded-2xl border flex items-center justify-between gap-3 ${destinyBadge.bgColor}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center shrink-0">
                <DestinyIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white block">
                  {destinyBadge.label}
                </span>
                {destinyBadge.subtext && (
                  <span className="text-[11px] text-[#86868b] block">
                    {destinyBadge.subtext}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* PODSTAWOWE CECHY KOTA: KOLOR, EMS, OCZY, GOTOWOŚĆ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4 text-xs font-body">
            
            {/* Kolor sierści & EMS */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
              <Palette className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="overflow-hidden">
                <span className="text-[11px] text-[#86868b] block">Kolor & EMS:</span>
                <span className="text-[#f5f5f7] font-medium block truncate" title={kitten.coatColor}>
                  {kitten.coatColor}
                </span>
                <span className="text-amber-400/90 font-mono text-[11px] mt-0.5 block">{kitten.emsCode}</span>
              </div>
            </div>

            {/* Kolor oczu */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="overflow-hidden">
                <span className="text-[11px] text-[#86868b] block">Kolor oczu:</span>
                <span className="text-emerald-300 font-medium block truncate" title={kitten.eyeColor || "Bursztynowy"}>
                  {kitten.eyeColor || "Bursztynowy"}
                </span>
                <span className="text-[11px] text-[#86868b] block mt-0.5">Wzorzec Maine Coon</span>
              </div>
            </div>

            {/* Gotowość do odbioru */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="overflow-hidden">
                <span className="text-[11px] text-[#86868b] block">Odbiór:</span>
                <span className="text-emerald-300 font-medium block truncate">
                  {kitten.availableFrom}
                </span>
                <span className="text-[11px] text-[#86868b] block truncate mt-0.5">FIFe / FPL</span>
              </div>
            </div>

          </div>

          {/* OPIS I CHARAKTER KOTA */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 mb-5 space-y-1.5 text-xs text-[#f5f5f7]">
            {kitten.personality && (
              <p className="italic text-amber-200/90 font-light">
                &ldquo;{kitten.personality}&rdquo;
              </p>
            )}
            {kitten.description && (
              <p className="text-[#86868b] font-light leading-relaxed">
                {kitten.description}
              </p>
            )}
          </div>

          {/* ── STOPKA KARTY Z PRZYCISKAMI SZYBKIEGO KONTAKTU ── */}
          <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-[#86868b] block">
                Status kota:
              </span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Dostępny do rezerwacji
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={REAL_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#0084FF] hover:bg-[#0073E6] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                title="Napisz na Messengerze"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Messenger</span>
              </a>

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                title="Zadzwoń do hodowli"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Zadzwoń</span>
              </a>
            </div>
          </div>

        </div>
      </article>

      {/* ── LIGHTBOX (POWIĘKSZENIE PEŁNOEKRANOWE) ── */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 select-none animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Zamknij podgląd"
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentImgIndex].src}
              alt={images[currentImgIndex].caption || kitten.name}
              fill
              className="object-contain"
              unoptimized
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Poprzednie zdjęcie"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Następne zdjęcie"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-white text-base font-semibold">{kitten.name}</h4>
            <p className="text-xs text-neutral-400 mt-1">{images[currentImgIndex].caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
