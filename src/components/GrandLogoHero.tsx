"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_FACEBOOK_URL, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import FacebookIcon from "@/components/FacebookIcon";
import { ArrowDown, Phone, ArrowUpRight, Sparkles, Heart } from "lucide-react";

interface GrandLogoHeroProps {
  onOpenGallery?: () => void;
}

export default function GrandLogoHero({ onOpenGallery }: GrandLogoHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="grand-logo-hero"
      className="relative min-h-screen bg-gradient-to-b from-[#FFF5EB] via-[#FDFBF7] to-[#F3E8FF] text-[#2A221F] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden border-b-2.5 border-[#2A221F]"
    >
      {/* Playful Pastel Dotted / Cloud Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#2A221F_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Cute Floating Cartoon Badges in Corners */}
      <div className="hidden md:flex absolute top-28 left-8 p-3 rounded-2xl bg-[#FFE5D9] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] -rotate-3 items-center gap-2 text-xs font-mono font-bold animate-cute-float">
        <span>🐾</span>
        <span>Łagodne Olbrzymy</span>
      </div>
      <div className="hidden md:flex absolute top-36 right-8 p-3 rounded-2xl bg-[#E2F4E7] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] rotate-3 items-center gap-2 text-xs font-mono font-bold animate-cute-float" style={{ animationDelay: "1.5s" }}>
        <span>🏡</span>
        <span>Bez Klatek &bull; W Salonie</span>
      </div>

      {/* Top Heritage Kicker */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-[#2A221F] bg-[#FEF9C3] text-xs font-mono uppercase tracking-wider text-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
          <span className="w-2 h-2 rounded-full bg-[#E88A72] animate-ping" />
          <span className="font-black">DOMOWA HODOWLA FELIS POLONIA &bull; FIFE &bull; EST. 2011</span>
        </div>
      </div>

      {/* Centerpiece: Monumental Animated Logo + Authentic SEO Headline */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 my-auto py-6">
        
        {/* BIG ANIMATED LOGO MEDALLION IN PASTEL CARTOON FRAME */}
        <div className="relative inline-block mx-auto mb-2">
          {/* Outermost Dashed Pastel Ring */}
          <div
            className={`absolute -inset-6 sm:-inset-10 rounded-full border-2.5 border-dashed border-[#E88A72] animate-[spin_40s_linear_infinite] transition-all duration-1000 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />

          {/* Inner Counter-Rotating Ring */}
          <div
            className={`absolute -inset-3 sm:-inset-5 rounded-full border-2 border-dotted border-[#9B72DE] animate-[spin_25s_linear_infinite_reverse] transition-all duration-1000 delay-150 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />

          {/* Warm Pastel Glow Aura */}
          <div className="absolute -inset-2 rounded-full bg-[#FFE5D9] blur-xl opacity-80 pointer-events-none" />

          {/* The Big Logo Medallion Frame */}
          <div
            className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-3 border-[#2A221F] bg-[#FFE5D9] shadow-[8px_8px_0px_#2A221F] transition-all duration-1000 ease-out transform ${
              mounted
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-50 -rotate-12"
            }`}
          >
            <Image
              src={REAL_LOGO}
              alt="Oficjalne Logo Hodowli Koci Przyjaciel PL"
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Bottom Official Seal Badge - Pastel Butter Yellow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#FEF9C3] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#2A221F] border-2 border-[#2A221F] shrink-0 whitespace-nowrap flex items-center gap-1.5">
            <span>🐾 MAINE COON &bull; 100% CZYSTE LINIE</span>
          </div>
        </div>

        {/* Authentic SEO Headline & Narrative from Official Plan */}
        <div
          className={`space-y-4 transition-all duration-1000 delay-300 transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#2A221F] font-editorial leading-[1.05] uppercase max-w-4xl mx-auto">
            Hodowla kotów Maine Coon <br className="hidden sm:inline" />
            <span className="text-[#E88A72] font-editorial italic font-normal">– Koci Przyjaciel (FIFe / FPL)</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-mono text-[#2A221F] max-w-3xl mx-auto leading-relaxed pt-1">
            Witamy w hodowli Koci Przyjaciel. Jesteśmy w pełni legalną, domową hodowlą wielkich kotów rasy Maine Coon, 
            zrzeszoną w Polskiej Federacji Felinologicznej „Felis Polonia” (FPL), działającej pod auspicjami federacji FIFe. 
            Nasza hodowla to nie jest zimne przedsięwzięcie komercyjne – to przede wszystkim nasz dom, 
            w którym kocięta od pierwszych dni życia przebywają w samym centrum naszej rodziny.
          </p>

          <p className="text-xs sm:text-sm font-mono text-[#6B5E59] max-w-3xl mx-auto leading-relaxed">
            Wspólnie z partnerką wkładamy całe serce w codzienną opiekę, pielęgnację i socjalizację maluchów u boku trójki dzieci oraz naszego domowego psa. 
            Dzięki temu nasze kocięta opuszczają dom wybitnie ufne, odważne i doskonale zsocjalizowane. 
            Dzielimy się naszą pasją z ponad 25-tysięczną społecznością na Facebooku, stawiając na wspaniały, stabilny charakter i żelazne zdrowie.
          </p>
        </div>

        {/* Playful Pastel Cartoon Action Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3.5 pt-4 transition-all duration-1000 delay-500 transform ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#mioty"
            className="px-7 py-3.5 rounded-full bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] transition-all cursor-pointer flex items-center gap-2"
          >
            <span>🐱 Dostępne Kocięta</span>
          </a>

          {onOpenGallery ? (
            <button
              onClick={onOpenGallery}
              className="px-7 py-3.5 rounded-full bg-[#E2F4E7] hover:bg-[#C8EAD1] text-[#166534] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>📷 Galeria Kotów (105)</span>
            </button>
          ) : (
            <a
              href="#galeria"
              className="px-7 py-3.5 rounded-full bg-[#E2F4E7] hover:bg-[#C8EAD1] text-[#166534] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] transition-all cursor-pointer"
            >
              📷 Galeria Kotów (105)
            </a>
          )}

          <a
            href={`tel:${REAL_PHONE_RAW}`}
            className="px-6 py-3.5 rounded-full bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#2A221F] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#854D0E]" />
            <span>{REAL_PHONE}</span>
          </a>

          <a
            href={REAL_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] transition-all flex items-center gap-2"
          >
            <FacebookIcon className="w-4 h-4 fill-[#0369A1]" />
            <span>Facebook (25k)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 text-center pt-4">
        <a
          href="#glowna-ekspozycja"
          className="inline-flex flex-col items-center gap-2 text-[#2A221F] hover:text-[#E88A72] transition-colors group cursor-pointer"
        >
          <span className="text-xs font-mono tracking-[0.2em] uppercase font-black">
            🐾 ODKRYJ NASZE KOTY PONIŻEJ 🐾
          </span>
          <div className="w-9 h-9 rounded-full border-2 border-[#2A221F] bg-white shadow-[2px_2px_0px_#2A221F] flex items-center justify-center group-hover:translate-y-1 transition-transform">
            <ArrowDown className="w-4 h-4 text-[#2A221F] animate-bounce" />
          </div>
        </a>
      </div>

    </section>
  );
}
