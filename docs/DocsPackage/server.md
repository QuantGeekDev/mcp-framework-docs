---
id: docs-package-server
title: Server Configuration
sidebar_position: 4
---

# DocsServer Configuration

`DocsServer` is the convenience wrapper that ties together a `DocSource`, the pre-built tools, and the MCP protocol.

## Basic Usage

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

await server.start();
```

## Configuration

```typescript
interface DocsServerConfig {
  source: DocSource;          // Documentation source (required)
  name: string;               // Server name for MCP clients (required)
  version: string;            // Server version (required)
  transport?: TransportConfig; // Transport config (default: stdio)
  tools?: {
    search_docs?: boolean;     // Default: true
    get_page?: boolean;        // Default: true
    list_sections?: boolean;   // Default: true
    custom?: MCPTool[];        // Additional custom tools
  };
}
```

## Disabling Tools

```typescript
const server = new DocsServer({
  source,
  name: "my-api-docs",
  version: "1.0.0",
  tools: {
    list_sections: false,  // Disabled
  },
});
```

## Adding Custom Tools

```typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

const schema = z.object({
  endpoint: z.string().describe("API endpoint path"),
});

class GetSchemasTool extends MCPTool {
  name = "get_schemas";
  description = "Get request/response schemas for an API endpoint";
  schema = schema;

  async execute(input: z.infer<typeof schema>) {
    return "Schema details...";
  }
}

const server = new DocsServer({
  source,
  name: "my-api-docs",
  version: "1.0.0",
  tools: {
    custom: [new GetSchemasTool()],
  },
});
```

## Environment-Driven Configuration

Recommended for production deployments:

```typescript
const source = new FumadocsRemoteSource({
  baseUrl: process.env.DOCS_BASE_URL || "https://docs.example.com",
  headers: process.env.DOCS_API_KEY
    ? { Authorization: `Bearer ${process.env.DOCS_API_KEY}` }
    : undefined,
});

const server = new DocsServer({
  source,
  name: process.env.DOCS_SERVER_NAME || "my-docs",
  version: process.env.npm_package_version || "1.0.0",
});
```

## Lifecycle

```typescript
await server.start();  // Blocks until shutdown signal
await server.stop();   // Stop programmatically
```

The server listens for `SIGINT` and `SIGTERM` and shuts down gracefully.

## Accessing the Source

```typescript
const health = await server.source.healthCheck();
console.log("Source healthy:", health.ok);
```
