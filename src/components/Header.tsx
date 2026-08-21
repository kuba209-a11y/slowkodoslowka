"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { business } from "@/lib/content";

const links = [
  { href: "#o-mnie", label: "O mnie" },
  { href: "#dla-kogo", label: "Dla kogo" },
  { href: "#metoda", label: "Metody" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-2 pt-4 sm:px-3">
      <div className="mx-auto flex h-[68px] w-full max-w-[1920px] items-center justify-between rounded-full border border-border bg-card/90 pl-5 pr-2.5 shadow-[0_10px_30px_-14px_rgba(57,44,110,0.25)] backdrop-blur-sm sm:pl-8 sm:pr-3">
        <a href="#hero" className="rounded-full">
          <Logo />
        </a>

        <nav className="hidden lg:flex lg:items-center lg:gap-[2.4375rem]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-2 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={business.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
          >
            <Phone className="h-4 w-4 text-cobalt-deep" strokeWidth={2.2} />
            {business.phone}
          </a>
          <a
            href="#kontakt"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
          >
            Umów konsultację
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper-dim text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-card px-5 pb-6 pt-2 shadow-lg lg:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-11 border-b border-border/60 py-3 text-base text-ink-soft"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={business.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 text-base font-medium text-ink"
            >
              <Phone className="h-4 w-4 text-cobalt-deep" strokeWidth={2.2} />
              {business.phone}
            </a>
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-paper"
            >
              Umów konsultację
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
