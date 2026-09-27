import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  // Rozpoznanie domeny produkcyjnej
  // Vercel wstrzykuje VERCEL_PROJECT_PRODUCTION_URL lub VERCEL_URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || "";
  
  // Jeśli podpięta jest domena kociprzyjaciel.pl
  const isCustomDomain =
    siteUrl.includes("kociprzyjaciel.pl") ||
    vercelProductionUrl.includes("kociprzyjaciel.pl");

  // Jeśli jesteśmy na domenie technicznej *.vercel.app lub podglądowej, blokujemy indeksowanie
  // Odblokowujemy tylko wtedy, gdy żądanie/konfiguracja wskazuje na domenę docelową kociprzyjaciel.pl
  if (!isCustomDomain && process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
