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

// Po co najmniej 3 litery po obu stronach łącznika (bez okruchów typu "wa-"
// / "-ją"); krótszych wyrazów nie dzielimy wcale. Czy
// dzielić naprawdę, decyduje dopiero łamanie akapitu (JustifiedText) — z karą
// za każdy podział, więc łączników jest tylko tyle, ile trzeba.
const MIN_WORD = 5;
const MIN_BEFORE = 3; // liter przed łącznikiem (koniec wiersza)
const MIN_AFTER = 3; // liter po łączniku (początek następnego wiersza)

function hyphenateWord(word: string) {
  // Wyrazów z łącznikiem ("ustno-twarzowej") nie dzielimy dodatkowo —
  // "ustno-twa-rzowej" to błąd składu; wiersz może się złamać po "-".
  if (word.includes("-")) return word;
  return word
    .split("-")
    .map((part) => {
      const letters = part.replace(/[^\p{L}]/gu, "");
      if (letters.length < MIN_WORD) return part;
      const syllables = hyphenator.hyphenate(part);
      // liczymy same litery — "wy," to nadal tylko 2 litery na nowy wiersz
      const count = (t: string) => t.replace(/[^\p{L}]/gu, "").length;
      let out = syllables[0];
      let left = count(out);
      for (let i = 1; i < syllables.length; i++) {
        const rest = count(syllables.slice(i).join(""));
        const ok = left >= MIN_BEFORE && rest >= MIN_AFTER;
        out += (ok ? SOFT_HYPHEN : "") + syllables[i];
        if (ok) left = 0;
        left += count(syllables[i]);
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
