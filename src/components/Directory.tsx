"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { Platform, Category } from "@/types/platform";
import PlatformCard from "./PlatformCard";

const CATEGORY_PILL_COLORS: Record<string, { base: string; active: string }> = {
  social: {
    base: "text-pink-400/70 border-pink-400/15 hover:border-pink-400/30 hover:text-pink-400",
    active: "text-pink-300 border-pink-400/40 bg-pink-400/10 shadow-pink-400/10 shadow-sm",
  },
  commerce: {
    base: "text-amber-400/70 border-amber-400/15 hover:border-amber-400/30 hover:text-amber-400",
    active: "text-amber-300 border-amber-400/40 bg-amber-400/10 shadow-amber-400/10 shadow-sm",
  },
  search: {
    base: "text-blue-400/70 border-blue-400/15 hover:border-blue-400/30 hover:text-blue-400",
    active: "text-blue-300 border-blue-400/40 bg-blue-400/10 shadow-blue-400/10 shadow-sm",
  },
  tools: {
    base: "text-emerald-400/70 border-emerald-400/15 hover:border-emerald-400/30 hover:text-emerald-400",
    active: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10 shadow-emerald-400/10 shadow-sm",
  },
  infrastructure: {
    base: "text-violet-400/70 border-violet-400/15 hover:border-violet-400/30 hover:text-violet-400",
    active: "text-violet-300 border-violet-400/40 bg-violet-400/10 shadow-violet-400/10 shadow-sm",
  },
  data: {
    base: "text-orange-400/70 border-orange-400/15 hover:border-orange-400/30 hover:text-orange-400",
    active: "text-orange-300 border-orange-400/40 bg-orange-400/10 shadow-orange-400/10 shadow-sm",
  },
  communication: {
    base: "text-teal-400/70 border-teal-400/15 hover:border-teal-400/30 hover:text-teal-400",
    active: "text-teal-300 border-teal-400/40 bg-teal-400/10 shadow-teal-400/10 shadow-sm",
  },
};

interface DirectoryProps {
  platforms: Platform[];
  categories: Category[];
}

export default function Directory({ platforms, categories }: DirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    let results = platforms;

    if (activeCategory) {
      results = results.filter((p) => p.category === activeCategory);
    }

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return results;
  }, [platforms, activeCategory, debouncedQuery]);

  const hasFilters = activeCategory !== null || debouncedQuery.length > 0;

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    setActiveCategory(null);
    inputRef.current?.focus();
  }, []);

  const toggleCategory = useCallback((cat: Category) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  }, []);

  return (
    <section id="directory" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="section-heading-line mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Directory
          </h2>
          <p className="text-sm font-mono text-muted">
            {hasFilters ? (
              <>
                Showing{" "}
                <span className="text-accent">{filtered.length}</span> of{" "}
                {platforms.length} platform
                {platforms.length !== 1 ? "s" : ""}
              </>
            ) : (
              <>
                {platforms.length} platform
                {platforms.length !== 1 ? "s" : ""} across{" "}
                {categories.length} categor
                {categories.length !== 1 ? "ies" : "y"}
              </>
            )}
          </p>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="search-input-wrapper">
              {/* Left accent line */}
              <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-accent/40 to-accent-purple/30" />

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms..."
                className="search-input w-full bg-surface/60 border border-border/60 rounded-lg pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted/50 font-mono focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_1px_rgba(6,182,212,0.15),0_0_20px_rgba(6,182,212,0.06)] transition-all duration-300"
              />

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M3 3l8 8M11 3l-8 8" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {/* All button */}
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[0.65rem] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === null
                  ? "text-accent border-accent/40 bg-accent/10 shadow-sm shadow-accent/10"
                  : "text-muted/70 border-border/40 hover:border-accent/20 hover:text-muted"
              }`}
            >
              All
            </button>

            {categories.map((cat) => {
              const colors = CATEGORY_PILL_COLORS[cat] || CATEGORY_PILL_COLORS.tools;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[0.65rem] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive ? colors.active : colors.base
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="shrink-0 ml-auto flex items-center gap-1.5 rounded-full border border-border/30 px-3 py-1.5 text-[0.6rem] font-mono text-muted/60 uppercase tracking-wider hover:text-foreground hover:border-border/60 transition-all duration-200 cursor-pointer"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M2 2l6 6M8 2l-6 6" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Results Grid / Empty State ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-border/40 mb-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted/40"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary mb-2">
              No platforms found
            </h3>
            <p className="text-sm text-muted/60 max-w-sm mb-6">
              No platforms match your current filters. Try adjusting your search
              or clearing the filters.
            </p>
            <button
              onClick={clearFilters}
              className="text-xs font-mono text-accent hover:text-accent-dim transition-colors uppercase tracking-wider cursor-pointer"
            >
              ← Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
