import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway, Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollRevealProvider from "@/components/providers/ScrollRevealProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kociprzyjaciel.pl"),
  title: "Koci Przyjaciel PL | Hodowla Kotów Maine Coon Wrocław",
  description:
    "Profesjonalna domowa hodowla kotów Maine Coon we Wrocławiu. Zarejestrowana FPL / FIFe. Kocięta z badaniami HCM, SMA, PKD N/N, 5-pokoleniowy rodowód.",
  keywords: [
    "maine coon",
    "hodowla",
    "wrocław",
    "kocięta",
    "koci przyjaciel",
    "hodowla kotów maine coon",
    "kocięta maine coon wrocław",
    "fife",
    "felis polonia",
  ],
  authors: [{ name: "Hodowla Kotów Maine Coon Koci Przyjaciel *PL" }],
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
    title: "Koci Przyjaciel PL — Maine Coon Wrocław",
    description:
      "Domowa hodowla kotów Maine Coon we Wrocławiu (FIFe / FPL). Kocięta wychowywane z dziećmi i psem, przebadane genetycznie (HCM, PKD, SMA N/N). 25 395 na Facebooku!",
    url: "https://kociprzyjaciel.pl",
    siteName: "Koci Przyjaciel *PL – Hodowla Kotów Maine Coon",
    images: [
      {
        url: "/logo.webp",
        width: 600,
        height: 600,
        alt: "Logo Koci Przyjaciel PL",
      },
    ],
    locale: "pl_PL",
    type: "website",
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
      className={`${cormorant.variable} ${raleway.variable} ${inter.variable}`}
    >
      <body className="bg-[#0A0A0A] text-[#F5F5F5] font-body selection:bg-white selection:text-black antialiased">
        <StructuredData />
        <ScrollRevealProvider />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
