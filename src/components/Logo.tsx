export function LogoMark({ className }: { className?: string }) {
  // Iskra/kwiat — symbol "aha!" momentu, gdy słowo w końcu się układa.
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <rect width="40" height="40" rx="12" fill="var(--color-cobalt-deep)" />
      <path
        d="M20 8c.6 4.2 2 6.8 6 8-4 1.2-5.4 3.8-6 8-.6-4.2-2-6.8-6-8 4-1.2 5.4-3.8 6-8Z"
        fill="var(--color-butter)"
      />
      <circle cx="30" cy="11" r="2.4" fill="var(--color-sky)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
          Słówko do słówka
        </span>
        <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
          terapia logopedyczna
        </span>
      </span>
    </span>
  );
}
