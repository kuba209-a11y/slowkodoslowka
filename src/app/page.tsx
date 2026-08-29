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
      <main id="main" className="flex-1">
        <Hero />
        <WireDivider
          color="color-mix(in srgb, var(--color-cobalt) 55%, var(--color-cobalt-deep) 45%)"
          beadColor="var(--color-cobalt-deep)"
          shape="circle"
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
