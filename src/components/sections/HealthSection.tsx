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
    title: { PL: "Badanie serca", EN: "Heart Screening" },
    status: { PL: "Wynik: Zdrowe", EN: "Result: Clear" },
    desc: {
      PL: "Maine Coony są podatne na chorobę serca (kardiomiopatię). Wszystkie nasze koty hodowlane mają regularne badanie echokardiograficzne serca wykonywane przez kardiologa weterynaryjnego.",
      EN: "Maine Coons are prone to heart disease (cardiomyopathy). All our breeding cats have regular echocardiographic heart checks done by a veterinary cardiologist.",
    },
    badge: { PL: "Serce", EN: "Heart" },
  },
  {
    code: "SMA",
    icon: Dna,
    title: { PL: "Badanie genów", EN: "Genetic Testing" },
    status: { PL: "Wynik: Zdrowe", EN: "Result: Clear" },
    desc: {
      PL: "Robimy testy DNA sprawdzające czy kot nie nosi genów chorob dziedzicznych. To jedyny sposób, żeby mieć pewność, że kociak nie zachoruje na nie w przyszłości.",
      EN: "We do DNA tests to check that the cat does not carry genes for hereditary diseases. It is the only way to ensure the kitten won't develop them in the future.",
    },
    badge: { PL: "Genetyka", EN: "Genetics" },
  },
  {
    code: "PKD",
    icon: Activity,
    title: { PL: "Nerki i narządy wewnętrzne", EN: "Kidneys & Internal Organs" },
    status: { PL: "Wynik: Zdrowe", EN: "Result: Clear" },
    desc: {
      PL: "Sprawdzamy także nerki naszych kotów za pomocą testów genetycznych i badań USG. To ważne, bo niektóre rasy mogą być podatne na wrodzone choroby nerek.",
      EN: "We also check our cats' kidneys through genetic tests and ultrasound scans. Important, as some breeds can be prone to congenital kidney diseases.",
    },
    badge: { PL: "Nerki", EN: "Kidneys" },
  },
  {
    code: "FeLV / FIV",
    icon: ShieldCheck,
    title: { PL: "Zamknięta hodowla", EN: "Closed Cattery" },
    status: { PL: "Brak kontaktu z obcymi zwierzętami", EN: "No outside animal contact" },
    desc: {
      PL: "Nasze koty nie mają kontaktu z obcymi zwierzętami. To prosta, ale skuteczna zasada, która chroni je przed chorobami zakaźnymi.",
      EN: "Our cats have no contact with outside animals. A simple but effective rule that protects them from infectious diseases.",
    },
    badge: { PL: "Bezpieczeństwo", EN: "Safety" },
  },
  {
    code: "BAER",
    icon: Stethoscope,
    title: { PL: "Badanie słuchu", EN: "Hearing Test" },
    status: { PL: "Słuch prawidłowy", EN: "Normal hearing" },
    desc: {
      PL: "U kotów z dużą ilością bieli w umaszczeniu sprawdzamy słuch specjalistycznym testem. Dzięki temu mamy pewność, że kociak słyszy prawidłowo.",
      EN: "For cats with a lot of white in their coat we check hearing with a specialist test. This ensures the kitten hears correctly.",
    },
    badge: { PL: "Słuch", EN: "Hearing" },
  },
  {
    code: "Rodowód",
    icon: FileCheck,
    title: { PL: "Oficjalny rodowód", EN: "Official Pedigree" },
    status: { PL: "Potwierdzony przez FIFe / FPL", EN: "Certified by FIFe / FPL" },
    desc: {
      PL: "Każde kocię dostaje oficjalny dokument rodowodowy potwierdzający, skąd pochodzi i jacy są jego pradziadkowie. To dowód na to, że to prawdziwy Maine Coon.",
      EN: "Every kitten receives an official pedigree document proving its origin and ancestry. Proof that it is a genuine Maine Coon.",
    },
    badge: { PL: "Rodowód", EN: "Pedigree" },
  },
];

export default function HealthSection({ lang }: HealthSectionProps) {
  return (
    <section id="zdrowie" className="bg-black text-[#f5f5f7] overflow-hidden border-b border-white/[0.08] scroll-mt-24">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 reveal">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[#f5f5f7]">{lang === "PL" ? "Badania i Certyfikaty · HCM / PKD / SMA" : "Health & Genetics · HCM / PKD / SMA"}</span>
        </div>
        <h2
          className="font-heading font-light text-[#f5f5f7] leading-[0.95] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
        >
          Zdrowie naszych kotów.<br />
          <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-zinc-300">
            Nie zostawiamy nic przypadkowi.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg font-body text-[#86868b] max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Zanim kociak trafi do Ciebie, jego rodzice mają za sobą pełne badania — serce (Echo Doppler), geny (Laboklin N/N), słuch. Pokazujemy wyniki każdemu przyszłemu opiekunowi. Żadnych tajemnic, żadnych niespodzianek."
            : "Before a kitten comes to you, its parents have undergone full health checks — heart (Doppler Echo), genes (Laboklin N/N), hearing. We share all official certificates. No secrets, no surprises."}
        </p>
      </div>

      {/* ── Grid Kart Badań — Apple Minimalist Grid ──────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTS.map((test, i) => {
            const IconComponent = test.icon;
            return (
              <div
                key={test.code}
                className="reveal p-8 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.08]">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-white/[0.06] border border-white/[0.1] rounded-full text-[#86868b] font-medium">
                      {test.badge[lang]}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-bold tracking-widest text-[#2997ff] uppercase mb-1">
                    {test.code}
                  </div>
                  <h3 className="text-xl font-heading font-medium text-[#f5f5f7] mb-3">
                    {test.title[lang]}
                  </h3>
                  <p className="text-sm font-body text-[#86868b] leading-relaxed mb-6 font-light">
                    {test.desc[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <span className="text-xs font-ui font-semibold text-emerald-400 tracking-wide">
                    {test.status[lang]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pasek Zaufania Medycznego ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
        <div className="reveal border-t border-white/[0.08] pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-medium text-[#f5f5f7] mb-1">
              Laboklin
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] font-medium">
              {lang === "PL" ? "Niemieckie laboratorium genetyczne" : "German genetics laboratory"}
            </p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-medium text-[#f5f5f7] mb-1">
              Echo serca
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] font-medium">
              {lang === "PL" ? "Regularne badanie kardiologiczne" : "Regular cardiology screening"}
            </p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-medium text-[#f5f5f7] mb-1">
              Zdrowe linie
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] font-medium">
              {lang === "PL" ? "Potwierdzone dokumentami dla każdego" : "Certified documents for everyone"}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
