"use client";

import React, { useState } from "react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_LOCATION } from "@/data/realCatsData";
import { ArrowRight, Phone, MapPin, Sparkles, MessageSquare, CheckCircle2, Calendar, ShieldCheck } from "lucide-react";
import { FacebookIcon } from "@/components/ui/SocialIcons";

interface ContactSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: () => void;
}

export default function ContactSection({ lang, onOpenReservation }: ContactSectionProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("male");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          interest,
          message: msg,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
      } else {
        setErrorMsg(data.error || "Wystąpił błąd podczas wysyłania wiadomości.");
      }
    } catch {
      setErrorMsg("Błąd połączenia z serwerem. Prosimy spróbować ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="bg-[#09090B] text-white overflow-hidden py-14 sm:py-18 border-t border-white/10 relative">
      
      {/* Dynamic ambient backdrop */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "ROZMOWA I REZERWACJA" : "GET IN TOUCH"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Zrób pierwszy krok ku swojemu <span className="font-semibold italic">przyjacielowi</span>.
              </>
            ) : (
              <>
                Take the first step towards your <span className="font-semibold italic">companion</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "Odpowiadamy na każde zapytanie. Zapraszamy do rozmowy telefonicznej, odwiedzin w hodowli we Wrocławiu lub wypełnienia formularza."
              : "We answer every inquiry. Call us directly, visit our home in Wrocław or send an online message."}
          </p>
        </div>

        {/* ── 3 KROKI ADOPCJI (APPLE WORKFLOW CARDS) ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {[
            {
              step: "01",
              title: lang === "PL" ? "Kontakt i Dopasowanie" : "Inquiry & Match",
              desc: lang === "PL"
                ? "Dzwonisz do nas lub piszesz. Rozmawiamy o Twoich oczekiwaniach, trybie życia i dopasowujemy charakter kociaka."
                : "Call or write. We discuss your lifestyle and match the right temperament.",
            },
            {
              step: "02",
              title: lang === "PL" ? "Wizyta / Wideo na Żywo" : "Visit or Live Video",
              desc: lang === "PL"
                ? "Odwiedzasz nas w salonie we Wrocławiu lub łączymy się na wideorozmowę. Widzisz rodziców, warunki i wybieg."
                : "Visit our home in Wrocław or book a live video tour to see parents and garden run.",
            },
            {
              step: "03",
              title: lang === "PL" ? "Umowa FPL & Wyprawka" : "Contract & Welcome Kit",
              desc: lang === "PL"
                ? "Podpisujemy oficjalną umowę, otrzymujesz 5-pokoleniowy rodowód, badania genetyczne N/N i kompletną wyprawkę."
                : "Official FPL agreement, 5-gen pedigree, full DNA clearance and luxury starter kit.",
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

        {/* ── Split Kontaktowy: Dane i Szybkie Akcje + Formularz ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Lewa Kolumna: Dane kontaktowe */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Telefon */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                {lang === "PL" ? "Bezpośredni Telefon" : "Direct Phone"}
              </p>
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-2xl font-light block leading-none">
                    {REAL_PHONE}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Pn – Nd: 9:00 – 21:00</span>
                </div>
              </a>
            </div>

            {/* Lokalizacja */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                {lang === "PL" ? "Lokalizacja Hodowli" : "Cattery Location"}
              </p>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-heading text-xl font-light block leading-none mb-1">
                    {REAL_LOCATION}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Województwo dolnośląskie · Dogodny dojazd</span>
                </div>
              </div>
            </div>

            {/* Facebook & Społeczność */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                Facebook Messenger
              </p>
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#1877F2]/15 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] group-hover:scale-105 transition-transform">
                  <FacebookIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-heading text-xl font-light block leading-none mb-1">
                    Koci Przyjaciel *PL
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">Ponad 26 000 obserwujących</span>
                </div>
              </a>
            </div>



          </div>

          {/* Prawa Kolumna: Szybki Kontakt */}
          <div className="lg:col-span-7 bg-[#141417] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-center items-center text-center">
            <h3 className="text-3xl font-heading font-light text-white mb-6">
              {lang === "PL" ? "Zarezerwuj kociaka" : "Reserve a kitten"}
            </h3>
            <p className="text-base text-zinc-400 font-body mb-10 max-w-md mx-auto leading-relaxed">
              {lang === "PL" 
                ? "Zrezygnowaliśmy z formularza kontaktowego, aby ułatwić bezpośrednią komunikację. Aby omówić adopcję lub zadać nam pytanie, napisz do nas po prostu na Messengerze." 
                : "We removed the contact form to make communication easier. To discuss adoption or ask any questions, message us directly on Messenger."}
            </p>
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.15)] transform hover:scale-105"
            >
              <FacebookIcon className="w-5 h-5 fill-current" />
              <span>{lang === "PL" ? "Napisz wiadomość" : "Send a message"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
