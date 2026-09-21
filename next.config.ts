import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Podgląd serwera dev z telefonu w tej samej sieci Wi-Fi (np.
  // http://192.168.1.29:3000). Next.js domyślnie blokuje zasoby dev dla
  // adresów innych niż localhost — strona wczytałaby się bez JavaScriptu,
  // a animacje wejścia zostałyby na przezroczystości 0. Każda "*" pasuje do
  // jednego członu adresu. Działa tylko w trybie dev, produkcji nie dotyczy.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
