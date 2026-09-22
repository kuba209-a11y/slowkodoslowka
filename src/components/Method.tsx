"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { clinicPhotos } from "@/lib/images";
import { Reveal } from "./Reveal";

// Dwie metody wspomagające terapię logopedyczną, przełączane jak karuzela
// (zakładki + strzałki + kropki). Każda ma własny obrazek, nagłówek, opis
// i siatkę 2×2 korzyści — treści z materiałów źródłowych gabinetu.
const methods = [
  {
    id: "elektrostymulacja",
    tab: "Elektrostymulacja",
    title: "Elektrostymulator",
    accent: "w czym może pomóc?",
    description:
      "Łagodne impulsy pobudzają i wzmacniają mięśnie sfery ustno-twarzowej. Jest to uzupełnienie klasycznej terapii logopedycznej.",
    image: clinicPhotos.elektrostymulacja,
    benefits: [
      {
        number: "01",
        chip: "bg-cobalt-deep text-paper",
        text: "Pomoc przy niwelowaniu dysbalansu mięśniowego",
      },
      {
        number: "02",
        chip: "bg-lavender text-lavender-ink",
        text: "Pomoc przy domknięciu ust",
      },
      {
        number: "03",
        chip: "bg-gold text-gold-ink",
        text: "Pomoc przy porażeniu nerwów",
      },
      {
        number: "04",
        chip: "bg-ink text-paper",
        text: "Angażuje mięśnie do większej pracy",
      },
    ],
  },
  {
    id: "mft",
    tab: "Terapia miofunkcyjna",
    title: "Terapia miofunkcyjna",
    accent: "w czym może pomóc?",
    description:
      "Ćwiczenia mięśni twarzy, języka i warg, które porządkują oddychanie, połykanie i pozycję spoczynkową. Praca nad przyczyną, nie tylko nad efektem.",
    image: clinicPhotos.mft,
    benefits: [
      {
        number: "01",
        chip: "bg-cobalt-deep text-paper",
        text: "Nauka oddychania torem nosowym",
      },
      {
        number: "02",
        chip: "bg-lavender text-lavender-ink",
        text: "Prawidłowa pozycja spoczynkowa języka",
      },
      {
        number: "03",
        chip: "bg-gold text-gold-ink",
        text: "Korekta połykania i pracy warg",
      },
      {
        number: "04",
        chip: "bg-ink text-paper",
        text: "Wsparcie efektów leczenia ortodontycznego",
      },
    ],
  },
];

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -36 : 36 }),
};

export function Method() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  // Stan przełącznika "aspekty metody" (tylko telefon) trzymamy tutaj, a nie
  // w slajdzie — przy zmianie metody slajd się montuje od nowa i lokalny stan
  // by się zerował. Otwarte zostaje otwarte po przełączeniu na drugą metodę.
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const method = methods[index];

  function go(next: number) {
    if (next === index) return;
    setSlide([next, next > index ? 1 : -1]);
  }

  return (
    <section id="metoda" className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-card">
        <Reveal>
          {/* Na telefonie nagłówek i przełącznik nie mieszczą się obok siebie
              (same etykiety zakładek to ~400px przy ~310px dostępnej
              szerokości) — układają się więc w kolumnę, a zakładki zajmują
              pełną szerokość w dwóch równych kolumnach. */}
          <div className="flex flex-col items-stretch gap-4 border-b border-border px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-12 sm:py-6">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-deep">
              <span aria-hidden="true" className="block h-px w-7 bg-cobalt-deep" />
              Metoda wspomagająca
            </span>

            <div className="flex items-center gap-2">
              <div
                role="tablist"
                aria-label="Wybierz metodę wspomagającą"
                className="grid flex-1 grid-cols-2 gap-1 rounded-full bg-paper-dim p-1 sm:inline-flex sm:flex-none"
              >
                {methods.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => go(i)}
                    className={`min-h-11 rounded-full px-3 py-2 text-sm font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:px-5 sm:text-base ${
                      i === index
                        ? "bg-cobalt-deep text-paper"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {m.tab}
                  </button>
                ))}
              </div>

              <div className="hidden gap-1.5 sm:flex">
                <button
                  type="button"
                  aria-label="Poprzednia metoda"
                  onClick={() => go((index - 1 + methods.length) % methods.length)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="Następna metoda"
                  onClick={() => go((index + 1) % methods.length)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={method.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 p-5 sm:gap-10 sm:p-12 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-20 lg:p-16"
            >
              {/* Zdjęcie z gabinetu na tle miękkiej poświaty w kolorach marki.
                  Ramka ma tę samą proporcję (5:4) co pliki źródłowe, więc
                  zdjęcie wypełnia ją bez zniekształceń, w całości, wraz z obiema
                  osobami w kadrze. Bez max-w — wypełnia całą kolumnę siatki. */}
              <div className="relative mx-auto w-full">
                <div
                  aria-hidden="true"
                  className="absolute -inset-5 rounded-[2.5rem] opacity-70 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 18% 20%, var(--color-lavender) 0%, transparent 60%), radial-gradient(circle at 82% 85%, var(--color-gold) 0%, transparent 55%)",
                  }}
                />
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] bg-paper-dim shadow-[0_28px_70px_-34px_rgba(20,70,210,0.45)]">
                  <Image
                    src={method.image.src}
                    alt={method.image.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-balance font-display text-3xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]">
                  {method.title}
                  <br />
                  <span className="font-accent text-cobalt-deep">{method.accent}</span>
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
                  {method.description}
                </p>

                {/* Punkty 1-4: od sm siatka 2×2 rozdzielona włosowymi liniami (kolor
                    tła siatki prześwituje przez 1px odstępy) — bez zmian.
                    Na telefonie 4 wysokie kafelki (594px) chowają się pod jednym
                    przełącznikiem "Aspekty metody", a po rozwinięciu są
                    zwartymi wierszami (numer + tekst). Jeden przełącznik zamiast
                    kolejnej karuzeli (metody przełącza się już kropkami) czy
                    czterech osobnych akordeonów. Panel to ten sam wzorzec
                    grid-rows 0fr/1fr co w FAQ. Od sm zewnętrzna siatka ma jeden
                    wiersz auto, więc układ jest taki jak dawniej. */}
                <div className="mt-6 sm:mt-10">
                  <button
                    type="button"
                    onClick={() => setBenefitsOpen((v) => !v)}
                    aria-expanded={benefitsOpen}
                    aria-controls="aspekty-metody"
                    className="flex min-h-14 w-full items-center justify-between gap-3 rounded-[1.25rem] border border-border bg-paper-dim px-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep sm:hidden"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-cobalt-deep text-xs font-semibold text-paper"
                      >
                        {method.benefits.length}
                      </span>
                      <span className="font-display text-lg font-semibold text-ink">
                        Aspekty metody
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 ${
                        benefitsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Telefon: panel bez animowania wysokości (ta przemalowywała
                      całą stronę w każdej klatce i przycinała) — otwiera się od
                      razu, a treść wjeżdża przez opacity + translate (panel-in
                      z globals.css). Od sm panel jest zawsze widoczny. */}
                  <div
                    id="aspekty-metody"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      benefitsOpen ? "max-sm:animate-[panel-in_280ms_ease-out]" : "max-sm:hidden"
                    }`}
                  >
                    <div className="min-h-0 max-sm:overflow-hidden">
                      <div className="max-sm:pt-3">
                        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2">
                          {method.benefits.map((b, i) => (
                            <motion.div
                              key={b.number}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                              className="flex flex-col gap-4 bg-card p-6 sm:p-8 max-sm:flex-row max-sm:items-center max-sm:gap-3 max-sm:px-4 max-sm:py-3"
                            >
                              <span
                                aria-hidden="true"
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-semibold max-sm:h-8 max-sm:w-8 max-sm:rounded-lg max-sm:text-xs ${b.chip}`}
                              >
                                {b.number}
                              </span>
                              <p className="text-pretty text-lg font-semibold leading-snug text-ink max-sm:text-base max-sm:font-medium">
                                {b.text}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kropki mają 10px wysokości, więc samo <button> byłoby dużo poniżej
            minimum 44×44px dla palca — obszar dotyku daje przezroczysty
            przycisk, a widoczną kropką jest span w środku. */}
        <div className="flex items-center justify-center gap-1 pb-5 sm:pb-6">
          {methods.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-label={`Pokaż metodę: ${m.tab}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep"
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-7 bg-cobalt-deep"
                    : "w-2.5 bg-border group-hover:bg-ink-soft/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
