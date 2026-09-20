"use client";

import React, { useState } from "react";
import { ALL_AGA_PHOTOS, AGA_CATEGORIES } from "@/data/agaGalleryData";
import AnimatedBentoGrid from "@/components/gallery/AnimatedBentoGrid";
import { FolderKanban } from "lucide-react";

interface BentoGalleryProps {
  lang: "PL" | "EN";
  initialCategory?: string;
}

export default function BentoGallery({ lang, initialCategory = "all" }: BentoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  return (
    <section id="galeria" className="relative bg-[#070709] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Ambient background blur */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedBentoGrid
          photos={ALL_AGA_PHOTOS}
          categories={AGA_CATEGORIES as unknown as { id: string; label: string }[]}
          activeCategory={activeCategory}
          onCategoryChange={(catId) => setActiveCategory(catId)}
          lang={lang}
          itemsPerSet={7}
          badge={lang === "PL" ? "ARCHIWUM HODOWLI · BENTO GRID" : "CATTERY ARCHIVE · BENTO GRID"}
          title={
            <h2
              className="font-heading font-light text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              {lang === "PL" ? (
                <>
                  Zdjęcia z hodowli.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Ułożone według folderów bez ściany zdjęć.
                  </span>
                </>
              ) : (
                <>
                  Cattery archive.<br />
                  <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
                    Organized by folders without photo clutter.
                  </span>
                </>
              )}
            </h2>
          }
          subtitle={
            <p>
              {lang === "PL"
                ? `Kompletne archiwum ${ALL_AGA_PHOTOS.length} fotografii podzielone na asymetryczne zestawy Bento (styl Apple & SVGator). Zmień folder poniżej lub przeglądaj zestawy strzałkami.`
                : `Complete archive of ${ALL_AGA_PHOTOS.length} photos presented in dynamic Bento sets. Select a folder or browse sets with controls below.`}
            </p>
          }
        />
      </div>
    </section>
  );
}
