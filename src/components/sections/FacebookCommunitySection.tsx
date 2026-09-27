"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { REAL_FACEBOOK_URL, REAL_INSTAGRAM_URL } from "@/data/realCatsData";
import {
  ArrowRight,
  ThumbsUp,
  Heart,
  ExternalLink,
  X,
  Maximize2,
  Sparkles,
  MessageCircle,
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
      tag: lang === "PL" ? "Oficjalny profil" : "Official page",
      badge: "26 tys. fanów",
      quote:
        lang === "PL"
          ? "Codzienne relacje z rozwoju maluchów, transmisje na żywo z salonu i bezpiecznego wybiegu."
          : "Daily nursery updates, live streaming from our home and safe outdoor catio.",
      likes: "26k",
      comments: "3.7k postów",
      screenSrc: "/images/facebook/fb_screenshot_1.webp",
      screenThumb: "/images/facebook/fb_screenshot_1_thumb.webp",
    },
    {
      id: "story-2",
      author: "Pani Małgosia i rodzina",
      tag: lang === "PL" ? "Nowy dom" : "Adoptive family",
      badge: "Białasek w domu",
      quote:
        lang === "PL"
          ? "„Nasze koty świetnie dogadują się ze zwierzętami, które już mieliśmy. Dziękuję za piękne chwile!”"
          : "„Our cats get along wonderfully with our resident pets. Thank you for these joyful moments!”",
      likes: "36",
      comments: "2",
      screenSrc: "/images/facebook/fb_screenshot_2.webp",
      screenThumb: "/images/facebook/fb_screenshot_2_thumb.webp",
    },
    {
      id: "story-3",
      author: "Kasia & Koci Przyjaciel",
      tag: lang === "PL" ? "Aktywny spacer" : "Active adventure",
      badge: "Spacer rowerowy",
      quote:
        lang === "PL"
          ? "„Pierwszy spacer na szelkach w koszyku rowerowym. Spokój, ciekawość świata i pełne zaufanie.”"
          : "„First bike ride harness exploration. Total calmness, curiosity, and unconditional trust.”",
      likes: "20",
      comments: "2",
      screenSrc: "/images/facebook/fb_screenshot_5.webp",
      screenThumb: "/images/facebook/fb_screenshot_5_thumb.webp",
    },
    {
      id: "story-4",
      author: "Miot 2026 · Koci Przyjaciel",
      tag: lang === "PL" ? "Rzadkość genetyczna" : "Genetic rarity",
      badge: "Czarne dymy (Smoke)",
      quote:
        lang === "PL"
          ? "„Majestatyczne umaszczenie black smoke. Maluchy rosną jak na drożdżach pod troskliwym okiem mamy.”"
          : "„Majestic black smoke coat. Kittens growing rapidly under mother's watchful care.”",
      likes: "84",
      comments: "14",
      screenSrc: "/images/facebook/fb_screenshot_3.webp",
      screenThumb: "/images/facebook/fb_screenshot_3_thumb.webp",
    },
  ];

  const communityPhotos = [
    {
      id: "comm-1",
      src: "/images/cats/cat_21.webp",
      caption: lang === "PL" ? "W ramionach malucha" : "In child's embrace",
    },
    {
      id: "comm-2",
      src: "/images/cats/cat_22.webp",
      caption: lang === "PL" ? "Relaks na drapaku" : "Scratching tower nap",
    },
    {
      id: "comm-3",
      src: "/images/cats/cat_23.webp",
      caption: lang === "PL" ? "Pierwszy dzień w nowym domu" : "First day home",
    },
    {
      id: "comm-4",
      src: "/images/cats/cat_15.webp",
      caption: lang === "PL" ? "Maine Coon na desce SUP" : "Maine Coon on SUP",
    },
    {
      id: "comm-5",
      src: "/images/cats/cat_24.webp",
      caption: lang === "PL" ? "Wieczór nad jeziorem" : "Sunset lake chill",
    },
    {
      id: "comm-6",
      src: "/images/cats/cat_20.webp",
      caption: lang === "PL" ? "Zabawa w salonie" : "Living room play",
    },
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
    <section
      id="spolecznosc"
      className="bg-black text-[#f5f5f7] overflow-hidden border-t border-white/[0.08] py-20 sm:py-28 relative"
    >
      {/* ── Ambient Apple Lighting Glow ────────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(41,151,255,0.07),transparent_70%)] pointer-events-none" />

      {/* ── Intro (Apple Keynote Style) ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-12 sm:mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] mb-5 font-medium">
          <FacebookIcon className="w-3.5 h-3.5 text-[#2997ff]" />
          <span className="text-[#f5f5f7]">
            {lang === "PL" ? "Społeczność & Social Media" : "Community & Social Media"}
          </span>
        </div>

        <h2
          className="font-heading font-light text-[#f5f5f7] leading-[1.02] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)" }}
        >
          {followerCount} fanów na żywo.
          <br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#86868b]">
            {lang === "PL"
              ? "Nasza wielka rodzina na Facebooku."
              : "Our growing Maine Coon family."}
          </span>
        </h2>

        <p className="text-base sm:text-lg font-body text-[#86868b] max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Codzienne relacje bez filtrów, transmisje z wybiegu i dorastające kociaki w relacjach setek opiekunów w całej Polsce i Europie."
            : "Daily unfiltered life updates, outdoor catio live cams, and joyful kitten journeys shared with caring families worldwide."}
        </p>
      </div>

      {/* ── GŁÓWNY UKŁAD APPLE BENTO GRID ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          {/* 1. HERO BENTO CARD: META / FACEBOOK (7 cols) */}
          <div className="lg:col-span-7 rounded-[28px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#2997ff]/[0.06] rounded-full blur-3xl pointer-events-none group-hover:bg-[#2997ff]/[0.1] transition-colors duration-700" />

            <div>
              {/* Top Capsule Row */}
              <div className="flex items-center justify-between gap-3 mb-6 relative">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-[#f5f5f7]">
                  <FacebookIcon className="w-3.5 h-3.5 text-[#2997ff] fill-current" />
                  <span>Koci Przyjaciel *PL</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isLive ? "META GRAPH API • LIVE" : "OFICJALNY PROFIL"}</span>
                </div>
              </div>

              {/* Big Apple Keynote Number */}
              <div className="mb-4 relative">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white mb-1.5">
                  {followerCount}
                </div>
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] font-medium">
                  {lang === "PL"
                    ? "Aktywnych obserwujących społeczności"
                    : "Active community followers"}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#86868b] font-body leading-relaxed font-light mb-8 max-w-xl">
                {lang === "PL"
                  ? "Transmisje z salonu i bezpiecznego wybiegu, relacje z pierwszych kroków miotów, porady felinologiczne oraz autentyczne opinie i zdjęcia z nowych domów bez żadnych filtrów."
                  : "Daily live streams, kitten first steps, nutrition advice, and authentic photos from happy homes shared continuously since 2010."}
              </p>
            </div>

            {/* Apple Bottom Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06] relative">
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-body text-xs sm:text-[13px] font-medium tracking-tight hover:bg-[#f5f5f7] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_24px_rgba(255,255,255,0.12)] group/btn cursor-pointer"
              >
                <span>{lang === "PL" ? "Odwiedź nasz profil" : "Visit Facebook Page"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-black group-hover/btn:translate-x-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#86868b]">
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  3.7k+ postów
                </span>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  100% autentyczności
                </span>
              </div>
            </div>
          </div>

          {/* 2. INSTAGRAM BENTO CARD (5 cols) */}
          <div className="lg:col-span-5 rounded-[28px] bg-[#161617] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-rose-500/[0.06] rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/[0.1] transition-colors duration-700" />

            <div>
              {/* Top Capsule Row */}
              <div className="flex items-center justify-between gap-3 mb-6 relative">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-[#f5f5f7]">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  <span>Instagram</span>
                </div>

                <span className="text-[10px] font-mono text-[#86868b] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  @koci_przyjaciel_pl
                </span>
              </div>

              {/* Headline & Specs */}
              <div className="mb-4 relative">
                <div className="text-3xl sm:text-4xl font-heading font-light tracking-tight text-white mb-1.5">
                  Reels & Stories 4K
                </div>
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#86868b] font-medium">
                  {lang === "PL" ? "Zbliżenia makro • Relacje z wybiegu" : "Macro details • Catio stories"}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#86868b] font-body leading-relaxed font-light mb-8">
                {lang === "PL"
                  ? "Pionowe formy wideo w wysokiej rozdzielczości: rysiowe pędzelki uszu w obiektywie makro, codzienne zabawy na drapakach i chwile, których nie zobaczysz nigdzie indziej."
                  : "High definition cinematic reels, macro close-ups of ear tufts, and warm living room moments."}
              </p>
            </div>

            {/* Apple Bottom Action */}
            <div className="pt-4 border-t border-white/[0.06] relative">
              <a
                href={REAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 text-[#f5f5f7] text-xs sm:text-[13px] font-ui font-medium tracking-tight border border-white/15 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] group/ig cursor-pointer backdrop-blur-md"
              >
                <span>{lang === "PL" ? "Obserwuj na Instagramie" : "Follow on Instagram"}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#86868b] group-hover/ig:text-white group-hover/ig:scale-105 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* ── 3. APPLE INTERACTIVE POST TILES (4 BENTO CARDS) ───────────────────── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium">
              {lang === "PL"
                ? "Autentyczne wpisy i opinie ze społeczności"
                : "Authentic community posts & reviews"}
            </span>
            <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline-block">
              {lang === "PL" ? "Kliknij kafelek, aby powiększyć zrzut" : "Click tile to preview post"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveStory(item)}
                className="group relative cursor-pointer p-4 sm:p-5 rounded-[24px] bg-[#161617] hover:bg-[#1a1a1c] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:scale-[1.015]"
              >
                <div>
                  {/* Thumbnail with Apple Glass Badge */}
                  <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden mb-3.5 bg-black border border-white/[0.08] group-hover:border-white/20 transition-colors">
                    <Image
                      src={item.screenThumb || item.screenSrc}
                      alt={item.author}
                      fill
                      loading="lazy"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Apple Frosted Floating Tag */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#f5f5f7]">
                      {item.badge}
                    </div>

                    {/* Apple Hover Expand Icon */}
                    <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#2997ff] font-medium block truncate">
                      {item.tag}
                    </span>
                    <h3 className="text-xs sm:text-[13px] font-medium text-[#f5f5f7] truncate group-hover:text-white transition-colors">
                      {item.author}
                    </h3>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-[#86868b] font-body line-clamp-3 leading-relaxed italic mb-3 font-light">
                    {item.quote}
                  </p>
                </div>

                {/* Footer Micro-Bar */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-[#86868b]">
                  <span className="flex items-center gap-1.5 font-medium text-[#2997ff]">
                    <ThumbsUp className="w-3 h-3 fill-current" />
                    <span>{item.likes}</span>
                  </span>
                  <span className="text-[10px] font-ui text-[#86868b] group-hover:text-white transition-colors flex items-center gap-1">
                    <span>Zobacz zrzut</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. APPLE MOMENTS GALLERY (ZDJĘCIA Z NOWYCH DOMÓW) ─────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium">
              {lang === "PL"
                ? "Fotografie nadesłane przez rodziny adopcyjne"
                : "Photos sent by adoptive families"}
            </span>
            <span className="text-[11px] font-mono text-[#86868b]">6 kadrów bez filtrów</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {communityPhotos.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-[20px] overflow-hidden border border-white/[0.08] hover:border-white/20 group bg-[#161617] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  draggable={false}
                  className="object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Apple Frosted Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                  <span className="text-[10px] font-ui text-[#f5f5f7] font-medium line-clamp-2">
                    {item.caption}
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-white/70">
                    <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                    <span>Nowy dom</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VISIONOS LIGHTBOX MODAL (APPLE GLASS DIALOG) ───────────────────────────── */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#161617] rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)] flex flex-col border border-white/15"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.08] bg-[#1a1a1c]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-[#2997ff]">
                    <FacebookIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-[#f5f5f7]">
                      {activeStory.author}
                    </h4>
                    <span className="text-[10px] text-[#86868b] font-mono">
                      {activeStory.tag} • {activeStory.badge}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStory(null)}
                  aria-label="Zamknij"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f7] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Screenshot Body */}
              <div
                className="relative w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden select-none p-2"
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeStory.screenSrc}
                  alt={activeStory.quote}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-auto max-h-[58vh] object-contain rounded-[16px] pointer-events-none select-none"
                />
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>

              {/* Modal Bottom Bar */}
              <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#161617]">
                <p className="text-xs text-[#86868b] leading-relaxed font-light italic mb-4">
                  {activeStory.quote}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-[#2997ff] flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                    <span>{activeStory.likes} polubień</span>
                  </span>

                  <a
                    href={REAL_FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-ui font-medium tracking-tight hover:bg-[#f5f5f7] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Zobacz na Facebooku</span>
                    <ExternalLink className="w-3 h-3 text-black" />
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
