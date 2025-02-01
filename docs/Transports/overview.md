---
id: transports-overview
title: Transport Overview
sidebar_position: 1
---

# Transport Overview

MCP Framework supports multiple transport mechanisms for communication between the client and server. Each transport type has its own characteristics, advantages, and use cases.

## Available Transports

The framework currently supports two transport types:

- **STDIO Transport**: The default transport that uses standard input/output streams
- **SSE Transport**: Server-Sent Events based transport that enables HTTP/web-based communication

## Comparison

| Feature | STDIO Transport | SSE Transport |
|---------|----------------|---------------|
| Protocol | Standard I/O streams | HTTP/SSE |
| Connection | Direct process communication | Network-based |
| Authentication | Not applicable | Supports JWT and API Key |
| Use Case | CLI tools, local integrations | Web applications, distributed systems |
| Configuration | Minimal | Configurable (port, endpoints, auth) |
| Scalability | Single process | Multiple clients |

## Choosing a Transport

Choose your transport based on your application's needs:

- Use **STDIO Transport** when:
  - Building CLI tools
  - Need direct process communication
  - Working with local integrations
  - Want minimal configuration

- Use **SSE Transport** when:
  - Building web applications
  - Need network-based communication
  - Require authentication
  - Want to support multiple clients
  - Need to scale horizontally

## Configuration

### STDIO Transport (Default)

```typescript
const server = new MCPServer();
// or explicitly:
const server = new MCPServer({
  transport: { type: "stdio" }
});
```

### SSE Transport

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
- [SSE Transport](./sse.md)
