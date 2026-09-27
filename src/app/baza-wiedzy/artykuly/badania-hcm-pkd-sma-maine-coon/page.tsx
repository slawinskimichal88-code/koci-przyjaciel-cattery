"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleLayout, SectionHeading, StatCard, PhotoCard, CheckRow, HealthTestsInteractive } from "@/components/articles/ArticleLayout";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TOC = [
  { id: "intro", label: "Dlaczego to ważne?" },
  { id: "hcm", label: "HCM — badanie serca" },
  { id: "testy", label: "HCM · SMA · PKD — interaktywnie" },
  { id: "pytania", label: "Pytania do hodowcy" },
  { id: "harmonogram", label: "Harmonogram badań" },
  { id: "cta", label: "Nasze certyfikaty" },
];

export default function Article3Page() {
  return (
    <ArticleLayout
      number="03"
      accent="rose"
      accentHex="#F43F5E"
      readTime="12 min czytania"
      tag="HCM · PKD · SMA · Genetyka"
      title="Badania HCM (Echo Doppler), PKD i SMA u Maine Coon — dlaczego są kluczowe przed zakupem kociaka?"
      subtitle="Kompletny przewodnik po badaniach kardiologicznych i genetycznych w certyfikowanej hodowli Maine Coon"
      heroImage="/images/matki/matka_04.webp"
      heroAlt="Maine Coon matka hodowlana z certyfikatem HCM CLEAR — zdrowie rasy w hodowli Koci Przyjaciel"
      heroCaption="Echo Doppler HCM · Laboklin N/N · Badania przed każdym miotem"
      toc={TOC}
      prevSlug="rodowod-fife-fpl-legalna-hodowla"
      prevTitle="Rodowód FIFe/FPL — jak rozpoznać legalną hodowlę?"
      nextSlug="wyprawka-dla-maine-coona"
      nextTitle="Kompletna wyprawka dla Maine Coona"
    >
      <article className="space-y-16">

        {/* ── SECTION 1 ── */}
        <section id="intro" className="scroll-mt-8">
          <SectionHeading accent="rose">Dlaczego badania są tak ważne przy Maine Coonie?</SectionHeading>

          <PhotoCard image="/images/matki/matka_05.webp" alt="Zdrowa kotka Maine Coon hodowla" side="right">
            <p className="text-[#86868b] leading-relaxed mb-4 text-sm sm:text-base">
              Maine Coon to rasa genetycznie predysponowana do kardiomiopatii przerostowej (HCM). Szacuje się, że nawet <span className="text-rose-300 font-medium">26% kotów tej rasy</span> może być dotkniętych tą chorobą — jeśli hodowla nie prowadzi regularnych badań i selekcji.
            </p>
            <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
              W certyfikowanej hodowli FIFe/FPL każdy kot hodowlany jest regularnie badany przez kardiologa weterynaryjnego, a testy DNA w Laboklin eliminują nosicielstwo mutacji genetycznych (SMA, PKD, HCM).
            </p>
          </PhotoCard>
        </section>

        {/* ── SECTION 2 — HCM stats ── */}
        <section id="hcm" className="scroll-mt-8">
          <SectionHeading accent="rose">HCM u Maine Coona — największe zagrożenie genetyczne rasy</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <StatCard value="~26%" unit="" label="Częstość w rasie" desc="Szacunkowy odsetek kotów Maine Coon z predyspozycją genetyczną do HCM bez selekcji hodowlanej." />
            <StatCard value="2–6" unit="lat" label="Wiek pierwszych objawów" desc="HCM pojawia się w wieku produkcyjnym kota — stąd konieczność regularnych badań, nie jednorazowych." />
            <StatCard value="CLEAR" unit="" label="Nasza hodowla" desc="Wszystkie koty hodowlane Koci Przyjaciel *PL — wynik CLEAR w badaniu Echo Doppler HCM." />
          </div>

          {/* Hero banner with overlay */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08]" style={{ height: "clamp(200px, 28vw, 340px)" }}>
            <Image src="/images/cats/cat_05.webp" alt="Maine Coon z certyfikatem zdrowia serca" fill className="object-cover object-[50%_20%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <div className="max-w-sm">
                <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">Echo Doppler HCM</p>
                <p className="font-heading font-light text-white text-xl sm:text-2xl leading-snug mb-3">
                  Badanie echokardiograficzne<br />
                  <span className="font-semibold italic text-rose-200">serca rodziców przed każdym miotem</span>
                </p>
                <div className="flex gap-2">
                  {["Kardiolog weterynaryjny", "Co 12–18 miesięcy", "Certyfikat ważny 1 rok"].map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — Interactive tests ── */}
        <section id="testy" className="scroll-mt-8">
          <SectionHeading accent="rose">HCM, SMA i PKD — interaktywny przewodnik po badaniach</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-6 text-sm">
            Przełączaj między zakładkami, aby poznać każde z trzech kluczowych badań:
          </p>
          <HealthTestsInteractive />
        </section>

        {/* ── SECTION 4 — Questions ── */}
        <section id="pytania" className="scroll-mt-8">
          <SectionHeading accent="rose">Jakie pytania zadać hodowcy?</SectionHeading>
          <div className="bg-[#161617] rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
            {[
              { q: "Kiedy ostatnie badanie Echo Doppler serca matki i ojca?", good: "Certyfikat nie starszy niż 12 miesięcy od planowanego miotu" },
              { q: "W jakim laboratorium wykonano testy DNA?", good: "Laboklin (Niemcy), Langford (UK), Genomia (Czechy)" },
              { q: "Czy certyfikaty DNA są dostępne do wglądu?", good: "Oryginały lub skany z wynikiem N/N" },
              { q: "Czy oba badania dotyczą obojga rodziców?", good: "Jedno badanie jednego rodzica to za mało" },
            ].map((item, i) => (
              <div key={i} className="px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <p className="text-sm font-semibold text-white mb-1.5">{item.q}</p>
                <p className="text-xs text-green-400 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  Prawidłowa odpowiedź: {item.good}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5 — Timeline ── */}
        <section id="harmonogram" className="scroll-mt-8">
          <SectionHeading accent="rose">Harmonogram profilaktyki zdrowotnej — od rozrodu do adopcji</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { color: "bg-violet-500", label: "Przed rozrodem", items: ["Echo Doppler HCM", "DNA SMA + PKD", "Ocena ogólna"] },
              { color: "bg-blue-500", label: "2. tydzień", items: ["Ważenie kociąt", "Kontrola wet.", "Socjalizacja"] },
              { color: "bg-amber-500", label: "6. tydzień", items: ["Odrobaczanie", "Bad. kliniczne", "Ocena wad"] },
              { color: "bg-orange-500", label: "8. tydzień", items: ["Szczepienie I", "Odrobaczanie II", "Paszport wet."] },
              { color: "bg-green-500", label: "12. tydzień", items: ["Szczepienie II", "Mikrochip", "Rodowód FPL"] },
            ].map((phase, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08]">
                <div className={`w-2 h-2 rounded-full ${phase.color} mb-2`} />
                <p className="text-[10px] font-mono text-white/40 mb-2">{phase.label}</p>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-white/65 flex items-center gap-1.5">
                      <span className={`w-1 h-1 rounded-full ${phase.color}`} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="scroll-mt-8">
          <div className="relative rounded-3xl overflow-hidden border border-rose-500/20" style={{ minHeight: 260 }}>
            <Image src="/images/matki/matka_06.webp" alt="Zdrowe kocięta Maine Coon Koci Przyjaciel certyfikaty HCM" fill className="object-cover object-[50%_25%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="relative p-8 sm:p-10">
              <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">Certyfikowana profilaktyka</p>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3 max-w-md">
                Echo Doppler HCM + Laboklin N/N — każde kocię
              </h3>
              <p className="text-[#86868b] text-sm mb-7 max-w-sm">
                Dokumenty udostępniamy przed adopcją. Zdrowie rodziców = Twój spokój ducha.
              </p>
              <Link href="/dostepne-kociaki" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-all hover:scale-105">
                Zobacz aktualnie dostępne kocięta Maine Coon w naszej hodowli
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </article>
    </ArticleLayout>
  );
}
