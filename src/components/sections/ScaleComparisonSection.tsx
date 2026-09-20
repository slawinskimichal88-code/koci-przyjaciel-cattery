"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Ruler,
  Crosshair,
  Waves,
  Scale,
  Maximize2,
  Smile,
  Home,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  Eye,
  Info,
  Volume2,
  MousePointerClick,
  ArrowRight,
  BookOpen,
} from "lucide-react";

interface Hotspot {
  id: string;
  featureId: string;
  x: number;
  y: number;
  icon: string;
  label: string;
  animal: "mainecoon" | "dog" | "cat";
}

interface FeatureDetail {
  id: string;
  name: string;
  icon: string;
  category: string;
  shortHighlight: string;
  verdictTitle: string;
  practicalWinner: string;
  catFact: {
    title: string;
    desc: string;
    bullet: string;
  };
  mainecoonFact: {
    title: string;
    desc: string;
    bullet: string;
  };
  dogFact: {
    title: string;
    desc: string;
    bullet: string;
  };
}

const ALL_HOTSPOTS: Hotspot[] = [
  {
    id: "mc-ears",
    featureId: "ears",
    x: 48,
    y: 22,
    icon: "👂",
    label: "Uszy Maine Coona (Pędzle 12 cm)",
    animal: "mainecoon",
  },
  {
    id: "dog-ears",
    featureId: "ears",
    x: 88,
    y: 35,
    icon: "👂",
    label: "Wiszące uszy Beagle'a (Zapalenia)",
    animal: "dog",
  },
  {
    id: "cat-ears",
    featureId: "ears",
    x: 14,
    y: 38,
    icon: "👂",
    label: "Małe uszka kotka domowego",
    animal: "cat",
  },
  {
    id: "height-wither",
    featureId: "height",
    x: 62,
    y: 30,
    icon: "📏",
    label: "Wzrost: Równy z Psem (38 cm)",
    animal: "mainecoon",
  },
  {
    id: "mc-grooming",
    featureId: "grooming",
    x: 47,
    y: 48,
    icon: "🧼",
    label: "Jedwabista sierść (Myje się sam)",
    animal: "mainecoon",
  },
  {
    id: "dog-fur",
    featureId: "grooming",
    x: 83,
    y: 54,
    icon: "🧼",
    label: "Sierść psa wbija się w dywany",
    animal: "dog",
  },
  {
    id: "mc-water",
    featureId: "water",
    x: 42,
    y: 56,
    icon: "🌊",
    label: "Woda & Pływanie (Hydrofobowy)",
    animal: "mainecoon",
  },
  {
    id: "mc-tail",
    featureId: "tail",
    x: 31,
    y: 66,
    icon: "🦊",
    label: "Ogon Pióropusz (45 cm - Rekord)",
    animal: "mainecoon",
  },
  {
    id: "mc-paws",
    featureId: "paws",
    x: 49,
    y: 84,
    icon: "🐾",
    label: "Łapy śnieżne (Chowane pazury)",
    animal: "mainecoon",
  },
  {
    id: "dog-paws",
    featureId: "paws",
    x: 81,
    y: 84,
    icon: "🐾",
    label: "Pazury psa (Stukanie po panelach)",
    animal: "dog",
  },
];

const CHARACTERISTIC_FEATURES: FeatureDetail[] = [
  {
    id: "ears",
    name: "Uszy & Słuch",
    icon: "👂",
    category: "Anatomia & Zdrowie",
    shortHighlight: "Rysiowe pędzle (12 cm) vs opadające uszy psa",
    verdictTitle: "Zdrowsze uszy i zero męczącego czyszczenia",
    practicalWinner:
      "Maine Coon posiada pionowe, otwarte uszy z gęstym futrem ochronnym. W przeciwieństwie do psa Beagle, kanał słuchowy jest stale wentylowany — brak infekcji, brak zapaleń i brak konieczności wkraplania leków.",
    catFact: {
      title: "Gładkie, małe, trójkątne",
      desc: "Niewielkie uszka bez pędzli rysiowych. Brak naturalnej ochrony przed mrozem i wiatrem.",
      bullet: "Standardowa budowa bez filtrów futrzanych.",
    },
    mainecoonFact: {
      title: "Rysiowe pędzle (tzw. lynx tips do 12 cm)",
      desc: "Wysokie, dumnie stojące małżowiny z kępkami futra w środku. Otwarty kanał zapewnia perfekcyjną cyrkulację powietrza — kot nigdy nie ma problemów z grzybicą ucha.",
      bullet: "Dźwiękowy radar: obrót małżowiny o 180° niezależnie.",
    },
    dogFact: {
      title: "Płaskie, wiszące uszy gończe",
      desc: "Opadające uszy szczelnie zakrywają kanał słuchowy. Wilgoć i brak powietrza sprzyjają nawracającym zapaleniom ucha — wymagają regularnego czyszczenia u weterynarza.",
      bullet: "Wymóg comiesięcznego płukania specjalnymi kroplami.",
    },
  },
  {
    id: "grooming",
    name: "Sierść & Czystość w Domu",
    icon: "🧼",
    category: "Higiena & Pielęgnacja",
    shortHighlight: "Samoczyszczący, zero zapachu mokrego psa w domu",
    verdictTitle: "Majestatyczne futro bez psiego zapachu i bez błota",
    practicalWinner:
      "Maine Coon myje się sam językiem jak każdy kot. Mimo olbrzymiej objętości szaty, nie posiada gęstego podszerstka filcującego — wystarczy 5 minut czesania w tygodniu. W domu nie ma zapachu mokrej sierści ani wnoszonego błota.",
    catFact: {
      title: "Krótka, gładka szata",
      desc: "Kot czyści się sam. Minimalny nakład pracy opiekuna, ale gubi pojedyncze krótkie włoski przez cały rok.",
      bullet: "Brak kołtunów, naturalna higiena.",
    },
    mainecoonFact: {
      title: "Jedwabista szata z kryzą na szyi",
      desc: "Sierść ma strukturę lejącego jedwabiu, która nie filcuje się w kołtuny. Kot sam pieczołowicie dba o toaletę. Po powrocie z balkonu czy ogrodu nie wnosi brudu do łóżka.",
      bullet: "Pachnie czystością, czesanie raz na 7 dni jako relaks.",
    },
    dogFact: {
      title: "Krótki, sztywny włos wbijający się w tapicerkę",
      desc: "Sierść psa Beagle wbija się w meble i ubrania jak drobne igły, trudne do odkurzenia. Po deszczu wydziela intensywny zapach łoju i wymaga kąpieli po każdym spacerze.",
      bullet: "Błoto na podłodze po deszczowym spacerze.",
    },
  },
  {
    id: "height",
    name: "Wzrost w Kłębie (Wysokość)",
    icon: "📏",
    category: "Gabaryt & Proporcje",
    shortHighlight: "38 cm w barkach: dokładnie ten sam wzrost co pies Beagle!",
    verdictTitle: "Format małego psa w ciele dostojnego kota",
    practicalWinner:
      "W kłębie Maine Coon osiąga 38 cm — dokładnie tyle samo co dorosły pies Beagle. Przewyższa zwykłego kota domowego aż o 14 cm, dając poczucie obcowania z prawdziwym, solidnym drapieżnikiem.",
    catFact: {
      title: "24 cm w kłębie (Waga 3.5 – 4 kg)",
      desc: "Filigranowa budowa. Przy Maine Coonie wygląda jak małe kocię, sięgając mu zaledwie do połowy klatki piersiowej.",
      bullet: "Standardowy kot kanapowy.",
    },
    mainecoonFact: {
      title: "38 cm w kłębie (Waga 8.5 – 11.5+ kg)",
      desc: "Mocny kościec, szeroka klatka piersiowa i potężne barki na wysokości grzbietu psa rasy Beagle. Gdy stanie na tylnych łapach, z łatwością kładzie łapy na blacie stołu kuchennego.",
      bullet: "Widok, który budzi natychmiastowy zachwyt gości.",
    },
    dogFact: {
      title: "38 cm w kłębie (Waga 12 – 14 kg)",
      desc: "Standard FCI dla dorosłego samca Beagle. Identyczna wysokość w barkach co samiec Maine Coon z naszej hodowli.",
      bullet: "Identyczna skala i objętość sylwetki.",
    },
  },
  {
    id: "tail",
    name: "Ogon (Długość & Termika)",
    icon: "🦊",
    category: "Rekord Guinnessa",
    shortHighlight: "45 cm puszystego pióropusza służącego jako szal",
    verdictTitle: "Najdłuższy i najbardziej puszysty ogon w świecie zwierząt domowych",
    practicalWinner:
      "Ogon Maine Coona (do 45 cm) jest dłuższy niż całe ciało kota domowego! Służy mu jako naturalny szal termiczny, którym kot owija łapy i pyszczek podczas snu.",
    catFact: {
      title: "Krótki, cienki ogonek (20–25 cm)",
      desc: "Gładki, bez obfitego futra. Służy wyłącznie do utrzymywania równowagi przy skokach na szafkę.",
      bullet: "Brak właściwości izolacyjnych.",
    },
    mainecoonFact: {
      title: "Olbrzymi pióropusz (40–45 cm)",
      desc: "Pokryty długą, napuszoną sierścią przypominającą lisią kitę. Kot w spoczynku zawija go wokół całego ciała, chroniąc nos przed chłodem. Rekordziści osiągają z ogonem ponad 115 cm długości!",
      bullet: "Ruchy ogona Maine Coona to fascynujący spektakl gracji.",
    },
    dogFact: {
      title: "Sztywny ogon myśliwski (~25 cm)",
      desc: "Prosty, twardy ogon noszony do góry z białą końcówką (tzw. latarnia u Beagle'a). Nie ma żadnej funkcji grzewczej.",
      bullet: "Często uderza o meble i ściany.",
    },
  },
  {
    id: "paws",
    name: "Łapy, Pazury & Panele",
    icon: "🐾",
    category: "Komfort Mieszkania",
    shortHighlight: "Wielka łapa psa, chowane pazury — cichy chód nocą",
    verdictTitle: "Potężna łapa wielkości dłoni bez głośnego stukania nocą",
    practicalWinner:
      "Łapa dorosłego Maine Coona ma średnicę stopy dużego psa i kępki futra między palcami. Dzięki chowanym pazurom kot porusza się po parkiecie bezszelestnie — zero nocnego stukania pazurów, które budzi domowników.",
    catFact: {
      title: "Drobne łapki, mała powierzchnia",
      desc: "Pazury chowane. Cichy chód, mała stabilność na śliskich powierzchniach.",
      bullet: "Klasyczne delikatne kocie poduszki.",
    },
    mainecoonFact: {
      title: "Arktyczne rakiety śnieżne (Snowshoes)",
      desc: "Potężne, okrągłe stopy z gęstymi pędzlami futra wyrastającymi spomiędzy opuszek. Dają stabilność na panelach i izolację od zimnych płytek. Pazury są w 100% chowane — nie rysują podłogi i nie stukają.",
      bullet: "Rozmiar łapy porównywalny z dłonią dorosłego człowieka.",
    },
    dogFact: {
      title: "Pazury niechowane, twarde opuszki",
      desc: "Psie pazury nie chowają się do pochewek. Przy każdym kroku słychać rytmiczne stukanie 'klik-klik' po panelach podłogowych, szczególnie uciążliwe w nocy.",
      bullet: "Ryzyko zarysowań lakierowanych parkietów.",
    },
  },
  {
    id: "water",
    name: "Woda & Pływanie",
    icon: "🌊",
    category: "Fenomen Natury",
    shortHighlight: "Hydrofobowe futro, uwielbia wodę i potrafi pływać!",
    verdictTitle: "Jedyny kot, który sam prosi o odkręcenie kranu",
    practicalWinner:
      "Podwójne, natłuszczone futro Maine Coona nie przepuszcza wody do skóry — krople spływają po nim jak po kaczce. Wiele naszych kotów wskakuje do wanny, asystuje przy prysznicu i tapla się łapami w miskach z wodą!",
    catFact: {
      title: "Paniczny lęk przed wilgocią",
      desc: "Zwykły kot domowy panicznie boi się wody. Zmoczenie futra oznacza utratę ciepła i ogromny stres.",
      bullet: "Ucieka z łazienki na dźwięk odkręcanego kranu.",
    },
    mainecoonFact: {
      title: "Hydrofobowy pancerz i zamiłowanie do wody",
      desc: "Ewolucja w surowym klimacie Maine wyposażyła tę rasę w wodoodporną okrywę. Maine Coon uwielbia 'grzebać' łapą w wodzie przed napiciem się, a niektóre osobniki z radością pływają w napełnionej wannie.",
      bullet: "Czysta zabawa bez paniki i bez drapania opiekuna.",
    },
    dogFact: {
      title: "Lubi pływać w plenerze, ale brudzi dom",
      desc: "Pies chętnie skacze do jeziora czy kałuży, jednak chłonie litry wody w podszerstek. Po powrocie otrzepuje się na ściany i wydziela mocny zapach, wymagając suszenia suszarką.",
      bullet: "Konieczność długiego wycierania ręcznikami.",
    },
  },
];

const COMPARISON_CARDS = [
  {
    icon: Waves,
    title: "Stosunek do Wody & Pływanie",
    badge: "Fenomen Rasy",
    highlight: true,
    cat: "Paniczny lęk przed wodą. Ucieka przed kroplą z kranu i unika wilgoci.",
    mainecoon:
      "Kocha wodę i potrafi pływać! Hydrofobowe futro odpycha wilgoć. Tapla się w misce, asystuje pod prysznicem i bawi się strumieniem z kranu.",
    dog: "Pływa w plenerze, ale po powrocie wnosi brud i mocny zapach mokrej sierści do mieszkania.",
  },
  {
    icon: Scale,
    title: "Masa Ciała i Ciężar",
    badge: "2.6x Cięższy",
    highlight: true,
    cat: "3.5 – 4.5 kg. Lekka, filigranowa konstrukcja kośćca.",
    mainecoon:
      "8.5 – 11.5+ kg. Prawdziwa waga psa — czujesz konkretną masę, gdy bierzesz go na ręce lub kładzie się na Twoich kolanach.",
    dog: "11 – 13 kg (dorosły Beagle). Identyczna kategoria wagowa co dorosły kocur Maine Coon.",
  },
  {
    icon: Maximize2,
    title: "Długość z Ogonem & Format",
    badge: "Rekord Świata",
    highlight: false,
    cat: "ok. 60 – 65 cm długości całkowitej. Format standardowy.",
    mainecoon:
      "100 – 115 cm (rekordziści do 120 cm). Najdłuższy kot domowy na Ziemi — długością przewyższa psa Beagle o ponad 30 cm!",
    dog: "ok. 70 – 75 cm długości od nosa do czubka ogona.",
  },
  {
    icon: Smile,
    title: "Charakter: „Koto-Pies” i Aport",
    badge: "Psia Dusza",
    highlight: false,
    cat: "Indywidualista. Chodzi własnymi ścieżkami, rzadko reaguje na wołanie po imieniu.",
    mainecoon:
      "Zachowuje się jak wierny pies: wita Cię przy drzwiach, chodzi krok w krok, sam przynosi rzucane zabawki i reaguje na głos.",
    dog: "Oddany kompan stadny, jednak wymaga ciągłego szkolenia i kontroli na zewnątrz.",
  },
  {
    icon: Volume2,
    title: "Wokalizacja: Gruchanie vs Szczek",
    badge: "Dźwięki",
    highlight: false,
    cat: "Tradycyjne, wysokie, często piskliwe miauczenie domagające się karmy.",
    mainecoon:
      "Ciche, melodyjne gruchanie (tzw. trilling). Nie miauczy piskliwie — wydaje miękkie dźwięki przypominające gruchanie gołębi.",
    dog: "Głośne szczekanie, warczenie i wycie, które słyszą wszyscy sąsiedzi w bloku.",
  },
  {
    icon: Home,
    title: "Spacery w Ulewę vs Kuweta",
    badge: "Codzienna Wygoda",
    highlight: true,
    cat: "Tylko kuweta w mieszkaniu. Strach przed szelkami i wyjściem na zewnątrz.",
    mainecoon:
      "Najlepsze z obu światów: bezbłędnie korzysta z kuwety w domu (możesz spać do 10:00!), ale chętnie spaceruje na szelkach po parku.",
    dog: "Bezwzględny obowiązek 3 spacerów dziennie — w mrozie, śnieżycy i ulewnym deszczu.",
  },
];

interface ScaleComparisonSectionProps {
  lang?: "PL" | "EN";
  compact?: boolean;
}

export default function ScaleComparisonSection({
  lang = "PL",
  compact = false,
}: ScaleComparisonSectionProps) {
  // Stan: która cecha jest otwarta (null = brak aktywnej cechy, czysty widok)
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>("ears");
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [showRulerLines, setShowRulerLines] = useState<boolean>(false);

  const activeFeature = CHARACTERISTIC_FEATURES.find((f) => f.id === activeFeatureId) || null;
  const currentFeatureIdx = activeFeature
    ? CHARACTERISTIC_FEATURES.findIndex((f) => f.id === activeFeatureId)
    : -1;

  const handleOpenFeature = (featureId: string) => {
    setActiveFeatureId(featureId);
  };

  const handleCloseFeature = () => {
    setActiveFeatureId(null);
  };

  const handleNextFeature = () => {
    if (currentFeatureIdx === -1) {
      setActiveFeatureId(CHARACTERISTIC_FEATURES[0].id);
      return;
    }
    const nextIdx = (currentFeatureIdx + 1) % CHARACTERISTIC_FEATURES.length;
    setActiveFeatureId(CHARACTERISTIC_FEATURES[nextIdx].id);
  };

  const handlePrevFeature = () => {
    if (currentFeatureIdx === -1) {
      setActiveFeatureId(CHARACTERISTIC_FEATURES[CHARACTERISTIC_FEATURES.length - 1].id);
      return;
    }
    const prevIdx =
      (currentFeatureIdx - 1 + CHARACTERISTIC_FEATURES.length) %
      CHARACTERISTIC_FEATURES.length;
    setActiveFeatureId(CHARACTERISTIC_FEATURES[prevIdx].id);
  };

  return (
    <section
      id="porownanie"
      className="relative bg-[#050505] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10"
    >
      {/* Poświata tła Apple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Nagłówek Sekcji ────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-5">
            <Crosshair className="w-3.5 h-3.5 text-white/70 animate-spin-slow" />
            <span className="text-[10px] sm:text-[11px] font-ui uppercase tracking-[0.35em] text-white/80 font-semibold">
              Interaktywne Studio Porównawcze · Skala 1:1
            </span>
          </div>

          <h2
            className="font-heading font-light text-white leading-[0.92] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.3rem, 5.2vw, 4.8rem)" }}
          >
            Maine Coon vs Kot Domowy vs Pies.
            <br />
            <span className="font-semibold italic text-white/95">
              Klikaj kropki na zwierzętach.
            </span>
          </h2>

          <p className="text-sm sm:text-base font-body text-white/65 leading-relaxed max-w-2xl mx-auto">
            Najedź lub kliknij dowolną pulsującą kropkę na zdjęciu, aby otworzyć interaktywną kartę
            i sprawdzić, czym Maine Coon różni się od psa i zwykłego kota w codziennym życiu.
          </p>
        </div>

        {/* ── Szybki Pasek Apple Pills — Wybór Cechy ─────────────────── */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap reveal">
          {CHARACTERISTIC_FEATURES.map((feat) => {
            const isSelected = activeFeatureId === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => handleOpenFeature(feat.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-ui uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105"
                    : "bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-sm">{feat.icon}</span>
                <span>{feat.name}</span>
              </button>
            );
          })}

          <button
            onClick={() => setShowRulerLines(!showRulerLines)}
            className={`px-3.5 py-2 rounded-full text-xs font-ui uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
              showRulerLines
                ? "bg-white/15 border-white/30 text-white"
                : "bg-transparent border-white/10 text-white/40 hover:text-white"
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Linie wzrostu: {showRulerLines ? "Wł." : "Wył."}</span>
          </button>
        </div>

        {/* ── GŁÓWNA SCENA INTERAKTYWNA: Apple Canvas ze Wskaźnikami ──── */}
        <div className="relative rounded-3xl border border-white/15 bg-black overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] reveal mb-12">
          
          {/* Pasek statusu u góry sceny */}
          <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center justify-between flex-wrap gap-2 text-xs font-ui">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white/80">
                {activeFeature ? (
                  <>
                    Wybrana cecha: <strong className="text-white">{activeFeature.icon} {activeFeature.name}</strong>
                  </>
                ) : (
                  <span className="text-white/60 flex items-center gap-1.5">
                    <MousePointerClick className="w-3.5 h-3.5 text-white/80" />
                    Kliknij dowolną kropkę na kocie lub psie, aby otworzyć szczegóły
                  </span>
                )}
              </span>
            </div>

            {activeFeature && (
              <button
                onClick={handleCloseFeature}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <X className="w-3 h-3" />
                <span>Zamknij podgląd [✕]</span>
              </button>
            )}
          </div>

          {/* Obszar Zdjęcia z Kropkami */}
          <div className="relative aspect-[16/9] w-full bg-black select-none overflow-hidden">
            <Image
              src="/images/maine-coon-accurate-comparison.jpg"
              alt="Maine Coon vs Kot Domowy vs Pies Beagle w skali 1:1"
              fill
              className="object-contain"
              priority
            />

            {/* Laserowe linie miary HUD (delikatne, bez białych naklejek) */}
            {showRulerLines && (
              <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 1000 562.5" fill="none">
                  {/* Kot Domowy: wysokość 24 cm */}
                  <line x1="70" y1="480" x2="70" y2="230" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="55" y1="230" x2="160" y2="230" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <line x1="55" y1="480" x2="160" y2="480" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <text x="60" y="355" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">24 cm</text>

                  {/* Maine Coon: wysokość 38 cm */}
                  <line x1="330" y1="480" x2="330" y2="135" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="320" y1="135" x2="620" y2="135" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                  <line x1="320" y1="480" x2="620" y2="480" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                  <text x="325" y="305" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">38 cm ★</text>

                  {/* Pies Beagle: wysokość 38 cm */}
                  <line x1="930" y1="480" x2="930" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="750" y1="135" x2="940" y2="135" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <line x1="750" y1="480" x2="940" y2="480" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <text x="950" y="305" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">38 cm</text>

                  {/* Pozioma linia równości kłębu */}
                  <line x1="420" y1="135" x2="880" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
            )}

            {/* ── WSZYSTKIE INTERAKTYWNE KROPKI NA ZWIERZĘTACH (BEZ STAŁYCH ETYKIET!) ── */}
            {ALL_HOTSPOTS.map((hotspot) => {
              const isSelected = activeFeatureId === hotspot.featureId;
              const isHovered = hoveredHotspotId === hotspot.id;

              return (
                <div
                  key={hotspot.id}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => handleOpenFeature(hotspot.featureId)}
                    onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                    onMouseLeave={() => setHoveredHotspotId(null)}
                    className="relative flex items-center justify-center p-1.5 sm:p-2.5 cursor-pointer focus:outline-none group/hotspot"
                    aria-label={hotspot.label}
                  >
                    {/* Delikatny puls przy wybranej kropce */}
                    {isSelected && (
                      <span className="absolute w-4 h-4 sm:w-7 sm:h-7 rounded-full bg-white/30 animate-ping pointer-events-none" />
                    )}

                    {/* Zewnętrzna subtelna aureola Apple */}
                    <span
                      className={`absolute rounded-full transition-all duration-300 pointer-events-none ${
                        isSelected
                          ? "w-4 h-4 sm:w-6 sm:h-6 bg-white/25 scale-110"
                          : isHovered
                          ? "w-3.5 h-3.5 sm:w-5 sm:h-5 bg-white/25 scale-105"
                          : "w-3 h-3 sm:w-4 sm:h-4 bg-white/10"
                      }`}
                    />

                    {/* Precyzyjna kropka inspekcyjna Apple LiDAR */}
                    <span
                      className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)] ring-2 ring-white/70 scale-110"
                          : isHovered
                          ? "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-white shadow-sm ring-1 ring-white/80 scale-105"
                          : "w-2 h-2 sm:w-3 sm:h-3 bg-white/90 ring-1 ring-black/30 group-hover/hotspot:bg-white"
                      }`}
                    >
                      <span
                        className={`rounded-full transition-colors ${
                          isSelected
                            ? "w-1 h-1 bg-black"
                            : isHovered
                            ? "w-1 h-1 bg-black"
                            : "w-0.5 h-0.5 sm:w-1 sm:h-1 bg-black/60 group-hover/hotspot:bg-black"
                        }`}
                      />
                    </span>

                    {/* Dymek pojawia się WYŁĄCZNIE W MOMENCIE NAJECHANIA KURSOREM (Zero stałych etykiet!) */}
                    {isHovered && (
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-full text-xs font-ui whitespace-nowrap shadow-2xl pointer-events-none backdrop-blur-xl bg-black/90 text-white font-medium border border-white/25 z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
                        <span>{hotspot.icon}</span>
                        <span>{hotspot.label}</span>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── WYSKAKUJĄCA KARTA APPLE HUD (PO KLIKNIĘCIU KROPKI) ───────── */}
          {activeFeature && (
            <div className="border-t border-white/15 bg-gradient-to-b from-white/[0.04] to-black/95 p-5 sm:p-7 backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95">
              
              {/* Nagłówek Otwartej Karty */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-white/10 border border-white/15">
                    {activeFeature.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-ui uppercase tracking-[0.3em] text-white/40 block">
                      {activeFeature.category} · Porównanie Anatomiczne
                    </span>
                    <h3 className="text-lg sm:text-2xl font-heading font-medium text-white">
                      {activeFeature.name}: {activeFeature.verdictTitle}
                    </h3>
                  </div>
                </div>

                {/* Przycisk Zamknij i Przełączniki */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevFeature}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
                    title="Poprzednia cecha"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextFeature}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
                    title="Następna cecha"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCloseFeature}
                    className="px-3.5 py-1.5 rounded-full bg-white text-black font-ui font-bold text-xs hover:bg-white/85 transition-all cursor-pointer flex items-center gap-1 shadow-lg ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Zamknij [✕]</span>
                  </button>
                </div>
              </div>

              {/* Siatka 3 Zwierząt: Kot vs Maine Coon vs Beagle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                
                {/* 1. KOT DOMOWY */}
                <div className="p-4 sm:p-5 rounded-2xl border bg-white/[0.02] border-white/10 text-white/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-ui uppercase tracking-wider text-white/50 font-semibold">
                      🐱 Kot Domowy (Europejski)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">
                      Waga: 4 kg
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-medium text-white mb-1.5">
                    {activeFeature.catFact.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed mb-3">
                    {activeFeature.catFact.desc}
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] font-ui text-white/50">
                    • {activeFeature.catFact.bullet}
                  </div>
                </div>

                {/* 2. MAINE COON (Centrum & Wyróżnienie Apple) */}
                <div className="p-5 rounded-2xl border bg-white/10 border-white/30 shadow-[0_15px_40px_rgba(255,255,255,0.06)] md:scale-[1.02]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-ui uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      Maine Coon (Nasza Hodowla)
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-black font-bold">
                      Waga: 11.5 kg ★
                    </span>
                  </div>
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-white mb-1.5">
                    {activeFeature.mainecoonFact.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed mb-3 font-normal">
                    {activeFeature.mainecoonFact.desc}
                  </p>
                  <div className="pt-2.5 border-t border-white/15 text-[11px] font-ui text-white/80 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{activeFeature.mainecoonFact.bullet}</span>
                  </div>
                </div>

                {/* 3. PIES BEAGLE */}
                <div className="p-4 sm:p-5 rounded-2xl border bg-white/[0.02] border-white/10 text-white/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-ui uppercase tracking-wider text-white/50 font-semibold">
                      🐶 Pies (Rasa Beagle)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60">
                      Waga: 12 kg
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-medium text-white mb-1.5">
                    {activeFeature.dogFact.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed mb-3">
                    {activeFeature.dogFact.desc}
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] font-ui text-white/50">
                    • {activeFeature.dogFact.bullet}
                  </div>
                </div>

              </div>

              {/* Dolny Pasek Praktycznego Wniosku */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-ui tracking-wider text-emerald-400 font-bold block mb-0.5">
                      Praktyczny Wniosek dla Opiekuna w Domu:
                    </span>
                    <p className="text-xs sm:text-sm font-body text-white/90 leading-relaxed">
                      {activeFeature.practicalWinner}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextFeature}
                  className="px-4 py-2.5 rounded-full bg-white text-black font-ui font-semibold text-xs hover:bg-white/85 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg self-end sm:self-center shrink-0"
                >
                  <span>Kolejna różnica</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* ── PODSUMOWANIE / BENTO GRID ─────────────────────────────────── */}
        {compact ? (
          /* Widok kompaktowy na Stronie Głównej: Pigułka wiedzy + hiperłącze do Bazy Wiedzy */
          <div className="reveal">
            <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-black/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* 3 kluczowe metryki w pigułkach */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-amber-300">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === "PL" ? "Kluczowe Parametry Skali 1:1" : "1:1 Scale Key Metrics"}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white leading-tight">
                    {lang === "PL"
                      ? "Format małego psa w ciele dostojnego kota kanapowego."
                      : "The format of a dog in the body of a magnificent cat."}
                  </h3>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-0.5">120 cm</div>
                      <div className="text-[10px] sm:text-xs font-ui text-white/50 uppercase tracking-wider">
                        {lang === "PL" ? "Długość z ogonem" : "Length with tail"}
                      </div>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-0.5">11.5 kg</div>
                      <div className="text-[10px] sm:text-xs font-ui text-white/50 uppercase tracking-wider">
                        {lang === "PL" ? "Waga kocura" : "Adult male weight"}
                      </div>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                      <div className="text-xl sm:text-2xl font-heading font-bold text-white mb-0.5">38 cm</div>
                      <div className="text-[10px] sm:text-xs font-ui text-white/50 uppercase tracking-wider">
                        {lang === "PL" ? "Kłąb (= Beagle)" : "Withers (= Beagle)"}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-body text-white/70 leading-relaxed">
                    {lang === "PL"
                      ? "Maine Coon łączy oddanie i inteligencję psa (aportuje, wita w drzwiach, uwielbia wodę) z wygodą posiadania kota (brak spacerów o świcie w ulewie, 100% czystości w kuwecie)."
                      : "Maine Coon combines dog loyalty and intelligence with feline indoor comfort."}
                  </p>
                </div>

                {/* Przyciski CTA i przejście do Bazy Wiedzy */}
                <div className="lg:col-span-5 flex flex-col items-stretch gap-4 bg-black/50 p-6 sm:p-8 rounded-2xl border border-white/10">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1">
                    {lang === "PL" ? "Chcesz poznać wszystkie szczegóły?" : "Want full details?"}
                  </div>
                  <p className="text-sm font-heading font-light text-white/90 mb-2">
                    {lang === "PL"
                      ? "Zobacz wyczerpujące zestawienie 6 obszarów anatomicznych, zachowań w wodzie i higieny w Bazie Wiedzy."
                      : "Explore all 6 anatomical areas, water behaviors, and hygiene differences in our Knowledge Base."}
                  </p>

                  <Link
                    href="/baza-wiedzy#porownanie"
                    className="w-full py-3.5 px-6 rounded-full bg-white text-black font-ui uppercase tracking-wider text-xs font-bold hover:bg-white/85 transition-all text-center flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                  >
                    <span>{lang === "PL" ? "Pełne Porównanie w Bazie Wiedzy" : "Full Comparison in Knowledge Base"}</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </Link>

                  <a
                    href="#kocieta"
                    className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-ui uppercase tracking-wider text-xs font-medium transition-all text-center"
                  >
                    {lang === "PL" ? "Zobacz Dostępne Kocięta" : "View Available Kittens"}
                  </a>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* Widok pełny w Bazie Wiedzy (/baza-wiedzy) */
          <div>
            <div className="text-center mb-10 reveal">
              <span className="text-[10px] font-ui uppercase tracking-[0.4em] text-white/40 block mb-2">
                Bento Grid · Zestawienie Parametrów
              </span>
              <h3
                className="font-heading font-light text-white leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Wszystkie różnice w pigułce.
              </h3>
              <p className="text-sm sm:text-base font-body text-white/60 max-w-xl mx-auto mt-2">
                Przejrzyste kafelki porównujące naturę, anatomię, upodobanie do wody i codzienne życie z Maine Coonem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {COMPARISON_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:translate-y-[-3px] ${
                      card.highlight
                        ? "bg-white/[0.04] border-white/25 shadow-[0_10px_35px_rgba(255,255,255,0.05)]"
                        : "bg-white/[0.015] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] uppercase font-ui tracking-widest text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                          {card.badge}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-heading font-medium text-white mb-4">
                        {card.title}
                      </h4>

                      <div className="space-y-3 font-body text-xs sm:text-sm">
                        {/* Maine Coon (Wyróżniony) */}
                        <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 shadow-inner">
                          <span className="text-[10px] font-ui uppercase tracking-wider text-white font-bold block mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-white" />
                            Maine Coon:
                          </span>
                          <p className="text-white font-medium leading-relaxed">
                            {card.mainecoon}
                          </p>
                        </div>

                        {/* Kot domowy */}
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/60">
                          <span className="text-[10px] font-ui uppercase tracking-wider text-white/40 block mb-0.5">
                            Kot Domowy:
                          </span>
                          <p className="leading-relaxed">{card.cat}</p>
                        </div>

                        {/* Pies Beagle */}
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/60">
                          <span className="text-[10px] font-ui uppercase tracking-wider text-white/40 block mb-0.5">
                            Pies (Beagle):
                          </span>
                          <p className="leading-relaxed">{card.dog}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Podsumowanie końcowe */}
            <div className="mt-12 p-8 sm:p-10 rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase font-ui tracking-[0.3em] text-white/40 block mb-2">
                  Dlaczego hodowla Koci Przyjaciel?
                </span>
                <p className="font-heading font-light text-xl sm:text-2xl text-white/95 leading-snug">
                  „Otrzymujesz majestat i oddanie psa, bez konieczności wychodzenia w ulewę o 6 rano, z dodatkiem jedwabistego futra i fascynacji wodą.”
                </p>
              </div>
              <a
                href="#kocieta"
                className="shrink-0 px-8 py-4 bg-white text-black font-ui uppercase tracking-widest text-xs font-semibold hover:bg-white/85 transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                Zobacz Dostępne Kocięta
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
