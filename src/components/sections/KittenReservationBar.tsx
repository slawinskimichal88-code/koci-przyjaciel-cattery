"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface KittenReservationBarProps {
  lang?: "PL" | "EN";
  onOpenReservation: (kittenName?: string) => void;
}

const FEATURED_KITTENS = [
  { name: "Luna *PL", status: "Dostępna", image: "/images/cats/cat_07.webp", color: "Srebrzysta" },
  { name: "Leo *PL", status: "Dostępny", image: "/images/cats/cat_08.webp", color: "Rudy lew" },
  { name: "Amber *PL", status: "Dostępna", image: "/images/cats/cat_10.webp", color: "Szylkret" },
];

export default function KittenReservationBar({
  lang = "PL",
  onOpenReservation,
}: KittenReservationBarProps) {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#141416]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Lewa strona: Status hodowli & Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === "PL" ? "Rezerwacje Otwarte 2026" : "2026 Reservations Open"}</span>
            </div>

            <div>
              <h3 className="text-white font-heading font-medium text-lg sm:text-xl tracking-wide">
                {lang === "PL" ? "Kocięta Maine Coon z rodowodem FIFe / FPL" : "Maine Coon Kittens with FIFe Pedigree"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-body flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === "PL" ? "Badania genetyczne HCM, PKD, SMA N/N · Wychowane z dziećmi" : "Genetic testing HCM, PKD, SMA N/N · Family socialized"}</span>
              </p>
            </div>
          </div>

          {/* Środek: Miniatury aktualnych kociąt */}
          <div className="flex items-center gap-3">
            {FEATURED_KITTENS.map((k) => (
              <a
                key={k.name}
                href={REAL_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer text-left"
                title={`${k.name} - ${k.status} (Napisz na Facebooku)`}
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/25 shrink-0" style={{ position: "relative", width: 36, height: 36 }}>
                  <Image
                    src={k.image}
                    alt={k.name}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-heading font-semibold text-white group-hover:text-amber-200 transition-colors">
                    {k.name}
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 font-medium">
                    {k.status}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Prawa strona: Przyciski CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
            <a
              href={REAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{lang === "PL" ? "Zarezerwuj na Facebooku" : "Reserve on Facebook"}</span>
            </a>

            <a
              href={`tel:${REAL_PHONE_RAW}`}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-body text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-300" />
              <span>{REAL_PHONE}</span>
            </a>

            <Link
              href="/kocieta"
              className="text-xs font-ui uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1"
            >
              <span>{lang === "PL" ? "Wszystkie mioty" : "All litters"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
