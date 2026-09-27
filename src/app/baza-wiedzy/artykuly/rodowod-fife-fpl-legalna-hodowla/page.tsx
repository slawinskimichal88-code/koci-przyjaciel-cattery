"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleLayout, SectionHeading, PhotoCard, AccordionItem, CheckRow } from "@/components/articles/ArticleLayout";
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from "lucide-react";

const ORGS = [
  {
    name: "FIFe", fullName: "Fédération Internationale Féline", flag: "🌍",
    status: "top", icon: "✓",
    desc: "Największa federacja felinologiczna świata — ponad 40 krajów. Najwyższy standard hodowlany.",
    checks: ["Rodowód uznawany w 40+ krajach", "Obowiązkowe badania zdrowotne", "Wystawy rangi World Winner", "Rejestr płodności miotów"],
    color: "border-green-500/30 bg-green-500/[0.08]", badge: "text-green-400", cIcon: "ok" as const,
  },
  {
    name: "FPL", fullName: "Polska Federacja Felinologiczna", flag: "🇵🇱",
    status: "top", icon: "✓",
    desc: "Jedyna polska organizacja będąca pełnoprawnym członkiem FIFe. Nasze hodowle.",
    checks: ["Oficjalny członek FIFe", "Rejestr polskich hodowców", "Kontrole certyfikatów", "Wystawy CAC i CACE"],
    color: "border-blue-500/30 bg-blue-500/[0.08]", badge: "text-blue-400", cIcon: "ok" as const,
  },
  {
    name: "WCF/inne", fullName: "Organizacje poza WCC", flag: "⚠️",
    status: "warn", icon: "△",
    desc: "Mniejsze organizacje z własnymi rejestrami. Mogą stosować łagodniejsze standardy.",
    checks: ["Mniejszy zasięg geograficzny", "Mniej obowiązkowych badań", "Wystawy o mniejszej randze", "Zróżnicowany poziom kontroli"],
    color: "border-amber-500/30 bg-amber-500/[0.08]", badge: "text-amber-400", cIcon: "warn" as const,
  },
  {
    name: "Brak rodowodu", fullName: "Ogłoszenia bez papierów", flag: "🚫",
    status: "danger", icon: "✗",
    desc: "Brak potwierdzonego pochodzenia, brak weryfikacji zdrowia. Wysokie ryzyko.",
    checks: ["Brak gwarancji czystości rasy", "Brak doc. zdrowotnej rodziców", "Kociak może być za młody", "Ryzyko chorób genetycznych"],
    color: "border-red-500/30 bg-red-500/[0.08]", badge: "text-red-400", cIcon: "bad" as const,
  },
];

const RED_FLAGS = [
  "Kocięta dostępne przed 10. tygodniem",
  "Brak zdjęć/skanów rodowodów rodziców",
  "Odmowa wizyty w hodowli",
  "Cena rażąco niska lub wysoka bez uzasadnienia",
  "Brak umowy adopcyjnej",
  "Wiele ras w jednej hodowli",
  "Brak aktywności na wystawach FIFe",
];

const TOC = [
  { id: "intro", label: "Czym jest rodowód FIFe?" },
  { id: "federacje", label: "FIFe vs. inne organizacje" },
  { id: "czerwone-flagi", label: "Czerwone flagi" },
  { id: "weryfikacja", label: "5 kroków weryfikacji" },
  { id: "cta", label: "Nasza hodowla FIFe/FPL" },
];

export default function Article2Page() {
  return (
    <ArticleLayout
      number="02"
      accent="amber"
      accentHex="#F59E0B"
      readTime="10 min czytania"
      tag="Rodowód · FIFe · FPL"
      title="Rodowód FIFe / FPL a stowarzyszenia spoza WCC — jak rozpoznać legalną hodowlę Maine Coon?"
      subtitle="Różnice między organizacjami felinologicznymi, 5-krokowy weryfikator i czerwone flagi pseudohodowli"
      heroImage="/images/matki/matka_07.webp"
      heroAlt="Maine Coon z hodowli Koci Przyjaciel *PL z widocznym charakterem rasy — spokój i majestat"
      heroCaption="Koci Przyjaciel *PL · Zarejestrowana hodowla FPL / FIFe · Wrocław"
      toc={TOC}
      prevSlug="cena-maine-coon-z-rodowodem"
      prevTitle="Ile kosztuje Maine Coon z rodowodem FIFe/FPL?"
      nextSlug="badania-hcm-pkd-sma-maine-coon"
      nextTitle="Badania HCM, PKD i SMA — dlaczego są kluczowe?"
    >
      <article className="space-y-16">

        {/* ── SECTION 1 ── */}
        <section id="intro" className="scroll-mt-8">
          <SectionHeading accent="amber">Czym jest rodowód FIFe i dlaczego ma znaczenie?</SectionHeading>

          <PhotoCard image="/images/matki/matka_02.webp" alt="Maine Coon matka hodowlana Koci Przyjaciel" side="right">
            <p className="text-[#86868b] leading-relaxed mb-4 text-sm sm:text-base">
              <span className="text-amber-300 font-medium">FIFe (Fédération Internationale Féline)</span> to największa i najstarsza organizacja felinologiczna na świecie, zrzeszająca ponad 40 krajów. Polska Federacja Felinologiczna (FPL) jest jej oficjalnym członkiem.
            </p>
            <p className="text-[#86868b] leading-relaxed mb-5 text-sm sm:text-base">
              Kociak z rodowodem FIFe/FPL ma potwierdzoną tożsamość genetyczną. Każdy przodek był oceniony bonitacyjnie, a hodowla musiała spełniać wymogi federacji — w tym obowiązkowe badania zdrowotne.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🏆", label: "Pełny członek FIFe" },
                { icon: "🌍", label: "Zasięg 40+ krajów" },
                { icon: "📋", label: "Numer rejestracyjny" },
                { icon: "🎖️", label: "Wystawy rangi CAC" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/20">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-xs font-semibold text-amber-300">{s.label}</span>
                </div>
              ))}
            </div>
          </PhotoCard>
        </section>

        {/* ── SECTION 2 — Org Comparison ── */}
        <section id="federacje" className="scroll-mt-8">
          <SectionHeading accent="amber">FIFe, FPL, WCF i brak rodowodu — porównanie organizacji</SectionHeading>
          <p className="text-[#86868b] leading-relaxed mb-6 text-sm">
            Kliknij każdą organizację, aby poznać szczegóły standardów i co oferuje:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ORGS.map((org, i) => (
              <AccordionItem key={i} title={`${org.flag} ${org.name} — ${org.fullName}`} icon={org.icon} accentClass={org.badge}>
                <p className="text-sm text-white/70 leading-relaxed mb-3">{org.desc}</p>
                <ul className="space-y-1.5">
                  {org.checks.map((c, j) => (
                    <CheckRow key={j} variant={org.cIcon}>{c}</CheckRow>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </div>
        </section>

        {/* ── SECTION 3 — Red flags with cat photo ── */}
        <section id="czerwone-flagi" className="scroll-mt-8">
          <SectionHeading accent="amber">🚩 Czerwone flagi — sygnały ostrzegawcze pseudohodowli</SectionHeading>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-[#161617] rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
              {RED_FLAGS.map((rf, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-red-500/[0.06] transition-colors">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-sm text-white/75">{rf}</span>
                </div>
              ))}
            </div>
            <div className="md:w-[40%] relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ minHeight: 280 }}>
              <Image src="/images/matki/matka_03.webp" alt="Maine Coon legalna hodowla certyfikat" fill className="object-cover" sizes="40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">Koci Przyjaciel *PL</p>
                <p className="text-sm text-white font-semibold">Wizyty zawsze mile widziane</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — 5-step verificator ── */}
        <section id="weryfikacja" className="scroll-mt-8">
          <SectionHeading accent="amber">Jak zweryfikować hodowlę przed zakupem? 5 kroków</SectionHeading>

          <div className="relative">
            <div className="absolute left-6 top-5 bottom-5 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent" />
            <div className="space-y-4 pl-14">
              {[
                { step: "01", title: "Zapytaj o numer rejestracyjny hodowli", desc: "Każda hodowla FIFe/FPL ma unikalny numer. Można go zweryfikować na stronie FPL." },
                { step: "02", title: "Zażądaj kopii rodowodów rodziców", desc: "Ojciec i matka kociaka powinni mieć rodowody z pieczęcią federacji." },
                { step: "03", title: "Sprawdź wyniki badań HCM i DNA", desc: "Certyfikaty Laboklin lub Langford z wynikiem N/N potwierdzają brak mutacji." },
                { step: "04", title: "Poproś o wizytę w hodowli", desc: "Legalna hodowla nigdy nie odmawia wizyty — możesz zobaczyć rodziców i warunki." },
                { step: "05", title: "Podpisz umowę adopcyjną", desc: "Profesjonalna hodowla zawsze podpisuje umowę z gwarancją zdrowia." },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 top-4 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-black" />
                  <div className="p-5 rounded-2xl bg-[#161617] border border-white/[0.08] hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-amber-400">{s.step}.</span>
                      <p className="font-semibold text-white text-sm">{s.title}</p>
                    </div>
                    <p className="text-xs text-[#86868b] leading-relaxed ml-7">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA with hero image ── */}
        <section id="cta" className="scroll-mt-8">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/20" style={{ minHeight: 280 }}>
            <Image src="/images/cats/cat_04.webp" alt="Dostępne kocięta Maine Coon hodowla FIFe" fill className="object-cover object-[50%_30%]" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
            <div className="relative p-8 sm:p-10">
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">Koci Przyjaciel *PL · FPL / FIFe</p>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-3 max-w-md leading-tight">
                Pełna dokumentacja.<br />Wizyty mile widziane.
              </h3>
              <p className="text-[#86868b] text-sm mb-7 max-w-sm">
                Rodowód, paszport weterynaryjny i certyfikaty badań genetycznych — każde kocię.
              </p>
              <Link href="/dostepne-kociaki" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all hover:scale-105">
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
