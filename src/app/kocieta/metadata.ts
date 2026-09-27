import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Dostępne Kocięta Maine Coon Wrocław",
  description:
    "Sprawdź dostępne kocięta Maine Coon z hodowli Koci Przyjaciel *PL we Wrocławiu. Kocięta z badaniami serca, rodowódem FIFe i pełną dokumentacją zdrowotną.",
  keywords: ["kocięta maine coon", "maine coon wrocław", "maine coon do adopcji", "kocięta do sprzedaży", "hodowla maine coon"],
  openGraph: {
    title: "Kocięta Maine Coon do adopcji — Koci Przyjaciel *PL Wrocław",
    description: "Dostępne kocięta Maine Coon z certyfikowanej hodowli we Wrocławiu. Badania serca, testy genetyczne, rodowód FIFe/FPL.",
    url: `${SITE_URL}/kocieta`,
    images: [{ url: "/images/cats/cat_01.webp", width: 1200, height: 630, alt: "Kocię Maine Coon — Koci Przyjaciel Wrocław" }],
  },
  alternates: { canonical: `${SITE_URL}/kocieta` },
};
