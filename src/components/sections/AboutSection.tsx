"use client";

import React from "react";
import Image from "next/image";
import { REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface AboutSectionProps {
  lang: "PL" | "EN";
}

export default function AboutSection({ lang }: AboutSectionProps) {
  return (
    <section id="o-nas" className="bg-white text-black overflow-hidden">

      {/* ── Intro ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-20 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "O nas" : "About"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Pasja,{" "}
          <span className="font-semibold italic">
            którą dzielimy
          </span>
          <br />od lat.
        </h2>
      </div>

      {/* ── Zdjęcie full-bleed ─────────────────────────────────── */}
      <div className="reveal w-full" style={{ height: "clamp(300px, 55vw, 680px)" }}>
        <div className="relative w-full h-full">
          <Image
            src="/images/cats/cat_01.webp"
            alt="Hodowla Koci Przyjaciel PL — Maine Coon"
            fill
            className="object-cover object-top grayscale"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── Tekst + Statystyki ─────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Tekst */}
          <div className="reveal space-y-5">
            <p className="text-base sm:text-lg font-body text-black/70 leading-relaxed">
              {lang === "PL"
                ? "Koci Przyjaciel *PL to domowa hodowla wielkich kotów Maine Coon zarejestrowana w Polskiej Federacji Felinologicznej «Felis Polonia» (FPL), działającej pod auspicjami FIFe."
                : "Koci Przyjaciel *PL is a dedicated home cattery of majestic Maine Coons registered with Felis Polonia (FPL) under the auspices of FIFe."}
            </p>
            <p className="text-base sm:text-lg font-body text-black/70 leading-relaxed">
              {lang === "PL"
                ? "Nasze koty żyją z nami — w salonie, z dziećmi, z psem. Zero klatek. Zero boksów. Posiadamy wyłącznie własne reproduktory, co gwarantuje 100% kontrolę genetyczną."
                : "Our cats live freely in our home — no cages, no pens. With children, with our dog. We own our own studs, guaranteeing full genetic control."}
            </p>
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-ui font-semibold text-black/50 hover:text-black transition-colors tracking-wider uppercase"
            >
              <span>Facebook</span>
              <span>→</span>
            </a>
          </div>

          {/* Stats — duże liczby jak Apple */}
          <div className="reveal reveal-delay-2 space-y-10">
            {[
              { num: "25 395", label: lang === "PL" ? "Polubień na Facebooku" : "Facebook Followers" },
              { num: "100+", label: lang === "PL" ? "Kociąt w dobrych domach" : "Kittens in loving homes" },
              { num: "10+", label: lang === "PL" ? "Lat doświadczenia" : "Years of experience" },
            ].map((stat, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} border-t border-black/10 pt-6`}>
                <div
                  className="font-heading font-light text-black leading-none mb-1"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  {stat.num}
                </div>
                <p className="text-sm font-ui text-black/40 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
