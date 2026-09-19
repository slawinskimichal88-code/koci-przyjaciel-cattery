"use client";

import React from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_FACEBOOK_URL, REAL_PHONE, REAL_PHONE_RAW, REAL_LOCATION } from "@/data/realCatsData";
import FacebookIcon from "@/components/FacebookIcon";
import { Phone, MapPin, ArrowUpRight, Heart, Sparkles } from "lucide-react";

interface FooterProps {
  lang: "PL" | "EN" | "DE";
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer id="stopka" className="bg-[#2A221F] text-[#FDFBF7] border-t-3 border-[#2A221F] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Logo (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#FFE5D9] shadow-[4px_4px_0px_#FFE5D9] bg-white shrink-0">
                <Image
                  src={REAL_LOGO}
                  alt="Logo Koci Przyjaciel PL"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#FDFBF7] font-editorial">
                    Koci Przyjaciel
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFE5D9] text-[#2A221F] font-mono font-black border border-[#2A221F]">
                    *PL
                  </span>
                </div>
                <p className="text-xs tracking-[0.2em] text-[#FFE5D9] uppercase font-mono font-bold mt-0.5">
                  FIFe &bull; FELIS POLONIA (FPL) &bull; EST. 2011
                </p>
              </div>
            </div>

            <p className="text-sm text-[#FDFBF7]/85 font-mono leading-relaxed max-w-md">
              Domowa hodowla kotów rasy Maine Coon z 15-letnią tradycją. 
              Zwierzęta wychowywane w sercu salonu z dziećmi i psem, 100% przebadane kardiologicznie i genetycznie (HCM, PKD, SMA N/N).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#E0F2FE] text-[#2A221F] hover:bg-[#BAE6FD] font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 border-2 border-[#2A221F] shadow-[3px_3px_0px_#FFE5D9] transition-all group"
              >
                <FacebookIcon className="w-4 h-4 fill-[#1877F2]" />
                <span>Społeczność Facebook (25k)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-5 py-2.5 rounded-xl bg-[#FFE5D9] text-[#2A221F] hover:bg-[#FFD4C2] font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 border-2 border-[#2A221F] shadow-[3px_3px_0px_#FFE5D9] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{REAL_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Official NAP Data (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-black text-[#FFE5D9] tracking-[0.2em] uppercase border-b-2 border-white/20 pb-2">
              LOKALIZACJA & KONTAKT BEZPOŚREDNI
            </h3>

            <div className="space-y-4 text-xs text-[#FDFBF7]/90 font-mono">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/20 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#FFE5D9]" />
                </div>
                <div>
                  <strong className="text-white block font-black uppercase tracking-wider text-sm">Lokalizacja hodowli:</strong>
                  <span className="text-sm">{REAL_LOCATION}</span>
                  <span className="block text-[11px] text-[#FDFBF7]/70 mt-1">
                    (Wizyty stacjonarne po wcześniejszym umówieniu telefonicznym)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/20 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#FFE5D9]" />
                </div>
                <div>
                  <strong className="text-white block font-black uppercase tracking-wider text-sm">Telefon do hodowcy:</strong>
                  <a
                    href={`tel:${REAL_PHONE_RAW}`}
                    className="font-mono text-[#FFE5D9] font-black hover:underline text-base tracking-wider"
                  >
                    {REAL_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-black text-[#FFE5D9] tracking-[0.2em] uppercase border-b-2 border-white/20 pb-2">
              SEKCJE STRONY
            </h3>

            <ul className="space-y-2 text-xs font-mono text-[#FDFBF7]/85 font-medium">
              <li>
                <a href="#grand-logo-hero" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  🐾 Otwarcie & Logo
                </a>
              </li>
              <li>
                <a href="#glowna-ekspozycja" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  🐾 Ekspozycja Kotów
                </a>
              </li>
              <li>
                <a href="#o-hodowli" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  🐾 Domowy Manifest
                </a>
              </li>
              <li>
                <a href="#koty" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  🐾 Kocury & Matki
                </a>
              </li>
              <li>
                <a href="#mioty" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  🐾 Dostępne Kocięta
                </a>
              </li>
              <li>
                <a href="#galeria-zapowiedz" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  📸 Galeria (105 Zdjęć)
                </a>
              </li>
              <li>
                <a href="#rodowod" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  📜 Rodowód FIFe / FPL
                </a>
              </li>
              <li>
                <a href="#zdrowie" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  🏥 Zdrowie & Genetyka N/N
                </a>
              </li>
              <li>
                <a href="#facebook" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  ⭐ Społeczność Facebook (25k)
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  💌 Ankieta & Kontakt
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFE5D9] flex items-center gap-1.5 transition-colors">
                  📚 Kompendium FAQ
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FDFBF7]/80">
          <div>
            &copy; {new Date().getFullYear()} Hodowla Kotów Maine Coon Koci Przyjaciel *PL. Wszelkie prawa zastrzeżone.
          </div>

          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded bg-white/10 text-[#FFE5D9]">FPL / FIFe Member</span>
            <span>&bull;</span>
            <a href={REAL_FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-[#E0F2FE] hover:underline">
              Facebook 25 000+
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
