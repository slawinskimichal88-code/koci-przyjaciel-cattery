"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface PedigreeSectionProps {
  lang: "PL" | "EN";
}

interface Ancestor {
  id: string;
  name: string;
  role: { PL: string; EN: string };
  title: string;
  ems: string;
  weight?: string;
  hcm: string;
  image: string;
  generation: number;
}

const ANCESTORS: Ancestor[] = [
  {
    id: "g1-sire",
    name: "GIC. Lord Diamond Sylva *PL",
    role: { PL: "Główny Reproduktor (Ojciec)", EN: "Chief Sire (Father)" },
    title: "Grand International Champion (FIFe)",
    ems: "MCO ns 22 (Czarny srebrzysty pręgowany)",
    weight: "11.4 kg",
    hcm: "N/N Clear (Echo Doppler Certyfikat)",
    image: "/images/cats/cat_34.webp",
    generation: 1,
  },
  {
    id: "g2-father",
    name: "SC. Viking Storm of Nordic Lynx",
    role: { PL: "Dziadek (Linia Ojczysta)", EN: "Grandfather (Sire Line)" },
    title: "Supreme Champion (FIFe)",
    ems: "MCO ns 22",
    weight: "12.2 kg",
    hcm: "N/N Clear",
    image: "/images/matki/matka_07.webp",
    generation: 2,
  },
  {
    id: "g2-mother",
    name: "GIC. Freya Silver Mist *PL",
    role: { PL: "Babcia (Linia Ojczysta)", EN: "Grandmother (Sire Line)" },
    title: "Grand International Champion",
    ems: "MCO a (Niebieski solid)",
    weight: "7.8 kg",
    hcm: "N/N Clear",
    image: "/images/matki/matka_01.webp",
    generation: 2,
  },
  {
    id: "g3-ff",
    name: "World Ch. Thor the Giant",
    role: { PL: "Pradziadek (Linia Mistrzowska)", EN: "Great-Grandfather (World Champ Line)" },
    title: "World Champion (FIFe)",
    ems: "MCO n 22",
    weight: "12.8 kg",
    hcm: "N/N Clear",
    image: "/images/matki/matka_06.webp",
    generation: 3,
  },
  {
    id: "g3-fm",
    name: "EC. Astrid White Diamond",
    role: { PL: "Prababcia (Skandynawska Linia)", EN: "Great-Grandmother (Nordic Line)" },
    title: "Europa Champion",
    ems: "MCO w 62 (Biały solid)",
    weight: "8.1 kg",
    hcm: "N/N Clear / BAER Test Obustronny",
    image: "/images/matki/matka_03.webp",
    generation: 3,
  },
];

export default function PedigreeSection({ lang }: PedigreeSectionProps) {
  const [selectedId, setSelectedId] = useState<string>("g1-sire");
  const current = ANCESTORS.find((a) => a.id === selectedId) || ANCESTORS[0];

  return (
    <section id="rodowod" className="bg-black text-[#f5f5f7] overflow-hidden border-b border-white/[0.08] scroll-mt-24">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 reveal">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium mb-6">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[#f5f5f7]">{lang === "PL" ? "Drzewo Genealogiczne · FIFe" : "FIFe Pedigree & Bloodlines"}</span>
        </div>
        <h2
          className="font-heading font-light text-[#f5f5f7] leading-[0.95] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
        >
          Czyste linie.<br />
          <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
            {lang === "PL" ? "Pokolenia championów." : "Generations of champions."}
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg font-body text-[#86868b] max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Prawdziwy rodowód FPL/FIFe to pewność charakteru, wielkości i zdrowia. Brak przypadkowych kryć, czyste linie genetyczne i przodkowie z najwyższymi tytułami światowymi."
            : "An authentic FPL/FIFe pedigree certifies temperament, majestic stature, and verified health. Zero undocumented crossings and generations of Supreme and World Champions."}
        </p>
      </div>

      {/* ── Interactive Pedigree Showcase ────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lewo: Drzewo / Lista przodków */}
          <div className="lg:col-span-6 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] mb-4 font-medium">
              {lang === "PL" ? "Wybierz przodka, aby sprawdzić metrykę:" : "Select an ancestor to view pedigree sheet:"}
            </p>

            {ANCESTORS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 rounded-[20px] cursor-pointer flex items-center justify-between group shadow-sm ${
                    isSelected
                      ? "bg-white text-black border-white shadow-lg ring-2 ring-white/40"
                      : "bg-[#161617] text-[#f5f5f7] border-white/[0.08] hover:border-white/20 hover:bg-[#1d1d1f]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                        isSelected ? "text-amber-600" : "text-amber-400"
                      }`}>
                        {item.role[lang]} · Gen {item.generation}
                      </span>
                      <h4 className={`text-base sm:text-lg font-heading font-medium leading-snug ${
                        isSelected ? "text-black font-semibold" : "text-[#f5f5f7]"
                      }`}>
                        {item.name}
                      </h4>
                      <p className={`text-xs font-body ${
                        isSelected ? "text-zinc-600" : "text-[#86868b]"
                      }`}>
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${
                    isSelected ? "text-black translate-x-1" : "text-[#86868b] group-hover:translate-x-1 group-hover:text-white"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Prawo: Wizytówka przodka / Karta Certyfikatu */}
          <div className="lg:col-span-6 bg-[#161617] border border-white/[0.08] p-6 sm:p-8 rounded-[28px] shadow-xl">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] mb-6 bg-black">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur-md">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{current.title}</span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
                  {current.role[lang]}
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#f5f5f7]">
                  {current.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] text-sm">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] mb-0.5 font-medium">
                    {lang === "PL" ? "Kod EMS (Umaszczenie)" : "EMS Code (Coat)"}
                  </p>
                  <p className="font-mono text-[#f5f5f7] text-xs font-semibold">{current.ems}</p>
                </div>
                {current.weight && (
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] mb-0.5 font-medium">
                      {lang === "PL" ? "Masa ciała" : "Weight"}
                    </p>
                    <p className="font-heading text-lg font-light text-[#f5f5f7]">{current.weight}</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] mb-0.5 font-medium">
                    {lang === "PL" ? "Profil Kardiologiczny & DNA" : "Cardiology & DNA Panel"}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-ui text-emerald-400 font-semibold mt-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{current.hcm}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl mt-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#f5f5f7] font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{lang === "PL" ? "Standard Felis Polonia (FPL / FIFe)" : "Felis Polonia Standard (FPL / FIFe)"}</span>
                </div>
                <p className="text-xs text-[#86868b] font-body leading-relaxed font-light">
                  {lang === "PL"
                    ? "Wszystkie kojarzenia w hodowli Koci Przyjaciel są planowane z wyprzedzeniem pod kątem zachowania unikatowego typu rasy oraz zerowego współczynnika pokrewieństwa."
                    : "All matings at Koci Przyjaciel are planned with mathematical care to ensure breed standard perfection and complete genetic diversity."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
