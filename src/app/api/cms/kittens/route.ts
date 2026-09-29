import { NextResponse } from "next/server";
import { getKittens, saveKittens } from "@/lib/kittensStorage";
import { isAuthenticated } from "@/lib/cmsAuth";
import { KittenSpec } from "@/data/availableKittensData";

// GET: publiczny dostęp do aktualnej listy kociąt (używany przez stronę i panel)
export async function GET() {
  const kittens = getKittens();
  return NextResponse.json({ kittens, hasAvailable: kittens.some(k => k.status === "available") });
}

// POST: dodanie lub aktualizacja kota (wymaga zalogowania)
export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const kittenData = (await request.json()) as KittenSpec;
    if (!kittenData.name || !kittenData.id) {
      return NextResponse.json({ error: "Brak wymaganych danych kota (id, name)" }, { status: 400 });
    }

    const currentKittens = getKittens();
    const existingIndex = currentKittens.findIndex((k) => k.id === kittenData.id);

    let updatedList: KittenSpec[];
    if (existingIndex >= 0) {
      // Aktualizacja istniejącego
      updatedList = [...currentKittens];
      updatedList[existingIndex] = kittenData;
    } else {
      // Dodanie na początek listy
      updatedList = [kittenData, ...currentKittens];
    }

    saveKittens(updatedList);
    return NextResponse.json({
      success: true,
      kittens: updatedList,
      hasAvailable: updatedList.some(k => k.status === "available"),
    });
  } catch (error) {
    return NextResponse.json({ error: "Błąd zapisu danych kota" }, { status: 500 });
  }
}

// PATCH: szybka zmiana statusu pojedynczego kota (np. przełącznik dostępny/niedostępny)
export async function PATCH(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    const currentKittens = getKittens();
    const target = currentKittens.find((k) => k.id === id);

    if (!target) {
      return NextResponse.json({ error: "Nie znaleziono kociaka o podanym ID" }, { status: 404 });
    }

    target.status = status;
    saveKittens(currentKittens);

    return NextResponse.json({
      success: true,
      kittens: currentKittens,
      hasAvailable: currentKittens.some(k => k.status === "available"),
    });
  } catch (error) {
    return NextResponse.json({ error: "Błąd aktualizacji statusu" }, { status: 500 });
  }
}

// DELETE: usunięcie kota (wymaga zalogowania)
export async function DELETE(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Brak ID kota" }, { status: 400 });
    }

    const currentKittens = getKittens();
    const updatedList = currentKittens.filter((k) => k.id !== id);
    saveKittens(updatedList);

    return NextResponse.json({
      success: true,
      kittens: updatedList,
      hasAvailable: updatedList.some(k => k.status === "available"),
    });
  } catch (error) {
    return NextResponse.json({ error: "Błąd usuwania kota" }, { status: 500 });
  }
}
