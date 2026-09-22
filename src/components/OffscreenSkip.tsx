"use client";

import { useEffect } from "react";

// Sekcje, których malowanie przeglądarka może pomijać, gdy są daleko poza
// ekranem (hero jest zawsze na starcie widoczny, więc go nie ruszamy).
const SELECTOR = "main > section:not(#hero), footer";

// Telefon: każda klatka rozwijania akordeonu (FAQ, "Trzy kroki", aspekty
// metody) zmienia wysokość strony, a przeglądarka przemalowywała wtedy CAŁY
// dokument (~8000px) — to był główny koszt klatki. content-visibility: auto
// (reguła html.cv-skip w globals.css) pozwala pominąć sekcje poza ekranem:
// w pomiarze ~3× mniej malowania na klatkę.
//
// Haczyk: sekcja pomijana przed pierwszym wyświetleniem ma wysokość "na oko"
// (contain-intrinsic-size), a wtedy linki #kotwice lądowały nawet ~200px obok
// celu. Dlatego po wczytaniu czcionek mierzymy prawdziwą wysokość treści
// każdej sekcji i podajemy ją jako intrinsic size — układ strony jest
// identyczny jak bez pomijania. "auto" sprawia, że po każdym wyrenderowaniu
// przeglądarka i tak zapamiętuje aktualną wysokość. Przy zmianie szerokości
// (obrót telefonu) mierzymy od nowa.
export function OffscreenSkip() {
  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let width = window.innerWidth;

    const apply = () => {
      root.classList.remove("cv-skip");
      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      els.forEach((el) => (el.style.containIntrinsicSize = ""));
      if (window.matchMedia("(min-width: 40rem)").matches) return;
      // Najpierw wszystkie odczyty (jeden przebieg layoutu), potem zapisy.
      // contain-intrinsic-size to rozmiar treści — bez paddingu i obramowania.
      const sizes = els.map((el) => {
        const cs = getComputedStyle(el);
        const extra =
          parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) +
          parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
        return el.getBoundingClientRect().height - extra;
      });
      els.forEach((el, i) => (el.style.containIntrinsicSize = `auto ${sizes[i]}px`));
      root.classList.add("cv-skip");
    };

    // Mierzymy dopiero, gdy strona się ułoży: po czcionkach i po animacjach
    // startowych (np. FAQ na telefonie zwija po hydracji pierwsze pytanie —
    // zmierzona w trakcie sekcja miała ~170px za dużo i link do Kontaktu
    // lądował obok).
    let timer: number | undefined;
    document.fonts.ready.then(() => {
      if (!cancelled) timer = window.setTimeout(apply, 800);
    });
    const onResize = () => {
      if (window.innerWidth === width) return; // pasek adresu w telefonie zmienia tylko wysokość
      width = window.innerWidth;
      apply();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      root.classList.remove("cv-skip");
    };
  }, []);

  return null;
}
