import type { Platform } from "@/types/platform";

const STATUS_CONFIG = {
  active: { color: "bg-emerald-500", shadow: "shadow-emerald-500/40", label: "Active" },
  beta: { color: "bg-amber-400", shadow: "shadow-amber-400/40", label: "Beta" },
  concept: { color: "bg-slate-500", shadow: "shadow-slate-500/30", label: "Concept" },
  suggested: { color: "bg-cyan-400", shadow: "shadow-cyan-400/40", label: "Suggested" },
} as const;

const CATEGORY_COLORS: Record<string, string> = {
  social: "text-pink-400 border-pink-400/20 bg-pink-400/5",
  commerce: "text-amber-400 border-amber-400/20 bg-amber-400/5",
  search: "text-blue-400 border-blue-400/20 bg-blue-400/5",
  tools: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  infrastructure: "text-violet-400 border-violet-400/20 bg-violet-400/5",
  data: "text-orange-400 border-orange-400/20 bg-orange-400/5",
  communication: "text-teal-400 border-teal-400/20 bg-teal-400/5",
};

function LogoFallback({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent font-semibold text-sm shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function PlatformCard({ platform }: { platform: Platform }) {
  const status = STATUS_CONFIG[platform.status];
  const categoryStyle = CATEGORY_COLORS[platform.category] || CATEGORY_COLORS.tools;

  return (
    <article className="platform-card group relative flex flex-col rounded-xl bg-surface/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
      {/* Top edge glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Header: Logo + Name + External Link */}
        <div className="flex items-start gap-3">
          <LogoFallback name={platform.name} />

          <div className="flex-1 min-w-0">
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 group/link"
            >
              <h3 className="text-[0.95rem] font-semibold text-foreground truncate group-hover/link:text-accent transition-colors">
                {platform.name}
              </h3>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted shrink-0 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 group-hover/link:text-accent"
              >
                <path d="M3.5 8.5l5-5M4 3.5h4.5V8" />
              </svg>
            </a>

            {/* Status + Category row */}
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${status.color} ${status.shadow} shadow-sm ${platform.status === "suggested" ? "animate-pulse" : ""}`}
                />
                <span className="text-[0.65rem] font-mono text-muted uppercase tracking-wider">
                  {status.label}
                </span>
              </span>
              <span className="text-border">·</span>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-wider ${categoryStyle}`}
              >
                {platform.category}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[0.8rem] leading-relaxed text-secondary line-clamp-2">
          {platform.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {platform.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-light/60 border border-border/50 px-2 py-0.5 text-[0.6rem] font-mono text-muted uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Date */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <span className="text-[0.6rem] font-mono text-muted/60 tracking-wider">
            Added {new Date(platform.dateAdded).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6rem] font-mono text-muted/40 hover:text-accent transition-colors uppercase tracking-wider"
          >
            Visit →
          </a>
        </div>
      </div>
    </article>
  );
}
