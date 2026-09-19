import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, kitten, message, termsAccepted, type } = body;

    // Podstawowa walidacja
    if (!name || !email) {
      return NextResponse.json(
        { error: "Pola: imię oraz e-mail są wymagane." },
        { status: 400 }
      );
    }

    // Obsługa formularza rezerwacji kociaka
    if (type === "reservation" || kitten || termsAccepted !== undefined) {
      if (!phone) {
        return NextResponse.json(
          { error: "Numer telefonu jest wymagany do rezerwacji." },
          { status: 400 }
        );
      }

      if (!termsAccepted) {
        return NextResponse.json(
          { error: "Wymagana jest akceptacja warunków rezerwacji." },
          { status: 400 }
        );
      }

      console.log("[RESERVATION INQUIRY RECEIVED]:", {
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        kitten: kitten || "Wszystkie mioty",
        message: message || "Brak dodatkowej wiadomości",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Zapytanie o rezerwację zostało przyjęte. Skontaktujemy się telefonicznie w ciągu kilku godzin.",
          inquiry: {
            name,
            kitten: kitten || "Wszystkie mioty",
          },
        },
        { status: 200 }
      );
    }

    // Obsługa ogólnego formularza kontaktowego
    if (!message) {
      return NextResponse.json(
        { error: "Treść wiadomości jest wymagana." },
        { status: 400 }
      );
    }

    console.log("[CONTACT MESSAGE RECEIVED]:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API ERROR]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas przetwarzania formularza." },
      { status: 500 }
    );
  }
}
