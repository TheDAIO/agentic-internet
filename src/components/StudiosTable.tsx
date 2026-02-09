import type { Studio, AutonomyLevel, Visibility } from "@/types/studio";

const AUTONOMY_CONFIG: Record<AutonomyLevel, { dot: string; label: string }> = {
  autonomous: { dot: "bg-emerald-500", label: "Auto" },
  "human-in-the-loop": { dot: "bg-amber-400", label: "HITL" },
  "human-led": { dot: "bg-slate-500", label: "Human" },
};

const VISIBILITY_CONFIG: Record<
  Visibility,
  { dot: string; label: string; text: string }
> = {
  visible: { dot: "bg-emerald-500", label: "Visible", text: "text-emerald-400" },
  opaque: { dot: "bg-slate-500", label: "Opaque", text: "text-slate-400" },
};

function AutonomyDot({ level }: { level: AutonomyLevel }) {
  const config = AUTONOMY_CONFIG[level];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${config.dot} shrink-0`} />
      <span className="text-[0.6rem] font-mono text-muted/70 uppercase tracking-wider">
        {config.label}
      </span>
    </div>
  );
}

function VisibilityDot({ level }: { level: Visibility }) {
  const config = VISIBILITY_CONFIG[level];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${config.dot} shrink-0`} />
      <span className={`text-[0.6rem] font-mono uppercase tracking-wider ${config.text}/70`}>
        {config.label}
      </span>
    </div>
  );
}

function tokenUrl(address: string, chain?: string): string {
  if (chain?.toLowerCase() === "base") {
    return `https://dexscreener.com/base/${address}`;
  }
  return `https://dexscreener.com/ethereum/${address}`;
}

export default function StudiosTable({ studios }: { studios: Studio[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 pr-4 font-normal">
              Studio
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 px-4 font-normal text-center">
              Idea
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 px-4 font-normal text-center">
              Dev
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 px-4 font-normal text-center">
              Distro
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 px-4 font-normal text-center">
              Code
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 px-4 font-normal text-center">
              Logs
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 px-4 font-normal hidden md:table-cell">
              Token
            </th>
            <th className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-widest py-3 pl-4 font-normal">
              Links
            </th>
          </tr>
        </thead>
        <tbody>
          {studios.map((studio) => (
            <tr
              key={studio.id}
              className="border-b border-border/30 hover:bg-surface/60 transition-colors"
            >
              {/* Studio name + creator */}
              <td className="py-3 pr-4">
                <p className="text-[0.85rem] font-semibold text-foreground whitespace-nowrap">
                  {studio.name}
                </p>
                {studio.creator && (
                  <p className="text-[0.6rem] font-mono text-muted/60 uppercase tracking-wider">
                    by {studio.creator}
                  </p>
                )}
              </td>

              {/* Autonomy: Idea */}
              <td className="py-3 px-4 text-center">
                <AutonomyDot level={studio.autonomy.ideaGeneration} />
              </td>

              {/* Autonomy: Dev */}
              <td className="py-3 px-4 text-center">
                <AutonomyDot level={studio.autonomy.development} />
              </td>

              {/* Autonomy: Distro */}
              <td className="py-3 px-4 text-center">
                <AutonomyDot level={studio.autonomy.distribution} />
              </td>

              {/* Transparency: Code */}
              <td className="py-3 px-4 text-center">
                <VisibilityDot level={studio.transparency.code} />
              </td>

              {/* Transparency: Logs */}
              <td className="py-3 px-4 text-center">
                <VisibilityDot level={studio.transparency.logs} />
              </td>

              {/* Token */}
              <td className="py-3 px-4 hidden md:table-cell">
                {studio.token ? (
                  <a
                    href={tokenUrl(studio.token.address, studio.token.chain)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[0.6rem] font-mono text-accent-purple/80 hover:text-accent-purple transition-colors uppercase tracking-wider whitespace-nowrap"
                  >
                    {studio.token.name}
                    {studio.token.chain && (
                      <span className="text-muted/40">
                        · {studio.token.chain}
                      </span>
                    )}
                  </a>
                ) : (
                  <span className="text-[0.6rem] font-mono text-muted/30">
                    —
                  </span>
                )}
              </td>

              {/* Links */}
              <td className="py-3 pl-4">
                <div className="flex items-center gap-3">
                  {studio.website && (
                    <a
                      href={studio.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.6rem] font-mono text-muted/50 hover:text-accent transition-colors uppercase tracking-wider"
                    >
                      Web
                    </a>
                  )}
                  <a
                    href={`https://x.com/${studio.x.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted/50 hover:text-accent transition-colors"
                    aria-label={`${studio.name} on X`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
