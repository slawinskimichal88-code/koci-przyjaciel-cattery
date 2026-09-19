"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KittensSection from "@/components/sections/KittensSection";
import ParentsSection from "@/components/sections/ParentsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Sparkles, CheckCircle2, ShieldCheck, Heart } from "lucide-react";

export default function KittensPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationKitten, setReservationKitten] = useState("");

  const handleOpenReservation = (kittenName?: string) => {
    setReservationKitten(kittenName || "");
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

      <main className="pt-28 sm:pt-36">
        
        {/* Banner wprowadzający podstrony */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "MIOTY 2026 · HODOWLA DOMOWA" : "2026 LITTERS · HOME BREEDING"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Dostępne <span className="font-semibold italic">Kocięta</span> & Rodzice.
              </>
            ) : (
              <>
                Available <span className="font-semibold italic">Kittens</span> & Parents.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-body max-w-2xl mx-auto font-light leading-relaxed mb-8">
            {lang === "PL"
              ? "Wszystkie nasze kocięta opuszczają hodowlę z 5-pokoleniowym rodowodem FIFe / FPL, kompletem szczepień, mikrochipem Safe-Animal oraz ujemnymi wynikami badań genetycznych HCM, SMA i PKD rodziców."
              : "All kittens leave our cattery with 5-generation FIFe/FPL pedigree, microchip, vaccinations, and certified HCM, SMA, PKD N/N health guarantee."}
          </p>

          {/* 3 filary bezpieczeństwa maluchów */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs text-zinc-300 font-body">
                {lang === "PL" ? "Gwarancja genetyczna HCM, PKD, SMA N/N" : "HCM, PKD, SMA N/N certified"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-400 shrink-0" />
              <span className="text-xs text-zinc-300 font-body">
                {lang === "PL" ? "100% socjalizacja z dziećmi i psem" : "Socialized with children & dogs"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
              <span className="text-xs text-zinc-300 font-body">
                {lang === "PL" ? "Dożywotnie wsparcie hodowcy" : "Lifetime breeder support"}
              </span>
            </div>
          </div>
        </section>

        {/* 1. Dostępne Kocięta */}
        <KittensSection
          lang={lang}
          onOpenReservation={(name) => handleOpenReservation(name)}
        />

        {/* 2. Rodzice (Reproduktor i Matki) */}
        <ParentsSection lang={lang} />

        {/* 3. 5 kroków procedury adopcji */}
        <ProcessSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

      </main>

      <Footer lang={lang} setLang={setLang} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        defaultKitten={reservationKitten}
        lang={lang}
      />
    </div>
  );
}
