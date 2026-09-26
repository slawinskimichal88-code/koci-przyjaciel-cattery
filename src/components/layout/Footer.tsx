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

interface FooterProps {
  lang?: "PL" | "EN";
  setLang?: (l: "PL" | "EN") => void;
}

export default function Footer({ lang = "PL" }: FooterProps) {
  const year = new Date().getFullYear();

  const footerDirectory = [
    {
      title: lang === "PL" ? "Odkryj Hodowlę" : "Explore Cattery",
      links: [
        { label: "Strona Główna", href: "/" },
        { label: "O nas & Filozofia", href: "/o-nas" },
        { label: "Galeria kocurów i kotek", href: "/galeria" },
        { label: "Dostępne Kociaki", href: "/dostepne-kociaki" },
        { label: "Wybieg & Woliera", href: "/#wybieg" },
        { label: "Baza Wiedzy & Poradnik", href: "/baza-wiedzy" },
      ],
    },
    {
      title: lang === "PL" ? "Zdrowie & Wzorzec" : "Health & Standards",
      links: [
        { label: "Standard rasy Maine Coon", href: "/baza-wiedzy#wzorzec" },
        { label: "Echo Doppler serca HCM", href: "/baza-wiedzy#zdrowie" },
        { label: "Testy genetyczne Laboklin", href: "/baza-wiedzy#zdrowie" },
        { label: "Czystość genetyczna N/N", href: "/baza-wiedzy#zdrowie" },
        { label: "Certyfikacja FIFe / FPL", href: "/kocieta#rodowod" },
      ],
    },
    {
      title: lang === "PL" ? "Wiedza & Narzędzia" : "Knowledge & Tools",
      links: [
        { label: "Skala porównawcza 1:1", href: "/#porownanie" },
        { label: "Kalkulator kosztów utrzymania", href: "/kalkulator" },
        { label: "Wyprawka dla kociaka", href: "/baza-wiedzy" },
        { label: "Odpowiedzi na pytania (FAQ)", href: "/baza-wiedzy" },
      ],
    },
    {
      title: lang === "PL" ? "Kontakt & Społeczność" : "Connect & Visit",
      links: [
        { label: `Zadzwoń: ${REAL_PHONE}`, href: `tel:${REAL_PHONE_RAW}` },
        { label: "Facebook (26k+ fanów)", href: REAL_FACEBOOK_URL, isExternal: true },
        { label: "Instagram @koci_przyjaciel_pl", href: REAL_INSTAGRAM_URL, isExternal: true },
        { label: `Lokalizacja: ${REAL_LOCATION}`, href: "/kontakt" },
        { label: "Formularz rezerwacji", href: "/kontakt" },
      ],
    },
  ];

  return (
    <footer className="bg-[#111112] text-[#86868b] border-t border-white/[0.08] pt-12 pb-14 text-[12px] font-body selection:bg-[#2997ff] selection:text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── SEKCJA 1: APPLE FOOTNOTES (Notatki wyjaśniające i status hodowli) ── */}
        <div className="pb-8 space-y-2 text-[#86868b] text-[11px] leading-relaxed border-b border-[#2d2d2f]">
          <p>
            1. Hodowla Koci Przyjaciel *PL jest w pełni zarejestrowana w Polskiej Federacji Felinologicznej (Felis Polonia – FPL), będącej największym w Polsce członkiem Fédération Internationale Féline (FIFe). Każdy kociak otrzymuje oficjalny 5-pokoleniowy rodowód honorowany na całym świecie.
          </p>
          <p>
            2. Wszystkie koty hodowlane przechodzą regularne badania kardiologiczne (Echo Doppler w kierunku kardiomiopatii przerostowej HCM) oraz certyfikowane testy DNA w laboratorium Laboklin na obecność HCM, PKD i SMA z wynikiem N/N (wolne od mutacji).
          </p>
          <p>
            3. Koty mieszkają w domu razem z naszą rodziną, dziećmi i psem. Mają stały, bezpieczny dostęp do całorocznej woliery ogrodowej. Hodowla wolna od klatek.
          </p>
        </div>

        {/* ── SEKCJA 2: APPLE DIRECTORY (4 eleganckie kolumny linków) ── */}
        <nav aria-label="Katalog odnośników" className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-[#2d2d2f]">
          {footerDirectory.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-[12px] font-semibold text-[#f5f5f7] tracking-[-0.01em]">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#86868b] hover:text-[#f5f5f7] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{link.label}</span>
                        <span className="text-[10px] opacity-70">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[#86868b] hover:text-[#f5f5f7] transition-colors block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── SEKCJA 3: PODSUMOWANIE BRANDU I DOLNA LINIA PRAWNA ── */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#86868b]">
          
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20 shrink-0 bg-black">
              <Image
                src={REAL_LOGO}
                alt="Koci Przyjaciel PL"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span>
              Copyright © {year} Koci Przyjaciel *PL. Wszelkie prawa zastrzeżone.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/kontakt" className="hover:text-[#f5f5f7] transition-colors">
              Prywatność i bezpieczeństwo
            </Link>
            <span className="text-[#333336]">|</span>
            <Link href="/kontakt" className="hover:text-[#f5f5f7] transition-colors">
              Zasady rezerwacji
            </Link>
            <span className="text-[#333336]">|</span>
            <Link href="/baza-wiedzy" className="hover:text-[#f5f5f7] transition-colors">
              Baza wiedzy felinologicznej
            </Link>
            <span className="text-[#333336]">|</span>
            <span className="text-[#f5f5f7]/90 font-medium">
              Polska · Wrocław
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
