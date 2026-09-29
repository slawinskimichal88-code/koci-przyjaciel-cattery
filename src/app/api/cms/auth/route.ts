import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  generateSessionToken,
  verifyCredentials,
  saveCredentials,
  isAuthenticated,
  getCredentials,
} from "@/lib/cmsAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { login, password } = body;

    if (verifyCredentials(login, password)) {
      const token = generateSessionToken(login);
      const response = NextResponse.json({ success: true, message: "Zalogowano pomyślnie" });

      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 dni
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Nieprawidłowy login lub hasło" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}

// Zmiana loginu i hasła
export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { newLogin, newPassword } = body;

    if (!newLogin || !newPassword || newLogin.trim().length < 3 || newPassword.trim().length < 6) {
      return NextResponse.json(
        { error: "Login musi mieć min. 3 znaki, a hasło min. 6 znaków" },
        { status: 400 }
      );
    }

    saveCredentials(newLogin, newPassword);

    // Wygeneruj nowy token dla nowego loginu
    const token = generateSessionToken(newLogin.trim());
    const response = NextResponse.json({
      success: true,
      message: "Dane logowania zostały pomyślnie zmienione!",
      newLogin: newLogin.trim(),
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Błąd podczas zmiany danych" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Wylogowano" });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
