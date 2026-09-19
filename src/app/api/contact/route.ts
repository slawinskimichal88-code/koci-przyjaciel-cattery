import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Pola: imię, e-mail oraz treść wiadomości są wymagane." },
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
    console.error("[CONTACT API ERROR]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}
