"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AvailableKittensBanner from "@/components/ui/AvailableKittensBanner";
import { REAL_MESSENGER_URL } from "@/data/realCatsData";

const BreederSection = dynamic(() => import("@/components/sections/BreederSection"), {
  loading: () => <div className="min-h-[60vh] bg-black" />,
});
const BentoShowcaseSection = dynamic(() => import("@/components/sections/BentoShowcaseSection"), {
  loading: () => <div className="min-h-[50vh] bg-black" />,
});
const EnclosureSection = dynamic(() => import("@/components/sections/EnclosureSection"), {
  loading: () => <div className="min-h-[70vh] bg-black" />,
});
const ScaleComparisonSection = dynamic(() => import("@/components/sections/ScaleComparisonSection"), {
  loading: () => <div className="min-h-[50vh] bg-black" />,
});
const KnowledgeBaseTeaser = dynamic(() => import("@/components/sections/KnowledgeBaseTeaser"), {
  loading: () => <div className="min-h-[50vh] bg-black" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="min-h-[50vh] bg-black" />,
});
const FacebookCommunitySection = dynamic(() => import("@/components/sections/FacebookCommunitySection"), {
  loading: () => <div className="min-h-[50vh] bg-black" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="min-h-[60vh] bg-black" />,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="min-h-[30vh] bg-black" />,
});

export default function Home() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");

  const handleOpenReservation = () => {
    if (typeof window !== "undefined") {
      window.open(REAL_MESSENGER_URL, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white">
      
      {/* Pasek postępu scrollowania na samej górze */}
      <ScrollProgress />

      {/* Nowoczesny Navbar ze szklanym rozmyciem i czytelnym menu */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Dynamiczny baner dostępnych kotków (pojawia się tylko gdy jest dostępny kot) */}
      <div className="pt-14 sm:pt-16">
        <AvailableKittensBanner lang={lang} onOpenReservation={() => handleOpenReservation()} />
      </div>

      {/* Główna sekwencja narracyjna strony głównej */}
      <main className="relative z-10">
        
        {/* ① HERO: Monumentalny wstęp + film w tle z kotem */}
        <HeroSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ② O WŁAŚCICIELCE: Kim jestem — z filmem pionowym w ramce iPhone */}
        <BreederSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ③ BENTO SHOWCASE: Prawdziwe kadry. Nasz dom to ich dom */}
        <BentoShowcaseSection lang={lang} />

        {/* ④ WYBIEG: Scrollytelling Apple iPhone — z filmem z wybiegu */}
        <EnclosureSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ⑤ BAZA WIEDZY #1 (PORÓWNANIE KOTY VS PSY): Skala 1:1 z psem */}
        <ScaleComparisonSection lang={lang} compact={true} />

        {/* ⑧ BAZA WIEDZY #2 (KOMPENDIUM & SYMULATOR): Kalkulator kosztów i badania genetyczne */}
        <KnowledgeBaseTeaser lang={lang} />

        {/* ⑧ OPINIE OPIEKUNÓW: Oceny 5.0, metryki, notatki głosowe */}
        <TestimonialsSection lang={lang} />

        {/* ⑨ SPOŁECZNOŚĆ FACEBOOK: 26 400+ fanów na żywo z Meta API */}
        <FacebookCommunitySection lang={lang} />

        {/* ⑩ KONTAKT: Ścieżka kontaktu, formularz i bezpośrednie kanały */}
        <ContactSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

      </main>

      {/* STOPKA */}
      <Footer lang={lang} setLang={setLang} />



    </div>
  );
}
