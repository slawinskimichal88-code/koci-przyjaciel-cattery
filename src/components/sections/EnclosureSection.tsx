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
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Warstwy tekstowe Apple (Desktop)
  const introRef = useRef<HTMLDivElement>(null);
  const textBlock1Ref = useRef<HTMLDivElement>(null);
  const textBlock2Ref = useRef<HTMLDivElement>(null);
  const textBlock3Ref = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [sectionHeight, setSectionHeight] = useState<string>("400vh");

  const stories = [
    {
      step: "01",
      tabTitle: lang === "PL" ? "01 Wybieg" : "01 Outdoor",
      category: lang === "PL" ? "01 / OGRÓD I WYBIEG" : "01 / GARDEN & RUN",
      accentText: "text-amber-400",
      accentBg: "bg-amber-400/10 border-amber-400/20",
      title: lang === "PL" ? (
        <>Wychodzą na <span className="text-[#86868b]">dwór kiedy chcą.</span></>
      ) : (
        <>They go outside <span className="text-[#86868b]">whenever they want.</span></>
      ),
      desc: lang === "PL"
        ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego. Oddychają świeżym powietrzem, obserwują ptaki i biegają na wolności bez klatek."
        : "Cats have year-round access to a safe, covered garden run. They breathe fresh air, watch birds, and roam freely without cages.",
      statValue: "365 dni",
      statLabel: lang === "PL" ? "Całoroczny dostęp do ogrodu" : "Year-round outdoor access",
      features: lang === "PL"
        ? ["🌿 Atestowana siatka", "🌳 Dębowe pnie 3.2m", "❄️ Całoroczny wybieg"]
        : ["🌿 Certified mesh", "🌳 3.2m oak trunks", "❄️ Year-round run"]
    },
    {
      step: "02",
      tabTitle: lang === "PL" ? "02 Dom" : "02 Family",
      category: lang === "PL" ? "02 / ŻYCIE W DOMU" : "02 / HOME LIFE",
      accentText: "text-emerald-400",
      accentBg: "bg-emerald-400/10 border-emerald-400/20",
      title: lang === "PL" ? (
        <>Śpią w łóżku, <span className="text-[#86868b]">bawią się w salonie.</span></>
      ) : (
        <>Sleep in bed, <span className="text-[#86868b]">play in the living room.</span></>
      ),
      desc: lang === "PL"
        ? "Nasze koty są częścią rodziny. Żyją z nami na co dzień, śpią na łóżkach, bawią się z dziećmi i psem. Dzięki temu kocięta opuszczają hodowlę w pełni zsocjalizowane, ufne i odważne."
        : "Our cats are part of our family. They live with us every day, sleep in beds, and play with kids and our dog. Kittens leave confident, trusting, and fully socialized.",
      statValue: "100%",
      statLabel: lang === "PL" ? "Kociaków z rodziną i dziećmi" : "Raised with family & kids",
      features: lang === "PL"
        ? ["🏠 Bez klatek i boksów", "🐕 Kontakt z dziećmi i psem", "✨ Ufny i łagodny charakter"]
        : ["🏠 No cages or boxes", "🐕 Dogs & children exposure", "✨ Calm & loving nature"]
    },
    {
      step: "03",
      tabTitle: lang === "PL" ? "03 Zdrowie" : "03 Health",
      category: lang === "PL" ? "03 / ZDROWE OD URODZENIA" : "03 / HEALTHY FROM BIRTH",
      accentText: "text-blue-400",
      accentBg: "bg-blue-400/10 border-blue-400/20",
      title: lang === "PL" ? (
        <>Przebadane <span className="text-[#86868b]">i gotowe na Ciebie.</span></>
      ) : (
        <>Tested <span className="text-[#86868b]">and ready for you.</span></>
      ),
      desc: lang === "PL"
        ? "Każdy kociak odchodzi z hodowli z książeczką zdrowia, kompletem szczepień, mikroczipem i rodowodem FPL/FIFe. Rodzice są regularnie badani (echo serca Doppler, PKD, testy DNA)."
        : "Every kitten leaves with a health book, vaccinations, microchip, and FPL/FIFe pedigree. Parents tested for HCM (Doppler echo), PKD, and genetic DNA panels.",
      statValue: "100+",
      statLabel: lang === "PL" ? "Szczęśliwych domów w Polsce" : "Happy families across Poland",
      features: lang === "PL"
        ? ["❤️ Echo serca Doppler (HCM)", "🧬 Testy genetyczne N/N", "📜 5-pokoleniowy rodowód"]
        : ["❤️ Doppler Echo (HCM)", "🧬 DNA panels N/N", "📜 5-generation pedigree"]
    }
  ];

  useEffect(() => {
    const updateHeight = () =>
      setSectionHeight(window.innerWidth < 1024 ? "250vh" : "400vh");
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) videoRef.current.muted = nextMuted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * Math.max(0, Math.min(1, t));

    // Płynny fade z funkcją wygładzania (smoothstep) dla desktopu
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
      outEnd: number
    ) => {
      const initialY = 36;
      const outY = -28;
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

      if (isDesktop) {
        // ── DESKTOP: RUCH TELEFONU ZE ŚRODKA NA PRAWO (IDEALNY EFEKT CHROME) ──
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
      } else {
        // ── MOBILE: SYNCHRONIZACJA ZAKŁADEK PRZY PRZEWIJANIU ──
        if (p < 0.35) {
          setActiveMobileIndex(0);
        } else if (p < 0.70) {
          setActiveMobileIndex(1);
        } else {
          setActiveMobileIndex(2);
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
    };
  }, []);

  const currentStory = stories[activeMobileIndex] || stories[0];

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

          {/* Układ 2-kolumnowy desktop */}
          <div className="w-full max-w-[1440px] mx-auto px-12 lg:px-16 h-full flex flex-row items-center justify-between relative z-10">
            
            {/* Lewa kolumna: teksty desktop */}
            <div className="w-[44%] max-w-[500px] z-20 relative h-[440px] flex items-center">
              
              {/* 01. Wybieg */}
              <div
                ref={textBlock1Ref}
                className="opacity-0 will-change-transform space-y-4 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold mb-2">
                    01 / {lang === "PL" ? "OGRÓD I WYBIEG" : "GARDEN & OUTDOOR RUN"}
                  </p>
                  <h3 className="text-5xl font-heading font-light text-white leading-tight tracking-tight">
                    {lang === "PL" ? (
                      <>Wychodzą na<br /> <span className="text-[#86868b]">dwór kiedy chcą.</span></>
                    ) : (
                      <>They go outside<br /> <span className="text-[#86868b]">whenever they want.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-lg font-body text-[#ceced2] leading-relaxed font-light">
                  {lang === "PL"
                    ? "Koty mają dostęp do bezpiecznego ogrodu i wybiegu przez cały rok. Mogą oddychać świeżym powietrzem, obserwować ptaki i biegać, kiedy tylko mają na to ochotę."
                    : "Our cats have access to a safe garden and outdoor run all year round. They can breathe fresh air, watch birds and run whenever they feel like it."}
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div className="text-7xl font-heading font-extralight text-white leading-none tracking-tight">
                    365 dni
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] text-right">
                    {lang === "PL" ? "Dostęp do ogrodu przez cały rok" : "Year-round garden access"}
                  </p>
                </div>
              </div>

              {/* 02. Dom */}
              <div
                ref={textBlock2Ref}
                className="opacity-0 will-change-transform space-y-4 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-2">
                    02 / {lang === "PL" ? "ŻYCIE W DOMU" : "HOME LIFE"}
                  </p>
                  <h3 className="text-5xl font-heading font-light text-white leading-tight tracking-tight">
                    {lang === "PL" ? (
                      <>Śpią w łóżku,<br /> <span className="text-[#86868b]">bawią się w salonie.</span></>
                    ) : (
                      <>Sleep in bed,<br /> <span className="text-[#86868b]">play in the living room.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-lg font-body text-[#ceced2] leading-relaxed font-light">
                  {lang === "PL"
                    ? "Nasze koty są częścią naszej rodziny. Siedzą na kanapie, śpią w łóżkach i towarzyszą nam przy codziennych czynnościach. Dzięki temu kociaki wyrastają na spokojne i przyjazne koty."
                    : "Our cats are part of our family. They sit on the sofa, sleep in beds and join us in daily activities. This is why kittens grow up to be calm, friendly cats."}
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div className="text-7xl font-heading font-extralight text-white leading-none tracking-tight">
                    100%
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] text-right">
                    {lang === "PL" ? "Kociaków z rodziną" : "Raised with family"}
                  </p>
                </div>
              </div>

              {/* 03. Zdrowie */}
              <div
                ref={textBlock3Ref}
                className="opacity-0 will-change-transform space-y-4 absolute top-1/2 -translate-y-1/2 left-0 w-full"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold mb-2">
                    03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
                  </p>
                  <h3 className="text-5xl font-heading font-light text-white leading-tight tracking-tight">
                    {lang === "PL" ? (
                      <>Przebadane<br /> <span className="text-[#86868b]">i gotowe na Ciebie.</span></>
                    ) : (
                      <>Tested<br /> <span className="text-[#86868b]">and ready for you.</span></>
                    )}
                  </h3>
                </div>
                <p className="text-lg font-body text-[#ceced2] leading-relaxed font-light">
                  {lang === "PL"
                    ? "Każdy kociak odchodzi z hodowli z książeczką zdrowia, szczepieniami i dokumentami potwierdzającymi, że jego rodzice są zdrowi — w tym badaniami serca i testami genetycznymi."
                    : "Every kitten leaves with a health book, vaccinations and documents confirming that its parents are healthy — including heart checks and genetic tests."}
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div className="text-7xl font-heading font-extralight text-white leading-none tracking-tight">
                    100+
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] text-right">
                    {lang === "PL" ? "Szczęśliwych domów" : "Happy homes across Poland"}
                  </p>
                </div>
              </div>

            </div>

            {/* Prawa kolumna: obudowa iPhone 16 Pro desktop */}
            <div className="w-[52%] max-w-[720px] z-10 flex justify-end">
              <div
                ref={phoneWrapperRef}
                className="w-full will-change-transform transition-transform duration-75 ease-out relative flex justify-center"
              >
                <div className="relative mx-auto w-full max-w-[680px] p-[10px] rounded-[44px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.12)]">
                  <div className="relative w-full aspect-[16/9] rounded-[36px] overflow-hidden bg-black">
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
                <div key={step} className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, fillPercent))}%` }}
                  />
                </div>
              );
            })}
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:hidden flex flex-col justify-between w-full h-full px-4 relative z-10 max-w-md mx-auto"
          style={{ paddingTop: "76px", paddingBottom: "22px" }}
        >
          
          {/* ① Header sekcji z eleganckim badgem */}
          <div className="text-center w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono uppercase tracking-[0.25em] text-white/90 font-medium mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
            </div>
            <h2 className="text-2xl font-heading font-light text-white tracking-tight leading-tight">
              {lang === "PL" ? (
                <>Nasz dom <span className="font-normal text-[#86868b]">to ich dom.</span></>
              ) : (
                <>Our home <span className="font-normal text-[#86868b]">is their home.</span></>
              )}
            </h2>
          </div>

          {/* ② Autentyczny iPhone 16 Pro z filmem wybiegu (Zero obcinania, zero tekstu na filmie!) */}
          <div className="w-full relative px-1">
            <div className="relative mx-auto w-full max-w-[340px] p-[5px] rounded-[24px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12)]">
              <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-black">
                <video
                  ref={mobileVideoRef}
                  src="/video/film2.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
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
                    className="w-7 h-7 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 active:scale-95 transition-all"
                    title={isMuted ? "Włącz dźwięk" : "Wycisz"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                </div>

                {/* Odblask ekranu Apple */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ③ Segmentowe przełączniki zakładek Apple (Tabs) */}
          <div className="w-full flex items-center justify-between gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
            {stories.map((story, idx) => {
              const isActive = activeMobileIndex === idx;
              return (
                <button
                  key={story.step}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all duration-300 text-center cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-md"
                      : "text-[#86868b] hover:text-white"
                  }`}
                >
                  {story.tabTitle}
                </button>
              );
            })}
          </div>

          {/* ④ Karta opowieści Apple ze szkła mrożonego (Wypełnia dół ekranu, ZERO czarnego tła!) */}
          <div
            className="w-full rounded-2xl border border-white/10 p-3.5 sm:p-4 shadow-2xl space-y-2"
            style={{ backgroundColor: "rgba(24, 24, 27, 0.88)", backdropFilter: "blur(20px)" }}
          >
            
            {/* Kategoria i nagłówek */}
            <div>
              <p className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold mb-0.5 ${currentStory.accentText}`}>
                {currentStory.category}
              </p>
              <h3 className="text-lg sm:text-xl font-heading font-light text-white leading-tight">
                {currentStory.title}
              </h3>
            </div>

            {/* Opis merytoryczny */}
            <p className="text-xs font-body text-[#ceced2] leading-relaxed font-light line-clamp-3">
              {currentStory.desc}
            </p>

            {/* Karta z dużą liczbą Apple */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-heading font-extralight text-white leading-none tracking-tight">
                {currentStory.statValue}
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#86868b] text-right max-w-[160px]">
                {currentStory.statLabel}
              </p>
            </div>

            {/* Pigułki z atestami i unikalnymi cechami hodowli */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {currentStory.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300"
                >
                  {feat}
                </span>
              ))}
            </div>

          </div>

          {/* ⑤ Segmentowy wskaźnik postępu Apple na dole */}
          <div className="flex items-center justify-center gap-2">
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMobileIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  activeMobileIndex === idx ? "w-8 bg-white" : "w-4 bg-white/20"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
