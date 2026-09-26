"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { REAL_FACEBOOK_URL, REAL_INSTAGRAM_URL } from "@/data/realCatsData";
import {
  ArrowRight,
  ThumbsUp,
  Heart,
  Sparkles,
  ExternalLink,
  X,
  Maximize2,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

interface FacebookCommunitySectionProps {
  lang: "PL" | "EN";
}

interface MiniStory {
  id: string;
  author: string;
  tag: string;
  badge: string;
  quote: string;
  likes: string;
  comments: string;
  screenSrc: string;
  screenThumb: string;
}

export default function FacebookCommunitySection({ lang }: FacebookCommunitySectionProps) {
  const [followerCount, setFollowerCount] = useState<string>("26 400+");
  const [isLive, setIsLive] = useState<boolean>(false);
  const [activeStory, setActiveStory] = useState<MiniStory | null>(null);

  const stories: MiniStory[] = [
    {
      id: "story-1",
      author: "Hodowla Kotów Koci Przyjaciel",
      tag: "Oficjalny profil",
      badge: "26 tys. fanów",
      quote: "Codzienne relacje z rozwoju maluchów, transmisje na żywo z salonu i bezpiecznego wybiegu.",
      likes: "26k",
      comments: "3.7k postów",
      screenSrc: "/images/facebook/fb_screenshot_1.webp",
      screenThumb: "/images/facebook/fb_screenshot_1_thumb.webp",
    },
    {
      id: "story-2",
      author: "Pani Małgosia i rodzina",
      tag: "Nowy dom",
      badge: "Białasek w domu",
      quote: "„Nasze koty świetnie dogadują się ze zwierzętami, które już mieliśmy. Dziękuję za piękne chwile!”",
      likes: "36",
      comments: "2",
      screenSrc: "/images/facebook/fb_screenshot_2.webp",
      screenThumb: "/images/facebook/fb_screenshot_2_thumb.webp",
    },
    {
      id: "story-3",
      author: "Kasia & Koci Przyjaciel",
      tag: "Aktywny Maine Coon",
      badge: "Spacer rowerowy",
      quote: "„Pierwszy spacer na szelkach w koszyku rowerowym. Spokój, ciekawość świata i pełne zaufanie.”",
      likes: "20",
      comments: "2",
      screenSrc: "/images/facebook/fb_screenshot_5.webp",
      screenThumb: "/images/facebook/fb_screenshot_5_thumb.webp",
    },
    {
      id: "story-4",
      author: "Miot 2026 · Koci Przyjaciel",
      tag: "Rzadkość genetyczna",
      badge: "Czarne dymy (Smoke)",
      quote: "„Majestatyczne umaszczenie black smoke. Maluchy rosną jak na drożdżach pod okiem mamy.”",
      likes: "84",
      comments: "14",
      screenSrc: "/images/facebook/fb_screenshot_3.webp",
      screenThumb: "/images/facebook/fb_screenshot_3_thumb.webp",
    },
  ];

  const communityPhotos = [
    { id: "comm-1", src: "/images/cats/cat_21.webp", title: "Maine Coon z dzieckiem na kanapie" },
    { id: "comm-2", src: "/images/cats/cat_22.webp", title: "Kocur odpoczywający na drapaku" },
    { id: "comm-3", src: "/images/cats/cat_23.webp", title: "Kociak w ramionach nowej opiekunki" },
    { id: "comm-4", src: "/images/cats/cat_15.webp", title: "Maine Coon na desce SUP — miłość do wody" },
    { id: "comm-5", src: "/images/cats/cat_24.webp", title: "Czułość o zachodzie słońca nad jeziorem" },
    { id: "comm-6", src: "/images/cats/cat_20.webp", title: "Radosna zabawa z maskotką na kanapie" },
  ];

  useEffect(() => {
    fetch("/api/facebook-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data?.formatted) {
          setFollowerCount(data.formatted);
          setIsLive(Boolean(data.isLive));
        }
      })
      .catch((err) => {
        console.warn("Błąd licznika FB:", err);
      });
  }, []);

  return (
    <section id="spolecznosc" className="bg-black text-[#f5f5f7] overflow-hidden border-t border-white/[0.08] py-16 sm:py-24 relative">
      
      {/* ── Intro (Apple Keynote Style) ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] mb-5 font-medium">
          <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
          <span className="text-[#f5f5f7]">
            {lang === "PL"
              ? "Społeczność Hodowli na Facebooku"
              : "Facebook Cattery Community"}
          </span>
        </div>

        <h2
          className="font-heading font-light text-[#f5f5f7] leading-[1.02] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
        >
          {followerCount} fanów.<br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">
            Nasza wielka rodzina na Facebooku.
          </span>
        </h2>

        <p className="text-base sm:text-lg font-body text-[#86868b] max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Codzienne relacje z życia hodowli, autentyczne opinie i zdjęcia z nowych domów publikowane bez filtrów w naszej aktywnej społeczności."
            : "Daily life updates, genuine family feedback, and joyful photos from forever homes shared directly with our thriving community."}
        </p>
      </div>

      {/* ── INTERAKTYWNA KOMPAKTOWA BELKA SPOŁECZNOŚCI (Apple Bento Strip) ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="p-6 sm:p-8 rounded-[28px] bg-[#161617] border border-white/[0.08]">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#1877F2]">
                <FacebookIcon className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#86868b] block font-medium">
                  Autentyczne relacje i zrzuty postów
                </span>
                <div className="text-sm font-medium text-[#f5f5f7]">
                  Kliknij relację, aby zobaczyć oryginalny wpis z Facebooka
                </div>
              </div>
            </div>

            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-ui font-medium tracking-tight transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Przejdź na profil Facebook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4 Kompaktowe Kapsuły / Pigułki ze zrzutami */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveStory(item)}
                className="group relative cursor-pointer p-4 rounded-[20px] bg-[#1d1d1f] hover:bg-[#242426] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-16 rounded-xl overflow-hidden border border-white/[0.1] shrink-0 bg-black shadow-xs group-hover:scale-105 transition-transform">
                      <Image
                        src={item.screenThumb || item.screenSrc}
                        alt={item.author}
                        width={48}
                        height={64}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#2997ff] font-medium block truncate">
                        {item.badge}
                      </span>
                      <h3 className="text-xs font-medium text-[#f5f5f7] truncate">
                        {item.author}
                      </h3>
                      <span className="text-[10px] text-[#86868b] font-mono block">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#86868b] font-body line-clamp-2 leading-relaxed italic mb-3 font-light">
                    {item.quote}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-[#86868b] font-ui">
                  <span className="flex items-center gap-1 font-medium text-[#2997ff]">
                    <ThumbsUp className="w-2.5 h-2.5 fill-current" />
                    <span>{item.likes}</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Powiększ</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2 KARTY GŁÓWNE: Facebook + Instagram (Apple Dark Cards) ─────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* KARTA FACEBOOK */}
          <div className="p-7 sm:p-8 rounded-[28px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2]">
                  <FacebookIcon className="w-5 h-5 fill-current" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isLive ? "LIVE META API" : "AKTYWNA SPOŁECZNOŚĆ"}</span>
                </div>
              </div>

              <div className="mb-3">
                <span className="font-heading font-medium text-[#f5f5f7] text-3xl sm:text-4xl block tracking-tight">
                  {followerCount}
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] font-medium mt-1">
                  Obserwujących profil Koci Przyjaciel *PL
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#86868b] font-body mb-6 leading-relaxed font-light">
                Codzienne transmisje na żywo, relacje z rozwoju maluchów, porady felinologiczne i galeria zdjęć z całego kraju.
              </p>
            </div>

            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-ui font-medium tracking-tight transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            >
              <span>{lang === "PL" ? "Dołącz do nas na Facebooku" : "Join on Facebook"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* KARTA INSTAGRAM */}
          <div className="p-7 sm:p-8 rounded-[28px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#E4405F]/10 border border-[#E4405F]/20 flex items-center justify-center text-[#E4405F]">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-[#86868b] font-medium">
                  @koci_przyjaciel_pl
                </div>
              </div>

              <div className="mb-3">
                <span className="font-heading font-medium text-[#f5f5f7] text-3xl sm:text-4xl block tracking-tight">
                  Instagram
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-[#86868b] font-medium mt-1">
                  Rolki, Stories & Zdjęcia Makro
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#86868b] font-body mb-6 leading-relaxed font-light">
                Krótkie formy wideo w formacie 4K, zbliżenia na rysiowe pędzle uszu, zabawy na wybiegu i backstage z życia hodowli.
              </p>
            </div>

            <a
              href={REAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 text-[#f5f5f7] text-xs font-ui font-medium tracking-tight border border-white/15 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer backdrop-blur-md"
            >
              <span>{lang === "PL" ? "Obserwuj na Instagramie" : "Follow on Instagram"}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Mini Gallery: Zdjęcia z Nowych Domów ─────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] mb-5 font-medium">
          {lang === "PL" ? "ZDJĘCIA NADESŁANE PRZEZ NASZYCH OPIEKUNÓW:" : "PHOTOS SENT BY ADOPTIVE FAMILIES:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {communityPhotos.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-[18px] overflow-hidden border border-white/[0.08] group bg-[#161617]"
            >
              <Image
                src={item.src}
                alt="Maine Coon Koci Przyjaciel w nowym domu"
                fill
                draggable={false}
                className="object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="w-5 h-5 text-white/90 fill-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CZYSTY LIGHTBOX (PO KLIKNIĘCIU W MAŁĄ RELACJĘ) ───────── */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#161617] rounded-[28px] overflow-hidden shadow-2xl flex flex-col border border-white/20"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/[0.08] bg-[#1c1c1e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]">
                    <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#f5f5f7]">
                      {activeStory.author}
                    </h4>
                    <span className="text-[10px] text-[#86868b] font-mono">
                      {activeStory.tag}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f7] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeStory.screenSrc}
                  alt={activeStory.quote}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-auto max-h-[60vh] object-contain pointer-events-none select-none"
                />
                <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
              </div>

              <div className="p-4 border-t border-white/[0.08] bg-[#161617]">
                <p className="text-xs text-[#86868b] leading-relaxed font-light italic mb-3">
                  {activeStory.quote}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#2997ff] flex items-center gap-1.5">
                    <ThumbsUp className="w-3 h-3 fill-current" />
                    <span>{activeStory.likes} polubień</span>
                  </span>
                  <a
                    href={REAL_FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#2997ff] hover:underline flex items-center gap-1"
                  >
                    <span>Zobacz na Facebooku</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
