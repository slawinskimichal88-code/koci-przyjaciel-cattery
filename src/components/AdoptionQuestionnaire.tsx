"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Phone } from "lucide-react";
import { REAL_PHONE, REAL_PHONE_RAW } from "@/data/realCatsData";

interface AdoptionQuestionnaireProps {
  currency: "PLN" | "EUR";
  lang: "PL" | "EN" | "DE";
}

export default function AdoptionQuestionnaire({ currency, lang }: AdoptionQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "beginner",
    livingSpace: "apartment",
    windowSecured: "yes",
    intendedRole: "pet",
    genderPref: "any",
    fullName: "",
    phone: "",
    email: "",
    city: "",
    familyMembers: "adults_kids",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#a1a1aa", "#52525b"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="ankieta" className="py-24 sm:py-32 bg-black text-white border-b-2 border-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-white pb-4 mb-16 text-xs font-mono font-bold text-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-white text-black font-mono text-xs font-black">10</span>
            <span className="text-white font-black uppercase tracking-widest">KWALIFIKACJA ADOPCYJNA // ANKIETA PRZEDADOPCYJNA</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white font-black uppercase tracking-wider">
            <span>ODPOWIEDZIALNY CHÓW</span>
            <span>&bull;</span>
            <span>BEZPIECZNY DOM</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono text-white font-black tracking-[0.25em] block uppercase">
            [ RESPONSIBLE FELINOLOGY &middot; LISTA OCZEKUJĄCYCH ]
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-editorial leading-[0.98] tracking-tight uppercase">
            Ankieta Przedadopcyjna.
          </h2>
          <p className="text-sm sm:text-base text-white font-mono font-medium max-w-xl mx-auto leading-relaxed pt-1">
            Dbamy o to, by każdy z naszych wychowanków trafił do bezpiecznego, kochającego domu. 
            Wypełnij krótką ankietę, a skontaktujemy się z Tobą w ciągu 24 godzin.
          </p>
        </div>

        {/* Minimalist Stepper */}
        {!submitted && (
          <div className="mb-8">
            <div className="flex justify-between text-[11px] font-mono-tag text-zinc-400 mb-2">
              <span className={step >= 1 ? "text-white font-bold" : ""}>01 // Doświadczenie</span>
              <span className={step >= 2 ? "text-white font-bold" : ""}>02 // Siatki & Dom</span>
              <span className={step >= 3 ? "text-white font-bold" : ""}>03 // Preferencje</span>
              <span className={step >= 4 ? "text-white font-bold" : ""}>04 // Kontakt</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Form Container */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-white text-zinc-950 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-editorial">
                  Dziękujemy, ankieta została przesłana!
                </h3>
                <p className="text-zinc-300 text-sm max-w-lg mx-auto leading-relaxed font-light">
                  Cieszymy się, <strong>{formData.fullName}</strong>. Przeanalizujemy Twoje zgłoszenie 
                  i skontaktujemy się telefonicznie w ciągu 24h, aby porozmawiać o kociętach i zaprosić Cię do naszego domu we Wrocławiu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs font-mono text-zinc-300 text-left space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5 font-mono-tag">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>PODSUMOWANIE ZGŁOSZENIA:</span>
                </div>
                <div>Status: <strong className="text-emerald-400">Weryfikacja przez hodowcę</strong></div>
                <div>Rola: <strong className="text-white">{formData.intendedRole === "pet" ? "Pupil domowy (na kolanka)" : "Kot hodowlany"}</strong></div>
                <div>Telefon: <strong className="text-white">{formData.phone || "+48 ..."}</strong></div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${REAL_PHONE_RAW}`}
                  className="px-6 py-3.5 rounded-2xl bg-white text-zinc-950 font-mono-tag text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 inline-flex"
                >
                  <Phone className="w-4 h-4" />
                  <span>Możesz też zadzwonić: {REAL_PHONE}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Doświadczenie */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-editorial">
                    01 // Doświadczenie ze zwierzętami i profil rodziny
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-2">
                        Czy masz już doświadczenie w opiece nad kotami?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "beginner", label: "To mój pierwszy kot w życiu" },
                          { id: "cats_other", label: "Mam/miałem inne koty domowe" },
                          { id: "mainecoon_exp", label: "Znam rasę Maine Coon" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleChange("experience", opt.id)}
                            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                              formData.experience === opt.id
                                ? "border-white bg-white text-zinc-950 font-bold"
                                : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-2">
                        Kto mieszka w Twoim domu?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "adults_only", label: "Tylko dorośli domownicy" },
                          { id: "adults_kids", label: "Dorośli + dzieci" },
                          { id: "other_pets", label: "W domu jest już pies / kot" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleChange("familyMembers", opt.id)}
                            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                              formData.familyMembers === opt.id
                                ? "border-white bg-white text-zinc-950 font-bold"
                                : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-2xl bg-white text-zinc-950 font-mono-tag text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Krok 02: Warunki mieszkaniowe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Bezpieczeństwo */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-editorial">
                    02 // Warunki mieszkaniowe i zabezpieczenie okien/balkonu
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-2">
                        Gdzie zamieszka kot?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleChange("livingSpace", "apartment")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            formData.livingSpace === "apartment"
                              ? "border-white bg-white text-zinc-950 font-bold"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          Mieszkanie w bloku / kamienicy
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange("livingSpace", "house")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            formData.livingSpace === "house"
                              ? "border-white bg-white text-zinc-950 font-bold"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          Dom z ogrodem / Woliera
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-2">
                        Czy okna i balkon są zabezpieczone siatką dla kota?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleChange("windowSecured", "yes")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            formData.windowSecured === "yes"
                              ? "border-white bg-white text-zinc-950 font-bold"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          Tak, okna/balkon są już osiatkowane
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange("windowSecured", "plan")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            formData.windowSecured === "plan"
                              ? "border-white bg-white text-zinc-950 font-bold"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          Zainstaluję siatkę przed odbiorem kociaka
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-2xl border border-white/20 text-white font-mono-tag text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Wstecz</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-2xl bg-white text-zinc-950 font-mono-tag text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Krok 03: Preferencje</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Preferencje */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-editorial">
                    03 // Przeznaczenie i preferencje adopcyjne
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-2">
                        Przeznaczenie kotka:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleChange("intendedRole", "pet")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            formData.intendedRole === "pet"
                              ? "border-white bg-white text-zinc-950 font-bold"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          Na kolanka (Kastrowany pupil domowy)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange("intendedRole", "breeding")}
                          className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                            formData.intendedRole === "breeding"
                              ? "border-white bg-white text-zinc-950 font-bold"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                          }`}
                        >
                          Kot hodowlany (Zarejestrowane hodowle FIFe/WCF)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-2">
                        Preferowana płeć:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "any", label: "Bez znaczenia (decyduje charakter)" },
                          { id: "male", label: "Kocurek (Chłopiec)" },
                          { id: "female", label: "Kotka (Dziewczynka)" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleChange("genderPref", opt.id)}
                            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                              formData.genderPref === opt.id
                                ? "border-white bg-white text-zinc-950 font-bold"
                                : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-2xl border border-white/20 text-white font-mono-tag text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Wstecz</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-2xl bg-white text-zinc-950 font-mono-tag text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Krok 04: Dane kontaktowe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Dane kontaktowe */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-editorial">
                    04 // Twoje dane do bezpośredniego kontaktu
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-1">
                        Imię i Nazwisko: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="np. Anna Kowalska"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:ring-2 focus:ring-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-1">
                        Numer Telefonu: *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+48 600 000 000"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:ring-2 focus:ring-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-1">
                        Adres E-mail: *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="kontakt@twojadomena.pl"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:ring-2 focus:ring-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-mono-tag mb-1">
                        Miejscowość zamieszkania: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="np. Wrocław, Warszawa, Berlin"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:ring-2 focus:ring-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-mono-tag text-xs mb-1">
                      Wiadomość do hodowcy (opcjonalnie):
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Napisz kilka słów o swoim domu i dlaczego marzysz o kocie Maine Coon..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:ring-2 focus:ring-white outline-none font-mono"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-4 rounded-2xl border-2 border-white text-white font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Wstecz</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-2xl bg-white text-black font-mono text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <span>Wyślij ankietę adopcyjną</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
