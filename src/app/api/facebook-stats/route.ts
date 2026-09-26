import { NextResponse } from "next/server";
import { getFacebookFeed } from "@/lib/facebook";

export const revalidate = 1800; // Cache na 30 minut

export async function GET() {
  try {
    const data = await getFacebookFeed(5);
    const count = data.followersCount || 26400;

    return NextResponse.json({
      followers: count,
      formatted: new Intl.NumberFormat("pl-PL").format(count),
      displayShort: `${(count / 1000).toFixed(1)}k`,
      isLive: !data.isMock,
    });
  } catch (err) {
    console.error("Błąd pobierania statystyk Facebook:", err);
    return NextResponse.json({
      followers: 26400,
      formatted: "26 400",
      displayShort: "26.4k",
      isLive: false,
    });
  }
}
