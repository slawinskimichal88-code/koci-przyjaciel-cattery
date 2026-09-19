"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS, MATKI_PHOTOS, CatPhoto, REAL_FACEBOOK_URL, REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowUpRight, Camera, Phone, ArrowLeft, Sparkles } from "lucide-react";

interface GallerySectionProps {
  lang: "PL" | "EN" | "DE";
  onBackToHome?: () => void;
}

// Combine all 105 authentic photos into a unified archive
const ALL_PHOTOS: CatPhoto[] = [
  ...MATKI_PHOTOS.map((m, idx) => ({
    id: `matka-${idx + 1}`,
    src: m.src,
    width: m.width,
    height: m.height,
    aspect: m.aspect,
    category: "matki",
    title: `Matka Hodowlana Koci Przyjaciel #${idx + 1}`,
  })),
  ...GALLERY_PHOTOS,
];

export default function GallerySection({ lang, onBackToHome }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "Wszystkie kadry", count: ALL_PHOTOS.length, bg: "bg-[#FFE5D9]" },
    { id: "kociaki", label: "🐾 Kocięta & Maluchy", count: ALL_PHOTOS.filter((p) => p.category === "kociaki").length, bg: "bg-[#E2F4E7]" },
    { id: "matki", label: "🌸 Matki Hodowlane", count: ALL_PHOTOS.filter((p) => p.category === "matki").length, bg: "bg-[#EFE6FD]" },
    { id: "kocury", label: "👑 Dostojne Kocury", count: ALL_PHOTOS.filter((p) => p.category === "kocury").length, bg: "bg-[#E0F2FE]" },
    { id: "zycie_w_domu", label: "🏡 Życie w Domu", count: ALL_PHOTOS.filter((p) => p.category === "zycie_w_domu" || p.category === "domowe").length, bg: "bg-[#FEF9C3]" },
  ];

  const filteredPhotos = ALL_PHOTOS.filter((photo) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "zycie_w_domu") return photo.category === "zycie_w_domu" || photo.category === "domowe";
    return photo.category === activeCategory;
  });

  const displayedPhotos = filteredPhotos.slice(0, visibleCount);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentLightboxPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="galeria" className="py-20 sm:py-28 bg-[#FDFBF7] text-[#2A221F] border-b-2.5 border-[#2A221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back to Home Button when rendered as dedicated tab */}
        {onBackToHome && (
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFE5D9] border-2.5 border-[#2A221F] shadow-[4px_4px_0px_#2A221F]">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7FE] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Wróć do Strony Głównej</span>
            </button>
            <div className="text-xs font-mono font-bold text-[#2A221F] uppercase tracking-wider">
              📸 Dedykowana Zakładka &bull; 105 Prawdziwych Zdjęć (Bez Retuszu)
            </div>
          </div>
        )}

        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E2F4E7] text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black shadow-[3px_3px_0px_#2A221F]">
              03
            </span>
            <span className="text-[#2A221F] font-black uppercase tracking-widest text-xs">
              🐾 Archiwum Fotograficzne &bull; 105 Kadrów
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5D9] border border-[#2A221F]/40 text-[#2A221F]">Bez Retuszu</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#2A221F]/40 text-[#2A221F]">Realne Zdjęcia Kotów</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFE6FD] border border-[#2A221F]/40 text-[#2A221F]">Wrocław</span>
          </div>
        </div>

        {/* Section Headline & Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF9C3] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-3 shadow-[2px_2px_0px_#2A221F]">
              <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Album Naszych Kotów &middot; Domowa Atmosfera
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight">
              Autentyczność bez filtrów. <br />
              <span className="text-2xl sm:text-3xl font-normal italic text-[#2A221F]/80">Tak naprawdę żyją nasze Maine Coony.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2A221F]/85 max-w-md leading-relaxed font-mono">
            Ponad 100 niepozowanych ujęć z naszego domu i hodowli. Zobacz, jak dorastają maluchy, 
            jak potężne są dorosłe kocury i jak czule matki opiekują się swoim potomstwem.
          </p>
        </div>

        {/* Category Filters: Pastel Cartoon Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 border-b-2 border-[#2A221F]/15 pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(18);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-black transition-all flex items-center gap-2 cursor-pointer uppercase border-2 border-[#2A221F] ${
                  isActive
                    ? `${cat.bg} text-[#2A221F] shadow-[3px_3px_0px_#2A221F] -translate-y-0.5`
                    : "bg-white text-[#2A221F]/70 hover:text-[#2A221F] hover:bg-[#FAF7FE] shadow-[2px_2px_0px_#2A221F]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono font-black bg-white text-[#2A221F] border border-[#2A221F]"
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Lookbook Grid (Polaroid Style Tiles) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {displayedPhotos.map((photo, index) => {
            const isFeatured = index % 7 === 0;
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer p-2 sm:p-2.5 bg-white border-2.5 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] hover:shadow-[6px_6px_0px_#2A221F] hover:-translate-y-1 transition-all ${
                  isFeatured ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full rounded-xl overflow-hidden bg-[#FAF7FE] border border-[#2A221F]/40 ${
                    isFeatured
                      ? "aspect-[4/3] sm:aspect-[16/11]"
                      : photo.aspect === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title || `Kot z hodowli #${index + 1}`}
                    fill
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    loading={index < 8 ? "eager" : "lazy"}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-left subtle monospaced archive index */}
                  <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded-md text-[9px] font-mono text-[#2A221F] font-bold border border-[#2A221F] shadow-xs">
                    KP#{String(index + 1).padStart(3, "0")}
                  </div>

                  {/* Hover Veil */}
                  <div className="absolute inset-0 bg-[#2A221F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                    <div className="px-3 py-1.5 rounded-xl bg-white text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black shadow-[2px_2px_0px_#2A221F] flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Powiększ</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredPhotos.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 18, filteredPhotos.length))}
              className="px-7 py-3.5 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2.5 border-[#2A221F] shadow-[4px_4px_0px_#2A221F] transition-all gap-2.5 inline-flex items-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <Camera className="w-4 h-4" />
              <span>Załaduj kolejne kadry ({filteredPhotos.length - visibleCount} pozostało)</span>
            </button>
          </div>
        )}

        {/* Bottom Contact Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#E2F4E7] border-2.5 border-[#2A221F] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[5px_5px_0px_#2A221F]">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F]">
              Zauroczył Cię któryś z naszych kotów?
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#2A221F]/80">
              Skontaktuj się z nami, aby porozmawiać o wolnych maluchach lub umówić wizytę w hodowli we Wrocławiu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF7FE] text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#2A221F] transition-all cursor-pointer"
              >
                ← Strona Główna
              </button>
            )}
            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="px-5 py-3 rounded-xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] border-2 border-[#2A221F] font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#2A221F] transition-all cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{REAL_PHONE}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox in Cozy Pastel Theme */}
      {selectedPhotoIndex !== null && currentLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#2A221F]/85 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between text-[#FDFBF7] border-b border-white/20 pb-3 max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black border border-[#2A221F]">
                KP#{String(selectedPhotoIndex + 1).padStart(3, "0")}
              </span>
              <span className="text-xs font-mono text-white/80">
                {selectedPhotoIndex + 1} z {filteredPhotos.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#2A221F] text-xs font-mono font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{REAL_PHONE}</span>
              </a>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-2 rounded-full bg-white text-[#2A221F] hover:bg-[#FFE5D9] transition-colors cursor-pointer"
                title="Zamknij (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image & Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center py-4 max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePrevPhoto}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white text-[#2A221F] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all z-10 cursor-pointer"
              title="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-h-[75vh] w-full h-full flex items-center justify-center">
              <div className="relative max-w-3xl max-h-[75vh] w-auto h-auto p-2 bg-white rounded-2xl border-3 border-[#2A221F] shadow-[8px_8px_0px_#2A221F]">
                <Image
                  src={currentLightboxPhoto.src}
                  alt={currentLightboxPhoto.title || "Kot Maine Coon"}
                  width={currentLightboxPhoto.width || 1200}
                  height={currentLightboxPhoto.height || 900}
                  className="max-h-[70vh] w-auto object-contain rounded-xl"
                  priority
                />
              </div>
            </div>

            <button
              onClick={handleNextPhoto}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white text-[#2A221F] border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F] transition-all z-10 cursor-pointer"
              title="Następne zdjęcie"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Info Bar */}
          <div
            className="max-w-5xl w-full mx-auto bg-white border-2 border-[#2A221F] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#2A221F] shadow-[4px_4px_0px_#2A221F]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-bold text-base font-editorial">
                {currentLightboxPhoto.title || "Maine Coon Koci Przyjaciel *PL"}
              </h3>
              <p className="text-[#2A221F]/70 text-xs font-mono mt-0.5">
                Fotografia autentyczna &bull; Wrocław &bull; Rodowód FIFe / FPL
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${REAL_PHONE_RAW}`}
                className="px-4 py-2 rounded-xl bg-[#FFE5D9] text-[#2A221F] border-2 border-[#2A221F] text-xs font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_#2A221F]"
              >
                <span>Zapytaj o tę linię</span>
                <Phone className="w-3.5 h-3.5" />
              </a>

              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#E0F2FE] text-[#2A221F] border-2 border-[#2A221F] text-xs font-mono font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#2A221F]"
              >
                <span>Profil Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
