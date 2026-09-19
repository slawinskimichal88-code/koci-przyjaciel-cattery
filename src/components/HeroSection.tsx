"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HERO_CATS, REAL_FACEBOOK_URL, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { ArrowRight, Camera, ArrowUpRight, Sparkles, Check } from "lucide-react";

interface HeroSectionProps {
  lang: "PL" | "EN" | "DE";
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const currentCat = HERO_CATS[selectedCatIndex] || HERO_CATS[0];

  const catSpecs = [
    { name: "Lord Diamond Koci Przyjaciel", role: "Grand International Champion", weight: "11.4 kg", color: "Black Silver Classic Tabby", test: "HCM N/N Czyste" },
    { name: "Astra Koci Przyjaciel", role: "Kotka Hodowlana (FPL)", weight: "7.8 kg", color: "Silver Tortie with White", test: "Echo Serca Prawidłowe" },
    { name: "Arthur Koci Przyjaciel", role: "Młody Kocur w Rozwoju", weight: "9.6 kg", color: "Black Classic Tabby", test: "PKD / SMA N/N" },
    { name: "Bella Koci Przyjaciel", role: "Championka Domowa", weight: "8.2 kg", color: "Red Classic Tabby", test: "100% Czyste Linie" },
    { name: "Thor Koci Przyjaciel", role: "Dostojny Olbrzym", weight: "11.1 kg", color: "Blue Classic Tabby", test: "Certyfikat Laboklin" },
    { name: "Luna Koci Przyjaciel", role: "Troskliwa Mama Miotów", weight: "7.4 kg", color: "Silver Tabby", test: "Echo Kardiologiczne N/N" },
  ];

  const currentSpec = catSpecs[selectedCatIndex] || catSpecs[0];

  return (
    <section id="glowna-ekspozycja" className="relative py-24 sm:py-32 bg-[#FBF8F3] text-[#2A221F] border-b-2.5 border-[#2A221F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F] pb-4 mb-14 text-xs font-mono uppercase tracking-widest text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
              01
            </span>
            <span className="text-[#2A221F] font-black">KOTY HODOWLANE // RODOWODOWE MAINE COON WROCŁAW</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[#6B5E59] font-bold">
            <span>PROFIL DNA LABOKLIN</span>
            <span>&bull;</span>
            <span>WROCŁAW</span>
            <span>&bull;</span>
            <span>RODOWÓD FIFE / FPL</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#E88A72] font-black tracking-[0.25em] block mb-2 uppercase flex items-center gap-1.5">
                <span>🐾</span> [ EKSTERIER I CHARAKTER &middot; FIFE / FPL ]
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#2A221F] font-editorial leading-[1.0] uppercase">
                Koty Maine Coon <br />
                <span className="italic font-normal text-[#E88A72]">z Rodowodem i Badaniami.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-[#6B5E59] font-mono leading-relaxed">
              Wybierz kota z paska poniżej, aby zobaczyć autentyczne zdjęcie, oficjalne tytuły wystawowe, wagę, kod EMS oraz certyfikowane wyniki badań genetycznych HCM, PKD i SMA.
            </p>
          </div>
        </div>

        {/* Cinematic Split Spread - Pastel Cartoon Aesthetic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Photo Frame (8 cols) - Pastel Polaroid Card */}
          <div className="lg:col-span-8 rounded-4xl overflow-hidden p-4 sm:p-5 bg-white border-2.5 border-[#2A221F] shadow-[6px_6px_0px_#2A221F] relative flex flex-col justify-between group">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[#FFF5EB] border-2 border-[#2A221F]">
              <Image
                src={currentCat.src}
                alt={currentSpec.name}
                fill
                priority
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />

              {/* Top Index Stamp */}
              <div className="absolute top-4 left-4 bg-[#FEF9C3] px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#2A221F] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] flex items-center gap-2 font-black">
                <span className="w-2 h-2 rounded-full bg-[#E88A72] animate-ping" />
                <span>KADR 0{selectedCatIndex + 1} &bull; {currentSpec.role}</span>
              </div>

              {/* Bottom Architectural Spec Overlay - Pastel Ivory Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FDFBF7]/95 backdrop-blur-md p-5 rounded-2xl border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#2A221F]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#2A221F] font-editorial">
                    {currentSpec.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B5E59] mt-0.5 font-mono">
                    {currentSpec.color} &bull; <strong className="text-[#166534] bg-[#E2F4E7] px-2 py-0.5 rounded-md border border-[#2A221F]/30">{currentSpec.test}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="px-4 py-2 rounded-xl bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                    ⚖️ {currentSpec.weight}
                  </div>
                  <a
                    href="#galeria"
                    className="p-2.5 rounded-xl bg-white text-[#2A221F] border-2 border-[#2A221F] hover:bg-[#FEF9C3] shadow-[2px_2px_0px_#2A221F] transition-colors"
                    title="Zobacz w galerii"
                  >
                    <Camera className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Reel Thumbnails Selector */}
            <div className="pt-4 flex items-center gap-2.5 overflow-x-auto pb-1">
              {HERO_CATS.map((cat, idx) => {
                const isSelected = selectedCatIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCatIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#2A221F] shadow-[3px_3px_0px_#2A221F] scale-105"
                        : "border-[#2A221F]/30 opacity-70 hover:opacity-100 hover:border-[#2A221F]"
                    }`}
                  >
                    <Image src={cat.src} alt="Miniatura" fill className="object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 border-2 border-[#E88A72] rounded-2xl" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Specimen Info Card (4 cols) - Pastel Lavender */}
          <div className="lg:col-span-4 rounded-4xl p-6 sm:p-8 bg-[#EFE6FD] border-2.5 border-[#2A221F] shadow-[6px_6px_0px_#2A221F] flex flex-col justify-between space-y-6 text-[#2A221F]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#2A221F] pb-4">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-[#2A221F]">
                  PASZPORT HODOWLANY
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#2A221F] border-2 border-[#2A221F] text-[10px] font-mono font-bold shadow-[2px_2px_0px_#2A221F]">
                  FPL / FIFe
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-2xl sm:text-3xl font-black font-editorial uppercase leading-tight">
                  Wzorzec Rasy Maine Coon
                </h4>
                <p className="text-xs sm:text-sm text-[#2A221F] font-mono leading-relaxed">
                  Nasze koty odznaczają się mocną budową kośćca, charakterystyczną lwią kryzą wokół szyi, 
                  rysiami pędzelkami na uszach oraz długim, puszystym ogonem.
                </p>
              </div>

              {/* Badges List */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                  <span className="w-6 h-6 rounded-full bg-[#E2F4E7] flex items-center justify-center border border-[#2A221F] text-xs font-bold text-[#166534]">✓</span>
                  <span className="text-xs font-mono font-bold">100% Czyste linie genetyczne HCM, PKD, SMA</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                  <span className="w-6 h-6 rounded-full bg-[#E2F4E7] flex items-center justify-center border border-[#2A221F] text-xs font-bold text-[#166534]">✓</span>
                  <span className="text-xs font-mono font-bold">Wychowane bez klatek w salonie z dziećmi i psem</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                  <span className="w-6 h-6 rounded-full bg-[#E2F4E7] flex items-center justify-center border border-[#2A221F] text-xs font-bold text-[#166534]">✓</span>
                  <span className="text-xs font-mono font-bold">Oryginalny rodowód FPL z hologramem</span>
                </div>
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="pt-4 border-t-2 border-[#2A221F] space-y-3">
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="w-full py-3.5 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Porozmawiaj o kocie: {REAL_PHONE}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
