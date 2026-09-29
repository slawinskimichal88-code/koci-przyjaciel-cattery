"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { KittenSpec } from "@/data/availableKittensData";

interface AvailableKittensBannerProps {
  lang?: "PL" | "EN";
  onOpenReservation?: () => void;
}

export default function AvailableKittensBanner({ lang = "PL", onOpenReservation }: AvailableKittensBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [kittens, setKittens] = useState<KittenSpec[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pobieranie na żywo danych z API, aby po zmianie w CMS od razu reagować
  useEffect(() => {
    let mounted = true;
    const fetchKittens = async () => {
      try {
        const res = await fetch("/api/cms/kittens", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mounted && data.kittens) {
            setKittens(data.kittens);
          }
        }
      } catch (err) {
        console.error("Błąd pobierania danych kociąt:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchKittens();
    return () => {
      mounted = false;
    };
  }, []);

  const availableKittens = kittens.filter((k) => k.status === "available");
  const isAvailable = availableKittens.length > 0;

  // Jeśli brak dostępnych kotów, lub użytkownik zamknął baner w bieżącej sesji - NIE POKAZUJ
  if (isLoading || !isAvailable || isDismissed) {
    return null;
  }

  const availableCount = availableKittens.length;
  const firstKitten = availableKittens[0];

  return (
    <div className="relative z-40 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/20 border-b border-amber-400/30 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Lewa część: pulsująca dioda + informacja */}
        <Link
          href="/dostepne-kociaki"
          className="flex items-center gap-2.5 group cursor-pointer overflow-hidden truncate"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <span className="font-medium text-amber-200 uppercase tracking-wider text-[11px] font-mono shrink-0 hidden sm:inline">
            Aktualizacja:
          </span>

          <span className="text-[#f5f5f7] font-normal truncate group-hover:text-white transition-colors">
            {availableCount === 1 ? (
              <>
                W hodowli jest obecnie dostępny kotek:{" "}
                <strong className="text-amber-300 font-semibold">{firstKitten?.name}</strong>
              </>
            ) : (
              <>
                W hodowli są obecnie dostępne kocięta do rezerwacji (
                <strong className="text-amber-300 font-semibold">{availableCount} maluchy</strong>)
              </>
            )}
          </span>

          <span className="hidden md:inline-flex items-center gap-1 text-amber-300 text-xs font-medium underline underline-offset-4 group-hover:text-amber-200">
            Zobacz kartę kociaka <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        {/* Prawa część: Przycisk rezerwacji i zamknięcia */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dostepne-kociaki"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-medium transition-colors"
          >
            <span>Przejdź do oferty</span>
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Zamknij powiadomienie"
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
