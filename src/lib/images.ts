// Darmowe zdjęcia stockowe (Unsplash License — bezpłatne, komercyjne użycie, bez atrybucji).
// TODO: podmienić na prawdziwe zdjęcia gabinetu / Pani Edyty, gdy będą dostępne.

function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const stockPhotos = {
  heroGirl: {
    src: unsplash("photo-1624272949900-9ae4c56397e8"),
    alt: "Uśmiechnięta dziewczynka — zdjęcie ilustracyjne",
    credit: "Mieke Campbell / Unsplash",
  },
  kidsBlueJacket: {
    src: unsplash("photo-1497881807663-38b9a95b7192"),
    alt: "Uśmiechnięte dziecko w niebieskiej kurtce — zdjęcie ilustracyjne",
    credit: "Janko Ferlič / Unsplash",
  },
  adultsTalking: {
    src: unsplash("photo-1758273240360-76b908e7582a"),
    alt: "Dorosła pacjentka podczas rozmowy z terapeutką w jasnym gabinecie — zdjęcie ilustracyjne",
    credit: "Unsplash",
  },
  aboutColoring: {
    src: unsplash("photo-1587323655395-b1c77a12c89a"),
    alt: "Dorosły i dziecko podczas wspólnych zajęć przy stole — zdjęcie ilustracyjne",
    credit: "Gabe Pierce / Unsplash",
  },
  motherSonDrawing: {
    src: unsplash("photo-1758598737505-90a3084105ac"),
    alt: "Rodzic i dziecko rysujący razem — zdjęcie ilustracyjne",
    credit: "Vitaly Gariev / Unsplash",
  },
  therapySession: {
    src: unsplash("photo-1771765767087-ce71e4a7916a"),
    alt: "Terapeutka pokazuje dziecku układ dłoni podczas zajęć logopedycznych — zdjęcie ilustracyjne",
    credit: "Unsplash",
  },
};

// Prawdziwe zdjęcia z gabinetu (dostarczone przez klienta) — sekcja "Metoda
// wspomagająca". Oryginały są poziome i mają obie osoby rozstawione blisko
// krawędzi kadru, więc pliki tutaj to lekkie przycięcie do 5:4 — wystarczające,
// by były bliżej pionu, ale wciąż z obiema postaciami i całą sceną w kadrze
// (przycięte ręcznie po weryfikacji, bo automatyczna detekcja "attention" w
// sharpie gubiła drugą osobę). Ramka w Method.tsx ma tę samą proporcję, więc
// zdjęcie wypełnia ją bez zniekształceń. Nazwy plików mają sufiks -v2, bo
// Next.js/przeglądarka silnie cache'ują /images/* — zmiana nazwy przy kolejnej
// podmianie kadru jest najprostszym sposobem na wymuszenie świeżego pliku.
export const clinicPhotos = {
  mft: {
    src: "/images/terapia-mft-v2.webp",
    alt: "Terapeutka demonstruje dziewczynce aparat do terapii miofunkcyjnej w gabinecie",
  },
  elektrostymulacja: {
    src: "/images/elektrostymulacja-v2.webp",
    alt: "Terapeutka podłącza elektrody elektrostymulatora na szyi chłopca w gabinecie",
  },
};
