"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Sun, Home, Stethoscope, ArrowRight, Volume2, VolumeX, Sparkles } from "lucide-react";

interface EnclosureSectionProps {
  lang?: "PL" | "EN";
  onOpenReservation?: (kittenName?: string) => void;
}

export default function EnclosureSection({
  lang = "PL",
}: EnclosureSectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <section id="wybieg" className="relative bg-[#09090B] text-white py-14 sm:py-20 border-t border-white/10 overflow-hidden">
      
      {/* Subtelna poświata w tle */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEWA KOLUMNA: FILOZOFIA I 3 FILARY (WYBIEG, DOM, ZDROWIE) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400 mb-4 self-start shadow-sm">
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === "PL" ? "Ogród i Woliera 365 dni" : "Year-round Garden Enclosure"}</span>
            </div>

            <h2
              className="font-heading font-light text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.8rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Wybieg dla kotów.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-zinc-300">
                    Woliera 365 dni w roku.
                  </span>
                </>
              ) : (
                <>
                  Outdoor Enclosure.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-zinc-300">
                    Fresh air 365 days a year.
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-body font-light leading-relaxed mb-6">
              {lang === "PL"
                ? "Bezpieczna, zadaszona przestrzeń w ogrodzie z bezpośrednim przejściem z domowego salonu. Nasze koty same decydują, kiedy chcą wyjść na świeże powietrze, obserwować ptaki i wygrzewać się na słońcu — bez krat i klatek."
                : "Safe, covered garden run with direct access from our living room. Our cats freely explore fresh air and nature 365 days a year without cages."}
            </p>

            {/* 3 Bloki z cechami (zawsze widoczne, zero pustych dziur) */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {lang === "PL" ? "01 / Bezpieczna woliera ogrodowa" : "01 / Secure Outdoor Run"}
                  </div>
                  <div className="text-xs text-zinc-400 font-light mt-0.5">
                    {lang === "PL" ? "Całoroczny dostęp do natury, traw, świeżego powietrza i słońca." : "Year-round access to fresh air, grass and nature."}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {lang === "PL" ? "02 / Ciepło rodzinnego salonu" : "02 / Living Room Family Warmth"}
                  </div>
                  <div className="text-xs text-zinc-400 font-light mt-0.5">
                    {lang === "PL" ? "Śpią na kanapach, uczestniczą w życiu domu, wychowują się przy dzieciach i psie." : "Socialized with family, children, and dogs."}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {lang === "PL" ? "03 / Certyfikowane zdrowie & DNA" : "03 / Certified Health & DNA"}
                  </div>
                  <div className="text-xs text-zinc-400 font-light mt-0.5">
                    {lang === "PL" ? "Echo Doppler HCM, profil DNA Laboklin N/N i prawdziwy rodowód FIFe." : "Echo Doppler cardiac checks, Laboklin DNA, and FIFe pedigree."}
                  </div>
                </div>
              </div>
            </div>

            {/* Przycisk przejścia do podstrony O nas */}
            <div>
              <Link
                href="/o-nas#wybieg"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-body text-xs sm:text-sm font-semibold border border-white/20 transition-all hover:scale-105"
              >
                <span>{lang === "PL" ? "Poznaj historię wybiegu w zakładce O nas" : "Explore enclosure in About"}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </div>
          </div>

          {/* PRAWA KOLUMNA: AUTENTYCZNE WIDEO Z WYBIEGU W FORMACIE SMARTFONA APPLE */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[580px] rounded-[36px] overflow-hidden border-[3px] border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-black">
              
              <video
                ref={videoRef}
                src="/video/film2.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Gradienty ochronne dla tekstu na filmie */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Przycisk dźwięku */}
              <button
                onClick={toggleSound}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer hover:scale-110"
                title={isMuted ? "Włącz dźwięk" : "Wycisz dźwięk"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Plakietka dolna na filmie */}
              <div className="absolute bottom-5 left-5 right-5 text-left pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono uppercase tracking-wider text-emerald-300 mb-1.5 inline-block">
                  {lang === "PL" ? "Woliera Ogrodowa Wrocław" : "Garden Run Wroclaw"}
                </span>
                <p className="text-base sm:text-lg font-heading font-medium text-white leading-snug">
                  {lang === "PL" ? "Nasz dom to ich dom" : "Our home is their home"}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
