"use client";

import React from "react";
import Image from "next/image";

interface BreedSectionProps {
  lang: "PL" | "EN";
}

const FEATURES = [
  {
    num: "12",
    unit: "kg",
    label: { PL: "Maksymalna masa", EN: "Max weight" },
    desc: { PL: "Masywna budowa, szeroka klatka piersiowa, potężne łapy z kępkami futra.", EN: "Massive build, broad chest, powerful snowshoe paws." },
  },
  {
    num: "40",
    unit: "cm",
    label: { PL: "Długość ogona", EN: "Tail length" },
    desc: { PL: "Puszysty pióropusz z charakterystyczną lwią kryzą na piersi.", EN: "Bushy tail with a distinctive lion ruff around the chest." },
  },
  {
    num: "15+",
    unit: "lat",
    label: { PL: "Długość życia", EN: "Lifespan" },
    desc: { PL: "Przy odpowiedniej opiece i badaniach — długowieczny, zdrowy towarzysz.", EN: "With proper care and testing — a long-lived, healthy companion." },
  },
];

export default function BreedSection({ lang }: BreedSectionProps) {
  return (
    <section id="rasa" className="bg-[#FAF9F6] text-zinc-900 overflow-hidden border-b border-zinc-200/80">

      {/* ── Intro ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12 reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-800 text-[11px] font-mono uppercase tracking-[0.25em] font-semibold mb-6">
          <span>{lang === "PL" ? "Wzorzec rasy FIFe" : "FIFe Breed Standard"}</span>
        </div>
        <h2
          className="font-heading font-light text-zinc-950 leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
        >
          Maine Coon.{" "}
          <br />
          <span className="font-semibold italic text-zinc-900">
            {lang === "PL" ? "Dlaczego go pokochasz." : "Why you will love them."}
          </span>
        </h2>
        <p className="mt-6 text-base sm:text-lg font-body text-zinc-600 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Pochodzący z surowego klimatu Ameryki Północnej łagodny olbrzym łączy w sobie potężne proporcje z charakterem oddanego, ciekawskiego przyjaciela całej rodziny."
            : "Originating from the rugged North American climate, this gentle giant combines powerful proportions with the devoted temperament of a loyal family companion."}
        </p>
      </div>

      {/* ── Zdjęcie w ramce Apple Glass ─────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-16">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 bg-zinc-100" style={{ height: "clamp(340px, 48vw, 620px)" }}>
          <Image
            src="/images/cats/cat_23.webp"
            alt="Majestatyczny Maine Coon z hodowli Koci Przyjaciel *PL w pełnym wymiarze"
            fill
            className="object-cover object-[50%_35%]"
            sizes="100vw"
          />
          {/* Subtelny overlay z napisem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-10 flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[10px] font-ui uppercase tracking-[0.25em] text-zinc-900 font-bold shadow-md">
              FIFe Standard · MCO
            </span>
            <span className="text-xs sm:text-sm font-body text-white/95 drop-shadow-md">
              {lang === "PL" ? "Potężna sylwetka, puszysty ogon i łagodny wzrok" : "Muscular build, flowing tail, and gentle gaze"}
            </span>
          </div>
        </div>
      </div>

      {/* ── 3 Duże liczby jak Apple ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="font-heading font-light text-zinc-950 leading-none"
                  style={{ fontSize: "clamp(3.2rem, 5vw, 4.5rem)" }}
                >
                  {feat.num}
                </span>
                <span className="text-xl font-body text-amber-600 font-semibold">{feat.unit}</span>
              </div>
              <div>
                <p className="text-xs font-ui uppercase tracking-widest text-zinc-500 font-bold mb-2">
                  {feat.label[lang]}
                </p>
                <p className="text-sm font-body text-zinc-600 leading-relaxed">
                  {feat.desc[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Cechy rasy — Apple Clean Cards Grid ────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
        <div className="border-t border-zinc-200 pt-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold mb-8">
            {lang === "PL" ? "CHARAKTER I PREDYSPOZYCJE" : "TEMPERAMENT & TRAITS"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { pl: "Kocha ludzi jak pies", en: "Loves people like a dog", desc: "Towarzyszy domownikom w każdym pokoju." },
              { pl: "Świetny z dziećmi", en: "Great with children", desc: "Wysoka cierpliwość i brak agresji." },
              { pl: "Tolerancyjny wobec psów", en: "Dog-friendly", desc: "Szybko odnajduje się w stadzie ze zwierzętami." },
              { pl: "Bardzo bystry i mądry", en: "Highly intelligent", desc: "Błyskawicznie uczy się komend i rutyn." },
              { pl: "Niezwykła łagodność", en: "Gentle nature", desc: "Zasłużone miano łagodnego olbrzyma (Gentle Giant)." },
              { pl: "Przynosi zabawki", en: "Fetches toys", desc: "Aportuje ulubione piłeczki i wędki." },
            ].map((trait, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white border border-zinc-200 shadow-sm hover:border-amber-500/40 transition-all flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-base font-heading font-medium text-zinc-900">
                    {lang === "PL" ? trait.pl : trait.en}
                  </span>
                </div>
                <p className="text-xs font-body text-zinc-500 pl-4">
                  {trait.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
