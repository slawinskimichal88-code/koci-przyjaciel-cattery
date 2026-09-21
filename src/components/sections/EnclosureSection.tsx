"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Volume2, VolumeX, ArrowRight, Sparkles, Heart } from "lucide-react";

interface EnclosureSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: (kittenName?: string) => void;
}

export default function EnclosureSection({
  lang = "PL",
  onOpenReservation,
}: EnclosureSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scrollytelling Scene Refs (Direct DOM manipulations for 60/120 FPS without re-renders)
  const introSceneRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  // Progress Bar Indicators
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const bar3Ref = useRef<HTMLDivElement>(null);
  const bar4Ref = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [wrapperHeight, setWrapperHeight] = useState<string>("520vh");

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isMobile = window.innerWidth < 1024;
    setWrapperHeight(isMobile ? "380vh" : "520vh");

    const onResize = () => {
      const mobileNow = window.innerWidth < 1024;
      setWrapperHeight(mobileNow ? "380vh" : "520vh");
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Video intersection observer to save battery and GPU
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

    // Smooth opacity calculation across scroll range
    const calcOpacity = (
      scrolled: number,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number
    ) => {
      if (scrolled < inStart) return 0;
      if (scrolled < inEnd) return lerp(0, 1, (scrolled - inStart) / (inEnd - inStart));
      if (scrolled < outStart) return 1;
      if (scrolled < outEnd) return lerp(1, 0, (scrolled - outStart) / (outEnd - outStart));
      return 0;
    };

    // Smooth translateY calculation across scroll range (moves up as it scrolls)
    const calcTranslateY = (
      scrolled: number,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number,
      enterDist = 60,
      exitDist = -45
    ) => {
      if (scrolled < inStart) return enterDist;
      if (scrolled < inEnd) return lerp(enterDist, 0, (scrolled - inStart) / (inEnd - inStart));
      if (scrolled < outStart) return 0;
      if (scrolled < outEnd) return lerp(0, exitDist, (scrolled - outStart) / (outEnd - outStart));
      return exitDist;
    };

    let rafId: number;
    let lastScrolled = -1;

    const update = () => {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;

      if (Math.abs(scrolled - lastScrolled) < 0.5) return;
      lastScrolled = scrolled;

      const isMob = window.innerWidth < 1024;
      const S = isMob ? window.innerHeight * 0.72 : window.innerHeight;

      // ── SCENA 0: Intro ("Nasz dom to ich dom") ─────────────────────
      const intro = introSceneRef.current;
      if (intro) {
        let op = 1;
        let ty = 0;
        if (scrolled > S * 0.12) {
          const t = Math.min(1, (scrolled - S * 0.12) / (S * 0.45));
          op = 1 - t;
          ty = -t * 50;
        }
        intro.style.opacity = String(op);
        intro.style.transform = `translate3d(0, ${ty}px, 0)`;
        intro.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // ── SCENA 1: Ogród i Zadaszony Wybieg (01) ──────────────────────
      const s1 = scene1Ref.current;
      if (s1) {
        const op = calcOpacity(scrolled, S * 0.5, S * 0.8, S * 1.5, S * 1.85);
        const ty = calcTranslateY(scrolled, S * 0.5, S * 0.8, S * 1.5, S * 1.85, 55, -40);
        s1.style.opacity = String(op);
        s1.style.transform = `translate3d(0, ${ty}px, 0)`;
        s1.style.pointerEvents = op > 0.2 ? "auto" : "none";
      }

      // ── SCENA 2: Życie w Domu z Rodziną (02) ────────────────────────
      const s2 = scene2Ref.current;
      if (s2) {
        const op = calcOpacity(scrolled, S * 1.85, S * 2.15, S * 2.85, S * 3.2);
        const ty = calcTranslateY(scrolled, S * 1.85, S * 2.15, S * 2.85, S * 3.2, 55, -40);
        s2.style.opacity = String(op);
        s2.style.transform = `translate3d(0, ${ty}px, 0)`;
        s2.style.pointerEvents = op > 0.2 ? "auto" : "none";
      }

      // ── SCENA 3: Zdrowe od Urodzenia (03) ───────────────────────────
      const s3 = scene3Ref.current;
      if (s3) {
        const op = calcOpacity(scrolled, S * 3.2, S * 3.5, S * 4.15, S * 4.5);
        const ty = calcTranslateY(scrolled, S * 3.2, S * 3.5, S * 4.15, S * 4.5, 55, -40);
        s3.style.opacity = String(op);
        s3.style.transform = `translate3d(0, ${ty}px, 0)`;
        s3.style.pointerEvents = op > 0.2 ? "auto" : "none";
      }

      // ── SCENA 4: CTA & Zaproszenie do Hodowli ────────────────────────
      const s4 = scene4Ref.current;
      if (s4) {
        const op = calcOpacity(scrolled, S * 4.5, S * 4.8, S * 999, S * 999);
        const ty = calcTranslateY(scrolled, S * 4.5, S * 4.8, S * 999, S * 999, 55, 0);
        s4.style.opacity = String(op);
        s4.style.transform = `translate3d(0, ${ty}px, 0)`;
        s4.style.pointerEvents = op > 0.2 ? "auto" : "none";
      }

      // ── SEGMENTOWE WSKAŹNIKI POSTĘPU APPLE ──────────────────────────
      if (bar1Ref.current) {
        const p1 = Math.min(100, Math.max(0, ((scrolled - S * 0.5) / (S * 1.0)) * 100));
        bar1Ref.current.style.width = `${p1}%`;
      }
      if (bar2Ref.current) {
        const p2 = Math.min(100, Math.max(0, ((scrolled - S * 1.85) / (S * 1.0)) * 100));
        bar2Ref.current.style.width = `${p2}%`;
      }
      if (bar3Ref.current) {
        const p3 = Math.min(100, Math.max(0, ((scrolled - S * 3.2) / (S * 0.95)) * 100));
        bar3Ref.current.style.width = `${p3}%`;
      }
      if (bar4Ref.current) {
        const p4 = Math.min(100, Math.max(0, ((scrolled - S * 4.5) / (S * 0.6)) * 100));
        bar4Ref.current.style.width = `${p4}%`;
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
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="wybieg"
      className="relative bg-black text-white select-none"
      style={{ height: wrapperHeight }}
    >
      {/* ── STICKY FULLSCREEN VIEWPORT (Identycznie jak w HeroSection) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center">

        {/* Pełnoekranowe, kinowe wideo w tle — naturalna skala, brak powiększenia/cięcia */}
        <video
          ref={videoRef}
          src="/video/film2.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* ── KINOWE OVERLAYE DLA IDEALNEJ CZYTELNOŚCI TEKSTU ───────────── */}
        {/* Subtelny ciemny filtr na całości */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Boczny gradient po lewej stronie — chroni kontrast tekstu i kart */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none" />

        {/* Górny gradient płynnie łączący z poprzedzającą sekcją */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Dolny gradient płynnie przechodzący do kolejnej sekcji */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/65 to-transparent pointer-events-none" />

        {/* ── SCENA 0: INTRO KEYNOTE REVEAL ─────────────────────────────── */}
        <div
          ref={introSceneRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
          style={{ opacity: 1, willChange: "opacity, transform" }}
        >
          <div className="max-w-3xl flex flex-col items-center pointer-events-auto">
            {/* Certyfikowana pigułka */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 text-xs font-mono uppercase tracking-[0.3em] text-white/90 font-medium mb-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}</span>
            </div>

            {/* Wielki tytuł Apple style */}
            <h2
              className="font-heading font-light text-white leading-[0.95] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Nasz dom <br />
                  <span className="font-semibold text-zinc-300">to ich dom.</span>
                </>
              ) : (
                <>
                  Our home <br />
                  <span className="font-semibold text-zinc-300">is their home.</span>
                </>
              )}
            </h2>

            {/* Opis wstępny */}
            <p className="text-base sm:text-xl font-body text-white/80 max-w-xl mx-auto leading-relaxed mb-8 font-light">
              {lang === "PL"
                ? "Koty Maine Coon w bezpiecznym ogrodzie i w salonie. Bez klatek, bez izolacji, od urodzenia z naszą rodziną."
                : "Maine Coon cats in a secure garden and spacious living room. No cages, no isolation, raised with our family from day one."}
            </p>

            {/* Wskaźnik scrolla */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-white/60 animate-pulse">
              <span>{lang === "PL" ? "Przewiń w dół, aby poznać wybieg" : "Scroll down to explore"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/70 animate-bounce" />
            </div>
          </div>
        </div>

        {/* ── SCENA 1: 01 / OGRÓD I ZADASZONY WYBIEG ───────────────────── */}
        <div
          ref={scene1Ref}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 xl:px-32 pointer-events-none z-20"
          style={{ opacity: 0, transform: "translate3d(0, 55px, 0)", willChange: "opacity, transform" }}
        >
          <div className="w-full max-w-2xl lg:max-w-3xl pointer-events-auto space-y-5 sm:space-y-6">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold block">
              01 / {lang === "PL" ? "OGRÓD I ZADASZONY WYBIEG" : "GARDEN & COVERED ENCLOSURE"}
            </span>

            <h3
              className="font-heading font-light text-white leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Wychodzą na świeże powietrze, <br />
                  <span className="font-semibold text-zinc-300">kiedy tylko chcą.</span>
                </>
              ) : (
                <>
                  They go outside freely, <br />
                  <span className="font-semibold text-zinc-300">whenever they want.</span>
                </>
              )}
            </h3>

            <p className="text-base sm:text-lg font-body text-zinc-200 leading-relaxed font-light max-w-2xl">
              {lang === "PL"
                ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego. Oddychają świeżym powietrzem, obserwują naturę i swobodnie biegają na wolności bez krat i klatek."
                : "Our cats have year-round access to a safe, covered garden run. They breathe fresh air, watch nature and run freely without cages."}
            </p>

            {/* Kwadrat iPhone Frosted Glass */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.28)] flex items-center gap-6 sm:gap-7 w-full max-w-xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300">
              <div className="text-5xl sm:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                365 dni
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white leading-tight mb-1.5 font-medium">
                  {lang === "PL" ? "Całoroczny wybieg ogrodowy" : "Year-round garden access"}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {lang === "PL"
                    ? "Bezpieczny, zadaszony, dostępny bezpośrednio z domowego salonu"
                    : "Covered, safe, directly accessible from our living room"}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/o-nas#wybieg"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.10] hover:bg-white/[0.22] backdrop-blur-xl border border-white/25 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:border-white/40"
              >
                <span>{lang === "PL" ? "Zobacz galerię wybiegu w zakładce O nas" : "View full enclosure gallery in About"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── SCENA 2: 02 / ŻYCIE W DOMU Z RODZINĄ ────────────────────── */}
        <div
          ref={scene2Ref}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 xl:px-32 pointer-events-none z-20"
          style={{ opacity: 0, transform: "translate3d(0, 55px, 0)", willChange: "opacity, transform" }}
        >
          <div className="w-full max-w-2xl lg:max-w-3xl pointer-events-auto space-y-5 sm:space-y-6">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold block">
              02 / {lang === "PL" ? "ŻYCIE W DOMU Z RODZINĄ" : "HOME LIFE WITH FAMILY"}
            </span>

            <h3
              className="font-heading font-light text-white leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Śpią w łóżkach, <br />
                  <span className="font-semibold text-zinc-300">odpoczywają w salonie.</span>
                </>
              ) : (
                <>
                  Sleep in bed, <br />
                  <span className="font-semibold text-zinc-300">relax in the living room.</span>
                </>
              )}
            </h3>

            <p className="text-base sm:text-lg font-body text-zinc-200 leading-relaxed font-light max-w-2xl">
              {lang === "PL"
                ? "Nasze koty są pełnoprawnymi członkami rodziny. Spędzają dzień na kanapie, towarzyszą nam przy codziennych posiłkach i wychowują się z naszymi dziećmi oraz psem."
                : "Our cats are family members. They lounge on the sofa, join family routines, and grow up alongside our children and dog."}
            </p>

            {/* Kwadrat iPhone Frosted Glass */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.28)] flex items-center gap-6 sm:gap-7 w-full max-w-xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300">
              <div className="text-5xl sm:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                100%
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white leading-tight mb-1.5 font-medium">
                  {lang === "PL" ? "Domowa socjalizacja w salonie" : "Living room socialization"}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {lang === "PL"
                    ? "Kocięta ufne, zrównoważone, odważne i niezwykle przytulaśne"
                    : "Kittens confident, affectionate and family bonded"}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/o-nas#hodowla"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.10] hover:bg-white/[0.22] backdrop-blur-xl border border-white/25 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:border-white/40"
              >
                <span>{lang === "PL" ? "Poznaj naszą hodowlę w zakładce O nas" : "Meet our cattery in About"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── SCENA 3: 03 / ZDROWE OD URODZENIA ────────────────────────── */}
        <div
          ref={scene3Ref}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 xl:px-32 pointer-events-none z-20"
          style={{ opacity: 0, transform: "translate3d(0, 55px, 0)", willChange: "opacity, transform" }}
        >
          <div className="w-full max-w-2xl lg:max-w-3xl pointer-events-auto space-y-5 sm:space-y-6">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-blue-400 font-semibold block">
              03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
            </span>

            <h3
              className="font-heading font-light text-white leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Certyfikowane badania <br />
                  <span className="font-semibold text-zinc-300">i spokój na lata.</span>
                </>
              ) : (
                <>
                  Certified health checks <br />
                  <span className="font-semibold text-zinc-300">and peace of mind.</span>
                </>
              )}
            </h3>

            <p className="text-base sm:text-lg font-body text-zinc-200 leading-relaxed font-light max-w-2xl">
              {lang === "PL"
                ? "Każdy kociak opuszcza hodowlę z rodowodem FIFe/FPL, książeczką zdrowia, mikroczipem oraz kompletem szczepień. Rodzice posiadają aktualne echo serca Doppler i ujemne testy genetyczne HCM, PKD, SMA N/N."
                : "Every kitten leaves with FIFe/FPL pedigree, health book, microchip and vaccinations. Parents tested with Doppler heart echo and genetic DNA panels HCM, PKD, SMA N/N."}
            </p>

            {/* Kwadrat iPhone Frosted Glass */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.28)] flex items-center gap-6 sm:gap-7 w-full max-w-xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300">
              <div className="text-5xl sm:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                100+
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white leading-tight mb-1.5 font-medium">
                  {lang === "PL" ? "Zadowolonych rodzin w Polsce" : "Happy families in Poland"}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {lang === "PL"
                    ? "Dożywotnie wsparcie hodowcy i stały kontakt przez lata"
                    : "Lifelong breeder support and guidance"}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/baza-wiedzy#zdrowie"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.10] hover:bg-white/[0.22] backdrop-blur-xl border border-white/25 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:border-white/40"
              >
                <span>{lang === "PL" ? "Zobacz badania i profilaktykę w Bazie Wiedzy" : "See health tests in Knowledge Base"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── SCENA 4: FINAŁ / CTA & ZAPROSZENIE DO HODOWLI ─────────────── */}
        <div
          ref={scene4Ref}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 xl:px-32 pointer-events-none z-20"
          style={{ opacity: 0, transform: "translate3d(0, 55px, 0)", willChange: "opacity, transform" }}
        >
          <div className="w-full max-w-2xl lg:max-w-3xl pointer-events-auto space-y-5 sm:space-y-6">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/60 font-semibold block">
              {lang === "PL" ? "ZOBACZ NA ŻYWO WE WROCŁAWIU" : "VISIT US IN WROCŁAW"}
            </span>

            <h3
              className="font-heading font-light text-white leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Zobacz wybieg i nasze koty <br />
                  <span className="font-semibold text-zinc-300">na własne oczy.</span>
                </>
              ) : (
                <>
                  See the enclosure and cats <br />
                  <span className="font-semibold text-zinc-300">with your own eyes.</span>
                </>
              )}
            </h3>

            <p className="text-base sm:text-lg font-body text-zinc-200 leading-relaxed font-light max-w-2xl">
              {lang === "PL"
                ? "Zapraszamy do kontaktu i odwiedzin w naszej hodowli we Wrocławiu. Poznaj dorosłe koty, zobacz wybieg ogrodowy i porozmawiajmy o Twoim wymarzonym kociaku Maine Coon."
                : "Get in touch and visit our cattery in Wrocław. Meet the adult cats, explore the garden run, and let's talk about your dream Maine Coon kitten."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenReservation?.()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === "PL" ? "Zarezerwuj kociaka" : "Reserve a kitten"}</span>
              </button>

              <Link
                href="/o-nas#wybieg"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.10] hover:bg-white/[0.22] backdrop-blur-xl border border-white/25 text-xs sm:text-sm font-mono uppercase tracking-wider text-white transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                <span>{lang === "PL" ? "Galeria zdjęć wybiegu" : "Enclosure photo gallery"}</span>
                <ArrowRight className="w-4 h-4 text-zinc-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── DŹWIĘK FILMU (Pływający przycisk w prawym dolnym rogu) ──────── */}
        <div className="absolute bottom-8 right-6 sm:right-10 z-30">
          <button
            onClick={toggleMute}
            className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-2xl border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:scale-105"
            title={isMuted ? (lang === "PL" ? "Włącz dźwięk filmu" : "Unmute video") : (lang === "PL" ? "Wycisz film" : "Mute video")}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/70" />
            ) : (
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
            )}
          </button>
        </div>

        {/* ── SEGMENTOWY WSKAŹNIK POSTĘPU SCEN (Apple Keynote Style) ─────── */}
        <div className="absolute bottom-8 left-6 sm:left-12 lg:left-28 z-20 flex items-center gap-2.5 sm:gap-3 pointer-events-none">
          {/* Segment 1 */}
          <div className="w-10 sm:w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              ref={bar1Ref}
              className="h-full bg-amber-400 transition-all duration-75 ease-out"
              style={{ width: "0%" }}
            />
          </div>
          {/* Segment 2 */}
          <div className="w-10 sm:w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              ref={bar2Ref}
              className="h-full bg-emerald-400 transition-all duration-75 ease-out"
              style={{ width: "0%" }}
            />
          </div>
          {/* Segment 3 */}
          <div className="w-10 sm:w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              ref={bar3Ref}
              className="h-full bg-blue-400 transition-all duration-75 ease-out"
              style={{ width: "0%" }}
            />
          </div>
          {/* Segment 4 */}
          <div className="w-10 sm:w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              ref={bar4Ref}
              className="h-full bg-white transition-all duration-75 ease-out"
              style={{ width: "0%" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
