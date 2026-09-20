"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface AboutSectionProps {
  lang: "PL" | "EN";
}

export default function AboutSection({ lang }: AboutSectionProps) {
  return (
    <section id="o-nas" className="bg-white text-black overflow-hidden">

      {/* ── Intro ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-20 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "O nas" : "About"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Kochamy to,{" "}
          <span className="font-semibold italic">
            co robimy.
          </span>
        </h2>
      </div>

      {/* ── Zdjęcie full-bleed ─────────────────────────────────── */}
      <div className="reveal w-full" style={{ height: "clamp(300px, 55vw, 680px)" }}>
        <div className="relative w-full h-full">
          <Image
            src="/images/cats/cat_24.webp"
            alt="Hodowla Koci Przyjaciel PL — bliskość i miłość do kotów Maine Coon"
            fill
            className="object-cover object-[50%_20%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── Tekst + Statystyki ─────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Tekst */}
          <div className="reveal space-y-5">
            <p className="text-base sm:text-lg font-body text-black/70 leading-relaxed">
              {lang === "PL"
                ? "Jesteśmy małą, rodzinną hodowlą kotów Maine Coon z Wrocławia. Nie prowadzimy masowej produkcji kociaków — mamy kilka miotów w roku i każde kociątko traktujemy jak członka rodziny."
                : "We are a small, family home cattery of Maine Coon cats from Wroclaw. We don't mass-produce kittens — we have a few litters a year and treat every kitten as a family member."}
            </p>
            <p className="text-base sm:text-lg font-body text-black/70 leading-relaxed">
              {lang === "PL"
                ? "Nasze koty żyją razem z nami w domu — bawią się z dziećmi, drzemią na kanapie i wychodzą do ogrodu. Dzięki temu kociaki, które do Was trafiają, są otwarte na ludzi i gotowe na życie w nowym domu."
                : "Our cats live with us at home — they play with children, nap on the sofa and go outside to the garden. Thanks to this, kittens that come to you are open to people and ready for life in a new home."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/o-nas"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-ui font-semibold uppercase tracking-wider hover:bg-black/80 transition-all shadow-md"
              >
                <span>{lang === "PL" ? "Poznaj naszą historię" : "Explore Our Story"}</span>
                <span>→</span>
              </Link>
              <a
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/15 text-xs font-ui font-semibold text-black/70 hover:text-black hover:border-black transition-all tracking-wider uppercase"
              >
                <span>Facebook (26k+)</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Stats — duże liczby jak Apple */}
          <div className="reveal reveal-delay-2 space-y-10">
            {[
              { num: "26 000+", label: lang === "PL" ? "Osób obserwuje nas na Facebooku" : "Facebook followers" },
              { num: "100+", label: lang === "PL" ? "Kociaków trafiło do dobrych domów" : "Kittens in loving homes" },
              { num: "10+", label: lang === "PL" ? "Lat dowodzimy, że to można robić pięknie" : "Years of experience" },
            ].map((stat, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} border-t border-black/10 pt-6`}>
                <div
                  className="font-heading font-light text-black leading-none mb-1"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  {stat.num}
                </div>
                <p className="text-sm font-ui text-black/40 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
