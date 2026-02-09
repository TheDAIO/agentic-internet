import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Internet Directory — Platforms Built for AI Agents",
  description:
    "A curated directory of platforms built for the agentic internet — websites, protocols, and services designed for AI agents, not humans.",
  openGraph: {
    title: "Agentic Internet Directory",
    description:
      "Discover platforms, protocols, and services built for AI agents — the machine-readable web.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Internet Directory",
    description:
      "Discover platforms built for AI agents — the machine-readable web.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* ── Navigation ── */}
        <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo / Brand */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 group-hover:border-accent/40 transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-accent"
                  >
                    <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.9" />
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                    <line x1="8" y1="0" x2="8" y2="3" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                    <line x1="8" y1="13" x2="8" y2="16" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                    <line x1="0" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                    <line x1="13" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                  </svg>
                </div>
                <span className="text-sm font-medium tracking-wide text-secondary group-hover:text-foreground transition-colors">
                  Agentic Internet
                </span>
                <div className="pulse-dot ml-1" />
              </a>

              {/* Nav Links */}
              <div className="flex items-center gap-6">
                <a
                  href="/#directory"
                  className="text-xs font-mono tracking-wider uppercase text-muted hover:text-accent transition-colors"
                >
                  Directory
                </a>
                <a
                  href="/studios"
                  className="text-xs font-mono tracking-wider uppercase text-muted hover:text-accent transition-colors"
                >
                  Studios
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Main Content ── */}
        <main>{children}</main>

        {/* ── Footer ── */}
        <footer className="relative border-t border-border/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted font-mono">
                <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                <span>Agentic Internet Directory</span>
              </div>
              <p className="text-xs text-muted/60 font-mono">
                Cataloging the machine-readable web
              </p>
            </div>
          </div>
          <hr className="hr-glow" />
        </footer>
      </body>
    </html>
  );
}
