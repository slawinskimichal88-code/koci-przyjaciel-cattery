"use client";

import React, { useState } from "react";
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
  Sparkles,
  Award,
  Sun,
  Stethoscope,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_LOCATION } from "@/data/realCatsData";

export default function AboutPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

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
          ? "Koty mają całoroczny dostęp do bezpiecznego, zadaszowanego wybiegu ogrodowego, gdzie mogą wspinać się, obserwować naturę i korzystać ze świeżego powietrza. Żadnych boksów, żadnych izolacji."
          : "Cats have year-round access to a safe, covered garden enclosure where they can climb, explore nature, and enjoy fresh air. No kennels, no isolation.",
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

  const galleryImages = [
    { src: "/images/cats/cat_09.webp", caption: "Mama z kociakiem — spokój i domowe ciepło" },
    { src: "/images/cats/cat_27.webp", caption: "100% socjalizacji — od małego przyzwyczajone do dzieci" },
    { src: "/images/cats/cat_15.webp", caption: "Fascynacja wodą — wyprawa na desce SUP po jeziorze" },
    { src: "/images/cats/cat_32.webp", caption: "Certyfikowany 5-pokoleniowy rodowód FIFe / FPL" },
    { src: "/images/cats/cat_20.webp", caption: "Zabawa na kanapie — życie w salonie bez klatek" },
    { src: "/images/cats/cat_28.webp", caption: "Królewska wyprawka dla każdego opuszczającego hodowlę malucha" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="pt-28 sm:pt-36">

        {/* ── HERO BANNER O NAS ────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "HODOWLA Z PASJĄ · DOMOWE OGNISKO · WROCŁAW" : "CATTERY WITH PASSION · HOME RAISED · WROCLAW"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Poznaj <span className="font-semibold italic">Koci Przyjaciel *PL</span>.
              </>
            ) : (
              <>
                About <span className="font-semibold italic">Koci Przyjaciel *PL</span>.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-body max-w-3xl mx-auto font-light leading-relaxed mb-10">
            {lang === "PL"
              ? "Nie prowadzimy masowej produkcji kociąt. Jesteśmy małą, domową hodowlą — nasze Maine Coony to członkowie naszej rodziny, którzy od pierwszego oddechu dorastają przy dzieciach, psie i codziennych dźwiękach domowego życia."
              : "We are a small, family home cattery. Our Maine Coons are cherished family members raised from day one with children, dogs, and everyday household warmth."}
          </p>
        </section>

        {/* ── ZDJĘCIE PRZEWODNIE ──────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-24">
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <Image
              src="/images/cats/cat_18.webp"
              alt="Hodowla Kotów Maine Coon Koci Przyjaciel *PL Wrocław"
              fill
              className="object-cover object-[50%_25%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-lg">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300 mb-3 inline-block">
                DOMOWE ŚRODOWISKO & CERTYFIKAT
              </span>
              <p className="text-xl sm:text-2xl font-heading font-medium text-white leading-snug">
                „Prawdziwy charakter kota kształtuje się w miłości i bezpieczeństwie, a nie za kratami boksów.”
              </p>
            </div>
          </div>
        </section>

        {/* ── 4 FILARY HODOWLI ────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-300/90 mb-3">
              FILOZOFIA & STANDARDY
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-light">
              Cztery zasady, którym jesteśmy wierni.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#121214] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-400 font-body leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── GALERIA Z ŻYCIA HODOWLI ──────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-28">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-300/90 mb-2">
                CODZIENNOŚĆ Z MAINE COONAMI
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-light">
                Chwile z naszego domu.
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              Każde zdjęcie to autentyczny moment z życia naszych kotów i kociąt w domowym zaciszu we Wrocławiu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121214] aspect-[4/3]"
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <p className="text-xs sm:text-sm text-white font-medium">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BANNER CTA — PRZEJŚCIE DO KOCIĄT I KONTAKTU ──────────────── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 mb-28">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#18181B] via-[#121214] to-[#0D0D0F] border border-white/15 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-heading font-medium text-white mb-4">
              Chcesz poznać nasze koty osobiście?
            </h2>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
              Serdecznie zapraszamy do kontaktu. Chętnie opowiemy o bieżących miotach, charakterze rodziców i zaprosimy na filiżankę herbaty w towarzystwie naszych łagodnych olbrzymów.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/kocieta"
                className="px-6 py-3.5 rounded-full bg-white text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Dostępne Kocięta</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontakt"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-body text-sm font-semibold border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Kontakt & Odwiedziny</span>
              </Link>
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
