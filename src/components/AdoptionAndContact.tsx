"use client";

import React, { useState } from "react";
import { REAL_PHONE, REAL_PHONE_RAW, REAL_FACEBOOK_URL, REAL_LOCATION } from "@/data/realCatsData";
import FacebookIcon from "@/components/FacebookIcon";
import { Phone, MapPin, Heart, ShieldCheck, CheckCircle2, Send, Sparkles } from "lucide-react";

interface AdoptionAndContactProps {
  lang: "PL" | "EN" | "DE";
}

export default function AdoptionAndContact({ lang }: AdoptionAndContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    preferredLitter: "Dowolny / Doradzimy",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-20 sm:py-28 bg-[#FFF6F2] text-[#2A221F] border-b-2.5 border-[#2A221F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-[#2A221F]/20 pb-4 mb-14 text-xs font-mono font-bold text-[#2A221F]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black border-2 border-[#2A221F] shadow-[3px_3px_0px_#2A221F]">
              10
            </span>
            <span className="text-[#2A221F] font-black uppercase tracking-widest">
              🏡 Ścieżka Adopcji & Kontakt z Hodowcą
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono font-bold text-[#2A221F]/70 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#2A221F]/40 text-[#2A221F]">Bezpośrednia Rozmowa</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F4E7] border border-[#2A221F]/40 text-[#2A221F]">Wrocław</span>
            <span>&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFE6FD] border border-[#2A221F]/40 text-[#2A221F]">Domowa Atmosfera</span>
          </div>
        </div>

        {/* Section Headline with Exact Plan SEO Copy */}
        <div className="max-w-4xl mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5D9] border-1.5 border-[#2A221F] text-[11px] font-mono text-[#2A221F] font-black tracking-wider uppercase mb-1 shadow-[2px_2px_0px_#2A221F]">
            <Sparkles className="w-3.5 h-3.5 text-[#2A221F]" /> Procedura Rezerwacji &middot; Lista Oczekujących
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2A221F] font-editorial leading-[1.05] tracking-tight">
            Ankieta przedadopcyjna i Lista Oczekujących <br />
            <span className="text-2xl sm:text-3xl font-normal italic text-[#2A221F]/80">– Jak do nas dołączyć?</span>
          </h2>
          <p className="text-sm sm:text-base text-[#2A221F]/90 font-mono leading-relaxed">
            Maine Coony to wyjątkowe zwierzęta, często nazywane „psimi kotami” ze względu na swoje ogromne przywiązanie do człowieka. 
            Bardzo źle znoszą chroniczną samotność, dlatego tak bardzo zależy nam na poznaniu środowiska, do którego trafią. 
            Ze względu na wysoką dbałość o dobrostan naszych podopiecznych i ogromne zainteresowanie, kocięta z przydomkiem Koci Przyjaciel 
            nie są dostępne „od ręki”, a w hodowli funkcjonuje starannie prowadzona lista oczekujących.
          </p>
          <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
            Aby dołączyć do grona przyszłych opiekunów, prosimy o wypełnienie poniższego formularza lub bezpośredni kontakt telefoniczny. 
            Pytamy o Twoje dotychczasowe doświadczenie z kotami, codzienny tryb życia oraz gotowość do zabezpieczenia przestrzeni – 
            bezwzględnie wymagamy posiadania profesjonalnie osiatkowanych okien oraz odpowiednio zabezpieczonego balkonu lub woliery. 
            Miejsce na liście oczekujących staje się wiążące po rozmowie i wpłaceniu bezzwrotnego zadatku.
          </p>
        </div>

        {/* 3 Steps of Adoption in Pastel Cartoon Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Step 1 */}
          <div className="rounded-3xl p-7 bg-[#E2F4E7] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] flex flex-col justify-between space-y-5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#2A221F]/15 pb-3">
                <span className="font-mono text-xs font-black px-3 py-1 bg-white text-[#2A221F] border border-[#2A221F] rounded-full uppercase shadow-[2px_2px_0px_#2A221F]">
                  KROK 01
                </span>
                <Phone className="w-5 h-5 text-[#2A221F]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F]">
                Rozmowa i Wybór Malucha
              </h3>
              <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
                Zadzwoń do pani Agnieszki lub napisz na naszym Facebooku. Opowiedz nam o swoim domu, dzieciach czy innych zwierzętach.
                Wspólnie wybierzemy kociaka o temperamencie dopasowanym do Ciebie.
              </p>
            </div>
            <div className="pt-3 border-t-2 border-[#2A221F]/15 text-xs font-mono text-[#2A221F] font-bold">
              🐾 Telefonicznie lub przez Facebook
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl p-7 bg-[#FFE5D9] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] flex flex-col justify-between space-y-5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#2A221F]/15 pb-3">
                <span className="font-mono text-xs font-black px-3 py-1 bg-white text-[#2A221F] border border-[#2A221F] rounded-full uppercase shadow-[2px_2px_0px_#2A221F]">
                  KROK 02
                </span>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F]">
                Odwiedziny w Naszym Domu
              </h3>
              <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
                Zapraszamy do Wrocławia! Usiądziesz na naszej kanapie, pogłaszczesz rodziców miotu i zobaczysz,
                w jakich pełnych miłości, bezklatkowych warunkach dorasta Twój przyszły przyjaciel.
              </p>
            </div>
            <div className="pt-3 border-t-2 border-[#2A221F]/15 text-xs font-mono text-[#2A221F] font-bold">
              📍 Wrocław (po wcześniejszym umówieniu)
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl p-7 bg-[#EFE6FD] border-2.5 border-[#2A221F] shadow-[5px_5px_0px_#2A221F] flex flex-col justify-between space-y-5 hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2A221F] transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#2A221F]/15 pb-3">
                <span className="font-mono text-xs font-black px-3 py-1 bg-white text-[#2A221F] border border-[#2A221F] rounded-full uppercase shadow-[2px_2px_0px_#2A221F]">
                  KROK 03
                </span>
                <ShieldCheck className="w-5 h-5 text-[#2A221F]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-editorial text-[#2A221F]">
                Odbiór z Wyprawką
              </h3>
              <p className="text-xs sm:text-sm text-[#2A221F]/85 font-mono leading-relaxed">
                Po ukończeniu 14. tygodnia kociak jedzie do nowego domu: z rodowodem FPL/FIFe, chipem Safe-Animal,
                kompletem szczepień, książeczką zdrowia oraz pełną wyprawką na start.
              </p>
            </div>
            <div className="pt-3 border-t-2 border-[#2A221F]/15 text-xs font-mono text-[#2A221F] font-bold">
              ⭐ 100% Czyste linie HCM/PKD N/N
            </div>
          </div>
        </div>

        {/* Contact Split: Direct Phone + Facebook + Friendly Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Breeder Access (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border-2.5 border-[#2A221F] shadow-[6px_6px_0px_#2A221F] space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-black text-[#2A221F] uppercase tracking-widest bg-[#FFE5D9] px-2.5 py-1 rounded-md border border-[#2A221F] inline-block">
                  BEZPOŚREDNI KONTAKT Z HODOWCĄ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-editorial text-[#2A221F]">
                  Pani Agnieszka &bull; Wrocław
                </h3>
                <p className="text-xs sm:text-sm text-[#2A221F]/80 font-mono">
                  Zadzwoń do nas w godzinach 9:00 - 21:00 lub napisz w dowolnej chwili na Facebooku.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <a
                  href={`tel:${REAL_PHONE_RAW}`}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] border-2 border-[#2A221F] transition-all flex items-center justify-center gap-3 font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#2A221F] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Phone className="w-4 h-4 text-[#2A221F]" />
                  <span>Zadzwoń: {REAL_PHONE}</span>
                </a>

                <a
                  href={REAL_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#2A221F] border-2 border-[#2A221F] transition-all flex items-center justify-center gap-3 font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#2A221F] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <FacebookIcon className="w-4 h-4 fill-[#1877F2]" />
                  <span>Wiadomość na Facebooku (25k)</span>
                </a>
              </div>

              <div className="pt-4 border-t-2 border-[#2A221F]/15 space-y-2 text-xs font-mono text-[#2A221F]/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2A221F] shrink-0" />
                  <span>Lokalizacja hodowli: {REAL_LOCATION}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FPL &bull; FIFe Member &bull; Związek Felis Polonia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Friendly Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border-2.5 border-[#2A221F] shadow-[6px_6px_0px_#2A221F]">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-[#2A221F] bg-[#E2F4E7] text-[#164e29] mx-auto flex items-center justify-center shadow-[3px_3px_0px_#2A221F]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black font-editorial text-[#2A221F]">Dziękujemy za Wiadomość!</h4>
                  <p className="text-sm font-mono text-[#2A221F]/80 max-w-md mx-auto">
                    Pani Agnieszka odezwie się telefonicznie lub przez SMS w ciągu maksymalnie kilku godzin, aby porozmawiać o kociaku.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl border-2 border-[#2A221F] bg-[#FFE5D9] text-[#2A221F] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#2A221F] hover:bg-[#FFD4C2] transition-all cursor-pointer"
                  >
                    Wyślij kolejne zapytanie
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5 border-b-2 border-[#2A221F]/15 pb-4">
                    <span className="text-[11px] font-mono font-black text-[#2A221F] uppercase tracking-widest">
                      📝 Formularz Zapytania o Kociaka
                    </span>
                    <h3 className="text-2xl font-black font-editorial text-[#2A221F]">
                      Napisz do Hodowcy
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-[#2A221F] uppercase">Twoje Imię i Nazwisko</label>
                      <input
                        type="text"
                        required
                        placeholder="np. Anna Kowalska"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7FE] border-2 border-[#2A221F] text-[#2A221F] font-mono text-sm placeholder:text-[#2A221F]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#2A221F]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-[#2A221F] uppercase">Numer Telefonu</label>
                      <input
                        type="tel"
                        required
                        placeholder="np. +48 600 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7FE] border-2 border-[#2A221F] text-[#2A221F] font-mono text-sm placeholder:text-[#2A221F]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#2A221F]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#2A221F] uppercase">Interesuje Cię:</label>
                    <select
                      value={formData.preferredLitter}
                      onChange={(e) => setFormData({ ...formData, preferredLitter: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7FE] border-2 border-[#2A221F] text-[#2A221F] font-mono text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#2A221F]"
                    >
                      <option value="Dowolny / Doradzimy">Dowolny kociak / Proszę o doradztwo</option>
                      <option value="Kocurek z aktualnego miotu">Kocurek z aktualnego miotu</option>
                      <option value="Kotka z aktualnego miotu">Kotka z aktualnego miotu</option>
                      <option value="Rezerwacja na kolejny miot">Rezerwacja na kolejny miot</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#2A221F] uppercase">Kilka słów o Twoim domu / Pytania</label>
                    <textarea
                      rows={4}
                      placeholder="Napisz, czy masz już doświadczenie z kotami, czy w domu mieszkają dzieci lub inne zwierzęta..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7FE] border-2 border-[#2A221F] text-[#2A221F] font-mono text-sm placeholder:text-[#2A221F]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#2A221F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#FFE5D9] hover:bg-[#FFD4C2] text-[#2A221F] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#2A221F] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_#2A221F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A221F] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    <span>Wyślij Wiadomość do Pani Agnieszki</span>
                    <Send className="w-4 h-4 text-[#2A221F]" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
