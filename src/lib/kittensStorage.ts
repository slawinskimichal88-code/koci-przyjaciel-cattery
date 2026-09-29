import fs from "fs";
import path from "path";
import { KittenSpec } from "@/data/availableKittensData";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "kittens.json");

// Pomocniczy cache w pamięci (dla środowisk serverless, gdy FS jest read-only)
let inMemoryKittens: KittenSpec[] | null = null;

export function getKittens(): KittenSpec[] {
  if (inMemoryKittens) {
    return inMemoryKittens;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf8");
      const parsed = JSON.parse(fileData) as KittenSpec[];
      inMemoryKittens = parsed;
      return parsed;
    }
  } catch (error) {
    console.error("Błąd odczytu data/kittens.json:", error);
  }

  // W razie braku pliku, zwróć pustą tablicę
  return [];
}

export function saveKittens(kittens: KittenSpec[]): boolean {
  inMemoryKittens = kittens;
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(kittens, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Błąd zapisu data/kittens.json (np. Vercel read-only):", error);
    // Nadal zaktualizowano inMemoryKittens
    return true;
  }
}
