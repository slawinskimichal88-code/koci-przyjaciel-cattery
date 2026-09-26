"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Send,
  MessageCircle,
  CheckCircle2,
  Phone,
  User,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function MessengerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "Dzień dobry! 🐾 Tu hodowla Koci Przyjaciel *PL. W czym możemy Ci pomóc? Zapytaj o dostępne kocięta, planowane mioty lub warunki rezerwacji.",
      time: "Teraz",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const username =
    process.env.NEXT_PUBLIC_FB_PAGE_USERNAME ||
    "HodowlaKotowMaineCoonKociPrzyjaciel";
  const messengerUrl = `https://m.me/${username}`;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentText = inputText;
    setInputText("");
    setIsSubmitting(true);

    try {
      // Wysłanie zapytania do wewnętrznego API kontaktowego hodowli
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName || "Użytkownik Live Chat",
          contact: senderContact || "Brak danych kontaktowych",
          message: currentText,
          source: "Live Chat Widget",
        }),
      });

      // Odpowiedź asystenta w czacie
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "Dziękujemy za wiadomość! Odpowiedź wyślemy najszybciej jak to możliwe. Jeśli zależy Ci na natychmiastowym kontakcie, możesz też zadzwonić pod numer 698 837 525.",
            time: new Date().toLocaleTimeString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setIsSent(true);
        setIsSubmitting(false);
      }, 700);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── Rozwijane okienko Live Chat ──────────────────────────── */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-2xl bg-zinc-950 shadow-2xl border border-white/15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Belka tytułowa czatu */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-black p-4 text-white flex items-center justify-between border-b border-white/10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/30 bg-black">
                <Image
                  src="/logo.webp"
                  alt="Koci Przyjaciel *PL"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm font-ui leading-tight text-white flex items-center gap-1.5">
                  Koci Przyjaciel *PL
                </h4>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5 font-ui">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Czat na żywo · Odpowiadamy na bieżąco
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Zamknij czat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Obszar wiadomości w czacie */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0d0d0e]/95">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed font-body shadow-sm ${
                    m.sender === "user"
                      ? "bg-amber-400 text-black font-medium rounded-tr-sm"
                      : "bg-zinc-800/90 text-zinc-200 border border-white/10 rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-zinc-500 font-ui mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isSubmitting && (
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-ui pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                <span>Wysyłanie wiadomości...</span>
              </div>
            )}
          </div>

          {/* Opcjonalne pola kontaktowe (imię / tel lub email) */}
          <div className="p-3 bg-zinc-900/95 border-t border-white/10 space-y-2">
            {!isSent && (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Twoje imię..."
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400 font-ui"
                />
                <input
                  type="text"
                  placeholder="Telefon lub e-mail..."
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400 font-ui"
                />
              </div>
            )}

            {/* Formularz wpisywania wiadomości */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Wpisz treść wiadomości..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-800/90 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-ui"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSubmitting}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-black font-ui font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                aria-label="Wyślij wiadomość"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Alternatywne szybkie przejście do oficjalnego Messengera */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-ui text-zinc-400">
              <span>Wolisz aplikację?</span>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#0084FF] hover:text-[#4595ff] font-medium"
              >
                <span>Otwórz w Messengerze</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Pływający przycisk w rogu ────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-200/50"
        aria-label="Otwórz czat na żywo"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-black fill-current" />
            {/* Aktywna kropka obecności online */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
