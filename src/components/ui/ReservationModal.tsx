"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Send, Phone } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultKitten?: string;
  lang?: "PL" | "EN";
}

export default function ReservationModal({
  isOpen,
  onClose,
  defaultKitten = "",
  lang = "PL",
}: ReservationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kitten, setKitten] = useState(defaultKitten);
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Keep kitten in sync if prop changes
  React.useEffect(() => {
    if (defaultKitten) {
      setKitten(defaultKitten);
    }
  }, [defaultKitten]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reservation",
          name,
          email,
          phone,
          kitten,
          message,
          termsAccepted,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Wystąpił błąd podczas wysyłania zapytania.");
      }
    } catch {
      setErrorMsg("Błąd połączenia z serwerem. Prosimy spróbować ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 bg-[#111111] text-[#F5F0E8] border border-[#C8973B]/50 rounded-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8B8680] hover:text-white transition-colors cursor-pointer"
          title="Zamknij"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C8973B]/10 border border-[#C8973B] text-[#C8973B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading font-normal text-[#F5F0E8]">
              Dziękujemy za Zapytanie
            </h3>
            <p className="text-sm font-body text-[#8B8680] max-w-sm mx-auto leading-relaxed">
              Odezwiemy się do Ciebie w ciągu kilku godzin, aby potwierdzić dostępność malucha i odpowiedzieć na wszelkie pytania.
            </p>
            <div className="pt-2">
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="inline-flex items-center gap-2 text-xs font-ui uppercase font-bold text-[#C8973B] tracking-wider hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>Pilny kontakt: {REAL_PHONE}</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-ui uppercase font-bold text-[#C8973B] tracking-[0.2em] block">
                FORMULARZ REZERWACJI
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-normal text-white">
                Zarezerwuj Kociaka
              </h3>
              <p className="text-xs text-[#8B8680] font-body">
                Wypełnij poniższe dane — skontaktujemy się z Tobą telefonicznie.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-ui uppercase tracking-wider text-[#8B8680] mb-1">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  required
                  placeholder="np. Jan Kowalski"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#333333] focus:border-[#C8973B] text-white text-sm rounded-sm outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-ui uppercase tracking-wider text-[#8B8680] mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="twoj@email.pl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#333333] focus:border-[#C8973B] text-white text-sm rounded-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-ui uppercase tracking-wider text-[#8B8680] mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+48 600 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#333333] focus:border-[#C8973B] text-white text-sm rounded-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-ui uppercase tracking-wider text-[#8B8680] mb-1">
                  Który kotek?
                </label>
                <input
                  type="text"
                  placeholder="np. Arthur Koci Przyjaciel *PL (lub Dowolny)"
                  value={kitten}
                  onChange={(e) => setKitten(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#333333] focus:border-[#C8973B] text-white text-sm rounded-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-ui uppercase tracking-wider text-[#8B8680] mb-1">
                  Wiadomość / Doświadczenie ze zwierzętami
                </label>
                <textarea
                  rows={3}
                  placeholder="Napisz kilka słów o swoim domu, dzieciach czy innych zwierzętach..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#1A1A1A] border border-[#333333] focus:border-[#C8973B] text-white text-sm rounded-sm outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 accent-[#C8973B] cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-[#8B8680] font-body leading-relaxed cursor-pointer">
                  Akceptuję warunki rezerwacji oraz zasady opieki nad kotem (wymóg zabezpieczenia okien/balkonu).
                </label>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-sm">
                  {errorMsg}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!termsAccepted || loading}
              className="w-full btn-gold-primary mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{loading ? "Wysyłanie zapytania..." : "Wyślij zapytanie rezerwacyjne"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
