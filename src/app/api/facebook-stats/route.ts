import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache na 1 godzinę

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID || "kociprzyjacielpl";
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  // Domyślna aktualna wartość podana przez hodowcę (ponad 26 tys.)
  const DEFAULT_FOLLOWERS = 26420;

  if (!accessToken) {
    return NextResponse.json({
      followers: DEFAULT_FOLLOWERS,
      formatted: "26 400+",
      displayShort: "26k+",
      isLive: false,
      message: "Użyto zweryfikowanej bazy hodowli (skonfiguruj FACEBOOK_PAGE_ACCESS_TOKEN dla live sync Meta Graph API)",
    });
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}?fields=followers_count,fan_count&access_token=${accessToken}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Meta API error: ${res.status}`);
    }

    const data = await res.json();
    const count = data.followers_count || data.fan_count || DEFAULT_FOLLOWERS;

    return NextResponse.json({
      followers: count,
      formatted: new Intl.NumberFormat("pl-PL").format(count),
      displayShort: `${(count / 1000).toFixed(1)}k+`,
      isLive: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Błąd pobierania statystyk Facebook:", err);
    return NextResponse.json({
      followers: DEFAULT_FOLLOWERS,
      formatted: "26 400+",
      displayShort: "26k+",
      isLive: false,
      error: "Błąd połączenia z Meta Graph API, użyto wartości bezpiecznej",
    });
  }
}
