"use client";

import { useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Pozioma, kolorowa "druciana" ścieżka między sekcjami — inspirowana zabawką
// montessori z klockiem jeżdżącym po wygiętym drucie. Klocek (koralik) przesuwa
// się wzdłuż fali w rytm scrollowania i znika, gdy jego odcinek drutu się kończy.

const W = 1600;
const H = 200;
const CENTER_Y = H / 2;
const TAU = Math.PI * 2;

// Dwie nałożone fale — jedna szeroka i rozciągnięta (główny bieg drutu),
// druga subtelna i krótsza (lekkie, nieregularne odchylenia peaków) — bez
// przesady, w sam raz pomiędzy monotonnym sinusem a chaotyczną plątaniną.
// Amplitudy o ok. 50% większe niż w poprzedniej wersji, żeby wierzchołki nie
// były w niektórych miejscach za niskie / spłaszczone.
const WAVES = [
  { amplitude: 39, period: 1050, phase: 0 },
  { amplitude: 15, period: 430, phase: 1.4 },
];

// Rozmiary koralika i jego poświaty (w px) — używane do wycentrowania
// przez odjęcie połowy wymiaru bezpośrednio ze współrzędnych, bo pozycja
// jest teraz animowana przez transform (x/y), a nie przez left/top.
const BEAD_SIZE = 36; // h-9 w-9
const GLOW_SIZE = 30;

function wireY(x: number) {
  const sum = WAVES.reduce(
    (acc, w) => acc + Math.sin((x / w.period) * TAU + w.phase) * w.amplitude,
    0
  );
  return CENTER_Y + sum;
}

function buildWirePath() {
  const points: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    points.push(`${x === 0 ? "M" : "L"}${x} ${wireY(x).toFixed(1)}`);
  }
  return points.join(" ");
}

const WIRE_PATH = buildWirePath();

type Shape = "circle" | "star" | "cloud" | "sun";

// Klocki z zabawki montessori — z połyskiem (radialny gradient) dla wrażenia
// bryłowatości, zamiast płaskich ikon.
//
// Celowo bez cienia (box-shadow/filter: drop-shadow) na opakowującym divie:
// div jest zawsze kwadratowym/okrągłym pojemnikiem, a kształty typu gwiazda
// czy chmurka go nie wypełniają — cień rysował się więc jako widoczna,
// przezroczysta "bańka" wokół samego kształtu.
// Czy użytkownik choć raz przewinął stronę — raz ustawione zostaje na stałe
// (wspólne dla wszystkich dzielników).
let everScrolled = false;
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getEverScrolled = () => (everScrolled ||= window.scrollY > 0);
const getEverScrolledOnServer = () => false;

function Bead({ shape, color }: { shape: Shape; color: string }) {
  const uid = useId().replace(/[:]/g, "");
  const gradId = `wg-${uid}`;

  const gradient = (
    <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
      <stop offset="0%" stopColor="var(--color-card)" stopOpacity="0.85" />
      <stop offset="35%" stopColor={color} stopOpacity="1" />
      <stop offset="100%" stopColor={color} stopOpacity="1" />
    </radialGradient>
  );

  const svg = (() => {
    switch (shape) {
      case "star":
        return (
          <svg viewBox="0 0 40 40" className="h-9 w-9">
            <defs>{gradient}</defs>
            <path
              d="M20 3l4.4 10.3L35 15l-8 7.6L29.4 34 20 28.2 10.6 34 13 22.6 5 15l10.6-1.7Z"
              fill={`url(#${gradId})`}
            />
          </svg>
        );
      case "cloud":
        return (
          <svg viewBox="0 0 40 40" className="h-9 w-9">
            <defs>{gradient}</defs>
            <path
              d="M11.5 28a6 6 0 01-1-11.9 8 8 0 0115.4-3A7 7 0 0134 26.7 5.5 5.5 0 0130.5 28h-19Z"
              fill={`url(#${gradId})`}
            />
          </svg>
        );
      case "sun":
        return (
          <svg viewBox="0 0 40 40" className="h-9 w-9">
            <defs>{gradient}</defs>
            <path
              d="M32 20L37 20M28.5 28.5L32 32M20 32L20 37M11.5 28.5L8 32M8 20L3 20M11.5 11.5L8 8M20 8L20 3M28.5 11.5L32 8"
              stroke={color}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="9.5" fill={`url(#${gradId})`} />
          </svg>
        );
      case "circle":
      default:
        return (
          <svg viewBox="0 0 40 40" className="h-9 w-9">
            <defs>{gradient}</defs>
            <circle cx="20" cy="20" r="16" fill={`url(#${gradId})`} />
          </svg>
        );
    }
  })();

  return <div className="h-9 w-9">{svg}</div>;
}

export function WireDivider({
  color,
  beadColor,
  shape = "circle",
  reverse = false,
  className = "",
}: {
  color: string;
  beadColor?: string;
  shape?: Shape;
  reverse?: boolean;
  // Dodatkowe klasy (np. korekta marginesu), gdy sąsiadujące sekcje mają
  // asymetryczny padding i drut wychodzi wizualnie nie na środku.
  className?: string;
}) {
  const bead = beadColor ?? color;
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Realna szerokość paska (w px) — potrzebna, żeby przeliczyć wirtualne
  // współrzędne drutu (0–W) na konkretne piksele. Animujemy pozycję przez
  // transform (x/y), a nie przez left/top: left/top wymuszają przeliczenie
  // layoutu i przemalowanie filtra drop-shadow w KAŻDEJ klatce scrolla, co
  // na WebKit (Safari na macOS/iOS) objawia się "ciągnącym się" cieniem za
  // kształtem — poprzednia rasteryzacja cienia nie zdąża się wyczyścić.
  // transform jest kompozytowany na GPU i nie przemalowuje filtra przy
  // każdym przesunięciu.
  // Mierzymy też wysokość: na telefonie pasek jest niższy niż wirtualne 200px
  // viewBoxa (oszczędność ~320px scrolla na czterech dzielnikach), a SVG
  // skaluje się przez preserveAspectRatio="none". Bez przeliczenia Y koralik
  // jechałby obok drutu, a nie po nim.
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(H);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setWidth(el.clientWidth);
      setHeight(el.clientHeight);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Klocek ma się pojawić dopiero, gdy użytkownik faktycznie zacznie scrollować
  // — nie od razu po wejściu na stronę, nawet jeśli ten odcinek drutu jest już
  // (częściowo) w widoku przy pierwszym renderze.
  const hasScrolled = useSyncExternalStore(subscribeScroll, getEverScrolled, getEverScrolledOnServer);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xUnits = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [W, 0] : [0, W]
  );
  const xBase = useTransform(xUnits, (v) => (v / W) * width);
  const yBase = useTransform(xUnits, (v) => wireY(v) * (height / H));
  const beadX = useTransform(xBase, (v) => v - BEAD_SIZE / 2);
  const beadY = useTransform(yBase, (v) => v - BEAD_SIZE / 2);
  const glowX = useTransform(xBase, (v) => v - GLOW_SIZE / 2);
  const glowY = useTransform(yBase, (v) => v - GLOW_SIZE / 2);
  // Koralik jest widoczny przez niemal cały czas, gdy pasek jest na ekranie —
  // znika dopiero tuż przy samej krawędzi, więc ruch trwa dokładnie tak długo,
  // jak scrollowanie po tym odcinku drutu (bez wcześniejszego "kończenia się").
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.015, 0.985, 1],
    [0, 1, 1, 0]
  );
  // Delikatna poświata podążająca po drucie razem z klockiem — podkreśla jego
  // pozycję na linii, nie przyćmiewając samego kształtu.
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.015, 0.985, 1],
    [0, 0.5, 0.5, 0]
  );

  // Telefon: przycinamy tylko w poziomie (klocek przy brzegach ekranu nie
  // może wystawać w bok). Pionowe overflow-hidden ucinało rozmytą poświatę
  // klocka na sztywno o dolną/górną krawędź 120px paska, gdy drut schodził
  // najniżej / najwyżej — widać było prostą granicę pod klockiem.
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative -mb-6 h-[120px] w-full overflow-hidden max-sm:overflow-x-clip max-sm:overflow-y-visible sm:-mb-8 sm:h-[200px] ${className}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d={WIRE_PATH}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 rounded-full blur-xl will-change-transform"
            style={{
              x: glowX,
              y: glowY,
              opacity: hasScrolled ? glowOpacity : 0,
              backgroundColor: bead,
              width: GLOW_SIZE,
              height: GLOW_SIZE,
            }}
          />
          <motion.div
            className="absolute left-0 top-0 will-change-transform"
            style={{ x: beadX, y: beadY, opacity: hasScrolled ? opacity : 0 }}
          >
            <Bead shape={shape} color={bead} />
          </motion.div>
        </>
      )}
    </div>
  );
}
