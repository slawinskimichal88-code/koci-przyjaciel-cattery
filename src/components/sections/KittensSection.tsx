"use client";

import React, { useState } from "react";
import Image from "next/image";
import { KITTEN_FEATURED } from "@/data/realCatsData";
import { ArrowRight } from "lucide-react";

interface KittensSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: (name?: string) => void;
}

const KITTENS = [
  {
    id: "luna",
    name: "Luna *PL",
    gender: "female" as const,
    color: "Czarny klasycznie pręgowany (MCO n 22)",
    status: "available" as const,
    image: "/images/cats/cat_07.webp",
    desc: "Czuła, odważna kotka o jedwabistej szacie i wspaniałym, otwartym charakterze.",
  },
  {
    id: "leo",
    name: "Leo *PL",
    gender: "male" as const,
    color: "Czarny srebrzysty klasyczny (MCO ns 22)",
    status: "available" as const,
    image: "/images/cats/cat_08.webp",
    desc: "Prawdziwy mały lew z potężnymi pędzlami na uszach i masywną budową łap.",
  },
  {
    id: "arthur",
    name: "Arthur *PL",
    gender: "male" as const,
    color: "Czarny dymny (MCO ns)",
    status: "reserved" as const,
    image: "/images/cats/cat_18.webp",
    desc: "Wybitny profil anatomiczny i głębokie spojrzenie. Znalazł kochający dom.",
  },
  {
    id: "yuki",
    name: "Yuki *PL",
    gender: "female" as const,
    color: "Śnieżnobiały solid (MCO w 62)",
    status: "available" as const,
    image: "/images/cats/cat_10.webp",
    desc: "Aksamitna biała szata, bursztynowe oczy i niezwykle przytulaśna natura.",
  },
];

export default function KittensSection({ lang, onOpenReservation }: KittensSectionProps) {
  const [active, setActive] = useState(0);
  const kitten = KITTENS[active];

  return (
    <section id="kocieta" className="bg-white text-black overflow-hidden">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-12 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "Kocięta" : "Kittens"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Poznaj<br />
          <span className="font-semibold italic">nasze kocięta.</span>
        </h2>
      </div>

      {/* ── Duży showcase — Apple split layout ───────────────────── */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "clamp(400px, 60vw, 700px)" }}>

        {/* Lewo: wielkie zdjęcie */}
        <div className="relative w-full" style={{ minHeight: "clamp(300px, 50vw, 650px)" }}>
          {KITTENS.map((k, i) => (
            <div
              key={k.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Image
                src={k.image}
                alt={k.name}
                fill
                className="object-cover object-[50%_20%]"
                sizes="50vw"
              />
            </div>
          ))}
          {/* Status badge */}
          <div className="absolute top-6 left-6 z-10">
            <span className={`text-[10px] font-ui uppercase tracking-[0.3em] px-3 py-1.5 font-bold ${
              kitten.status === "available"
                ? "bg-white text-black"
                : "bg-black/70 text-white/60"
            }`}>
              {kitten.status === "available"
                ? (lang === "PL" ? "Dostępny" : "Available")
                : (lang === "PL" ? "Zarezerwowany" : "Reserved")}
            </span>
          </div>
        </div>

        {/* Prawo: informacje */}
        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[#F8F8F8]">

          {/* Nawigacja — tab buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {KITTENS.map((k, i) => (
              <button
                key={k.id}
                onClick={() => setActive(i)}
                className={`text-xs font-ui uppercase tracking-wider px-4 py-2 transition-all cursor-pointer ${
                  i === active
                    ? "bg-black text-white"
                    : "text-black/40 hover:text-black"
                }`}
              >
                {k.name.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Info o kociaku */}
          <div className="flex-1">
            <div
              className="font-heading font-light text-black leading-none mb-3 transition-all duration-500"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {kitten.name}
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/35 mb-5">
              {kitten.gender === "female" ? "♀" : "♂"} · {kitten.color}
            </p>
            <p className="text-base sm:text-lg font-body text-black/60 leading-relaxed mb-8">
              {kitten.desc}
            </p>

            {/* Lista */}
            {["Rodowód FIFe / FPL", "Chip Safe-Animal", "Szczepienia + odrobaczenie", "Dożywotnia opieka hodowcy"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-black/5">
                <div className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
                <span className="text-sm font-body text-black/60">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            {kitten.status === "available" && (
              <button
                onClick={() => onOpenReservation(kitten.name)}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-black text-white text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-colors cursor-pointer"
              >
                <span>{lang === "PL" ? "Zarezerwuj" : "Reserve"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            <button
              onClick={() => onOpenReservation()}
              className="text-xs font-ui uppercase tracking-wider text-black/40 hover:text-black transition-colors cursor-pointer"
            >
              {lang === "PL" ? "Zapytaj o listę oczekujących →" : "Join waiting list →"}
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
