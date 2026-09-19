import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, kitten, message, termsAccepted } = body;

    // Podstawowa walidacja
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Pola: imię, e-mail oraz telefon są wymagane." },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "Wymagana jest akceptacja warunków rezerwacji." },
        { status: 400 }
      );
    }

    // Bezpieczne logowanie zapytania (w środowisku produkcyjnym można podpiąć Nodemailer / Resend)
    console.log("[RESERVATION INQUIRY RECEIVED]:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      kitten: kitten || "Dowolny kociak",
      message: message || "Brak dodatkowej wiadomości",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Zapytanie o rezerwację zostało pomyślnie przyjęte. Skontaktujemy się telefonicznie w ciągu kilku godzin.",
        inquiry: {
          name,
          kitten: kitten || "Wszystkie mioty",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[RESERVATION API ERROR]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas przetwarzania formularza." },
      { status: 500 }
    );
  }
}
