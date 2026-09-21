"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Heart, Award, Info, Phone, Sparkles } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface KittensSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: (name?: string) => void;
}

const KITTENS = [
  {
    id: "luna",
    name: "Luna *PL",
    gender: "female" as const,
    color: "Czarny klasycznie pręgowany",
    emsCode: "MCO n 22",
    status: "available" as const,
    readyDate: "Odbiór: Kwiecień 2026",
    weightEstimate: "6.5 – 8.0 kg (Dorosła samica)",
    image: "/images/gallery/mlode/mlode_003.jpeg",
    desc: "Czuła, odważna kotka o jedwabistej szacie, głębokim profilu i wspaniałym, otwartym charakterze. Uwielbia zasypiać na kolanach i towarzyszyć w codziennych czynnościach.",
    highlights: ["Wybitne pędzle rysiowe", "Idealny profil głowy", "Nauczona kuwety i drapaka", "Wychowana z dziećmi"],
  },
  {
    id: "leo",
    name: "Leo *PL",
    gender: "male" as const,
    color: "Czarny srebrzysty klasyczny",
    emsCode: "MCO ns 22",
    status: "available" as const,
    readyDate: "Odbiór: Maj 2026",
    weightEstimate: "10.0 – 12.0 kg (Potężny samiec)",
    image: "/images/cats/cat_08.webp",
    desc: "Prawdziwy mały lew z potężnymi pędzlami na uszach, szeroką kufą i masywną budową łap. Niezwykle ufny, lgnie do człowieka jak wierny pies.",
    highlights: ["Potężna budowa kośćca", "Srebrzysty gęsty podszerstek", "Usposobienie gentle giant", "Testy rodziców: N/N"],
  },
  {
    id: "arthur",
    name: "Arthur *PL",
    gender: "male" as const,
    color: "Czarny dymny",
    emsCode: "MCO ns",
    status: "reserved" as const,
    readyDate: "Znalazł dom: Warszawa",
    weightEstimate: "10.5 – 12.5 kg",
    image: "/images/cats/cat_18.webp",
    desc: "Wybitny profil anatomiczny i hipnotyzujące bursztynowe spojrzenie. Arthur trafi do wspaniałej rodziny pod Warszawą.",
    highlights: ["Głęboki dymny odcień", "Masywna klatka piersiowa", "Spokojny, dostojny temperament", "Status: Zarezerwowany"],
  },
  {
    id: "yuki",
    name: "Yuki *PL",
    gender: "female" as const,
    color: "Śnieżnobiały solid",
    emsCode: "MCO w 62",
    status: "available" as const,
    readyDate: "Odbiór: Kwiecień 2026",
    weightEstimate: "6.0 – 7.5 kg (Aksamitna kotka)",
    image: "/images/cats/cat_10.webp",
    desc: "Aksamitna biała szata, ciepłe bursztynowe oczy i niezwykle przytulaśna natura. Reaguje na swoje imię i chętnie przynosi rzucane maskotki.",
    highlights: ["Czysta biała szata", "Słuch prawidłowy (potwierdzony)", "Niezwykle kontaktowa", "Kompletna wyprawka w cenie"],
  },
];

export default function KittensSection({ lang, onOpenReservation }: KittensSectionProps) {
  const [filter, setFilter] = useState<"available" | "male" | "female">("available");
  const [activeId, setActiveId] = useState<string>("luna");

  const filteredKittens = KITTENS.filter((k) => {
    if (filter === "male") return k.gender === "male";
    if (filter === "female") return k.gender === "female";
    return k.status === "available";
  });

  // Jeżeli aktywny kociak nie mieści się w filtrze, przełącz na pierwszy pasujący
  const currentKitten =
    filteredKittens.find((k) => k.id === activeId) || filteredKittens[0] || KITTENS[0];

  return (
    <section id="kocieta" className="bg-[#FAF9F6] text-black overflow-hidden py-14 sm:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-[11px] font-mono uppercase tracking-[0.3em] text-black/70 mb-5">
              <span>{lang === "PL" ? "Dostępne Kocięta · Mioty 2026" : "Available Kittens · 2026 Litters"}</span>
            </div>
            <h2
              className="font-heading font-light text-black leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)" }}
            >
              Wybierz swojego<br />
              <span className="font-semibold italic">Maine Coona.</span>
            </h2>
          </div>

          {/* Filtry Apple-style */}
          <div className="flex items-center flex-wrap gap-2">
            {[
              { id: "available", label: lang === "PL" ? "● Dostępne (3)" : "● Available (3)" },
              { id: "male", label: lang === "PL" ? "Kocurki ♂" : "Males ♂" },
              { id: "female", label: lang === "PL" ? "Kotki ♀" : "Females ♀" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as typeof filter);
                  const firstMatch = KITTENS.find((k) => {
                    if (tab.id === "available") return k.status === "available";
                    if (tab.id === "male") return k.gender === "male";
                    if (tab.id === "female") return k.gender === "female";
                    return true;
                  });
                  if (firstMatch) setActiveId(firstMatch.id);
                }}
                className={`text-xs font-ui uppercase tracking-wider px-4 py-2.5 rounded-full transition-all cursor-pointer font-medium ${
                  filter === tab.id
                    ? "bg-black text-white shadow-md"
                    : "bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Główny Split Showcase (Karta Produktu Apple iPhone Glass) ───────────── */}
        <div className="bg-white/85 backdrop-blur-2xl rounded-3xl sm:rounded-[36px] border border-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 mb-10 transition-all duration-300">
          
          {/* LEWA KOLUMNA: Zdjęcie + Status Overlay */}
          <div className="lg:col-span-6 relative bg-black/5 min-h-[380px] sm:min-h-[480px] lg:min-h-[640px] overflow-hidden">
            <Image
              src={currentKitten.image}
              alt={currentKitten.name}
              fill
              className="object-cover object-center transition-all duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Status Badge na zdjęciu */}
            <div className="absolute top-5 left-5 z-10 flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-mono uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-bold shadow-lg backdrop-blur-md flex items-center gap-2 ${
                  currentKitten.status === "available"
                    ? "bg-emerald-500 text-white"
                    : "bg-black/80 text-white/80 border border-white/20"
                }`}
              >
                {currentKitten.status === "available" && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
                <span>
                  {currentKitten.status === "available"
                    ? (lang === "PL" ? "Dostępny do rezerwacji" : "Available")
                    : (lang === "PL" ? "Zarezerwowany" : "Reserved")}
                </span>
              </span>

              <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/20">
                {currentKitten.readyDate}
              </span>
            </div>

            {/* Pigułka szacowanej wagi na dole zdjęcia */}
            <div className="absolute bottom-5 left-5 right-5 z-10 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-between text-xs font-mono">
              <span className="text-white/70">{lang === "PL" ? "Szacowana waga docelowa:" : "Target weight:"}</span>
              <span className="font-bold text-amber-300">{currentKitten.weightEstimate}</span>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Parametry, Wyprawka, CTA */}
          <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Imię i płeć */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3
                  className="font-heading font-normal text-black leading-none"
                  style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
                >
                  {currentKitten.name}
                </h3>
                <span className="text-sm font-mono px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/70 font-bold">
                  {currentKitten.gender === "female" ? "♀ Kotka" : "♂ Kocur"}
                </span>
              </div>

              {/* Kod EMS & Kolor */}
              <p className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-4">
                {currentKitten.color} · <span className="text-black/50">({currentKitten.emsCode})</span>
              </p>

              {/* Opis charakteru */}
              <p className="text-base text-black/70 font-body leading-relaxed mb-6 font-light">
                {currentKitten.desc}
              </p>

              {/* Kluczowe cechy - 4 pigułki */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {currentKitten.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/[0.03] border border-black/5 text-xs font-body text-black/80"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Pakiet hodowlany w cenie każdego kociaka */}
              <div className="border-t border-black/10 pt-6 mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-black/40 font-semibold mb-3">
                  {lang === "PL" ? "W cenie każdego kociaka (Standard Hodowli):" : "Included with every kitten:"}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs font-body text-black/70">
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Rodowód FIFe / FPL 5 pokoleń</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Badania HCM/PKD/SMA N/N</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Chip + 2x szczepienie + odrobaczenie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Luksusowa wyprawka na start</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Przyciski CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-black/10">
              {currentKitten.status === "available" ? (
                <button
                  onClick={() => onOpenReservation(currentKitten.name)}
                  className="flex-1 px-8 py-4 rounded-full bg-black text-white text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-black/85 transition-all transform hover:-translate-y-0.5 shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{lang === "PL" ? `Zarezerwuj ${currentKitten.name}` : `Reserve ${currentKitten.name}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenReservation()}
                  className="flex-1 px-8 py-4 rounded-full bg-black/10 text-black text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-black/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>{lang === "PL" ? "Zapisz się na listę kolejnego miotu" : "Join Waitlist"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-6 py-4 rounded-full border border-black/15 hover:border-black/30 text-black text-xs font-ui font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:bg-black/5"
              >
                <Phone className="w-3.5 h-3.5 text-black/60" />
                <span>{REAL_PHONE}</span>
              </a>
            </div>

          </div>

        </div>

        {/* ── Pasek Miniatur Kociąt do Szybkiego Wyboru ───────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {filteredKittens.map((k) => (
            <button
              key={k.id}
              onClick={() => setActiveId(k.id)}
              className={`p-3.5 rounded-2xl sm:rounded-3xl border text-left transition-all cursor-pointer flex items-center gap-3 backdrop-blur-xl ${
                activeId === k.id
                  ? "bg-white/95 border-black shadow-[0_12px_32px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,1)] scale-[1.02]"
                  : "bg-white/70 border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:bg-white/90 hover:border-black/20"
              }`}
            >
              <div className="relative w-12 h-12 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-black/10">
                <Image
                  src={k.image}
                  alt={k.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-heading font-semibold text-black truncate">
                  {k.name}
                </p>
                <p className="text-[11px] font-mono text-black/50 truncate">
                  {k.gender === "female" ? "Kotka" : "Kocur"} · {k.emsCode}
                </p>
                <p
                  className={`text-[10px] font-mono font-bold mt-0.5 ${
                    k.status === "available" ? "text-emerald-600" : "text-black/40"
                  }`}
                >
                  {k.status === "available" ? "● Dostępny" : "Zarezerwowany"}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Link do pełnej podstrony /kocieta */}
        <div className="mt-12 text-center">
          <Link
            href="/kocieta"
            className="inline-flex items-center gap-2 text-xs font-ui uppercase tracking-widest text-black/60 hover:text-black font-semibold transition-colors group"
          >
            <span>{lang === "PL" ? "Zobacz wszystkie zaplanowane mioty i zasady rezerwacji" : "View all litters & reservation rules"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
