---
id: docs-package-sources
title: Source Adapters
sidebar_position: 2
---

# Source Adapters

:::info Core Abstraction
Source adapters are the heart of `@mcp-framework/docs`. Every documentation backend implements the `DocSource` interface, and all tools interact through it — never touching HTTP directly.
:::

## DocSource Interface

```typescript
interface DocSource {
  name: string;
  search(query: string, options?: DocSearchOptions): Promise<DocSearchResult[]>;
  getPage(slug: string): Promise<DocPage | null>;
  listSections(): Promise<DocSection[]>;
  getIndex(): Promise<string>;
  getFullContent(): Promise<string>;
  healthCheck(): Promise<{ ok: boolean; message?: string }>;
}
```

## FumadocsRemoteSource

Purpose-built for [Fumadocs](https://fumadocs.vercel.app/) sites. Uses the native Orama search API for high-quality results, with automatic fallback to local text search.

```typescript
import { FumadocsRemoteSource } from "@mcp-framework/docs";

const source = new FumadocsRemoteSource({
  baseUrl: "https://docs.myapi.com",       // Required
  searchEndpoint: "/api/search",            // Default
  llmsTxtPath: "/llms.txt",                // Default
  llmsFullTxtPath: "/llms-full.txt",       // Default
  refreshInterval: 300_000,                // 5 min default
  headers: {                                // Optional
    Authorization: "Bearer your-token",
  },
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | *required* | Base URL of your Fumadocs site |
| `searchEndpoint` | `string` | `"/api/search"` | Fumadocs Orama search API path |
| `llmsTxtPath` | `string` | `"/llms.txt"` | Path to the llms.txt index file |
| `llmsFullTxtPath` | `string` | `"/llms-full.txt"` | Path to the full content file |
| `mdxPathPrefix` | `string` | `"/"` | Prefix for individual .mdx page URLs |
| `refreshInterval` | `number` | `300000` | Cache TTL in milliseconds |
| `headers` | `Record<string, string>` | `undefined` | Custom HTTP headers |
| `cache` | `Cache` | `MemoryCache` | Custom cache implementation |

### How It Works

| Method | Behavior |
|--------|----------|
| `search()` | Hits Fumadocs `/api/search` endpoint. Falls back to local text search on failure |
| `getPage()` | Fetches `{baseUrl}/{slug}.mdx`. Falls back to `llms-full.txt` extraction |
| `listSections()` | Parses `llms.txt` into a structured tree |
| `healthCheck()` | HEAD request to `llms.txt` endpoint |

## LlmsTxtSource

Works with **any** documentation site that publishes `llms.txt` and `llms-full.txt`. Search is performed locally via text matching.

```typescript
import { LlmsTxtSource } from "@mcp-framework/docs";

const source = new LlmsTxtSource({
  baseUrl: "https://docs.myapi.com",
  mdxPathPrefix: "/docs/",
  refreshInterval: 300_000,
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | *required* | Base URL of your docs site |
| `llmsTxtPath` | `string` | `"/llms.txt"` | Path to llms.txt |
| `llmsFullTxtPath` | `string` | `"/llms-full.txt"` | Path to llms-full.txt |
| `mdxPathPrefix` | `string` | `"/"` | Prefix for .mdx page fetching |
| `refreshInterval` | `number` | `300000` | Cache TTL in milliseconds |
| `headers` | `Record<string, string>` | `undefined` | Custom HTTP headers |
| `cache` | `Cache` | `MemoryCache` | Custom cache implementation |

### Local Search Algorithm

1. Fetch and cache `llms-full.txt`
2. Split into page blocks using `# Title (url)` headers
3. Score each block by query term frequency (title matches weighted 3x)
4. Normalize scores to 0–1
5. Return top N results with snippet extraction

## Choosing a Source

| Your Setup | Recommended Adapter |
|------------|-------------------|
| Fumadocs with search API | `FumadocsRemoteSource` |
| Fumadocs without search API | `LlmsTxtSource` |
| Non-Fumadocs with llms.txt | `LlmsTxtSource` |
| Custom backend | [Custom Adapter](./custom-adapters) |

## Core Types

### DocPage

```typescript
interface DocPage {
  slug: string;          // URL-friendly identifier
  url: string;           // Full URL to the page
  title: string;         // Page title
  description?: string;  // Brief description
  content: string;       // Full markdown body
  section?: string;      // Parent section name
  lastModified?: string; // ISO 8601 date
}
```

### DocSearchResult

```typescript
interface DocSearchResult {
  slug: string;
  url: string;
  title: string;
  description?: string;
  snippet: string;       // Matched excerpt (max 200 chars)
  section?: string;
  score: number;         // Relevance 0–1
}
```

### DocSection

```typescript
interface DocSection {
  name: string;
  slug: string;
  url: string;
  children: DocSection[];
  pageCount: number;
}
```
