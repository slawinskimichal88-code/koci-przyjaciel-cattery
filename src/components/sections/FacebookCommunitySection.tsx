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
  const communityPhotos = GALLERY_PHOTOS.slice(6, 12);
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
    <section id="spolecznosc" className="bg-[#0A0A0A] text-white overflow-hidden border-t border-white/10 py-24 sm:py-32">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.3em] text-[#C8973B] mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {lang === "PL"
              ? isLive
                ? "Licznik zsynchronizowany na żywo z Meta API"
                : "Społeczność Hodowli · Ponad 26 000 Fanów"
              : "Live Cattery Community · 26k+ Followers"}
          </span>
        </div>

        <h2
          className="font-heading font-light text-white leading-[0.9] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
        >
          {followerCount} fanów.<br />
          <span className="font-semibold italic">Nasza wielka rodzina.</span>
        </h2>

        <p className="text-base sm:text-lg font-body text-white/70 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Od ponad 10 lat prowadzimy jeden z najbardziej zaangażowanych profili hodowli kotów rasowych w Polsce. Codziennie publikujemy relacje z życia kociąt, nagrania wideo oraz zdjęcia z nowych domów."
            : "For over 10 years, we have nurtured one of the most engaged pedigree cattery communities in Europe. Explore daily stories, live video updates, and joyful photos from adoptive homes."}
        </p>
      </div>

      {/* ── 2 Karty Social Media: Facebook + Instagram ──────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* KARTA FACEBOOK */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#12141A] to-[#0E1015] border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/15 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2]">
                  <FacebookIcon className="w-7 h-7 fill-current" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isLive ? "LIVE META API" : "AKTYWNA SPOŁECZNOŚĆ"}</span>
                </div>
              </div>

              <div className="mb-4">
                <span
                  className="font-heading font-medium text-white leading-none block mb-1"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
                >
                  {followerCount}
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  {lang === "PL" ? "Obserwujących profil Koci Przyjaciel *PL" : "Facebook followers"}
                </p>
              </div>

              <p className="text-sm text-zinc-300 font-body mb-8 leading-relaxed">
                Codzienne transmisje na żywo, relacje z rozwoju maluchów, porady felinologiczne i galeria zdjęć z całego kraju.
              </p>
            </div>

            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-ui font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 group cursor-pointer"
            >
              <span>{lang === "PL" ? "Dołącz na Facebooku" : "Join on Facebook"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* KARTA INSTAGRAM */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#181116] to-[#120D11] border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#E4405F]/15 border border-[#E4405F]/30 flex items-center justify-center text-[#E4405F]">
                  <InstagramIcon className="w-7 h-7" />
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[11px] font-mono text-rose-300">
                  @koci_przyjaciel_pl
                </div>
              </div>

              <div className="mb-4">
                <span
                  className="font-heading font-medium text-white leading-none block mb-1"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}
                >
                  Instagram
                </span>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  {lang === "PL" ? "Rolki, Stories & Zdjęcia Makro" : "Reels, Stories & Macro Photos"}
                </p>
              </div>

              <p className="text-sm text-zinc-300 font-body mb-8 leading-relaxed">
                Krótkie formy wideo w formacie 4K, zbliżenia na rysiowe pędzle uszu, zabawy w wolierze i backstage z życia hodowli.
              </p>
            </div>

            <a
              href={REAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs font-ui font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 group cursor-pointer"
            >
              <span>{lang === "PL" ? "Obserwuj na Instagramie" : "Follow on Instagram"}</span>
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      {/* ── Mini Gallery: Koty w Nowych Domach ────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 mb-6">
          {lang === "PL" ? "ZDJĘCIA NADESŁANE PRZEZ NASZYCH OPIEKUNÓW:" : "PHOTOS SENT BY ADOPTIVE FAMILIES:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {communityPhotos.map((item, idx) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-[#151518]"
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
