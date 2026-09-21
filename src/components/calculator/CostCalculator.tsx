"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Sparkles,
  Check,
  CheckCircle2,
  Home,
  Utensils,
  Stethoscope,
  Coins,
  ArrowRight,
  Phone,
} from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface CostCalculatorProps {
  lang: "PL" | "EN";
  onOpenReservation: () => void;
}

export default function CostCalculator({ lang, onOpenReservation }: CostCalculatorProps) {
  // Stany kalkulatora
  const [dietType, setDietType] = useState<"wet" | "barf">("wet");
  const [litterType, setLitterType] = useState<"corn" | "bentonite">("corn");
  const [catCount, setCatCount] = useState<number>(1);
  const [vetReserve, setVetReserve] = useState<number>(100);
  const [supplements, setSupplements] = useState<boolean>(true);

  // Obliczenia kosztów
  const dietCost = dietType === "wet" ? 280 : 220;
  const litterCost = litterType === "corn" ? 110 : 80;
  const groomingSupplementsCost = supplements ? 60 : 20;

  const totalPerCatMonthly = dietCost + litterCost + groomingSupplementsCost + vetReserve;
  const monthlyTotal = totalPerCatMonthly * catCount;
  const yearlyTotal = monthlyTotal * 12;
  const monthlyEur = Math.round(monthlyTotal / 4.3);

  // Wyprawka początkowa (jednorazowa)
  const starterItems = [
    {
      title: lang === "PL" ? "Drapak pniowy / sufitowy XXL" : "XXL Solid Scratching Tree",
      cost: "700 – 1 200 zł",
      desc: lang === "PL" ? "Maine Coon waży 8-12 kg — zwykły drapak połamie się. Rekomendujemy słupy min. 14-18 cm." : "Maine Coons weigh up to 12 kg, requiring reinforced thick trunk scratchers.",
      essential: true,
    },
    {
      title: lang === "PL" ? "Kuweta kryta XXL (min. 70 cm)" : "Jumbo XXL Covered Litter Box",
      cost: "160 – 250 zł",
      desc: lang === "PL" ? "Dorosły kot ma ponad 100 cm długości z ogonem. W standardowej kuwecie się nie obróci." : "Extra-large dimensions allowing full turning comfort for a giant feline.",
      essential: true,
    },
    {
      title: lang === "PL" ? "Atestowany transporter XXL" : "Certified Safety Carrier XXL",
      cost: "180 – 300 zł",
      desc: lang === "PL" ? "Sztywna konstrukcja wytrzymująca masę 12 kg ze stalową kratką i mocnymi zapięciami." : "Rigid reinforced carrier safe for 12 kg bodyweight during travel.",
      essential: true,
    },
    {
      title: lang === "PL" ? "Siatkowanie balkonu / okien" : "Balcony & Window Safety Netting",
      cost: "350 – 800 zł",
      desc: lang === "PL" ? "Wzmocniona siatka. Maine Coony nie oceniają wysokości — bezwzględny wymóg adopcyjny." : "Wire-reinforced netting. Crucial for safety, cats lack depth perception from height.",
      essential: true,
    },
    {
      title: lang === "PL" ? "Ceramiczne poidło fontannowe" : "Ceramic Drinking Fountain",
      cost: "140 – 220 zł",
      desc: lang === "PL" ? "Rasa ta uwielbia wodę i pije chętniej z fontanny, co chroni nerki." : "Maine Coons naturally prefer running water, supporting healthy kidney function.",
      essential: false,
    },
    {
      title: lang === "PL" ? "Metalowy grzebień & pudlówka" : "Professional Grooming Tools",
      cost: "90 – 160 zł",
      desc: lang === "PL" ? "Długie obrotowe zęby zapobiegają filcowaniu gęstego podszerstka." : "Essential rotating pin stainless combs to prevent knots in long coat.",
      essential: true,
    },
  ];

  return (
    <div className="w-full text-white pb-12 animate-in fade-in duration-500">
      
      {/* ── HERO BANNER KALKULATORA ─────────────────────────────────── */}
      <section className="mb-12 text-center mt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 mb-6 shadow-sm">
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300 font-semibold">
            {lang === "PL" ? "SYMULATOR FINANSOWY · PEŁNA TRANSPARENTNOŚĆ" : "FINANCIAL SIMULATOR · TOTAL TRANSPARENCY"}
          </span>
        </div>

        <h2
          className="font-heading font-light text-white leading-[0.92] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          {lang === "PL" ? (
            <>
              Koszty utrzymania <br />
              <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                kota Maine Coon.
              </span>
            </>
          ) : (
            <>
              Maine Coon Living <br />
              <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Cost Calculator.
              </span>
            </>
          )}
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 font-body max-w-2xl mx-auto font-light leading-relaxed">
          {lang === "PL"
            ? "Maine Coon to kot o potężnej masie, który potrzebuje wysokomięsnej karmy, solidnego drapaka i opieki. Przedstawiamy realne, rzetelne koszty — bez ukrytych niespodzianek."
            : "A Maine Coon is a majestic feline requiring a high-meat diet and regular health care. Here is an honest, comprehensive monthly breakdown."}
        </p>
      </section>

      {/* ── GŁÓWNY INTERAKTYWNY SYMULATOR ──────────────────────────── */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEWA KOLUMNA: Suwaki i Wybory Parametrów ──────────────── */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Rodzaj karmy */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    {lang === "PL" ? "1. Rodzaj Żywienia (0% Zbóż)" : "1. Diet Type (Grain-Free)"}
                  </label>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {dietType === "wet" ? "ok. 280 zł / mc" : "ok. 220 zł / mc"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDietType("wet")}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    dietType === "wet"
                      ? "bg-white text-black border-white shadow-md"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-medium text-base">Mokra Premium</span>
                    {dietType === "wet" && <CheckCircle2 className="w-4 h-4 text-black" />}
                  </div>
                  <p className={`text-xs font-body ${dietType === "wet" ? "text-zinc-700" : "text-zinc-500"}`}>
                    Gussto, Feringa, Catz Finefood (monobiałkowa, min. 95% mięsa)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDietType("barf")}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    dietType === "barf"
                      ? "bg-white text-black border-white shadow-md"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-medium text-base">Surowy BARF</span>
                    {dietType === "barf" && <CheckCircle2 className="w-4 h-4 text-black" />}
                  </div>
                  <p className={`text-xs font-body ${dietType === "barf" ? "text-zinc-700" : "text-zinc-500"}`}>
                    Świeże mięso (wołowina, indyk) + suplementy (tauryna, wapń)
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Rodzaj żwirku */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Home className="w-4 h-4" />
                  </div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    {lang === "PL" ? "2. Podłoże w Kuwecie XXL" : "2. Litter Substrate XXL"}
                  </label>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {litterType === "corn" ? "ok. 110 zł / mc" : "ok. 80 zł / mc"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLitterType("corn")}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    litterType === "corn"
                      ? "bg-white text-black border-white shadow-md"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-medium text-base">Kukurydziany / Roślinny</span>
                    {litterType === "corn" && <CheckCircle2 className="w-4 h-4 text-black" />}
                  </div>
                  <p className={`text-xs font-body ${litterType === "corn" ? "text-zinc-700" : "text-zinc-500"}`}>
                    W 100% naturalny, biodegradowalny, spłukiwalny w toalecie
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setLitterType("bentonite")}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    litterType === "bentonite"
                      ? "bg-white text-black border-white shadow-md"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-medium text-base">Bentonit Zbrylający</span>
                    {litterType === "bentonite" && <CheckCircle2 className="w-4 h-4 text-black" />}
                  </div>
                  <p className={`text-xs font-body ${litterType === "bentonite" ? "text-zinc-700" : "text-zinc-500"}`}>
                    Drobny żwirek mineralny o wysokiej chłonności zapachów
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Liczba kotów & Suplementacja */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
                  {lang === "PL" ? "3. Liczba Kotów w Domu" : "3. Number of Cats"}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCatCount(num)}
                      className={`py-3 text-center border font-ui uppercase font-bold text-xs tracking-wider rounded-2xl transition-all cursor-pointer ${
                        catCount === num
                          ? "bg-white text-black border-white shadow-sm"
                          : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {num} {num === 1 ? (lang === "PL" ? "Maine Coon" : "Cat") : (lang === "PL" ? "Koty" : "Cats")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rezerwa weterynaryjna */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20">
                      <Stethoscope className="w-3.5 h-3.5" />
                    </div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                      {lang === "PL" ? "4. Miesięczny Fundusz Zdrowia" : "4. Health & Vet Reserve"}
                    </label>
                  </div>
                  <span className="font-heading text-base font-bold text-white">
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
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1.5">
                  <span>50 zł (Podstawowa)</span>
                  <span>150 zł (Zalecana)</span>
                  <span>300 zł (Pakiet Max)</span>
                </div>
                <p className="text-xs text-zinc-400 font-body mt-2 font-light leading-relaxed">
                  Fundusz na coroczne szczepienia, odrobaczenia, kontrolę krwi oraz doroczne badanie kardiologiczne (Echo serca Doppler).
                </p>
              </div>

              {/* Checkbox pielęgnacji i witamin */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-sm font-heading font-medium text-white block">
                    Suplementacja szaty & kwasów Omega-3
                  </span>
                  <span className="text-xs text-zinc-400 font-body">
                    Olej z łososia dzikiego, pasta odkłaczająca, biotyna (+40 zł/mc)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSupplements(!supplements)}
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                    supplements
                      ? "bg-white border-white text-black"
                      : "bg-transparent border-white/20 text-transparent"
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* PRAWA KOLUMNA: Podsumowanie Kosztów Apple Glass ────────── */}
          <div className="lg:col-span-5 sticky top-36">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#0F0F0F] text-white shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
              
              {/* Delikatna poświata w rogu */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    {lang === "PL" ? "ESTYMACJA COMIESIĘCZNA" : "MONTHLY ESTIMATE"}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {catCount}x Maine Coon
                  </span>
                </div>

                {/* Kwota główna */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-heading font-light tracking-tight text-white">
                      {monthlyTotal}
                    </span>
                    <span className="text-xl font-heading text-amber-400 font-medium">zł / mc</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 mt-1 block">
                    ok. ~{monthlyEur} € miesięcznie · {yearlyTotal.toLocaleString()} zł / rok
                  </span>
                </div>

                {/* Rozbicie pozycji */}
                <div className="space-y-3 pt-6 border-t border-white/10 mb-8 text-xs font-body">
                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Dieta ({dietType === "wet" ? "Mokra" : "BARF"}):
                    </span>
                    <span className="font-mono text-white font-medium">{dietCost * catCount} zł</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Żwirek ({litterType === "corn" ? "Kukurydziany" : "Bentonit"}):
                    </span>
                    <span className="font-mono text-white font-medium">{litterCost * catCount} zł</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Fundusz zdrowia (Weterynarz):
                    </span>
                    <span className="font-mono text-white font-medium">{vetReserve * catCount} zł</span>
                  </div>

                  <div className="flex justify-between items-center text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      Pielęgnacja & suplementy:
                    </span>
                    <span className="font-mono text-white font-medium">{groomingSupplementsCost * catCount} zł</span>
                  </div>
                </div>

                {/* Porównanie vs zwykły kot domowy */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    💡 Dla porównania:
                  </span>
                  <p className="text-xs text-zinc-400 font-body leading-relaxed font-light">
                    Utrzymanie zwykłego kota (4 kg) to ok. 220–280 zł/mc. Maine Coon zjada około 2x więcej ze względu na 3x większą masę mięśniową i kościec.
                  </p>
                </div>

                {/* Przyciski Akcji */}
                <div className="space-y-3">
                  <button
                    onClick={() => onOpenReservation()}
                    className="w-full py-4 rounded-full bg-white text-black font-ui text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02]"
                  >
                    <span>Porozmawiaj o adopcji kociaka</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${REAL_PHONE_RAW}`}
                    className="w-full py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-ui text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{REAL_PHONE}</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WYPRAWKA NA START (JEDNORAZOWA) ─────────────────────────── */}
      <section className="mb-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-semibold block mb-2">
            KOSZTY POCZĄTKOWE
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-light text-white">
            Wyprawka na start: <span className="font-semibold italic text-zinc-300">Co kupić przed przyjazdem?</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-body mt-3 font-light">
            Prawdziwy Maine Coon potrzebuje akcesoriów w rozmiarze XXL. Nie kupuj małych zabawek czy delikatnych drapaków.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {starterItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-sm flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    {item.cost}
                  </span>
                  {item.essential && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Wymóg
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-body leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Podsumowanie wyprawki */}
        <div className="mt-8 p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                Szacowany łączny koszt kompletnej wyprawki XXL:
              </span>
              <p className="text-sm font-body text-amber-100">
                Od 1 600 zł do 2 900 zł jednorazowo (akcesoria posłużą kotu przez całe życie).
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
