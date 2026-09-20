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
    <section id="rasa" className="bg-[#0A0A0A] text-white overflow-hidden">

      {/* ── Intro ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-white/30 mb-6">
          {lang === "PL" ? "Rasa" : "The Breed"}
        </p>
        <h2
          className="font-heading font-light text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Maine Coon.{" "}
          <br />
          <span className="font-semibold italic">Dlaczego go pokochasz.</span>
        </h2>
      </div>

      {/* ── Full-bleed zdjęcie — Majestat rasy w plenerze ─────────────────── */}
      <div className="reveal w-full" style={{ height: "clamp(320px, 55vw, 650px)" }}>
        <div className="relative w-full h-full">
          <Image
            src="/images/cats/cat_23.webp"
            alt="Majestatyczny Maine Coon z hodowli Koci Przyjaciel *PL w pełnym wymiarze"
            fill
            className="object-cover object-[50%_35%]"
            sizes="100vw"
          />
          {/* Subtelny overlay z napisem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-6 sm:left-10 lg:left-16 flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-ui uppercase tracking-[0.3em] text-[#C8973B] font-bold">
              FIFe Standard · MCO
            </span>
            <span className="text-xs font-body text-white/80 hidden sm:inline-block">
              Potężna sylwetka, puszysty ogon i łagodny wzrok
            </span>
          </div>
        </div>
      </div>

      {/* ── 3 Duże liczby jak Apple ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8">
        {FEATURES.map((feat, i) => (
          <div
            key={i}
            className={`reveal reveal-delay-${i + 1} border-t border-white/10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-4 items-baseline`}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-heading font-light text-white leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                {feat.num}
              </span>
              <span className="text-xl sm:text-2xl font-body text-white/40">{feat.unit}</span>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-ui uppercase tracking-widest text-white/40 mb-1">{feat.label[lang]}</p>
              <p className="text-base sm:text-lg font-body text-white/65 leading-relaxed">{feat.desc[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Cechy rasy — lista Apple-style ────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-28">
        <div className="reveal border-t border-white/10 pt-10">
          <p className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/30 mb-8">
            {lang === "PL" ? "Właściwości" : "Characteristics"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5">
            {[
              lang === "PL" ? "Kocha ludzi jak pies" : "Loves people like a dog",
              lang === "PL" ? "świetny z dziećmi" : "Great with children",
              lang === "PL" ? "Tolerancyjny wobec psów" : "Dog-friendly",
              lang === "PL" ? "Bardzo mądry" : "Very intelligent",
              lang === "PL" ? "Niezwykła łagodność" : "Gentle nature",
              lang === "PL" ? "Przynosi zabawki jak retriever" : "Fetches toys like a retriever",
            ].map((trait, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex items-center gap-3 py-3 border-b border-white/5`}>
                <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                <span className="text-sm sm:text-base font-body text-white/70">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
