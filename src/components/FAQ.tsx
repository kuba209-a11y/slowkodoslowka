"use client";

import { useState, useSyncExternalStore } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { Reveal } from "./Reveal";

const chipColors = ["bg-cobalt", "bg-lavender", "bg-gold", "bg-periwinkle"];

// Próg sm z Tailwinda (40rem) — poniżej niego jest wersja telefonowa.
const SM_UP = "(min-width: 40rem)";
function subscribeViewport(onChange: () => void) {
  const mq = window.matchMedia(SM_UP);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getIsMobile = () => !window.matchMedia(SM_UP).matches;
// Serwer (i hydracja) renderuje stan desktopowy — pierwsze pytanie otwarte.
const getIsMobileOnServer = () => false;

export function FAQ() {
  const isMobile = useSyncExternalStore(subscribeViewport, getIsMobile, getIsMobileOnServer);
  // undefined = użytkownik jeszcze nic nie kliknął. Na desktopie startowo
  // otwarte jest pierwsze pytanie, na telefonie wszystkie są zwinięte —
  // lista pytań to spis treści, a jedna otwarta odpowiedź dokładała ~200px.
  const [picked, setPicked] = useState<number | null | undefined>(undefined);
  const openIndex = picked === undefined ? (isMobile ? null : 0) : picked;

  return (
    <section id="faq" className="px-4 pt-8 pb-14 sm:px-6 sm:pt-14 sm:pb-28">
      {/* Dane strukturalne FAQPage — kwalifikują sekcję do rich snippets
          w wynikach wyszukiwania Google, bez ingerencji w treść widoczną
          dla użytkownika. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-cobalt px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-ink">
            Najczęstsze pytania
          </span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Co warto wiedzieć{" "}
            <span className="font-accent text-cobalt-deep">przed wizytą?</span>
          </h2>
        </div>

        {/* Telefon: zamiast 7 osobnych kart (~910px) jedna zwarta karta-lista
            z pytaniami rozdzielonymi linią — ten sam język co "Trzy kroki"
            i punkty w "O mnie". Celowo nie karuzela: FAQ się skanuje w
            poszukiwaniu swojego pytania, a karuzela pokazywałaby jedno
            naraz. Warianty max-sm: — od sm układ bez zmian. */}
        <div className="mt-12 flex flex-col gap-3 max-sm:mt-8 max-sm:gap-0 max-sm:rounded-[1.75rem] max-sm:border max-sm:border-border max-sm:bg-card max-sm:px-4">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const chip = chipColors[index % chipColors.length];
            return (
              <Reveal
                key={item.q}
                delay={index * 0.05}
                className="max-sm:border-b max-sm:border-border/60 max-sm:last:border-b-0"
              >
                <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card max-sm:overflow-visible max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setPicked(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-4 text-left max-sm:min-h-14 max-sm:gap-3 max-sm:px-0 max-sm:py-3"
                    >
                      <span className="font-display text-lg font-semibold text-ink max-sm:leading-snug max-sm:[text-wrap:pretty]">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center max-sm:h-8 max-sm:w-8 justify-center rounded-full ${chip} text-ink transition-transform duration-300 ${
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
                      <p className="px-6 pb-5 leading-relaxed text-ink-soft max-sm:px-0 max-sm:pb-4">
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
