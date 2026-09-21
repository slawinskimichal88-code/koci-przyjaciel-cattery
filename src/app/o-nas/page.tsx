"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";
import { ALL_AGA_PHOTOS } from "@/data/agaGalleryData";
import AnimatedBentoGrid from "@/components/gallery/AnimatedBentoGrid";
import BentoGallery from "@/components/gallery/BentoGallery";

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
      title: lang === "PL" ? "Salon, nie klatki" : "Living Room, No Cages",
      desc:
        lang === "PL"
          ? "Nasze koty to pełnoprawni domownicy. Śpią z nami w łóżkach, odpoczywają na kanapach, uczestniczą w codziennym życiu rodziny z dziećmi i psem."
          : "Our cats live freely in our living room with our family, children, and dog. No cages, ever.",
    },
    {
      icon: Sun,
      title: lang === "PL" ? "Bezpieczny wybieg ogrodowy" : "Safe Outdoor Garden Run",
      desc:
        lang === "PL"
          ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszonego wybiegu ogrodowego i świeżego powietrza."
          : "Cats have year-round access to a safe, covered garden enclosure and fresh outdoor air.",
    },
    {
      icon: Stethoscope,
      title: lang === "PL" ? "Rygorystyczne zdrowie" : "Strict Health Screening",
      desc:
        lang === "PL"
          ? "Wszystkie koty hodowlane przechodzą regularne badania echokardiograficzne serca (Echo Doppler) oraz pełny profil DNA w niemieckim laboratorium Laboklin (HCM, PKD, SMA N/N)."
          : "Echo Doppler heart screening and certified Laboklin genetic testing (HCM, PKD, SMA N/N).",
    },
    {
      icon: Award,
      title: lang === "PL" ? "Felis Polonia & FIFe" : "FIFe & FPL Pedigree",
      desc:
        lang === "PL"
          ? "Jesteśmy zrzeszeni w Cat Club Wrocław należącym do FPL i FIFe — największej na świecie federacji felinologicznej. Każde kocię otrzymuje prawdziwy 5-pokoleniowy rodowód."
          : "Registered with Cat Club Wrocław / Felis Polonia (FPL / FIFe). Every kitten receives a certified 5-generation pedigree.",
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
          <div className="sticky top-20 z-30 py-3 bg-[#0A0A0A]/90 backdrop-blur-xl border-y border-white/10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
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
            <button
              onClick={() => jumpToGalleryCategory("all")}
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/30 text-amber-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📸</span>
              <span>{lang === "PL" ? "Archiwum zdjęć" : "Photo Archive"}</span>
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA 1: NASZA HODOWLA (#hodowla)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="hodowla" className="max-w-6xl mx-auto px-6 sm:px-10 mb-24 pt-8 scroll-mt-28">
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

          {/* 4 Filary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-400 font-body leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SEKCJA 2: WYBIEG DLA KOTÓW (#wybieg)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="wybieg" className="max-w-6xl mx-auto px-6 sm:px-10 mb-24 pt-8 scroll-mt-28 border-t border-white/10">
          <div className="flex items-center gap-2 mb-4 pt-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold">
              02 · OGRÓD I NATURA
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-light">
                Wybieg dla kotów: <span className="font-semibold italic">Woliera 365 dni w roku</span>.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-body max-w-2xl mt-2 font-light">
                Bezpieczna, zadaszona przestrzeń w ogrodzie z bezpośrednim przejściem z domu. Koty same decydują, kiedy chcą wyjść na świeże powietrze.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono shrink-0">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Bezpieczeństwa</span>
            </span>
          </div>

          {/* Karta z wideo z wybiegu */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl mb-8 aspect-video max-h-[520px] w-full">
            <video
              src="/video/film2.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
                title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="max-w-xl text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300 mb-2 inline-block">
                  {lang === "PL" ? "WYBIEG OGRODOWY" : "OUTDOOR ENCLOSURE"}
                </span>
                <p className="text-xl sm:text-2xl font-heading font-light text-white">
                  {lang === "PL" ? "Nasz dom to ich dom" : "Our home is their home"}
                </p>
              </div>
            </div>
          </div>

          {/* Ruchoma Siatka Bento ze zdjęciami z wybiegu */}
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
        <section id="w-domu" className="max-w-6xl mx-auto px-6 sm:px-10 mb-24 pt-8 scroll-mt-28 border-t border-white/10">
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

          {/* Ruchoma Siatka Bento ze zdjęciami z życia domowego i kociąt */}
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
            SEKCJA 6: JEDYNA, CENTRALNA, RUCHOMA GALERIA BENTO (#galeria)
            WSZYSTKIE 308 ZDJĘĆ Z FOLDERÓW W JEDNYM RUCHOMYM UKŁADZIE BENTO
        ═══════════════════════════════════════════════════════════════ */}
        <BentoGallery
          lang={lang}
          activeCategory={selectedGalleryCategory}
          onCategoryChange={(catId) => setSelectedGalleryCategory(catId)}
        />

        {/* ── BANNER CTA — PRZEJŚCIE DO KOCIĄT I KONTAKTU ──────────────── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 mb-28">
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
                href="/kocieta"
                className="px-7 py-3.5 rounded-full bg-white text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
              >
                <span>{lang === "PL" ? "Dostępne Kocięta" : "Available Kittens"}</span>
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
