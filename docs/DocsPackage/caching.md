---
id: docs-package-caching
title: Caching
sidebar_position: 5
---

# Caching

`@mcp-framework/docs` includes a built-in caching layer that reduces HTTP requests to your documentation site.

## Default MemoryCache

The default cache is an in-memory LRU (Least Recently Used) cache with TTL (Time-To-Live) expiry.

### What Gets Cached

| Content | Cache Key Pattern |
|---------|-------------------|
| `llms.txt` content | `index:{baseUrl}` |
| `llms-full.txt` content | `full:{baseUrl}` |
| Individual pages | `page:{slug}` |
| Search results | `search:{query}:{section}:{limit}` |
| Parsed section tree | `sections:{baseUrl}` |

### Configuration

```typescript
import { MemoryCache, LlmsTxtSource } from "@mcp-framework/docs";

const cache = new MemoryCache({
  maxEntries: 200,       // Default: 100
  ttlMs: 600_000,        // Default: 300_000 (5 minutes)
});

const source = new LlmsTxtSource({
  baseUrl: "https://docs.example.com",
  cache,
});
```

## Cache Behavior

- **Lazy expiry** — Expired entries are cleaned on access, not via background timers
- **LRU eviction** — Oldest entry evicted when `maxEntries` is reached
- **Per-entry TTL** — Each `set()` call can override the default TTL
- **Overwrite resets TTL** — Re-storing a key resets the expiry timer

## Custom Cache Implementation

Implement the `Cache` interface for Redis, SQLite, etc.:

```typescript
import { Cache, CacheStats } from "@mcp-framework/docs";

interface Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlMs?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  stats(): CacheStats;
}
```

### Example: Redis Cache

```typescript
import { Cache, CacheStats } from "@mcp-framework/docs";
import { createClient } from "redis";

class RedisCache implements Cache {
  private client;
  private defaultTtl: number;
  private _hits = 0;
  private _misses = 0;

  constructor(redisUrl: string, ttlMs = 300_000) {
    this.client = createClient({ url: redisUrl });
    this.defaultTtl = ttlMs;
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(`docs:${key}`);
    if (!value) { this._misses++; return null; }
    this._hits++;
    return JSON.parse(value);
  }

  async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    const ttl = Math.ceil((ttlMs ?? this.defaultTtl) / 1000);
    await this.client.set(`docs:${key}`, JSON.stringify(value), { EX: ttl });
  }

  async delete(key: string): Promise<void> {
    await this.client.del(`docs:${key}`);
  }

  async clear(): Promise<void> {
    const keys = await this.client.keys("docs:*");
    if (keys.length > 0) await this.client.del(keys);
    this._hits = 0; this._misses = 0;
  }

  stats(): CacheStats {
    return { hits: this._hits, misses: this._misses, size: -1 };
  }
}
```

## Tuning Refresh Interval

| Use Case | `refreshInterval` |
|----------|-------------------|
| Development | `60_000` (1 min) |
| Production (default) | `300_000` (5 min) |
| Stable docs | `3_600_000` (1 hour) |

:::info
Cache invalidation is TTL-based only in v1. There is no webhook-based or push-based invalidation.
:::
