"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface EnclosureSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: (kittenName?: string) => void;
}

export default function EnclosureSection({
  lang = "PL",
}: EnclosureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Desktop Refs
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const textBlock1Ref = useRef<HTMLDivElement>(null);
  const textBlock2Ref = useRef<HTMLDivElement>(null);
  const textBlock3Ref = useRef<HTMLDivElement>(null);
  const desktopBar1Ref = useRef<HTMLDivElement>(null);
  const desktopBar2Ref = useRef<HTMLDivElement>(null);
  const desktopBar3Ref = useRef<HTMLDivElement>(null);

  // Mobile Refs (Czyste manipulacje DOM bez re-renderów — 120 FPS płynności)
  const mobilePhoneWrapRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobileIntroRef = useRef<HTMLDivElement>(null);
  const mobileScene1Ref = useRef<HTMLDivElement>(null);
  const mobileScene2Ref = useRef<HTMLDivElement>(null);
  const mobileScene3Ref = useRef<HTMLDivElement>(null);
  const mobileBar1Ref = useRef<HTMLDivElement>(null);
  const mobileBar2Ref = useRef<HTMLDivElement>(null);
  const mobileBar3Ref = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isDesktopDevice, setIsDesktopDevice] = useState<boolean>(true);
  const [sectionHeight, setSectionHeight] = useState<string>("400vh");

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) videoRef.current.muted = nextMuted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const isDesk = window.innerWidth >= 1024;
    setIsDesktopDevice(isDesk);
    setSectionHeight(isDesk ? "400vh" : "310vh");

    const onResize = () => {
      const d = window.innerWidth >= 1024;
      setIsDesktopDevice(d);
      setSectionHeight(d ? "400vh" : "310vh");
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // IntersectionObserver — pauzuj wideo gdy wybieg nie jest na ekranie
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const v = videoRef.current;
            const mv = mobileVideoRef.current;
            if (entry.isIntersecting) {
              if (v && v.src) v.play().catch(() => {});
              if (mv && mv.src) mv.play().catch(() => {});
            } else {
              if (v) v.pause();
              if (mv) mv.pause();
            }
          });
        },
        { threshold: 0.02 }
      );
      observer.observe(section);
    }

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.max(0, Math.min(1, t));

    // Smoothstep interpolation
    const smoothFade = (
      p: number,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number
    ) => {
      if (p < inStart) return 0;
      if (p < inEnd) {
        const t = (p - inStart) / (inEnd - inStart);
        return t * t * (3 - 2 * t);
      }
      if (p < outStart) return 1;
      if (p < outEnd) {
        const t = (p - outStart) / (outEnd - outStart);
        return 1 - t * t * (3 - 2 * t);
      }
      return 0;
    };

    const smoothTranslateY = (
      p: number,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number,
      initialY = 36,
      outY = -28
    ) => {
      if (p < inStart) return initialY;
      if (p < inEnd) {
        const t = (p - inStart) / (inEnd - inStart);
        return lerp(initialY, 0, t * t * (3 - 2 * t));
      }
      if (p < outStart) return 0;
      if (p < outEnd) {
        const t = (p - outStart) / (outEnd - outStart);
        return lerp(0, outY, t * t * (3 - 2 * t));
      }
      return outY;
    };

    let rafId: number;

    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        // ═══════════════════════════════════════════════════════════════
        // ── DESKTOP: RUCH TELEFONU ZE ŚRODKA NA PRAWO (IDEALNY CHROME) ──
        // ═══════════════════════════════════════════════════════════════
        const phoneWrap = phoneWrapperRef.current;
        if (phoneWrap) {
          let scale = 1.0;
          if (p <= 0.18) {
            const t = p / 0.18;
            scale = lerp(1.04, 1.0, t * (2 - t));
          }
          phoneWrap.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
        }

        // Tytuł intro desktop
        const intro = introRef.current;
        let op = 1;
        let ty = 0;
        if (p > 0.04) {
          const t = Math.min(1, (p - 0.04) / 0.14);
          op = 1 - t;
          ty = -t * 35;
        }
        if (intro) {
          intro.style.opacity = String(op);
          intro.style.transform = `translate3d(0, ${ty}px, 0)`;
          intro.style.pointerEvents = op > 0.1 ? "auto" : "none";
        }

        // Cechy 01, 02, 03 desktop
        const b1 = textBlock1Ref.current;
        if (b1) {
          const b1Op = smoothFade(p, 0.16, 0.23, 0.44, 0.49);
          const b1Ty = smoothTranslateY(p, 0.16, 0.23, 0.44, 0.49);
          b1.style.opacity = String(b1Op);
          b1.style.transform = `translate3d(0, ${b1Ty}px, 0)`;
          b1.style.pointerEvents = b1Op > 0.3 ? "auto" : "none";
        }

        const b2 = textBlock2Ref.current;
        if (b2) {
          const b2Op = smoothFade(p, 0.48, 0.54, 0.72, 0.77);
          const b2Ty = smoothTranslateY(p, 0.48, 0.54, 0.72, 0.77);
          b2.style.opacity = String(b2Op);
          b2.style.transform = `translate3d(0, ${b2Ty}px, 0)`;
          b2.style.pointerEvents = b2Op > 0.3 ? "auto" : "none";
        }

        const b3 = textBlock3Ref.current;
        if (b3) {
          const b3Op = smoothFade(p, 0.76, 0.82, 0.98, 1.0);
          const b3Ty = smoothTranslateY(p, 0.76, 0.82, 0.98, 1.0);
          b3.style.opacity = String(b3Op);
          b3.style.transform = `translate3d(0, ${b3Ty}px, 0)`;
          b3.style.pointerEvents = b3Op > 0.3 ? "auto" : "none";
        }

        // Wskaźniki desktop
        if (desktopBar1Ref.current) {
          let f = 0;
          if (p >= 0.44) f = 100;
          else if (p >= 0.16) f = ((p - 0.16) / 0.28) * 100;
          desktopBar1Ref.current.style.width = `${f}%`;
        }
        if (desktopBar2Ref.current) {
          let f = 0;
          if (p >= 0.72) f = 100;
          else if (p >= 0.48) f = ((p - 0.48) / 0.24) * 100;
          desktopBar2Ref.current.style.width = `${f}%`;
        }
        if (desktopBar3Ref.current) {
          let f = 0;
          if (p >= 0.98) f = 100;
          else if (p >= 0.76) f = ((p - 0.76) / 0.22) * 100;
          desktopBar3Ref.current.style.width = `${f}%`;
        }
      } else {
        // ═══════════════════════════════════════════════════════════════
        // ── MOBILE: APPLE KINEMATYCZNE PRZEJŚCIE (ZERO RE-RENDERÓW) ──
        // ═══════════════════════════════════════════════════════════════
        const H = window.innerHeight;

        // 1. Film w telefonie: na początku wycentrowany, płynnie schodzi w dół
        const mPhone = mobilePhoneWrapRef.current;
        if (mPhone) {
          let targetY = 0;
          let targetScale = 1;
          if (scrolled <= 0) {
            targetY = -190;
            targetScale = 1.08;
          } else if (scrolled < H * 0.65) {
            const t = scrolled / (H * 0.65);
            const ease = t * t * (3 - 2 * t);
            targetY = lerp(-190, 0, ease);
            targetScale = lerp(1.08, 1.0, ease);
          } else {
            targetY = 0;
            targetScale = 1.0;
          }
          mPhone.style.transform = `translate3d(0, ${targetY}px, 0) scale(${targetScale})`;
        }

        // 2. Intro nagłówek mobilny: zanika gdy przewijamy
        const mIntro = mobileIntroRef.current;
        if (mIntro) {
          let introOp = 1;
          let introTy = 0;
          if (scrolled > H * 0.06) {
            const t = Math.min(1, (scrolled - H * 0.06) / (H * 0.35));
            introOp = 1 - t;
            introTy = -t * 30;
          }
          mIntro.style.opacity = String(introOp);
          mIntro.style.transform = `translate3d(0, ${introTy}px, 0)`;
          mIntro.style.pointerEvents = introOp > 0.1 ? "auto" : "none";
        }

        // 3. Scena 1: Ogród i Wybieg (0.45H -> 1.25H)
        const s1 = mobileScene1Ref.current;
        if (s1) {
          const op = smoothFade(scrolled, H * 0.45, H * 0.70, H * 1.10, H * 1.30);
          const ty = smoothTranslateY(scrolled, H * 0.45, H * 0.70, H * 1.10, H * 1.30, 30, -25);
          s1.style.opacity = String(op);
          s1.style.transform = `translate3d(0, ${ty}px, 0)`;
          s1.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // 4. Scena 2: Życie w Domu (1.25H -> 1.95H)
        const s2 = mobileScene2Ref.current;
        if (s2) {
          const op = smoothFade(scrolled, H * 1.25, H * 1.45, H * 1.80, H * 2.00);
          const ty = smoothTranslateY(scrolled, H * 1.25, H * 1.45, H * 1.80, H * 2.00, 30, -25);
          s2.style.opacity = String(op);
          s2.style.transform = `translate3d(0, ${ty}px, 0)`;
          s2.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // 5. Scena 3: Zdrowe od Urodzenia (1.95H -> 2.80H)
        const s3 = mobileScene3Ref.current;
        if (s3) {
          const op = smoothFade(scrolled, H * 1.95, H * 2.20, H * 2.70, H * 3.00);
          const ty = smoothTranslateY(scrolled, H * 1.95, H * 2.20, H * 2.70, H * 3.00, 30, -25);
          s3.style.opacity = String(op);
          s3.style.transform = `translate3d(0, ${ty}px, 0)`;
          s3.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // 6. Subtelne segmentowe kreski Apple na dole
        if (mobileBar1Ref.current) {
          const prog = Math.min(100, Math.max(0, ((scrolled - H * 0.45) / (H * 0.70)) * 100));
          mobileBar1Ref.current.style.width = `${prog}%`;
        }
        if (mobileBar2Ref.current) {
          const prog = Math.min(100, Math.max(0, ((scrolled - H * 1.25) / (H * 0.65)) * 100));
          mobileBar2Ref.current.style.width = `${prog}%`;
        }
        if (mobileBar3Ref.current) {
          const prog = Math.min(100, Math.max(0, ((scrolled - H * 1.95) / (H * 0.75)) * 100));
          mobileBar3Ref.current.style.width = `${prog}%`;
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wybieg"
      className="relative bg-[#000000] text-white select-none"
      style={{ height: sectionHeight }}
    >
      {/* ── STICKY VIEWPORT CONTAINER ──────────────────────────────── */}
      <div
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
        style={{ height: "100dvh" }}
      >
        
        {/* Ambientowe oświetlenie Apple */}
        <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* ── 1. WERSJA DESKTOPOWA (DLA CHROME — 100% ORYGINALNA I IDEALNA) ── */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col items-center justify-center w-full h-full relative">
          
          {/* Tytuł otwierający desktop */}
          <div
            ref={introRef}
            className="absolute top-14 left-1/2 -translate-x-1/2 z-30 text-center w-full max-w-3xl px-5 pointer-events-none will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono uppercase tracking-[0.25em] text-white/90 font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
            </div>
            <h2 className="text-5xl lg:text-6xl font-heading font-light text-white tracking-tight leading-[1.05]">
              {lang === "PL" ? (
                <>Nasz dom<br /><span className="font-normal text-[#86868b]">to ich dom.</span></>
              ) : (
                <>Our home<br /><span className="font-normal text-[#86868b]">is their home.</span></>
              )}
            </h2>

            <div className="flex mt-3 items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b]">
              <span>{lang === "PL" ? "Przewiń, aby zobaczyć więcej" : "Scroll to explore"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#86868b] animate-bounce" />
            </div>
          </div>

          {/* Układ 2-kolumnowy desktop (Przestronny, szeroki układ Apple Pro) */}
          <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-12 xl:px-16 h-full flex flex-row items-center justify-between gap-10 xl:gap-16 relative z-10">
            
            {/* Lewa kolumna: szeroki, niesztywny blok tekstowy - NIGDY NIE ZWĘŻA SIĘ (shrink-0)! */}
            <div className="flex-1 w-1/2 min-w-[500px] max-w-[660px] shrink-0 z-20 relative h-[520px] flex items-center">
              
              {/* 01. Wybieg */}
              <div
                ref={textBlock1Ref}
                className="opacity-0 will-change-transform space-y-5 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">
                    01 / {lang === "PL" ? "OGRÓD I ZADASZONY WYBIEG" : "GARDEN & OUTDOOR RUN"}
                  </p>
                  <h3 className="text-4xl xl:text-5xl font-heading font-light text-white leading-[1.12] tracking-tight">
                    {lang === "PL" ? (
                      <>Wychodzą na świeże powietrze, <span className="text-[#86868b]">kiedy tylko chcą.</span></>
                    ) : (
                      <>They go outside freely, <span className="text-[#86868b]">whenever they want.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-base xl:text-lg font-body text-[#ceced2] leading-relaxed font-light max-w-xl">
                  {lang === "PL"
                    ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego. Oddychają świeżym powietrzem, obserwują ptaki i swobodnie biegają na wolności bez krat i klatek."
                    : "Our cats have year-round access to a safe, covered garden run. They breathe fresh air, watch nature and run freely without cages."}
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-6 max-w-lg">
                  <div className="text-5xl xl:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0">
                    365 dni
                  </div>
                  <div className="border-l border-white/10 pl-5">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] leading-tight mb-1">
                      {lang === "PL" ? "Całoroczny wybieg ogrodowy" : "Year-round garden access"}
                    </p>
                    <p className="text-xs text-white/60 font-light">
                      {lang === "PL" ? "Bezpieczny, zadaszony, dostępny z salonu" : "Covered, safe, directly accessible"}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/o-nas#wybieg"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-sm hover:scale-105"
                  >
                    <span>{lang === "PL" ? "Zobacz pełną galerię wybiegu w zakładce O nas" : "View full enclosure gallery in About"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>
              </div>

              {/* 02. Dom */}
              <div
                ref={textBlock2Ref}
                className="opacity-0 will-change-transform space-y-5 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-2">
                    02 / {lang === "PL" ? "ŻYCIE W DOMU Z RODZINĄ" : "HOME LIFE WITH FAMILY"}
                  </p>
                  <h3 className="text-4xl xl:text-5xl font-heading font-light text-white leading-[1.12] tracking-tight">
                    {lang === "PL" ? (
                      <>Śpią w łóżkach, <span className="text-[#86868b]">odpoczywają w salonie.</span></>
                    ) : (
                      <>Sleep in bed, <span className="text-[#86868b]">relax in the living room.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-base xl:text-lg font-body text-[#ceced2] leading-relaxed font-light max-w-xl">
                  {lang === "PL"
                    ? "Nasze koty są pełnoprawnymi członkami rodziny. Spędzają dzień na kanapie, towarzyszą nam przy codziennych posiłkach i wychowują się z naszymi dziećmi oraz psem."
                    : "Our cats are family members. They sit on the sofa, join family routines, and grow up alongside our children and dog."}
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-6 max-w-lg">
                  <div className="text-5xl xl:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0">
                    100%
                  </div>
                  <div className="border-l border-white/10 pl-5">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] leading-tight mb-1">
                      {lang === "PL" ? "Domowa socjalizacja w salonie" : "Living room socialization"}
                    </p>
                    <p className="text-xs text-white/60 font-light">
                      {lang === "PL" ? "Kocięta ufne, zrównoważone i odważne" : "Kittens confident and affectionate"}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/o-nas#hodowla"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-sm hover:scale-105"
                  >
                    <span>{lang === "PL" ? "Poznaj naszą hodowlę w zakładce O nas" : "Meet our cattery in About"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </Link>
                </div>
              </div>

              {/* 03. Zdrowie */}
              <div
                ref={textBlock3Ref}
                className="opacity-0 will-change-transform space-y-5 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold mb-2">
                    03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
                  </p>
                  <h3 className="text-4xl xl:text-5xl font-heading font-light text-white leading-[1.12] tracking-tight">
                    {lang === "PL" ? (
                      <>Certyfikowane badania <span className="text-[#86868b]">i spokój na lata.</span></>
                    ) : (
                      <>Certified health checks <span className="text-[#86868b]">and peace of mind.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-base xl:text-lg font-body text-[#ceced2] leading-relaxed font-light max-w-xl">
                  {lang === "PL"
                    ? "Każdy kociak opuszcza hodowlę z rodowodem FIFe/FPL, książeczką zdrowia, mikroczipem oraz kompletem szczepień. Rodzice posiadają aktualne echo serca Doppler i ujemne testy genetyczne."
                    : "Every kitten leaves with FIFe/FPL pedigree, health book, microchip and vaccinations. Parents tested with Doppler heart echo and genetic DNA panels."}
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-6 max-w-lg">
                  <div className="text-5xl xl:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0">
                    100+
                  </div>
                  <div className="border-l border-white/10 pl-5">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] leading-tight mb-1">
                      {lang === "PL" ? "Zadowolonych rodzin w Polsce" : "Happy families in Poland"}
                    </p>
                    <p className="text-xs text-white/60 font-light">
                      {lang === "PL" ? "Dożywotnie wsparcie hodowcy" : "Lifelong breeder support"}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    href="/baza-wiedzy#zdrowie"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-sm hover:scale-105"
                  >
                    <span>{lang === "PL" ? "Zobacz badania i profilaktykę w Bazie Wiedzy" : "See health tests in Knowledge Base"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Prawa kolumna: obudowa iPhone 16 Pro desktop */}
            <div className="flex-1 w-1/2 min-w-[500px] max-w-[680px] shrink-0 z-10 flex justify-end">
              <div
                ref={phoneWrapperRef}
                className="w-full will-change-transform transition-transform duration-75 ease-out relative flex justify-center"
              >
                <div className="relative mx-auto w-full max-w-[680px] p-[10px] rounded-[44px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.12)]">
                  <div className="relative w-full aspect-[16/9] rounded-[36px] overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      src={isDesktopDevice ? "/video/film2.mp4" : undefined}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover pointer-events-none scale-[1.05]"
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-11 bg-black rounded-full z-20 flex items-center justify-center border border-white/10 shadow-sm pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-[#0a1224] border border-blue-500/20" />
                    </div>
                    <div className="absolute bottom-4 right-4 z-30">
                      <button
                        onClick={toggleMute}
                        className="w-8 h-8 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:scale-105 transition-all cursor-pointer"
                        title={isMuted ? "Włącz dźwięk" : "Wycisz"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Dolny segmentowy wskaźnik postępu desktop */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={desktopBar1Ref}
                className="h-full bg-white transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={desktopBar2Ref}
                className="h-full bg-white transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={desktopBar3Ref}
                className="h-full bg-white transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* ── 2. WERSJA MOBILNA (APPLE SCROLLYTELLING — 120 FPS PŁYNNOŚCI) ─ */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:hidden flex flex-col justify-between w-full h-full relative z-10 px-5 max-w-md mx-auto"
          style={{
            paddingTop: "76px",
            paddingBottom: "22px",
            height: "100dvh",
          }}
        >
          {/* A. INTRO NAGŁÓWEK (Na starcie widoczny, płynnie znika w górę) */}
          <div
            ref={mobileIntroRef}
            className="w-full text-center will-change-transform pt-1 z-20"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono uppercase tracking-[0.25em] text-white/90 font-medium mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-tight leading-tight">
              {lang === "PL" ? (
                <>Nasz dom <span className="font-normal text-[#86868b]">to ich dom.</span></>
              ) : (
                <>Our home <span className="font-normal text-[#86868b]">is their home.</span></>
              )}
            </h2>
            <div className="flex mt-1.5 items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868b]">
              <span>{lang === "PL" ? "Przewiń, aby poznać wybieg" : "Scroll to explore"}</span>
              <ChevronDown className="w-3 h-3 text-[#86868b] animate-bounce" />
            </div>
          </div>

          {/* B. OBSZAR TYPOGRAFII SCEN (01, 02, 03 — Czysty styl Apple, bez kwadratów!) */}
          <div className="w-full relative flex-1 min-h-[200px] max-h-[250px] my-auto flex items-center justify-center z-10">
            
            {/* Scena 1: Ogród i Wybieg */}
            <div
              ref={mobileScene1Ref}
              className="absolute inset-0 flex flex-col justify-center opacity-0 will-change-transform pointer-events-none"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold mb-1">
                01 / {lang === "PL" ? "OGRÓD I WYBIEG" : "GARDEN & OUTDOOR RUN"}
              </p>
              <h3 className="text-2xl sm:text-3xl font-heading font-light text-white leading-tight tracking-tight mb-2">
                {lang === "PL" ? (
                  <>Wychodzą na <span className="text-[#86868b]">dwór kiedy chcą.</span></>
                ) : (
                  <>They go outside <span className="text-[#86868b]">whenever they want.</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm font-body text-[#ceced2] leading-relaxed font-light mb-3">
                {lang === "PL"
                  ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego. Oddychają świeżym powietrzem, obserwują ptaki i biegają na wolności bez klatek."
                  : "Cats have year-round access to a safe, covered garden run. They breathe fresh air, watch birds, and roam freely without cages."}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-heading font-extralight text-white leading-none tracking-tight">
                  365 dni
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#86868b] leading-tight">
                  {lang === "PL" ? "Całoroczny dostęp do ogrodu" : "Year-round garden access"}
                </span>
              </div>
              <div className="pt-2">
                <Link
                  href="/o-nas#wybieg"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 active:bg-white/20 border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto"
                >
                  <span>{lang === "PL" ? "Więcej zdjęć w zakładce O nas" : "More photos in About"}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </Link>
              </div>
            </div>

            {/* Scena 2: Życie w Domu */}
            <div
              ref={mobileScene2Ref}
              className="absolute inset-0 flex flex-col justify-center opacity-0 will-change-transform pointer-events-none"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-1">
                02 / {lang === "PL" ? "ŻYCIE W DOMU" : "HOME LIFE"}
              </p>
              <h3 className="text-2xl sm:text-3xl font-heading font-light text-white leading-tight tracking-tight mb-2">
                {lang === "PL" ? (
                  <>Śpią w łóżku, <span className="text-[#86868b]">bawią się w salonie.</span></>
                ) : (
                  <>Sleep in bed, <span className="text-[#86868b]">play in the living room.</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm font-body text-[#ceced2] leading-relaxed font-light mb-3">
                {lang === "PL"
                  ? "Nasze koty są częścią rodziny. Żyją z nami w salonie, śpią na łóżkach i bawią się z dziećmi oraz psem. Dzięki temu kociaki są w pełni zsocjalizowane i ufne."
                  : "Our cats are part of our family. They live with us, sleep in beds and play with children and our dog. Kittens grow up calm, loving, and fully socialized."}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-heading font-extralight text-white leading-none tracking-tight">
                  100%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#86868b] leading-tight">
                  {lang === "PL" ? "Wychowane z rodziną i dziećmi" : "Raised with family & kids"}
                </span>
              </div>
            </div>

            {/* Scena 3: Zdrowe od Urodzenia */}
            <div
              ref={mobileScene3Ref}
              className="absolute inset-0 flex flex-col justify-center opacity-0 will-change-transform pointer-events-none"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold mb-1">
                03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
              </p>
              <h3 className="text-2xl sm:text-3xl font-heading font-light text-white leading-tight tracking-tight mb-2">
                {lang === "PL" ? (
                  <>Przebadane <span className="text-[#86868b]">i gotowe na Ciebie.</span></>
                ) : (
                  <>Tested <span className="text-[#86868b]">and ready for you.</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm font-body text-[#ceced2] leading-relaxed font-light mb-3">
                {lang === "PL"
                  ? "Każdy kociak opuszcza hodowlę z książeczką zdrowia, kompletem szczepień, mikroczipem i rodowodem FPL/FIFe. Rodzice są regularnie badani (echo serca Doppler, testy DNA)."
                  : "Every kitten leaves with health book, vaccinations, microchip, and FPL/FIFe pedigree. Parents tested for HCM (Doppler echo) and genetic DNA panels."}
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-heading font-extralight text-white leading-none tracking-tight">
                  100+
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#86868b] leading-tight">
                  {lang === "PL" ? "Szczęśliwych domów w Polsce" : "Happy homes across Poland"}
                </span>
              </div>
            </div>

          </div>

          {/* C. AUTENTYCZNY IPHONE 16 PRO (Na starcie w centrum, płynnie schodzi w dół!) */}
          <div
            ref={mobilePhoneWrapRef}
            className="w-full will-change-transform relative px-1 pb-2 z-20"
            style={{ transform: "translate3d(0, -190px, 0) scale(1.08)" }}
          >
            <div className="relative mx-auto w-full max-w-[340px] p-[5px] rounded-[24px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)]">
              <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-black">
                <video
                  ref={mobileVideoRef}
                  src={!isDesktopDevice ? "/video/film2.mp4" : undefined}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover scale-[1.04]"
                />
                
                {/* Dynamic Island */}
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-2.5 h-8 bg-black rounded-full z-20 flex items-center justify-center border border-white/10 shadow-sm pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a1224] border border-blue-500/20" />
                </div>

                {/* Przycisk dźwięku */}
                <div className="absolute bottom-2.5 right-2.5 z-30">
                  <button
                    onClick={toggleMute}
                    className="w-7 h-7 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 active:scale-95 transition-all cursor-pointer pointer-events-auto"
                    title={isMuted ? "Włącz dźwięk" : "Wycisz"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                </div>

                {/* Subtelny odblask szkła ekranu */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* D. SUBTELNE WSKAŹNIKI POSTĘPU APPLE (Eleganckie linie bez topornych przycisków) */}
          <div className="w-full flex items-center justify-center gap-2 pt-1 pb-1 z-20">
            <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={mobileBar1Ref}
                className="h-full bg-white will-change-transform"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={mobileBar2Ref}
                className="h-full bg-white will-change-transform"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={mobileBar3Ref}
                className="h-full bg-white will-change-transform"
                style={{ width: "0%" }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
