---
id: docs-package-custom-adapters
title: Custom Source Adapters
sidebar_position: 7
---

# Custom Source Adapters

Build your own source adapter by implementing the `DocSource` interface.

## Full Implementation

```typescript
import {
  DocSource, DocPage, DocSearchResult,
  DocSection, DocSearchOptions,
} from "@mcp-framework/docs";

class MyCustomSource implements DocSource {
  name = "my-custom-docs";

  async search(query: string, options?: DocSearchOptions): Promise<DocSearchResult[]> {
    const limit = options?.limit ?? 10;
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await response.json();

    return data.results.slice(0, limit).map((item: any) => ({
      slug: item.path,
      url: `https://docs.example.com/${item.path}`,
      title: item.title,
      snippet: item.excerpt,
      section: item.category,
      score: item.relevance,
    }));
  }

  async getPage(slug: string): Promise<DocPage | null> {
    const response = await fetch(`https://api.example.com/pages/${slug}`);
    if (!response.ok) return null;

    const data = await response.json();
    return {
      slug,
      url: `https://docs.example.com/${slug}`,
      title: data.title,
      content: data.markdown,
      section: data.category,
    };
  }

  async listSections(): Promise<DocSection[]> {
    const response = await fetch("https://api.example.com/sections");
    const data = await response.json();

    return data.map((s: any) => ({
      name: s.title,
      slug: s.id,
      url: `https://docs.example.com/${s.id}`,
      children: [],
      pageCount: s.page_count,
    }));
  }

  async getIndex(): Promise<string> { return ""; }
  async getFullContent(): Promise<string> { return ""; }

  async healthCheck(): Promise<{ ok: boolean; message?: string }> {
    try {
      const response = await fetch("https://api.example.com/health");
      return { ok: response.ok };
    } catch (error) {
      return { ok: false, message: (error as Error).message };
    }
  }
}
```

## Using Your Custom Source

```typescript
import { DocsServer } from "@mcp-framework/docs";

const server = new DocsServer({
  source: new MyCustomSource(),
  name: "my-custom-docs",
  version: "1.0.0",
});

server.start();
```

## Extending LlmsTxtSource

If your site publishes `llms.txt` but has a custom search API, extend `LlmsTxtSource`:

```typescript
import { LlmsTxtSource, DocSearchResult, DocSearchOptions } from "@mcp-framework/docs";

class MyEnhancedSource extends LlmsTxtSource {
  override get name(): string {
    return `enhanced:${this.baseUrl}`;
  }

  override async search(query: string, options?: DocSearchOptions): Promise<DocSearchResult[]> {
    try {
      // Try custom search API
      const response = await fetch(`${this.baseUrl}/api/my-search?q=${query}`);
      if (response.ok) return this.mapResults(await response.json());
    } catch {
      // Fall back to local text search
    }
    return super.search(query, options);
  }

  private mapResults(data: any[]): DocSearchResult[] {
    return data.map((item, i) => ({
      slug: item.slug, url: item.url, title: item.title,
      snippet: item.excerpt || "", score: 1 - i / data.length,
    }));
  }
}
```

## Error Handling

Use the built-in error classes for consistent behavior:

```typescript
import { DocFetchError, DocParseError } from "@mcp-framework/docs";

// HTTP failures
throw new DocFetchError(url, response.status, response.statusText);

// Parse failures
throw new DocParseError(`Page ${slug} has no markdown content`);
```

:::tip
The tools catch `DocSourceError` subclasses and return user-friendly messages. Never expose stack traces to the MCP client.
:::
