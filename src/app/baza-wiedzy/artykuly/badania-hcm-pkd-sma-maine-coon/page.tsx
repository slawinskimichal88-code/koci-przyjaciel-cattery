"use client";

import React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { Article3HealthInteractive } from "@/components/articles/ArticleInteractives";
import { ArrowRight, CheckCircle2, AlertTriangle, HeartPulse, Dna, Activity } from "lucide-react";

const TOC = [
  { id: "intro", label: "Dlaczego to ważne?" },
  { id: "hcm", label: "HCM — badanie serca" },
  { id: "interaktywne", label: "Interaktywne testy HCM/PKD/SMA" },
  { id: "jak-wyglada", label: "Jak wygląda badanie w praktyce?" },
  { id: "harmonogram", label: "Harmonogram badań" },
  { id: "dostepne", label: "Nasze certyfikaty zdrowia" },
];

export default function Article3Page() {
  return (
    <ArticleLayout
      slug="badania-hcm-pkd-sma-maine-coon"
      number="03"
      accentClass="text-rose-300"
      accentGlow="from-rose-500 to-red-400"
      readTime="12 min czytania"
      seoTag="HCM · PKD · SMA · Genetyka"
      title="Badania HCM (Echo Doppler), PKD i SMA u Maine Coon — dlaczego są kluczowe przed zakupem kociaka?"
      subtitle="Kompletny przewodnik po badaniach kardiologicznych i genetycznych w certyfikowanej hodowli Maine Coon"
      toc={TOC}
      prevSlug="rodowod-fife-fpl-legalna-hodowla"
      prevTitle="Rodowód FIFe/FPL — jak rozpoznać legalną hodowlę?"
      nextSlug="wyprawka-dla-maine-coona"
      nextTitle="Kompletna wyprawka dla Maine Coona"
    >
      <article className="space-y-12">

        <section id="intro" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-rose-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Dlaczego badania są tak ważne przy Maine Coonie?</h2>
          </div>

          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex gap-4 mb-6">
            <HeartPulse className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Maine Coon jest rasą genetycznie predysponowaną do kardiomiopatii przerostowej (HCM). Szacuje się, że nawet 26% kotów tej rasy może być dotkniętych tą chorobą — jeśli hodowla nie prowadzi regularnych badań i selekcji.
            </p>
          </div>

          <p className="text-white/75 leading-relaxed mb-4">
            W odpowiedzialnej hodowli FIFe/FPL <span className="text-rose-300 font-medium">każdy kot hodowlany jest regularnie badany na HCM</span> przez kardiologa weterynaryjnego (badanie Echo Doppler), a testy DNA w akredytowanym laboratorium (np. Laboklin w Niemczech lub Langford w UK) eliminują nosicielstwo mutacji genetycznych powodujących SMA i PKD.
          </p>

          <p className="text-white/75 leading-relaxed">
            Kociak od hodowcy, który nie ma dokumentów potwierdzających przeprowadzenie tych badań, to inwestycja obarczona realnym ryzykiem zdrowotnym — i finansowym. Leczenie HCM u kota to koszt wieloletni i często nie przynoszący trwałego efektu.
          </p>
        </section>

        <section id="hcm" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-rose-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">HCM u Maine Coona — największe zagrożenie genetyczne rasy</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Kardiomiopatia przerostowa (Hypertrophic Cardiomyopathy — HCM) to choroba, w której ściana lewej komory serca ulega patologicznemu pogrubieniu. U kotów jest najczęstszą chorobą serca i może prowadzić do nagłej śmierci lub zastoinowej niewydolności krążenia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: "🫀", stat: "~26%", desc: "kotów Maine Coon może mieć predyspozycje genetyczne do HCM", color: "border-rose-500/30 bg-rose-500/10" },
              { icon: "📅", stat: "2–6 lat", desc: "typowy wiek pojawienia się pierwszych objawów klinicznych", color: "border-amber-500/30 bg-amber-500/10" },
              { icon: "🏆", stat: "100%", desc: "kotów hodowlanych w Koci Przyjaciel *PL z wynikiem CLEAR (serce zdrowe)", color: "border-green-500/30 bg-green-500/10" },
            ].map((s, i) => (
              <div key={i} className={`text-center p-5 rounded-2xl border ${s.color}`}>
                <span className="text-3xl block mb-2">{s.icon}</span>
                <p className="text-2xl font-bold text-white mb-1">{s.stat}</p>
                <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-3">Na czym polega badanie Echo Doppler HCM?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70">
              <div>
                <p className="font-semibold text-white mb-2">Przebieg badania</p>
                <ul className="space-y-1.5">
                  {["Wykonywane przez certyfikowanego kardiologa weterynaryjnego", "Trwa ok. 20–30 minut, bez znieczulenia", "Ultrasonograf mierzy grubość ścian serca", "Doppler ocenia przepływ krwi przez zastawki"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Częstotliwość</p>
                <ul className="space-y-1.5">
                  {["Koty do 5. roku życia: co 12–18 miesięcy", "Koty powyżej 5 lat: co 12 miesięcy", "Przed każdym rozrodem obojga rodziców", "Certyfikat ważny przez rok od badania"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="interaktywne" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-rose-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">HCM, SMA i PKD — interaktywny przewodnik po badaniach</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Przełączaj między zakładkami, aby poznać każde z trzech kluczowych badań — czym jest choroba, jak się testuje i co oznaczają wyniki:
          </p>

          <Article3HealthInteractive />
        </section>

        <section id="jak-wyglada" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-rose-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Jak to wygląda w praktyce — pytania do hodowcy</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Zanim zarezerwujesz kociaka, upewnij się, że hodowca potrafi odpowiedzieć na wszystkie poniższe pytania:
          </p>

          <div className="space-y-3">
            {[
              { q: "Kiedy ostatnie badanie Echo Doppler serca matki i ojca?", good: "Certyfikat nie starszy niż 12 miesięcy od planowanego miotu" },
              { q: "W jakim laboratorium wykonano testy DNA?", good: "Laboklin (Niemcy), Langford (UK), Genomia (Czechy) — akredytowane laby" },
              { q: "Czy certyfikaty DNA są dostępne do wglądu?", good: "Hodowca pokazuje oryginały lub skan z wynikiem N/N" },
              { q: "Czy oba badania (HCM + DNA) dotyczą obojga rodziców?", good: "Samo jedno badanie jednego rodzica to za mało — oba są niezbędne" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="font-mono text-xs text-rose-400">{String(i + 1).padStart(2, "0")}.</span>
                  {item.q}
                </p>
                <p className="text-xs text-green-400 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  Prawidłowa odpowiedź: {item.good}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="harmonogram" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-rose-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Harmonogram profilaktyki zdrowotnej w hodowli</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            W hodowli Koci Przyjaciel *PL stosujemy następujący protokół zdrowotny dla każdego miotu:
          </p>

          <div className="relative">
            <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-rose-500/50 via-rose-500/20 to-transparent" />
            <div className="space-y-4 pl-12">
              {[
                { phase: "Przed rozrodem", color: "bg-violet-500", items: ["Echo Doppler HCM obojga rodziców (kardiolog wet.)", "Testy DNA SMA + PKD (Laboklin)", "Ocena kondycji i ogólna przed kryciem"] },
                { phase: "Kociąt: 2. tydzień", color: "bg-blue-500", items: ["Ważenie i kontrola przyrostów", "Pierwsza ocena weterynaryjna miotu", "Delikatna socjalizacja dotykowa"] },
                { phase: "Kociąt: 6. tydzień", color: "bg-amber-500", items: ["Odrobaczanie kociąt (Drontal lub equiv.)", "Badanie kliniczne każdego kociaka indywidualnie", "Ocena wad wrodzonych (podniebienie, serce)"] },
                { phase: "Kociąt: 8–9. tydzień", color: "bg-orange-500", items: ["Pierwsze szczepienia (Tricat lub Purevax 3w1)", "Odrobaczanie drugie", "Wystawienie paszportu weterynaryjnego"] },
                { phase: "Kociąt: 12. tydzień", color: "bg-green-500", items: ["Drugie szczepienie (przypominające)", "Wszczepienie mikrochipa ISO", "Rejestracja w FPL — rodowód miotu", "Adopcja z pełną dokumentacją"] },
              ].map((phase, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${phase.color} ring-2 ring-black`} />
                  <p className={`text-xs font-mono uppercase tracking-widest mb-2 ${["text-violet-400","text-blue-400","text-amber-400","text-orange-400","text-green-400"][i]}`}>{phase.phase}</p>
                  <ul className="space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-3 h-3 text-white/30 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dostepne" className="scroll-mt-28">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-600/20 via-red-700/15 to-transparent border border-rose-500/20 text-center">
            <HeartPulse className="w-8 h-8 text-rose-400 mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-white mb-3">
              Nasze certyfikaty HCM i DNA — do wglądu na życzenie
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              Wszystkie koty hodowlane w Koci Przyjaciel *PL mają aktualne badania Echo Doppler HCM oraz certyfikaty DNA Laboklin z wynikiem N/N dla SMA i PKD. Dokumenty udostępniamy przed adopcją.
            </p>
            <Link
              href="/dostepne-kociaki"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
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
