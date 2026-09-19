"use client";

import React from "react";
import { ShieldCheck, HeartPulse, Activity, Dna, FileCheck, Stethoscope } from "lucide-react";

interface HealthSectionProps {
  lang: "PL" | "EN";
}

const TESTS = [
  {
    code: "HCM",
    icon: HeartPulse,
    title: { PL: "Kardiomiopatia Przerostowa", EN: "Hypertrophic Cardiomyopathy" },
    status: { PL: "N/N Czyste (DNA + Echo Doppler)", EN: "N/N Clear (DNA + Echo Doppler)" },
    desc: {
      PL: "Najgroźniejsza genetyczna choroba serca u kotów. Wszyscy nasi rodzice posiadają profil DNA N/N oraz regularne, certyfikowane badanie echo serca z dopplerem.",
      EN: "The most critical genetic heart condition in cats. All our breeding cats hold N/N DNA status and regular certified Doppler echocardiography.",
    },
    badge: { PL: "Kardiologia", EN: "Cardiology" },
  },
  {
    code: "SMA",
    icon: Dna,
    title: { PL: "Rdzeniowy Zanik Mięśni", EN: "Spinal Muscular Atrophy" },
    status: { PL: "N/N Wolny (Certyfikat Laboklin)", EN: "N/N Clear (Laboklin Certified)" },
    desc: {
      PL: "Choroba neuronów ruchowych prowadząca do osłabienia mięśni. Całe stado hodowlane Koci Przyjaciel jest w 100% wolne od nosicielstwa wadliwego genu LIX1.",
      EN: "Motor neuron disease causing muscle atrophy. Our entire breeding stock is 100% certified free of the mutated LIX1 gene.",
    },
    badge: { PL: "Genetyka DNA", EN: "DNA Genetics" },
  },
  {
    code: "PKD",
    icon: Activity,
    title: { PL: "Wielotorbielowatość Nerek", EN: "Polycystic Kidney Disease" },
    status: { PL: "N/N Wolny od Torbieli", EN: "N/N Cyst-Free" },
    desc: {
      PL: "Wrodzona wada nerek. Wszystkie nasze koty posiadają negatywne testy genetyczne oraz profilaktyczne badania ultrasonograficzne nerek.",
      EN: "Congenital renal disorder. All our cats have certified negative DNA panels and preventative ultrasound examinations.",
    },
    badge: { PL: "Nefrologia", EN: "Nephrology" },
  },
  {
    code: "FeLV / FIV",
    icon: ShieldCheck,
    title: { PL: "Białaczka & Wirus Niedoboru", EN: "Feline Leukemia & Immunodeficiency" },
    status: { PL: "Ujemny / Negative (-)", EN: "Negative (-)" },
    desc: {
      PL: "Wirusy upośledzające układ odpornościowy. Nasza hodowla jest stadem zamkniętym — zero kontaktu z przypadkowymi zwierzętami i zero ryzyka infekcji.",
      EN: "Immunosuppressive feline viruses. Our cattery is strictly closed — zero outside breeding risk and certified negative pathogen status.",
    },
    badge: { PL: "Wirusologia", EN: "Virology" },
  },
  {
    code: "BAER",
    icon: Stethoscope,
    title: { PL: "Testy Słuchowe BAER", EN: "BAER Hearing Screening" },
    status: { PL: "100% Słuch Obustronny", EN: "100% Bilateral Hearing" },
    desc: {
      PL: "Dla kotów o umaszczeniu z dominacją bieli wykonujemy badanie potencjałów wywołanych pnia mózgu, gwarantując idealny słuch obustronny.",
      EN: "Brainstem auditory evoked response tests for white-dominant coats, ensuring certified bilateral hearing with zero genetic impairment.",
    },
    badge: { PL: "Audiologia", EN: "Audiology" },
  },
  {
    code: "FIFe / FPL",
    icon: FileCheck,
    title: { PL: "5-Pokoleniowy Rodowód", EN: "5-Generation Pedigree" },
    status: { PL: "100% Autentyczność FPL", EN: "100% Authentic FPL" },
    desc: {
      PL: "Oficjalny rodowód Felis Polonia honorowany przez wszystkie federacje felinologiczne na świecie. Brak luk genealogicznych i zerowy współczynnik inbreedu.",
      EN: "Official Felis Polonia pedigree recognized globally under FIFe. Zero undocumented lineage and proven genetic diversity.",
    },
    badge: { PL: "Genealogia", EN: "Genealogy" },
  },
];

export default function HealthSection({ lang }: HealthSectionProps) {
  return (
    <section id="zdrowie" className="bg-[#FAFAF8] text-black overflow-hidden border-t border-black/10">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "Badania i Certyfikaty" : "Health & Genetics"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Zdrowie i genetyka.<br />
          <span className="font-semibold italic">Czyste linie DNA.</span>
        </h2>
        <p className="mt-8 text-base sm:text-lg font-body text-black/70 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Wybierając nowego członka rodziny na kilkanaście lat, fundamentem musi być bezwzględna transparentność medyczna. Wyniki badań wszystkich naszych kotów hodowlanych są zawsze do wglądu przyszłych opiekunów."
            : "When choosing a feline companion for 15+ years, uncompromising medical transparency is paramount. All certified health documents and DNA results are fully disclosed to future owners."}
        </p>
      </div>

      {/* ── Grid Kart Badań — Apple Minimalist Grid ──────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTS.map((test, i) => {
            const IconComponent = test.icon;
            return (
              <div
                key={test.code}
                className={`reveal reveal-delay-${(i % 3) + 1} p-8 bg-white border border-black/8 hover:border-black/25 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md`}
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/8">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-black/80" />
                    </div>
                    <span className="text-[10px] font-ui uppercase tracking-widest px-2.5 py-1 bg-black/5 rounded-full text-black/60 font-semibold">
                      {test.badge[lang]}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-bold tracking-widest text-[#C8973B] uppercase mb-1">
                    {test.code}
                  </div>
                  <h3 className="text-xl font-heading font-medium text-black mb-3">
                    {test.title[lang]}
                  </h3>
                  <p className="text-sm font-body text-black/60 leading-relaxed mb-6">
                    {test.desc[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-xs font-ui font-semibold text-emerald-800 tracking-wide">
                    {test.status[lang]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pasek Zaufania Medycznego ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <div className="reveal border-t border-black/10 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-semibold text-black mb-1">
              Laboklin Germany
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/40">
              {lang === "PL" ? "Akredytowane laboratorium DNA" : "Accredited DNA Laboratory"}
            </p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-semibold text-black mb-1">
              Echo Doppler
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/40">
              {lang === "PL" ? "Cykliczna kontrola kardiologiczna" : "Periodic Cardiology Screening"}
            </p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-semibold text-black mb-1">
              100% N/N
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/40">
              {lang === "PL" ? "Status wolny od mutacji genetycznych" : "Mutation-Free Genetic Status"}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
