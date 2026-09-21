"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { ArrowRight, Phone, Sparkles, ShieldCheck, Sun, Heart, Volume2, VolumeX } from "lucide-react";

interface HeroSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: () => void;
}

export default function HeroSection({ lang, onOpenReservation }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-black text-white pt-20 pb-12 sm:pt-24 sm:pb-16">
      
      {/* ── TŁO WIDEO Z KINOWYM GRADIENTEM ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-45 scale-105"
        />
        {/* Wielowarstwowe gradienty kinowe dla idealnej czytelności i głębi */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.7)_80%)] pointer-events-none" />
      </div>

      {/* Przełącznik dźwięku wideo */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-24 right-6 sm:right-10 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer hover:scale-110 shadow-lg"
        title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
      </button>

      {/* ── GŁÓWNA ZAWARTOŚĆ HERO (CENTRALNA I GĘSTA) ───────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Subtelne Logo i Plakietka */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-[0.25em] text-white/90 mb-6 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{lang === "PL" ? "DOMOWA HODOWLA MAINE COON · WROCŁAW · FPL / FIFE" : "HOME MAINE COON CATTERY · WROCLAW · FIFe"}</span>
        </div>

        {/* Monumentalny Nagłówek */}
        <h1
          className="font-heading font-light text-white leading-[0.98] tracking-tight mb-6 max-w-4xl"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)" }}
        >
          {lang === "PL" ? (
            <>
              Łagodny Olbrzym.<br />
              <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                Nasz dom to ich dom.
              </span>
            </>
          ) : (
            <>
              Gentle Giant.<br />
              <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                Our home is their home.
              </span>
            </>
          )}
        </h1>

        {/* Krótki, bogaty w treść opis */}
        <p className="text-base sm:text-lg text-zinc-300 font-body max-w-2xl mx-auto font-light leading-relaxed mb-8">
          {lang === "PL"
            ? "Autentyczna, domowa hodowla kotów rasy Maine Coon we Wrocławiu. Koty o potężnym kośćcu do 12 kg, wychowane z miłością w rodzinnym salonie przy dzieciach i psie. Zero klatek, całoroczny wybieg, certyfikowane badania serca Echo Doppler i profil DNA Laboklin N/N."
            : "Authentic, family home cattery in Wroclaw. Maine Coons up to 12 kg raised freely in our living room with children and dogs. No cages, outdoor enclosure, certified Echo Doppler heart screening and Laboklin DNA."}
        </p>

        {/* 3 Kluczowe Wyróżniki w jednym rzędzie */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mb-8 text-left">
          <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
              🦁
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Do 12 kg wagi</div>
              <div className="text-[11px] text-zinc-400 font-light">Potężny kościec i rysie uszy</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <Sun className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Woliera 365 dni</div>
              <div className="text-[11px] text-zinc-400 font-light">Bezpieczny wybieg ogrodowy</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-400/20 border border-rose-400/30 flex items-center justify-center text-rose-300 shrink-0">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Echo Doppler HCM</div>
              <div className="text-[11px] text-zinc-400 font-light">Genetyka Laboklin N/N</div>
            </div>
          </div>
        </div>

        {/* Przyciski Akcji (CTA) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#kocieta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-amber-300 transition-all shadow-[0_0_30px_rgba(251,191,36,0.35)] hover:scale-105"
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

    </section>
  );
}
