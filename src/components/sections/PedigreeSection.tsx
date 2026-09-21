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
    <section id="rodowod" className="bg-[#FAF9F6] text-zinc-900 overflow-hidden border-b border-zinc-200/80">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12 reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-800 text-[11px] font-mono uppercase tracking-[0.25em] font-semibold mb-6">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          <span>{lang === "PL" ? "Drzewo Genealogiczne · FIFe" : "FIFe Pedigree & Bloodlines"}</span>
        </div>
        <h2
          className="font-heading font-light text-zinc-950 leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
        >
          Czyste linie.<br />
          <span className="font-semibold italic text-zinc-900">
            {lang === "PL" ? "Pokolenia championów." : "Generations of champions."}
          </span>
        </h2>
        <p className="mt-6 text-base sm:text-lg font-body text-zinc-600 max-w-2xl leading-relaxed">
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
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-4 font-bold">
              {lang === "PL" ? "Wybierz przodka, aby sprawdzić metrykę:" : "Select an ancestor to view pedigree sheet:"}
            </p>

            {ANCESTORS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 rounded-xl cursor-pointer flex items-center justify-between group shadow-sm ${
                    isSelected
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-md ring-2 ring-zinc-900/10"
                      : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                        isSelected ? "text-amber-400" : "text-amber-700"
                      }`}>
                        {item.role[lang]} · Gen {item.generation}
                      </span>
                      <h4 className={`text-base sm:text-lg font-heading font-medium leading-snug ${
                        isSelected ? "text-white font-semibold" : "text-zinc-900"
                      }`}>
                        {item.name}
                      </h4>
                      <p className={`text-xs font-body ${
                        isSelected ? "text-zinc-300" : "text-zinc-500"
                      }`}>
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${
                    isSelected ? "text-white translate-x-1" : "text-zinc-400 group-hover:translate-x-1 group-hover:text-zinc-700"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Prawo: Wizytówka przodka / Karta Certyfikatu */}
          <div className="lg:col-span-6 bg-white border border-zinc-200 p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 mb-6 bg-zinc-100">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/85 border border-white/20 text-[10px] font-ui uppercase tracking-widest text-white backdrop-blur-md">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{current.title}</span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-700 font-bold block mb-1">
                  {current.role[lang]}
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-normal text-zinc-950">
                  {current.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 text-sm">
                <div>
                  <p className="text-[11px] font-ui uppercase tracking-wider text-zinc-500 mb-0.5 font-semibold">
                    {lang === "PL" ? "Kod EMS (Umaszczenie)" : "EMS Code (Coat)"}
                  </p>
                  <p className="font-mono text-zinc-900 text-xs font-semibold">{current.ems}</p>
                </div>
                {current.weight && (
                  <div>
                    <p className="text-[11px] font-ui uppercase tracking-wider text-zinc-500 mb-0.5 font-semibold">
                      {lang === "PL" ? "Masa ciała" : "Weight"}
                    </p>
                    <p className="font-heading text-lg font-light text-zinc-900">{current.weight}</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <p className="text-[11px] font-ui uppercase tracking-wider text-zinc-500 mb-0.5 font-semibold">
                    {lang === "PL" ? "Profil Kardiologiczny & DNA" : "Cardiology & DNA Panel"}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-ui text-emerald-700 font-semibold mt-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{current.hcm}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl mt-6">
                <div className="flex items-center gap-2 text-xs font-ui uppercase tracking-widest text-zinc-900 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>{lang === "PL" ? "Standard Felis Polonia (FPL / FIFe)" : "Felis Polonia Standard (FPL / FIFe)"}</span>
                </div>
                <p className="text-xs text-zinc-600 font-body leading-relaxed">
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
