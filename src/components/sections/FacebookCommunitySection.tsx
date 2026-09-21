"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { REAL_FACEBOOK_URL, REAL_INSTAGRAM_URL, GALLERY_PHOTOS } from "@/data/realCatsData";
import { ArrowRight, ThumbsUp, Heart, Sparkles, ExternalLink } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

interface FacebookCommunitySectionProps {
  lang: "PL" | "EN";
}

export default function FacebookCommunitySection({ lang }: FacebookCommunitySectionProps) {
  // Starannie dobrane autentyczne zdjęcia od rodzin i ze społeczności
  const communityPhotos = [
    { id: "comm-1", src: "/images/cats/cat_27.webp", title: "Rodzina z synkiem i kotkiem w ogrodzie" },
    { id: "comm-2", src: "/images/cats/cat_26.webp", title: "Kociak w bezpiecznych ramionach nowego opiekuna" },
    { id: "comm-3", src: "/images/cats/cat_11.webp", title: "Czuły buziak od nowej rodziny" },
    { id: "comm-4", src: "/images/cats/cat_15.webp", title: "Maine Coon na desce SUP — miłość do wody" },
    { id: "comm-5", src: "/images/cats/cat_24.webp", title: "Czułość o zachodzie słońca nad jeziorem" },
    { id: "comm-6", src: "/images/cats/cat_20.webp", title: "Radosna zabawa z maskotką na kanapie" },
  ];
  const [followerCount, setFollowerCount] = useState<string>("26 400+");
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    // Asynchroniczne pobieranie aktualnej liczby obserwujących z API
    fetch("/api/facebook-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data?.formatted) {
          setFollowerCount(data.formatted);
          setIsLive(Boolean(data.isLive));
        }
      })
      .catch((err) => {
        console.warn("Błąd pobierania licznika FB:", err);
      });
  }, []);

  return (
    <section id="spolecznosc" className="bg-white text-zinc-900 overflow-hidden border-t border-zinc-200 py-16 sm:py-20">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-[11px] font-mono uppercase tracking-[0.3em] text-amber-900 mb-6 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {lang === "PL"
              ? isLive
                ? "Licznik zsynchronizowany na żywo z Meta API"
                : "Społeczność Hodowli · Ponad 26 000 Fanów"
              : "Live Cattery Community · 26k+ Followers"}
          </span>
        </div>

        <h2
          className="font-heading font-light text-zinc-950 leading-[0.9] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
        >
          {followerCount} fanów.<br />
          <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-zinc-900">
            Nasza wielka rodzina.
          </span>
        </h2>

        <p className="text-base sm:text-lg font-body text-zinc-600 max-w-2xl leading-relaxed font-light">
          {lang === "PL"
            ? "Od ponad 10 lat prowadzimy jeden z najbardziej zaangażowanych profili hodowli kotów rasowych w Polsce. Codziennie publikujemy relacje z życia kociąt, nagrania wideo oraz zdjęcia z nowych domów."
            : "For over 10 years, we have nurtured one of the most engaged pedigree cattery communities in Europe. Explore daily stories, live video updates, and joyful photos from adoptive homes."}
        </p>
      </div>

      {/* ── 2 Karty Social Media: Facebook + Instagram ──────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* KARTA FACEBOOK */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center text-[#1877F2]">
                  <FacebookIcon className="w-7 h-7 fill-current" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] font-mono text-emerald-800 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isLive ? "LIVE META API" : "AKTYWNA SPOŁECZNOŚĆ"}</span>
                </div>
              </div>

              <div className="mb-4">
                <span
                  className="font-heading font-medium text-zinc-950 leading-none block mb-1"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
                >
                  {followerCount}
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                  {lang === "PL" ? "Obserwujących profil Koci Przyjaciel *PL" : "Facebook followers"}
                </p>
              </div>

              <p className="text-sm text-zinc-600 font-body mb-8 leading-relaxed font-light">
                Codzienne transmisje na żywo, relacje z rozwoju maluchów, porady felinologiczne i galeria zdjęć z całego kraju.
              </p>
            </div>

            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-ui font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group cursor-pointer"
            >
              <span>{lang === "PL" ? "Dołącz na Facebooku" : "Join on Facebook"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* KARTA INSTAGRAM */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-rose-100 hover:border-rose-300 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#E4405F]/10 border border-[#E4405F]/20 flex items-center justify-center text-[#E4405F]">
                  <InstagramIcon className="w-7 h-7" />
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-50 border border-rose-300 text-[11px] font-mono text-rose-800 font-semibold">
                  @koci_przyjaciel_pl
                </div>
              </div>

              <div className="mb-4">
                <span
                  className="font-heading font-medium text-zinc-950 leading-none block mb-1"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
                >
                  Instagram
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                  {lang === "PL" ? "Rolki, Stories & Zdjęcia Makro" : "Reels, Stories & Macro Photos"}
                </p>
              </div>

              <p className="text-sm text-zinc-600 font-body mb-8 leading-relaxed font-light">
                Krótkie formy wideo w formacie 4K, zbliżenia na rysiowe pędzle uszu, zabawy na wybiegu i backstage z życia hodowli.
              </p>
            </div>

            <a
              href={REAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs font-ui font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group cursor-pointer"
            >
              <span>{lang === "PL" ? "Obserwuj na Instagramie" : "Follow on Instagram"}</span>
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      {/* ── Mini Gallery: Koty w Nowych Domach ────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6 font-semibold">
          {lang === "PL" ? "ZDJĘCIA NADESŁANE PRZEZ NASZYCH OPIEKUNÓW:" : "PHOTOS SENT BY ADOPTIVE FAMILIES:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {communityPhotos.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 group bg-zinc-100 shadow-sm"
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

    </section>
  );
}
