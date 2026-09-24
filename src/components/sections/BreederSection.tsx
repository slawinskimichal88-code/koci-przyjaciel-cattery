"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, ArrowRight, Sparkles, Heart, ShieldCheck, Play, Award, Film } from "lucide-react";
import { REAL_PHONE } from "@/data/realCatsData";

interface BreederSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: () => void;
}

export default function BreederSection({
  lang = "PL",
}: BreederSectionProps) {
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

  // Live Subtitle Overlay Ref (pigułka z napisami na wideo)
  const subtitleOverlayRef = useRef<HTMLDivElement>(null);

  // Mobile Refs
  const mobilePhoneWrapRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobileIntroRef = useRef<HTMLDivElement>(null);
  const mobileScene1Ref = useRef<HTMLDivElement>(null);
  const mobileScene2Ref = useRef<HTMLDivElement>(null);
  const mobileScene3Ref = useRef<HTMLDivElement>(null);
  const mobileBar1Ref = useRef<HTMLDivElement>(null);
  const mobileBar2Ref = useRef<HTMLDivElement>(null);
  const mobileBar3Ref = useRef<HTMLDivElement>(null);
  const mobileSubtitleRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isDesktopDevice, setIsDesktopDevice] = useState<boolean>(true);
  const [sectionHeight, setSectionHeight] = useState<string>("380vh");

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (videoRef.current) videoRef.current.muted = nextMuted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const isDesk = window.innerWidth >= 1024;
    setIsDesktopDevice(isDesk);
    setSectionHeight(isDesk ? "380vh" : "290vh");

    const onResize = () => {
      const d = window.innerWidth >= 1024;
      setIsDesktopDevice(d);
      setSectionHeight(d ? "380vh" : "290vh");
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // IntersectionObserver — pauzuj wideo gdy sekcja nie jest na ekranie
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
      initialY = 32,
      outY = -24
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

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      // ── DESKTOP ANIMACJA ──────────────────────────────────────────
      if (window.innerWidth >= 1024) {
        // Intro: w 100% widoczne na starcie (0 do 0.10), zanika przy wejściu do Sceny 1 (0.10 do 0.18)
        if (introRef.current) {
          const op = progress < 0.10 ? 1 : progress > 0.18 ? 0 : 1 - ((progress - 0.10) / 0.08);
          const ty = progress < 0.10 ? 0 : -lerp(0, 25, (progress - 0.10) / 0.08);
          introRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          introRef.current.style.transform = `translateY(${ty}px)`;
          introRef.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // Scena 1: Początki i pasja (0.16 -> 0.44)
        if (textBlock1Ref.current) {
          const op = smoothFade(progress, 0.16, 0.23, 0.38, 0.44);
          const ty = smoothTranslateY(progress, 0.16, 0.23, 0.38, 0.44);
          textBlock1Ref.current.style.opacity = String(op);
          textBlock1Ref.current.style.transform = `translateY(${ty}px)`;
          textBlock1Ref.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // Scena 2: Wybór Maine Coon i linie hodowlane (0.42 -> 0.70)
        if (textBlock2Ref.current) {
          const op = smoothFade(progress, 0.42, 0.49, 0.64, 0.70);
          const ty = smoothTranslateY(progress, 0.42, 0.49, 0.64, 0.70);
          textBlock2Ref.current.style.opacity = String(op);
          textBlock2Ref.current.style.transform = `translateY(${ty}px)`;
          textBlock2Ref.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // Scena 3: Życie w salonie, wybieg i pełny film (0.68 -> 1.0)
        if (textBlock3Ref.current) {
          const op = smoothFade(progress, 0.68, 0.75, 0.96, 1.0);
          const ty = smoothTranslateY(progress, 0.68, 0.75, 0.96, 1.0);
          textBlock3Ref.current.style.opacity = String(op);
          textBlock3Ref.current.style.transform = `translateY(${ty}px)`;
          textBlock3Ref.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        // Paski postępu scen
        if (desktopBar1Ref.current) {
          const fill = Math.min(100, Math.max(0, ((progress - 0.16) / 0.28) * 100));
          desktopBar1Ref.current.style.width = `${fill}%`;
        }
        if (desktopBar2Ref.current) {
          const fill = Math.min(100, Math.max(0, ((progress - 0.42) / 0.28) * 100));
          desktopBar2Ref.current.style.width = `${fill}%`;
        }
        if (desktopBar3Ref.current) {
          const fill = Math.min(100, Math.max(0, ((progress - 0.68) / 0.30) * 100));
          desktopBar3Ref.current.style.width = `${fill}%`;
        }

        // Subtelna reakcja makiety telefonu (delikatny zoom na starcie)
        if (phoneWrapperRef.current) {
          const scale = lerp(0.96, 1.02, Math.min(1, progress * 1.5));
          phoneWrapperRef.current.style.transform = `scale(${scale})`;
        }
      }

      // ── MOBILE ANIMACJA ───────────────────────────────────────────
      if (window.innerWidth < 1024) {
        if (mobileIntroRef.current) {
          const op = progress < 0.10 ? 1 : progress > 0.18 ? 0 : 1 - ((progress - 0.10) / 0.08);
          mobileIntroRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
        }
        if (mobileScene1Ref.current) {
          const op = smoothFade(progress, 0.15, 0.23, 0.40, 0.46);
          mobileScene1Ref.current.style.opacity = String(op);
          mobileScene1Ref.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }
        if (mobileScene2Ref.current) {
          const op = smoothFade(progress, 0.43, 0.50, 0.68, 0.74);
          mobileScene2Ref.current.style.opacity = String(op);
          mobileScene2Ref.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }
        if (mobileScene3Ref.current) {
          const op = smoothFade(progress, 0.71, 0.78, 0.96, 1.0);
          mobileScene3Ref.current.style.opacity = String(op);
          mobileScene3Ref.current.style.pointerEvents = op > 0.3 ? "auto" : "none";
        }

        if (mobileBar1Ref.current) {
          const fill = Math.min(100, Math.max(0, ((progress - 0.15) / 0.28) * 100));
          mobileBar1Ref.current.style.width = `${fill}%`;
        }
        if (mobileBar2Ref.current) {
          const fill = Math.min(100, Math.max(0, ((progress - 0.43) / 0.28) * 100));
          mobileBar2Ref.current.style.width = `${fill}%`;
        }
        if (mobileBar3Ref.current) {
          const fill = Math.min(100, Math.max(0, ((progress - 0.71) / 0.27) * 100));
          mobileBar3Ref.current.style.width = `${fill}%`;
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kim-jestem"
      className="relative bg-[#070709] text-white border-t border-white/10"
      style={{ height: sectionHeight }}
    >
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. WIDOK DESKTOP (lg+)                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block sticky top-0 h-screen w-full overflow-hidden">
        {/* Poświaty tła VisionOS */}
        <div className="absolute top-1/4 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="h-full max-w-7xl mx-auto px-8 xl:px-12 flex items-center justify-between gap-12 relative z-10">
          
          {/* LEWA KOLUMNA: Narracja scrollytelling z autentyczną transkrypcją */}
          <div className="w-[52%] xl:w-[54%] relative h-[560px] flex items-center">
            
            {/* INTRO: Tytuł sekcji (faza wejściowa) */}
            <div
              ref={introRef}
              className="absolute inset-0 flex flex-col justify-center will-change-transform"
              style={{ opacity: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6 w-fit shadow-sm">
                <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300 font-semibold">
                  {lang === "PL" ? "HISTORIA HODOWLI · KIM JESTEM" : "ABOUT THE FOUNDER · HER STORY"}
                </span>
              </div>
              <h2
                className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.8rem, 4.5vw, 4.2rem)" }}
              >
                {lang === "PL" ? (
                  <>
                    „Hodowla to nie biznes.<br />
                    <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                      To miłość i odpowiedzialność.”
                    </span>
                  </>
                ) : (
                  <>
                    “Breeding is not a business.<br />
                    <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                      It is lifelong passion.”
                    </span>
                  </>
                )}
              </h2>
              <p className="text-base xl:text-lg text-zinc-400 font-body font-light leading-relaxed max-w-xl mb-6">
                {lang === "PL"
                  ? "Posłuchaj osobistej opowieści założycielki hodowli Koci Przyjaciel *PL. O pasji, poszukiwaniu idealnego kota rodzinnego i bezklatkowym życiu z łagodnymi olbrzymami."
                  : "Listen to the personal story of the founder of Koci Przyjaciel *PL cattery. About passion, searching for the ideal gentle giant and domestic living."}
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{lang === "PL" ? "Przewiń w dół, aby poznać historię ↓" : "Scroll down to explore story ↓"}</span>
              </div>
            </div>

            {/* SCENA 1: Początki i rejestracja (transkrypcja: ~30-60s) */}
            <div
              ref={textBlock1Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-5 will-change-transform opacity-0 pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold">
                  01 · POCZĄTKI I DECYZJA
                </span>
                <div className="h-[1px] w-12 bg-amber-400/30" />
              </div>
              <h3 className="text-3xl xl:text-4xl font-heading font-light text-white leading-tight">
                {lang === "PL" ? (
                  <>
                    Zaczęło się <span className="font-semibold italic">kilkanaście lat temu</span>. Od jednego miotu.
                  </>
                ) : (
                  <>
                    It began over a decade ago. <span className="font-semibold italic">With a single litter</span>.
                  </>
                )}
              </h3>
              <blockquote className="p-5 rounded-2xl bg-white/[0.04] border-l-2 border-amber-400 text-sm xl:text-base font-body text-zinc-300 italic leading-relaxed">
                {lang === "PL"
                  ? "„Zarejestrowałam hodowlę początkowo na jeden miot, żeby zobaczyć, czy się w tym odnajdę. Bo powoływanie życia to ogromna odpowiedzialność. Chciałam mieć jak najlepszą opinię i żeby ludzie mnie z dumą polecali.”"
                  : "“I registered the cattery initially for one litter to see if this was my true calling. Creating life is an enormous responsibility. I wanted to build trust and impeccable reputation.”"}
              </blockquote>
              <div className="flex items-center gap-6 pt-1">
                <div>
                  <span className="text-2xl font-heading font-bold text-white block">15+ lat</span>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Doświadczenia</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div>
                  <span className="text-2xl font-heading font-bold text-white block">FIFe / FPL</span>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Certyfikacja</span>
                </div>
              </div>
            </div>

            {/* SCENA 2: Dlaczego Maine Coon i linie zagraniczne (transkrypcja: ~90-160s) */}
            <div
              ref={textBlock2Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-5 will-change-transform opacity-0 pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold">
                  02 · WYBÓR RASY & GENETYKA
                </span>
                <div className="h-[1px] w-12 bg-blue-400/30" />
              </div>
              <h3 className="text-3xl xl:text-4xl font-heading font-light text-white leading-tight">
                {lang === "PL" ? (
                  <>
                    Szukałam <span className="font-semibold italic">przyjaciela rodziny</span>. Maine Coon okazał się cudem.
                  </>
                ) : (
                  <>
                    Looking for a true friend. <span className="font-semibold italic">Maine Coon was magical</span>.
                  </>
                )}
              </h3>
              <blockquote className="p-5 rounded-2xl bg-white/[0.04] border-l-2 border-blue-400 text-sm xl:text-base font-body text-zinc-300 italic leading-relaxed">
                {lang === "PL"
                  ? "„Szukałam rasy, która najbardziej wpisze się w naszą rodzinę. Maine Coon okazał się czymś cudownym — potężny, a jednocześnie niewyobrażalnie łagodny. Przez wiele lat inwestowałam w wybitne kotki sprowadzane z zagranicy o najlepszych liniach.”"
                  : "“I was searching for a cat that would blend perfectly with our family. Maine Coon proved to be extraordinary — massive yet incredibly gentle. For years I invested in top international bloodlines.”"}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Echo Doppler HCM + Testy DNA N/N</span>
                </div>
              </div>
            </div>

            {/* SCENA 3: Życie w salonie, wybieg i link do pełnego filmu (transkrypcja: ~160-200s) */}
            <div
              ref={textBlock3Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-6 will-change-transform opacity-0 pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                  03 · ŻYCIE W DOMU & WYBIEG
                </span>
                <div className="h-[1px] w-12 bg-emerald-400/30" />
              </div>
              <h3 className="text-3xl xl:text-4xl font-heading font-light text-white leading-tight">
                {lang === "PL" ? (
                  <>
                    Koty śpią z nami w salonie. <span className="font-semibold italic">Zero klatek</span>.
                  </>
                ) : (
                  <>
                    Living in our lounge. <span className="font-semibold italic">Never in cages</span>.
                  </>
                )}
              </h3>
              <blockquote className="p-5 rounded-2xl bg-white/[0.04] border-l-2 border-emerald-400 text-sm xl:text-base font-body text-zinc-300 italic leading-relaxed">
                {lang === "PL"
                  ? "„Wybudowaliśmy również wybieg ogrodowy, ale kotki z kociętami oraz młodzież są z nami w domu przez cały czas. Wychowują się przy dzieciach, psie i codziennym życiu.”"
                  : "“We built an outdoor cat run, but queens with kittens and youth are with us inside all the time around our children and dog.”"}
              </blockquote>

              {/* Wyraźne hiperłącze do zakładki O nas z pełnym filmem */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/o-nas#pelny-film"
                  className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-ui uppercase tracking-wider text-xs font-bold hover:brightness-110 transition-all shadow-[0_10px_35px_rgba(251,191,36,0.25)] flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Film className="w-4 h-4 text-black" />
                  <span>{lang === "PL" ? "Obejrzyj pełny film w „O nas” (9 min)" : "Watch Full Video in About (9 min)"}</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/o-nas"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-ui uppercase tracking-wider text-xs font-medium transition-all"
                >
                  {lang === "PL" ? "Więcej o hodowli" : "More About Us"}
                </Link>
              </div>
            </div>

          </div>

          {/* PRAWA KOLUMNA: Ramka iPhone 16 Pro (Pionowe wideo 9:16) */}
          <div className="w-[42%] xl:w-[40%] flex justify-end shrink-0">
            <div
              ref={phoneWrapperRef}
              className="will-change-transform transition-transform duration-75 ease-out relative"
            >
              {/* Obudowa iPhone 16 Pro Titanium w pionie */}
              <div className="relative mx-auto w-[310px] xl:w-[330px] p-[10px] rounded-[48px] bg-gradient-to-b from-[#3a393d] via-[#242327] to-[#1a191c] shadow-[0_25px_70px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.15)]">
                
                {/* Ekran 9:16 */}
                <div className="relative w-full aspect-[9/16] rounded-[40px] overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src="/video/breeder-short.mp4"
                    poster="/video/breeder-poster.jpg"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover scale-[1.02]"
                  />

                  {/* Dynamic Island u góry */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 border border-white/10 shadow-sm pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a1224] border border-blue-500/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  {/* Pływające napisy Apple Glass na dole wideo */}
                  <div
                    ref={subtitleOverlayRef}
                    className="absolute bottom-14 left-3 right-3 z-20 p-3 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/20 text-center shadow-lg"
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300 font-semibold block mb-0.5">
                      Wypowiedź Założycielki · Koci Przyjaciel *PL
                    </span>
                    <p className="text-xs font-body text-zinc-100 font-light leading-snug">
                      {lang === "PL"
                        ? "„Powoływanie życia to ogromna odpowiedzialność. Chciałam, żeby koty miały u nas raj.”"
                        : "“Breeding is an enormous responsibility. I wanted to give our cats paradise.”"}
                    </p>
                  </div>

                  {/* Przycisk Dźwięku Unmute/Mute */}
                  <div className="absolute bottom-3 right-3 z-30">
                    <button
                      onClick={toggleMute}
                      className="w-9 h-9 rounded-full bg-black/70 border border-white/25 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:scale-105 transition-all cursor-pointer shadow-md"
                      title={isMuted ? "Włącz dźwięk wypowiedzi" : "Wycisz"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
                    </button>
                  </div>

                  {/* Subtelna powłoka światła na szkle */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dolne paski postępu sekcji */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <div className="w-20 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div ref={desktopBar1Ref} className="h-full bg-amber-400 transition-all duration-75 ease-out" style={{ width: "0%" }} />
          </div>
          <div className="w-20 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div ref={desktopBar2Ref} className="h-full bg-blue-400 transition-all duration-75 ease-out" style={{ width: "0%" }} />
          </div>
          <div className="w-20 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div ref={desktopBar3Ref} className="h-full bg-emerald-400 transition-all duration-75 ease-out" style={{ width: "0%" }} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. WIDOK MOBILNY (<lg)                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden sticky top-0 h-screen w-full overflow-hidden pt-20 px-4">
        
        {/* Kontener telefonu */}
        <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto mb-4">
          <div className="relative p-2 rounded-[40px] bg-gradient-to-b from-[#3a393d] to-[#1a191c] border border-white/20 shadow-2xl">
            <div className="relative w-full aspect-[9/16] rounded-[32px] overflow-hidden bg-black max-h-[380px]">
              <video
                ref={mobileVideoRef}
                src="/video/breeder-short.mp4"
                poster="/video/breeder-poster.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30 border border-white/10" />

              {/* Przycisk dźwięku */}
              <div className="absolute bottom-2 right-2 z-30">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/70 border border-white/25 flex items-center justify-center text-white"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Teksty pod wideo na telefonach */}
        <div className="relative h-[220px] max-w-sm mx-auto">
          {/* Intro Mobile */}
          <div ref={mobileIntroRef} className="absolute inset-0 text-center flex flex-col justify-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-1 block font-semibold">
              KIM JESTEM · SERCE HODOWLI
            </span>
            <h3 className="text-xl font-heading font-medium text-white mb-2">
              Poznaj historię założycielki
            </h3>
            <p className="text-xs text-zinc-400 font-body font-light">
              Przewiń w dół, aby posłuchać opowieści o pasji i bezklatkowym domu.
            </p>
          </div>

          {/* Scena 1 Mobile */}
          <div ref={mobileScene1Ref} className="absolute inset-0 text-center flex flex-col justify-center opacity-0 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-1 block">
              01 · POCZĄTKI I PASJA
            </span>
            <h4 className="text-lg font-heading font-medium text-white mb-2">
              „Zaczęło się kilkanaście lat temu.”
            </h4>
            <p className="text-xs text-zinc-300 font-body font-light mb-2">
              Zarejestrowana początkowo na jeden miot, by sprawdzić odpowiedzialność. Dziś to pasja życia.
            </p>
          </div>

          {/* Scena 2 Mobile */}
          <div ref={mobileScene2Ref} className="absolute inset-0 text-center flex flex-col justify-center opacity-0 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-1 block">
              02 · DLACZEGO MAINE COON?
            </span>
            <h4 className="text-lg font-heading font-medium text-white mb-2">
              „Szukałam przyjaciela rodziny.”
            </h4>
            <p className="text-xs text-zinc-300 font-body font-light mb-2">
              Potężne koty o łagodnym sercu. Inwestycje w wybitne linie zagraniczne i pełne badania HCM/PKD/SMA.
            </p>
          </div>

          {/* Scena 3 Mobile + Link do pełnego filmu */}
          <div ref={mobileScene3Ref} className="absolute inset-0 text-center flex flex-col justify-center opacity-0 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-1 block">
              03 · DOMOWY SALON
            </span>
            <h4 className="text-lg font-heading font-medium text-white mb-3">
              Koty mieszkają z nami. Zero klatek.
            </h4>
            <Link
              href="/o-nas#pelny-film"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-ui font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Pełny film w „O nas” (9 min)</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </Link>
          </div>
        </div>

        {/* Paski postępu mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <div className="w-14 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div ref={mobileBar1Ref} className="h-full bg-amber-400" style={{ width: "0%" }} />
          </div>
          <div className="w-14 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div ref={mobileBar2Ref} className="h-full bg-blue-400" style={{ width: "0%" }} />
          </div>
          <div className="w-14 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div ref={mobileBar3Ref} className="h-full bg-emerald-400" style={{ width: "0%" }} />
          </div>
        </div>

      </div>

    </section>
  );
}
