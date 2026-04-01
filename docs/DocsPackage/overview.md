---
id: docs-package-overview
title: Docs Package Overview
sidebar_position: 1
---

# @mcp-framework/docs

:::tip Turn Your Docs into an AI Superpower
`@mcp-framework/docs` lets API providers spin up an MCP documentation server in minutes. AI agents in Claude Code, Cursor, or any MCP client get tools to search, browse, and retrieve your documentation — enabling them to write correct integration code on the first try!
:::

## What is @mcp-framework/docs?

A companion package built on top of mcp-framework that provides:

1. **Source Adapters** — connect to your documentation backend (Fumadocs, any site with `llms.txt`)
2. **MCP Tools** — `search_docs`, `get_page`, `list_sections` that AI agents can call
3. **DocsServer** — a convenience wrapper that wires everything together
4. **CLI Scaffolder** — `npx create-docs-server my-api-docs` to generate a project in seconds

## Quick Start

```typescript
import { DocsServer, FumadocsRemoteSource } from "@mcp-framework/docs";

const source = new FumadocsRemoteSource({
  baseUrl: "https://docs.myapi.com",
});

const server = new DocsServer({
  source,
  name: "my-api-docs",
  version: "1.0.0",
});

server.start();
```

Or scaffold a project instantly:

```bash
npx create-docs-server my-api-docs
cd my-api-docs
cp .env.example .env   # Set your docs URL
npm run build && npm start
```

## How It Works

```
Your Docs Site                    MCP Client (Claude Code, Cursor, etc.)
┌──────────────┐                  ┌──────────────────────────────┐
│  llms.txt    │◄────fetch────────│                              │
│  /api/search │                  │   search_docs("auth")        │
│  pages.mdx   │    DocsServer    │   get_page("getting-started")│
└──────────────┘   ┌──────────┐   │   list_sections()            │
                   │ Source   │   │                              │
                   │ Adapter  │◄──┤  AI Agent writes integration │
                   │ + Cache  │   │  code using your docs        │
                   └──────────┘   └──────────────────────────────┘
```

## Architecture

`@mcp-framework/docs` is a **consumer** of mcp-framework, not a fork:

```
mcp-framework (peer dependency)
    └── @mcp-framework/docs
            ├── DocSource interface
            ├── Pre-built tools (SearchDocs, GetPage, ListSections)
            ├── DocsServer convenience class
            └── CLI template
```

## Prerequisites

Your documentation site must serve at least:

- `/llms.txt` — a structured index of your documentation (required)
- `/llms-full.txt` — full content of all documentation pages (required for search)
- `/api/search` — Fumadocs Orama search endpoint (optional, for higher-quality search)

## Next Steps

- [Source Adapters](./sources) — Learn about connecting to your docs
- [MCP Tools](./tools) — Available tools and their parameters
- [Server Configuration](./server) — DocsServer options
- [Caching](./caching) — Cache configuration
- [CLI & Scaffolding](./cli) — Project scaffolding
- [Custom Adapters](./custom-adapters) — Build your own source
- [Fumadocs Setup](./fumadocs-setup) — Configure your Fumadocs site
