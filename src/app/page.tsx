"use client";

import React, { useState } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import KittenReservationBar from "@/components/sections/KittenReservationBar";
import EnclosureSection from "@/components/sections/EnclosureSection";
import AboutSection from "@/components/sections/AboutSection";
import KittensSection from "@/components/sections/KittensSection";
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

      {/* Główna sekwencja narracyjna strony głównej */}
      <main className="relative z-10">
        
        {/* ① HERO: Monumentalny wstęp + film w tle */}
        <HeroSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ② PASEK REZERWACJI KOCIĄT: Bezpośrednia widoczność statusu hodowli i miniatur kociąt */}
        <KittenReservationBar
          lang={lang}
          onOpenReservation={(kittenName) => handleOpenReservation(kittenName)}
        />

        {/* ③ WYBIEG & WOLIERA: Flagowy scrollytelling Apple iPhone 16 Pro (pnie 3.2m, zero klatek) */}
        <EnclosureSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ④ O HODOWLI: Domowa filozofia, życie w salonie, FIFe / FPL */}
        <AboutSection lang={lang} />

        {/* ⑤ KOCIĘTA: Aktualnie dostępne kocięta do rezerwacji z odnośnikiem do pełnej zakładki /kocieta */}
        <KittensSection
          lang={lang}
          onOpenReservation={(name) => handleOpenReservation(name)}
        />

        {/* ⑥ BAZA WIEDZY O MAINE COON: Kompendium wiedzy o rasie z odnośnikiem do zakładki /baza-wiedzy */}
        <KnowledgeBaseTeaser lang={lang} />

        {/* ⑦ OPINIE OPIEKUNÓW: Referencje od rodzin */}
        <TestimonialsSection lang={lang} />

        {/* ⑧ SPOŁECZNOŚĆ FACEBOOK: 25 395 fanów na żywo */}
        <FacebookCommunitySection lang={lang} />

        {/* ⑨ KONTAKT: Formularz, telefon, mapa Wrocławia */}
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
