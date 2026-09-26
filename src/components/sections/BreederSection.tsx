"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX, ArrowRight, Sparkles, Heart, ShieldCheck, Play, Award, Film } from "lucide-react";
import { REAL_PHONE } from "@/data/realCatsData";

interface BreederSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: () => void;
  id?: string;
  isAboutPage?: boolean;
}

interface BreederSubtitleItem {
  start: number;
  end: number;
  badge: string;
  text: string;
}

const BREEDER_TIMED_SUBTITLES: Record<"PL" | "EN", BreederSubtitleItem[]> = {
  PL: [
    {
      start: 0,
      end: 8.5,
      badge: "HISTORIA HODOWCY · WYKSZTAŁCENIE",
      text: "„Jednak ze względów praktycznych nie poszłam na weterynarię. Skończyłam 6 kierunków studiów wyższych...”",
    },
    {
      start: 8.5,
      end: 18.0,
      badge: "HISTORIA HODOWCY · PEDAGOGIKA",
      text: "„...w tematyce bycia nauczycielem, pedagogiem i terapeutą integracji sensorycznej.”",
    },
    {
      start: 18.0,
      end: 30.5,
      badge: "HISTORIA HODOWCY · STUDIA",
      text: "„Również studia związane z wychowaniem fizycznym i resocjalizacją. Poszłam w innym kierunku, ale kilkanaście lat temu...”",
    },
    {
      start: 30.5,
      end: 39.5,
      badge: "01 · POCZĄTKI HODOWLI",
      text: "„...zupełnie przez przypadek, nie planując tego wcześniej, założyłam hodowlę.”",
    },
    {
      start: 39.5,
      end: 49.0,
      badge: "01 · PIERWSZY MIOT",
      text: "„Zarejestrowałam ją początkowo tylko po to, żeby kotka miała jeden miot...”",
    },
    {
      start: 49.0,
      end: 54.0,
      badge: "01 · WIELKA ODPOWIEDZIALNOŚĆ",
      text: "„...i żeby zobaczyć, czy ja się w tym odnajdę — bo powoływanie życia to ogromna odpowiedzialność.”",
    },
    {
      start: 54.0,
      end: 65.0,
      badge: "01 · PRZEMYŚLANA DECYZJA",
      text: "„To temat, który trzeba głęboko przemyśleć i rzetelnie zbadać, zanim się w to wejdzie.”",
    },
    {
      start: 65.0,
      end: 71.0,
      badge: "01 · MIŁOŚĆ DO ZWIERZĄT",
      text: "„No i okazało się, że się w tym odnalazłam, bo po prostu kocham dbać o zwierzęta.”",
    },
    {
      start: 71.0,
      end: 79.0,
      badge: "01 · TROSKA I WYCHOWANIE",
      text: "„Uwielbiam się nimi troszczyć i przede wszystkim mądrze wychowywać...”",
    },
    {
      start: 79.0,
      end: 88.0,
      badge: "01 · NAJLEPSZA OPINIA",
      text: "„...tak, aby opiekunowie mieli jak najlepszą opinię na mój temat i polecali nas z dumą dalej.”",
    },
    {
      start: 88.0,
      end: 97.0,
      badge: "02 · POSZUKIWANIE RASY",
      text: "„Swoją historię zaczęłam kilkanaście lat temu. Wcześniej miałam kotka rasy Ragdoll...”",
    },
    {
      start: 97.0,
      end: 110.0,
      badge: "02 · CHARAKTER DLA RODZINY",
      text: "„...ale szukałam przyjaciela, który najbardziej pasowałby do naszej rodziny, do mnie i do moich oczekiwań.”",
    },
    {
      start: 110.0,
      end: 127.5,
      badge: "02 · RAGDOLL A MAINE COON",
      text: "„Ragdoll był kotem bardzo spokojnym, mało kontaktowym. Natomiast Maine Coon...”",
    },
    {
      start: 127.5,
      end: 135.0,
      badge: "02 · MAINE COON: PSI CHARAKTER",
      text: "„...to cudowny psi charakter, przyjaciel każdego domownika!”",
    },
    {
      start: 135.0,
      end: 142.0,
      badge: "02 · INTELIGENCJA I MAJESTAT",
      text: "„Bardzo kontaktowy, wybitnie inteligentny i przede wszystkim niezwykle majestatyczny.”",
    },
    {
      start: 142.0,
      end: 151.0,
      badge: "02 · CZYSTA PASJA",
      text: "„Pierwszy kotek dał mi tyle radości i szczęścia, że stwierdziłam: to jest to, co chcę robić!”",
    },
    {
      start: 151.0,
      end: 159.0,
      badge: "02 · LINIE Z CAŁEJ EUROPY",
      text: "„Inwestowałam przez wiele lat w wybitne kotki. Sprowadzałam z zagranicy bardzo drogie, dostojne linie.”",
    },
    {
      start: 159.0,
      end: 167.5,
      badge: "02 · ZDROWIE I BADANIA DNA",
      text: "„Inwestowałam w certyfikowane badania genetyczne i wszystko, by kotom żyło się najlepiej i najzdrowiej.”",
    },
    {
      start: 167.5,
      end: 176.0,
      badge: "03 · WYBIEG I OGRÓD",
      text: "„Wybudowaliśmy również przestronny wybieg ogrodowy — mają tam wszystko, co potrzebne do szczęścia.”",
    },
    {
      start: 176.0,
      end: 193.0,
      badge: "03 · DOMOWE ŻYCIE W SALONIE",
      text: "„Koty nie są tam cały rok! Zimą i w sezonie kotki oraz maluszki mieszkają z nami w salonie.”",
    },
    {
      start: 193.0,
      end: 205.0,
      badge: "03 · ZERO KLATEK & MIŁOŚĆ",
      text: "„Wszystkie nasze koty żyją z nami w domu, przy rodzinie i dzieciach. Mają wspaniałe, pełne miłości warunki.”",
    },
  ],
  EN: [
    {
      start: 0,
      end: 8.5,
      badge: "BREEDER STORY · EDUCATION",
      text: "“Due to practical circumstances, I completed 6 university degrees instead of veterinary medicine...”",
    },
    {
      start: 8.5,
      end: 18.0,
      badge: "BREEDER STORY · PEDAGOGY",
      text: "“...focusing on pedagogy, teaching, and sensory integration therapy.”",
    },
    {
      start: 18.0,
      end: 30.5,
      badge: "BREEDER STORY · EARLY DAYS",
      text: "“Physical education and rehabilitation degrees followed. Yet over a decade ago...”",
    },
    {
      start: 30.5,
      end: 49.0,
      badge: "01 · FIRST LITTER",
      text: "“...quite by chance, without planning it ahead on this scale, I registered for our very first litter.”",
    },
    {
      start: 49.0,
      end: 65.0,
      badge: "01 · RESPONSIBILITY",
      text: "“Bringing life into this world is an enormous responsibility. You have to reflect and study deeply before taking this path.”",
    },
    {
      start: 65.0,
      end: 79.0,
      badge: "01 · PASSION & REPUTATION",
      text: "“And I found my true calling. I love caring, nurturing, and raising them with full devotion...”",
    },
    {
      start: 79.0,
      end: 97.0,
      badge: "01 · TRUST & RECOMMENDATION",
      text: "“...so that new families hold us in the highest regard and recommend us proudly.”",
    },
    {
      start: 97.0,
      end: 127.5,
      badge: "02 · SEARCH FOR THE IDEAL COMPANION",
      text: "“I started with a Ragdoll, but longed for a deeper, more expressive bond for our active family.”",
    },
    {
      start: 127.5,
      end: 142.0,
      badge: "02 · MAINE COON: DOG-LIKE HEART",
      text: "“Maine Coons have that wondrous dog-like personality — massively affectionate, brilliant, and majestic.”",
    },
    {
      start: 142.0,
      end: 159.0,
      badge: "02 · EUROPEAN BLOODLINES",
      text: "“That first kitten brought so much pure joy. For years I invested in top European lines and genetic health tests.”",
    },
    {
      start: 159.0,
      end: 176.0,
      badge: "03 · ALL-SEASON ENCLOSURE",
      text: "“We built an expansive outdoor run where our cats enjoy sunshine and fresh air safely.”",
    },
    {
      start: 176.0,
      end: 205.0,
      badge: "03 · LIVING ROOM HOME",
      text: "“Yet they live with us in our lounge. Zero cages — growing alongside our children and pets in absolute warmth.”",
    },
  ],
};

const BREEDER_SUBTITLES = {
  PL: [
    BREEDER_TIMED_SUBTITLES.PL[0],
    BREEDER_TIMED_SUBTITLES.PL[3],
    BREEDER_TIMED_SUBTITLES.PL[13],
    BREEDER_TIMED_SUBTITLES.PL[19],
  ],
  EN: [
    BREEDER_TIMED_SUBTITLES.EN[0],
    BREEDER_TIMED_SUBTITLES.EN[3],
    BREEDER_TIMED_SUBTITLES.EN[7],
    BREEDER_TIMED_SUBTITLES.EN[10],
  ],
};

export default function BreederSection({
  lang = "PL",
  id = "kim-jestem",
  isAboutPage = false,
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
  const [isDesktopDevice, setIsDesktopDevice] = useState<boolean | null>(null);
  const [sectionHeight, setSectionHeight] = useState<string>("490vh");

  const toggleMute = () => {
    const nextMuted = !isMuted;
    const isDesk = window.innerWidth >= 1024;
    if (isDesk) {
      if (videoRef.current) videoRef.current.muted = nextMuted;
      if (mobileVideoRef.current) {
        mobileVideoRef.current.muted = true;
        mobileVideoRef.current.pause();
      }
    } else {
      if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted;
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    }
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const isDesk = window.innerWidth >= 1024;
    setIsDesktopDevice(isDesk);
    setSectionHeight(isDesk ? "490vh" : "380vh");

    const onResize = () => {
      const d = window.innerWidth >= 1024;
      setIsDesktopDevice(d);
      setSectionHeight(d ? "490vh" : "380vh");
      if (d) {
        if (mobileVideoRef.current) {
          mobileVideoRef.current.pause();
          mobileVideoRef.current.muted = true;
        }
      } else {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.muted = true;
        }
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Bezpieczny odtwarzacz: tylko JEDNO aktywne wideo (brak echa i przegłosu)
    const playActiveVideo = () => {
      const isDesk = window.innerWidth >= 1024;
      if (isDesk) {
        if (videoRef.current) {
          videoRef.current.muted = isMuted;
          videoRef.current.play().catch(() => {});
        }
        if (mobileVideoRef.current) {
          mobileVideoRef.current.pause();
          mobileVideoRef.current.muted = true;
        }
      } else {
        if (mobileVideoRef.current) {
          mobileVideoRef.current.muted = isMuted;
          mobileVideoRef.current.play().catch(() => {});
        }
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.muted = true;
        }
      }
    };

    // Odtwarzaj wideo tylko wtedy, gdy sekcja jest rzeczywiście widoczna na ekranie (oszczędność sieci i CPU)
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playActiveVideo();
            } else {
              if (videoRef.current) videoRef.current.pause();
              if (mobileVideoRef.current) mobileVideoRef.current.pause();
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

      // ── DYNAMICZNE NAPISY NA WIDEO (LIVE SUBTITLES OD POCZĄTKU FILMU) ──────────────
      const activeVideo = window.innerWidth >= 1024 ? videoRef.current : mobileVideoRef.current;
      const timedSubs = BREEDER_TIMED_SUBTITLES[lang || "PL"];

      let currentSub = timedSubs[0];

      // Jeśli wideo odtwarza się w czasie, pobierz napisy precyzyjnie według czasu wideo
      if (activeVideo && !isNaN(activeVideo.currentTime) && activeVideo.currentTime > 0) {
        const t = activeVideo.currentTime;
        const found = timedSubs.find((s) => t >= s.start && t < s.end);
        if (found) {
          currentSub = found;
        } else {
          currentSub = timedSubs[timedSubs.length - 1];
        }
      } else {
        // Fallback na podstawie pozycji scrollowania
        const sceneIndex =
          progress < 0.16 ? 0 : progress < 0.42 ? 1 : progress < 0.68 ? 4 : 5;
        currentSub = timedSubs[sceneIndex] || timedSubs[0];
      }

      if (subtitleOverlayRef.current) {
        const badgeEl = subtitleOverlayRef.current.querySelector(".subtitle-badge");
        const textEl = subtitleOverlayRef.current.querySelector(".subtitle-text");
        if (badgeEl && badgeEl.textContent !== currentSub.badge) {
          badgeEl.textContent = currentSub.badge;
        }
        if (textEl && textEl.textContent !== currentSub.text) {
          textEl.textContent = currentSub.text;
        }
      }

      if (mobileSubtitleRef.current) {
        const badgeEl = mobileSubtitleRef.current.querySelector(".subtitle-badge");
        const textEl = mobileSubtitleRef.current.querySelector(".subtitle-text");
        if (badgeEl && badgeEl.textContent !== currentSub.badge) {
          badgeEl.textContent = currentSub.badge;
        }
        if (textEl && textEl.textContent !== currentSub.text) {
          textEl.textContent = currentSub.text;
        }
      }
    };

    const updateSubtitlesFromTime = () => {
      onScroll();
    };

    const dVideo = videoRef.current;
    const mVideo = mobileVideoRef.current;

    if (dVideo) {
      dVideo.addEventListener("timeupdate", updateSubtitlesFromTime, { passive: true });
    }
    if (mVideo) {
      mVideo.addEventListener("timeupdate", updateSubtitlesFromTime, { passive: true });
    }

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (dVideo) dVideo.removeEventListener("timeupdate", updateSubtitlesFromTime);
      if (mVideo) mVideo.removeEventListener("timeupdate", updateSubtitlesFromTime);
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
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

              {/* Wyraźne hiperłącze do kolejnych sekcji */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href={isAboutPage ? "#wybieg" : "/o-nas#pelny-film"}
                  className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-ui uppercase tracking-wider text-xs font-bold hover:brightness-110 transition-all shadow-[0_10px_35px_rgba(251,191,36,0.25)] flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Film className="w-4 h-4 text-black" />
                  <span>
                    {lang === "PL"
                      ? isAboutPage
                        ? "Poznaj nasz wybieg ogrodowy"
                        : "Obejrzyj pełny film w „O nas” (9 min)"
                      : isAboutPage
                      ? "Explore our outdoor cat run"
                      : "Watch Full Video in About (9 min)"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={isAboutPage ? "/dostepne-kociaki" : "/o-nas"}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-ui uppercase tracking-wider text-xs font-medium transition-all"
                >
                  {lang === "PL"
                    ? isAboutPage
                      ? "Dostępne kociaki"
                      : "Więcej o hodowli"
                    : isAboutPage
                    ? "Available kittens"
                    : "More About Us"}
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
                    src={isDesktopDevice ? "/video/breeder-short.mp4" : undefined}
                    poster="/video/breeder-poster.webp"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="none"
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover scale-[1.02] pointer-events-none select-none"
                  />

                  {/* Czyste wideo bez żadnych czarnych nakładek i elementów przysłaniających */}

                  {/* Pływające napisy Apple Glass na dole wideo */}
                  <div
                    ref={subtitleOverlayRef}
                    className="absolute bottom-14 left-3 right-3 z-20 p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 text-center shadow-lg transition-all duration-300"
                  >
                    <span className="subtitle-badge text-[9px] font-mono uppercase tracking-widest text-amber-300 font-semibold block mb-0.5">
                      HISTORIA HODOWCY · WYKSZTAŁCENIE
                    </span>
                    <p className="subtitle-text text-xs font-body text-zinc-100 font-light leading-snug">
                      {lang === "PL"
                        ? "„Jednak ze względów praktycznych nie poszłam na weterynarię. Skończyłam 6 kierunków studiów wyższych...”"
                        : "“Due to practical circumstances, I completed 6 university degrees instead of veterinary medicine...”"}
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
                src={!isDesktopDevice ? "/video/breeder-short.mp4" : undefined}
                poster="/video/breeder-poster.webp"
                loop
                muted={isMuted}
                playsInline
                preload="none"
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover pointer-events-none select-none"
              />
              {/* Czyste mobilne wideo */}

              {/* Pływające napisy Mobile */}
              <div
                ref={mobileSubtitleRef}
                className="absolute bottom-11 left-2.5 right-2.5 z-20 p-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-center shadow-md pointer-events-none transition-all duration-300"
              >
                <span className="subtitle-badge text-[8px] font-mono uppercase tracking-widest text-amber-300 font-semibold block mb-0.5">
                  HISTORIA HODOWCY · WYKSZTAŁCENIE
                </span>
                <p className="subtitle-text text-[10px] font-body text-zinc-100 font-light leading-snug">
                  {lang === "PL"
                    ? "„Jednak ze względów praktycznych nie poszłam na weterynarię. Skończyłam 6 kierunków studiów wyższych...”"
                    : "“Due to practical circumstances, I completed 6 university degrees instead of veterinary medicine...”"}
                </p>
              </div>

              {/* Przycisk dźwięku */}
              <div className="absolute bottom-2 right-2 z-30">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Włącz dźwięk wideo z hodowcą" : "Wycisz dźwięk wideo z hodowcą"}
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
              href={isAboutPage ? "#wybieg" : "/o-nas#pelny-film"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-ui font-bold uppercase tracking-wider shadow-lg"
            >
              <span>
                {lang === "PL"
                  ? isAboutPage
                    ? "Poznaj nasz wybieg ogrodowy"
                    : "Pełny film w „O nas” (9 min)"
                  : isAboutPage
                  ? "Explore our cat run"
                  : "Pełny film w „O nas” (9 min)"}
              </span>
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
