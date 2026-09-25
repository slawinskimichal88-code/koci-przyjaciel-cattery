"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ReservationModal from "@/components/ui/ReservationModal";
import BentoGallery from "@/components/gallery/BentoGallery";
import Link from "next/link";
import { ArrowRight, Phone, Camera, Sparkles } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

export default function GaleriaPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>("all");

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="pt-28 sm:pt-36">

        {/* ── NAGŁÓWEK ZAKŁADKI GALERIA ──────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-6 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-200 font-semibold">
              OFICJALNE ARCHIWUM ZDJĘĆ · KOCI PRZYJACIEL *PL
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            Galeria <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">naszych kotów</span>.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-body max-w-2xl mx-auto font-light leading-relaxed">
            Wszystkie zdjęcia naszych kotów i kociąt z domowego salonu oraz woliery ogrodowej. Wybierz kategorię poniżej, aby oglądać kadry w płynnym, ruchomym układzie.
          </p>
        </section>

        {/* ── PEŁNA, RUCHOMA GALERIA BENTO Z KATEGORIAMI ────────────── */}
        <BentoGallery
          lang={lang}
          activeCategory={selectedGalleryCategory}
          onCategoryChange={(catId) => setSelectedGalleryCategory(catId)}
        />

        {/* ── BANNER CTA ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 mb-16 mt-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#18181B] via-[#121214] to-[#0D0D0F] border border-white/15 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-heading font-medium text-white mb-4">
              Zakochany w naszych łagodnych olbrzymach?
            </h2>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
              Poznaj dostępne kocięta lub skontaktuj się z nami bezpośrednio, by porozmawiać o planowanych miotach i odwiedzinach w naszej hodowli.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dostepne-kociaki"
                className="px-7 py-3.5 rounded-full bg-white text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Dostępne Kociaki</span>
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
