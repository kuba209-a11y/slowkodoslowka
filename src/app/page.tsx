import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Audience } from "@/components/Audience";
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
        <Audience />
        <WireDivider
          color="color-mix(in srgb, var(--color-periwinkle) 55%, var(--color-periwinkle-deep) 45%)"
          beadColor="var(--color-periwinkle-deep)"
          shape="star"
          reverse
        />
        <Method />
        <Process />
        <WireDivider
          color="color-mix(in srgb, var(--color-butter) 55%, var(--color-butter-deep) 45%)"
          beadColor="var(--color-butter-deep)"
          shape="sun"
        />
        <Offer />
        <FAQ />
        <WireDivider
          color="color-mix(in srgb, var(--color-sky) 55%, var(--color-sky-deep) 45%)"
          beadColor="var(--color-sky-deep)"
          shape="cloud"
          reverse
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
