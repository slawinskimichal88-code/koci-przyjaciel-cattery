"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreedSection from "@/components/sections/BreedSection";
import ScaleComparisonSection from "@/components/sections/ScaleComparisonSection";
import HealthSection from "@/components/sections/HealthSection";
import PedigreeSection from "@/components/sections/PedigreeSection";
import CostCalculatorSection from "@/components/sections/CostCalculatorSection";
import FaqSection from "@/components/sections/FaqSection";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BookOpen, Scale, HeartPulse, ShieldAlert, Sparkles } from "lucide-react";

export default function KnowledgeBasePage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="pt-28 sm:pt-36">

        {/* Hero Banner Bazy Wiedzy */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "KOMPENDIUM HODOWLANE · FELINOLOGIA" : "BREED COMPENDIUM · FELINOLOGY"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Baza Wiedzy o <span className="font-semibold italic">Maine Coon</span>.
              </>
            ) : (
              <>
                Maine Coon <span className="font-semibold italic">Knowledge Base</span>.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-body max-w-3xl mx-auto font-light leading-relaxed mb-10">
            {lang === "PL"
              ? "Wyczerpujący przewodnik stworzony przez certyfikowaną hodowlę Koci Przyjaciel *PL. Poznaj anatomię, wymiary, profilaktykę genetyczną HCM, dietę wysokomięsną oraz realne koszty życia z łagodnym olbrzymem."
              : "Comprehensive guide created by Koci Przyjaciel *PL. Discover feline anatomy, scale specs, HCM genetic health prevention, high-meat nutrition, and real living costs."}
          </p>

          {/* Szybka nawigacja po sekcjach bazy wiedzy */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {[
              { href: "#rasa", label: lang === "PL" ? "Wzorzec rasy" : "Breed Standard" },
              { href: "#porownanie", label: lang === "PL" ? "Porównanie wymiarów" : "Scale Comparison" },
              { href: "#zdrowie", label: lang === "PL" ? "Badania serca HCM" : "HCM Heart Health" },
              { href: "#rodowod", label: lang === "PL" ? "Rodowód FIFe" : "FIFe Pedigree" },
              { href: "#kalkulator", label: lang === "PL" ? "Kalkulator kosztów" : "Cost Calculator" },
              { href: "#faq", label: lang === "PL" ? "Pytania i odpowiedzi" : "FAQ" },
            ].map((tag) => (
              <a
                key={tag.href}
                href={tag.href}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm font-body text-zinc-300 hover:text-white transition-all"
              >
                {tag.label}
              </a>
            ))}
          </div>
        </section>

        {/* 1. Wzorzec rasy i anatomia */}
        <BreedSection lang={lang} />

        {/* 2. Interaktywna skala i porównanie wymiarów */}
        <ScaleComparisonSection lang={lang} />

        {/* 3. Zdrowie, badania serca HCM i genetyka */}
        <HealthSection lang={lang} />

        {/* 4. Rodowód i 5 pokoleń championów */}
        <PedigreeSection lang={lang} />

        {/* 5. Kalkulator kosztów utrzymania */}
        <CostCalculatorSection lang={lang} />

        {/* 6. FAQ - Pytania i odpowiedzi */}
        <FaqSection
          lang={lang}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

      </main>

      <Footer lang={lang} setLang={setLang} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        lang={lang}
      />
    </div>
  );
}
