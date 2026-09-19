"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartPulse, Scale, Utensils, Coins, HelpCircle } from "lucide-react";

interface KnowledgeBaseTeaserProps {
  lang?: "PL" | "EN";
}

export default function KnowledgeBaseTeaser({ lang = "PL" }: KnowledgeBaseTeaserProps) {
  const cards = [
    {
      icon: Scale,
      tag: lang === "PL" ? "ANATOMIA & SKALA" : "ANATOMY & SCALE",
      title: lang === "PL" ? "Majestat do 12 kg" : "Majesty up to 12 kg",
      desc: lang === "PL" 
        ? "Ciało o długości 120 cm, pędzelki rysi na uszach i puszysty pióropusz ogona. Zobacz interaktywne porównanie z psem Beagle i kotem europejskim."
        : "120 cm length, lynx tips, and full plumage tail. Explore the interactive scale comparison with Beagle and domestic cat.",
      href: "/baza-wiedzy#porownanie",
    },
    {
      icon: HeartPulse,
      tag: lang === "PL" ? "ZDROWIE & GENETYKA" : "HEALTH & GENETICS",
      title: lang === "PL" ? "Echo Doppler serca & DNA" : "Heart Doppler & DNA",
      desc: lang === "PL"
        ? "Regularne certyfikowane echo serca pod kątem HCM oraz badania genetyczne SMA i PKD z wynikiem N/N (Laboklin). 100% gwarancja czystej linii."
        : "Certified HCM echocardiography and genetic tests for SMA and PKD (N/N Laboklin). Full genetic safety guarantee.",
      href: "/baza-wiedzy#zdrowie",
    },
    {
      icon: Utensils,
      tag: lang === "PL" ? "ŻYWIENIE & DIETA" : "NUTRITION & BARF",
      title: lang === "PL" ? "BARF i karmy bezzbożowe" : "BARF & Grain-free",
      desc: lang === "PL"
        ? "Maine Coon to bezwzględny mięsożerca. Poznaj zasady komponowania zbilansowanej diety wysokomięsnej dla prawidłowego rozwoju kośćca."
        : "Maine Coons are obligate carnivores. Discover the nutritional principles of high-meat diets for strong skeletal growth.",
      href: "/baza-wiedzy#kalkulator",
    },
    {
      icon: Coins,
      tag: lang === "PL" ? "EKONOMIA OPIEKI" : "COST CALCULATOR",
      title: lang === "PL" ? "Kalkulator utrzymania" : "Maintenance Calculator",
      desc: lang === "PL"
        ? "Przejrzysta kalkulacja comiesięcznych kosztów: mięso, żwirek kukurydziany, suplementy i rezerwa weterynaryjna. Zero ukrytych niespodzianek."
        : "Transparent monthly cost calculation: meat, litter, supplements, and veterinary reserve. Zero surprises.",
      href: "/baza-wiedzy#kalkulator",
    },
  ];

  return (
    <section className="relative bg-[#0F0F11] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10">
      
      {/* Dynamiczne ambient tło */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Nagłówek sekcji */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-ui uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "KOMPENDIUM WIEDZY O RASIE" : "BREED KNOWLEDGE COMPENDIUM"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)" }}
          >
            {lang === "PL" ? (
              <>
                Baza Wiedzy o <span className="font-semibold italic">Maine Coon</span>.
              </>
            ) : (
              <>
                Maine Coon <span className="font-semibold italic">Knowledge Base</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Zebraliśmy 14 lat doświadczenia hodowlanego w przejrzystej bazie wiedzy. Poznaj specyfikę rasy, wymiary, profilaktykę genetyczną i realne koszty życia z kotem."
              : "We compiled 14 years of cattery experience into a clear guide. Explore breed standards, health testing, dimensions, and real monthly care costs."}
          </p>
        </div>

        {/* Siatka 4 filarów */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={c.href}
                className="group relative p-8 rounded-3xl bg-[#161618]/90 hover:bg-[#1c1c1f] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                      {c.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-normal text-white group-hover:text-amber-200 transition-colors mb-3">
                    {c.title}
                  </h3>

                  <p className="text-sm text-zinc-400 font-body leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-ui uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors font-semibold">
                  <span>{lang === "PL" ? "Dowiedz się więcej" : "Learn more"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Główny przycisk przejścia do zakładki /baza-wiedzy */}
        <div className="text-center">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
          >
            <span>{lang === "PL" ? "Otwórz pełną Bazę Wiedzy (Skala, Badania, Koszty, FAQ)" : "Open Complete Knowledge Base"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
