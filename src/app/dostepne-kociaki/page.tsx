"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReservationModal from "@/components/ui/ReservationModal";
import ScrollProgress from "@/components/ui/ScrollProgress";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Calendar,
  Phone,
  ArrowRight,
  Info,
  Clock,
  Send,
  Home,
  Users,
} from "lucide-react";
import KittenCard from "@/components/ui/KittenCard";
import AvailableKittensBanner from "@/components/ui/AvailableKittensBanner";
import { KittenSpec } from "@/data/availableKittensData";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_LOCATION, REAL_FACEBOOK_URL, REAL_MESSENGER_URL } from "@/data/realCatsData";

export default function AvailableKittensPage() {
  const [lang, setLang] = useState<"PL" | "EN">("PL");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationKitten, setReservationKitten] = useState("");
  const [kittens, setKittens] = useState<KittenSpec[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pobieranie na żywo kociąt z API
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
        console.error("Błąd ładowania danych kociąt:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchKittens();
    return () => {
      mounted = false;
    };
  }, []);

  const handleOpenReservation = (kittenName?: string) => {
    setReservationKitten(kittenName || "");
    setIsReservationOpen(true);
  };

  const isAnyAvailable = kittens.some((k) => k.status === "available");

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white">
      <ScrollProgress />

      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenReservation={() => handleOpenReservation()}
      />

      <main className="pt-16 sm:pt-20">
        {/* Dynamiczny baner pojawiający się TYLKO gdy jest dostępny kot */}
        <AvailableKittensBanner lang={lang} onOpenReservation={() => handleOpenReservation()} />
        
        {/* ── BANNER GŁÓWNY: Dostępne Kociaki ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#86868b] font-semibold">
              {lang === "PL" ? "HODOWLA KOCI PRZYJACIEL *PL · WROCŁAW" : "CATTERY KOCI PRZYJACIEL *PL · WROCLAW"}
            </span>
          </div>

          <h1
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)" }}
          >
            {lang === "PL" ? (
              <>
                Dostępne <span className="font-semibold italic text-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">Kociaki</span>.
              </>
            ) : (
              <>
                Available <span className="font-semibold italic text-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">Kittens</span>.
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#86868b] font-body max-w-2xl mx-auto font-light leading-relaxed mb-8">
            {lang === "PL"
              ? "Certyfikowana, domowa hodowla kotów rasy Maine Coon (FIFe / Felis Polonia). Transparentność zdrowotna, badania genetyczne HCM, PKD, SMA N/N i 100% miłości w domowym salonie."
              : "Certified cattery of Maine Coon cats (FIFe/FPL). DNA health screenings, domestic cage-free living and family socialization."}
          </p>
        </section>

        {/* ── GŁÓWNA SEKCJA: AKTUALNIE DOSTĘPNE KOCIAKI (KARTY Z EFEKTEM WOW) ── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-20">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-1">
                {lang === "PL" ? "STATUS HODOWLI · SEZON 2026" : "CATTERY STATUS · SEASON 2026"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-medium text-white tracking-tight">
                {lang === "PL" ? "Dostępne Maluchy" : "Available Kittens"}
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-sm sm:text-right">
              {lang === "PL"
                ? "Każdy kociak opuszcza hodowlę z rodowodem FIFe, mikrochipem, pakietem badań i wyprawką."
                : "All kittens leave with full FIFe pedigree, microchip and genetic tests."}
            </p>
          </div>

          {/* Siatka kart dostępnych kociąt (tylko koty oznaczone jako dostępne) */}
          {isLoading ? (
            <div className="p-12 text-center text-neutral-500 font-mono text-xs">
              Ładowanie aktualnej oferty kociąt...
            </div>
          ) : kittens.filter((k) => k.status === "available").length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 text-neutral-400">
              Obecnie brak wystawionych kociąt do bezpośredniej rezerwacji. Zapraszamy do zapisu na listę oczekujących poniżej!
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {kittens
                .filter((k) => k.status === "available")
                .map((kitten) => (
                  <KittenCard
                    key={kitten.id}
                    kitten={kitten}
                    lang={lang}
                    onReserve={(name) => handleOpenReservation(name)}
                  />
                ))}
            </div>
          )}

        </section>

        {/* ── GŁÓWNA KARTA KOMUNIKATU O ZAPISACH NA PRZYSZŁE MIOTY ──── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 mb-16 sm:mb-20">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
            
            {/* Tło świetlne */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              
              {/* Pigułka statusu */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-white/15 text-zinc-300 text-xs font-mono mb-6 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="tracking-wider uppercase font-semibold text-amber-200">
                  {lang === "PL" ? "Planowane Kolejne Mioty · 2026" : "Upcoming Next Litters · 2026"}
                </span>
              </div>

              {/* Nagłówek planowanych skojarzeń */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium text-white mb-6 tracking-tight">
                {lang === "PL" ? (
                  <>Planowane <span className="italic text-amber-300">kolejne skojarzenia</span> i zapisy.</>
                ) : (
                  <>Planned <span className="italic text-amber-300">upcoming litters</span> and waitlist.</>
                )}
              </h2>

              {/* Wyjaśnienie */}
              <p className="text-base sm:text-lg text-zinc-300 font-body font-light leading-relaxed mb-8">
                {lang === "PL"
                  ? "Dbając o najwyższe standardy dobrostanu, odpoczynek i zdrowie naszych kotek, nie prowadzimy masowej hodowli — każdy miot jest starannie planowany. Osoby zapisane na listę oczekujących otrzymują pierwszeństwo wyboru malucha przed publiczną publikacją."
                  : "We prioritize the health and wellbeing of our queens over quantity. Upcoming litters are planned with the utmost care. Waitlist families receive early reservation priority."}
              </p>

              {/* Przyciski akcji: Zapis na listę oczekujących na Facebooku + telefon */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={REAL_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-[#1877F2] text-white font-ui uppercase tracking-wider text-xs font-bold hover:bg-[#166fe5] transition-all shadow-[0_10px_30px_rgba(24,119,242,0.3)] flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{lang === "PL" ? "Zapisz się na listę na Facebooku" : "Join Waitlist on Facebook"}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>

                <a
                  href={`tel:${REAL_PHONE_RAW}`}
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-ui uppercase tracking-wider text-xs font-semibold transition-all flex items-center gap-2.5 backdrop-blur-md"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{REAL_PHONE}</span>
                </a>
              </div>

              {/* Informacja o priorytecie listy oczekujących */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === "PL"
                    ? "Osoby zapisane na listę oczekujących otrzymują pierwszeństwo wyboru kociaka przed publicznym ogłoszeniem miotu."
                    : "Waitlist members receive first pick of kittens before public announcement."}
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* ── PROCEDURA REZERWACJI I ADOPCJI ─────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold block mb-2">
              {lang === "PL" ? "JAK TO DZIAŁA" : "HOW IT WORKS"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-white">
              {lang === "PL" ? "Procedura zapisu na miot" : "Litter Waitlist Process"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative">
              <span className="text-3xl font-heading font-bold text-amber-400/40 block mb-3">01</span>
              <h4 className="text-base font-heading font-medium text-white mb-2">
                {lang === "PL" ? "Zapis na listę" : "Join the Waitlist"}
              </h4>
              <p className="text-xs text-zinc-400 font-body leading-relaxed font-light">
                {lang === "PL"
                  ? "Wypełniasz krótki formularz lub dzwonisz do nas, określając preferencje dotyczące płci i umaszczenia kociaka."
                  : "Submit your contact and kitten preferences via form or direct phone call."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative">
              <span className="text-3xl font-heading font-bold text-amber-400/40 block mb-3">02</span>
              <h4 className="text-base font-heading font-medium text-white mb-2">
                {lang === "PL" ? "Narodziny miotu & pierwszeństwo" : "Litter Birth & Priority"}
              </h4>
              <p className="text-xs text-zinc-400 font-body leading-relaxed font-light">
                {lang === "PL"
                  ? "Po przyjściu maluchów na świat kontaktujemy się z osobami z listy oczekujących przed opublikowaniem ogłoszenia."
                  : "Once kittens arrive, we contact waitlisted families first before any public listing."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative">
              <span className="text-3xl font-heading font-bold text-amber-400/40 block mb-3">03</span>
              <h4 className="text-base font-heading font-medium text-white mb-2">
                {lang === "PL" ? "Wizyta i rezerwacja" : "Visit & Reservation"}
              </h4>
              <p className="text-xs text-zinc-400 font-body leading-relaxed font-light">
                {lang === "PL"
                  ? "Zapraszamy do naszego domu we Wrocławiu, aby poznać malucha osobiście, podpisać umowę i odebrać kociaka po ukończeniu 14-16 tygodni."
                  : "Visit our cattery in Wroclaw, meet the kittens, and sign the official agreement."}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href={REAL_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#0084FF] text-white font-ui uppercase tracking-wider text-xs font-bold hover:bg-[#0073E6] transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{lang === "PL" ? "Zapisz się na listę na Messengerze" : "Join Waitlist on Messenger"}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </section>

      </main>

      <Footer lang={lang} setLang={setLang} />

      {/* Modal zapisu na listę oczekujących */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        defaultKitten={reservationKitten}
        lang={lang}
      />
    </div>
  );
}
