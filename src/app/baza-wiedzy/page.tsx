"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreedSection from "@/components/sections/BreedSection";
import ScaleComparisonSection from "@/components/sections/ScaleComparisonSection";
import HealthSection from "@/components/sections/HealthSection";
import PedigreeSection from "@/components/sections/PedigreeSection";
import FaqSection from "@/components/sections/FaqSection";
import CostCalculator from "@/components/calculator/CostCalculator";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import {
  BookOpen,
  Scale,
  HeartPulse,
  Award,
  HelpCircle,
  Calculator,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";

type TabKey = "kalkulator" | "wzorzec" | "skala" | "zdrowie" | "rodowod" | "faq" | "all";

function KnowledgeBaseContent() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab") as TabKey | null;

  const [activeTab, setActiveTab] = useState<TabKey>("kalkulator");

  useEffect(() => {
    if (requestedTab && ["kalkulator", "wzorzec", "skala", "zdrowie", "rodowod", "faq", "all"].includes(requestedTab)) {
      setActiveTab(requestedTab);
    }
  }, [requestedTab]);

  const TABS = [
    {
      id: "kalkulator" as TabKey,
      icon: Calculator,
      label: { PL: "Kalkulator Kosztów & Wyprawka", EN: "Cost Calculator" },
      desc: { PL: "Interaktywny symulator miesięcznych i jednorazowych wydatków na Maine Coona", EN: "Interactive expense & starter kit simulator" },
    },
    {
      id: "wzorzec" as TabKey,
      icon: Sparkles,
      label: { PL: "Wzorzec rasy", EN: "Breed Standard" },
      desc: { PL: "Oficjalny standard FIFe, anatomia, uszy z pędzlami i charakter", EN: "Official FIFe standard, anatomy & temperament" },
    },
    {
      id: "skala" as TabKey,
      icon: Scale,
      label: { PL: "Skala 1:1 vs Pies", EN: "Scale 1:1 vs Dog" },
      desc: { PL: "Interaktywne porównanie wymiarów, wagi i budowy z psem Beagle", EN: "Interactive dimension, weight & anatomy comparison with a dog" },
    },
    {
      id: "zdrowie" as TabKey,
      icon: HeartPulse,
      label: { PL: "Badania serca HCM & DNA", EN: "HCM & DNA Health" },
      desc: { PL: "Certyfikowana profilaktyka kardiologiczna Echo Doppler i testy Laboklin N/N", EN: "Cardiology screening Doppler & Laboklin N/N DNA tests" },
    },
    {
      id: "rodowod" as TabKey,
      icon: Award,
      label: { PL: "Rodowód FIFe", EN: "FIFe Pedigree" },
      desc: { PL: "5 pokoleń czystych linii hodowlanych, wolnych od wad", EN: "5-generation certified clean bloodlines" },
    },
    {
      id: "faq" as TabKey,
      icon: HelpCircle,
      label: { PL: "FAQ & Poradnik", EN: "FAQ Guide" },
      desc: { PL: "Kompendium najczęstszych pytań i odpowiedzi przed adopcją", EN: "Answers to the most frequent questions before adoption" },
    },
    {
      id: "all" as TabKey,
      icon: Layers,
      label: { PL: "Wszystkie działy", EN: "All Topics" },
      desc: { PL: "Pełne kompendium felinologiczne hodowli na jednej stronie", EN: "Full cattery felinology compendium on one page" },
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="pt-24 sm:pt-32">

        {/* ── Hero Banner Bazy Wiedzy ────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-semibold">
              {lang === "PL" ? "KOMPENDIUM HODOWLANE · FELINOLOGIA · FIFe" : "BREED COMPENDIUM · FELINOLOGY · FIFe"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[1.02] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Baza Wiedzy o <span className="font-semibold italic text-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">Maine Coon</span>
              </>
            ) : (
              <>
                Maine Coon <span className="font-semibold italic text-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">Knowledge Base</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#86868b] font-body max-w-3xl mx-auto font-light leading-relaxed mb-8">
            {lang === "PL"
              ? "Oficjalny przewodnik certyfikowanej hodowli Koci Przyjaciel *PL. Wybierz podzakładkę poniżej, aby natychmiast przejść do kalkulatora, wzorca rasy, porównania skali lub badań."
              : "Official guide by certified cattery Koci Przyjaciel *PL. Select a tab below to explore the cost calculator, breed standard, scale comparison, or certified health tests."}
          </p>

          {/* ── Podzakładki Apple Segmented Control (Wysoki Kontrast, Przejrzysty Podział) ── */}
          <div className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl p-1.5 rounded-2xl sm:rounded-full shadow-2xl max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-ui transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-lg scale-105 ring-2 ring-white/50"
                      : "bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-amber-400"}`} />
                  <span>{tab.label[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Aktywny opis wybranej podzakładki */}
          <div className="mt-4 text-xs font-mono text-zinc-400 uppercase tracking-widest px-4 py-1.5 inline-block rounded-full bg-white/5 border border-white/10">
            {TABS.find((t) => t.id === activeTab)?.desc[lang]}
          </div>
        </section>

        {/* ── SEKCJE DEDYKOWANE WYBRANYM PODZAKŁADKOM ─────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* 1. Kalkulator Kosztów & Wyprawka */}
          {(activeTab === "all" || activeTab === "kalkulator") && (
            <section id="kalkulator" className="py-6 transition-all duration-300 scroll-mt-24">
              <CostCalculator
                lang={lang}
                onOpenReservation={() => setIsReservationOpen(true)}
              />
            </section>
          )}

          {/* 2. Wzorzec rasy i anatomia */}
          {(activeTab === "all" || activeTab === "wzorzec") && (
            <section id="wzorzec" className="py-6 transition-all duration-300 scroll-mt-24">
              <BreedSection lang={lang} />
            </section>
          )}

          {/* 3. Interaktywna skala i porównanie wymiarów (zawsze DARK THEME dla spójności czerni i bieli!) */}
          {(activeTab === "all" || activeTab === "skala") && (
            <section id="skala" className="py-6 transition-all duration-300 scroll-mt-24">
              <ScaleComparisonSection lang={lang} theme="dark" />
            </section>
          )}

          {/* 4. Zdrowie, badania serca HCM i genetyka */}
          {(activeTab === "all" || activeTab === "zdrowie") && (
            <section id="zdrowie" className="py-6 transition-all duration-300 scroll-mt-24">
              <HealthSection lang={lang} />
            </section>
          )}

          {/* 5. Rodowód i 5 pokoleń championów */}
          {(activeTab === "all" || activeTab === "rodowod") && (
            <section id="rodowod" className="py-6 transition-all duration-300 scroll-mt-24">
              <PedigreeSection lang={lang} />
            </section>
          )}

          {/* 6. FAQ - Pytania i odpowiedzi */}
          {(activeTab === "all" || activeTab === "faq") && (
            <section id="faq" className="py-6 transition-all duration-300 scroll-mt-24">
              <FaqSection
                lang={lang}
                onOpenReservation={() => setIsReservationOpen(true)}
              />
            </section>
          )}

        </div>

        {/* Dolny pasek ułatwiający przełączanie podzakładek gdy jesteśmy w pojedynczym widoku */}
        {activeTab !== "all" && (
          <div className="max-w-4xl mx-auto px-6 py-10 text-center border-t border-white/10 mt-6">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
              {lang === "PL"
                ? "Chcesz sprawdzić pozostałe działy hodowlane?"
                : "Would you like to explore other feline topics?"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TABS.filter((t) => t.id !== activeTab).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id);
                    window.scrollTo({ top: 180, behavior: "smooth" });
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-ui text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {t.label[lang]}
                </button>
              ))}
            </div>
          </div>
        )}

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

export default function KnowledgeBasePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070709] flex items-center justify-center text-white font-mono text-sm">Ładowanie Bazy Wiedzy...</div>}>
      <KnowledgeBaseContent />
    </Suspense>
  );
}
