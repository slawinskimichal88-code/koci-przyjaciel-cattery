"use client";

import React from "react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_LOCATION } from "@/data/realCatsData";
import { ArrowRight, Phone, MapPin, Sparkles } from "lucide-react";
import { FacebookIcon } from "@/components/ui/SocialIcons";

interface ContactSectionProps {
  lang: "PL" | "EN";
  onOpenReservation?: () => void;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  return (
    <section id="kontakt" className="bg-black text-[#f5f5f7] overflow-hidden py-16 sm:py-24 border-t border-white/[0.08] relative">
      
      {/* Dynamic ambient backdrop */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Header (Apple Keynote Style) ───────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium">
              {lang === "PL" ? "ROZMOWA I REZERWACJA" : "GET IN TOUCH"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-[#f5f5f7] leading-[1.02] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Zrób pierwszy krok ku swojemu<br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">
                  nowemu przyjacielowi.
                </span>
              </>
            ) : (
              <>
                Take the first step towards your<br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">
                  new companion.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#86868b] font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Odpowiadamy na każde zapytanie. Zapraszamy do rozmowy telefonicznej, odwiedzin w hodowli we Wrocławiu lub bezpośredniej wiadomości na Messengerze."
              : "We answer every inquiry. Call us directly, visit our home in Wrocław or message us on Messenger."}
          </p>
        </div>

        {/* ── 3 KROKI ADOPCJI (APPLE BENTO CARDS) ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 sm:mb-16">
          {[
            {
              step: "01",
              title: lang === "PL" ? "Kontakt i dopasowanie" : "Inquiry & match",
              desc: lang === "PL"
                ? "Dzwonisz do nas lub piszesz. Rozmawiamy o Twoich oczekiwaniach, trybie życia i dopasowujemy charakter kociaka."
                : "Call or write. We discuss your lifestyle and match the right temperament.",
            },
            {
              step: "02",
              title: lang === "PL" ? "Wizyta lub wideo na żywo" : "Visit or live video",
              desc: lang === "PL"
                ? "Odwiedzasz nas w salonie we Wrocławiu lub łączymy się na wideorozmowę. Widzisz rodziców, warunki i wybieg."
                : "Visit our home in Wrocław or book a live video tour to see parents and garden run.",
            },
            {
              step: "03",
              title: lang === "PL" ? "Umowa FPL i wyprawka" : "Contract & welcome kit",
              desc: lang === "PL"
                ? "Podpisujemy oficjalną umowę, otrzymujesz 5-pokoleniowy rodowód, badania genetyczne N/N i kompletną wyprawkę."
                : "Official FPL agreement, 5-gen pedigree, full DNA clearance and luxury starter kit.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-[28px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-heading font-light text-[#2997ff] mb-4 block font-mono">
                  {item.step}
                </span>
                <h3 className="text-base sm:text-lg font-heading font-medium text-[#f5f5f7] mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#86868b] font-body font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Split Kontaktowy: Dane i Szybkie Akcje + Karta Messenger ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Lewa Kolumna: Dane kontaktowe */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Telefon */}
            <div className="p-6 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all">
              <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] mb-2 font-medium">
                {lang === "PL" ? "Bezpośredni Telefon" : "Direct Phone"}
              </p>
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="flex items-center gap-3 text-[#f5f5f7] hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#2997ff] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-xl sm:text-2xl font-medium block leading-none tracking-tight">
                    {REAL_PHONE}
                  </span>
                  <span className="text-[11px] font-mono text-[#86868b] mt-1 block">Pn – Nd: 9:00 – 21:00</span>
                </div>
              </a>
            </div>

            {/* Lokalizacja */}
            <div className="p-6 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all">
              <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] mb-2 font-medium">
                {lang === "PL" ? "Lokalizacja Hodowli" : "Cattery Location"}
              </p>
              <div className="flex items-center gap-3 text-[#f5f5f7]">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#86868b]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-lg font-medium block leading-none mb-1 tracking-tight">
                    {REAL_LOCATION}
                  </span>
                  <span className="text-[11px] font-mono text-[#86868b]">Województwo dolnośląskie · Dogodny dojazd</span>
                </div>
              </div>
            </div>

            {/* Facebook Messenger */}
            <div className="p-6 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all">
              <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] mb-2 font-medium">
                Facebook Messenger
              </p>
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#f5f5f7] hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#1877F2]/15 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] group-hover:scale-105 transition-transform">
                  <FacebookIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-heading text-lg font-medium block leading-none mb-1 tracking-tight">
                    Koci Przyjaciel *PL
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">Ponad 26 000 obserwujących</span>
                </div>
              </a>
            </div>

          </div>

          {/* Prawa Kolumna: Karta szybkiego kontaktu Apple style */}
          <div className="lg:col-span-7 bg-[#161617] p-8 sm:p-12 rounded-[28px] border border-white/[0.08] flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#f5f5f7] mb-4 tracking-tight">
              {lang === "PL" ? "Zarezerwuj kociaka" : "Reserve a kitten"}
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] font-body mb-8 max-w-md mx-auto leading-relaxed font-light">
              {lang === "PL" 
                ? "Stawiamy na bezpośrednią relację i szybki kontakt. Aby omówić adopcję lub zadać nam pytanie, napisz do nas bezpośrednio na Messengerze hodowli." 
                : "We prioritize direct human connection. To discuss kitten adoption or ask questions, message us directly on our Facebook Messenger."}
            </p>
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-body text-[13px] font-medium tracking-tight hover:bg-[#f5f5f7] transition-all flex items-center justify-center gap-2.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <FacebookIcon className="w-4 h-4 fill-current" />
              <span>{lang === "PL" ? "Napisz na Messengerze" : "Message on Messenger"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
