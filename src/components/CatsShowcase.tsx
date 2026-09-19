"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MATKI_PHOTOS, GALLERY_PHOTOS, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { X, ArrowRight, Phone } from "lucide-react";

interface Cat {
  id: string;
  name: string;
  title: string;
  role: "king" | "queen";
  ems: string;
  colorName: string;
  weight: string;
  tests: {
    hcm: string;
    pkd: string;
    sma: string;
    echo: string;
    felvFiv: string;
  };
  image: string;
  description: string;
}

const CATS: Cat[] = [
  {
    id: "queen-1",
    name: "Astra Koci Przyjaciel *PL",
    title: "International Champion (IC)",
    role: "queen",
    ems: "MCO fs 22",
    colorName: "Czarna szylkretka srebrzysta (Black tortie silver tabby)",
    weight: "7.6 kg",
    tests: {
      hcm: "N/N (Czysty wynik DNA)",
      pkd: "N/N (Wolny)",
      sma: "N/N (Wolny)",
      echo: "Serce Prawidłowe (2026 - Doppler)",
      felvFiv: "Ujemny (-)",
    },
    image: MATKI_PHOTOS[0]?.src || "/images/matki/matka_01.webp",
    description: "Cudowna, filarowa matka naszych miotów. Niesamowicie troskliwa, łagodna i przyjacielska. Kocha wylegiwać się w słońcu na salonowej kanapie.",
  },
  {
    id: "king-1",
    name: "Lord Diamond Koci Przyjaciel *PL",
    title: "Grand International Champion (GIC)",
    role: "king",
    ems: "MCO ns 22",
    colorName: "Czarny srebrzysty pręgowany klasycznie",
    weight: "11.4 kg",
    tests: {
      hcm: "N/N (Czysty wynik DNA)",
      pkd: "N/N (Wolny)",
      sma: "N/N (Wolny)",
      echo: "Prawidłowe (Certyfikowane USG serca)",
      felvFiv: "Ujemny (-)",
    },
    image: GALLERY_PHOTOS[2]?.src || "/images/cats/cat_03.webp",
    description: "Potężny, majestatyczny kocur o lwich proporcjach, gęstej kryzie i gołębim sercu. Zasypia przytulony do dzieci niczym pluszowy miś.",
  },
  {
    id: "queen-2",
    name: "Bella Koci Przyjaciel *PL",
    title: "Champion (CH)",
    role: "queen",
    ems: "MCO d 22",
    colorName: "Ciepły rudy klasycznie pręgowany",
    weight: "7.2 kg",
    tests: {
      hcm: "N/N (Czysty)",
      pkd: "N/N (Czysty)",
      sma: "N/N (Wolny)",
      echo: "Prawidłowe bez zmian",
      felvFiv: "Ujemny (-)",
    },
    image: MATKI_PHOTOS[1]?.src || "/images/matki/matka_02.webp",
    description: "Ciepła, ruda kotka o jedwabistym, długim włosiu. Spokojna, zrównoważona, wspaniała przewodniczka po domowych zakamarkach.",
  },
  {
    id: "queen-3",
    name: "Crystal Koci Przyjaciel *PL",
    title: "Kotka Hodowlana (FPL)",
    role: "queen",
    ems: "MCO n 22",
    colorName: "Klasyczny dziko pręgowany (Black classic tabby)",
    weight: "8.0 kg",
    tests: {
      hcm: "N/N (Czysty)",
      pkd: "N/N (Czysty)",
      sma: "N/N (Wolny)",
      echo: "Czyste echo serca",
      felvFiv: "Ujemny (-)",
    },
    image: MATKI_PHOTOS[2]?.src || "/images/matki/matka_03.webp",
    description: "Imponujący profil, wysokie uszy z rysimi pędzlami. Matka zdrowych, dorodnych kociąt o wspaniałym, psim temperamencie.",
  },
  {
    id: "king-2",
    name: "Thor Koci Przyjaciel *PL",
    title: "Champion (CH)",
    role: "king",
    ems: "MCO a 09",
    colorName: "Aksamitny błękit z białym krawatem",
    weight: "10.8 kg",
    tests: {
      hcm: "N/N (Czysty)",
      pkd: "N/N (Czysty)",
      sma: "N/N (Wolny)",
      echo: "Prawidłowe",
      felvFiv: "Ujemny (-)",
    },
    image: GALLERY_PHOTOS[5]?.src || "/images/cats/cat_06.webp",
    description: "Aksamitne, błękitne futro i hipnotyzujące spojrzenie. Uwielbia zabawy z piórkiem i asystowanie przy codziennych pracach w kuchni.",
  },
  {
    id: "queen-4",
    name: "Luna Koci Przyjaciel *PL",
    title: "Kotka Hodowlana (FPL)",
    role: "queen",
    ems: "MCO ns 09 22",
    colorName: "Srebrzysta pręgowana z białym",
    weight: "7.4 kg",
    tests: {
      hcm: "N/N (Czysty)",
      pkd: "N/N (Czysty)",
      sma: "N/N (Wolny)",
      echo: "Prawidłowe",
      felvFiv: "Ujemny (-)",
    },
    image: MATKI_PHOTOS[3]?.src || "/images/matki/matka_04.webp",
    description: "Duma naszej domowej hodowli. Niezwykle kontaktowa, odzywa się cichym gruchaniem i uwielbia być czesana.",
  },
];

export default function CatsShowcase({ lang }: { lang: "PL" | "EN" | "DE" }) {
  const [filter, setFilter] = useState<"all" | "king" | "queen">("all");
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  const filtered = CATS.filter((c) => (filter === "all" ? true : c.role === filter));

  return (
    <section id="koty" className="py-24 sm:py-32 border-b-2 border-black relative overflow-hidden bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-16 text-xs font-mono uppercase tracking-widest text-black">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-black text-white font-mono text-xs font-black">04</span>
            <span className="text-black font-black">KOTY HODOWLANE // REPRODUKTORY & MATKI</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 font-bold">
            <span>RODOWODY FIFE / FPL</span>
            <span>&bull;</span>
            <span>100% WOLNE OD HCM (N/N)</span>
            <span>&bull;</span>
            <span>WROCŁAW</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono font-black text-black tracking-[0.25em] block mb-2 uppercase">
              [ DOROSŁE KOTY HODOWLANE &middot; PROFIL GENETYCZNY ]
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black font-editorial leading-[1.02] tracking-tight uppercase">
              Kocury i Matki Hodowlane.
            </h2>
          </div>
          
          {/* Pastel Cartoon Filter Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider cursor-pointer transition-all border-2 border-[#2A221F] ${
                filter === "all" ? "bg-[#FFE5D9] text-[#2A221F] shadow-[3px_3px_0px_#2A221F]" : "bg-white text-[#2A221F] hover:bg-[#FFE5D9]/60 shadow-[1px_1px_0px_#2A221F]"
              }`}
            >
              Wszystkie ({CATS.length})
            </button>
            <button
              onClick={() => setFilter("king")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider cursor-pointer transition-all border-2 border-[#2A221F] ${
                filter === "king" ? "bg-[#E2F4E7] text-[#166534] shadow-[3px_3px_0px_#2A221F]" : "bg-white text-[#2A221F] hover:bg-[#E2F4E7]/60 shadow-[1px_1px_0px_#2A221F]"
              }`}
            >
              👑 Kocury Olbrzymy (2)
            </button>
            <button
              onClick={() => setFilter("queen")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider cursor-pointer transition-all border-2 border-[#2A221F] ${
                filter === "queen" ? "bg-[#EFE6FD] text-[#6B21A8] shadow-[3px_3px_0px_#2A221F]" : "bg-white text-[#2A221F] hover:bg-[#EFE6FD]/60 shadow-[1px_1px_0px_#2A221F]"
              }`}
            >
              🌸 Matki Hodowlane (4)
            </button>
          </div>
        </div>

        {/* Dossier Cards Grid - Pastel Cartoon Aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="rounded-4xl p-4 sm:p-5 bg-white border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#2A221F] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#FFE5D9] border-2 border-[#2A221F]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  
                  {/* Top Spec Stamps */}
                  <div className="absolute top-3 left-3 bg-[#FEF9C3] text-[#2A221F] px-3.5 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                    {cat.role === "king" ? "👑 KOCUR" : "🌸 MATKA"}
                  </div>

                  <div className="absolute top-3 right-3 px-3.5 py-1 rounded-full bg-white text-[#2A221F] text-xs font-mono font-black border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                    ⚖️ {cat.weight}
                  </div>

                  {/* Bottom EMS Code */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#FDFBF7] text-[#2A221F] px-3.5 py-1.5 rounded-2xl text-xs font-mono font-bold flex items-center justify-between border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                    <span>{cat.ems}</span>
                    <span>FIFe &bull; FPL</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="px-1 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#2A221F] font-editorial">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#E88A72] uppercase">
                    {cat.title} &bull; {cat.colorName}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6B5E59] font-mono line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Health Check Pill */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-xl border border-[#2A221F] bg-[#E2F4E7] text-[#166534] font-bold shadow-[1px_1px_0px_#2A221F]">
                      ✓ HCM: N/N
                    </span>
                    <span className="px-2.5 py-1 rounded-xl border border-[#2A221F] bg-[#E0F2FE] text-[#0369A1] font-bold shadow-[1px_1px_0px_#2A221F]">
                      ✓ Echo serca N/N
                    </span>
                    <span className="px-2.5 py-1 rounded-xl border border-[#2A221F] bg-[#FEF9C3] text-[#854D0E] font-bold shadow-[1px_1px_0px_#2A221F]">
                      ✓ PKD / SMA N/N
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t-2 border-[#2A221F]/15 px-1">
                <button
                  onClick={() => setSelectedCat(cat)}
                  className="w-full py-3 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🐾 Zobacz profil i badania DNA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Cat Dossier Modal - Pastel Cartoon Aesthetic */}
      {selectedCat && (
        <div
          className="fixed inset-0 z-50 bg-[#2A221F]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCat(null)}
        >
          <div
            className="bg-[#FDFBF7] text-[#2A221F] rounded-4xl max-w-2xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_#2A221F] border-3 border-[#2A221F] space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-[#2A221F] pb-4">
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#E88A72] block">
                  🐾 PROFIL HODOWLANY &middot; FELIS POLONIA / FIFE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2A221F] font-editorial mt-0.5">
                  {selectedCat.name}
                </h3>
                <p className="text-xs font-mono text-[#6B5E59] mt-0.5">
                  {selectedCat.title} &bull; Kod EMS: <strong>{selectedCat.ems}</strong> &bull; Waga: <strong>{selectedCat.weight}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedCat(null)}
                className="p-2 rounded-2xl border-2 border-[#2A221F] bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] cursor-pointer transition-colors shadow-[2px_2px_0px_#2A221F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FFE5D9] border-2 border-[#2A221F]">
                <Image src={selectedCat.image} alt={selectedCat.name} fill className="object-cover" />
              </div>
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-[#2A221F] font-mono leading-relaxed">
                  {selectedCat.description}
                </p>
                <div className="p-4 rounded-2xl bg-[#EFE6FD] border-2 border-[#2A221F] text-xs space-y-1 font-mono shadow-[2px_2px_0px_#2A221F]">
                  <div className="flex justify-between">
                    <span>Umaszczenie:</span>
                    <strong className="text-right text-[#2A221F]">{selectedCat.colorName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Księga rodowodowa:</span>
                    <strong className="text-[#2A221F]">FIFe LO FPL</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Certified Health Tests Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-[#2A221F]">
                🐾 CERTYFIKOWANE WYNIKI BADAŃ WETERYNARYJNYCH:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-2xl border-2 border-[#2A221F] bg-[#E2F4E7] flex items-center justify-between shadow-[2px_2px_0px_#2A221F]">
                  <span>HCM (Serce):</span>
                  <strong className="text-[#166534] font-black">{selectedCat.tests.hcm}</strong>
                </div>
                <div className="p-3 rounded-2xl border-2 border-[#2A221F] bg-[#E2F4E7] flex items-center justify-between shadow-[2px_2px_0px_#2A221F]">
                  <span>PKD (Nerki):</span>
                  <strong className="text-[#166534] font-black">{selectedCat.tests.pkd}</strong>
                </div>
                <div className="p-3 rounded-2xl border-2 border-[#2A221F] bg-[#E2F4E7] flex items-center justify-between shadow-[2px_2px_0px_#2A221F]">
                  <span>SMA (Mięśnie):</span>
                  <strong className="text-[#166534] font-black">{selectedCat.tests.sma}</strong>
                </div>
                <div className="p-3 rounded-2xl border-2 border-[#2A221F] bg-[#E2F4E7] flex items-center justify-between shadow-[2px_2px_0px_#2A221F]">
                  <span>Echo Doppler:</span>
                  <strong className="text-[#166534] font-black">{selectedCat.tests.echo}</strong>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t-2 border-[#2A221F] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#2A221F] font-mono">
                Planujesz kociaka po tym kocie?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${REAL_PHONE_RAW}`}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{REAL_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
