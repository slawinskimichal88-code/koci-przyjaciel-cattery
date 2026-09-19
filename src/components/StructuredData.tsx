import React from "react";
import { FAQS } from "@/data/faqs";
import { REAL_PHONE_RAW, REAL_FACEBOOK_URL } from "@/data/realCatsData";

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: "Hodowla kotów Maine Coon – Koci Przyjaciel (FIFe / FPL)",
    alternateName: "Koci Przyjaciel *PL Maine Coon Cattery",
    description:
      "Domowa, legalna hodowla wielkich kotów rasy Maine Coon zrzeszona w Polskiej Federacji Felinologicznej Felis Polonia (FPL) pod auspicjami FIFe. 100% badań genetycznych HCM, PKD, SMA N/N oraz echo serca doppler.",
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
    priceRange: "3500 PLN - 16000 PLN",
    currenciesAccepted: "PLN, EUR",
    paymentAccepted: "Przelew bankowy, zadatek rezerwacyjny",
    openingHours: "Mo-Su 09:00-20:00",
    sameAs: [REAL_FACEBOOK_URL],
    memberOf: [
      {
        "@type": "Organization",
        name: "Polska Federacja Felinologiczna Felis Polonia (FPL)",
      },
      {
        "@type": "Organization",
        name: "Fédération Internationale Féline (FIFe)",
      },
    ],
  };

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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kocięta Maine Coon – Miot A (Jesień 2026)",
    itemListElement: [
      {
        "@type": "IndividualProduct",
        position: 1,
        name: "Arthur Koci Przyjaciel *PL - Kocurek Maine Coon",
        description: "Czarny srebrzysty klasyczny (MCO ns 22), HCM/PKD/SMA N/N, rodowód FPL/FIFe.",
        offers: {
          "@type": "Offer",
          price: "4500",
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "IndividualProduct",
        position: 2,
        name: "Amber Koci Przyjaciel *PL - Kotka Maine Coon",
        description: "Ciepły rudy pręgowany (MCO d 22), profil domowy, rodowód FPL/FIFe.",
        offers: {
          "@type": "Offer",
          price: "4500",
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "IndividualProduct",
        position: 3,
        name: "Apollo Koci Przyjaciel *PL - Kocurek Maine Coon",
        description: "Czarny klasycznie pręgowany (MCO n 22), potężna budowa, HCM N/N.",
        offers: {
          "@type": "Offer",
          price: "4500",
          priceCurrency: "PLN",
          availability: "https://schema.org/SoldOut",
        },
      },
      {
        "@type": "IndividualProduct",
        position: 4,
        name: "Aria Koci Przyjaciel *PL - Kotka Hodowlana",
        description: "Srebrzysty szylkret z białym krawatem (MCO fs 09 22), profil hodowlany FIFe.",
        offers: {
          "@type": "Offer",
          price: "9500",
          priceCurrency: "PLN",
          availability: "https://schema.org/PreOrder",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
