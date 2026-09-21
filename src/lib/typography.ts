import Hypher from "hypher";
import pl from "hyphenation.pl";

// Typografia polskiego tekstu w wąskiej kolumnie (telefon): wyjustowany tekst
// bez możliwości dzielenia wyrazów rozjeżdża się w duże dziury między słowami,
// a automatyczne `hyphens: auto` zależy od słownika w przeglądarce (nie każda
// ma polski). Dlatego miękkie łączniki (U+00AD) wstawiamy sami, według
// wzorców polskiej sylabizacji, już przy renderze na serwerze — działa
// identycznie wszędzie. Na tablecie i desktopie `hyphens: none` je ignoruje.
const hyphenator = new Hypher(pl);
const SOFT_HYPHEN = "\u00ad";
const NBSP = "\u00a0";

// Jednoliterowe spójniki/przyimki (a, i, o, u, w, z) i myślnik nie mogą zostać
// na końcu / początku linii — sklejamy je twardą spacją z sąsiednim słowem.
const SINGLE_LETTERS = new Set(["a", "i", "o", "u", "w", "z"]);

const MIN_WORD = 7; // krótszych wyrazów nie dzielimy
const MIN_FRAGMENT = 3; // żadnych okruchów typu "Te-" / "-ją" przy brzegu linii

function hyphenateWord(word: string) {
  // części przez istniejący łącznik ("ustno-twarzowej") dzielimy osobno —
  // przed prawdziwym "-" miękki łącznik dałby linię zaczynającą się od "-".
  return word
    .split("-")
    .map((part) => {
      const letters = part.replace(/[^\p{L}]/gu, "");
      if (letters.length < MIN_WORD) return part;
      const syllables = hyphenator.hyphenate(part);
      let out = syllables[0];
      let left = out.length;
      for (let i = 1; i < syllables.length; i++) {
        const rest = syllables.slice(i).join("").length;
        const ok = left >= MIN_FRAGMENT && rest >= MIN_FRAGMENT;
        out += (ok ? SOFT_HYPHEN : "") + syllables[i];
        if (ok) left = 0;
        left += syllables[i].length;
      }
      return out;
    })
    .join("-");
}

/** Miękkie łączniki w długich wyrazach + twarde spacje po a/i/o/u/w/z i przed " - ". */
export function typeset(text: string) {
  const words = text.split(" ").map(hyphenateWord);
  return words.reduce((out, word, i) => {
    if (i === 0) return word;
    const prev = words[i - 1].replace(/^[("„]+/, "").toLowerCase();
    const glue = SINGLE_LETTERS.has(prev) || word === "-";
    return out + (glue ? NBSP : " ") + word;
  }, "");
}
