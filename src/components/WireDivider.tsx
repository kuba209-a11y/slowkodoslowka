"use client";

import { useEffect, useId, useRef, useState } from "react";
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

  switch (shape) {
    case "star":
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-lg">
          <defs>{gradient}</defs>
          <path
            d="M20 3l4.4 10.3L35 15l-8 7.6L29.4 34 20 28.2 10.6 34 13 22.6 5 15l10.6-1.7Z"
            fill={`url(#${gradId})`}
          />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-lg">
          <defs>{gradient}</defs>
          <path
            d="M11.5 28a6 6 0 01-1-11.9 8 8 0 0115.4-3A7 7 0 0134 26.7 5.5 5.5 0 0130.5 28h-19Z"
            fill={`url(#${gradId})`}
          />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-lg">
          <defs>{gradient}</defs>
          <path
            d="M32 20L37 20M28.5 28.5L32 32M20 32L20 37M11.5 28.5L8 32M8 20L3 20M11.5 11.5L8 8M20 8L20 3M28.5 11.5L32 8"
            stroke={color}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle
            cx="20"
            cy="20"
            r="9.5"
            fill={`url(#${gradId})`}
          />
        </svg>
      );
    case "circle":
    default:
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-lg">
          <defs>{gradient}</defs>
          <circle
            cx="20"
            cy="20"
            r="16"
            fill={`url(#${gradId})`}
          />
        </svg>
      );
  }
}

export function WireDivider({
  color,
  beadColor,
  shape = "circle",
  reverse = false,
}: {
  color: string;
  beadColor?: string;
  shape?: Shape;
  reverse?: boolean;
}) {
  const bead = beadColor ?? color;
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Klocek ma się pojawić dopiero, gdy użytkownik faktycznie zacznie scrollować
  // — nie od razu po wejściu na stronę, nawet jeśli ten odcinek drutu jest już
  // (częściowo) w widoku przy pierwszym renderze.
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    if (window.scrollY > 0) {
      setHasScrolled(true);
      return;
    }
    const onScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xUnits = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [W, 0] : [0, W]
  );
  const left = useTransform(xUnits, (v) => `${(v / W) * 100}%`);
  const top = useTransform(xUnits, (v) => wireY(v));
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

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative -mb-6 h-[200px] w-full overflow-hidden sm:-mb-8"
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
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{
              left,
              top,
              opacity: hasScrolled ? glowOpacity : 0,
              backgroundColor: bead,
              width: 30,
              height: 30,
            }}
          />
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left, top, opacity: hasScrolled ? opacity : 0 }}
          >
            <Bead shape={shape} color={bead} />
          </motion.div>
        </>
      )}
    </div>
  );
}
