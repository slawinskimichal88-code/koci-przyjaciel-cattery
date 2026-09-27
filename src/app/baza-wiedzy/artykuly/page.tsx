"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { REAL_MESSENGER_URL } from "@/data/realCatsData";
import {
  ArrowRight, Clock, ChevronRight, DollarSign,
  Award, HeartPulse, ShoppingBag, Users, TrendingUp
} from "lucide-react";

const ARTICLES = [
  {
    slug: "cena-maine-coon-z-rodowodem",
    number: "01",
    icon: DollarSign,
    image: "/images/cats/cat_03.webp",
    imagePos: "50% 25%",
    accent: "violet",
    gradient: "from-violet-900/80 via-violet-950/60 to-black/80",
    accentText: "text-violet-300",
    accentBg: "bg-violet-500/20 border-violet-500/30",
    readTime: "8 min",
    tag: "Cena · Rodowód · FIFe",
    title: "Ile kosztuje kot Maine Coon z rodowodem FIFe/FPL w 2026 roku i skąd bierze się cena?",
    preview: "Cena nie jest arbitralna — wynika z konkretnych, weryfikowalnych kosztów certyfikowanej hodowli. Poznaj wszystkie czynniki.",
  },
  {
    slug: "rodowod-fife-fpl-legalna-hodowla",
    number: "02",
    icon: Award,
    image: "/images/matki/matka_07.webp",
    imagePos: "50% 30%",
    accent: "amber",
    gradient: "from-amber-900/80 via-amber-950/60 to-black/80",
    accentText: "text-amber-300",
    accentBg: "bg-amber-500/20 border-amber-500/30",
    readTime: "10 min",
    tag: "Rodowód · FIFe · FPL",
    title: "Rodowód FIFe / FPL a stowarzyszenia spoza WCC — jak rozpoznać legalną hodowlę Maine Coon?",
    preview: "Nie każda organizacja felinologiczna ma te same standardy. 5-krokowy weryfikator i czerwone flagi pseudohodowli.",
  },
  {
    slug: "badania-hcm-pkd-sma-maine-coon",
    number: "03",
    icon: HeartPulse,
    image: "/images/matki/matka_04.webp",
    imagePos: "50% 20%",
    accent: "rose",
    gradient: "from-rose-900/80 via-rose-950/60 to-black/80",
    accentText: "text-rose-300",
    accentBg: "bg-rose-500/20 border-rose-500/30",
    readTime: "12 min",
    tag: "HCM · PKD · SMA · Genetyka",
    title: "Badania HCM (Echo Doppler), PKD i SMA u Maine Coon — dlaczego są kluczowe przed zakupem kociaka?",
    preview: "Maine Coon jest rasą o podwyższonym ryzyku HCM. Kompletny przewodnik po badaniach kardiologicznych i genetycznych.",
  },
  {
    slug: "wyprawka-dla-maine-coona",
    number: "04",
    icon: ShoppingBag,
    image: "/images/cats/cat_02.webp",
    imagePos: "50% 30%",
    accent: "green",
    gradient: "from-green-900/80 via-green-950/60 to-black/80",
    accentText: "text-green-300",
    accentBg: "bg-green-500/20 border-green-500/30",
    readTime: "9 min",
    tag: "Wyprawka · Drapak · Kuweta XXL",
    title: "Jak przygotować dom na kociaka Maine Coon? Kompletna wyprawka (drapak, kuweta XXL, żywienie)",
    preview: "MC jest zaskakująco duży — akcesoria muszą być do niego dopasowane. Interaktywna checklista wszystkich zakupów.",
  },
  {
    slug: "maine-coon-dzieci-pies-socjalizacja",
    number: "05",
    icon: Users,
    image: "/images/cats/cat_05.webp",
    imagePos: "50% 25%",
    accent: "sky",
    gradient: "from-sky-900/80 via-sky-950/60 to-black/80",
    accentText: "text-sky-300",
    accentBg: "bg-sky-500/20 border-sky-500/30",
    readTime: "8 min",
    tag: "Socjalizacja · Dzieci · Pies",
    title: "Maine Coon a dzieci i pies w domu — jak wygląda socjalizacja w bezklatkowej hodowli?",
    preview: "Rasa wyjątkowo towarzyska, lojalna i doskonale dogaduje się z dziećmi oraz psami. Klucz tkwi w socjalizacji.",
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

      <main className="pt-20">
        {/* ── FILMOWY HERO — full-bleed collage ── */}
        <section className="relative overflow-hidden" style={{ height: "clamp(420px, 60vw, 720px)" }}>
          {/* 3-kolumnowy collage zdjęć */}
          <div className="absolute inset-0 grid grid-cols-3">
            <div className="relative overflow-hidden">
              <Image src="/images/matki/matka_01.webp" alt="Maine Coon matka hodowla" fill className="object-cover scale-110" sizes="33vw" />
            </div>
            <div className="relative overflow-hidden">
              <Image src="/images/cats/cat_03.webp" alt="Maine Coon kociak" fill className="object-cover object-[50%_25%] scale-110" sizes="33vw" />
            </div>
            <div className="relative overflow-hidden">
              <Image src="/images/matki/matka_06.webp" alt="Maine Coon z kociętami" fill className="object-cover object-[50%_20%] scale-110" sizes="33vw" />
            </div>
          </div>

          {/* Unified overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md mb-6">
              <span className="text-amber-400 text-xs">✦</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b]">
                TOPICAL AUTHORITY · 5 FILAROWYCH ARTYKUŁÓW
              </span>
            </div>

            <h1
              className="font-heading font-light text-white leading-[0.97] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            >
              Baza Wiedzy o{" "}
              <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                Maine Coon
              </span>
            </h1>

            <p className="text-[#86868b] text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-light">
              Eksperckie przewodniki opracowane przez certyfikowaną hodowlę Koci&nbsp;Przyjaciel&nbsp;*PL. Wszystko, co musisz wiedzieć przed adopcją.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono text-white/40">
              {[{ v: "5", l: "Artykułów" }, { v: "~47 min", l: "Łączny czas" }, { v: "FIFe · Laboklin", l: "Źródła" }, { v: "2026", l: "Aktualizacja" }].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/20">·</span>}
                  <span className="text-white/70 font-semibold">{s.v}</span>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARTICLES — filmowe karty ── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 space-y-5">

          {/* Featured Article — large card */}
          <Link
            href={`/baza-wiedzy/artykuly/${ARTICLES[0].slug}`}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
            className="block group"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300" style={{ height: "clamp(300px, 40vw, 500px)" }}>
              <Image
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: ARTICLES[0].imagePos }}
                sizes="100vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${ARTICLES[0].gradient}`} />
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full border ${ARTICLES[0].accentBg} ${ARTICLES[0].accentText}`}>{ARTICLES[0].tag}</span>
                  <span className="text-[10px] font-mono text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" />{ARTICLES[0].readTime} czytania</span>
                </div>
                <h2 className={`font-heading font-semibold text-white leading-snug mb-2 transition-colors duration-300 ${hovered === 0 ? ARTICLES[0].accentText : ""}`}
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}>
                  {ARTICLES[0].title}
                </h2>
                <p className="text-[#86868b] text-sm hidden sm:block max-w-xl">{ARTICLES[0].preview}</p>
                <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${ARTICLES[0].accentText} transition-transform duration-300 ${hovered === 0 ? "translate-x-1" : ""}`}>
                  Czytaj artykuł <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              {/* Article number */}
              <div className="absolute top-6 right-8 font-black text-white/[0.06] text-7xl leading-none select-none">{ARTICLES[0].number}</div>
            </div>
          </Link>

          {/* 2-column grid for articles 2–3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ARTICLES.slice(1, 3).map((article, idx) => {
              const i = idx + 1;
              const Icon = article.icon;
              return (
                <Link
                  key={article.slug}
                  href={`/baza-wiedzy/artykuly/${article.slug}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="block group"
                >
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300" style={{ height: "clamp(260px, 32vw, 400px)" }}>
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: article.imagePos }} sizes="50vw" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${article.gradient}`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${article.accentBg} ${article.accentText} inline-flex mb-2 self-start`}>{article.tag}</span>
                      <h2 className={`font-semibold text-white leading-snug text-base sm:text-lg mb-1 transition-colors ${hovered === i ? article.accentText : ""}`}>{article.title}</h2>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${article.accentText} mt-2 transition-transform ${hovered === i ? "translate-x-1" : ""}`}>
                        <Clock className="w-3 h-3 text-white/30" />
                        <span className="text-white/30 mr-2">{article.readTime}</span>
                        Czytaj <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-5 font-black text-white/[0.05] text-6xl leading-none select-none">{article.number}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 2-column grid for articles 4–5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ARTICLES.slice(3).map((article, idx) => {
              const i = idx + 3;
              const Icon = article.icon;
              return (
                <Link
                  key={article.slug}
                  href={`/baza-wiedzy/artykuly/${article.slug}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="block group"
                >
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300" style={{ height: "clamp(240px, 28vw, 360px)" }}>
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: article.imagePos }} sizes="50vw" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${article.gradient}`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${article.accentBg} ${article.accentText} inline-flex mb-2 self-start`}>{article.tag}</span>
                      <h2 className={`font-semibold text-white leading-snug text-base sm:text-lg mb-1 transition-colors ${hovered === i ? article.accentText : ""}`}>{article.title}</h2>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${article.accentText} mt-2 transition-transform ${hovered === i ? "translate-x-1" : ""}`}>
                        <Clock className="w-3 h-3 text-white/30" />
                        <span className="text-white/30 mr-2">{article.readTime}</span>
                        Czytaj <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-5 font-black text-white/[0.05] text-6xl leading-none select-none">{article.number}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-20">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/20" style={{ minHeight: 280 }}>
            <Image src="/images/matki/matka_06.webp" alt="Kocięta Maine Coon z hodowli Koci Przyjaciel gotowe do adopcji" fill className="object-cover object-[50%_20%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">Koci Przyjaciel *PL</p>
                <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3">
                  Gotowy na Maine Coona swojego życia?
                </h2>
                <p className="text-[#86868b] text-sm max-w-md">
                  Przeczytałeś wszystko. Sprawdź które kocięta z hodowli Koci Przyjaciel *PL są aktualnie dostępne.
                </p>
              </div>
              <Link
                href="/dostepne-kociaki"
                className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/20"
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
