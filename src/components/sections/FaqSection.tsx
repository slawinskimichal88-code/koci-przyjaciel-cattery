"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/faqs";
import { ChevronDown, HelpCircle, Phone, ArrowRight } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface FaqSectionProps {
  lang: "PL" | "EN";
  onOpenReservation?: () => void;
}

export default function FaqSection({ lang, onOpenReservation }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#FAFAF8] text-black overflow-hidden border-t border-black/10">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "Baza Wiedzy & FAQ" : "Knowledge & FAQ"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Odpowiedzi na<br />
          <span className="font-semibold italic">Twoje pytania.</span>
        </h2>
        <p className="mt-8 text-base sm:text-lg font-body text-black/70 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Świadoma decyzja o przyjęciu kota rasy Maine Coon wymaga rzetelnej wiedzy felinologicznej. Poznaj odpowiedzi na najczęstsze pytania dotyczące rodowodu FPL, zdrowia i przygotowania domu."
            : "Adopting a Maine Coon requires verified knowledge. Explore our comprehensive answers regarding FPL/FIFe pedigree authenticity, health screening, and home preparation."}
        </p>
      </div>

      {/* ── Accordion List — Apple Clean Borders ─────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <div className="border-t border-black/10 divide-y divide-black/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 sm:py-8 reveal">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left flex items-start justify-between gap-6 cursor-pointer group"
                >
                  <span className="text-lg sm:text-xl font-heading font-medium text-black group-hover:text-black/70 transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-black/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-black text-white" : "bg-transparent text-black"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-12 text-sm sm:text-base font-body text-black/70 leading-relaxed animate-fadeIn">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Pomoc bezpośrednia ──────────────────────────────────── */}
        <div className="mt-16 p-8 bg-white border border-black/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-xl text-black font-normal">
              {lang === "PL" ? "Masz inne pytanie dotyczące miotu?" : "Have a specific question about a litter?"}
            </h4>
            <p className="text-xs font-body text-black/50 mt-1">
              {lang === "PL"
                ? "Chętnie doradzimy telefonicznie lub przez e-mail."
                : "We are happy to advise you by phone or email."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-ui uppercase tracking-widest font-bold hover:bg-black/80 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{REAL_PHONE}</span>
            </a>
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black text-black text-xs font-ui uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <span>{lang === "PL" ? "Napisz na Facebooku" : "Message on Facebook"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </section>
  );
}
