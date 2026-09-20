"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  Home,
  Stethoscope,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { REAL_FACEBOOK_URL, REAL_PHONE, REAL_LOCATION } from "@/data/realCatsData";

interface BreederSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: () => void;
}

export default function BreederSection({
  lang = "PL",
  onOpenReservation,
}: BreederSectionProps) {
  return (
    <section
      id="kim-jestem"
      className="relative bg-[#09090B] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10"
    >
      {/* Subtelna poświata w tle */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-rose-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">
        
        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "KIM JESTEM · SERCE NASZEJ HODOWLI" : "ABOUT THE BREEDER · HEART OF OUR CATTERY"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
          >
            {lang === "PL" ? (
              <>
                Poznaj właścicielkę<br />
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                  Koci Przyjaciel *PL.
                </span>
              </>
            ) : (
              <>
                Meet the Founder of<br />
                <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                  Koci Przyjaciel *PL.
                </span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-body leading-relaxed max-w-2xl mx-auto font-light">
            {lang === "PL"
              ? "„Hodowla to dla mnie nie biznes — to pasja całego życia, domowe ciepło i bezgraniczna miłość do tych łagodnych olbrzymów.”"
              : "“Breeding is not a business for me — it's a lifelong passion, household warmth, and endless love for these gentle giants.”"}
          </p>
        </div>

        {/* ── Główny Układ Apple Editorial: Zdjęcia + Osobista Opowieść ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEWA KOLUMNA: Kompozycja Zdjęć Właścicielki ──────────────── */}
          <div className="lg:col-span-6 relative reveal">
            {/* Główne zdjęcie: Portret z kociakiem (cat_07.webp) */}
            <div className="relative w-full h-[460px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <Image
                src="/images/cats/cat_07.webp"
                alt="Właścicielka hodowli Koci Przyjaciel *PL z kotem Maine Coon"
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Pływająca plakietka na głównym zdjęciu */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block mb-0.5">
                    Założycielka & Hodowca
                  </span>
                  <p className="text-sm font-heading font-medium text-white">
                    Koci Przyjaciel *PL · Wrocław
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-zinc-200">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>FIFe / FPL</span>
                </div>
              </div>
            </div>

            {/* Małe zdjęcie drugie: W plenerze z kotem (cat_24.webp) */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden border-2 border-[#09090B] shadow-2xl">
              <Image
                src="/images/cats/cat_24.webp"
                alt="Bliskość i miłość z kotami Maine Coon w hodowli"
                fill
                className="object-cover object-[50%_15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-white/90 font-medium">
                100% Miłości i Czasu
              </div>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Osobisty Opis i Filozofia ─────────────────── */}
          <div className="lg:col-span-6 space-y-6 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === "PL" ? "Domowa, Certyfikowana Felinologia" : "Family Certified Felinology"}</span>
            </div>

            {/* Osobisty, zwięzły opis w stylu Apple Keynote (Zero ścian tekstu) */}
            <h3 className="text-2xl sm:text-3xl font-heading font-light text-white leading-tight">
              {lang === "PL" ? (
                <>
                  Hodowla z sercem i pasją.{" "}
                  <span className="font-semibold text-white">Życie bez klatek.</span>
                </>
              ) : (
                <>
                  Breeding with heart.{" "}
                  <span className="font-semibold text-white">Cage-free living.</span>
                </>
              )}
            </h3>

            <p className="text-lg sm:text-xl font-heading font-light text-amber-200/95 italic leading-snug">
              {lang === "PL"
                ? "„Hodowla to dla nas nie biznes — to domowe ciepło, pasja i bezgraniczna miłość do rasy Maine Coon.”"
                : "“Breeding is not a business for us — it's household warmth, passion and unconditional love.”"}
            </p>

            <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed font-light">
              {lang === "PL"
                ? "Od ponad dekady prowadzimy małą, w 100% domową hodowlę we Wrocławiu zrzeszoną w Cat Club Wrocław (FPL / FIFe). Nasze koty żyją razem z nami w salonie, śpią w łóżkach i wychowują się z dziećmi oraz psem — bez klatek i bez kompromisów."
                : "For over a decade we run a 100% domestic cattery in Wrocław (FPL / FIFe). Our cats live in our living room with our kids and dog — no cages and no compromises."}
            </p>

            {/* 3 Kluczowe Plakietki Zaufania */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { icon: Home, label: lang === "PL" ? "Salon · Zero klatek" : "Living room · No cages" },
                { icon: Stethoscope, label: lang === "PL" ? "Echo serca & DNA N/N" : "Echo Doppler & DNA N/N" },
                { icon: Award, label: lang === "PL" ? "Rodowód FIFe / FPL" : "FIFe / FPL Pedigree" },
              ].map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5 text-xs font-ui text-zinc-200"
                  >
                    <Icon className="w-4 h-4 text-amber-300 shrink-0" />
                    <span className="font-medium">{pill.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Przyciski i Hiperłącze do O Nas */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <Link
                href="/o-nas"
                className="px-7 py-3.5 rounded-full bg-white text-black font-ui text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg hover:scale-105 cursor-pointer"
              >
                <span>{lang === "PL" ? "Poznaj naszą hodowlę i stado w O nas" : "Meet our cattery in About"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {onOpenReservation && (
                <button
                  onClick={onOpenReservation}
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-ui text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
                >
                  {lang === "PL" ? "Zapytaj o kociaka" : "Inquire about kittens"}
                </button>
              )}

              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-ui text-xs font-medium transition-all"
              >
                Facebook (26k+) ↗
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
