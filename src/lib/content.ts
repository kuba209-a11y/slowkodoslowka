// Wszystkie dane firmowe / treści w jednym miejscu — łatwo podmienić przy aktualizacji.

export const business = {
  name: "Słówko do słówka",
  tagline: "Terapia logopedyczna",
  owner: "Edyta Wierzbińska",
  ownerRole: "Nauczyciel i logopeda",
  phone: "530 160 847",
  phoneHref: "tel:+48530160847",
  email: "logopeda.ew@gmail.com",
  addressLine1: "ul. Paderewskiego 85C",
  addressLine2: "35-330 Rzeszów",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Paderewskiego+85C+Rzesz%C3%B3w",
  // TODO: podmienić na właściwy link do rezerwacji (np. znanylekarz.pl), gdy będzie dostępny.
  bookingHref: "#kontakt",
};

export const pricing = [
  {
    group: "Dzieci i młodzież",
    items: [
      { label: "Pierwsza wizyta — diagnoza i konsultacja", price: "200 zł" },
      { label: "Terapia / ćwiczenia (45 min)", price: "150 zł" },
    ],
  },
  {
    group: "Osoby dorosłe",
    items: [
      { label: "Pierwsza wizyta — diagnoza i konsultacja", price: "200 zł" },
      { label: "Terapia / ćwiczenia (45 min)", price: "150 zł" },
    ],
  },
  {
    group: "Wizyty domowe",
    items: [
      { label: "Pierwsza wizyta z dojazdem", price: "250 zł" },
      { label: "Terapia / ćwiczenia z dojazdem (45 min)", price: "200 zł" },
    ],
  },
  {
    group: "Elektrostymulacja",
    items: [
      { label: "Pojedynczy zabieg", price: "50 zł" },
      { label: "Pakiet 10 zabiegów", price: "450 zł" },
      { label: "Terapia logopedyczna + zabieg elektrostymulacji", price: "180 zł" },
    ],
  },
];

export const audiences = [
  {
    title: "Dzieci i młodzież",
    description:
      "Opóźniony rozwój mowy, wady wymowy, dyslalia, trudności z nauką czytania. Zajęcia prowadzone w przyjaznej, bezpiecznej atmosferze, dopasowane do tempa dziecka.",
  },
  {
    title: "Osoby dorosłe",
    description:
      "Terapia afazji po udarze — z możliwością dojazdu do pacjenta, korekcja wad wymowy oraz wsparcie w powrocie do sprawnej komunikacji.",
  },
];

export const faq = [
  {
    q: "Jak wygląda pierwsza wizyta?",
    a: "Pierwsze spotkanie to wnikliwy wywiad oraz diagnoza logopedyczna — poznaję historię i indywidualne potrzeby pacjenta, aby dobrać najskuteczniejsze metody terapii.",
  },
  {
    q: "Ile trwa terapia i jak często się odbywa?",
    a: "Pojedyncze spotkanie trwa 45 minut. Częstotliwość i długość całego procesu ustalam indywidualnie po diagnozie — zależy od wieku, rodzaju zaburzenia i tempa postępów.",
  },
  {
    q: "Czym jest elektrostymulacja i dla kogo jest wskazana?",
    a: "To metoda wspomagająca, pobudzająca i wzmacniająca mięśnie sfery ustno-twarzowej. Pomaga w korekcie wad wymowy, problemach z połykaniem, nadmiernym ślinieniu oraz zaburzeniach napięcia mięśniowego warg, języka i podniebienia.",
  },
  {
    q: "Czy możliwy jest dojazd do pacjenta?",
    a: "Tak — w przypadku osób dorosłych, np. po udarze, możliwa jest pierwsza diagnoza i konsultacja z dojazdem do miejsca zamieszkania pacjenta.",
  },
];
