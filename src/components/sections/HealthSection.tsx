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
          Zdrowie naszych kotów.<br />
          <span className="font-semibold italic">Nie zostawiamy nic przypadkowi.</span>
        </h2>
        <p className="mt-8 text-base sm:text-lg font-body text-black/70 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Zanim kociak trafi do Ciebie, jego rodzice mają za sobą pełne badania — serce, geny, słuch. Pokazujemy wyniki każdemu przyszłemu właścicielowi. Żadnych tajemnic, żadnych niespodzianek."
            : "Before a kitten comes to you, its parents have undergone full health checks — heart, genes, hearing. We share all results with every future owner. No secrets, no surprises."}
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
              Laboklin
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/40">
              {lang === "PL" ? "Niemieckie laboratorium genetyczne" : "German genetics laboratory"}
            </p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-semibold text-black mb-1">
              Echo serca
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/40">
              {lang === "PL" ? "Regularne badanie kardiologiczne" : "Regular cardiology screening"}
            </p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-semibold text-black mb-1">
              Zdrowe linie
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-black/40">
              {lang === "PL" ? "Potwierdzone dokumentami dla każdego" : "Certified documents for everyone"}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
