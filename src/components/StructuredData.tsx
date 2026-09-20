import React from "react";
import { FAQS } from "@/data/faqs";
import { REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";

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
    url: "https://kociprzyjaciel.pl",
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

  // ── 2. FAQPage — pomaga Google i AI pokazać odpowiedzi bezpośrednio ───
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

  // ── 3. BreadcrumbList — pomaga Google wyświetlić ścieżki w wynikach ───
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://kociprzyjaciel.pl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kocięta",
        item: "https://kociprzyjaciel.pl/kocieta",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "O nas",
        item: "https://kociprzyjaciel.pl/o-nas",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Baza Wiedzy o Maine Coon",
        item: "https://kociprzyjaciel.pl/baza-wiedzy",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Kontakt",
        item: "https://kociprzyjaciel.pl/kontakt",
      },
    ],
  };

  // ── 4. WebSite z SearchAction — pozwala Google dodać pole wyszukiwania ─
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Koci Przyjaciel *PL",
    url: "https://kociprzyjaciel.pl",
    inLanguage: "pl",
    description: "Certyfikowana hodowla kotów Maine Coon we Wrocławiu — kocięta z badaniami, rodowód FIFe/FPL.",
    publisher: {
      "@type": "Organization",
      name: "Koci Przyjaciel *PL",
      logo: {
        "@type": "ImageObject",
        url: "https://kociprzyjaciel.pl/logo.webp",
      },
    },
  };

  // ── 5. ItemList kociaków — widoczność w wyszukiwarkach AI ─────────────
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
          name: "Kocurek Maine Coon — czarny srebrzysty (Arthur)",
          description: "Kocurek Maine Coon z rodowódem FPL/FIFe. Badania serca i genetyczne zaliczone. Wrocław.",
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
          name: "Kotka Maine Coon — ruda pręgowana (Amber)",
          description: "Kotka Maine Coon z rodowódem FPL/FIFe. Idealna do domu z dziećmi. Wrocław.",
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
