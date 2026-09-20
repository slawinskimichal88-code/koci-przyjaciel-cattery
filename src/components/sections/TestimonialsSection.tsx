"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Heart, MapPin, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  lang: "PL" | "EN";
}

interface TestimonialItem {
  id: string;
  photo: string;
  catName: string;
  author: string;
  city: string;
  weight: string;
  timeSinceAdoption: string;
  textPL: string;
  textEN: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "leo",
    photo: "/images/cats/cat_26.webp",
    catName: "Leo z Kociego Przyjaciela *PL",
    author: "Karolina & Piotr",
    city: "Warszawa",
    weight: "10.4 kg",
    timeSinceAdoption: "2.5 roku po adopcji",
    textPL:
      "Nasz Leo to absolutny król domu i najwierniejszy towarzysz. Przyszedł do nas jako zuchwały, odważny maluch — dziś waży ponad 10 kg, wita nas przy drzwiach jak pies i śpi w naszym łóżku. Przygotowanie kociaka pod kątem socjalizacji przez hodowlę przerosło nasze oczekiwania!",
    textEN:
      "Our Leo is the true king of our home. He greets us at the door just like a loyal dog, weighs over 10 kg and sleeps in our bed. The cattery's early socialization exceeded all our expectations!",
  },
  {
    id: "zuzia",
    photo: "/images/cats/cat_19.webp",
    catName: "Zuzia z Kociego Przyjaciela *PL",
    author: "Agnieszka & Michał",
    city: "Wrocław",
    weight: "7.8 kg",
    timeSinceAdoption: "3 lata po adopcji",
    textPL:
      "Trzy lata po adopcji Zuzi i hodowla nadal pamięta o jej urodzinach! Gdy mieliśmy pytania o dietę BARF i drapaki sufitowe, zawsze otrzymywaliśmy natychmiastową, fachową pomoc. To jest czysta pasja, ciepło i troska o zwierzęta na całe życie.",
    textEN:
      "Three years after adopting Zuzia, the cattery still remembers her birthdays! Whenever we had questions about BARF nutrition, we received instant, expert support. True lifelong passion and care.",
  },
  {
    id: "thor",
    photo: "/images/cats/cat_27.webp",
    catName: "Thor z Kociego Przyjaciela *PL",
    author: "Tomasz & Magdalena z synkiem",
    city: "Kraków",
    weight: "11.2 kg",
    timeSinceAdoption: "1.5 roku po adopcji",
    textPL:
      "To nasz pierwszy Maine Coon w życiu. Mieliśmy obawy czy poradzi sobie z naszym 4-letnim synkiem. Thor ma anielską cierpliwość — bawi się delikatnie ze schowanymi pazurkami, chodzi za małym krok w krok i mruczy jak mały traktor. Olbrzym o sercu anioła.",
    textEN:
      "Our first Maine Coon ever. Thor has angelic patience with our 4-year-old son — retracts his claws gently, follows him everywhere and purrs like a gentle engine. A true giant with an angel's heart.",
  },
  {
    id: "bella",
    photo: "/images/cats/cat_12.webp",
    catName: "Bella z Kociego Przyjaciela *PL",
    author: "Marta & Jakub",
    city: "Poznań",
    weight: "8.1 kg",
    timeSinceAdoption: "1 rok po adopcji",
    textPL:
      "Zdrowie było dla nas priorytetem po złych doświadczeniach z pseudohodowlami. W Kocim Przyjacielu otrzymaliśmy kompletne wyniki badań rodziców: czyste echo serca Doppler i ujemne testy genetyczne Laboklin. Bella tryska zdrowiem i energią każdego dnia.",
    textEN:
      "Health was our number one priority. We received comprehensive health certificates: clean Doppler echocardiography and negative Laboklin genetic panels. Bella is bursting with health and joy.",
  },
  {
    id: "shadow",
    photo: "/images/cats/cat_18.webp",
    catName: "Shadow z Kociego Przyjaciela *PL",
    author: "Katarzyna",
    city: "Gdańsk",
    weight: "9.8 kg",
    timeSinceAdoption: "4 lata po adopcji",
    textPL:
      "Jedwabiste futro, pędzle na uszach jak u rysia i spojrzenie dzikiego drapieżnika, a w środku przylepa domagająca się głaskania brzucha. Goście nie mogą oderwać od niego wzroku. Dziękuję za tak cudownego przyjaciela!",
    textEN:
      "Silky coat, lynx tips and the majestic gaze of a wild cat, yet a huge cuddlebug inside. Guests can never take their eyes off him. Thank you for such an incredible companion!",
  },
  {
    id: "apollo",
    photo: "/images/cats/cat_32.webp",
    catName: "Apollo z Kociego Przyjaciela *PL",
    author: "Robert & Ewa",
    city: "Katowice",
    weight: "10.8 kg",
    timeSinceAdoption: "2 lata po adopcji",
    textPL:
      "Kiedy przyjechaliśmy do hodowli we Wrocławiu, zobaczyliśmy koty swobodnie biegające po salonie i bezpiecznym wybiegu ogrodowym. Oficjalny rodowód FPL odebraliśmy na miejscu. Zero zapachów, zero klatek — prawdziwa pasja.",
    textEN:
      "When we visited the cattery in Wrocław, we saw cats roaming freely in the living room and garden run. Clean official FPL pedigree provided. No cages, spotless clean.",
  },
];

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  return (
    <section id="opinie" className="py-24 sm:py-32 bg-[#0C0C0E] text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Subtelny ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">

        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
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
                Co mówią o nas <span className="font-semibold italic">opiekunowie</span>.
              </>
            ) : (
              <>
                What our adoptive <span className="font-semibold italic">families say</span>.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-body font-light leading-relaxed">
            {lang === "PL"
              ? "Autentyczne opinie i zdjęcia kotów z naszej hodowli przesłane przez rodziny z całej Polski. Zobacz jak dorastają i żyją nasi wychowankowie."
              : "Authentic reviews and photos sent by families across Europe. Discover how our kittens grow and thrive in their forever homes."}
          </p>
        </div>

        {/* ── Siatka Kart: ZDJĘCIE + TEKST ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-[#131316] border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
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
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === "PL" ? "Zweryfikowana adopcja" : "Verified Adoption"}</span>
                </div>

                {/* Metryka: Waga & Czas */}
                <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-amber-300">
                  {item.weight}
                </div>
              </div>

              {/* Treść opinii */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Gwiazdki */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Cytat */}
                  <p className="text-zinc-300 font-body text-sm sm:text-[15px] leading-relaxed mb-6 italic">
                    &ldquo;{lang === "PL" ? item.textPL : item.textEN}&rdquo;
                  </p>
                </div>

                {/* Podpis opiekuna */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-heading font-semibold text-white">
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
            </div>
          ))}
        </div>

        {/* ── Stopka z informacją o Facebooku ─────────────────────────── */}
        <div className="mt-16 text-center">
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
