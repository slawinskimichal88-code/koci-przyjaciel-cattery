import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baza Wiedzy o Maine Coon — Rasa, Zdrowie, Koszty",
  description:
    "Wszystko o kocie Maine Coon w jednym miejscu — jak duże wyrastają, co jedzą, ile kosztuje utrzymanie, jakie badania powinny mieć. Przewodnik dla przyszłych właścicieli.",
  keywords: [
    "maine coon rasa",
    "maine coon wielkość",
    "maine coon ile kosztuje",
    "maine coon żywienie",
    "maine coon zdrowie",
    "maine coon badania",
    "jak duży maine coon",
    "maine coon dla dzieci",
  ],
  openGraph: {
    title: "Baza Wiedzy o Maine Coon — Koci Przyjaciel *PL",
    description: "Przewodnik dla przyszłych właścicieli Maine Coon. Rasa, zdrowie, żywienie, koszty — wszystko wyjaśnione po ludzku.",
    images: [{ url: "/images/cats/cat_03.webp", width: 1200, height: 630, alt: "Maine Coon — baza wiedzy o rasie" }],
  },
  alternates: { canonical: "https://kociprzyjaciel.pl/baza-wiedzy" },
};
