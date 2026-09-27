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
  Volume2,
  MousePointerClick,
  ArrowRight,
  Footprints,
  Baby,
  Sparkle,
  ShieldCheck,
  Droplets,
  Heart,
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
    label: "Uszy Maine Coona (Pędzle do 12 cm)",
    animal: "mainecoon",
  },
  {
    id: "dog-ears",
    featureId: "ears",
    x: 88,
    y: 35,
    icon: "👂",
    label: "Wiszące uszy Beagle'a (Kanał zamknięty)",
    animal: "dog",
  },
  {
    id: "cat-ears",
    featureId: "ears",
    x: 14,
    y: 38,
    icon: "👂",
    label: "Małe uszka kota domowego",
    animal: "cat",
  },
  {
    id: "height-wither",
    featureId: "height",
    x: 62,
    y: 30,
    icon: "📏",
    label: "Wzrost w kłębie: 38 cm (Równy z Psem)",
    animal: "mainecoon",
  },
  {
    id: "mc-grooming",
    featureId: "grooming",
    x: 47,
    y: 48,
    icon: "🧼",
    label: "Jedwabista szata (Brak zapachu psa)",
    animal: "mainecoon",
  },
  {
    id: "dog-fur",
    featureId: "grooming",
    x: 83,
    y: 54,
    icon: "🧼",
    label: "Twarda sierść psa (Wbija się w tapicerkę)",
    animal: "dog",
  },
  {
    id: "mc-water",
    featureId: "water",
    x: 42,
    y: 56,
    icon: "🌊",
    label: "Fascynacja wodą (Hydrofobowe futro)",
    animal: "mainecoon",
  },
  {
    id: "mc-tail",
    featureId: "tail",
    x: 31,
    y: 66,
    icon: "🦊",
    label: "Ogon pióropusz: do 45 cm (Rekord)",
    animal: "mainecoon",
  },
  {
    id: "mc-paws",
    featureId: "paws",
    x: 49,
    y: 84,
    icon: "🐾",
    label: "Łapy śnieżne (Chowane pazury, cichy chód)",
    animal: "mainecoon",
  },
  {
    id: "dog-paws",
    featureId: "paws",
    x: 81,
    y: 84,
    icon: "🐾",
    label: "Pazury psa (Stukanie po panelach nocą)",
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
    verdictTitle: "Zdrowsze uszy i zero uciążliwego czyszczenia",
    practicalWinner:
      "Maine Coon posiada pionowe, otwarte uszy z gęstym futrem ochronnym. W przeciwieństwie do psa Beagle, kanał słuchowy jest stale wentylowany — brak wilgoci, brak infekcji grzybiczych i brak konieczności cotygodniowego wkraplania leków.",
    catFact: {
      title: "Gładkie, małe, trójkątne (ok. 5–6 cm)",
      desc: "Niewielkie uszka bez pędzli rysiowych. Brak naturalnej ochrony przed mrozem i wiatrem.",
      bullet: "Standardowa budowa bez obfitych filtrów futrzanych.",
    },
    mainecoonFact: {
      title: "Rysiowe pędzle (tzw. lynx tips do 12 cm)",
      desc: "Wysokie, dumnie stojące małżowiny z kępkami futra wewnątrz. Otwarty kanał zapewnia perfekcyjną cyrkulację powietrza — kot nie ma problemów z grzybicą ucha.",
      bullet: "Dźwiękowy radar: niezależny obrót małżowiny o 180°.",
    },
    dogFact: {
      title: "Płaskie, wiszące uszy gończe",
      desc: "Opadające uszy szczelnie zamykają kanał słuchowy. Wilgoć sprzyja nawracającym stanom zapalnym — wymagają regularnego czyszczenia u weterynarza.",
      bullet: "Konieczność comiesięcznego płukania specjalnymi kroplami.",
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
      desc: "Sierść ma strukturę lejącego jedwabiu, która nie filcuje się w kołtuny. Kot pieczołowicie dba o toaletę. Po powrocie z wybiegu czy balkonu nie wnosi brudu do łóżka.",
      bullet: "Pachnie czystością, czesanie raz na 7 dni jako relaks.",
    },
    dogFact: {
      title: "Krótki, sztywny włos wbijający się w tapicerkę",
      desc: "Sierść psa Beagle wbija się w meble i ubrania jak drobne igły, trudne do odkurzenia. Po deszczu wydziela intensywny zapach łoju i wymaga mycia łap po spacerze.",
      bullet: "Błoto i wilgoć na podłodze po każdym deszczowym spacerze.",
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
      "W kłębie Maine Coon osiąga 38 cm — dokładnie tyle samo co dorosły pies Beagle. Przewyższa zwykłego kota domowego aż o 14 cm, dając niesamowite poczucie obcowania z prawdziwym, solidnym drapieżnikiem w salonie.",
    catFact: {
      title: "24 cm w kłębie (Waga 3.5 – 4.5 kg)",
      desc: "Filigranowa budowa. Przy Maine Coonie wygląda jak małe kocię, sięgając mu zaledwie do połowy klatki piersiowej.",
      bullet: "Standardowy kot kanapowy o drobnych kościach.",
    },
    mainecoonFact: {
      title: "38 cm w kłębie (Waga 8.5 – 11.5+ kg)",
      desc: "Mocny kościec, szeroka klatka piersiowa i potężne barki na wysokości grzbietu psa rasy Beagle. Gdy stanie na tylnych łapach, z łatwością kładzie łapy na blacie stołu kuchennego.",
      bullet: "Widok, który budzi natychmiastowy zachwyt gości w domu.",
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
      "Ogon Maine Coona (do 45 cm) jest dłuższy niż całe ciało kota domowego! Służy mu jako naturalny szal termiczny, którym kot owija łapy i pyszczek podczas snu na drapaku czy kanapie.",
    catFact: {
      title: "Krótki, cienki ogonek (20–25 cm)",
      desc: "Gładki, bez obfitego futra. Służy wyłącznie do utrzymywania równowagi przy skokach na meble.",
      bullet: "Brak właściwości izolacji cieplnej.",
    },
    mainecoonFact: {
      title: "Olbrzymi pióropusz (40–45 cm)",
      desc: "Pokryty długą, napuszoną sierścią przypominającą lisią kitę. Kot w spoczynku zawija go wokół całego ciała. Rekordziści rasy osiągają z ogonem ponad 115–120 cm długości całkowitej!",
      bullet: "Ruchy ogona Maine Coona to fascynujący spektakl gracji.",
    },
    dogFact: {
      title: "Sztywny ogon myśliwski (~25 cm)",
      desc: "Prosty, twardy ogon noszony do góry z białą końcówką (tzw. latarnia u Beagle'a). Nie ma żadnej funkcji grzewczej.",
      bullet: "Często uderza głośno o meble i ściany.",
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
      "Łapa dorosłego Maine Coona ma średnicę stopy dużego psa i kępki futra między palcami. Dzięki w 100% chowanym pazurom kot porusza się po parkiecie bezszelestnie — zero nocnego stukania pazurów, które budzi domowników.",
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
      desc: "Ewolucja w surowym klimacie Maine wyposażyła tę rasę w wodoodporną okrywę. Maine Coon uwielbia 'grzebać' łapą w misce z wodą przed napiciem się, a niektóre osobniki z radością asystują przy kąpieli.",
      bullet: "Czysta zabawa bez paniki i bez drapania rąk opiekuna.",
    },
    dogFact: {
      title: "Lubi pływać w plenerze, ale brudzi mieszkanie",
      desc: "Pies chętnie wskakuje do jeziora czy kałuży, jednak chłonie litry wody w podszerstek. Po powrocie otrzepuje się na ściany i wydziela intensywny zapach mokrej sierści.",
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
    cat: "Paniczny lęk przed wodą. Ucieka przed każdą kroplą z kranu i unika wilgoci.",
    mainecoon:
      "Kocha wodę i potrafi pływać! Hydrofobowe futro odpycha wilgoć. Tapla się w misce, asystuje pod prysznicem i bawi się bieżącym strumieniem z kranu.",
    dog: "Pływa w plenerze, ale po powrocie wnosi brud, piasek i mocny zapach mokrej sierści do mieszkania.",
  },
  {
    icon: Scale,
    title: "Masa Ciała i Ciężar",
    badge: "2.6x Cięższy",
    highlight: true,
    cat: "3.5 – 4.5 kg. Lekka, filigranowa konstrukcja kośćca.",
    mainecoon:
      "8.5 – 11.5+ kg (potężne kocury do 12 kg). Prawdziwy ciężar psa — czujesz konkretną masę, gdy bierzesz go na ręce lub kładzie się na Twoich kolanach.",
    dog: "11 – 13 kg (dorosły Beagle). Identyczna kategoria wagowa co dorosły samiec Maine Coon z naszej hodowli.",
  },
  {
    icon: Maximize2,
    title: "Długość z Ogonem & Format",
    badge: "Rekord Świata",
    highlight: false,
    cat: "ok. 60 – 65 cm długości całkowitej. Format standardowego małego drapieżnika.",
    mainecoon:
      "100 – 115 cm (rekordziści do 120 cm). Najdłuższy kot domowy na Ziemi — długością przewyższa psa Beagle o ponad 30 cm!",
    dog: "ok. 70 – 75 cm długości od czubka nosa do końca ogona.",
  },
  {
    icon: Smile,
    title: "Charakter: „Koto-Pies” i Aport",
    badge: "Psia Dusza",
    highlight: false,
    cat: "Indywidualista. Chodzi własnymi ścieżkami, rzadko reaguje na wołanie po imieniu.",
    mainecoon:
      "Zachowuje się jak wierny pies: wita Cię przy drzwiach, chodzi krok w krok, sam przynosi rzucane zabawki i reaguje na ton głosu.",
    dog: "Oddany kompan stadny, jednak wymaga ciągłego szkolenia, dyscypliny i kontroli na spacerach.",
  },
  {
    icon: Volume2,
    title: "Wokalizacja: Gruchanie vs Szczek",
    badge: "Dźwięki",
    highlight: false,
    cat: "Tradycyjne, wysokie, często piskliwe miauczenie domagające się karmy.",
    mainecoon:
      "Ciche, melodyjne gruchanie (tzw. trilling). Nie miauczy piskliwie — wydaje miękkie dźwięki przypominające gruchanie gołębi.",
    dog: "Głośne szczekanie, warczenie i wycie, które słyszą wszyscy sąsiedzi w klatce czy bloku.",
  },
  {
    icon: Home,
    title: "Spacery w Ulewę vs Kuweta",
    badge: "Codzienna Wygoda",
    highlight: true,
    cat: "Tylko kuweta w mieszkaniu. Strach przed szelkami i wyjściem na zewnątrz.",
    mainecoon:
      "Najlepsze z obu światów: bezbłędnie korzysta z kuwety XXL w domu (możesz spać do 10:00!), ale chętnie spaceruje na szelkach po ogrodzie lub parku.",
    dog: "Bezwzględny obowiązek 3 spacerów dziennie — w mrozie, śnieżycy i ulewnym deszczu o 6:00 rano.",
  },
  {
    icon: Baby,
    title: "Cierpliwość do Dzieci i Łagodność",
    badge: "Łagodny Olbrzym",
    highlight: true,
    cat: "Zwykle płochliwy wobec małych dzieci. W razie naruszenia granic potrafi drapnąć lub uciec.",
    mainecoon:
      "Anielska cierpliwość (Gentle Giant). Wychowywany przy dzieciach pozwala na delikatne przytulanie, a gdy ma dość, po prostu majestatycznie odchodzi.",
    dog: "Często zbyt energiczny dla małych dzieci — może przewrócić malucha w zabawie lub mocno pociągnąć.",
  },
  {
    icon: Sparkle,
    title: "Zapach & Czystość w Mieszkaniu",
    badge: "100% Bezzapachowy",
    highlight: false,
    cat: "Czysty, ale gubi drobny włos. Kuweta wymaga regularnego sprzątania.",
    mainecoon:
      "Całkowity brak zapachu zwierzęcia w domu. Jedwabiste futro nie chłonie brudu. Kot myje się sam przez kilka godzin dziennie.",
    dog: "Intensywny zapach sierści i łoju, zwłaszcza jesienią i zimą. Wymaga kąpieli po każdym spacerze.",
  },
];

interface ScaleComparisonSectionProps {
  lang?: "PL" | "EN";
  compact?: boolean;
  theme?: "dark" | "light";
}

export default function ScaleComparisonSection({
  lang = "PL",
  compact = false,
  theme = "dark",
}: ScaleComparisonSectionProps) {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(
    compact ? null : "ears"
  );
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [showRulerLines, setShowRulerLines] = useState<boolean>(true);

  const activeFeature =
    CHARACTERISTIC_FEATURES.find((f) => f.id === activeFeatureId) || null;
  const currentFeatureIdx = activeFeature
    ? CHARACTERISTIC_FEATURES.findIndex((f) => f.id === activeFeatureId)
    : -1;

  const handleOpenFeature = (featureId: string) => {
    if (compact) return;
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
      setActiveFeatureId(
        CHARACTERISTIC_FEATURES[CHARACTERISTIC_FEATURES.length - 1].id
      );
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
      className="relative bg-black text-[#f5f5f7] py-16 sm:py-24 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Poświata tła Apple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/[0.02] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 relative z-10">
        
        {/* ── Nagłówek Sekcji (Apple Keynote Style) ────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] mb-5">
            <Crosshair className="w-3.5 h-3.5 text-[#2997ff]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium">
              {compact
                ? (lang === "PL" ? "SKALA 1:1 · PORÓWNANIE GABARYTÓW" : "1:1 SCALE · SIZE COMPARISON")
                : (lang === "PL" ? "INTERAKTYWNE KOMPENDIUM PORÓWNAWCZE · SKALA 1:1" : "INTERACTIVE COMPARISON COMPENDIUM · 1:1 SCALE")}
            </span>
          </div>

          <h2
            className="font-heading font-light text-[#f5f5f7] leading-[1.02] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)" }}
          >
            Maine Coon vs Kot Domowy vs Pies.
            <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
              {compact
                ? (lang === "PL" ? "Wzrost psa w ciele dostojnego kota." : "Dog-like scale in a feline body.")
                : (lang === "PL" ? "Kliknij cechę lub punkt na zwierzęciu." : "Click any trait or hotspot.")}
            </span>
          </h2>

          <p className="text-base sm:text-lg font-body text-[#86868b] leading-relaxed max-w-2xl mx-auto font-light">
            {compact
              ? (lang === "PL"
                ? "Porównanie skali rzeczywistej: w kłębie dorosły Maine Coon osiąga 38 cm — dokładnie tyle samo co pies rasy Beagle, przewyższając zwykłego kota domowego aż o 14 cm."
                : "Real 1:1 scale comparison: an adult Maine Coon reaches 38 cm at the withers — identical to a Beagle dog, and 14 cm taller than a domestic cat.")
              : (lang === "PL"
                ? "Wybierz dowolną cechę anatomiczną lub kliknij pulsujący punkt na zdjęciu, aby sprawdzić, czym Maine Coon różni się od psa i zwykłego kota w codziennym życiu domowym."
                : "Select any anatomical trait or click a hotspot on the image to inspect how Maine Coons differ from dogs and regular domestic cats.")}
          </p>
        </div>

        {/* ── Szybki Pasek Apple Pills — Wybór Cechy (w pełnej Bazie Wiedzy) ── */}
        {!compact && (
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {CHARACTERISTIC_FEATURES.map((feat) => {
              const isSelected = activeFeatureId === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => handleOpenFeature(feat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                      : "bg-[#161617] border border-white/[0.08] text-[#86868b] hover:text-[#f5f5f7] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm">{feat.icon}</span>
                  <span>{feat.name}</span>
                </button>
              );
            })}

            <button
              onClick={() => setShowRulerLines(!showRulerLines)}
              className={`px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                showRulerLines
                  ? "bg-white/10 border-white/25 text-[#f5f5f7]"
                  : "bg-transparent border-white/[0.08] text-[#86868b] hover:text-[#f5f5f7]"
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-[#2997ff]" />
              <span>Laser HUD: {showRulerLines ? "WŁ." : "WYŁ."}</span>
            </button>
          </div>
        )}

        {/* ── GŁÓWNA SCENA INTERAKTYWNA: Apple Canvas ze Wskaźnikami ──────── */}
        <div className="relative rounded-[28px] border border-white/[0.1] bg-black overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] mb-8">
          
          {/* Pasek statusu u góry sceny */}
          <div className="px-5 py-3.5 border-b border-white/[0.08] bg-[#161617]/80 backdrop-blur-md flex items-center justify-between flex-wrap gap-2 text-xs font-ui">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#86868b] font-mono text-[11px]">
                {compact ? (
                  <>Skala 1:1: Kot Domowy (24 cm) · Maine Coon (38 cm) · Pies Beagle (38 cm)</>
                ) : activeFeature ? (
                  <>
                    Wybrana cecha anatomiczna:{" "}
                    <strong className="text-[#f5f5f7]">
                      {activeFeature.icon} {activeFeature.name}
                    </strong>
                  </>
                ) : (
                  <span className="text-[#86868b] flex items-center gap-1.5">
                    <MousePointerClick className="w-3.5 h-3.5 text-[#2997ff]" />
                    Kliknij dowolny punkt na kocie lub psie, aby otworzyć szczegóły
                  </span>
                )}
              </span>
            </div>

            {compact ? (
              <Link
                href="/baza-wiedzy#porownanie"
                className="text-[#2997ff] hover:underline font-mono text-[11px] flex items-center gap-1 transition-colors"
              >
                <span>Otwórz w Bazie Wiedzy</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : activeFeature ? (
              <button
                onClick={handleCloseFeature}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#86868b] hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[11px] font-mono"
              >
                <X className="w-3 h-3" />
                <span>Zamknij podgląd [✕]</span>
              </button>
            ) : null}
          </div>

          {/* Obszar Zdjęcia z Kropkami */}
          <div className="relative aspect-[16/9] w-full bg-black select-none overflow-hidden">
            <Image
              src="/images/maine-coon-accurate-comparison.jpg"
              alt="Maine Coon vs Kot Domowy vs Pies Beagle w skali 1:1"
              fill
              className="object-contain"
              priority={!compact}
              loading={compact ? "lazy" : undefined}
            />

            {/* Laserowe linie miary HUD */}
            {showRulerLines && (
              <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 1000 562.5" fill="none">
                  {/* Kot Domowy: wysokość 24 cm */}
                  <line
                    x1="70"
                    y1="480"
                    x2="70"
                    y2="230"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="55"
                    y1="230"
                    x2="160"
                    y2="230"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="55"
                    y1="480"
                    x2="160"
                    y2="480"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="60"
                    y="355"
                    fill="white"
                    fontSize="12"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    opacity="0.8"
                  >
                    24 cm
                  </text>

                  {/* Maine Coon: wysokość 38 cm */}
                  <line
                    x1="330"
                    y1="480"
                    x2="330"
                    y2="135"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="320"
                    y1="135"
                    x2="620"
                    y2="135"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="320"
                    y1="480"
                    x2="620"
                    y2="480"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="325"
                    y="305"
                    fill="#FDE68A"
                    fontSize="13"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    38 cm ★
                  </text>

                  {/* Pies Beagle: wysokość 38 cm */}
                  <line
                    x1="930"
                    y1="480"
                    x2="930"
                    y2="135"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="750"
                    y1="135"
                    x2="940"
                    y2="135"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="750"
                    y1="480"
                    x2="940"
                    y2="480"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="950"
                    y="305"
                    fill="white"
                    fontSize="12"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    opacity="0.8"
                  >
                    38 cm
                  </text>

                  {/* Pozioma linia równości kłębu */}
                  <line
                    x1="420"
                    y1="135"
                    x2="880"
                    y2="135"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            )}

            {/* Interaktywne Kropki LiDAR na Zwierzętach */}
            {!compact &&
              ALL_HOTSPOTS.map((hotspot) => {
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

                      {/* Precyzyjna kropka inspekcyjna */}
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
                            isSelected || isHovered
                              ? "w-1 h-1 bg-black"
                              : "w-0.5 h-0.5 sm:w-1 sm:h-1 bg-black/60 group-hover/hotspot:bg-black"
                          }`}
                        />
                      </span>

                      {/* Dymek widoczny tylko po najechaniu kursorem */}
                      {isHovered && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap shadow-2xl pointer-events-none backdrop-blur-xl bg-black/90 text-[#f5f5f7] font-medium border border-white/20 z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
                          <span>{hotspot.icon}</span>
                          <span>{hotspot.label}</span>
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
          </div>

          {/* ── WYSKAKUJĄCA KARTA APPLE HUD (PO KLIKNIĘCIU KROPKI LUB WYBORZE CECHY) ── */}
          {!compact && activeFeature && (
            <div className="border-t border-white/[0.08] bg-[#161617] p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300">
              
              {/* Nagłówek Otwartej Karty */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl p-2.5 rounded-2xl bg-white/[0.06] border border-white/[0.1]">
                    {activeFeature.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#86868b] block mb-0.5">
                      {activeFeature.category} · Porównanie Anatomiczne
                    </span>
                    <h3 className="text-lg sm:text-2xl font-heading font-medium text-[#f5f5f7]">
                      {activeFeature.name}: {activeFeature.verdictTitle}
                    </h3>
                  </div>
                </div>

                {/* Przycisk Zamknij i Przełączniki */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevFeature}
                    className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#f5f5f7] transition-all cursor-pointer"
                    title="Poprzednia cecha"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextFeature}
                    className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-[#f5f5f7] transition-all cursor-pointer"
                    title="Następna cecha"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCloseFeature}
                    className="px-4 py-2 rounded-full bg-white text-black font-ui font-medium text-xs hover:bg-[#f5f5f7] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Zamknij</span>
                  </button>
                </div>
              </div>

              {/* Siatka 3 Zwierząt: Kot vs Maine Coon vs Beagle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                
                {/* 1. KOT DOMOWY */}
                <div className="p-5 rounded-[22px] border bg-[#1d1d1f] border-white/[0.08] text-[#f5f5f7]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium">
                      🐱 Kot Domowy (Europejski)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-[#86868b]">
                      Waga: ~4 kg
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-medium text-[#f5f5f7] mb-2">
                    {activeFeature.catFact.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#86868b] leading-relaxed mb-3 font-light">
                    {activeFeature.catFact.desc}
                  </p>
                  <div className="pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-[#86868b]">
                    • {activeFeature.catFact.bullet}
                  </div>
                </div>

                {/* 2. MAINE COON (Centrum & Wyróżnienie Apple) */}
                <div className="p-6 rounded-[22px] border bg-[#1f1f22] border-amber-300/30 shadow-[0_15px_40px_rgba(245,158,11,0.06)] md:scale-[1.02] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/[0.05] rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2.5 relative">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-200 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Maine Coon (Koci Przyjaciel)
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-300 text-black font-semibold">
                      Waga: do 11.5 kg ★
                    </span>
                  </div>
                  <h4 className="font-heading text-base sm:text-lg font-semibold text-white mb-2 relative">
                    {activeFeature.mainecoonFact.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#f5f5f7] leading-relaxed mb-3 font-light relative">
                    {activeFeature.mainecoonFact.desc}
                  </p>
                  <div className="pt-2.5 border-t border-white/[0.1] text-[11px] font-mono text-emerald-400 font-medium flex items-center gap-1.5 relative">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{activeFeature.mainecoonFact.bullet}</span>
                  </div>
                </div>

                {/* 3. PIES BEAGLE */}
                <div className="p-5 rounded-[22px] border bg-[#1d1d1f] border-white/[0.08] text-[#f5f5f7]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] font-medium">
                      🐶 Pies (Rasa Beagle)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-[#86868b]">
                      Waga: 12–14 kg
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-medium text-[#f5f5f7] mb-2">
                    {activeFeature.dogFact.title}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#86868b] leading-relaxed mb-3 font-light">
                    {activeFeature.dogFact.desc}
                  </p>
                  <div className="pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-[#86868b]">
                    • {activeFeature.dogFact.bullet}
                  </div>
                </div>

              </div>

              {/* Dolny Pasek Praktycznego Wniosku */}
              <div className="p-5 rounded-[20px] bg-emerald-500/[0.06] border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block mb-0.5">
                      Praktyczny Wniosek dla Opiekuna w Mieszkaniu:
                    </span>
                    <p className="text-xs sm:text-sm font-body text-[#f5f5f7] leading-relaxed font-light">
                      {activeFeature.practicalWinner}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextFeature}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-ui font-medium text-xs hover:bg-[#f5f5f7] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm self-end sm:self-center shrink-0"
                >
                  <span>Kolejna cecha</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* ── PODSUMOWANIE / BENTO GRID W PEŁNEJ BAZIE WIEDZY ────────────── */}
        {compact ? (
          /* Widok na Stronie Głównej: Tylko czysty przycisk prowadzący do Bazy Wiedzy */
          <div className="text-center pt-2 pb-4">
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-sm sm:text-base font-body text-[#86868b] leading-relaxed font-light">
                {lang === "PL"
                  ? "Maine Coon osiąga w kłębie 38 cm — dokładnie tyle samo co dorosły pies rasy Beagle. Łączy oddanie i inteligencję psa z komfortem i czystością kota domowego."
                  : "At the withers, an adult Maine Coon reaches 38 cm — exactly the same scale as a Beagle. Combining canine devotion with feline comfort."}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/baza-wiedzy#porownanie"
                  className="px-6 py-3 rounded-full bg-white text-black font-ui text-[13px] font-medium tracking-tight hover:bg-[#f5f5f7] transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>
                    {lang === "PL"
                      ? "Zobacz pełne kompendium z psem w Bazie Wiedzy"
                      : "See Full Dog Comparison in Knowledge Base"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Widok w Bazie Wiedzy: Kompletny 8-kafelkowy Bento Grid porównawczy */
          <div className="mt-14">
            <div className="text-center mb-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#86868b] font-medium block mb-2">
                Bento Grid · Pełne Zestawienie Parametrów
              </span>
              <h3
                className="font-heading font-light text-[#f5f5f7] leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Wszystkie różnice w pigułce.
              </h3>
              <p className="text-sm sm:text-base font-body text-[#86868b] max-w-xl mx-auto mt-2 font-light">
                Przejrzyste kafelki porównujące naturę, anatomię, upodobanie do wody, czystość i codzienne życie z Maine Coonem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {COMPARISON_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-[24px] border transition-all duration-300 flex flex-col justify-between hover:translate-y-[-2px] ${
                      card.highlight
                        ? "bg-[#18181b] border-amber-300/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        : "bg-[#161617] border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-amber-300" />
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#86868b] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                          {card.badge}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-heading font-medium text-[#f5f5f7] mb-4">
                        {card.title}
                      </h4>

                      <div className="space-y-3 font-body text-xs">
                        {/* Maine Coon (Wyróżniony) */}
                        <div className="p-3.5 rounded-[16px] bg-white/[0.06] border border-white/[0.12] shadow-xs">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 font-semibold block mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            Maine Coon:
                          </span>
                          <p className="text-[#f5f5f7] font-normal leading-relaxed">
                            {card.mainecoon}
                          </p>
                        </div>

                        {/* Kot domowy */}
                        <div className="p-3 rounded-[14px] bg-white/[0.02] border border-white/[0.05] text-[#86868b]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block mb-0.5">
                            Kot Domowy:
                          </span>
                          <p className="leading-relaxed font-light">{card.cat}</p>
                        </div>

                        {/* Pies Beagle */}
                        <div className="p-3 rounded-[14px] bg-white/[0.02] border border-white/[0.05] text-[#86868b]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block mb-0.5">
                            Pies (Beagle):
                          </span>
                          <p className="leading-relaxed font-light">{card.dog}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Podsumowanie końcowe w Bazie Wiedzy */}
            <div className="mt-10 p-8 sm:p-10 rounded-[28px] border border-white/[0.1] bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="max-w-2xl">
                <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-[#86868b] block mb-2">
                  Podsumowanie Eksperckie Hodowli
                </span>
                <p className="font-heading font-light text-xl sm:text-2xl text-[#f5f5f7] leading-snug">
                  „Otrzymujesz majestat, gabaryt i oddanie psa, bez konieczności wychodzenia w ulewę o 6 rano, z dodatkiem jedwabistego futra, czystości i niezwykłej fascynacji wodą.”
                </p>
              </div>
              <Link
                href="/dostepne-kociaki"
                className="shrink-0 px-6 py-3.5 bg-white text-black font-ui text-[13px] font-medium tracking-tight rounded-full hover:bg-[#f5f5f7] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Zobacz Dostępne Kocięta
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
