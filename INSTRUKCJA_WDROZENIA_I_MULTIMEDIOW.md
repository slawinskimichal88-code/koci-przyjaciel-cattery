# Kompletna Instrukcja Techniczna: Wdrożenie Vercel, Obsługa Wideo iPhone i Galeria Bento

Dokumentacja techniczna dla projektu **Koci Przyjaciel \*PL** (Next.js 16 + React 19 + Tailwind CSS v4).

---

## 1. Architektura Stylów i Wdrożenia Vercel (Next.js + Tailwind CSS v4)

### 🔴 Na czym polegał problem ze znikającymi stylami?
1. **Cichy tryb awaryjny Tailwind v4 (Silent Fallback Mode):**
   Na serwerach chmurowych (Linux x64 na Vercelu) silnik Tailwind CSS v4 potrafi pominąć parsowanie `@theme` oraz reguł utility, jeżeli wykryje niespójności z architekturą binarną kompilatora Rust (Oxide) lub jeżeli proces kompilacji Webpack/Turbopack odrzuca reguły jako rzekomo nieużywane. Skutkiem tego Vercel generował szczątkowy plik CSS (14–35 KB), pozbawiony klas takich jak `text-white`, `backdrop-blur`, `font-heading` czy siatek `grid`.
2. **Konflikt zapytań fontów w `next/font/google`:**
   Deklarowanie tablicy wag (`weight: ["300", "400", "500", ...]`) dla fontów zmiennych (*variable fonts* np. *Raleway* czy *Inter*) powodowało błąd resolvera zapytań Turbopacka: `next/font/google queries have exactly one entry`.
3. **Pamięć podręczna Vercel (Stale Build Cache):**
   Vercel przechowuje skompilowane fragmenty w `.next/cache`. Przy zmianie architektury stylów potrafił łączyć stary arkusz CSS z nowym drzewem HTML.

---

### 🟢 Rozwiązanie architektoniczne krok po kroku

#### A. Wstępna kompilacja CSS: `build-css.js`
W głównym katalogu projektu znajduje się skrypt [build-css.js](file:///build-css.js):
```javascript
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'app', 'input.css');
const outputPath = path.join(__dirname, 'src', 'app', 'globals.css');

if (!fs.existsSync(inputPath)) {
  fs.copyFileSync(outputPath, inputPath);
}

const css = fs.readFileSync(inputPath, 'utf8');

postcss([tailwind()])
  .process(css, { from: inputPath, to: outputPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.css, 'utf8');
    console.log(`[build-css] Generated ${outputPath} (${result.css.length} bytes)`);
  })
  .catch(err => {
    console.error('[build-css] Error:', err);
    process.exit(1);
  });
```

#### B. Skrypty w `package.json`
Przed wywołaniem Next.js, skrypt zawsze kompiluje kompletny arkusz CSS (ponad 160 KB reguł):
```json
"scripts": {
  "dev": "next dev",
  "build:css": "node build-css.js",
  "build": "node build-css.js && next build --webpack",
  "start": "next start",
  "lint": "eslint"
}
```

#### C. Czysty import w `src/app/layout.tsx`
Zgodnie z zasadą pojedynczego wejścia stylów:
* Importujemy wyłącznie: `import "./globals.css";`
* Dodajemy atrybut `suppressHydrationWarning` do znaczników `<html>` i `<body>`, aby uniknąć rozbieżności hydracji w React 19:
```tsx
<html
  lang="pl"
  suppressHydrationWarning
  data-scroll-behavior="smooth"
  className={`${cormorant.variable} ${raleway.variable} ${inter.variable}`}
>
  <body
    suppressHydrationWarning
    className="bg-[#0A0A0A] text-[#F5F5F5] font-body selection:bg-white selection:text-black antialiased"
  >
    {children}
  </body>
</html>
```

#### D. Komenda wdrożenia na Vercel z wymuszeniem czyszczenia pamięci
Aby zapobiec serwowaniu przestarzałych buforów, wdrożenie produkcyjne wywołujemy poleceniem:
```bash
npx vercel --prod --force --yes
```

---

## 2. Instrukcja Przygotowywania Filmów w Formacie iPhone / Mobile Scrollytelling

Filmy wyświetlane w tle sekcji Hero oraz w module opowieści hodowcy (scrollytelling) wymagają specyficznego traktowania, aby działały płynnie na iPhone (iOS Safari) oraz urządzeniach z Androidem.

### 📱 Wymagania dla iOS Safari
System iOS blokuje automatyczne odtwarzanie filmów lub wymusza otwarcie ich w natywnym odtwarzaczu pełnoekranowym, jeśli nie są spełnione 4 warunki:
1. `playsInline` (w JSX: `playsInline={true}`) — zapobiega otwarciu odtwarzacza systemowego.
2. `muted` (w JSX: `muted={true}`) — bez wyciszenia dźwięku iOS nie zezwoli na autoplay.
3. `autoPlay` (w JSX: `autoPlay={true}`).
4. `loop` (w JSX: `loop={true}`).

Przykładowy komponent odtwarzacza tła:
```tsx
<video
  ref={videoRef}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  poster="/images/hero-poster.webp"
  className="w-full h-full object-cover"
>
  <source src="/video/hero-cat.mp4" type="video/mp4" />
</video>
```

### 🎬 Optymalizacja wideo programem FFmpeg
Surowe wideo nagrane iPhone'em (4K 60fps MOV w formacie HEVC/H.265) waży kilkaset megabajtów i nie odtworzy się poprawnie na wielu przeglądarkach. Należy je przekonwertować na profil **MP4 H.264 z flagą faststart**:

```bash
ffmpeg -i film_z_iphone.mov \
  -vcodec libx264 \
  -crf 23 \
  -preset slow \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
  film_zoptymalizowany.mp4
```

* **`-vcodec libx264` i `-pix_fmt yuv420p`:** Gwarantuje 100% kompatybilność ze wszystkimi iPhone'ami i iPadami.
* **`-crf 23`:** Doskonała jakość przy 8-krotnie mniejszym rozmiarze pliku.
* **`-movflags +faststart`:** Przenosi metadane na początek pliku, dzięki czemu film zaczyna się odtwarzać natychmiast bez czekania na pobranie całości.
* **`-an`:** Usuwa ścieżkę dźwiękową, redukując wagę pliku i eliminując blokady przeglądarek.

### 📜 Jak działa Scrollytelling z wideo (przewijanie klatka po klatce)
W module Hodowcy pozycja przewijania kontroluje czas odtwarzacza wideo:
```typescript
const handleScroll = (progress: number) => {
  if (videoRef.current && videoRef.current.duration) {
    videoRef.current.currentTime = videoRef.current.duration * progress;
  }
};
```

---

## 3. Instrukcja Obsługi i Rozbudowy Galerii (Bento Grid)

Struktura galerii oparta jest na nowoczesnym układzie Apple Bento Grid ze szklanymi kafelkami, mikroanimacjami oraz modalnym powiększeniem (Lightbox).

### 📁 Gdzie znajdują się dane galerii?
Wszystkie zdjęcia i opisy zdefiniowane są w pliku:
`src/data/agaGalleryData.ts` oraz `src/data/realCatsData.ts`.

### ➕ Jak dodać nowe zdjęcie do galerii?
1. **Przygotuj plik graficzny:**
   * Skonwertuj zdjęcie do formatu `.webp` (np. darmowym programem Squoosh lub Photoshopem).
   * Zadbaj o rozmiar do 1600px szerokości i wagę poniżej 250 KB.
   * Umieść plik w katalogu `public/images/gallery/` (np. `public/images/gallery/nowy-kociak.webp`).

2. **Dodaj wpis do bazy danych w `src/data/agaGalleryData.ts`:**
```typescript
{
  id: "nowy-kociak-01",
  src: "/images/gallery/nowy-kociak.webp",
  title: "Arystokratyczny Kocur",
  category: "kocury", // kocury | matki | mlode | w-domu | wybieg
  badge: "Certyfikat FPL",
  aspectRatio: "square", // square | wide | tall
  description: "Piękne umaszczenie czarne klasycznie pręgowane z bielą.",
  gridSpan: "col-span-1 row-span-2", // Sterowanie rozmiarem kafelka w Bento Grid
}
```

### 📐 Sterowanie układem w Bento Grid:
* **Duży kafelek panoramiczny:** `col-span-2 row-span-1`
* **Wysoki kafelek pionowy:** `col-span-1 row-span-2`
* **Wyróżniony kafelek główny:** `col-span-2 row-span-2`
* **Standardowy mały kwadrat:** `col-span-1 row-span-1`

---

## 4. Checklista przed kolejnymi wdrożeniami

1. Sprawdź działanie lokalne na serwerze:
   ```bash
   npm run dev
   ```
2. Przetestuj build produkcyjny:
   ```bash
   npm run build
   ```
3. Zapisz zmiany w systemie Git:
   ```bash
   git add .
   git commit -m "opis zmian"
   git push origin main
   ```
4. Wdróż na Vercel z ominięciem starego bufora:
   ```bash
   npx vercel --prod --force --yes
   ```
