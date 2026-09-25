"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const [wrapperHeight, setWrapperHeight] = useState<string>("550vh");
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const videoSrcRef = useRef<string | undefined>(undefined);

  // Video overlay — zmienia opacity/tint w zależności od sekcji
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isMobile = window.innerWidth < 1024;
    setIsMobileDevice(isMobile);
    const SECTION_H = isMobile ? window.innerHeight * 0.65 : window.innerHeight; // wysokość jednej "sceny"

    // IntersectionObserver — pauzuj wideo gdy sekcja nie jest na ekranie (oszczędność GPU)
    const video = videoRef.current;
    let observer: IntersectionObserver | null = null;
    if (video && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.02 }
      );
      observer.observe(wrapper);
    }

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.max(0, Math.min(1, t));

    // Funkcja: opacity elementu w danym przedziale scrolla
    // scrollIn: punkt wejścia, scrollOut: punkt wyjścia (px od góry wrappera)
    const calcOpacity = (scrolled: number, inStart: number, inEnd: number, outStart: number, outEnd: number) => {
      if (scrolled < inStart) return 0;
      if (scrolled < inEnd) return lerp(0, 1, (scrolled - inStart) / (inEnd - inStart));
      if (scrolled < outStart) return 1;
      if (scrolled < outEnd) return lerp(1, 0, (scrolled - outStart) / (outEnd - outStart));
      return 0;
    };

    const calcTranslateY = (scrolled: number, inStart: number, inEnd: number, outStart: number, outEnd: number, enterDist = 60, exitDist = -40) => {
      if (scrolled < inStart) return enterDist;
      if (scrolled < inEnd) return lerp(enterDist, 0, (scrolled - inStart) / (inEnd - inStart));
      if (scrolled < outStart) return 0;
      if (scrolled < outEnd) return lerp(0, exitDist, (scrolled - outStart) / (outEnd - outStart));
      return exitDist;
    };

    let rafId: number;
    let lastScrolled = -1;

    const applyVideoAndLogo = (scrolled: number) => {
      const S = SECTION_H;
      const video = videoRef.current;
      const badge = badgeRef.current;
      const scrollHint = scrollHintRef.current;

      if (video) {
        video.style.opacity = "1";
        video.style.transform = "scale(1)";
      }

      if (badge) {
        let logoOp = 1;
        let logoTy = 0;
        let logoSc = 1;
        if (scrolled > S * 0.15) {
          const prog = Math.min(1, (scrolled - S * 0.15) / (S * 0.5));
          logoOp = 1 - prog;
          logoTy = -prog * 50;
          logoSc = 1 - prog * 0.1;
        }
        badge.style.opacity = String(logoOp);
        badge.style.transform = `translateY(${logoTy}px) scale(${logoSc})`;
      }

      if (scrollHint) {
        let hintOp = 1;
        if (scrolled > S * 0.15) {
          hintOp = Math.max(0, 1 - (scrolled - S * 0.15) / (S * 0.25));
        }
        scrollHint.style.opacity = String(hintOp);
      }
    };

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;

      if (Math.abs(scrolled - lastScrolled) < 0.5) return;
      lastScrolled = scrolled;

      const S = SECTION_H;

      // === Scena 0: Wideo wyłaniające się z czerni + Wielkie Logo ===
      applyVideoAndLogo(scrolled);

      // === Scena 1: "Łagodny Olbrzym" (0.8S – 2S) ===
      const h1 = headline1Ref.current;
      if (h1) {
        const op = calcOpacity(scrolled, S * 0.8, S * 1.1, S * 1.7, S * 2.1);
        const ty = calcTranslateY(scrolled, S * 0.8, S * 1.1, S * 1.7, S * 2.1);
        h1.style.opacity = String(op);
        h1.style.transform = `translateY(${ty}px)`;
      }

      // === Scena 2: "Zero klatek" (2S – 3.2S) ===
      const h2 = headline2Ref.current;
      if (h2) {
        const op = calcOpacity(scrolled, S * 2.1, S * 2.4, S * 2.9, S * 3.3);
        const ty = calcTranslateY(scrolled, S * 2.1, S * 2.4, S * 2.9, S * 3.3);
        h2.style.opacity = String(op);
        h2.style.transform = `translateY(${ty}px)`;
      }

      // === Scena 3: "Certyfikowane DNA" (3.2S – 4.2S) ===
      const h3 = headline3Ref.current;
      if (h3) {
        const op = calcOpacity(scrolled, S * 3.3, S * 3.6, S * 4.1, S * 4.5);
        const ty = calcTranslateY(scrolled, S * 3.3, S * 3.6, S * 4.1, S * 4.5);
        h3.style.opacity = String(op);
        h3.style.transform = `translateY(${ty}px)`;
      }

      // === Scena 4: CTA (4.5S – koniec) ===
      const cta = ctaRef.current;
      if (cta) {
        const op = calcOpacity(scrolled, S * 4.3, S * 4.6, S * 999, S * 999);
        const ty = calcTranslateY(scrolled, S * 4.3, S * 4.6, S * 999, S * 999);
        cta.style.opacity = String(op);
        cta.style.transform = `translateY(${ty}px)`;
      }

      // === Overlay: przyciemnienie w późniejszych scenach ===
      const overlay = overlayRef.current;
      if (overlay) {
        // Stopniowo ciemnieje przy CTA
        const darkness = lerp(0, 0.25, (scrolled - S * 3) / (S * 2));
        overlay.style.opacity = String(Math.max(0, Math.min(0.35, darkness)));
      }
    };

    let mobileTimer: ReturnType<typeof setTimeout> | null = null;
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        setVideoSrc("/video/hero-cat-mobile.mp4");
        videoSrcRef.current = "/video/hero-cat-mobile.mp4";
      }, 1000);
    } else {
      setVideoSrc("/video/hero-cat.mp4");
      videoSrcRef.current = "/video/hero-cat.mp4";
    }

    const onScroll = () => {
      if (isMobile && !videoSrcRef.current) {
        videoSrcRef.current = "/video/hero-cat-mobile.mp4";
        setVideoSrc("/video/hero-cat-mobile.mp4");
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Asynchroniczne pierwsze wywołanie zapobiegające layout thrashing podczas hydratacji
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(() => update(), { timeout: 800 });
    } else {
      setTimeout(update, 100);
    }

    setWrapperHeight(isMobile ? "350vh" : "550vh");

    const onResize = () => {
      const mobileNow = window.innerWidth < 1024;
      setWrapperHeight(mobileNow ? "350vh" : "550vh");
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (mobileTimer) clearTimeout(mobileTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: wrapperHeight }}
    >
      {/* ============================================================ */}
      {/* STICKY — przyklejony pojemnik z wideo i tekstem              */}
      {/* ============================================================ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Błyskawiczny plakat LCP: ładuje się w ułamku sekundy, zero opóźnienia */}
        <Image
          src="/video/hero-poster.webp"
          alt="Kot Maine Coon w hodowli Koci Przyjaciel"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] pointer-events-none select-none z-0"
        />

        {/* Wideo — widoczne od razu (plakat natychmiast, wideo po buforowaniu) */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/video/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] pointer-events-none select-none transition-opacity duration-500 z-0"
          style={{
            opacity: 1,
            transform: "scale(1)",
            willChange: "opacity, transform",
          }}
        />

        {/* Ciepły, złocisty odcień filmowy bez obciążania procesora GPU filtrami */}
        <div className="absolute inset-0 bg-[#3a200a]/25 mix-blend-color pointer-events-none z-10" />
        <div className="absolute inset-0 bg-black/35 pointer-events-none z-10" />

        {/* Dodatkowe przyciemnienie na scroll */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{ opacity: 0 }}
        />

        {/* Boczny i pionowe gradienty dla czytelności napisów */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 via-black/30 to-transparent pointer-events-none z-10" />

        {/* Globalna kinowa winieta narożników (przyciemnienie rogów kodem CSS) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] z-10" />

        {/* Dedykowane, głębokie przyciemnienie dolnego prawego rogu kodem CSS (maskowanie loga/gwiazdki z filmu) */}
        <div className="absolute bottom-0 right-0 w-80 sm:w-[480px] h-56 sm:h-72 pointer-events-none bg-gradient-to-tl from-black via-black/90 to-transparent z-10" />

        {/* ============================================================ */}
        {/* SCENA 0 — Wielkie Logo + Teksty Hero + Przyciski Akcji       */}
        {/* ============================================================ */}
        <div
          ref={badgeRef}
          className="absolute inset-0 pt-24 sm:pt-28 md:pt-32 pb-16 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
          style={{ opacity: 1, transform: "translateY(0px) scale(1)", willChange: "opacity, transform" }}
        >
          <div className="flex flex-col items-center pointer-events-auto">
            
            {/* Monumentalne logo z poświatą - z marginesem bezpieczeństwa pod menubarem */}
            <div className="relative mb-5 sm:mb-6 group">
              {/* Dynamiczna łuna ambient glow - czysty radial gradient bez kosztownego GPU blur */}
              <div className="absolute -inset-6 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)] rounded-full pointer-events-none" />
              
              {/* Główny pierścień z kryształowym logo */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full p-2 bg-gradient-to-b from-white/35 via-white/10 to-transparent shadow-[0_0_80px_rgba(255,255,255,0.22)] transition-transform duration-700 hover:scale-105">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/50 shadow-2xl bg-black">
                  <Image
                    src="/logo.webp"
                    alt="Koci Przyjaciel PL — Hodowla Kotów Maine Coon"
                    fill
                    sizes="(max-width: 768px) 250px, 300px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Subtelny certyfikat */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.35em] text-white/80 font-semibold">
                FIFe · FPL · WROCŁAW
              </span>
            </div>

            {/* Wielki tytuł Apple style */}
            <h1
              className="font-heading font-light text-white leading-[0.92] tracking-tight mb-3"
              style={{ fontSize: "clamp(3rem, 7.5vw, 6.8rem)" }}
            >
              Koci <span className="font-semibold italic">Przyjaciel</span>
            </h1>

            {/* Podtytuł */}
            <p className="text-sm sm:text-lg md:text-xl font-body text-white/75 max-w-lg mx-auto leading-relaxed">
              Hodowla kotów Maine Coon we Wrocławiu.
              <br />
              <span className="text-xs sm:text-sm text-white/50 tracking-widest uppercase font-ui block mt-1">
                Wychowujemy kociaki z miłością · od 10 lat
              </span>
            </p>

            {/* Bezpośrednie przyciski CTA na filmie */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
              <Link
                href="/dostepne-kociaki"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-ui text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:scale-105"
              >
                <span>{lang === "PL" ? "Dostępne Kociaki" : "Available Kittens"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-ui text-xs sm:text-sm font-semibold border border-white/20 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
              >
                <span>{lang === "PL" ? "Zarezerwuj Kociaka" : "Reserve Kitten"}</span>
              </button>

              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 hover:text-white font-ui text-xs sm:text-sm font-medium border border-white/10 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>{REAL_PHONE}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-20"
          style={{ opacity: 1, willChange: "opacity" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-ui uppercase tracking-[0.3em] text-white/40">Przewiń w dół</span>
            <div className="w-[1px] h-9 bg-gradient-to-b from-white/40 via-white/20 to-transparent animate-bounce-slow" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENA 1 — Łagodny Olbrzym                                    */}
        {/* ============================================================ */}
        <div
          ref={headline1Ref}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 md:px-24 z-20"
          style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}
        >
          <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/35 mb-5 block">
            Rasa Maine Coon
          </span>
          <h2
            className="font-heading font-light text-white leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Największy<br />
            <span className="font-semibold">kot domowy</span>
          </h2>
          <div className="flex items-baseline gap-3 mb-4">
            <span
              className="font-heading font-semibold text-white leading-none"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
            >
              12
            </span>
            <span className="text-2xl font-body text-white/50">kg</span>
          </div>
          <p className="text-base sm:text-lg font-body text-white/55 max-w-sm leading-relaxed">
            Maine Coon to jeden z największych kotów na świecie — duży, miękki i niezwykle przyjazny człowiekowi.
          </p>
        </div>

        {/* ============================================================ */}
        {/* SCENA 2 — Zero klatek                                        */}
        {/* ============================================================ */}
        <div
          ref={headline2Ref}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 md:px-24 z-20"
          style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}
        >
          <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/35 mb-5 block">
            Jak żyją nasze koty
          </span>
          <h2
            className="font-heading font-light text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            Jak
            <br />
            <span className="font-semibold">w rodzinie.</span>
          </h2>
          <p className="text-base sm:text-lg font-body text-white/55 max-w-sm leading-relaxed mb-6">
            Nasze koty mieszkają razem z nami — w salonie, sypialni, przy stole. Wychowują się z dziećmi i z psem, dzięki czemu są spokojne i ufają ludziom od pierwszych dni życia.
          </p>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-white/20" />
            <span className="text-sm font-ui text-white/30 tracking-wider">26 000+ fanów na Facebooku</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCENA 3 — Certyfikowane DNA                                   */}
        {/* ============================================================ */}
        <div
          ref={headline3Ref}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 md:px-24 z-20"
          style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}
        >
          <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/35 mb-5 block">
            Zdrowie
          </span>
          <h2
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
          >
            Zdrowe<br />
            <span className="font-semibold">od urodzenia.</span>
          </h2>
          <p className="text-base sm:text-lg font-body text-white/55 max-w-sm leading-relaxed">
            Każdy nasz kociak pochodzi od rodziców z potwierdzonymi badaniami serca i genetycznymi — żeby trafił do Ciebie zdrowy i bez ukrytych chorób dziedzicznych.
          </p>
        </div>

        {/* ============================================================ */}
        {/* SCENA 4 — CTA Rezerwacja                                     */}
        {/* ============================================================ */}
        <div
          ref={ctaRef}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 md:px-24 z-20"
          style={{ opacity: 0, transform: "translateY(60px)", willChange: "opacity, transform" }}
        >
          <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/35 mb-5 block">
            {lang === "PL" ? "Planowane mioty" : "Upcoming litters"}
          </span>
          <h2
            className="font-heading font-light text-white leading-[0.9] tracking-tight mb-10"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {lang === "PL" ? (
              <>
                Poznaj naszą<br />
                <span className="font-semibold">hodowlę.</span>
              </>
            ) : (
              <>
                Meet our<br />
                <span className="font-semibold">cattery.</span>
              </>
            )}
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dostepne-kociaki"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-ui font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span>{lang === "PL" ? "Zobacz dostępne kociaki" : "View Available Kittens"}</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <a
              href="#kim-jestem"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white text-xs font-ui font-bold uppercase tracking-[0.2em] hover:border-white/60 transition-colors duration-200"
            >
              {lang === "PL" ? "O właścicielce ↓" : "About Founder ↓"}
            </a>

            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 text-sm font-ui transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>{REAL_PHONE}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
