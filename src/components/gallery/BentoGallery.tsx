"use client";

import React, { useState } from "react";
import { ALL_AGA_PHOTOS, AGA_CATEGORIES } from "@/data/agaGalleryData";
import AnimatedBentoGrid from "@/components/gallery/AnimatedBentoGrid";

interface BentoGalleryProps {
  lang: "PL" | "EN";
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function BentoGallery({
  lang,
  activeCategory: controlledCategory,
  onCategoryChange: controlledOnChange,
}: BentoGalleryProps) {
  const [internalCategory, setInternalCategory] = useState<string>("all");

  const currentCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const handleCategoryChange = (catId: string) => {
    if (controlledOnChange) {
      controlledOnChange(catId);
    } else {
      setInternalCategory(catId);
    }
  };

  return (
    <section id="galeria" className="relative bg-[#070709] text-white pt-12 sm:pt-16 pb-20 sm:pb-28 overflow-hidden border-t border-white/10 scroll-mt-20">
      {/* Ambient background blur */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedBentoGrid
          photos={ALL_AGA_PHOTOS}
          categories={AGA_CATEGORIES as unknown as { id: string; label: string }[]}
          activeCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
          lang={lang}
          badge={lang === "PL" ? "ARCHIWUM HODOWLI" : "CATTERY ARCHIVE"}
          title={
            <h2
              className="font-heading font-light text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Zdjęcia z hodowli.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Ułożone według kategorii w płynnym ruchu.
                  </span>
                </>
              ) : (
                <>
                  Cattery archive.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Organized by categories in dynamic motion.
                  </span>
                </>
              )}
            </h2>
          }
          subtitle={
            <p>
              {lang === "PL"
                ? "Kompletne archiwum fotografii z naszej hodowli. Wybierz kategorię poniżej lub obserwuj płynny pokaz kadrów."
                : "Complete photography archive of our cattery. Select a category below or watch the dynamic showcase."}
            </p>
          }
        />
      </div>
    </section>
  );
}
