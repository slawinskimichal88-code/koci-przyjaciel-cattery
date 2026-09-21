"use client";

import React, { useState } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import KittenReservationBar from "@/components/sections/KittenReservationBar";
import EnclosureSection from "@/components/sections/EnclosureSection";
import KittensSection from "@/components/sections/KittensSection";
import BentoShowcaseSection from "@/components/sections/BentoShowcaseSection";
import BreederSection from "@/components/sections/BreederSection";
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

      {/* Nowoczesny, wyrazisty Navbar ze szklanym rozmyciem i czytelnym menu */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Główna sekwencja narracyjna strony głównej (Układ Sprzedażowo-Wiedzowy Apple Pro) */}
      <main className="relative z-10">
        
        {/* ① HERO: Monumentalny wstęp + film w tle */}
        <HeroSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ② PASEK SPRZEDAŻOWY: Status rezerwacji 2026, miniatury kociąt i szybki kontakt */}
        <KittenReservationBar
          lang={lang}
          onOpenReservation={(name) => handleOpenReservation(name)}
        />

        {/* ③ WYBIEG: Scrollytelling Apple iPhone — filozofia wybiegu, życie w domu, zero klatek */}
        <EnclosureSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ④ BENTO SHOWCASE: 10 kadrów z życia hodowli z efektem Shared Layout Animation i odnośnikiem do galerii */}
        <BentoShowcaseSection lang={lang} />

        {/* ⑤ KOCIĘTA: Wirtualny selektor kociąt Apple Pro, filtry, EMS, specyfikacja i rezerwacja */}
        <KittensSection
          lang={lang}
          onOpenReservation={(name) => handleOpenReservation(name)}
        />

        {/* ⑥ KIM JESTEM: Właścicielka hodowli, domowy odchów w salonie, brak klatek, badania zdrowotne */}
        <BreederSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ⑥ BAZA WIEDZY #1 (PORÓWNANIE KOTY VS PSY): Interaktywna skala 1:1, laserowe miarki, mikro-kropki Apple LiDAR oraz pełne 6 kart porównawczych iPhone Glass */}
        <ScaleComparisonSection lang={lang} compact={false} />

        {/* ⑦ BAZA WIEDZY #2 (KOMPENDIUM & SYMULATOR): Wirtualny kalkulator kosztów na żywo, badania genetyczne HCM/PKD/SMA N/N */}
        <KnowledgeBaseTeaser lang={lang} />

        {/* ⑧ OPINIE OPIEKUNÓW: Oceny 5.0, metryki wagi, filtry kategorii, wirtualne notatki głosowe audio */}
        <TestimonialsSection lang={lang} />

        {/* ⑨ SPOŁECZNOŚĆ FACEBOOK: 26 400+ fanów na żywo z Meta API, zdjęcia rodzin i social hub */}
        <FacebookCommunitySection lang={lang} />

        {/* ⑩ KONTAKT: 3 kroki adopcji, bezpośrednie linie kontaktu, formularz z preferencjami */}
        <ContactSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

      </main>

      {/* STOPKA: Nowoczesna z podziałem na zakładki */}
      <Footer lang={lang} setLang={setLang} />

      {/* Modal rezerwacji kociaka */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        defaultKitten={reservationKitten}
        lang={lang}
      />

    </div>
  );
}
