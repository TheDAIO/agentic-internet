/**
 * Automated platform discovery script.
 *
 * Searches X/Twitter API v2 for tweets mentioning agentic internet platforms,
 * extracts URLs, fetches basic metadata, deduplicates against existing entries,
 * and appends new suggestions to data/platforms.json.
 *
 * Requires: X_BEARER_TOKEN environment variable (X API v2 Basic tier)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLATFORMS_PATH = resolve(__dirname, "../data/platforms.json");

const SEARCH_QUERIES = [
  '"agentic internet" -is:retweet',
  '"built for AI agents" -is:retweet',
  '"agent-native" website -is:retweet',
  '"website for agents" AI -is:retweet',
  '"MCP server" launch -is:retweet',
];

const BEARER_TOKEN = process.env.X_BEARER_TOKEN;

if (!BEARER_TOKEN) {
  console.log("⚠️  X_BEARER_TOKEN not set. Running in dry-run mode.");
}

// ── Load existing platforms ──────────────────────────────────────────

const data = JSON.parse(readFileSync(PLATFORMS_PATH, "utf-8"));
const existingUrls = new Set(data.platforms.map((p) => normalizeUrl(p.url)));
const existingNames = new Set(
  data.platforms.map((p) => p.name.toLowerCase())
);

// ── Helpers ──────────────────────────────────────────────────────────

function normalizeUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/+$/, "");
  } catch {
    return url;
  }
}

function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s"'<>)\]]+/gi;
  const matches = text.match(urlRegex) || [];
  return matches.filter(
    (u) =>
      !u.includes("twitter.com") &&
      !u.includes("x.com") &&
      !u.includes("t.co") &&
      !u.includes("github.com") &&
      !u.includes("youtube.com") &&
      !u.includes("youtu.be")
  );
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function guessCategory(text) {
  const lower = text.toLowerCase();
  if (/social|community|network|forum|post/i.test(lower)) return "social";
  if (/market|commerce|buy|sell|store|shop/i.test(lower)) return "commerce";
  if (/search|find|discover|index|crawl/i.test(lower)) return "search";
  if (/tool|sdk|framework|library|plugin/i.test(lower)) return "tools";
  if (/infra|cloud|server|host|deploy|sandbox/i.test(lower))
    return "infrastructure";
  if (/data|scrape|extract|api|feed/i.test(lower)) return "data";
  if (/protocol|message|communicate|chat/i.test(lower)) return "communication";
  return "tools";
}

// ── X API search ─────────────────────────────────────────────────────

async function searchTweets(query) {
  if (!BEARER_TOKEN) return [];

  const params = new URLSearchParams({
    query,
    max_results: "20",
    "tweet.fields": "text,entities,created_at",
  });

  try {
    const res = await fetch(
      `https://api.x.com/2/tweets/search/recent?${params}`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      }
    );

    if (!res.ok) {
      console.error(`❌ X API error for "${query}": ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error(`❌ Fetch error for "${query}":`, err.message);
    return [];
  }
}

// ── Fetch page metadata ──────────────────────────────────────────────

async function fetchMeta(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AgenticDirectoryBot/1.0; +https://github.com)",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch =
      html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i
      );

    return {
      title: titleMatch ? titleMatch[1].trim() : null,
      description: descMatch ? descMatch[1].trim() : null,
    };
  } catch {
    return null;
  }
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 Starting agentic platform discovery...\n");

  const discoveredUrls = new Map(); // url -> tweet text

  // Search all queries
  for (const query of SEARCH_QUERIES) {
    console.log(`  Searching: ${query}`);
    const tweets = await searchTweets(query);
    console.log(`    Found ${tweets.length} tweets`);

    for (const tweet of tweets) {
      const urls = extractUrls(tweet.text);
      for (const url of urls) {
        const normalized = normalizeUrl(url);
        if (!existingUrls.has(normalized) && !discoveredUrls.has(normalized)) {
          discoveredUrls.set(normalized, { url, text: tweet.text });
        }
      }
    }
  }

  console.log(`\n📋 Found ${discoveredUrls.size} potential new platform(s)\n`);

  if (discoveredUrls.size === 0) {
    console.log("✅ No new platforms discovered. platforms.json unchanged.");
    return;
  }

  // Fetch metadata for each discovered URL
  const newPlatforms = [];

  for (const [, { url, text }] of discoveredUrls) {
    console.log(`  Fetching metadata: ${url}`);
    const meta = await fetchMeta(url);

    if (!meta || !meta.title) {
      console.log(`    ⏭️  Skipped (no metadata)`);
      continue;
    }

    const name = meta.title
      .split(/[|\-–—]/)[0]
      .trim()
      .slice(0, 60);
    const description =
      meta.description || `Discovered from X/Twitter: ${text.slice(0, 100)}...`;
    const category = guessCategory(description + " " + name);
    const id = slugify(name);

    // Skip if name already exists
    if (existingNames.has(name.toLowerCase())) {
      console.log(`    ⏭️  Skipped (already exists: ${name})`);
      continue;
    }

    newPlatforms.push({
      id,
      name,
      description: description.slice(0, 200),
      url,
      category,
      tags: ["discovered", "auto-suggested"],
      logo: `/logos/${id}.png`,
      status: "suggested",
      dateAdded: new Date().toISOString().split("T")[0],
    });

    console.log(`    ✅ Added: ${name} (${category})`);
  }

  if (newPlatforms.length === 0) {
    console.log("\n✅ No valid new platforms after metadata check.");
    return;
  }

  // Append to platforms.json
  data.platforms.push(...newPlatforms);
  data.lastUpdated = new Date().toISOString().split("T")[0];

  writeFileSync(PLATFORMS_PATH, JSON.stringify(data, null, 2) + "\n");

  console.log(
    `\n🎉 Added ${newPlatforms.length} new suggested platform(s) to platforms.json`
  );
  console.log(
    `   Total platforms: ${data.platforms.length}`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
