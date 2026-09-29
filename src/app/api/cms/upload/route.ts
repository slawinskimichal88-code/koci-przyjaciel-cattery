import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/cmsAuth";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Brak pliku" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sprawdzenie typu pliku (obrazki)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Dozwolone są tylko pliki graficzne (JPG, PNG, WebP)" }, { status: 400 });
    }

    // Bezpieczna unikalna nazwa pliku
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const cleanName = file.name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 20);
    const fileName = `kitten_${Date.now()}_${cleanName}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "images", "cats");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/cats/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Błąd uploadu pliku:", error);
    return NextResponse.json({ error: "Błąd podczas wgrywania pliku" }, { status: 500 });
  }
}
