"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  lang: "PL" | "EN";
  setLang: (l: "PL" | "EN") => void;
  onOpenReservation: () => void;
  onOpenGalleryTab?: () => void;
}

export default function Navbar({ lang, setLang, onOpenReservation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#wybieg",      label: lang === "PL" ? "Wybieg"      : "Enclosure"   },
    { href: "#o-nas",       label: lang === "PL" ? "O nas"       : "About"       },
    { href: "#rasa",        label: lang === "PL" ? "Rasa"        : "Breed"       },
    { href: "#kocieta",     label: lang === "PL" ? "Kocięta"     : "Kittens"     },
    { href: "#rodzice",     label: lang === "PL" ? "Rodzice"     : "Parents"     },
    { href: "#zdrowie",     label: lang === "PL" ? "Zdrowie"     : "Health"      },
    { href: "#rodowod",     label: lang === "PL" ? "Rodowód"     : "Pedigree"    },
    { href: "#jak-kupic",   label: lang === "PL" ? "Jak kupić"   : "Adoption"    },
    { href: "#kalkulator",  label: lang === "PL" ? "Koszty"      : "Costs"       },
    { href: "#opinie",      label: lang === "PL" ? "Opinie"      : "Reviews"     },
    { href: "#galeria",     label: lang === "PL" ? "Galeria"     : "Gallery"     },
    { href: "#faq",         label: lang === "PL" ? "FAQ"         : "FAQ"         },
    { href: "#kontakt",     label: lang === "PL" ? "Kontakt"     : "Contact"     },
  ];

  const desktopLinks = [
    { href: "#wybieg",      label: lang === "PL" ? "Wybieg"      : "Enclosure"   },
    { href: "#o-nas",       label: lang === "PL" ? "O nas"       : "About"       },
    { href: "#rasa",        label: lang === "PL" ? "Rasa"        : "Breed"       },
    { href: "#kocieta",     label: lang === "PL" ? "Kocięta"     : "Kittens"     },
    { href: "#rodzice",     label: lang === "PL" ? "Rodzice"     : "Parents"     },
    { href: "#zdrowie",     label: lang === "PL" ? "Zdrowie"     : "Health"      },
    { href: "#kalkulator",  label: lang === "PL" ? "Koszty"      : "Costs"       },
    { href: "#galeria",     label: lang === "PL" ? "Galeria"     : "Gallery"     },
    { href: "#kontakt",     label: lang === "PL" ? "Kontakt"     : "Contact"     },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/8 py-1"
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-14 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/30 shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image src="/logo.png" alt="Koci Przyjaciel PL" fill className="object-cover" priority />
            </div>
            <span className="text-sm sm:text-base font-heading font-medium text-white group-hover:text-white/80 transition-colors tracking-wide whitespace-nowrap">
              Koci Przyjaciel
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-ui uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Prawa strona */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "PL" ? "EN" : "PL")}
              className="text-[11px] font-ui uppercase tracking-widest text-white/30 hover:text-white transition-colors cursor-pointer"
            >
              {lang === "PL" ? "EN" : "PL"}
            </button>
            <button
              onClick={onOpenReservation}
              className="text-[11px] font-ui uppercase tracking-widest px-4 py-2 bg-white text-black hover:bg-white/85 transition-colors cursor-pointer font-semibold"
            >
              {lang === "PL" ? "Rezerwuj" : "Reserve"}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === "PL" ? "EN" : "PL")}
              className="text-[11px] font-ui uppercase tracking-widest text-white/40 cursor-pointer"
            >
              {lang === "PL" ? "EN" : "PL"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white cursor-pointer"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 pb-12 overflow-y-auto md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading font-light text-white hover:text-white/60 transition-colors py-1 border-b border-white/5"
                style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => { setMenuOpen(false); onOpenReservation(); }}
              className="w-full text-center text-xs font-ui uppercase tracking-widest px-6 py-4 bg-white text-black font-bold cursor-pointer"
            >
              {lang === "PL" ? "Zarezerwuj kociaka" : "Reserve a kitten"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
