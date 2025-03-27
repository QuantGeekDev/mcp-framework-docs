---
id: transports-overview
title: Transport Overview
sidebar_position: 1
---

# Transport Overview

MCP Framework supports multiple transport mechanisms for communication between the client and server. Each transport type has its own characteristics, advantages, and use cases.

## Available Transports

The framework currently supports the following transport types:

- **STDIO Transport**: The default transport that uses standard input/output streams
- **HTTP Stream Transport**: Streamable HTTP transport that implements the MCP 2025-03-26 specification
- **SSE Transport**: ⚠️ **DEPRECATED** - Server-Sent Events based transport that has been replaced by HTTP Stream Transport

## Comparison

| Feature | STDIO Transport | HTTP Stream Transport | SSE Transport (Deprecated) |
|---------|----------------|-------------|---------------|
| Protocol | Standard I/O streams | HTTP/SSE | HTTP/SSE |
| Connection | Direct process communication | Network-based | Network-based |
| Authentication | Not applicable | Supports JWT and API Key | Supports JWT and API Key |
| Session Management | Not applicable | Built-in | Limited |
| Resumability | Not applicable | Supported | No |
| Use Case | CLI tools, local integrations | Web applications, distributed systems | Legacy systems |
| Configuration | Minimal | Highly configurable | Configurable |
| Scalability | Single process | Multiple clients | Multiple clients |
| MCP Specification | Compliant | 2025-03-26 compliant | Legacy (2024-11-05) |

## Choosing a Transport

Choose your transport based on your application's needs:

- Use **STDIO Transport** when:
  - Building CLI tools
  - Need direct process communication
  - Working with local integrations
  - Want minimal configuration

- Use **HTTP Stream Transport** when:
  - Building web applications
  - Need network-based communication
  - Require authentication or session management
  - Want to support multiple clients
  - Need resumable connections
  - Need to scale horizontally
  - Require compliance with latest MCP specification

- Use **SSE Transport** only for:
  - Legacy applications that depend on the older transport

## Configuration

### STDIO Transport (Default)

```typescript
const server = new MCPServer();
// or explicitly:
const server = new MCPServer({
  transport: { type: "stdio" }
});
```

### HTTP Stream Transport

```typescript
const server = new MCPServer({
  transport: {
    type: "http-stream",
    options: {
      port: 8080,            // Optional (default: 8080)
      endpoint: "/mcp",      // Optional (default: "/mcp")
      responseMode: "batch", // Optional (default: "batch")
      cors: {
        allowOrigin: "*"     // Optional CORS configuration
      },
      auth: {
        // Optional authentication configuration
      }
    }
  }
});
```

### SSE Transport (Deprecated)

```typescript
const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      port: 8080,            // Optional (default: 8080)
      endpoint: "/sse",      // Optional (default: "/sse")
      messageEndpoint: "/messages", // Optional (default: "/messages")
      auth: {
        // Optional authentication configuration
      }
    }
  }
});
```

For detailed information about each transport type, see:
- [STDIO Transport](./stdio.md)
- [HTTP Stream Transport](./http-stream.md)
- [SSE Transport](./sse.md) (Deprecated)
