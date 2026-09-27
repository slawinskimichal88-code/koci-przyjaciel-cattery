import React from "react";
import { FAQS } from "@/data/faqs";
import { REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";
import { SITE_URL } from "@/lib/siteConfig";

export default function StructuredData() {
  // ── 1. LocalBusiness — poprawny typ: hodowla kotów, nie sklep ──────────
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AnimalShelter"],
    name: "Koci Przyjaciel *PL — Hodowla Kotów Maine Coon",
    alternateName: "Koci Przyjaciel PL",
    additionalType: "https://schema.org/LocalBusiness",
    description:
      "Domowa, certyfikowana hodowla kotów rasy Maine Coon we Wrocławiu. Zarejestrowana w Polskiej Federacji Felinologicznej (FPL) pod auspicjami FIFe. Kocięta wychowywane w rodzinie, z badaniami serca (echo) i genetycznymi.",
    url: SITE_URL,
    telephone: REAL_PHONE_RAW,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrocław",
      addressRegion: "Dolnośląskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.1079,
      longitude: 17.0385,
    },
    priceRange: "3500 PLN - 9500 PLN",
    currenciesAccepted: "PLN",
    paymentAccepted: "Przelew bankowy",
    openingHours: "Mo-Su 09:00-20:00",
    sameAs: [REAL_FACEBOOK_URL],
    knowsAbout: ["Maine Coon", "Hodowla kotów", "Felinologia", "FIFe", "Felis Polonia"],
    memberOf: [
      {
        "@type": "Organization",
        name: "Polska Federacja Felinologiczna Felis Polonia (FPL)",
        url: "https://felinologiczna.pl",
      },
      {
        "@type": "Organization",
        name: "Fédération Internationale Féline (FIFe)",
        url: "https://fifeweb.org",
      },
    ],
    hasMap: "https://maps.google.com/?q=Wrocław",
    areaServed: {
      "@type": "Country",
      name: "Poland",
    },
  };

  // ── 2. VideoObject — przejęcie sekcji Wideo w Google z klipami (Key Moments) ─
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Historia hodowli Koci Przyjaciel *PL — Domowa hodowla Maine Coon Wrocław",
    description:
      "Poznaj kulisy bezklatkowej hodowli kotów Maine Coon Koci Przyjaciel *PL we Wrocławiu. Pełnometrażowy wywiad z założycielką o pasji, genetyce, badaniach Echo Doppler HCM i codziennym życiu z kotami na wybiegu.",
    thumbnailUrl: [
      `${SITE_URL}/video/breeder-full-poster.webp`,
      `${SITE_URL}/video/breeder-poster.webp`,
      `${SITE_URL}/video/hero-poster.webp`,
    ],
    uploadDate: "2026-09-27T12:00:00+02:00",
    duration: "PT9M00S",
    contentUrl: `${SITE_URL}/video/breeder-full.mp4`,
    embedUrl: `${SITE_URL}/o-nas#pelny-film`,
    inLanguage: "pl-PL",
    hasPart: [
      {
        "@type": "Clip",
        name: "Początki hodowli i pierwszy miot",
        startOffset: 0,
        endOffset: 120,
        url: `${SITE_URL}/o-nas?t=0`,
      },
      {
        "@type": "Clip",
        name: "Dlaczego rasa Maine Coon i linie zagraniczne",
        startOffset: 120,
        endOffset: 300,
        url: `${SITE_URL}/o-nas?t=120`,
      },
      {
        "@type": "Clip",
        name: "Życie bez klatek, socjalizacja z dziećmi i wybieg ogrodowy",
        startOffset: 300,
        endOffset: 540,
        url: `${SITE_URL}/o-nas?t=300`,
      },
    ],
  };

  // ── 3. FAQPage — pomaga Google i AI pokazać odpowiedzi bezpośrednio ───
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // ── 4. BreadcrumbList — pomaga Google wyświetlić ścieżki w wynikach ───
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dostępne Kocięta",
        item: `${SITE_URL}/dostepne-kociaki`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "O nas",
        item: `${SITE_URL}/o-nas`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Galeria",
        item: `${SITE_URL}/galeria`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Baza Wiedzy o Maine Coon",
        item: `${SITE_URL}/baza-wiedzy`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Kontakt",
        item: `${SITE_URL}/kontakt`,
      },
    ],
  };

  // ── 5. WebSite z SearchAction — pozwala Google dodać pole wyszukiwania ─
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Koci Przyjaciel *PL",
    url: SITE_URL,
    inLanguage: "pl",
    description: "Certyfikowana hodowla kotów Maine Coon we Wrocławiu — kocięta z badaniami, rodowód FIFe/FPL.",
    publisher: {
      "@type": "Organization",
      name: "Koci Przyjaciel *PL",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
  };

  // ── 6. ItemList kociaków — widoczność w wyszukiwarkach AI ─────────────
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dostępne kocięta Maine Coon — Koci Przyjaciel *PL",
    description: "Lista dostępnych kociąt Maine Coon z certyfikowanej hodowli we Wrocławiu.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Kocurek Maine Coon — czarny srebrzysty klasycznie pręgowany",
          description: "Kocurek Maine Coon z rodowodem FPL/FIFe. Badania serca i genetyczne zaliczone. Wrocław.",
          offers: {
            "@type": "Offer",
            price: "4500",
            priceCurrency: "PLN",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "LocalBusiness",
              name: "Koci Przyjaciel *PL",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Kotka Maine Coon — ruda pręgowana",
          description: "Kotka Maine Coon z rodowodem FPL/FIFe. Idealna do domu z dziećmi. Wrocław.",
          offers: {
            "@type": "Offer",
            price: "4500",
            priceCurrency: "PLN",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "LocalBusiness",
              name: "Koci Przyjaciel *PL",
            },
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
