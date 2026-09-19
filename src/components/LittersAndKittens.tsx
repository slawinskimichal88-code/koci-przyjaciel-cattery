"use client";

import React, { useState } from "react";
import Image from "next/image";
import { KITTEN_FEATURED, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { Phone, Sparkles, Heart, Crown } from "lucide-react";

interface Kitten {
  id: string;
  name: string;
  litter: string;
  gender: "male" | "female";
  ems: string;
  colorName: string;
  status: "available" | "option" | "reserved";
  quality: "pet" | "breeding";
  pricePln: number;
  priceEur: number;
  readyDate: string;
  image: string;
  personality: string;
}

const KITTENS: Kitten[] = [
  {
    id: "kitten-1",
    name: "Arthur Koci Przyjaciel *PL",
    litter: 'Miot "A" (Jesień 2026)',
    gender: "male",
    ems: "MCO ns 22",
    colorName: "Czarny srebrzysty klasyczny (Black silver classic)",
    status: "available",
    quality: "pet",
    pricePln: 4500,
    priceEur: 1200,
    readyDate: "Gotowy do odbioru",
    image: KITTEN_FEATURED[0]?.src || "/images/cats/cat_07.webp",
    personality: "Niezwykle odważny, wesoły i lgnący do człowieka maluch. Uwielbia zabawy z piórkiem i zasypianie na kolanach przy odrabianiu lekcji.",
  },
  {
    id: "kitten-2",
    name: "Amber Koci Przyjaciel *PL",
    litter: 'Miot "A" (Jesień 2026)',
    gender: "female",
    ems: "MCO d 22",
    colorName: "Ciepły rudy pręgowany (Red classic tabby)",
    status: "available",
    quality: "pet",
    pricePln: 4500,
    priceEur: 1200,
    readyDate: "Gotowa do odbioru",
    image: KITTEN_FEATURED[1]?.src || "/images/cats/cat_08.webp",
    personality: "Prawdziwa mała dama o aksamitnym, rudym futerku. Grucha przy głaskaniu i uwielbia być noszona na rękach niczym niemowlę.",
  },
  {
    id: "kitten-3",
    name: "Apollo Koci Przyjaciel *PL",
    litter: 'Miot "A" (Jesień 2026)',
    gender: "male",
    ems: "MCO n 22",
    colorName: "Dziko pręgowany lew (Black classic tabby)",
    status: "reserved",
    quality: "pet",
    pricePln: 4500,
    priceEur: 1200,
    readyDate: "Listopad 2026",
    image: KITTEN_FEATURED[2]?.src || "/images/cats/cat_09.webp",
    personality: "Największy kocur w miocie. Już teraz ma mocne łapy i szeroki pyszczek. Znalazł już kochający dom w Poznaniu.",
  },
  {
    id: "kitten-4",
    name: "Aria Koci Przyjaciel *PL",
    litter: 'Miot "A" (Jesień 2026)',
    gender: "female",
    ems: "MCO fs 09 22",
    colorName: "Srebrzysty szylkret z białym krawatem",
    status: "option",
    quality: "breeding",
    pricePln: 9500,
    priceEur: 3500,
    readyDate: "Grudzień 2026",
    image: KITTEN_FEATURED[3]?.src || "/images/cats/cat_10.webp",
    personality: "Wybitna budowa anatomiczna i zachwycający rysunek szaty. Pozostaje w obserwacji hodowlanej.",
  },
];

interface LittersProps {
  currency: "PLN" | "EUR";
  lang: "PL" | "EN" | "DE";
}

export default function LittersAndKittens({ currency, lang }: LittersProps) {
  const [filterGender, setFilterGender] = useState<"all" | "male" | "female">("all");

  const filtered = KITTENS.filter((k) => (filterGender === "all" ? true : k.gender === filterGender));

  const formatPrice = (kitten: Kitten) => {
    if (currency === "PLN") {
      return `${kitten.pricePln.toLocaleString("pl-PL")} PLN`;
    }
    return `€${kitten.priceEur.toLocaleString("en-US")}`;
  };

  return (
    <section id="mioty" className="py-20 sm:py-28 bg-[#FAF7FE] text-[#2A221F] border-b-2.5 border-[#2A221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#EFE6FD] text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black shadow-[3px_3px_0px_#2A221F]">
              05
            </span>
            <span className="text-[#2A221F] font-black uppercase tracking-widest text-xs">
              🐾 Dostępność &bull; Mioty & Maluchy
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Odbiór po 14 tyg.</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5D9] border border-[#2A221F]/40 text-[#2A221F]">Chip + Wyprawka</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#2A221F]/40 text-[#2A221F]">FIFe / FPL</span>
          </div>
        </div>

        {/* Section Headline with Exact Plan SEO Copy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-3 shadow-[2px_2px_0px_#2A221F]">
              <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Oficjalne Mioty FIFe &middot; Transparentna Dostępność
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.1] tracking-tight">
              Planowane mioty i kocięta <br />
              <span className="text-2xl sm:text-3xl font-normal italic text-[#2A221F]/80">(Na kolanka i do hodowli)</span>
            </h2>
            <p className="text-sm text-[#2A221F]/85 font-mono mt-4 leading-relaxed max-w-2xl">
              Na tej stronie regularnie aktualizujemy statusy naszych obecnych oraz planowanych skojarzeń. Ze względu na zapisy, 
              wiele z naszych maluchów otrzymuje status „Zarezerwowany” w pierwszych tygodniach życia, dlatego zachęcamy do wcześniejszego kontaktu. 
              Zgodnie z rygorystycznymi regulaminami FIFe, kocięta opuszczają nasz dom najwcześniej po ukończeniu 14. tygodnia życia – 
              w pełni zsocjalizowane, po kwarantannie poszczepiennej, z mikrochipem, 5-pokoleniowym rodowodem FPL i bogatą wyprawką.
            </p>
          </div>

          {/* Gender Filter with Cartoon Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-[#2A221F] shadow-[4px_4px_0px_#2A221F]">
            <button
              onClick={() => setFilterGender("all")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase cursor-pointer transition-all ${
                filterGender === "all"
                  ? "bg-[#FFE5D9] text-[#2A221F] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]"
                  : "bg-transparent text-[#2A221F]/70 hover:text-[#2A221F]"
              }`}
            >
              Wszystkie ({KITTENS.length})
            </button>
            <button
              onClick={() => setFilterGender("male")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase cursor-pointer transition-all ${
                filterGender === "male"
                  ? "bg-[#E0F2FE] text-[#2A221F] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]"
                  : "bg-transparent text-[#2A221F]/70 hover:text-[#2A221F]"
              }`}
            >
              ♂ Kocury
            </button>
            <button
              onClick={() => setFilterGender("female")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase cursor-pointer transition-all ${
                filterGender === "female"
                  ? "bg-[#EFE6FD] text-[#2A221F] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]"
                  : "bg-transparent text-[#2A221F]/70 hover:text-[#2A221F]"
              }`}
            >
              ♀ Kotki
            </button>
          </div>
        </div>

        {/* 2 Transparent Quality Segments from Official Cattery Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Pet Quality */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#FFE5D9] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-black px-3.5 py-1 bg-white text-[#2A221F] border-2 border-[#2A221F] rounded-full uppercase shadow-[2px_2px_0px_#2A221F]">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" /> Opcja Na Kolanka
              </span>
              <span className="text-xs font-mono font-bold text-[#2A221F]">
                3 500 – 5 500 PLN / 1 000 – 2 500 EUR
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F]">
              Pet Quality &ndash; Kochany Domowy Towarzysz
            </h3>
            <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
              Kocięta przeznaczone do kochania jako wspaniali, zsocjalizowani członkowie rodziny. 
              Opuszczają nasz dom po ukończeniu 14. tygodnia życia z rodowodem FPL (z adnotacją non-breeding) oraz obligatoryjnym obowiązkiem wczesnej kastracji.
            </p>
          </div>

          {/* Show/Breeding Quality */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#E0F2FE] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-black px-3.5 py-1 bg-white text-[#2A221F] border-2 border-[#2A221F] rounded-full uppercase shadow-[2px_2px_0px_#2A221F]">
                <Crown className="w-3.5 h-3.5 text-amber-600" /> Opcja Hodowlana
              </span>
              <span className="text-xs font-mono font-bold text-[#2A221F]">
                9 000 – 16 000 PLN / 5 500 – 8 000 EUR
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F]">
              Show / Breeding &ndash; Prawa Hodowlane & Wystawy
            </h3>
            <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
              Wyselekcjonowane okazy o wybitnym eksterierze, doskonałych proporcjach i czystym profilu genetycznym. 
              Dostępne wyłącznie dla zarejestrowanych i zaufanych hodowców w federacjach felinologicznych (FIFe / WCF).
            </p>
          </div>
        </div>

        {/* Kittens Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filtered.map((kitten) => {
            const isAvailable = kitten.status === "available";
            const isReserved = kitten.status === "reserved";
            const isOption = kitten.status === "option";

            return (
              <div
                key={kitten.id}
                className="rounded-3xl p-3.5 bg-white border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#FAF7FE] border-2 border-[#2A221F]">
                    <Image
                      src={kitten.image}
                      alt={kitten.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      {isAvailable && (
                        <span className="px-3 py-1 rounded-full bg-[#E2F4E7] text-[#164e29] border-2 border-[#2A221F] text-[10px] font-mono font-black shadow-[2px_2px_0px_#2A221F]">
                          🐾 WOLNY &bull; ADOPCJA
                        </span>
                      )}
                      {isReserved && (
                        <span className="px-3 py-1 rounded-full bg-[#EFE6FD] text-[#3b1262] border-2 border-[#2A221F] text-[10px] font-mono font-black shadow-[2px_2px_0px_#2A221F]">
                          ZAREZERWOWANY
                        </span>
                      )}
                      {isOption && (
                        <span className="px-3 py-1 rounded-full bg-[#FEF9C3] text-[#713f12] border-2 border-[#2A221F] text-[10px] font-mono font-black shadow-[2px_2px_0px_#2A221F]">
                          OBSERWACJA
                        </span>
                      )}
                    </div>

                    {/* Gender badge */}
                    <div className="absolute top-2.5 right-2.5 bg-white px-2.5 py-1 rounded-full text-[10px] font-mono text-[#2A221F] font-black border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                      {kitten.gender === "male" ? "♂ KOCUREK" : "♀ KOTKA"}
                    </div>

                    {/* Price strip */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-sm p-2 rounded-xl text-xs flex items-center justify-between border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                      <span className="font-mono text-[10px] text-[#2A221F]/80 uppercase font-bold">{kitten.readyDate}</span>
                      <strong className="font-mono text-xs font-black text-[#2A221F] bg-[#FFE5D9] px-2 py-0.5 rounded-md border border-[#2A221F]">
                        {formatPrice(kitten)}
                      </strong>
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="px-1 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#2A221F]/70 uppercase block">
                      {kitten.litter} &bull; {kitten.ems}
                    </span>
                    <h3 className="text-lg font-bold text-[#2A221F] font-editorial leading-snug">
                      {kitten.name}
                    </h3>
                    <p className="text-xs text-[#2A221F]/80 line-clamp-2 leading-relaxed">
                      {kitten.personality}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 mt-3 border-t-2 border-[#2A221F]/15 px-1">
                  {isAvailable ? (
                    <a
                      href={`tel:${REAL_PHONE_RAW}`}
                      className="w-full py-2.5 rounded-xl bg-[#FFE5D9] hover:bg-[#FFD7C7] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Zarezerwuj malucha</span>
                    </a>
                  ) : (
                    <a
                      href={`tel:${REAL_PHONE_RAW}`}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3E8FF] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Zapytaj o kolejny miot</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Adoption Standard Banner in Pastel Butter */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#FFF9E6] border-2.5 border-[#2A221F] shadow-[6px_6px_0px_#2A221F]">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#2A221F]/20 pb-5">
              <div>
                <span className="text-xs font-mono text-[#2A221F] font-black tracking-widest block uppercase">
                  ⭐ STANDARD HODOWLANY FIFE / FPL
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2A221F] font-editorial mt-1">
                  Co otrzymuje każdy kociak opuszczający nasz dom?
                </h3>
              </div>
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all flex items-center gap-2 shrink-0"
              >
                <span>Rozmowa z hodowcą: {REAL_PHONE}</span>
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#E2F4E7] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] space-y-1">
                <strong className="block text-[#2A221F] font-black font-mono text-[11px]">01 // RODOWÓD FPL/FIFe</strong>
                <p className="text-[#2A221F]/80 leading-relaxed">5-pokoleniowy rodowód uznawany na całym świecie. Prawdziwy Maine Coon.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#EFE6FD] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] space-y-1">
                <strong className="block text-[#2A221F] font-black font-mono text-[11px]">02 // CZIP & KSIĄŻECZKA</strong>
                <p className="text-[#2A221F]/80 leading-relaxed">Mikroczip Safe-Animal, komplet 2 szczepień, odrobaczenia i paszport.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFE5D9] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] space-y-1">
                <strong className="block text-[#2A221F] font-black font-mono text-[11px]">03 // WYPRAWKA PREMIUM</strong>
                <p className="text-[#2A221F]/80 leading-relaxed">Karma mokra/sucha, kocyk z zapachem mamy, ulubione zabawki i poradnik opieki.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#E0F2FE] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] space-y-1">
                <strong className="block text-[#2A221F] font-black font-mono text-[11px]">04 // UMOWA & ZDROWIE</strong>
                <p className="text-[#2A221F]/80 leading-relaxed">Przejrzysta umowa kupna-sprzedaży gwarantująca zdrowie. Bezpieczna kastracja.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
