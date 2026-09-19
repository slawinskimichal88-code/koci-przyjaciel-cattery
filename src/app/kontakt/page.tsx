"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";
import FacebookCommunitySection from "@/components/sections/FacebookCommunitySection";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_LOCATION } from "@/data/realCatsData";

export default function ContactPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="pt-28 sm:pt-36">

        {/* Hero Banner Kontaktu */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "KONTAKT & ODWIEDZINY W HODOWLI" : "CONTACT & VISIT CATTERY"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Skontaktuj się <span className="font-semibold italic">z nami</span>.
              </>
            ) : (
              <>
                Get in touch <span className="font-semibold italic">with us</span>.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-body max-w-2xl mx-auto font-light leading-relaxed mb-8">
            {lang === "PL"
              ? "Chętnie odpowiemy na wszystkie pytania dotyczące rasy, charakteru naszych kotów oraz procedury rezerwacji. Zapraszamy do kontaktu telefonicznego lub przez formularz."
              : "We are happy to answer all your questions regarding the breed, our cats, and kitten reservation procedures."}
          </p>

          {/* Szybkie wizytówki */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left mb-12">
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Telefon</p>
                <p className="text-sm font-body font-semibold text-white">{REAL_PHONE}</p>
              </div>
            </a>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Lokalizacja</p>
                <p className="text-sm font-body font-semibold text-white">{REAL_LOCATION}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-400">Rejestracja</p>
                <p className="text-sm font-body font-semibold text-white">FPL / FIFe · ZKwP</p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Główny Formularz & Mapa */}
        <ContactSection
          lang={lang}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* 2. Społeczność Facebook (25k fanów) */}
        <FacebookCommunitySection lang={lang} />

      </main>

      <Footer lang={lang} setLang={setLang} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        lang={lang}
      />
    </div>
  );
}
