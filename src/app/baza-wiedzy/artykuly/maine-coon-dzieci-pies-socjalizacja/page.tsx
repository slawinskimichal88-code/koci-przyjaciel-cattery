"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleLayout, SectionHeading, StatCard, PhotoCard, CheckRow, SocializationTimeline, TraitBars } from "@/components/articles/ArticleLayout";
import { ArrowRight, CheckCircle2, Heart, Users } from "lucide-react";

const TOC = [
  { id: "intro", label: "Pies wśród kotów" },
  { id: "charakter", label: "Charakter rasy" },
  { id: "dzieci", label: "Maine Coon z dziećmi" },
  { id: "pies", label: "Maine Coon z psem" },
  { id: "socjalizacja", label: "Socjalizacja w hodowli" },
  { id: "porownanie", label: "MC vs. pies — cechy" },
  { id: "cta", label: "Socjalizowane kocięta" },
];

export default function Article5Page() {
  return (
    <ArticleLayout
      number="05"
      accent="sky"
      accentHex="#0EA5E9"
      readTime="8 min czytania"
      tag="Socjalizacja · Dzieci · Pies"
      title="Maine Coon a dzieci i pies w domu — jak wygląda socjalizacja w bezklatkowej hodowli?"
      subtitle="Etapy socjalizacji kociąt, temperament Maine Coona i praktyczne wskazówki dla rodzin z dziećmi i psami"
      heroImage="/images/cats/cat_05.webp"
      heroAlt="Kociak Maine Coon socjalizowany z dziećmi i psem — hodowla bezklatkowa Koci Przyjaciel"
      heroCaption="Hodowla bezklatkowa · Kocięta żyją w rodzinie od urodzenia · Wrocław"
      toc={TOC}
      prevSlug="wyprawka-dla-maine-coona"
      prevTitle="Kompletna wyprawka dla Maine Coona"
    >
      <article className="space-y-16">

        {/* ── SECTION 1 ── */}
        <section id="intro" className="scroll-mt-8">
          <SectionHeading accent="sky">Maine Coon — „pies wśród kotów"</SectionHeading>

          <div className="p-5 rounded-2xl bg-sky-500/[0.1] border border-sky-500/25 flex gap-4 mb-6">
            <Heart className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Maine Coon jest często nazywany „psem wśród kotów" — i nie bez powodu. Rasa ta wyróżnia się wyjątkową więzią z rodziną, podążaniem za opiekunem, uczestnictwem w codziennych czynnościach i zdolnością do nauki komend.
            </p>
          </div>

          <PhotoCard image="/images/matki/matka_07.webp" alt="Maine Coon wyjątkowy charakter lojalność rodzina" side="right">
            <p className="text-[#86868b] leading-relaxed mb-4 text-sm sm:text-base">
              W odróżnieniu od wielu innych ras, <span className="text-sky-300 font-medium">Maine Coon rzadko chowa się przed gośćmi</span> — wręcz przeciwnie, aktywnie uczestniczy w życiu towarzyskim domu.
            </p>
            <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
              Kluczem do takiego charakteru jest właściwa socjalizacja od pierwszych tygodni życia. I tutaj rola hodowli jest fundamentalna — bo to, z czym kociak zetknie się w pierwszych 12 tygodniach, kształtuje jego charakter na całe życie.
            </p>
          </PhotoCard>
        </section>

        {/* ── SECTION 2 — Character ── */}
        <section id="charakter" className="scroll-mt-8">
          <SectionHeading accent="sky">Charakter Maine Coona — 8 cech, które go wyróżniają</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "🤝", title: "Wyjątkowa lojalność wobec rodziny", desc: "Podąża za opiekunem przez cały dom jak wierny pies." },
              { icon: "🎵", title: "Głośna komunikacja", desc: "Tryle, piski, ptasie dźwięki — MC nie miauczy jak typowy kot." },
              { icon: "💧", title: "Fascynacja wodą", desc: "Wielu MC wchodzi do prysznica lub zagłębia łapę w misce z wodą." },
              { icon: "🧠", title: "Wysoka inteligencja", desc: "Uczą się komend, otwierają klamki, grają w fetch." },
              { icon: "👶", title: "Cierpliwość z dziećmi", desc: "Wysoka tolerancja i delikatność — naturalny kompan dla małych." },
              { icon: "🐕", title: "Dominacja nad psami", desc: "Nierzadko to MC zostaje alfą domu, ustanawiając hierarchię." },
              { icon: "🌱", title: "Wolne dojrzewanie", desc: "Pełną osobowość rozwijają do 4–5 roku życia — dorośli wolniej." },
              { icon: "👀", title: "Obserwator z wysokości", desc: "Uwielbia obserwować rodzinę z drapeża lub parapetu." },
            ].map((t, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-[#161617] border border-white/[0.08] hover:border-sky-500/25 transition-all">
                <span className="text-xl shrink-0">{t.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-0.5">{t.title}</p>
                  <p className="text-xs text-[#86868b]">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3 — With children ── */}
        <section id="dzieci" className="scroll-mt-8">
          <SectionHeading accent="sky">Maine Coon z dziećmi — dlaczego to idealne połączenie?</SectionHeading>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] mb-7" style={{ height: "clamp(180px, 25vw, 300px)" }}>
            <Image src="/images/cats/cat_01.webp" alt="Maine Coon z dziećmi towarzyski spokojny" fill className="object-cover object-[50%_30%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <div className="max-w-sm">
                <p className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">Socjalizacja od urodzenia</p>
                <p className="font-heading font-light text-white text-xl sm:text-2xl leading-snug">
                  Cierpliwość. Delikatność.<br />
                  <span className="font-semibold italic text-sky-200">Zero agresji wobec dzieci.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-sky-500/[0.08] border border-sky-500/20">
              <p className="font-semibold text-sky-300 mb-3 text-sm">Dlaczego MC dobrze znosi dzieci?</p>
              <ul className="space-y-1.5">
                {["Cierpliwy temperament — rzadko traci panowanie", "Duża masa ciała — mniej wrażliwy na przypadkowe uściski", "Inteligencja — rozumie niezamierzone ruchy dzieci", "Socjalizacja od urodzenia z dziećmi w hodowli", "Naturalna delikatność łap — bez wysuniętych pazurów"].map((item, i) => (
                  <CheckRow key={i} variant="ok">{item}</CheckRow>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-[#161617] border border-white/[0.08]">
              <p className="font-semibold text-white mb-3 text-sm">Jak przygotować dziecko?</p>
              <ul className="space-y-1.5">
                {["Naucz, że kota nie nosi się jak plecak", "Pokaż, jak głaskać — zgodnie z kierunkiem sierści", "Wyznacz kotu strefę ucieczki (drapak, półka)", "Nadzoruj pierwsze tygodnie interakcji", "Pozwól kotu inicjować kontakt — nie forsuj zabawy"].map((item, i) => (
                  <CheckRow key={i} variant="ok">{item}</CheckRow>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — With dog ── */}
        <section id="pies" className="scroll-mt-8">
          <SectionHeading accent="sky">Maine Coon z psem — kto tu rządzi?</SectionHeading>

          <p className="text-[#86868b] leading-relaxed mb-6 text-sm sm:text-base">
            Prawda jest zaskakująca: w większości domów z Maine Coonem i psem to <span className="text-sky-300 font-medium">KOT zostaje alfą</span>. Naturalna pewność siebie MC skutecznie „ustawia" nawet większe psy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { color: "border-violet-500/30 bg-violet-500/[0.08]", accent: "text-violet-400", phase: "Tydzień 1–2", title: "Strefy bez kontaktu", desc: "Kociak za bramką, pies po drugiej stronie. Wymiana zapachów przez kocyk — bez stresu." },
              { color: "border-blue-500/30 bg-blue-500/[0.08]", accent: "text-blue-400", phase: "Tydzień 2–3", title: "Kontakt wzrokowy", desc: "Pies na smyczy, kociak wolny. Obserwacja bez możliwości gonionki. Nagradzaj spokój." },
              { color: "border-sky-500/30 bg-sky-500/[0.08]", accent: "text-sky-400", phase: "Tydzień 3+", title: "Swobodny kontakt", desc: "Tylko gdy oba zwierzęta są spokojne. Zawsze z nadzorem na początku. Nie forsuj." },
            ].map((s, i) => (
              <div key={i} className={`p-5 rounded-2xl border ${s.color}`}>
                <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${s.accent}`}>{s.phase}</p>
                <p className="font-semibold text-white text-sm mb-2">{s.title}</p>
                <p className="text-xs text-[#86868b] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5 — Socialization in cattery ── */}
        <section id="socjalizacja" className="scroll-mt-8">
          <SectionHeading accent="sky">Etapy socjalizacji w naszej bezklatkowej hodowli</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-6 text-sm">
            Przełączaj etapy, aby dowiedzieć się co robimy na każdym etapie życia kociaka:
          </p>
          <SocializationTimeline />

          <div className="mt-5 space-y-2">
            {[
              { icon: "📺", title: "Stymulacja dźwiękami domowymi", desc: "Odkurzacz, TV, muzyka, śmiech — kocięta uczą się, że te dźwięki = normalne, bezpieczne." },
              { icon: "👐", title: "Codzienny dotyk z ludźmi", desc: "Każde kocię jest trzymane i głaskane przez rodzinę od urodzenia. Dotyk = bezpieczeństwo." },
              { icon: "🐕", title: "Kontakt z psem", desc: "Nasz pies towarzyszy kociętom od 6. tygodnia życia w kontrolowanych warunkach." },
              { icon: "🧼", title: "Oswajanie z pielęgnacją", desc: "Szczotkowanie, dotykanie łap i uszu od 4. tygodnia — kociak gotowy na wizyty u wet." },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-[#161617] border border-white/[0.08] hover:border-sky-500/25 transition-all">
                <span className="text-xl shrink-0">{s.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-0.5">{s.title}</p>
                  <p className="text-xs text-[#86868b]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6 — Trait comparison ── */}
        <section id="porownanie" className="scroll-mt-8">
          <SectionHeading accent="sky">Maine Coon vs. pies — porównanie cech charakteru</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-6 text-sm">
            Jak Maine Coon wypada w porównaniu do psa w kluczowych cechach:
          </p>
          <TraitBars />
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="scroll-mt-8">
          <div className="relative rounded-3xl overflow-hidden border border-sky-500/20" style={{ minHeight: 260 }}>
            <Image src="/images/matki/matka_01.webp" alt="Socjalizowane kocięta Maine Coon Koci Przyjaciel dla rodzin" fill className="object-cover object-[50%_25%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="relative p-8 sm:p-10">
              <p className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-3">Dla rodzin z dziećmi i psem</p>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3 max-w-md">
                Kocięta socjalizowane<br />od pierwszego dnia życia
              </h3>
              <p className="text-[#86868b] text-sm mb-7 max-w-sm">
                Nasze kocięta żyją w rodzinie — z dziećmi, psem i codziennym życiem. Ufne, pewne siebie, gotowe na nowy dom.
              </p>
              <Link href="/dostepne-kociaki" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all hover:scale-105">
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
