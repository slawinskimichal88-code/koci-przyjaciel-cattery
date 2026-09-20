"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

interface EnclosureSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: (kittenName?: string) => void;
}

export default function EnclosureSection({
  lang = "PL",
}: EnclosureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Warstwy tekstowe Apple
  const introRef = useRef<HTMLDivElement>(null);
  const mobileHintRef = useRef<HTMLDivElement>(null);
  const textBlock1Ref = useRef<HTMLDivElement>(null);
  const textBlock2Ref = useRef<HTMLDivElement>(null);
  const textBlock3Ref = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [sectionHeight, setSectionHeight] = useState<string>("400vh");

  useEffect(() => {
    const updateHeight = () =>
      setSectionHeight(window.innerWidth < 1024 ? "300vh" : "400vh");
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.max(0, Math.min(1, t));

    // Płynny fade z funkcją wygładzania (smoothstep)
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

    // Płynne przesunięcie w pionie (Apple float-in)
    const smoothTranslateY = (
      p: number,
      inStart: number,
      inEnd: number,
      outStart: number,
      outEnd: number
    ) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
      const initialY = isMobile ? 18 : 36;
      const outY = isMobile ? -14 : -28;
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
      setScrollProgress(p);

      const isDesktop = window.innerWidth >= 1024;

      // ── 1. RUCH TELEFONU APPLE (iPhone 16 Pro) ──────────────────────
      const phoneWrap = phoneWrapperRef.current;
      if (phoneWrap) {
        if (isDesktop) {
          // Desktop: ze środka na prawo (efekt, który na Chrome jest idealny)
          let offsetX = -23.5;
          let scale = 1.12;

          if (p <= 0.06) {
            offsetX = -23.5;
            scale = 1.12;
          } else if (p <= 0.22) {
            const t = (p - 0.06) / 0.16;
            const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
            offsetX = lerp(-23.5, 0, ease);
            scale = lerp(1.12, 1.0, ease);
          } else {
            offsetX = 0;
            scale = 1.0;
          }

          phoneWrap.style.transform = `translate3d(${offsetX}vw, 0, 0) scale(${scale})`;
        } else {
          // Mobile: Telefon startuje w idealnym centrum pionowym (pod tytułem, nad wskazówką),
          // po scrollu płynnie unosi się do góry, ustępując miejsca kolejnym cechom
          const winH = window.innerHeight;
          const targetCenter = Math.max(180, Math.round(winH / 2 - 140));
          let offsetY = targetCenter;
          let scale = 1.04;

          if (p <= 0.04) {
            offsetY = targetCenter;
            scale = 1.04;
          } else if (p <= 0.20) {
            const t = (p - 0.04) / 0.16;
            const ease = 1 - Math.pow(1 - t, 3);
            offsetY = lerp(targetCenter, 0, ease);
            scale = lerp(1.04, 1.0, ease);
          } else {
            offsetY = 0;
            scale = 1.0;
          }

          phoneWrap.style.transform = `translate3d(0, ${offsetY}px, 0) scale(${scale})`;
        }
      }

      // ── 2. INTRO TYTUŁ ORAZ WSKAZÓWKA (Wygaszają się płynnie przy scrollu) ──
      const intro = introRef.current;
      const mobileHint = mobileHintRef.current;
      let op = 1;
      let ty = 0;
      if (p > 0.04) {
        const t = Math.min(1, (p - 0.04) / 0.14);
        op = 1 - t;
        ty = isDesktop ? -t * 35 : -t * 15;
      }
      if (intro) {
        intro.style.opacity = String(op);
        intro.style.transform = `translate3d(0, ${ty}px, 0)`;
        intro.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }
      if (mobileHint) {
        mobileHint.style.opacity = String(op);
        mobileHint.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // ── 3. CECHA 01: ZEWNĘTRZNY WYBIEG ─────────────────────────────
      const b1 = textBlock1Ref.current;
      if (b1) {
        const b1Op = smoothFade(p, 0.16, 0.23, 0.44, 0.49);
        const b1Ty = smoothTranslateY(p, 0.16, 0.23, 0.44, 0.49);
        b1.style.opacity = String(b1Op);
        b1.style.transform = `translate3d(0, ${b1Ty}px, 0)`;
        b1.style.pointerEvents = b1Op > 0.3 ? "auto" : "none";
      }

      // ── 4. CECHA 02: ŚWIEŻE POWIETRZE (365 DNI) ───────────────────
      const b2 = textBlock2Ref.current;
      if (b2) {
        const b2Op = smoothFade(p, 0.48, 0.54, 0.72, 0.77);
        const b2Ty = smoothTranslateY(p, 0.48, 0.54, 0.72, 0.77);
        b2.style.opacity = String(b2Op);
        b2.style.transform = `translate3d(0, ${b2Ty}px, 0)`;
        b2.style.pointerEvents = b2Op > 0.3 ? "auto" : "none";
      }

      // ── 5. CECHA 03: PANCERNA SIATKA & ZERO KLATEK (100%) ─────────
      const b3 = textBlock3Ref.current;
      if (b3) {
        const b3Op = smoothFade(p, 0.76, 0.82, 0.98, 1.0);
        const b3Ty = smoothTranslateY(p, 0.76, 0.82, 0.98, 1.0);
        b3.style.opacity = String(b3Op);
        b3.style.transform = `translate3d(0, ${b3Ty}px, 0)`;
        b3.style.pointerEvents = b3Op > 0.3 ? "auto" : "none";
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Ambientowe oświetlenie Apple */}
        <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

        {/* ── STAGE 0: TYTUŁ OTWIERAJĄCY (U góry ekranu, zero kontaktu z filmem) ── */}
        <div
          ref={introRef}
          className="absolute top-14 sm:top-14 lg:top-14 left-1/2 -translate-x-1/2 z-30 text-center w-full max-w-3xl px-5 pointer-events-none will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/90 font-medium mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
          </div>
          <h2 className="text-xl sm:text-4xl lg:text-6xl font-heading font-light text-white tracking-tight leading-[1.05]">
            {lang === "PL" ? (
              <>
                Nasz dom<br />
                <span className="font-normal text-[#86868b]">
                  to ich dom.
                </span>
              </>
            ) : (
              <>
                Our home<br />
                <span className="font-normal text-[#86868b]">
                  is their home.
                </span>
              </>
            )}
          </h2>

          {/* Desktopowa wskazówka przewijania pod tytułem */}
          <div className="hidden lg:flex mt-3 items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b]">
            <span>{lang === "PL" ? "Przewiń, aby zobaczyć więcej" : "Scroll to explore"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#86868b] animate-bounce" />
          </div>
        </div>

        {/* ── STAGE 0: WSKAZÓWKA MOBILNA (Na dole ekranu, pod telefonem, bez zasłaniania wideo) ── */}
        <div
          ref={mobileHintRef}
          className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-[#86868b] pointer-events-none will-change-transform"
        >
          <span>{lang === "PL" ? "Przewiń, aby poznać" : "Scroll to explore"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#86868b] animate-bounce" />
        </div>

        {/* ── GŁÓWNA SCENA SCROLLYTELLINGU APPLE ── */}
        {/* Na mobile: flex-col justify-start z gwarantowanym padding-top; na desktop: 2 kolumny z justify-between */}
        <div
          className="w-full max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-16 h-full flex flex-col lg:flex-row items-center justify-start lg:justify-between relative z-10 sm:pt-20 lg:pt-0"
          style={{ paddingTop: "76px" }}
        >

          {/* ── TELEFON IPHONE 16 PRO (Na mobile: order-1 u góry; na desktop: order-2 po prawej) ── */}
          <div className="order-1 lg:order-2 w-full lg:w-[52%] max-w-[720px] z-10 flex justify-center lg:justify-end">
            <div
              ref={phoneWrapperRef}
              className="w-full will-change-transform transition-transform duration-75 ease-out relative flex justify-center"
            >
              {/* Obudowa iPhone 16 Pro */}
              <div className="relative mx-auto w-full max-w-[350px] sm:max-w-[460px] lg:max-w-[680px] p-[6px] sm:p-[10px] rounded-[26px] sm:rounded-[44px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.12)]">
                
                {/* Ekran Super Retina XDR */}
                <div className="relative w-full aspect-[16/9] rounded-[20px] sm:rounded-[36px] overflow-hidden bg-black">
                  
                  {/* Wideo wybiegu z delikatnym scale eliminującym ewentualny letterboxing */}
                  <video
                    ref={videoRef}
                    src="/video/film2.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover pointer-events-none scale-[1.05]"
                  />

                  {/* Dynamic Island */}
                  <div className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-9 sm:h-11 bg-black rounded-full z-20 flex items-center justify-center border border-white/10 shadow-sm pointer-events-none">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0a1224] border border-blue-500/20" />
                  </div>

                  {/* Przełącznik dźwięku */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30">
                    <button
                      onClick={toggleMute}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:scale-105 transition-all cursor-pointer"
                      title={isMuted ? "Włącz dźwięk" : "Wycisz"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  </div>

                  {/* Szklany odblask ekranu Apple */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ── CECHY: TEKSTY (Na mobile: order-2 bezpośrednio pod telefonem; na desktop: order-1 po lewej) ── */}
          <div
            className="order-2 lg:order-1 w-full lg:w-[44%] max-w-[500px] z-20 relative mt-4 sm:mt-6 lg:mt-0 flex items-center"
            style={{ minHeight: "260px" }}
          >

            {/* 01. WYBIEG OGRODOWY */}
            <div
              ref={textBlock1Ref}
              className="opacity-0 will-change-transform space-y-2 sm:space-y-4 absolute top-0 lg:top-1/2 lg:-translate-y-1/2 left-0 w-full"
            >
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] text-amber-400 font-semibold mb-1 sm:mb-2">
                  01 / {lang === "PL" ? "OGRÓD I WYBIEG" : "GARDEN & OUTDOOR RUN"}
                </p>
                <h3 className="text-xl sm:text-3xl lg:text-5xl font-heading font-light text-white leading-tight tracking-tight">
                  {lang === "PL" ? (
                    <>
                      Wychodzą na<br className="hidden sm:inline" />{" "}
                      <span className="text-[#86868b]">dwór kiedy chcą.</span>
                    </>
                  ) : (
                    <>
                      They go outside<br className="hidden sm:inline" />{" "}
                      <span className="text-[#86868b]">whenever they want.</span>
                    </>
                  )}
                </h3>
              </div>

              <p className="text-xs sm:text-base lg:text-lg font-body text-[#ceced2] leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                {lang === "PL"
                  ? "Koty mają dostęp do bezpiecznego ogrodu i wybiegu przez cały rok. Mogą oddychać świeżym powietrzem, obserwować ptaki i biegać, kiedy tylko mają na to ochotę."
                  : "Our cats have access to a safe garden and outdoor run all year round. They can breathe fresh air, watch birds and run whenever they feel like it."}
              </p>

              <div className="mt-2.5 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="text-3xl sm:text-5xl lg:text-7xl font-heading font-extralight text-white leading-none tracking-tight">
                  365 dni
                </div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#86868b] text-right">
                  {lang === "PL" ? "Dostęp do ogrodu przez cały rok" : "Year-round garden access"}
                </p>
              </div>
            </div>

            {/* 02. ŻYCIE W DOMU */}
            <div
              ref={textBlock2Ref}
              className="opacity-0 will-change-transform space-y-2 sm:space-y-4 absolute top-0 lg:top-1/2 lg:-translate-y-1/2 left-0 w-full"
            >
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] text-emerald-400 font-semibold mb-1 sm:mb-2">
                  02 / {lang === "PL" ? "ŻYCIE W DOMU" : "HOME LIFE"}
                </p>
                <h3 className="text-xl sm:text-3xl lg:text-5xl font-heading font-light text-white leading-tight tracking-tight">
                  {lang === "PL" ? (
                    <>
                      Śpią w łóżku,<br className="hidden sm:inline" />{" "}
                      <span className="text-[#86868b]">bawią się w salonie.</span>
                    </>
                  ) : (
                    <>
                      Sleep in bed,<br className="hidden sm:inline" />{" "}
                      <span className="text-[#86868b]">play in the living room.</span>
                    </>
                  )}
                </h3>
              </div>

              <p className="text-xs sm:text-base lg:text-lg font-body text-[#ceced2] leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                {lang === "PL"
                  ? "Nasze koty są częścią naszej rodziny. Siedzą na kanapie, śpią w łóżkach i towarzyszą nam przy codziennych czynnościach. Dzięki temu kociaki wyrastają na spokojne i przyjazne koty."
                  : "Our cats are part of our family. They sit on the sofa, sleep in beds and join us in daily activities. This is why kittens grow up to be calm, friendly cats."}
              </p>

              <div className="mt-2.5 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="text-3xl sm:text-5xl lg:text-7xl font-heading font-extralight text-white leading-none tracking-tight">
                  100%
                </div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#86868b] text-right">
                  {lang === "PL" ? "Kociaków z rodziną" : "Raised with family"}
                </p>
              </div>
            </div>

            {/* 03. ZDROWE OD URODZENIA */}
            <div
              ref={textBlock3Ref}
              className="opacity-0 will-change-transform space-y-2 sm:space-y-4 absolute top-0 lg:top-1/2 lg:-translate-y-1/2 left-0 w-full"
            >
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] text-blue-400 font-semibold mb-1 sm:mb-2">
                  03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
                </p>
                <h3 className="text-xl sm:text-3xl lg:text-5xl font-heading font-light text-white leading-tight tracking-tight">
                  {lang === "PL" ? (
                    <>
                      Przebadane<br className="hidden sm:inline" />{" "}
                      <span className="text-[#86868b]">i gotowe na Ciebie.</span>
                    </>
                  ) : (
                    <>
                      Tested<br className="hidden sm:inline" />{" "}
                      <span className="text-[#86868b]">and ready for you.</span>
                    </>
                  )}
                </h3>
              </div>

              <p className="text-xs sm:text-base lg:text-lg font-body text-[#ceced2] leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                {lang === "PL"
                  ? "Każdy kociak odchodzi z hodowli z książeczką zdrowia, szczepieniami i dokumentami potwierdzającymi, że jego rodzice są zdrowi — w tym badaniami serca i testami genetycznymi."
                  : "Every kitten leaves with a health book, vaccinations and documents confirming that its parents are healthy — including heart checks and genetic tests."}
              </p>

              <div className="mt-2.5 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="text-3xl sm:text-5xl lg:text-7xl font-heading font-extralight text-white leading-none tracking-tight">
                  100+
                </div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#86868b] text-right">
                  {lang === "PL" ? "Szczęśliwych domów" : "Happy homes across Poland"}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ── DOLNY SEGMENTOWY WSKAŹNIK POSTĘPU APPLE ── */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
          {[1, 2, 3].map((step) => {
            let fillPercent = 0;
            if (step === 1) {
              if (scrollProgress >= 0.44) fillPercent = 100;
              else if (scrollProgress >= 0.16) fillPercent = ((scrollProgress - 0.16) / 0.28) * 100;
            } else if (step === 2) {
              if (scrollProgress >= 0.72) fillPercent = 100;
              else if (scrollProgress >= 0.48) fillPercent = ((scrollProgress - 0.48) / 0.24) * 100;
            } else if (step === 3) {
              if (scrollProgress >= 0.98) fillPercent = 100;
              else if (scrollProgress >= 0.76) fillPercent = ((scrollProgress - 0.76) / 0.22) * 100;
            }

            return (
              <div
                key={step}
                className="w-12 sm:w-24 h-[2px] bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-75 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, fillPercent))}%` }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
