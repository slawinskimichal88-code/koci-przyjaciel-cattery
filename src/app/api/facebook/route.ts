import { NextResponse } from "next/server";
import { getFacebookFeed } from "@/lib/facebook";

export const revalidate = 1800; // Cache 30 min (ISR)

export async function GET() {
  try {
    const data = await getFacebookFeed(10);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Błąd API /api/facebook:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać danych z Facebooka" },
      { status: 500 }
    );
  }
}
