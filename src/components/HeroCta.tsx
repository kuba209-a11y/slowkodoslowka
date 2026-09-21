"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { business } from "@/lib/content";

// Przyciski "Zadzwoń / Umów wizytę" na telefonie i tablecie (od lg te same
// akcje stoją na stałe w headerze).
//
// Na starcie stoją w hero pod claimem. Po pierwszym ruchu scrolla te same
// przyciski przelatują na dół ekranu i zostają tam jako przyklejony pasek —
// to jedna para elementów przenoszona między dwoma miejscami (wspólny
// layoutId), a nie dwie osobne kopie. Po powrocie na samą górę strony
// wracają do hero, żeby w pierwszym widoku nie została po nich dziura.

// Ile pikseli trzeba przewinąć, żeby przyciski odleciały do paska.
const DOCK_AFTER = 40;

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getDocked = () => window.scrollY > DOCK_AFTER;
// Na serwerze (i przy hydracji) przyciski są zawsze w hero.
const getDockedOnServer = () => false;

const subscribeNothing = () => () => {};
const isClient = () => true;
const isServer = () => false;

function Buttons({ place, transition }: { place: "hero" | "bar"; transition: Transition }) {
  // Ten sam rozmiar w obu miejscach — w locie przyciski tylko się
  // przesuwają, bez rozciągania. Drugorzędny przycisk w hero jest jasny
  // (kolor karty na tle strony), a w pasku odcina się od tła pigułki.
  const callSurface = place === "hero" ? "bg-card" : "bg-paper-dim";
  // borderRadius w style, a nie w klasie: framer koryguje go wtedy przy
  // skalowaniu, więc zaokrąglenie nie "rozjeżdża się" w trakcie lotu.
  // Treść w motion.span z layout="position" — bez tego tekst i ikona
  // byłyby ściskane razem z przyciskiem.
  return (
    <>
      <motion.a
        layoutId="cta-call"
        transition={transition}
        href={business.phoneHref}
        style={{ borderRadius: 9999 }}
        className={`inline-flex min-h-12 flex-1 items-center justify-center border border-border text-base font-semibold text-ink active:scale-[0.97] ${callSurface}`}
      >
        <motion.span layout="position" transition={transition} className="inline-flex items-center gap-2">
          <Phone className="h-4 w-4 text-cobalt-deep" strokeWidth={2.2} />
          Zadzwoń
        </motion.span>
      </motion.a>
      <motion.a
        layoutId="cta-book"
        transition={transition}
        href="#kontakt"
        style={{ borderRadius: 9999 }}
        className="inline-flex min-h-12 flex-1 items-center justify-center border border-ink bg-ink text-base font-semibold text-paper active:scale-[0.97]"
      >
        <motion.span layout="position" transition={transition} className="inline-flex items-center gap-2">
          <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
          Umów wizytę
        </motion.span>
      </motion.a>
    </>
  );
}

export function HeroCta() {
  const docked = useSyncExternalStore(subscribeScroll, getDocked, getDockedOnServer);
  const mounted = useSyncExternalStore(subscribeNothing, isClient, isServer);
  const reduceMotion = useReducedMotion();

  const flight: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  return (
    <>
      {/* Miejsce w hero trzyma swoją wysokość także wtedy, gdy przyciski są
          w pasku — inaczej treść pod spodem podskakiwałaby w trakcie scrolla.
          Wyrównane do lewej krawędzi claimu i podpisu. */}
      {/* Na telefonie, gdy przyciski odlecą do paska, slot zwija się do zera
          (a hero skraca się o tyle samo — reguła :has w globals.css), bo
          inaczej zostawała po nich pusta dziura 80px (48px slotu + 32px
          marginesu) tuż przed falbanką. Zwijanie jest animowane tylko przy
          dokowaniu; powrót na górę strony przywraca slot natychmiast, żeby
          przyciski miały gdzie wylądować. */}
      <div
        data-cta-slot=""
        data-docked={docked}
        className="mt-8 flex min-h-12 gap-2.5 sm:max-w-md lg:hidden max-sm:data-[docked=true]:mt-0 max-sm:data-[docked=true]:min-h-0 max-sm:data-[docked=true]:transition-[margin-top,min-height] max-sm:data-[docked=true]:duration-300 max-sm:data-[docked=true]:ease-out"
      >
        {!docked && <Buttons place="hero" transition={flight} />}
      </div>

      {/* Pasek renderowany w <body> przez portal: przodkowie w hero mają
          transformacje (animacje wejścia), które zamieniłyby position:fixed
          w pozycjonowanie względem nich, a nie ekranu. */}
      {mounted &&
        createPortal(
          <div
            inert={!docked}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="relative mx-auto max-w-md">
              {/* Tło pigułki pojawia się osobno, trochę po przyciskach — gdyby
                  przyciski były w nim zagnieżdżone, dziedziczyłyby jego
                  przezroczystość i w locie byłyby niewidoczne. */}
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={docked ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, delay: docked ? 0.2 : 0 }
                }
                className="absolute inset-0 rounded-full border border-border bg-card/95 shadow-[0_14px_36px_-14px_rgba(27,32,68,0.5)] backdrop-blur-sm"
              />
              <div className={`relative flex gap-2 p-2 ${docked ? "pointer-events-auto" : ""}`}>
                {docked && <Buttons place="bar" transition={flight} />}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
