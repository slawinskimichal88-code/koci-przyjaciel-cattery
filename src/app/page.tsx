"use client";

import React, { useState } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import EnclosureSection from "@/components/sections/EnclosureSection";
import AboutSection from "@/components/sections/AboutSection";
import BreedSection from "@/components/sections/BreedSection";
import ScaleComparisonSection from "@/components/sections/ScaleComparisonSection";
import KittensSection from "@/components/sections/KittensSection";
import ParentsSection from "@/components/sections/ParentsSection";
import HealthSection from "@/components/sections/HealthSection";
import PedigreeSection from "@/components/sections/PedigreeSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CostCalculatorSection from "@/components/sections/CostCalculatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FacebookCommunitySection from "@/components/sections/FacebookCommunitySection";
import GallerySection from "@/components/sections/GallerySection";
import FaqSection from "@/components/sections/FaqSection";
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
      
      {/* Golden ScrollProgress Indicator na samej górze */}
      <ScrollProgress />

      {/* Stały pasek nawigacyjny z płynnym przewijaniem */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Główny, przemyślany narracyjnie przepływ strony */}
      <main className="relative z-10">
        
        {/* ① HERO (100vh): Pełnoekranowy film w tle + Monumentalny hook + Rezerwacja */}
        <HeroSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ② WYBIEG & WOLIERA (Apple iPhone 16 Pro Scrollytelling): 
            Natychmiast po Hero — pokazujemy unikalne warunki życia kotów:
            Pnie drzew 3.2m, świeże powietrze 365 dni i zero klatek */}
        <EnclosureSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ③ O HODOWLI (#FAFAF8): Kim jesteśmy, nasza domowa filozofia, 14 lat doświadczenia */}
        <AboutSection lang={lang} />

        {/* ④ RASA MAINE COON (#0A0A0A): Anatomia, waga do 12 kg, charakter psa w ciele lwa */}
        <BreedSection lang={lang} />

        {/* ④.B SKALA (#0A0A0A): Interaktywne porównanie wymiarów Apple Keynote */}
        <ScaleComparisonSection lang={lang} />

        {/* ⑤ DOSTĘPNE KOCIĘTA (#FAFAF8): Dostępne mioty, karty kociąt i bezpośrednia rezerwacja */}
        <KittensSection
          lang={lang}
          onOpenReservation={(name) => handleOpenReservation(name)}
        />

        {/* ⑥ RODZICE (#0A0A0A): Koty hodowlane — reproduktor i kotki hodowlane */}
        <ParentsSection lang={lang} />

        {/* ⑦ ZDROWIE & GENETYKA (#FAFAF8): Badania HCM Echo Doppler serca, SMA, PKD N/N, Laboklin */}
        <HealthSection lang={lang} />

        {/* ⑦.B DRZEWO GENEALOGICZNE (#0A0A0A): 5-pokoleniowy rodowód FPL / FIFe i championy */}
        <PedigreeSection lang={lang} />

        {/* ⑧ PROCES ADOPCJI (#FAFAF8): 5 przejrzystych kroków bezpiecznej adopcji */}
        <ProcessSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ⑧.B KALKULATOR KOSZTÓW (#FAFAF8): Transparentne comiesięczne i roczne koszty życia z kotem */}
        <CostCalculatorSection lang={lang} />

        {/* ⑨ OPINIE OPIEKUNÓW (#FAFAF8): Referencje od rodzin z Warszawy, Krakowa, Wrocławia */}
        <TestimonialsSection lang={lang} />

        {/* ⑨.B SPOŁECZNOŚĆ FACEBOOK (#0A0A0A): 25 395 fanów na żywo + zdjęcia kotów w nowych domach */}
        <FacebookCommunitySection lang={lang} />

        {/* ⑩ GALERIA ZDJĘĆ (#0A0A0A): Autentyczne fotografie z życia hodowli + Lightbox */}
        <GallerySection lang={lang} />

        {/* ⑪ BAZA WIEDZY & FAQ (#FAFAF8): Odpowiedzi na wszystkie pytania przed zakupem */}
        <FaqSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ⑫ KONTAKT & WROCŁAW (#0A0A0A): Formularz spięty z API, telefon, mapa, zaproszenie */}
        <ContactSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

      </main>

      {/* STOPKA: Logo, linki w nowym porządku narracyjnym, prawa autorskie */}
      <Footer lang={lang} setLang={setLang} />

      {/* Modal rezerwacyjny kociaka spięty z /api/reservation */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        defaultKitten={reservationKitten}
        lang={lang}
      />

    </div>
  );
}
