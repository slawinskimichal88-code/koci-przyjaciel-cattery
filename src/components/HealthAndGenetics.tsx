"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Phone, HeartPulse, Sparkles } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface HealthProps {
  lang: "PL" | "EN" | "DE";
}

export default function HealthAndGenetics({ lang }: HealthProps) {
  const tests = [
    {
      code: "HCM",
      title: "Kardiomiopatia Przerostowa",
      status: "N/N Czyste (DNA + Echo)",
      desc: "Najgroźniejsza genetyczna choroba mięśnia sercowego u kotów. Wszyscy nasi rodzice mają profil DNA N/N oraz regularne certyfikowane badanie echo serca z dopplerem.",
      badge: "Kardiologia",
      pillBg: "bg-[#E2F4E7]",
    },
    {
      code: "SMA",
      title: "Rdzeniowy Zanik Mięśni",
      status: "N/N Wolny (Certyfikat)",
      desc: "Choroba neuronów ruchowych prowadząca do paraliżu i zaniku mięśni. Całe nasze stado hodowlane jest w 100% wolne od nosicielstwa genu LIX1.",
      badge: "Neurologia DNA",
      pillBg: "bg-[#E0F2FE]",
    },
    {
      code: "PKD",
      title: "Wielotorbielowatość Nerek",
      status: "N/N Wolny od Torbieli",
      desc: "Wrodzona wada prowadząca do niewydolności nerek. Wszystkie koty posiadają negatywne testy genetyczne oraz profilaktyczne USG nerek.",
      badge: "Nefrologia",
      pillBg: "bg-[#EFE6FD]",
    },
    {
      code: "FeLV / FIV",
      title: "Kocia Białaczka & Niedobór",
      status: "Ujemny / Negative (-)",
      desc: "Groźne wirusy obniżające odporność kota. Nasza hodowla jest w 100% zamknięta i wolna od patogenów wirusowych.",
      badge: "Wirusologia",
      pillBg: "bg-[#FFE5D9]",
    },
    {
      code: "FPL / FIFe",
      title: "5-Pokoleniowy Rodowód",
      status: "100% Autentyczność FPL",
      desc: "Prawdziwy rodowód Felis Polonia (FPL) pod patronatem FIFe honorowany na całym świecie, bez luk genealogicznych.",
      badge: "Genealogia",
      pillBg: "bg-[#FEF9C3]",
    },
    {
      code: "Socjalizacja",
      title: "Chów z Dziećmi i Psem",
      status: "Stabilna Psychika",
      desc: "Kocięta nie boją się ludzi, hałasów domowych ani innych zwierząt. Od 1. dnia życia są otoczone miłością w naszym rodzinnym salonie.",
      badge: "Behawior",
      pillBg: "bg-[#E2F4E7]",
    },
  ];

  return (
    <section id="zdrowie" className="py-20 sm:py-28 border-b-2.5 border-[#2A221F] relative overflow-hidden bg-[#F0FBF4] text-[#2A221F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14 text-xs font-mono uppercase tracking-widest text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E2F4E7] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
              07
            </span>
            <span className="text-[#2A221F] font-black">🏥 Certyfikaty Medyczne &bull; Kardiologia & Genetyka</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-bold text-xs text-[#2A221F]/70">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">Laboklin Germany</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Echo Serca Doppler</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5D9] border border-[#2A221F]/40 text-[#2A221F]">100% Wyniki N/N</span>
          </div>
        </div>

        {/* Section Headline with Exact Plan SEO Copy */}
        <div className="space-y-5 mb-12 max-w-4xl">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2F4E7] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-3 shadow-[2px_2px_0px_#2A221F]">
              <HeartPulse className="w-3.5 h-3.5 text-[#2A221F]" /> Bezwzględna Transparentność Medyczna &middot; Dane Weterynaryjne
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight">
              Zdrowie i genetyka – Transparentne certyfikaty naszych kotów
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2A221F]/90 font-mono leading-relaxed">
            Wybierając nowego członka rodziny na kilkanaście lat, absolutnym priorytetem powinno być jego zdrowie. 
            Fundamentem hodowli Koci Przyjaciel jest bezwzględna transparentność medyczna, dlatego wyniki badań naszych kotów hodowlanych 
            są zawsze do wglądu dla przyszłych opiekunów. Nie opieramy się na przypuszczeniach – opieramy się na twardych danych weterynaryjnych.
          </p>

          <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
            Każdy kot w naszym programie hodowlanym przechodzi rygorystyczne testy pod kątem chorób dziedzicznych, 
            które są najpoważniejszym zagrożeniem dla tej rasy. Posiadamy certyfikaty z laboratoriów potwierdzające u naszych kotów status 
            <strong> N/N (negatywny/wolny od mutacji)</strong> dla kardiomiopatii przerostowej (HCM), rdzeniowego zaniku mięśni (SMA) 
            oraz wielotorbielowatości nerek (PKD). Dodatkowo, nasze zwierzęta reprodukcyjne są pod stałą opieką kardiologiczną – regularnie 
            wykonujemy im certyfikowane badanie Echo serca, które potwierdza prawidłową budowę i brak zmian morfologicznych.
          </p>

          <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
            Nasze stado jest całkowicie wolne od zakaźnych chorób wirusowych, co potwierdzają negatywne wyniki testów na FIV oraz brak 
            nosicielstwa markerów genetycznych wirusa białaczki kociej (FeLV). Co więcej, w przypadku kotów o maści z dominacją bieli, 
            obligatoryjnie wykonujemy specjalistyczne testy słuchowe BAER, eliminując ryzyko wrodzonej głuchoty. Wybierając kociaka z naszej hodowli, 
            masz pewność, że zrobiliśmy wszystko, co w mocy współczesnej medycyny weterynaryjnej, aby zapewnić mu długie i zdrowe życie.
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tests.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-white border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] space-y-4 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-[#2A221F]/15 pb-3">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-[#2A221F] text-white">
                    {item.code}
                  </span>
                  <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full ${item.pillBg} text-[#2A221F] border border-[#2A221F] uppercase tracking-wider`}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#2A221F] font-editorial">
                    {item.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-[#164e29] bg-[#E2F4E7] px-3 py-1 rounded-xl mt-2 border border-[#2A221F] shadow-[2px_2px_0px_#2A221F]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.status}</span>
                  </div>
                </div>

                <p className="text-xs text-[#2A221F]/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2A221F]/15 text-[10px] font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider flex items-center justify-between">
                <span>Certyfikacja Weterynaryjna</span>
                <span className="text-emerald-700 font-black">✓ ZWERYFIKOWANE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Seal Banner */}
        <div className="rounded-3xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6 border-2.5 border-[#2A221F] bg-[#FFE5D9] shadow-[6px_6px_0px_#2A221F]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#2A221F] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-[#2A221F]" />
            </div>
            <div>
              <h4 className="text-lg font-black text-[#2A221F] font-editorial">
                Wszystkie certyfikaty medyczne są do wglądu przy odbiorze kociaka
              </h4>
              <p className="text-xs text-[#2A221F]/80 font-mono mt-0.5">
                Otrzymujesz kopie badań rodziców dołączone do teczki adopcyjnej malucha.
              </p>
            </div>
          </div>
          <a
            href={`tel:${REAL_PHONE_RAW}`}
            className="px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7FE] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all flex items-center gap-2 shrink-0 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Zadzwoń do nas: {REAL_PHONE}</span>
            <Phone className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
