import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin-ext"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://slowkodoslowka.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Słówko do słówka - terapia logopedyczna Rzeszów | Edyta Wierzbińska",
    template: "%s | Słówko do słówka",
  },
  description:
    "Gabinet logopedyczny w Rzeszowie. Diagnoza i terapia mowy dzieci, młodzieży i dorosłych - wady wymowy, opóźniony rozwój mowy, afazja po udarze, elektrostymulacja. Umów wizytę.",
  keywords: [
    "logopeda Rzeszów",
    "terapia logopedyczna",
    "logopeda dziecięcy Rzeszów",
    "afazja po udarze",
    "elektrostymulacja logopedyczna",
    "terapia miofunkcyjna MFT",
    "wady wymowy",
    "Edyta Wierzbińska logopeda",
  ],
  authors: [{ name: "Edyta Wierzbińska" }],
  openGraph: {
    title: "Słówko do słówka - terapia logopedyczna Rzeszów",
    description:
      "Diagnoza i terapia mowy dzieci, młodzieży i dorosłych w Rzeszowie. Indywidualne podejście, metoda elektrostymulacji, dojazd do pacjenta.",
    url: siteUrl,
    siteName: "Słówko do słówka",
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper focus:text-sm focus:font-medium"
        >
          Przejdź do treści głównej
        </a>
        {children}
      </body>
    </html>
  );
}
