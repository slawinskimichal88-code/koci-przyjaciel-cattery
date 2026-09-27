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
    <section id="faq" className="bg-black text-[#f5f5f7] overflow-hidden border-b border-white/[0.08] scroll-mt-24">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 reveal">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium mb-6">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[#f5f5f7]">{lang === "PL" ? "Baza Wiedzy & FAQ · Felinologia" : "Knowledge Base & FAQ · Felinology"}</span>
        </div>
        <h2
          className="font-heading font-light text-[#f5f5f7] leading-[0.95] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
        >
          Odpowiedzi na<br />
          <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
            Twoje pytania.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg font-body text-[#86868b] max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Świadoma decyzja o przyjęciu kota rasy Maine Coon wymaga rzetelnej wiedzy felinologicznej. Poznaj odpowiedzi na najczęstsze pytania dotyczące rodowodu FPL, zdrowia i przygotowania domu."
            : "Adopting a Maine Coon requires verified knowledge. Explore our comprehensive answers regarding FPL/FIFe pedigree authenticity, health screening, and home preparation."}
        </p>
      </div>

      {/* ── Accordion List — Apple Clean Borders ─────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 sm:py-7 reveal">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left flex items-start justify-between gap-6 cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-heading font-medium text-[#f5f5f7] group-hover:text-white transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-white text-black" : "bg-white/5 text-zinc-300 group-hover:bg-white/10"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-12 text-sm sm:text-base font-body text-[#86868b] leading-relaxed font-light animate-fadeIn">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Pomoc bezpośrednia ──────────────────────────────────── */}
        <div className="mt-16 p-8 bg-[#161617] border border-white/[0.08] rounded-[28px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-xl text-[#f5f5f7] font-medium">
              {lang === "PL" ? "Masz inne pytanie dotyczące miotu?" : "Have a specific question about a litter?"}
            </h4>
            <p className="text-xs font-body text-[#86868b] mt-1 font-light">
              {lang === "PL"
                ? "Chętnie doradzimy telefonicznie lub przez wiadomość na Messengerze."
                : "We are happy to advise you by phone or on Messenger."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-ui font-medium tracking-tight hover:bg-[#f5f5f7] transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>{REAL_PHONE}</span>
            </a>
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#f5f5f7] border border-white/15 text-xs font-ui font-medium tracking-tight transition-all cursor-pointer"
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
