export interface FBMediaItem {
  type: "photo" | "video";
  url: string;
  thumbnail?: string;
}

export interface FBPost {
  id: string;
  message: string;
  createdTime: string; // ISO string
  permalinkUrl: string;
  media: FBMediaItem[];
}

export interface FBPageData {
  followersCount: number;
  name: string;
  posts: FBPost[];
  isMock: boolean;
}

export const MOCK_POSTS: FBPost[] = [
  {
    id: "mock-1",
    message:
      "Nasze maluszki z najnowszego miotu rosną jak na drożdżach! 🐾 Zobaczcie, jak pięknie bawią się na bezpiecznym drapaku. Wszystkie kocięta pomyślnie przeszły pierwsze badania weterynaryjne i rozwijają swoje potężne pędzelki na uszach. Dziękujemy za wszystkie ciepłe wiadomości!",
    createdTime: "2026-09-21T14:30:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/cats/cat_01.webp",
      },
      {
        type: "photo",
        url: "/images/cats/cat_02.webp",
      },
      {
        type: "photo",
        url: "/images/cats/cat_03.webp",
      },
    ],
  },
  {
    id: "mock-2",
    message:
      "Poranne chwile w naszej wolierze i salonie. Nic tak nie relaksuje jak donośne mruczenie dorosłego Maine Coona w promieniach słońca! ☀️🐱 Nasze koty mają do dyspozycji przestronny dom oraz bezpieczny wybieg zewnętrzny.",
    createdTime: "2026-08-28T10:15:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "video",
        url: "/video/enclosure-loop.mp4",
        thumbnail: "/images/cats/cat_04.webp",
      },
    ],
  },
  {
    id: "mock-3",
    message:
      "Wspomnienie z Międzynarodowej Wystawy Felinologicznej FIFe / FPL! Jesteśmy niesamowicie dumni z naszych podopiecznych i wspaniałych ocen od międzynarodowych sędziów. Doskonały profil, mocna kość i rewelacyjny, zrównoważony charakter! 🏆✨",
    createdTime: "2026-07-14T18:00:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/cats/cat_05.webp",
      },
      {
        type: "photo",
        url: "/images/cats/cat_06.webp",
      },
    ],
  },
  {
    id: "mock-4",
    message:
      "Piękny, słoneczny dzień na naszym zabezpieczonym wybiegu zewnętrznym (Catio). Świeże powietrze, naturalne gałęzie dębowe do wspinaczki i pełen spokój. Dla nas priorytetem jest zawsze bezpieczeństwo i dobrostan naszych kotów. 🌿",
    createdTime: "2026-06-02T12:00:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/enclosure/enclosure_catio_outside_garden.webp",
      },
    ],
  },
  {
    id: "mock-5",
    message:
      "Kolejny wychowanek w nowym, cudownym domu! Otrzymaliśmy wspaniałe wieści i zdjęcia od Pani Anny. Maluch natychmiast zaprzyjaźnił się z domownikami i psem rezydentem. Takie relacje to najpiękniejsza nagroda za naszą codzienną pracę hodowlaną! ❤️",
    createdTime: "2026-05-18T16:45:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/facebook/fb_screenshot_2.webp",
      },
    ],
  },
  {
    id: "mock-6",
    message:
      "Wiosenne przygotowania w hodowli! Wszystkie nasze koty hodowlane przeszły okresowe badania echokardiograficzne serca (Echo HCM) z wynikiem idealnym (Normal). Zdrowie, etyka i transparentność to fundamenty hodowli Koci Przyjaciel *PL.",
    createdTime: "2026-03-10T09:20:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/cats/cat_07.webp",
      },
    ],
  },
  {
    id: "mock-7",
    message:
      "Zimowe lenistwo przy kominku. Koty Maine Coon uwielbiają towarzyszyć nam w każdym domowym rytuale. Spokojnego i ciepłego weekendu dla wszystkich miłośników rasy!",
    createdTime: "2025-12-20T19:30:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/cats/cat_08.webp",
      },
    ],
  },
  {
    id: "mock-8",
    message:
      "Jesienny spacer w szelkach i podziwianie kolorowych liści. Przyzwyczajanie kociąt od małego do szelek i nowych bodźców sprawia, że dorosłe koty są odważne, ufne i stabilne emocjonalnie. 🍁🐾",
    createdTime: "2025-10-15T15:10:00+0000",
    permalinkUrl: "https://www.facebook.com/HodowlaKotowMaineCoonKociPrzyjaciel",
    media: [
      {
        type: "photo",
        url: "/images/facebook/fb_screenshot_5.webp",
      },
    ],
  },
];

export async function getFacebookFeed(limit = 100): Promise<FBPageData> {
  const pageId =
    process.env.FB_PAGE_ID || process.env.FACEBOOK_PAGE_ID;
  const accessToken =
    process.env.FB_PAGE_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  // Fallback do danych testowych, dopóki właściciel nie podepnie kluczy z FB
  if (!pageId || !accessToken) {
    return {
      followersCount: 26400,
      name: "Hodowla Kotów Koci Przyjaciel *PL",
      posts: MOCK_POSTS,
      isMock: true,
    };
  }

  try {
    const fields = [
      "name",
      "followers_count",
      `posts.limit(${limit}){id,message,created_time,permalink_url,full_picture,attachments{media_type,media,url,subattachments}}`,
    ].join(",");

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}?fields=${fields}&access_token=${accessToken}`,
      { next: { revalidate: 1800 } } // Odświeżanie danych co 30 minut (ISR)
    );

    if (!res.ok) {
      console.warn(`FB API Error: status ${res.status}`);
      return {
        followersCount: 26400,
        name: "Hodowla Kotów Koci Przyjaciel *PL",
        posts: MOCK_POSTS,
        isMock: true,
      };
    }

    const data = await res.json();
    const rawPosts = data.posts?.data || [];

    const parsedPosts: FBPost[] = rawPosts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((post: any) => {
        const media: FBMediaItem[] = [];
        const attachment = post.attachments?.data?.[0];

        if (attachment) {
          if (attachment.media_type === "video") {
            media.push({
              type: "video",
              url: attachment.media?.source || attachment.url,
              thumbnail: attachment.media?.image?.src || post.full_picture,
            });
          } else if (
            attachment.media_type === "album" &&
            attachment.subattachments?.data
          ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            attachment.subattachments.data.forEach((sub: any) => {
              if (sub.media_type === "video") {
                media.push({
                  type: "video",
                  url: sub.media?.source || sub.url,
                  thumbnail: sub.media?.image?.src,
                });
              } else if (sub.media?.image?.src) {
                media.push({
                  type: "photo",
                  url: sub.media.image.src,
                });
              }
            });
          } else if (attachment.media?.image?.src) {
            media.push({
              type: "photo",
              url: attachment.media.image.src,
            });
          }
        } else if (post.full_picture) {
          media.push({ type: "photo", url: post.full_picture });
        }

        return {
          id: post.id,
          message: post.message || "",
          createdTime: post.created_time,
          permalinkUrl: post.permalink_url,
          media,
        };
      })
      // Odrzucamy puste posty systemowe bez treści i bez mediów
      .filter((p: FBPost) => p.message || p.media.length > 0);

    return {
      followersCount: data.followers_count || 26400,
      name: data.name || "Hodowla Kotów Koci Przyjaciel *PL",
      posts: parsedPosts.length > 0 ? parsedPosts : MOCK_POSTS,
      isMock: false,
    };
  } catch (error) {
    console.error("Błąd pobierania danych z Facebooka:", error);
    return {
      followersCount: 26400,
      name: "Hodowla Kotów Koci Przyjaciel *PL",
      posts: MOCK_POSTS,
      isMock: true,
    };
  }
}
