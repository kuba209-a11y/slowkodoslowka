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

export function Offer() {
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

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((group, i) => {
            const s = styles[i % styles.length];
            return (
              <RevealItem
                key={group.group}
                className={`flex flex-col rounded-[2rem] ${s.bg} p-6 sm:p-8`}
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
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-stretch justify-between gap-5 rounded-[2rem] bg-ink p-6 text-paper sm:flex-row sm:items-center sm:p-10">
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
