"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface KnowledgeAndCostCalculatorProps {
  currency: "PLN" | "EUR";
  lang: "PL" | "EN" | "DE";
}

export default function KnowledgeAndCostCalculator({ currency, lang }: KnowledgeAndCostCalculatorProps) {
  const [dietType, setDietType] = useState<"wet_premium" | "barf">("wet_premium");
  const [litterType, setLitterType] = useState<"corn_natural" | "bentonite_clumping">("corn_natural");
  const [catCount, setCatCount] = useState<number>(1);
  const [vetReserve, setVetReserve] = useState<number>(100);

  const dietCost = dietType === "wet_premium" ? 280 : 220;
  const litterCost = litterType === "corn_natural" ? 110 : 80;
  const groomingSupplements = 60;

  const totalPlnPerCat = dietCost + litterCost + groomingSupplements + vetReserve;
  const grandTotalPln = totalPlnPerCat * catCount;
  const grandTotalEur = Math.round(grandTotalPln / 4.3);

  return (
    <section id="kalkulator" className="py-24 sm:py-32 bg-black text-white border-b-2 border-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-white pb-4 mb-16 text-xs font-mono font-bold text-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-white text-black font-mono text-xs font-black">08</span>
            <span className="text-white font-black uppercase tracking-widest">EKONOMIA OPIEKI // KALKULATOR UTRZYMANIA</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white font-black uppercase tracking-wider">
            <span>REALNE KOSZTY</span>
            <span>&bull;</span>
            <span>DIETA BEZZBOŻOWA</span>
            <span>&bull;</span>
            <span>TRANSPARENTNOŚĆ</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-tag text-zinc-400 tracking-widest block mb-2">
              [ FINANCIAL CLARITY &middot; RESPONSIBLE ADOPTION ]
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-editorial leading-[1.02] tracking-tight">
              Koszty Utrzymania.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed font-light">
            Maine Coon waży od 7 do 11 kg. To kot o apetycie i potrzebach łagodnego olbrzyma. 
            Poznaj realne, comiesięczne nakłady na odpowiedzialną opiekę bez niespodzianek.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Interactive Calculator Inputs (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 space-y-6 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
            <h3 className="text-xs font-bold text-white font-mono-tag">
              PARAMETRY OPIEKI DOMOWEJ:
            </h3>

            {/* 1. Liczba kotów */}
            <div className="space-y-2">
              <label className="text-xs font-mono-tag text-zinc-400 block">
                01 // LICZBA KOTÓW W GOSPODARSTWIE:
              </label>
              <div className="flex gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCatCount(num)}
                    className={`flex-1 py-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      catCount === num
                        ? "bg-white text-zinc-950 shadow-md"
                        : "bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {num === 1 ? "1 Maine Coon" : `${num} Maine Coony`}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dieta */}
            <div className="space-y-2">
              <label className="text-xs font-mono-tag text-zinc-400 block">
                02 // SPOSÓB ŻYWIENIA:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setDietType("wet_premium")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    dietType === "wet_premium"
                      ? "border-white bg-white/10 ring-1 ring-white shadow-xs"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold text-xs text-white font-editorial">Mokra karma bezzbożowa</div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">Wysokomięsne puszki (Feringa, Catz Finefood) ~280 zł/msc</div>
                </button>
                <button
                  onClick={() => setDietType("barf")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    dietType === "barf"
                      ? "border-white bg-white/10 ring-1 ring-white shadow-xs"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold text-xs text-white font-editorial">Dieta BARF (Surowe mięso)</div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">Wołowina, drób + suplementy felinologiczne ~220 zł/msc</div>
                </button>
              </div>
            </div>

            {/* 3. Żwirek */}
            <div className="space-y-2">
              <label className="text-xs font-mono-tag text-zinc-400 block">
                03 // RODZAJ PODŁOŻA (ŻWIRKU):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setLitterType("corn_natural")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    litterType === "corn_natural"
                      ? "border-white bg-white/10 ring-1 ring-white shadow-xs"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold text-xs text-white font-editorial">Kukurydziany roślinny</div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">Ekologiczny, bezpieczny dla dużych łapek ~110 zł/msc</div>
                </button>
                <button
                  onClick={() => setLitterType("bentonite_clumping")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    litterType === "bentonite_clumping"
                      ? "border-white bg-white/10 ring-1 ring-white shadow-xs"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold text-xs text-white font-editorial">Bentonit drobnoziarnisty</div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">Odpylany, silnie zbrylający ~80 zł/msc</div>
                </button>
              </div>
            </div>

            {/* 4. Fundusz weterynaryjny */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono-tag text-zinc-400">
                  04 // MIESIĘCZNA REZERWA WETERYNARYJNA:
                </label>
                <span className="font-mono font-bold text-xs text-white">{vetReserve} PLN / msc</span>
              </div>
              <input
                type="range"
                min={50}
                max={300}
                step={25}
                value={vetReserve}
                onChange={(e) => setVetReserve(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-6 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
            <div>
              <span className="text-[10px] font-mono-tag text-zinc-400 block">
                SZACUNKOWY MIESIĘCZNY KOSZT OPIEKI:
              </span>
              <div className="text-5xl sm:text-6xl font-extrabold text-white font-editorial mt-2 leading-none">
                {currency === "PLN" ? `${grandTotalPln} PLN` : `€${grandTotalEur}`}
                <span className="text-xs font-mono font-normal text-zinc-400 block mt-2">/ miesiąc przy {catCount} kocie(-ach)</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="flex justify-between text-zinc-300">
                <span>Dieta mięsna:</span>
                <span className="font-bold text-white">{dietCost * catCount} PLN</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Żwirek do kuwety XXL:</span>
                <span className="font-bold text-white">{litterCost * catCount} PLN</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Suplementy & czesanie:</span>
                <span className="font-bold text-white">{groomingSupplements * catCount} PLN</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Rezerwa profilaktyki:</span>
                <span className="font-bold text-white">{vetReserve * catCount} PLN</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black border-2 border-white text-xs text-white leading-relaxed font-mono">
              <strong className="text-white font-black uppercase tracking-wider block mb-1">Złota zasada hodowli:</strong>
              Maine Coon to olbrzym o delikatnym układzie pokarmowym. Inwestycja w wysokomięsną karmę to brak chorób nerek i piękna, lśniąca szata przez 15 lat życia kota.
            </div>

            <a
              href="#ankieta"
              className="w-full py-4 rounded-2xl bg-white text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <span>Wypełnij ankietę przedadopcyjną</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
