---
id: docs-package-tools
title: Documentation Tools
sidebar_position: 3
---

# Documentation Tools

:::tip AI-Powered Documentation Access
These three tools give AI agents everything they need to understand your API: search for relevant pages, read full content, and browse the documentation structure.
:::

All tools extend `MCPTool` from mcp-framework and use Zod schemas with `.describe()` on every field.

## search_docs

Search documentation by keyword or phrase. Returns a ranked list of matching pages with relevant excerpts.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | yes | Search keywords or phrase |
| `section` | `string` | no | Filter results to a specific section |
| `limit` | `number` | no | Max results (default 10, max 25) |

### Example Output

```
1. **API Keys**
   https://docs.myapi.com/docs/auth/api-keys
   API keys are the simplest way to authenticate with MyAPI...
   Section: Authentication

2. **OAuth 2.0**
   https://docs.myapi.com/docs/auth/oauth
   OAuth 2.0 is recommended for applications that act on behalf of users.
   Section: Authentication
```

### Token Budget

Results are truncated to stay under ~**4,000 tokens** (~16,000 characters). If the budget is exceeded, trailing results are dropped with a count of omitted results.

## get_page

Retrieve the full markdown content of a documentation page.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | `string` | yes | Page slug or URL path |

### Slug Normalization

The tool automatically normalizes slugs:

| Input | Normalized |
|-------|-----------|
| `/getting-started` | `getting-started` |
| `getting-started/` | `getting-started` |
| `/docs/getting-started` | `getting-started` |

### Token Budget

Content is truncated at ~**8,000 tokens** (~32,000 characters) with a notice appended if truncated.

## list_sections

Browse the documentation tree structure. Useful for discovering what's available before searching.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `section` | `string` | no | Filter to a section's children |

### Example Output

```
- **Getting Started** (3 pages) [getting-started]
- **Authentication** (1 pages) [authentication]
  - **OAuth** (2 pages) [oauth]
- **API Reference** (5 pages) [api-reference]
```

## Using Tools Directly

You can use tool classes directly without DocsServer:

```typescript
import { SearchDocsTool, GetPageTool, ListSectionsTool } from "@mcp-framework/docs";
import { LlmsTxtSource } from "@mcp-framework/docs/sources";

const source = new LlmsTxtSource({ baseUrl: "https://docs.example.com" });

const searchTool = new SearchDocsTool(source);
const getPageTool = new GetPageTool(source);
const listTool = new ListSectionsTool(source);

// Call via MCP protocol
const result = await searchTool.toolCall({
  params: { name: "search_docs", arguments: { query: "authentication" } },
});
```

## Error Handling

All tools catch `DocSourceError` and return user-friendly messages:

- **Search failures** → `"Search failed: {message}. Try again or use list_sections..."`
- **Page not found** → `"Page not found: \"{slug}\". Use search_docs to find..."`
- **Section not found** → Lists available sections as suggestions
- **Source errors** → Descriptive message without stack traces
