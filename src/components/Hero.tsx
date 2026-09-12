import Image from "next/image";
import { Activity, ArrowUpRight, Phone, PlugZap } from "lucide-react";
import { stockPhotos } from "@/lib/images";
import { business } from "@/lib/content";
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

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-var(--header-h))] items-center px-4 py-10 sm:px-6 sm:py-14"
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

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Na telefonie cały blok jest wyrównany do lewej (odznaka wycentrowana
            nad tekstem do lewej wyglądała jak przypadek); wycentrowanie odznaki
            wraca dopiero na dużych ekranach, gdzie nagłówek wypełnia kolumnę. */}
        <div className="relative mx-auto max-w-3xl text-left lg:text-center">
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
            {/* Skala płynna zamiast sztywnych 100px: na 375px daje ~34px
                (mieści się w kolumnie), docelowe 100px osiąga ok. 1110px
                szerokości — czyli desktop wygląda dokładnie jak wcześniej. */}
            <h1 className="text-balance relative mt-6 text-left text-[clamp(2rem,9vw,6.25rem)] leading-[1.14] tracking-tight text-ink sm:mt-7 lg:leading-[1.21]">
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
            {/* Wcięcie 84px (dosunięcie pod nagłówek) i wymuszenie jednej linii
                mają sens dopiero przy docelowym, dużym nagłówku — na telefonie
                i tablecie zjadałyby szerokość i wypychały tekst poza ekran. */}
            <p className="mt-4 text-left text-base leading-relaxed text-ink-soft lg:ml-[84px] lg:whitespace-nowrap">
              Diagnoza i terapia mowy w przyjaznym gabinecie przy ul. Paderewskiego w Rzeszowie.
            </p>
          </Reveal>

          {/* Główne CTA w hero — tylko do rozmiaru tabletu. Od lg te same dwie
              akcje są stale widoczne w headerze, więc tam byłyby duplikatem;
              poniżej lg header chowa je pod hamburgerem i bez tego bloku
              użytkownik telefonu nie ma żadnej drogi do kontaktu na starcie. */}
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:hidden">
              <a
                href="#kontakt"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-ink px-7 text-base font-semibold text-paper transition-transform active:scale-[0.98]"
              >
                Umów konsultację
              </a>
              <a
                href={business.phoneHref}
                className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-border bg-card px-7 text-base font-semibold text-ink transition-transform active:scale-[0.98]"
              >
                <Phone className="h-4.5 w-4.5 text-cobalt-deep" strokeWidth={2.2} />
                {business.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16 sm:mt-20">
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
