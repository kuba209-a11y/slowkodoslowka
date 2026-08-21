import Image from "next/image";
import { GraduationCap, HeartHandshake, Target } from "lucide-react";
import { stockPhotos } from "@/lib/images";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

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
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-butter">
              <Image
                src={stockPhotos.aboutColoring.src}
                alt={stockPhotos.aboutColoring.alt}
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover"
              />
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
      </div>
    </section>
  );
}
