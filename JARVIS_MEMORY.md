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
