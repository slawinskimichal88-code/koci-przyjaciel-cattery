"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Heart, MapPin, Sparkles, Volume2, Play, Pause, Award } from "lucide-react";

interface TestimonialsSectionProps {
  lang: "PL" | "EN";
}

interface TestimonialItem {
  id: string;
  category: "giants" | "family" | "longterm";
  photo: string;
  catName: string;
  author: string;
  city: string;
  weight: string;
  timeSinceAdoption: string;
  audioDuration: string;
  textPL: string;
  textEN: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "leo",
    category: "giants",
    photo: "/images/cats/cat_26.webp",
    catName: "Leo z Kociego Przyjaciela *PL",
    author: "Karolina & Piotr",
    city: "Warszawa",
    weight: "10.4 kg",
    timeSinceAdoption: "2.5 roku po adopcji",
    audioDuration: "0:42",
    textPL:
      "Nasz Leo to absolutny król domu i najwierniejszy towarzysz. Przyszedł do nas jako zuchwały maluch — dziś waży ponad 10 kg, wita nas przy drzwiach jak pies i śpi w naszym łóżku. Przygotowanie kociaka pod kątem socjalizacji przez hodowlę przerosło nasze oczekiwania!",
    textEN:
      "Our Leo is the true king of our home. He greets us at the door just like a loyal dog, weighs over 10 kg and sleeps in our bed. The cattery's early socialization exceeded all our expectations!",
  },
  {
    id: "thor",
    category: "family",
    photo: "/images/cats/cat_27.webp",
    catName: "Thor z Kociego Przyjaciela *PL",
    author: "Tomasz & Magdalena z synkiem",
    city: "Kraków",
    weight: "11.2 kg",
    timeSinceAdoption: "1.5 roku po adopcji",
    audioDuration: "0:56",
    textPL:
      "To nasz pierwszy Maine Coon. Mieliśmy obawy jak zareaguje na naszego 4-letniego synka. Thor ma anielską cierpliwość — bawi się ze schowanymi pazurkami, chodzi za małym krok w krok i mruczy jak traktor. Olbrzym o sercu anioła.",
    textEN:
      "Our first Maine Coon ever. Thor has angelic patience with our 4-year-old son — retracts his claws gently, follows him everywhere and purrs like a gentle engine. A true giant with an angel's heart.",
  },
  {
    id: "zuzia",
    category: "longterm",
    photo: "/images/cats/cat_19.webp",
    catName: "Zuzia z Kociego Przyjaciela *PL",
    author: "Agnieszka & Michał",
    city: "Wrocław",
    weight: "7.8 kg",
    timeSinceAdoption: "3 lata po adopcji",
    audioDuration: "0:34",
    textPL:
      "Trzy lata po adopcji Zuzi i hodowla nadal pamięta o jej urodzinach! Gdy mieliśmy pytania o dietę BARF i drapaki sufitowe, zawsze otrzymywaliśmy natychmiastową pomoc. To jest czysta pasja i troska na całe życie.",
    textEN:
      "Three years after adopting Zuzia, the cattery still remembers her birthdays! Whenever we had questions about BARF nutrition, we received instant, expert support. True lifelong passion and care.",
  },
  {
    id: "apollo",
    category: "giants",
    photo: "/images/cats/cat_32.webp",
    catName: "Apollo z Kociego Przyjaciela *PL",
    author: "Robert & Ewa",
    city: "Katowice",
    weight: "10.8 kg",
    timeSinceAdoption: "2 lata po adopcji",
    audioDuration: "0:48",
    textPL:
      "Kiedy przyjechaliśmy do hodowli we Wrocławiu, zobaczyliśmy koty swobodnie biegające po salonie i bezpiecznym wybiegu w ogrodzie. Czysty rodowód FPL odebraliśmy na miejscu. Zero zapachów, zero klatek — wzór do naśladowania.",
    textEN:
      "When we visited the cattery in Wrocław, we saw cats roaming freely in the living room and garden run. Clean official FPL pedigree provided. No cages, spotless clean.",
  },
  {
    id: "bella",
    category: "family",
    photo: "/images/cats/cat_12.webp",
    catName: "Bella z Kociego Przyjaciela *PL",
    author: "Marta & Jakub",
    city: "Poznań",
    weight: "8.1 kg",
    timeSinceAdoption: "1 rok po adopcji",
    audioDuration: "0:39",
    textPL:
      "Zdrowie było dla nas priorytetem. W Kocim Przyjacielu otrzymaliśmy kompletne wyniki badań rodziców: czyste echo serca Doppler i ujemne testy genetyczne Laboklin. Bella tryska zdrowiem i energią każdego dnia.",
    textEN:
      "Health was our number one priority. We received comprehensive health certificates: clean Doppler echocardiography and negative Laboklin genetic panels. Bella is bursting with health and joy.",
  },
  {
    id: "shadow",
    category: "longterm",
    photo: "/images/cats/cat_18.webp",
    catName: "Shadow z Kociego Przyjaciela *PL",
    author: "Katarzyna",
    city: "Gdańsk",
    weight: "9.8 kg",
    timeSinceAdoption: "4 lata po adopcji",
    audioDuration: "0:51",
    textPL:
      "Jedwabiste futro, pędzle na uszach jak u rysia i spojrzenie drapieżnika, a w środku przylepa domagająca się głaskania brzucha. Goście nie mogą oderwać od niego wzroku. Dziękuję za tak cudownego przyjaciela!",
    textEN:
      "Silky coat, lynx tips and the majestic gaze of a wild cat, yet a huge cuddlebug inside. Guests can never take their eyes off him. Thank you for such an incredible companion!",
  },
];

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "giants" | "family" | "longterm">("all");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const filtered = TESTIMONIALS_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const toggleAudio = (id: string) => {
    setPlayingAudioId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="opinie" className="py-24 sm:py-32 bg-[#0C0C0E] text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Subtelny ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 font-semibold">
              {lang === "PL" ? "HISTORIE Z NOWYCH DOMÓW" : "STORIES FROM ADOPTIVE HOMES"}
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)" }}
          >
            {lang === "PL" ? (
              <>
                Koty, które zmieniają <span className="font-semibold italic">całe domy</span>.
              </>
            ) : (
              <>
                Cats that change <span className="font-semibold italic">entire lives</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-body font-light leading-relaxed">
            {lang === "PL"
              ? "Autentyczne opinie i zdjęcia kotów z naszej hodowli po 1-4 latach od adopcji. Zobacz jak potężne wyrastają i jak żyją nasi wychowankowie."
              : "Authentic reviews and photos from adoptive families 1-4 years after adoption. See how majestic our cats grow."}
          </p>
        </div>

        {/* ── PASEK METRYK ZAUFANIA (APPLE KPI STRIP) ───────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="text-center border-r border-white/10 last:border-none">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-light text-white">5.0 / 5.0</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">Ocena Opiekunów</div>
          </div>

          <div className="text-center border-r border-white/10 last:border-none">
            <div className="text-2xl sm:text-3xl font-heading font-light text-amber-300">10.4 kg</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Średnia waga kocurów</div>
          </div>

          <div className="text-center border-r border-white/10 last:border-none">
            <div className="text-2xl sm:text-3xl font-heading font-light text-emerald-400">100%</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Czyste badania DNA</div>
          </div>

          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-light text-white">10+ lat</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Wsparcie po adopcji</div>
          </div>
        </div>

        {/* ── FILTRY KATEGORII OPINII ───────────────────────────────── */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {[
            { id: "all", label: lang === "PL" ? "Wszystkie relacje (6)" : "All Stories (6)" },
            { id: "giants", label: lang === "PL" ? "Olbrzymy 10 kg+ 🦁" : "Giants 10 kg+ 🦁" },
            { id: "family", label: lang === "PL" ? "Domy z dziećmi 👶" : "Family with kids 👶" },
            { id: "longterm", label: lang === "PL" ? "Relacje po latach 🏡" : "Years after adoption 🏡" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`text-xs font-ui uppercase tracking-wider px-4 py-2 rounded-full transition-all cursor-pointer font-medium ${
                activeCategory === cat.id
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Siatka Kart: ZDJĘCIE + TEKST + WIRTUALNA NOTATKA AUDIO ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item) => {
            const isPlaying = playingAudioId === item.id;

            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#131316] border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  {/* Zdjęcie kota w nowym domu */}
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black/40">
                    <Image
                      src={item.photo}
                      alt={item.catName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/20 to-transparent" />
                    
                    {/* Weryfikacja badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{lang === "PL" ? "Zweryfikowana adopcja" : "Verified Adoption"}</span>
                    </div>

                    {/* Metryka: Waga & Czas */}
                    <div className="absolute bottom-3 right-4 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-amber-300">
                      {item.weight}
                    </div>
                  </div>

                  {/* Treść opinii */}
                  <div className="p-6 sm:p-7">
                    
                    {/* Gwiazdki + Czas po adopcji */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {item.timeSinceAdoption}
                      </span>
                    </div>

                    {/* Cytat */}
                    <p className="text-zinc-300 font-body text-sm sm:text-[14px] leading-relaxed mb-6 italic">
                      &ldquo;{lang === "PL" ? item.textPL : item.textEN}&rdquo;
                    </p>

                    {/* WIRTUALNY ELEMENT: Symulowana Notatka Głosowa Apple Audio Memo */}
                    <div
                      onClick={() => toggleAudio(item.id)}
                      className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex items-center justify-between group/audio"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </div>
                        <div>
                          <p className="text-[11px] font-ui font-semibold text-white">
                            {isPlaying ? "Odtwarzanie relacji..." : "Komentarz audio opiekuna"}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[40, 70, 30, 90, 50, 80, 45, 60, 100, 35, 75, 40].map((h, idx) => (
                              <span
                                key={idx}
                                className={`w-1 rounded-full transition-all duration-200 ${
                                  isPlaying
                                    ? "bg-amber-300 animate-pulse"
                                    : "bg-white/30"
                                }`}
                                style={{ height: `${h * 0.16}px` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {item.audioDuration}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Podpis opiekuna */}
                <div className="px-6 py-4 sm:px-7 border-t border-white/10 bg-black/20 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-white">
                      {item.author}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-mono">
                      {item.catName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-400 font-body">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{item.city}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Stopka z informacją o Facebooku ─────────────────────────── */}
        <div className="mt-14 text-center">
          <p className="text-xs sm:text-sm text-zinc-400 font-body">
            Więcej relacji i nagrań wideo od nowych opiekunów publikujemy na bieżąco w naszej społeczności na{" "}
            <a
              href="https://www.facebook.com/profile.php?id=100063684877717"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-300 underline underline-offset-4 font-medium transition-colors"
            >
              Facebooku (ponad 26 000 obserwujących)
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
}
