import { pricing } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const styles = [
  { bg: "bg-cobalt", ink: "text-cobalt-ink", chip: "bg-card/70" },
  { bg: "bg-sky", ink: "text-sky-ink", chip: "bg-card/70" },
  { bg: "bg-periwinkle", ink: "text-periwinkle-ink", chip: "bg-card/70" },
  { bg: "bg-butter", ink: "text-butter-ink", chip: "bg-card/70" },
];

export function Offer() {
  return (
    <section id="oferta" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-butter px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-butter-ink">
              Oferta i cennik
            </span>
            <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Przejrzyste zasady,{" "}
              <span className="font-accent italic text-cobalt-deep">bez niespodzianek</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Dokładny plan terapii i liczbę spotkań ustalam indywidualnie po
            pierwszej wizycie diagnostycznej.
          </p>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((group, i) => {
            const s = styles[i % styles.length];
            return (
              <RevealItem
                key={group.group}
                className={`flex flex-col rounded-[2rem] ${s.bg} p-7`}
              >
                <h3 className={`font-display text-xl font-semibold ${s.ink}`}>
                  {group.group}
                </h3>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className={`flex items-baseline justify-between gap-4 rounded-xl ${s.chip} px-4 py-3`}
                    >
                      <span className={`text-sm leading-snug ${s.ink} opacity-90`}>
                        {item.label}
                      </span>
                      <span className={`whitespace-nowrap font-display text-lg font-semibold ${s.ink}`}>
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-ink p-8 text-paper sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="font-display text-xl font-semibold">
                Gotowi na pierwszy krok?
              </h3>
              <p className="mt-1 text-sm text-paper/70">
                Umów diagnozę i konsultację — poznamy potrzeby i zaplanujemy
                dalszą terapię.
              </p>
            </div>
            <a
              href="#kontakt"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-butter px-7 text-base font-semibold text-butter-ink transition-transform hover:-translate-y-0.5"
            >
              Umów wizytę
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
