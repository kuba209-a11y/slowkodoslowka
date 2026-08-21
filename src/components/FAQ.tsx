"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { Reveal } from "./Reveal";

const chipColors = ["bg-cobalt", "bg-sky", "bg-butter", "bg-periwinkle"];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-cobalt px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-ink">
            Najczęstsze pytania
          </span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Warto wiedzieć{" "}
            <span className="font-accent italic text-sky-deep">przed wizytą</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const chip = chipColors[index % chipColors.length];
            return (
              <Reveal key={item.q} delay={index * 0.05}>
                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-4 text-left"
                    >
                      <span className="font-display text-lg font-semibold text-ink">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${chip} text-ink transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
