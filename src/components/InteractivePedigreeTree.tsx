"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS, MATKI_PHOTOS } from "@/data/realCatsData";
import { ChevronRight, CheckCircle2, Sparkles, Award } from "lucide-react";

interface Ancestor {
  id: string;
  name: string;
  title: string;
  ems: string;
  weight?: string;
  hcm: string;
  photo: string;
  generation: 1 | 2 | 3;
}

const SIRE_LINEAGE: Ancestor[] = [
  {
    id: "g1",
    name: "GIC. Lord Diamond Sylva *PL",
    title: "Grand International Champion",
    ems: "MCO ns 22",
    weight: "11.4 kg",
    hcm: "N/N Clear (Echo Doppler)",
    photo: GALLERY_PHOTOS[2]?.src || "/images/cats/cat_03.webp",
    generation: 1,
  },
  {
    id: "g2-father",
    name: "SC. Viking Storm of Nordic Lynx",
    title: "Supreme Champion (FIFe)",
    ems: "MCO ns 22",
    weight: "12.0 kg",
    hcm: "N/N Clear",
    photo: GALLERY_PHOTOS[0]?.src || "/images/cats/cat_01.webp",
    generation: 2,
  },
  {
    id: "g2-mother",
    name: "GIC. Freya Silver Mist *PL",
    title: "Grand International Champion",
    ems: "MCO fs 22",
    weight: "7.8 kg",
    hcm: "N/N Clear",
    photo: MATKI_PHOTOS[0]?.src || "/images/matki/matka_01.webp",
    generation: 2,
  },
  {
    id: "g3-ff",
    name: "World Ch. Thor the Giant",
    title: "World Champion (FIFe)",
    ems: "MCO n 22",
    weight: "12.8 kg",
    hcm: "N/N Clear",
    photo: GALLERY_PHOTOS[3]?.src || "/images/cats/cat_04.webp",
    generation: 3,
  },
  {
    id: "g3-fm",
    name: "IC. Astrid of Snow Forest",
    title: "International Champion",
    ems: "MCO fs 22",
    weight: "7.5 kg",
    hcm: "N/N Clear",
    photo: MATKI_PHOTOS[1]?.src || "/images/matki/matka_02.webp",
    generation: 3,
  },
  {
    id: "g3-mf",
    name: "GIC. King Arthur Black Pearl",
    title: "Grand International Champion",
    ems: "MCO ns",
    weight: "11.5 kg",
    hcm: "N/N Clear",
    photo: GALLERY_PHOTOS[4]?.src || "/images/cats/cat_05.webp",
    generation: 3,
  },
  {
    id: "g3-mm",
    name: "CH. Bella Luna Silver",
    title: "Champion",
    ems: "MCO ns 09",
    weight: "7.2 kg",
    hcm: "N/N Clear",
    photo: MATKI_PHOTOS[2]?.src || "/images/matki/matka_03.webp",
    generation: 3,
  },
];

export default function InteractivePedigreeTree({ lang }: { lang: "PL" | "EN" | "DE" }) {
  const [selectedAncestor, setSelectedAncestor] = useState<Ancestor>(SIRE_LINEAGE[0]);

  return (
    <section id="rodowod" className="py-20 sm:py-28 bg-[#F4F7FC] text-[#2A221F] border-b-2.5 border-[#2A221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E0F2FE] text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black shadow-[3px_3px_0px_#2A221F]">
              06
            </span>
            <span className="text-[#2A221F] font-black uppercase tracking-widest text-xs">
              📜 Rodowód FIFe / FPL &bull; 5 Pokoleń Przodków
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">Baza Felis Polonia</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Hologram FPL</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FEF9C3] border border-[#2A221F]/40 text-[#2A221F]">100% Czyste Linie</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-3 shadow-[2px_2px_0px_#2A221F]">
              <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Międzynarodowy Standard Felinologiczny &middot; FIFe
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight">
              Pięciopokoleniowy Rodowód FPL <br />
              <span className="text-2xl sm:text-3xl font-normal italic text-[#2A221F]/80">– Interaktywne Drzewo Genealogiczne.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2A221F]/85 max-w-md leading-relaxed font-mono">
            Wybierz przodka na drzewie, aby sprawdzić jego tytuły wystawowe, kod EMS oraz certyfikowane wyniki badań kardiologicznych potwierdzających czystość i zdrowie linii.
          </p>
        </div>

        {/* Tree Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Interactive Tree (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 space-y-6 bg-white border-2.5 border-[#2A221F] shadow-[6px_6px_0px_#2A221F]">
            <div className="flex items-center justify-between border-b-2 border-[#2A221F]/15 pb-4">
              <span className="text-xs font-mono font-bold text-[#2A221F] uppercase">
                🌳 Struktura Linii Rodowodowej (FIFe)
              </span>
              <span className="text-[10px] font-mono font-black px-3 py-1 rounded-full bg-[#E2F4E7] text-[#164e29] border border-[#2A221F]">
                100% Czyste linie
              </span>
            </div>

            {/* Gen 1: Root */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#2A221F]/70 block uppercase">
                01 // Pokolenie I &bull; Kocur Hodowlany
              </span>
              <div
                onClick={() => setSelectedAncestor(SIRE_LINEAGE[0])}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedAncestor.id === "g1"
                    ? "bg-[#FFE5D9] text-[#2A221F] border-[#2A221F] shadow-[4px_4px_0px_#2A221F]"
                    : "bg-[#FDFBF7] text-[#2A221F] border-[#2A221F]/30 hover:border-[#2A221F] hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF7FE] shrink-0 border-2 border-[#2A221F]">
                    <Image src={SIRE_LINEAGE[0].photo} alt={SIRE_LINEAGE[0].name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#2A221F]/80 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" /> {SIRE_LINEAGE[0].title}
                    </span>
                    <h4 className="text-sm font-bold font-editorial text-[#2A221F]">{SIRE_LINEAGE[0].name}</h4>
                    <span className="text-[10px] font-mono text-[#2A221F]/70">{SIRE_LINEAGE[0].ems} &bull; {SIRE_LINEAGE[0].weight}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#2A221F]" />
              </div>
            </div>

            {/* Gen 2: Parents */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#2A221F]/70 block uppercase">
                02 // Pokolenie II &bull; Rodzice (Dziadkowie Miotu)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SIRE_LINEAGE.slice(1, 3).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedAncestor(cat)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      selectedAncestor.id === cat.id
                        ? "bg-[#E0F2FE] text-[#2A221F] border-[#2A221F] shadow-[4px_4px_0px_#2A221F]"
                        : "bg-[#FDFBF7] text-[#2A221F] border-[#2A221F]/30 hover:border-[#2A221F] hover:bg-white"
                    }`}
                  >
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#FAF7FE] shrink-0 border-2 border-[#2A221F]">
                      <Image src={cat.photo} alt={cat.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono font-bold text-[#2A221F]/70 block truncate">{cat.title}</span>
                      <h4 className="text-xs font-bold font-editorial text-[#2A221F] truncate">{cat.name}</h4>
                      <span className="text-[10px] font-mono text-[#2A221F]/70">{cat.ems}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gen 3: Great-Grandparents */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#2A221F]/70 block uppercase">
                03 // Pokolenie III &bull; Pradziadkowie (World Champions)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SIRE_LINEAGE.slice(3, 7).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedAncestor(cat)}
                    className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedAncestor.id === cat.id
                        ? "bg-[#EFE6FD] text-[#2A221F] border-[#2A221F] shadow-[3px_3px_0px_#2A221F]"
                        : "bg-[#FDFBF7] text-[#2A221F] border-[#2A221F]/30 hover:border-[#2A221F] hover:bg-white"
                    }`}
                  >
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#FAF7FE] mb-2 border border-[#2A221F]">
                      <Image src={cat.photo} alt={cat.name} fill className="object-cover" />
                    </div>
                    <h5 className="text-[11px] font-bold font-editorial text-[#2A221F] truncate">{cat.name}</h5>
                    <span className="text-[9px] font-mono text-[#2A221F]/70 block truncate">{cat.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Details Card (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-[#FFF9E6] border-2.5 border-[#2A221F] space-y-5 shadow-[6px_6px_0px_#2A221F]">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border-2 border-[#2A221F]">
              <Image
                src={selectedAncestor.photo}
                alt={selectedAncestor.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-white text-[#2A221F] text-[10px] px-3 py-1 rounded-full font-mono font-black border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                ⚖️ {selectedAncestor.weight || "7.5+ kg"}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-[#2A221F]/70 block uppercase">
                {selectedAncestor.title}
              </span>
              <h3 className="text-xl font-black text-[#2A221F] font-editorial mt-0.5">
                {selectedAncestor.name}
              </h3>
              <p className="text-xs text-[#2A221F]/80 font-mono mt-1">
                Kod EMS: <strong className="text-[#2A221F]">{selectedAncestor.ems}</strong>
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t-2 border-[#2A221F]/15 text-xs font-mono">
              <div className="flex items-center justify-between text-[#2A221F]/80">
                <span>Status HCM:</span>
                <span className="font-bold text-[#164e29] bg-[#E2F4E7] px-2 py-0.5 rounded border border-[#2A221F] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {selectedAncestor.hcm}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#2A221F]/80">
                <span>Baza Rodowodowa:</span>
                <span className="font-mono text-[#2A221F] font-bold">PawPeds / FPL Verified</span>
              </div>
              <div className="flex items-center justify-between text-[#2A221F]/80">
                <span>Pokolenie:</span>
                <span className="font-bold text-[#2A221F]">Gen {selectedAncestor.generation}</span>
              </div>
            </div>

            <p className="text-xs text-[#2A221F]/80 leading-relaxed pt-2">
              Dzięki zachowaniu czystości linii i wielopokoleniowemu doborowi par hodowlanych wykluczamy
              wady wrodzone i zapewniamy stabilny, łagodny charakter.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
