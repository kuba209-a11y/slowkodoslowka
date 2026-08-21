import { RevealGroup, RevealItem } from "./Reveal";

const steps = [
  {
    number: "01",
    bg: "bg-cobalt",
    ink: "text-cobalt-ink",
    title: "Wywiad i diagnoza",
    text: "Wnikliwy wywiad oraz analiza indywidualnych potrzeb pacjenta — podstawa doboru dalszych metod.",
  },
  {
    number: "02",
    bg: "bg-sky",
    ink: "text-sky-ink",
    title: "Indywidualny plan terapii",
    text: "Dobór metod diagnostycznych i terapeutycznych dopasowanych do wieku i rodzaju trudności.",
  },
  {
    number: "03",
    bg: "bg-butter",
    ink: "text-butter-ink",
    title: "Regularne spotkania",
    text: "Cykliczne ćwiczenia (45 min) w spokojnej atmosferze, sprzyjającej trwałym efektom.",
  },
];

export function Process() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-cobalt px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cobalt-ink">
            Jak przebiega terapia
          </span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Trzy kroki do{" "}
            <span className="font-accent italic text-cobalt-deep">pewnej mowy</span>
          </h2>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <RevealItem
              key={step.number}
              className="rounded-[1.75rem] border border-border bg-card p-7 transition-transform hover:-translate-y-1"
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${step.bg} ${step.ink} font-display text-sm font-semibold`}
              >
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
