"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KittensSection from "@/components/sections/KittensSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Stethoscope,
  Scale,
  Phone,
  ArrowRight,
} from "lucide-react";
import { ALL_AGA_PHOTOS } from "@/data/agaGalleryData";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import AnimatedBentoGrid from "@/components/gallery/AnimatedBentoGrid";

export default function KittensPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationKitten, setReservationKitten] = useState("");

  const matkiPhotos = useMemo(() => ALL_AGA_PHOTOS.filter((p) => p.category === "matki"), []);
  const kocuryPhotos = useMemo(() => ALL_AGA_PHOTOS.filter((p) => p.category === "kocury"), []);

  const handleOpenReservation = (kittenName?: string) => {
    setReservationKitten(kittenName || "");
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-amber-400 selection:text-black">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

      <main className="pt-28 sm:pt-36">
        
        {/* ── BANNER WPROWADZAJĄCY PODSTRONY ───────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "MIOTY 2026 · RODZICE I MALUCHY" : "2026 LITTERS · PARENTS & KITTENS"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Dostępne <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">Kocięta</span> & Rodzice.
              </>
            ) : (
              <>
                Available <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">Kittens</span> & Parents.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-body max-w-2xl mx-auto font-light leading-relaxed mb-8">
            {lang === "PL"
              ? "Wszystkie nasze kocięta opuszczają hodowlę z 5-pokoleniowym rodowodem FIFe / FPL, kompletem szczepień, mikrochipem Safe-Animal oraz ujemnymi wynikami badań genetycznych HCM, SMA i PKD rodziców."
              : "All kittens leave our cattery with 5-generation FIFe/FPL pedigree, microchip, vaccinations, and certified HCM, SMA, PKD N/N health guarantee."}
          </p>

          {/* 3 filary bezpieczeństwa maluchów */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs text-zinc-300 font-body">
                {lang === "PL" ? "Gwarancja genetyczna HCM, PKD, SMA N/N" : "HCM, PKD, SMA N/N certified"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-400 shrink-0" />
              <span className="text-xs text-zinc-300 font-body">
                {lang === "PL" ? "100% socjalizacja z dziećmi i psem" : "Socialized with children & dogs"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
              <span className="text-xs text-zinc-300 font-body">
                {lang === "PL" ? "Dożywotnie wsparcie hodowcy" : "Lifetime breeder support"}
              </span>
            </div>
          </div>

          {/* Szybka nawigacja po podstronie */}
          <div className="sticky top-20 z-30 py-3 bg-[#0A0A0A]/90 backdrop-blur-xl border-y border-white/10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <a
              href="#kocieta"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all flex items-center gap-1.5"
            >
              <span>🍼</span>
              <span>{lang === "PL" ? "Dostępne Kocięta" : "Available Kittens"}</span>
            </a>
            <a
              href="#matki"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition-all flex items-center gap-1.5"
            >
              <span>🌸</span>
              <span>{lang === "PL" ? "Kotki (Matki)" : "Queens"}</span>
            </a>
            <a
              href="#kocury"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 transition-all flex items-center gap-1.5"
            >
              <span>🦁</span>
              <span>{lang === "PL" ? "Kocury (Reproduktory)" : "Studs"}</span>
            </a>
            <a
              href="#jak-kupic"
              className="px-4 py-2 rounded-full text-xs font-ui uppercase tracking-wider font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition-all flex items-center gap-1.5"
            >
              <span>📋</span>
              <span>{lang === "PL" ? "Procedura Adopcji" : "Adoption Process"}</span>
            </a>
          </div>
        </section>

        {/* 1. Dostępne Kocięta (Interaktywny selektor) */}
        <KittensSection
          lang={lang}
          onOpenReservation={(name) => handleOpenReservation(name)}
        />

        {/* 2. Kotki Hodowlane (Matki) */}
        <section id="matki" className="max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-28 border-t border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-rose-400 font-semibold">
              KOTKI HODOWLANE · MATKI MIOTÓW
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#111114] border border-white/10 shadow-xl mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-4">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>100% Echo Doppler HCM N/N · Badania DNA Laboklin</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-light text-white mb-4">
                  Matki: <span className="font-semibold italic">Nasze królowe</span>.
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-body font-light leading-relaxed mb-6">
                  Zdrowe, opiekuńcze i czułe kotki hodowlane. Każda z nich posiada udokumentowane badania echokardiograficzne serca (Echo Doppler) oraz certyfikowany profil DNA w laboratorium Laboklin (HCM, PKD, SMA N/N). Wszystkie kotki dorastają i wychowują swoje mioty w domowym salonie przy rodzinie.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    Kardiologiczne Echo Doppler HCM: Normal
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    Genetyka Laboklin: Czysta N/N
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    5-pokoleniowy rodowód FIFe / FPL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ruchoma Siatka Bento ze zdjęciami matek */}
          <AnimatedBentoGrid
            photos={matkiPhotos}
            lang={lang}
            badge={lang === "PL" ? "🌸 Kotki Hodowlane" : "🌸 Queens"}
            title={
              <h3 className="text-2xl sm:text-3xl font-heading font-light text-white">
                {lang === "PL" ? (
                  <>
                    Nasze Kotki: <span className="font-semibold italic">Matki miotów Koci Przyjaciel *PL</span>
                  </>
                ) : (
                  <>
                    Our Queens: <span className="font-semibold italic">Mothers of our litters</span>
                  </>
                )}
              </h3>
            }
            subtitle={
              <p>
                {lang === "PL"
                  ? "Opiekuńcze, czułe kotki hodowlane o doskonałej budowie i zrównoważonym charakterze. Kliknij dowolny kadr, by powiększyć."
                  : "Caring, affectionate breeding females with certified genetics. Click any photo to expand."}
              </p>
            }
          />
        </section>

        {/* 3. Kocury Hodowlane (Reproduktory) */}
        <section id="kocury" className="max-w-6xl mx-auto px-6 sm:px-10 py-24 scroll-mt-28 border-t border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold">
              KOCURY HODOWLANE · REPRODUKTORY
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#111114] border border-white/10 shadow-xl mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-4">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Waga do 12 kg · Echo Doppler serca N/N</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-light text-white mb-4">
                  Kocury: <span className="font-semibold italic">Potęga i łagodne serce</span>.
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-body font-light leading-relaxed mb-6">
                  Mocny kościec, majestat, rysie pędzle na uszach i zrównoważony charakter. Samce o potężnej sylwetce dochodzącej do 12 kg, które uwielbiają przytulanie i życie wśród domowników. Pełny profil badań kardiologicznych (Echo Doppler serca) i genetycznych Laboklin N/N.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    Potężny kościec & kufa
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    Pędzle rysia na uszach
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                    Echo Doppler serca N/N
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ruchoma Siatka Bento ze zdjęciami kocurów */}
          <AnimatedBentoGrid
            photos={kocuryPhotos}
            lang={lang}
            badge={lang === "PL" ? "🦁 Kocury Reproduktory" : "🦁 Studs"}
            title={
              <h3 className="text-2xl sm:text-3xl font-heading font-light text-white">
                {lang === "PL" ? (
                  <>
                    Nasze Kocury: <span className="font-semibold italic">Potężne reproduktory</span>
                  </>
                ) : (
                  <>
                    Our Studs: <span className="font-semibold italic">Majestic breeding males</span>
                  </>
                )}
              </h3>
            }
            subtitle={
              <p>
                {lang === "PL"
                  ? "Samce o wadze dochodzącej do 12 kg, mocnym kośćcu i łagodnym, przytulaśnym sercu. Kliknij dowolny kadr, by powiększyć."
                  : "Males weighing up to 12 kg with robust bone structure and affectionate character. Click any photo to expand."}
              </p>
            }
          />
        </section>

        {/* 4. Procedura adopcji */}
        <ProcessSection
          lang={lang}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* ── BANNER CTA — KONTAKT I REZERWACJA ──────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 py-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#18181B] via-[#121214] to-[#0D0D0F] border border-white/15 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-heading font-medium text-white mb-4">
              {lang === "PL" ? "Masz pytania o dostępne maluchy?" : "Questions about available kittens?"}
            </h2>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
              {lang === "PL"
                ? "Chętnie doradzimy w wyborze idealnego kociaka do Twojej rodziny, odpowiemy na wszelkie pytania dotyczące wyprawki i zaprosimy na spotkanie zapoznawcze we Wrocławiu."
                : "We are happy to advise on choosing the perfect kitten for your family and welcome you for a visit in Wroclaw."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenReservation()}
                className="px-7 py-3.5 rounded-full bg-white text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === "PL" ? "Zarezerwuj Kociaka" : "Reserve a Kitten"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
        defaultKitten={reservationKitten}
        lang={lang}
      />
    </div>
  );
}
