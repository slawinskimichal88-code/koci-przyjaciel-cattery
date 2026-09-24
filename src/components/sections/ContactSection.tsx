"use client";

import React from "react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_LOCATION } from "@/data/realCatsData";
import { ArrowRight, Phone, MapPin, Sparkles, MessageCircle, ShieldCheck, Heart } from "lucide-react";
import { FacebookIcon } from "@/components/ui/SocialIcons";

interface ContactSectionProps {
  lang: "PL" | "EN";
  onOpenReservation?: () => void;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  return (
    <section id="kontakt" className="bg-[#09090B] text-white overflow-hidden py-16 sm:py-24 border-t border-white/10 relative">
      
      {/* Dynamic ambient backdrop */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "BEZPOŚREDNI KONTAKT" : "GET IN TOUCH"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Napisz do nas na <span className="font-semibold italic text-[#1877F2]">Facebooku</span>.
              </>
            ) : (
              <>
                Message us on <span className="font-semibold italic text-[#1877F2]">Facebook</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Wszystkie rozmowy, rezerwacje i aktualności prowadzimy bezpośrednio przez nasz oficjalny profil na Facebooku oraz telefonicznie. Odpowiadamy na każdą wiadomość!"
              : "All conversations, reservations and updates are handled directly through our official Facebook page or by phone."}
          </p>
        </div>

        {/* ── 3 KROKI KONTAKTU / ADOPCJI ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[
            {
              step: "01",
              title: lang === "PL" ? "Wiadomość na Facebooku" : "Facebook Message",
              desc: lang === "PL"
                ? "Napisz do nas prywatną wiadomość na Facebook Messengerze. Opowiedz o swoich oczekiwaniach i wymarzonym kociaku."
                : "Send us a message on Facebook Messenger. Share your preferences and lifestyle.",
            },
            {
              step: "02",
              title: lang === "PL" ? "Rozmowa & Odwiedziny" : "Call & Visit",
              desc: lang === "PL"
                ? "Dzwonimy do Ciebie lub zapraszamy do Wrocławia, aby zobaczyć kociaki na żywo, poznać rodziców i warunki domowe."
                : "We can schedule a phone call or visit our home in Wrocław to meet the kittens and parents in person.",
            },
            {
              step: "03",
              title: lang === "PL" ? "Oficjalna Umowa FPL" : "Official FPL Agreement",
              desc: lang === "PL"
                ? "Gwarancja czystości rasy, 5-pokoleniowy rodowód FPL/FIFe, komplet badań genetycznych N/N i bogata wyprawka."
                : "Official FPL pedigree, comprehensive genetic health clearance (N/N), and a complete starter kit.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-heading font-light text-amber-300/80 mb-4 block font-mono">
                  {item.step}
                </span>
                <h3 className="text-lg font-heading font-medium text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-body font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Główny baner kontaktu przekierowujący na Facebook ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Duży elegancki box Facebook (Hero CTA) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#1877F2]/20 via-[#1877F2]/10 to-transparent p-8 sm:p-12 border border-[#1877F2]/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1877F2]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1877F2]/25 transition-colors" />

            <div className="relative z-10 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-blue-300 text-xs font-mono mb-6">
                <FacebookIcon className="w-4 h-4 fill-current text-[#1877F2]" />
                <span>Oficjalny Fanpage · 26 000+ obserwujących</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white leading-tight mb-4">
                {lang === "PL" ? "Porozmawiajmy na Messengerze" : "Chat on Messenger"}
              </h3>
              
              <p className="text-base text-zinc-300 font-body font-light max-w-xl leading-relaxed">
                {lang === "PL"
                  ? "Najszybsza forma kontaktu. Na Facebooku na bieżąco publikujemy nowe zdjęcia maluchów, relacje z wybiegu i odpowiadamy na pytania przyszłych opiekunów."
                  : "The fastest way to reach us. On Facebook we publish current photos, daily videos, and answer every message from prospective owners."}
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-body text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-[0_10px_30px_rgba(24,119,242,0.4)] cursor-pointer w-full sm:w-auto text-center"
              >
                <FacebookIcon className="w-5 h-5 fill-current" />
                <span>{lang === "PL" ? "Przejdź do profilu na Facebooku" : "Open Facebook Profile"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="block mt-3 text-xs font-mono text-zinc-400">
                {lang === "PL" ? "Otwiera oficjalny profil hodowli w nowej karcie" : "Opens official cattery profile in a new tab"}
              </span>
            </div>
          </div>

          {/* Prawa strona: Bezpośredni telefon i Wizyta w hodowli */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Telefon */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between flex-1">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  {lang === "PL" ? "Rozmowa telefoniczna" : "Direct Phone Call"}
                </p>
                <h4 className="text-xl font-heading text-white mb-2">
                  {lang === "PL" ? "Zadzwoń do hodowczyni" : "Call the breeder"}
                </h4>
                <p className="text-xs text-zinc-400 font-body mb-6 leading-relaxed">
                  {lang === "PL"
                    ? "Chętnie opowiemy o bieżących planach hodowlanych, wolnych kociętach i charakterze rasy."
                    : "We are happy to answer any questions about our kittens and breed temperament."}
                </p>
              </div>

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white hover:text-amber-300 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-xl font-light block leading-none">
                      {REAL_PHONE}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">Pn – Nd: 9:00 – 21:00</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Lokalizacja & Certyfikacja */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between flex-1">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  {lang === "PL" ? "Lokalizacja & Związek" : "Location & Registration"}
                </p>
                <div className="flex items-start gap-3 text-white mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-lg font-light block leading-tight mb-1">
                      {REAL_LOCATION}
                    </span>
                    <span className="text-xs text-zinc-400 font-body block">
                      Województwo dolnośląskie · Dogodny dojazd (A4 / A8)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certyfikacja Felis Polonia (FPL) & FIFe</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
