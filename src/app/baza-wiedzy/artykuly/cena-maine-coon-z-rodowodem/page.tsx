"use client";

import React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { Article1PriceInteractive } from "@/components/articles/ArticleInteractives";
import { ArrowRight, CheckCircle2, AlertTriangle, Info } from "lucide-react";

const TOC = [
  { id: "intro", label: "Dlaczego cena się różni?" },
  { id: "czynniki", label: "4 główne czynniki ceny" },
  { id: "z-czego-wynika", label: "Co wchodzi w cenę kociaka" },
  { id: "pseudohodowle", label: "Hodowla vs. pseudohodowla" },
  { id: "jak-oceniac", label: "Jak ocenić ofertę?" },
  { id: "dostepne", label: "Nasze dostępne kocięta" },
];

export default function Article1Page() {
  return (
    <ArticleLayout
      slug="cena-maine-coon-z-rodowodem"
      number="01"
      accentClass="text-violet-300"
      accentGlow="from-violet-500 to-purple-400"
      readTime="8 min czytania"
      seoTag="Cena · Rodowód · FIFe"
      title="Ile kosztuje kot Maine Coon z rodowodem FIFe/FPL w 2026 roku i skąd bierze się cena?"
      subtitle="Od czego zależy cena kociaka, co wchodzi w jej skład i dlaczego różni się między hodowlami"
      toc={TOC}
      nextSlug="rodowod-fife-fpl-legalna-hodowla"
      nextTitle="Rodowód FIFe/FPL — jak rozpoznać legalną hodowlę?"
    >
      <article className="prose-custom space-y-12">

        {/* ── SECTION 1 ─────────────────────────────────────────────── */}
        <section id="intro" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-violet-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Dlaczego ceny różnią się tak bardzo?
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex gap-4 mb-6">
            <Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Porównując oferty na Maine Coona, można spotkać ogromną rozpiętość cen. Jest to naturalne, bo za tą rozpiętością stoi zupełnie inny standard hodowlany — a co za tym idzie, zupełnie inne ryzyko dla przyszłego opiekuna.
            </p>
          </div>

          <p className="text-white/75 leading-relaxed mb-4">
            Cena kociaka Maine Coon z certyfikowanego chowu FIFe/FPL jest wypadkową dziesiątek realnych kosztów, jakie ponosi odpowiedzialna hodowla — od testów genetycznych rodziców, przez badania echokardiograficzne serca, po utrzymanie kociąt przez pierwsze 12 tygodni w warunkach domowych z pełną socjalizacją.
          </p>

          <p className="text-white/75 leading-relaxed">
            Kluczowe jest zrozumienie, że <span className="text-violet-300 font-medium">cena kociaka bez rodowodu i badań nie jest „tanim Maine Coonem"</span> — jest Maine Coonem bez weryfikowalnej tożsamości genetycznej, bez potwierdzenia zdrowia rodziców i bez jakiejkolwiek gwarancji standardu rasy.
          </p>
        </section>

        {/* ── SECTION 2 ─────────────────────────────────────────────── */}
        <section id="czynniki" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-violet-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              4 główne czynniki kształtujące cenę
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Kliknij każdy z poniższych obszarów, aby rozwinąć szczegóły tego, co składa się na finalną cenę kociaka:
          </p>

          <Article1PriceInteractive />
        </section>

        {/* ── SECTION 3 ─────────────────────────────────────────────── */}
        <section id="z-czego-wynika" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-violet-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Co konkretnie wchodzi w cenę kociaka z hodowli?
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Certyfikowana hodowla to nie tylko ładne zdjęcia kociąt na Instagramie. Oto lista realnych kosztów, które hodowca ponosi zanim kociak trafi do nowego domu:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { cat: "Przed rozrodem", items: ["Badanie Echo Doppler HCM obojga rodziców", "Testy DNA SMA, PKD, HCM (Laboklin)", "Ocena bonitacyjna i wystawy — uzyskanie tytułów", "Import kota z zagranicy (ew.)"] },
              { cat: "Ciąża i poród", items: ["Badania USG ciąży", "Opieka weterynaryjna przy porodzie", "Ewentualne cesarskie cięcie", "Suplementacja matki i mleko zastępcze"] },
              { cat: "Kocięta 0–8 tygodni", items: ["Żywienie kociąt i matki karmicielki", "Odrobaczanie (dwukrotne)", "Pierwsze badania lekarskie miotu", "Socjalizacja i czas opiekunów (24/7)"] },
              { cat: "Kocięta 8–12 tygodni", items: ["Pierwsze szczepienie (Tricat/Purevax)", "Drugie szczepienie po 3–4 tyg.", "Chip elektroniczny + rejestracja", "Rodowód FPL/FIFe — dokumenty miotu"] },
            ].map((group, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">{group.cat}</p>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">Dodatkowo — Koszty stałe hodowli</p>
            <div className="flex flex-wrap gap-2">
              {["Wyżywienie rodziców premium", "Opieka wet. profilaktyczna", "Wybieg ogrodowy (woliera)", "Składki i rejestracja FPL/FIFe", "Koszty prowadzenia strony", "Szkolenia i wystawy hodowlane"].map((item, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300">{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4 ─────────────────────────────────────────────── */}
        <section id="pseudohodowle" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-violet-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Certyfikowana hodowla vs. pseudohodowla — różnica w jakości
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Poniżej znajdziesz interaktywne porównanie, co oferuje hodowla z rodowodami FIFe, a czego brakuje w ofertach bez dokumentacji. Rozwiń tabelę i sprawdź różnice punkt po punkcie:
          </p>

          {/* Reuses the compare table from Article1PriceInteractive — showing it separately */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 text-sm mb-1">Prawdziwy koszt „tańszego" kociaka</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Kociak bez badań rodziców z ryzykiem HCM może wymagać leczenia kardiologicznego, które wielokrotnie przekracza różnicę w cenie zakupu. Poza tym — kociak kupiony za mało (poniżej 12. tygodnia życia) to trauma separacyjna na całe życie.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 5 ─────────────────────────────────────────────── */}
        <section id="jak-oceniac" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-violet-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Jak ocenić, czy oferta jest uczciwa?
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Przed podjęciem decyzji o rezerwacji kociaka, warto zadać hodowcy te konkretne pytania:
          </p>

          <div className="space-y-3">
            {[
              "Czy oboje rodzice mają aktualne badania Echo Doppler HCM?",
              "Czy wyniki testów DNA (SMA, PKD, HCM) można zobaczyć w oryginale?",
              "Jaki jest numer rejestracyjny hodowli w FPL lub FIFe?",
              "Czy kociak wyjdzie po ukończeniu 12 tygodni życia?",
              "Czy jest podpisywana umowa adopcyjna?",
              "Czy można odwiedzić hodowlę przed rezerwacją?",
            ].map((q, i) => (
              <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="font-mono text-xs text-violet-400 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}.</span>
                <span className="text-sm text-white/75">{q}</span>
              </div>
            ))}
          </div>

          <p className="text-white/50 text-sm mt-4 leading-relaxed">
            Hodowca, który nie ma nic do ukrycia, chętnie odpowie na wszystkie pytania i zaprosi Cię do siebie. Odmowa wizyty lub obrona się przed pytaniami to poważny sygnał ostrzegawczy.
          </p>
        </section>

        {/* ── SECTION 6: CTA ───────────────────────────────────────── */}
        <section id="dostepne" className="scroll-mt-28">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-600/20 via-purple-700/15 to-transparent border border-violet-500/20 text-center">
            <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">Koci Przyjaciel *PL</p>
            <h3 className="font-semibold text-xl text-white mb-3">
              Chcesz poznać cenę i dostępność kociąt w naszej hodowli?
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              Hodowla Koci Przyjaciel *PL oferuje kocięta z pełną dokumentacją FIFe/FPL, badaniami serca Echo Doppler i testami genetycznymi Laboklin. Odwiedziny zawsze mile widziane.
            </p>
            <Link
              href="/dostepne-kociaki"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-violet-500 hover:bg-violet-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
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
