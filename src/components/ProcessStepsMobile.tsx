"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

type Step = {
  number: string;
  bg: string;
  ink: string;
  title: string;
  text: string;
};

// "Trzy kroki" na telefonie: pionowa oś zamiast trzech pełnych kart jedna pod
// drugą (~1000px). Cały proces jest widoczny od razu — numery i tytuły
// połączone przerywaną linią — a opisy rozwijają się po stuknięciu, jak
// w FAQ (otwarty jeden krok naraz, pierwszy na start). Celowo nie karuzela:
// kroki czyta się po kolei, a karuzela pokazywałaby tylko jeden naraz.
export function ProcessStepsMobile({ steps }: { steps: Step[] }) {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className="sm:hidden">
      <ol className="mt-8 rounded-[1.75rem] border border-border bg-card px-5 py-2">
        {steps.map((step, i) => {
          const isOpen = open === i;
          const isLast = i === steps.length - 1;
          const panelId = `krok-${step.number}`;
          return (
            <li key={step.number} className="relative">
              {/* Przerywana linia od środka tego numeru do środka następnego —
                  numery mają tło, więc linia chowa się pod nimi. */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-8 -bottom-8 left-[21px] border-l-2 border-dashed border-border"
                />
              )}
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="relative flex min-h-16 w-full items-center gap-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-deep focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <span
                    className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${step.bg} ${step.ink} font-display text-sm font-semibold`}
                  >
                    {step.number}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold leading-snug text-ink">
                    {step.title}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              {/* Wysokość panelu animuje Framer Motion (do zmierzonej wysokości
                  treści) zamiast przejścia CSS grid-template-rows 0fr/1fr, które
                  na telefonach przycinało. Zamykany i otwierany krok jadą tą
                  samą krzywą, a tekst dodatkowo wjeżdża przez opacity +
                  translate (kompozytor), więc sam ruch wysokości może być
                  spokojniejszy. */}
              <motion.div
                id={panelId}
                role="region"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{ open: { height: "auto" }, closed: { height: 0 } }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {/* Wcięcie = numer (44px) + odstęp (16px), równo z tytułem. */}
                <motion.p
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -6 } }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
                  className="pb-4 pl-[60px] leading-relaxed text-ink-soft"
                >
                  {step.text}
                </motion.p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
