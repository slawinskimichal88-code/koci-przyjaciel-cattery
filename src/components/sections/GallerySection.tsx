"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/realCatsData";

interface GallerySectionProps {
  lang: "PL" | "EN";
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const photos = GALLERY_PHOTOS.slice(0, 12);

  return (
    <section id="galeria" className="bg-[#0A0A0A] text-white overflow-hidden">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-white/30 mb-6">
          {lang === "PL" ? "Galeria" : "Gallery"}
        </p>
        <h2
          className="font-heading font-light text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Nasze<br />
          <span className="font-semibold italic">koty.</span>
        </h2>
      </div>

      {/* ── Siatka zdjęć — Apple-style masonry grid ──────────────── */}
      <div className="reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px]">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightbox(photo.src)}
            className={`reveal reveal-delay-${Math.min(i % 6 + 1, 6)} relative overflow-hidden cursor-pointer group ${
              i === 0 || i === 5 ? "col-span-2 row-span-2" : ""
            }`}
            style={{
              aspectRatio: (i === 0 || i === 5) ? "1/1" : (photo.aspect === "landscape" ? "4/3" : "3/4"),
            }}
          >
            <Image
              src={photo.src}
              alt={photo.title || "Maine Coon Koci Przyjaciel"}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-2xl max-h-[85vh]">
            <Image
              src={lightbox}
              alt="Koci Przyjaciel"
              width={800}
              height={1000}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="h-20" />
    </section>
  );
}
