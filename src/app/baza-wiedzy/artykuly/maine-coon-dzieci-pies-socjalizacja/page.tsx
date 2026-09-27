"use client";

import React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { Article5SocializationInteractive } from "@/components/articles/ArticleInteractives";
import { ArrowRight, CheckCircle2, Heart, Users } from "lucide-react";

const TOC = [
  { id: "intro", label: "Maine Coon — pies wśród kotów" },
  { id: "charakter", label: "Charakter rasy" },
  { id: "dzieci", label: "Maine Coon z dziećmi" },
  { id: "pies", label: "Maine Coon z psem" },
  { id: "socjalizacja", label: "Socjalizacja w hodowli" },
  { id: "interaktywne", label: "Interaktywne porównanie" },
  { id: "dostepne", label: "Nasze socjalizowane kocięta" },
];

const CHAR_TRAITS = [
  { trait: "Wyjątkowa lojalność wobec rodziny", icon: "🤝" },
  { trait: "Głośna komunikacja (tryle, piski, miauczenie wokalne)", icon: "🎵" },
  { trait: "Fascynacja wodą — wielu MC wchodzi do prysznica", icon: "💧" },
  { trait: "Inteligencja — uczą się komend, fetch i otwierania klamek", icon: "🧠" },
  { trait: "Cierpliwość z dziećmi i delikatność w zabawie", icon: "👶" },
  { trait: "Dominacja nad psami — nierzadko stają się alfą domu", icon: "🐕" },
  { trait: "Wolne dojrzewanie — pełną osobowość rozwijają do 4–5 lat", icon: "🌱" },
  { trait: "Miłość do obserwowania z wyżyn — cat tv i antenki", icon: "👀" },
];

export default function Article5Page() {
  return (
    <ArticleLayout
      slug="maine-coon-dzieci-pies-socjalizacja"
      number="05"
      accentClass="text-sky-300"
      accentGlow="from-sky-500 to-blue-400"
      readTime="8 min czytania"
      seoTag="Socjalizacja · Dzieci · Pies"
      title="Maine Coon a dzieci i pies w domu — jak wygląda socjalizacja w bezklatkowej hodowli?"
      subtitle="Etapy socjalizacji kociąt, temperament Maine Coona i praktyczne wskazówki dla rodzin z dziećmi i psami"
      toc={TOC}
      prevSlug="wyprawka-dla-maine-coona"
      prevTitle="Kompletna wyprawka dla Maine Coona"
    >
      <article className="space-y-12">

        <section id="intro" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-sky-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Maine Coon — „pies wśród kotów"</h2>
          </div>

          <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex gap-4 mb-6">
            <Heart className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Maine Coon jest często nazywany „psem wśród kotów" — i nie bez powodu. Rasa ta wyróżnia się wyjątkową więzią z rodziną, podążaniem za opiekunem, uczestnictwem w codziennych czynnościach i zdolnością do nauki komend.
            </p>
          </div>

          <p className="text-white/75 leading-relaxed mb-4">
            W odróżnieniu od wielu innych ras, <span className="text-sky-300 font-medium">Maine Coon rzadko chowa się przed gośćmi</span> — wręcz przeciwnie, aktywnie uczestniczy w życiu towarzyskim domu. To czyni go idealnym towarzyszem dla rodzin z dziećmi, ale także dla domów z psami.
          </p>

          <p className="text-white/75 leading-relaxed">
            Kluczem do takiego charakteru jest jednak <strong className="text-white">właściwa socjalizacja od pierwszych tygodni życia</strong>. I tutaj rola hodowli jest absolutnie fundamentalna — bo to, z czym kociak zetknie się w pierwszych 12 tygodniach życia, kształtuje jego charakter na całe życie.
          </p>
        </section>

        <section id="charakter" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-sky-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Charakter Maine Coona — co sprawia, że jest wyjątkowy?</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Maine Coon to rasa o bogatym, złożonym charakterze. Oto 8 cech, które wyróżniają go spośród innych kotów:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHAR_TRAITS.map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-sky-500/25 transition-all">
                <span className="text-xl shrink-0">{t.icon}</span>
                <span className="text-sm text-white/75">{t.trait}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="dzieci" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-sky-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Maine Coon z dziećmi — dlaczego to idealne połączenie?</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Maine Coon to jedna z niewielu ras, o których można powiedzieć, że <em>naprawdę lubią dzieci</em>. Wynika to z kilku cech rasy:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20">
              <p className="font-semibold text-sky-300 mb-3">Dlaczego MC dobrze znosi dzieci?</p>
              <ul className="space-y-2">
                {[
                  "Cierpliwy temperament — rzadko traci panowanie",
                  "Duża masa ciała — jest mniej wrażliwy na przypadkowe uściski",
                  "Wysoka inteligencja — rozumie niezamierzone ruchy dzieci",
                  "Socjalizacja od urodzenia z dziećmi w hodowli bezklatkowej",
                  "Naturalnie delikatne ruchy łap — bez wysuniętych pazurów",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="font-semibold text-white mb-3">Jak przygotować dziecko?</p>
              <ul className="space-y-2">
                {[
                  "Naucz dziecko, że kota nie nosi się jak plecak",
                  "Pokaż, jak głaskać — zawsze zgodnie z kierunkiem sierści",
                  "Wyznacz kotu strefę ucieczki (np. drapak, wyższe miejsce)",
                  "Nadzoruj pierwsze kilka tygodni interakcji",
                  "Pozwól kotu inicjować kontakt — nie forsuj zabawy",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-sm text-white/50 p-4 rounded-xl bg-white/[0.02] border border-white/8">
            💡 <strong className="text-white">Ważne:</strong> Maine Coony z naszej hodowli bezklatkowej od urodzenia żyją w domu z dziećmi i dorosłymi. Kocięta przyzwyczajają się do głośnych dźwięków, śmiechu i chaotycznych ruchów — co czyni je wyjątkowo odpornym na stres nowe domu.
          </p>
        </section>

        <section id="pies" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-sky-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Maine Coon z psem — kto tu rządzi?</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            Prawda jest zaskakująca: w większości domów z Maine Coonem i psem to <span className="text-sky-300 font-medium">KOT zostaje alfą</span>. Oczywiście zależy to od charakteru konkretnych zwierząt, ale naturalna pewność siebie i spokój Maine Coona skutecznie „ustawiają" nawet większe psy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {[
              { phase: "Tydzień 1–2", title: "Strefy bez kontaktu", desc: "Kociak za bramką, pies po drugiej stronie. Wymiana zapachów przez kocyk." },
              { phase: "Tydzień 2–3", title: "Kontakt wzrokowy", desc: "Pies na smyczy, kociak wolny. Obserwacja bez możliwości gonionki." },
              { phase: "Tydzień 3+", title: "Swobodny kontakt", desc: "Tylko gdy oba zwierzęta są spokojne. Zawsze z nadzorem na początku." },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-xs font-mono text-sky-400 mb-2">{s.phase}</p>
                <p className="font-semibold text-white text-sm mb-1">{s.title}</p>
                <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/65 text-sm leading-relaxed">
            Kluczem do sukcesu jest <strong className="text-white">nigdy nie forsować spotkania</strong>. Każde złe doświadczenie może utrwalić niechęć na lata. Cierpliwa, stopniowa integracja — nawet przez 4–6 tygodni — procentuje całe życie.
          </p>
        </section>

        <section id="socjalizacja" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-sky-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Jak przebiega socjalizacja w naszej bezklatkowej hodowli?</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-5">
            W hodowli Koci Przyjaciel *PL kocięta od pierwszego dnia życia rozwijają się w warunkach domowych — nie w klatkach, nie w izolowanych pomieszczeniach, lecz w salonie pośrodku codziennego życia rodziny:
          </p>

          <div className="space-y-3">
            {[
              { icon: "📺", title: "Stymulacja dźwiękami", desc: "Odkurzacz, telewizor, muzyka, śmiech dzieci — kocięta oswajają się z wszystkimi domowymi dźwiękami od 2. tygodnia życia." },
              { icon: "👐", title: "Codzienny kontakt z ludźmi", desc: "Każde kocię jest trzymane, przytulane i głaskane przez domowników i gości od urodzenia. Uczy się, że ludzki dotyk = bezpieczeństwo." },
              { icon: "🐕", title: "Kontakt z psem (nasz dom)", desc: "Kocięta socjalizowane są z naszym psem od 6. tygodnia życia w kontrolowanych warunkach. Uczą się rozumieć psi język ciała." },
              { icon: "🎮", title: "Stymulacja intelektualna", desc: "Zabawki edukacyjne, tunele, różne faktury i struktury — kocięta rozwijają pewność siebie i ciekawość świata." },
              { icon: "🧼", title: "Oswajanie z pielęgnacją", desc: "Regularne szczotkowanie, dotykanie łap, uszu i oczu od 4. tygodnia — kociak gotowy na wizyty u weterynarza." },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-sky-500/25 transition-all">
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-white/65 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="interaktywne" className="scroll-mt-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-sky-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Interaktywne: Etapy socjalizacji i porównanie cech z psem</h2>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            Przełączaj etapy socjalizacji i sprawdź, jak Maine Coon wypada w porównaniu z psem pod względem cech charakteru:
          </p>

          <Article5SocializationInteractive />
        </section>

        <section id="dostepne" className="scroll-mt-28">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-600/20 via-blue-700/15 to-transparent border border-sky-500/20 text-center">
            <Users className="w-8 h-8 text-sky-400 mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-white mb-3">
              Szukasz kociaka dla rodziny z dziećmi lub psem?
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              Nasze kocięta są socjalizowane od urodzenia w prawdziwym domu — z dziećmi, psem i codziennym życiem rodziny. To gwarancja kociaka przyjaznego, ufnego i gotowego na nowy dom.
            </p>
            <Link
              href="/dostepne-kociaki"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
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
