"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleLayout, SectionHeading, StatCard, PhotoCard, AccordionItem, CheckRow } from "@/components/articles/ArticleLayout";
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

const PRICE_FACTORS = [
  {
    icon: "🧬", title: "Rodowód i linie hodowlane",
    items: [
      "Prestiż i czystość linii genetycznych (5+ pokoleń)",
      "Udział kotów z tytułami wystawowymi (CH, GCH, IC)",
      "Import rodziców z uznanych hodowli europejskich",
      "Przynależność do FIFe/WCC — federacja najwyższego rzędu",
    ],
  },
  {
    icon: "❤️‍🔥", title: "Pakiet zdrowotny kociaka",
    items: [
      "Badanie Echo Doppler HCM obojga rodziców",
      "Testy DNA SMA, PKD, HCM (Laboklin N/N)",
      "Seria szczepień wg harmonogramu weterynaryjnego",
      "Karta zdrowia i historia leczenia kociaka",
    ],
  },
  {
    icon: "🏡", title: "Standard i warunki hodowli",
    items: [
      "Hodowla bezklatkowa — kocięta wychowane w rodzinie",
      "Socjalizacja z dziećmi, psem i gośćmi od urodzenia",
      "Koszty utrzymania rodziców, wyżywienia i opieki wet.",
      "Wyprawka startowa dołączona do adopcji",
    ],
  },
  {
    icon: "🌍", title: "Region, popyt i sezon",
    items: [
      "Lokalizacja hodowli (metropolie vs. mniejsze ośrodki)",
      "Aktualny popyt na rasę w danym roku",
      "Pora roku i liczba dostępnych miotów na rynku",
      "Kurs walut przy importach z zagranicy",
    ],
  },
];

const TOC = [
  { id: "intro", label: "Dlaczego cena się różni?" },
  { id: "czynniki", label: "4 główne czynniki ceny" },
  { id: "koszty", label: "Co wchodzi w cenę kociaka" },
  { id: "porownanie", label: "Legalna vs. pseudohodowla" },
  { id: "ocena", label: "Jak ocenić ofertę?" },
  { id: "cta", label: "Nasze dostępne kocięta" },
];

export default function Article1Page() {
  return (
    <ArticleLayout
      number="01"
      accent="violet"
      accentHex="#8B5CF6"
      readTime="8 min czytania"
      tag="Cena · Rodowód · FIFe"
      title="Ile kosztuje kot Maine Coon z rodowodem FIFe/FPL w 2026 roku i skąd bierze się cena?"
      subtitle="Od czego zależy cena kociaka, co wchodzi w jej skład i dlaczego różni się między hodowlami"
      heroImage="/images/cats/cat_03.webp"
      heroAlt="Majestatyczny Maine Coon z hodowli Koci Przyjaciel — przykład kota z certyfikowaną dokumentacją FIFe"
      heroCaption="Koci Przyjaciel *PL · FIFe/FPL · Wrocław · Maine Coon z rodowodem"
      toc={TOC}
      nextSlug="rodowod-fife-fpl-legalna-hodowla"
      nextTitle="Rodowód FIFe/FPL — jak rozpoznać legalną hodowlę?"
    >
      <article className="space-y-16">

        {/* ── SECTION 1 ── */}
        <section id="intro" className="scroll-mt-8">
          <SectionHeading accent="violet">Dlaczego ceny Maine Coonów różnią się tak bardzo?</SectionHeading>

          <div className="p-5 rounded-2xl bg-violet-500/[0.1] border border-violet-500/25 flex gap-4 mb-7">
            <Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              Porównując oferty, można spotkać ogromną rozpiętość cen. Jest to naturalne — za tą rozpiętością stoi zupełnie inny standard hodowlany, a co za tym idzie, zupełnie inne ryzyko dla przyszłego opiekuna.
            </p>
          </div>

          <PhotoCard image="/images/matki/matka_01.webp" alt="Matka Maine Coon hodowla Koci Przyjaciel">
            <p className="text-[#86868b] leading-relaxed mb-5 text-sm sm:text-base">
              Cena kociaka z certyfikowanego chowu FIFe/FPL jest wypadkową dziesiątek realnych kosztów — od testów genetycznych rodziców, przez badania echokardiograficzne serca, po utrzymanie kociąt przez pierwsze 12 tygodni w warunkach domowych z pełną socjalizacją.
            </p>
            <p className="text-[#86868b] leading-relaxed text-sm sm:text-base">
              <span className="text-violet-300 font-medium">Kociak bez rodowodu i badań nie jest „tanim Maine Coonem"</span> — jest kotem bez weryfikowalnej tożsamości genetycznej i bez gwarancji zdrowia.
            </p>
          </PhotoCard>
        </section>

        {/* ── SECTION 2 — Stats ── */}
        <section id="czynniki" className="scroll-mt-8">
          <SectionHeading accent="violet">4 główne czynniki kształtujące cenę</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-7 text-sm sm:text-base">
            Kliknij każdy z poniższych obszarów, aby rozwinąć szczegóły:
          </p>

          <div className="space-y-3 mb-8">
            {PRICE_FACTORS.map((factor, i) => (
              <AccordionItem key={i} title={factor.title} icon={factor.icon} accentClass="text-violet-300">
                <ul className="space-y-2.5">
                  {factor.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/75">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </div>
        </section>

        {/* ── SECTION 3 — Cost breakdown + cat image ── */}
        <section id="koszty" className="scroll-mt-8">
          <SectionHeading accent="violet">Co konkretnie wchodzi w cenę kociaka z hodowli?</SectionHeading>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] mb-8" style={{ height: "clamp(200px, 30vw, 380px)" }}>
            <Image src="/images/matki/matka_06.webp" alt="Kotka Maine Coon z kociakiem — hodowla bezklatkowa" fill className="object-cover object-[50%_30%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <div className="max-w-sm">
                <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-2">Hodowla bezklatkowa</p>
                <p className="font-heading font-light text-white text-2xl sm:text-3xl leading-snug">
                  Kocięta wychowywane<br />
                  <span className="font-semibold italic text-violet-200">pośrodku rodziny</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { phase: "Przed rozrodem", items: ["Echo Doppler HCM", "Testy DNA Laboklin", "Ocena bonitacyjna"] },
              { phase: "Ciąża i poród", items: ["Badania USG ciąży", "Opieka wet.", "Suplementacja"] },
              { phase: "0–8 tygodni", items: ["Żywienie miotu", "Odrobaczanie ×2", "Karta zdrowia"] },
              { phase: "8–12 tygodni", items: ["Szczepienia ×2", "Mikrochip ISO", "Rodowód FPL"] },
            ].map((group, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08]">
                <p className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-3">{group.phase}</p>
                <ul className="space-y-1.5">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-white/65">
                      <CheckCircle2 className="w-3 h-3 text-violet-400 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4 — Comparison ── */}
        <section id="porownanie" className="scroll-mt-8">
          <SectionHeading accent="violet">Certyfikowana hodowla vs. pseudohodowla</SectionHeading>

          <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
            <div className="grid grid-cols-3 bg-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-white/50 px-4 py-3">
              <span>Czynnik</span>
              <span className="text-center text-green-400">✓ FIFe / FPL</span>
              <span className="text-center text-red-400">✗ Bez rodowodu</span>
            </div>
            {[
              "Rodowód FIFe / WCC",
              "Badanie echa serca HCM rodziców",
              "Testy DNA (Laboklin / Langford)",
              "Kociak gotowy po 12 tygodniach",
              "Pełna dokumentacja weterynaryjna",
              "Możliwość wizyty w hodowli",
              "Umowa adopcyjna z gwarancją zdrowia",
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-white/[0.06] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <span className="text-white/75 text-xs">{row}</span>
                <span className="flex justify-center"><CheckCircle2 className="w-4 h-4 text-green-400" /></span>
                <span className="flex justify-center"><XCircle className="w-4 h-4 text-red-400" /></span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="text-amber-300 font-semibold">Prawdziwy koszt „tańszego" kociaka: </span>
              Leczenie HCM to wydatek wielokrotnie przekraczający różnicę w cenie zakupu. Rodowód, badania i umowa to Twoja ochrona.
            </p>
          </div>
        </section>

        {/* ── SECTION 5 — How to evaluate ── */}
        <section id="ocena" className="scroll-mt-8">
          <SectionHeading accent="violet">Jak ocenić, czy oferta jest uczciwa?</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-6 text-sm">
            Przed podjęciem decyzji zadaj hodowcy te pytania:
          </p>
          <div className="bg-[#161617] rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
            {[
              "Czy oboje rodzice mają aktualne badania Echo Doppler HCM?",
              "Czy wyniki testów DNA (SMA, PKD, HCM) można zobaczyć w oryginale?",
              "Jaki jest numer rejestracyjny hodowli w FPL lub FIFe?",
              "Czy kociak wyjdzie po ukończeniu 12 tygodni życia?",
              "Czy jest podpisywana umowa adopcyjna?",
              "Czy można odwiedzić hodowlę przed rezerwacją?",
            ].map((q, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                <span className="font-mono text-xs text-violet-400 w-7 shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                <span className="text-sm text-white/75">{q}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6 CTA ── */}
        <section id="cta" className="scroll-mt-8">
          <div className="relative rounded-3xl overflow-hidden border border-violet-500/20" style={{ minHeight: 300 }}>
            <Image src="/images/cats/cat_01.webp" alt="Kocięta Maine Coon dostępne do adopcji" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
            <div className="relative p-8 sm:p-10">
              <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">Koci Przyjaciel *PL · FPL / FIFe</p>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3 max-w-md">
                Chcesz poznać cenę i dostępność kociąt w naszej hodowli?
              </h3>
              <p className="text-[#86868b] text-sm mb-7 max-w-sm">
                Pełna dokumentacja, badania Echo Doppler i testy Laboklin. Odwiedziny zawsze mile widziane.
              </p>
              <Link href="/dostepne-kociaki" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-violet-500 hover:bg-violet-400 text-white font-semibold text-sm transition-all duration-200 hover:scale-105">
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
