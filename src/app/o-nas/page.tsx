"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import {
  Heart,
  ShieldCheck,
  Home,
  Award,
  Sun,
  Stethoscope,
  ArrowRight,
  Phone,
  Volume2,
  VolumeX,
  Camera,
  Sparkles,
  CheckCircle2,
  Film,
} from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";
import { ALL_AGA_PHOTOS } from "@/data/agaGalleryData";
import AnimatedBentoGrid from "@/components/gallery/AnimatedBentoGrid";
import StaticBentoGrid from "@/components/gallery/StaticBentoGrid";
import BentoGallery from "@/components/gallery/BentoGallery";
import BreederSection from "@/components/sections/BreederSection";

export default function AboutPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>("all");

  const wybiegPhotos = useMemo(() => ALL_AGA_PHOTOS.filter((p) => p.category === "wybieg"), []);
  const domPhotos = useMemo(
    () => ALL_AGA_PHOTOS.filter((p) => p.category === "mlode" || p.category === "w-domu"),
    []
  );

  const jumpToGalleryCategory = (categoryId: string) => {
    setSelectedGalleryCategory(categoryId);
    const galeriaEl = document.getElementById("galeria");
    if (galeriaEl) {
      galeriaEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pillars = [
    {
      icon: Home,
      badge: lang === "PL" ? "100% DOMOWY ODCHÓW" : "100% HOME RAISED",
      accent: "from-amber-500/20 to-amber-500/5",
      iconBg: "bg-amber-400/10 text-amber-300 border-amber-400/25",
      badgeColor: "bg-amber-400/10 text-amber-300 border-amber-400/30",
      title: lang === "PL" ? "Salon, nie klatki" : "Living Room, No Cages",
      desc:
        lang === "PL"
          ? "Nasze koty to pełnoprawni domownicy. Śpią z nami w łóżkach, odpoczywają na kanapach, uczestniczą w codziennym życiu rodziny z dziećmi i psem."
          : "Our cats live freely in our living room with our family, children, and dog. No cages, ever.",
      points:
        lang === "PL"
          ? [
              "Socjalizacja przy dzieciach i psie od 1. dnia",
              "Swobodny dostęp do całego domu i kanap",
              "Zero klatek, boksów czy odizolowanych piwnic",
            ]
          : [
              "Socialized with kids & dog from day one",
              "Free run of the entire home and sofas",
              "Zero cages, kennels or isolated basements",
            ],
    },
    {
      icon: Sun,
      badge: lang === "PL" ? "WOLIERA 365 DNI W ROKU" : "365 DAYS ENCLOSURE",
      accent: "from-emerald-500/20 to-emerald-500/5",
      iconBg: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
      badgeColor: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      title: lang === "PL" ? "Bezpieczny wybieg ogrodowy" : "Safe Outdoor Garden Run",
      desc:
        lang === "PL"
          ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego i świeżego powietrza."
          : "Cats have year-round access to a safe, covered garden enclosure and fresh outdoor air.",
      points:
        lang === "PL"
          ? [
              "Zadaszona, atestowana konstrukcja wolierowa",
              "Naturalne pnie drzew i drapaki do 3m",
              "Bezpośrednie przejście z salonu na wybieg",
            ]
          : [
              "Safe covered enclosure structure",
              "Natural wood scratching trunks up to 3m",
              "Direct access straight from the living room",
            ],
    },
    {
      icon: Stethoscope,
      badge: lang === "PL" ? "LABOKLIN GERMANY · N/N" : "LABOKLIN GERMANY · N/N",
      accent: "from-rose-500/20 to-rose-500/5",
      iconBg: "bg-rose-400/10 text-rose-300 border-rose-400/25",
      badgeColor: "bg-rose-400/10 text-rose-300 border-rose-400/30",
      title: lang === "PL" ? "Rygorystyczne zdrowie" : "Strict Health Screening",
      desc:
        lang === "PL"
          ? "Wszystkie koty hodowlane przechodzą regularne badania echokardiograficzne serca (Echo Doppler) oraz pełny profil DNA w niemieckim laboratorium Laboklin (HCM, PKD, SMA N/N)."
          : "Echo Doppler heart screening and certified Laboklin genetic testing (HCM, PKD, SMA N/N).",
      points:
        lang === "PL"
          ? [
              "Certyfikowane Echo Doppler serca u kardiologa",
              "Testy genetyczne DNA: HCM, PKD, SMA – N/N",
              "Komplet szczepień, mikrochip i profilaktyka",
            ]
          : [
              "Certified Doppler heart echocardiography",
              "Genetic DNA tests: HCM, PKD, SMA – N/N",
              "Full vaccination course, microchip & health book",
            ],
    },
    {
      icon: Award,
      badge: lang === "PL" ? "CAT CLUB WROCŁAW · FIFe / FPL" : "FIFe / FPL PEDIGREE",
      accent: "from-blue-500/20 to-blue-500/5",
      iconBg: "bg-blue-400/10 text-blue-300 border-blue-400/25",
      badgeColor: "bg-blue-400/10 text-blue-300 border-blue-400/30",
      title: lang === "PL" ? "Felis Polonia & FIFe" : "FIFe & FPL Pedigree",
      desc:
        lang === "PL"
          ? "Jesteśmy zrzeszeni w Cat Club Wrocław należącym do FPL i FIFe — największej na świecie federacji felinologicznej. Każde kocię otrzymuje prawdziwy 5-pokoleniowy rodowód."
          : "Registered with Cat Club Wrocław / Felis Polonia (FPL / FIFe). Every kitten receives a certified 5-generation pedigree.",
      points:
        lang === "PL"
          ? [
              "Prawdziwy 5-pokoleniowy rodowód FPL / FIFe",
              "Gwarancja 100% czystości rasy Maine Coon",
              "Dożywotnie wsparcie hodowcy i kontakt",
            ]
          : [
              "Certified 5-generation FPL / FIFe pedigree",
              "100% purebred Maine Coon guarantee",
              "Lifelong breeder guidance and friendship",
            ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-amber-400 selection:text-black">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="pt-28 sm:pt-36">

        {/* ── HERO BANNER O NAS ────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "DOMOWA HODOWLA Z PASJĄ · WROCŁAW" : "PASSIONATE FAMILY CATTERY · WROCLAW"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Poznaj <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">Koci Przyjaciel *PL</span>.
              </>
            ) : (
              <>
                About <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">Koci Przyjaciel *PL</span>.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-body max-w-3xl mx-auto font-light leading-relaxed mb-8">
            {lang === "PL"
              ? "Nie prowadzimy masowej produkcji kociąt. Jesteśmy małą, domową hodowlą — nasze Maine Coony to pełnoprawni członkowie rodziny, którzy od pierwszego oddechu dorastają przy dzieciach, psie i codziennych domowych dźwiękach."
              : "We are a small, family home cattery. Our Maine Coons are cherished family members raised from day one with children, dogs, and everyday household warmth."}
          </p>

          {/* ── SZYBKA NAWIGACJA ZAKŁADKOWA APPLE PILLS ───────────────── */}
          <div className="py-4 my-6 border-y border-white/10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <a
              href="#pelny-film"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-amber-400/25 hover:bg-amber-400/35 border border-amber-400/40 text-amber-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>🎥</span>
              <span>{lang === "PL" ? "Film o hodowli" : "Full Story"}</span>
            </a>
            <a
              href="#hodowla"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all flex items-center gap-1.5"
            >
              <span>🏠</span>
              <span>{lang === "PL" ? "Hodowla" : "Cattery"}</span>
            </a>
            <a
              href="#wybieg"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition-all flex items-center gap-1.5"
            >
              <span>🌿</span>
              <span>{lang === "PL" ? "Wybieg" : "Enclosure"}</span>
            </a>
            <a
              href="#w-domu"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 transition-all flex items-center gap-1.5"
            >
              <span>🏡</span>
              <span>{lang === "PL" ? "W salonie i na kanapie" : "Living Room Life"}</span>
            </a>
            <Link
              href="/galeria"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/30 text-amber-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📸</span>
              <span>Galeria kotów →</span>
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA: HISTORIA HODOWLI — SCROLLYTELLING IPHONE (#pelny-film)
            Identyczny uklad, autoodtwarzanie wideo, napisy na zywo
            i plynne przypiecie scrollytelling (stopowanie) jak na glownej
        ═══════════════════════════════════════════════════════════════ */}
        <BreederSection
          lang={lang}
          id="pelny-film"
          isAboutPage={true}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA 1: NASZA HODOWLA (#hodowla)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="hodowla" className="max-w-6xl mx-auto px-6 sm:px-10 mb-16 pt-8 scroll-mt-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-300 font-semibold">
              01 · SERCE DOMU
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-light mb-6">
            Nasza Hodowla: <span className="font-semibold italic">Życie bez klatek</span>.
          </h2>

          {/* Duże Zdjęcie z Właścicielką i kotem */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-center">
            <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/images/cats/cat_07.webp"
                alt="Właścicielka hodowli Koci Przyjaciel *PL z kotem Maine Coon"
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300 mb-2 inline-block">
                  WROCŁAW · CAT CLUB WROCŁAW · FPL / FIFE
                </span>
                <p className="text-lg sm:text-xl font-heading font-medium text-white">
                  „Prawdziwy charakter Maine Coona rodzi się w miłości, cieple i stałym kontakcie z człowiekiem.”
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5 text-sm sm:text-base text-zinc-300 font-body leading-relaxed font-light">
              <p>
                {lang === "PL"
                  ? "Hodowla Koci Przyjaciel *PL powstała z pasji i fascynacji naturą kotów rasy Maine Coon. Jesteśmy legalną, zarejestrowaną hodowlą w Cat Club Wrocław, należącym do Felis Polonia (FPL) pod patronatem Międzynarodowej Federacji Felinologicznej FIFe."
                  : "Koci Przyjaciel *PL was born out of profound passion for Maine Coons. We are an officially registered cattery with Cat Club Wrocław / Felis Polonia (FPL) under FIFe."}
              </p>
              <p>
                {lang === "PL"
                  ? "Wszystkie nasze koty żyją razem z nami w salonie. Nie mamy osobnych boksów hodowlanych ani piwnic. Każde kocię od chwili narodzin uczestniczy w normalnym życiu domu: oswaja się z odkurzaczem, telewizorem, wesołym hałasem dzieci i obecnością psa."
                  : "All our cats live freely with us in our living room. No separate kennels or basements. Kittens grow up accustomed to normal household sounds, kids, and pets."}
              </p>
              <div className="pt-2">
                <a
                  href={REAL_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-ui text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Społeczność Facebook (26 000+ fanów)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Filary w stylu Apple iPhone Frosted Glass */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="relative p-7 sm:p-8 rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/15 hover:border-white/30 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 flex flex-col justify-between group overflow-hidden hover:-translate-y-1 hover:bg-white/[0.09]"
                >
                  {/* Delikatna poświata w tle */}
                  <div
                    className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${p.accent} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${p.iconBg} border flex items-center justify-center backdrop-blur-md shadow-sm`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${p.badgeColor} backdrop-blur-md`}
                      >
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed font-light mb-5">
                      {p.desc}
                    </p>

                    {/* Kluczowe fakty z checkmarkami */}
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      {p.points.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-body"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA 2: WYBIEG DLA KOTÓW (#wybieg)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="wybieg" className="max-w-6xl mx-auto px-6 sm:px-10 mb-16 pt-8 scroll-mt-28 border-t border-white/10">
          <div className="flex items-center gap-2 mb-4 pt-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold">
              02 · OGRÓD I NATURA
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
            {/* Left side text */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light mb-4 text-white leading-tight">
                Wybieg dla kotów: <br/>
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-400">Woliera 365 dni w roku</span>.
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 font-body max-w-xl font-light leading-relaxed mb-6">
                Bezpieczna, zadaszona przestrzeń w ogrodzie z bezpośrednim przejściem z domu. Koty same decydują, kiedy chcą wyjść na świeże powietrze, obserwować ptaki i zażywać słońca — w 100% bezpiecznie.
              </p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-mono shrink-0 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Atestowana Konstrukcja</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-mono shrink-0 font-medium">
                  🌿 Natura
                </span>
              </div>
            </div>

            {/* Odtwarzacz wideo bez ramki telefonu */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl transition-all duration-500 hover:border-emerald-500/30">
                <video
                  src="/video/film2.mp4"
                  poster="/images/gallery/wybieg/wybieg_001.webp"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
                
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

                {/* Video Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="max-w-[75%]">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-2 inline-block">
                      WOLIERA · WROCŁAW
                    </span>
                    <p className="text-xl font-heading font-semibold text-white leading-tight">
                      Ciepłe dni na bezklatkowym wybiegu
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
                    title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ruchoma, płynna Siatka Bento ze zdjęciami z wybiegu */}
          <div className="mt-8">
            <AnimatedBentoGrid
              photos={wybiegPhotos}
              lang={lang}
              badge={lang === "PL" ? "🌿 Kadry z Wybiegu" : "🌿 Enclosure Moments"}
              title={
                <h3 className="text-2xl sm:text-3xl font-heading font-light text-white">
                  {lang === "PL" ? (
                    <>
                      Koty na wybiegu: <span className="font-semibold italic">Prawdziwe kadry z woliery</span>
                    </>
                  ) : (
                    <>
                      Cats in the Enclosure: <span className="font-semibold italic">Outdoor moments</span>
                    </>
                  )}
                </h3>
              }
              subtitle={
                <p>
                  {lang === "PL"
                    ? "Autentyczne ujęcia naszych kotów korzystających z woliery. Kliknij dowolne zdjęcie, by powiększyć je w pełnym formacie Apple."
                    : "Authentic moments of our cats enjoying the enclosure. Click any photo to expand fullscreen."}
                </p>
              }
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA 3: ŻYCIE W DOMU — W SALONIE I NA KANAPIE (#w-domu)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="w-domu" className="max-w-6xl mx-auto px-6 sm:px-10 mb-16 pt-8 scroll-mt-28 border-t border-white/10">
          <div className="flex items-center gap-2 mb-4 pt-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 font-semibold">
              03 · DOM I SALON
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-light text-white">
                Życie w domu i Maluchy: <span className="font-semibold italic">Ciepło rodzinnego salonu</span>.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-body max-w-2xl mt-2 font-light">
                Od pierwszych chwil życia kocięta i koty uczestniczą w normalnym rytmie domowym: bawią się na kanapach, przytulają do dzieci i żyją w harmonii z psem.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono shrink-0">
              <Home className="w-4 h-4" />
              <span>Dom bez klatek</span>
            </span>
          </div>

          {/* Ruchoma, płynna Siatka Bento ze zdjęciami z życia domowego i kociąt */}
          <AnimatedBentoGrid
            photos={domPhotos}
            lang={lang}
            badge={lang === "PL" ? "🏡 Maluchy i Życie Domowe" : "🏡 Kittens & Home Life"}
            title={
              <h3 className="text-2xl sm:text-3xl font-heading font-light text-white">
                {lang === "PL" ? (
                  <>
                    W salonie i na kanapie: <span className="font-semibold italic">Dorastanie w sercu rodziny</span>
                  </>
                ) : (
                  <>
                    Living Room Life: <span className="font-semibold italic">Growing up with family</span>
                  </>
                )}
              </h3>
            }
            subtitle={
              <p>
                {lang === "PL"
                  ? "Kocięta od pierwszych tygodni oswajają się z domowym życiem, dotykiem i czułością. Kliknij dowolne ujęcie, by powiększyć."
                  : "Kittens socialized from the earliest days with love and human affection. Click to expand."}
              </p>
            }
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA: ODSYŁACZ DO DEDYKOWANEJ GALERII ZDJĘĆ (/galeria)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-16 pt-8 border-t border-white/10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#141416] via-[#101012] to-[#0a0a0c] border border-amber-400/20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest font-semibold mb-5">
              <Camera className="w-3.5 h-3.5" />
              <span>PEŁNE ARCHIWUM ZDJĘĆ HODOWLI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white mb-4">
              Poznaj całą naszą galerię: <span className="font-semibold italic text-amber-300">Wszystkie kadry i mioty</span>.
            </h2>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Przenieśliśmy pełne archiwum zdjęć naszych kotów, reproduktorów, kotek hodowlanych oraz maluchów do osobnej, dedykowanej zakładki z podziałem na kategorie.
            </p>

            <Link
              href="/galeria"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_10px_35px_rgba(251,191,36,0.3)] cursor-pointer"
            >
              <span>Zobacz Galerię Kotów</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </section>

        {/* ── BANNER CTA — PRZEJŚCIE DO KOCIĄT I KONTAKTU ──────────────── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 mb-16 mt-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#18181B] via-[#121214] to-[#0D0D0F] border border-white/15 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-heading font-medium text-white mb-4">
              {lang === "PL" ? "Chcesz poznać nasze koty osobiście?" : "Want to meet our cats in person?"}
            </h2>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
              {lang === "PL"
                ? "Serdecznie zapraszamy do kontaktu. Chętnie opowiemy o bieżących miotach, charakterze rodziców i zaprosimy na filiżankę herbaty w towarzystwie naszych łagodnych olbrzymów."
                : "Get in touch with us. We'll gladly tell you about upcoming litters and invite you for a visit in Wroclaw."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dostepne-kociaki"
                className="px-7 py-3.5 rounded-full bg-white text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
              >
                <span>{lang === "PL" ? "Dostępne Kociaki" : "Available Kittens"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-body text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>{REAL_PHONE}</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer lang={lang} setLang={setLang} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        lang={lang}
      />
    </div>
  );
}
