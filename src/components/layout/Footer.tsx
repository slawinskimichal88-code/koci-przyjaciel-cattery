"use client";

import React from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_LOCATION } from "@/data/realCatsData";

interface FooterProps {
  lang?: "PL" | "EN";
  setLang?: (l: "PL" | "EN") => void;
}

export default function Footer({ lang = "PL", setLang }: FooterProps) {
  const year = new Date().getFullYear();

  const links = [
    { label: lang === "PL" ? "Wybieg & Dom" : "Enclosure", href: "#wybieg" },
    { label: lang === "PL" ? "O nas" : "About", href: "#o-nas" },
    { label: lang === "PL" ? "Rasa" : "Breed", href: "#rasa" },
    { label: lang === "PL" ? "Kocięta" : "Kittens", href: "#kocieta" },
    { label: lang === "PL" ? "Rodzice" : "Parents", href: "#rodzice" },
    { label: lang === "PL" ? "Zdrowie DNA" : "Health DNA", href: "#zdrowie" },
    { label: lang === "PL" ? "Rodowód FPL" : "Pedigree", href: "#rodowod" },
    { label: lang === "PL" ? "Proces Adopcji" : "Adoption", href: "#jak-kupic" },
    { label: lang === "PL" ? "Kalkulator Kosztów" : "Costs", href: "#kalkulator" },
    { label: lang === "PL" ? "Opinie" : "Reviews", href: "#opinie" },
    { label: lang === "PL" ? "Galeria" : "Gallery", href: "#galeria" },
    { label: lang === "PL" ? "FAQ" : "FAQ", href: "#faq" },
    { label: lang === "PL" ? "Kontakt" : "Contact", href: "#kontakt" },
  ];

  return (
    <footer className="bg-white text-black border-t border-black/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-10 mb-16">

          {/* Logo + tagline */}
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shrink-0">
              <Image src={REAL_LOGO} alt="Koci Przyjaciel PL" fill className="object-cover grayscale" />
            </div>
            <div>
              <p className="text-sm font-heading font-medium text-black">Koci Przyjaciel *PL</p>
              <p className="text-xs font-ui text-black/35 tracking-widest uppercase">FIFe · FPL · Wrocław</p>
            </div>
          </div>

          {/* Nav linki */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-ui uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="border-t border-black/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-ui text-black/25 tracking-wider">
            © {year} Koci Przyjaciel *PL — Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href={`tel:${REAL_PHONE_RAW}`} className="text-xs font-ui text-black/35 hover:text-black transition-colors">
              {REAL_PHONE}
            </a>
            <a href={REAL_FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-ui text-black/35 hover:text-black transition-colors uppercase tracking-wider">
              Facebook
            </a>
            <span className="text-xs font-ui text-black/25">{REAL_LOCATION}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
