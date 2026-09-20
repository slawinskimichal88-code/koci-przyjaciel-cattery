"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartPulse, Scale, Utensils, Coins, HelpCircle } from "lucide-react";

interface KnowledgeBaseTeaserProps {
  lang?: "PL" | "EN";
}

export default function KnowledgeBaseTeaser({ lang = "PL" }: KnowledgeBaseTeaserProps) {
  const cards = [
    {
      icon: Scale,
      tag: lang === "PL" ? "WIELKOŚĆ I WYGLĄD" : "SIZE & APPEARANCE",
      title: lang === "PL" ? "Jak duże są Maine Coony?" : "How big are Maine Coons?",
      desc: lang === "PL" 
        ? "Dorosły samiec może ważyć nawet 12 kg i mieć ponad metr długości. To jeden z największych kotów domowych na świecie — zobaczysz jak wypadają przy porównaniu z psem."
        : "An adult male can weigh up to 12 kg and be over a metre long. One of the largest domestic cats in the world — see how they compare to a dog.",
      href: "/baza-wiedzy#porownanie",
    },
    {
      icon: HeartPulse,
      tag: lang === "PL" ? "ZDROWIE" : "HEALTH",
      title: lang === "PL" ? "Jakie badania robimy kotom?" : "What health tests do we do?",
      desc: lang === "PL"
        ? "Przed sprzedaniem kociaka sprawdzamy, czy jego rodzice są zdrowi — badamy serce, wykonujemy testy genetyczne. Wyniki każdego badania pokazujemy kupującemu."
        : "Before selling a kitten we check that its parents are healthy — we test the heart and run genetic tests. We show every buyer the results of every test.",
      href: "/baza-wiedzy#zdrowie",
    },
    {
      icon: Utensils,
      tag: lang === "PL" ? "ŻYWIENIE" : "NUTRITION",
      title: lang === "PL" ? "Co jedzą Maine Coony?" : "What do Maine Coons eat?",
      desc: lang === "PL"
        ? "Maine Coon potrzebuje dużo białka — najlepiej sprawdza się wysokiej jakości karma mokra lub dieta mięsna. Podpowiemy jak ułożyć jadłospis, żeby kot był zdrowy przez lata."
        : "Maine Coon needs a lot of protein — high quality wet food or a meat-based diet works best. We will tell you how to plan a menu that keeps your cat healthy for years.",
      href: "/baza-wiedzy#kalkulator",
    },
    {
      icon: Coins,
      tag: lang === "PL" ? "KOSZTY" : "COSTS",
      title: lang === "PL" ? "Ile kosztuje Maine Coon miesięcznie?" : "How much does a Maine Coon cost monthly?",
      desc: lang === "PL"
        ? "Karma, żwirek, szczepienia, weterynarz — pomoglimy wyliczyć realne miesięczne koszty posiadania kota tej rasy, bez ukrytych niespodzianek."
        : "Food, litter, vaccinations, vet — we help you calculate the real monthly cost of owning this breed, with no hidden surprises.",
      href: "/baza-wiedzy#kalkulator",
    },
  ];

  return (
    <section className="relative bg-[#0F0F11] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10">
      
      {/* Dynamiczne ambient tło */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Nagłówek sekcji */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-ui uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "KOMPENDIUM WIEDZY O RASIE" : "BREED KNOWLEDGE COMPENDIUM"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)" }}
          >
            {lang === "PL" ? (
              <>
                Wszystko co chcesz wiedzieć o <span className="font-semibold italic">Maine Coon</span>.
              </>
            ) : (
              <>
                Everything you want to know about <span className="font-semibold italic">Maine Coon</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Zebraliśmy w jednym miejscu odpowiedzi na pytania, które zadaje prawie każdy zanim zdecyduje się na kocią. Jak duże wyrastają? Co jedzą? Ile kosztuje utrzymanie? Jak się zachowują?"
              : "We gathered in one place the answers to questions that almost everyone asks before deciding on a kitten. How big do they grow? What do they eat? How much does keeping them cost? How do they behave?"}
          </p>
        </div>

        {/* Siatka 4 filarów */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={c.href}
                className="group relative p-8 rounded-3xl bg-[#161618]/90 hover:bg-[#1c1c1f] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                      {c.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-normal text-white group-hover:text-amber-200 transition-colors mb-3">
                    {c.title}
                  </h3>

                  <p className="text-sm text-zinc-400 font-body leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-ui uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors font-semibold">
                  <span>{lang === "PL" ? "Dowiedz się więcej" : "Learn more"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Główny przycisk przejścia do zakładki /baza-wiedzy */}
        <div className="text-center">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
          >
            <span>{lang === "PL" ? "Otwórz pełną Bazę Wiedzy (Skala, Badania, Koszty, FAQ)" : "Open Complete Knowledge Base"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
