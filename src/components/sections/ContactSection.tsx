"use client";

import React, { useState } from "react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_LOCATION } from "@/data/realCatsData";
import { ArrowRight, Phone, MapPin } from "lucide-react";

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
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
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
    <section id="kontakt" className="bg-[#0A0A0A] text-white overflow-hidden">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-white/30 mb-6">
          {lang === "PL" ? "Kontakt" : "Contact"}
        </p>
        <h2
          className="font-heading font-light text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Napisz<br />
          <span className="font-semibold italic">do nas.</span>
        </h2>
      </div>

      {/* ── Kontakt split ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Lewo: dane kontaktowe */}
          <div className="reveal space-y-10">
            <div className="border-t border-white/10 pt-8">
              <p className="text-xs font-ui uppercase tracking-widest text-white/30 mb-3">
                {lang === "PL" ? "Telefon" : "Phone"}
              </p>
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="flex items-center gap-3 group"
              >
                <Phone className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                <span
                  className="font-heading font-light text-white group-hover:text-white/70 transition-colors"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                >
                  {REAL_PHONE}
                </span>
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-xs font-ui uppercase tracking-widest text-white/30 mb-3">
                {lang === "PL" ? "Lokalizacja" : "Location"}
              </p>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/30 shrink-0" />
                <span
                  className="font-heading font-light text-white"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                >
                  {REAL_LOCATION}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-xs font-ui uppercase tracking-widest text-white/30 mb-3">
                Facebook
              </p>
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-light text-white hover:text-white/60 transition-colors"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                Koci Przyjaciel *PL
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <button
                onClick={onOpenReservation}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors cursor-pointer"
              >
                <span>{lang === "PL" ? "Zarezerwuj kociaka" : "Reserve a kitten"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Prawo: formularz */}
          <div className="reveal reveal-delay-2">
            {sent ? (
              <div className="pt-8 space-y-4">
                <div
                  className="font-heading font-light text-white"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {lang === "PL" ? "Dziękujemy!" : "Thank you!"}
                </div>
                <p className="text-base font-body text-white/50">
                  {lang === "PL"
                    ? "Odezwiemy się najszybciej jak to możliwe."
                    : "We'll get back to you as soon as possible."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 pt-8">
                {[
                  { id: "contact-name", label: lang === "PL" ? "Imię i nazwisko" : "Name", type: "text", value: name, set: setName },
                  { id: "contact-email", label: "Email", type: "email", value: email, set: setEmail },
                ].map((field) => (
                  <div key={field.id} className="group">
                    <label className="block text-xs font-ui uppercase tracking-widest text-white/30 mb-2">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      required
                      className="w-full bg-transparent border-b border-white/15 py-3 text-base font-body text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors"
                      placeholder={field.label}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-ui uppercase tracking-widest text-white/30 mb-2">
                    {lang === "PL" ? "Wiadomość" : "Message"}
                  </label>
                  <textarea
                    id="contact-message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/15 py-3 text-base font-body text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
                    placeholder={lang === "PL" ? "Twoja wiadomość..." : "Your message..."}
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? (lang === "PL" ? "Wysyłanie..." : "Sending...") : (lang === "PL" ? "Wyślij" : "Send")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </section>
  );
}
