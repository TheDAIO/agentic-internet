export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════ */}
      {/* HERO SECTION                              */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
        {/* Gradient Orbs */}
        <div className="hero-orb hero-orb--cyan" style={{ top: '10%', left: '15%' }} />
        <div className="hero-orb hero-orb--purple" style={{ top: '30%', right: '10%' }} />
        <div className="hero-orb hero-orb--blue" style={{ bottom: '15%', left: '40%' }} />

        {/* Scan Line */}
        <div className="scan-line" />

        {/* Top fade to prevent orbs bleeding into nav */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div className="fade-in-up mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-mono tracking-wider text-accent uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Live Directory
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-in-up text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
            style={{ animationDelay: '0.25s' }}
          >
            The Internet,{' '}
            <span className="text-gradient">Rebuilt for Agents</span>
          </h1>

          {/* Description */}
          <p
            className="fade-in-up mx-auto max-w-2xl text-lg sm:text-xl text-secondary leading-relaxed mb-10"
            style={{ animationDelay: '0.4s' }}
          >
            A curated directory of platforms, protocols, and services designed
            from the ground up for AI agents — not humans. Discover the
            infrastructure powering the machine-readable web.
          </p>

          {/* CTA */}
          <div className="fade-in-up" style={{ animationDelay: '0.55s' }}>
            <a href="#directory" className="cta-button">
              <span>Browse Directory</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </a>
          </div>

          {/* Stats ticker */}
          <div
            className="fade-in-up mt-16 flex items-center justify-center gap-8 sm:gap-12 text-xs font-mono text-muted"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-semibold text-foreground">10+</span>
              <span className="uppercase tracking-widest">Platforms</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-semibold text-foreground">7</span>
              <span className="uppercase tracking-widest">Categories</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-semibold text-foreground">24/7</span>
              <span className="uppercase tracking-widest">Auto-Discovery</span>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* DIRECTORY SECTION (placeholder)           */}
      {/* ══════════════════════════════════════════ */}
      <section id="directory" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Will be populated with platform cards in Phase 3 */}
        </div>
      </section>
    </>
  );
}
