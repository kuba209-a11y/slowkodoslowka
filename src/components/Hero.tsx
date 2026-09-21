import Image from "next/image";
import { Activity, ArrowUpRight, PlugZap } from "lucide-react";
import { stockPhotos } from "@/lib/images";
import { HeroCta } from "./HeroCta";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

// Mała, szara pszczółka — statyczna (bez animacji), "siedzi" w wybranym
// miejscu na krzywej, np. w środku pętli.
function Bee({
  x,
  y,
  rotation = 0,
  scale = 1,
}: {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
      <g transform="translate(-1.5 -4) rotate(-18)">
        <path
          d="M0,0 C 2.5,-9 10,-12.5 14,-7.5 C 16,-4.5 12.5,0.5 6,1.8 C 2.5,2.4 0.5,1.2 0,0 Z"
          fill="var(--color-ink-soft)"
          opacity="0.22"
          stroke="var(--color-ink-soft)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
      </g>
      <g transform="translate(1.5 -4) scale(-1 1) rotate(-18)">
        <path
          d="M0,0 C 2.5,-9 10,-12.5 14,-7.5 C 16,-4.5 12.5,0.5 6,1.8 C 2.5,2.4 0.5,1.2 0,0 Z"
          fill="var(--color-ink-soft)"
          opacity="0.22"
          stroke="var(--color-ink-soft)"
          strokeWidth="0.6"
          strokeOpacity="0.45"
        />
      </g>
      <ellipse cx="0" cy="0" rx="8.5" ry="6" fill="var(--color-ink-soft)" />
      <rect x="-3.6" y="-6" width="2.3" height="12" rx="1.1" fill="var(--color-ink)" opacity="0.6" />
      <rect x="1.3" y="-6" width="2.3" height="12" rx="1.1" fill="var(--color-ink)" opacity="0.6" />
      <circle cx="9.5" cy="0" r="3" fill="var(--color-ink-soft)" />
      <line x1="10.5" y1="-2.5" x2="12.5" y2="-5" stroke="var(--color-ink)" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <line x1="10.5" y1="-1" x2="13" y2="-1.5" stroke="var(--color-ink)" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

// Szalona, przerywana linia w tle hero — pętle, górki i doliny — z
// szarymi, nieruchomymi pszczółkami "przycupniętymi" na krzywej.
function WavyLine({
  id,
  d,
  viewBoxHeight,
  className,
  strokeWidth = 4,
  dashArray = "7 30",
  bees = [],
}: {
  id: string;
  d: string;
  viewBoxHeight: number;
  className: string;
  strokeWidth?: number;
  dashArray?: string;
  bees?: { x: number; y: number; rotation?: number; scale?: number }[];
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 1600 ${viewBoxHeight}`}
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        id={id}
        d={d}
        stroke="var(--color-ink-soft)"
        strokeOpacity="0.3"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
      {bees.map((bee, i) => (
        <Bee key={i} {...bee} />
      ))}
    </svg>
  );
}

// Organiczna, kwiatowa plama — dekoracja w rogu kafelka bez zdjęcia
// (odpowiednik kolorowych "blobów" spod kart w referencji z Dribbble).
function Blob({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M50 4c14 0 18 15 30 20s21 17 15 31-22 18-34 22-31 3-40-9S6 40 15 26 36 4 50 4Z" />
    </svg>
  );
}

// Wąskie kafelki pod tekstem hero — wersja na telefon. Tytuły i kolory
// wzięte 1:1 z trzech dużych kafelków, które od sm pokazują się jak dotąd.
// Kolejność: najpierw grupa pacjentów, potem dwie metody. Nazwy pełniejsze
// niż tytuły na dużych kafelkach — pasek jest linkiem do cennika, więc jego
// treść to też tekst linku wewnętrznego, a "MFT" samo w sobie nic nie mówi
// ani czytelnikowi, ani wyszukiwarce. "Elektrostymulacja logopedyczna" to
// fraza używana przez gabinety i obecna w meta tagach strony. Pisownia
// "miofunkcjonalna" (częstsza w wyszukiwaniach) obok "miofunkcyjnej"
// w pozostałych sekcjach — strona łapie obie formy.
const mobileTiles = [
  { title: "Dorośli i dzieci", bg: "bg-cobalt", ink: "text-cobalt-ink" },
  { title: "Terapia miofunkcjonalna (MFT)", bg: "bg-lavender", ink: "text-lavender-ink" },
  { title: "Elektrostymulacja logopedyczna", bg: "bg-gold", ink: "text-gold-ink" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-var(--header-h))] items-stretch px-4 py-10 sm:items-center sm:px-6 sm:py-14"
    >
      {/* Faliste, przerywane linie w tle — pod tekstem i pod zdjęciami,
          z pszczółkami frunącymi wzdłuż ścieżki. Ukryte na telefonach:
          przy preserveAspectRatio="none" viewBox 1600px ściskany do ~350px
          spłaszcza pszczółki do nieczytelnych kresek. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden sm:block">
        <WavyLine
          id="hero-wave-1"
          viewBoxHeight={170}
          d="M0 85 C 80 5, 160 5, 240 85 C 320 165, 400 165, 460 85 A 42 42 0 1 1 459.9 85 C 540 5, 620 5, 700 85 C 780 165, 860 165, 940 85 A 38 38 0 1 0 939.9 85 C 1020 5, 1100 5, 1180 85 C 1260 165, 1340 165, 1420 85 C 1480 40, 1540 40, 1600 85"
          className="absolute inset-x-0 top-[2%] h-44 w-full"
          strokeWidth={2.8}
          dashArray="7 30"
          bees={[
            { x: 120, y: 20, rotation: -20 },
            { x: 1150, y: 59, rotation: 30, scale: 0.9 },
          ]}
        />
        <WavyLine
          id="hero-wave-3"
          viewBoxHeight={170}
          d="M0 85 C 80 165, 160 165, 240 85 C 320 5, 400 5, 460 85 A 42 42 0 1 0 459.9 85 C 540 165, 620 165, 700 85 C 780 5, 860 5, 940 85 A 38 38 0 1 1 939.9 85 C 1020 165, 1100 165, 1180 85 C 1260 5, 1340 5, 1420 85 C 1480 130, 1540 130, 1600 85"
          className="absolute inset-x-0 top-[80%] h-44 w-full"
          strokeWidth={2.8}
          dashArray="7 30"
          bees={[
            { x: 120, y: 150, rotation: 15 },
            { x: 820, y: 15, rotation: -20, scale: 0.9 },
          ]}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col sm:block">
        {/* Kompozycja jak w referencji ("Ułożenie tekstu hero"): zwarty blok
            trzech linii, którego szerokość wyznacza najdłuższa linia
            ("zasługuje na to,"), odznaka wycentrowana nad nim, a pod nim
            podpis (na desktopie wcięty).
            Na telefonie blok rozciąga się na wysokość sekcji (flex-1 zamiast
            liczenia jej wzorem z dvh — dvh bywa inne niż wysokość okna),
            a justify-between rozkłada wolne miejsce równo między
            odznakę, claim, adres, paski i przyciski — zamiast zbierać je
            w jedną pustkę nad odznaką. Od sm: zwykły blok, bez zmian.
            w-full jest tu konieczne: mx-auto na elemencie flex blokuje
            rozciąganie w poprzek, blok zwęziłby się do treści, a że rozmiar
            claimu liczymy od jego szerokości (cqw), powstałoby błędne koło
            i tekst miałby 0px.
            @container: rozmiar claimu liczony jest w cqw, czyli od
            szerokości tego bloku, a nie ekranu — 100vw w desktopowych
            przeglądarkach wlicza pasek przewijania i blok wychodził o włos
            za szeroki (ostatnie słowo spadało do nowej linii). */}
        <div className="@container relative mx-auto flex w-full max-w-3xl flex-1 flex-col justify-between text-center sm:block sm:flex-none">
          {/* Delikatna, kręta ścieżka pod odznaką — odpowiednik "doodle" z referencji. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 420 90"
            className="pointer-events-none absolute -left-10 top-4 hidden w-64 text-cobalt-deep/25 sm:block lg:w-80"
            fill="none"
          >
            <path
              d="M2 68C60 10 130 4 190 40s130 44 226 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />
          </svg>

          <Reveal>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-cobalt px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cobalt-ink">
              <span aria-hidden="true" className="text-sm">✺</span>
              Gabinet logopedyczny · Rzeszów
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            {/* Najdłuższa linia ma 7,22 em szerokości, więc rozmiar liczony jako
                (szerokość bloku) / 7,4 sprawia, że blok wypełnia całą kolumnę
                (~48px na 390px, zapas na kursywę). Od lg zostaje dotychczasowa
                skala — desktop bez zmian. */}
            <h1 className="relative mt-7 text-left text-[length:min(calc(100cqw/7.4),6.25rem)] leading-[1.21] tracking-tight text-ink lg:text-[clamp(2rem,9vw,6.25rem)]">
              <span className="font-body font-semibold">Każde</span>{" "}
              <span className="font-accent italic">słowo</span>
              <br />
              <span className="font-body font-semibold">zasługuje na to,</span>
              <br />
              <span className="font-body font-semibold">by je</span>{" "}
              <span className="font-accent italic">usłyszeć.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            {/* Ta sama treść na każdej szerokości — "dzieci, młodzieży
                i dorosłych" mówi od razu, kogo gabinet przyjmuje (ta sama
                fraza co w meta opisie i sekcji O mnie), zamiast żeby
                czytelnik musiał to wywnioskować dopiero z niższych sekcji.
                Łamanie po "gabinecie" jest wspólne dla wszystkich szerokości:
                dłuższa linia sięga prawej krawędzi, adres zostaje w całości
                w kolejnej — sprawdzone, że mieści się też przy wcięciu 84px
                na desktopie (596/684px).
                Na telefonie ten pierwszy segment (do "gabinecie") sam się
                nie mieści w jednej linii nawet przy najmniejszym czytelnym
                rozmiarze — bez kontroli przeglądarka zawijała go, gdzie
                wypadło, zostawiając na drugiej linii tylko 1-2 słowa i dużo
                pustki po prawej. Drugi, telefonowy-only <br> po "młodzieży"
                (najbliżej połowy segmentu: 20,1 em vs 17,2 em reszty, ze
                wszystkich możliwych granic wyrazów najbardziej wyrównane)
                dzieli go na dwie linie, które obie sięgają blisko prawej
                krawędzi zamiast jednej pełnej i jednej postrzępionej. */}
            <p className="mt-4 text-left text-[length:clamp(0.875rem,calc(100cqw/20.4),1.0625rem)] leading-relaxed text-ink-soft [text-wrap:pretty] sm:text-base lg:ml-[84px]">
              {/* Twarde spacje po jednoliterowych słowach i skrócie "ul." —
                  nie mogą zostawać na końcu linii (sierotki). Rozmiar na
                  telefonie liczony od szerokości bloku (cqw) sprawia, że
                  najdłuższa linia wypełnia kolumnę na każdym telefonie. */}
              Diagnoza i&nbsp;terapia mowy dzieci, młodzieży{" "}
              <br className="sm:hidden" />
              i&nbsp;dorosłych w&nbsp;przyjaznym gabinecie{" "}
              <br />
              przy ul.&nbsp;Paderewskiego w&nbsp;Rzeszowie.
            </p>
          </Reveal>

          {/* Telefon: trzy wąskie kafelki zamiast dużych kart (te wracają od
              sm). Same tytuły w kolorach swoich kart — hero mieści się dzięki
              temu w jednym ekranie, a każdy pasek nadal prowadzi do cennika. */}
          <Reveal delay={0.2}>
            <ul className="mt-7 flex flex-col gap-2.5 sm:hidden">
              {mobileTiles.map((tile) => (
                <li key={tile.title}>
                  <a
                    href="#oferta"
                    className={`flex min-h-[3.25rem] items-center rounded-2xl ${tile.bg} px-5 font-display text-lg font-semibold ${tile.ink} transition-transform active:scale-[0.99]`}
                  >
                    {tile.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <HeroCta />
          </Reveal>
        </div>

        {/* Duże kafelki: od sm (tablet i desktop) — bez zmian. Na telefonie
            zastępują je wąskie paski nad przyciskami. */}
        <div className="relative mt-12 hidden sm:mt-20 sm:block">
          {/* Naklejki-etykiety porozrzucane wokół kafelków, pod różnymi kątami. */}
          <span
            aria-hidden="true"
            className="absolute top-14 left-36 z-20 hidden -rotate-6 rounded-full bg-periwinkle-deep px-5 py-2.5 text-base font-semibold text-paper shadow-md lg:inline-flex"
          >
            #Terapia
          </span>
          <span
            aria-hidden="true"
            className="absolute top-2 left-[36%] z-20 hidden rotate-6 rounded-full bg-gold px-5 py-2.5 text-base font-semibold text-gold-ink shadow-md lg:inline-flex"
          >
            #Diagnoza
          </span>
          <span
            aria-hidden="true"
            className="absolute top-20 right-3 z-20 hidden -rotate-6 rounded-full bg-ink px-5 py-2.5 text-base font-semibold text-paper shadow-md lg:inline-flex"
          >
            #Komunikacja
          </span>

          {/* Na telefonie kafelki układają się w kolumnę, a medaliony wystają
              nad krawędź karty nawet o 56px (+4px obwódki) — przy gap-5
              nachodziły na kartę powyżej. Stąd duży odstęp i górny padding
              tylko w układzie kolumnowym. */}
          <RevealGroup
            id="dla-kogo"
            className="grid gap-16 pt-14 sm:grid-cols-3 sm:items-end sm:gap-5 sm:pt-10"
          >
            {/* Kafelek — Terapia miofunkcyjna (MFT): niższy, ikona w medalionie
                + dekoracyjna plama dla równowagi z sąsiednimi kafelkami.
                Cały kafelek to link do cennika tej usługi w sekcji Oferta. */}
            <RevealItem>
              <a
                href="#oferta"
                className="group relative flex min-h-[11rem] flex-col overflow-visible rounded-[2rem] bg-lavender p-6 pt-14 transition-transform hover:-translate-y-1 active:scale-[0.99]"
              >
                <Blob
                  className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 -rotate-12 text-lavender-deep/25"
                />
                <div className="absolute -top-10 left-6 flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-lavender-deep ring-4 ring-paper">
                  <Activity className="h-9 w-9 text-paper" strokeWidth={1.75} />
                </div>
                <div className="relative flex items-start justify-end gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card/70 text-lavender-ink transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="relative mt-auto pt-6">
                  <span className="rounded-full bg-card/70 px-3.5 py-1.5 text-sm font-semibold text-lavender-ink">
                    Terapia miofunkcyjna
                  </span>
                  <h3 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight text-lavender-ink sm:text-[2.75rem]">
                    MFT
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-lavender-ink opacity-75">
                    Dla żucia, mowy, oddychania.
                  </p>
                </div>
              </a>
            </RevealItem>

            {/* Kafelek — Dorośli i dzieci (połączona grupa): wyższy, w środku,
                zdjęcie w większym medalionie wyżej wychodzącym ponad kartę.
                Cały kafelek to link do cennika w sekcji Oferta. */}
            <RevealItem>
              <a
                href="#oferta"
                className="group relative flex min-h-[15rem] flex-col overflow-visible rounded-[2rem] bg-cobalt p-6 pt-16 transition-transform hover:-translate-y-1 sm:min-h-[18.7rem]"
              >
                {/* W kolumnie (telefon) medalion i treść trzymają się lewej —
                    tak jak w sąsiednich kafelkach; wyśrodkowanie ma sens
                    dopiero w układzie trzech kolumn obok siebie. */}
                <div className="absolute -top-14 left-6 h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-paper sm:left-1/2 sm:-translate-x-1/2">
                  <Image
                    src={stockPhotos.heroGirl.src}
                    alt={stockPhotos.heroGirl.alt}
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex items-start justify-end gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card/70 text-cobalt-ink transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-auto pt-6 text-left sm:text-center">
                  <span className="rounded-full bg-card/70 px-3.5 py-1.5 text-sm font-semibold text-cobalt-ink">
                    Każdy wiek
                  </span>
                  <h3 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight text-cobalt-ink sm:text-[2.75rem]">
                    Dorośli i dzieci
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-cobalt-ink opacity-75">
                    Wady wymowy i opóźniony rozwój mowy u dzieci, powrót po udarze u dorosłych.
                  </p>
                </div>
              </a>
            </RevealItem>

            {/* Kafelek — Elektrostymulacja: taki sam jak pierwszy, ikona w
                medalionie tej samej wielkości (brak uczciwego zdjęcia stockowego).
                Cały kafelek to link do cennika tej usługi w sekcji Oferta. */}
            <RevealItem>
              <a
                href="#oferta"
                className="group relative flex min-h-[11rem] flex-col overflow-visible rounded-[2rem] bg-gold p-6 pt-11 transition-transform hover:-translate-y-1 active:scale-[0.99]"
              >
                <Blob
                  className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rotate-12 text-gold-deep/35"
                />
                <div className="absolute -top-8 left-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold-deep ring-4 ring-paper">
                  <PlugZap className="h-7 w-7 text-paper" strokeWidth={1.75} />
                </div>
                <div className="relative flex items-start justify-end gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card/70 text-gold-ink transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="relative mt-auto pt-6">
                  <span className="rounded-full bg-card/70 px-3.5 py-1.5 text-sm font-semibold text-gold-ink">
                    Zabieg
                  </span>
                  <h3 className="mt-4 font-display text-[2.15rem] font-bold leading-[0.95] tracking-tight text-gold-ink sm:text-4xl">
                    Elektrostymulacja
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gold-ink opacity-75">
                    Wzmacnianie mięśni ustno-twarzowych.
                  </p>
                </div>
              </a>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
