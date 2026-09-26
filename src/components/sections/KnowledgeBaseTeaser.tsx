"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  Scale,
  Coins,
  CheckCircle2,
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
  ];

  return (
    <section id="baza-wiedzy" className="relative bg-black text-[#f5f5f7] py-16 sm:py-24 overflow-hidden border-t border-white/[0.08]">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji (Apple Keynote Style) ────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] mb-5">
            <BookOpen className="w-3.5 h-3.5 text-[#2997ff]" />
            <span className="text-[11px] font-ui uppercase tracking-[0.25em] text-[#86868b] font-medium">
              {lang === "PL" ? "WIRTUALNE CENTRUM WIEDZY" : "FELINOLOGY KNOWLEDGE"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-[#f5f5f7] leading-[1.02] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            Wszystko, co musisz wiedzieć<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">
              przed wyborem kota.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#86868b] font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Przejrzyste fakty zamiast mitów. Sprawdź realne miesięczne koszty, wymogi zdrowotne i standardy opieki nad największym kotem domowym."
              : "Clear facts instead of myths. Calculate real monthly expenses, genetic health standards, and care guidelines for the gentle giant."}
          </p>
        </div>

        {/* ── WZMIANKA O KOSZTACH (APPLE DARK CARD) ──── */}
        <div className="mb-14 p-6 sm:p-8 rounded-[28px] bg-[#161617] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition-all duration-300">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-xs font-mono font-medium mb-3 text-[#f5f5f7]">
              <Coins className="w-3.5 h-3.5 text-[#2997ff]" />
              <span>{lang === "PL" ? "KALKULATOR FINANSOWY 2026" : "2026 FINANCIAL SIMULATOR"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#f5f5f7] mb-2 tracking-tight">
              {lang === "PL" ? "Ile realnie kosztuje utrzymanie kota Maine Coon?" : "How much does keeping a Maine Coon really cost?"}
            </h3>
            <p className="text-sm text-[#86868b] font-body font-light leading-relaxed">
              {lang === "PL"
                ? "Dieta wysokomięsna 0% zbóż, podłoże w kuwecie XXL, solidne drapaki sufitowe i coroczna profilaktyka serca Echo Doppler. Oblicz comiesięczne wydatki i sprawdź pełną wyprawkę w naszym symulatorze."
                : "Grain-free species-appropriate diet, XXL litter, sturdy scratchers, and yearly heart ultrasound. Calculate live monthly expenses in our interactive tool."}
            </p>
          </div>

          <Link
            href="/kalkulator"
            className="px-6 py-3 rounded-full bg-white text-black font-ui text-[13px] font-medium tracking-tight hover:bg-[#f5f5f7] transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
          >
            <span>{lang === "PL" ? "Oblicz koszty utrzymania" : "Calculate living costs"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </Link>
        </div>

        {/* ── INTERAKTYWNA RZECZ #2: CERTYFIKOWANY STANDARD BADAŃ GENETYCZNYCH ── */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium block mb-2">
              100% Transparentności Zdrowotnej
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#f5f5f7] tracking-tight">
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
                className="p-5 rounded-[22px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-medium text-[#86868b] uppercase tracking-wider">
                      {test.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{test.result}</span>
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-heading font-medium text-[#f5f5f7] mb-2">{test.name}</h4>
                  <p className="text-xs text-[#86868b] font-body font-light leading-relaxed">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2 Kluczowe Tematy Bazy Wiedzy (Apple Bento Cards) ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={c.href}
                className="group relative p-6 sm:p-8 rounded-[28px] bg-[#161617] hover:bg-[#1d1d1f] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-widest text-[#86868b] uppercase font-medium">
                      {c.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#f5f5f7] group-hover:scale-105 transition-all">
                      <Icon className="w-4 h-4 text-[#2997ff]" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-medium text-[#f5f5f7] group-hover:text-white transition-colors mb-2 tracking-tight">
                    {c.title}
                  </h3>

                  <p className="text-sm text-[#86868b] font-body leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center gap-2 text-xs font-ui text-[#86868b] group-hover:text-[#f5f5f7] transition-colors">
                  <span>{lang === "PL" ? "Czytaj artykuł w Bazie Wiedzy" : "Read in Knowledge Base"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#2997ff]" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Główny przycisk przejścia do podstrony /baza-wiedzy */}
        <div className="text-center">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-[#f5f5f7] font-body text-[13px] font-medium tracking-tight border border-white/15 transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
          >
            <span>{lang === "PL" ? "Otwórz pełne kompendium wiedzy" : "Open complete knowledge compendium"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
}
