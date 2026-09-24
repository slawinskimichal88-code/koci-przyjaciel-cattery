"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_INSTAGRAM_URL, REAL_LOCATION } from "@/data/realCatsData";

interface FooterProps {
  lang?: "PL" | "EN";
  setLang?: (l: "PL" | "EN") => void;
}

export default function Footer({ lang = "PL" }: FooterProps) {
  const year = new Date().getFullYear();

  const footerNav = [
    {
      title: lang === "PL" ? "Główne Zakładki" : "Main Navigation",
      items: [
        { label: lang === "PL" ? "Strona Główna" : "Home", href: "/" },
        { label: lang === "PL" ? "O hodowli" : "About Us", href: "/o-nas" },
        { label: lang === "PL" ? "Dostępne Kociaki" : "Available Kittens", href: "/dostepne-kociaki" },
        { label: lang === "PL" ? "Baza Wiedzy" : "Knowledge Base", href: "/baza-wiedzy" },
        { label: lang === "PL" ? "Kontakt & Wizyty" : "Contact & Visit", href: "/kontakt" },
      ],
    },
    {
      title: lang === "PL" ? "Wiedza & Narzędzia" : "Knowledge & Tools",
      items: [
        { label: lang === "PL" ? "Kalkulator Kosztów & Wyprawka" : "Cost Calculator", href: "/baza-wiedzy?tab=kalkulator" },
        { label: lang === "PL" ? "Wzorzec rasy Maine Coon" : "Breed Standard", href: "/baza-wiedzy?tab=wzorzec" },
        { label: lang === "PL" ? "Porównanie wymiarów (Skala)" : "Scale Comparison", href: "/baza-wiedzy?tab=skala" },
        { label: lang === "PL" ? "Zdrowie & Badania HCM" : "Heart Health & HCM", href: "/baza-wiedzy?tab=zdrowie" },
        { label: lang === "PL" ? "Najczęstsze pytania (FAQ)" : "FAQ", href: "/baza-wiedzy?tab=faq" },
      ],
    },
    {
      title: lang === "PL" ? "Hodowla & Certyfikaty" : "Cattery & Certs",
      items: [
        { label: "FIFe / Felis Polonia (FPL)", href: "/kocieta#rodowod" },
        { label: "Badania Laboklin N/N", href: "/baza-wiedzy#zdrowie" },
        { label: "Profilaktyka Echo Doppler", href: "/baza-wiedzy#zdrowie" },
        { label: "Społeczność Facebook (26k+)", href: REAL_FACEBOOK_URL, isExternal: true },
        { label: "Instagram @koci_przyjaciel_pl", href: REAL_INSTAGRAM_URL, isExternal: true },
      ],
    },
  ];

  return (
    <footer className="bg-[#0D0D0F] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* Kolumna 1: Brand & Logo */}
          <div className="space-y-4 md:pr-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div
                className="relative w-11 h-11 rounded-full overflow-hidden border border-white/30 shrink-0 shadow-md group-hover:border-white transition-all"
                style={{ position: "relative", width: 44, height: 44 }}
              >
                <Image
                  src={REAL_LOGO}
                  alt="Koci Przyjaciel PL"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-base font-heading font-medium text-white group-hover:text-amber-200 transition-colors">
                  Koci Przyjaciel <span className="italic text-xs font-serif text-amber-300">*PL</span>
                </p>
                <p className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
                  FIFe · FPL · Wrocław
                </p>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 font-body font-light leading-relaxed">
              {lang === "PL"
                ? "Certyfikowana domowa hodowla kotów rasy Maine Coon. Życie w salonie z dziećmi i psem, bezpieczny wybieg ogrodowy, 100% czystość genetyczna."
                : "Certified home cattery of Maine Coon cats in Wrocław. Free home life with kids and dog, outdoor aviary, 100% genetic health."}
            </p>
          </div>

          {/* Puste miejsce, aby zachować padding jeśli to konieczne lub usunięto całkowicie nawigację zgodnie z prośbą o sam telefon. */}

        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-zinc-400">
          <p>
            © {year} Koci Przyjaciel *PL. Wszelkie prawa zastrzeżone.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href={`tel:${REAL_PHONE_RAW}`} className="hover:text-white transition-colors font-mono">
              tel: {REAL_PHONE}
            </a>
            <span>{REAL_LOCATION}</span>
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              Facebook ↗
            </a>
            <a
              href={REAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              Instagram ↗
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
