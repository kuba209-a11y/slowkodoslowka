import Image from "next/image";
import { stockPhotos } from "@/lib/images";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

// Cztery korzyści z elektrostymulacji — kolejność i treść z materiału
// źródłowego gabinetu. Każda dostaje inny kolor "kafelka" z numerem, żeby
// siatka czytała się jak lista kroków, a nie jednolita ściana tekstu.
const benefits = [
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
    text: "Angażuję mięśnie do większej pracy",
  },
];

export function Method() {
  return (
    <section id="metoda" className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-border bg-card">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16">
          {/* Zdjęcie urządzenia na tle białego koła i miękkiej poświaty
              w kolorach marki — odpowiednik kolorowego pierścienia
              z materiału źródłowego, przełożony na paletę projektu. */}
          <Reveal className="relative mx-auto grid aspect-square w-full max-w-[420px] place-items-center">
            <div
              aria-hidden="true"
              className="absolute inset-[6%] rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, var(--color-lavender) 0%, transparent 62%), radial-gradient(circle at 72% 78%, var(--color-gold) 0%, transparent 60%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-[13%] rounded-full bg-paper shadow-[0_28px_70px_-34px_rgba(20,70,210,0.45)]"
            />
            <div className="relative aspect-[3/4] w-[62%] overflow-hidden rounded-[28px] bg-paper-dim">
              <Image
                src={stockPhotos.therapySession.src}
                alt={stockPhotos.therapySession.alt}
                fill
                sizes="(min-width: 1024px) 260px, 200px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-deep">
                <span aria-hidden="true" className="block h-px w-7 bg-cobalt-deep" />
                Metoda wspomagająca
              </span>
              <h2 className="text-balance mt-5 font-display text-3xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-[3.25rem]">
                Elektrostymulator —
                <br />
                <span className="font-accent text-cobalt-deep">
                  w czym może pomóc?
                </span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                Łagodne impulsy pobudzają i wzmacniają mięśnie sfery
                ustno-twarzowej. Uzupełnienie klasycznej terapii logopedycznej.
              </p>
            </Reveal>

            {/* Siatka 2×2 rozdzielona włosowymi liniami — kolor tła siatki
                prześwituje przez 1px odstępy między komórkami. */}
            <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2">
              {benefits.map((b) => (
                <RevealItem
                  key={b.number}
                  className="flex flex-col gap-4 bg-card p-6 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-semibold ${b.chip}`}
                  >
                    {b.number}
                  </span>
                  <p className="text-pretty font-semibold leading-snug text-ink">
                    {b.text}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
