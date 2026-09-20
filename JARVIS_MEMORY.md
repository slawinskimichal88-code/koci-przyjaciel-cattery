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
6. **Optymalizacja Informacji na Stronie Głównej & Przebudowa /o-nas**:
   - `Kim jestem` (`BreederSection`): Sekcja z portretem właścicielki (`cat_07.webp`, `cat_24.webp`), opisem pasji, życia w salonie i certyfikatów FIFe/FPL.
   - `ScaleComparisonSection`: Lekki teaser na głównej z metrykami (120 cm, 11.5 kg, 38 cm) i linkiem do Bazy Wiedzy (`/baza-wiedzy#porownanie`), pełna wersja w `/baza-wiedzy`.
   - `EnclosureSection`: Płynny scrollytelling bez zmian, link do `/o-nas#wybieg`.
   - `/o-nas`: 4 sekcje: `#hodowla` (Nasza Hodowla), `#wybieg` (Wybieg z wideo i galerią), `#matki` (Karty matek HCM/DNA), `#kocury` (Karty kocurów do 12 kg) + pigułki nawigacyjne Apple.
