---
id: resources-overview
title: Resources Overview
sidebar_position: 1
---

# Resources

:::tip What are Resources?
Resources are data sources that AI models can read or subscribe to. Think of them as a way to provide context, data, or state to your AI interactions!
:::

## Understanding Resources

Resources can be:

- Files
- API endpoints
- Database queries
- Real-time data streams
- Configuration data

Here's a simple example:

```typescript
import { MCPResource } from "mcp-framework";

class ConfigResource extends MCPResource {
  uri = "resource://config";
  name = "Configuration";
  description = "System configuration settings";
  mimeType = "application/json";

  async read() {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify({
          version: "1.0.0",
          environment: "production",
          features: ["analytics", "reporting"],
        }),
      },
    ];
  }
}
```

## Creating Resources

### Using the CLI

```bash
mcp add resource my-resource
```

This creates a new resource in `src/resources/MyResource.ts`.

### Resource Structure

Every resource has:

1. **Metadata**

```typescript
uri = "resource://my-data";
name = "My Data Resource";
description = "Provides access to my data";
mimeType = "application/json";
```

2. **Read Method**

```typescript
async read(): Promise<ResourceContent[]> {
  // Fetch or generate your data
  return [{
    uri: this.uri,
    mimeType: this.mimeType,
    text: JSON.stringify(data)
  }];
}
```

## Resource Types

### Static Resources

```typescript
class DocumentationResource extends MCPResource {
  uri = "resource://docs";
  name = "Documentation";
  mimeType = "text/markdown";

  async read() {
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: "# API Documentation\n\nWelcome to our API...",
      },
    ];
  }
}
```

### Dynamic Resources

```typescript
class MarketDataResource extends MCPResource {
  uri = "resource://market-data";
  name = "Market Data";
  mimeType = "application/json";

  async read() {
    const data = await this.fetch("https://api.market.com/latest");
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify(data),
      },
    ];
  }
}
```

### Real-time Resources

:::tip Real-time Updates
Use subscription methods to handle real-time data streams!
:::

```typescript
class StockTickerResource extends MCPResource {
  uri = "resource://stock-ticker";
  name = "Stock Ticker";
  mimeType = "application/json";
  private ws: WebSocket | null = null;

  async subscribe() {
    this.ws = new WebSocket("wss://stocks.example.com");
    this.ws.on("message", this.handleUpdate);
  }

  async unsubscribe() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  async read() {
    const latestData = await this.getLatestStockData();
    return [
      {
        uri: this.uri,
        mimeType: this.mimeType,
        text: JSON.stringify(latestData),
      },
    ];
  }
}
```

## Best Practices

1. **URI Naming**

```typescript
uri = "resource://domain/type/identifier";
// Example: "resource://finance/stocks/AAPL"
```

2. **Error Handling**

```typescript
async read() {
  try {
    const data = await this.fetchData();
    return [{
      uri: this.uri,
      mimeType: this.mimeType,
      text: JSON.stringify(data)
    }];
  } catch (error) {
    throw new Error(`Failed to read resource: ${error.message}`);
  }
}
```

3. **Caching**

```typescript
class CachedResource extends MCPResource {
  private cache: any = null;
  private lastFetch: number = 0;
  private TTL = 60000; // 1 minute

  async read() {
    if (this.cache && Date.now() - this.lastFetch < this.TTL) {
      return this.cache;
    }

    const data = await this.fetchFreshData();
    this.cache = data;
    this.lastFetch = Date.now();
    return data;
  }
}
```

## Advanced Usage

### Combining with Tools

```typescript
class DataResource extends MCPResource {
  uri = "resource://data";
  name = "Data Store";

  async read() {
    return [
      {
        uri: this.uri,
        mimeType: "application/json",
        text: JSON.stringify(await this.getData()),
      },
    ];
  }
}

class DataProcessor extends MCPTool {
  async execute(input) {
    const resource = new DataResource();
    const [data] = await resource.read();
    return this.processData(JSON.parse(data.text));
  }
}
```

## Next Steps

- Learn about [Tools](../Tools/tools-overview)
- Learn about [Prompts](../Prompts/prompts-overview)
- [Get Started](../quickstart)
