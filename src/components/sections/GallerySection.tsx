"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/realCatsData";

interface GallerySectionProps {
  lang: "PL" | "EN";
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  
  // 12 starannie wyselekcjonowanych, najwyższej jakości kadrów prezentujących pełne spektrum hodowli
  const curatedPhotos = [
    { id: "g-1", src: "/images/cats/cat_18.webp", title: "Oficjalny portret hodowlany — Koci Przyjaciel *PL", aspect: "portrait" },
    { id: "g-2", src: "/images/matki/matka_07.webp", title: "Ponad metr długości — gigant w pełnej krasie", aspect: "landscape" },
    { id: "g-3", src: "/images/cats/cat_09.webp", title: "Mama z kociakiem — spokój i bezpieczeństwo", aspect: "portrait" },
    { id: "g-4", src: "/images/cats/cat_27.webp", title: "100% socjalizacja z dziećmi — rodzina w ogrodzie", aspect: "landscape" },
    { id: "g-5", src: "/images/cats/cat_34.webp", title: "Srebrzysty reproduktor o lwich pędzlach", aspect: "portrait" },
    { id: "g-6", src: "/images/cats/cat_15.webp", title: "Maine Coon na desce SUP — miłość do wody", aspect: "square" },
    { id: "g-7", src: "/images/cats/cat_08.webp", title: "Srebrzysty klasyczny kociak z hodowli", aspect: "portrait" },
    { id: "g-8", src: "/images/cats/cat_10.webp", title: "Biały maluch o bursztynowych oczach", aspect: "portrait" },
    { id: "g-9", src: "/images/matki/matka_05.webp", title: "Imponujący 40 cm pióropusz ogona", aspect: "square" },
    { id: "g-10", src: "/images/cats/cat_20.webp", title: "Zabawa na kanapie — beztroskie dzieciństwo", aspect: "portrait" },
    { id: "g-11", src: "/images/cats/cat_24.webp", title: "Zachód słońca nad jeziorem — więź na całe życie", aspect: "portrait" },
    { id: "g-12", src: "/images/cats/cat_32.webp", title: "Certyfikowany rodowód Felis Polonia FPL", aspect: "portrait" },
  ];

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
        {curatedPhotos.map((photo, i) => (
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
              className="object-cover group-hover:scale-105 transition-all duration-500"
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
