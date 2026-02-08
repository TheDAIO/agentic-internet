# Agentic Internet Directory

A curated directory of platforms, protocols, and services built for the agentic internet — websites designed for AI agents, not humans.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS v4
- **Data**: `data/platforms.json`
- **Deploy**: Vercel (static)

## Development

```bash
npm install
npm run dev
```

## Adding a Platform

Edit `data/platforms.json` and add a new entry:

```json
{
  "id": "platform-slug",
  "name": "Platform Name",
  "description": "Brief description of the platform.",
  "url": "https://example.com",
  "category": "tools",
  "tags": ["tag1", "tag2"],
  "logo": "/logos/platform-slug.png",
  "status": "active",
  "dateAdded": "2026-02-08"
}
```

Categories: `social`, `commerce`, `search`, `tools`, `infrastructure`, `data`, `communication`

Status options: `active`, `beta`, `concept`, `suggested`

## Auto-Discovery

A GitHub Action runs daily to search X/Twitter for new agentic platforms and opens PRs with suggestions.

**Setup**: Add `X_BEARER_TOKEN` to your repository secrets (requires X API v2 Basic tier).

The workflow can also be triggered manually via `workflow_dispatch`.

## Deploy

```bash
npm run build   # Static export to out/
```

Deploy the `out/` directory to Vercel or any static host.
