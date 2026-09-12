import { Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mx-4 mb-4 overflow-hidden rounded-[2.5rem] bg-ink text-paper/80 sm:mx-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-10 sm:py-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <Logo className="[&_span:first-child]:text-paper [&_span:last-child]:text-paper/60" />
          <p className="mt-4 text-sm leading-relaxed text-paper/60">
            Gabinet logopedyczny w Rzeszowie - diagnoza i terapia mowy dzieci,
            młodzieży i dorosłych.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
              Kontakt
            </p>
            {/* min-h-11 zamiast samej wysokości linii — linki w stopce miały
                20px wysokości, czyli poniżej progu 44px dla palca. */}
            <ul className="mt-2 flex flex-col text-sm">
              <li>
                <a
                  href={business.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 hover:text-paper"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex min-h-11 items-center gap-2 break-all hover:text-paper"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                  {business.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
              Gabinet
            </p>
            <a
              href={business.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex min-h-11 items-start gap-2 py-1 text-sm hover:text-paper"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              <span>
                {business.addressLine1}
                <br />
                {business.addressLine2}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} {business.name}. Wszelkie prawa zastrzeżone.</p>
          <p>{business.owner} · {business.ownerRole}</p>
        </div>
      </div>
    </footer>
  );
}
