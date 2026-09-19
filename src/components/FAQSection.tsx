"use client";

import React, { useState } from "react";
import { ChevronDown, Phone, HelpCircle, Sparkles } from "lucide-react";
import { FAQS } from "@/data/faqs";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface FAQSectionProps {
  lang: "PL" | "EN" | "DE";
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 border-b-2.5 border-[#2A221F] relative overflow-hidden bg-[#FDFBF7] text-[#2A221F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14 text-xs font-mono font-bold text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#EFE6FD] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
              11
            </span>
            <span className="text-[#2A221F] font-black tracking-widest uppercase">
              📚 Baza Wiedzy &bull; Rodowód FPL & Koszty Utrzymania
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">Edukacja Felinologiczna</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Dokumenty FPL</span>
          </div>
        </div>

        {/* Section Headline with Exact Plan SEO Copy */}
        <div className="text-center space-y-3 mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-1 shadow-[2px_2px_0px_#2A221F]">
            <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Edukacja Hodowlana &middot; FIFe / FPL &middot; Finanse Opieki
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05]">
            Baza wiedzy – Prawdziwy rodowód FPL i koszty utrzymania Maine Coona
          </h2>
          <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed pt-1">
            Świadoma adopcja wymaga rzetelnej wiedzy. Na rynku funkcjonuje wiele pseudohodowli, 
            dlatego zawsze edukujemy naszych klientów w kwestii dokumentacji oraz realnych kosztów życia z przedstawicielem największej rasy kotów domowych.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-all duration-200 border-2.5 border-[#2A221F] ${
                  isOpen
                    ? "bg-[#FFF9E6] shadow-[5px_5px_0px_#2A221F]"
                    : "bg-white shadow-[3px_3px_0px_#2A221F] hover:bg-[#FAF7FE]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
                >
                  <span className="font-editorial font-bold text-[#2A221F] text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#2A221F] transition-transform duration-200 shadow-[2px_2px_0px_#2A221F] ${
                      isOpen ? "rotate-180 bg-[#FFE5D9] text-[#2A221F]" : "bg-white text-[#2A221F]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-[#2A221F]/85 leading-relaxed border-t-2 border-[#2A221F]/15 font-mono">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Help Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#2A221F]/70 font-mono font-bold tracking-widest uppercase mb-3">
            🐾 Masz pytanie, którego tu nie ma?
          </p>
          <a
            href={`tel:${REAL_PHONE_RAW}`}
            className="px-7 py-3.5 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] border-2 border-[#2A221F] font-mono font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-[4px_4px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Porozmawiaj z hodowcą: {REAL_PHONE}</span>
            <Phone className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
