"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  Scale,
  Utensils,
  Coins,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2,
  Sliders,
} from "lucide-react";

interface KnowledgeBaseTeaserProps {
  lang?: "PL" | "EN";
}

export default function KnowledgeBaseTeaser({ lang = "PL" }: KnowledgeBaseTeaserProps) {
  // Stan interaktywnego mini-kalkulatora
  const [catType, setCatType] = useState<"female" | "male">("male");
  const [dietType, setDietType] = useState<"wet_premium" | "barf" | "mixed">("wet_premium");

  // Dynamiczne kalkulacje kosztów miesięcznych
  const calculateCosts = () => {
    let foodBase = catType === "male" ? 260 : 190;
    if (dietType === "barf") foodBase = catType === "male" ? 220 : 160;
    if (dietType === "mixed") foodBase = catType === "male" ? 240 : 180;

    const litter = catType === "male" ? 65 : 45;
    const vetCare = 50; // Średnia profilaktyka (szczepienia, odrobaczenia, kontrola w skali roku / 12)
    const total = foodBase + litter + vetCare;

    return { foodBase, litter, vetCare, total };
  };

  const costs = calculateCosts();

  const cards = [
    {
      icon: Scale,
      tag: lang === "PL" ? "ANATOMIA I ROZWÓJ" : "SIZE & GROWTH",
      title: lang === "PL" ? "Jak rośnie Maine Coon do 4. roku życia?" : "How do Maine Coons grow up to 4 years?",
      desc: lang === "PL"
        ? "W przeciwieństwie do zwykłych kotów, Maine Coon rozwija kościec i masę mięśniową aż do 3-4 lat. Sprawdź tabelę przyrostów wagowych miesiąc po miesiącu."
        : "Unlike regular cats, Maine Coons develop bone structure and muscle mass up to 3-4 years. Check the monthly weight gain guide.",
      href: "/baza-wiedzy#porownanie",
    },
    {
      icon: HeartPulse,
      tag: lang === "PL" ? "ZDROWIE I PROFILAKTYKA" : "HEALTH & GENETICS",
      title: lang === "PL" ? "Badania genetyczne HCM, PKD, SMA" : "Genetic testing HCM, PKD, SMA",
      desc: lang === "PL"
        ? "Każdy rodzic w naszej hodowli posiada certyfikaty badań DNA i coroczne echo serca Doppler. Zobacz na co uważać kupując kociaka."
        : "Every parent cat in our cattery has certified DNA tests and yearly Doppler echocardiography. See what to look for when choosing a kitten.",
      href: "/baza-wiedzy#zdrowie",
    },
    {
      icon: Utensils,
      tag: lang === "PL" ? "ŻYWIENIE BEZZBOŻOWE" : "SPECIES-APPROPRIATE DIET",
      title: lang === "PL" ? "Dlaczego 0% zbóż w diecie to klucz?" : "Why 0% grain is the key?",
      desc: lang === "PL"
        ? "Koty to bezwzględni mięsożercy. Dowiedz się, dlaczego tanie karmy z marketu niszczą nerki i jak ułożyć prostą dietę wysokomięsną lub BARF."
        : "Cats are obligate carnivores. Learn why cheap commercial kibble harms kidneys and how to build an easy meat-based or BARF diet.",
      href: "/baza-wiedzy#kalkulator",
    },
    {
      icon: Coins,
      tag: lang === "PL" ? "BEZPIECZEŃSTWO DOMU" : "HOME SAFETY & ADAPTATION",
      title: lang === "PL" ? "Drapaki XXL i siatkowanie balkonu" : "XXL Scratchers & Balcony Netting",
      desc: lang === "PL"
        ? "Maine Coon nie zmieści się na standardowym drapaku ze sklepu zoologicznego. Przygotowaliśmy listę sprawdzonych solidnych akcesoriów."
        : "A Maine Coon won't fit a standard pet shop cat tree. We prepared a checklist of durable, heavy-duty furniture and safety tips.",
      href: "/baza-wiedzy#faq",
    },
  ];

  return (
    <section id="baza-wiedzy" className="relative bg-[#0E0E11] text-white py-14 sm:py-18 overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-white/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-ui uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "WIRTUALNE CENTRUM WIEDZY I KALKULATOR" : "INTERACTIVE KNOWLEDGE HUB & CALCULATOR"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
          >
            Wszystko, co musisz wiedzieć<br />
            <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
              przed adopcją kota.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Przejrzyste fakty zamiast mitów. Sprawdź realne miesięczne koszty, wymogi zdrowotne i standardy opieki nad największym kotem domowym."
              : "Clear facts instead of myths. Calculate real monthly expenses, genetic health standards, and care guidelines for the gentle giant."}
          </p>
        </div>

        {/* ── INTERAKTYWNA RZECZ #1: WIRTUALNY KALKULATOR KOSZTÓW (APPLE STYLE) ── */}
        <div className="mb-20 bg-gradient-to-b from-[#18181D] to-[#121215] rounded-3xl sm:rounded-[36px] border border-white/15 p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 mb-2">
                <Sliders className="w-4 h-4" />
                <span>{lang === "PL" ? "Wirtualny Symulator Kosztów Życia" : "Live Cost Simulator"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-normal text-white">
                {lang === "PL" ? "Ile naprawdę kosztuje utrzymanie Maine Coona?" : "How much does keeping a Maine Coon really cost?"}
              </h3>
            </div>

            {/* Selektory Płci / Rozmiaru */}
            <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-full border border-white/10">
              <button
                onClick={() => setCatType("male")}
                className={`px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider transition-all cursor-pointer font-medium ${
                  catType === "male"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ♂ Kocur (10 – 12 kg)
              </button>
              <button
                onClick={() => setCatType("female")}
                className={`px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider transition-all cursor-pointer font-medium ${
                  catType === "female"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ♀ Kotka (6.5 – 8 kg)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Wybór Diety (Lewa strona) */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                {lang === "PL" ? "Wybierz model żywienia:" : "Select feeding model:"}
              </p>

              {[
                {
                  id: "wet_premium" as const,
                  title: lang === "PL" ? "Karmy Mokre Monobiałkowe Premium" : "Monoprotein Wet Food",
                  brand: "Gussto, Catz Finefood Purrrr, Feringa Pure Meat (100% mięsa)",
                  desc: "Najwygodniejszy i bezpieczny model żywienia. Zero zbóż, wysoka wilgotność chroniąca nerki.",
                },
                {
                  id: "barf" as const,
                  title: lang === "PL" ? "Dieta Surowa BARF z Suplementami" : "Raw BARF Nutrition",
                  brand: "Wołowina, indyk, serca + tran + tauryna + wapń",
                  desc: "Najbardziej naturalna dla kota i najbardziej ekonomiczna przy większym kocie, wymaga przygotowania porcji.",
                },
                {
                  id: "mixed" as const,
                  title: lang === "PL" ? "Model Mieszany (Mokra + Mięso)" : "Mixed Model",
                  brand: "Puszki jakościowe na co dzień + surowe mięso 2-3x w tygodniu",
                  desc: "Świetny kompromis wygody z naturalnym czyszczeniem zębów i żuchwy.",
                },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setDietType(opt.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    dietType === opt.id
                      ? "bg-white/10 border-amber-300/60 shadow-lg ring-1 ring-amber-300/30"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm sm:text-base font-heading font-medium text-white">
                      {opt.title}
                    </h4>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        dietType === opt.id ? "border-amber-300 bg-amber-300" : "border-white/30"
                      }`}
                    >
                      {dietType === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-amber-200/80 mb-1">{opt.brand}</p>
                  <p className="text-xs text-zinc-400 font-body font-light leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Licznik Kosztów w Czasie Rzeczywistym (Prawa strona) */}
            <div className="lg:col-span-5 bg-black/60 rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-2">
                  {lang === "PL" ? "Szacowany Miesięczny Koszt" : "Estimated Monthly Total"}
                </span>

                <div className="flex items-baseline gap-2 mb-6">
                  <span
                    className="font-heading font-light text-white leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-white"
                    style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
                  >
                    ~{costs.total}
                  </span>
                  <span className="text-lg font-mono text-zinc-400">PLN / msc</span>
                </div>

                {/* Rozbicie składowych */}
                <div className="space-y-3 pb-6 border-b border-white/10 text-xs font-body">
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{lang === "PL" ? "Karma mięsna (0% zbóż)" : "Meat diet (grain-free)"}</span>
                    </span>
                    <span className="font-mono font-semibold text-white">~{costs.foodBase} zł</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>{lang === "PL" ? "Żwirek kukurydziany zbrylający" : "Natural clumping litter"}</span>
                    </span>
                    <span className="font-mono font-semibold text-white">~{costs.litter} zł</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{lang === "PL" ? "Średnia profilaktyka (odrobaczenia, szczepienia)" : "Veterinary routine"}</span>
                    </span>
                    <span className="font-mono font-semibold text-white">~{costs.vetCare} zł</span>
                  </div>
                </div>

                <div className="pt-4 flex items-start gap-2.5 text-[11px] text-zinc-400 font-light leading-relaxed">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === "PL"
                      ? "Prawidłowa dieta mięsna na starcie zapobiega chorobom nerek i otyłości — to realna oszczędność na wizytach weterynaryjnych przez kilkanaście lat życia kota."
                      : "A species-appropriate high-protein diet prevents renal stress and obesity, saving thousands on vet bills over the cat's lifetime."}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/baza-wiedzy#kalkulator"
                  className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-ui uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <span>{lang === "PL" ? "Zobacz szczegółowy kalkulator wyprawki" : "Full starter equipment calculator"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* ── INTERAKTYWNA RZECZ #2: CERTYFIKOWANY STANDARD BADAŃ GENETYCZNYCH ── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold block mb-2">
              100% Transparentności Zdrowotnej
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-normal text-white">
              Badania genetyczne, które wykonujemy każdemu rodzicowi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                badge: "HCM Doppler",
                name: "Kardiomiopatia Przerostowa",
                result: "N/N (Czyste)",
                desc: "Coroczne badanie ultrasonograficzne serca u certyfikowanego kardiologa weterynaryjnego.",
              },
              {
                badge: "PKD DNA + USG",
                name: "Wielotorbielowatość Nerek",
                result: "N/N (Wolny)",
                desc: "Badanie genetyczne w renomowanym laboratorium Laboklin wykluczające mutację genu.",
              },
              {
                badge: "SMA Test DNA",
                name: "Rdzeniowy Zanik Mięśni",
                result: "N/N (Czysty)",
                desc: "Gwarancja braku obciążenia recesywną mutacją układu nerwowo-mięśniowego.",
              },
              {
                badge: "FIV / FeLV",
                name: "Kocia Białaczka & Niedobór",
                result: "Ujemne (-)",
                desc: "Hodowla zamknięta i całkowicie wolna od wirusów zakaźnych kotów.",
              },
            ].map((test, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                      {test.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{test.result}</span>
                    </span>
                  </div>
                  <h4 className="text-base font-heading font-medium text-white mb-2">{test.name}</h4>
                  <p className="text-xs text-zinc-400 font-body font-light leading-relaxed">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4 Filary Bazy Wiedzy ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={c.href}
                className="group relative p-7 sm:p-8 rounded-3xl bg-[#141417] hover:bg-[#1a1a1e] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono tracking-widest text-amber-300/80 uppercase font-semibold">
                      {c.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-normal text-white group-hover:text-amber-200 transition-colors mb-3">
                    {c.title}
                  </h3>

                  <p className="text-sm text-zinc-400 font-body leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-xs font-ui uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors font-semibold">
                  <span>{lang === "PL" ? "Czytaj artykuł w Bazie Wiedzy" : "Read in Knowledge Base"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Główny przycisk przejścia do podstrony /baza-wiedzy */}
        <div className="text-center">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-white text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all transform hover:-translate-y-1 shadow-[0_10px_35px_rgba(255,255,255,0.2)]"
          >
            <span>{lang === "PL" ? "Otwórz pełne Kompendium Wiedzy (FAQ, Wzrost, Kalkulatory)" : "Open Complete Knowledge Compendium"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
