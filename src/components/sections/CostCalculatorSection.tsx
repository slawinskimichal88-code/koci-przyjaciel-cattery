"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, Check, Info } from "lucide-react";

interface CostCalculatorProps {
  lang: "PL" | "EN";
}

export default function CostCalculatorSection({ lang }: CostCalculatorProps) {
  const [dietType, setDietType] = useState<"wet" | "barf">("wet");
  const [litterType, setLitterType] = useState<"corn" | "bentonite">("corn");
  const [catCount, setCatCount] = useState<number>(1);
  const [vetReserve, setVetReserve] = useState<number>(100);

  const dietCost = dietType === "wet" ? 280 : 220;
  const litterCost = litterType === "corn" ? 110 : 80;
  const groomingSupplements = 60;

  const totalPerCat = dietCost + litterCost + groomingSupplements + vetReserve;
  const monthlyTotal = totalPerCat * catCount;
  const yearlyTotal = monthlyTotal * 12;
  const monthlyEur = Math.round(monthlyTotal / 4.3);
  const yearlyEur = Math.round(yearlyTotal / 4.3);

  return (
    <section id="kalkulator" className="bg-[#FAFAF8] text-black overflow-hidden border-t border-black/10">
      
      {/* ── Intro ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "Kalkulator Utrzymania" : "Care Economics"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Koszty utrzymania.<br />
          <span className="font-semibold italic">Pełna transparentność.</span>
        </h2>
        <p className="mt-8 text-base sm:text-lg font-body text-black/70 max-w-2xl leading-relaxed">
          {lang === "PL"
            ? "Maine Coon to kot o potężnej muskulaturze i apetycie łagodnego olbrzyma (waga do 12 kg). Zależy nam, aby każdy przyszły opiekun znał realne comiesięczne koszty odpowiedzialnej opieki."
            : "A Maine Coon is a majestic feline weighing up to 12 kg with dietary requirements of a gentle giant. We believe in total financial transparency before welcoming a companion."}
        </p>
      </div>

      {/* ── Interactive Calculator Split ─────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lewo: Parametry / Kontrolki */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Dieta */}
            <div className="p-6 bg-white border border-black/8 rounded-sm shadow-sm">
              <label className="block text-xs font-ui uppercase tracking-widest text-black/50 font-bold mb-3">
                {lang === "PL" ? "1. Rodzaj Diety (Wysokomięsna)" : "1. Diet Type (High Meat)"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDietType("wet")}
                  className={`p-4 text-left border rounded-sm transition-all cursor-pointer ${
                    dietType === "wet"
                      ? "bg-black text-white border-black"
                      : "bg-[#FAFAF8] text-black/80 border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-lg">Karma Mokra Premium</span>
                    {dietType === "wet" && <Check className="w-4 h-4 text-[#C8973B]" />}
                  </div>
                  <p className={`text-xs ${dietType === "wet" ? "text-white/70" : "text-black/50"}`}>
                    Gussto, Feringa, Catz Finefood (ok. 280 zł/mc)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDietType("barf")}
                  className={`p-4 text-left border rounded-sm transition-all cursor-pointer ${
                    dietType === "barf"
                      ? "bg-black text-white border-black"
                      : "bg-[#FAFAF8] text-black/80 border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-lg">Surowy BARF</span>
                    {dietType === "barf" && <Check className="w-4 h-4 text-[#C8973B]" />}
                  </div>
                  <p className={`text-xs ${dietType === "barf" ? "text-white/70" : "text-black/50"}`}>
                    Świeże mięso + suplementy (ok. 220 zł/mc)
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Żwirek */}
            <div className="p-6 bg-white border border-black/8 rounded-sm shadow-sm">
              <label className="block text-xs font-ui uppercase tracking-widest text-black/50 font-bold mb-3">
                {lang === "PL" ? "2. Podłoże Higieniczne (Żwirek)" : "2. Hygienic Litter"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLitterType("corn")}
                  className={`p-4 text-left border rounded-sm transition-all cursor-pointer ${
                    litterType === "corn"
                      ? "bg-black text-white border-black"
                      : "bg-[#FAFAF8] text-black/80 border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-lg">Kukurydziany / Drewniany</span>
                    {litterType === "corn" && <Check className="w-4 h-4 text-[#C8973B]" />}
                  </div>
                  <p className={`text-xs ${litterType === "corn" ? "text-white/70" : "text-black/50"}`}>
                    Naturalny, biodegradowalny (ok. 110 zł/mc)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setLitterType("bentonite")}
                  className={`p-4 text-left border rounded-sm transition-all cursor-pointer ${
                    litterType === "bentonite"
                      ? "bg-black text-white border-black"
                      : "bg-[#FAFAF8] text-black/80 border-black/10 hover:border-black/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-lg">Bentonit Zbrylający</span>
                    {litterType === "bentonite" && <Check className="w-4 h-4 text-[#C8973B]" />}
                  </div>
                  <p className={`text-xs ${litterType === "bentonite" ? "text-white/70" : "text-black/50"}`}>
                    Drobny, bezzapachowy (ok. 80 zł/mc)
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Liczba kotów i Rezerwa weterynaryjna */}
            <div className="p-6 bg-white border border-black/8 rounded-sm shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-ui uppercase tracking-widest text-black/50 font-bold mb-3">
                  {lang === "PL" ? "3. Liczba Kotów w Domu" : "3. Number of Cats"}
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCatCount(num)}
                      className={`flex-1 py-3 text-center border font-ui uppercase font-bold text-xs tracking-wider rounded-sm transition-all cursor-pointer ${
                        catCount === num
                          ? "bg-black text-white border-black shadow"
                          : "bg-[#FAFAF8] text-black/70 border-black/10 hover:border-black/30"
                      }`}
                    >
                      {num} {num === 1 ? (lang === "PL" ? "Kot" : "Cat") : (lang === "PL" ? "Koty" : "Cats")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-ui uppercase tracking-widest text-black/50 font-bold">
                    {lang === "PL" ? "4. Rezerwa Weterynaryjna & Profilaktyka" : "4. Vet Reserve & Preventative Care"}
                  </label>
                  <span className="font-heading text-lg font-medium text-black">
                    {vetReserve} zł / mc
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="25"
                  value={vetReserve}
                  onChange={(e) => setVetReserve(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <p className="text-[11px] text-black/45 font-body mt-1">
                  {lang === "PL"
                    ? "Odrobaczenia, szczepienia przypominające, doroczna kontrola krwi i echo doppler."
                    : "Vaccines, deworming, periodic annual blood test panel and echo doppler reserve."}
                </p>
              </div>
            </div>

          </div>

          {/* Prawo: Podsumowanie Wyliczeń — Karta Wyników */}
          <div className="lg:col-span-5 bg-black text-white p-8 sm:p-10 rounded-sm shadow-2xl sticky top-24">
            <span className="text-[10px] font-ui uppercase tracking-[0.3em] text-[#C8973B] font-bold block mb-3">
              {lang === "PL" ? "PODSUMOWANIE EKONOMICZNE" : "MONTHLY & ANNUAL TOTAL"}
            </span>

            <div className="border-b border-white/15 pb-6 mb-6">
              <p className="text-xs font-ui uppercase tracking-widest text-white/40 mb-1">
                {lang === "PL" ? "Szacowany Koszt Miesięczny" : "Estimated Monthly Cost"}
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-heading font-light text-white leading-none"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.8rem)" }}
                >
                  {monthlyTotal}
                </span>
                <span className="text-xl font-body text-white/50">zł</span>
                <span className="text-sm font-ui text-white/30 ml-2">
                  (~{monthlyEur} €)
                </span>
              </div>
            </div>

            <div className="space-y-3 pb-6 border-b border-white/15 text-xs font-body text-white/70">
              <div className="flex justify-between">
                <span>Dieta mięsna ({dietType === "wet" ? "Karma mokra" : "BARF"}):</span>
                <span className="font-mono text-white">{dietCost * catCount} zł</span>
              </div>
              <div className="flex justify-between">
                <span>Żwirek ({litterType === "corn" ? "Kukurydziany" : "Bentonit"}):</span>
                <span className="font-mono text-white">{litterCost * catCount} zł</span>
              </div>
              <div className="flex justify-between">
                <span>Pielęgnacja, Omega-3 i odkłaczanie:</span>
                <span className="font-mono text-white">{groomingSupplements * catCount} zł</span>
              </div>
              <div className="flex justify-between">
                <span>Fundusz weterynaryjny:</span>
                <span className="font-mono text-white">{vetReserve * catCount} zł</span>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-[11px] font-ui uppercase tracking-wider text-white/40 mb-1">
                {lang === "PL" ? "Roczny budżet opieki:" : "Annual Care Budget:"}
              </p>
              <p className="text-2xl font-heading text-white">
                {yearlyTotal.toLocaleString("pl-PL")} zł <span className="text-sm font-body text-white/40">(~{yearlyEur.toLocaleString("en-US")} €)</span>
              </p>
            </div>

            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-sm">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#C8973B] shrink-0 mt-0.5" />
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {lang === "PL"
                    ? "Kocięta z naszej hodowli opuszczają dom z pełną wyprawką startową na pierwsze 3 tygodnie oraz szczegółowym poradnikiem żywieniowym."
                    : "All kittens leave our cattery with a starter kit for the first 3 weeks and a custom nutritional booklet."}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
