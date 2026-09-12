"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const method = methods[index];

  function go(next: number) {
    if (next === index) return;
    setSlide([next, next > index ? 1 : -1]);
  }

  return (
    <section id="metoda" className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-card">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-8 py-6 sm:px-12">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-deep">
              <span aria-hidden="true" className="block h-px w-7 bg-cobalt-deep" />
              Metoda wspomagająca
            </span>

            <div className="flex items-center gap-2">
              <div
                role="tablist"
                aria-label="Wybierz metodę wspomagającą"
                className="inline-flex gap-1 rounded-full bg-paper-dim p-1"
              >
                {methods.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => go(i)}
                    className={`min-h-11 rounded-full px-5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
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
              className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-20 lg:p-16"
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
                <h2 className="text-balance font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]">
                  {method.title}
                  <br />
                  <span className="font-accent text-cobalt-deep">{method.accent}</span>
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                  {method.description}
                </p>

                {/* Siatka 2×2 rozdzielona włosowymi liniami - kolor tła siatki
                    prześwituje przez 1px odstępy między komórkami. */}
                <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2">
                  {method.benefits.map((b, i) => (
                    <motion.div
                      key={b.number}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-4 bg-card p-6 sm:p-8"
                    >
                      <span
                        aria-hidden="true"
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-semibold ${b.chip}`}
                      >
                        {b.number}
                      </span>
                      <p className="text-pretty text-lg font-semibold leading-snug text-ink">
                        {b.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 pb-8">
          {methods.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-label={`Pokaż metodę: ${m.tab}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep ${
                i === index ? "w-7 bg-cobalt-deep" : "w-2.5 bg-border hover:bg-ink-soft/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
