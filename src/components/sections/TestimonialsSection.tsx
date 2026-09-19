"use client";

import React from "react";

interface TestimonialsSectionProps {
  lang: "PL" | "EN";
}

const TESTIMONIALS = [
  {
    text: "Nasz Leo to absolutny król domu. Przyszedł do nas jako zuchwały, odważny maluch — dziś waży 10 kg i śpi w naszym łóżku. Hodowla na najwyższym poziomie.",
    author: "Karolina",
    city: "Warszawa",
  },
  {
    text: "Pierwszy raz w życiu mam kota i to właśnie dzięki Kociemu Przyjacielowi. Marta cierpliwie tłumaczyła mi wszystko przez kilka tygodni. Serce hodowcy złote.",
    author: "Tomek",
    city: "Kraków",
  },
  {
    text: "Trzy lata po adopcji Zuzi i hodowla nadal pyta jak sobie radzi, wysyła życzenia urodzinowe i odpowiada na każde pytanie. To jest prawdziwa pasja, nie biznes.",
    author: "Agnieszka",
    city: "Wrocław",
  },
];

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  return (
    <section id="opinie" className="bg-white text-black overflow-hidden">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 reveal">
        <p className="text-[10px] sm:text-xs font-ui uppercase tracking-[0.4em] text-black/35 mb-6">
          {lang === "PL" ? "Opinie" : "Reviews"}
        </p>
        <h2
          className="font-heading font-light text-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
        >
          Co mówią<br />
          <span className="font-semibold italic">nasi klienci.</span>
        </h2>
      </div>

      {/* ── Opinie — Apple-style duże cytaty ─────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className={`reveal reveal-delay-${i + 1} border-t border-black/10 py-12 grid grid-cols-1 sm:grid-cols-12 gap-6`}
          >
            <div className="sm:col-span-2">
              <p className="text-xs font-ui text-black/30 uppercase tracking-widest">{t.author}</p>
              <p className="text-xs font-ui text-black/20 uppercase tracking-widest">{t.city}</p>
            </div>
            <div className="sm:col-span-10">
              <blockquote
                className="font-heading font-light text-black leading-snug"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
