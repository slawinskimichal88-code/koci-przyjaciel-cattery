import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas — Koci Przyjaciel *PL Wrocław",
  description:
    "Poznaj nas — małą, rodzinną hodowlę kotów Maine Coon z Wrocławia. Od ponad 10 lat wychowujemy kocięta w domu, z dziećmi i psem. Zarejestrowana hodowla FPL/FIFe.",
  keywords: ["hodowla maine coon wrocław", "koci przyjaciel hodowla", "maine coon rodzinna hodowla", "fpl fife wrocław"],
  openGraph: {
    title: "O nas — Hodowla Maine Coon Koci Przyjaciel *PL",
    description: "Mała, rodzinna hodowla kotów Maine Coon z Wrocławia. Od 10 lat wychowujemy kocięta w domu z miłością.",
    images: [{ url: "/images/cats/cat_01.webp", width: 1200, height: 630, alt: "Hodowla Maine Coon Koci Przyjaciel Wrocław" }],
  },
  alternates: { canonical: "https://kociprzyjaciel.pl/o-nas" },
};
