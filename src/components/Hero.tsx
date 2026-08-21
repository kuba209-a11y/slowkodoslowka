import Image from "next/image";
import { ArrowUpRight, Phone, Speech } from "lucide-react";
import { business } from "@/lib/content";
import { stockPhotos } from "@/lib/images";
import { Reveal } from "./Reveal";

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
      <ellipse cx="-6" cy="-3" rx="6" ry="3.6" fill="var(--color-ink-soft)" opacity="0.35" />
      <ellipse cx="6" cy="-3" rx="6" ry="3.6" fill="var(--color-ink-soft)" opacity="0.35" />
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

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-var(--header-h))] items-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14"
    >
      {/* Faliste, przerywane linie w tle — pod tekstem i pod zdjęciami,
          z pszczółkami frunącymi wzdłuż ścieżki. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <WavyLine
          id="hero-wave-1"
          viewBoxHeight={170}
          d="M0 85 C 80 5, 160 5, 240 85 C 320 165, 400 165, 460 85 A 42 42 0 1 1 459.9 85 C 540 5, 620 5, 700 85 C 780 165, 860 165, 940 85 A 38 38 0 1 0 939.9 85 C 1020 5, 1100 5, 1180 85 C 1260 165, 1340 165, 1420 85 C 1480 40, 1540 40, 1600 85"
          className="absolute inset-x-0 top-[2%] h-44 w-full"
          strokeWidth={2.8}
          dashArray="7 30"
          bees={[
            { x: 120, y: 20, rotation: -20 },
            { x: 820, y: 150, rotation: 15, scale: 0.9 },
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
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8">
          <div className="relative">
            {/* Delikatna, kręta ścieżka łącząca odznakę z nagłówkiem —
                odpowiednik "doodle" z referencji. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 420 90"
              className="pointer-events-none absolute -left-2 top-4 hidden w-64 text-cobalt-deep/25 sm:block lg:w-80"
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
              <h1 className="text-balance relative mt-7 font-display text-[3.1rem] font-bold leading-[0.94] tracking-tight text-ink sm:text-[4.6rem] lg:text-[5.4rem]">
                Każde słowo
                <br />
                <span className="font-accent font-medium italic text-cobalt-deep">
                  zasługuje na to,
                </span>
                <br />
                by je usłyszeć
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-balance mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
                Diagnoza i terapia mowy dla dzieci, młodzieży i dorosłych —
                indywidualne podejście, wieloletnie doświadczenie i nowoczesna
                metoda elektrostymulacji w przyjaznym gabinecie przy
                ul. Paderewskiego.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#kontakt"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-base font-semibold text-paper transition-transform hover:-translate-y-0.5"
                >
                  Umów diagnozę i konsultację
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={business.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink/10 bg-card px-6 text-base font-semibold text-ink transition-colors hover:border-cobalt-deep"
                >
                  <Phone className="h-4 w-4" />
                  {business.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.2}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end"
          >
            {/* Organiczny kształt wyzierający zza zdjęcia */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rotate-6 rounded-[3rem] bg-sky"
            />

            <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[2.5rem] bg-cobalt shadow-[0_30px_60px_-25px_rgba(38,45,92,0.45)]">
              <Image
                src={stockPhotos.heroGirl.src}
                alt={stockPhotos.heroGirl.alt}
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover"
                priority
              />
            </div>

            <span
              aria-hidden="true"
              className="absolute -top-7 -left-7 flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl bg-butter text-3xl text-butter-ink shadow-lg"
            >
              ✺
            </span>

            <span
              aria-hidden="true"
              className="absolute -top-6 -right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-cobalt-deep shadow-lg"
            >
              <Speech className="h-6 w-6" strokeWidth={2} />
            </span>

            <div className="absolute -bottom-7 -left-9 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cobalt text-cobalt-ink font-display font-semibold">
                EW
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">
                  Edyta Wierzbińska
                </p>
                <p className="text-xs text-ink-soft">Logopeda i nauczyciel</p>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute -right-3 bottom-1/4 h-5 w-5 rounded-full bg-cobalt-deep shadow"
            />

            {/* Naklejki-etykiety porozrzucane dookoła zdjęcia (poza kadrem), pod różnymi kątami */}
            <span className="absolute -left-24 top-[34%] hidden -rotate-[10deg] rounded-full bg-cobalt px-5 py-2.5 text-base font-semibold text-cobalt-ink shadow-md md:inline-flex">
              #Diagnoza
            </span>
            <span className="absolute -right-20 top-1/2 hidden rotate-[7deg] rounded-full bg-sky px-5 py-2.5 text-base font-semibold text-sky-ink shadow-md md:inline-flex">
              #Terapia
            </span>
            <span className="absolute -right-28 -bottom-6 hidden -rotate-[9deg] rounded-full bg-butter px-6 py-3 text-lg font-semibold text-butter-ink shadow-md md:inline-flex">
              #Elektrostymulacja
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
