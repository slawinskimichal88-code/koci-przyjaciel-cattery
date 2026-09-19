"use client";

import React from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_FACEBOOK_URL, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import FacebookIcon from "@/components/FacebookIcon";
import { ArrowUpRight, Phone, Sparkles, Heart } from "lucide-react";

interface FacebookCommunityProps {
  lang: "PL" | "EN" | "DE";
}

export default function FacebookCommunitySection({ lang }: FacebookCommunityProps) {
  return (
    <section id="facebook" className="py-20 sm:py-28 bg-[#F0F8FF] text-[#2A221F] border-b-2.5 border-[#2A221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14 text-xs font-mono uppercase tracking-widest text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E0F2FE] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
              08
            </span>
            <div className="flex items-center gap-2">
              <FacebookIcon className="w-4 h-4 fill-[#1877F2]" />
              <span className="text-[#2A221F] font-black">Społeczność Facebook &bull; Klub Koci Przyjaciel</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-bold text-xs text-[#2A221F]/70">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">25 000+ Obserwujących</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Relacje Wideo</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5D9] border border-[#2A221F]/40 text-[#2A221F]">Wrocław</span>
          </div>
        </div>

        {/* Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Official Logo & Club Stats (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="flex items-center gap-5">
              {/* Official Logo Medallion */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] bg-white shrink-0">
                <Image
                  src={REAL_LOGO}
                  alt="Logo Koci Przyjaciel PL"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#2A221F] bg-[#E2F4E7] px-2 py-0.5 rounded-md border border-[#2A221F]">
                    Oficjalny Profil Hodowli
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F] tracking-tight">
                  Hodowla Kotów Maine Coon Koci Przyjaciel PL
                </h3>
                <p className="text-xs font-mono font-bold text-[#2A221F]/80">
                  Felis Polonia &bull; FIFe &bull; Wrocław
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF9C3] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="font-mono text-xs font-black text-[#2A221F]">Największa kocia rodzina w Polsce</span>
              </div>

              <h4 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#2A221F] leading-none">
                25 000+
                <span className="block text-lg sm:text-2xl font-normal text-[#2A221F]/80 font-editorial italic mt-2">
                  miłośników rasy i rodzin naszych kociąt na Facebooku.
                </span>
              </h4>

              <p className="text-sm sm:text-base text-[#2A221F]/85 leading-relaxed font-mono">
                Nasz profil to żywy dowód tego, jak traktujemy nasze koty. Codziennie publikujemy 
                relacje wideo ze wspólnych zabaw maluchów z dziećmi i psem, transmisje na żywo, 
                zdjęcia z wystaw oraz opinie i pozdrowienia od setek zadowolonych opiekunów z całego świata.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-mono text-xs font-black uppercase tracking-wider border-2.5 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] transition-all flex items-center justify-center gap-2.5 group cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <FacebookIcon className="w-4 h-4 fill-white" />
                <span>Odwiedź nas na Facebooku (25k)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2.5 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] transition-all flex items-center justify-center gap-2.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>Zadzwoń: {REAL_PHONE}</span>
              </a>
            </div>

          </div>

          {/* Right: Highlights Pastel Cartoon Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="rounded-3xl p-6 bg-[#E2F4E7] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-black text-[#2A221F]">
                <span>🎥 RELACJE WIDEO LIVE</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#2A221F] text-[10px]">CODZIENNIE</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A221F]/85 leading-relaxed font-mono">
                Zobacz kociaki podczas biegania po salonie, zabawy z piórkiem i odpoczynku na kolanach. Zero inscenizacji.
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-[#FEF9C3] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-black text-[#2A221F]">
                <span>⭐ OPINIE OPIEKUNÓW</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#2A221F] text-[10px]">5.0 / 5.0 GWIAZDEK</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A221F]/85 leading-relaxed font-mono">
                Setki zdjęć podrośniętych olbrzymów przesłanych przez rodziny z Warszawy, Krakowa, Wrocławia, Niemiec i UK.
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-[#FFE5D9] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-black text-[#2A221F]">
                <span>💬 BEZPOŚREDNI KONTAKT</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#2A221F] text-[10px]">SZYBKA ODPOWIEDŹ</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A221F]/85 leading-relaxed font-mono">
                Odpisujemy na wiadomości prywatne na Facebooku lub odbieramy telefon bezpośrednio: <strong>{REAL_PHONE}</strong>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
