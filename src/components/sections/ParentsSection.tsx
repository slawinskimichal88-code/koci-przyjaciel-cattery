"use client";

import React from "react";
import Image from "next/image";
import { MATKI_PHOTOS, GALLERY_PHOTOS } from "@/data/realCatsData";

interface ParentsSectionProps {
  lang: "PL" | "EN";
}

export default function ParentsSection({ lang }: ParentsSectionProps) {
  const mama = MATKI_PHOTOS[0]?.src || "/images/cats/cat_01.webp";
  const tata = GALLERY_PHOTOS[20]?.src || "/images/cats/cat_21.webp";

  return (
    <section id="rodzice" className="bg-[#0A0A0A] text-white overflow-hidden">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-white/30 mb-6">
          {lang === "PL" ? "Rodzice hodowlani" : "Breeding parents"}
        </p>
        <h2
          className="font-heading font-light text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Nasze koty<br />
          <span className="font-semibold italic">hodowlane.</span>
        </h2>
      </div>

      {/* ── Split: Mama | Tata ───────────────────────────────────── */}
      <div className="reveal grid grid-cols-1 md:grid-cols-2">

        {/* ♀ Mama */}
        <div className="relative group" style={{ minHeight: "clamp(350px, 50vw, 650px)" }}>
          <Image
            src={mama}
            alt="Mama — kotka hodowlana Maine Coon"
            fill
            className="object-cover object-top grayscale brightness-75 group-hover:brightness-90 group-hover:grayscale-[80%] transition-all duration-700"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/40 block mb-2">♀ Mama</span>
            <div
              className="font-heading font-light text-white"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Matka hodowlana
            </div>
            <div className="mt-4 space-y-1">
              {["HCM Echo: Negatywna", "DNA SMA: N/N", "DNA PKD: N/N", "Rodowód FIFe 5 pokoleń"].map((cert, i) => (
                <p key={i} className="text-xs font-ui text-white/45 tracking-wider">{cert}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ♂ Tata */}
        <div className="relative group" style={{ minHeight: "clamp(350px, 50vw, 650px)" }}>
          <Image
            src={tata}
            alt="Tata — kocur hodowlany Maine Coon"
            fill
            className="object-cover object-top grayscale brightness-75 group-hover:brightness-90 group-hover:grayscale-[80%] transition-all duration-700"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/40 block mb-2">♂ Tata</span>
            <div
              className="font-heading font-light text-white"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Własny reproduktor
            </div>
            <div className="mt-4 space-y-1">
              {["HCM Echo: Negatywny", "DNA HCM1-A31P: N/N", "DNA SMA: N/N", "Waga: 10+ kg"].map((cert, i) => (
                <p key={i} className="text-xs font-ui text-white/45 tracking-wider">{cert}</p>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Podsum. zdrowia ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="reveal border-t border-white/10 pt-12 grid grid-cols-1 sm:grid-cols-3 gap-12">
          {[
            { stat: "100%", label: lang === "PL" ? "kotów z atestem N/N" : "cats with N/N status" },
            { stat: "Własne", label: lang === "PL" ? "reproduktory, zero obcych kryć" : "studs, no outside breeding" },
            { stat: "FIFe", label: lang === "PL" ? "zarejestrowane rodowody 5 pokoleń" : "registered 5-generation pedigrees" },
          ].map((item, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}>
              <div
                className="font-heading font-light text-white leading-none mb-2"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {item.stat}
              </div>
              <p className="text-xs font-ui uppercase tracking-widest text-white/35">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
