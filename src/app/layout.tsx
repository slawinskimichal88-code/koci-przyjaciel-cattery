import type { Metadata } from "next";
import "./globals.css";
import "./custom.css";
import StructuredData from "@/components/StructuredData";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollRevealProvider from "@/components/providers/ScrollRevealProvider";
import SecurityProtection from "@/components/security/SecurityProtection";

export const metadata: Metadata = {
  metadataBase: new URL("https://kociprzyjaciel.pl"),
  title: {
    default: "Hodowla Kotów Maine Coon Wrocław | Koci Przyjaciel *PL",
    template: "%s | Koci Przyjaciel *PL",
  },
  description:
    "Certyfikowana domowa hodowla kotów Maine Coon we Wrocławiu. Kocięta z badaniami serca i genetycznymi, 5-pokoleniowy rodówód FPL/FIFe. Odbierz zdrową kocią rodzinę.",
  keywords: [
    "maine coon",
    "hodowla maine coon",
    "hodowla kotów wrocław",
    "kocięta maine coon wrocław",
    "maine coon do adopcji",
    "koci przyjaciel",
    "maine coon cena",
    "maine coon kot",
    "hodowla fpl fife",
    "duży kot domowy",
  ],
  authors: [{ name: "Koci Przyjaciel *PL — Hodowla Kotów Maine Coon, Wrocław" }],
  creator: "Koci Przyjaciel *PL",
  publisher: "Koci Przyjaciel *PL",
  alternates: {
    canonical: "https://kociprzyjaciel.pl",
    languages: {
      "pl-PL": "https://kociprzyjaciel.pl",
      "en-US": "https://kociprzyjaciel.pl?lang=EN",
    },
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    title: "Hodowla Maine Coon Wrocław | Koci Przyjaciel *PL",
    description:
      "Domowa hodowla kotów Maine Coon we Wrocławiu. Kocięta wychowywane w rodzinie z dziećmi i psem. Badania serca, genetyczne, rodówód FIFe/FPL. Ponad 26 000 obserwujących na Facebooku.",
    url: "https://kociprzyjaciel.pl",
    siteName: "Koci Przyjaciel *PL – Hodowla Kotów Maine Coon",
    images: [
      {
        url: "/images/cats/cat_01.webp",
        width: 1200,
        height: 630,
        alt: "Kot Maine Coon — Hodowla Koci Przyjaciel Wrocław",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hodowla Maine Coon Wrocław | Koci Przyjaciel *PL",
    description: "Domowa hodowla kotów Maine Coon z Wrocławia. Kocięta z badaniami serca i rodówodem FIFe.",
    images: ["/images/cats/cat_01.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="scroll-smooth"
    >
      <body
        suppressHydrationWarning
        className="bg-[#0A0A0A] text-[#F5F5F5] font-body selection:bg-white selection:text-black antialiased"
      >
        <StructuredData />
        <ScrollRevealProvider />
        <SecurityProtection />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
