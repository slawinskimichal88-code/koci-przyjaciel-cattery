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

  // Warstwy tekstowe Apple (Czysta typografia — ZERO kwadratów, ZERO ramek, ZERO kart)
  const introRef = useRef<HTMLDivElement>(null);
  const textBlock1Ref = useRef<HTMLDivElement>(null);
  const textBlock2Ref = useRef<HTMLDivElement>(null);
  const textBlock3Ref = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

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
      if (p < inStart) return 36;
      if (p < inEnd) {
        const t = (p - inStart) / (inEnd - inStart);
        return lerp(36, 0, t * t * (3 - 2 * t));
      }
      if (p < outStart) return 0;
      if (p < outEnd) {
        const t = (p - outStart) / (outEnd - outStart);
        return lerp(0, -28, t * t * (3 - 2 * t));
      }
      return -28;
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

      // ── 1. RUCH TELEFONU APPLE (iPhone 16 Pro) ZE ŚRODKA NA PRAWO ────
      const phoneWrap = phoneWrapperRef.current;
      if (phoneWrap) {
        if (isDesktop) {
          // P=0 -> 0.06: Telefon idealnie na środku ekranu (offset = -23.5vw, powiększony scale=1.12)
          // P=0.06 -> 0.22: Płynny, kinowy ruch w prawo do pozycji 0vw (dock w prawej kolumnie)
          // P=0.22 -> 1.00: Telefon stabilnie przypięty w prawej kolumnie
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
          // Mobile: Telefon u góry ekranu
          const t = Math.min(1, p / 0.22);
          const translateY = lerp(0, -25, t);
          const scale = lerp(1.0, 0.96, t);
          phoneWrap.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        }
      }

      // ── 2. INTRO TYTUŁ (Umieszczony wysoko u góry, wygasza się przy scrollu) ──
      const intro = introRef.current;
      if (intro) {
        let op = 1;
        let ty = 0;
        if (p > 0.03) {
          const t = Math.min(1, (p - 0.03) / 0.14);
          op = 1 - t;
          ty = -t * 35;
        }
        intro.style.opacity = String(op);
        intro.style.transform = `translate3d(0, ${ty}px, 0)`;
        intro.style.pointerEvents = op > 0.1 ? "auto" : "none";
      }

      // ── 3. CECHA 01: ZEWNĘTRZNY WYBIEG ─────────────────────────────
      // Wejście od razu po przesunięciu telefonu, szerokie okno pełnej jasności
      const b1 = textBlock1Ref.current;
      if (b1) {
        const op = smoothFade(p, 0.16, 0.23, 0.44, 0.49);
        const ty = smoothTranslateY(p, 0.16, 0.23, 0.44, 0.49);
        b1.style.opacity = String(op);
        b1.style.transform = `translate3d(0, ${ty}px, 0)`;
        b1.style.pointerEvents = op > 0.3 ? "auto" : "none";
      }

      // ── 4. CECHA 02: ŚWIEŻE POWIETRZE (365 DNI) ───────────────────
      const b2 = textBlock2Ref.current;
      if (b2) {
        const op = smoothFade(p, 0.48, 0.54, 0.72, 0.77);
        const ty = smoothTranslateY(p, 0.48, 0.54, 0.72, 0.77);
        b2.style.opacity = String(op);
        b2.style.transform = `translate3d(0, ${ty}px, 0)`;
        b2.style.pointerEvents = op > 0.3 ? "auto" : "none";
      }

      // ── 5. CECHA 03: PANCERNA SIATKA & ZERO KLATEK (100%) ─────────
      const b3 = textBlock3Ref.current;
      if (b3) {
        const op = smoothFade(p, 0.76, 0.82, 0.98, 1.0);
        const ty = smoothTranslateY(p, 0.76, 0.82, 0.98, 1.0);
        b3.style.opacity = String(op);
        b3.style.transform = `translate3d(0, ${ty}px, 0)`;
        b3.style.pointerEvents = op > 0.3 ? "auto" : "none";
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
      style={{ height: "400vh" }} // Zapewnia płynną, kinową podróż
    >
      {/* ── STICKY VIEWPORT CONTAINER ──────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Subtelne oświetlenie ambientowe Apple (bez ostrych krawędzi) */}
        <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

        {/* ── STAGE 0: TYTUŁ OTWIERAJĄCY (Czysty Apple, u góry z bezpiecznym marginesem) ── */}
        <div
          ref={introRef}
          className="absolute top-8 sm:top-12 lg:top-14 left-1/2 -translate-x-1/2 z-30 text-center w-full max-w-3xl px-6 pointer-events-none will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-ui uppercase tracking-[0.25em] text-white/90 font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {lang === "PL" ? "Jak żyją nasze koty" : "How our cats live"}
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light text-white tracking-tight leading-[1.04]">
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

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-ui uppercase tracking-[0.25em] text-[#86868b]">
            <span>{lang === "PL" ? "Przewiń, aby zobaczyć więcej" : "Scroll to explore"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#86868b] animate-bounce" />
          </div>
        </div>

        {/* ── GŁÓWNA SCENA SCROLLYTELLINGU APPLE (2 Kolumny z bezpiecznym marginesem) ── */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 h-full flex flex-col lg:flex-row items-center justify-between relative z-10">

          {/* ── LEWA KOLUMNA: CZYSTA TYPOGRAFIA APPLE (ZERO KWADRATÓW, ZERO RAMEK) ── */}
          <div className="w-full lg:w-[44%] max-w-[500px] z-20 relative h-[440px] flex items-center">

            {/* 01. WYBIEG OGRODOWY */}
            <div
              ref={textBlock1Ref}
              className="opacity-0 will-change-transform space-y-6 absolute top-1/2 -translate-y-1/2 left-0 w-full"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium mb-3">
                  01 / {lang === "PL" ? "OGRÓD I WYBIEG" : "GARDEN & OUTDOOR RUN"}
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white leading-[1.08] tracking-tight">
                  {lang === "PL" ? (
                    <>
                      Wychodzą na<br />
                      <span className="text-[#86868b]">dwór kiedy chcą.</span>
                    </>
                  ) : (
                    <>
                      They go outside<br />
                      <span className="text-[#86868b]">whenever they want.</span>
                    </>
                  )}
                </h3>
              </div>

              <p className="text-base sm:text-lg font-body text-[#ceced2] leading-relaxed font-light">
                {lang === "PL"
                  ? "Koty mają dostęp do bezpiecznego ogrodu i wybiegu przez cały rok. Mogą oddychać świeżym powietrzem, obserwować ptaki i biegać, kiedy tylko mają na to ochotę."
                  : "Our cats have access to a safe garden and outdoor run all year round. They can breathe fresh air, watch birds and run whenever they feel like it."}
              </p>

              <div className="pt-6 border-t border-white/10">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extralight text-white leading-none tracking-tight mb-2">
                  365 dni
                </div>
                <p className="text-xs font-ui uppercase tracking-[0.25em] text-[#86868b]">
                  {lang === "PL" ? "Dostęp do ogrodu przez cały rok" : "Year-round garden access"}
                </p>
              </div>
            </div>

            {/* 02. ŻYCIE W DOMU */}
            <div
              ref={textBlock2Ref}
              className="opacity-0 will-change-transform space-y-6 absolute top-1/2 -translate-y-1/2 left-0 w-full"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium mb-3">
                  02 / {lang === "PL" ? "ŻYCIE W DOMU" : "HOME LIFE"}
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white leading-[1.08] tracking-tight">
                  {lang === "PL" ? (
                    <>
                      Śpią w łóżku,<br />
                      <span className="text-[#86868b]">bawią się w salonie.</span>
                    </>
                  ) : (
                    <>
                      Sleep in bed,<br />
                      <span className="text-[#86868b]">play in the living room.</span>
                    </>
                  )}
                </h3>
              </div>

              <p className="text-base sm:text-lg font-body text-[#ceced2] leading-relaxed font-light">
                {lang === "PL"
                  ? "Nasze koty są częścią naszej rodziny. Siedzą na kanapie, śpią w łóżkach i towarzyszą nam przy codziennych czynnościach. Dzięki temu kociaki wyrastają na spokojne, przyjazne koty, które świetnie odnajdują się w nowym domu."
                  : "Our cats are part of our family. They sit on the sofa, sleep in beds and join us in daily activities. This is why kittens grow up to be calm, friendly cats that settle well in a new home."}
              </p>

              {/* Apple Spec Metric */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extralight text-white leading-none tracking-tight mb-2">
                  100%
                </div>
                <p className="text-xs font-ui uppercase tracking-[0.25em] text-[#86868b]">
                  {lang === "PL" ? "Kociaków wychowywanych razem z rodziną" : "Kittens raised as part of the family"}
                </p>
              </div>
            </div>

            {/* 03. ZDROWE OD URODZENIA */}
            <div
              ref={textBlock3Ref}
              className="opacity-0 will-change-transform space-y-6 absolute top-1/2 -translate-y-1/2 left-0 w-full"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium mb-3">
                  03 / {lang === "PL" ? "ZDROWE OD URODZENIA" : "HEALTHY FROM BIRTH"}
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light text-white leading-[1.08] tracking-tight">
                  {lang === "PL" ? (
                    <>
                      Przebadane<br />
                      <span className="text-[#86868b]">i gotowe na Ciebie.</span>
                    </>
                  ) : (
                    <>
                      Tested<br />
                      <span className="text-[#86868b]">and ready for you.</span>
                    </>
                  )}
                </h3>
              </div>

              <p className="text-base sm:text-lg font-body text-[#ceced2] leading-relaxed font-light">
                {lang === "PL"
                  ? "Każdy kociak odchodzi z hodowli z książeczką zdrowia, szczepieniami i dokumentami potwierdzającymi, że jego rodzice są zdrowi — w tym badaniami serca i testami genetycznymi."
                  : "Every kitten leaves with a health book, vaccinations and documents confirming that its parents are healthy — including heart checks and genetic tests."}
              </p>

              {/* Apple Spec Metric */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extralight text-white leading-none tracking-tight mb-2">
                  100+
                </div>
                <p className="text-xs font-ui uppercase tracking-[0.25em] text-[#86868b]">
                  {lang === "PL" ? "Szczęśliwych domów w całej Polsce" : "Happy homes across Poland"}
                </p>
              </div>
            </div>

          </div>

          {/* ── PRAWA KOLUMNA: AUTENTYCZNA OBUDOWA IPHONE 16 PRO (Przesuwa się na prawo) ── */}
          <div className="w-full lg:w-[52%] max-w-[720px] z-10 flex justify-center lg:justify-end">
            <div
              ref={phoneWrapperRef}
              className="w-full will-change-transform transition-transform duration-75 ease-out relative"
            >
              {/* Obudowa iPhone 16 Pro (Tytanowa ramka, zaokrąglone narożniki, Dynamic Island) */}
              <div className="relative mx-auto w-full max-w-[680px] p-[8px] sm:p-[10px] rounded-[36px] sm:rounded-[44px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.1)]">
                
                {/* Wewnętrzna krawędź ekranu Super Retina XDR */}
                <div className="relative w-full aspect-[16/9] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black">
                  
                  {/* Wideo w pętli bez kontrolek */}
                  <video
                    ref={videoRef}
                    src="/video/film2.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Dynamic Island (Po lewej stronie w widoku poziomym) */}
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-11 bg-black rounded-full z-20 flex items-center justify-center border border-white/10 shadow-sm pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-[#0a1224] border border-blue-500/20" />
                  </div>

                  {/* Dyskretny przełącznik wyciszenia w rogu ekranu */}
                  <div className="absolute bottom-4 right-4 z-30">
                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:scale-105 transition-all cursor-pointer"
                      title={isMuted ? "Włącz dźwięk" : "Wycisz"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  </div>

                  {/* Szklany odblask ekranu Apple (specular highlight) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── DOLNY SEGMENTOWY WSKAŹNIK POSTĘPU APPLE (3 segmenty jak na apple.com) ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {[1, 2, 3].map((step) => {
            // Oblicz postęp każdego segmentu od 0 do 100%
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
                className="w-16 sm:w-24 h-[2px] bg-white/20 rounded-full overflow-hidden"
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
