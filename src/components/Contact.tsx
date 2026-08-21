"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const quickActions = [
  {
    icon: Phone,
    label: "Zadzwoń",
    sub: business.phone,
    href: business.phoneHref,
    bg: "bg-cobalt",
    ink: "text-cobalt-ink",
  },
  {
    icon: Mail,
    label: "Napisz",
    sub: "e-mail",
    href: `mailto:${business.email}`,
    bg: "bg-sky",
    ink: "text-sky-ink",
  },
  {
    icon: MapPin,
    label: "Dojedź",
    sub: "mapa",
    href: business.mapsHref,
    bg: "bg-butter",
    ink: "text-butter-ink",
    external: true,
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Zapytanie ze strony — ${name || "Pacjent"}`
    );
    const body = encodeURIComponent(
      `Imię i nazwisko: ${name}\nTelefon / e-mail: ${contact}\n\nWiadomość:\n${message}`
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="kontakt" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-periwinkle px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-periwinkle-ink">
            <MessageCircle className="h-3.5 w-3.5" />
            Kontakt
          </span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Napiszmy do siebie{" "}
            <span className="font-accent italic text-cobalt-deep">słówko</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg leading-relaxed text-ink-soft">
            Umów pierwszą wizytę diagnostyczną lub zapytaj o szczegóły terapii
            — odpiszę tak szybko, jak to możliwe.
          </p>
        </div>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <RevealItem key={action.label}>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className={`flex min-h-16 items-center gap-3 rounded-full ${action.bg} px-5 transition-transform hover:-translate-y-0.5`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-card/70 ${action.ink}`}>
                  <action.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className={`block text-sm font-semibold ${action.ink}`}>
                    {action.label}
                  </span>
                  <span className={`block text-xs ${action.ink} opacity-90`}>
                    {action.sub}
                  </span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-card p-7">
              <h3 className="font-display text-lg font-semibold text-ink">
                Dane gabinetu
              </h3>
              <ul className="mt-5 flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-deep" strokeWidth={1.75} />
                  <span className="text-ink-soft">{business.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-deep" strokeWidth={1.75} />
                  <span className="break-all text-ink-soft">{business.email}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cobalt-deep" strokeWidth={1.75} />
                  <span className="text-ink-soft">
                    {business.addressLine1}, {business.addressLine2}
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-border bg-card p-6 sm:p-10"
              aria-label="Formularz kontaktowy"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-ink">
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="min-h-12 rounded-2xl border border-border bg-paper-dim px-4 text-ink placeholder:text-ink-soft/60 focus-visible:border-cobalt-deep"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact" className="text-sm font-medium text-ink">
                    Telefon lub e-mail
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="min-h-12 rounded-2xl border border-border bg-paper-dim px-4 text-ink placeholder:text-ink-soft/60 focus-visible:border-cobalt-deep"
                    placeholder="500 000 000 / jan@przyklad.pl"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-ink">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-2xl border border-border bg-paper-dim px-4 py-3 text-ink placeholder:text-ink-soft/60 focus-visible:border-cobalt-deep"
                  placeholder="Np. Chciałbym/łabym umówić pierwszą wizytę diagnostyczną dla dziecka..."
                />
              </div>

              <p className="mt-3 text-xs text-ink-soft">
                Po kliknięciu „Wyślij” otworzy się Twój program pocztowy z
                gotową wiadomością do {business.email}.
              </p>

              <button
                type="submit"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-7 text-base font-semibold text-paper transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                Wyślij wiadomość
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
