"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, MessengerIcon } from "@/components/ui/SocialIcons";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_MESSENGER_URL, REAL_MESSENGER_APP_URL, REAL_INSTAGRAM_URL } from "@/data/realCatsData";

interface NavbarProps {
  lang: "PL" | "EN";
  setLang: (l: "PL" | "EN") => void;
  onOpenReservation: () => void;
}

export default function Navbar({ lang, setLang, onOpenReservation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMessengerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      const start = Date.now();
      window.location.href = REAL_MESSENGER_APP_URL;
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.location.href = REAL_MESSENGER_URL;
        }
      }, 700);
    } else {
      window.open(REAL_MESSENGER_URL, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/",            label: "Główna"           },
    { href: "/o-nas",       label: "O nas"            },
    { href: "/galeria",     label: "Galeria"          },
    { href: "/dostepne-kociaki", label: "Dostępne Kociaki" },
    { href: "/baza-wiedzy", label: "Baza wiedzy"      },
    { href: "/kontakt",     label: "Kontakt"          },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/dostepne-kociaki") return pathname === "/dostepne-kociaki" || pathname.startsWith("/kocieta");
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-12 bg-black/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "h-14 bg-black/60 backdrop-blur-lg border-b border-white/[0.05]"
        } flex items-center`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full flex items-center justify-between gap-4">

          {/* Logo & Nazwa Apple Style - Kliknięcie płynnie przewija na samą górę strony głównej */}
          <Link
            href="/"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
          >
            <div
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 shadow-sm group-hover:border-white/50 transition-all duration-300 shrink-0 bg-black"
            >
              <Image
                src="/logo.webp"
                alt="Koci Przyjaciel PL"
                width={36}
                height={36}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-heading font-medium text-[#f5f5f7] group-hover:text-white transition-colors tracking-[-0.02em] leading-tight whitespace-nowrap">
                Koci Przyjaciel <span className="text-xs text-[#86868b] font-normal">*PL</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-ui uppercase tracking-[0.2em] text-[#86868b] font-medium leading-none">
                FIFe · FPL · Wrocław
              </span>
            </div>
          </Link>

          {/* Desktop Nav: Styl Apple Global Nav (12px, clean, text-[#f5f5f7]/80 hover:text-white) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-normal tracking-[-0.01em] transition-all duration-200 whitespace-nowrap ${
                    active
                      ? "text-white bg-white/10 font-medium"
                      : "text-[#f5f5f7]/70 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Prawa strona: Social media + Messenger + Telefon */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Social Media Loga (Facebook + Instagram) Apple style */}
            <div className="flex items-center gap-1">
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08] transition-all group"
                aria-label="Facebook Koci Przyjaciel *PL"
                title="Facebook (26k+ fanów)"
              >
                <FacebookIcon className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
              </a>
              <a
                href={REAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08] transition-all group"
                aria-label="Instagram Koci Przyjaciel *PL"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
              </a>
            </div>

            {/* Bezpośredni przycisk Messenger (Desktop: nowa karta / Smartphone: aplikacja) */}
            <a
              href={REAL_MESSENGER_URL}
              onClick={handleMessengerClick}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium text-white bg-[#0084FF]/20 hover:bg-[#0084FF]/30 border border-[#0084FF]/40 transition-all active:scale-95 group shadow-[0_0_12px_rgba(0,132,255,0.25)] cursor-pointer"
              title="Napisz do nas na Messengerze"
              aria-label="Messenger Koci Przyjaciel"
            >
              <MessengerIcon className="w-3.5 h-3.5 text-[#0084FF] group-hover:scale-110 transition-transform" />
              <span className="font-ui font-medium">Messenger</span>
            </a>

            {/* Szybki telefon w stylu pigułki Apple */}
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium text-[#f5f5f7] bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] transition-all active:scale-95"
            >
              <Phone className="w-3 h-3 text-[#2997ff]" />
              <span>{REAL_PHONE}</span>
            </a>
          </div>

          {/* Mobilny Przycisk Akcji — Messenger bezpośrednio przypięty + Menu */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {/* Przycisk Messenger bezpośrednio na belce mobilnej */}
            <a
              href={REAL_MESSENGER_URL}
              onClick={handleMessengerClick}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0084FF]/20 hover:bg-[#0084FF]/30 border border-[#0084FF]/40 text-white transition-all cursor-pointer active:scale-95 shadow-[0_0_12px_rgba(0,132,255,0.25)]"
              aria-label="Otwórz Messenger"
              title="Napisz do nas na Messengerze"
            >
              <MessengerIcon className="w-3.5 h-3.5 text-[#0084FF]" />
              <span className="text-[11px] font-ui font-medium">Messenger</span>
            </a>

            {/* Przycisk Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#f5f5f7] transition-all cursor-pointer border border-white/[0.12] active:scale-95"
              aria-label="Menu nawigacyjne"
            >
              <span className="text-[11px] font-ui font-medium uppercase tracking-wider">
                {menuOpen ? "Zamknij" : "Menu"}
              </span>
              {menuOpen ? <X className="w-3.5 h-3.5 text-white" /> : <Menu className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>

        </div>
      </header>

      {/* Menu Mobilne (Pełny ekran, nowoczesny drawer z dużymi fontami) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0B0B0D]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-24 pb-10 overflow-y-auto lg:hidden animate-fadeIn">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-semibold">
              {lang === "PL" ? "NAWIGACJA HODOWLI" : "CATTERY NAVIGATION"}
            </p>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-mono font-semibold cursor-pointer"
            >
              <span>{lang === "PL" ? "ZAMKNIJ" : "CLOSE"}</span>
              <X className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>

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
                  prefetch={false}
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
            <a
              href={REAL_MESSENGER_URL}
              onClick={(e) => {
                setMenuOpen(false);
                handleMessengerClick(e);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0084FF] to-[#0099FF] text-white font-body text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl cursor-pointer active:scale-95 transition-transform"
            >
              <MessengerIcon className="w-5 h-5 fill-current text-white" />
              <span>{lang === "PL" ? "Otwórz Messenger" : "Open Messenger"}</span>
            </a>

            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="w-full py-3.5 rounded-2xl bg-white/10 text-white font-body text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border border-white/15"
            >
              <Phone className="w-4 h-4 text-zinc-300" />
              <span>{REAL_PHONE}</span>
            </a>

            {/* Social Media Linki w Menu Mobilnym */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-body text-zinc-300 hover:text-white"
              >
                <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook (26k+)</span>
              </a>
              <a
                href={REAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-body text-zinc-300 hover:text-white"
              >
                <InstagramIcon className="w-4 h-4 text-[#E4405F]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
