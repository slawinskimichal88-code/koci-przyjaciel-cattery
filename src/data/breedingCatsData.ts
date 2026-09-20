// Autentyczne i zoptymalizowane dane kotów hodowlanych (Matki i Kocury) oraz wybiegu
export interface BreedingCat {
  id: string;
  name: string;
  title?: string;
  gender: "female" | "male";
  ems: string;
  colorName: string;
  born?: string;
  weight?: string;
  src: string;
  tests: {
    hcm: string;
    pkd: string;
    sma: string;
    fivFelv: string;
  };
  description: string;
  badges: string[];
}

export const BREEDING_QUEENS: BreedingCat[] = [
  {
    id: "queen-1",
    name: "Bella Koci Przyjaciel *PL",
    title: "Champion FIFe",
    gender: "female",
    ems: "MCO n 22",
    colorName: "Czarny klasycznie pręgowany (Black Classic Tabby)",
    weight: "7.4 kg",
    src: "/images/matki/matka_01.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N)",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Wybitna matka o wyjątkowo łagodnym, ciepłym usposobieniu. Uwielbia asystować domownikom w salonie, a jej kocięta dziedziczą po niej jedwabiste futro i głębokie, mądre spojrzenie.",
    badges: ["Troskliwa Mama", "Champion Wystawowy", "Gęsta Kryza"],
  },
  {
    id: "queen-2",
    name: "Luna Silky Dream *PL",
    title: "International Champion",
    gender: "female",
    ems: "MCO fs 22",
    colorName: "Czarna szylkretka ze srebrem (Black Tortie Silver Tabby)",
    weight: "7.1 kg",
    src: "/images/matki/matka_02.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N)",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Dostojna kotka o zjawiskowym, srebrzystym rysunku szaty. Bardzo opiekuńcza wobec innych kotów i dzieci. Zawsze pierwsza wita gości przy drzwiach wejściowych.",
    badges: ["Srebrzysta Szata", "Czysta Genetyka", "Uwielbia Pieszczoty"],
  },
  {
    id: "queen-3",
    name: "Freya Leśna Oaza *PL",
    title: "Kotka Hodowlana",
    gender: "female",
    ems: "MCO f 09 22",
    colorName: "Szylkret z białym pręgowany (Tortie Tabby with White)",
    weight: "6.8 kg",
    src: "/images/matki/matka_03.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N)",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Żywiołowa, ciekawska i nieustraszona zdobywczyni najwyższych półek na wybiegu ogrodowym. Jej dzieci są wyjątkowo odważne i bez problemu adaptują się w nowych domach z psami.",
    badges: ["Mistrzyni Wspinaczki", "Odważny Charakter", "Doświadczona Matka"],
  },
  {
    id: "queen-4",
    name: "Cleopatra Amber Eyes *PL",
    title: "Kotka Hodowlana",
    gender: "female",
    ems: "MCO a 22",
    colorName: "Niebieski klasycznie pręgowany (Blue Classic Tabby)",
    weight: "7.0 kg",
    src: "/images/matki/matka_04.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N)",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Królowa spokoju i relaksu. Uwielbia wylegiwać się na kanapie w salonie, głośno mrucząc przy drapaniu za uszami. Przekazuje kociakom niesamowitą cierpliwość i zrównoważenie.",
    badges: ["Błękitna Szata", "Mruczący Anioł", "Domowy Spokój"],
  },
  {
    id: "queen-5",
    name: "Grace Golden Paws *PL",
    title: "Champion FIFe",
    gender: "female",
    ems: "MCO d 22",
    colorName: "Ruda klasycznie pręgowana (Red Classic Tabby)",
    weight: "7.6 kg",
    src: "/images/matki/matka_05.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N)",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Rzadziej spotykana, przepiękna ruda kotka o potężnej budowie. Bardzo inteligentna, potrafi sama otwierać drzwi z klamki i aportować miękkie piłeczki.",
    badges: ["Ruda Księżniczka", "Geniusz Zabawy", "Mocny Kościec"],
  },
  {
    id: "queen-6",
    name: "Aurora Velvet Touch *PL",
    title: "Kotka Hodowlana",
    gender: "female",
    ems: "MCO n 09",
    colorName: "Czarny z białymi skarpetkami (Black with White)",
    weight: "6.9 kg",
    src: "/images/matki/matka_06.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N)",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Czuła i wrażliwa kotka, która bezbłędnie wyczuwa nastrój opiekuna. Zawsze pierwsza przybiega, gdy ktoś w domu potrzebuje kociego pocieszenia i ciepła.",
    badges: ["Wielkie Serce", "Białe Skarpetki", "Przyjaciółka Dzieci"],
  },
];

export const BREEDING_STUDS: BreedingCat[] = [
  {
    id: "stud-1",
    name: "Thorin Wielki Łowca *PL",
    title: "Grand International Champion",
    gender: "male",
    ems: "MCO n 22",
    colorName: "Czarny klasycznie pręgowany (Black Classic Tabby)",
    weight: "11.8 kg",
    src: "/images/cats/cat_18.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N) 2026",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Prawdziwy król naszej hodowli. Potężny kościec, szeroka klatka piersiowa, potężna kufa i 12-centymetrowe pędzle na uszach. Mimo olbrzymich gabarytów to chodząca łagodność — pozwala dzieciom na każdą czułość.",
    badges: ["11.8 kg Wagi", "Pędzle Rysia 12cm", "Łagodny Olbrzym"],
  },
  {
    id: "stud-2",
    name: "Balthazar Silver Shadow *PL",
    title: "International Champion",
    gender: "male",
    ems: "MCO ns 22",
    colorName: "Czarny dymny srebrzysty (Black Silver Classic Tabby)",
    weight: "11.2 kg",
    src: "/images/cats/cat_03.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N) 2026",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Majestatyczny srebrzysty kocur o spojrzeniu dzikiego drapieżnika i duszy wiernego psa. Kocha wodę — sam wchodzi pod bieżącą wodę z kranu i uwielbia kąpiele w wannie.",
    badges: ["Kocha Wodę", "Srebrna Grzywa", "Aportuje Zabawki"],
  },
  {
    id: "stud-3",
    name: "Simba Król Wybiegu *PL",
    title: "Champion FIFe",
    gender: "male",
    ems: "MCO d 22",
    colorName: "Rudy klasycznie pręgowany (Red Classic Tabby)",
    weight: "10.9 kg",
    src: "/images/cats/cat_06.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N) 2026",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Nasz rudy wulkan energii i miłości. Uwielbia przesiadywać na najwyższym pniu wybiegu ogrodowego i obserwować ptaki. Jego synowie osiągają imponujące rozmiary i gęste kryzy.",
    badges: ["Ognisty Rudy", "Lider Stada", "Mistrz Obserwacji"],
  },
  {
    id: "stud-4",
    name: "Maximus Black Night *PL",
    title: "Kocur Hodowlany",
    gender: "male",
    ems: "MCO n",
    colorName: "Czarny solidny (Solid Black Panther)",
    weight: "11.5 kg",
    src: "/images/cats/cat_15.webp",
    tests: {
      hcm: "Echo Doppler: Normal (N/N) 2026",
      pkd: "DNA Laboklin: N/N",
      sma: "DNA Laboklin: N/N",
      fivFelv: "Ujemne (-)",
    },
    description:
      "Czarna pantera o bursztynowych oczach. Niezwykle muskularna sylwetka, jedwabisty połysk futra i bezgłośny chód mimo potężnej masy. Zachwyca każdego gościa odwiedzającego hodowlę.",
    badges: ["Czarna Pantera", "Bursztynowe Oczy", "11.5 kg Masy"],
  },
];

export const ENCLOSURE_PHOTOS = [
  {
    src: "/images/cats/cat_23.webp",
    caption: "Koty na naturalnych pniach dębowych — wspinaczka i zabawa",
    tag: "Aktywność",
  },
  {
    src: "/images/cats/cat_27.webp",
    caption: "Słoneczne popołudnie na platformie widokowej",
    tag: "Relaks",
  },
  {
    src: "/images/cats/cat_31.webp",
    caption: "Ciekawość świata: obserwacja ptaków i ogrodu przez atestowaną siatkę",
    tag: "Stymulacja",
  },
  {
    src: "/images/cats/cat_35.webp",
    caption: "Bezpieczne świeże powietrze przez 365 dni w roku",
    tag: "Zdrowie",
  },
  {
    src: "/images/cats/cat_37.webp",
    caption: "Zabawy z rodzeństwem w trawie i na drewnianych mostkach",
    tag: "Socjalizacja",
  },
  {
    src: "/images/cats/cat_43.webp",
    caption: "Drapaki z litego drewna wkomponowane w architekturę wybiegu",
    tag: "Instynkt",
  },
];
