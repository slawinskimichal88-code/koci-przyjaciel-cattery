"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";
import FacebookIcon from "@/components/FacebookIcon";
import { Phone, Menu, X, ArrowUpRight, Camera, Sparkles } from "lucide-react";

interface NavigationProps {
  currency: "PLN" | "EUR";
  setCurrency: (c: "PLN" | "EUR") => void;
  lang: "PL" | "EN" | "DE";
  setLang: (l: "PL" | "EN" | "DE") => void;
  activeTab: "home" | "gallery";
  setActiveTab: (tab: "home" | "gallery") => void;
}

export default function Navigation({
  currency,
  setCurrency,
  lang,
  setLang,
  activeTab,
  setActiveTab,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (tabTarget: "home" | "gallery", anchor?: string) => {
    setActiveTab(tabTarget);
    setMobileMenuOpen(false);

    if (tabTarget === "home" && anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Strona Główna", tab: "home" as const, anchor: "grand-logo-hero" },
    { label: "O Hodowli", tab: "home" as const, anchor: "o-hodowli" },
    { label: "Koty Hodowlane", tab: "home" as const, anchor: "koty" },
    { label: "Kocięta & Mioty", tab: "home" as const, anchor: "mioty" },
    { label: "Zdrowie & Badania", tab: "home" as const, anchor: "zdrowie" },
    { label: "Galeria (105)", tab: "gallery" as const, isGalleryTab: true },
    { label: "Adopcja & Kontakt", tab: "home" as const, anchor: "kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Floating Pastel Cartoon Navbar */}
        <nav
          className={`pointer-events-auto w-full backdrop-blur-xl rounded-3xl px-4 sm:px-6 py-2.5 transition-all duration-300 flex items-center justify-between border-2.5 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] ${
            isScrolled ? "bg-[#FDFBF7]/95" : "bg-[#FDFBF7]/90"
          }`}
        >
          {/* Brand Logo & Name - Cute Cartoon Badge */}
          <button
            onClick={() => handleNavClick("home", "grand-logo-hero")}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] bg-[#FFE5D9] shrink-0 transition-transform duration-300 group-hover:scale-108 group-hover:-rotate-2">
              <Image
                src={REAL_LOGO}
                alt="Logo Koci Przyjaciel PL"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#2A221F] font-editorial">
                  Koci Przyjaciel
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFE5D9] text-[#2A221F] border border-[#2A221F] font-black shadow-[1px_1px_0px_#2A221F]">
                  *PL
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6B5E59] font-bold tracking-wider flex items-center gap-1">
                <span>🐾 FIFe &bull; FPL &bull; WROCŁAW</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item, idx) => {
              const isActive =
                item.isGalleryTab && activeTab === "gallery"
                  ? true
                  : !item.isGalleryTab && activeTab === "home" && item.label === "Strona Główna";

              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.tab, item.anchor)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all uppercase cursor-pointer border ${
                    item.isGalleryTab
                      ? activeTab === "gallery"
                        ? "bg-[#E2F4E7] text-[#166534] border-[#2A221F] font-black shadow-[2px_2px_0px_#2A221F]"
                        : "bg-[#E2F4E7]/60 text-[#166534] hover:bg-[#E2F4E7] border-[#2A221F]/40 hover:border-[#2A221F] flex items-center gap-1.5 shadow-[1px_1px_0px_#2A221F]"
                      : isActive
                      ? "bg-[#FFE5D9] text-[#2A221F] border-[#2A221F] font-black shadow-[2px_2px_0px_#2A221F]"
                      : "text-[#2A221F] hover:bg-[#FFE5D9]/60 border-transparent hover:border-[#2A221F]/30"
                  }`}
                >
                  {item.isGalleryTab && <Camera className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action: Facebook [25k], Phone & Currency */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Official Facebook Button - Pastel Sky Blue */}
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] transition-all flex items-center gap-1.5 group"
              title="Oficjalny Profil Hodowli na Facebooku (25 000+ Fanów)"
            >
              <FacebookIcon className="w-4 h-4 fill-[#0369A1] shrink-0" />
              <span className="hidden md:inline">25k FB</span>
              <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
            </a>

            {/* Currency Switcher */}
            <button
              onClick={() => setCurrency(currency === "PLN" ? "EUR" : "PLN")}
              className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs font-mono font-black border-2 border-[#2A221F] bg-white text-[#2A221F] hover:bg-[#FEF9C3] shadow-[2px_2px_0px_#2A221F] transition-colors cursor-pointer"
            >
              {currency}
            </button>

            {/* Breeder Direct Phone - Pastel Warm Dark */}
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="px-4 sm:px-5 py-2 rounded-full bg-[#2A221F] hover:bg-[#433530] text-[#FDFBF7] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[2px_2px_0px_rgba(42,34,31,0.3)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{REAL_PHONE}</span>
              <span className="lg:hidden">Zadzwoń</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-2xl border-2 border-[#2A221F] bg-[#FFE5D9] text-[#2A221F] shadow-[2px_2px_0px_#2A221F] hover:bg-[#FFD4C2] transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

      </div>

      {/* Mobile Drawer - Pastel Cartoon Style */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto xl:hidden max-w-7xl mx-auto mt-2 bg-[#FDFBF7] border-3 border-[#2A221F] rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_#2A221F] animate-in fade-in slide-in-from-top-3 duration-200 text-[#2A221F]">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.tab, item.anchor)}
                className={`p-3 rounded-2xl text-xs font-mono font-bold flex items-center justify-between uppercase text-left cursor-pointer border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F] ${
                  item.isGalleryTab
                    ? "bg-[#E2F4E7] text-[#166534] font-black"
                    : "bg-white text-[#2A221F] hover:bg-[#FFE5D9]"
                }`}
              >
                <span>{item.label}</span>
                {item.isGalleryTab && <Camera className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-[#2A221F]/20 flex flex-col gap-2">
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-[#E0F2FE] text-[#0369A1] font-mono text-xs font-black uppercase tracking-wider justify-center flex items-center gap-2 border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] hover:bg-[#BAE6FD] transition-colors"
            >
              <FacebookIcon className="w-4 h-4 fill-[#0369A1]" />
              <span>Facebook (25 000+ Obserwujących)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="w-full py-3.5 rounded-2xl bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider justify-center flex items-center gap-2 border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] hover:bg-[#FFD4C2] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Zadzwoń do hodowcy: {REAL_PHONE}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
