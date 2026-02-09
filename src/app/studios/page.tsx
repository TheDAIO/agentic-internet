import type { Metadata } from "next";
import { getStudios } from "@/lib/studio-data";
import StudiosTable from "@/components/StudiosTable";

export const metadata: Metadata = {
  title: "Autonomous Product Studios — Agentic Internet",
  description:
    "AI agents that build and ship products — classified by autonomy level per department and transparency of their claims.",
  openGraph: {
    title: "Autonomous Product Studios",
    description:
      "AI agents that build and ship products — classified by autonomy and transparency.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous Product Studios",
    description:
      "AI agents that build products — classified by autonomy and transparency.",
  },
};

export default function StudiosPage() {
  const studios = getStudios();

  return (
    <>
      {/* ══════════════════════════════════════════ */}
      {/* HERO                                      */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Restrained glow — single cyan wash top-right */}
        <div
          className="hero-orb hero-orb--cyan opacity-50"
          style={{ top: "-20%", right: "-10%" }}
        />

        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 mx-auto max-w-5xl px-6 lg:px-8">
          {/* Back link */}
          <div className="fade-in-up mb-10" style={{ animationDelay: "0.05s" }}>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 12L6 8l4-4" />
              </svg>
              Back to Directory
            </a>
          </div>

          {/* Eyebrow */}
          <div className="fade-in-up mb-6" style={{ animationDelay: "0.15s" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/5 px-4 py-1.5 text-xs font-mono tracking-wider text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-purple animate-pulse" />
              Studios
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
            style={{ animationDelay: "0.25s" }}
          >
            Autonomous Product{" "}
            <span className="text-gradient">Studios</span>
          </h1>

          {/* Subtitle */}
          <p
            className="fade-in-up max-w-2xl text-lg text-secondary leading-relaxed"
            style={{ animationDelay: "0.4s" }}
          >
            AI agents that build and ship products — classified by how much
            autonomy they actually have, and how verifiable their claims are.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* CLASSIFICATION LEGEND + STUDIOS TABLE       */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative py-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-6">
            <div className="section-heading-line mb-4" />
            <h2 className="text-2xl font-bold tracking-tight">Studios</h2>
          </div>

          {/* Legend */}
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border/40 bg-surface/40 px-4 py-3">
            <span className="text-[0.65rem] font-mono text-muted/50 uppercase tracking-widest mr-1">
              Key
            </span>

            {/* Autonomy levels */}
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Human-led
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                HITL
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Autonomous
              </span>
            </div>

            <span className="hidden sm:block h-4 w-px bg-border/50" />

            {/* Transparency levels */}
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Visible
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Opaque
              </span>
            </div>
          </div>

          {/* Studios table */}
          <StudiosTable studios={studios} />
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* WHAT WE TRACK & WHY                       */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative py-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-8">
            <div className="section-heading-line mb-4" />
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              What We Track & Why
            </h2>
            <p className="text-sm text-secondary max-w-xl">
              Anyone can say their agent is autonomous. We break it down by
              department and require transparency.
            </p>
          </div>

          {/* ── Autonomy by Department ── */}
          <div className="mb-6">
            <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-4">
              Autonomy by Department
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Idea Generation */}
              <div className="platform-card relative rounded-xl bg-surface/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent"
                      >
                        <path d="M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.3C6.2 13.5 5 11.4 5 9a7 7 0 0 1 7-7z" />
                        <path d="M9 21h6M10 17h4" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Idea Generation
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">
                    Can the agent come up with its own product ideas, or does a
                    human decide what to build? This is where creative autonomy
                    starts.
                  </p>
                </div>
              </div>

              {/* Development */}
              <div className="platform-card relative rounded-xl bg-surface/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                        <line x1="14" y1="4" x2="10" y2="20" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Development
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">
                    Can the agent write, test, and deploy code on its own? Most
                    agents claim this — we verify it.
                  </p>
                </div>
              </div>

              {/* Distribution */}
              <div className="platform-card relative rounded-xl bg-surface/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-accent"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Distribution
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">
                    Can the agent market, sell, and distribute what it builds?
                    The hardest department to automate — and where most studios
                    still need humans.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Levels Grid: Autonomy + Transparency side by side ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Autonomy Levels */}
            <div className="platform-card relative rounded-xl bg-surface/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <div className="p-5">
                <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-4">
                  Autonomy Levels
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-500 shadow-sm shadow-slate-500/30 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Human-led
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        A human makes the decisions, the agent assists
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/40 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Human-in-the-loop
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        The agent proposes and executes, a human approves or
                        guides
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Fully autonomous
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        The agent operates independently, no human required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparency (Code & Logs) */}
            <div className="platform-card relative rounded-xl bg-surface/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
              <div className="p-5">
                <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-4">
                  Transparency
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  We track visibility separately for <span className="text-foreground font-medium">Code</span> and <span className="text-foreground font-medium">Logs</span>. Each can be:
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Visible
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        Open and verifiable — you can read it yourself
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-500 shadow-sm shadow-slate-500/30 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Opaque
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        No way to verify — you have to trust what they say
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
