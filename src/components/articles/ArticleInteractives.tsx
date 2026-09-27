"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

// ══ Artykuł 1: Cena Maine Coona ══════════════════════════════════════════════

const PRICE_FACTORS = [
  {
    icon: "🧬",
    title: "Rodowód i linie hodowlane",
    color: "from-violet-500/20 to-purple-600/10 border-violet-500/30",
    accentColor: "text-violet-300",
    items: [
      "Prestiż i czystość linii genetycznych (5+ pokoleń)",
      "Udział kotów z tytułami wystawowymi (CH, GCH, IC)",
      "Import rodziców z uznanych hodowli europejskich",
      "Przynależność do FIFe / WCC (federacja najwyższego rzędu)",
    ],
  },
  {
    icon: "❤️‍🔥",
    title: "Pakiet zdrowotny kociaka",
    color: "from-rose-500/20 to-red-600/10 border-rose-500/30",
    accentColor: "text-rose-300",
    items: [
      "Badanie echokardiograficzne (Echo Doppler HCM) rodziców",
      "Testy genetyczne DNA: SMA, PKD, HCM (Laboklin N/N)",
      "Seria szczepień wg harmonogramu weterynaryjnego",
      "Karta zdrowia i historia leczenia kociaka",
    ],
  },
  {
    icon: "🏡",
    title: "Standard i warunki hodowli",
    color: "from-amber-500/20 to-orange-600/10 border-amber-500/30",
    accentColor: "text-amber-300",
    items: [
      "Hodowla bezklatkowa — kocięta wychowane w rodzinie",
      "Socjalizacja z dziećmi, psem i gośćmi od urodzenia",
      "Koszty utrzymania rodziców, wyżywienia i opieki wet.",
      "Wyprawka startowa dołączona do adopcji",
    ],
  },
  {
    icon: "🌍",
    title: "Region, popyt i sezon",
    color: "from-sky-500/20 to-blue-600/10 border-sky-500/30",
    accentColor: "text-sky-300",
    items: [
      "Lokalizacja hodowli (metropolie vs. mniejsze ośrodki)",
      "Aktualny popyt na rasę w danym roku",
      "Pora roku i liczba dostępnych miotów na rynku",
      "Kurs walut przy importach z zagranicy",
    ],
  },
];

const COMPARE_TABLE = [
  { label: "Rodowód FIFe / WCC", legit: true, fake: false },
  { label: "Badanie echa serca HCM rodziców", legit: true, fake: false },
  { label: "Testy DNA (Laboklin lub Langford)", legit: true, fake: false },
  { label: "Kociak gotowy po 12 tygodniach", legit: true, fake: false },
  { label: "Pełna dokumentacja weterynaryjna", legit: true, fake: false },
  { label: "Możliwość wizyty przed adopcją", legit: true, fake: false },
  { label: "Umowa adopcyjna z gwarancją zdrowia", legit: true, fake: false },
  { label: "Podana adekwatna cena do poniesionych kosztów", legit: true, fake: false },
];

export function Article1PriceInteractive() {
  const [openFactor, setOpenFactor] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="space-y-12">
      {/* Intro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRICE_FACTORS.map((factor, i) => (
          <button
            key={i}
            onClick={() => setOpenFactor(openFactor === i ? null : i)}
            className={`text-left p-5 rounded-2xl border bg-gradient-to-br ${factor.color} transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{factor.icon}</span>
                <h3 className={`font-semibold text-base ${factor.accentColor}`}>{factor.title}</h3>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/50 transition-transform duration-300 ${openFactor === i ? "rotate-180" : ""}`}
              />
            </div>
            {openFactor === i && (
              <ul className="space-y-2 mt-3 border-t border-white/10 pt-3">
                {factor.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>

      {/* Legalna vs Nielegalna hodowla */}
      <div>
        <button
          onClick={() => setShowTable(!showTable)}
          className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          <span className="font-semibold text-white">
            📋 Porównanie: legalna hodowla vs. ogłoszenie bez rodowodu
          </span>
          <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${showTable ? "rotate-180" : ""}`} />
        </button>
        {showTable && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 bg-white/10 text-xs font-mono uppercase tracking-widest text-white/60 px-4 py-3">
              <span>Czynnik</span>
              <span className="text-center text-green-400">✓ Hodowla FIFe</span>
              <span className="text-center text-red-400">✗ Bez rodowodu</span>
            </div>
            {COMPARE_TABLE.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
              >
                <span className="text-white/80">{row.label}</span>
                <span className="text-center">
                  {row.legit ? <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                </span>
                <span className="text-center">
                  {row.fake ? <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warning Box */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-300 mb-1">Dlaczego warto wybrać hodowlę z pełną dokumentacją?</p>
          <p className="text-sm text-white/70 leading-relaxed">
            Kociak kupiony bez rodowodu i badań to ryzyko kosztownych wizyt weterynaryjnych — leczenie HCM u kota to wydatek często wielokrotnie przewyższający różnicę w cenie zakupu. Rodowód, badania i umowa to Twoja ochrona jako przyszłego opiekuna.
          </p>
        </div>
      </div>
    </div>
  );
}

// ══ Artykuł 2: Rodowód FIFe / FPL ══════════════════════════════════════════

const PEDIGREE_ORGS = [
  {
    name: "FIFe",
    fullName: "Fédération Internationale Féline",
    flag: "🌍",
    status: "top",
    color: "from-green-500/20 to-emerald-600/10 border-green-500/30",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
    badgeText: "Najwyższy standard",
    desc: "Największa i najstarsza światowa federacja felinologiczna. Zrzesza ponad 40 krajowych organizacji. Koty z rodowodami FIFe posiadają najbardziej rygorystycznie sprawdzone linie genealogiczne.",
    checks: ["Rodowód uznawany w 40+ krajach", "Wystawy rangi World Winner", "Obowiązkowe badania zdrowotne", "Rejestr płodności liter i parentów"],
  },
  {
    name: "FPL",
    fullName: "Polska Federacja Felinologiczna",
    flag: "🇵🇱",
    status: "top",
    color: "from-blue-500/20 to-indigo-600/10 border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    badgeText: "Polska organizacja FIFe",
    desc: "Polska organizacja pod auspicjami FIFe. Hodowla rejestrowana w FPL spełnia wszystkie wymagania FIFe — standardy hodowlane, zdrowie, dokumentację.",
    checks: ["Oficjalny członek FIFe", "Rejestr Polskich Hodowców", "Kontrole i certyfikaty hodowlane", "Wystawy rangi CACE i CAC"],
  },
  {
    name: "WCF / inne",
    fullName: "Stowarzyszenia poza FIFe",
    flag: "⚠️",
    status: "warn",
    color: "from-yellow-500/20 to-orange-600/10 border-yellow-500/30",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    badgeText: "Mniej rygorystyczne",
    desc: "Istnieje wiele mniejszych organizacji felinologicznych. Posiadają własne rejestry, ale mogą stosować łagodniejsze standardy zdrowotne i hodowlane.",
    checks: ["Rodowód wystawiony, lecz z mniejszym zasięgiem", "Mniej obowiązkowych badań zdrowotnych", "Wystawy o mniejszej randze", "Zróżnicowany poziom kontroli"],
  },
  {
    name: "Brak rodowodu",
    fullName: "Ogłoszenia z OLX, koty bez papierów",
    flag: "🚫",
    status: "danger",
    color: "from-red-500/20 to-rose-600/10 border-red-500/30",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
    badgeText: "Wysokie ryzyko",
    desc: "Koty sprzedawane bez rodowodu nie mają potwierdzonego pochodzenia. Hodowla może być niezarejestrowana, bez jakichkolwiek standardów zdrowotnych.",
    checks: ["Brak gwarancji czystości rasy", "Brak dokumentacji zdrowotnej rodziców", "Kociak może być za młody do adopcji", "Ryzyko chorób genetycznych"],
  },
];

const VERIFY_STEPS = [
  { step: "01", title: "Zapytaj o numer rejestracyjny hodowli", desc: "Każda hodowla FIFe/FPL ma unikalny numer. Możesz go zweryfikować na stronie FPL lub FIFe." },
  { step: "02", title: "Zażądaj kopii rodowodów rodziców", desc: "Ojciec i matka kociaka powinni mieć rodowody z pieczęcią federacji." },
  { step: "03", title: "Sprawdź wyniki badań HCM i DNA", desc: "Certyfikaty Laboklin lub Langford z wynikiem N/N potwierdzają brak mutacji genetycznych." },
  { step: "04", title: "Poproś o wizytę w hodowli", desc: "Legalna hodowla nigdy nie odmawia wizyty. Możesz zobaczyć warunki i rodziców kociaka." },
  { step: "05", title: "Podpisz umowę adopcyjną", desc: "Profesjonalna hodowla zawsze podpisuje umowę z gwarancją zdrowia i zasadami zwrotu." },
];

export function Article2PedigreeInteractive() {
  const [activeOrg, setActiveOrg] = useState<number | null>(null);
  const [verifyVisible, setVerifyVisible] = useState(false);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PEDIGREE_ORGS.map((org, i) => (
          <button
            key={i}
            onClick={() => setActiveOrg(activeOrg === i ? null : i)}
            className={`text-left p-5 rounded-2xl border bg-gradient-to-br ${org.color} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{org.flag}</span>
                  <span className="font-bold text-white text-lg">{org.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${org.badge}`}>{org.badgeText}</span>
                </div>
                <p className="text-xs text-white/50">{org.fullName}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${activeOrg === i ? "rotate-180" : ""}`} />
            </div>
            {activeOrg === i && (
              <div className="mt-3 border-t border-white/10 pt-3 space-y-3">
                <p className="text-sm text-white/70 leading-relaxed">{org.desc}</p>
                <ul className="space-y-1.5">
                  {org.checks.map((c, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-white/60">
                      {org.status === "danger" ? (
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      ) : org.status === "warn" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      )}
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 5-krokowy weryfikator */}
      <div>
        <button
          onClick={() => setVerifyVisible(!verifyVisible)}
          className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between cursor-pointer"
        >
          <span className="font-semibold text-white">🔍 Jak sprawdzić legalność hodowli Maine Coon? — 5 kroków</span>
          <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${verifyVisible ? "rotate-180" : ""}`} />
        </button>
        {verifyVisible && (
          <div className="mt-3 space-y-3">
            {VERIFY_STEPS.map((s, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="font-mono text-2xl font-bold text-white/20 shrink-0">{s.step}</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══ Artykuł 3: Badania HCM, PKD, SMA ══════════════════════════════════════

const HEALTH_TESTS = [
  {
    code: "HCM",
    fullName: "Kardiomiopatia przerostowa",
    icon: "❤️",
    severity: "Krytyczne",
    severityColor: "text-red-400",
    bgColor: "from-red-500/15 to-rose-600/5 border-red-500/25",
    what: "Choroba serca polegająca na patologicznym pogrubieniu ściany lewej komory. Może prowadzić do niewydolności serca lub nagłej śmierci.",
    test: "Echo Doppler — badanie echokardiograficzne wykonywane przez kardiologa weterynaryjnego. Powtarzane co 1–2 lata.",
    why: "Maine Coon jest rasą z podwyższonym genetycznym ryzykiem HCM. Hodowcy FIFe mają obowiązek regularnych badań rodziców.",
    result: "Wyniki naszych kotów: CLEAR (zdrowe serce). Certyfikaty dostępne do wglądu.",
    stats: [
      { label: "Częstość w rasie", value: "~26%" },
      { label: "Wiek pierwszych objawów", value: "2–6 lat" },
      { label: "Nasza hodowla", value: "0 przypadków" },
    ],
  },
  {
    code: "SMA",
    fullName: "Rdzeniowy zanik mięśni",
    icon: "🧬",
    severity: "Dziedziczne",
    severityColor: "text-amber-400",
    bgColor: "from-amber-500/15 to-orange-600/5 border-amber-500/25",
    what: "Choroba nerwowo-mięśniowa powodująca postępujące osłabienie i zanik mięśni. Koty z SMA mają poważnie obniżoną jakość życia.",
    test: "Test DNA — badanie mutacji genu LIX1. Wykonywane raz w życiu kota. Wyniki: N/N (wolny od mutacji) lub N/SMA (nosiciel).",
    why: "Kociak z dwoma kopiami mutacji (SMA/SMA) wykazuje objawy choroby. Hodowla odpowiedzialna łączy tylko koty N/N lub N/SMA z N/N.",
    result: "Wszystkie nasze koty hodowlane: N/N — wolne od mutacji SMA (Laboklin).",
    stats: [
      { label: "Typ dziedziczenia", value: "Autosomalne recesywne" },
      { label: "Test w: ", value: "Laboklin / Langford" },
      { label: "Nasze wyniki", value: "N/N — Clear" },
    ],
  },
  {
    code: "PKD",
    fullName: "Wielotorbielowatość nerek",
    icon: "🫁",
    severity: "Genetyczne",
    severityColor: "text-violet-400",
    bgColor: "from-violet-500/15 to-purple-600/5 border-violet-500/25",
    what: "Choroba prowadząca do tworzenia torbieli w nerkach, stopniowo niszcząc ich funkcję. Postępuje przez całe życie kota.",
    test: "Test DNA + badanie USG nerek. Mutacja genu PKD1. Wyniki: N/N (clear), PKD/N (nosiciel) lub PKD/PKD (chory).",
    why: "Choć PKD jest bardziej charakterystyczne dla Persów, u Maine Coonów też się pojawia. Każdy odpowiedzialny hodowca testuje swoje koty.",
    result: "Nasze koty: N/N — brak mutacji PKD (Laboklin). Badania USG nerek: bez zmian.",
    stats: [
      { label: "Charakterystyczna dla", value: "Persy, Egzoty, MC" },
      { label: "Diagnoza", value: "DNA + USG" },
      { label: "Nasze wyniki", value: "N/N — Clear" },
    ],
  },
];

export function Article3HealthInteractive() {
  const [activeTest, setActiveTest] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex gap-2 flex-wrap">
        {HEALTH_TESTS.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTest(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
              activeTest === i
                ? "bg-white text-black border-white"
                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.icon} {t.code}
          </button>
        ))}
      </div>

      {/* Active Test Card */}
      {HEALTH_TESTS.map((test, i) =>
        activeTest === i ? (
          <div key={i} className={`p-6 rounded-2xl border bg-gradient-to-br ${test.bgColor} space-y-5`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{test.code}</h3>
                <p className="text-white/60 text-sm">{test.fullName}</p>
              </div>
              <span className={`text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/15 ${test.severityColor}`}>
                {test.severity}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {test.stats.map((s, j) => (
                <div key={j} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/50 mb-1">{s.label}</p>
                  <p className="text-sm font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Czym jest?</p>
                <p className="text-sm text-white/80 leading-relaxed">{test.what}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Jak testujemy?</p>
                <p className="text-sm text-white/80 leading-relaxed">{test.test}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Dlaczego ważne?</p>
                <p className="text-sm text-white/80 leading-relaxed">{test.why}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <p className="text-xs font-mono text-green-400/70 uppercase tracking-widest mb-2">Nasze wyniki</p>
                <p className="text-sm text-white/80 leading-relaxed">{test.result}</p>
              </div>
            </div>
          </div>
        ) : null
      )}

      {/* Timeline adopcji */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Harmonogram badań przed adopcją</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0">
          {[
            { week: "Tydzień 1–4", label: "Badanie rodziców przed rozrodem", color: "bg-violet-500" },
            { week: "Tydzień 6", label: "Odrobaczanie kociaka", color: "bg-blue-500" },
            { week: "Tydzień 8", label: "Pierwsze szczepienia", color: "bg-amber-500" },
            { week: "Tydzień 12", label: "Drugie szczepienia + czipowanie", color: "bg-green-500" },
            { week: "Tydzień 12–16", label: "Adopcja z pełną dokumentacją", color: "bg-rose-500" },
          ].map((item, i) => (
            <div key={i} className="flex sm:flex-col items-start sm:items-center flex-1 relative">
              <div className={`w-3 h-3 rounded-full ${item.color} shrink-0 z-10`} />
              {i < 4 && (
                <div className="sm:hidden w-px h-8 bg-white/10 ml-1.5" />
              )}
              {i < 4 && (
                <div className="hidden sm:block absolute top-1.5 left-[50%] w-full h-px bg-white/10" />
              )}
              <div className="ml-4 sm:ml-0 sm:mt-3 sm:text-center">
                <p className="text-[10px] font-mono text-white/40">{item.week}</p>
                <p className="text-xs text-white/70 leading-tight">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══ Artykuł 4: Wyprawka i Przygotowanie ════════════════════════════════════

const STARTER_CATEGORIES = [
  {
    cat: "Drapaki i meble",
    icon: "🪵",
    items: [
      { name: "Drapak wieżowy (min. 150 cm)", priority: "Konieczne", note: "Maine Coon osiąga 10+ kg — zwykłe drapaki się przewracają" },
      { name: "Drapak narożny do ściany", priority: "Zalecane", note: "Zabezpiecza narożniki mebli" },
      { name: "Leżanka zamocowana na ścianie", priority: "Zalecane", note: "Koty uwielbiają obserwować przestrzeń z góry" },
      { name: "Kuweta XXL (min. 60×40 cm)", priority: "Konieczne", note: "Standard dla dużych ras — zbyt mała powoduje stres" },
    ],
  },
  {
    cat: "Żywienie i woda",
    icon: "🍖",
    items: [
      { name: "Karma mokra — podstawa diety", priority: "Konieczne", note: "Koty piją za mało wody — karma mokra uzupełnia nawodnienie" },
      { name: "Fontanna na wodę", priority: "Zalecane", note: "Ruchoma woda zachęca koty do picia" },
      { name: "Miska płytka lub elevowana", priority: "Zalecane", note: "Głęboka miska drażni wąsy (wibryssae)" },
      { name: "Karma sucha premium (opcja)", priority: "Opcjonalne", note: "Może uzupełniać dietę, nie zastępować mokrej" },
    ],
  },
  {
    cat: "Zabawy i aktywność",
    icon: "🎾",
    items: [
      { name: "Wędka z piórkami lub myszką", priority: "Konieczne", note: "Maine Coon jest bardzo aktywny i potrzebuje codziennej zabawy" },
      { name: "Tunele i mat sensoryczny", priority: "Zalecane", note: "Stymulacja węchowa i poznawcza" },
      { name: "Piłki do toczenia", priority: "Opcjonalne", note: "Maine Coony często lubią tosowanie przedmiotów" },
    ],
  },
  {
    cat: "Pielęgnacja i zdrowie",
    icon: "🧴",
    items: [
      { name: "Szczotka do sierści (furminator lub slicker)", priority: "Konieczne", note: "Długa sierść wymaga czesania min. 2×/tydzień" },
      { name: "Nożyczki do pazurów", priority: "Konieczne", note: "Skracanie co 3–4 tygodnie" },
      { name: "Szampon dla kotów długowłosych", priority: "Zalecane", note: "Kąpiel co 2–3 miesiące" },
      { name: "Transpotrer/klatka transportowa", priority: "Konieczne", note: "Potrzebna od pierwszego dnia — do wet. i podróży" },
    ],
  },
];

const ROOM_DANGERS = [
  { danger: "Otwarte okna bez siatki", solution: "Zamontuj siatki lub specjalne kraty przed adopcją" },
  { danger: "Toksyczne rośliny domowe", solution: "Usuń: bluszcz, filodendron, lilia, difenbachia, aloes" },
  { danger: "Luźne kable elektryczne", solution: "Zabezpiecz spiralami lub chowaj za meblami" },
  { danger: "Środki chemiczne (lodówka, szafki)", solution: "Zamknij na klucz lub chroń zabezpieczeniami dla dzieci" },
  { danger: "Pralka i suszarka", solution: "Zawsze sprawdzaj wnętrze przed uruchomieniem" },
  { danger: "Otwarte balkony", solution: "Siatka balkonowa — obowiązkowo zanim kociak dotrze" },
];

export function Article4StarterKitInteractive() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [dangersOpen, setDangersOpen] = useState(false);

  const priorities: Record<string, string> = {
    "Konieczne": "bg-red-500/20 text-red-300 border-red-500/30",
    "Zalecane": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Opcjonalne": "bg-zinc-500/20 text-zinc-400 border-zinc-500/20",
  };

  return (
    <div className="space-y-8">
      {/* Category tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STARTER_CATEGORIES.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(i)}
            className={`p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
              activeCategory === i
                ? "bg-white text-black border-white"
                : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="block text-2xl mb-1">{cat.icon}</span>
            <span className={`text-xs font-semibold ${activeCategory === i ? "text-black" : "text-white/70"}`}>{cat.cat}</span>
          </button>
        ))}
      </div>

      {/* Active Category Items */}
      <div className="space-y-3">
        {STARTER_CATEGORIES[activeCategory].items.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] transition-all">
            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-white text-sm">{item.name}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${priorities[item.priority]}`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1">{item.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dom bez zagrożeń */}
      <div>
        <button
          onClick={() => setDangersOpen(!dangersOpen)}
          className="w-full p-5 rounded-2xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/15 transition-all flex items-center justify-between cursor-pointer"
        >
          <span className="font-semibold text-white">⚠️ Zabezpiecz dom przed przyjazdem kociaka — lista zagrożeń</span>
          <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${dangersOpen ? "rotate-180" : ""}`} />
        </button>
        {dangersOpen && (
          <div className="mt-3 space-y-2">
            {ROOM_DANGERS.map((d, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/8">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-sm text-white/80">{d.danger}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-sm text-green-300/80">{d.solution}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══ Artykuł 5: Maine Coon z dziećmi i psem ══════════════════════════════

const SOCIALIZATION_STAGES = [
  {
    age: "2–4 tygodnie",
    title: "Faza imprinting",
    desc: "Kocięta otwierają oczy i uszy. Pierwsze kontakty z głosem, zapachem ludzi. Mama jest modelem zachowania.",
    icon: "👁️",
    color: "border-violet-500/30 bg-violet-500/10",
  },
  {
    age: "4–8 tygodni",
    title: "Socjalizacja z ludźmi",
    desc: "Kluczowy okres! Kocięta oswajane z dotykiem, dźwiękami domowymi (odkurzacz, TV), różnymi osobami.",
    icon: "🤝",
    color: "border-blue-500/30 bg-blue-500/10",
  },
  {
    age: "6–9 tygodni",
    title: "Kontakt z dziećmi",
    desc: "Pod nadzorem dorośle, dzieci uczą się właściwego obchodzenia się z kociakiem. Kociak uczy się przewidywać dzieci.",
    icon: "👶",
    color: "border-amber-500/30 bg-amber-500/10",
  },
  {
    age: "8–12 tygodni",
    title: "Kontakt z psem",
    desc: "Stopniowe, kontrolowane oswajanie z psem przez siatkę lub za bramką. Bez stresu, bez forsowania kontaktu.",
    icon: "🐕",
    color: "border-green-500/30 bg-green-500/10",
  },
  {
    age: "12 tygodni",
    title: "Adopcja — kociak gotowy",
    desc: "Po 12 tygodniach kociak jest socjalnie dojrzały i gotowy na przeprowadzkę do nowego domu.",
    icon: "🏡",
    color: "border-rose-500/30 bg-rose-500/10",
  },
];

const MC_VS_DOG_TRAITS = [
  { trait: "Wierność i przywiązanie do opiekuna", mc: 5, dog: 5 },
  { trait: "Tolerancja na głośne środowisko", mc: 4, dog: 4 },
  { trait: "Przyjazność wobec dzieci", mc: 5, dog: 4 },
  { trait: "Akceptacja innych zwierząt", mc: 4, dog: 3 },
  { trait: "Aktywność i potrzeba zabawy", mc: 5, dog: 5 },
  { trait: "Samodzielność (toleruje samotność)", mc: 3, dog: 2 },
];

export function Article5SocializationInteractive() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div className="space-y-10">
      {/* Oś czasu socjalizacji */}
      <div>
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Etapy socjalizacji w hodowli</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {SOCIALIZATION_STAGES.map((stage, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                activeStage === i
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{stage.icon}</span>
              <span>{stage.age}</span>
            </button>
          ))}
        </div>

        <div className={`p-5 rounded-2xl border ${SOCIALIZATION_STAGES[activeStage].color} transition-all duration-300`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{SOCIALIZATION_STAGES[activeStage].icon}</span>
            <div>
              <p className="font-bold text-white">{SOCIALIZATION_STAGES[activeStage].title}</p>
              <p className="text-xs text-white/50">{SOCIALIZATION_STAGES[activeStage].age}</p>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{SOCIALIZATION_STAGES[activeStage].desc}</p>
        </div>
      </div>

      {/* Porównanie cech — bar chart */}
      <div>
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
          Cechy charakteru Maine Coona vs. typowy pies
        </p>
        <div className="space-y-4">
          {MC_VS_DOG_TRAITS.map((trait, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-white/70">{trait.trait}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs w-6 text-white/30 font-mono">MC</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700"
                    style={{ width: `${(trait.mc / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs w-3 text-amber-300 font-mono">{trait.mc}</span>
              </div>
              <div className="flex gap-2 items-center mt-1">
                <span className="text-xs w-6 text-white/30 font-mono">🐕</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-700"
                    style={{ width: `${(trait.dog / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs w-3 text-blue-300 font-mono">{trait.dog}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-white/40">
          <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-amber-400 inline-block" /> Maine Coon</span>
          <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-sm bg-blue-400 inline-block" /> Pies</span>
          <span className="ml-auto">Skala 1–5</span>
        </div>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { emoji: "👧", title: "Dzieci i Maine Coon", tips: ["Ucz dziecko, że kot to nie zabawka", "Pozwól kotu inicjować kontakt", "Maine Coony lubią dzieci, ale potrzebują spokoju", "Nadzoruj pierwsze tygodnie po adopcji"] },
          { emoji: "🐕", title: "Pies i Maine Coon", tips: ["Pierwsze spotkanie przez siatkę lub barierę", "Nie forsuj kontaktu — daj czas na oswajanie", "Maine Coon często dominuje nad psem", "Zadbaj o strefy ucieczki dla kota (wyższy poziom)"] },
        ].map((tip, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{tip.emoji}</span>
              <span className="font-semibold text-white">{tip.title}</span>
            </div>
            <ul className="space-y-2">
              {tip.tips.map((t, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
