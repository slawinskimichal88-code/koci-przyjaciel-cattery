import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Baza Wiedzy o Rasie Maine Coon: Zdrowie, Żywienie, Charakter | Koci Przyjaciel *PL",
  description:
    "Kompendium wiedzy o rasie Maine Coon: badania serca Echo Doppler HCM, testy genetyczne SMA/PKD, interaktywne porównanie z psem, oficjalny wzorzec FIFe oraz kalkulator kosztów utrzymania.",
  keywords: [
    "baza wiedzy maine coon",
    "wzorzec rasy maine coon",
    "zdrowie maine coon hcm",
    "badania genetyczne kotów",
    "kalkulator kosztów maine coon",
    "maine coon vs pies",
  ],
  alternates: {
    canonical: `${SITE_URL}/baza-wiedzy`,
  },
  openGraph: {
    title: "Baza Wiedzy o Rasie Maine Coon: Zdrowie, Żywienie, Charakter | Koci Przyjaciel *PL",
    description:
      "Oficjalne kompendium hodowlane. Sprawdź wzorzec rasy, badania genetyczne, kalkulator kosztów i porównanie skali 1:1 z psem.",
    url: `${SITE_URL}/baza-wiedzy`,
    images: [
      {
        url: "/images/cats/cat_23.webp",
        width: 1200,
        height: 630,
        alt: "Baza Wiedzy o Maine Coon — Koci Przyjaciel *PL Wrocław",
      },
    ],
  },
};
