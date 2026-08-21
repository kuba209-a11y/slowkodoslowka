# Brief projektu — [Słówko do słówka - terapia logopedyczny]

BRANŻA: [Gabinet logopedyczny]
NAZWA FIRMY: [Słówko do słówka - terapia logopedyczna]
LOKALIZACJA: [Rzeszów, ul. Paderewskiego 85C, 35-330 Rzeszów]

CEL STRONY: [wizytówka / generowanie leadów przez formularz kontaktowy / umów termin (link do znanylekarz) /  budowanie zaufania przed pierwszym kontaktem]

GŁÓWNE CTA: [np. "Umów się na diagnozę i konsultację" / "Skontaktuj się"]

TREŚCI, KTÓRE MAM:
- [lista: teksty o firmie, oferta/usługi, dane kontaktowe (wszystko w pliku txt w folderze - tekst o firmie, podkręć pod SEO oraz atrakcyjność), pozostałych brak - wymyśl sensowny placeholder do uzupełnienia później lub sprawdź benchamrki rynkowe]

TON MARKI: [przyjazny/rodzinny, profesjonalny]

REFERENCJE (jeśli mam): [screeny w folderze "Refernce screen", "Reference screen 2"]

WYMAGANIA TECHNICZNE:
- Stack: Next.js + TypeScript + Tailwind CSS
- Pełen mobile-first responsywny design
- Sekcje: [Hero, O mnie, Oferta, Kontakt, Footer, Zerknij jeszcze branżowo jak to wygląda i ewentualnie dopytaj czy w coś dodatkowo idziemy, poprzednie to na pewno must have]
- Formularz kontaktowy [tylko mailto na razie]
- SEO: meta tagi, sensowne tytuły, alt-y do obrazków, semantyczny HTML

---

STANDARDY (zawsze obowiązują, niezależnie od briefu powyżej — nie usuwaj tej
sekcji, nie dotyczy konkretnego klienta):

1. Zanim napiszesz kod, zdecyduj się świadomie na KONKRETNY kierunek estetyczny
   dopasowany do branży (nie domyślny "Inter + fioletowy gradient + zaokrąglone
   karty" — to ma wyglądać jak zaprojektowane, nie jak AI-default).
2. Dobierz nietypową, ale czytelną parę fontów (display + body), nie Arial/Roboto/
   Inter jako jedyny font.
3. Spójny system kolorów oparty na zmiennych CSS, z jednym dominującym kolorem
   i wyraźnym akcentem — nie "bezpieczna" paleta szarości.
4. Dodaj animacje z sensem: scroll-reveal sekcji, subtelne hover-states, stagger
   na listach/kartach (użyj Framer Motion). Jeśli branża i ton marki na to pozwala
   (kreatywna/tech/lifestyle - NIE prawnicza/medyczna/formalna), rozważ lekki
   element 3D w hero (React Three Fiber) — ale tylko jeśli realnie wzmacnia
   przekaz, nie na siłę.
5. Złam nudną symetrię gdzie to ma sens: asymetryczne układy, nakładające się
   elementy, oddech (negative space) — zamiast wszystkiego w idealnie
   wycentrowanych kartach.
6. Sprawdź się względem standardowych zasad UX/dostępności: kontrast WCAG AA
   minimum, focus states na elementach interaktywnych, czytelna hierarchia
   nagłówków, touch targets min. 44px na mobile.
7. Zbadaj (web search), jakie sekcje/elementy są standardem dla tej konkretnej
   branży, i upewnij się że ich nie brakuje (np. restauracja = menu+rezerwacja,
   prawnik = formalne zaufanie+case studies, fitness = social proof+grafik zajęć).
8. Przed pokazaniem finalnej wersji, przejdź samodzielnie przez stronę myślą
   "czy to wygląda jak szablon z 2015, czy jak coś zaprojektowane w 2026?" —
   jeśli pierwsze, popraw.
9. Zrób wszystko zgodnie z zasadami w skillu UI UX Pro Max

Zacznij od zaproponowania 1-2 konkretnych kierunków estetycznych do wyboru,
zanim zaczniesz pisać kod całej strony.

@AGENTS.md
