"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  Scale,
  Utensils,
  Coins,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2,
  Sliders,
} from "lucide-react";

interface KnowledgeBaseTeaserProps {
  lang?: "PL" | "EN";
}

export default function KnowledgeBaseTeaser({ lang = "PL" }: KnowledgeBaseTeaserProps) {
  const cards = [
    {
      icon: Scale,
      tag: lang === "PL" ? "ANATOMIA I ROZWÓJ" : "SIZE & GROWTH",
      title: lang === "PL" ? "Jak rośnie Maine Coon do 4. roku życia?" : "How do Maine Coons grow up to 4 years?",
      desc: lang === "PL"
        ? "W przeciwieństwie do zwykłych kotów, Maine Coon rozwija kościec i masę mięśniową aż do 3-4 lat. Sprawdź tabelę przyrostów wagowych miesiąc po miesiącu."
        : "Unlike regular cats, Maine Coons develop bone structure and muscle mass up to 3-4 years. Check the monthly weight gain guide.",
      href: "/baza-wiedzy#porownanie",
    },
    {
      icon: HeartPulse,
      tag: lang === "PL" ? "ZDROWIE I PROFILAKTYKA" : "HEALTH & GENETICS",
      title: lang === "PL" ? "Badania genetyczne HCM, PKD, SMA" : "Genetic testing HCM, PKD, SMA",
      desc: lang === "PL"
        ? "Każdy rodzic w naszej hodowli posiada certyfikaty badań DNA i coroczne echo serca Doppler. Zobacz na co uważać kupując kociaka."
        : "Every parent cat in our cattery has certified DNA tests and yearly Doppler echocardiography. See what to look for when choosing a kitten.",
      href: "/baza-wiedzy#zdrowie",
    },
    {
      icon: Utensils,
      tag: lang === "PL" ? "ŻYWIENIE BEZZBOŻOWE" : "SPECIES-APPROPRIATE DIET",
      title: lang === "PL" ? "Dlaczego 0% zbóż w diecie to klucz?" : "Why 0% grain is the key?",
      desc: lang === "PL"
        ? "Koty to bezwzględni mięsożercy. Dowiedz się, dlaczego tanie karmy z marketu niszczą nerki i jak ułożyć prostą dietę wysokomięsną lub BARF."
        : "Cats are obligate carnivores. Learn why cheap commercial kibble harms kidneys and how to build an easy meat-based or BARF diet.",
      href: "/kalkulator",
    },
    {
      icon: Coins,
      tag: lang === "PL" ? "BEZPIECZEŃSTWO DOMU" : "HOME SAFETY & ADAPTATION",
      title: lang === "PL" ? "Drapaki XXL i siatkowanie balkonu" : "XXL Scratchers & Balcony Netting",
      desc: lang === "PL"
        ? "Maine Coon nie zmieści się na standardowym drapaku ze sklepu zoologicznego. Przygotowaliśmy listę sprawdzonych solidnych akcesoriów."
        : "A Maine Coon won't fit a standard pet shop cat tree. We prepared a checklist of durable, heavy-duty furniture and safety tips.",
      href: "/baza-wiedzy#faq",
    },
  ];

  return (
    <section id="baza-wiedzy" className="relative bg-[#FBFBFD] text-zinc-900 py-16 sm:py-20 overflow-hidden border-t border-zinc-200">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-400/10 via-white/50 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/80 bg-amber-50 mb-6 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-[11px] font-ui uppercase tracking-[0.3em] text-amber-950 font-semibold">
              {lang === "PL" ? "WIRTUALNE CENTRUM WIEDZY I FELINOLOGII" : "INTERACTIVE KNOWLEDGE & FELINOLOGY"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-zinc-950 leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
          >
            Wszystko, co musisz wiedzieć<br />
            <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-zinc-900">
              przed adopcją kota.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Przejrzyste fakty zamiast mitów. Sprawdź realne miesięczne koszty, wymogi zdrowotne i standardy opieki nad największym kotem domowym."
              : "Clear facts instead of myths. Calculate real monthly expenses, genetic health standards, and care guidelines for the gentle giant."}
          </p>
        </div>

        {/* ── WZMIANKA O KOSZTACH (APPLE IPHONE FROSTED GLASS BANNER) ──── */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/[0.08] via-amber-500/[0.03] to-white border border-amber-300/60 backdrop-blur-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-mono font-semibold mb-3">
              <Coins className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === "PL" ? "KALKULATOR FINANSOWY 2026" : "2026 FINANCIAL SIMULATOR"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-medium text-zinc-950 mb-2">
              {lang === "PL" ? "Ile realnie kosztuje utrzymanie kota Maine Coon?" : "How much does keeping a Maine Coon really cost?"}
            </h3>
            <p className="text-sm text-zinc-600 font-body font-light leading-relaxed">
              {lang === "PL"
                ? "Dieta wysokomięsna 0% zbóż, podłoże w kuwecie XXL, solidne drapaki sufitowe i coroczna profilaktyka serca Echo Doppler. Oblicz comiesięczne wydatki i sprawdź pełną wyprawkę w naszym symulatorze."
                : "Grain-free species-appropriate diet, XXL litter, sturdy scratchers, and yearly heart ultrasound. Calculate live monthly expenses in our interactive tool."}
            </p>
          </div>

          <Link
            href="/kalkulator"
            className="px-7 py-4 rounded-full bg-zinc-950 text-white font-ui text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg hover:scale-105 shrink-0 cursor-pointer"
          >
            <span>{lang === "PL" ? "Sprawdź koszty utrzymania kota" : "Calculate Living Costs"}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        {/* ── INTERAKTYWNA RZECZ #2: CERTYFIKOWANY STANDARD BADAŃ GENETYCZNYCH ── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-700 font-semibold block mb-2">
              100% Transparentności Zdrowotnej
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-normal text-zinc-950">
              Badania genetyczne, które wykonujemy każdemu rodzicowi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                badge: "HCM Doppler",
                name: "Kardiomiopatia Przerostowa",
                result: "N/N (Czyste)",
                desc: "Coroczne badanie ultrasonograficzne serca u certyfikowanego kardiologa weterynaryjnego.",
              },
              {
                badge: "PKD DNA + USG",
                name: "Wielotorbielowatość Nerek",
                result: "N/N (Wolny)",
                desc: "Badanie genetyczne w renomowanym laboratorium Laboklin wykluczające mutację genu.",
              },
              {
                badge: "SMA Test DNA",
                name: "Rdzeniowy Zanik Mięśni",
                result: "N/N (Czysty)",
                desc: "Gwarancja braku obciążenia recesywną mutacją układu nerwowo-mięśniowego.",
              },
              {
                badge: "FIV / FeLV",
                name: "Kocia Białaczka & Niedobór",
                result: "Ujemne (-)",
                desc: "Hodowla zamknięta i całkowicie wolna od wirusów zakaźnych kotów.",
              },
            ].map((test, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:bg-white/95 hover:border-emerald-500/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                      {test.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300 font-semibold shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>{test.result}</span>
                    </span>
                  </div>
                  <h4 className="text-base font-heading font-medium text-zinc-950 mb-2">{test.name}</h4>
                  <p className="text-xs text-zinc-600 font-body font-light leading-relaxed">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4 Filary Bazy Wiedzy (iPhone Frosted Glass) ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={c.href}
                className="group relative p-7 sm:p-8 rounded-3xl bg-white/75 hover:bg-white/95 border border-white/90 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 backdrop-blur-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono tracking-widest text-amber-800 uppercase font-semibold">
                      {c.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/90 border border-zinc-200/80 shadow-xs flex items-center justify-center text-zinc-800 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-normal text-zinc-950 group-hover:text-amber-800 transition-colors mb-3">
                    {c.title}
                  </h3>

                  <p className="text-sm text-zinc-600 font-body leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-zinc-200/60 flex items-center gap-2 text-xs font-ui uppercase tracking-widest text-zinc-600 group-hover:text-zinc-950 transition-colors font-semibold">
                  <span>{lang === "PL" ? "Czytaj artykuł w Bazie Wiedzy" : "Read in Knowledge Base"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Główny przycisk przejścia do podstrony /baza-wiedzy */}
        <div className="text-center">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-zinc-950 text-white font-body text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            <span>{lang === "PL" ? "Otwórz pełne Kompendium Wiedzy (FAQ, Wzrost, Kalkulatory)" : "Open Complete Knowledge Compendium"}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
