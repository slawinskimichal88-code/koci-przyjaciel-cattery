"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { ArrowRight, Phone, Volume2, VolumeX, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: () => void;
}

export default function HeroSection({ lang, onOpenReservation }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white pt-24 pb-12 px-4 sm:px-6">
      
      {/* ── TŁO WIDEO — /video/hero-cat.mp4 ───────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/video/hero-cat.mp4"
          poster="/images/cats/cat_01.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[60%_center] opacity-60 scale-105"
        />

        {/* Ciepły odcień filmowy i kinowe gradienty */}
        <div className="absolute inset-0 bg-[#3a200a]/20 mix-blend-color pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.75)_90%)] pointer-events-none" />
      </div>

      {/* Przełącznik dźwięku wideo */}
      <button
        onClick={toggleSound}
        className="absolute top-24 right-6 sm:right-10 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer hover:scale-110 shadow-lg"
        title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
      </button>

      {/* ── GŁÓWNA ZAWARTOŚĆ: LOGO + TYTUŁ + CTA ─────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto">
        
        {/* Monumentalne Logo z aureolą świetlną Apple */}
        <div className="relative mb-6 group cursor-default">
          {/* Dynamiczna łuna ambient glow */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-amber-400/20 via-white/30 to-transparent rounded-full blur-3xl opacity-75 animate-pulse pointer-events-none" />
          
          {/* Główny pierścień z kryształowym logo */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-2 bg-gradient-to-b from-white/40 via-white/10 to-transparent shadow-[0_0_80px_rgba(255,255,255,0.25)] backdrop-blur-md transition-transform duration-700 hover:scale-105">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/60 shadow-2xl bg-black">
              <Image
                src={REAL_LOGO}
                alt="Logo Hodowla Kotów Maine Coon Koci Przyjaciel *PL Wrocław"
                fill
                priority
                className="object-cover scale-105"
              />
            </div>
          </div>
        </div>

        {/* Certyfikat federacji */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/90 font-semibold">
            FIFe · FPL · WROCŁAW
          </span>
        </div>

        {/* Wielki tytuł */}
        <h1
          className="font-heading font-light text-white leading-[0.95] tracking-tight mb-4"
          style={{ fontSize: "clamp(3rem, 7.5vw, 6.2rem)" }}
        >
          Koci <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">Przyjaciel *PL</span>
        </h1>

        {/* Podtytuł */}
        <p className="text-base sm:text-lg md:text-xl font-body text-zinc-200 max-w-xl mx-auto leading-relaxed mb-8 font-light">
          {lang === "PL" ? (
            <>
              Domowa hodowla kotów rasy Maine Coon we Wrocławiu.
              <br />
              <span className="text-xs sm:text-sm text-zinc-400 tracking-wider uppercase font-mono block mt-1">
                Wychowujemy kociaki w miłości · Nasz dom to ich dom
              </span>
            </>
          ) : (
            <>
              Passionate Maine Coon cattery in Wroclaw.
              <br />
              <span className="text-xs sm:text-sm text-zinc-400 tracking-wider uppercase font-mono block mt-1">
                Raised with love at home · Our home is their home
              </span>
            </>
          )}
        </p>

        {/* Przyciski CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-4">
          <a
            href="#kocieta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-300 transition-all shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:scale-105"
          >
            <span>{lang === "PL" ? "Dostępne Kocięta 2026" : "Available Kittens 2026"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenReservation}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-body text-xs sm:text-sm font-semibold border border-white/20 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <span>{lang === "PL" ? "Zarezerwuj Kociaka" : "Reserve a Kitten"}</span>
          </button>

          <a
            href={`tel:${REAL_PHONE_RAW}`}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 hover:text-white font-body text-xs sm:text-sm font-medium border border-white/10 transition-all"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>{REAL_PHONE}</span>
          </a>
        </div>

      </div>

      {/* Wskaźnik scrolla w dół */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity pointer-events-none mt-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
          {lang === "PL" ? "Przewiń w dół" : "Scroll down"}
        </span>
        <ChevronDown className="w-4 h-4 text-white/60 animate-bounce" />
      </div>

    </section>
  );
}
