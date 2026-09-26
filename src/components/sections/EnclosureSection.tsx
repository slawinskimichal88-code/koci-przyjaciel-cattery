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
    setSectionHeight(isDesk ? "520vh" : "410vh");

    const onResize = () => {
      const d = window.innerWidth >= 1024;
      setIsDesktopDevice(d);
      setSectionHeight(d ? "520vh" : "410vh");
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
          let offsetX = -23.5;
          let scale = 1.12;

          if (p <= 0.06) {
            offsetX = -23.5;
            scale = 1.12;
          } else if (p <= 0.22) {
            const t = (p - 0.06) / 0.16;
            const ease = 1 - Math.pow(1 - t, 3);
            offsetX = lerp(-23.5, 0, ease);
            scale = lerp(1.12, 1.0, ease);
          } else {
            offsetX = 0;
            scale = 1.0;
          }

          phoneWrap.style.transform = `translate3d(${offsetX}vw, 0, 0) scale(${scale})`;
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

        // 1. Film w telefonie: wypełnia górną część ekranu, płynnie adaptuje się do środka
        const mPhone = mobilePhoneWrapRef.current;
        if (mPhone) {
          let targetY = 0;
          let targetScale = 1;
          if (scrolled <= 0) {
            targetY = -70;
            targetScale = 1.05;
          } else if (scrolled < H * 0.55) {
            const t = scrolled / (H * 0.55);
            const ease = t * t * (3 - 2 * t);
            targetY = lerp(-70, 0, ease);
            targetScale = lerp(1.05, 1.0, ease);
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 text-[11px] font-mono uppercase tracking-[0.25em] text-white/90 font-medium mb-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
            </div>
            <h2 className="text-5xl lg:text-6xl font-heading font-light text-white tracking-tight leading-[1.05]">
              {lang === "PL" ? (
                <>Nasz dom<br /><span className="font-normal text-zinc-400">to ich dom.</span></>
              ) : (
                <>Our home<br /><span className="font-normal text-zinc-400">is their home.</span></>
              )}
            </h2>

            <div className="flex mt-3 items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
              <span>{lang === "PL" ? "Przewiń, aby zobaczyć więcej" : "Scroll to explore"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
            </div>
          </div>

          {/* Układ 2-kolumnowy desktop (Przestronny, szeroki układ Apple Pro — szeroki tekst, bez wąskiego paska!) */}
          <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 h-full flex flex-row items-center justify-between gap-8 xl:gap-14 relative z-10">
            
            {/* Lewa kolumna: szeroki, elegancki blok tekstowy (Zero ściskania!) */}
            <div className="flex-1 w-[56%] xl:w-[58%] max-w-[760px] z-20 relative h-[520px] flex items-center shrink-0">
              
              {/* 01. Wybieg */}
              <div
                ref={textBlock1Ref}
                className="opacity-0 will-change-transform space-y-6 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">
                    01 / {lang === "PL" ? "OGRÓD I ZADASZONY WYBIEG" : "GARDEN & OUTDOOR RUN"}
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-4xl xl:text-[2.75rem] font-heading font-light text-white leading-[1.14] tracking-tight max-w-2xl">
                    {lang === "PL" ? (
                      <>Wychodzą na świeże powietrze, <span className="text-zinc-400 font-normal">kiedy tylko chcą.</span></>
                    ) : (
                      <>They go outside freely, <span className="text-zinc-400 font-normal">whenever they want.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-base sm:text-lg font-body text-zinc-300 leading-relaxed font-light w-full max-w-2xl">
                  {lang === "PL"
                    ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego. Oddychają świeżym powietrzem, obserwują ptaki i swobodnie biegają na wolności bez krat i klatek."
                    : "Our cats have year-round access to a safe, covered garden run. They breathe fresh air, watch nature and run freely without cages."}
                </p>
                {/* Kwadrat iPhone Glass */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.28)] flex items-center gap-6 sm:gap-7 w-full max-w-2xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300">
                  <div className="text-5xl xl:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                    365 dni
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-zinc-200 leading-tight mb-1.5 font-medium">
                      {lang === "PL" ? "Całoroczny wybieg ogrodowy" : "Year-round garden access"}
                    </p>
                    <p className="text-xs text-zinc-400 font-light">
                      {lang === "PL" ? "Bezpieczny, zadaszony, dostępny bezpośrednio z salonu" : "Covered, safe, directly accessible from living room"}
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <Link
                    href="/o-nas#wybieg"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.10] hover:bg-white/[0.20] backdrop-blur-xl border border-white/25 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:border-white/40"
                  >
                    <span>{lang === "PL" ? "Zobacz pełną galerię wybiegu w zakładce O nas" : "View full enclosure gallery in About"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>
              </div>

              {/* 02. Dom */}
              <div
                ref={textBlock2Ref}
                className="opacity-0 will-change-transform space-y-6 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-2">
                    02 / {lang === "PL" ? "ŻYCIE W DOMU Z RODZINĄ" : "HOME LIFE WITH FAMILY"}
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-4xl xl:text-[2.75rem] font-heading font-light text-white leading-[1.14] tracking-tight max-w-2xl">
                    {lang === "PL" ? (
                      <>Śpią w łóżkach, <span className="text-zinc-400 font-normal">odpoczywają w salonie.</span></>
                    ) : (
                      <>Sleep in bed, <span className="text-zinc-400 font-normal">relax in the living room.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-base sm:text-lg font-body text-zinc-300 leading-relaxed font-light w-full max-w-2xl">
                  {lang === "PL"
                    ? "Nasze koty są pełnoprawnymi członkami rodziny. Spędzają dzień na kanapie, towarzyszą nam przy codziennych posiłkach i wychowują się z naszymi dziećmi oraz psem."
                    : "Our cats are family members. They sit on the sofa, join family routines, and grow up alongside our children and dog."}
                </p>
                {/* Kwadrat iPhone Glass */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.28)] flex items-center gap-6 sm:gap-7 w-full max-w-2xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300">
                  <div className="text-5xl xl:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                    100%
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-zinc-200 leading-tight mb-1.5 font-medium">
                      {lang === "PL" ? "Domowa socjalizacja w salonie" : "Living room socialization"}
                    </p>
                    <p className="text-xs text-zinc-400 font-light">
                      {lang === "PL" ? "Kocięta ufne, zrównoważone, odważne i przytulaśne" : "Kittens confident, affectionate and family bonded"}
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <Link
                    href="/o-nas#hodowla"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.10] hover:bg-white/[0.20] backdrop-blur-xl border border-white/25 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:border-white/40"
                  >
                    <span>{lang === "PL" ? "Poznaj naszą hodowlę w zakładce O nas" : "Meet our cattery in About"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </Link>
                </div>
              </div>

              {/* 03. Zdrowie */}
              <div
                ref={textBlock3Ref}
                className="opacity-0 will-change-transform space-y-6 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold mb-2">
                    03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-4xl xl:text-[2.75rem] font-heading font-light text-white leading-[1.14] tracking-tight max-w-2xl">
                    {lang === "PL" ? (
                      <>Certyfikowane badania <span className="text-zinc-400 font-normal">i spokój na lata.</span></>
                    ) : (
                      <>Certified health checks <span className="text-zinc-400 font-normal">and peace of mind.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-base sm:text-lg font-body text-zinc-300 leading-relaxed font-light w-full max-w-2xl">
                  {lang === "PL"
                    ? "Każdy kociak opuszcza hodowlę z rodowodem FIFe/FPL, książeczką zdrowia, mikroczipem oraz kompletem szczepień. Rodzice posiadają aktualne echo serca Doppler i ujemne testy genetyczne."
                    : "Every kitten leaves with FIFe/FPL pedigree, health book, microchip and vaccinations. Parents tested with Doppler heart echo and genetic DNA panels."}
                </p>
                {/* Kwadrat iPhone Glass */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.28)] flex items-center gap-6 sm:gap-7 w-full max-w-2xl hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300">
                  <div className="text-5xl xl:text-6xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                    100+
                  </div>
                  <div className="border-l border-white/20 pl-6">
                    <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-zinc-200 leading-tight mb-1.5 font-medium">
                      {lang === "PL" ? "Zadowolonych rodzin w Polsce" : "Happy families in Poland"}
                    </p>
                    <p className="text-xs text-zinc-400 font-light">
                      {lang === "PL" ? "Dożywotnie wsparcie hodowcy i kontakt przez lata" : "Lifelong breeder support and guidance"}
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <Link
                    href="/baza-wiedzy#zdrowie"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.10] hover:bg-white/[0.20] backdrop-blur-xl border border-white/25 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:border-white/40"
                  >
                    <span>{lang === "PL" ? "Zobacz badania i profilaktykę w Bazie Wiedzy" : "See health tests in Knowledge Base"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Prawa kolumna: obudowa iPhone 16 Pro desktop */}
            <div className="w-[44%] xl:w-[42%] max-w-[620px] z-10 flex justify-end shrink-0">
              <div
                ref={phoneWrapperRef}
                className="w-full will-change-transform transition-transform duration-75 ease-out relative flex justify-center"
              >
                <div className="relative mx-auto w-full max-w-[580px] xl:max-w-[620px] p-[10px] rounded-[44px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.15)]">
                  <div className="relative w-full aspect-[16/9] rounded-[36px] overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      src={isDesktopDevice ? "/video/film2.mp4" : undefined}
                      poster="/images/gallery/wybieg/wybieg_001.webp"
                      loop
                      muted={isMuted}
                      playsInline
                      preload="none"
                      controlsList="nodownload nofullscreen noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover pointer-events-none scale-[1.05] select-none"
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-11 bg-black rounded-full z-20 flex items-center justify-center border border-white/10 shadow-sm pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-[#0a1224] border border-blue-500/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Dolny segmentowy wskaźnik postępu desktop (kolorowy Apple style jak w hodowcy) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={desktopBar1Ref}
                className="h-full bg-amber-400 transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={desktopBar2Ref}
                className="h-full bg-blue-400 transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={desktopBar3Ref}
                className="h-full bg-emerald-400 transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* ── 2. WERSJA MOBILNA (APPLE SCROLLYTELLING — 120 FPS PŁYNNOŚCI) ─ */}
        {/* ═════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:hidden flex flex-col justify-between w-full h-full relative z-10 px-4 sm:px-6 max-w-lg mx-auto"
          style={{
            paddingTop: "68px",
            paddingBottom: "18px",
            height: "100dvh",
          }}
        >
          {/* A. INTRO NAGŁÓWEK (Na starcie widoczny, płynnie znika w górę) */}
          <div
            ref={mobileIntroRef}
            className="w-full text-center will-change-transform pt-2 z-20"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-[0.25em] text-white/90 font-medium mb-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-tight leading-tight">
              {lang === "PL" ? (
                 <>Nasz dom <span className="font-normal text-zinc-400">to ich dom.</span></>
               ) : (
                 <>Our home <span className="font-normal text-zinc-400">is their home.</span></>
               )}
            </h2>
            <div className="flex mt-1.5 items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              <span>{lang === "PL" ? "Przewiń, aby poznać wybieg" : "Scroll to explore"}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400 animate-bounce" />
            </div>
          </div>

          {/* B. OBSZAR TYPOGRAFII SCEN (01, 02, 03 — Karty iPhone Glass rozciągnięte w osi pionowej) */}
          <div className="w-full relative flex-1 min-h-[240px] max-h-[300px] my-auto flex items-center justify-center z-10">
            
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
                  <>Wychodzą na <span className="text-zinc-400 font-normal">dwór kiedy chcą.</span></>
                ) : (
                  <>They go outside <span className="text-zinc-400 font-normal">whenever they want.</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed font-light mb-3">
                {lang === "PL"
                  ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego. Oddychają świeżym powietrzem, obserwują ptaki i biegają na wolności bez klatek."
                  : "Cats have year-round access to a safe, covered garden run. They breathe fresh air, watch birds, and roam freely without cages."}
              </p>
              {/* Kwadrat iPhone Glass na mobile */}
              <div className="p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center gap-4 mb-2.5">
                <span className="text-3xl sm:text-4xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                  365 dni
                </span>
                <div className="border-l border-white/20 pl-3.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-200 leading-tight block mb-0.5 font-medium">
                    {lang === "PL" ? "Całoroczny dostęp do ogrodu" : "Year-round garden access"}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-light block">
                    {lang === "PL" ? "Bezpieczny, zadaszony wybieg" : "Covered, safe run"}
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/o-nas#wybieg"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] active:bg-white/[0.22] backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-sm"
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
                  <>Śpią w łóżku, <span className="text-zinc-400 font-normal">bawią się w salonie.</span></>
                ) : (
                  <>Sleep in bed, <span className="text-zinc-400 font-normal">play in the living room.</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed font-light mb-3">
                {lang === "PL"
                  ? "Nasze koty są częścią rodziny. Żyją z nami w salonie, śpią na łóżkach i bawią się z dziećmi oraz psem. Dzięki temu kociaki są w pełni zsocjalizowane i ufne."
                  : "Our cats are part of our family. They live with us, sleep in beds and play with children and our dog. Kittens grow up calm, loving, and fully socialized."}
              </p>
              {/* Kwadrat iPhone Glass na mobile */}
              <div className="p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center gap-4 mb-2.5">
                <span className="text-3xl sm:text-4xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                  100%
                </span>
                <div className="border-l border-white/20 pl-3.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-200 leading-tight block mb-0.5 font-medium">
                    {lang === "PL" ? "Domowa socjalizacja w salonie" : "Living room socialization"}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-light block">
                    {lang === "PL" ? "Wychowane z rodziną i dziećmi" : "Raised with family & kids"}
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/o-nas#hodowla"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] active:bg-white/[0.22] backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-sm"
                >
                  <span>{lang === "PL" ? "Poznaj naszą hodowlę w O nas" : "Meet our cattery in About"}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                </Link>
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
                  <>Przebadane <span className="text-zinc-400 font-normal">i gotowe na Ciebie.</span></>
                ) : (
                  <>Tested <span className="text-zinc-400 font-normal">and ready for you.</span></>
                )}
              </h3>
              <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed font-light mb-3">
                {lang === "PL"
                  ? "Każdy kociak opuszcza hodowlę z książeczką zdrowia, kompletem szczepień, mikroczipem i rodowodem FPL/FIFe. Rodzice są regularnie badani (echo serca Doppler, testy DNA)."
                  : "Every kitten leaves with health book, vaccinations, microchip, and FPL/FIFe pedigree. Parents tested for HCM (Doppler echo) and genetic DNA panels."}
              </p>
              {/* Kwadrat iPhone Glass na mobile */}
              <div className="p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center gap-4 mb-2.5">
                <span className="text-3xl sm:text-4xl font-heading font-extralight text-white leading-none tracking-tight shrink-0 drop-shadow-sm">
                  100+
                </span>
                <div className="border-l border-white/20 pl-3.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-200 leading-tight block mb-0.5 font-medium">
                    {lang === "PL" ? "Szczęśliwych domów w Polsce" : "Happy homes across Poland"}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-light block">
                    {lang === "PL" ? "Dożywotnie wsparcie hodowcy" : "Lifelong breeder support"}
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/baza-wiedzy#zdrowie"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] active:bg-white/[0.22] backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white transition-all cursor-pointer pointer-events-auto shadow-sm"
                >
                  <span>{lang === "PL" ? "Zobacz badania w Bazie Wiedzy" : "See health tests in Knowledge Base"}</span>
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                </Link>
              </div>
            </div>

          </div>

          {/* C. AUTENTYCZNY IPHONE 16 PRO (Wypełnia ekran na telefonie bez pustki u góry) */}
          <div
            ref={mobilePhoneWrapRef}
            className="w-full will-change-transform relative px-0 pb-1 z-20"
            style={{ transform: "translate3d(0, -70px, 0) scale(1.05)" }}
          >
            <div className="relative mx-auto w-full max-w-[390px] p-[6px] rounded-[26px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)]">
              <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-black">
                <video
                  ref={mobileVideoRef}
                  src={!isDesktopDevice ? "/video/film2.mp4" : undefined}
                  poster="/images/gallery/wybieg/wybieg_001.webp"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="none"
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover scale-[1.04] pointer-events-none select-none"
                />
                
                {/* Dynamic Island */}
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-2.5 h-8 bg-black rounded-full z-20 flex items-center justify-center border border-white/10 shadow-sm pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a1224] border border-blue-500/20" />
                </div>

                {/* Subtelny odblask szkła ekranu */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* D. SUBTELNE WSKAŹNIKI POSTĘPU APPLE (kolorowe jak w hodowcy) */}
          <div className="w-full flex items-center justify-center gap-2 pt-1 pb-1 z-20">
            <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={mobileBar1Ref}
                className="h-full bg-amber-400 will-change-transform"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={mobileBar2Ref}
                className="h-full bg-blue-400 will-change-transform"
                style={{ width: "0%" }}
              />
            </div>
            <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={mobileBar3Ref}
                className="h-full bg-emerald-400 will-change-transform"
                style={{ width: "0%" }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
