import type { Metadata } from "next";
import { getFacebookFeed } from "@/lib/facebook";
import UpdatesPageContent from "./UpdatesPageContent";

export const revalidate = 1800; // Cache 30 minut (ISR)

export const metadata: Metadata = {
  title: "Aktualności i Życie Hodowli | Koci Przyjaciel *PL",
  description:
    "Najświeższe informacje, posty i relacje wideo z domowej hodowli kotów Maine Coon Koci Przyjaciel we Wrocławiu. Poznaj nasze mioty i codzienne życie kotów.",
  openGraph: {
    title: "Aktualności i Życie Hodowli | Koci Przyjaciel *PL",
    description:
      "Najświeższe relacje, posty i zdjęcia z życia kotów Maine Coon w hodowli Koci Przyjaciel *PL we Wrocławiu.",
    url: "https://kociprzyjaciel.pl/aktualizacje",
    siteName: "Koci Przyjaciel *PL",
    locale: "pl_PL",
    type: "website",
  },
};

export default async function UpdatesPage() {
  const feed = await getFacebookFeed(100);

  return (
    <UpdatesPageContent
      posts={feed.posts}
      followersCount={feed.followersCount}
    />
  );
}
