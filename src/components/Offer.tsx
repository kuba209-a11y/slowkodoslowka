"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { pricing } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const styles = [
  { bg: "bg-cobalt", ink: "text-cobalt-ink", chip: "bg-card/70" },
  { bg: "bg-lavender", ink: "text-lavender-ink", chip: "bg-card/70" },
  { bg: "bg-periwinkle", ink: "text-periwinkle-ink", chip: "bg-card/70" },
  { bg: "bg-gold", ink: "text-gold-ink", chip: "bg-card/70" },
];

// Etykiety z dopiskiem czasu trwania (np. "(45 min)") łamały się w połowie
// ("min" spadało do kolejnej linii) - wydzielamy ten fragment na osobny,
// nierozdzielny wiersz.
function renderLabel(label: string) {
  const match = label.match(/^(.*) (\(\d+ min\))$/);
  if (!match) return label;
  const [, main, duration] = match;
  return (
    <>
      {main}
      <br />
      <span className="whitespace-nowrap">{duration}</span>
    </>
  );
}

// Nachodząca karuzela (tylko telefon): aktywna karta na wierzchu, sąsiednie
// leżą pod nią i wystają z boków o NEIGHBOR_PEEK. Dalsze karty są schowane.
const NEIGHBOR_PEEK = 44; // ile px następna karta wystaje spod aktywnej (z prawej)
// Aktywna karta stoi przy lewym marginesie strony (16px, równo z nagłówkiem),
// więc poprzednia wystaje z lewej tylko w tym marginesie.
const PREV_PEEK = 16;

const COUNT = pricing.length;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const isCarousel = () => !window.matchMedia("(min-width: 640px)").matches && COUNT > 1;

// Na telefonie (poniżej sm) cztery karty cennika jeden pod drugim zajmowały
// ~2200px — tam są karuzelą, w której karty nachodzą na siebie: aktywna na
// wierzchu, poprzednia wystaje spod niej z lewej, następna z prawej. Przy
// przesuwaniu górna karta jedzie w lewo, a ta z prawej wysuwa się na
// wierzch.
//
// Ruchem steruje wyłącznie jedna wartość `pos` (pozycja w kartach, ułamkowo):
// przeciąganie palcem ustawia ją na bieżąco, a puszczenie / kropka animuje
// ją sprężyną do najbliższej karty. Wcześniej pod spodem był natywny
// scroll-snap, a nachodzenie kart liczone ze zdarzenia scroll — na telefonie
// przewijanie idzie w wątku kompozytora, a zdarzenie scroll przychodzi
// klatkę później, więc w każdej klatce karty najpierw jechały z przewijaniem,
// a potem JS je cofał: drżenie i rozmycie przy każdej zmianie karty. Teraz
// tor się nie przewija (overflow-hidden), a karty przesuwa tylko transform.
// Nawigacja: kropki pod kartami. Od sm w górę ten sam markup układa się
// w dotychczasową siatkę 2 / 4 kolumn — tablet i desktop bez zmian.
export function Offer() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pos = useMotionValue(0);
  const step = useRef(0); // odległość między slotami kart w torze (px)
  const panFrom = useRef(0);
  const dragged = useRef(false);
  const settling = useRef<AnimationPlaybackControls | null>(null);

  // Sloty kart to dzieci RevealGroup (jedynego dziecka toru); wizualna karta
  // jest pierwszym dzieckiem slotu.
  const slots = useCallback(() => {
    const group = trackRef.current?.firstElementChild;
    return group ? (Array.from(group.children) as HTMLElement[]) : [];
  }, []);

  const applyStack = useCallback(() => {
    const list = slots();
    if (list.length === 0) return;
    if (!isCarousel()) {
      // Tablet / desktop: zwykła siatka, żadnych transformacji.
      list.forEach((slot) => {
        const card = slot.firstElementChild as HTMLElement | null;
        slot.style.zIndex = "";
        if (card) {
          card.style.transform = "";
          card.style.opacity = "";
          card.style.willChange = "";
        }
      });
      return;
    }
    // Slot i-tej karty leży i·krok od pierwszego (tor stoi w miejscu), a
    // wizualnie następne karty stoją tylko NEIGHBOR_PEEK od aktywnej,
    // poprzednie PREV_PEEK — transform = pozycja wizualna − pozycja slotu.
    const position = pos.get();
    list.forEach((slot, i) => {
      const card = slot.firstElementChild as HTMLElement | null;
      if (!card) return;
      const d = i - position; // <0: poprzednie (z lewej), >0: następne (z prawej)
      const a = Math.abs(d);
      const peek = d < 0 ? PREV_PEEK : NEIGHBOR_PEEK;
      card.style.transform = `translate3d(${d * peek - i * step.current}px, 0, 0)`;
      // Widać tylko bezpośrednich sąsiadów — dalsze karty gasną za nimi.
      card.style.opacity = a > 1 ? String(Math.max(0, 1 - (a - 1) * 2)) : "";
      card.style.willChange = "transform";
      // Im bliżej wierzchu, tym wyżej; zamiana w połowie przesunięcia.
      slot.style.zIndex = String(1000 - Math.round(a * 100));
    });
  }, [pos, slots]);

  useEffect(() => {
    const measure = () => {
      const list = slots();
      step.current = list.length > 1 ? list[1].offsetLeft - list[0].offsetLeft : 0;
      applyStack();
    };
    measure();
    const unsubscribe = pos.on("change", (v) => {
      applyStack();
      const index = clamp(Math.round(v), 0, COUNT - 1);
      setActive((prev) => (prev === index ? prev : index));
    });
    window.addEventListener("resize", measure);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", measure);
    };
  }, [applyStack, pos, slots]);

  // Dojazd sprężyną do karty; velocity w kartach/s — z palca przy puszczeniu.
  function settle(index: number, velocity = 0) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    settling.current?.stop();
    settling.current = animate(
      pos,
      index,
      reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 34, velocity }
    );
  }

  function goTo(index: number) {
    settle(clamp(index, 0, COUNT - 1));
  }

  return (
    <section id="oferta" className="px-4 py-14 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-ink">
            Oferta i&nbsp;cennik
          </span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Przejrzyste zasady,{" "}
            <span className="font-accent text-cobalt-deep">bez niespodzianek</span>
          </h2>
          {/* Jedna linia mieści się dopiero przy ~700px szerokości tekstu —
              na tablecie (sm = 640px) wymuszanie jej wypychało zdanie poza
              ekran, stąd próg lg zamiast sm. */}
          <p className="mt-4 text-base text-ink-soft lg:whitespace-nowrap">
            Dokładny plan terapii i liczbę spotkań ustalam indywidualnie po pierwszej wizycie diagnostycznej.
          </p>
        </div>

        {/* Zewnętrzny kontener (pełna szerokość ekranu na telefonie) jest
            punktem odniesienia dla cqw — karta ma szerokość ekranu minus
            3.75rem: aktywna zaczyna się przy lewym marginesie strony (pl-4,
            równo z nagłówkiem), a z prawej
            zostaje 44px, w których następna karta wystaje aż do krawędzi
            ekranu (bez pustego marginesu po prawej).
            pb-6 — miejsce na cień (overflow-hidden przycina też w pionie).
            Od sm — zwykły blok, a w środku dotychczasowa siatka. */}
        <div className="@container -mx-4 sm:mx-0">
        {/* touch-pan-y: pionowe przewijanie strony zostaje przeglądarce,
            poziomy ruch palca przejmuje karuzela (tylko telefon). */}
        <motion.div
          ref={trackRef}
          onPointerDown={() => {
            dragged.current = false;
          }}
          onPanStart={() => {
            if (!isCarousel()) return;
            settling.current?.stop();
            panFrom.current = pos.get();
            dragged.current = true;
          }}
          onPan={(_, info) => {
            if (!isCarousel() || !step.current) return;
            let p = panFrom.current - info.offset.x / step.current;
            // Opór za pierwszą i ostatnią kartą.
            if (p < 0) p *= 0.3;
            else if (p > COUNT - 1) p = COUNT - 1 + (p - (COUNT - 1)) * 0.3;
            pos.set(p);
          }}
          onPanEnd={(_, info) => {
            if (!isCarousel() || !step.current) return;
            const velocity = -info.velocity.x / step.current;
            // Rzut z bezwładnością, ale najwyżej jedna karta od startu gestu.
            const from = Math.round(panFrom.current);
            const target = clamp(Math.round(pos.get() + velocity * 0.2), from - 1, from + 1);
            settle(clamp(target, 0, COUNT - 1), velocity);
          }}
          className="relative mt-8 overflow-hidden pl-4 pr-11 pt-1 pb-6 max-sm:touch-pan-y max-sm:touch-pinch-zoom max-sm:select-none sm:mt-12 sm:overflow-visible sm:p-0"
        >
        {/* w-max: grupa ma szerokość wszystkich kart ułożonych w rzędzie —
            z ich pozycji liczony jest krok karuzeli. */}
        <RevealGroup className="flex w-max gap-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {pricing.map((group, i) => {
            const s = styles[i % styles.length];
            return (
              <RevealItem
                key={group.group}
                onClick={() => {
                  // Stuknięcie w kartę wystającą z boku wyciąga ją na wierzch
                  // (ale nie kończące przeciąganie palcem).
                  if (!dragged.current && i !== active) goTo(i);
                }}
                className="relative w-[calc(100cqw-3.75rem)] shrink-0 sm:w-auto"
              >
              <div
                className={`flex h-full flex-col rounded-[2rem] ${s.bg} p-6 shadow-[0_12px_32px_-14px_rgba(27,32,68,0.45)] sm:p-8 sm:shadow-none`}
              >
                <h3 className={`font-display text-2xl font-semibold ${s.ink}`}>
                  {group.group}
                </h3>
                <ul className="mt-5 flex flex-1 flex-col gap-3 sm:mt-7 sm:gap-4">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className={`flex flex-col gap-1.5 rounded-xl ${s.chip} px-4 py-3.5 sm:px-5 sm:py-4`}
                    >
                      <span className={`text-base leading-snug ${s.ink} opacity-90`}>
                        {renderLabel(item.label)}
                      </span>
                      <span className={`font-display text-xl font-semibold ${s.ink}`}>
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        </motion.div>
        </div>

        {/* Kropki pod kartami — tylko na telefonie. Przycisk 44×44px to
            obszar dotyku, widoczna kropka jest w środku. */}
        <div className="flex justify-center gap-1 sm:hidden">
          {pricing.map((group, i) => (
            <button
              key={group.group}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Pokaż cennik: ${group.group}`}
              aria-current={i === active}
              className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep"
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 rounded-full transition-all ${
                  i === active ? "w-7 bg-cobalt-deep" : "w-2.5 bg-border group-hover:bg-ink-soft/40"
                }`}
              />
            </button>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col items-stretch justify-between gap-5 rounded-[2rem] bg-ink p-6 sm:mt-6 text-paper sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="font-display text-2xl font-semibold">
                Gotowi na pierwszy krok?
              </h3>
              <p className="mt-1.5 text-base text-paper/70">
                Umów diagnozę i konsultację - poznamy potrzeby i zaplanujemy
                dalszą terapię.
              </p>
            </div>
            <a
              href="#kontakt"
              className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-full bg-gold px-7 text-base font-semibold text-gold-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:min-h-12"
            >
              Umów wizytę
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
