import { Car, GraduationCap, HeartHandshake, ImageIcon, Target } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const areas = [
  "Diagnoza i terapia zaburzeń mowy u dzieci i młodzieży",
  "Korekcja wad wymowy u dzieci i młodzieży",
  "Terapia osób z afazją po udarze (z dojazdem do pacjenta)",
  "Zabiegi elektrostymulacji mięśni twarzy",
];

const points = [
  {
    mark: GraduationCap,
    bg: "bg-cobalt",
    ink: "text-cobalt-ink",
    title: "Wieloletnie doświadczenie",
    text: "Nauczyciel i logopeda pracujący z dziećmi, młodzieżą i osobami dorosłymi od wielu lat.",
  },
  {
    mark: Target,
    bg: "bg-sky",
    ink: "text-sky-ink",
    title: "Indywidualne podejście",
    text: "Dobór metod zawsze poprzedzony wnikliwym wywiadem i analizą potrzeb pacjenta.",
  },
  {
    mark: HeartHandshake,
    bg: "bg-butter",
    ink: "text-butter-ink",
    title: "Bezpieczeństwo i komfort",
    text: "Poczucie bezpieczeństwa sprzyja współpracy i trwałości efektów terapii.",
  },
];

export function About() {
  return (
    <section id="o-mnie" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden rounded-[2.5rem] border-2 border-dashed border-periwinkle bg-butter/60 px-6 text-center">
              <ImageIcon aria-hidden="true" className="h-10 w-10 text-periwinkle-ink/60" strokeWidth={1.5} />
              <span className="font-display text-sm font-semibold text-periwinkle-ink/70">
                miejsce na zdj. Edyty
              </span>
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 flex h-20 w-20 -rotate-6 items-center justify-center rounded-full bg-periwinkle text-3xl text-periwinkle-ink shadow-lg"
            >
              ❁
            </span>
          </Reveal>

          <div>
            <span className="inline-flex items-center rounded-full bg-cobalt px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-ink">
              O mnie
            </span>
            <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Poznajmy się —{" "}
              <span className="font-accent italic text-periwinkle-deep">jestem Edyta</span>
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Nauczyciel, logopeda z wieloletnim doświadczeniem. Pracuję
              zarówno z dziećmi, młodzieżą, jak i osobami dorosłymi, mającymi
              trudności z opóźnionym rozwojem mowy, wadami wymowy, dyslalią,
              alalią i afazją czy nauką czytania.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              W swojej pracy wykorzystuję metodę elektrostymulacji,
              wspomagającą pobudzanie i wzmacnianie mięśni sfery
              ustno-twarzowej. Dbam o to, aby pacjent czuł się
              bezpiecznie i komfortowo — to fundament trwałych efektów terapii.
            </p>

            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
              {points.map((point) => (
                <RevealItem
                  key={point.title}
                  className={`rounded-2xl ${point.bg} p-5 transition-transform hover:-translate-y-1`}
                >
                  <point.mark aria-hidden="true" className={`h-7 w-7 ${point.ink}`} strokeWidth={1.75} />
                  <h3 className={`mt-3 font-display text-base font-semibold ${point.ink}`}>
                    {point.title}
                  </h3>
                  <p className={`mt-1.5 text-sm leading-relaxed ${point.ink} opacity-90`}>
                    {point.text}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <RevealItem className="mt-10 rounded-[2rem] border border-border bg-card p-8 sm:p-10">
          <h3 className="font-display text-xl font-semibold text-ink">
            W swojej pracy zajmuję się:
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <li key={area} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cobalt-deep" />
                <span className="text-ink-soft leading-relaxed">{area}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-2 text-sm text-ink-soft">
            <Car className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-deep" strokeWidth={1.75} />
            Dla osób dorosłych możliwy jest dojazd do pacjenta.
          </p>
        </RevealItem>
      </div>
    </section>
  );
}
