"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { ALL_AGA_PHOTOS } from "@/data/agaGalleryData";
import AnimatedBentoGrid from "@/components/gallery/AnimatedBentoGrid";

interface BentoShowcaseSectionProps {
  lang: "PL" | "EN";
}

export default function BentoShowcaseSection({ lang }: BentoShowcaseSectionProps) {
  // Select top 14 curated photos across key categories for 2 dynamic Bento sets (7 photos each)
  const showcasePhotos = useMemo(() => {
    const wybieg = ALL_AGA_PHOTOS.filter((p) => p.category === "wybieg").slice(0, 3);
    const kocury = ALL_AGA_PHOTOS.filter((p) => p.category === "kocury").slice(0, 3);
    const matki = ALL_AGA_PHOTOS.filter((p) => p.category === "matki").slice(0, 3);
    const mlode = ALL_AGA_PHOTOS.filter((p) => p.category === "mlode").slice(0, 3);
    const wDomu = ALL_AGA_PHOTOS.filter((p) => p.category === "w-domu").slice(0, 2);

    // Interleave to produce balanced variety in each 7-photo Bento board
    return [
      wybieg[0], // Slot 0: Hero
      kocury[0], // Slot 1: Tall
      matki[0],  // Slot 2: Square
      mlode[0],  // Slot 3: Square
      wDomu[0],  // Slot 4: Wide
      kocury[1], // Slot 5: Square
      wybieg[1], // Slot 6: Square
      // Set 2
      matki[1],  // Slot 0: Hero
      mlode[1],  // Slot 1: Tall
      wybieg[2], // Slot 2: Square
      wDomu[1],  // Slot 3: Square
      kocury[2], // Slot 4: Wide
      matki[2],  // Slot 5: Square
      mlode[2],  // Slot 6: Square
    ].filter(Boolean);
  }, []);

  return (
    <section id="galeria-showcase" className="relative bg-[#09090B] text-white py-20 sm:py-28 overflow-hidden border-t border-white/10">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedBentoGrid
          photos={ALL_AGA_PHOTOS}
          lang={lang}
          badge={lang === "PL" ? "Galeria Hodowlana" : "Cattery Showcase"}
          title={
            <h2
              className="font-heading font-light text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Prawdziwe kadry.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Od wybiegu po domowe kanapy.
                  </span>
                </>
              ) : (
                <>
                  Authentic moments.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    From garden run to living room sofas.
                  </span>
                </>
              )}
            </h2>
          }
          subtitle={
            <p>
              {lang === "PL"
                ? "Autentyczne ujęcia z życia naszych kotów. Kliknij dowolny kadr, by powiększyć go na pełny ekran."
                : "Authentic moments from our cattery. Click any image to expand fullscreen."}
            </p>
          }
          headerRight={
            <div className="flex flex-col items-start sm:items-end gap-2">
              <Link
                href="/o-nas#galeria"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold transition-all group shadow-md hover:scale-105"
              >
                <span>
                  {lang === "PL" ? "Pełna galeria" : "Full gallery"}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-zinc-500">
                {lang === "PL" ? "Kategorie: Wybieg, Kocury, Matki, Młode, W domu" : "Categories: Enclosure, Studs, Queens, Kittens, Home"}
              </span>
            </div>
          }
        />
      </div>
    </section>
  );
}
