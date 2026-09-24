"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface ProcessSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: () => void;
}

const STEPS = [
  {
    num: "01",
    title: { PL: "Kontakt", EN: "Contact" },
    desc: { PL: "Napisz do nas lub zadzwoń. Opowiedz o sobie i swoim domu — chcemy wiedzieć, gdzie trafi nasz maluch.", EN: "Write or call us. Tell us about yourself and your home — we want to know where our kitten is going." },
  },
  {
    num: "02",
    title: { PL: "Rezerwacja", EN: "Reservation" },
    desc: { PL: "Wybierasz kociaka i rezerwujesz go zaliczką. Miotamy kocięta tylko dla sprawdzonych rodzin.", EN: "Choose your kitten and secure with a deposit. We only place kittens with vetted families." },
  },
  {
    num: "03",
    title: { PL: "14 tygodni", EN: "14 weeks" },
    desc: { PL: "Kocięta opuszczają nasz dom po 14. tygodniu życia. Otrzymują pełną wyprawkę, szczepienia i dokumenty.", EN: "Kittens leave at 14 weeks, fully vaccinated with paperwork and a care kit." },
  },
  {
    num: "04",
    title: { PL: "Dożywotnie wsparcie", EN: "Lifelong support" },
    desc: { PL: "Jesteśmy do dyspozycji przez cały czas. Nasi klienci stają się częścią rodziny Kociego Przyjaciela.", EN: "We are available forever. Our adopters become part of the Koci Przyjaciel family." },
  },
  {
    num: "05",
    title: { PL: "Gwarancja zdrowia", EN: "Health guarantee" },
    desc: { PL: "Każdy kociak ma certyfikat czystości genetycznej DNA. Jeśli coś pójdzie nie tak, jesteśmy z Tobą.", EN: "Every kitten comes with genetic health certification. If anything goes wrong, we are with you." },
  },
];

export default function ProcessSection({ lang, onOpenReservation }: ProcessSectionProps) {
  return (
    <section id="jak-kupic" className="bg-white text-black overflow-hidden">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "Proces adopcji" : "Adoption process"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Jak adoptować<br />
          <span className="font-semibold italic">kociaka?</span>
        </h2>
      </div>

      {/* ── 5 kroków jako lista (jak Apple "5 reasons") ──────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-20">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`reveal reveal-delay-${Math.min(i + 1, 6)} border-t border-black/10 py-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start`}
          >
            <div className="sm:col-span-2">
              <span className="text-sm font-ui text-black/25 tracking-widest">{step.num}</span>
            </div>
            <div className="sm:col-span-4">
              <h3
                className="font-heading font-light text-black leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                {step.title[lang]}
              </h3>
            </div>
            <div className="sm:col-span-6">
              <p className="text-base sm:text-lg font-body text-black/60 leading-relaxed">
                {step.desc[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div className="reveal max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28 flex flex-wrap items-center gap-6">
        <a
          href={REAL_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-colors cursor-pointer"
        >
          <span>{lang === "PL" ? "Napisz na Facebooku" : "Message on Facebook"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <span className="text-sm font-body text-black/35">
          {lang === "PL"
            ? "Dostępne kociaki i lista oczekujących na Facebooku."
            : "Available kittens and waitlist."}
        </span>
      </div>

    </section>
  );
}
