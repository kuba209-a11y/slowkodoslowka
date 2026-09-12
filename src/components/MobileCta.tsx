"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { business } from "@/lib/content";

// Przyklejony pasek szybkiego kontaktu — tylko na telefonie i tablecie.
// Od lg te same akcje stoją na stałe w headerze, więc pasek byłby duplikatem.
//
// Pojawia się dopiero po zjechaniu z hero (tam CTA jest już w treści) i chowa
// się, gdy użytkownik dociera do sekcji kontaktowej — tam ma pod ręką
// formularz i pełne dane, a pasek tylko zasłaniałby pola.
export function MobileCta() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Obserwujemy sekcję kontaktu ORAZ stopkę: sama sekcja kontaktu ma ~1800px,
    // więc przy stopce dawno wyjechałaby z ekranu i pasek wróciłby, zasłaniając
    // dane teleadresowe na samym dole.
    const targets = [
      document.getElementById("kontakt"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setContactInView(visible.size > 0);
      },
      { rootMargin: "0px 0px -35% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const show = scrolledPastHero && !contactInView;

  return (
    <div
      // inert wyłącza ukryty pasek również z nawigacji klawiaturą — samo
      // opacity-0 zostawiłoby w tabulacji dwa niewidoczne linki.
      inert={!show}
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 lg:hidden ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-border bg-card/95 p-2 shadow-[0_14px_36px_-14px_rgba(27,32,68,0.5)] backdrop-blur-sm">
        <a
          href={business.phoneHref}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-paper-dim text-sm font-semibold text-ink transition-transform active:scale-[0.97]"
        >
          <Phone className="h-4 w-4 text-cobalt-deep" strokeWidth={2.2} />
          Zadzwoń
        </a>
        <a
          href="#kontakt"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-paper transition-transform active:scale-[0.97]"
        >
          <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
          Umów wizytę
        </a>
      </div>
    </div>
  );
}
