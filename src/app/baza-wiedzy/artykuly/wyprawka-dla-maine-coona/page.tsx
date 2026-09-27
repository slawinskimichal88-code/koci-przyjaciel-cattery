"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleLayout, SectionHeading, StatCard, PhotoCard, AccordionItem, CheckRow } from "@/components/articles/ArticleLayout";
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const CATEGORIES = [
  {
    id: "drapaki", emoji: "🪵", label: "Drapaki i meble",
    items: [
      { name: "Drapak wieżowy (min. 150 cm)", priority: "Konieczne", note: "MC osiąga 10+ kg — zwykłe drapaki się przewracają" },
      { name: "Drapak narożny do ściany", priority: "Zalecane", note: "Zabezpiecza narożniki mebli" },
      { name: "Leżanka na ścianie / półka dla kota", priority: "Zalecane", note: "Koty uwielbiają obserwować z góry" },
      { name: "Kuweta XXL (min. 60×40 cm)", priority: "Konieczne", note: "Zbyt mała kuweta = stres i niezadowolenie" },
    ],
  },
  {
    id: "jedzenie", emoji: "🍖", label: "Żywienie i woda",
    items: [
      { name: "Karma mokra premium (podstawa diety)", priority: "Konieczne", note: "Uzupełnia nawodnienie — koty piją za mało wody" },
      { name: "Fontanna na wodę", priority: "Zalecane", note: "Ruchoma woda zachęca do picia, chroni nerki" },
      { name: "Miska płytka lub elevowana", priority: "Zalecane", note: "Głęboka miska drażni wąsy (wibryssae)" },
      { name: "Karma sucha grain-free (opcja)", priority: "Opcjonalne", note: "Uzupełnia, nie zastępuje karmy mokrej" },
    ],
  },
  {
    id: "zabawa", emoji: "🎾", label: "Zabawy i aktywność",
    items: [
      { name: "Wędka z piórkami lub myszką", priority: "Konieczne", note: "MC jest bardzo aktywny — potrzebuje codziennej zabawy" },
      { name: "Tunele i maty sensoryczne", priority: "Zalecane", note: "Stymulacja węchowa i poznawcza" },
      { name: "Piłki do toczenia i puzzle dla kota", priority: "Opcjonalne", note: "Maine Coony często lubią tosowanie przedmiotów" },
    ],
  },
  {
    id: "pielegnacja", emoji: "🧴", label: "Pielęgnacja i zdrowie",
    items: [
      { name: "Szczotka furminator lub slicker", priority: "Konieczne", note: "Długa sierść wymaga czesania min. 2×/tydzień" },
      { name: "Nożyczki do pazurów", priority: "Konieczne", note: "Skracanie co 3–4 tygodnie" },
      { name: "Szampon dla kotów długowłosych", priority: "Zalecane", note: "Kąpiel co 2–3 miesiące" },
      { name: "Transporter / klatka XXL", priority: "Konieczne", note: "Potrzebna od pierwszego dnia — weterynarz i podróże" },
    ],
  },
];

const TOC = [
  { id: "intro", label: "Dlaczego przygotowanie to klucz?" },
  { id: "rozmiar", label: "Maine Coon jest WIELKI" },
  { id: "wyprawka", label: "Interaktywna checklista" },
  { id: "jedzenie", label: "Jak żywić Maine Coona?" },
  { id: "bezpieczenstwo", label: "Bezpieczny dom — zagrożenia" },
  { id: "cta", label: "Nasze kocięta" },
];

export default function Article4Page() {
  const [activeTab, setActiveTab] = useState(0);

  const priorities: Record<string, string> = {
    "Konieczne": "bg-red-500/15 text-red-300 border-red-500/25",
    "Zalecane": "bg-amber-500/15 text-amber-300 border-amber-500/25",
    "Opcjonalne": "bg-zinc-600/20 text-zinc-400 border-zinc-600/20",
  };

  return (
    <ArticleLayout
      number="04"
      accent="green"
      accentHex="#22C55E"
      readTime="9 min czytania"
      tag="Wyprawka · Drapak · Kuweta XXL"
      title="Jak przygotować dom na kociaka Maine Coon? Kompletna wyprawka (drapak, kuweta XXL, żywienie)"
      subtitle="Interaktywna lista wszystkich akcesoriów, żywienie dużego kota i jak zabezpieczyć mieszkanie"
      heroImage="/images/cats/cat_02.webp"
      heroAlt="Mały kociak Maine Coon w nowym domu — Koci Przyjaciel hodowla bezklatkowa"
      heroCaption="Kocięta Koci Przyjaciel *PL — wychowane w rodzinie, gotowe na nowy dom po 12. tygodniu"
      toc={TOC}
      prevSlug="badania-hcm-pkd-sma-maine-coon"
      prevTitle="Badania HCM, PKD i SMA — dlaczego są kluczowe?"
      nextSlug="maine-coon-dzieci-pies-socjalizacja"
      nextTitle="Maine Coon z dziećmi i psem — socjalizacja"
    >
      <article className="space-y-16">

        {/* ── SECTION 1 ── */}
        <section id="intro" className="scroll-mt-8">
          <SectionHeading accent="green">Dlaczego przygotowanie domu jest tak ważne?</SectionHeading>

          <PhotoCard image="/images/cats/cat_01.webp" alt="Kociak Maine Coon w nowym domu adaptacja">
            <p className="text-[#86868b] leading-relaxed mb-4 text-sm sm:text-base">
              Pierwsze dni w nowym domu to ogromny stres dla każdego kociaka. Nowe zapachy, nowe dźwięki, brak mamy i rodzeństwa. <span className="text-green-300 font-medium">Dobrze przygotowany dom skraca czas adaptacji z tygodni do dni.</span>
            </p>
            <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
              Maine Coon wymaga nieco innych akcesoriów niż „zwykły" kot — bo dorosły samiec może ważyć 10–11 kg i mierzyć nawet 120 cm od nosa do końca ogona. Standardowe akcesoria po prostu nie pasują.
            </p>
          </PhotoCard>
        </section>

        {/* ── SECTION 2 — Size stats ── */}
        <section id="rozmiar" className="scroll-mt-8">
          <SectionHeading accent="green">Maine Coon jest WIELKI — o tym pamiętaj kupując akcesoria</SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
            <StatCard value="11" unit="kg" label="Maks. masa ciała" desc="Dorosły samiec MC — jeden z najcięższych kotów domowych." />
            <StatCard value="120" unit="cm" label="Długość ciała" desc="Nos + tułów + ogon. Wymiary psa średniej wielkości." />
            <StatCard value="60×40" unit="cm" label="Minimalna kuweta" desc="Lub 1,5× długość kota. Standardowe są za małe." />
            <StatCard value="150" unit="cm+" label="Minimalny drapak" desc="Musi być stabilny przy wspinaniu 10 kg kota." />
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/75">
              <span className="text-amber-300 font-semibold">Najczęstszy błąd: </span>
              Kupno standardowych akcesoriów. MC przerośnie 90% typowych kuwet i drapaków w ciągu pierwszego roku.
            </p>
          </div>
        </section>

        {/* ── SECTION 3 — Interactive checklist ── */}
        <section id="wyprawka" className="scroll-mt-8">
          <SectionHeading accent="green">Kompletna wyprawka — interaktywna checklista</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-6 text-sm">
            Przełączaj kategorie i sprawdź pełną listę z podziałem na priorytet:
          </p>

          {/* Category tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  activeTab === i
                    ? "bg-white text-black border-white"
                    : "bg-[#161617] border-white/[0.08] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="block text-xl mb-1">{cat.emoji}</span>
                <span className="text-xs font-semibold">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#161617] rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
            {CATEGORIES[activeTab].items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-medium text-white text-sm">{item.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${priorities[item.priority]}`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white/45">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4 — Food with cat photo ── */}
        <section id="jedzenie" className="scroll-mt-8">
          <SectionHeading accent="green">Jak żywić Maine Coona? Podstawy diety dużego kota</SectionHeading>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] mb-8" style={{ height: "clamp(180px, 25vw, 300px)" }}>
            <Image src="/images/cats/cat_03.webp" alt="Maine Coon żywienie dieta karma" fill className="object-cover object-[50%_25%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <div>
                <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-2">Żywienie</p>
                <p className="font-heading font-light text-white text-xl sm:text-2xl leading-snug">
                  Karma mokra = zdrowe nerki.<br/>
                  <span className="font-semibold italic text-green-200">To fundament diety kota.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "💧", title: "Nawodnienie przede wszystkim", desc: "Koty z natury piją mało wody — karma mokra zapewnia 70–80% dziennego zapotrzebowania na płyny, chroniąc nerki." },
              { icon: "🥩", title: "Wysoka zawartość mięsa", desc: "Min. 40–60% mięsa lub ryb jako pierwsze składniki. Corn, wheat i sugar to sygnał złej jakości." },
              { icon: "📏", title: "Duże porcje dla dużego kota", desc: "Samiec MC waży 7–11 kg — zapotrzebowanie kaloryczne wyższe niż u przeciętnego kota. Konsultuj z hodowcą." },
              { icon: "🚫", title: "Czego unikać?", desc: "Produktów z kukurydzą, pszenicą, cukrem i barwnikami jako głównymi składnikami. Wybieraj grain-free premium." },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08] hover:border-green-500/25 transition-all flex gap-3">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{f.title}</p>
                  <p className="text-xs text-[#86868b] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5 — Home safety ── */}
        <section id="bezpieczenstwo" className="scroll-mt-8">
          <SectionHeading accent="green">Bezpieczny dom — lista zagrożeń do usunięcia przed adopcją</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-5 text-sm">
            Kociaki są niezwykle ciekawskie. Przejdź przez dom z tą listą zagrożeń:
          </p>
          <div className="space-y-2">
            {[
              { danger: "Otwarte okna bez siatki", solution: "Zamontuj siatki lub kraty przed adopcją — obowiązkowo" },
              { danger: "Toksyczne rośliny domowe (bluszcz, lilia, difenbachia, aloes)", solution: "Usuń wszystkie toksyczne rośliny lub przenieś poza zasięg" },
              { danger: "Luźne kable elektryczne", solution: "Zabezpiecz spiralami lub chowaj za meblami" },
              { danger: "Środki chemiczne (szafki kuchenne)", solution: "Zamknij na klucz lub zabezpiecz jak dla dziecka" },
              { danger: "Pralka i suszarka — koty mogą wchodzić do środka", solution: "Zawsze sprawdzaj wnętrze przed uruchomieniem" },
              { danger: "Otwarty balkon bez siatki", solution: "Siatka balkonowa — absolutny priorytet przed przywiezieniem kociaka" },
            ].map((d, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#161617] border border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-sm text-white/75">{d.danger}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-sm text-green-300/80">{d.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="scroll-mt-8">
          <div className="relative rounded-3xl overflow-hidden border border-green-500/20" style={{ minHeight: 260 }}>
            <Image src="/images/cats/cat_04.webp" alt="Kocięta Maine Coon gotowe do adopcji Koci Przyjaciel" fill className="object-cover object-[50%_25%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="relative p-8 sm:p-10">
              <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-3">Gotowy na kociaka?</p>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3 max-w-md">
                Masz wyprawkę. Czas na Maine Coona!
              </h3>
              <p className="text-[#86868b] text-sm mb-7 max-w-sm">
                Sprawdź które kocięta z hodowli Koci Przyjaciel *PL są aktualnie dostępne.
              </p>
              <Link href="/dostepne-kociaki" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all hover:scale-105">
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
