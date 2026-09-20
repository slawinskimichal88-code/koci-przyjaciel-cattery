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
