"use client";

import React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { Article2PedigreeInteractive } from "@/components/articles/ArticleInteractives";
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle, Info, ShieldCheck } from "lucide-react";

const TOC = [
  { id: "intro", label: "Czym jest rodowód FIFe?" },
  { id: "federacje", label: "FIFe vs. inne organizacje" },
  { id: "fpl", label: "FPL — polska organizacja FIFe" },
  { id: "czerwone-flagi", label: "Czerwone flagi pseudohodowli" },
  { id: "weryfikacja", label: "5 kroków weryfikacji" },
  { id: "dostepne", label: "Nasza hodowla FIFe/FPL" },
];

const RED_FLAGS = [
  { flag: "Kocięta dostępne przed 10. tygodniem", why: "Kociak wydany za wcześnie ma traumę separacyjną i zaburzenia socjalne" },
  { flag: "Brak zdjęcia/skanów rodowodów rodziców", why: "Legalny hodowca pokazuje dokumenty bez pytania" },
  { flag: "Odsprzedaż bez możliwości wizyty", why: "Koty z fabryk kociąt nie są wychowywane w domu — sprzedaż przez pośrednika" },
  { flag: "Cena rażąco niska lub rażąco wysoka", why: "Zbyt niska = brak badań/rodowodu; zbyt wysoka bez uzasadnienia = spekulacja" },
  { flag: "Brak umowy, rezerwacja tylko na SMS", why: "Profesjonalna hodowla zawsze podpisuje umowę adopcyjną" },
  { flag: "Wiele ras w jednej hodowli", why: "Specjalistyczna hodowla koncentruje się na jednej rasie" },
  { flag: "Brak aktywności na wystawach FIFe", why: "Hodowcy dbający o jakość linii uczestniczą w wystawach i ocenach bonitacyjnych" },
];

export default function Article2Page() {
  return (
    <ArticleLayout
      slug="rodowod-fife-fpl-legalna-hodowla"
      number="02"
      accentClass="text-amber-300"
      accentGlow="from-amber-500 to-orange-400"
      readTime="10 min czytania"
      seoTag="Rodowód · FIFe · FPL"
      title="Rodowód FIFe / FPL a stowarzyszenia spoza WCC — jak rozpoznać legalną hodowlę Maine Coon?"
      subtitle="Różnice między organizacjami felinologicznymi, 5-krokowa weryfikacja i czerwone flagi pseudohodowli"
      toc={TOC}
      prevSlug="cena-maine-coon-z-rodowodem"
      prevTitle="Ile kosztuje Maine Coon z rodowodem FIFe/FPL?"
      nextSlug="badania-hcm-pkd-sma-maine-coon"
      nextTitle="Badania HCM, PKD i SMA — dlaczego są kluczowe?"
    >
      <article className="space-y-12">

        <section id="intro" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Czym jest rodowód FIFe i dlaczego ma znaczenie?</h2>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex gap-4 mb-6">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Rodowód to dokument potwierdzający genealogię kota — zawiera imiona, numery rejestracyjne i tytuły wystawowe przodków przez co najmniej 3–5 pokoleń. Ale nie każdy dokument nazywany „rodowodem" ma tę samą wartość.
            </p>
          </div>

          <p className="text-white/75 leading-relaxed mb-4">
            <span className="text-amber-300 font-medium">FIFe (Fédération Internationale Féline)</span> to największa i najstarsza organizacja felinologiczna na świecie, zrzeszająca ponad 40 narodowych organizacji kotlarskich z całej Europy, Azji i obu Ameryk. Polska Federacja Felinologiczna (FPL) jest oficjalnym, akredytowanym członkiem FIFe.
          </p>

          <p className="text-white/75 leading-relaxed">
            Kociak z rodowodem FIFe/FPL ma potwierdzoną tożsamość genetyczną i genealogiczną. Każdy przodek w jego rodowodzie był oceniony bonitacyjnie, a hodowla musiała spełniać wymogi federacji — w tym obowiązkowe badania zdrowotne rodziców.
          </p>
        </section>

        <section id="federacje" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Porównanie: FIFe, inne organizacje i brak rodowodu</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Nie każda organizacja felinologiczna ma te same standardy. Kliknij każdą kartę, aby poznać szczegóły:
          </p>

          <Article2PedigreeInteractive />
        </section>

        <section id="fpl" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">FPL — Polska Federacja Felinologiczna pod auspicjami FIFe</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Polska Federacja Felinologiczna (FPL) jest jedyną polską organizacją kotlarską posiadającą status pełnoprawnego członka FIFe. To oznacza, że hodowle zarejestrowane w FPL spełniają wymagania FIFe, a ich rodowody są uznawane w ponad 40 krajach.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🏆", label: "Najwyższy standard", desc: "Pełny członek FIFe" },
              { icon: "🌍", label: "Zasięg globalny", desc: "Rodowody uznane w 40+ krajach" },
              { icon: "📋", label: "Rejestr hodowli", desc: "Każda hodowla ma nr rejestracyjny" },
              { icon: "🎖️", label: "Wystawy rangi CAC", desc: "Champion, Grand Champion, IC" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-xs font-semibold text-amber-300 mb-1">{item.label}</p>
                <p className="text-[11px] text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="czerwone-flagi" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">🚩 Czerwone flagi — sygnały ostrzegawcze pseudohodowli</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Na polskim rynku działa wiele podmiotów oferujących „Maine Coony" bez żadnej dokumentacji lub z dokumentami budzącymi wątpliwości. Oto 7 sygnałów, które powinny wzbudzić Twój niepokój:
          </p>

          <div className="space-y-2">
            {RED_FLAGS.map((rf, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-red-500/8 border border-red-500/20 hover:bg-red-500/12 transition-all">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{rf.flag}</p>
                  <p className="text-xs text-white/50">{rf.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="weryfikacja" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Jak zweryfikować hodowlę przed zakupem? 5 kroków</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Poniżej znajdziesz nasz interaktywny 5-krokowy weryfikator legalności hodowli — rozwiń go, żeby sprawdzić każdy punkt:
          </p>

          <Article2PedigreeInteractive />

          <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">Wskazówka pro</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Możesz bezpośrednio wyszukać numer rejestracyjny hodowli na oficjalnej stronie FPL lub TICA. Jeśli hodowca podaje numer, a organizacja go nie zna — to pewny sygnał problemu.
            </p>
          </div>
        </section>

        <section id="dostepne" className="scroll-mt-28">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-600/20 via-orange-700/15 to-transparent border border-amber-500/20 text-center">
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">Koci Przyjaciel *PL · FPL / FIFe</p>
            <h3 className="font-semibold text-xl text-white mb-3">
              Pełna dokumentacja, certyfikowane badania, wizyty mile widziane
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              Nasza hodowla jest zarejestrowana w Polskiej Federacji Felinologicznej (FPL) pod auspicjami FIFe. Każde kocię opuszcza hodowlę z rodowodem, paszportem weterynaryjnym i certyfikatami badań genetycznych.
            </p>
            <Link
              href="/dostepne-kociaki"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all duration-200 hover:scale-105"
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
