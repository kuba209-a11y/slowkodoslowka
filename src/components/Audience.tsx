import Image from "next/image";
import { ArrowUpRight, Car, PlugZap } from "lucide-react";
import { stockPhotos } from "@/lib/images";
import { RevealGroup, RevealItem } from "./Reveal";

const areas = [
  "Diagnoza i terapia zaburzeń mowy u dzieci i młodzieży",
  "Korekcja wad wymowy u dzieci i młodzieży",
  "Terapia osób z afazją po udarze (z dojazdem do pacjenta)",
  "Zabiegi elektrostymulacji mięśni twarzy",
];

const cards = [
  {
    tag: "3–18 lat",
    title: "Dzieci i młodzież",
    description:
      "Opóźniony rozwój mowy, wady wymowy, dyslalia, trudności z nauką czytania — zajęcia w przyjaznej atmosferze, dopasowane do tempa dziecka.",
    bg: "bg-cobalt",
    ink: "text-cobalt-ink",
    photo: stockPhotos.kidsBlueJacket,
    big: true,
  },
  {
    tag: "Dorośli",
    title: "Powrót do mowy",
    description:
      "Terapia afazji po udarze — z możliwością dojazdu do pacjenta, korekcja wad wymowy i wsparcie w powrocie do sprawnej komunikacji.",
    bg: "bg-sky",
    ink: "text-sky-ink",
    photo: stockPhotos.adultsTalking,
  },
  {
    tag: "Zabieg",
    title: "Elektrostymulacja",
    description:
      "Wspomaganie terapii poprzez pobudzanie i wzmacnianie mięśni sfery ustno-twarzowej — dostępne osobno lub razem z ćwiczeniami.",
    bg: "bg-butter",
    ink: "text-butter-ink",
    photo: null,
  },
];

export function Audience() {
  return (
    <section id="dla-kogo" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-periwinkle px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-periwinkle-ink">
            Dla kogo
          </span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Terapia dopasowana do{" "}
            <span className="font-accent italic text-cobalt-deep">każdego wieku</span>
          </h2>
        </div>

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {cards.map((card) => (
            <RevealItem
              key={card.title}
              className={`group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[2rem] ${card.bg} p-7 sm:p-8 ${
                card.big
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0"
                  : "lg:min-h-0"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`rounded-full bg-card/70 px-3 py-1 text-xs font-semibold ${card.ink}`}>
                  {card.tag}
                </span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card/70 ${card.ink} transition-transform group-hover:rotate-45`}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div
                className={`flex flex-1 items-center gap-6 ${
                  card.big ? "flex-col sm:flex-row" : "flex-col"
                }`}
              >
                {card.photo ? (
                  <div
                    className={`relative shrink-0 overflow-hidden rounded-full ring-4 ring-card/70 ${
                      card.big ? "h-36 w-36 sm:h-44 sm:w-44" : "h-28 w-28"
                    }`}
                  >
                    <Image
                      src={card.photo.src}
                      alt={card.photo.alt}
                      fill
                      sizes={card.big ? "176px" : "112px"}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span
                    aria-hidden="true"
                    className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-card/40 ${card.ink}`}
                  >
                    <PlugZap className="h-11 w-11" strokeWidth={1.5} />
                  </span>
                )}

                <div className={card.big ? "text-center sm:text-left" : "text-center"}>
                  <h3 className={`font-display text-2xl font-semibold leading-tight sm:text-[1.7rem] ${card.ink}`}>
                    {card.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${card.ink} opacity-85`}>
                    {card.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealItem className="mt-6 rounded-[2rem] border border-border bg-card p-8 sm:p-10">
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
