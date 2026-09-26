"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FBPost } from "@/lib/facebook";
import { FacebookIcon } from "@/components/ui/SocialIcons";
import {
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PostCardProps {
  post: FBPost;
  className?: string;
}

export default function PostCard({ post, className = "" }: PostCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatowanie daty po polsku
  const dateFormatted = new Date(post.createdTime).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const photos = post.media.filter((m) => m.type === "photo");
  const hasMultiplePhotos = photos.length > 1;
  const firstMedia = post.media[0];

  const isLongMessage = post.message.length > 200;
  const displayedMessage =
    isLongMessage && !isExpanded
      ? `${post.message.slice(0, 190)}...`
      : post.message;

  const openLightbox = (index = 0) => {
    setActiveMediaIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxMedia = () => {
    setActiveMediaIndex((prev) => (prev + 1) % post.media.length);
  };

  const prevLightboxMedia = () => {
    setActiveMediaIndex(
      (prev) => (prev - 1 + post.media.length) % post.media.length
    );
  };

  return (
    <>
      <article
        className={`group flex flex-col rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Media (Zdjęcie, Galeria lub Wideo) */}
        {firstMedia && (
          <div className="relative w-full h-64 sm:h-72 bg-black/60 overflow-hidden">
            {firstMedia.type === "video" ? (
              firstMedia.url.endsWith(".mp4") ||
              firstMedia.url.includes("blob:") ||
              firstMedia.url.startsWith("/") ? (
                <video
                  controls
                  preload="metadata"
                  poster={firstMedia.thumbnail}
                  className="w-full h-full object-cover"
                >
                  <source src={firstMedia.url} type="video/mp4" />
                  Twoja przeglądarka nie obsługuje odtwarzacza wideo.
                </video>
              ) : (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                    firstMedia.url
                  )}&show_text=false&t=0`}
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              )
            ) : (
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="relative w-full h-full block cursor-pointer group/img text-left"
                aria-label="Powiększ zdjęcie posta"
              >
                <Image
                  src={firstMedia.url}
                  alt="Post z hodowli kotów Maine Coon Koci Przyjaciel"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                />

                {/* Nakładka przyciemniająca na hover */}
                <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/0 transition-colors" />

                {/* Znacznik liczby zdjęć w albumie */}
                {hasMultiplePhotos && (
                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-ui font-semibold shadow-md">
                    <Layers className="w-3.5 h-3.5" />
                    <span>+{photos.length - 1} zdjęć</span>
                  </div>
                )}
              </button>
            )}
          </div>
        )}

        {/* Treść posta */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
          <div>
            {/* Nagłówek: Data i badge FB */}
            <div className="flex items-center justify-between gap-3 text-xs text-zinc-400 mb-3 font-ui">
              <span className="inline-flex items-center gap-1.5 text-zinc-300 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
                {dateFormatted}
              </span>
              <span className="inline-flex items-center gap-1 text-[#1877F2] font-semibold bg-[#1877F2]/10 px-2 py-0.5 rounded-md border border-[#1877F2]/20">
                <FacebookIcon className="w-3 h-3 fill-current" />
                Facebook
              </span>
            </div>

            {/* Treść tekstowa posta */}
            {post.message && (
              <div className="text-zinc-200 text-sm sm:text-[15px] font-body leading-relaxed whitespace-pre-line">
                {displayedMessage}
                {isLongMessage && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-1 ml-2 text-xs font-ui text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        Zwiń <ChevronUp className="w-3 h-3 inline" />
                      </>
                    ) : (
                      <>
                        Więcej <ChevronDown className="w-3 h-3 inline" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Dolny pasek: Akcje i bezpośredni link do Facebooka */}
          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-ui">
            {post.media.length > 0 && (
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 font-medium"
              >
                Zobacz media ({post.media.length})
              </button>
            )}

            <a
              href={post.permalinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1877F2] hover:text-[#4595ff] font-semibold transition-colors ml-auto group/link"
            >
              <span>Zobacz na Facebooku</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </article>

      {/* Lightbox Modal (Pełnoekranowy podgląd galerii) */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Zamknięcie */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Zamknij podgląd"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Główny kontener mediów w Lightboxie */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row bg-zinc-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Obszar multimediów (lewa strona / góra) */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[450px] bg-black flex items-center justify-center">
              {post.media[activeMediaIndex]?.type === "video" ? (
                <video
                  controls
                  autoPlay
                  src={post.media[activeMediaIndex].url}
                  poster={post.media[activeMediaIndex].thumbnail}
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              ) : (
                <div className="relative w-full h-full min-h-[350px] sm:min-h-[500px]">
                  <Image
                    src={post.media[activeMediaIndex].url}
                    alt="Powiększone zdjęcie posta"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}

              {/* Przyciski nawigacji poprzecznej w albumie */}
              {post.media.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxMedia}
                    aria-label="Poprzednie zdjęcie"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextLightboxMedia}
                    aria-label="Następne zdjęcie"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white text-xs font-ui">
                    {activeMediaIndex + 1} / {post.media.length}
                  </div>
                </>
              )}
            </div>

            {/* Obszar informacji o poście (prawa strona / dół) */}
            <div className="w-full md:w-80 lg:w-96 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-zinc-900/90 overflow-y-auto max-h-[40vh] md:max-h-[75vh]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <Image
                      src="/logo.webp"
                      alt="Logo Koci Przyjaciel"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold font-ui">
                      Koci Przyjaciel *PL
                    </h4>
                    <span className="text-zinc-400 text-xs font-ui block">
                      {dateFormatted}
                    </span>
                  </div>
                </div>

                <p className="text-zinc-200 text-sm font-body leading-relaxed whitespace-pre-line">
                  {post.message}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href={post.permalinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-ui font-semibold transition-all shadow-md"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                  <span>Otwórz na Facebooku</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
