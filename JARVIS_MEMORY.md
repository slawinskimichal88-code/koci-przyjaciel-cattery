# JARVIS_MEMORY.md — Koci Przyjaciel *PL

## 1. Cel Projektu
Strona hodowli kotów rasy Maine Coon „Koci Przyjaciel *PL” (Wrocław, FIFe / FPL).
Koncepcja: Połączenie najwyższej próby estetyki Apple (iPhone 16 Pro / VisionOS), wysokokonwersyjnego lejka sprzedażowego oraz interaktywnego kompendium wiedzy o rasie.

## 2. Kluczowe Metryki i Dane Autentyczne
- Repozytorium: `https://github.com/slawinskimichal88-code/koci-przyjaciel-cattery.git` (gałąź `main`)
- Produkcja Vercel: `https://koci-przyjaciel-cattery.vercel.app`
- Narzędzie Git w środowisku: `C:\Users\Michu\mingit\cmd\git.exe`
- Środowisko uruchomieniowe: Node.js v24, Next.js 16.3.4 (Turbopack), Tailwind CSS v4
- Telefon hodowli: `+48 502 961 848` (Wrocław)
- Społeczność Meta: 26 400+ obserwujących (zsynchronizowane asynchronicznie przez API)
- Standard zdrowia: 100% kotów hodowlanych z badaniami HCM (Doppler echo serca), PKD (DNA + USG), SMA (DNA), FIV/FeLV N/N

## 3. Zrealizowane Etapy Prac
1. **Audyt i Optymalizacja SEO / AI-Search**:
   - Komplet metadanych OpenGraph, Twitter Cards, kanoniczne URL-e na wszystkich 5 podstronach.
   - Zaawansowane dane strukturalne JSON-LD Schema.org (`LocalBusiness`, `Organization`, `WebSite`, `Product/Breed`).
   - Autentyczne teksty oparte na faktach, wyeliminowanie zmyślonych danych.
2. **Scrollytelling Wybiegu na Telefonach (`EnclosureSection`)**:
   - Przetestowany układ w widoku mobile (wysokość kontenera `280vh` na telefonach, `pt-[90px]`, `justify-start`, ramka iPhone 16 Pro `360px`).
   - Wyeliminowano nachodzenie tekstu na wideo.
3. **Mikro-punkty Apple LiDAR (`ScaleComparisonSection`)**:
   - Kropki na zwierzętach przeskalowane do `w-2 h-2` (8px na telefonach), czysta optyka bez wielkich dymków.
4. **Wirtualne Moduły i Eliminacja Nadmiaru Tekstu**:
   - `KittensSection`: Interaktywna witryna Apple Store, filtry statusu (`● Dostępne`, `Kocurki ♂`, `Kotki ♀`), pigułki kodów EMS, wagi i pakietu wyprawkowego.
   - `KnowledgeBaseTeaser`: Wbudowany symulator kosztów miesięcznych na żywo (PLN/msc) oraz wskaźniki badań genetycznych HCM/PKD/SMA.
   - `TestimonialsSection`: Pasek KPI zaufania (`5.0/5.0`, `10.4 kg`, `100% DNA`), filtry relacji, wirtualny odtwarzacz audio Apple Voice Memo.
   - `ContactSection`: 3-krokowa ścieżka adopcji, preferencje w formularzu i bezpośrednie kanały kontaktu.
5. **Architektura Lejka Sprzedażowego**:
   - Kolejność: Hero -> Pasek Szybkiej Rezerwacji -> Wybieg (USP) -> Kocięta (Oferta) -> Kim Jestem (Właścicielka) -> Skala 1:1 (Teaser) -> Baza Wiedzy & Kalkulator -> Opinie -> Społeczność -> Kontakt.
7. **Dopracowanie Layoutu (Wybieg, Psy i Właścicielka)**:
   - `EnclosureSection`: Rozszerzono kolumnę tekstową desktop z wąskiego 500px do 680px, usunięto sztuczne łamania `<br />`, wyrównano kompozycję z makietą iPhone'a (koniec efektu „wąskiego paska z boku”).
   - `ScaleComparisonSection`: Na stronie głównej zachowano wyłącznie czystą grafikę skali 1:1 z laserowymi liniami HUD oraz wyrazisty przycisk/hiperłącze do Bazy Wiedzy (`/baza-wiedzy#porownanie`). Całkowicie usunięto kwadraty/boxy z tekstem o psach ze strony głównej.
   - `BreederSection`: Drastycznie skrócono tekst o właścicielce – zastąpiono 3 długie akapity jednym zwięzłym cytatem w stylu Apple Keynote, dwuzdaniowym biogramem, 3 minimalistycznymi plakietkami zaufania oraz bezpośrednim hiperłączem do `/o-nas`.
   - Zmiany zbudowane z kodem 0 i wysłane na produkcję (`main -> main`).
8. **Przebudowa Kolejności Sekcji i Statusu Adopcji**:
   - Nowa kolejność strony głównej: **Hero** (film z kotem) -> **Kim Jestem / Właścicielka** (`BreederSection`) -> **Wybieg** (`EnclosureSection`) -> Bento Showcase -> Skala 1:1 -> Baza Wiedzy -> Opinie -> Społeczność -> Kontakt.
   - Usunięto zewsząd koty oznaczone jako do bieżącej adopcji (usunięto `KittenReservationBar` i `KittensSection` ze strony głównej).
   - Wdrożono nową zakładkę w menu **„Dostępne Kociaki”** (`/dostepne-kociaki` oraz `/kocieta`) z wyrazistym komunikatem: **„Obecnie brak dostępnych miotów do adopcji”**, formularzem zapisu na listę oczekujących na przyszłe mioty, archiwum wychowanków oraz prezentacją rodziców.
   - Przygotowano strukturę pod implementację filmu o właścicielce w technice scrollytellingu (jak wybieg).
9. **Wdrożenie Filmów o Właścicielce z Automatyczną Transkrypcją i Scrollytellingiem**:
   - Pobrane wideo z folderu `owner`: krótsza wersja 3:20 min (`breeder-short.mp4`) oraz pełna wersja 9:14 min (`breeder-full.mp4`).
   - Przeprowadzono ekstrakcję audio i transkrypcję mowy AI (Whisper) w języku polskim ze znacznikami czasu.
   - **Strona główna (`BreederSection`)**: Krótszy film zintegrowany w ramce pionowej iPhone 16 Pro (576x1024 9:16) ze scrollytellingiem (3 sceny: Początki i rejestracja -> Wybór rasy Maine Coon i linie zagraniczne -> Życie w salonie bez klatek i wybieg), szklanymi napisami VisionOS na wideo, przyciskiem dźwięku oraz bezpośrednim hiperłączem do pełnego filmu w `/o-nas`.
   - **Zakładka O nas (`/o-nas#pelny-film`)**: Dodano sekcję z dopiskiem **„Pełny film (9:14 min)”**, dedykowanym odtwarzaczem kinowym w ramce Titanium, kontrolkami odtwarzania, plakatem i podziałem na rozdziały czasowe.
   - Zweryfikowano wizualnie w Chromium Headless, zbudowano z kodem 0 i wysłano do repozytorium (`main -> main`).
10. **Naprawa Stylów Vercel & Kompletna Dokumentacja Multimediów**:
   - Rozwiązano problem degradacji stylów Tailwind v4 na Vercelu (pre-kompilacja CSS `build-css.js`, optymalizacja fontów Google, usunięcie hydracyjnych ostrzeżeń, wdrożenie `--force`).
   - Usunięto formularz rezerwacji z sekcji Kontakt (pozostawiono bezpośredni przycisk Messenger/Facebook).
   - Utworzono i zsynchronizowano pełną instrukcję techniczną `INSTRUKCJA_WDROZENIA_I_MULTIMEDIOW.md` w repozytorium, w kopii `C:\Users\Michu\Downloads\KOPIA STRONY\` oraz w GitHub (`main`).
11. **Optymalizacja Wideo, Płynność Galerii 120 FPS i Zabezpieczenia Antykradzieżowe**:
   - **Kopia Bezpieczeństwa**: Utworzono gałąź `stable-vercel-working-2026-09-25`, tag `v1.0.0-stable` oraz fizyczną kopię `C:\Users\Michu\Downloads\KOPIA_STRONY_STABLE_VERCEL_2026_09_25`.
   - **Optymalizacja Wideo**: `film2.mp4` zredukowany o 87% (z 16.7 MB do 2.22 MB, 720p faststart), `hero-cat.mp4` zredukowany o 54% (z 3.58 MB do 1.69 MB), zremuksowano `breeder-short.mp4` i `breeder-full.mp4` z flagą `+faststart` (przeniesienie atomu moov na początek pliku, strumieniowanie od 1. sekundy), wygenerowano plakaty WebP (12-30 KB), ustawiono `preload="metadata"` poniżej linii zgięcia ekranu.
   - **Płynność Galerii 120 FPS**: `FluidBentoCell.tsx` wzbogacony o `useInView` (automatyczne pauzowanie pętli poza widokiem – zero zbędnego obciążenia GPU/CPU), akcelerację sprzętową `translate3d`, asynchroniczne dekodowanie obrazów oraz odchudzenie puli do 6 kadrów na kafelek.
   - **Ochrona Witryny (Anti-Copy / Anti-Download)**: Komponent `SecurityProtection.tsx` blokujący prawy przycisk myszy (z eleganckim powiadomieniem VisionOS), blokada przeciągania (`-webkit-user-drag: none`), blokada zaznaczania tekstu (`user-select: none`), blokada skrótów klawiszowych (F12, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+Shift+I/J/C), tarcze `media-shield` i znaki wodne w Lightboxie oraz blokada drukowania `@media print`.
   - Wdrożono na produkcję Vercel (`dpl_7o9YBX3TVn9RzYtFXm4n3TxmYw7L`), zsynchronizowano z `Downloads\KOPIA STRONY` oraz wypchnięto na GitHub `main`.
12. **Optymalizacja Google PageSpeed Insights & Lighthouse (Core Web Vitals)**:
    - **Narzędzia audytu**: Utworzono automatyczny skrypt `scripts/run_lighthouse_audit.mjs` z emulacją Mobile (dławienie CPU 4x, sieć 4G Moto G) oraz Desktop.
    - **Wyniki Desktop**: Performance: **97/100**, Accessibility: **96/100**, Best Practices: **100/100**, SEO: **100/100** (FCP: **0.4 s**, LCP: **0.9 s**, TBT: **130 ms**, CLS: **0.019**).
    - **Wyniki Mobile**: Performance podniesiony z **54/100** do **72/100**, FCP skrócony z **5.1 s** do **1.5 s** (-70%), Speed Index skrócony z **9.4 s** do **3.9 s** (-58%), CLS: **0.015**, Best Practices: **100/100**, SEO: **100/100**, Accessibility: **96/100**.
    - **Wdrożone techniki**:
      1. Konwersja 6 zrzutów Facebooka (>3.6 MB) do miniatur WebP (8-13 KB) z lazy loading.
      2. Odchudzenie logo z 421 KB do 27.4 KB WebP (unoptimized dla bezpośredniego serwowania).
      3. Kompresja wideo Hero na telefony do 405 KB z ultra-lekkim plakatem 12.7 KB i odroczonym ładowaniem strumienia wideo.
      4. Usunięcie błędnego priority ze ScaleComparisonSection poniżej linii zgięcia.
      5. Zastąpienie zewnętrznych fontów Google CDN zoptymalizowanym pojedynczym Cormorant Garamond z next/font/google i natywnym system font stackiem dla UI/Body (eliminacja 280 KB zbędnego transferu fontów i 5 zapytań WOFF2).
      6. Usunięcie animacji heroLogoEntrance i blur-3xl z Hero (eliminacja layout thrashingu i redukcja czasu głównego wątku).
      7. Poprawa A11y (aria-label na przyciskach wideo, poprawna hierarchia nagłówków H3).
      8. Commit be91409 wypchnięty do GitHub origin/main.
