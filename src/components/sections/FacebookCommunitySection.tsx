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
  MessageCircle,
  Share2,
  X,
  Maximize2,
  CheckCircle2,
  Users,
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
      screenSrc: "/images/facebook/fb_screenshot_1.jpg",
    },
    {
      id: "story-2",
      author: "Pani Małgosia i rodzina",
      tag: "Nowy dom",
      badge: "Białasek w domu",
      quote: "„Nasze koty świetnie dogadują się ze zwierzętami, które już mieliśmy. Dziękuję za piękne chwile!”",
      likes: "36",
      comments: "2",
      screenSrc: "/images/facebook/fb_screenshot_2.jpg",
    },
    {
      id: "story-3",
      author: "Kasia & Koci Przyjaciel",
      tag: "Aktywny Maine Coon",
      badge: "Spacer rowerowy",
      quote: "„Pierwszy spacer na szelkach w koszyku rowerowym. Spokój, ciekawość świata i pełne zaufanie.”",
      likes: "20",
      comments: "2",
      screenSrc: "/images/facebook/fb_screenshot_5.jpg",
    },
    {
      id: "story-4",
      author: "Miot 2026 · Koci Przyjaciel",
      tag: "Rzadkość genetyczna",
      badge: "Niebieskie oczy",
      quote: "„Niebieskooka piękność i roznooka dziewczynka — duma naszej hodowli i zdrowe linie FIFe.”",
      likes: "222",
      comments: "29",
      screenSrc: "/images/facebook/fb_screenshot_6.jpg",
    },
  ];

  // Zdjęcia od opiekunów
  const communityPhotos = [
    { id: "comm-1", src: "/images/cats/cat_27.webp", title: "Rodzina z synkiem i kotkiem w ogrodzie" },
    { id: "comm-2", src: "/images/cats/cat_26.webp", title: "Kociak w bezpiecznych ramionach nowego opiekuna" },
    { id: "comm-3", src: "/images/cats/cat_11.webp", title: "Czuły buziak od nowej rodziny" },
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
    <section id="spolecznosc" className="bg-[#FAF9F6] text-zinc-900 overflow-hidden border-t border-zinc-200 py-16 sm:py-20">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono uppercase tracking-[0.3em] text-blue-900 mb-5 font-semibold">
          <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
          <span>
            {lang === "PL"
              ? isLive
                ? "Licznik zsynchronizowany na żywo z Meta API"
                : "Społeczność Hodowli · Ponad 26 000 Fanów"
              : "Live Cattery Community · 26k+ Followers"}
          </span>
        </div>

        <h2
          className="font-heading font-light text-zinc-950 leading-[0.92] tracking-tight mb-5"
          style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)" }}
        >
          {followerCount} fanów.<br />
          <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-900 to-zinc-900">
            Nasza wielka rodzina na Facebooku.
          </span>
        </h2>

        <p className="text-base sm:text-lg font-body text-zinc-600 max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Codzienne relacje z życia hodowli, autentyczne opinie i zdjęcia z nowych domów publikowane bez filtrów w naszej aktywnej społeczności."
            : "Daily life updates, genuine family feedback, and joyful photos from forever homes shared directly with our thriving community."}
        </p>
      </div>

      {/* ── INTERAKTYWNA KOMPAKTOWA BELKA SPOŁECZNOŚCI (Apple Glass Interactive Strip) ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-5 border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2]">
                <FacebookIcon className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                  Autentyczne relacje i zrzuty postów
                </span>
                <div className="text-sm font-semibold text-zinc-900">
                  Kliknij relację, aby zobaczyć oryginalny wpis z Facebooka
                </div>
              </div>
            </div>

            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-ui font-semibold transition-all shadow-sm hover:shadow"
            >
              <span>Przejdź na profil Facebook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4 Kompaktowe Kapsuły / Pigułki z miniaturą zrzutu (Subtelne, eleganckie, bez wielkich kloców) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveStory(item)}
                className="group relative cursor-pointer p-4 rounded-2xl bg-zinc-50/70 hover:bg-blue-50/50 border border-zinc-200/80 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {/* Miniaturka zrzutu ekranu */}
                    <div className="relative w-12 h-16 rounded-xl overflow-hidden border border-zinc-200 shrink-0 bg-zinc-100 shadow-xs group-hover:scale-105 transition-transform">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.screenSrc}
                        alt={item.author}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-800 font-bold block truncate">
                        {item.badge}
                      </span>
                      <h4 className="text-xs font-semibold text-zinc-900 truncate">
                        {item.author}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-mono block">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-600 font-body line-clamp-2 leading-relaxed italic mb-3 font-light">
                    {item.quote}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 text-[10px] text-zinc-500 font-ui">
                  <span className="flex items-center gap-1 font-semibold text-blue-700">
                    <ThumbsUp className="w-2.5 h-2.5 fill-current" />
                    <span>{item.likes}</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Powiększ wpis</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2 KARTY GŁÓWNE: Facebook + Instagram ─────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* KARTA FACEBOOK */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 hover:border-blue-400/50 transition-all duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(24,119,242,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2] shadow-2xs">
                  <FacebookIcon className="w-6 h-6 fill-current" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] font-mono text-emerald-900 font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isLive ? "LIVE META API" : "AKTYWNA SPOŁECZNOŚĆ"}</span>
                </div>
              </div>

              <div className="mb-3">
                <span className="font-heading font-medium text-zinc-950 text-3xl sm:text-4xl block">
                  {followerCount}
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                  Obserwujących profil Koci Przyjaciel *PL
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 font-body mb-6 leading-relaxed font-light">
                Codzienne transmisje na żywo, relacje z rozwoju maluchów, porady felinologiczne i galeria zdjęć z całego kraju.
              </p>
            </div>

            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-ui font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow group cursor-pointer"
            >
              <span>{lang === "PL" ? "Dołącz do nas na Facebooku" : "Join on Facebook"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* KARTA INSTAGRAM */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 hover:border-rose-400/50 transition-all duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(228,64,95,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E4405F]/10 border border-[#E4405F]/20 flex items-center justify-center text-[#E4405F] shadow-2xs">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-50 border border-rose-300 text-[10px] font-mono text-rose-900 font-semibold shadow-2xs">
                  @koci_przyjaciel_pl
                </div>
              </div>

              <div className="mb-3">
                <span className="font-heading font-medium text-zinc-950 text-3xl sm:text-4xl block">
                  Instagram
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                  Rolki, Stories & Zdjęcia Makro
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 font-body mb-6 leading-relaxed font-light">
                Krótkie formy wideo w formacie 4K, zbliżenia na rysiowe pędzle uszu, zabawy na wybiegu i backstage z życia hodowli.
              </p>
            </div>

            <a
              href={REAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs font-ui font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow group cursor-pointer"
            >
              <span>{lang === "PL" ? "Obserwuj na Instagramie" : "Follow on Instagram"}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Mini Gallery: Zdjęcia z Nowych Domów ─────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-5 font-semibold">
          {lang === "PL" ? "ZDJĘCIA NADESŁANE PRZEZ NASZYCH OPIEKUNÓW:" : "PHOTOS SENT BY ADOPTIVE FAMILIES:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {communityPhotos.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 group bg-zinc-100 shadow-2xs"
            >
              <Image
                src={item.src}
                alt="Maine Coon Koci Przyjaciel w nowym domu"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-500"
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-zinc-200"
            >
              <div className="p-4 flex items-center justify-between border-b border-zinc-100 bg-zinc-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]">
                    <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-950">
                      {activeStory.author}
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {activeStory.tag}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="w-7 h-7 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeStory.screenSrc}
                  alt={activeStory.quote}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              <div className="p-4 border-t border-zinc-100 bg-white">
                <p className="text-xs text-zinc-700 leading-relaxed font-light italic mb-3">
                  {activeStory.quote}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-600 flex items-center gap-1.5">
                    <ThumbsUp className="w-3 h-3 text-[#1877F2] fill-current" />
                    <span>{activeStory.likes} polubień</span>
                  </span>
                  <a
                    href={REAL_FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#1877F2] hover:underline flex items-center gap-1"
                  >
                    <span>Zobacz profil</span>
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
