"use client";

import React from "react";
import Image from "next/image";
import { REAL_FACEBOOK_URL, GALLERY_PHOTOS } from "@/data/realCatsData";
import { ArrowRight, ThumbsUp, MessageCircle, Heart, Share2 } from "lucide-react";

interface FacebookCommunitySectionProps {
  lang: "PL" | "EN";
}

export default function FacebookCommunitySection({ lang }: FacebookCommunitySectionProps) {
  const communityPhotos = GALLERY_PHOTOS.slice(6, 12);

  return (
    <section id="spolecznosc" className="bg-[#0A0A0A] text-white overflow-hidden border-t border-white/10">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-ui uppercase tracking-[0.3em] text-[#C8973B] mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{lang === "PL" ? "Społeczność Hodowli Na Żywo" : "Live Cattery Community"}</span>
        </div>

        <h2
          className="font-heading font-light text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          25 395 fanów.<br />
          <span className="font-semibold italic">Nasza wielka rodzina.</span>
        </h2>

        <p className="mt-8 text-base sm:text-lg font-body text-white/60 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Od ponad 10 lat prowadzimy jeden z najbardziej zaangażowanych profili hodowli kotów rasowych w Polsce. Codziennie publikujemy relacje z życia kociąt, nagrania wideo oraz zdjęcia z nowych domów."
            : "For over 10 years, we have nurtured one of the most engaged pedigree cattery communities in Europe. Explore daily stories, live video updates, and joyful photos from adoptive homes."}
        </p>
      </div>

      {/* ── Social Proof Banner & Stats ──────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
        <div className="reveal p-8 sm:p-10 bg-gradient-to-r from-[#111111] via-[#141414] to-[#111111] border border-white/15 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span
                className="font-heading font-light text-white leading-none"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
              >
                25 395
              </span>
              <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 flex items-center justify-center text-[#1877F2]">
                <ThumbsUp className="w-4 h-4 fill-current" />
              </div>
            </div>
            <p className="text-xs font-ui uppercase tracking-widest text-white/50">
              {lang === "PL" ? "Obserwujących profil Koci Przyjaciel *PL" : "Active Facebook followers"}
            </p>
          </div>

          <a
            href={REAL_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1877F2] text-white text-xs font-ui font-bold uppercase tracking-[0.2em] hover:bg-[#166fe5] transition-all rounded-sm shadow-lg group cursor-pointer"
          >
            <span>{lang === "PL" ? "Dołącz na Facebooku" : "Join our Facebook"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Mini Gallery: Koty w Nowych Domach ────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <p className="text-xs font-ui uppercase tracking-widest text-white/40 mb-6">
          {lang === "PL" ? "Zdjęcia nadesłane przez rodziny adopcyjne:" : "Photos sent from adoptive homes:"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {communityPhotos.map((item, idx) => (
            <div
              key={item.id}
              className={`reveal reveal-delay-${(idx % 6) + 1} relative aspect-square rounded-sm overflow-hidden border border-white/10 group`}
            >
              <Image
                src={item.src}
                alt="Maine Coon Koci Przyjaciel w nowym domu"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
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
