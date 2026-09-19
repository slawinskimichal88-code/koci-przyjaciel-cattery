"use client";

import React from "react";
import { Star, ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { REAL_FACEBOOK_URL } from "@/data/realCatsData";

interface Review {
  id: string;
  author: string;
  city: string;
  catName: string;
  rating: number;
  text: string;
  date: string;
  role: string;
  bg: string;
  rotate: string;
}

const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Magdalena & Tomasz",
    city: "Warszawa",
    catName: "Thor (Miot T, 3 lata, 10.8 kg)",
    rating: 5,
    text: "Decyzja o wyborze hodowli Koci Przyjaciel była najlepszą w naszym życiu. Thor to oaza spokoju, wspaniały kompan dla naszego 6-letniego synka. Od razu po przyjeździe czuł się jak u siebie. Widać, że koty są wychowywane z miłością w prawdziwym domu.",
    date: "Wrzesień 2026",
    role: "Rodzina z dzieckiem",
    bg: "bg-[#FFE5D9]",
    rotate: "-rotate-1",
  },
  {
    id: "r2",
    author: "Piotr & Karolina",
    city: "Wrocław",
    catName: "Shadow (Miot S, srebrzysty klasyk)",
    rating: 5,
    text: "Maine Coon o charakterze psa to nie mit! Shadow wita nas przy drzwiach, aportuje piłeczki i uwielbia asystować w pracy przy biurku. Stały kontakt z panią Agnieszką, pomoc w wyprawce i badaniach – pełen profesjonalizm i serce!",
    date: "Sierpień 2026",
    role: "Praca zdalna / Wrocław",
    bg: "bg-[#E2F4E7]",
    rotate: "rotate-1",
  },
  {
    id: "r3",
    author: "Katarzyna W.",
    city: "Kraków",
    catName: "Luna & Bella (dwie kotki z hodowli)",
    rating: 5,
    text: "Najpierw adoptowaliśmy Lunę, a po roku wróciliśmy po drugą kotkę. Dziewczyny są niesamowicie zżyte, zdrowe i łagodne. Nasz weterynarz pochwalił idealne wyniki USG serca i dokumentację FPL.",
    date: "Lipiec 2026",
    role: "Właścicielka dwóch kotek",
    bg: "bg-[#EFE6FD]",
    rotate: "-rotate-1",
  },
];

export default function SocialProofAndReviews({ lang }: { lang: "PL" | "EN" | "DE" }) {
  return (
    <section id="opinie" className="py-20 sm:py-28 border-b-2.5 border-[#2A221F] relative overflow-hidden bg-[#FFF9F5] text-[#2A221F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14 text-xs font-mono font-bold text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
              09
            </span>
            <span className="text-[#2A221F] font-black tracking-widest uppercase">
              💌 Historie Adopcyjne &bull; Głosy Nowych Domów
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[#2A221F]/70 uppercase tracking-wider text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">Ocena 5.0 / 5.0 ⭐</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Zweryfikowane Rodziny</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#2A221F]/40 text-[#2A221F]">Polska & Europa</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-3 shadow-[2px_2px_0px_#2A221F]">
              <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Listy i Zdjęcia &middot; Szczęśliwe Koty w Nowych Domach
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight">
              Świadectwa Rodzin. <br />
              <span className="text-2xl sm:text-3xl font-normal italic text-[#2A221F]/80">Prawdziwe historie od opiekunów naszych kociąt.</span>
            </h2>
          </div>
          <a
            href={REAL_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FFE5D9] text-[#2A221F] border-2 border-[#2A221F] font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-[4px_4px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Wszystkie opinie na Facebooku (25k)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Reviews Grid (Postcard Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className={`rounded-3xl p-6 sm:p-7 ${r.bg} border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] flex flex-col justify-between space-y-6 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] transition-all relative ${r.rotate} hover:rotate-0`}
            >
              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/90 border border-[#2A221F]/40 shadow-xs rotate-2 z-20 rounded-xs pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#2A221F]/15 pb-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-black text-[#2A221F] bg-white px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#2A221F]">
                    Zweryfikowany Dom
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#2A221F] leading-relaxed italic font-editorial">
                  &bdquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t-2 border-[#2A221F]/15 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-black text-[#2A221F] font-editorial text-base">{r.author}</h4>
                  <p className="text-xs text-[#2A221F]/80 font-mono font-bold pt-0.5">{r.catName}</p>
                </div>
                <span className="text-xs font-mono font-black uppercase tracking-wider px-2.5 py-1 bg-white border border-[#2A221F] rounded-xl shadow-[2px_2px_0px_#2A221F]">
                  📍 {r.city}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
