"use client";

import { useEffect, useRef, useState } from "react";

// Akapit składany "prawie do prawej krawędzi" z łamaniem wierszy liczonym dla
// całego akapitu naraz (uproszczony algorytm Knutha-Plassa, jak w TeX-u /
// InDesignie) — tylko na telefonie.
//
// Przeglądarka łamie wiersze zachłannie (w każdym tyle słów, ile się
// zmieści, bez patrzenia na kolejne), a pełne justowanie w kolumnie ~45
// znaków rozciągało przez to spacje nawet 8× ("dziury"). Zgodnie z zasadami
// składu wąskich łamów spacje mogą tu urosnąć najwyżej o MAX_STRETCH (i
// ścisnąć o SHRINK), litery się nie rozsuwają, a to, czego nie da się
// wyrównać, zostaje jako drobny margines z prawej. Algorytm dobiera podział
// akapitu i dzielenie wyrazów (miękkie łączniki z typeset(), z karą za każdy
// podział) tak, żeby ten margines był jak najmniejszy we wszystkich wierszach.
//
// Tekst wejściowy to wynik typeset(): miękkie łączniki (U+00AD) = miejsca
// dzielenia, twarde spacje (U+00A0) = odstęp bez możliwości złamania
// (sklejone spójniki). Czytniki ekranu dostają oryginalny tekst (sr-only),
// a wiersze są tylko warstwą wizualną. Na serwerze i od sm w górę
// renderujemy zwykły tekst — desktop bez zmian.

// hyph = miękki łącznik (przy złamaniu dopisujemy "-"), dash = łącznik
// w wyrazie ("ustno-twarzowej"), po którym też wolno złamać wiersz.
type Boundary = "space" | "nbsp" | "hyph" | "dash" | "end";
type Piece = { text: string; after: Boundary; w: number };
type Line = { text: string; wordSpacing: number };

const SHRINK = 0.1; // spacja może się zwęzić do 90%
const MAX_STRETCH = 0.3; // i urosnąć najwyżej do 130% szerokości
const SAFETY = 1.5; // px — pomiar canvas różni się od DOM o ułamki piksela
const RAG_UNIT = 0.08; // margines z prawej = 8% kolumny kosztuje tyle, co...
const HYPHEN_PENALTY = 50 * 50; // ...z grubsza jedno dzielenie wyrazu
const DOUBLE_HYPHEN_PENALTY = 12000; // dwa podzielone wiersze pod rząd — tylko w ostateczności

function parse(text: string): Omit<Piece, "w">[] {
  const pieces: Omit<Piece, "w">[] = [];
  let cur = "";
  const push = (after: Boundary) => {
    if (cur) pieces.push({ text: cur, after });
    else if (pieces.length && after !== "hyph") pieces[pieces.length - 1].after = after;
    cur = "";
  };
  const chars = [...text];
  chars.forEach((ch, i) => {
    if (ch === "-" && cur && /\p{L}/u.test(chars[i + 1] ?? "")) {
      cur += ch;
      push("dash");
    } else if (ch === " ") push("space");
    else if (ch === "\u00a0") push("nbsp");
    else if (ch === "\u00ad") push("hyph");
    else cur += ch;
  });
  push("end");
  pieces[pieces.length - 1].after = "end";
  return pieces;
}

// Kawałki sklejone bez spacji (części jednego wyrazu).
const joined = (b: Boundary) => b === "hyph" || b === "dash";

function measureLine(pieces: Piece[], start: number, end: number, space: number, hyphen: number) {
  let boxes = 0;
  let gaps = 0;
  let text = "";
  for (let k = start; k < end; k++) {
    boxes += pieces[k].w;
    text += pieces[k].text;
    if (k < end - 1 && !joined(pieces[k].after)) {
      gaps++;
      text += " ";
    }
  }
  const hyph = pieces[end - 1].after === "hyph";
  if (hyph) text += "-";
  return { natural: boxes + gaps * space + (hyph ? hyphen : 0), gaps, hyph, text };
}

// Koszt wiersza: ściśnięcie / rozciągnięcie spacji i to, co zostaje z prawej.
function badness(natural: number, gaps: number, width: number, space: number, isLast: boolean) {
  if (natural > width) {
    const maxShrink = gaps * space * SHRINK;
    const shrink = natural - width;
    if (!gaps || shrink > maxShrink) return Infinity;
    return 100 * (shrink / maxShrink) ** 3;
  }
  const extra = width - natural;
  if (isLast) return natural < width * 0.2 ? 30 : 0; // bez sierotek-okruchów
  const cap = gaps * space * MAX_STRETCH;
  const used = Math.min(extra, cap);
  const rag = extra - used;
  return 30 * (cap ? used / cap : 0) ** 3 + 100 * (rag / (width * RAG_UNIT)) ** 2;
}

function layout(pieces: Piece[], width: number, space: number, hyphen: number): Line[] {
  const n = pieces.length;
  // best[k] — najmniejsza suma kar dla tekstu do kawałka k-1 włącznie
  const best = new Array<number>(n + 1).fill(Infinity);
  const from = new Array<number>(n + 1).fill(-1);
  best[0] = 0;
  const breakable = (k: number) => pieces[k].after !== "nbsp";
  for (let end = 1; end <= n; end++) {
    if (!breakable(end - 1)) continue;
    const isLast = end === n;
    for (let start = end - 1; start >= 0; start--) {
      // wiersz może zaczynać się tylko po miejscu łamania
      if (start > 0 && !breakable(start - 1)) continue;
      if (best[start] === Infinity) continue;
      const { natural, gaps, hyph } = measureLine(pieces, start, end, space, hyphen);
      if (natural > width + gaps * space * SHRINK && start < end - 1) break; // dłuższe też się nie zmieszczą
      let b = badness(natural, gaps, width, space, isLast);
      if (b === Infinity) {
        if (start < end - 1) continue;
        b = 10000; // pojedynczy za długi wyraz — trudno, niech wystaje
      }
      let demerits = (1 + b) ** 2;
      if (hyph) demerits += HYPHEN_PENALTY;
      if (hyph && start > 0 && pieces[start - 1].after === "hyph") demerits += DOUBLE_HYPHEN_PENALTY;
      const total = best[start] + demerits;
      if (total < best[end]) {
        best[end] = total;
        from[end] = start;
      }
    }
  }
  const breaks: [number, number][] = [];
  for (let end = n; end > 0; end = from[end]) {
    if (from[end] < 0) return []; // nie da się ułożyć — zostaje zwykły tekst
    breaks.unshift([from[end], end]);
  }
  return breaks.map(([start, end], li) => {
    const { natural, gaps, text } = measureLine(pieces, start, end, space, hyphen);
    const isLast = li === breaks.length - 1;
    const extra = width - natural;
    let wordSpacing = 0;
    if (gaps && extra < 0) wordSpacing = extra / gaps; // ściśnięcie
    else if (gaps && !isLast) wordSpacing = Math.min(extra, gaps * space * MAX_STRETCH) / gaps;
    return { text, wordSpacing };
  });
}

export function JustifiedText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<Line[] | null>(null);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    let cancelled = false;
    let lastWidth = -1;
    const ctx = document.createElement("canvas").getContext("2d");

    const run = () => {
      if (cancelled || !ctx) return;
      if (window.matchMedia("(min-width: 40rem)").matches) {
        lastWidth = -1;
        setLines(null);
        return;
      }
      const width = el.getBoundingClientRect().width;
      if (Math.abs(width - lastWidth) < 0.5) return;
      lastWidth = width;
      const cs = getComputedStyle(el);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const space = ctx.measureText(" ").width;
      const hyphen = ctx.measureText("-").width;
      const pieces = parse(text).map((p) => ({ ...p, w: ctx.measureText(p.text).width }));
      const result = layout(pieces, width - SAFETY, space, hyphen);
      setLines(result.length ? result : null);
    };

    document.fonts.ready.then(run);
    const ro = new ResizeObserver(() => run());
    ro.observe(el);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [text]);

  if (!lines) return <span ref={ref}>{text}</span>;
  return (
    <span ref={ref}>
      <span className="sr-only">{text.replace(/\u00ad/g, "")}</span>
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <span
            key={i}
            className="block whitespace-nowrap"
            style={{ wordSpacing: line.wordSpacing ? `${line.wordSpacing}px` : undefined }}
          >
            {line.text}
          </span>
        ))}
      </span>
    </span>
  );
}
