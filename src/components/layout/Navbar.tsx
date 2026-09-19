"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Phone } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface NavbarProps {
  lang: "PL" | "EN";
  setLang: (l: "PL" | "EN") => void;
  onOpenReservation: () => void;
}

export default function Navbar({ lang, setLang, onOpenReservation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/",            label: lang === "PL" ? "Główna"       : "Home"        },
    { href: "/kocieta",     label: lang === "PL" ? "Kocięta"      : "Kittens"     },
    { href: "/#wybieg",     label: lang === "PL" ? "Wybieg"       : "Enclosure"   },
    { href: "/baza-wiedzy", label: lang === "PL" ? "Baza wiedzy"  : "Knowledge"   },
    { href: "/#o-nas",      label: lang === "PL" ? "O nas"        : "About"       },
    { href: "/kontakt",     label: lang === "PL" ? "Kontakt"      : "Contact"     },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 sm:py-3 bg-black/85 backdrop-blur-2xl border-b border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
            : "py-3 sm:py-5 bg-gradient-to-b from-black/90 via-black/40 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

          {/* Logo & Nazwa */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:border-white transition-all duration-300 shrink-0"
              style={{ position: "relative", width: 40, height: 40 }}
            >
              <Image
                src="/logo.png"
                alt="Koci Przyjaciel PL"
                width={40}
                height={40}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-heading font-medium text-white group-hover:text-white/90 transition-colors tracking-wide leading-tight whitespace-nowrap">
                Koci Przyjaciel <span className="text-xs text-amber-300 font-serif font-light italic">*PL</span>
              </span>
              <span className="text-[10px] font-ui uppercase tracking-[0.25em] text-zinc-400 leading-none">
                FIFe · FPL · Wrocław
              </span>
            </div>
          </Link>

          {/* Desktop Nav: Wyraziste, nowoczesne linki (14-15px, czytelne, z hover pill) */}
          <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161618]/80 backdrop-blur-xl border border-white/10 shadow-inner">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-[14px] font-body transition-all duration-200 whitespace-nowrap ${
                    active
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-zinc-300 hover:text-white hover:bg-white/10 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Prawa strona: Przełącznik języka + Przycisk Rezerwacji */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Przełącznik języka */}
            <button
              onClick={() => setLang(lang === "PL" ? "EN" : "PL")}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
              title="Zmień język / Change language"
            >
              {lang === "PL" ? "EN" : "PL"}
            </button>

            {/* Szybki telefon */}
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-body font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{REAL_PHONE}</span>
            </a>

            {/* Główny przycisk Rezerwacja z pulsującym statusem */}
            <button
              onClick={onOpenReservation}
              className="relative group px-5 py-2.5 rounded-full bg-white text-black font-body text-xs sm:text-[13px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.35)] transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === "PL" ? "Rezerwuj" : "Reserve"}</span>
            </button>
          </div>

          {/* Mobilny Hamburger */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={() => setLang(lang === "PL" ? "EN" : "PL")}
              className="px-2.5 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/5 border border-white/10"
            >
              {lang === "PL" ? "EN" : "PL"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
              aria-label="Menu nawigacyjne"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Menu Mobilne (Pełny ekran, nowoczesny drawer z dużymi fontami) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0B0D]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 pb-10 overflow-y-auto lg:hidden animate-fadeIn">
          
          <nav className="flex flex-col gap-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-2">
              {lang === "PL" ? "NAWIGACJA HODOWLI" : "CATTERY NAVIGATION"}
            </p>
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-2xl text-xl sm:text-2xl font-heading transition-all ${
                    active
                      ? "bg-white text-black font-semibold"
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-zinc-400">→</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-4 rounded-2xl bg-white text-black font-body text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{lang === "PL" ? "Zarezerwuj kociaka" : "Reserve a Kitten"}</span>
            </button>

            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="w-full py-3.5 rounded-2xl bg-white/10 text-white font-body text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border border-white/15"
            >
              <Phone className="w-4 h-4 text-zinc-300" />
              <span>{REAL_PHONE}</span>
            </a>
          </div>

        </div>
      )}
    </>
  );
}
