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
    src: unsplash("photo-1714976694012-09d1d331f433"),
    alt: "Dwie osoby dorosłe podczas rozmowy — zdjęcie ilustracyjne",
    credit: "Vitaly Gariev / Unsplash",
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
};
