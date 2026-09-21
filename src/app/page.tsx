import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Method } from "@/components/Method";
import { Process } from "@/components/Process";
import { Offer } from "@/components/Offer";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WireDivider } from "@/components/WireDivider";

export default function Home() {
  return (
    <>
      <Header />
      {/* overflow-x-clip to bezpiecznik przed dekoracjami wychodzącymi poza
          kadr: kafelki hero muszą mieć overflow-visible (medaliony wystają nad
          górną krawędź), więc plama w rogu kafelka "Elektrostymulacja"
          (-right-8) wypychała poziomy pasek przewijania. Wariant "clip"
          zamiast "hidden" nie tworzy kontenera przewijania, więc nie psuje
          sticky headera ani animacji powiązanych ze scrollem. */}
      <main id="main" className="flex-1 overflow-x-clip">
        <Hero />
        <WireDivider
          color="color-mix(in srgb, var(--color-cobalt) 55%, var(--color-cobalt-deep) 45%)"
          beadColor="var(--color-cobalt-deep)"
          shape="circle"
          // Na telefonie sama linia siedzi ~33px pod górną krawędzią tego
          // paska (SVG ma pustą górę) — podciągamy go w dół hero, żeby
          // odstęp od ostatniego elementu hero nie był dodatkowo powiększony.
          className="-mt-6 sm:mt-0"
        />
        <About />
        <WireDivider
          color="color-mix(in srgb, var(--color-periwinkle) 55%, var(--color-periwinkle-deep) 45%)"
          beadColor="var(--color-periwinkle-deep)"
          shape="star"
          reverse
          // Sekcja "Metoda" ma dużo mniejszy górny padding niż "O mnie" ma
          // dolny, więc bez korekty drut wypada za wysoko (za duży odstęp od
          // górnego kafelka, za mały od dolnego) — podciągamy go w górę.
          className="-mt-[48px] sm:-mt-[88px] mb-[8px]! sm:mb-0!"
        />
        <Method />
        <Process />
        <WireDivider
          color="color-mix(in srgb, var(--color-gold) 55%, var(--color-gold-deep) 45%)"
          beadColor="var(--color-gold-deep)"
          shape="sun"
        />
        <Offer />
        <FAQ />
        <WireDivider
          color="color-mix(in srgb, var(--color-lavender) 55%, var(--color-lavender-deep) 45%)"
          beadColor="var(--color-lavender-deep)"
          shape="cloud"
          reverse
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
