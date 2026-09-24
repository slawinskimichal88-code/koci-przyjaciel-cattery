"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  REAL_LOGO,
  REAL_PHONE,
  REAL_PHONE_RAW,
  REAL_FACEBOOK_URL,
  REAL_INSTAGRAM_URL,
  REAL_LOCATION,
} from "@/data/realCatsData";
import { Phone, MapPin, ShieldCheck, Heart } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

interface FooterProps {
  lang?: "PL" | "EN";
  setLang?: (l: "PL" | "EN") => void;
}

export default function Footer({ lang = "PL" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#09090B] text-white border-t border-white/10 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        
        {/* Główna sekcja z logo, danymi kontaktowymi i federacją */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
          
          {/* Brand & Podstawowe Dane */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden border border-white/30 shrink-0 shadow-md group-hover:border-white transition-all bg-black/40"
              >
                <Image
                  src={REAL_LOGO}
                  alt="Koci Przyjaciel PL"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-lg font-heading font-medium text-white group-hover:text-amber-200 transition-colors">
                  Koci Przyjaciel <span className="italic text-xs font-serif text-amber-300">*PL</span>
                </p>
                <p className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase">
                  FIFe · Felis Polonia (FPL) · Wrocław
                </p>
              </div>
            </Link>
          </div>

          {/* Bezpośredni Telefon & Social Media */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            {/* Przycisk Telefonu */}
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-ui font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-900" />
              <span>{REAL_PHONE}</span>
            </a>

            {/* Facebook */}
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-ui transition-all"
              title="Profil Facebook"
            >
              <FacebookIcon className="w-4 h-4 fill-current text-[#1877F2]" />
              <span className="hidden sm:inline">Facebook</span>
            </a>

            {/* Instagram */}
            <a
              href={REAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs font-ui transition-all"
              title="Profil Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-[#E4405F]" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>

        {/* Dolna linijka: Lokalizacja, status prawny i prawa autorskie */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-zinc-400 text-center sm:text-left font-light">
          <div className="flex items-center gap-2 text-zinc-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{REAL_LOCATION}</span>
          </div>

          <p className="text-[11px] text-zinc-500">
            © {year} Koci Przyjaciel *PL. Domowa hodowla kotów rasy Maine Coon.
          </p>
        </div>

      </div>
    </footer>
  );
}
