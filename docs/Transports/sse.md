---
id: sse-transport
title: SSE Transport
sidebar_position: 3
---

# SSE Transport

The SSE (Server-Sent Events) transport in MCP Framework provides a web-based communication mechanism using HTTP and Server-Sent Events. This transport is ideal for web applications and distributed systems that require real-time updates.

## Overview

SSE transport offers:
- HTTP-based communication
- Real-time server-to-client messaging
- Optional authentication (JWT or API Key)
- Support for multiple concurrent clients
- Configurable endpoints and ports

## Basic Setup

```typescript
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      port: 8080
    }
  }
});

await server.start();
```

## Authentication

SSE transport supports two authentication methods out of the box: JWT and API Key. Here are simple examples to get you started.

### Simple JWT Authentication

This example shows how to secure your endpoints with JWT authentication:

```typescript
import { MCPServer, JWTAuthProvider } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      auth: {
        provider: new JWTAuthProvider({
          secret: process.env.JWT_SECRET
        }),
        endpoints: {
          sse: true,    // Secure the SSE endpoint
          messages: true // Secure the message endpoint
        }
      }
    }
  }
});
```

Clients must include a valid JWT token:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Simple API Key Authentication

This example shows how to secure your endpoints with API Key authentication:

```typescript
import { MCPServer, APIKeyAuthProvider } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      auth: {
        provider: new APIKeyAuthProvider({
          keys: [process.env.API_KEY!]
        }),
        endpoints: {
          sse: true,    // Secure the SSE endpoint
          messages: true // Secure the message endpoint
        }
      }
    }
  }
});
```

Clients must include a valid API key:
```http
X-API-Key: your-api-key
```

## Advanced Configuration

### Advanced JWT Authentication

Here's a more detailed configuration showing all available options:

```typescript
import { MCPServer, JWTAuthProvider } from "mcp-framework";
import { Algorithm } from "jsonwebtoken";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      port: 8080,            // Optional (default: 8080)
      endpoint: "/sse",      // Optional (default: "/sse")
      messageEndpoint: "/messages", // Optional (default: "/messages")
      maxMessageSize: "4mb", // Optional (default: "4mb")
      auth: {
        provider: new JWTAuthProvider({
          secret: process.env.JWT_SECRET!,
          algorithms: ["HS256" as Algorithm], // Optional (default: ["HS256"])
          headerName: "Authorization",        // Optional (default: "Authorization")
          requireBearer: true                 // Optional (default: true)
        }),
        endpoints: {
          sse: true,      // Optional (default: false)
          messages: true  // Optional (default: true)
        }
      }
    }
  }
});
```

### Advanced API Key Authentication

Here's a configuration showing all available API Key options:

```typescript
import { MCPServer, APIKeyAuthProvider } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "sse",
    options: {
      port: 8080,
      endpoint: "/sse",
      messageEndpoint: "/messages",
      maxMessageSize: "4mb",
      auth: {
        provider: new APIKeyAuthProvider({
          keys: [process.env.API_KEY!],
          headerName: "X-API-Key" // Optional (default: "X-API-Key")
        }),
        endpoints: {
          sse: true,
          messages: true
        }
      }
    }
  }
});
```

### Custom Authentication

You can implement your own authentication provider by implementing the `AuthProvider` interface:

```typescript
import { AuthProvider, AuthResult } from "mcp-framework";
import { IncomingMessage } from "node:http";

class CustomAuthProvider implements AuthProvider {
  async authenticate(req: IncomingMessage): Promise<boolean | AuthResult> {
    // Implement your custom authentication logic
    return true;
  }

  getAuthError() {
    return {
      status: 401,
      message: "Authentication failed"
    };
  }
}
```

## Features

### Keep-Alive

The SSE transport automatically maintains connection health through:
- Keep-alive messages every 15 seconds
- Ping messages with timestamps
- Connection state monitoring

### CORS Support

Built-in CORS support with the following headers:
```typescript
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
  "Access-Control-Expose-Headers": "Content-Type, Authorization, x-api-key"
}
```

### Connection Optimization

The transport automatically optimizes connections:
- TCP No Delay enabled
- Keep-alive settings configured
- Connection timeout disabled
- Proper cleanup on connection close

## Best Practices

1. **Security**
   - Always use HTTPS in production
   - Implement appropriate authentication
   - Consider rate limiting for production use

2. **Error Handling**
   - Implement proper error handling for network issues
   - Handle reconnection scenarios
   - Log connection events appropriately

3. **Monitoring**
   - Monitor active connections
   - Track message delivery success/failure
   - Implement health checks

## Complete Example

Here's a production-ready example with JWT authentication:

```typescript
import { MCPServer, JWTAuthProvider } from "mcp-framework";

class MySSEServer {
  private server: MCPServer;

  constructor() {
    this.server = new MCPServer({
      name: "my-sse-server",
      version: "1.0.0",
      transport: {
        type: "sse",
        options: {
          port: 8080,
          auth: {
            provider: new JWTAuthProvider({
              secret: process.env.JWT_SECRET,
              algorithms: ["HS256"]
            }),
            endpoints: {
              sse: true,
              messages: true
            }
          }
        }
      }
    });

    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  async start() {
    try {
      await this.server.start();
      console.log('Server started on port 8080');
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  private async shutdown() {
    console.log('Shutting down...');
    try {
      await this.server.stop();
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Start the server
new MySSEServer().start().catch(console.error);
```

## Limitations

While SSE transport is powerful, consider these limitations:
- One-way server-to-client events (clients must use POST for messages)
- Browser limitations on max concurrent SSE connections
- No built-in reconnection handling (must be implemented client-side)
- Potential proxy/firewall issues with long-lived connections

For simple local integrations or CLI tools, consider using [STDIO Transport](./stdio.md) instead.
