"use client";

import React, { useState } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import BreederSection from "@/components/sections/BreederSection";
import EnclosureSection from "@/components/sections/EnclosureSection";
import BentoShowcaseSection from "@/components/sections/BentoShowcaseSection";
import ScaleComparisonSection from "@/components/sections/ScaleComparisonSection";
import KnowledgeBaseTeaser from "@/components/sections/KnowledgeBaseTeaser";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FacebookCommunitySection from "@/components/sections/FacebookCommunitySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import ReservationModal from "@/components/ui/ReservationModal";

export default function Home() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationKitten, setReservationKitten] = useState("");

  const handleOpenReservation = (kittenName?: string) => {
    setReservationKitten(kittenName || "");
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      
      {/* Pasek postępu scrollowania na samej górze */}
      <ScrollProgress />

      {/* Nowoczesny Navbar ze szklanym rozmyciem i czytelnym menu */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

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

        {/* ③ BENTO SHOWCASE: Prawdziwe kadry. Nasz dom to ich dom. (Jasne tło, naturalne oddzielenie sekcji wideo) */}
        <BentoShowcaseSection lang={lang} />

        {/* ④ WYBIEG: Scrollytelling Apple iPhone — z filmem z wybiegu */}
        <EnclosureSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ⑤ BAZA WIEDZY #1 (PORÓWNANIE KOTY VS PSY): Skala 1:1 z psem */}
        <ScaleComparisonSection lang={lang} compact={false} />

        {/* ⑥ BAZA WIEDZY #2 (KOMPENDIUM & SYMULATOR): Kalkulator kosztów i badania genetyczne */}
        <KnowledgeBaseTeaser lang={lang} />

        {/* ⑦ OPINIE OPIEKUNÓW: Oceny 5.0, metryki, notatki głosowe */}
        <TestimonialsSection lang={lang} />

        {/* ⑧ SPOŁECZNOŚĆ FACEBOOK: 26 400+ fanów na żywo z Meta API */}
        <FacebookCommunitySection lang={lang} />

        {/* ⑨ KONTAKT: Ścieżka kontaktu, formularz i bezpośrednie kanały */}
        <ContactSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

      </main>

      {/* STOPKA */}
      <Footer lang={lang} setLang={setLang} />

      {/* Modal rezerwacji / lista oczekujących */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        defaultKitten={reservationKitten}
        lang={lang}
      />

    </div>
  );
}
