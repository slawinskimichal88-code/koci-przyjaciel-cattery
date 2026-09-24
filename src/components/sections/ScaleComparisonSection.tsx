"use client";

import React from "react";
import Image from "next/image";

interface ScaleComparisonSectionProps {
  lang?: "PL" | "EN";
  compact?: boolean;
  theme?: "dark" | "light";
}

export default function ScaleComparisonSection({
  theme = "dark",
}: ScaleComparisonSectionProps) {
  return (
    <section
      id="porownanie"
      className={
        theme === "light"
          ? "relative bg-[#FAF9F6] text-zinc-900 py-8 sm:py-12 overflow-hidden border-t border-zinc-200"
          : "relative bg-[#050505] text-white py-8 sm:py-12 overflow-hidden border-t border-white/10"
      }
    >
      {/* Poświata tła Apple */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none rounded-full ${
          theme === "light" ? "bg-amber-100/30 blur-[160px]" : "bg-white/[0.03] blur-[160px]"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ── GŁÓWNA GRAFIKA W SKALI 1:1 (Czysty kadr bez kafelek, opisów i zbędnych elementów) ──── */}
        <div className="relative rounded-3xl border border-white/15 bg-black overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
          {/* Pasek statusu u góry sceny */}
          <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center justify-between flex-wrap gap-2 text-xs font-ui">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/80 font-mono text-[11px] tracking-wide">
                Porównanie w skali rzeczywistej 1:1 · Kot Domowy (24 cm) · Maine Coon (38 cm) · Pies Beagle (38 cm)
              </span>
            </div>
          </div>

          {/* Obszar Zdjęcia */}
          <div className="relative aspect-[16/9] w-full bg-black select-none overflow-hidden">
            <Image
              src="/images/maine-coon-accurate-comparison.jpg"
              alt="Maine Coon vs Kot Domowy vs Pies Beagle w skali 1:1"
              fill
              className="object-contain"
              priority
            />

            {/* Laserowe linie miary HUD */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 1000 562.5" fill="none">
                {/* Kot Domowy: wysokość 24 cm */}
                <line x1="70" y1="480" x2="70" y2="230" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="55" y1="230" x2="160" y2="230" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <line x1="55" y1="480" x2="160" y2="480" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <text x="60" y="355" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">24 cm</text>

                {/* Maine Coon: wysokość 38 cm */}
                <line x1="330" y1="480" x2="330" y2="135" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="320" y1="135" x2="620" y2="135" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                <line x1="320" y1="480" x2="620" y2="480" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                <text x="325" y="305" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">38 cm ★</text>

                {/* Pies Beagle: wysokość 38 cm */}
                <line x1="930" y1="480" x2="930" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="750" y1="135" x2="940" y2="135" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <line x1="750" y1="480" x2="940" y2="480" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <text x="950" y="305" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">38 cm</text>

                {/* Pozioma linia równości kłębu */}
                <line x1="420" y1="135" x2="880" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
