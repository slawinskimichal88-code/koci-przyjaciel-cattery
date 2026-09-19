"use client";

import React from "react";
import Image from "next/image";
import { GALLERY_PHOTOS, MATKI_PHOTOS } from "@/data/realCatsData";
import { ArrowRight, Camera, Sparkles, Image as ImageIcon } from "lucide-react";

interface GalleryTeaserBannerProps {
  lang: "PL" | "EN" | "DE";
  onOpenGallery: () => void;
}

export default function GalleryTeaserBanner({ lang, onOpenGallery }: GalleryTeaserBannerProps) {
  const previewItems = [
    {
      title: "Maluchy z Miotu",
      subtitle: "Ciekawe świata łapki",
      tag: "KOCIĘTA",
      tagBg: "bg-[#FFE5D9]",
      src: GALLERY_PHOTOS[6]?.src || "/images/cats/cat_07.webp",
      rotate: "-rotate-1",
    },
    {
      title: "Dostojny Kocur",
      subtitle: "Prawdziwy lew salonowy",
      tag: "KOCUR",
      tagBg: "bg-[#E0F2FE]",
      src: GALLERY_PHOTOS[2]?.src || "/images/cats/cat_03.webp",
      rotate: "rotate-2",
    },
    {
      title: "Czuła Mama",
      subtitle: "Czyste linie hodowlane",
      tag: "MATKA",
      tagBg: "bg-[#EFE6FD]",
      src: MATKI_PHOTOS[0]?.src || "/images/matki/matka_01.webp",
      rotate: "-rotate-2",
    },
    {
      title: "Życie w Domu",
      subtitle: "Z dziećmi i psem",
      tag: "DOM",
      tagBg: "bg-[#E2F4E7]",
      src: GALLERY_PHOTOS[11]?.src || "/images/cats/cat_12.webp",
      rotate: "rotate-1",
    },
  ];

  return (
    <section id="galeria-zapowiedz" className="py-20 sm:py-28 bg-[#FFF9F2] text-[#2A221F] border-b-2.5 border-[#2A221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#FFE5D9] text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black shadow-[3px_3px_0px_#2A221F]">
              04
            </span>
            <span className="text-[#2A221F] font-black uppercase tracking-widest text-xs">
              📸 Atelier Fotograficzne &bull; Galeria
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">Dedykowana Zakładka</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">105 Prawdziwych Zdjęć</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FEF9C3] border border-[#2A221F]/40 text-[#2A221F]">Bez Klatek</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE6FD] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-3 shadow-[2px_2px_0px_#2A221F]">
              <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Album Naszego Domu &middot; 105 Unikalnych Kadrów
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight">
              Prawdziwe życie naszych kotów. <br />
              <span className="text-2xl sm:text-3xl font-normal italic text-[#2A221F]/80">Zajrzyj do naszego albumu fotograficznego.</span>
            </h2>
            <p className="text-sm text-[#2A221F]/85 font-mono mt-4 leading-relaxed max-w-2xl">
              Szanujemy Twój czas i przejrzystość strony głównej. Zamiast zasypywać stronę setkami zdjęć,
              stworzyliśmy dedykowaną, czytelną <strong>Zakładkę Galeria</strong> z kompletem 105 autentycznych fotografii
              naszych kociąt, matek i kocurów z podziałem na kategorie i pełnoekranowym podglądem.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenGallery}
              className="px-7 py-4 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] border-2.5 border-[#2A221F] font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[5px_5px_0px_#2A221F] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer group"
            >
              <Camera className="w-5 h-5 text-[#2A221F]" />
              <span>Otwórz Zakładkę Galeria (105 Zdjęć)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Curated 4-Card Teaser Showcase Grid (Polaroids with Tape Accents) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {previewItems.map((item, idx) => (
            <div
              key={idx}
              onClick={onOpenGallery}
              className={`group cursor-pointer rounded-2xl p-3 bg-white border-2.5 border-[#2A221F] transition-all duration-300 shadow-[5px_5px_0px_#2A221F] hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_#2A221F] flex flex-col ${item.rotate} hover:rotate-0 relative`}
            >
              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#FFE5D9]/90 border border-[#2A221F]/40 shadow-xs rotate-2 z-20 rounded-xs pointer-events-none" />

              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#FAF7FE] border-2 border-[#2A221F]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Category Badge */}
                <div className={`absolute top-2.5 left-2.5 ${item.tagBg} px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-[#2A221F] border-2 border-[#2A221F] shadow-[2px_2px_0px_#2A221F]`}>
                  {item.tag}
                </div>
              </div>

              {/* Caption */}
              <div className="pt-3 px-1">
                <h4 className="text-base font-black font-editorial text-[#2A221F] leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-[#2A221F]/70 mt-0.5">
                  {item.subtitle}
                </p>
                <div className="mt-2 pt-2 border-t border-[#2A221F]/15 flex items-center justify-between text-[11px] font-mono font-bold text-[#2A221F]">
                  <span className="flex items-center gap-1 text-[#2A221F]/60">
                    <Sparkles className="w-3 h-3 text-[#2A221F]" />
                    Kadr 0{idx + 1}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#2A221F] group-hover:underline">
                    Powiększ &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Strip */}
        <div className="rounded-3xl p-6 sm:p-7 bg-[#FEF9C3] border-2.5 border-[#2A221F] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[5px_5px_0px_#2A221F]">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#2A221F] flex items-center justify-center shrink-0 border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
              <ImageIcon className="w-6 h-6 text-[#2A221F]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black font-editorial text-[#2A221F]">
                Szukasz konkretnego umaszczenia lub płci?
              </h4>
              <p className="text-xs sm:text-sm font-mono text-[#2A221F]/80 mt-0.5">
                W pełnej galerii możesz filtrować: Kociaki, Matki Hodowlane, Kocury oraz codzienne Życie w Domu.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenGallery}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all shrink-0 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            Przejdź do Zakładki Galeria &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
