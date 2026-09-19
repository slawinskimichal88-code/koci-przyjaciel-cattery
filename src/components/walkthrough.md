# Interaktywna Animacja Scrollowania w Sekcji 1 z Kotem i Dużym Logo

Zgodnie z życzeniem: **„chce aby ten film byl jako animacja ze jak schodze w dol to cos sie dzieje i kot sie przesuwa na dół pojawiaja sie jakies teksty itd pamietaj o duzm logo”**, sekcja 1 (Hero) została przekształcona w interaktywne, wieloetapowe doświadczenie filmowe (scrollytelling) oparte na płynnym przewijaniu strony.

---

## 🎬 Co dzieje się podczas schodzenia w dół:

### 1. Monumentalne DUŻE LOGO (Początek — Etap 0)
- Na samej górze użytkownika wita **bardzo duże kryształowe logo medalionu** (`public/logo.webp`) o średnicy do **260px** (`w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64`).
- Logo posiada świecące, koncentryczne złote pierścienie (`animate-pulse`) oraz głęboki blask (`shadow-[0_0_60px_rgba(200,151,59,0.45)]`).
- Towarzyszy mu złoty tag: `HODOWLA KOTÓW MAINE COON • FIFE / FPL`, nagłówek H1 *Koci Przyjaciel \*PL* w kursywie Cormorant Garamond oraz separator ze złotymi łapkami kota.
- Wskazówka: *„Przewiń w dół, aby zobaczyć magię ↓”*.

### 2. Kot przesuwa się w dół w rytm scrollowania
- Wideo `123.mp4` odtwarza się w płynnej pętli w tle.
- Wraz ze scrollem w dół, cała warstwa z kotem **fizycznie przesuwa się w dół ekranu** (`transform: translate3d(0, ${catTranslateY}px, 0) scale(${catScale})`), dając niesamowity kinowy efekt schodzenia w głąb świata hodowli.

### 3. Płynne pojawianie się kolejnych tekstów i kart
W miarę przewijania przez tor animacji (320vh) kolejne teksty płynnie wyłaniają się i znikają:

1. **Etap 01 (Scroll 25% – 52%) — „Prawdziwy Łagodny Olbrzym”**:
   - Kot przesuwa się niżej, odsłaniając złoty badge `01 // POTĘGA I ŁAGODNOŚĆ`.
   - Nagłówek: *„Prawdziwy Łagodny Olbrzym”* (waga do 12 kg, lwią kryza, pędzelki rysiowe).
   - Wypukłe pigułki certyfikacji: `✓ Profilaktyka Echo Doppler` oraz `✓ Badania DNA HCM, SMA, PKD N/N`.

2. **Etap 02 (Scroll 52% – 78%) — „Wychowane z dziećmi i psem”**:
   - Kot schodzi jeszcze niżej.
   - Pojawia się badge `02 // SERCE NASZEGO DOMU`.
   - Nagłówek: *„Wychowane z dziećmi i psem”* (brak klatek, socjalizacja od 1. dnia życia w salonie).
   - Wyróżniki: `⭐ 25 395 Fanów na Facebooku` (z pulsującą kropką na żywo) oraz `🐾 Własne reproduktory — czyste linie`.

3. **Etap 03 (Scroll 78% – 100%) — „Zarezerwuj Swojego Przyjaciela”**:
   - Kot osiąga dolną pozycję dokowania, płynnie wprowadzając użytkownika w strefę adopcji.
   - Nagłówek: *„Zarezerwuj Swojego Przyjaciela”* (odbiór po 14. tygodniu, rodowód FPL/FIFe, chip Safe-Animal, luksusowa wyprawka).
   - Trzy interaktywne przyciski:
     - `[Poznaj dostępne kociaki ↓]` — płynny skok do sekcji miotów
     - `[Zarezerwuj malucha]` — otwarcie modalu rezerwacyjnego
     - `[Zadzwoń: 698 837 525]` — bezpośrednie połączenie telefoniczne

### 4. Wskaźniki i kontrolki na dole ekranu
- Pasek z 4 aktywnymi krokami: `00 // Otwarcie`, `01 // Olbrzym`, `02 // Dom`, `03 // Adopcja` podświetlającymi się na złoto wraz z postępem.
- Precyzyjny wskaźnik procentowy scrolla: `Scroll 0% – 100%`.

---

## 🚀 Weryfikacja

- Kompilacja produkcyjna `npm run build` zakończona sukcesem (kod wyjścia `0`).
- Przetestowano płynność animacji CSS 60fps na platformie Windows.
- Strona otwarta i gotowa do testu w przeglądarce pod adresem: **http://localhost:3000**.
