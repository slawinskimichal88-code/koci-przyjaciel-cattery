"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { REAL_MESSENGER_URL } from "@/data/realCatsData";
import {
  BookOpen, ArrowRight, Clock, ChevronRight,
  DollarSign, Award, HeartPulse, ShoppingBag, Users,
  TrendingUp, Sparkles
} from "lucide-react";

const ARTICLES = [
  {
    slug: "cena-maine-coon-z-rodowodem",
    number: "01",
    icon: DollarSign,
    gradient: "from-violet-600/30 via-purple-700/20 to-transparent",
    accentColor: "text-violet-300",
    accentBg: "bg-violet-500/20 border-violet-500/30",
    dotColor: "bg-violet-400",
    readTime: "8 min",
    seoTag: "Cena · Rodowód · FIFe",
    title: "Ile kosztuje kot Maine Coon z rodowodem FIFe/FPL w 2026 roku i skąd bierze się cena?",
    subtitle: "Od czego zależy cena kociaka, co wchodzi w jej skład i dlaczego różni się między hodowlami",
    preview: "Cena Maine Coona z rodowodem FIFe/FPL to temat otoczony wieloma mitami. Wbrew pozorom nie jest arbitralna — wynika z konkretnych, weryfikowalnych kosztów, jakie ponosi certyfikowana hodowla.",
    keywords: ["cena maine coon", "ile kosztuje maine coon z rodowodem", "hodowla maine coon cena"],
  },
  {
    slug: "rodowod-fife-fpl-legalna-hodowla",
    number: "02",
    icon: Award,
    gradient: "from-amber-600/30 via-orange-700/20 to-transparent",
    accentColor: "text-amber-300",
    accentBg: "bg-amber-500/20 border-amber-500/30",
    dotColor: "bg-amber-400",
    readTime: "10 min",
    seoTag: "Rodowód · FIFe · FPL",
    title: "Rodowód FIFe / FPL a stowarzyszenia spoza WCC — jak rozpoznać legalną hodowlę Maine Coon?",
    subtitle: "Różnice między organizacjami felinologicznymi, 5-krokowa weryfikacja i czerwone flagi pseudohodowli",
    preview: "Na polskim rynku działa kilkanaście różnych organizacji felinologicznych. Tylko część z nich należy do FIFe — najwyższego organu światowego. Jak odróżnić legalną hodowlę od masowej produkcji kociąt?",
    keywords: ["prawdziwa hodowla maine coon", "rodowód fpl fife", "jak sprawdzić hodowlę kotów"],
  },
  {
    slug: "badania-hcm-pkd-sma-maine-coon",
    number: "03",
    icon: HeartPulse,
    gradient: "from-rose-600/30 via-red-700/20 to-transparent",
    accentColor: "text-rose-300",
    accentBg: "bg-rose-500/20 border-rose-500/30",
    dotColor: "bg-rose-400",
    readTime: "12 min",
    seoTag: "HCM · PKD · SMA · Genetyka",
    title: "Badania HCM (Echo Doppler), PKD i SMA u Maine Coon — dlaczego są kluczowe przed zakupem kociaka?",
    subtitle: "Kompletny przewodnik po badaniach kardiologicznych i genetycznych w certyfikowanej hodowli",
    preview: "Maine Coon to rasa o podwyższonym ryzyku kardiomiopatii przerostowej (HCM). Certyfikowane badania Echo Doppler i testy DNA to jedyna gwarancja, że kupujesz zdrowego kociaka.",
    keywords: ["badania genetyczne maine coon", "hcm u kota", "zdrowa hodowla maine coon"],
  },
  {
    slug: "wyprawka-dla-maine-coona",
    number: "04",
    icon: ShoppingBag,
    gradient: "from-green-600/30 via-emerald-700/20 to-transparent",
    accentColor: "text-green-300",
    accentBg: "bg-green-500/20 border-green-500/30",
    dotColor: "bg-green-400",
    readTime: "9 min",
    seoTag: "Wyprawka · Drapak · Kuweta XXL",
    title: "Jak przygotować dom na kociaka Maine Coon? Kompletna wyprawka (drapak, kuweta XXL, żywienie)",
    subtitle: "Interaktywna lista wszystkich akcesoriów, żywienie dużego kota i jak zabezpieczyć mieszkanie",
    preview: "Maine Coon to niespodziewanie duży kot — i akcesoria muszą być do niego odpowiednio dobrane. Zbyt mała kuweta, słabe drapaki czy nieprawidłowa dieta to najczęstsze błędy nowych opiekunów.",
    keywords: ["wyprawka dla maine coona", "jaki drapak dla maine coona", "kuweta dla dużego kota"],
  },
  {
    slug: "maine-coon-dzieci-pies-socjalizacja",
    number: "05",
    icon: Users,
    gradient: "from-sky-600/30 via-blue-700/20 to-transparent",
    accentColor: "text-sky-300",
    accentBg: "bg-sky-500/20 border-sky-500/30",
    dotColor: "bg-sky-400",
    readTime: "8 min",
    seoTag: "Socjalizacja · Dzieci · Pies",
    title: "Maine Coon a dzieci i pies w domu — jak wygląda socjalizacja w bezklatkowej hodowli?",
    subtitle: "Etapy socjalizacji kociąt, temperament Maine Coona i praktyczne wskazówki dla rodzin z dziećmi",
    preview: "Maine Coon jest nazywany 'psem wśród kotów'. To nie przypadek — rasa jest wyjątkowo towarzyska, lojalna i doskonale dogaduje się z dziećmi oraz psami. Kluczem jest socjalizacja od pierwszych tygodni życia.",
    keywords: ["czy maine coon lubi dzieci", "maine coon a pies", "charakter kota maine coon"],
  },
];

export default function ArticlesHubPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [hovered, setHovered] = useState<number | null>(null);

  const handleOpenReservation = () => {
    if (typeof window !== "undefined") window.open(REAL_MESSENGER_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} onOpenReservation={handleOpenReservation} />

      <main className="pt-24 sm:pt-32 pb-24">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-semibold">
              TOPICAL AUTHORITY · 5 FILAROWYCH ARTYKUŁÓW · SEO EXPERT
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[1.02] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Artykuły o rasie{" "}
            <span className="font-semibold italic text-amber-200 drop-shadow-[0_2px_16px_rgba(245,158,11,0.3)]">
              Maine Coon
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#86868b] font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Kompletne, eksperckie przewodniki opracowane przez certyfikowaną hodowlę Koci Przyjaciel&nbsp;*PL. Wszystko, co musisz wiedzieć przed adopcją.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/40">
            {[
              { label: "Artykułów", value: "5" },
              { label: "Całk. czas czytania", value: "~47 min" },
              { label: "Źródła", value: "FIFe · Laboklin · Weterynaria" },
              { label: "Aktualizacja", value: "2026" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">·</span>}
                <span className="text-white/70 font-semibold">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Articles List ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 space-y-5">
          {ARTICLES.map((article, i) => {
            const Icon = article.icon;
            const isHovered = hovered === i;

            return (
              <Link
                key={article.slug}
                href={`/baza-wiedzy/artykuly/${article.slug}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`block group rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 ${
                  isHovered ? "border-white/25 shadow-2xl scale-[1.005]" : ""
                }`}
              >
                <div className={`relative p-6 sm:p-8 bg-gradient-to-r ${article.gradient} bg-white/[0.025]`}>
                  {/* Article Number bg */}
                  <span className="absolute right-6 top-4 font-black text-white/[0.04] text-8xl leading-none select-none">
                    {article.number}
                  </span>

                  <div className="relative flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Icon */}
                    <div className={`shrink-0 w-12 h-12 rounded-2xl border ${article.accentBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${article.accentColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${article.accentBg} ${article.accentColor}`}>
                          {article.seoTag}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                          <Clock className="w-3 h-3" />
                          {article.readTime} czytania
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className={`font-semibold text-white text-lg sm:text-xl leading-snug mb-2 transition-colors duration-200 ${isHovered ? article.accentColor : ""}`}>
                        {article.title}
                      </h2>

                      <p className="text-sm text-white/50 mb-3 leading-relaxed hidden sm:block">
                        {article.preview}
                      </p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1.5">
                        {article.keywords.map((kw, j) => (
                          <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className={`shrink-0 flex items-center self-center transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}>
                      <ChevronRight className="w-6 h-6 text-white/30" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* ── CTA: Dostępne kocięta ───────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-16">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center bg-gradient-to-br from-amber-600/20 via-orange-700/15 to-transparent border border-amber-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />
            <div className="relative">
              <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3">
                Gotowy na Maine Coona swojego życia?
              </h2>
              <p className="text-[#86868b] text-base max-w-xl mx-auto mb-8">
                Przeczytałeś wszystko, co warto wiedzieć. Teraz sprawdź, które kocięta z hodowli Koci Przyjaciel&nbsp;*PL są aktualnie dostępne.
              </p>
              <Link
                href="/dostepne-kociaki"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
              >
                Zobacz aktualnie dostępne kocięta Maine Coon w naszej hodowli
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} setLang={setLang} />
    </div>
  );
}
