"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { REAL_LOGO, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { ArrowRight, Phone } from "lucide-react";

interface HeroSectionProps {
  lang: "PL" | "EN";
  onOpenReservation: () => void;
}

export default function HeroSection({ lang, onOpenReservation }: HeroSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Text layer refs — manipulujemy bezpośrednio, NIE przez setState
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const headline3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Video overlay — zmienia opacity/tint w zależności od sekcji
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const SECTION_H = window.innerHeight; // wysokość jednej "sceny"

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.max(0, Math.min(1, t));

    // Funkcja: opacity elementu w danym przedziale scrolla
    const calcOpacity = (scrolled: number, inStart: number, inEnd: number, outStart: number, outEnd: number) => {
      if (scrolled < inStart) return 0;
      if (scrolled < inEnd) return lerp(0, 1, (scrolled - inStart) / (inEnd - inStart));
      if (scrolled < outStart) return 1;
      if (scrolled < outEnd) return lerp(1, 0, (scrolled - outStart) / (outEnd - outStart));
      return 0;
    };

    const calcTranslateY = (scrolled: number, inStart: number, inEnd: number, outStart: number, outEnd: number, enterDist = 36, exitDist = -24) => {
      if (scrolled < inStart) return enterDist;
      if (scrolled < inEnd) return lerp(enterDist, 0, (scrolled - inStart) / (inEnd - inStart));
      if (scrolled < outStart) return 0;
      if (scrolled < outEnd) return lerp(0, exitDist, (scrolled - outStart) / (outEnd - outStart));
      return exitDist;
    };

    let rafId: number;
    let lastScrolled = -1;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;

      if (Math.abs(scrolled - lastScrolled) < 0.5) return;
      lastScrolled = scrolled;

      const S = SECTION_H;

      // === Scena 0: Intro z Logo ===
      const badge = badgeRef.current;
      if (badge) {
        let logoOp = 1;
        let logoTy = 0;
        if (scrolled > S * 0.1) {
          const prog = Math.min(1, (scrolled - S * 0.1) / (S * 0.5));
          logoOp = 1 - prog;
          logoTy = -prog * 35;
        }
        badge.style.opacity = String(logoOp);
        badge.style.transform = `translateY(${logoTy}px)`;
        badge.style.pointerEvents = logoOp > 0.1 ? "auto" : "none";
      }

      // Scroll hint na desktopie
      const scrollHint = scrollHintRef.current;
      if (scrollHint) {
        let hintOp = 1;
        if (scrolled > S * 0.1) {
          hintOp = Math.max(0, 1 - (scrolled - S * 0.1) / (S * 0.25));
        }
        scrollHint.style.opacity = String(hintOp);
      }

      // === Scena 1: "Łagodny Olbrzym" (0.8S – 2.1S) ===
      const h1 = headline1Ref.current;
      if (h1) {
        const op = calcOpacity(scrolled, S * 0.8, S * 1.1, S * 1.7, S * 2.1);
        const ty = calcTranslateY(scrolled, S * 0.8, S * 1.1, S * 1.7, S * 2.1);
        h1.style.opacity = String(op);
        h1.style.transform = `translateY(${ty}px)`;
        h1.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // === Scena 2: "Zero klatek" (2.1S – 3.3S) ===
      const h2 = headline2Ref.current;
      if (h2) {
        const op = calcOpacity(scrolled, S * 2.1, S * 2.4, S * 2.9, S * 3.3);
        const ty = calcTranslateY(scrolled, S * 2.1, S * 2.4, S * 2.9, S * 3.3);
        h2.style.opacity = String(op);
        h2.style.transform = `translateY(${ty}px)`;
        h2.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // === Scena 3: "Certyfikowane DNA" (3.3S – 4.5S) ===
      const h3 = headline3Ref.current;
      if (h3) {
        const op = calcOpacity(scrolled, S * 3.3, S * 3.6, S * 4.1, S * 4.5);
        const ty = calcTranslateY(scrolled, S * 3.3, S * 3.6, S * 4.1, S * 4.5);
        h3.style.opacity = String(op);
        h3.style.transform = `translateY(${ty}px)`;
        h3.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // === Scena 4: CTA (4.3S – koniec) ===
      const cta = ctaRef.current;
      if (cta) {
        const op = calcOpacity(scrolled, S * 4.3, S * 4.6, S * 999, S * 999);
        const ty = calcTranslateY(scrolled, S * 4.3, S * 4.6, S * 999, S * 999);
        cta.style.opacity = String(op);
        cta.style.transform = `translateY(${ty}px)`;
        cta.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // === Overlay: przyciemnienie w scenie CTA ===
      const overlay = overlayRef.current;
      if (overlay) {
        const darkness = lerp(0, 0.45, (scrolled - S * 3.5) / (S * 1.5));
        overlay.style.opacity = String(Math.max(0, Math.min(0.45, darkness)));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: "600vh" }} // 6 viewportów = 5 scen + końcowy bufor
    >
      {/* ============================================================ */}
      {/* STICKY — przyklejony pojemnik z wideo i kartami             */}
      {/* ============================================================ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* ============================================================ */}
        {/* WIDEO GŁÓWNE:                                               */}
        {/* Na mobile: zajmuje górne 56vh z object-[center_18%], dzięki   */}
        {/* czemu głowa i pędzelki uszu są w 100% widoczne i majestatyczne */}
        {/* Na desktop: pełnoekranowe tło z object-[60%_center]          */}
        {/* ============================================================ */}
        <video
          ref={videoRef}
          src="/video/hero-cat.mp4"
          poster="/video/hero-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 right-0 w-full h-[56vh] sm:h-full sm:inset-0 object-cover object-[center_18%] sm:object-[60%_center]"
          style={{
            opacity: 1,
            transform: "scale(1.01)",
            filter: "contrast(1.04) brightness(0.96)",
            willChange: "transform",
          }}
        />

        {/* Ciemna winieta pod belką nawigacji */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

        {/* Płynne rozmycie wideo w czyste tło na dole kadru (mobile) */}
        <div className="absolute top-[36vh] left-0 right-0 h-[22vh] sm:hidden bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none z-10" />

        {/* Gradienty desktopowe (lewa kolumna tekstowa) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
        <div className="hidden sm:block absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* Dodatkowy overlay wygaszający przy CTA */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{ opacity: 0 }}
        />

        {/* ============================================================ */}
        {/* SCENA 0 — Wielkie Logo + Keynote Apple Reveal                */}
        {/* ============================================================ */}
        <div
          ref={badgeRef}
          className="absolute bottom-4 sm:bottom-auto sm:inset-0 left-3 right-3 sm:left-0 sm:right-0 flex flex-col justify-end sm:justify-center items-center sm:items-center px-0 sm:px-6 pointer-events-none z-20 sm:pt-24"
          style={{ opacity: 1, transform: "translateY(0px)", willChange: "opacity, transform" }}
        >
          {/* Duże logo widoczne na desktopie */}
          <div className="hidden sm:flex flex-col items-center pointer-events-auto max-w-xl w-full text-center">
            <div className="relative mb-6 group">
              <div className="absolute -inset-6 bg-gradient-to-tr from-white/10 via-white/25 to-transparent rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full p-2 bg-gradient-to-b from-white/35 via-white/10 to-transparent shadow-[0_0_80px_rgba(255,255,255,0.22)] backdrop-blur-md">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/50 shadow-2xl bg-black">
                  <Image
                    src={REAL_LOGO}
                    alt="Koci Przyjaciel PL"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/90 font-semibold">
                FIFe · FPL · WROCŁAW
              </span>
            </div>

            <h1
              className="font-heading font-light text-white leading-[0.92] tracking-tight mb-3"
              style={{ fontSize: "clamp(3rem, 7.5vw, 6.8rem)" }}
            >
              Koci <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-200">Przyjaciel</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-body text-zinc-200 max-w-lg mx-auto leading-relaxed font-light">
              Hodowla kotów Maine Coon we Wrocławiu.
              <br />
              <span className="text-xs sm:text-sm text-zinc-400 tracking-widest uppercase font-mono block mt-1">
                Wychowujemy kociaki z miłością · od 10 lat
              </span>
            </p>
          </div>

          {/* Karta mobilna Sceny 0 na dole ekranu — zero nachodzenia na kota */}
          <div className="sm:hidden w-full max-w-lg pointer-events-auto p-5 rounded-[26px] bg-[#121216]/92 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-center">
            <div className="flex items-center justify-center gap-2.5 mb-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/30 flex-shrink-0 shadow-md">
                <Image
                  src={REAL_LOGO}
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/10 text-[10px] font-mono uppercase tracking-[0.25em] text-white/90 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>FIFe · FPL · WROCŁAW</span>
              </div>
            </div>

            <h1 className="text-3xl font-heading font-light text-white leading-[0.95] tracking-tight mb-2">
              Koci <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-200">Przyjaciel</span>
            </h1>

            <p className="text-xs font-body text-zinc-200 leading-relaxed font-light mb-3">
              Hodowla kotów Maine Coon we Wrocławiu.
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase block mt-0.5">
                Wychowujemy z miłością · Od 10 lat
              </span>
            </p>

            <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-mono uppercase tracking-[0.25em] pt-2 border-t border-white/10">
              <span>Przewiń w dół</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        </div>

        {/* Scroll hint na desktopie */}
        <div
          ref={scrollHintRef}
          className="hidden sm:flex absolute bottom-8 left-0 right-0 justify-center pointer-events-none z-20"
          style={{ opacity: 1, willChange: "opacity" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 font-medium">Przewiń w dół</span>
            <div className="w-[1px] h-9 bg-gradient-to-b from-white/50 via-white/25 to-transparent animate-bounce-slow" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENA 1 — Łagodny Olbrzym                                    */}
        {/* ============================================================ */}
        <div
          ref={headline1Ref}
          className="absolute bottom-4 sm:bottom-auto sm:inset-0 left-3 right-3 sm:left-0 sm:right-0 flex flex-col justify-end sm:justify-center items-center sm:items-start px-0 sm:px-16 md:px-24 pointer-events-none z-20 sm:pt-20"
          style={{ opacity: 0, transform: "translateY(36px)", willChange: "opacity, transform" }}
        >
          <div className="max-w-lg w-full pointer-events-auto p-5 sm:p-0 rounded-[28px] sm:rounded-none bg-[#121216]/92 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border border-white/12 sm:border-none shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:shadow-none">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-amber-400 font-bold mb-2 block">
              Rasa Maine Coon
            </span>
            <h2
              className="font-heading font-light text-white leading-[0.95] tracking-tight mb-3"
              style={{ fontSize: "clamp(2.1rem, 6.8vw, 6rem)" }}
            >
              Największy<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                kot domowy
              </span>
            </h2>
            <div className="flex items-baseline gap-2.5 mb-2.5">
              <span
                className="font-heading font-semibold text-white leading-none drop-shadow-md"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
              >
                12
              </span>
              <span className="text-base sm:text-2xl font-body text-zinc-300 font-medium">kg wagi samca</span>
            </div>
            <p className="text-xs sm:text-base font-body text-zinc-200 font-light leading-relaxed">
              Maine Coon to jeden z największych kotów na świecie — potężny, łagodny i bezgranicznie oddany rodzinie.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENA 2 — Zero klatek                                        */}
        {/* ============================================================ */}
        <div
          ref={headline2Ref}
          className="absolute bottom-4 sm:bottom-auto sm:inset-0 left-3 right-3 sm:left-0 sm:right-0 flex flex-col justify-end sm:justify-center items-center sm:items-start px-0 sm:px-16 md:px-24 pointer-events-none z-20 sm:pt-20"
          style={{ opacity: 0, transform: "translateY(36px)", willChange: "opacity, transform" }}
        >
          <div className="max-w-lg w-full pointer-events-auto p-5 sm:p-0 rounded-[28px] sm:rounded-none bg-[#121216]/92 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border border-white/12 sm:border-none shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:shadow-none">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-emerald-400 font-bold mb-2 block">
              Socjalizacja Domowa
            </span>
            <h2
              className="font-heading font-light text-white leading-[0.95] tracking-tight mb-3"
              style={{ fontSize: "clamp(2.1rem, 6.8vw, 6rem)" }}
            >
              Jak<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-zinc-300">
                w rodzinie.
              </span>
            </h2>
            <p className="text-xs sm:text-base font-body text-zinc-200 font-light leading-relaxed mb-3">
              Nasze koty mieszkają razem z nami — w salonie, sypialni, przy stole. Wychowują się z dziećmi i z psem, dzięki czemu są ufne i spokojne.
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-white/12">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-zinc-300">
                Zero klatek · 100% domowe ciepło
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENA 3 — Certyfikowane DNA                                  */}
        {/* ============================================================ */}
        <div
          ref={headline3Ref}
          className="absolute bottom-4 sm:bottom-auto sm:inset-0 left-3 right-3 sm:left-0 sm:right-0 flex flex-col justify-end sm:justify-center items-center sm:items-start px-0 sm:px-16 md:px-24 pointer-events-none z-20 sm:pt-20"
          style={{ opacity: 0, transform: "translateY(36px)", willChange: "opacity, transform" }}
        >
          <div className="max-w-lg w-full pointer-events-auto p-5 sm:p-0 rounded-[28px] sm:rounded-none bg-[#121216]/92 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border border-white/12 sm:border-none shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:shadow-none">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-blue-400 font-bold mb-2 block">
              Gwarancja Zdrowia
            </span>
            <h2
              className="font-heading font-light text-white leading-[0.95] tracking-tight mb-3"
              style={{ fontSize: "clamp(2rem, 6.5vw, 5.5rem)" }}
            >
              Zdrowe<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-zinc-300">
                od urodzenia.
              </span>
            </h2>
            <p className="text-xs sm:text-base font-body text-zinc-200 font-light leading-relaxed mb-3">
              Rodzice z certyfikowanymi badaniami serca (Doppler) i testami DNA (HCM, PKD, SMA N/N). Kociak trafia do Ciebie w pełni zabezpieczony.
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-white/12">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-[11px] font-mono text-zinc-300">
                100% Czyste linie hodowlane FPL
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENA 4 — CTA Rezerwacja                                     */}
        {/* ============================================================ */}
        <div
          ref={ctaRef}
          className="absolute bottom-4 sm:bottom-auto sm:inset-0 left-3 right-3 sm:left-0 sm:right-0 flex flex-col justify-end sm:justify-center items-center sm:items-start px-0 sm:px-16 md:px-24 pointer-events-none z-20 sm:pt-20"
          style={{ opacity: 0, transform: "translateY(36px)", willChange: "opacity, transform" }}
        >
          <div className="max-w-lg w-full pointer-events-auto p-5 sm:p-0 rounded-[28px] sm:rounded-none bg-[#121216]/95 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border border-white/12 sm:border-none shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:shadow-none">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-amber-400 font-bold mb-2 block">
              Mioty 2026
            </span>
            <h2
              className="font-heading font-light text-white leading-[0.92] tracking-tight mb-4"
              style={{ fontSize: "clamp(2.1rem, 6.8vw, 6rem)" }}
            >
              Znajdź swojego<br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                kociaka.
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenReservation}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black text-xs font-ui font-bold uppercase tracking-[0.18em] hover:bg-zinc-200 transition-all duration-200 cursor-pointer shadow-xl active:scale-95"
              >
                <span>Zarezerwuj</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#kocieta"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 text-white text-xs font-ui font-semibold uppercase tracking-[0.15em] hover:bg-white/10 transition-colors duration-200 active:scale-95"
              >
                Kociaki ↓
              </a>

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white text-xs font-mono py-1.5 transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{REAL_PHONE}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
