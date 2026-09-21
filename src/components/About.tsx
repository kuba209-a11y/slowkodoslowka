import { Car, GraduationCap, HeartHandshake, ImageIcon, Target } from "lucide-react";
import { typeset } from "@/lib/typography";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const areas = [
  "Diagnozą i terapią zaburzeń mowy u dzieci i młodzieży",
  "Korekcją wad wymowy u dzieci i młodzieży",
  "Terapią osób z afazją po udarze (z dojazdem do pacjenta)",
  "Zabiegami elektrostymulacji mięśni twarzy",
];

const points = [
  {
    mark: GraduationCap,
    bg: "bg-cobalt",
    chip: "max-sm:bg-cobalt",
    ink: "text-cobalt-ink",
    title: "Wieloletnie doświadczenie",
    text: "Nauczyciel i logopeda pracujący z dziećmi, młodzieżą i osobami dorosłymi od wielu lat.",
  },
  {
    mark: Target,
    bg: "bg-lavender",
    chip: "max-sm:bg-lavender",
    ink: "text-lavender-ink",
    title: "Indywidualne podejście",
    text: "Dobór metod zawsze poprzedzony wnikliwym wywiadem i analizą potrzeb pacjenta.",
  },
  {
    mark: HeartHandshake,
    bg: "bg-gold",
    chip: "max-sm:bg-gold",
    ink: "text-gold-ink",
    title: "Bezpieczeństwo i komfort",
    text: "Poczucie bezpieczeństwa sprzyja współpracy i trwałości efektów terapii.",
  },
];

const intro = [
  "Nauczyciel, logopeda z wieloletnim doświadczeniem. Pracuję zarówno z dziećmi, młodzieżą, jak i osobami dorosłymi, mającymi trudności z opóźnionym rozwojem mowy, wadami wymowy, dyslalią, alalią i afazją czy nauką czytania.",
  "W swojej pracy wykorzystuję metodę elektrostymulacji, wspomagającą pobudzanie i wzmacnianie mięśni sfery ustno-twarzowej. Dbam o to, aby pacjent czuł się bezpiecznie i komfortowo - to fundament trwałych efektów terapii.",
];

// Na telefonie cały tekst sekcji jest wyjustowany i może się dzielić na
// miękkich łącznikach wstawionych w typeset() — w wąskiej kolumnie postrzępiony
// prawy brzeg wygląda na "pocięty", a bez dzielenia justowanie robi dziury.
// Od sm hyphens-none każe ignorować te łączniki, więc tablet i desktop łamią
// tekst jak dotąd.
const justify =
  "max-sm:text-justify max-sm:hyphens-manual max-sm:[text-wrap:pretty] sm:hyphens-none";
// Punkty listy to krótkie, 2-liniowe zdania: po wyjustowaniu dwa długie wyrazy
// w linii rozjeżdżają się o 60-100px, a żaden rozmiar czcionki nie działa na
// wszystkich szerokościach telefonu — zostają wyrównane do lewej (nadal bez
// wiszących spójników i z dzieleniem wyrazów).
const ragged = "max-sm:hyphens-manual max-sm:[text-wrap:pretty] sm:hyphens-none";

export function About() {
  return (
    <section id="o-mnie" className="px-4 py-14 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          {/* Bez zmiany kolejności w DOM (nagłówek zostaje naturalnym
              następnikiem strony dla czytników ekranu) — na telefonie sam
              placeholder na zdjęcie (dashed box, ~300px) wychodził w gridzie
              jako pierwszy, czyli zaraz po animowanej linii między sekcjami:
              duża, prawie pusta plama zamiast treści. order-* przenosi go
              wizualnie pod tekst na telefonie; od lg wraca do zwykłej
              kolejności (zdjęcie po lewej, jak w DOM). */}
          {/* Kadr 4:5 przy pełnych 384px zajmowałby na telefonie 480px
              wysokości — a to wciąż tylko placeholder na zdjęcie. */}
          <Reveal className="relative order-2 mx-auto w-full max-w-[15rem] sm:max-w-sm lg:order-none lg:mx-0">
            <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden rounded-[2.5rem] border-2 border-dashed border-periwinkle bg-gold/60 px-6 text-center">
              <ImageIcon aria-hidden="true" className="h-10 w-10 text-periwinkle-ink/60" strokeWidth={1.5} />
              <span className="font-display text-sm font-semibold text-periwinkle-ink/70">
                miejsce na zdj. Edyty
              </span>
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 flex h-20 w-20 -rotate-6 items-center justify-center rounded-full bg-periwinkle text-3xl text-periwinkle-ink shadow-lg"
            >
              ❁
            </span>
          </Reveal>

          <div className="order-1 lg:order-none">
            <span className="inline-flex items-center rounded-full bg-cobalt px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-ink">
              O mnie
            </span>
            {/* Na telefonie nagłówek w jednej linii: cały zajmuje 12,73 em, więc
                rozmiar = szerokość kolumny (ekran minus 2rem paddingu sekcji)
                / 13,4 (zapas ~5% na pasek przewijania, który 100vw wlicza
                w przeglądarce desktopowej), z górnym limitem 30px (dotychczasowe
                text-3xl) — ~27px na 390px, ~24,5px na 360px, 30px od ~430px. Od sm
                bez zmian. text-balance tylko od sm: własna, niewarstwowa
                klasa .text-balance z globals.css nadpisywała nowrap
                (text-wrap: balance resetuje text-wrap-mode), więc na telefonie
                nagłówek dawał się zawinąć. */}
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink max-sm:whitespace-nowrap max-sm:text-[length:min(1.875rem,calc((100vw_-_2rem)/13.4))] sm:text-4xl sm:text-balance">
              Poznajmy się -{" "}
              <span className="font-accent text-cobalt-deep">jestem Edyta</span>
            </h2>
            <p className={`mt-5 leading-relaxed text-ink-soft ${justify}`}>{typeset(intro[0])}</p>
            <p className={`mt-4 leading-relaxed text-ink-soft ${justify}`}>{typeset(intro[1])}</p>

            {/* Telefon: trzy kafelki (po ~157px każdy) zamieniają się w jedną
                kompaktową kartę-listę: kolorowe kółko z ikoną obok tytułu,
                a opis na całą szerokość pod spodem — wszystkie argumenty widać od razu, bez
                klikania (to sygnały zaufania, więc nie chowamy ich w akordeonie
                jak kroki procesu). Ten sam markup co na desktopie, tylko
                warianty max-sm: — od sm układ 3 kolumn jest bez zmian.
                Kółko ma sm:contents, więc na desktopie ikona zostaje
                bezpośrednim dzieckiem kafelka jak dawniej. */}
            <RevealGroup className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 max-sm:gap-0 max-sm:rounded-[1.75rem] max-sm:border max-sm:border-border max-sm:bg-card max-sm:px-5 max-sm:py-1">
              {points.map((point) => (
                <RevealItem
                  key={point.title}
                  className={`rounded-2xl ${point.bg} p-5 transition-transform hover:-translate-y-1 max-sm:grid max-sm:grid-cols-[2.25rem_1fr] max-sm:items-center max-sm:gap-x-3 max-sm:gap-y-2 max-sm:rounded-none max-sm:border-b max-sm:border-border/60 max-sm:bg-transparent max-sm:p-0 max-sm:py-3.5 max-sm:last:border-b-0 max-sm:hover:translate-y-0`}
                >
                  <span
                    className={`sm:contents max-sm:flex max-sm:h-9 max-sm:w-9 max-sm:items-center max-sm:justify-center max-sm:rounded-full ${point.chip}`}
                  >
                    <point.mark aria-hidden="true" className={`h-7 w-7 max-sm:h-[1.125rem] max-sm:w-[1.125rem] ${point.ink}`} strokeWidth={1.75} />
                  </span>
                  <h3 className={`mt-3 font-display text-xl font-bold leading-tight ${point.ink} max-sm:col-start-2 max-sm:mt-0 max-sm:text-lg max-sm:font-semibold max-sm:text-ink`}>
                    {point.title}
                  </h3>
                  <p className={`mt-1.5 text-sm leading-relaxed ${point.ink} opacity-90 max-sm:col-span-2 max-sm:mt-0 max-sm:text-ink-soft max-sm:opacity-100 max-sm:leading-normal ${justify}`}>
                    {typeset(point.text)}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <RevealItem className="mt-10 rounded-[2rem] border border-border bg-card p-6 sm:p-10">
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink max-sm:font-semibold sm:text-3xl">
            W swojej pracy zajmuję się:
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <li key={area} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cobalt-deep" />
                <span className={`text-ink-soft leading-relaxed ${ragged}`}>{typeset(area)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-2 text-sm text-ink-soft">
            <Car className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-deep" strokeWidth={1.75} />
            Istnieje możliwość dojazdu do pacjenta.
          </p>
        </RevealItem>
      </div>
    </section>
  );
}
