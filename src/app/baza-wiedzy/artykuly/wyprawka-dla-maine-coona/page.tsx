"use client";

import React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { Article4StarterKitInteractive } from "@/components/articles/ArticleInteractives";
import { ArrowRight, CheckCircle2, AlertTriangle, ShoppingBag } from "lucide-react";

const TOC = [
  { id: "intro", label: "Dlaczego przygotowanie to klucz?" },
  { id: "wielkosc", label: "Maine Coon jest WIELKI" },
  { id: "wyprawka", label: "Interaktywna wyprawka" },
  { id: "jedzenie", label: "Jak żywić Maine Coona?" },
  { id: "bezpieczenstwo", label: "Bezpieczny dom — czego unikać?" },
  { id: "dostepne", label: "Gotowy na kociaka?" },
];

const FOOD_FACTS = [
  { icon: "💧", title: "Nawodnienie przede wszystkim", desc: "Koty z natury piją mało wody — karma mokra zapewnia 70–80% dziennego zapotrzebowania na płyny, chroniąc nerki." },
  { icon: "🥩", title: "Wysoka zawartość mięsa", desc: "Maine Coon to obligatoryjny mięsożerca. Karma powinna zawierać min. 40–60% mięsa lub ryb jako pierwsze składniki." },
  { icon: "📏", title: "Duże porcje dla dużego kota", desc: "Dorosły samiec MC waży 7–11 kg. Zapotrzebowanie kaloryczne jest wyższe niż u przeciętnego kota — konsultuj z hodowcą." },
  { icon: "🚫", title: "Czego unikać?", desc: "Produkty z kukurydzą, pszenicą, cukrem, barwnikami jako głównymi składnikami. Wybieraj karma grain-free premium." },
];

export default function Article4Page() {
  return (
    <ArticleLayout
      slug="wyprawka-dla-maine-coona"
      number="04"
      accentClass="text-green-300"
      accentGlow="from-green-500 to-emerald-400"
      readTime="9 min czytania"
      seoTag="Wyprawka · Drapak · Kuweta XXL"
      title="Jak przygotować dom na kociaka Maine Coon? Kompletna wyprawka (drapak, kuweta XXL, żywienie)"
      subtitle="Interaktywna lista wszystkich akcesoriów, żywienie dużego kota i jak zabezpieczyć mieszkanie"
      toc={TOC}
      prevSlug="badania-hcm-pkd-sma-maine-coon"
      prevTitle="Badania HCM, PKD i SMA — dlaczego są kluczowe?"
      nextSlug="maine-coon-dzieci-pies-socjalizacja"
      nextTitle="Maine Coon a dzieci i pies — socjalizacja"
    >
      <article className="space-y-12">

        <section id="intro" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Dlaczego przygotowanie domu jest tak ważne?</h2>
          </div>

          <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/25 flex gap-4 mb-6">
            <ShoppingBag className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Pierwsze dni w nowym domu to ogromny stres dla każdego kociaka. Nowe zapachy, nowe dźwięki, brak mamy i rodzeństwa. Dobrze przygotowany dom skraca czas adaptacji z tygodni do dni.
            </p>
          </div>

          <p className="text-white/75 leading-relaxed mb-4">
            Maine Coon to rasa, która wymaga nieco innych akcesoriów niż „zwykły" kot. Powód jest prosty: rozmiar. Samiec Maine Coona może ważyć 10–11 kg i mierzyć nawet 120 cm od nosa do końca ogona. To wymaga innego podejścia do kuwety, drapaka i żywienia.
          </p>

          <p className="text-white/75 leading-relaxed">
            Dobra wiadomość: jednorazowe zakupy odpowiednich akcesoriów to inwestycja na lata — i przepis na szczęśliwego, dobrze zaadaptowanego kota.
          </p>
        </section>

        <section id="wielkosc" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Maine Coon jest WIELKI — o tym pamiętaj kupując akcesoria</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: "⚖️", label: "Masa ciała", value: "6–11 kg", sub: "Samce do 11 kg, samice do 7 kg" },
              { icon: "📏", label: "Długość ciała", value: "do 120 cm", sub: "Nos + tułów + ogon" },
              { icon: "📐", label: "Minimalna kuweta", value: "60×40 cm", sub: "Lub 1,5× długość kota" },
              { icon: "🌳", label: "Minimalny drapak", value: "150 cm+", sub: "Musi być stabilny przy wspinaniu" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                <span className="text-2xl block mb-1">{s.icon}</span>
                <p className="text-xs font-semibold text-green-300 mb-0.5">{s.label}</p>
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-white/40">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/70">
              <span className="font-semibold text-amber-300">Najczęstszy błąd: </span>
              Kupno standardowych akcesoriów dla małego kota. Maine Coon przerośnie 90% typowych kuwet i drapaków w ciągu pierwszego roku. Warto kupić od razu wersję XXL.
            </p>
          </div>
        </section>

        <section id="wyprawka" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Kompletna wyprawka — interaktywna checklista</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Przełączaj między kategoriami, aby zobaczyć pełną listę akcesoriów z podziałem na priorytet:
          </p>

          <Article4StarterKitInteractive />
        </section>

        <section id="jedzenie" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Jak żywić Maine Coona? Podstawy diety dużego kota</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Maine Coon to obligatoryjny mięsożerca z dużą masą ciała. Właściwe żywienie to jeden z kluczowych elementów długiego, zdrowego życia Twojego kota:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FOOD_FACTS.map((fact, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-green-500/25 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{fact.icon}</span>
                  <p className="font-semibold text-white text-sm">{fact.title}</p>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">{fact.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-3">Co jedzą kocięta Koci Przyjaciel *PL?</p>
            <div className="flex flex-wrap gap-2">
              {["Karma mokra premium (wysoka zawartość mięsa)", "Brak zbóż (grain-free)", "Suplementacja tauryny", "Woda ze świeżej fontanny", "Odpowiednia karma dla kociąt do 12 m-ca"].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-500/15 border border-green-500/25 text-green-300">
                  <CheckCircle2 className="w-3 h-3" />
                  {item}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-3">
              Przy adopcji przekazujemy szczegółowe zalecenia żywieniowe i próbkę karmy, na której wychowywany był kociak.
            </p>
          </div>
        </section>

        <section id="bezpieczenstwo" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-green-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Bezpieczny dom — lista zagrożeń do usunięcia przed adopcją</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Kociaki są niezwykle ciekawskie. Antes przyjazdu kociaka, przejdź przez dom z listą potencjalnych zagrożeń:
          </p>

          <Article4StarterKitInteractive />
        </section>

        <section id="dostepne" className="scroll-mt-28">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-green-600/20 via-emerald-700/15 to-transparent border border-green-500/20 text-center">
            <ShoppingBag className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-white mb-3">
              Masz już wszystko gotowe? Czas na kociaka!
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              Przygotowany dom, odpowiednia wyprawka i wybrany hodowca FIFe/FPL — to przepis na idealną adopcję. Sprawdź, które kocięta czekają w hodowli Koci Przyjaciel *PL.
            </p>
            <Link
              href="/dostepne-kociaki"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
            >
              Zobacz aktualnie dostępne kocięta Maine Coon w naszej hodowli
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </article>
    </ArticleLayout>
  );
}
