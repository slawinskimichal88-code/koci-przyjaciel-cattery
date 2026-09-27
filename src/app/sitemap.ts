import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/dostepne-kociaki", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/kocieta", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/o-nas", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/galeria", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/baza-wiedzy", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/kontakt", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        pl: `${baseUrl}${route.path}`,
        en: `${baseUrl}${route.path}?lang=EN`,
      },
    },
  }));
}
