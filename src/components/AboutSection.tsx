"use client";

import React from "react";
import Image from "next/image";
import { HOME_LIFE_FEATURED, REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { Heart, Home, Users, ShieldCheck, Sparkles } from "lucide-react";

interface AboutSectionProps {
  lang: "PL" | "EN" | "DE";
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const mainPhoto = HOME_LIFE_FEATURED[0]?.src || "/images/cats/cat_15.webp";
  const kidsPhoto = HOME_LIFE_FEATURED[1]?.src || "/images/cats/cat_16.webp";
  const dogPhoto = HOME_LIFE_FEATURED[2]?.src || "/images/cats/cat_17.webp";

  return (
    <section id="o-hodowli" className="py-24 sm:py-32 border-b-2.5 border-[#2A221F] relative overflow-hidden bg-[#FFF9F5] text-[#2A221F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F] pb-4 mb-16 text-xs font-mono uppercase tracking-widest text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#E2F4E7] text-[#166534] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
              02
            </span>
            <span className="text-[#2A221F] font-black">O HODOWLI // DOMOWE WYCHOWANIE WE WROCŁAWIU</span>
          </div>
          <div className="hidden md:flex items-center gap-4 font-bold text-[#6B5E59]">
            <span>🐾 BEZ KLATEK</span>
            <span>&bull;</span>
            <span>🛋️ WSPÓLNY SALON</span>
            <span>&bull;</span>
            <span>👶 DZIECI I PIES</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Column (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#E88A72] font-black tracking-[0.25em] block uppercase flex items-center gap-1.5">
                <span>💖</span> [ DOMOWA SOCJALIZACJA &middot; ETYKA &middot; FIFE / FPL ]
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight uppercase">
                O Hodowli: <br />
                <span className="italic font-normal text-[#E88A72]">Koty, które dzielą z nami dom.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#2A221F] leading-relaxed font-mono">
              W hodowli <strong>Koci Przyjaciel *PL</strong> nie ma odizolowanych boksów, zimnych klatek 
              ani komercyjnego pośpiechu. Nasze koty to pełnoprawni członkowie rodziny. 
              Mieszkają z nami pod jednym dachem we Wrocławiu, swobodnie spacerują po całym domu 
              i od pierwszych sekund życia mają bezustanny kontakt z ludzkim ciepłem, dziećmi i psem.
            </p>

            {/* Pastel Speech Bubble Quote Box */}
            <div className="p-6 sm:p-8 rounded-4xl bg-[#FFE5D9] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] relative">
              <span className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full bg-[#2A221F] text-[#FDFBF7] font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                🐾 GŁOS HODOWCY
              </span>
              <blockquote className="text-[#2A221F] text-sm sm:text-base italic font-editorial leading-relaxed pt-1">
                &ldquo;Gdy budzisz się o świcie, a na Twoich kolanach mruczy dziesięciokilogramowy łagodny olbrzym, 
                rozumiesz, dlaczego zakochaliśmy się w tej rasie. Maine Coon to pies w ciele lwa – mądry, 
                oddany i niezwykle delikatny wobec dzieci.&rdquo;
              </blockquote>
              <div className="mt-4 pt-4 border-t-2 border-[#2A221F]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-2xl overflow-hidden border-2 border-[#2A221F] bg-[#FDFBF7] shrink-0 shadow-[1px_1px_0px_#2A221F]">
                    <Image src={REAL_LOGO} alt="Koci Przyjaciel Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <strong className="block text-xs text-[#2A221F] font-black">Agnieszka // Koci Przyjaciel *PL</strong>
                    <span className="text-[10px] text-[#6B5E59] font-mono">Felis Polonia (FPL / FIFe)</span>
                  </div>
                </div>
                <a
                  href={`tel:${REAL_PHONE_RAW}`}
                  className="text-xs font-mono font-black text-[#2A221F] hover:text-[#E88A72] underline"
                >
                  {REAL_PHONE}
                </a>
              </div>
            </div>

            {/* 4 Pillars Grid - Pastel Cartoon Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-3xl bg-[#E2F4E7] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
                <span className="text-[10px] font-mono font-black text-[#166534] block mb-1 uppercase tracking-wider">01 // DOM</span>
                <h4 className="text-base font-black text-[#2A221F] font-editorial uppercase">Zero Klatek</h4>
                <p className="text-xs text-[#2A221F] mt-1 font-mono leading-relaxed">
                  Koty mają swobodny dostęp do sypialni, sof i parapetów. Nie hodujemy w zamknięciu.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#FFE5D9] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
                <span className="text-[10px] font-mono font-black text-[#9A3412] block mb-1 uppercase tracking-wider">02 // DZIECI & PIES</span>
                <h4 className="text-base font-black text-[#2A221F] font-editorial uppercase">Wrodzona Odwaga</h4>
                <p className="text-xs text-[#2A221F] mt-1 font-mono leading-relaxed">
                  Odchowane w tętniącym życiem domu. Nie boją się odkurzacza, gości ani psa.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#E0F2FE] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
                <span className="text-[10px] font-mono font-black text-[#0369A1] block mb-1 uppercase tracking-wider">03 // GENETYKA</span>
                <h4 className="text-base font-black text-[#2A221F] font-editorial uppercase">HCM N/N</h4>
                <p className="text-xs text-[#2A221F] mt-1 font-mono leading-relaxed">
                  Wszystkie koty hodowlane przebadane w kierunku HCM, PKD, SMA i regularne Echo serca.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#FEF9C3] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
                <span className="text-[10px] font-mono font-black text-[#854D0E] block mb-1 uppercase tracking-wider">04 // RELACJA</span>
                <h4 className="text-base font-black text-[#2A221F] font-editorial uppercase">Wsparcie Na Zawsze</h4>
                <p className="text-xs text-[#2A221F] mt-1 font-mono leading-relaxed">
                  Nowi opiekunowie mogą dzwonić o każdej porze. Zawsze służymy radą i wsparciem.
                </p>
              </div>
            </div>

          </div>

          {/* Right Photographic Triptych (6 cols) - Pastel Polaroid Album */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Main Master Photo Frame */}
            <div className="rounded-4xl overflow-hidden p-3.5 border-2.5 border-[#2A221F] bg-white shadow-[6px_6px_0px_#2A221F] relative group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden bg-[#FFE5D9] border-2 border-[#2A221F]">
                <Image
                  src={mainPhoto}
                  alt="Maine Coon na kanapie w salonie"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                
                <div className="absolute top-4 left-4 bg-[#FEF9C3] text-[#2A221F] px-4 py-1 rounded-full text-xs font-mono uppercase tracking-wider border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] font-black">
                  🛋️ SALON &bull; CODZIENNY RELAKS
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md text-[#2A221F] p-3.5 rounded-2xl text-xs border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] flex items-center justify-between font-mono font-bold">
                  <span>🐾 100% DOMOWYCH ZACHOWAŃ</span>
                  <span>WROCŁAW, POLSKA</span>
                </div>
              </div>
            </div>

            {/* Sub-spread: 2 candid photos with sticker effects */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="rounded-3xl p-3 border-2.5 border-[#2A221F] bg-white shadow-[4px_4px_0px_#2A221F] group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#E2F4E7] border border-[#2A221F]">
                  <Image
                    src={kidsPhoto}
                    alt="Kot Maine Coon z dzieckiem"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#FFE5D9] text-[#2A221F] px-2.5 py-1 rounded-xl text-[10px] font-mono font-black truncate text-center border border-[#2A221F] shadow-[1px_1px_0px_#2A221F]">
                    👶 Z DZIEĆMI OD URODZENIA
                  </div>
                </div>
              </div>

              <div className="rounded-3xl p-3 border-2.5 border-[#2A221F] bg-white shadow-[4px_4px_0px_#2A221F] group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#E0F2FE] border border-[#2A221F]">
                  <Image
                    src={dogPhoto}
                    alt="Kot Maine Coon i pies"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#E2F4E7] text-[#2A221F] px-2.5 py-1 rounded-xl text-[10px] font-mono font-black truncate text-center border border-[#2A221F] shadow-[1px_1px_0px_#2A221F]">
                    🐶 PRZYJAŹŃ Z PSEM
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
