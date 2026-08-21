import Image from "next/image";
import { PlugZap } from "lucide-react";
import { stockPhotos } from "@/lib/images";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const benefits = [
  {
    title: "Korekta wad wymowy",
    text: "Wspomaga pracę nad prawidłową artykulacją głosek.",
  },
  {
    title: "Problemy z połykaniem",
    text: "Pomaga w terapii zaburzeń połykania i nadmiernego ślinienia.",
  },
  {
    title: "Napięcie mięśniowe",
    text: "Reguluje napięcie mięśni warg, języka i podniebienia poprzez łagodne impulsy.",
  },
  {
    title: "Sfera ustno-twarzowa",
    text: "Pobudza i wzmacnia mięśnie odpowiedzialne za mowę.",
  },
];

export function Method() {
  return (
    <section id="metoda" className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-cobalt">
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-10">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-cobalt-ink">
              <PlugZap className="h-3.5 w-3.5" strokeWidth={2.2} />
              Metoda wspomagająca
            </span>
            <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-cobalt-ink sm:text-4xl">
              Elektrostymulacja mięśni sfery ustno-twarzowej
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-cobalt-ink/80">
              Metoda wspomagająca pobudzanie i wzmacnianie mięśni
              ustno-twarzowych — nowoczesne uzupełnienie klasycznej terapii
              logopedycznej, dostępne osobno lub w połączeniu z ćwiczeniami.
            </p>

            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <RevealItem
                  key={b.title}
                  className="rounded-2xl bg-card/70 p-5"
                >
                  <h3 className="font-display text-base font-semibold text-cobalt-ink">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cobalt-ink/80">
                    {b.text}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[2rem]">
            <Image
              src={stockPhotos.motherSonDrawing.src}
              alt={stockPhotos.motherSonDrawing.alt}
              fill
              sizes="280px"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
