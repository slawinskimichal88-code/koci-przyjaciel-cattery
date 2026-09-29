export interface KittenSpec {
  id: string;
  name: string;
  litter: string; // np. 'Miot "R" (2026)'
  gender: "male" | "female";
  destiny: "kolanka" | "hodowla" | "kolanka_lub_hodowla"; // czy na kolanka czy do hodowli
  eyeColor: string; // np. "Głęboki bursztyn (Amber Gold)"
  coatColor: string; // np. "Czarny srebrzysty klasycznie pręgowany"
  emsCode: string; // np. "MCO ns 22"
  availableFrom: string; // np. "Gotowy do odbioru od zaraz"
  birthDate: string; // np. "12 Grudnia 2025 (15 tyg.)"
  status: "available" | "reserved" | "option" | "in_observation"; 
  badge?: string; // np. "Wybór Hodowcy", "Słodki Pieszczoch"
  personality: string; // Krótki opis charakteru i zachowania
  description: string; // Pełniejszy opis budowy, usposobienia, socjalizacji
  steps: {
    title: string;
    description: string;
    status: "completed" | "current" | "upcoming";
  }[]; // Kroki rozwoju / procedury adopcyjnej
  images: {
    src: string;
    caption: string;
    badge?: string;
  }[];
  parents?: {
    father: { name: string; title: string; ems: string };
    mother: { name: string; title: string; ems: string };
  };
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LISTA KOTÓW DOSTĘPNYCH W HODOWLI KOCI PRZYJACIEL *PL
 * ─────────────────────────────────────────────────────────────────────────────
 * Jeśli przynajmniej jeden kot ma status "available", na górze strony
 * oraz w belce automatycznie włącza się pulsujący baner: "DOSTĘPNY KOTEK!".
 * Gdy wszystkie są "reserved" lub tablica jest pusta, baner samoczynnie znika.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const AVAILABLE_KITTENS_DATA: KittenSpec[] = [
  {
    id: "ramzes-koci-przyjaciel",
    name: "Ramzes Koci Przyjaciel *PL",
    litter: 'Miot "R" (2026)',
    gender: "male",
    destiny: "kolanka_lub_hodowla",
    eyeColor: "Głęboki bursztyn (Amber Gold)",
    coatColor: "Czarny srebrzysty klasycznie pręgowany (Black Silver Classic)",
    emsCode: "MCO ns 22",
    availableFrom: "Gotowy do odbioru od zaraz",
    birthDate: "12 Grudnia 2025 (15 tyg.)",
    status: "available",
    badge: "Dostępny do rezerwacji",
    personality: "Absolutny pieszczoch o łagodnym usposobieniu. Uwielbia zasypiać z głową opartą na dłoni, wita domowników przy drzwiach i natychmiast mruczy na dźwięk głosu.",
    description: "Przedstawiciel rasy Maine Coon o potężnej budowie kośćca, mocnej brodzie i doskonale osadzonych uszach z gęstymi rysiowymi pędzlami. Odchowany w domowym salonie, w stałym kontakcie z ludźmi, psem i odgłosami codziennego domu.",
    steps: [
      {
        title: "1. Narodziny i kontrola weterynaryjna",
        description: "Prawidłowy start życiowy, wzorcowy przyrost wagi i troskliwa opieka mamy.",
        status: "completed",
      },
      {
        title: "2. Odrobaczenia i pierwsze szczepienie",
        description: "Profilaktyka przeciwpasożytnicza i pierwsze szczepienie ochronne w 8. tygodniu.",
        status: "completed",
      },
      {
        title: "3. Drugie szczepienie, mikrochip & Safe-Animal",
        description: "Pełna odporność, wszczepienie certyfikowanego transpondera ISO i rejestracja w bazie.",
        status: "completed",
      },
      {
        title: "4. Socjalizacja i przygotowanie do nowego domu",
        description: "Nauka korzystania z drapaków, kuwety, obcinania pazurków i kontaktu z domownikami.",
        status: "completed",
      },
      {
        title: "5. Gotowość do odbioru & wyprawka",
        description: "Odbiór z 5-pokoleniowym rodowodem FIFe / FPL, książeczką zdrowia oraz bogatą wyprawką.",
        status: "current",
      },
    ],
    images: [
      {
        src: "/images/cats/cat_07.webp",
        caption: "Ramzes — dostojna postawa i wyraziste rysie pędzle",
        badge: "Główne",
      },
      {
        src: "/images/cats/cat_08.webp",
        caption: "Głębokie bursztynowe spojrzenie i piękny profil",
        badge: "Spojrzenie",
      },
      {
        src: "/images/cats/cat_10.webp",
        caption: "Spokój i relaks w domowym salonie",
        badge: "W domu",
      },
      {
        src: "/images/cats/cat_12.webp",
        caption: "Gęste futro i potężne łapy z kępkami włosów",
        badge: "Budowa",
      },
    ],
    parents: {
      father: {
        name: "CH Balthazar Silver Pride *PL",
        title: "Champion FIFe",
        ems: "MCO ns 22",
      },
      mother: {
        name: "IC Cassiopeia Forest Star *PL",
        title: "International Champion FIFe",
        ems: "MCO fs 09",
      },
    },
  },
  {
    id: "aurora-koci-przyjaciel",
    name: "Aurora Koci Przyjaciel *PL",
    litter: 'Miot "A" (2026)',
    gender: "female",
    destiny: "kolanka",
    eyeColor: "Ciepły bursztyn (Warm Amber)",
    coatColor: "Rudy klasycznie pręgowany z białym (Red Classic Tabby & White)",
    emsCode: "MCO d 09 22",
    availableFrom: "Dostępna od 20 Kwietnia 2026",
    birthDate: "5 Stycznia 2026",
    status: "available",
    badge: "Nowość",
    personality: "Ciekawska, kontaktowa i bardzo przyjacielska kotka. Uwielbia biegać za wędką, a po zabawie kładzie się blisko człowieka i cicho grucha.",
    description: "Cudowna ruda kotka o jedwabistej szacie, śnieżnobiałym krawaciku i skarpetkach. Harmonijne proporcje, długi puszysty ogon i pełne ekspresji oczy.",
    steps: [
      {
        title: "1. Narodziny w domowym gnieździe",
        description: "Bezpieczny poród naturalny w sypialni, pod czujnym okiem hodowcy.",
        status: "completed",
      },
      {
        title: "2. Wczesna socjalizacja & pierwsze odrobaczenie",
        description: "Oswajanie z dźwiękami domu, domownikami i dotykiem człowieka.",
        status: "completed",
      },
      {
        title: "3. Komplet szczepień i mikrochip",
        description: "Profilaktyka weterynaryjna i certyfikowany mikrochip Safe-Animal.",
        status: "completed",
      },
      {
        title: "4. Zabieg kastracji (opcja na kolanka)",
        description: "Profesjonalny zabieg przed przeprowadzką i pełna rekonwalescencja.",
        status: "current",
      },
      {
        title: "5. Gotowość do zamieszkania z nową rodziną",
        description: "Przekazanie z rodowodem FIFe, umową hodowlaną i wyprawką.",
        status: "upcoming",
      },
    ],
    images: [
      {
        src: "/images/cats/cat_16.webp",
        caption: "Aurora — ciepłe rude umaszczenie i bystre spojrzenie",
        badge: "Portret",
      },
      {
        src: "/images/cats/cat_20.webp",
        caption: "Gracja i energia podczas zabawy",
        badge: "Zabawa",
      },
      {
        src: "/images/cats/cat_02.webp",
        caption: "Chwila relaksu w objęciach opiekuna",
        badge: "Bliskość",
      },
    ],
    parents: {
      father: {
        name: "GIC Archibald Golden Dawn *PL",
        title: "Grand International Champion",
        ems: "MCO d 22",
      },
      mother: {
        name: "CH Bella Rosa Koci Przyjaciel *PL",
        title: "Champion FIFe",
        ems: "MCO f 09 22",
      },
    },
  },
];

/** Funkcja sprawdzająca czy jest choć jeden kot dostępny */
export const hasAvailableKittens = (): boolean => {
  return AVAILABLE_KITTENS_DATA.some((k) => k.status === "available");
};
