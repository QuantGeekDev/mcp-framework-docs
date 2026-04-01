---
id: docs-package-fumadocs-setup
title: Fumadocs Setup
sidebar_position: 8
---

# Fumadocs Setup Guide

Configure your [Fumadocs](https://fumadocs.vercel.app/) site to work with `@mcp-framework/docs`.

## Step 1: Enable llms.txt

### `app/llms.txt/route.ts`

```typescript
import { source } from "@/lib/source";

export function GET() {
  const content = source.llms().index();
  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
```

### `app/llms-full.txt/route.ts`

```typescript
import { source } from "@/lib/source";

export async function GET() {
  const content = await source.llms().full();
  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
```

## Step 2: Enable Search API (Recommended)

### `app/api/search/route.ts`

```typescript
import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(source);
```

This creates `GET /api/search?query=...` returning Orama search results.

## Step 3: Verify Endpoints

```bash
curl https://docs.yoursite.com/llms.txt
curl https://docs.yoursite.com/llms-full.txt
curl "https://docs.yoursite.com/api/search?query=getting+started"
```

## Step 4: Create Your MCP Server

```bash
npx create-docs-server my-api-docs
cd my-api-docs
```

Edit `.env`:

```bash
DOCS_BASE_URL=https://docs.yoursite.com
DOCS_SERVER_NAME=my-api-docs
```

```bash
npm run build && npm start
```

## Expected llms.txt Format

```markdown
# Project Name

> Project description

## Section Name

- [Page Title](https://docs.example.com/docs/page-slug): Page description

## Another Section

- [Another Page](https://docs.example.com/docs/another): Description
```

## Expected Search API Response

```json
[
  {
    "id": "/docs/page-slug",
    "url": "/docs/page-slug",
    "type": "page",
    "content": "matched text...",
    "structured": { "heading": "Section Heading" }
  }
]
```

## Troubleshooting

### "No results found" for all searches

- Verify `llms-full.txt` is accessible and contains content
- Check `/api/search` returns valid JSON
- Check `refreshInterval` — cached empty results persist until TTL expires

### "Page not found" for valid pages

- Check slug matches `llms.txt` URL paths
- Verify `.mdx` endpoint: `curl https://docs.yoursite.com/docs/your-page.mdx`
- Try the full slug path (e.g., `docs/auth/api-keys` not just `api-keys`)

### Stale content

- Reduce `refreshInterval` for faster invalidation (default: 5 min)
- Set to `60_000` (1 min) during development
